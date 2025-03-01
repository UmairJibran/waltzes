from datetime import datetime
import os
from typing import Dict, Any, Optional
from models.user_linkedin import UserLinkedInData
from services.mongodb import MongoDB
import jwt
import bcrypt


class User:
    COLLECTION_NAME = "users"

    def __init__(
        self,
        email: str,
        password: str = "",
        name: str = "",
        linkedin_username: str = "",
        secret_key: str = "",
        is_active: bool = False,
    ):
        self.name = name
        self.email = email
        self.linkedin_username = linkedin_username
        self.secret_key = secret_key
        self.is_active = is_active
        self.password = password
        self.created_at = datetime.now()
        self.updated_at = datetime.now()
        self.db = MongoDB()

    def to_dict(self) -> Dict[str, Any]:
        return {
            "name": self.name,
            "email": self.email,
            "password": self.password,
            "linkedinUsername": self.linkedin_username,
            "isActive": self.is_active,
            "secretKey": self.secret_key,
            "createdAt": self.created_at,
            "updatedAt": self.updated_at,
        }

    @classmethod
    def from_dict(cls, data: Dict[str, Any]) -> "User":
        user = cls(
            name=data["name"],
            email=data["email"],
            password=data["password"],
            secret_key=data["secretKey"],
            is_active=data["isActive"],
            linkedin_username=data["linkedinUsername"],
        )
        user.created_at = data.get("created_at", user.created_at)
        user.updated_at = data.get("updated_at", user.updated_at)
        return user

    def generate_token(self) -> None:
        token = jwt.encode(
            {
                "name": self.name,
                "email": self.email,
                "linkedinUsername": self.linkedin_username,
            },
            os.environ.get("JWT_SECRET_KEY"),
            algorithm="HS256",
        )
        return token

    @classmethod
    def from_token(cls, token) -> Optional["User"]:
        try:
            decoded = jwt.decode(
                token, os.environ.get("JWT_SECRET_KEY"), algorithms=["HS256"]
            )
            return cls(
                name=decoded["name"],
                email=decoded["email"],
                linkedin_username=decoded["linkedinUsername"],
            )

        except Exception as e:
            print(f"Error decoding token: {e}")
            return None

    def hash_password(self) -> None:
        b_password = self.password.encode("utf-8")
        hashed = bcrypt.hashpw(b_password, bcrypt.gensalt())
        self.password = str(hashed)

    def is_valid_password(self, hashed_password, entered_password) -> bool:
        entered_password_encoded = entered_password.encode("utf-8")
        hashed_password_encoded = (
            hashed_password.encode("utf-8")
            if isinstance(hashed_password, str)
            else hashed_password
        )

        try:
            if bcrypt.checkpw(entered_password_encoded, hashed_password_encoded):
                return True
            else:
                return False
        except Exception as e:
            print(f"Error validating password: {e}")
            return False

    def create(self) -> str:
        existing_user = self.find_by_email(self.email)
        if existing_user:
            return str(existing_user)
        self.hash_password()
        return self.db.create(self.COLLECTION_NAME, self.to_dict())

    @classmethod
    def login_user(cls, email: str, password: str) -> Optional["User"]:
        db = MongoDB()
        result = db.read(cls.COLLECTION_NAME, {"email": email})
        if not result:
            return None
        user = cls.from_dict(result)
        is_valid = cls.is_valid_password(
            cls, hashed_password=user.password, entered_password=password
        )
        if is_valid:
            return user
        return None

    @classmethod
    def find_by_linkedin_username(cls, linkedin_username: str) -> Optional["User"]:
        db = MongoDB()
        result = db.read(cls.COLLECTION_NAME, {"linkedinUsername": linkedin_username})
        return cls.from_dict(result) if result else None

    @classmethod
    def find_by_email(cls, email: str) -> Optional["User"]:
        db = MongoDB()
        result = db.read(cls.COLLECTION_NAME, {"email": email})
        return cls.from_dict(result) if result else None

    @classmethod
    def find_by_secret_key(cls, secret_key: str) -> Optional["User"]:
        db = MongoDB()
        result = db.read(cls.COLLECTION_NAME, {"secretKey": secret_key})
        return cls.from_dict(result) if result else None

    def update_profile(self, new_data: Dict[str, Any]) -> bool:
        new_data["updated_at"] = datetime.now()
        return self.db.update(self.COLLECTION_NAME, {"email": self.email}, new_data)

    def delete_account(self) -> bool:
        return self.db.delete(self.COLLECTION_NAME, {"email": self.email})

    @classmethod
    def list_all(cls) -> list["User"]:
        db = MongoDB()
        users = db.list(cls.COLLECTION_NAME)
        return [cls.from_dict(user) for user in users]

    def save_linkedin_data(self, scraped_data: Dict[str, Any]) -> str:
        linkedin_data = UserLinkedInData(
            user_linkedin_username=self.linkedin_username,
            scrape_data=scraped_data,
            scrape_date=datetime.now(),
            is_valid=True,
        )
        return linkedin_data.save()
