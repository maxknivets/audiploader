import os
import boto3
import uuid
import webpack_boilerplate

from src.variables import (
    AWS_ACCESS_KEY_ID,
    AWS_SECRET_ACCESS_KEY,
    AWS_LINK_LIFETIME,
    BASE_DIR,
    BUCKET_NAME,
    HOSTNAME,
    MAX_FILE_SIZE,
    PORT
)
from src.utils import allowed_file, upload_file_to_s3

from pathlib import Path
from flask import Flask, render_template, request
from webpack_boilerplate.config import setup_jinja2_ext
from cookiecutter.main import cookiecutter

s3 = boto3.client(
    "s3",
    aws_access_key_id=AWS_ACCESS_KEY_ID,
    aws_secret_access_key=AWS_SECRET_ACCESS_KEY
)

app = Flask(__name__, static_folder="frontend/build", static_url_path="/static/")
app.config['MAX_CONTENT_LENGTH'] = int(MAX_FILE_SIZE) * 1000 * 1000 # max upload size is 20MB
app.config.update({
    'WEBPACK_LOADER': {
        'MANIFEST_FILE': os.path.join(BASE_DIR, "frontend/build/manifest.json"),
    }
})

setup_jinja2_ext(app)

@app.cli.command("webpack_init")
def webpack_init():
    pkg_path = os.path.dirname(webpack_boilerplate.__file__)
    cookiecutter(pkg_path, directory="frontend_template")


## ROUTES ##

@app.route("/")
def hello():
    return render_template('index.html')


@app.route("/api/upload-audio", methods=["POST"])
def upload_audio():
    status = {'uploadSuccessful': False}
    message = 'File uploaded successfully'
    if 'File' not in request.files:
        message = "No file found in the request"
    file = request.files['File']
    if file.filename == '':
        message = 'No file name specified'
    if not file or not allowed_file(file.filename):
        message = 'File type not allowed'
    file.filename = str(uuid.uuid4()) + "-" + file.filename
    output = upload_file_to_s3(s3, file)
    if not output:
        message = 'File upload failed'
    else:
        status = {'uploadSuccessful': True, 'name': output}
    return {**status, "message": message}


@app.route("/api/query-audio", methods=["GET"])
def query_audio():
    # this will require pagination later on if we want to make this scalable
    s3_resource = boto3.resource('s3')
    bucket = s3_resource.Bucket(BUCKET_NAME)
    files = []
    for file in bucket.objects.all():
        url = s3.generate_presigned_url('get_object', Params={
            'Bucket': BUCKET_NAME, 
            'Key': file.key
        }, ExpiresIn=AWS_LINK_LIFETIME)

        if not url: continue

        audio = {
            'url': url,
            'name': file.key,
            'type': Path(file.key).suffix.replace(".", ""),
            'size': file.size,
        }

        files.append(audio)
    return {'message': 'Query successful', 'files': files}

if __name__ == "__main__":
    app.run(host=HOSTNAME, port=PORT)
