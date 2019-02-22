import React, { Component } from 'react';
import UserProfile from '../UserProfile';
import SignUp from './SignUp';
import Login from './Login';
import Logo from '../moodswing.png';
import Home from '../components/Home';
import {withCookies, Cookies} from 'react-cookie'
import { instanceOf } from 'prop-types';


class Open extends Component {

  componentDidMount() {
    fetch("/items.json")
      .then(response => {
        if (!response.ok) {
          throw new Error("Bad response");
        }
        return response.json();
      })
      .then(data => console.log(data))
      .catch(error => console.error(error));
  }

  static propTypes = {
    cookies: instanceOf(Cookies).isRequired
  };

  constructor(props) {
    super(props);
    const { cookies } = props;
    this.state={
      switch: ''
    }
  }

  render() {
    if(this.props.cookies.get('id', {path:'/'})){
      return(<Home cookies={this.props.cookies} username={this.props.cookies.get('username')}/>);
    }
    if (this.state.switch === 'login') {
      return (<Login />)
    }
    else if (this.state.switch === 'signup'){
      return(<SignUp />)
    }
    else {
      return(

        <div className="main">
          <img src={Logo} className="logo"/>
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

export default withCookies(Open);