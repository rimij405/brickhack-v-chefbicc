import React, { Component } from 'react';

class Exercise extends Component {
    constructor(props) {
        super(props);
    }

    render(){
        return(
          <div>
            <p>How many Minutes of Exercise?</p>
            <input id="minutesOfExercise" type="text" onChange={e => this.props.minutesChanged({minutes: e.target.value})}/>
          </div>
        )
      }
}

export default Exercise;