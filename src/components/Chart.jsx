import React, {useEffect, useState} from "react";
import {
    LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
  } from 'recharts';

function Chart(props){

    const [weatherData, setWeatherData] = useState([]);
  
    useEffect(() => {
        async function fetchData(){
            if (props.selectedCity === "") {return}
            const response = await fetch(`http://api.weatherapi.com/v1/forecast.json?key=${process.env.REACT_APP_WEATHER_APIKEY}&q=${props.selectedCity}&days=3`);
            const jsonData = await response.json();
            const {forecast: {forecastday}} = jsonData;
            setWeatherData([]);
        
            forecastday.map((dayObj) => {
                return setWeatherData(prevData => {
                    return [...prevData, {
                        name: dayObj.date, 
                        min: dayObj.day.mintemp_c, 
                        avg: dayObj.day.avgtemp_c, 
                        max: dayObj.day.maxtemp_c,
                    }]
                });
            });
        }
        fetchData() 
    }, [props.selectedCity]);

    return (
        <div>
        <LineChart
            width={600}
            height={350}
            data={weatherData}
            margin={{
            top: 5, right: 30, left: 20, bottom: 5,
        }}
        >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis label={{ value: '℃', angle: 0, position: 'insideLeft' }}/>
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="max" stroke="#f88f01" />
            <Line type="monotone" dataKey="avg" stroke="#16c79a" />
            <Line type="monotone" dataKey="min" stroke="#583d72" />
        </LineChart>
        </div>)
}


export default Chart;