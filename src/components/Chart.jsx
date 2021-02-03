import React, {useEffect, useState} from "react";
import { Route } from "react-router";
import {
    LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
  } from 'recharts';

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

  return (
      <Route path={props.path}>
          <div className="chart">
              <LineChart
                  width={600}
                  height={350}
                  data={weatherData.data}
                  margin={{
                  top: 5, right: 30, left: 20, bottom: 5,
              }}
              >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis label={{ value: '℃', angle: 0, position: 'insideLeft' }}/>
                  <Tooltip />
                  <Legend verticalAlign="top" height={36}/>
                  <Line type="monotone" dataKey="max" stroke="#f88f01" />
                  <Line type="monotone" dataKey="avg" stroke="#16c79a" />
                  <Line type="monotone" dataKey="min" stroke="#583d72" />
              </LineChart>
          </div>
      </Route>
  )
}


export default Chart;