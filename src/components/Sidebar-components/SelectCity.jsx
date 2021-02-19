import React, {useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import ArrowDropDownRoundedIcon from '@material-ui/icons/ArrowDropDownRounded';
import Collapse from '@material-ui/core/Collapse';
import CssBaseline from '@material-ui/core/CssBaseline';
import Fab from '@material-ui/core/Fab';
import List from '@material-ui/core/List';
import MenuItem from '@material-ui/core/MenuItem';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { Paper } from '@material-ui/core';


const useStyles = makeStyles((theme) => ({
  root: {
      display: 'flex',
  },
  text: {
    padding: theme.spacing(2, 2, 0),
  },
  paper: {
    paddingBottom: 50,
  },
  list: {
    marginBottom: theme.spacing(2),
  },
  subheader: {
    backgroundColor: theme.palette.background.paper,
  },
  appBar: {
    top: 'auto',
    bottom: 0,
  },
  grow: {
    flexGrow: 1,
  },
  fabButton: {
    position: 'absolute',
    zIndex: 1,
    bottom: -30,
    left: 0,
    right: -100,
    margin: '0 auto',
  },
}));
  
const SelectCity = (props) => {

  const classes = useStyles();
  const [title, setTitle] = useState('Select city');
  const [isClicked, setIsClicked] = useState(false)

  const handleClick = () => {
    setIsClicked(!isClicked);
  }

  const handleSelect = (event) => {
    const selectedValue = event.currentTarget.dataset.myValue;
    setTitle(selectedValue);
    setIsClicked(!isClicked);
    props.onSelect(selectedValue);
  }

  const cityOptions = ['Barcelona', 'Berlin', 'London', 'New York', 'Sydney', 'Tel Aviv-Yaffo', 'Tokyo', 'Paris'];

  return(

    
      <React.Fragment>
      <CssBaseline />
      <AppBar position="sticky" className="component-head" style={{backgroundColor: '#f57b51'}}>
          <Toolbar>
              <Typography variant="h6" color="inherit">
                  {title}
              </Typography>
              <Fab style={{backgroundColor: '#ffd31d'}} aria-label="add" className={classes.fabButton}>
                  <ArrowDropDownRoundedIcon fontSize='large' onClick={handleClick}/>
              </Fab>
          </Toolbar>
      </AppBar>
      
      <Collapse in={isClicked}>
      <List className={`${classes.list} comment-list`}>
      <Paper>
        {cityOptions.map(city => (
          <MenuItem 
              onClick={handleSelect} 
              data-my-value={city}
              key={city}>
              {city}
          </MenuItem>
          ))}
          </Paper>
      </List>
    </Collapse>
    </React.Fragment>
  )
}
   
export default SelectCity;


