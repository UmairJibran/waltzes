"""A standalone function to process a LinkedIn Scraper Message."""

from services.scrapers.linkedin_scrapper import fetch_user_linkedin
from utils.utils import send_data_to_callback_url


def process_linkedin_queue_message(
    linkedin_username: str,
    callback_url: str,
):
    """Scrape a linkedin profile and send the data to the callback url.

    Args:
        linkedin_username (str): username of the linkedin profile to scrape
        callback_url (str): url to send the scraped data to
    """
    linkedin_data = fetch_user_linkedin(linkedin_username)
    send_data_to_callback_url(linkedin_data, callback_url)
