import React, { useState } from 'react'
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'

const useStyles = makeStyles((theme) => ({
    root: {
      '& > *': {
        margin: theme.spacing(1),
        width: '25ch',
      },
    },
  }));
  

const AddComment = (props) => {

    const classes = useStyles();
    const [commentData, setCommentData] = useState({
        userName: '',
        userAvatar: '',
        content: '',
        timeStamp: null
    })

    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(commentData)
    };
    

    const handleChange = (event) => {
        setCommentData(prevContent => (
            {...prevContent,
                content: event.target.value, 
                timeStamp: Date.now()
            }
        ));
    }


    const postToDatabase = async () => {
        fetch('/comments', requestOptions)
        .then(response => response.json())
        .then(data => {
        console.log('Success:', data);
        })
        .catch((error) => {
        console.error('Error:', error);
        });
    }


    const handleSubmit = (event) => {
        console.log(event);
        postToDatabase();
        props.onAdd({
            content: commentData.content,
            timeStamp: new Date(commentData.timeStamp),
            tempId: event.timeStamp
        });
        setCommentData({
            content: '',
            timeStamp: null
        });
        event.preventDefault();
    }

    return (
        <form className={classes.root} autoComplete="off" action='POST' onSubmit={handleSubmit}>
            <TextField 
                id="outlined-basic" 
                label="comment" variant="outlined" 
                onChange={handleChange} 
                value={commentData.content}
            />
            <Button type="submit" variant="contained" color="primary">
                Add Comment
            </Button>
        </form>
    )
}


export default AddComment;