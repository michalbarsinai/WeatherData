import React, {useEffect, useState} from "react";
import { Route } from "react-router";

const CurrentTemp = (props) => {

  const [currentTemp, setCurrentTemp] = useState({});
  const [cachedCities, setCachedCities] = useState([]);

  useEffect(() => {
    if (props.selectedCity === "") {return}
    if (cachedCities !== []) {
      const cityObj = cachedCities.find(city => city.name === props.selectedCity);
      const now = Date.now();
      if (cityObj !== undefined && (Math.abs(cityObj.lastUpdate - now)/36e5) < 1) {
        setCurrentTemp(() => {
          console.log("data loaded from cached: ");
          console.log(cityObj.tempData);
          return cityObj.tempData;
        });
        return
        }
      }
    const fetchData = async () => {
      const response = await fetch(`http://api.weatherapi.com/v1/forecast.json?key=${process.env.REACT_APP_WEATHER_APIKEY}&q=${props.selectedCity}&days=3`);
      const jsonData = await response.json();
      const {current, location: {name}} = jsonData;
      
      setCurrentTemp({
          actual: current.temp_c,
          feelsLike: current.feelslike_c
      });

      setCachedCities(prevCities => 
        [...prevCities, {
          name: name,
          tempData: {
            actual: current.temp_c,
            feelsLike: current.feelslike_c
          },
          lastUpdate: Date.now()
        }
      ]);
      console.log(`new data was cashed for ${name}`);
    }

    fetchData();
  }, [props.selectedCity, cachedCities]);

  return (
    <Route path={props.path}>
      <div className="current-content">
        <h1>Current Temperature: {currentTemp.actual}</h1>
        <h3>feels like: {currentTemp.feelsLike}</h3>
      </div>
    </Route>
  )
}

export default CurrentTemp;