import os
from pathlib import Path
from dotenv import load_dotenv
load_dotenv()

ALLOWED_EXTENSIONS = set(['.mp3', '.wav', '.flac'])
AWS_ACCESS_KEY_ID = os.getenv('AWS_ACCESS_KEY_ID')
AWS_SECRET_ACCESS_KEY = os.getenv('AWS_SECRET_ACCESS_KEY')
AWS_LINK_LIFETIME = os.getenv('AWS_LINK_LIFETIME') # In seconds
BUCKET_NAME = os.getenv('AWS_BUCKET_NAME')
BASE_DIR = Path(__file__).parent.parent
DEBUG = os.getenv('DEBUG')
HOSTNAME = os.getenv('HOSTNAME')
MAX_FILE_SIZE = os.getenv('MAX_FILE_SIZE') # In megabytes
PORT = os.getenv('PORT')
