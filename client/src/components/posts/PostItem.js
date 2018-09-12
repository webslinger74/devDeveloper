import React, { Component } from 'react';
import { connect } from 'react-redux';
import PostForm from './PostForm';
import PostFeed from './PostFeed.js';
import Spinner from '../common/Spinner';
import { getPosts, deletepost, addlike, removelike } from '../../actions/postActions';
import classnames from 'classnames';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

class PostItem extends Component {

    onDeleteClick = (id) => {
        console.log(id);
        this.props.deletepost(id);
    }

    addlike = (id) => {

      console.log("add like clicked", id)
      this.props.addlike(id);
    }

    removelike = (id) => {
      console.log("remove like clicked", id)
      this.props.removelike(id);
    }

    findUserLike = (likes) => {
      const { auth } = this.props;
      if(likes.filter(like => like.user === auth.user.id).length > 0){
          return true;
    } else {
        return false;
    }
  }

    render(){



        const { post, auth, showActions } = this.props;

        return (
            <div className="card card-body mb-3">
            <div className="row">
              <div className="col-md-2">
                <a href="profile.html">
                  <img className="rounded-circle d-none d-md-block" src={post.avatar}
                    alt="" />
                </a>
                <br />
                <p className="text-center">{post.name}</p>
              </div>
              <div className="col-md-10">
                <p className="lead">{post.text}</p>
               {showActions ? (<span>  <button onClick={() => this.addlike(post._id)} type="button" className="btn btn-light mr-1">
               
               <i className={classnames('fas fa-thumbs-up', {'text-info': this.findUserLike(post.likes)})} />


                 <span className="badge badge-light">{post.likes.length}</span>
               </button>
              
              
               <button onClick={() => this.removelike(post._id)} type="button" className="btn btn-light mr-1">
                 <i className="text-secondary fas fa-thumbs-down"></i>
               </button>
               <Link to={`/post/${post._id}`} className="btn btn-info mr-1">
                 Comments
               </Link>
               {post.user === auth.user.id ? 
                   (<button onClick={() => this.onDeleteClick(post._id)} type="button" className="btn btn-danger mr-1">
                   <i className="fas fa-times" />
                 </button> ): null }</span>) : null}
               
                             
              

            </div>
            </div>
          </div>

       
        )

    }


}
const actions = {
  deletepost,
  addlike,
  removelike
}

PostItem.defaultProps = {
  showActions : true
}

const mapStateToProps = (state) => {
    return {
        auth: state.auth
        }
    }


export default connect(mapStateToProps, actions)(PostItem);