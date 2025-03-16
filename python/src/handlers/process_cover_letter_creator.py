"""Handler for creating cover letters."""

import json
from typing import Any, Dict

from handlers.base_handler import BaseHandler
from services.llm.openai import call_openai_api
from services.llm.prompts import (
    system_prompt_cover_letter_writer,
    user_prompt_for_cover_letter_creation,
)
from utils import logger
from utils.utils import add_query_param, send_data_to_callback_url


class CoverLetterCreatorHandler(BaseHandler):
    """Handler for cover letter creation requests."""

    def process_message(self, message_body: Dict[str, Any]) -> Dict[str, Any]:
        """Process a single cover letter creation message.

        Args:
            message_body (Dict[str, Any]): The parsed message body containing job and applicant details

        Returns:
            Dict[str, Any]: Response containing the generated cover letter file path
        """
        logger.info(f"Processing cover letter creation request: {message_body}")

        job_details = message_body.get("jobDetails", {})
        applicant_details = message_body.get("applicantDetails", {})
        callback_url = message_body.get("callbackUrl")
        linkedin_data = applicant_details.get("linkedinScrapedData")
        job_skills_listed = job_details.get("skills")
        applicant_email = applicant_details.get("email")
        applicant_phone = applicant_details.get("phone")
        applicant_portfolio = applicant_details.get("portfolioUrl")
        applicant_github = applicant_details.get("githubUsername")
        applicant_linkedin = applicant_details.get("linkedinUsername")
        applicant_first_name = applicant_details.get("firstName")
        applicant_last_name = applicant_details.get("lastName")
        applicant_additional_instructions = applicant_details.get(
            "additionalInstructions"
        )

        applicatnt_details = message_body.get("applicantDetails")
        job_details = message_body.get("jobDetails")
        callback_url = message_body.get("callbackUrl")
        linkedin_data = applicatnt_details.get("linkedinScrapedData")
        job_skills_listed = job_details.get("skills")
        applicant_email = applicatnt_details.get("email")
        applicant_phone = applicatnt_details.get("phone")
        applicant_portfolio = applicatnt_details.get("portfolioUrl")
        applicant_github = applicatnt_details.get("githubUsername")
        applicant_linkedin = applicatnt_details.get("linkedinUsername")
        applicant_first_name = applicatnt_details.get("firstName")
        applicant_last_name = applicatnt_details.get("lastName")
        applicant_additional_instructions = applicatnt_details.get(
            "additionalInstructions"
        )

        start_notification_url = add_query_param(callback_url, "just-started", "true")
        send_data_to_callback_url({}, start_notification_url)

        logger.info(f"Applicant Details: {applicatnt_details}")
        logger.info(f"Job Details: {job_details}")
        logger.info(f"Callback URL: {callback_url}")
        logger.info(f"Linkedin Data: {linkedin_data}")
        logger.info(f"Job Skills: {job_skills_listed}")
        logger.info(f"Applicant Email: {applicant_email}")
        logger.info(f"Applicant Phone: {applicant_phone}")
        logger.info(f"Applicant Portfolio: {applicant_portfolio}")
        logger.info(f"Applicant Github: {applicant_github}")
        logger.info(f"Applicant LinkedIn: {applicant_linkedin}")
        logger.info(f"Applicant First Name: {applicant_first_name}")
        logger.info(f"Applicant Last Name: {applicant_last_name}")
        logger.info(
            f"Applicant Additional Instructions: {applicant_additional_instructions}"
        )

        # parse user prompt
        user_prompt = user_prompt_for_cover_letter_creation.format(
            user_linkedin_data=linkedin_data,
            job_details=job_details,
            additional_info=json.dumps(
                {
                    "email": applicant_email,
                    "phone": applicant_phone,
                    "portfolio": applicant_portfolio,
                    "github": applicant_github,
                    "linkedin": applicant_linkedin,
                    "firstName": applicant_first_name,
                    "lastName": applicant_last_name,
                    "additionalInstructions": applicant_additional_instructions,
                }
            ),
        )
        logger.info(f"""{user_prompt=}""")

        cover_letter = call_openai_api(
            prompt=user_prompt,
            model="gpt-4o",
            max_tokens=500,
            temperature=0.3,
            messages=[
                {"role": "system", "content": system_prompt_cover_letter_writer},
                {"role": "user", "content": user_prompt},
            ],
        )
        logger.critical(f"""{cover_letter=}""")
        send_data_to_callback_url(
            data={"content": cover_letter}, callback_url=callback_url
        )


handler_instance = CoverLetterCreatorHandler()
handler = handler_instance.handler
local_invoke = handler_instance.local_invoke
