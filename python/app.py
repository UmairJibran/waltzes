from flask import Flask, request
from flask_cors import CORS
from services.pdf import convert_text_to_pdf, create_resume

from main import (
    fetch_job_details_from_greenhouse,
    fetch_job_details_from_lever,
    fetch_job_details_generic,
)
from services.openai import generate_cover_letter
from services.resume_best_match import get_best_match_from_resume
from services.resume_vectorizor import vectorize_resume


app = Flask(__name__)

app.config["CORS_HEADERS"] = "Content-Type"

resources = {r"/job-details": {"origins": "http://localhost:5000"}}
CORS(app)


@app.route("/test", methods=["GET"])
def test():
    return "Hello, World!"


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
    text = request.get_json().get("text")
    if text is None:
        return "Please provide text to convert to PDF"
    pdf_location = create_resume(
        {
            "name": "UMAIR JIBRAN",
            "contact": [
                "umairjibran.com",
                "me@umairjibran.com",
                "+92 (312) 091-9647",
                "linkedin.com/in/umairjibran",
            ],
            "experience": [
                {
                    "title": "Productbox, Backend Tech Lead",
                    "location": "Peshawar, KP",
                    "date": "FEB 2024-Present",
                    "description": [
                        "Designed a scalable backend capable of handling thousands of concurrent users, with the ability to scale further as needed.",
                        "Coordinated 3+ stakeholder meetings to clarify specifications, enabling the UI/UX team to develop 20+ refined mock-ups.",
                        "Coordinated 3+ stakeholder meetings to clarify specifications, enabling the UI/UX team to develop 20+ refined mock-ups.",
                        "Coordinated 3+ stakeholder meetings to clarify specifications, enabling the UI/UX team to develop 20+ refined mock-ups.",
                        "Coordinated 3+ stakeholder meetings to clarify specifications, enabling the UI/UX team to develop 20+ refined mock-ups.",
                        "Coordinated 3+ stakeholder meetings to clarify specifications, enabling the UI/UX team to develop 20+ refined mock-ups.",
                        "Coordinated 3+ stakeholder meetings to clarify specifications, enabling the UI/UX team to develop 20+ refined mock-ups.",
                        "Coordinated 3+ stakeholder meetings to clarify specifications, enabling the UI/UX team to develop 20+ refined mock-ups.",
                    ],
                },
                {
                    "title": "Productbox, Backend Tech Lead",
                    "location": "Peshawar, KP",
                    "date": "FEB 2024-Present",
                    "description": [
                        "Designed a scalable backend capable of handling thousands of concurrent users, with the ability to scale further as needed.",
                        "Coordinated 3+ stakeholder meetings to clarify specifications, enabling the UI/UX team to develop 20+ refined mock-ups.",
                        "Coordinated 3+ stakeholder meetings to clarify specifications, enabling the UI/UX team to develop 20+ refined mock-ups.",
                        "Coordinated 3+ stakeholder meetings to clarify specifications, enabling the UI/UX team to develop 20+ refined mock-ups.",
                        "Coordinated 3+ stakeholder meetings to clarify specifications, enabling the UI/UX team to develop 20+ refined mock-ups.",
                        "Coordinated 3+ stakeholder meetings to clarify specifications, enabling the UI/UX team to develop 20+ refined mock-ups.",
                        "Coordinated 3+ stakeholder meetings to clarify specifications, enabling the UI/UX team to develop 20+ refined mock-ups.",
                        "Coordinated 3+ stakeholder meetings to clarify specifications, enabling the UI/UX team to develop 20+ refined mock-ups.",
                    ],
                },
                {
                    "title": "Productbox, Backend Tech Lead",
                    "location": "Peshawar, KP",
                    "date": "FEB 2024-Present",
                    "description": [
                        "Designed a scalable backend capable of handling thousands of concurrent users, with the ability to scale further as needed.",
                        "Coordinated 3+ stakeholder meetings to clarify specifications, enabling the UI/UX team to develop 20+ refined mock-ups.",
                        "Coordinated 3+ stakeholder meetings to clarify specifications, enabling the UI/UX team to develop 20+ refined mock-ups.",
                        "Coordinated 3+ stakeholder meetings to clarify specifications, enabling the UI/UX team to develop 20+ refined mock-ups.",
                        "Coordinated 3+ stakeholder meetings to clarify specifications, enabling the UI/UX team to develop 20+ refined mock-ups.",
                        "Coordinated 3+ stakeholder meetings to clarify specifications, enabling the UI/UX team to develop 20+ refined mock-ups.",
                        "Coordinated 3+ stakeholder meetings to clarify specifications, enabling the UI/UX team to develop 20+ refined mock-ups.",
                        "Coordinated 3+ stakeholder meetings to clarify specifications, enabling the UI/UX team to develop 20+ refined mock-ups.",
                    ],
                },
                {
                    "title": "Productbox, Backend Tech Lead",
                    "location": "Peshawar, KP",
                    "date": "FEB 2024-Present",
                    "description": [
                        "Designed a scalable backend capable of handling thousands of concurrent users, with the ability to scale further as needed.",
                        "Coordinated 3+ stakeholder meetings to clarify specifications, enabling the UI/UX team to develop 20+ refined mock-ups.",
                        "Coordinated 3+ stakeholder meetings to clarify specifications, enabling the UI/UX team to develop 20+ refined mock-ups.",
                        "Coordinated 3+ stakeholder meetings to clarify specifications, enabling the UI/UX team to develop 20+ refined mock-ups.",
                        "Coordinated 3+ stakeholder meetings to clarify specifications, enabling the UI/UX team to develop 20+ refined mock-ups.",
                        "Coordinated 3+ stakeholder meetings to clarify specifications, enabling the UI/UX team to develop 20+ refined mock-ups.",
                        "Coordinated 3+ stakeholder meetings to clarify specifications, enabling the UI/UX team to develop 20+ refined mock-ups.",
                        "Coordinated 3+ stakeholder meetings to clarify specifications, enabling the UI/UX team to develop 20+ refined mock-ups.",
                    ],
                },
                {
                    "title": "Productbox, Backend Tech Lead",
                    "location": "Peshawar, KP",
                    "date": "FEB 2024-Present",
                    "description": [
                        "Designed a scalable backend capable of handling thousands of concurrent users, with the ability to scale further as needed.",
                        "Coordinated 3+ stakeholder meetings to clarify specifications, enabling the UI/UX team to develop 20+ refined mock-ups.",
                        "Coordinated 3+ stakeholder meetings to clarify specifications, enabling the UI/UX team to develop 20+ refined mock-ups.",
                        "Coordinated 3+ stakeholder meetings to clarify specifications, enabling the UI/UX team to develop 20+ refined mock-ups.",
                        "Coordinated 3+ stakeholder meetings to clarify specifications, enabling the UI/UX team to develop 20+ refined mock-ups.",
                        "Coordinated 3+ stakeholder meetings to clarify specifications, enabling the UI/UX team to develop 20+ refined mock-ups.",
                        "Coordinated 3+ stakeholder meetings to clarify specifications, enabling the UI/UX team to develop 20+ refined mock-ups.",
                        "Coordinated 3+ stakeholder meetings to clarify specifications, enabling the UI/UX team to develop 20+ refined mock-ups.",
                    ],
                },
            ],
            "education": [
                {
                    "title": "CITY UNIVERSITY OF SCIENCE AND INFORMATION TECHNOLOGY",
                    "location": "Peshawar, KP",
                    "date": "SEPT 2017-NOV 2021",
                    "description": "Bachelor of Science in Computer Science",
                    "highlights": [
                        "Selected as the first ever Student Ambassador of Microsoft for our Campus."
                    ],
                },
                {
                    "title": "CITY UNIVERSITY OF SCIENCE AND INFORMATION TECHNOLOGY",
                    "location": "Peshawar, KP",
                    "date": "SEPT 2017-NOV 2021",
                    "description": "Bachelor of Science in Computer Science",
                    "highlights": [
                        "Selected as the first ever Student Ambassador of Microsoft for our Campus."
                    ],
                },
                {
                    "title": "CITY UNIVERSITY OF SCIENCE AND INFORMATION TECHNOLOGY",
                    "location": "Peshawar, KP",
                    "date": "SEPT 2017-NOV 2021",
                    "description": "Bachelor of Science in Computer Science",
                    "highlights": [
                        "Selected as the first ever Student Ambassador of Microsoft for our Campus."
                    ],
                },
                {
                    "title": "CITY UNIVERSITY OF SCIENCE AND INFORMATION TECHNOLOGY",
                    "location": "Peshawar, KP",
                    "date": "SEPT 2017-NOV 2021",
                    "description": "Bachelor of Science in Computer Science",
                    "highlights": [
                        "Selected as the first ever Student Ambassador of Microsoft for our Campus."
                    ],
                },
            ],
            "skills": [
                "Technologies: Node.js, Serverless, RESTful APIs, ReactJS, NEXT, JEST, Socket.io",
                "Databases: MySQL, DynamoDB, Firestore, MongoDB, CassandraDB",
                "Cloud Infrastructure: Amazon Web Services, Apache Web Services",
                "Supporting Tools: Figma, Git, GitHub, Swagger, WordPress"
                "Supporting Tools: Figma, Git, GitHub, Swagger, WordPress"
                "Supporting Tools: Figma, Git, GitHub, Swagger, WordPress",
            ],
            "certifications": [
                {
                    "title": "GITHUB FOUNDATIONS by GitHub",
                    "date": "NOV 2024",
                    "description": "Credentials: https://www.credly.com/badges/ddb40bee-1063-4016-838a-f3523a871b77",
                },
                {
                    "title": "GITHUB FOUNDATIONS by GitHub",
                    "date": "NOV 2024",
                    "description": "Credentials: https://www.credly.com/badges/ddb40bee-1063-4016-838a-f3523a871b77",
                },
                {
                    "title": "GITHUB FOUNDATIONS by GitHub",
                    "date": "NOV 2024",
                    "description": "Credentials: https://www.credly.com/badges/ddb40bee-1063-4016-838a-f3523a871b77",
                },
            ],
            "open_source": [
                {
                    "title": "FAKERJS",
                    "description": "Twelfth top contributor to the package with over 5 million weekly downloads.",
                    "link": "https://GitHub.com/Faker-Js/Faker",
                },
                {
                    "title": "FAKERJS",
                    "description": "Twelfth top contributor to the package with over 5 million weekly downloads.",
                    "link": "https://GitHub.com/Faker-Js/Faker",
                },
                {
                    "title": "FAKERJS",
                    "description": "Twelfth top contributor to the package with over 5 million weekly downloads.",
                    "link": "https://GitHub.com/Faker-Js/Faker",
                },
                {
                    "title": "FAKERJS",
                    "description": "Twelfth top contributor to the package with over 5 million weekly downloads.",
                    "link": "https://GitHub.com/Faker-Js/Faker",
                },
            ],
        }
    )
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
