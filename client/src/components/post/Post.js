import React, { Component } from 'react';
import { connect } from 'react-redux';
import Spinner from '../common/Spinner';
import { getPost } from '../../actions/postActions';
import PostItem from '../posts/PostItem';
import {Link} from 'react-router-dom';
import CommentForm from './CommentForm';
import CommentFeed from './CommentFeed';

class Post extends Component {


    componentDidMount() {
            this.props.getPost(this.props.match.params.id)
    }

        render(){

            const { post, loading } = this.props;
            let postContent;
            console.log(post, "this is")

            if(post === null   ||  loading ||  Object.keys(post).length === 0){
                postContent = <Spinner />
            } else {
                postContent = (
                    <div>
                            <PostItem post={post}  showActions={false} />
                    </div>
                )
            }




            return (
                <div className="post">
                <div className="container">
                <div className="row">
                <div className="col-md-12">
                <Link to="/feed" className="btn btn-light mb-3">
                Back to Feed
                </Link>
                {postContent}
                <CommentForm postId={post._id}/>
                <CommentFeed postId={post._id} comments={post.comments} />
                </div>
                </div>
                </div>
                </div>
            )

        }
}

const actions = {
    getPost
}

const mapStateToProps = (state) => {
    return {
        post: state.post.post
    }
}


export default connect(mapStateToProps, actions)(Post);

