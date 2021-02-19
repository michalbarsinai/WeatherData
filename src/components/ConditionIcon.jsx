import React from 'react';
import Icon from '@material-ui/core/Icon';
import Tooltip from '@material-ui/core/Tooltip';
import { makeStyles } from '@material-ui/core/styles';

const useStylesTooltip = makeStyles((theme) => ({
    tooltip: {
        backgroundColor: 'rgba(240, 240, 240, 0.8)',
        color: 'rgba(0, 0, 0)',
        boxShadow: theme.shadows[1],
        fontSize: 14,
      }
  }));


const ConditionIcon = (props) => {
 
    const {path, text} = props
    const classes = useStylesTooltip();

    return(
        <Tooltip title={text} placement='right' classes={classes}>
            <Icon component='div' style={{height: 100, width: 100, margin: 'auto'}}>
                <img src={path} height='100' width='100' alt={text}/>
            </Icon>
        </Tooltip>
    )
};

export default ConditionIcon;