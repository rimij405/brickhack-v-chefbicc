import React, { Component } from 'react';
import UserProfile from '../UserProfile.js';
import '../App.css';
import Open from '../components/Open.js';

class Login extends Component {
  constructor(){
    super();
    this.state = {
      goBack : false,
    }
  }

  render() {
    if(this.state.goBack === true){
      return(<Open />);
    }else{
      return(
        <div className="main">
          <h1>Login</h1>
          <button onClick={e => this.setState({goBack : true})}>Back</button>
        </div>
      );
    }
  }
}

export default Login;