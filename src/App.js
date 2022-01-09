// import logo from './logo.svg';
import './App.css';
import React, { Component } from "react";


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: 0,
    }
  }

  render() {
    return (
      <div className="App">
        <h1> Hello world What </h1>
        <h2> {this.state.value} </h2>
      </div>
    );
  }
}


export default App;
