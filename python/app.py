import os
import json
from flask import Flask, request
from flask_cors import CORS
from models.user_linkedin import UserLinkedInData
from models.user import User
from services.linkedin_scrapper import fetch_user_linkedin
from services.pdf import convert_text_to_pdf, create_resume

from main import (
    fetch_job_details_from_greenhouse,
    fetch_job_details_from_lever,
    fetch_job_details_generic,
)
from services.openai import generate_cover_letter
from services.resume_best_match import get_best_match_from_resume
from services.resume_vectorizor import vectorize_resume
from services.openai import call_openai_api, generate_cover_letter
from utils import parse_json_from_llm


app = Flask(__name__)

app.config["CORS_HEADERS"] = "Content-Type"

resources = {r"/job-details": {"origins": "http://localhost:5000"}}
CORS(app)


@app.route("/test", methods=["GET"])
def test():
    return "Hello, World!"


@app.route("/register", methods=["POST"])
def register():
    name = request.get_json().get("name")
    email = request.get_json().get("email")
    password = request.get_json().get("password")
    linkedin_username = request.get_json().get("linkedinUsername")
    if email is None or password is None:
        return "Please provide all the required fields"
    secret_key = os.urandom(16).hex()
    user = User(
        email=email,
        password=password,
        name=name,
        linkedin_username=linkedin_username,
        secret_key=secret_key,
    )
    user.create()
    return "User Created!"


@app.route("/login", methods=["POST"])
def login():
    email = request.get_json().get("email")
    password = request.get_json().get("password")
    if email is None or password is None:
        return ("Please provide all the required fields", 400)
    user = User.login_user(email, password)
    if user is None:
        return ("Invalid credentials", 400)
    token = user.generate_token()
    return {"token": token}


@app.route("/scrap-linkedin", methods=["GET"])
def scrape_linkedin():
    token = request.headers.get("Authorization")
    if token is None:
        return "Please provide a valid token"
    user = User.from_token(token=token)
    user = User.find_by_email(user.email)
    if user is None:
        return "Invalid token"
    linkedin_username = user.linkedin_username
    linkedin_data = fetch_user_linkedin(linkedin_username)
    if linkedin_data is None:
        return ("Error fetching LinkedIn data, please try again.", 404)

    user.save_linkedin_data(linkedin_data)
    return ("LinkedIn data saved successfully!", 200)


@app.route("/create-pdf", methods=["POST"])
def convert_to_pdf():
    text = request.get_json().get("text")
    title = request.get_json().get("title", "Cover Letter")
    if text is None:
        return "Please provide text to convert to PDF"
    pdf_location = convert_text_to_pdf(text, title)
    with open(pdf_location, "rb") as pdf_file:
        pdf_data = pdf_file.read()
    return (
        pdf_data,
        200,
        {
            "Content-Type": "application/pdf",
            "Content-Disposition": f'attachment; filename="{pdf_location.split("/")[-1]}"',
        },
    )


@app.route("/create-resume", methods=["POST"])
def convert_resume():
    token = request.headers.get("Authorization")
    if token is None:
        return "Please provide a valid token"
    user = User.from_token(token=token)
    job_url = request.get_json().get("jobUrl")
    if job_url is None:
        return ("Please provide Job Url to create your Resume", 400)
    user_linkedin_data = UserLinkedInData.get_latest_valid_scrape(
        user_linkedin_username=user.linkedin_username
    )
    if user_linkedin_data is None:
        return ("Please scrape your LinkedIn data first", 400)

    system_prompt = """
        You are a head hunter with over 10 years of experience in the recruitment industry.
        You have a proven track record of successfully placing candidates in various roles across different industries.
        You are passionate about helping people find their dream jobs and thrive in their careers.
        You will be given a user's LinkedIn data, which will include most of the information needed to create a resume.
        You will need to generate resume segments based on the user's LinkedIn data.

        Keep in mind that the user's LinkedIn data may not be complete, but what is available should be used to generate the resume segments.
        These segments should be very detailed and include all relevant information from the user's LinkedIn profile and the provided job posting Which will also be provided to you.

        The Resume should be very well worded and should be able to pass through the ATS system.

        The segments should be a json object with the following structure (NOT MARKDOWN, but a JSON object's string):
        {
            "name": "user's full name",
            "contact": [
                "site (if available)",
                "email",
                "phone (if available)",
                "linkedin_url",
            ],
            "experience": [
                {
                    "title": "job title",
                    "location": "job location",
                    "date": "from - to/present",
                    "description": ["bullet point 1", "bullet point 2", ...],
                }
            ],
            "education": [
                {
                    "title": "degree",
                    "location": "university",
                    "date": "from - to",
                    "description": ["bullet point 1", "bullet point 2", ...],
                }
            ],
            "skills": ["skill 1", "skill 2", ...],
            "certifications": [
                {
                    "title": "certification title",
                    "date": "date",
                    "description": "description",
                }
            ],
            "open_source": [
                {
                    "title": "project title",
                    "description": "project description",
                    "link": "project link",
                }
            ],
        }
    """

    job_details = ""
    if "greenhouse" in job_url:
        job_details = fetch_job_details_from_greenhouse(job_url)
    elif "lever" in job_url:
        job_details = fetch_job_details_from_lever(job_url)
    else:
        job_details = fetch_job_details_generic(job_url)
        job_details = json.dumps(job_details)

    resume_segments = call_openai_api(
        messages=[
            {"role": "system", "content": system_prompt},
            {"role": "user", "content": json.dumps(user_linkedin_data.scrape_data)},
            {"role": "user", "content": job_details},
        ],
        max_tokens=5000,
    )
    resume_segments = parse_json_from_llm(resume_segments)
    pdf_location = create_resume(resume_segments)
    with open(pdf_location, "rb") as pdf_file:
        pdf_data = pdf_file.read()
    return (
        pdf_data,
        200,
        {
            "Content-Type": "application/pdf",
            "Content-Disposition": f'attachment; filename="{pdf_location.split("/")[-1]}"',
        },
    )


@app.route("/job-details/<job_board>", methods=["POST"])
def get_job_details(job_board):
    job_url = request.args.get("url")
    openai_api_key = request.args.get("openAiKey")
    job_details = ""

    job_details = request.get_json()
    job_details = job_details.get("customJd")

    if job_url is None and job_details is None:
        return "Please provide a job URL or custom job description"

    match job_board:
        case "greenhouse":
            job_details = fetch_job_details_from_greenhouse(job_url)
        case "lever":
            job_details = fetch_job_details_from_lever(job_url)
        case "unknown":
            job_details = fetch_job_details_generic(job_url)
            if job_details is None:
                return "Job details could not be fetched. Please try again."

    resume_vectors, resume_segments = vectorize_resume()
    best_match_section = get_best_match_from_resume(
        job_details, resume_vectors, resume_segments
    )
    response = generate_cover_letter(job_details, best_match_section, openai_api_key)

    return {"coverLetter": response, "bestMatchSection": best_match_section}
