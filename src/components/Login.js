import React, { Component } from 'react';
import UserProfile from '../UserProfile';


class Login extends Component {
  constructor() {
    super();
    this.state={
      switch: ''
    }
  }

  render() {
    return(
      <div className="main">
      <h1>Login</h1>
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

export default Login;