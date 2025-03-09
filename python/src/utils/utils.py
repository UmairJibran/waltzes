"""Utility functions."""

import json
import os
from typing import List, Optional
import uuid

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
    output_file = os.path.join("lib", f"{str(uuid.uuid4())}.pdf")
    if not os.path.exists("lib"):
        os.makedirs("lib")
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
