"""Handler for scraping LinkedIn job postings."""

from typing import Any, Dict

from handlers.base_handler import BaseHandler
from src.services.scrapers.linkedin_scrapper import fetch_user_linkedin
from utils import logger
from utils.utils import send_data_to_callback_url


class LinkedInScraperHandler(BaseHandler):
    """Handler for LinkedIn job scraping requests."""

    def process_message(self, message_body: Dict[str, Any]) -> Dict[str, Any]:
        """Process a single LinkedIn job scraping message.

        Args:
            message_body (Dict[str, Any]): The parsed message body containing the LinkedIn job URL

        Returns:
            Dict[str, Any]: Response containing the scraped job details
        """
        logger.info(f"Processing LinkedIn scraping request: {message_body}")
        linkedin_username = message_body.get("linkedinUsername")
        callback_url = message_body.get("callbackUrl")
        linkedin_data = fetch_user_linkedin(linkedin_username)
        send_data_to_callback_url(linkedin_data, callback_url)


# Create a singleton instance
handler_instance = LinkedInScraperHandler()
handler = handler_instance.handler
local_invoke = handler_instance.local_invoke
