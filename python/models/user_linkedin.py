from datetime import datetime
import json
from typing import Dict, Any, Optional, List
from services.mongodb import MongoDB


class UserLinkedInData:
    COLLECTION_NAME = "linkedin_user_data"

    def __init__(
        self,
        user_linkedin_username: str,
        scrape_data: Dict[str, Any],
        scrape_date: datetime = None,
        is_valid: bool = True,
    ):
        self.user_linkedin_username = user_linkedin_username
        self._scrape_data = self._convert_to_string(scrape_data)
        self.scrape_date = scrape_date or datetime.now()
        self.is_valid = is_valid
        self.created_at = datetime.now()
        self.updated_at = datetime.now()
        self.db = MongoDB()

    def _convert_to_string(self, data: Dict[str, Any]) -> str:
        """Convert dictionary data to JSON string for storage"""
        if isinstance(data, str):
            return data
        return json.dumps(data)

    def _convert_to_dict(self, data: str) -> Dict[str, Any]:
        """Convert JSON string to dictionary for use"""
        if isinstance(data, dict):
            return data
        try:
            return json.loads(data)
        except Exception as e:
            print(f"Error converting scrape data to dict: {e}")
            return {}

    @property
    def scrape_data(self) -> Dict[str, Any]:
        """Get scrape data as a dictionary"""
        return self._convert_to_dict(self._scrape_data)

    @scrape_data.setter
    def scrape_data(self, data: Dict[str, Any]) -> None:
        """Set scrape data, converting it to string for storage"""
        self._scrape_data = self._convert_to_string(data)
        self.updated_at = datetime.now()

    def to_dict(self) -> Dict[str, Any]:
        return {
            "userLinkedinUsername": self.user_linkedin_username,
            "scrapeData": self._scrape_data,
            "scrapeDate": self.scrape_date,
            "isValid": self.is_valid,
            "createdAt": self.created_at,
            "updatedAt": self.updated_at,
        }

    @classmethod
    def from_dict(cls, data: Dict[str, Any]) -> "UserLinkedInData":
        scrape_data = data.get("scrapeData", "{}")
        instance = cls(
            user_linkedin_username=data["userLinkedinUsername"],
            scrape_data=scrape_data,
            scrape_date=data.get("scrapeDate"),
            is_valid=data.get("isValid", True),
        )
        instance.created_at = data.get("createdAt", instance.created_at)
        instance.updated_at = data.get("updatedAt", instance.updated_at)
        return instance

    def save(self) -> str:
        """Save the current LinkedIn data to the database"""
        return self.db.create(self.COLLECTION_NAME, self.to_dict())

    def update(self) -> bool:
        """Update existing LinkedIn data"""
        self.updated_at = datetime.now()
        return self.db.update(
            self.COLLECTION_NAME,
            {
                "userLinkedinUsername": self.user_linkedin_username,
                "scrapeDate": self.scrape_date,
            },
            self.to_dict(),
        )

    def invalidate(self) -> bool:
        """Mark this scrape as invalid"""
        self.is_valid = False
        return self.update()

    @classmethod
    def get_latest_valid_scrape(
        cls, user_linkedin_username: str
    ) -> Optional["UserLinkedInData"]:
        """Get the latest valid scraped data for a user"""
        db = MongoDB()
        result = db.read(
            cls.COLLECTION_NAME,
            {"userLinkedinUsername": user_linkedin_username, "isValid": True},
            sort=[("scrapeDate", -1)],
        )
        return cls.from_dict(result) if result else None

    @classmethod
    def get_all_scrapes_for_user(
        cls, user_linkedin_username: str, include_invalid: bool = False
    ) -> List["UserLinkedInData"]:
        """Get all scrape records for a user, optionally including invalid ones"""
        db = MongoDB()
        query = {"userLinkedinUsername": user_linkedin_username}
        if not include_invalid:
            query["isValid"] = True

        results = db.read(
            cls.COLLECTION_NAME,
            query,
            sort_key="scrapeDate",
            sort_direction=-1,
            sort=[("scrapeDate", -1)],
        )
        return [cls.from_dict(result) for result in results]

    @classmethod
    def delete_all_for_user(cls, user_linkedin_username: str) -> int:
        """Delete all LinkedIn data for a specific user. Returns count of deleted items."""
        db = MongoDB()
        return db.delete_many(
            cls.COLLECTION_NAME, {"userLinkedinUsername": user_linkedin_username}
        )
