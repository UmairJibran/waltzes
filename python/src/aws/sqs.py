"""Utility functions for interacting with AWS SQS."""

import os

import boto3


def fetch_messages(queue_url):
    """Fetch messages from an SQS queue.

    Args:
        queue_url (str): URL of the SQS queue from which to fetch messages.

    Returns:
        obj: Messages fetched from the SQS queue.
    """
    sqs = boto3.client(
        "sqs",
        endpoint_url=os.environ.get("AWS_ENDPOINT"),
        region_name=os.environ.get("AWS_DEFAULT_REGION", "us-east-1"),
    )

    response = sqs.receive_message(
        QueueUrl=queue_url,
        AttributeNames=["All"],
        MaxNumberOfMessages=1,
        MessageAttributeNames=["All"],
        VisibilityTimeout=10,
        WaitTimeSeconds=10,
    )
    messages = response.get("Messages", [])
    if len(messages) > 0:
        return messages[0]
    return None


def delete_message(queue_url, receipt_handle):
    """Delete a message from an SQS queue.

    Args:
        queue_url (str): URL of the SQS queue from which to delete the message.
        receipt_handle (str): Receipt handle of the message to delete.
    """
    sqs = boto3.client(
        "sqs",
        endpoint_url=os.environ.get("AWS_ENDPOINT"),
        region_name=os.environ.get("AWS_DEFAULT_REGION", "us-east-1"),
    )

    sqs.delete_message(QueueUrl=queue_url, ReceiptHandle=receipt_handle)
