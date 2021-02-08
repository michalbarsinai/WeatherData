import React, { useState } from 'react'
import { Button, Form } from 'semantic-ui-react'

const AddComment = (props) => {

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
    
    // const timeOptions = { dateStyle: 'medium', timeStyle: 'short' };

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
            timeStamp: new Date(commentData.timeStamp)
        });
        setCommentData({
            content: '',
            timeStamp: null
        });
        event.preventDefault();
    }

    return (
        <Form action='POST' onSubmit={handleSubmit} reply>
            <Form.TextArea onChange={handleChange} value={commentData.content}/>
            <Button type="submit" content='Add Comment' labelPosition='left' icon='edit' primary />
        </Form>
    )
}


export default AddComment;