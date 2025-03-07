"""Logging utility for the application."""

import logging
import os
from logging.handlers import RotatingFileHandler

LOG_DIR = "logs"
LOG_FILE = os.path.join(LOG_DIR, "app.log")


if not os.path.exists(LOG_DIR):
    os.makedirs(LOG_DIR)


logger = logging.getLogger("app_logger")
logger.setLevel(logging.DEBUG)


file_handler = RotatingFileHandler(LOG_FILE, maxBytes=5 * 1024 * 1024, backupCount=3)
file_handler.setFormatter(
    logging.Formatter("%(asctime)s - %(levelname)s - %(message)s")
)
file_handler.setLevel(logging.DEBUG)


console_handler = logging.StreamHandler()
console_handler.setFormatter(
    logging.Formatter("%(asctime)s - %(levelname)s - %(message)s")
)
console_handler.setLevel(logging.INFO)


logger.addHandler(file_handler)
logger.addHandler(console_handler)


def info(*args):
    """Log INFO level messages (console + file)."""
    logger.info(" ".join(map(str, args)))


def warn(*args):
    """Log WARNING level messages (console + file)."""
    logger.warning(" ".join(map(str, args)))


def debug(*args):
    """Log DEBUG level messages (only file)."""
    logger.debug(" ".join(map(str, args)))


def error(*args):
    """Log ERROR level messages (only file)."""
    logger.error(" ".join(map(str, args)))


def critical(*args):
    """Log CRITICAL level messages (only file)."""
    logger.critical(" ".join(map(str, args)))
