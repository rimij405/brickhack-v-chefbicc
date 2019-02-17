import React, { Component } from 'react';
import UserProfile from '../UserProfile.js';
import Caffeine from '../components/Caffeine.js';
import Meals from '../components/Meals';
import Sleep from '../components/Sleep';
import Exercise from '../components/Exercise';
import User from './User.js';

import '../App.css';


class Daily extends Component {
  constructor(props){
    super(props);
    this.state = {
      username: this.props.username,
      cups: '',
      caffeine: false,
      exercise: false,
      sleep: false,
      meals: false,
      mood: ''
    }

    this.checkCaffeine = this.checkCaffeine.bind(this);
    this.checkMeals = this.checkMeals.bind(this);
    this.checkExercise = this.checkExercise.bind(this);
    this.checkSleep = this.checkSleep.bind(this);
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

  checkExercise() {
    //call to server and set the state, then display based on state
    if (this.state.exercise) {
      return(<Exercise minutesChanged={this.setState}/>);
    }
  }

  checkSleep() {
    //call to server and set the state, then display based on state
    if (this.state.sleep) {
      return(<Sleep sleepChanged={this.setState}/>);
    }
  }

  checkMeals() {
    //call to server and set the state, then display based on state
    if (this.state.meals) {
      return(<Meals mealsChanged={this.setState} />);
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

  render() {
    return(
      <div className="main">

        <User username={this.state.username} />
        <h1>How are you feeling today?</h1>
        <div>
          <button id="happy" onClick={e => this.setMood("happy")}>Happy</button>
          <button id="sad" onClick={e => this.setMood("sad")}>Sad</button>
        </div>

        {this.checkCaffeine()}
        {this.checkExercise()}
        {this.checkMeals()}
        {this.checkSleep()}

        <button id="add" onClick={e => this.displayOptions()}>&#43;</button>
        <div className="options" id="options">
          <button onClick={e => this.setState({caffeine: true})}>Caffeine</button>
          <button onClick={e => this.setState({exercise: true})}>Exercise</button>
          <button onClick={e => this.setState({sleep: true})}>Sleep</button>
          <button onClick={e => this.setState({meals: true})}>Meals</button>
        </div>
        <button onClick={e => this.props.setDaily(true)}>Submit</button>
      </div>
    );
  }
}

export default Daily;
