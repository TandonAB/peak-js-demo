import React, { useRef } from 'react';
import Peaks from 'peaks.js';
import { options } from './options';

// import sampleJSON from './sample.json';
// import sampleOgg from './sample.ogg';

const AudioPlayer = () => {
  const audioRef = useRef(null)
  const overviewRef = useRef(null)
  const zoomviewRef = useRef(null)

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
    });
  }, [options])

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
        <script
          src="../../node_modules/requirejs/require.js"
          data-main="app.js"
        ></script>

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
    </div>
  );
};

export default AudioPlayer;
