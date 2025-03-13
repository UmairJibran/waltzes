docker compose up localstack -d
sh localstack-resource-creator.bash
docker compose up --build -d