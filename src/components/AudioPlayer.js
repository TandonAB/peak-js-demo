import React, { useRef, useState } from 'react';
import Peaks from 'peaks.js';
import { options } from './options';
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';
import {formatTime} from './Utils';
// import sampleJSON from './sample.json';
// import sampleOgg from './sample.ogg';



const AudioPlayer = () => {
  const audioRef = useRef(null)
  const overviewRef = useRef(null)
  const zoomviewRef = useRef(null)
  const [currentTime,setCurrentTime] = useState(0);
  const [toatlTime,setTotalTime] = useState(0);
  const [isPlaying,setIsPlaying] = useState(false);
  const [volume,setVolume] = useState(1);
  const instance = useRef(null);
  /** Peak.js */
  // const AudioContext = window.AudioContext || window.webkitAudioContext;
  // const audioContext = new AudioContext();

  // const options = {
  //   containers: {
  //     overview: document.getElementById('overview-waveform'),
  //     zoomview: document.getElementById('zoomview-waveform')
  //   },
  //   mediaElement: document.querySelector('audio'),
  //   webAudio: {
  //     audioContext: audioContext
  //   }
  // };

  React.useEffect(() => {
    options.mediaElement = audioRef.current
    options.containers.overview = overviewRef.current
    options.containers.zoomview = zoomviewRef.current

    Peaks.init(options, function (err, peaks) {
      if (err) {
        console.error('Failed to initialize Peaks instance: ' + err.message);
        return;
      }

      console.log('Current Time: ', peaks.player.getCurrentTime());
      instance.current = peaks;
      setTotalTime(instance.current.player.getDuration());
      console.log("innss",instance.current,peaks.player);
      (instance.current).on('player.timeupdate',function(time){
        setCurrentTime(time);
      })
    });
  }, [options])

  const tooglePlaying = ()=>{
    if(!instance.current){
      return;
    }
    const {player} = instance.current;
    if(player.isPlaying()){
      player.pause();
      setIsPlaying(false);
    }else{
      player.play();
      setIsPlaying(true);
    }
  }
  const playForward = ()=>{
    if(!!instance.current){
      const {player} = instance.current;
      player.seek(player.getCurrentTime()+5);
    }
  }
  const playBackword = ()=>{
    if(!!instance.current){
      const {player} = instance.current;
      player.seek(player.getCurrentTime()-5);
    }
  }
  const handleVolume =(range)=>{
    console.log(range);
    if(!!audioRef.current){
      audioRef.current.volume=range/100;
    }
  }
  

  /** Peak.js */

  return (
    <div>
      <h1>Audio Player</h1>
      <div style={{ border: '1px solid red', minHeight: '150px' }}>
        <div id="peaks-container">
          <div ref={el => { zoomviewRef.current = el; }} id="zoomview-container"></div>
          {/* <div ref={el => { overviewRef.current = el }} id="overview-container"></div> */}
        </div>
        <audio ref={(el) => { audioRef.current = el; }} id="peak_id">
          <source src="sample.mp3" type="audio/mpeg" />
          <source src="sample.ogg" type="audio/ogg" />
        </audio>

        
        {/* <div id="controls">
          <button data-action="zoom-in">Zoom in</button>
          <button data-action="zoom-out">Zoom out</button>
          <button data-action="add-segment">Add a Segment at current time</button>
          <button data-action="add-point">Add a Point at current time</button>
          <button data-action="log-data">Log segments/points</button>
          <input type="text" id="seek-time" value="0.0" />
          <button data-action="seek">Seek</button>
          <label for="amplitude-scale">Amplitude scale</label>
          <input type="range" id="amplitude-scale" min="0" max="10" step="1" />
          <input type="checkbox" id="auto-scroll" checked />
          <label for="auto-scroll">Auto-scroll</label>
          <button data-action="resize">Resize</button>
          <button data-action="toggle-zoomview">Show/hide zoomable waveform</button>
          <button data-action="toggle-overview">Show/hide overview waveform</button>
          <button data-action="destroy">Destroy</button>
        </div> */}
      </div>
      <div>
      <span>{formatTime(currentTime)}/{formatTime(toatlTime)}</span>
      <button onClick={playBackword}>{'<'}</button>
      <button onClick={tooglePlaying}>{isPlaying ? "Pause" : "Play"} </button>
      <button onClick={playForward}>{'>'}</button>
      <div style={{width:'100px',display:"inline-block",marginLeft:"10px"}}><Slider width={20} onChange={handleVolume} defaultValue={100} ></Slider></div>
      </div> 
    </div>
  );
};

export default AudioPlayer;
