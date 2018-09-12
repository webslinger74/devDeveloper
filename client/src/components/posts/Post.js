import React, { Component } from 'react';
import { connect } from 'react-redux';
import PostForm from './PostForm';
import PostFeed from './PostFeed.js';
import Spinner from '../common/Spinner';
import { getPosts } from '../../actions/postActions';

class Posts extends Component {

    componentDidMount(){
        this.props.getPosts();
    }




    render(){

        const { posts, loading } = this.props.post;
            let postContent;


            if(posts === null || loading ){
             //   postContent = <Spinner />
            } else {
                postContent = <PostFeed posts={posts}/>
            }


        return (

            <div className="feed">
            <div className="container">
            <div className="row">
            <div className="col-md-12">
                <PostForm />
                {postContent}
            </div>
            
            </div>
            
            </div>
            </div>
        )
    }
}

const actions = {
    getPosts
}
const mapStateToProps = (state) => {
    return {
        post: state.post
    }
}

export default connect(mapStateToProps, actions)(Posts);