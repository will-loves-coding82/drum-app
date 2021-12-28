import React from "react";
import './Controls.css';
import { connect } from "react-redux";
import Display from "./Display.jsx";


class Controls extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            type: '',
            value: '',
            soundOn: true,
            bankOn: false,
        }
        this.updateVolume = this.updateVolume.bind(this);
        this.togglePower = this.togglePower.bind(this);
        this.toggleBank = this.toggleBank.bind(this);
    }



    // changing the volume 
    updateVolume(event){
        this.setState({
            type: 'volume',
            value: event.target.value,
        });

        // dispatch this action for the global state volume
        this.props.onSlideVolume(this.state.value);
    }
    


    // function to handle toggling the power switch
    togglePower() {
 
        this.setState({
            soundOn: !this.state.soundOn
        })
        console.log('the sound was turned to ' + !this.state.soundOn);

        // dispatch this action for the global state power
        this.props.onSwitchPower(!this.state.soundOn);
    }

    toggleBank() {
        this.setState({
            bankOn: !this.state.bankOn
        })

        this.props.onSwitchBank(!this.state.bankOn)
    }

    render() {

        console.log('the control power is ' + this.state.soundOn)
        console.log('the global power is ' + this.props.power)
        console.log('the global bank is ' + this.props.bank)

        
        return (

            <div id = 'audio-inputs'>
        
                <div id = 'switch-label'>Power</div>
                <label id="toggle-power">
                    <input type="checkbox" value = {this.props.power} onChange={this.togglePower}/>
                    <span className ="slider"></span>
                </label>
                <Display />  
                
                {/* if the global power is turned on then the display will be normal and the volume slider will be immutable*/}
                {this.props.power == true && 
                    <div>
                         
                        <div id='vol-container'>
                            <input type='range' id='vol-slider' min="-1" max="101" defaultValue={this.props.volume} step="1" onChange={(event)=>this.updateVolume(event)}></input>
                        </div>
                    </div>
                }


                {/* if the power is turned off, then the volume slider will be immutable and display will not hold text */}
                {this.props.power == false && 
                <div>
            
                    <div id='vol-container'> 
                        <input type='range' id='vol-slider' min="-1" max="101" value={this.props.volume} step="1"readOnly ></input>
                    </div>
                </div>
                }

                
                <label id="toggle-bank">
                    <input type="checkbox" value={this.props.bank} onChange={this.toggleBank} />
                    <span className="slider"></span>
                </label>
                Bank
                

            </div>
        )
    }
}









//// redux functionality to update the global state ////

const POWER = 'POWER'
const VOLUME = 'VOLUME'
const BANK = 'BANK'


const togglePower = (isOn) => {
    console.log('toggling power')
    return {
        type: POWER,
        power: isOn
    };
}
const changeVolume = (number) => {
    console.log('changing volume')
    return {
        type: VOLUME,
        vol: number
    };
}


const toggleBank = (isOn) => {
    console.log('toggling bank')
    return {
        type: BANK,
        bank: isOn
    }
}


const mapDispatchToProps = (dispatch) => {
    return{
        onSwitchPower: (isOn) => {
            dispatch(togglePower(isOn))
        },
        onSlideVolume: (number) => {
            dispatch(changeVolume(number))
        },
        onSwitchBank: (isOn) => {
            dispatch(toggleBank(isOn))
        }
    }
}

const mapStateToProps = (state) => {
// this allows us to acces the global state's power in this file
    return{power: state[0], bank: state[1], volume: state[4]}
}

export default connect(mapStateToProps, mapDispatchToProps)(Controls);
   