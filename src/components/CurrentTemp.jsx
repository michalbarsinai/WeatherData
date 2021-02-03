import React, {useEffect, useState} from "react";
import { Route } from "react-router";


const CurrentTemp = (props) => {

  const [currentData, setCurrentData] = useState({
    actual: "",
    feelsLike: ""
  });
  
  useEffect(() => {

    if (props.selectedCity === "") {return}
    const storage = window.localStorage;
    const storageKey = `${props.selectedCity.replace(' ', '')}Current`;

    const getData = async () => {
      const response = await fetch(`/weather/${props.selectedCity}/current`);
      const jsonData = await response.json();
      const {feelslike_c, temp_c} = jsonData;
      const data = JSON.stringify({       
        actual: temp_c,
        feelsLike: feelslike_c, 
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
      getData().then(() => setCurrentData(JSON.parse(storage.getItem(storageKey))));
    } else {
      setCurrentData(JSON.parse(storage.getItem(storageKey)))
    }
  }, [props.selectedCity]);

  return (
    <Route path={props.path}>
      <div className="current-content">
        <h1>Current Temperature: {currentData.actual}</h1>
        <h3>feels like: {currentData.feelsLike}</h3>
      </div>
    </Route>
  )
}

export default CurrentTemp;