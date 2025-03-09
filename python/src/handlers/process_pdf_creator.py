"""A standalone function to process a PDF processor Message."""

import json

from services.pdf.pdf import create_resume
from utils import logger
from utils.utils import send_data_to_callback_url


def process_pdf_creator_queue_message(sqs_message: str):
    """Scrape a job profile and send the data to the callback url.

    Args:
        sqs_message (str): The message Body (stringified) of a single message from the SQS queue.
    """
    message_body = json.loads(sqs_message.get("Body"))
    logger.info(f"Message Body: {message_body}")
    create_resume(segments=message_body.get("resume"))
    callback_url = message_body.get("callbackUrl")
    job_details = {"resumePdf": "xba", "coverLetterPdf": "ssss"}
    send_data_to_callback_url(job_details, callback_url)
