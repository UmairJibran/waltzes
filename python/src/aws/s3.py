"""Utility functions for interacting with AWS S3."""

import os

import boto3

from utils import logger


def upload_item(path, bucket, key):
    """Upload an item to an S3 bucket.

    Args:
        path (str): Path to the item to upload.
        bucket (str): Name of the S3 bucket.
        key (str): Key to assign to the item in the S3 bucket.

    Returns:
        bool: True if the upload was successful, False otherwise.
    """
    if os.environ.get("AWS_ENDPOINT"):
        s3 = boto3.client(
            "s3",
            endpoint_url=os.environ.get("AWS_ENDPOINT"),
            region_name=os.environ.get("AWS_REGION", "us-east-1"),
        )
    else:
        s3 = boto3.client(
            "s3",
            region_name=os.environ.get("AWS_REGION", "us-east-1"),
        )

    try:
        s3.upload_file(path, bucket, key)
        return True
    except Exception as e:
        logger.error(f"Error uploading item: {e}")
        return False
