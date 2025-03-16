"""A standalone function to process a PDF processor Message."""

import os
from typing import Any, Dict

from aws.s3 import upload_item
from handlers.base_handler import BaseHandler
from services.pdf.pdf import create_cover_letter, create_resume
from utils import logger
from utils.utils import delete_file, send_data_to_callback_url


def clean_title(text: str) -> str:
    """Clean the title for use in filenames."""
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


class PDFCreatorHandler(BaseHandler):
    """Handler for PDF creation requests."""

    def process_message(self, message_body: Dict[str, Any]) -> Dict[str, Any]:
        """Process a single PDF creation message.

        Args:
            message_body (Dict[str, Any]): The parsed message body containing job and applicant details

        Returns:
            Dict[str, Any]: Response containing the generated file paths
        """
        logger.info(f"Processing message body: {message_body}")

        bucket = os.getenv("AWS_RES_BUCKET")
        job_title = message_body.get("jobDetails", {}).get("title", "")
        applicant_details = message_body.get("applicantDetails", {})
        firstName = applicant_details.get("firstName", "")
        lastName = applicant_details.get("lastName", "")
        title = f"{firstName} {lastName} - {job_title}"
        root_path = message_body.get("path", "documents")

        resume_key = None
        cover_letter_key = None

        if message_body.get("resume"):
            generated_file = create_resume(segments=message_body["resume"])
            resume_key = f"{root_path}/{clean_title(title)}_resume.pdf"
            upload_item(
                path=generated_file,
                bucket=bucket,
                key=resume_key,
            )
            delete_file(generated_file)

        if message_body.get("coverLetter"):
            generated_file = create_cover_letter(
                text=message_body["coverLetter"], title=title
            )
            cover_letter_key = f"{root_path}/{clean_title(title)}_cover_letter.pdf"
            upload_item(
                path=generated_file,
                bucket=bucket,
                key=cover_letter_key,
            )
            delete_file(generated_file)

        result = {"resumePdf": resume_key, "coverLetterPdf": cover_letter_key}

        if callback_url := message_body.get("callbackUrl"):
            send_data_to_callback_url(result, callback_url)

        return result


handler_instance = PDFCreatorHandler()
handler = handler_instance.handler
local_invoke = handler_instance.local_invoke
