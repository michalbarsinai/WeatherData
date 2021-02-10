import React, {useState} from 'react';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

  
const SelectCity = (props) => {

  const [title, setTitle] = useState('');

  const handleChange = (event) => {
    setTitle(event.target.value)
    props.onSelect(event.target.value);
  }
  const cityOptions = ['Barcelona', 'Berlin', 'London', 'New York', 'Sydney', 'Tel Aviv-Yaffo', 'Tokyo', 'Paris'];

  return(
    <FormControl fullWidth={true} variant="outlined" >
      <InputLabel id="demo-simple-select-outlined-label">Select city</InputLabel>
      <Select
        labelId="demo-simple-select-outlined-label"
        id="demo-simple-select-outlined"
        value={title}
        onChange={handleChange}
        label="Age"
      >
        <MenuItem value="">
          <em>None</em>
        </MenuItem>
        {cityOptions.map(city => (
          <MenuItem 
              onSelect={handleChange} 
              value={city} 
              key={city}>
              {city}
          </MenuItem>
          ))}
      </Select>
    </FormControl>
  )
}
   
export default SelectCity;
