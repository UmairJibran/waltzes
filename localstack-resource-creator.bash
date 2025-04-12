#!/bin/bash

# QUEUES
queues=(linkedin-scraper meter email-sender job-scraper cover-letter-creator resume-creator pdf-processor job-structuror)
buckets=(waltzes-resources waltzes-logs)
ses_verified_emails=("hello@waltzes.umairjibran.com" "no-reply@waltzes.umairjibran.com")

for queue in "${queues[@]}"
do
  awslocal sqs create-queue --queue-name $queue.fifo --attributes FifoQueue=true,ContentBasedDeduplication=true || exit 1
done

for bucket in "${buckets[@]}"
do
  awslocal s3api create-bucket --bucket $bucket || exit 1
  awslocal s3api put-bucket-cors --bucket $bucket --cors-configuration file://local-stack-cors-policy.json || exit 1
done

for email in "${ses_verified_emails[@]}"
do
  awslocal ses verify-email-identity --email-address $email || exit 1
done

# populate the email templates
sh ./pre-req/scripts/update-templates.sh awslocal
