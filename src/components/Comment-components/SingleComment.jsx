import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemText from '@material-ui/core/ListItemText';


const SingleComment = (props) => {

    const timeOptions = { dateStyle: 'medium', timeStyle: 'short' };
    const timeObj = props.time;
    const timeStr = timeObj.toLocaleString('en-US', timeOptions);
    
    return (
        <ListItem style={{height: 100}}>
            <ListItemAvatar>
                <Avatar alt="Profile Picture">R</Avatar>
            </ListItemAvatar>
            <ListItemText primary={props.content} secondary={`username ${timeStr}`}/>
        </ListItem>
      );
    }



export default SingleComment;