import React, { useState } from "react";

  
const SelectCity = (props) => {

    const [city, setCity] = useState('');

    const handleChange = (event) => {
      props.onSelect(event.target.value);
      setCity(event.target.value)
    }

    return (
      <div className="col-6">
        <select className="form-select" aria-label="Default select example" onChange={handleChange}>
          <option value={city}>{(city === "" ? "Select city" : city)}</option>
          <option value={"Barcelona"}>Barcelona</option>
          <option value={"Berlin"}>Berlin</option>
          <option value={"London"}>London</option>
          <option value={"New York"}>New York</option>
          <option value={"Tel Aviv-Yafo"}>Tel Aviv-Yafo</option>
          <option value={"Paris"}>Paris</option>
        </select>
      </div>
      )
  }

export default SelectCity;
