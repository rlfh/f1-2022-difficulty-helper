import React from 'react'
import Table from 'react-bootstrap/Table';
import { DateTime } from 'luxon';
import { toMillis, MILLISECONDS_PER_SECOND } from './ChronoTime';

class Track extends React.Component
{
    render() {        
        if ( !this.props.data ) {
            return('');
        }

        const MAX_AI_LEVEL = 110;
        const trackId = this.props.data.id;
        const trackInfo = this.props.data;
        console.debug('Track Info:', JSON.stringify(trackInfo));
        const targetLap = this.props.targetLap;

        const formatLapTimeFromMillis = (timeMs) => {
            return ''.concat( Math.floor(timeMs / MILLISECONDS_PER_SECOND), ',', Math.abs(timeMs % MILLISECONDS_PER_SECOND).toString().padStart(3, '0'));

        }

        var targetLevel = trackInfo.times.find( (el) => {

            var dtLapTime = DateTime.fromFormat(el, "m:s,SSS");
            var lapTimeMs =  toMillis(dtLapTime);                            
            console.debug('lapTimeMs:', lapTimeMs);
            console.debug('targetLap:', targetLap);
            console.debug('targetLap >= lapTimeMs:', targetLap >= lapTimeMs);
            return targetLap <= lapTimeMs;
        });

        var targetLevelPos = trackInfo.times.indexOf(targetLevel);
        console.log('Target level position:', targetLevelPos);

        return (            
            <div class='tracks-box'>
                <div class='row track-information'>
                    <div class='col'>
                        <span className='track-name align-center pt-2'>
                            <img className='track-name-flag' src={'/flags/'.concat(trackId, '.png')} alt='Flag'/>
                            <span className='track-name-text'>{ trackInfo.circuit }</span>
                        </span>
                        <div class='track-map'>
                            <img src={ '/tracks/'.concat(trackId, '.png')} width='600px'  alt='Circuit map' />
                        </div>
                    </div>
                </div>
                <div class='row pt-2'>
                    <div class='col'>
                        <h4 class='pt-3'>Recommended difficulty level</h4>
                        <div class='difficulty-level'>
                            { MAX_AI_LEVEL - targetLevelPos }
                        </div>
                    </div>
                </div>
                <div class='row pt-2'>
                    <div class='col'>
                        <h4>Track times</h4>
                    </div>
                </div>
                <div>
                <Table responsive>
                    <thead>
                        <tr>
                            <th>AI Level</th>
                            <th>Target time</th>
                            <th>Delta</th>
                        </tr>
                    </thead>
                    <tbody>
                    {                                    
                        trackInfo.times == null ? '' : trackInfo.times.map( (time, i) => {                                
                                let delta = targetLap - toMillis(DateTime.fromFormat(time, "m:s,SSS"));     
                                return (                                       
                                    <tr>                                    
                                        <td>{MAX_AI_LEVEL - i} { i === targetLevelPos ? ' ⭐' : '' } </td> 
                                        <td>{time}</td> 
                                        <td class={(delta >= 0) ? 'delta-positive' : 'delta-negative'}>
                                        { 
                                            formatLapTimeFromMillis( delta )
                                        }
                                        </td>
                                    </tr>
                                );
                            }
                        )
                    }
                    </tbody>
                </Table>
                </div>
            </div>
        )
    }
}

export default Track;