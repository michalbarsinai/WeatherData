import React, {useEffect, useState} from "react";
import { Route } from "react-router";
import Paper from '@material-ui/core/Paper';
import Divider from '@material-ui/core/Divider';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';




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

        <Paper>
        <List>
          <ListItem divider>
            <ListItemText primary={`current temperature: ${currentData.actual} ℃`}/>
          </ListItem>
          <Divider />
          <ListItem divider>
            <ListItemText primary={`feels like: ${currentData.feelsLike} ℃`}/>
          </ListItem>
          </List>
        </Paper>

    </Route>
  )
}


export default CurrentTemp;
