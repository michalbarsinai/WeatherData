import React, { useEffect, useState } from 'react';
import { Comment, Header } from 'semantic-ui-react';
import AddComment from './AddComment';
import SingleComment from './SingleComment';


const CommentFeed = () => {
    
    const [currentFeed, setCurrentFeed] = useState([])

    useEffect(() => {
        const getComments = async () => {
            const response = await fetch('/comments');
            const jsonComments = await response.json()
            const commentArray = jsonComments.hits.hits
            console.log(commentArray);
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
        <Comment.Group>
            <Header as='h3' dividing>Comments</Header>
            { /*Initial comment render */}
            {currentFeed.map(comment => {
                return (
                    <SingleComment
                        time={comment.timeStamp} 
                        content={comment.content}
                        key={comment.id ? comment.id : comment.timeStamp}
                    /> 
                )
            })}
             {/* insert <Overlay> from https://react-bootstrap.github.io/components/overlays/ */}
            <AddComment onAdd={handleAdd}/>
        </Comment.Group>
    )
}

export default CommentFeed;