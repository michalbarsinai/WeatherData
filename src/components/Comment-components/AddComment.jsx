import React, { useState } from 'react'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import {
    withStyles,
    makeStyles,
  } from '@material-ui/core/styles';

const CssTextField = withStyles({
    root: {
      '& label.Mui-focused': {
        color: '#d63447',
      },
      '& .MuiInput-underline:after': {
        borderBottomColor: '#d63447',
      },
      '& .MuiOutlinedInput-root': {
        '& fieldset': {
          borderColor: 'red',
        },
        '&:hover fieldset': {
          borderColor: '#d63447',
        },
        '&.Mui-focused fieldset': {
          borderColor: '#d63447',
        },
      },
    },
  })(TextField);

  const useStyles = makeStyles((theme) => ({
    root: {
      display: 'flex',
      flexWrap: 'wrap',
    },
    margin: {
      marginTop: theme.spacing(1),
      marginBottom: theme.spacing(1),
      backgroundColor: 'white',
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
        <form autoComplete="off" action='POST' onSubmit={handleSubmit} className={classes.root} >
            <CssTextField
                className={`${classes.margin} comment-card`}
                variant="outlined"
                onChange={handleChange}
                value={commentData.content}
                id="custom-css-outlined-input"
            />
            <Button className='comment-card' type="submit" variant="contained" style={{backgroundColor: '#d63447', color: 'white'}}>
                Add Comment
            </Button>
        </form>
    )
}


export default AddComment;

