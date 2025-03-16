"""Logging utility for the application."""

import logging
import os
from logging.handlers import RotatingFileHandler

# Use /tmp in Lambda, local directory otherwise
IS_LAMBDA = os.environ.get('AWS_LAMBDA_FUNCTION_NAME') is not None
LOG_DIR = "/tmp/logs" if IS_LAMBDA else "logs"
LOG_FILE = os.path.join(LOG_DIR, "app.log")

# Create log directory if it doesn't exist
if not os.path.exists(LOG_DIR):
    os.makedirs(LOG_DIR)

logger = logging.getLogger("app_logger")
logger.setLevel(logging.DEBUG)

# Configure handlers
handlers = []

# Always add console handler
console_handler = logging.StreamHandler()
console_handler.setFormatter(
    logging.Formatter("%(asctime)s - %(levelname)s - %(message)s")
)
console_handler.setLevel(logging.INFO)
handlers.append(console_handler)

# Add file handler only if we can write to the directory
try:
    file_handler = RotatingFileHandler(
        LOG_FILE,
        maxBytes=5 * 1024 * 1024,
        backupCount=3
    )
    file_handler.setFormatter(
        logging.Formatter("%(asctime)s - %(levelname)s - %(message)s")
    )
    file_handler.setLevel(logging.DEBUG)
    handlers.append(file_handler)
except (OSError, IOError) as e:
    console_handler.setLevel(logging.DEBUG)  # Log everything to console if file logging fails
    logger.warning(f"Could not set up file logging: {str(e)}")

# Add all handlers
for handler in handlers:
    logger.addHandler(handler)

def info(*args):
    """Log INFO level messages."""
    logger.info(" ".join(map(str, args)))

def warn(*args):
    """Log WARNING level messages."""
    logger.warning(" ".join(map(str, args)))

def debug(*args):
    """Log DEBUG level messages."""
    logger.debug(" ".join(map(str, args)))

def error(*args):
    """Log ERROR level messages."""
    logger.error(" ".join(map(str, args)))

def critical(*args):
    """Log CRITICAL level messages."""
    logger.critical(" ".join(map(str, args)))
