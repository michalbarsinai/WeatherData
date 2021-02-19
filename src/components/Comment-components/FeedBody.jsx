import React, { useEffect, useState }  from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Collapse from '@material-ui/core/Collapse';
import Divider from '@material-ui/core/Divider';
import List from '@material-ui/core/List';
import Paper from '@material-ui/core/Paper';

import AddComment from './AddComment';
import SingleComment from './SingleComment';

const useStyles = makeStyles((theme) => ({
    list: {
      marginBottom: theme.spacing(2),
    }
}));

const FeedBody = (props) => {

    const classes = useStyles();
    const [currentFeed, setCurrentFeed] = useState([]);


    useEffect(() => {
        const getComments = async () => {
            const response = await fetch('/comments');
            const jsonComments = await response.json()
            const commentArray = jsonComments.hits.hits
            setCurrentFeed(() => 
                commentArray.map(comment => {
                    return {
                        content: comment._source.content,
                        timeStamp: new Date(comment._source.timeStamp),
                        id: comment._id
                    }
                })
            )
        }
        getComments();
    }, [])

    const handleAdd = (newComment) => {
        setCurrentFeed(prevComments => [newComment, ...prevComments]);
        props.onAdd();
    }

    return (
        <List className={`${classes.list} comment-list`}>
            <Collapse in={props.onClick}>
                <AddComment onAdd={handleAdd}/>
            </Collapse>
            <Paper>
            {currentFeed.map(comment => (
                <React.Fragment key={comment.id ? comment.id : comment.tempId}>
                    <SingleComment
                        time={comment.timeStamp} 
                        content={comment.content}
                    />
                    <Divider />
                </React.Fragment>
            ))}
            </Paper>
        </List>
    )
}

export default FeedBody;
