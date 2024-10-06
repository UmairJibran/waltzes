from flask import Flask, request
from dotenv import load_dotenv
from flask_cors import CORS

from main import fetch_job_details_from_greenhouse
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


@app.route("/job-details/<job_board>", methods=["GET"])
def get_job_details(job_board):
    job_url = request.args.get("url")
    job_details = ""

    if job_url is None:
        return "Please provide a job URL"

    match job_board:
        case "greenhouse":
            job_details = fetch_job_details_from_greenhouse(job_url)

    resume_vectors, resume_segments = vectorize_resume()
    best_match_section = get_best_match_from_resume(job_details, resume_vectors, resume_segments)
    response = generate_cover_letter(job_details, best_match_section)


    return {"coverLetter": response, "bestMatchSection": best_match_section}
