import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import { AudioList } from '../components/audioList';
import { UploadAudioForm } from '../components/uploadAudioForm';
import { Header } from "../components/header";
import { Footer } from "../components/footer";

import '../style.css';

const App = () => {
  const [fileList, setFileList] = useState();

  return (
    <div className="mt-16 text-center max-w-2xl m-auto">
      <Header />
      <UploadAudioForm fileList={fileList} setFileList={setFileList} />
      <AudioList fileList={fileList} setFileList={setFileList} />
      <Footer />
    </div>
  );
};

ReactDOM.render(
  <App />,
  document.getElementById('root')
);