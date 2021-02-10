import React from 'react';
import Paper from '@material-ui/core/Paper';
import MenuItem from '@material-ui/core/MenuItem';
import MenuList from '@material-ui/core/MenuList';
import {Link} from 'react-router-dom';
import SelectCity from './SelectCity'



const Sidbar = (props) => {

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
      <Paper>
        <MenuList>
          <MenuItem><SelectCity onSelect={props.onSelect} /></MenuItem>
          <MenuItem><Link to='/currenttemp' onClick={handleClick} className="link">Current Temp</Link></MenuItem>
          <MenuItem><Link to='/chart' onClick={handleClick} className="link">3 day forecast</Link></MenuItem>
        </MenuList>
      </Paper>
    )
}

export default Sidbar;

  