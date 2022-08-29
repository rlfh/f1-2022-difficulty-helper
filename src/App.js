import React from 'react';
import { useState } from 'react';

import data from './levels.json'
import {ReactComponent as Logo} from './logo.svg'
import Tracks from './Tracks'
import ChronoTime from './ChronoTime';


function App() {

  const [lap, setLap] = useState(85123);  

  const handleChange = (t) => {
    
    console.debug("New state lap: ", t);
    setLap(t);

  };

  return (
    <div class='container-fluid align-middle'>
      <div class='row mt-4'>
        <div class='col-4'>
          <Logo />
        </div>
        <div class='col-8'>
          <h1>Difficulty Helper</h1>
        </div>
      </div>
      <div class='row'>
        <p>This is the F1 2022 difficulty helper. With it, you can find the right difficulty level to make your game more realistic.</p>
        <p>Credit for the idea and data goes to <a href='https://www.reddit.com/user/phail216/'>u/phail216</a> who posted the original Excel file on <a href='https://www.reddit.com/r/F1Game/comments/wlxecx/f1_2022_difficulty_helper_v108/'>Reddit</a>.</p>
        <p>How To Use It:
          <ul>
            <li>Go to Time Trial.</li>
            <li>Pick any car, but with equal performance! I strongly recommend the player car, as there is a pretty high variance between the others.</li>
            <li>Pick a track.</li>
            <li>(optional, but strongly recommended) Pick a setup. For me the highest rated Ferrari setups work pretty well.</li>
            <li>QuickTip since v1.06: In TT use highest tyre pressure for all tyres, in race use lowest for all tyres.</li>
            <li>Drive some laps.</li>
            <li>Pick the best laptime and enter it below. Then, pick your circuit.</li>
          </ul>
        </p>
        <p>Enjoy!</p>
      </div>
      <div class='row lap-input  mt-4'>
        <div class='col'>
          <h2>Your average lap time</h2>
          <ChronoTime 
            value={lap} 
            onChange={(t) => handleChange(t)} />
        </div>
      </div>
      <div class='row track-input mt-4'>
        <div class='col'>
          <h2>Track</h2>
          <p>Dataset version - <a href={data.versionUrl}>{data.version}</a></p>
          <Tracks 
            data={data}
            targetLap={lap} />
        </div>
      </div>
      <div class='row mt-4'>
        <div class='col'>
          <footer class='footer'>
            <div class='container'>
              <a class='nav-link' href='https://github.com/rlfh/f1-2022-difficulty-helper'>Contribute to this tool on Github</a>
            </div>
          </footer>
        </div>
      </div>
    </div>    
  );
}

export default App;
