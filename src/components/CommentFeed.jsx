import React, { useState }  from 'react';

import CssBaseline from '@material-ui/core/CssBaseline';

import FeedHead from './Comment-components/FeedHead'
import FeedBody from './Comment-components/FeedBody';




const CommentFeed = () => {
    
    const [isClicked, setIsClicked] = useState(false)

    const handleClick = () => {
        setIsClicked(!isClicked);
    }

    return (
        <React.Fragment>
            <CssBaseline />
            <FeedHead onClick={handleClick}/>
            <FeedBody onClick={isClicked} onAdd={handleClick}/>
        </React.Fragment>   
    )
}

export default CommentFeed;

    
    


 