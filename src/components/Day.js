import React, {Component} from 'react';

class Day extends Component{
  constructor(props){
    super(props);
    this.state = {
      date: this.props.date,
      mood: this.props.mood,
      caffeine: this.props.caffeine,
      exercise: this.props.exercise,
      meals: this.props.meals,
      sleep: this.props.sleep
    }

    this.checkMood = this.checkMood.bind(this);
    this.checkCaffeine = this.checkCaffeine.bind(this);
    this.checkExercise = this.checkExercise.bind(this);
    this.checkSleep = this.checkSleep.bind(this);
  }

  checkCaffeine(){
    if(this.state.caffeine.length > 1){
      return(<p> Ounces of Caffeine: {this.state.caffeine} </p>);
    }
  }

  checkExercise(){
    if(this.state.exercise.length > 1){
      return(<p> Minutes of Exercise: {this.state.exercise}</p>);
    }
  }

  checkSleep(){
    if(this.state.sleep.length > 1){
      return(<p> Hours of Sleep: {this.state.sleep} </p>);
    }
  }

  checkMood(){
    if(this.state.mood.length > 1){
      return(<p> Mood: {this.state.mood}</p>);
    }
  }

  checkMeals(){
    if(this.state.meals.length > 1) {
      return (<p> Meals: {this.state.meals}</p>)
    }
  }

  render(){
    return(
      <div className="day">
        <h2>{this.state.date}</h2>
        <hr />
        {this.checkMood()}
        {this.checkCaffeine()}
        {this.checkExercise()}
        {this.checkSleep()}
        {this.checkMeals()}
      </div>
    );
  }
}

export default Day;