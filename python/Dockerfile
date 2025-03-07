FROM python:3.12.9-slim

# Set working directory
WORKDIR /app

# Copy only the requirements files first to leverage Docker cache
COPY pyproject.toml ./

# Install build dependencies and project
RUN pip install --no-cache-dir build pip setuptools wheel \
    && pip install --no-cache-dir -e .[cli]

# Copy the source code
COPY src/ ./src/

# Set environment variables
ENV PYTHONPATH=/app:$PYTHONPATH \
    PYTHONUNBUFFERED=1

# Run the application
CMD ["python", "src/poll_linkedin_scraper_queue.py"]
