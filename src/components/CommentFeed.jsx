import React, { useEffect, useState }  from 'react';
import AddComment from './AddComment';
import SingleComment from './SingleComment';
import List from '@material-ui/core/List';


const CommentFeed = () => {
    

    const [currentFeed, setCurrentFeed] = useState([])

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
                }).reverse()
            )
        }
        getComments();
    }, [])
    
    const handleAdd = (newComment) => {
        setCurrentFeed(prevComments => [...prevComments, newComment]);
    }

    return (
            <List>
                <h3>Comments</h3>
                {currentFeed.map(comment => {
                    return (
                        <SingleComment
                            time={comment.timeStamp} 
                            content={comment.content}
                            key={comment.id ? comment.id : comment.tempId}
                        /> 
                    )
                })}
                <AddComment onAdd={handleAdd}/>
            </List>


        
    )
}

export default CommentFeed;
