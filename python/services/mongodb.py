import os
import pymongo
from typing import Dict, Any, Optional


class MongoDB:
    def __init__(self):
        self.client = pymongo.MongoClient(os.environ.get("MONGO_URI"))
        self.db = self.client["waltzes"]

    def create(self, collection_name: str, data: Dict[str, Any]) -> str:
        collection = self.db[collection_name]
        result = collection.insert_one(data)
        return str(result.inserted_id)

    def read(
        self, collection_name: str, query: Dict[str, Any], sort: list = None
    ) -> Optional[Dict[str, Any]]:
        collection = self.db[collection_name]
        return collection.find_one(query, sort=sort)

    def update(
        self, collection_name: str, query: Dict[str, Any], new_data: Dict[str, Any]
    ) -> bool:
        collection = self.db[collection_name]
        result = collection.update_one(query, {"$set": new_data})
        return result.modified_count > 0

    def delete(self, collection_name: str, query: Dict[str, Any]) -> bool:
        collection = self.db[collection_name]
        result = collection.delete_one(query)
        return result.deleted_count > 0

    def list(self, collection_name: str, query: Dict[str, Any] = None) -> list:
        collection = self.db[collection_name]
        return list(collection.find(query or {}))
