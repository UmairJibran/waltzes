from flask import Flask, request
from dotenv import load_dotenv
from flask_cors import CORS
from services.pdf import convert_text_to_pdf

from main import fetch_job_details_from_greenhouse, fetch_job_details_from_lever, fetch_job_details_generic
from services.openai import generate_cover_letter
from services.resume_best_match import get_best_match_from_resume
from services.resume_vectorizor import vectorize_resume


app = Flask(__name__)

app.config['CORS_HEADERS'] = 'Content-Type'

resources={r"/job-details": {"origins": "http://localhost:5000"}}
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
    return pdf_data, 200, {
        'Content-Type': 'application/pdf',
        'Content-Disposition': f'attachment; filename="{pdf_location.split("/")[-1]}"'
    }


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
    best_match_section = get_best_match_from_resume(job_details, resume_vectors, resume_segments)
    response = generate_cover_letter(job_details, best_match_section, openai_api_key)


    return {"coverLetter": response, "bestMatchSection": best_match_section}
