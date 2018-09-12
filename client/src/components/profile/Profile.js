import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link , withRouter} from 'react-router-dom'
import ProfileHeader from  './Profile-Header';
import ProfileCreds from './Profile-Creds';
import ProfileGithub from './Profile-Github';
import ProfileAbout from './Profile-About';
import Spinner from '../common/Spinner';
import { getProfileByHandle } from '../../actions/profileActions';




class Profile extends Component {

    componentDidMount(){
        if(this.props.match.params.handle){
            console.log("is this going on", this.props.match.params.handle);
            this.props.getProfileByHandle(this.props.match.params.handle)
        }
    }

    componentWillReceiveProps(nextProps) {
        if(nextProps.profile.profile === null && this.props.profile.loading){
            this.props.history.push('/not-found');
        }
    }

    
    render(){

        const {profile, loading} = this.props.profile;
        let profileContent;
        if(profile === null || loading){
            profileContent = <Spinner />
        } else {
            profileContent = (
                <div>
                    <div className="row">
                    <div className="col-md-6">
                    <Link to="/profiles" className="btn btn-light mb-3 float-left">
                    Back to Profiles
                    
                    </Link>
                    </div>
                    <div className="col-md-6" />

                    </div>
                    <ProfileHeader profile={profile}/>
                    <ProfileAbout profile={profile} />
                    <ProfileCreds education={profile.education} experience={profile.experience} />
                    {profile.githubusername ? ( <ProfileGithub username={profile.githubusername} />) : null}
                   
                </div>
            )
        }

        return (


            <div className="profile">
            <div className="container">
            <div className="row">
            <div className="col-md-12">
            {profileContent}
            </div>
            </div>
            </div>

            
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
        profile: state.profile
    
});

const actions = {
    getProfileByHandle
}

export default connect(mapStateToProps, actions)(withRouter(Profile));