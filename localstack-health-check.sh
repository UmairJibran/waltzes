#!/bin/sh
MIN_QUEUE_COUNT=6
while true; do
  response=$(curl -s 'http://localhost:4566/?Action=ListQueues&Version=2012-11-05')
  queue_count=$(echo "$response" | grep -o "<QueueUrl>" | wc -l)
  echo "Found $queue_count queues (need at least $MIN_QUEUE_COUNT)"
  if [ "$queue_count" -ge "$MIN_QUEUE_COUNT" ]; then
    exit 0
  fi
  sleep 5
done
