import React from 'react'
import Select from 'react-select'
import Track from './Track'

class Tracks extends React.Component
{
    state = { track: null };

    setTrack = selectedTrack => 
    {
        this.setState({selectedTrack});
    };

    render() {
        const { selectedTrack } = this.state;

        return (
            <div>
                <div class='row mt-3'>
                    <div class='col'>
                        <Select id='trackSelector' 
                            value={ selectedTrack }
                            options={ this.props.data.tracks } 
                            getOptionLabel={(option)=>option.name}
                            getOptionValue={(option)=>option.id}
                            onChange={(selectedTrack) => this.setTrack(selectedTrack) }
                        />
                    </div>
                </div>                
                <div class='row mt-3'>
                    <div class='col'>
                        <Track data={ selectedTrack } targetLap={ this.props.targetLap } />
                    </div>
                </div>
            </div>
        );
    }


}

export default Tracks;