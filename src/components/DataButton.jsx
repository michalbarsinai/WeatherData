import React from "react";
import { LinkContainer } from 'react-router-bootstrap';
import Button from "react-bootstrap/Button"

const DataButton = (props) => {
  // const [checked, setChecked] = useState(false);

  const handleClick = (event) => {
      //if a city was selected -->
      if (props.isEnabled) {
        return
      //if a city was not selected -->
      } else {
        // prevent the click to follow link url if city not chosen
        event.preventDefault();
      }
  }
  
  return (
    <LinkContainer to={props.to} onClick={handleClick}>
      <Button className="btn-lg" variant="light" disabled={!props.isEnabled}>
        {props.dataTitle}
      </Button>
    </LinkContainer>
  )
}

export default DataButton;