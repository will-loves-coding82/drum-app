import React from 'react';
import './App.css';
import KeyBoard from './KeyBoard.jsx'
import Controls from './Controls.jsx'

class App extends React.Component {

  render() {
    return (
      <div id = 'drum-machine'>
        <div id = 'display'>
            <KeyBoard />
            <Controls/>
        </div>
       <footer>William Kim</footer> 
      </div>
    );
    }
}

export default App;
