import React, { Component } from 'react';

class Caffeine extends Component{
  constructor(props){
    super(props);
  }

  render(){
    return(
      <div className="question">
        <h1>How many Ounces of Caffeine?</h1>
        <select id="cupsOfCoffee" type="text" onChange={e => this.props.cupsChanged({caffeine: e.target.value})}>
        <option>8 oz</option>
        <option>16 oz</option>
        <option>20 oz</option>
        </select>
      </div>
    )
  }
}

export default Caffeine;