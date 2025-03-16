"""Example script showing how to invoke the PDF processor locally."""

import json
from handlers.process_pdf_creator import local_invoke

def main():
    # Example message that mimics the structure of what would come from SQS
    test_message = {
        "jobDetails": {
            "title": "Software Engineer"
        },
        "applicantDetails": {
            "firstName": "John",
            "lastName": "Doe"
        },
        "resume": [
            "Professional Summary",
            "Work Experience",
            "Education"
        ],
        "coverLetter": "Dear Hiring Manager...",
        "path": "test-documents",
        "callbackUrl": "http://localhost:3000/callback"
    }
    
    # You can pass either a dict or a JSON string
    result = local_invoke(test_message)
    print("Processing Result:", json.dumps(result, indent=2))
    
    # Example with JSON string
    result = local_invoke(json.dumps(test_message))
    print("\nProcessing Result (from JSON string):", json.dumps(result, indent=2))

if __name__ == "__main__":
    main() 