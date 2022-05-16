import React, {useEffect} from 'react';

import { Playback } from './playback';
import '../style.css';

export const AudioList = ({fileList, setFileList}) => {
  
  useEffect(() => {
    fetch(
      `${process.env.REACT_APP_BASE_URL}/api/query-audio`)
      .then((response) => response.json())
      .then((result) => {
        setFileList(result.files)
      })
  }, []);

  return (
    <div>
      {fileList ? (fileList.map((file, idx) => (
        <div key={idx} align="center" className="border-t-2 border-b-2 border-black px-48 mt-8 flex flex-col justify-center align-center">
          <Playback url={file.url} filename={file.name} />
        </div>
      ))) : <div>No files uploaded yet!</div>}
    </div>
  )
};
