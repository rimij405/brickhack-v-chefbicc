import React, { Component } from 'react';
import UserProfile from '../UserProfile.js';
import Daily from '../components/Daily.js';
import '../App.css';
import User from './User';
import Day from './Day';
import Visual from './Visual.js';


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
    if(this.state.daily === true) {
      var Days = [];
      let date = '';
      let mood = '';
      let exercise = '';
      let caffeine = '';
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
          }

        }
        console.log(responses);
        Days.push(<Day date={date} mood={mood} caffeine={caffeine} exercise={exercise}/>);

      }
      return Days;
    }
  }

  displayHead(){
    if(this.state.daily === true) {
      return (<h1 className="history">History</h1>)
    }
  }

  createTable(body, value){
    var Caffeine = [];
    var Dates = [];
    var Data = [];
    Data.push(["Dates", value.charAt(0).toUpperCase() + value.substring(1, value.length)]);
    let length = body.length;
    for (let i = 0; i < length; i++) {
      let response = JSON.stringify(body[i]);
      let responses = response.split(",");
      for (let j = 0; j < responses.length; j++) {
        let values = responses[j].split(":");
        console.log(values);
        values[0] = values[0].replace("\"", "").replace("{", "").replace("}", "").replace("\"", "");
        values[1] = values[1].replace("\"", "").replace("{", "").replace("}", "").replace("\"", "");

        console.log(values[0]);
        if(values[0] === value){
          if(values[0] === "caffeine"){
            values[1] = values[1].replace(" oz", "");
          }
          if(values[0] === "mood"){
            Caffeine.push(values[1]);
            break;
          }
          Caffeine.push(parseInt(values[1]));
        }
        if(values[0] === 'date'){
          Dates.push(values[1]);
        }

      }
      console.log(responses);

    }

    for(let i=0;i<Caffeine.length; i++){
      Data.push([Dates[i], Caffeine[i]]);
    }

    console.log(Data);

    return(<Visual data={Data} title={value} />);


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

    var caffeine = [
      ["Date", "Caffeine"],
      ['02/16/2019', 8 ],
      ['02/17/2019', 8 ],
      ['02/18/2019', 16]
    ];

    return(
      <div className="home">
        <User username={this.state.username} />
        {this.checkDailyForm()}
        <div className={"dayHolder"}>
          {this.displayHead()}
          {this.createDays(body)}
        </div>

        {this.createTable(body, "caffeine")}
        {this.createTable(body, "exercise")}
        {this.createTable(body, "mood")}


      </div>
    );
  }
}

export default Home;
