import React from 'react';
import {Link} from 'react-router-dom';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import TimelineIcon from '@material-ui/icons/Timeline';
import UpdateIcon from '@material-ui/icons/Update';


const DataOption = (props) => {

    const {linkPath, iconName, dataName} = props;

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
        <Link to={linkPath} onClick={handleClick} className="link">
            <ListItem>
            <ListItemIcon>
                {iconName === 'update' ? <UpdateIcon fontSize="small" /> : <TimelineIcon fontSize="small" />}
            </ListItemIcon>
            <ListItemText primary={dataName} />
            </ListItem>
        </Link>
    )
}

export default DataOption;


