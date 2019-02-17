import React, {Component} from 'react';
import { Chart } from "react-google-charts";
import { render } from "react-dom";

class Visual extends Component{
  constructor(){
    super();
  }

  render(){

    return(
      <Chart
        width={'500px'}
        height={'300px'}
        chartType="LineChart"
        loader={<div>Loading Chart</div>}
        data={this.props.data}
        options={{
          title: 'Caffeine Intake',
          legend: { position: 'none' },
        }}
        rootProps={{ 'data-testid': '1' }}
      />
    );
  }
}

export default Visual;