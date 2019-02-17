import React, { Component } from 'react';
import Visual from './Visual';
import UserProfile from '../UserProfile';
import Home from './Home';

class Statistics extends Component {

  constructor(){
    super();
    this.state = {
      goBack: false
    }
  }

  createTable(body, value){
    var Caffeine = [];
    var Dates = [];
    var Data = [];
    Data.push(["Dates", value.charAt(0).toUpperCase() + value.substring(1, value.length)]);
    let length = body.length;
    for (let i = 0; i < length; i++) {
      let response = JSON.stringify(body[i]);
      let responses = response.split(",");
      for (let j = 0; j < responses.length; j++) {
        let values = responses[j].split(":");
        console.log(values);
        values[0] = values[0].replace("\"", "").replace("{", "").replace("}", "").replace("\"", "");
        values[1] = values[1].replace("\"", "").replace("{", "").replace("}", "").replace("\"", "");

        console.log(values[0]);
        if(values[0] === value){
          if(values[0] === "caffeine"){
            values[1] = values[1].replace(" oz", "");
          }
          if(values[0] === "mood"){
            Caffeine.push(values[1]);
            break;
          }
          Caffeine.push(parseInt(values[1]));
        }
        if(values[0] === 'date'){
          Dates.push(values[1]);
        }

      }
      console.log(responses);

    }

    for(let i=0;i<Caffeine.length; i++){
      Data.push([Dates[i], Caffeine[i]]);
    }

    console.log(Data);

    return(<Visual data={Data} title={value} />);


  }


  render(){
    if(this.state.goBack === true){
      return <Home username={UserProfile.getName()}/>
    }
    return(

      <div className="main">
        <h1>Statistics</h1>
        {this.createTable(this.props.body, "caffeine")}
        {this.createTable(this.props.body, "exercise")}
        {this.createTable(this.props.body, "mood")}
        <button onClick={e => this.setState({goBack: true}) }> Go Back </button>
      </div>
    );
  }
}

export default Statistics;