from sklearn.metrics.pairwise import cosine_similarity
import numpy as np
from sentence_transformers import SentenceTransformer


model = SentenceTransformer("all-MiniLM-L6-v2")


def get_best_match_from_resume(job_description, resume_vectors, resume_segments):
    job_vector = model.encode([job_description])[0]

    similarities = cosine_similarity([job_vector], resume_vectors)

    best_match_idx = np.argmax(similarities)
    best_match_section = resume_segments[best_match_idx]

    return best_match_section or resume_segments[0]
