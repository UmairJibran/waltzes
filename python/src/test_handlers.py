"""Test script for simulating SQS messages for all handlers."""

import json
import os
from typing import Any, Dict

from dotenv import load_dotenv

from handlers.process_cover_letter_creator import local_invoke as cover_letter_invoke
from handlers.process_job_scraper import local_invoke as job_invoke
from handlers.process_linkedin_scraper import local_invoke as linkedin_invoke
from handlers.process_pdf_creator import local_invoke as pdf_invoke
from handlers.process_resume_creator import local_invoke as resume_invoke

load_dotenv()

def test_pdf_creator():
    """Test the PDF creator handler."""
    test_message = {
        "jobDetails": {
            "title": "Software Engineer",
            "companyName": "Test Company"
        },
        "applicantDetails": {
            "firstName": "John",
            "lastName": "Doe",
            "email": "john@example.com"
        },
        "resume": {
            "name": "John Doe",
            "contact": [
                "john@example.com",
                "+1234567890",
                "linkedin.com/in/johndoe"
            ],
            "experience": [
                {
                    "title": "Senior Software Engineer",
                    "company": "Previous Company",
                    "location": "Remote",
                    "date": "2020 - Present",
                    "description": [
                        "Led development of microservices architecture",
                        "Improved system performance by 50%"
                    ]
                }
            ],
            "education": [
                {
                    "title": "Bachelor of Science in Computer Science",
                    "institute": "Test University",
                    "location": "Test City",
                    "date": "2016 - 2020",
                    "description": ["GPA: 3.8"]
                }
            ],
            "skills": ["Python", "AWS", "Microservices"]
        },
        "coverLetter": "Dear Hiring Manager,\n\nI am writing to express my interest...",
        "path": "test/documents",
        "callbackUrl": "http://localhost:3000/callback"
    }
    
    result = pdf_invoke(test_message)
    print("\nPDF Creator Test Result:", json.dumps(result, indent=2))

def test_job_scraper():
    """Test the job scraper handler."""
    test_message = {
        "url": "https://example.com/job/123",
        "callbackUrl": "http://localhost:3000/callback"
    }
    
    result = job_invoke(test_message)
    print("\nJob Scraper Test Result:", json.dumps(result, indent=2))

def test_linkedin_scraper():
    """Test the LinkedIn scraper handler."""
    test_message = {
        "url": "https://linkedin.com/jobs/view/123",
        "callbackUrl": "http://localhost:3000/callback"
    }
    
    result = linkedin_invoke(test_message)
    print("\nLinkedIn Scraper Test Result:", json.dumps(result, indent=2))

def test_resume_creator():
    """Test the resume creator handler."""
    test_message = {
        "jobDetails": {
            "title": "Software Engineer",
            "companyName": "Test Company"
        },
        "applicantDetails": {
            "firstName": "John",
            "lastName": "Doe"
        },
        "path": "test/documents"
    }
    
    result = resume_invoke(test_message)
    print("\nResume Creator Test Result:", json.dumps(result, indent=2))

def test_cover_letter_creator():
    """Test the cover letter creator handler."""
    test_message = {
        "jobDetails": {
            "title": "Software Engineer",
            "companyName": "Test Company",
            "description": "We are looking for a talented software engineer..."
        },
        "applicantDetails": {
            "firstName": "John",
            "lastName": "Doe",
            "experience": "5 years of software development experience..."
        },
        "path": "test/documents"
    }
    
    result = cover_letter_invoke(test_message)
    print("\nCover Letter Creator Test Result:", json.dumps(result, indent=2))

def main():
    """Run all handler tests."""
    print("Starting handler tests...")
    
    try:
        test_pdf_creator()
    except Exception as e:
        print("PDF Creator Test Failed:", str(e))
    
    try:
        test_job_scraper()
    except Exception as e:
        print("Job Scraper Test Failed:", str(e))
    
    try:
        test_linkedin_scraper()
    except Exception as e:
        print("LinkedIn Scraper Test Failed:", str(e))
    
    try:
        test_resume_creator()
    except Exception as e:
        print("Resume Creator Test Failed:", str(e))
    
    try:
        test_cover_letter_creator()
    except Exception as e:
        print("Cover Letter Creator Test Failed:", str(e))
    
    print("\nHandler tests completed.")

if __name__ == "__main__":
    main() 