import React, { Component } from 'react';

class Caffeine extends Component{
  constructor(props){
    super(props);
  }

  render(){
    return(
      <div>
        <p>How many Cups of Caffeine?</p>
        <input id="cupsOfCoffee" type="text" onChange={e => this.props.cupsChanged({cups: e.target.value})}/>
      </div>
    )
  }
}

export default Caffeine;