import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import NightsStayIcon from '@material-ui/icons/NightsStay';
// import Button from '@material-ui/core/Button';


const AppHeader = () => {

  return (
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h4">
            <NightsStayIcon />SomeWeatherData
          </Typography>
        </Toolbar>
      </AppBar>
  );
}


export default AppHeader;