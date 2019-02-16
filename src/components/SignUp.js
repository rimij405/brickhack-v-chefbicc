import React, { Component } from 'react';
import UserProfile from '../UserProfile';
import Open from '../components/Open.js';


class SignUp extends Component {

  constructor(){
    super();
    this.state = {
      goBack: false,
      email: '',
      password: ''
    }

    this.handlePassChange = this.handlePassChange.bind(this);
  }

  handlePassChange(value){
    if(this.state.password !== value){
      document.getElementById('passError').style.display = 'block';
    }else{
      document.getElementById('passError').style.display = 'none';
    }
  }

  handleEmail(value) {
    var valid = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if(valid.test(value)) {
      this.setState({email: value});
      document.getElementById('emailError').style.display = 'none';
    }
    else {
      document.getElementById('emailError').style.display = 'block';
    }
  }





  render() {
    if(this.state.goBack === true){
      return(<Open />);
    }else{
      return(
        <div className="main">
          <form>
            <h1>SignUp</h1>
            <h3>Email Address</h3>
            <div className="error" id="emailError">Please enter a valid email</div>
            <input type="text" name="email" onChange={e => this.handleEmail(e.target.value)}/>
            <h3>Password</h3>
            <input type="password" name="password" onChange={e => this.setState({password: e.target.value })}/>
            <h3>Re-Enter Password</h3>
            <div className="error" id="passError">Passwords Not the Same</div>
            <input type="password" name="password" onChange={e => this.handlePassChange(e.target.value)} />
          </form>
          <button onClick={e => this.setState({goBack: true})}>Back</button>
        </div>

      );
    }

  }
}

export default SignUp;