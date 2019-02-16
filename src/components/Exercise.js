import React, { Component } from 'react';

class Exercise extends Component {
    constructor(props) {
        super(props);
    }

    render(){
        return(
          <div className="main">
            <h1>How many Minutes of Exercise?</h1>
            <input id="minutesOfExercise" type="text" onChange={e => this.props.minutesChanged({minutes: e.target.value})}/>
          </div>
        )
      }
}

export default Exercise;