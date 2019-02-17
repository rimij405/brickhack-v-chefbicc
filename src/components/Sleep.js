import React, { Component } from 'react';

class Sleep extends Component {
    constructor(props) {
        super(props);
    }

    render(){
        return(
          <div className="main">
            <h1>How many Hours of Sleep?</h1>
 
            <select id="hoursOfSleep" type="text" onChange={e => this.props.sleepChanged({sleep: e.target.value})}>
            <option>0-4</option>
            <option>4-8</option>
            <option>8-12</option>
            <option>12+</option>
            </select>
          </div>
        )
      }
}

export default Sleep;