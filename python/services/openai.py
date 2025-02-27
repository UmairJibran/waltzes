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
    """
    Make an independent call to OpenAI API

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
        messages = [{"role": "system", "content": prompt}]
    if len(messages) == 0:
        messages = [{"role": "system", "content": prompt}]

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


def generate_cover_letter(raw_job_details, best_match_section, api_key=None):
    """Generate a cover letter based on job details and resume section"""
    if api_key is None:
        api_key = os.environ.get("OPENAI_API_KEY")
    print("OPEN AI KEY => ", api_key)

    prompt = f"""
Generate a compelling cover letter based on the provided resume and job details. Analyze the resume to identify relevant work experience, skills, and achievements that align with the job requirements. Use this information to craft a brief, enthusiastic letter that showcases the candidate's qualifications and passion for the role.

Best matching section: {best_match_section}

Job Details:
{raw_job_details}

Please write a cover letter that:
    1. Highlights the candidate's most relevant skills and experiences
    2. Demonstrates their understanding of the job requirements and how they can contribute to the organization
    3. Conveys the candidate's enthusiasm and interest in the role
    4. Is concise and easy to read, with a length of approximately 2-3 paragraphs

Use a professional yet engaging tone, and avoid generic phrases or clichés. The goal is to make the candidate stand out and showcase their unique qualifications and personality.

Additional Instructions:
    1. Address the letter to the hiring manager
    2. Use the candidate's name as "Umair Jibran"
    3. Do not mention the company name or Role in the cover letter if not provided
    4. Include a closing statement expressing interest in an interview
    5. Proofread the letter for grammar and spelling errors
    6. Preserve line breaks and formatting for readability
    7. Do not add dates or addresses
    8. Do not include any personal information or contact details
    9. Do not leave any placeholder text
    10. Be realistic and avoid exaggeration or false information

The response should be in the form of a well-structured cover letter that meets the above criteria.
The response should be in the following format:
{{
    "cover_letter": <generated cover letter>,
    "company_name": <company name>,
    "role": <role>,
    "applicant_name": <applicant's name>
}}

It should not be markdown or any other format. Only plain text.
"""

    return call_openai_api(
        prompt=prompt, model="gpt-4o", max_tokens=500, temperature=0.2, api_key=api_key
    )
