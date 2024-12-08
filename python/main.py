import requests
from bs4 import BeautifulSoup
import json
import os


def fetch_job_details_from_greenhouse(url):
    headers = {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.3'
    }
    response = requests.get(url, headers=headers)
    soup = BeautifulSoup(response.content, 'html.parser')

    text = soup.get_text()
    text = text[:text.find("Apply for this job")]

    return text


def fetch_job_details_from_lever(url):
    headers = {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.3'
    }
    response = requests.get(url, headers=headers)
    soup = BeautifulSoup(response.content, 'html.parser')

    text = soup.get_text()
    text = text[:text.find("Apply for this job")]

    return text


def fetch_job_details_generic(job_url):
    if os.environ.get("INSTANT_API_KEY") is None:
        return None
    url = "https://instantapi.ai/api/retrieve/"

    payload = json.dumps({
        "webpage_url": job_url,
        "api_method_name": "get_job_details",
        "api_response_structure": json.dumps({"job_title":"<title of the job>","job_description":"<complete description of the job>","company":"<name of the company>","skills_list":["<skills required for this job>"]}),
        "api_key": os.environ.get("INSTANT_API_KEY")
    })
    headers = {
    'Content-Type': 'application/json'
    }

    response = requests.request("POST", url, headers=headers, data=payload)

    return response.json()
