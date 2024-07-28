import os

import reflex as rx
from dotenv import load_dotenv

load_dotenv()

API_URL = os.getenv("API_URL")
DB_URL = os.getenv("DB_URL")

config = rx.Config(
    app_name="clearhabits",
    db_url=DB_URL,
    api_url=API_URL,
)
