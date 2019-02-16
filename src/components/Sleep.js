import React, { Component } from 'react';

class Sleep extends Component {
    constructor(props) {
        super(props);
    }

    render(){
        return(
          <div className="main">
            <h1>How many Hours of Sleep?</h1>
            <select name="sleep">
            </select>
            <input id="hoursOfSleep" type="text" onChange={e => this.props.sleepChanged({sleep: e.target.value})}/>
          </div>
        )
      }
}

export default Sleep;