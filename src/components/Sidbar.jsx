import React from 'react';
import Paper from '@material-ui/core/Paper';
import List from '@material-ui/core/List';
import CssBaseline from '@material-ui/core/CssBaseline';

import SelectCity from './Sidebar-components/SelectCity';
import DataOption from './Sidebar-components/DataOption'



const Sidbar = (props) => {

    return (
      <React.Fragment>
        <CssBaseline />

        <SelectCity onSelect={props.onSelect} />
 
        <List>
          <Paper>
          <DataOption 
            linkPath={'/currenttemp'}
            iconName={'update'}
            dataName={'Current weather'}
            isEnabled={props.isEnabled}
          />
          <DataOption 
            linkPath={'/chart'}
            iconName={'time'}
            dataName={'3 day forecast'}
            isEnabled={props.isEnabled}
          />
        </Paper>
      </List>
        
    </React.Fragment>
  )
}

export default Sidbar;

  