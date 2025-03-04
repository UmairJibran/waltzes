# QUEUES
queues=(linkedin-scraper stripe-meterer email-sender)
buckets=(waltzes-resources waltzes-logs)
ses_verified_emails=("hello@waltzes.umairjibran.com" "no-reply@waltzes.umairjibran.com")

for queue in "${queues[@]}"
do
  awslocal sqs create-queue --queue-name $queue.fifo --attributes FifoQueue=true,ContentBasedDeduplication=true
done

for bucket in "${buckets[@]}"
do
  awslocal s3api create-bucket --bucket $bucket
done

for email in "${ses_verified_emails[@]}"
do
  awslocal ses verify-email-identity --email-address $email
done