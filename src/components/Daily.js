import React, { Component } from 'react';
import UserProfile from '../UserProfile.js';
import Caffeine from '../components/Caffeine.js';
import Meals from '../components/Meals';
import Sleep from '../components/Sleep';
import Exercise from '../components/Exercise';
import { createMood } from '../actions/getActions';

import '../App.css';
import { withCookies, Cookies } from 'react-cookie';
import { instanceOf } from 'prop-types';


class Daily extends Component {
  static propTypes = {
    cookies: instanceOf(Cookies).isRequired
  };
  constructor(props) {
    super(props);
    const { cookies } = props;
    this.state = {
      username: this.props.username,
      cups: '',
      caffeine: false,
      exercise: false,
      sleep: false,
      meals: false,
      mood: ''
    }

    this.setState = this.setState.bind(this);
    this.checkCaffeine = this.checkCaffeine.bind(this);
    this.checkMeals = this.checkMeals.bind(this);
    this.checkExercise = this.checkExercise.bind(this);
    this.checkSleep = this.checkSleep.bind(this);
  }

  displayOptions() {
    if (document.getElementById('options').style.display === 'block') {
      document.getElementById('options').style.display = 'none';
    }
    else {
      document.getElementById('options').style.display = 'block';
    }
  }

  checkCaffeine() {
    //call to server to check if person wants to monitor caffeine intake
    if (this.state.caffeine) {
      return (<Caffeine cupsChanged={this.setState} />);
    }
  }

  checkExercise() {
    //call to server and set the state, then display based on state
    if (this.state.exercise) {
      return (<Exercise minutesChanged={this.setState} />);
    }
  }

  checkSleep() {
    //call to server and set the state, then display based on state
    if (this.state.sleep) {
      return (<Sleep sleepChanged={this.setState} />);
    }
  }

  checkMeals() {
    //call to server and set the state, then display based on state
    if (this.state.meals) {
      return (<Meals mealsChanged={this.setState} />);
    }
  }

  setMood(value) {
    var element;

    element = document.getElementById(this.state.mood);

    if (element !== null) {
      element.classList.remove("selectedMood");
    }

    this.setState({
      mood: value
    });
    var elementTwo = document.getElementById(value);
    elementTwo.classList.add("selectedMood");
  }

  setDay() {
    let number = 0;
    switch (this.state.mood) {
      case ('happy'):
        number = 0;
        break;
      case ('neutral'):
        number = 1;
        break;
      case ('tired'):
        number = 2;
        break;
      case ('annoyed'):
        number = 3;
        break;
      case ('sad'):
        number = 4;
        break;
      case ('angry'):
        number = 5;
        break;

    }
    let data = {
      'userId': this.props.cookies.get('id'),
      'mood': number,
      'ouncesOfCoffee': this.state.caffeine,
      'hoursOfExercise': this.state.exercise,
      'hoursOfSleep': this.state.sleep,
      'numberOfMeals': this.state.meals

    }
    /*
    if (this.state.caffeine !== false) {
      data += {'ouncesOfCoffee': this.state.caffeine}
    }
    if (this.state.exercise !== false) {
      data += {'hoursOfExercise': this.state.exercise}
    }
    if (this.state.sleep !== false) {
      data += {'hoursOfSleep': this.state.sleep}
    }

    if (this.state.meals !== false) {
      data+={'numberOfMeals': this.state.meals}
    }
    */




    createMood(data, this.getData);
    UserProfile.setDaily(true);
    this.props.cookies.set('daily', true, {path: '/'});
  }

  getData(data) {
    console.log(data);

  }

  render() {
    return (
      <div className="daily">


        <h1>How are you feeling today?</h1>
        <div>
          <button id="happy" onClick={e => this.setMood("happy")}>Happy</button>
          <button id="neutral" onClick={e => this.setMood("neutral")}>Neutral</button>
          <button id="tired" onClick={e => this.setMood("tired")}>Tired</button>
          <button id="annoyed" onClick={e => this.setMood("annoyed")}>Annoyed</button>
          <button id="sad" onClick={e => this.setMood("sad")}>Sad</button>
          <button id="angry" onClick={e => this.setMood("angry")}>Angry</button>
        </div>

        {this.checkCaffeine()}
        {this.checkExercise()}
        {this.checkMeals()}
        {this.checkSleep()}

        <button id="add" onClick={e => this.displayOptions()}>&#43;</button>
        <div className="options" id="options">
          <button onClick={e => this.setState({ caffeine: true })}>Caffeine</button>
          <button onClick={e => this.setState({ exercise: true })}>Exercise</button>
          <button onClick={e => this.setState({ sleep: true })}>Sleep</button>
          <button onClick={e => this.setState({ meals: true })}>Meals</button>
        </div>
        <button onClick={e => this.setDay()}>Submit</button>
      </div>
    );
  }
}

export default Daily;
