import React, {useEffect, useState} from "react";
import { Route } from "react-router";
import Paper from '@material-ui/core/Paper';
import Divider from '@material-ui/core/Divider';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Grid from "@material-ui/core/Grid";
import ConditionIcon from './ConditionIcon';


const CurrentWeather = (props) => {

  const [currentData, setCurrentData] = useState({
    actual: "",
    feelsLike: "",
    iconPath: "",
    iconDescription: ""
  });

  useEffect(() => {

    if (!props.selectedCity) {return}
    const storage = window.localStorage;
    const storageKey = `${props.selectedCity.replace(' ', '')}Current`;

    const getData = async () => {
      const response = await fetch(`/weather/${props.selectedCity}/current`);
      const jsonData = await response.json();
      const {feelslike_c, temp_c, condition} = jsonData;
      const {icon, text} = condition;
      const data = JSON.stringify({       
        actual: temp_c,
        feelsLike: feelslike_c, 
        iconPath: icon,
        iconDescription: text,
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
      getData().then(res => setCurrentData(JSON.parse(res)));
      return
    }
    setCurrentData(JSON.parse(storage.getItem(storageKey)));
  }, [props.selectedCity]);
  
  

  return (
    <Route path={props.path}>

      <Paper>
        <Grid container>

          <Grid item xs={6}>
            <List>
              <ListItem>
                <ListItemText primary={`current temperature: ${currentData.actual} ℃`}/>
              </ListItem>
              <Divider />
              <ListItem>
                <ListItemText primary={`feels like: ${currentData.feelsLike} ℃`}/>
              </ListItem>
            </List>
          </Grid>

          <Grid item xs={6} container>
            <ConditionIcon path={currentData.iconPath} text={currentData.iconDescription}/>
          </Grid>

        </Grid>
      </Paper>

    </Route>
  )
}


export default CurrentWeather;
