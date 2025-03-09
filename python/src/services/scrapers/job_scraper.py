"""Job Scraper module for fetching job details from various sources.

This module provides functionality to scrape job information using external APIs.
"""

import json
import os

import requests


def fetch_job_details(job_url):
    """Fetch job details from a given URL using the InstantAPI service.

    Args:
        job_url (str): The URL of the job posting to fetch details from.

    Returns:
        dict or None: Job details including title, description, company, and skills if successful,
                     None if the INSTANT_API_KEY is not set.
    """
    if os.environ.get("INSTANT_API_KEY") is None:
        return None
    url = "https://instantapi.ai/api/retrieve/"

    payload = json.dumps(
        {
            "webpage_url": job_url,
            "api_method_name": "get_job_details",
            "api_response_structure": json.dumps(
                {
                    "title": "<title of the job>",
                    "description": "<complete description of the job>",
                    "companyName": "<name of the company>",
                    "skills": ["<list of skills required for this job>"],
                }
            ),
            "api_key": os.environ.get("INSTANT_API_KEY"),
        }
    )
    headers = {"Content-Type": "application/json"}

    response = requests.request("POST", url, headers=headers, data=payload)
    response.raise_for_status()

    return response.json()
