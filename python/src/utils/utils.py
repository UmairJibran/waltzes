"""Utility functions."""

import json
import os
import uuid
from typing import List, Optional
from urllib.parse import parse_qsl, urlencode, urlparse, urlunparse

import requests

from utils.logger import logger


def parse_json_from_llm(input_text: str) -> Optional[List[str]]:
    """Parse JSON coming from LLM responses, handling markdown code blocks.

    Args:
        input_text: String that may contain JSON, possibly wrapped in markdown code blocks

    Returns:
        List of strings if parsing succeeds, None otherwise
    """
    try:
        if not isinstance(input_text, str):
            raise TypeError("Input must be a string")

        input_text = input_text.strip()
        if input_text.startswith("```json") and input_text.endswith("```"):
            input_text = input_text[7:-3].strip()

        parsed = json.loads(input_text)
        return parsed

    except Exception as error:
        logger.error(f"Invalid JSON: {str(error)}")
        return None


def send_data_to_callback_url(data: dict, callback_url: str):
    """Send data to a callback URL.

    Args:
        data: Data to send
        callback_url: URL to send data to
    """
    logger.warn(f"""{callback_url=}""")
    try:
        response = requests.post(callback_url, json=data)
        logger.info(f"""{response.status_code=}""")
        response.raise_for_status()
    except requests.exceptions.RequestException as error:
        logger.error(f"Error sending data to callback URL: {str(error)}")
        return None


def generate_file_path():
    """Generate a unique file path for the output file."""
    output_file = os.path.join("/tmp", f"{str(uuid.uuid4())}.pdf")
    if not os.path.exists("/tmp"):
        os.makedirs("/tmp")
    return output_file


def delete_file(file_path: str):
    """Delete the file."""
    try:
        os.remove(file_path)
    except FileNotFoundError:
        logger.error(f"File {file_path} not found.")
    except Exception as e:
        logger.error(f"Error deleting file: {e}")
        return None


def add_query_param(url, param_name, param_value):
    """Add a query parameter to a URL and send notification.

    Args:
        url (str): The URL to modify
        param_name (str): The name of the parameter to add
        param_value (str): The value of the parameter
        data (dict, optional): Data to send in the notification. Defaults to empty dict.

    Returns:
        str: The modified URL
    """
    parsed_url = urlparse(url)
    query_dict = dict(parse_qsl(parsed_url.query))
    query_dict[param_name] = param_value
    new_query = urlencode(query_dict)
    parsed_url = parsed_url._replace(query=new_query)
    modified_url = urlunparse(parsed_url)

    return modified_url


def clean_title(text: str) -> str:
    """Clean the title for use in filenames."""
    return (
        text.replace(",", "")
        .replace("&", "and")
        .replace("(", "")
        .replace(")", "")
        .replace("-", " ")
        .replace("  ", " ")
        .replace("  ", " ")
        .replace(" ", "_")
        .lower()
    )
