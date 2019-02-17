import React, {Component} from 'react';
import { Chart } from "react-google-charts";
import { render } from "react-dom";

class Visual extends Component{
  constructor(props){
    super(props);
  }

  render(){
    if(this.props.title === "mood"){
      return(<div className="main">
        <Chart
          width={'500px'}
          height={'200px'}
          chartType="Histogram"
          loader={<div>Loading Chart</div>}
          data={this.props.data}
          options={{
            title: this.props.title,
            legend: { position: 'none' },
            animation: {
              startup: true,
              easing: 'linear',
              duration: 1500,
            },
          }}
          color="black"
          rootProps={{ 'data-testid': '1' }}
          chartEvents={[
            {
              eventName: 'animationfinish',
              callback: () => {
                console.log('Animation Finished')
              },
            },
          ]}
        />
      </div>);
    }

    return(
      <div className="main">
      <Chart
        width={'500px'}
        height={'200px'}
        chartType="LineChart"
        loader={<div>Loading Chart</div>}
        data={this.props.data}
        options={{
          title: this.props.title,
          legend: { position: 'none' },
          animation: {
            startup: true,
            easing: 'linear',
            duration: 1500,
          },
        }}
        color="black"
        rootProps={{ 'data-testid': '1' }}
        chartEvents={[
          {
            eventName: 'animationfinish',
            callback: () => {
              console.log('Animation Finished')
            },
          },
        ]}
      />
      </div>
    );
  }
}

export default Visual;