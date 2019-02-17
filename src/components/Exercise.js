import React, { Component } from 'react';

class Exercise extends Component {
    constructor(props) {
        super(props);
    }

    render(){
        return(
          <div className="main">
            <h1>How many Minutes of Exercise?</h1>
            <select id="minutesOfExercise" type="text" onChange={e => this.props.minutesChanged({minutes: e.target.value})}>
            <option> &lt; 30 </option>
            <option>30-60</option>
            <option>60-120</option>
            <option>&gt; 120</option>
            </select>
          </div>
        )
      }
}

export default Exercise;