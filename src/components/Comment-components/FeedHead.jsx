import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

import AddIcon from '@material-ui/icons/Add';
import AppBar from '@material-ui/core/AppBar';

import Fab from '@material-ui/core/Fab';

import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles(() => ({
    fabButton: {
        position: 'absolute',
        zIndex: 1,
        bottom: -30,
        left: 0,
        right: -100,
        margin: '0 auto',
      }
}));


const FeedHead = (props) => {
    const classes = useStyles();

    return (
        <React.Fragment>
            <AppBar position="sticky" style={{backgroundColor: '#f57b51'}} className="component-head">
                <Toolbar>
                    <Typography variant="h6" color="inherit">
                        Comments
                    </Typography>
                    <Fab style={{backgroundColor: '#ffd31d'}} aria-label="add" className={classes.fabButton}>
                        <AddIcon onClick={() => props.onClick()}/>
                    </Fab>
                </Toolbar>
            </AppBar>
        </React.Fragment>
    )

}

export default FeedHead;

