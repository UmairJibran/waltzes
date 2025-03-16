"""Handler for scraping job postings."""

from typing import Any, Dict

from handlers.base_handler import BaseHandler
from src.services.scrapers.job_scraper import fetch_job_details
from utils import logger
from utils.utils import add_query_param, send_data_to_callback_url


class JobScraperHandler(BaseHandler):
    """Handler for job scraping requests."""

    def process_message(self, message_body: Dict[str, Any]) -> Dict[str, Any]:
        """Process a single job scraping message.

        Args:
            message_body (Dict[str, Any]): The parsed message body containing the job URL

        Returns:
            Dict[str, Any]: Response containing the scraped job details
        """
        logger.info(f"Processing job scraping request: {message_body}")

        job_url = message_body.get("url")
        callback_url = message_body.get("callbackUrl")
        if not job_url:
            raise ValueError("Job Url is required")
        start_notification_url = add_query_param(callback_url, "just-started", "true")
        send_data_to_callback_url({}, start_notification_url)
        job_details = fetch_job_details(job_url)
        send_data_to_callback_url(job_details, callback_url)


handler_instance = JobScraperHandler()
handler = handler_instance.handler
local_invoke = handler_instance.local_invoke
