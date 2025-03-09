"""OpenAI API service for making LLM calls."""
import os

from openai import OpenAI


def call_openai_api(
    prompt="",
    model="gpt-4o",
    max_tokens=500,
    temperature=0.2,
    api_key=None,
    messages=[],
):
    """Make an independent call to OpenAI API.

    Args:
        prompt (str): The prompt to send to OpenAI
        model (str): The model to use for generation
        max_tokens (int): Maximum number of tokens to generate
        temperature (float): Controls randomness in the response
        api_key (str, optional): OpenAI API key. If None, uses environment variable

    Returns:
        str: The generated content from OpenAI
    """

    if messages is None:
    if api_key is None:
        api_key = os.environ.get("OPENAI_API_KEY")

    client = OpenAI(api_key=api_key)

    completion = client.chat.completions.create(
        model=model,
        messages=messages,
        max_tokens=max_tokens,
        temperature=temperature,
    )

    return completion.choices[0].message.content
