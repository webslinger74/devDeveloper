import React, { Component } from 'react';
import CommentItem from './CommentItem';

class CommentFeed extends Component {
   


   

    render(){

        const { comments, postId } = this.props;
        console.log(comments);
        let comms;
         if(comments) {comms = comments.map(comment => (<CommentItem key={comment._id} comment={comment} postId={postId} />))
         } else {
             comms = null
         };




        return (
            <div>
        
        {comms}
     

        </div>
        )

    }

}

export default CommentFeed;