"""This module contains functions to fetch user's linkedin profile data from ScrapingDog, ScrapinIO and ProxyCurl."""

import os

import requests

from utils.logger import logger


def fetch_user_linkedin_scraping_dog(linkedin_username: str):
    """Fetch User's profile from ScrapingDog."""
    url = f"https://api.scrapingdog.com/linkedin/?api_key={os.getenv('SCRAPING_DOG_API_KEY')}&type=profile&linkId={linkedin_username}&private=false"
    try:
        response = requests.get(url, timeout=int(os.getenv("EXTERNAL_API_TIMEOUT")))
        response.raise_for_status()
        data = response.json()[0]
        linkedin_data_raw = {
            "first_name": data.get("first_name", None),
            "last_name": data.get("last_name", None),
            "full_name": f"{data.get('first_name', '')} {data.get('last_name', '')}".strip()
            or None,
            "occupation": data.get("headline", None),
            "headline": data.get("headline", None),
            "location": data.get("location", None),
            "about": data.get("about", None),
            "country": None,
            "country_full_name": None,
            "city": None,
            "state": None,
            "skills": data.get("skills", None),
            "experience": data.get("experience", None),
            "education": data.get("education", None),
            "languages_and_proficiencies": data.get("languages", None),
            "accomplishment_organisations": None,
            "accomplishment_publications": data.get("publications", None),
            "accomplishment_honors_awards": data.get("awards", None),
            "accomplishment_courses": data.get("courses", None),
            "accomplishment_patents": None,
            "accomplishment_projects": data.get("projects", None),
            "accomplishment_test_scores": None,
            "volunteer_work": data.get("activities", None),
            "recommendations": None,
            "certifications": None,
            "activities": data.get("activities", None),
            "articles": None,
            "industry": None,
            "extra": None,
            "interests": None,
        }
        return linkedin_data_raw
    except requests.RequestException as e:
        logger.error(f"Error from Scraping Dog: {e}")
        return None


def fetch_user_linkedin_scrapin_io(linkedin_username: str):
    """Fetch User's profile from ScrapinIO."""
    url = f"https://api.scrapin.io/enrichment/profile/?apikey={os.getenv('SCRAPIN_IO_API_KEY')}&linkedInUrl=https%3A%2F%2Flinkedin.com%2Fin%2F{linkedin_username}"
    try:
        response = requests.get(url, timeout=int(os.getenv("EXTERNAL_API_TIMEOUT")))
        response.raise_for_status()
        data = response.json()
        profile = data.get("person", {})
        company = profile.get("company", {})

        linkedin_data_raw = {
            "first_name": profile.get("firstName", None),
            "last_name": profile.get("lastName", None),
            "full_name": f"{profile.get('firstName', '')} {profile.get('lastName', '')}".strip()
            or None,
            "occupation": profile.get("headline", None),
            "headline": profile.get("headline", None),
            "location": profile.get("location", None),
            "about": profile.get("summary", None),
            "country": None,
            "country_full_name": None,
            "city": None,
            "state": None,
            "skills": profile.get("skills", None),
            "experience": profile.get("positions", None),
            "education": profile.get("schools", None),
            "languages_and_proficiencies": profile.get("languages", None),
            "accomplishment_organisations": None,
            "accomplishment_publications": None,
            "accomplishment_honors_awards": None,
            "accomplishment_courses": None,
            "accomplishment_patents": None,
            "accomplishment_projects": None,
            "accomplishment_test_scores": None,
            "volunteer_work": profile.get("volunteeringExperiences", None),
            "recommendations": None,
            "certifications": profile.get("certifications", None),
            "activities": profile.get("volunteeringExperiences", None),
            "articles": None,
            "industry": company.get("industry", None),
            "extra": {
                "current_company": {
                    "name": company.get("name", None),
                    "description": company.get("description", None),
                    "industry": company.get("industry", None),
                    "specialities": company.get("specialities", None),
                }
            }
            if company
            else None,
            "interests": None,
        }
        return linkedin_data_raw
    except requests.RequestException as e:
        logger.error(f"Error from ScrapinIO: {e}")
        return None


def fetch_user_linkedin_proxy_curl(linkedin_username: str):
    """Fetch User's profile from ProxyCurl."""
    api_key = os.getenv("PROXY_CURL_API_KEY")
    headers = {"Authorization": "Bearer " + api_key}
    api_endpoint = "https://nubela.co/proxycurl/api/v2/linkedin"
    params = {"linkedin_profile_url": f"https://linkedin.com/in/{linkedin_username}/"}
    try:
        response = requests.get(
            api_endpoint,
            params=params,
            headers=headers,
            timeout=int(os.getenv("EXTERNAL_API_TIMEOUT")),
        )
        response.raise_for_status()
        profile = response.json()
        linkedin_data_raw = {
            "first_name": profile.get("first_name", None),
            "last_name": profile.get("last_name", None),
            "full_name": profile.get("full_name", None),
            "occupation": profile.get("occupation", None),
            "headline": profile.get("headline", None),
            "location": profile.get("location", None),
            "about": profile.get("summary", None),
            "country": profile.get("country", None),
            "country_full_name": profile.get("country_full_name", None),
            "city": profile.get("city", None),
            "state": profile.get("state", None),
            "skills": profile.get("skills", None),
            "experience": profile.get("experiences", None),
            "education": profile.get("education", None),
            "languages_and_proficiencies": profile.get(
                "languages_and_proficiencies", None
            ),
            "accomplishment_organisations": profile.get(
                "accomplishment_organisations", None
            ),
            "accomplishment_publications": profile.get(
                "accomplishment_publications", None
            ),
            "accomplishment_honors_awards": profile.get(
                "accomplishment_honors_awards", None
            ),
            "accomplishment_courses": profile.get("accomplishment_courses", None),
            "accomplishment_patents": profile.get("accomplishment_patents", None),
            "accomplishment_projects": profile.get("accomplishment_projects", None),
            "accomplishment_test_scores": profile.get(
                "accomplishment_test_scores", None
            ),
            "volunteer_work": profile.get("volunteer_work", None),
            "recommendations": profile.get("recommendations", None),
            "certifications": profile.get("certifications", None),
            "activities": profile.get("activities", None),
            "articles": profile.get("articles", None),
            "industry": profile.get("industry", None),
            "extra": profile.get("extra", None),
            "interests": profile.get("interests", None),
        }
        return linkedin_data_raw
    except requests.RequestException as e:
        logger.error(f"Error from ScrapinIO: {e}")
        return None


def fetch_user_linkedin(linkedin_username: str):
    """Fetch User's profile from ScrapingDog or ScrapinIO."""
    linkedin_data = fetch_user_linkedin_scraping_dog(linkedin_username)
    if linkedin_data is None:
        linkedin_data = fetch_user_linkedin_scrapin_io(linkedin_username)
    if linkedin_data is None:
        linkedin_data = fetch_user_linkedin_proxy_curl(linkedin_username)
    return linkedin_data if linkedin_data else None
