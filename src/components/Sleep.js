import React, { Component } from 'react';

class Sleep extends Component {
    constructor(props) {
        super(props);
    }

    render(){
        return(
          <div>
            <p>How many Hours of Sleep?</p>
            <input id="hoursOfSleep" type="text" onChange={e => this.props.sleepChanged({sleep: e.target.value})}/>
          </div>
        )
      }
}

export default Sleep;