import React from 'react'
import InputNumber from 'react-input-number';

import { DateTime } from 'luxon'

export const MILLISECONDS_PER_MINUTE = 60000;
export const MILLISECONDS_PER_SECOND = 1000;
export const toMillis = (dtObject) => 
{
    console.debug(JSON.stringify(dtObject));
    return dtObject.minute * MILLISECONDS_PER_MINUTE + dtObject.second * MILLISECONDS_PER_SECOND + dtObject.millisecond;
}


class ChronoTime extends React.Component
{

    constructor(props) {
        super(props);
        
        var time = DateTime.fromMillis(this.props.value)

        this.state = {
          timeMin: time.minute,
          timeSec: time.second,
          timeMilli: time.millisecond
        };

      }


      

     render() {       
        const handleChange =  (unit, selection ) => 
        {  
          var newTime, newTimeStr;
  
          console.log('Unit:', unit);
          console.log('Selection:', selection);
          console.log('State:', JSON.stringify(this.state));

          switch(unit)
          {
              case 'm':                
                newTimeStr = ''.concat(selection, ':', this.state.timeSec, ':', this.state.timeMilli);
                this.state.timeMin = selection
                break;
              
              case 's':                  
                newTimeStr = ''.concat(this.state.timeMin, ':', selection, ':', this.state.timeMilli);
                this.state.timeSec = selection
                break;
              
              case 'ms':
                newTimeStr = ''.concat(this.state.timeMin, ':', this.state.timeSec, ':', selection);
                this.state.timeMilli = selection
                break;
  
              default:
                break;
          
          }
          
          newTime = DateTime.fromFormat(newTimeStr, "m:s:SSS");
          console.log(newTimeStr);
          console.log(newTime.toString());

          this.props.setLap(toMillis(newTime));
            
        }                        
  
        
          
        return (
            <span class='chrono-number mt-4'>
                <InputNumber
                    id='timeMin'
                    className='chrono-number'
                    type='number'
                    autocomplete
                    min={0}
                    max={9}
                    step={1}
                    value={this.state.timeMin}
                    onChange={ (selection) => handleChange('m',selection) }
                />
                <span class='chrono-separator'>:</span>
                <InputNumber
                    id='timeSec'
                    className='chrono-number'
                    type='number'
                    min={0}
                    max={59}
                    step={1}
                    value={this.state.timeSec}
                    onChange={(selection) => handleChange('s', selection) }
                />
                <span class='chrono-separator'>.</span>
                <InputNumber
                    id='timeMili'
                    className='chrono-number chrono-number-wide'
                    type='number'
                    min={0}
                    max={999}
                    step={1}
                    value={this.state.timeMilli}
                    onChange={(selection) => handleChange('ms',selection) }
                />
                </span>
        );
    }



}

export default ChronoTime;