import React, { Component } from 'react';
import UserProfile from '../UserProfile.js';
import '../App.css';
import Open from '../components/Open.js';
import Home from '../components/Home.js';

class Login extends Component {
  constructor(){
    super();
    this.state = {
      goBack : false,
      username : '',
      password : '',
      submitted : false
    }

    this.handleFormSubmit = this.handleFormSubmit.bind(this);
  }

  handleFormSubmit(){
    //check to see if user and pass are valid combo on server
    this.setState({
      submitted: true
    });
  }

  render() {
    if(this.state.goBack === true){
      return(<Open />);
    }else if(this.state.submitted === true){
      return(<Home />);
    }else{
      return(
        <div className="main">
          <h1>Login</h1>
          <form className="main" onSubmit={this.handleFormSubmit}>
            <h3>Username</h3>
            <input type="text" name="username" onChange={e => this.setState({username: e.target.value})}/>
            <h3>Password</h3>
            <input type="password" name="password" onChange={e => this.setState({password: e.target.value})}/>
            <button type="submit">Submit</button>
          </form>
          <button onClick={e => this.setState({goBack : true})}>Back</button>
        </div>
      );
    }
  }
}

export default Login;