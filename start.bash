docker compose up localstack -d
sleep 5
sh localstack-resource-creator.bash
docker compose up --build -d