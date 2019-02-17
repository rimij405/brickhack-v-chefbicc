import React, { Component } from 'react';
import UserProfile from '../UserProfile.js';
import Daily from '../components/Daily.js';
import '../App.css';
import User from './User';
import Day from './Day';
import Visual from './Visual.js';
import Statistics from './Statistics';
import {getMoods} from '../actions/getActions';


class Home extends Component {

  constructor(props){
    super(props);

    this.state = {
      username: this.props.username,
      daily: UserProfile.getDaily(),
      date: '',
      mood: '',
      caffeine: '',
      exercise: '',
      sleep: '',
      meals: '',
      stats: false
    }

    this.setState = this.setState.bind(this);
    this.setDaily = this.setDaily.bind(this);
    this.setState = this.setState.bind(this);
    this.setStats = this.setStats.bind(this);
  }


  checkDailyForm(){
    if(this.state.daily === false){
      return(<Daily setDaily={this.setDaily} username={this.state.username}/>);
    }else{
      UserProfile.setDaily(true);
    }
  }

  setDaily(value){
    this.setState({
      daily: value
    });
  }

  setStats(value){
    this.setState({
      stats: value
    });
  }

  createDays(days){
    if(this.state.daily === true) {
      var Days = [];
      let date = '';
      let mood = '';
      let exercise = '';
      let caffeine = '';
      let sleep = '';
      let meals = '';
      let length = days.length;
      for (let i = 0; i < length; i++) {
        let response = JSON.stringify(days[i]);
        let responses = response.split(",");
        for (let j = 0; j < responses.length; j++) {
          let values = responses[j].split(":");
          console.log(values);
          values[0] = values[0].replace("\"", "").replace("{", "").replace("}", "").replace("\"", "");
          values[1] = values[1].replace("\"", "").replace("{", "").replace("}", "").replace("\"", "");

          console.log(values[0]);
          switch (values[0]) {
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

            case("meals"):
              meals = values[1];
              break;

            case("sleep"):
              sleep = values[1];
              break;

          }

        }
        console.log(responses);
        Days.push(<Day key={i} date={date} mood={mood} caffeine={caffeine} exercise={exercise} sleep={sleep} meals={meals} />);

      }
      if(Days.length === 0){
        return(<h2>Sorry! You have no entries yet.</h2>)
      }
      return Days;
    }
  }

  displayHead(){
    if(this.state.daily === true) {
      return (<h1 className="history">History</h1>)
    }
  }



  render() {
    var body = [{
      date : "02/16/2019",
      mood : "happy",
      caffeine : "8 oz",
      exercise : "30 - 60",
      sleep: "10"
    },
    {
      date : "02/17/2019",
      mood : "sad",
      caffeine : "8 oz",
      exercise : "30 - 60",
      sleep: "4"
    },
    {
      date : "02/18/2019",
      mood : "sad",
      caffeine : "16 oz",
      exercise : "0",
      sleep : "2"
    }
    ];
    let data = getMoods(UserProfile.getId);
    var caffeine = [
      ["Date", "Caffeine"],
      ['02/16/2019', 8 ],
      ['02/17/2019', 8 ],
      ['02/18/2019', 16]
    ];
    if(this.state.stats === true){
      return(<Statistics body={body}/>)
    }else {
      return (

        <div className="home">
          <User setStats={this.setStats} username={this.state.username} data={body}/>
          {this.checkDailyForm()}
          <div className={"dayHolder"}>
            {this.displayHead()}
            {this.createDays(body)}
          </div>


        </div>
      );
    }
  }
}

export default Home;
