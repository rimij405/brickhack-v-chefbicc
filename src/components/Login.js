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
    /*
    let response = fetch('', {
      method: 'POST',
      body: JSON.stringify(post)
    }).then(function(response){return response.json()});
    console.log(response);
    */
    UserProfile.setName(this.state.username);

    this.setState({
      submitted: true
    });
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
          <form className="main" onSubmit={this.handleFormSubmit}>
            <h3>Username</h3>
            <input type="text" name="username" onChange={e => this.setState({username: e.target.value})}/>
            <h3>Password</h3>
            <input type="password" name="password" onChange={e => this.setState({password: e.target.value})}/>
            <br />
            <div>
              <button type="submit">Submit</button>
              <button onClick={e => this.setState({goBack : true})}>Back</button>
            </div>
          </form>
        </div>
      );
    }
  }
}

export default Login;