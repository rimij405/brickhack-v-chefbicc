import React, { Component } from 'react';
import UserProfile from '../UserProfile.js';
import Caffeine from '../components/Caffeine.js';
import '../App.css';


class Daily extends Component {
  constructor(props){
    super(props);
    this.state = {
      username: this.props.username,
      cups: '',
      caffeine: false
    }

    this.setState = this.setState.bind(this);
  }

  displayOptions(){
    if(document.getElementById('options').style.display === 'block') {
      document.getElementById('options').style.display = 'none';
    }
    else{
      document.getElementById('options').style.display = 'block';
    }
  }

  checkCaffeine(){
    //call to server to check if person wants to monitor caffeine intake
    if(this.state.caffeine){
      return(<Caffeine cupsChanged={this.setState}/>);
    }
  }

  render() {
    return(
      <div className="main">
        <h1>How are you feeling today?</h1>
        <div>
          <button>Happy</button>
          <button>Sad</button>
        </div>

        {this.checkCaffeine()}

        <button onClick={e => this.displayOptions()}>Add More</button>
        <div className="options" id="options">
          <button onClick={e => this.setState({caffeine: true})}>Caffeine</button>
        </div>
      </div>
    );
  }
}

export default Daily;
