import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { Provider } from 'react-redux';
import { connect } from 'react-redux';
import { createStore } from 'redux';
import reportWebVitals from './reportWebVitals';




const VOLUME = 'VOLUME'
const POWER = 'POWER'
const BANK = 'BANK'
const PADINPUT = 'PADINPUT';

// state: [power(bool), bank(bool), input, value, volume] // the reason for this fourth entry is to always keep track of volume
const actionReducer = (state = [true, false, '', '',50],action) => {

  if(action.type === VOLUME) {
    console.log('the action taken was ' + action.type)
    console.log('the global state volume is ' + action.vol)
    return [state[0], state[1], 'Volume: ', action.vol, action.vol];
  } 

  if(action.type === POWER){
    console.log('the action taken was ' + action.type)
    console.log('the global state power is ' + action.power)
    return [ action.power, state[1],state[2], state[3], state[4]];
  }

  if (action.type === BANK) {
    if(action.bank === true) {
      return [state[0], action.bank, 'smooth piano kit', '', state[4]];
    }
    else {
      return [state[0], action.bank, 'heater kit', '', state[4]];
    }
  }

  if(action.type === PADINPUT){
    console.log('the action that was taken was ' + action.type)
    console.log('the global input was' + action.input)
    return [state[0], state[1],action.input, action.value, state[4]];
  }
  else {
    return state;
  }
}


const Container = connect(null, null)(App);
const store = createStore(actionReducer);
// render the page
ReactDOM.render(
  <Provider store={store}>
    <Container />
  </Provider>,
  document.getElementById('root')

);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
