"""A standalone function to process a LinkedIn Scraper Message."""

import json

from services.scrapers.linkedin_scrapper import fetch_user_linkedin
from utils import logger
from utils.utils import send_data_to_callback_url


def process_linkedin_queue_message(sqs_message: str):
    """Scrape a linkedin profile and send the data to the callback url.

    Args:
        sqs_message (str): The message Body (stringified) of a single message from the SQS queue.
    """
    message_body = json.loads(sqs_message.get("Body"))
    logger.info(f"Message Body: {message_body}")
    linkedin_username = message_body.get("linkedinUsername")
    callback_url = message_body.get("callbackUrl")
    linkedin_data = fetch_user_linkedin(linkedin_username)
    send_data_to_callback_url(linkedin_data, callback_url)
