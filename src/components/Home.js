import React, { Component } from 'react';
import UserProfile from '../UserProfile.js';
import '../App.css';


class Home extends Component {
  constructor(props){
    super(props);
    this.state = {
      email: ''
    }

  }
  render() {
    return(
      <div className="main">
        <h1>Welcome! {this.state.email}</h1>

      </div>
    );
  }
}

export default Home;
