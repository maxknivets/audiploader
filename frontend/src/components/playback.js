import React, { useEffect, useRef, useState } from 'react';
import WaveSurfer from "wavesurfer.js";

import DownloadIcon from '../icons/download.js';
import PlayIcon from '../icons/play.js';
import StopIcon from '../icons/stop.js';

import "../style.css";

export const Playback = ({url, filename}) => { 
  const waveformRef = useRef();
  const buttonRef = useRef();
  const [audio] = useState(new Audio(url));
  const [playing, setPlaying] = useState(false);
  const toggle = () => setPlaying(!playing);
  const splicedFileName = filename.substr(37);
  useEffect(() => {
    audio.addEventListener('ended', () => setPlaying(false));
    return () => {
      audio.removeEventListener('ended', () => setPlaying(false));
    };
  }, []);

  useEffect(() => {
    const wavesurfer = WaveSurfer.create({
      container: waveformRef.current,
      preload: true,
      mediaControls: true,
    });
    buttonRef.current.onclick = function() {
      wavesurfer.playPause();
    };
    wavesurfer.load(url);
  }, []);

  return(
    <>
      <div className="border-t-2 rounded border-blacks overflow-visible w-full" ref={waveformRef}></div>
      <div className={"flex border-2 border-b-0 border-black text-center"}>
        <button className="border-r-2 border-black" ref={buttonRef} onClick={toggle}>
          {playing ? <StopIcon />: <PlayIcon />}
        </button>
        <div className="flex-1 text-xs self-center font-bold truncate ...">
          {splicedFileName}
        </div>
        <div className="border-l-2 border-black hover:text-gray-400 underline-offset-auto">
          <a href={url} download={url}><DownloadIcon /></a>
        </div>
      </div>
    </>
  )
};
