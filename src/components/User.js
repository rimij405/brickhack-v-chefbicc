import React, { Component } from 'react';

class User extends Component{
  constructor(props){
    super(props);
    this.state = {
      username : this.props.username
    }
  }

  render(){
    return(
      <div className="user">
        <h4>{this.state.username}</h4>
      </div>
    );
  }
}

export default User;