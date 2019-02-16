import React, { Component } from 'react';
import UserProfile from '../UserProfile';
import SignUp from './SignUp';
import Login from './Login';


class Open extends Component {
  constructor() {
    super();
    this.state={
      switch: ''
    }
  }

  render() {
    if (this.state.switch === 'login') {
      return (<Login />)
    }
    else if (this.state.switch === 'signup'){
      return(<SignUp />)
    }
    else {
      return(

        <div className="main">
        <h1>Are You a Member?</h1>
        <button onClick={e => this.setState({switch:'login'})}>
          Login
        </button>
        <button onClick={e => this.setState({switch:'signup'})}>
          Sign Up
        </button>
  
        </div>
      
      );

    }
    
  }
}

export default Open;