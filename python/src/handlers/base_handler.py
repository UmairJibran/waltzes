"""Base handler class for all Lambda functions."""

import json
from typing import Any, Dict, List, Union

from utils import logger


class BaseHandler:
    """Base handler class with common functionality."""

    def __init__(self):
        """Initialize the handler."""
        pass

    def process_message(self, message_body: Dict[str, Any]) -> Dict[str, Any]:
        """Process a single message.

        This method should be implemented by child classes.

        Args:
            message_body (Dict[str, Any]): The parsed message body

        Returns:
            Dict[str, Any]: Processing result
        """
        raise NotImplementedError("Child classes must implement process_message")

    def handler(self, event: Dict[str, Any], context: Any = None) -> Dict[str, Any]:
        """AWS Lambda handler function.

        Args:
            event (Dict[str, Any]): AWS Lambda event
            context (Any, optional): AWS Lambda context

        Returns:
            Dict[str, Any]: Response containing processing results and any batch failures
        """
        batch_item_failures: List[Dict[str, str]] = []
        processing_results: List[Dict[str, Any]] = []

        # Handle both direct invocation and SQS event format
        if "Records" in event:
            # SQS event format
            for record in event["Records"]:
                try:
                    message_body = json.loads(record["body"])
                    result = self.process_message(message_body)
                    processing_results.append(result)
                except Exception as e:
                    logger.error(
                        f"Failed to process record {record['messageId']}: {str(e)}"
                    )
                    batch_item_failures.append({"itemIdentifier": record["messageId"]})
        else:
            # Direct invocation format
            try:
                result = self.process_message(event)
                processing_results.append(result)
            except Exception as e:
                logger.error(f"Failed to process direct invocation: {str(e)}")
                raise

        return {
            "batchItemFailures": batch_item_failures,
            "processingResults": processing_results,
        }

    def local_invoke(self, message: Union[Dict[str, Any], str]) -> Dict[str, Any]:
        """Invoke handler locally with SQS-like message format.

        Args:
            message (Union[Dict[str, Any], str]): Message body either as dict or JSON string

        Returns:
            Dict[str, Any]: Processing results
        """
        if isinstance(message, str):
            message = json.loads(message)

        # Wrap in SQS event format
        event = {"Records": [{"messageId": "local_test", "body": json.dumps(message)}]}

        return self.handler(event)
