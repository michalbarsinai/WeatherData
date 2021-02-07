import React, {useState} from 'react';
import {
  BrowserRouter as Router,
  Switch,
  } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import Card from "react-bootstrap/Card";
import HeaderTitle from "./components/HeaderTitle"
import SelectCity from "./components/SelectCity";
import CurrentTemp from "./components/CurrentTemp";
import Chart from "./components/Chart";
import DataButton from './components/DataButton';


const App = () => {

  const [currentCity, setCurrentCity] = useState('');

  const handleSelect = (selectedCity) => {
    setCurrentCity(selectedCity)
  }


  return (
    <Router>
      <Card border="light" style={{ width: '100%' }}>
        <HeaderTitle />

        <Card.Body>
          <SelectCity onSelect={handleSelect}/>
          <DataButton to="/currenttemp" isEnabled={currentCity} dataTitle="Current temp" />
          <DataButton to="/chart" isEnabled={currentCity} dataTitle="3 day forecast" />
        </Card.Body>

        <Switch>
          <CurrentTemp path="/currenttemp" selectedCity={currentCity} />
          <Chart path="/chart" selectedCity={currentCity}/>
        </Switch>

      </Card>
    </Router>
  );
}

export default App;