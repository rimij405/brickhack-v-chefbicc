import React, { Component } from 'react';
import UserProfile from '../UserProfile.js';
import '../App.css';


class Home extends Component {
  constructor(props){
    super(props);
    this.state = {
      username: this.props.username
    }

  }
  render() {
    return(
      <div className="main">
        <h1>Welcome! {UserProfile.getName()}</h1>

      </div>
    );
  }
}

export default Home;
