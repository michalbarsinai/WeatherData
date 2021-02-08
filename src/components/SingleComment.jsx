import React from 'react';
import { Comment } from 'semantic-ui-react';



const SingleComment = (props) => {

    const timeOptions = { dateStyle: 'medium', timeStyle: 'short' };
    const timeObj = props.time;
    

    return(
        <Comment>
            {/* <Comment.Avatar src={props.avatar} /> */}
            <Comment.Content>
                {/* <Comment.Author as='a'>{props.user}</Comment.Author> */}
                <Comment.Metadata>{timeObj.toLocaleString('en-US', timeOptions)}</Comment.Metadata>
                <Comment.Text>{props.content}</Comment.Text>
                {/* {will be added later on */}
            {/* <Comment.Actions>
                    <Comment.Action>Reply</Comment.Action> 
                    <Comment.Action>Like</Comment.Action>
                </Comment.Actions> */}
            </Comment.Content>
        </Comment>
    )
}




export default SingleComment;