import React, { Component } from 'react';
import UserProfile from '../src/UserProfile.js';
import Login from '../src/components/Login.js';
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
        <Login />
      );
    }
  }
}

export default App;

