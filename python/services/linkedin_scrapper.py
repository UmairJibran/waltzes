import os
import requests


def fetch_user_linkedin_scraping_dog(linkedin_username: str):
    """Fetch User's profile from ScrapingDog."""
    url = f"https://api.scrapingdog.com/linkedin/?api_key={os.getenv('SCRAPING_DOG_API_KEY')}&type=profile&linkId={linkedin_username}&private=false"
    try:
        response = requests.get(url, timeout=int(os.getenv("EXTERNAL_API_TIMEOUT")))
        if response.status_code != 200:
            print(f"Error from Scraping Dog: {response.text}")
            return None
        data = response.json()[0]
        linkedin_data_raw = {
            "first_name": data.get("first_name", None),
            "last_name": data.get("last_name", None),
            "headline": data.get("headline", None),
            "location": data.get("location", None),
            "about": data.get("about", None),
            "experience": data.get("experience", None),
            "education": data.get("education", None),
            "activities": data.get("activities", None),
            "publications": data.get("publications", None),
            "courses": data.get("courses", None),
            "languages": data.get("languages", None),
            "projects": data.get("projects", None),
            "awards": data.get("awards", None),
            "skills": data.get("skills", None),
        }
        return {"linkedin_data_raw": linkedin_data_raw}
    except requests.RequestException as e:
        print(f"Error from Scraping Dog: {e}")
        return None


def fetch_user_linkedin_scrapin_io(linkedin_username: str):
    """Fetch User's profile from ScrapinIO."""
    url = f"https://api.scrapin.io/enrichment/profile/?apikey={os.getenv('SCRAPIN_IO_API_KEY')}&linkedInUrl=https%3A%2F%2Flinkedin.com%2Fin%2F{linkedin_username}"
    try:
        response = requests.get(url, timeout=int(os.getenv("EXTERNAL_API_TIMEOUT")))
        if response.status_code != 200:
            print(f"Error from ScrapinIO: {response.text}")
            return None
        data = response.json()
        profile = data.get("person", {})
        linkedin_data_raw = {
            "first_name": profile.get("firstName", None),
            "last_name": profile.get("lastName", None),
            "headline": profile.get("headline", None),
            "location": profile.get("location", None),
            "about": profile.get("summary", None),
            "skills": profile.get("skills", None),
            "experience": profile.get("positions", None),
            "education": profile.get("schools", None),
            "languages": profile.get("languages", None),
            "activities": profile.get("volunteeringExperiences", None),
            "awards": profile.get("certifications", None),
            "current_company": {
                "name": profile.get("company", {}).get("name", None),
                "description": profile.get("company", {}).get("description", None),
                "industry": profile.get("company", {}).get("industry", None),
                "specialities": profile.get("company", {}).get("specialities", None),
            },
        }
        return {"linkedin_data_raw": linkedin_data_raw}
    except requests.RequestException as e:
        print(f"Error from ScrapinIO: {e}")
        return None


def fetch_user_linkedin(linkedin_username: str):
    """Fetch User's profile from ScrapingDog or ScrapinIO."""
    linkedin_data = fetch_user_linkedin_scraping_dog(linkedin_username)
    if linkedin_data is None:
        linkedin_data = fetch_user_linkedin_scrapin_io(linkedin_username)
    return linkedin_data if linkedin_data else None
