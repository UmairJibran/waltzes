"""Entry point for the application."""

import datetime
import os

from dotenv import load_dotenv

from aws.sqs import delete_message, fetch_messages
from handlers.process_linkedin_message import process_linkedin_queue_message
from utils.logger import logger

load_dotenv(dotenv_path=".env", override=True)


def main():
    """Entry point for the application."""
    linkedin_queue_url = os.getenv("LINKEDIN_QUEUE_URL")
    while True:
        logger.info(f"Current Time: {datetime.datetime.now()}")
        message = fetch_messages(linkedin_queue_url)
        try:
            if message:
                process_linkedin_queue_message(message)
                delete_message(
                    queue_url=linkedin_queue_url,
                    receipt_handle=message.get("ReceiptHandle"),
                )
        except Exception as e:
            logger.error(f"Error: {e}")
            continue


if __name__ == "__main__":
    main()
