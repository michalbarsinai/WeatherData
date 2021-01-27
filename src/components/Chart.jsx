import React, {useEffect, useState} from "react";
import { Route } from "react-router";
import {
    LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
  } from 'recharts';

const Chart = (props) => {

    const [weatherData, setWeatherData] = useState([]);
    const [cachedCities, setCachedCities] = useState([]);
  
    useEffect(() => {
        //check if a selection was made
        if (props.selectedCity === '') {return}
        //check if data for selected city already cached
        if (cachedCities !== []) {
            const cityObj = cachedCities.find(city => city.name === props.selectedCity);
            const now = Date.now();
            if (cityObj !== undefined && (Math.abs(cityObj.lastUpdate - now)/36e5) < 1) {
                setWeatherData(() => {
                    console.log("data loaded from cached: ");
                    console.log(cityObj);
                    return cityObj.data;
                });
                return
            }
        }
        const fetchData = async () => {
            const response = await fetch(`http://api.weatherapi.com/v1/forecast.json?key=${process.env.REACT_APP_WEATHER_APIKEY}&q=${props.selectedCity}&days=3`);
            const jsonData = await response.json();
            const {forecast: {forecastday}, location: {name}} = jsonData;
            setWeatherData([]);
            
            forecastday.map(dayObj => setWeatherData(prevData =>
                    [...prevData, {
                        name: dayObj.date, 
                        min: dayObj.day.mintemp_c,
                        avg: dayObj.day.avgtemp_c, 
                        max: dayObj.day.maxtemp_c
                    }]
                )
            );
            setCachedCities(prevCities => 
                [...prevCities, {
                    name: name,
                    data: forecastday.map(dayObj => {
                            return {
                                name: dayObj.date, 
                                min: dayObj.day.mintemp_c,
                                avg: dayObj.day.avgtemp_c, 
                                max: dayObj.day.maxtemp_c
                            }
                        }),       
                    lastUpdate: Date.now()
                    }
                ]
            );
            console.log(`new data was cashed for ${name}`);
        }
            
        //will fetch data if:
        //1. A city was chosen
        //2. A city was chosen but has no cached data
        //3. A city was chosen and has cached but expired data (over 1 hour old)
        fetchData();
    }, [props.selectedCity, cachedCities]);

    return (
        <Route path={props.path}>
            <div className="chart">
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
            </div>
        </Route>
    )
}


export default Chart;