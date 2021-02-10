import React from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import Typography from '@material-ui/core/Typography';
import Avatar from '@material-ui/core/Avatar';
// import Button from '@material-ui/core/Button';
// import CardActions from '@material-ui/core/CardActions';

const SingleComment = (props) => {

    const timeOptions = { dateStyle: 'medium', timeStyle: 'short' };
    const timeObj = props.time;
    
    return (
        <Card className="comment-card">  
            <CardHeader
                avatar={
                    <Avatar aria-label="recipe" >
                        R
                    </Avatar>
                }
                title="User name"
                variant="subtitle1"
                subheader={timeObj.toLocaleString('en-US', timeOptions)}
            />
            <CardContent>
                <Typography variant="body2">
                    {props.content}
                </Typography>
            </CardContent>
        </Card>
      );
    }



export default SingleComment;