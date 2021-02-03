import React from "react";
import {Link} from "react-router-dom";

const DataButton = (props) => {

  const handleClick = (event) => {
      //if a city was selected -->
      if (props.isEnabled) {
        //don't do anything and return (clicking link will switch route)
        return
      //if a city was not selected -->
      } else {
        //prevent the click to follow link url
        event.preventDefault();
      }
    }

  return (
      <Link to={props.to} className="link" onClick={handleClick}>
          <button className="btn btn-outline-dark" disabled={!props.isEnabled}>
              {props.dataTitle}
          </button>
      </Link>
  )
}

export default DataButton;