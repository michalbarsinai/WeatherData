import React, {useState, useEffect} from 'react';
import {
  BrowserRouter as Router,
  Switch,
  } from "react-router-dom";
import HeaderTitle from "./components/HeaderTitle"
import SelectCity from "./components/SelectCity";
import CurrentTemp from "./components/CurrentTemp";
import Chart from "./components/Chart";
import DataButton from './components/DataButton';


const App = () => {

  const [isSelected, setIsSelected] = useState(false);
  const [currentCity, setCurrentCity] = useState('');

  const handleSelect = (selectedCity) => {
    setCurrentCity(selectedCity);
    setIsSelected(true);
  }

  useEffect(() => {
    setIsSelected(false);
  }, []);


  return (
    <Router>
      <div className="card">
        <HeaderTitle />

        <div className="card-body">
          <div className="row align-items-center">

            <SelectCity onSelect={handleSelect}/>

            <div className="d-grid gap-2 col-6 mx-auto">
              <DataButton to="/currenttemp" isEnabled={isSelected} dataTitle="Current temp" />
              <DataButton to="/chart" isEnabled={isSelected} dataTitle="3 day forecast" />
            </div>

          </div>
        </div>
      </div>

      <Switch>
        <CurrentTemp path="/currenttemp" selectedCity={currentCity} />
        <Chart path="/chart" selectedCity={currentCity}/>
      </Switch>

    </Router>
  );
}

export default App;