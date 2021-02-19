import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import NightsStayIcon from '@material-ui/icons/NightsStay';


const AppHeader = () => {

  return (
      <AppBar position="static" style={{backgroundColor: '#d63447'}}>
        <Toolbar>
          <Typography variant="h4">
            <NightsStayIcon />SomeWeatherData
          </Typography>
        </Toolbar>
      </AppBar>
  );
}


export default AppHeader;