import React, { Component } from 'react';
import UserProfile from '../UserProfile.js';
import Daily from '../components/Daily.js';
import '../App.css';
import User from './User';
import Day from './Day';
import Visual from './Visual.js';
import Statistics from './Statistics';
import {getMoods} from '../actions/getActions';
import {withCookies, Cookies} from 'react-cookie';
import { instanceOf } from 'prop-types';


class Home extends Component {
  static propTypes = {
    cookies: instanceOf(Cookies).isRequired
  };

  constructor(props){

    super(props);
    const {cookies} = props;
    this.state = {
      username: this.props.username,
      daily: UserProfile.getDaily(),
      date: '',
      mood: '',
      caffeine: '',
      exercise: '',
      sleep: '',
      meals: '',
      stats: false,
      userProfile: this.props.userProfile,
      data: '',

    }

    this.checkResponse = this.checkResponse.bind(this);
    this.setState = this.setState.bind(this);
    this.setDaily = this.setDaily.bind(this);
    this.setState = this.setState.bind(this);
    this.setStats = this.setStats.bind(this);
  }


  checkDailyForm(){
    if(this.state.daily === false){
      return(<Daily setDaily={this.setDaily} cookies={this.props.cookies} username={this.state.username}/>);
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

  checkResponse(value){

    const _this = this;

    const isValid = (status) => {
      return (status === "ok");
    };

    var Days = [];
    let date = '';
    let mood = '';
    let exercise = '';
    let caffeine = '';
    let sleep = '';
    let meals = '';

    console.log(value);

    value.then(function(response){
      console.log(response.moods);
      let length = response.moods.length;
      for(let i=0; i<length; i++){
        Days.push(<Day key={i} date={response.moods[i].lastUpdated} mood={response.moods[i].mood} caffeine={response.moods[i].ouncesOfCoffee} exercise={response.moods[i].hoursOfExercise} sleep={response.moods[i].hourso}
                       meals={response.moods[i].numberofMeals}/>);
      }

    });
    console.log(Days);
    _this.props.cookies.set('days', Days, {path: '/'});
    return Days;
  }

  createDays(days){

    if(this.state.daily === true) {
      let data = getMoods(this.props.cookies.get('id'), this.checkResponse);
      /*
      var Days = [];
      let date = '';
      let mood = '';
      let exercise = '';
      let caffeine = '';
      let sleep = '';
      let meals = '';
      console.log(data);
      let parsed = data;
      let index = parsed.indexOf("_id");
      let i = 0;
      let response = parsed.substring(index, parsed.length);
      while(response.length > 0) {
        console.log(response);
        break;
        console.log(response);
        Days.push(<Day key={i} date={date} mood={mood} caffeine={caffeine} exercise={exercise} sleep={sleep}
                       meals={meals}/>);

        if (Days.length === 0) {
          return (<h2>Sorry! You have no entries yet.</h2>)
        }
      }
      return Days;
      */
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
            {this.props.cookies.get('days')}
          </div>


        </div>
      );
    }
  }
}

export default Home;
