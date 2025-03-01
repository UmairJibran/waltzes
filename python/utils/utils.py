import json
from typing import List, Optional


def parse_json_from_llm(input_text: str) -> Optional[List[str]]:
    """
    Parse JSON coming from LLM responses, handling markdown code blocks.

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
        print(f"Invalid JSON: {str(error)}")
        return None
