import React from 'react';
import Peaks from 'peaks.js';
import { options } from './options';

// import sampleJSON from './sample.json';
// import sampleOgg from './sample.ogg';

const AudioPlayer = () => {
  // console.log('HElloooo', options.mediaElement);
  /** Peak.js */

  Peaks.init(options, function (err, peaks) {
    if (err) {
      console.error('Failed to initialize Peaks instance: ' + err.message);
      return;
    }

    console.log('Current Time: ', peaks.player.getCurrentTime());
  });
  /** Peak.js */

  return (
    <div>
      <h1>Audio Player</h1>
      <div style={{ border: '1px solid red', minHeight: '150px' }}>
        <div id="peaks-container">
          <div id="zoomview-container"></div>
          <div id="overview-container"></div>
        </div>
        <audio id="peak_id">
          <source src="sample.mp3" type="audio/mpeg" />
          <source src="sample.ogg" type="audio/ogg" />
        </audio>
        <script
          src="../../node_modules/requirejs/require.js"
          data-main="app.js"
        ></script>
      </div>
    </div>
  );
};

export default AudioPlayer;
