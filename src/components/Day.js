import React, {Component} from 'react';

class Day extends Component{
  constructor(props){
    super(props);
    this.state = {
      date: this.props.date,
      mood: this.props.mood,
      caffeine: this.props.caffeine,
      exercise: this.props.exercise,
      meals: '',
      sleep: ''
    }
  }

  render(){
    return(
      <div className="day">
        <h2>{this.state.date}</h2>
        <hr />
        <p> Mood: {this.state.mood}</p>
        <p> Ounces of Caffeine: {this.state.caffeine}</p>
        <p> Minutes of Exercise: {this.state.exercise}</p>
      </div>
    );
  }
}

export default Day;