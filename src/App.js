import React, {useState} from 'react';
import {
  BrowserRouter as Router,
  Switch,
  } from "react-router-dom";
import Grid from '@material-ui/core/Grid';
import AppHeader from "./components/AppHeader"
import CurrentTemp from "./components/CurrentTemp";
import Chart from "./components/Chart";
import CommentFeed from './components/CommentFeed';
import Sidbar from './components/Sidbar'


const App = () => {

  const [currentCity, setCurrentCity] = useState('');

  const handleSelect = (selectedCity) => {
    setCurrentCity(selectedCity)
  }
//divide to more components

  return (
    <Router>

        <Grid 
          container
          justify="space-evenly"
          alignItems="flex-start"
          spacing={5}
          >
    
          <Grid item xs={12}>
            <AppHeader />
          </Grid>

          <Grid item md={2}>
            <Sidbar isEnabled={currentCity} onSelect={handleSelect}/>
          </Grid>
            
          <Grid item md={5}>
            <Switch>
                <CurrentTemp path="/currenttemp" selectedCity={currentCity} />
                <Chart path="/chart" selectedCity={currentCity}/>
            </Switch>
          </Grid>

          <Grid item md={4}>
            <CommentFeed />
          </Grid>
        </Grid>

    </Router>
  );
}

export default App;