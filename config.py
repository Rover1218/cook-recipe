import os
from dotenv import load_dotenv

# Load environment variables from .env file
load_dotenv()

class Config:
    APP_ID = os.getenv('APP_ID')
    APP_KEY = os.getenv('APP_KEY')