import React, {useState} from 'react';
import UploadIcon from '../icons/upload.js';

export const UploadAudioForm = ({fileList, setFileList}) => {
  const [selectedFile, setSelectedFile] = useState();

  const changeHandler = event => {
    setSelectedFile(event.target.files[0]);
  };

  const uploadFile = (event) => {
    event.preventDefault();
    document.getElementById("audio-form").reset();
    const formData = new FormData();
    formData.append('File', selectedFile);
    fetch(
      `${process.env.REACT_APP_BASE_URL}/api/upload-audio`,
      {
        method: 'POST',
        body: formData,
      })
    .then((response) => response.json())
    .then((result) => appendNewFile(result.name))
  };

  const appendNewFile = newName => {
    let {url, name, size, type} = selectedFile;
    url = URL.createObjectURL(selectedFile);
    name = newName;

    const newFileList = [...fileList, {url, name, size, type}];
    setFileList(newFileList);
  };

  return (
    <form id="audio-form" className="my-4 mr-12" onSubmit={uploadFile} enctype="multipart/form-data">
      <div className="flex content-center max-w-xs m-auto mt-4">
        <input 
          className="border-2 border-black"
          name="audio"
          type="file"
          accept=".mp3, .wav, .flac,"
          onChange={changeHandler}
          required 
        />
        <button type="submit" className="border-2 border-black border-l-0 px-2">
          <UploadIcon />
        </button>
      </div>
      <div className="mt-2 mb-2">
      Right now, we only accept the following formats: mp3, wav, flac.
      <div>
        File size limit: <span className="text-red-500">20 MB</span>.
      </div>
      </div>
    </form>
  )
};
