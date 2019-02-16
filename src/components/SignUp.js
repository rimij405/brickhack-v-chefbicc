import React, { Component } from 'react';
import UserProfile from '../UserProfile';
import Open from '../components/Open.js';
import Home from '../components/Home.js';


class SignUp extends Component {

  constructor(){
    super();
    this.state = {
      goBack: false,
      email: '',
      password: '',
      submitted: false,
      username: ''
    }

    this.handlePassChange = this.handlePassChange.bind(this);
    this.handleEmail = this.handleEmail.bind(this);
  }

  handlePassChange(value){
    if(this.state.password !== value){
      document.getElementById('passError').style.display = 'block';
      return false;
    }else{
      document.getElementById('passError').style.display = 'none';
      return true;
    }
  }

  handleEmail(value) {
    var valid = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if(valid.test(value)) {
      this.setState({email: value});
      document.getElementById('emailError').style.display = 'none';
      return true;
    }
    else {
      document.getElementById('emailError').style.display = 'block';
      return false;
    }
  }
  handleSubmit(formSubmit){
    UserProfile.setName(this.state.email);
    if (this.handleEmail(this.state.email) && this.handleUsername(this.state.username) && this.handlePassChange(this.state.password)) {
      this.setState({
        submitted: true
      })
    }

 }

 handleUsername(value) {
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

  render() {
    if(this.state.goBack === true){
      return(<Open />);
    }
    else if (this.state.submitted === true) {
      return(<Home email={this.state.email} />);
    }
    
    else{
      return(
        <div className="main">
            <h1>SignUp</h1>
            <h3>Email Address</h3>
            <div className="error" id="emailError">Please enter a valid email</div>
            <input type="text" name="email" onChange={e => this.handleEmail(e.target.value)}/>
            <h3>Username</h3>
            <div className="error" id="usernameError">Please enter a username</div>
            <input type="text" name="username" onChange={e =>this.handleUsername(e.target.value)}/>
            <h3>Password</h3>
            <input type="password" name="password" onChange={e => this.setState({password: e.target.value })}/>
            <h3>Re-Enter Password</h3>
            <div className="error" id="passError">Passwords Not the Same</div>
            <input type="password" name="password" onChange={e => this.handlePassChange(e.target.value)} />
            <button onClick={e => this.handleSubmit()}>Sign Up</button>
          <button onClick={e => this.setState({goBack: true})}>Back</button>
          
        </div>

      );
    }

  }
}

export default SignUp;