from sentence_transformers import SentenceTransformer


model = SentenceTransformer("all-MiniLM-L6-v2")


def vectorize_resume():
    resume_segments = [
        # Professional Summary
        "Full Stack Engineer with 4+ years of experience in building scalable software solutions for early-stage startups. Optimized API performance, reducing latency by 50%, proficient in Node.js, ReactJS, AWS, and cloud infrastructure.",
        # Skills
        "Technologies: Node.js, Serverless, RESTful APIs, ReactJS, NEXT, JEST, Socket.io",
        "Databases: MySQL, DynamoDB, Firestore, MongoDB, CassandraDB",
        "Cloud Infrastructure: Amazon Web Services, Apache Web Services",
        "Supporting Tools: Figma, Git, GitHub, Swagger, WordPress",
        # Experience
        "Engineering Lead, Productbox — Feb 2024 – Present: Designed a scalable backend for thousands of concurrent users, accelerated project timelines, optimized query/database schemas, proposed an event-driven system using AWS.",
        "Fullstack Engineer, Productbox — May 2021 – Feb 2024: Migrated from JavaScript to TypeScript, built secure web/mobile apps, developed serverless functions, created automated deployment strategies using Docker and Kubernetes.",
        "Backend Consultant, Summit (Remote) — May 2024 – Sep 2024: Refactored codebase for data management architecture, improved API response time by 50%, offloaded critical services to microservice architecture for better scalability.",
        # Projects
        "PuppyDog (USA): Collaborated on a tool for customized product demos.",
        "Afterwork (USA): Lead development for planning large events.",
        "Upptik (USA): Built web/mobile app guiding students in college applications.",
        "meraID (Pakistan): Developed a secure digital identity solution.",
        "Mavencery (Pakistan): Online grocery shopping platform.",
        "MondoQ (Germany): Vehicle parts inventory management system.",
        "Drive Safe Medicals (UK): Scheduling platform for public transport drivers.",
        "Summit (Canada): Platform for managing engineering inspections.",
        # Volunteer Work
        "Student Ambassador, Microsoft (Peshawar, Pakistan) — Aug 2020 – Dec 2021",
        "Tech Consultant, Tameer Foundation Pakistan (Peshawar, Pakistan) — Aug 2022 – Present",
        # Education
        "City University, Bachelors in Computer Science — Peshawar, Pakistan (Dec 2021)",
    ]

    resume_vectors = model.encode(resume_segments)
    return resume_vectors, resume_segments
