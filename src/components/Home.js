import React, { Component } from 'react';
import UserProfile from '../UserProfile.js';
import Daily from '../components/Daily.js';
import '../App.css';


class Home extends Component {
  constructor(props){
    super(props);
    this.state = {
      username: this.props.username,
      daily: false,
    }

  }

  checkDailyForm(){
    if(this.state.daily === false){
      return(<Daily setDaily={this.setState} username={this.state.username}/>);
    }
  }


  render() {
    return(
      <div className="main">
        <h1>Welcome!</h1>
        <p>{this.state.daily}</p>
        {this.checkDailyForm()}

      </div>
    );
  }
}

export default Home;
