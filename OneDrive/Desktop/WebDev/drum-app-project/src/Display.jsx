import React from "react";
import './Display.css'
import { connect } from "react-redux";

// Display subscribes to the store and accesess the global state properties using props to dispaly information to the user
class  Display extends React.Component{

    constructor(props){
        
        super(props);
        this.state = {
            expression: ''  // this doesnt matter
        }
    }
    
    render() {

        console.log('the global name in Display is' + this.props.input)


        if(this.props.power){
            return (
                <div id='info-container'>
                    <div id='info-display'><p>{this.props.input + " " + this.props.value}</p></div>
                </div>
            );
        }
        
        else {
            return (
                 < div id = 'info-container' > 
            < div id = 'info-display' > <p></p></div >
                </div >
            );
        }
    
    }   
}


const mapStateToProps = (state) => {
    return {power: state[0], input: state[2], value: state[3] }
}



export default connect(mapStateToProps, null)(Display);