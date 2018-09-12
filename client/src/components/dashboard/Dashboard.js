import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import { connect } from 'react-redux'; 
import { getCurrentProfile, deleteAccount } from '../../actions/profileActions';
import Spinner from '../common/Spinner';
import ProfileActions from './ProfileActions';
import Experience from './Experience';
import Education from './Education';

class Dashboard extends Component {

 componentDidMount() {
     this.props.getCurrentProfile();
 }

 deleteClick = (e) => {
     //doesnt require parameters as the server route has passport and get the user from token
        this.props.deleteAccount();

 }

  render() {

    const { user } = this.props.auth;
    const { profile, loading } = this.props.profile;

 let dashboardContent;

 if(profile === null || loading ) {
     dashboardContent = <Spinner />
 } else {
     //check if logged in user has profile data

     if(Object.keys(profile).length > 0) {
            dashboardContent = (
                <div> <p className="lead text-muted">Welcome <Link to={`/profile/${profile.handle}`}>{user.name}</Link></p>
                <ProfileActions />
                <Experience experience={profile.experience}/>
                <Education education={profile.education}/>

                <div style={{marginBottom: '60px'}}/>


                <button onClick={this.deleteClick} className="btn btn-danger">Delete My Account</button>



                </div>
                   );
     } else {
            // user is logged in but no profile

            dashboardContent = (
                <div>
                    <p className="lead text-muted">Welcome {user.name}</p>
                    <p>You have not yet setup a profile, please add some info</p>
                    <Link to="/create-profile" className="btn btn-lg btn-info">
                    Create Profile</Link>
                </div>
            )
     }
 }
    return (
            <div>
<div className="dashboard">
<div className="container">
<div className="row">
<div className="col-md-12">
<h1 className="display-4">Dashboard</h1>
            {dashboardContent}
</div>
</div>
</div>
</div>
    

            </div>
    )

  }


}

const actions = {
    getCurrentProfile,
    deleteAccount
}

const mapStateToProps = (state) => {
    return {
        profile : state.profile,
        auth: state.auth
    }
}

export default connect(mapStateToProps, actions)(Dashboard);