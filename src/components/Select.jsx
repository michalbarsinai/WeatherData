import React, { useState } from "react";

  
function Select(props) {

    const [city, setCity] = useState('');

    function handleChange(event){
      props.onSelect(event.target.value);
      setCity(event.target.value)
    }

    return (
        <select className="form-select" aria-label="Default select example" onChange={handleChange}>
          <option value={city}>{(city === "" ? "Select city" : city)}</option>
          <option value={"Barcelona"}>Barcelona</option>
          <option value={"Berlin"}>Berlin</option>
          <option value={"London"}>London</option>
          <option value={"New-York"}>New-York</option>
          <option value={"Tel-Aviv"}>Tel-Aviv</option>
          <option value={"Paris"}>Paris</option>
        </select>
      );
  }

export default Select;
