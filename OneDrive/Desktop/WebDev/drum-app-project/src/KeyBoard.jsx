import React from "react";
import './KeyBoard.css'
import { connect } from "react-redux";




class KeyBoard extends React.Component {
    constructor(props){
        super(props);
        this.isMountedVal = 0;
        this.state = {
            pressed: false,
            padName: '',
        }
    this.Press = this.Press.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.dispatchActions = this.dispatchActions.bind(this);
    }


    // helper function for handling change 
    Press(ID) {
        if(this.isMountedVal){
            //console.log('current state is ' + this.state.pressed)
            this.setState({ pressed: true, padName: ID}, () => setTimeout(() => {
                this.setState({ pressed: false, padName: ID });
            }, 50));
        }
    }

    dispatchActions(id) {
    
            switch (id) {
                case 'q':
                    this.props.bank == false ? this.props.heater1() : this.props.chord1();
                    break;
                case 'w':
                    this.props.bank == false ? this.props.heater2() : this.props.chord2();
                    break;
                case 'e':
                    this.props.bank == false ? this.props.heater3() : this.props.chord3();
                    break;
                case 'a':
                    this.props.bank == false ? this.props.heater4() : this.props.shaker();
                    break;
                case 's':
                    this.props.bank == false ? this.props.clap() : this.props.dry_ohh();
                    break;
                case 'd':
                    this.props.bank == false ? this.props.open_hh(): this.props.bld_h1() ;
                    break;
                case 'z':
                    this.props.bank == false ? this.props.kick_hat(): this.props.punchy_kick();
                    break;
                case 'x':
                    this.props.bank == false ? this.props.kick(): this.props.side_stick();
                    break;
                case 'c':
                    this.props.bank == false ? this.props.closed_hh(): this.props.snare();
                    break;
            }


    }


    // takes care of manipulating the look of the drum pads and updating the info display
    handleChange(ID = '') {

        // change the look of the drum pad pad, when clicking
        this.Press(ID);

        // if power is off, do not play audio
        if( this.props.power === true){
            const audio = document.getElementById(ID);
            audio.volume = this.props.volume/100.0;
            console.log('audio volume is now at ' + audio.volume)
            audio.play();
            this.dispatchActions(ID.toLowerCase());
            }
    }


    componentWillUnmount() {
        this.isMountedVal = 0;
    }

    
    componentDidMount(){
        this.isMountedVal = 1;
        const self = this; // because we cannot access 'this' inside the addEventListener

        // this is exclusively for key trigger events
        document.addEventListener("keydown", function (ev) {
            // change the look of the drum pad that was pressed
            self.setState({ pressed: true, padName: ev.key.toLocaleUpperCase() }, () => setTimeout(() => {
                self.setState({ pressed: false, padName: ev.key.toLocaleUpperCase() });
            }, 100));

            if (self.props.power == true) {
                // play the audio ony if power is on
                const audio = document.getElementById(ev.key.toLocaleUpperCase())
                audio.volume = self.props.volume/100.0;
                audio.play();
                self.dispatchActions(ev.key);
            }
        });
    }



    render() {

        // grab the state properties
        const { pressed } = this.state;
        const { padName } = this.state;
   
        
        console.log('the bank in keyboard is ' + this.props.bank);
   
        return (
        
        // add a conditional to check if the bank was turned on because it means the audio clips will change as a result
        <div id = 'container'>
            <div id = 'q' className = {padName === 'Q' && pressed ? "resize" : "drum-pad"} onClick={() => this.handleChange('Q')}><audio className = "clip" id = 'Q' src = {this.props.bank === false ? "https://s3.amazonaws.com/freecodecamp/drums/Heater-1.mp3" : "https://s3.amazonaws.com/freecodecamp/drums/Chord_1.mp3"} type="audio/mpeg"></audio>Q</div>
            <div id = 'w' className = {padName === 'W' && pressed ? "resize" : "drum-pad"} onClick={() => this.handleChange('W')}><audio className = 'clip' id = 'W' src = {this.props.bank === false ? "https://s3.amazonaws.com/freecodecamp/drums/Heater-2.mp3" : "https://s3.amazonaws.com/freecodecamp/drums/Chord_2.mp3"}></audio>W</div>
            <div id = 'e' className = {padName === 'E' && pressed ? "resize" : "drum-pad"} onClick={() => this.handleChange('E')}><audio className = 'clip' id = 'E' src = {this.props.bank === false ? "https://s3.amazonaws.com/freecodecamp/drums/Heater-3.mp3": "https://s3.amazonaws.com/freecodecamp/drums/Chord_3.mp3"}></audio>E</div>
            <div id = 'a' className = {padName === 'A' && pressed ? "resize" : "drum-pad"} onClick={() => this.handleChange('A')}><audio className = 'clip' id = 'A' src = {this.props.bank === false ? "https://s3.amazonaws.com/freecodecamp/drums/Heater-4_1.mp3" :"https://s3.amazonaws.com/freecodecamp/drums/Give_us_a_light.mp3"}></audio>A</div>
            <div id = 's' className = {padName === 'S' && pressed ? "resize" : "drum-pad"} onClick={() => this.handleChange('S')}><audio className = 'clip' id = 'S' src = {this.props.bank === false ? "https://s3.amazonaws.com/freecodecamp/drums/Heater-6.mp3" : "https://s3.amazonaws.com/freecodecamp/drums/Dry_Ohh.mp3"}></audio>S</div>
            <div id = 'd' className = {padName === 'D' && pressed ? "resize" : "drum-pad"} onClick={() => this.handleChange('D')}><audio className = 'clip' id = 'D' src = {this.props.bank === false ? "https://s3.amazonaws.com/freecodecamp/drums/Dsc_Oh.mp3": "https://s3.amazonaws.com/freecodecamp/drums/Bld_H1.mp3"}></audio>D</div>
            <div id = 'z' className = {padName === 'Z' && pressed ? "resize" : "drum-pad"} onClick={() => this.handleChange('Z')}><audio className = 'clip' id = 'Z' src = {this.props.bank === false ? "https://s3.amazonaws.com/freecodecamp/drums/Kick_n_Hat.mp3" : "https://s3.amazonaws.com/freecodecamp/drums/punchy_kick_1.mp3"}></audio>Z</div>
            <div id = 'x' className = {padName === 'X' && pressed ? "resize" : "drum-pad"} onClick={() => this.handleChange('X')}><audio className = 'clip' id = 'X' src = {this.props.bank === false ? "https://s3.amazonaws.com/freecodecamp/drums/RP4_KICK_1.mp3": "https://s3.amazonaws.com/freecodecamp/drums/side_stick_1.mp3"}></audio>X</div>
            <div id = 'c' className = {padName === 'C' && pressed ? "resize" : "drum-pad"} onClick={() => this.handleChange('C')}><audio className = 'clip' id = 'C' src = {this.props.bank === false ? "https://s3.amazonaws.com/freecodecamp/drums/Cev_H2.mp3": "https://s3.amazonaws.com/freecodecamp/drums/Brk_Snr.mp3"}></audio>C</div>
        </div>
           
        )
    
    }
}




/////// these actions update the name and value of what is being displayed //////

const displayHeater1 = () => {
    console.log('heater1 action dispatched')
    return {
        type: 'PADINPUT',
        input: 'heater',
        value: 1
    }
}
const displayChord1 = () => {
    console.log('chord1 action dispatched')
    return {
        type: 'PADINPUT',
        input: 'chord',
        value: 1
    }
}


const displayHeater2 = () => {
    console.log('heater2 action dispatched')

    return {
        type:'PADINPUT',
        input: 'heater',
        value: 2
    }
}
const displayChord2 = () => {
    console.log('chord2 action dispatched')

    return {
        type: 'PADINPUT',
        input: 'chord',
        value: 2
    }
}


const displayHeater3 = () => {
    console.log('heater2 action dispatched')

    return {
        type: 'PADINPUT',
        input: 'heater',
        value: 3
    }
}
const displayChord3= () => {
    console.log('chord3 action dispatched')

    return {
        type: 'PADINPUT',
        input: 'chord',
        value: 3
    }
}

const displayHeater4 = () => {
    console.log('heater4 action dispatched')

    return {
        type: 'PADINPUT',
        input: 'heater',
        value: 4
    }
}
const displayShaker = () => {
    console.log('shaker action dispatched')

    return {
        type: 'PADINPUT',
        input: 'shaker',
        value: ''
    }
}


const displayClap= () => {
    console.log('clap action dispatched')

    return {
        type: 'PADINPUT',
        input: 'clap',
        value: ''
    }
}
const displayDry_OHH = () => {
    console.log('open hh action dispatched')

    return {
        type: 'PADINPUT',
        input: 'open',
        value: 'hh'
    }
}


const displayOpen_HH = () => {
    console.log('open hh action dispatched')

    return {
        type: 'PADINPUT',
        input: 'open',
        value: 'hh'
    }
}
const displayBLD_H1= () => {
    console.log('closed hh action dispatched')

    return {
        type: 'PADINPUT',
        input: 'closed',
        value: 'hh'
    }
}


const displayKick_Hat = () => {
    console.log('kick n hat action dispatched')

    return {
        type: 'PADINPUT',
        input: "kick n' hat",
        value: ''
    }
}
const displayPunchy_Kick = () => {
    console.log('punchy kick action dispatched')

    return {
        type: 'PADINPUT',
        input: 'punchy',
        value: 'kick'
    }
}

const displayKick= () => {
    console.log('kick action dispatched')

    return {
        type: 'PADINPUT',
        input: "kick",
        value: ''
    }
}
const displaySide_Stick = () => {
    console.log('side stick action dispatched')

    return {
        type: 'PADINPUT',
        input: 'side',
        value: 'stick'
    }
}


const displayClosed_HH = () => {
    console.log('closed hh action dispatched')

    return {
        type: 'PADINPUT',
        input: "closed",
        value: 'hh'
    }
}
const displaySnare = () => {
    console.log('snare action dispatched')

    return {
        type: 'PADINPUT',
        input: 'snare',
        value: ''
    }
}

/////////////////////////////////////////////////////////////////////////////////////


const mapDispatchToProps = (dispatch) => {

    return {
        heater1: () => {
            dispatch(displayHeater1())
        },
        chord1: () => {
            dispatch(displayChord1())
        },
        heater2: () => {
            dispatch(displayHeater2())
        },
        chord2: () => {
            dispatch(displayChord2())
        },
        heater3: () => {
            dispatch(displayHeater3())
        },
        chord3: () => {
            dispatch(displayChord3())
        },
        heater4: () => {
            dispatch(displayHeater4())
        },
        shaker: () => {
            dispatch(displayShaker())
        },
        clap: () => {
            dispatch(displayClap())
        },
        dry_ohh: () => {
            dispatch(displayDry_OHH())
        },
        open_hh: () => {
            dispatch(displayOpen_HH())
        },
        bld_h1: () => {
            dispatch(displayBLD_H1())
        },
        kick_hat: () => {
            dispatch(displayKick_Hat())
        },
        punchy_kick: () => {
            dispatch(displayPunchy_Kick())
        },
        kick: () => {
            dispatch(displayKick())
        },
        side_stick: () => {
            dispatch(displaySide_Stick())
        },
        closed_hh: () => {
            dispatch(displayClosed_HH())
        },
        snare: () => {
            dispatch(displaySnare())
        }
    }
}


// this allows us to acces the global state's power, bank, and volume in this class component
const mapStateToProps = (state) => {
    return { power: state[0], bank: state[1], volume: state[4]}
}

export default connect(mapStateToProps,mapDispatchToProps)(KeyBoard);