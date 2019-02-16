import React, { Component } from 'react';

class Meals extends Component {
    constructor(props) {
        super(props);
    }

    render(){
        return(
          <div className="main">
            <h1>How Many Meals Did You Have Today??</h1>
            <input id="meals" type="text" onChange={e => this.props.mealsChanged({meals: e.target.value})}/>
          </div>
        )
      }
}

export default Meals;