import React, { Component } from 'react';
import UserProfile from '../UserProfile.js';
import '../App.css';
import Open from '../components/Open.js';
import Home from '../components/Home.js';
import {logIn} from '../actions/getActions';
import {instanceOf} from 'prop-types';
import {withCookies, Cookies} from 'react-cookie';

import User from './User';

class Login extends Component {
  static propTypes = {
    cookies: instanceOf(Cookies).isRequired
  };
  constructor(props){
    super(props);
    const {cookies} = props;
    this.state = {
      goBack : false,
      username : '',
      password : '',
      submitted : false,
      id: cookies.get('id') || ''
    }
    this.setState = this.setState.bind(this);
    this.checkResponse = this.checkResponse.bind(this);
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
  }

  handleFormSubmit(){
    let post = {
      username: this.state.username,
      password: this.state.password
    }

    logIn(post, this.checkResponse);
    //check to see if user and pass are valid combo on server

    
  }  

  checkResponse(value){    

    const _this = this;

    const isValid = (status) => {
      return (status === "ok");
    };

    value.then(function(response){
      console.log(response);
      return response;
    }).then(function(blob){
      let payload = blob;
      console.dir(payload);

      // Perform functions here.
      if(isValid(payload.status)){
        _this.setState({
          submitted: true
        });
        console.log(payload.user._id);
        cookies.set('id', payload.user._id, {path: '/'});
        UserProfile.setId(payload.user._id);
        console.log(UserProfile.getId());
      } 
      else
      {
        document.getElementById('loginError').style.display = 'block';
      }

    });
  }

  checkUsername(value) {
    if (value.length === 0){
      document.getElementById('usernameError').style.display = 'block';
      return false;
    }
    else {
      document.getElementById('usernameError').style.display = 'none';
      this.setState({username: value})
      return true;
    }

  }

  checkPassword(value) {
    if (value.length === 0){
      document.getElementById('passwordError').style.display = 'block';
      return false;
    }
    else {
      document.getElementById('passwordError').style.display = 'none';
      this.setState({password: value})
      return true;
    }

  }

  render() {
    if(this.state.goBack === true){
      return(<Open />);
    }else if(this.state.submitted === true){
      return(<Home username={this.state.username}/>);
    }else{
      return(
        <div className="main">
            <h1>Login</h1>
            <div className="error" id="loginError">Invalid username or password</div>
            <h3>Username</h3>
            <div className="error" id="usernameError">Please enter a username</div>
            <input type="text" name="username" onChange={e => this.checkUsername(e.target.value)}/>
            <h3>Password</h3>
            <div className="error" id="passwordError">Please enter a password</div>
            <input type="password" name="password" onChange={e => this.checkPassword(e.target.value)}/>
            <br />
            <div>
              <button onClick={e => this.handleFormSubmit()} type="submit">Submit</button>
              <button onClick={e => this.setState({goBack : true})}>Back</button>
            </div>
        </div>
      );
    }
  }
}

export default withCookies(Login);