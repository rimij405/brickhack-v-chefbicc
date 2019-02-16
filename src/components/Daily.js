import React, { Component } from 'react';
import UserProfile from '../UserProfile.js';
import '../App.css';


class Home extends Component {
  constructor(){
    super();
    this.state = {
      username: this.props.username
    }
  }



  render() {
    return(
      <div className="main">
        <h1>How are you feeling today?</h1>
        <button>Happy</button>
        <button>Sad</button>

      </div>
    );
  }
}

export default Home;
