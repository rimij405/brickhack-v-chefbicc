import React, { Component } from 'react';
import UserProfile from '../UserProfile.js';
import Daily from '../components/Daily.js';
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
        <h1>Welcome!</h1>
        <Daily username={this.state.username} />
      </div>
    );
  }
}

export default Home;
