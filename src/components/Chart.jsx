import React, {useEffect, useState} from "react";
import { Route } from "react-router";
import {
    LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend
  } from 'recharts';
import Container from "react-bootstrap/Container";

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
    }

    const now = Date.now();

    if ((!storage.getItem(storageKey)) 
        || 
      ((now - JSON.parse(storage.getItem(storageKey)).lastUpdate)/36e5 > 0.5)) 
    {
      console.log("fetching");
      getData().then(() => setWeatherData(JSON.parse(storage.getItem(storageKey))));
    } else {
      setWeatherData(JSON.parse(storage.getItem(storageKey)))
    }
  }, [props.selectedCity]);

  const lineData = [['max', '#ffcc29'], ['avg', '#db6400'], ['min', '#845ec2']]

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload) {
      return (
        <div className="custom-tooltip">
          <p className="tooltip-label">{label}</p>
          <p className="tooltip-info"><span>{`${payload[0].dataKey}: `}</span>{payload[0].value}</p>
          <p className="tooltip-info"><span>{`${payload[1].dataKey}: `}</span>{payload[1].value}</p>
          <p className="tooltip-info"><span>{`${payload[2].dataKey}: `}</span>{payload[2].value}</p>
        </div>
      );
    }
    return null;
  };

  return (
      <Route path={props.path}>
        <Container>
            <LineChart
                width={450}
                height={350}
                data={weatherData.data}
                margin={{
                top: 10, right: 30, left: 20, bottom: 5,
            }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis label={{ value: '℃', angle: 0, position: 'insideLeft' }}/>
              <Tooltip content={<CustomTooltip />}/>
              <Legend layout='vertical' verticalAlign='top' align='right' iconType='circle' wrapperStyle={{right: -60 }}/>
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
        </Container>
      </Route>
  )
}


export default Chart;