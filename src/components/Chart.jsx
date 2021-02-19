import React, {useEffect, useState} from "react";
import { Route } from "react-router";
import {
    LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend
  } from 'recharts';
import Paper from '@material-ui/core/Paper';




const Chart = (props) => {
  
  const [weatherData, setWeatherData] = useState([]);

  useEffect(() => {
    
    if (props.selectedCity === "") {return}
    const storage = window.localStorage;
    const storageKey = `${props.selectedCity.replace(' ', '')}Forecast`;

    const getData = async () => {
      const response = await fetch(`/weather/${props.selectedCity}/forecast`);
      const jsonData = await response.json();
      let daysData = [];
      for (const k in jsonData) {
        daysData.push(jsonData[k])
      }
      const data = JSON.stringify({
        data: daysData,
        lastUpdate: Date.now()
      })
      storage.setItem(storageKey, data);
      return storage.getItem(storageKey)
    }

    const now = Date.now();

    if ((!storage.getItem(storageKey)) 
        || 
      ((now - JSON.parse(storage.getItem(storageKey)).lastUpdate)/36e5 > 0.5)) 
    {
      console.log("fetching");
      getData().then(res => setWeatherData((JSON.parse(res)).data))
      return
    }
    setWeatherData((JSON.parse(storage.getItem(storageKey)).data))
    
  }, [props.selectedCity]);

  const lineData = [['max', '#ffcc29'], ['avg', '#db6400'], ['min', '#845ec2']]

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload) {
      return (
        <div className="custom-tooltip">
          <p className="tooltip-label">{label}</p>
          {lineData.map((line) => {
            return(
              <p className="tooltip-info" key={line[0]}>
                <span>{`${payload[lineData.indexOf(line)].dataKey}: `}</span>
                {payload[lineData.indexOf(line)].value}
              </p>
            )
          })}
        </div>
      );
    }
    return null;
  }

  return (
    <Route path={props.path}>
      <div style={{height: 450, width: 450}}>
        <Paper elevation={3} style={{height: 450, width: 500}}>
          <LineChart
              height={450}
              width={450}
              data={weatherData}
              margin={{
              top: 30, left: 30, right: 30, bottom: 30
          }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" tickMargin={10}/>
            <YAxis type="number" label={{ value: '℃', angle: 0, position: 'insideLeft' }}/>
            <Tooltip content={<CustomTooltip />}/>
            <Legend layout='vertical' verticalAlign='top' align='right' iconType='circle' wrapperStyle={{right: -30}}/>
            {lineData.map(line => (
              <Line 
                type="monotone" 
                dataKey={line[0]} 
                stroke={line[1]} 
                animationDuration={900} 
                activeDot={{ r: 8 }} 
                key={line[0]}
              />
            ))}
          </LineChart>
        </Paper>
      </div>
    </Route>
  )
}




export default Chart;