import React, { useState } from "react";
import {ButtonGroup, Dropdown, DropdownButton} from "react-bootstrap"


  
const SelectCity = (props) => {

  const [title, setTitle] = useState("select city");

  const handleChange = (eventKey) => {
    setTitle(eventKey)
    props.onSelect(eventKey);
  }
  const cityOptions = ['Barcelona', 'Berlin', 'London', 'New York', 'Sydney', 'Tel Aviv-Yaffo', 'Tokyo', 'Paris'];

  return(    
    <DropdownButton 
      className="shadow-none" 
      size="lg" as={ButtonGroup} 
      variant="dark" 
      id="dropdown-item-button" 
      title={title}
    >
    {cityOptions.map(city => 
    (<Dropdown.Item 
          onSelect={handleChange} 
          eventKey={city} 
          key={city}>{city}
      </Dropdown.Item>)
    )}
    </DropdownButton>
  )
}

export default SelectCity;
