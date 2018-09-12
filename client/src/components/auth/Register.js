import React, { Component } from 'react';
import { connect } from 'react-redux';
import { registeruser } from '../../actions/authActions';
import {withRouter} from 'react-router-dom';
import TextFieldGroup from '../common/TextFieldGroup';

class Register extends Component {
  constructor() {
    super();
    this.state = {
      name: '',
      email: '',
      password: '',
      password2: '',
      errors: {}
    };
   
  }
  onChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  }

  onSubmit = (e) => {
    e.preventDefault();

    const newUser = {
      name: this.state.name,
      email: this.state.email,
      password: this.state.password,
      password2: this.state.password2
    };

    this.props.registeruser(newUser, this.props.history);

}

componentDidMount(){
  if(this.props.auth.isAuthenticated){
    this.props.history.push('/dashboard')
  }
}

  componentWillReceiveProps(nextProps) {
      if(nextProps.errors){
        this.setState({errors:nextProps.errors})
  }}


 
  render() {

    
    const { errors } = this.state;
  

    return (
      <div className="register">
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <h1 className="display-4 text-center">Sign Up</h1>
              <p className="lead text-center">
                Create your DevConnector account
              </p>
              <form onSubmit={this.onSubmit}>
                
              <TextFieldGroup 
              type="text"
              placeholder="Name"
              name="name"
              error={errors.name}
              value={this.state.name}
              onChange={this.onChange}
              error={errors.name}
            />
            <TextFieldGroup 
            type="email"
            placeholder="Email"
            name="email"
            error={errors.email}
            value={this.state.email}
            onChange={this.onChange}
            error={errors.email}
            info="This site uses Gravatar, if you want profile
             image, use Gravatar Email"
          />
          <TextFieldGroup 
          type="password"
          placeholder="Password"
          name="password"
          error={errors.password}
          value={this.state.password}
          onChange={this.onChange}
        />

        <TextFieldGroup 
        type="password"
        placeholder="Confirm Password"
        name="password2"
        error={errors.password2}
        value={this.state.password2}
        onChange={this.onChange}
      />
                <input type="submit" className="btn btn-info btn-block mt-4" />
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const actions = {
  registeruser
}

const mapStateToProps = (state, ownProps) => {
  return {
    auth: state.auth,
    errors:state.errors
  }
}



export default connect(mapStateToProps, actions)(withRouter(Register));
