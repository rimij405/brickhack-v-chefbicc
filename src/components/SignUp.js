import React, { Component } from 'react';
import UserProfile from '../UserProfile';


class SignUp extends Component {

  constructor(){
    super();
    this.state = {
      email: '',
      password: ''
    }
  }



  render() {
    return(
      <div className="main">
        <h1>SignUp</h1>
        <p>

        </p>
        <input type="text" name="email" onChange={e => this.setState({email: e.target.value })}/>
        <input type="text" name="password" onChange={e => this.setState({email: e.target.value })}/>
      </div>

    );
  }
}

export default SignUp;