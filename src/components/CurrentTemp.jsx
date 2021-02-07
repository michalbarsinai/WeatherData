import React, {useEffect, useState} from "react";
import { Route } from "react-router";
import ListGroup from "react-bootstrap/ListGroup"


const CurrentTemp = (props) => {

  const [currentData, setCurrentData] = useState({
    actual: "",
    feelsLike: ""
  });
  
  useEffect(() => {

    if (!props.selectedCity) {return}
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
      <ListGroup variant="flush">
        <ListGroup.Item className="temp-line">
          current temperature: <span className="temp-num">{currentData.actual} ℃</span>
        </ListGroup.Item>
        <ListGroup.Item className="temp-line">
          feels like: <span className="temp-num">{currentData.feelsLike} ℃</span>
        </ListGroup.Item>
      </ListGroup>
    </Route>
  )
}


export default CurrentTemp;
