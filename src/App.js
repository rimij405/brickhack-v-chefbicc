import React, { Component } from 'react';
import UserProfile from '../src/UserProfile.js';
import Open from '../src/components/Open.js';
import Home from '../src/components/Home.js';
import '../src/App.css';


class App extends Component {
  render() {
    if(UserProfile.getName() !== ""){
      return(
        <Home />
      );
    }else{
      return (
        <Open />
      );
    }
  }
}

export default App;

