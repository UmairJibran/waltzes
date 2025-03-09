"""A standalone function to process a PDF processor Message."""

import json
import os

from aws.s3 import upload_item
from services.pdf.pdf import create_cover_letter, create_resume
from utils import logger
from utils.utils import delete_file, send_data_to_callback_url


def process_pdf_creator_queue_message(sqs_message: str):
    """Scrape a job profile and send the data to the callback url.

    Args:
        sqs_message (str): The message Body (stringified) of a single message from the SQS queue.
    """
    message_body = json.loads(sqs_message.get("Body"))
    logger.info(f"Message Body: {message_body}")
    bucket = os.getenv("AWS_RES_BUCKET")
    job_title = message_body.get("jobDetails").get("title")
    applicant_details = message_body.get("applicantDetails")
    firstName = applicant_details.get("firstName")
    lastName = applicant_details.get("lastName")
    title = f"{firstName} {lastName} - {job_title}"
    root_path = message_body.get("path")
    resume_key = None
    cover_letter_key = None

    def clean_title(text):
        return (
            text.replace(",", "")
            .replace("&", "and")
            .replace("(", "")
            .replace(")", "")
            .replace("-", " ")
            .replace("  ", " ")
            .replace("  ", " ")
            .replace(" ", "_")
            .lower()
        )

    if "resume" in message_body and message_body.get("resume"):
        generated_file = create_resume(segments=message_body.get("resume"))
        resume_key = f"{root_path}/{clean_title(title)}_resume.pdf"
        upload_item(
            path=generated_file,
            bucket=bucket,
            key=resume_key,
        )
        delete_file(generated_file)

    if "coverLetter" in message_body and message_body.get("coverLetter"):
        generated_file = create_cover_letter(
            text=message_body.get("coverLetter"), title=title
        )
        cover_letter_key = f"{root_path}/{clean_title(title)}_cover_letter.pdf"
        upload_item(
            path=generated_file,
            bucket=bucket,
            key=cover_letter_key,
        )
        delete_file(generated_file)

    callback_url = message_body.get("callbackUrl")
    job_details = {"resumePdf": resume_key, "coverLetterPdf": cover_letter_key}
    send_data_to_callback_url(job_details, callback_url)
