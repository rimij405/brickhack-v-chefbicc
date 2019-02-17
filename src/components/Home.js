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

    this.setState = this.setState.bind(this);
    this.setDaily = this.setDaily.bind(this);
  }

  checkDailyForm(){
    if(this.state.daily === false){
      return(<Daily setDaily={this.setDaily} username={this.state.username}/>);
    }
  }

  setDaily(value){
    this.setState({
      daily: value
    });
  }

  render() {
    return(
      <div className="main">
        <h1>Welcome!</h1>
        {this.checkDailyForm()}


      </div>
    );
  }
}

export default Home;
