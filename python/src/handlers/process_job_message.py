"""A standalone function to process a Job Scraper Message."""

import json
import time

from services.scrapers.job_scraper import fetch_job_details
from utils import logger
from utils.utils import add_query_param, send_data_to_callback_url


def process_job_queue_message(sqs_message: str):
    """Scrape a job profile and send the data to the callback url.

    Args:
        sqs_message (str): The message Body (stringified) of a single message from the SQS queue.
    """
    message_body = json.loads(sqs_message.get("Body"))
    logger.info(f"Message Body: {message_body}")
    job_url = message_body.get("jobUrl")
    callback_url = message_body.get("callbackUrl")
    start_notification_url = add_query_param(callback_url, "just-started", "true")
    time.sleep(2) # allow time for the resource to be created
    send_data_to_callback_url({}, start_notification_url)
    job_details = fetch_job_details(job_url)
    send_data_to_callback_url(job_details, callback_url)
