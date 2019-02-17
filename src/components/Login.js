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
    let post = {
      username: this.state.username,
      password: this.state.password
    }
    //check to see if user and pass are valid combo on server

    let response = fetch('https://jsonplaceholder.typicode.com/todos/1/posts', {
      method: 'POST',
      body: JSON.stringify(post)
    }).then(function(response){return response.json()});
    console.log(response);

    UserProfile.setName(this.state.username);
    UserProfile.setDaily(false);

    if (this.checkUsername(this.state.username) && this.checkPassword(this.state.password)) {
      this.setState({
        submitted: true
      });
    }
    
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

export default Login;