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
  }



  render() {
    if(this.state.goBack === true){
      return(<Open />);
    }else{
      return(
        <div className="main">
          <form>
            <h1>SignUp</h1>

            <input type="text" name="email" onChange={e => this.setState({email: e.target.value })}/>
            <input type="text" name="password" onChange={e => this.setState({email: e.target.value })}/>
          </form>
          <button onClick={e => this.setState({goBack: true})}>Back</button>
        </div>

      );
    }

  }
}

export default SignUp;