import React from "react";
import {Link} from "react-router-dom";
import NightsStayIcon from '@material-ui/icons/NightsStay';


const HeaderTitle = () => {
    return (
        <Link to="/" className="link">
          <div className="card-header">
            <h1 className="header-heading"><NightsStayIcon />SomeWeatherData</h1>
          </div>
        </Link>
    )
}

export default HeaderTitle;