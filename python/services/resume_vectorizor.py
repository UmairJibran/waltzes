from sentence_transformers import SentenceTransformer


model = SentenceTransformer('all-MiniLM-L6-v2')


def segment_cv(text):
    sections = [section.strip() for section in text.split("\n\n") if section]
    sentences = []
    for section in sections:
        sentences.extend([sentence.strip()
                         for sentence in section.split(". ") if sentence])

    return sentences


def vectorize_resume():
    try:
        with open("resume.txt", "r") as f:
            text = f.read()
            segmented_text = segment_cv(text)
            resume_segments = [segmented_text]
            resume_vectors = model.encode(resume_segments)
            return resume_vectors, resume_segments
    except FileNotFoundError:
        return "resume.txt file not found."
