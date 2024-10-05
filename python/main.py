import requests
from bs4 import BeautifulSoup


def fetch_job_details_from_greenhouse(url):
    headers = {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.3'
    }
    response = requests.get(url, headers=headers)
    soup = BeautifulSoup(response.content, 'html.parser')

    text = soup.get_text()
    text = text[:text.find("Apply for this job")]

    return text
