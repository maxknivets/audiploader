# Audiploder, the platform for uploading your audios! #

## What is this? ## 
Audioploder is a little testing playground for trying out audio uploads and sharing.

## Setup ##

### Pre-requisites ###
* An S3 Bucket
* A user with S3 write/read privileges
* AWS keys
* Python >= 3.8.9
* Node >= 18.0.0
* NPM >= 8.8.0

### Build steps ###
1. Fill out `.env` variables (including the one in the frontend folder) 
2. Run `sh build.sh`
And you should be good to go!

### Launch app ###
To start it up, do `python3 app.py`

## Project architecture ##
The project runs on Flask. It uses Python-webpack for serving static files (i.e. the frontend).

The frontend is compiled using webpack. It runs on React.js and TailwindCSS.

Audio is uploaded directly to the S3 storage. No data is stored on the server.

The S3 bucket is made private with all public access blocked. Only the server can make queries to it.

## What's next? ##
It's uncertain, but I have a few cool ideas in the future I will surely share here.

## May I use this for my science project? ##
Yup!
