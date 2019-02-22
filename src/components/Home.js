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
import App from '../App';

let Days = [];

class Home extends Component {

  static propTypes = {
    cookies: instanceOf(Cookies).isRequired
  };

  constructor(props){

    super(props);
    const {cookies} = props;
    this.state = {
      haveGottenMoods: false,
      username: this.props.username,
      daily: '',
      date: '',
      mood: '',
      caffeine: '',
      exercise: '',
      sleep: '',
      meals: '',
      stats: false,
      userProfile: this.props.userProfile,
      data: '',
      gotMoods: false,
      today: ''

    }

    this.checkResponse = this.checkResponse.bind(this);
    this.setState = this.setState.bind(this);
    this.setDaily = this.setDaily.bind(this);
    this.setState = this.setState.bind(this);
    this.setStats = this.setStats.bind(this);
  }


  checkDailyForm(){
      return(<Daily setDaily={this.setDaily} cookies={this.props.cookies} username={this.state.username}/>);
  }

  getMoods(){
      UserProfile.setGotMood(true);

      this.state.data = getMoods(this.props.cookies.get('id', {path:'/'}), this.checkResponse);
      return null;
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

    if(Days.length > 1){
      return;
    }


    value.then(function(response){
      let length = response.moods.length;
      for(let i=0; i<length; i++){
        let data = {
          date: response.moods[i].lastUpdated,
          mood: response.moods[i].mood,
          caffeine: response.moods[i].ouncesOfCoffee,
          sleep: response.moods[i].hoursOfSleep,
          meals: response.moods[i].numberOfMeals
        }
        Days.push(data);
      }
        Days.reverse();
      _this.props.cookies.set('days', Days, {path: '/'});
      return Days;



    });
  }

  createDays(){
      let data = Days;

      var DaysDisplay = [];
      let date = '';
      let mood = '';
      let exercise = '';
      let sleep = '';
      let meals = '';
      let caffeine = '';
      let length = data.length;
      for (let i = 0; i < length; i++) {
        let response = JSON.stringify(data[i]);
        let responses = response.split(",");
        for (let j = 0; j < responses.length; j++) {
          let values = responses[j].split(":");
          values[0] = values[0].replace("\"", "").replace("{", "").replace("}", "").replace("\"", "");
          values[1] = values[1].replace("\"", "").replace("{", "").replace("}", "").replace("\"", "");

          switch (values[0]) {
            case("date"):
              date = values[1].substring(0, values[1].length - 3);
              if((this.state.today === date) && (this.state.daily === false)){
                this.setDaily(true)
              }
              break;

            case("mood"):
              values[1].replace("}","");
              switch(values[1]){
                default:
                  mood = 'null';
                  break;
                case('0'):
                  mood = 'happy';
                  break;
                case('1'):
                  mood = 'neutral';
                  break;
                case('2'):
                  mood = 'tired';
                  break;
                case('3'):
                  mood = 'annoyed';
                  break;
                case('4'):
                  mood = 'sad';
                  break;
                case('5'):
                  mood = 'angry';
                  break;
              }
              break;

            case("caffeine"):
              caffeine = values[1];
              break;

            case("exercise"):
              exercise = values[1];
              break;

            case("sleep"):
              exercise = values[1];
              break;

            case("meals"):
              exercise = values[1];
              break;
          }

        }
        DaysDisplay.push(<Day key={i} date={date} mood={mood} caffeine={caffeine} exercise={exercise} sleep={sleep} meals={meals}/>);
        caffeine = '';
        sleep = '';
        exercise = '';
        meals = '';
        mood = '';
      }
    return(DaysDisplay);
}

  displayHead(){
    if(this.state.daily === true) {
      return (<h1 className="history">History</h1>)
    }
  }


  /*

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
   */
/*
  resetCookies(){
    this.props.cookies.remove('id', { path: '/' });
    this.props.cookies.remove('username', { path: '/' });
    this.props.cookies.remove('daily', { path: '/' } );
    this.props.cookies.remove('days',{path: '/'});
    UserProfile.setName('');
    UserProfile.setDaily(false);
    UserProfile.setGotMood(false);
    UserProfile.setId('');
  }
*/
  setDailyForm(){
    UserProfile.setDaily(false);
    this.getMoods();
    this.setState({
      daily: false
    });
  }

  setDay(value){
    this.setState({
      today: value
    });
  }

  render() {
    if(this.state.today === ''){
      var today = new Date();
      var dd = today.getDate();
      var mm = today.getMonth()+1; //January is 0!
      var yyyy = today.getFullYear();

      if(dd<10) {
        dd = '0'+dd
      }

      if(mm<10) {
        mm = '0'+mm
      }

      today = yyyy + '-' + mm + '-' + (dd);
      this.setDay(today);
    }
    if(!UserProfile.getGotMood()) {
      this.getMoods();
    }
    if(this.state.stats === true){
      return(<Statistics body={Days}/>)

    }
    if(this.state.daily === false){
      return(<div className="home">{this.checkDailyForm()}</div>);
    }
    else {
      return (
        <div className="home">
          <User setStats={this.setStats} username={UserProfile.getName()}/>
          <button className="dailyButton" onClick={e => this.setDailyForm(false)}>Set Daily Form</button>
          <div className={"dayHolder"}>
            {this.displayHead()}
            {this.createDays()}
          </div>


        </div>
      );
    }
  }
}

export default withCookies(Home);
