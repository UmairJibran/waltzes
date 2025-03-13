FROM python:3.12-slim

WORKDIR /app

RUN pip install --no-cache-dir poetry

COPY pyproject.toml poetry.lock* ./

RUN poetry config virtualenvs.create false && poetry install --no-interaction --no-ansi --no-root

COPY src /app/src

RUN chmod +x src/*.py

ENTRYPOINT ["python"]
