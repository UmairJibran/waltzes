"""A standalone function to process a PDF processor Message."""

import json

from services.pdf.pdf import create_cover_letter, create_resume
from utils import logger
from utils.utils import send_data_to_callback_url


def process_pdf_creator_queue_message(sqs_message: str):
    """Scrape a job profile and send the data to the callback url.

    Args:
        sqs_message (str): The message Body (stringified) of a single message from the SQS queue.
    """
    message_body = json.loads(sqs_message.get("Body"))
    logger.info(f"Message Body: {message_body}")
    job_title = message_body.get("jobDetails").get("title")
    applicant_details = message_body.get("applicantDetails")
    firstName = applicant_details.get("firstName")
    lastName = applicant_details.get("lastName")
    title = f"{firstName} {lastName} - {job_title}"
    resume_key = None
    cover_letter_key = None
    if "resume" in message_body:
        create_resume(segments=message_body.get("resume"))
    if "coverLetter" in message_body:
        create_cover_letter(text=message_body.get("coverLetter"), title=title)
    callback_url = message_body.get("callbackUrl")
    job_details = {"resumePdf": "xba", "coverLetterPdf": "ssss"}
    send_data_to_callback_url(job_details, callback_url)
