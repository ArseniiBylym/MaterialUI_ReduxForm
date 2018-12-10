import React, { Component } from 'react';
import './App.css';
import Form from './Form/Form'

class App extends Component {
  onChengeHandler = (e) => {
    console.log(e.target.value)
  }
  render() {
    return (
        <div className="App">
          Form
          <Form />
        </div>
    );
  }
}

export default App;
