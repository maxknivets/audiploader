from pathlib import Path
from werkzeug.utils import secure_filename
from .variables import BUCKET_NAME, ALLOWED_EXTENSIONS

def upload_file_to_s3(s3, file):
    filename = secure_filename(file.filename)
    try:
        s3.upload_fileobj(
            file,
            BUCKET_NAME,
            filename,
            ExtraArgs={
                "ContentType": file.content_type
            }
        )
        return filename
    except Exception as e:
        print("Something Happened: ", e)


def allowed_file(filename):
    return Path(filename).suffix in ALLOWED_EXTENSIONS
