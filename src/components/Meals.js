import React, { Component } from 'react';

class Meals extends Component {
    constructor(props) {
        super(props);
    }

    render(){
        return(
          <div className="main">
            <h1>How Many Meals Did You Have Today??</h1>
            <select id="meals" type="text" onChange={e => this.props.mealsChanged({meals: e.target.value})}>
            <option>0</option>     
            <option>1</option>      
            <option>2</option>  
            <option>3</option>   
            <option>3+</option>
            </select>
          </div>
        )
      }
}

export default Meals;