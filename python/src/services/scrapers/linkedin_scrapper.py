"""This module contains functions to fetch user's linkedin profile data from ScrapingDog, ScrapinIO and ProxyCurl."""

import os

import requests

from utils.logger import logger


def fetch_user_linkedin_scraping_dog(linkedin_username: str):
    """Fetch User's profile from ScrapingDog."""
    url = f"https://api.scrapingdog.com/linkedin/?api_key={os.getenv('SCRAPING_DOG_API_KEY')}&type=profile&linkId={linkedin_username}&private=false"
    try:
        response = requests.get(url, timeout=int(os.getenv("EXTERNAL_API_TIMEOUT")))
        response.raise_for_status()
        data = response.json()[0]
        linkedin_data_raw = {
            "first_name": data.get("first_name", None),
            "last_name": data.get("last_name", None),
            "full_name": f"{data.get('first_name', '')} {data.get('last_name', '')}".strip()
            or None,
            "occupation": data.get("headline", None),
            "headline": data.get("headline", None),
            "location": data.get("location", None),
            "about": data.get("about", None),
            "country": None,
            "country_full_name": None,
            "city": None,
            "state": None,
            "skills": data.get("skills", None),
            "experience": data.get("experience", None),
            "education": data.get("education", None),
            "languages_and_proficiencies": data.get("languages", None),
            "accomplishment_organisations": None,
            "accomplishment_publications": data.get("publications", None),
            "accomplishment_honors_awards": data.get("awards", None),
            "accomplishment_courses": data.get("courses", None),
            "accomplishment_patents": None,
            "accomplishment_projects": data.get("projects", None),
            "accomplishment_test_scores": None,
            "volunteer_work": data.get("activities", None),
            "recommendations": None,
            "certifications": None,
            "activities": data.get("activities", None),
            "articles": None,
            "industry": None,
            "extra": None,
            "interests": None,
        }
        return linkedin_data_raw
    except requests.RequestException as e:
        logger.error(f"Error from Scraping Dog: {e}")
        return None


def fetch_user_linkedin_scrapin_io(linkedin_username: str):
    """Fetch User's profile from ScrapinIO."""
    url = f"https://api.scrapin.io/enrichment/profile/?apikey={os.getenv('SCRAPIN_IO_API_KEY')}&linkedInUrl=https%3A%2F%2Flinkedin.com%2Fin%2F{linkedin_username}"
    try:
        response = requests.get(url, timeout=int(os.getenv("EXTERNAL_API_TIMEOUT")))
        if response.status_code != 200:
            logger.error(f"Error from ScrapinIO: {response.text}")
            return None
        data = response.json()
        profile = data.get("person", {})
        company = profile.get("company", {})

        linkedin_data_raw = {
            "first_name": profile.get("firstName", None),
            "last_name": profile.get("lastName", None),
            "full_name": f"{profile.get('firstName', '')} {profile.get('lastName', '')}".strip()
            or None,
            "occupation": profile.get("headline", None),
            "headline": profile.get("headline", None),
            "location": profile.get("location", None),
            "about": profile.get("summary", None),
            "country": None,
            "country_full_name": None,
            "city": None,
            "state": None,
            "skills": profile.get("skills", None),
            "experience": profile.get("positions", None),
            "education": profile.get("schools", None),
            "languages_and_proficiencies": profile.get("languages", None),
            "accomplishment_organisations": None,
            "accomplishment_publications": None,
            "accomplishment_honors_awards": None,
            "accomplishment_courses": None,
            "accomplishment_patents": None,
            "accomplishment_projects": None,
            "accomplishment_test_scores": None,
            "volunteer_work": profile.get("volunteeringExperiences", None),
            "recommendations": None,
            "certifications": profile.get("certifications", None),
            "activities": profile.get("volunteeringExperiences", None),
            "articles": None,
            "industry": company.get("industry", None),
            "extra": {
                "current_company": {
                    "name": company.get("name", None),
                    "description": company.get("description", None),
                    "industry": company.get("industry", None),
                    "specialities": company.get("specialities", None),
                }
            }
            if company
            else None,
            "interests": None,
        }
        return linkedin_data_raw
    except requests.RequestException as e:
        logger.error(f"Error from ScrapinIO: {e}")
        return None


def fetch_user_linkedin_proxy_curl(linkedin_username: str):
    """Fetch User's profile from ProxyCurl."""
    return {
        "public_identifier": "umairjibran",
        "profile_pic_url": "https://media.licdn.com/dms/image/v2/D4D03AQGvsnc3Ln7_Pg/profile-displayphoto-shrink_800_800/profile-displayphoto-shrink_800_800/0/1724873332287?e=1746057600&v=beta&t=Xrnh9h4XKbbjQPm2r5eMVf0OhgVKQA65rkArWumqekI",
        "background_cover_image_url": "https://media.licdn.com/dms/image/v2/D4D16AQF3UO_ayhQILQ/profile-displaybackgroundimage-shrink_350_1400/profile-displaybackgroundimage-shrink_350_1400/0/1716025521725?e=1746057600&v=beta&t=FwSNfBMrH3urMv-jftjn6tjYwvk8BHOHiF0tAWeKRM8",
        "first_name": "Umair",
        "last_name": "Jibran",
        "full_name": "Umair Jibran",
        "follower_count": 1817,
        "occupation": "Senior Backend Engineer at Productbox",
        "headline": "Software Engineer | Serverless | AWS | NodeJS | Typescript | Microservices | SQL & NoSQL | Caching Systems | Docker | Kubernetes",
        "summary": "As an experienced software engineer, I specialize in serverless computing, AWS, Node.js, TypeScript, and microservices. With a solid track record in leading teams and driving projects that enhance the robustness and scalability of web applications, I thrive in dynamic environments where effective communication and collaboration are key.\n\nAt Productbox, I've had the privilege of growing from an Associate Full Stack Engineer to my current role as Backend Tech Lead. Here, I've led two teams, consistently delivering high-quality solutions and improving the overall performance of our applications. My expertise spans across various technologies including Git, SQL, NoSQL, Docker, and Kubernetes, with a strong focus on cloud services like AWS.\n\nI'm passionate about creating scalable and fault-tolerant applications, always aiming to stay ahead in the ever-evolving tech landscape. Agile methodologies and client communication are integral to my approach, ensuring that projects are executed smoothly and efficiently.\n\nLooking ahead, I'm eager to take my skills to the next level in Europe or North America. I aim to contribute to innovative projects that leverage emerging technologies, continuously enhancing my expertise in serverless computing, microservices architecture, and cloud technologies.\n\nBeyond the tech realm, I enjoy hiking, playing chess, cycling, and diving deep into the world of Game of Thrones. These interests not only keep me grounded but also fuel my creativity and problem-solving skills.\n\nIf you're looking for a dedicated and adaptable engineer with a passion for innovation and a knack for effective teamwork, let's connect. I'm excited about the possibility of contributing to a forward-thinking team and making a meaningful impact.",
        "country": "PK",
        "country_full_name": "Pakistan",
        "city": "Peshawar District",
        "state": "Khyber Pakhtunkhwa",
        "experiences": [
            {
                "starts_at": {"day": 1, "month": 2, "year": 2024},
                "ends_at": None,
                "company": "Productbox",
                "company_linkedin_profile_url": "https://www.linkedin.com/company/productbox/",
                "company_facebook_profile_url": None,
                "title": "Senior Backend Engineer",
                "description": "+ Designed a scalable backend capable of handling thousands of concurrent users, with the ability to scale further as needed.\n+ Coordinated 3+ stakeholder meetings to clarify specifications, enabling the UI/UX team to develop 20+ refined mock-ups; accelerated the project timeline by 30% and enhanced user satisfaction in preliminary feedback sessions.\n+ Organized and led backlog grooming sessions, improving task completion rates by 90% and reducing project delays by over 75%.\n+ Optimized query and database schemas to decrease response time by over 60%.\n+ Proposed and implemented a robust event-driven system with AWS tools, enabling seamless integration for backend processes; streamlined data handling for 1,000+ transactions daily, improving processing speed by 25%.",
                "location": "Peshawar, Khyber Pakhtunkhwa, Pakistan",
                "logo_url": "https://s3.us-west-000.backblazeb2.com/proxycurl/company/productbox/profile?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=0004d7f56a0400b0000000001%2F20250301%2Fus-west-000%2Fs3%2Faws4_request&X-Amz-Date=20250301T102844Z&X-Amz-Expires=1800&X-Amz-SignedHeaders=host&X-Amz-Signature=db18c17bdebd150792a96cafd00c2f006b4a34fedc318c61981fb285187531c7",
            },
            {
                "starts_at": {"day": 1, "month": 5, "year": 2021},
                "ends_at": {"day": 29, "month": 2, "year": 2024},
                "company": "Productbox",
                "company_linkedin_profile_url": "https://www.linkedin.com/company/productbox/",
                "company_facebook_profile_url": None,
                "title": "Full Stack Engineer",
                "description": "As a Full Stack Engineer at Productbox, I contributed to different projects, enhancing web applications, and making them more robust, fault-tolerant, and scalable. Some of the activities include:\n+ Migrated from JavaScript to TypeScript, reducing runtime errors to near zero and significantly improving code reliability.\n+ Built a web and cross-platform mobile app with E2E encryption using RSA-2048 + AES 256, eventually adding facial recognition capabilities.\n+ Engineered secure serverless functions for API calls, resulting in a 40% faster transaction processing time and achieving compliance with industry-standard encryption protocols to ensure bank-grade security for all user transactions.\n+ Created a fully automated deployment strategy leveraging Docker and Kubernetes, resulting in a streamlined release process that decreased deployment times by 75%, allowing for 20+ production updates weekly with minimal disruption.",
                "location": "Peshawar, Pakistan",
                "logo_url": "https://s3.us-west-000.backblazeb2.com/proxycurl/company/productbox/profile?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=0004d7f56a0400b0000000001%2F20250301%2Fus-west-000%2Fs3%2Faws4_request&X-Amz-Date=20250301T102844Z&X-Amz-Expires=1800&X-Amz-SignedHeaders=host&X-Amz-Signature=db18c17bdebd150792a96cafd00c2f006b4a34fedc318c61981fb285187531c7",
            },
            {
                "starts_at": {"day": 1, "month": 5, "year": 2024},
                "ends_at": {"day": 30, "month": 9, "year": 2024},
                "company": "Luminary",
                "company_linkedin_profile_url": "https://www.linkedin.com/company/lumincan/",
                "company_facebook_profile_url": None,
                "title": "Back End Developer",
                "description": "+ Transformed architecture for a Data Management System similar to that of GoogleDrive and OneDrive, using S3 as its data storage with infinite folders and sub-folders.\n+ Enhanced the already active code base by refactoring the bloated controllers, and process in parallel where possible to decrease the response time by over 50% in all the APIs, resulting in smooth user experience.\n+ Engineered a solution to offload critical services into a dedicated microservice architecture, resulting in improved system scalability and reducing overall latency by over 30%, leading to a smoother user experience.",
                "location": "Ontario, Canada",
                "logo_url": "https://media.licdn.com/dms/image/v2/D560BAQEzchMU2q2OKw/company-logo_400_400/company-logo_400_400/0/1699993996003/lumincan_logo?e=1749081600&v=beta&t=HsMmsCPFQDANFoysxDRKnKc4ZDkfxoVdGAYCtZbAmJ8",
            },
            {
                "starts_at": {"day": 1, "month": 8, "year": 2020},
                "ends_at": {"day": 30, "month": 11, "year": 2020},
                "company": "IdeoMetriX",
                "company_linkedin_profile_url": "https://www.linkedin.com/company/ideometrix/",
                "company_facebook_profile_url": None,
                "title": "Mobile Application Developer",
                "description": "I was responsible for Mobile Development using the Flutter framework. I also performed my duties as caretaker-TeamLead in the absence of our Team Lead.",
                "location": "Islāmābād, Pakistan",
                "logo_url": "https://s3.us-west-000.backblazeb2.com/proxycurl/company/ideometrix/profile?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=0004d7f56a0400b0000000001%2F20250301%2Fus-west-000%2Fs3%2Faws4_request&X-Amz-Date=20250301T102844Z&X-Amz-Expires=1800&X-Amz-SignedHeaders=host&X-Amz-Signature=34ea68981d1781f5762427efcc81b9236f2fc3e4549191936f37a179b25a920a",
            },
        ],
        "education": [
            {
                "starts_at": {"day": 1, "month": 9, "year": 2017},
                "ends_at": {"day": 30, "month": 11, "year": 2021},
                "field_of_study": "Computer Science",
                "degree_name": "Bachelor of Science - BS",
                "school": "City University of Science and Information Technology",
                "school_linkedin_profile_url": "https://www.linkedin.com/school/city-university-of-science-and-information-technology/",
                "school_facebook_profile_url": None,
                "description": None,
                "logo_url": "https://media.licdn.com/dms/image/v2/C4D0BAQE4BAYbCo-7RA/company-logo_400_400/company-logo_400_400/0/1630455142483/city_university_of_science_and_information_technology_logo?e=1749081600&v=beta&t=pE37srsbpX6J1MVTGxbsaZN0OJJXWhNW542DITVxJOI",
                "grade": "3.29",
                "activities_and_societies": "Microsoft Student Ambassador, Organisation Society, Literary society",
            },
            {
                "starts_at": {"day": 1, "month": 12, "year": 2020},
                "ends_at": {"day": 28, "month": 2, "year": 2021},
                "field_of_study": "Interpersonal and Social Skills",
                "degree_name": "Career Prep Fellowship",
                "school": "Amal Academy",
                "school_linkedin_profile_url": "https://www.linkedin.com/school/amalacademy/",
                "school_facebook_profile_url": None,
                "description": None,
                "logo_url": "https://s3.us-west-000.backblazeb2.com/proxycurl/company/amalacademy/profile?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=0004d7f56a0400b0000000001%2F20250301%2Fus-west-000%2Fs3%2Faws4_request&X-Amz-Date=20250301T102844Z&X-Amz-Expires=1800&X-Amz-SignedHeaders=host&X-Amz-Signature=a0aa275a9c9d3e16392d4e6754d6c0c104158fea93cf7487abd7fb3c092b32bd",
                "grade": "A",
                "activities_and_societies": "Investing 150 hours to develop business skills (e.g., communication, leadership,\nproblem-solving, teamwork, etc.) that will help me make a deeper impact on the job",
            },
        ],
        "languages": ["English", "German", "Pushto", "Urdu"],
        "languages_and_proficiencies": [
            {"name": "English", "proficiency": "FULL_PROFESSIONAL"},
            {"name": "German", "proficiency": "ELEMENTARY"},
            {"name": "Pushto", "proficiency": "NATIVE_OR_BILINGUAL"},
            {"name": "Urdu", "proficiency": "NATIVE_OR_BILINGUAL"},
        ],
        "accomplishment_organisations": [],
        "accomplishment_publications": [],
        "accomplishment_honors_awards": [
            {
                "title": "Microsoft Learn Student Ambassador",
                "issuer": "Microsoft",
                "issued_on": None,
                "description": "Learn Student Ambassadors are a global group of campus leaders who are eager to help fellow students, create robust tech communities and develop technical and career skills for the future.\n\nAcknowledgement Certificate: https://1drv.ms/b/s!Ai_-6mn5ZmGZgYkE656uLNpF7yeKeg?e=9ozQkf",
            }
        ],
        "accomplishment_patents": [],
        "accomplishment_courses": [],
        "accomplishment_projects": [
            {
                "starts_at": {"day": 1, "month": 1, "year": 2025},
                "ends_at": {"day": 31, "month": 1, "year": 2025},
                "title": "FinHub",
                "description": None,
                "url": None,
            },
            {
                "starts_at": {"day": 1, "month": 1, "year": 2023},
                "ends_at": {"day": 31, "month": 1, "year": 2023},
                "title": "Tameer Foundation Pakistan",
                "description": None,
                "url": None,
            },
            {
                "starts_at": {"day": 1, "month": 5, "year": 2021},
                "ends_at": {"day": 31, "month": 10, "year": 2023},
                "title": "Mavencery",
                "description": None,
                "url": None,
            },
            {
                "starts_at": {"day": 1, "month": 7, "year": 2021},
                "ends_at": {"day": 31, "month": 10, "year": 2023},
                "title": "meraID",
                "description": None,
                "url": None,
            },
            {
                "starts_at": {"day": 1, "month": 4, "year": 2023},
                "ends_at": {"day": 31, "month": 5, "year": 2023},
                "title": "Alpha",
                "description": 'It is a browser extension that makes it harder for the user to access the sites that they themselves have blacklisted. The concept discussed here is based on the book "Atomic Habits" by James Clear. In the book, the author presents a rule for breaking a habit which suggests making it challenging to continue the habit. This means adding obstacles or barriers that make it challenging for individuals to engage in the habit. By doing so, people can reduce the likelihood of engaging in the habit and eventually break free from it. This solution is effective because it requires individuals to be intentional and try to overcome the barriers, thus making it harder to fall back into the habit. In summary, the idea is to make it challenging to continue a habit in order to eliminate it entirely.',
                "url": None,
            },
            {
                "starts_at": {"day": 1, "month": 8, "year": 2021},
                "ends_at": {"day": 30, "month": 9, "year": 2022},
                "title": "Realtime Chat",
                "description": None,
                "url": None,
            },
            {
                "starts_at": {"day": 1, "month": 10, "year": 2020},
                "ends_at": {"day": 31, "month": 8, "year": 2021},
                "title": "MSP-CUIST Website",
                "description": None,
                "url": None,
            },
            {
                "starts_at": {"day": 1, "month": 3, "year": 2021},
                "ends_at": {"day": 31, "month": 5, "year": 2021},
                "title": "MondoQ",
                "description": None,
                "url": None,
            },
            {
                "starts_at": {"day": 1, "month": 1, "year": 2021},
                "ends_at": {"day": 31, "month": 3, "year": 2021},
                "title": "Drive Safe Medicals",
                "description": None,
                "url": None,
            },
        ],
        "accomplishment_test_scores": [],
        "volunteer_work": [
            {
                "starts_at": {"day": 1, "month": 8, "year": 2020},
                "ends_at": {"day": 30, "month": 11, "year": 2021},
                "title": "Student Ambassador",
                "cause": "EDUCATION",
                "company": "Microsoft",
                "company_linkedin_profile_url": "https://www.linkedin.com/company/microsoft/",
                "description": None,
                "logo_url": "https://media.licdn.com/dms/image/v2/C560BAQE88xCsONDULQ/company-logo_400_400/company-logo_400_400/0/1630652622688/microsoft_logo?e=1749081600&v=beta&t=5YvAwKBaRqqwN0byTrHOfPfx-EKoLbAzA79oOCUCGHg",
            },
            {
                "starts_at": {"day": 1, "month": 8, "year": 2024},
                "ends_at": None,
                "title": "Corporate Advisor",
                "cause": "EDUCATION",
                "company": "Institute of Management Sciences Peshawar (Official)",
                "company_linkedin_profile_url": "https://www.linkedin.com/company/imsciencesofficial/",
                "description": "During the first meeting I and along with other with other industry leaders collaborated to provide strategic guidance and insights to IMSciences.\nWe in an open discussion broke down and updated the curriculum that contribute to skills development for new graduates, ensuring market relevance and competitiveness",
                "logo_url": "https://media.licdn.com/dms/image/v2/C4D0BAQFI0_HJDH8_dQ/company-logo_400_400/company-logo_400_400/0/1676352985843?e=1749081600&v=beta&t=zHHxglYAIuUKR3HIKsRiZwBKZhFhcAYmLPuPLCVyWUU",
            },
            {
                "starts_at": {"day": 1, "month": 1, "year": 2021},
                "ends_at": {"day": 28, "month": 2, "year": 2021},
                "title": "Fundraising Volunteer",
                "cause": "SOCIAL_SERVICES",
                "company": "ABDUL SATTAR EDHI INTERNATIONAL FOUNDATION INC",
                "company_linkedin_profile_url": "https://www.linkedin.com/company/abdul-sattar-edhi-international-foundation-inc/",
                "description": "Raising Fund for Edhi Foundation, We have raised 9400 PKR as of January 2021",
                "logo_url": None,
            },
            {
                "starts_at": {"day": 1, "month": 1, "year": 2021},
                "ends_at": {"day": 31, "month": 5, "year": 2021},
                "title": "Collections Supervisor - Peshawar",
                "cause": "EDUCATION",
                "company": "Amal Academy",
                "company_linkedin_profile_url": "https://www.linkedin.com/school/amalacademy/",
                "description": "We decided to collect books to donate to those children who can not afford to purchase them and end up quitting. Our goal is to continue and spread around Pakistan, currently, we are in Peshawar and Islamabad. And have collected over 400 Books as of February, 2021, where a small portion of it was sent to Chughtai Library, Lahore, and the other half has been donated to Read Foundation, Islamabad.",
                "logo_url": "https://media.licdn.com/dms/image/v2/D560BAQER86qjsQZLHg/company-logo_400_400/company-logo_400_400/0/1728049664800/amalacademy_logo?e=1749081600&v=beta&t=g_JLZTKbRYz8CGmfPN94Tklg5j9ehlLkx7-tjFwSyNk",
            },
        ],
        "certifications": [
            {
                "starts_at": {"day": 1, "month": 11, "year": 2024},
                "ends_at": {"day": 30, "month": 11, "year": 2027},
                "name": "GitHub Foundations",
                "license_number": None,
                "display_source": "credly.com",
                "authority": "GitHub",
                "url": "https://www.credly.com/badges/ddb40bee-1063-4016-838a-f3523a871b77/",
            },
            {
                "starts_at": {"day": 1, "month": 5, "year": 2024},
                "ends_at": None,
                "name": "Career Essentials in GitHub Professional Certificate",
                "license_number": None,
                "display_source": "linkedin.com",
                "authority": "GitHub",
                "url": "https://www.linkedin.com/learning/certificates/31730ef964d7a5a0dab3e99aebb23fd09cee62056b40a578d6c03f67b4e7cc6a?trk=flagship-lil_details_mobile_certification",
            },
            {
                "starts_at": {"day": 1, "month": 5, "year": 2024},
                "ends_at": None,
                "name": "Practical GitHub Actions",
                "license_number": None,
                "display_source": "linkedin.com",
                "authority": "LinkedIn",
                "url": "https://www.linkedin.com/learning/certificates/eeca0dc4d823dc4da267aeacaab35a248ac73a7523edc1c5e354857af666577f?trk=flagship-lil_details_mobile_certification",
            },
            {
                "starts_at": {"day": 1, "month": 3, "year": 2024},
                "ends_at": None,
                "name": "Application Development using Microservices and Serverless ",
                "license_number": "2Q3NLX6DYAQD",
                "display_source": "coursera.org",
                "authority": "IBM",
                "url": "https://www.coursera.org/account/accomplishments/records/2Q3NLX6DYAQD",
            },
            {
                "starts_at": {"day": 1, "month": 2, "year": 2024},
                "ends_at": None,
                "name": "Introduction to Containers w/ Docker, Kubernetes & OpenShift",
                "license_number": "M3MKVQ7YPH2P",
                "display_source": "coursera.org",
                "authority": "IBM",
                "url": "https://www.coursera.org/account/accomplishments/records/M3MKVQ7YPH2P",
            },
            {
                "starts_at": {"day": 1, "month": 9, "year": 2020},
                "ends_at": None,
                "name": "Learning Node.js",
                "license_number": None,
                "display_source": "linkedin.com",
                "authority": "LinkedIn",
                "url": "https://www.linkedin.com/learning/certificates/5dce5ce72778f33b1b2edd158122d19211792ffb0810edf3ceb89fab77becf78?trk=backfilled_certificate",
            },
            {
                "starts_at": None,
                "ends_at": None,
                "name": "Introduction to Microsoft Azure Cloud Services",
                "license_number": "ENALXR9C9GDH",
                "display_source": "coursera.org",
                "authority": "Coursera",
                "url": "https://www.coursera.org/account/accomplishments/certificate/ENALXR9C9GDH",
            },
        ],
        "connections": 500,
        "people_also_viewed": [
            {
                "link": "https://www.linkedin.com/in/khadijasaleem",
                "name": "Khadija Saleem",
                "summary": "Tech Lead | Full Stack Engineer at Productbox",
                "location": None,
            },
            {
                "link": "https://www.linkedin.com/in/waleed-waseem-2b625270",
                "name": "Waleed Waseem",
                "summary": "Converting your AI/ML visions into reality | Founder and CEO at Productbox",
                "location": None,
            },
            {
                "link": "https://www.linkedin.com/in/saifcodes",
                "name": "Saif Ullah Sajid",
                "summary": "Staff iOS Engineer @ HEINI - Founder @ TPT",
                "location": None,
            },
            {
                "link": "https://www.linkedin.com/in/itsfaisaltahir",
                "name": "Faisal Tahir",
                "summary": "Engineering Manager",
                "location": None,
            },
            {
                "link": "https://www.linkedin.com/in/muhammad-bakht-biland-219328215",
                "name": "Muhammad Bakht Biland",
                "summary": "Software Engineer | Flutter | React Native | Nodejs | MySQL | AWS",
                "location": None,
            },
            {
                "link": "https://www.linkedin.com/in/abdulmoeed",
                "name": "Abdul Moeed",
                "summary": "Data Architect | AWS Certified Architect | Azure Certified | Snowflake | GCP | DWH",
                "location": None,
            },
            {
                "link": "https://www.linkedin.com/in/ahamzatariq",
                "name": "Ameer Hamza Tariq",
                "summary": "Product Designer",
                "location": None,
            },
            {
                "link": "https://www.linkedin.com/in/hiragul",
                "name": "Hira Gul",
                "summary": "Software Engineer | Flutter | Dart | Responsive UI | Firebase | Mysql | Third party libraries and Api's Integration | Bloc .Cubit. Getx | MVC .MVVM",
                "location": None,
            },
            {
                "link": "https://www.linkedin.com/in/musa22",
                "name": "Muhammad Musa",
                "summary": "Software Engineer | Flutter Developer | Mobile Developer",
                "location": None,
            },
            {
                "link": "https://www.linkedin.com/in/zakirbangash",
                "name": "Zakir Bangash",
                "summary": "Software Engineer @Productbox React Native TS | React TS | Node | Firebase Cloud Functions",
                "location": None,
            },
        ],
        "recommendations": [],
        "activities": [],
        "similarly_named_profiles": [
            {
                "name": "Mohammed Umair Jibran",
                "link": "https://ca.linkedin.com/in/mohammed-umair-jibran-212346233",
                "summary": "Student at Marc Garneau Collegiate Institute",
                "location": "Toronto, ON",
            },
            {
                "name": "Umair Jibran",
                "link": "https://in.linkedin.com/in/umair-jibran-939716189",
                "summary": "Sales Manager at Pharma Logistics",
                "location": "Jammu e Kashmir (Stato), India",
            },
            {
                "name": "Umair jibran",
                "link": "https://pk.linkedin.com/in/umair-jibran-56b9b073",
                "summary": "Drilling Fluids Engineer at Halliburton",
                "location": "Pakistan",
            },
            {
                "name": "Umair Jibran",
                "link": "https://pk.linkedin.com/in/umair-jibran-584410114",
                "summary": "Nill at (none)",
                "location": "Peshawar District",
            },
        ],
        "articles": [],
        "groups": [],
        "skills": [],
        "inferred_salary": None,
        "gender": None,
        "birth_date": None,
        "industry": None,
        "extra": None,
        "interests": [],
        "personal_emails": [],
        "personal_numbers": [],
    }
    api_key = os.getenv("PROXY_CURL_API_KEY")
    headers = {"Authorization": "Bearer " + api_key}
    api_endpoint = "https://nubela.co/proxycurl/api/v2/linkedin"
    params = {"linkedin_profile_url": f"https://linkedin.com/in/{linkedin_username}/"}
    try:
        response = requests.get(
            api_endpoint,
            params=params,
            headers=headers,
            timeout=int(os.getenv("EXTERNAL_API_TIMEOUT")),
        )
        if response.status_code != 200:
            logger.error(f"Error from Proxy Curl: {response.text}")
            return None
        profile = response.json()
        linkedin_data_raw = {
            "first_name": profile.get("first_name", None),
            "last_name": profile.get("last_name", None),
            "full_name": profile.get("full_name", None),
            "occupation": profile.get("occupation", None),
            "headline": profile.get("headline", None),
            "location": profile.get("location", None),
            "about": profile.get("summary", None),
            "country": profile.get("country", None),
            "country_full_name": profile.get("country_full_name", None),
            "city": profile.get("city", None),
            "state": profile.get("state", None),
            "skills": profile.get("skills", None),
            "experience": profile.get("experiences", None),
            "education": profile.get("education", None),
            "languages_and_proficiencies": profile.get(
                "languages_and_proficiencies", None
            ),
            "accomplishment_organisations": profile.get(
                "accomplishment_organisations", None
            ),
            "accomplishment_publications": profile.get(
                "accomplishment_publications", None
            ),
            "accomplishment_honors_awards": profile.get(
                "accomplishment_honors_awards", None
            ),
            "accomplishment_courses": profile.get("accomplishment_courses", None),
            "accomplishment_patents": profile.get("accomplishment_patents", None),
            "accomplishment_projects": profile.get("accomplishment_projects", None),
            "accomplishment_test_scores": profile.get(
                "accomplishment_test_scores", None
            ),
            "volunteer_work": profile.get("volunteer_work", None),
            "recommendations": profile.get("recommendations", None),
            "certifications": profile.get("certifications", None),
            "activities": profile.get("activities", None),
            "articles": profile.get("articles", None),
            "industry": profile.get("industry", None),
            "extra": profile.get("extra", None),
            "interests": profile.get("interests", None),
        }
        return linkedin_data_raw
    except requests.RequestException as e:
        logger.error(f"Error from ScrapinIO: {e}")
        return None


def fetch_user_linkedin(linkedin_username: str):
    """Fetch User's profile from ScrapingDog or ScrapinIO."""
    linkedin_data = fetch_user_linkedin_scraping_dog(linkedin_username)
    if linkedin_data is None:
        linkedin_data = fetch_user_linkedin_scrapin_io(linkedin_username)
    if linkedin_data is None:
        linkedin_data = fetch_user_linkedin_proxy_curl(linkedin_username)
    return linkedin_data if linkedin_data else None
