import 'semantic-ui-css/semantic.min.css'
import React, {useState} from 'react';
import {
  BrowserRouter as Router,
  Switch,
  } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import {Card, Col, Row} from "react-bootstrap";
import HeaderTitle from "./components/HeaderTitle"
import SelectCity from "./components/SelectCity";
import CurrentTemp from "./components/CurrentTemp";
import Chart from "./components/Chart";
import DataButton from './components/DataButton';
import CommentFeed from './components/CommentFeed';


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
          <Row>
            <Col sm={6}>
              <SelectCity onSelect={handleSelect}/>
              <DataButton to="/currenttemp" isEnabled={currentCity} dataTitle="Current temp" />
              <DataButton to="/chart" isEnabled={currentCity} dataTitle="3 day forecast" />
              <Switch>
                <CurrentTemp path="/currenttemp" selectedCity={currentCity} />
                <Chart path="/chart" selectedCity={currentCity}/>
              </Switch>
            </Col>
            <Col sm={6}>
              <CommentFeed />
            </Col>
          </Row>
        </Card.Body>

      </Card>
    </Router>
  );
}

export default App;