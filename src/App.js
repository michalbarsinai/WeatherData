import React, {useState, useEffect} from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import NightsStayIcon from '@material-ui/icons/NightsStay';
import Select from "./components/Select";
import Now from "./components/Now";
import Chart from "./components/Chart";


function App() {

  const [isSelected, setIsSelected] = useState(false);
  const [currentCity, setCurrentCity] = useState('');
  const [currentTime, setCurrentTime] = useState(0);

  useEffect(() => {
    setInterval(()=>{
      fetch('/time').then(res => res.json()).then(data => {
        setCurrentTime(data.now);
      });
    }, 1000);
  }, []);

  
  function handleSelect(selectedCity) {
    setCurrentCity(selectedCity);
    setIsSelected(true);
  }

  useEffect(() => {
    setIsSelected(false);
  }, []);

  function handleClick(event){
    if (isSelected) {
      return
    } else {
      event.preventDefault();
    }
  }


  return (
    <Router>
      <div className="card">
        <Link to="/" className="link">
          <div className="card-header">
            <h1 className="header-heading"><NightsStayIcon />SomeWeatherData</h1>
          </div>
        </Link>
        <p>Current time: {currentTime}</p>
        <div className="card-body">
          <div className="row align-items-center">
            <div className="col-6">
              <Select onSelect={handleSelect}/>
            </div>
            <div className="d-grid gap-2 col-6 mx-auto">
            <Link to="/now" className="link" onClick={handleClick}>
              <button className="btn btn-outline-dark" disabled={!isSelected}>
                  Current temp
              </button>
            </Link>
            <Link to="/chart" className="link" onClick={handleClick}>
              <button className="btn btn-outline-dark" disabled={!isSelected}>
                3 day forecast
              </button>
            </Link>
          </div>
        </div>
        </div>
      </div>
        <Switch>
          <Route path="/now">
              <div className="current-content">
                <Now selectedCity={currentCity} />
              </div>
          </Route>
          <Route path="/chart">
              <div className="chart">
                <Chart selectedCity={currentCity}/>
              </div>
          </Route>
        </Switch>
    </Router>
  );
}

export default App;

