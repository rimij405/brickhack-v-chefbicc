import React, { Component } from 'react';
import UserProfile from '../UserProfile.js';
import Daily from '../components/Daily.js';
import '../App.css';
import User from './User';
import Day from './Day';


class Home extends Component {

  constructor(props){
    super(props);
    this.state = {
      username: this.props.username,
      daily: false,
      date: '',
      mood: '',
      caffeine: '',
      exercise: ''
    }

    this.setState = this.setState.bind(this);
    this.setDaily = this.setDaily.bind(this);
  }


  checkDailyForm(){
    if(this.state.daily === false){
      return(<Daily setDaily={this.setDaily} username={this.state.username}/>);
    }
  }

  setDaily(value){
    this.setState({
      daily: value
    });
  }

  createDays(days){
    let date = '';
    let mood = '';
    let exercise = '';
    let caffeine = '';
    let length = days.length;
    for(let i=0; i<length; i++){
      let response = JSON.stringify(days[i]);
      let responses = response.split(",");
      for(let j=0; j<responses.length; j++){
        let values = responses[j].split(":");
        console.log(values);
        values[0] = values[0].replace("\"", "").replace("{", "").replace("}", "").replace("\"", "");
        values[1] = values[1].replace("\"", "").replace("{", "").replace("}", "").replace("\"", "");

        console.log(values[0]);
        switch(values[0]){
          case("date"):
            console.log(values[1]);
            date = values[1];
            break;

          case("mood"):
            mood = values[1];
            break;

          case("caffeine"):
            caffeine = values[1];
            break;

          case("exercise"):
            exercise = values[1];
            break;
        }

      }
      console.log(responses);
      return(<Day date={date} mood={mood} caffeine={caffeine} exercise={exercise} />);

    }
  }

  render() {
    var body = [{
      date : "02/16/2019",
      mood : "happy",
      caffeine : "8 oz",
      exercise : "30 - 60"
    },
    {
      date : "02/17/2019",
      mood : "sad",
      caffeine : "8 oz",
      exercise : "30 - 60"
    },
    {
      date : "02/18/2019",
      mood : "sad",
      caffeine : "16 oz",
      exercise : "0"
    }
    ];

    return(
      <div className="main">
        <User username={this.state.username} />
        <h1>Welcome!</h1>
        {this.checkDailyForm()}
        {this.createDays(body)}


      </div>
    );
  }
}

export default Home;
