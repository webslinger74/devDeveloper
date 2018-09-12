import React, { Component } from 'react';
import { connect } from 'react-redux';
import TextAreaFieldGroup from '../common/TextAreaFieldGroup';
import { addComment } from '../../actions/postActions';

class CommentForm extends Component {
    constructor(props){
        super(props);
        this.state = {
            text:'',
            errors: {}
        }

    }

    componentWillReceiveProps(newProps){
        if(newProps.errors){
            this.setState({
                errors: newProps.errors
            });
        }

    }   
    onSubmit = (e) => {
        e.preventDefault();
        const { user } = this.props.auth;
        const { postId } = this.props;

        const newComment = {
            text:this.state.text,
            name: user.name,
            avatar:user.avatar
        }

        this.props.addComment(postId, newComment);
        console.log('add post been called');
        this.setState({
            text: ''
        });

    }

    onChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        });
    }



    render() {

        const { errors } = this.state;
        return (
            <div className="post-form mb-3">
            <div className="card card-info">
              <div className="card-header bg-info text-white">
                Make a Comment...
              </div>
              <div className="card-body">
                <form onSubmit={this.onSubmit}>
                  <div className="form-group">
                   <TextAreaFieldGroup 
                   placeholder="Reply to Post"
                   name="text"
                   value={this.state.text}
                   onChange={this.onChange}
                   errors={errors.text}
                   />
                  </div>
                  <input type="submit" className="btn btn-dark"/>
                </form>
              </div>
            </div>
          </div>
        )
    }
}

const actions = {
    addComment
}

const mapStateToProps = (state) => {
    return {
        auth: state.auth,
        errors:state.errors
    }
}

export default connect(mapStateToProps, actions)(CommentForm);
