import React from "react";
import {Link} from "react-router-dom";
import Card from "react-bootstrap/Card";
import NightsStayIcon from "@material-ui/icons/NightsStay";


const HeaderTitle = () => {
    return (
      <Card.Header style={{backgroundColor: '#61b15a'}}>
        <Link to="/" className="link">
          <h1 className="header-heading"><NightsStayIcon fontSize="inherit"/>SomeWeatherData</h1>
        </Link>
      </Card.Header>
      
    )
}

export default HeaderTitle;