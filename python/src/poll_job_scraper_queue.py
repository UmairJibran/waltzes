"""Entry point for the application."""

import datetime
import os

from dotenv import load_dotenv

from aws.sqs import delete_message, fetch_messages
from handlers.process_job_message import process_job_queue_message
from utils.logger import logger

load_dotenv(dotenv_path='.env', override=True)


def main():
    """Entry point for the application."""
    job_queue_url = os.getenv("JOB_QUEUE_URL")
    while True:
        logger.info(f"Current Time: {datetime.datetime.now()}")
        message = fetch_messages(job_queue_url)
        try:
            if message:
                process_job_queue_message(message)
                delete_message(
                    queue_url=job_queue_url,
                    receipt_handle=message.get("ReceiptHandle"),
                )
        except Exception as e:
            logger.error(f"Error: {e}")
            continue


if __name__ == "__main__":
    main()
