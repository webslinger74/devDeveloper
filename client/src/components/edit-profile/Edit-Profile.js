import React, { Component } from 'react';
import {Link, withRouter} from 'react-router-dom';
import { connect } from 'react-redux'; 
import { getCurrentProfile, createProfile } from '../../actions/profileActions';
import Spinner from '../common/Spinner';
import TextFieldGroup from '../common/TextFieldGroup';
import InputGroup from '../common/InputGroup';
import SelectListGroup from '../common/SelectListGroup';
import TextAreaFieldGroup from '../common/TextAreaFieldGroup';
import isEmpty from '../../validation/is-Empty';


class EditProfile extends Component {
    constructor(props){
        super(props);
        this.state = {
            displaySocialInputs: false,
            handle: '',
            company: '',
            website: '',
            location: '',
            status: '',
            skills: '',
            githubusername: '',
            bio: '',
            twitter: '',
            facebook: '',
            linkedin: '',
            youtube: '',
            instagram:'',
            errors: {}
        }
    }

    componentWillReceiveProps(nextProps) {
        if(nextProps.errors){
            this.setState({
                errors: nextProps.errors
            })
            console.log(this.state.errors, "state errors printed");
        }


        if(nextProps.profile.profile){
            const profile = nextProps.profile.profile;

            const skillsCSV = profile.skills.join(',');

            profile.company = !isEmpty(profile.company) ? profile.company : "";
            profile.website = !isEmpty(profile.website) ? profile.website : "";
            profile.location = !isEmpty(profile.location) ? profile.location : "";
            profile.githubusername = !isEmpty(profile.githubusername) ? profile.githubusername : "";
            profile.bio = !isEmpty(profile.bio) ? profile.bio : "";
            profile.social = !isEmpty(profile.social) ? profile.social : {};
            profile.twitter = !isEmpty(profile.social.twitter) ? profile.social.twitter : "";
            profile.facebook = !isEmpty(profile.social.facebook) ? profile.social.facebook : "";
            profile.linkedin = !isEmpty(profile.social.linkedin) ? profile.social.linkedin : "";
            profile.youtube = !isEmpty(profile.social.youtube) ? profile.social.youtube : "";
            profile.instagram = !isEmpty(profile.social.instagram) ? profile.social.instagram : "";
        

        this.setState({
            handle: profile.handle,
            company: profile.company,
            website: profile.website,
            location: profile.location,
            status: profile.status,
            skills: skillsCSV,
            githubusername: profile.githubusername,
            bio: profile.bio,
            twitter: profile.twitter,
            facebook: profile.facebook,
            linkedin: profile.linkedin,
            youtube: profile.youtube,
            instagram:profile.instagram
        })
    }
    
    }
       
    componentDidMount() {
        this.props.getCurrentProfile()
    }





    onSubmit = (e) => {
            e.preventDefault();

            const profileData = {
                handle: this.state.handle,
                company:this.state.company,
                website:this.state.website,
                location:this.state.location,
                status:this.state.status,
                skills:this.state.skills,
                githubusername:this.state.githubusername,
                bio:this.state.bio,
                twitter:this.state.twitter,
                facebook:this.state.facebook,
                linkedin:this.state.linkedin,
                youtube:this.state.youtube,
                instagram:this.state.instagram
    
            }
            this.props.createProfile(profileData, this.props.history);
    }

    onChange = (e) => {
        this.setState({
            [e.target.name]:e.target.value
        })
    }


  render() {

    const { errors, displaySocialInputs } = this.state;

    let socialInputs;

        if(displaySocialInputs){
            socialInputs = (
                <div>
                    <InputGroup 
                    placeholder="Twitter Profile URL"
                    name="twitter"
                    icon="fab fa-twitter"
                    value={this.state.twitter}
                    onChange={this.onChange}
                    error={errors.twitter}         
                    />
                    <InputGroup 
                    placeholder="Facebook Profile URL"
                    name="facebook"
                    icon="fab fa-facebook"
                    value={this.state.facebook}
                    onChange={this.onChange}
                    error={errors.facebook}         
                    />
                    <InputGroup 
                    placeholder="LinkedIn Profile URL"
                    name="linkedin"
                    icon="fab fa-linkedin"
                    value={this.state.linkedin}
                    onChange={this.onChange}
                    error={errors.linkedin}         
                    />
                    <InputGroup 
                    placeholder="You Tube Profile URL"
                    name="youtube"
                    icon="fab fa-youtube"
                    value={this.state.youtube}
                    onChange={this.onChange}
                    error={errors.youtube}         
                    />
                    <InputGroup 
                    placeholder="Instagram Profile URL"
                    name="instagram"
                    icon="fab fa-instagram"
                    value={this.state.instagram}
                    onChange={this.onChange}
                    error={errors.instagram}         
                    />
                </div>
            )
        }


    const options = [
        {      label: '*Select Professional Status', value:0},
        {      label:'Developer', value:'Developer'},
        {      label:'Junior Developer', value:'Junior Developer'},
        {      label:'Senior Developer', value:'Senior Developer'},
        {      label:'Student', value:'Student'},
        {      label:'Teacher', value:'Teacher'}
    ];

    return (
        <div className="create-profile">
        <div className="container">
        <div className="row">
        
        <div className="col-md-8 m-auto">
        <Link to="/dashboard" className="btn btn-light">
        Go Back
    </Link>
        <h1 className="display-4 text-center">Edit your Profile</h1>
        <small className="d-block pb-3">* = required fields</small>
        <form onSubmit={this.onSubmit}>
        <TextFieldGroup 
        placeholder="* Profile Handle"
        name="handle"
        value={this.state.handle}
        onChange={this.onChange}
        error={errors.handle}
        info = "A unique handle for your profile URL. Your full name, company name, nickname"
        />
        <SelectListGroup 
        placeholder="Status"
        name="status"
        value={this.state.status}
        options={options}
        onChange={this.onChange}
        error={errors.status}
        info = "Tell us your role type"
        />
        <TextFieldGroup 
        placeholder="Company"
        name="company"
        value={this.state.company}
        onChange={this.onChange}
        error={errors.company}
        info = "Could be your own company or one as an employee"
        />
        <TextFieldGroup 
        placeholder="Website"
        name="website"
        value={this.state.website}
        onChange={this.onChange}
        error={errors.website}
        info = "Your website or a company website"
        />
        <TextFieldGroup 
        placeholder="* Profile Handle"
        name="handle"
        value={this.state.handle}
        onChange={this.onChange}
        error={errors.handle}
        info = "A unique handle for your profile URL. Your full name, company name, nickname"
        />
        <TextFieldGroup 
        placeholder="Location"
        name="location"
        value={this.state.location}
        onChange={this.onChange}
        error={errors.location}
        info = "City or Town that you are from/working"
        />
        <TextFieldGroup 
        placeholder="* Skills"
        name="skills"
        value={this.state.skills}
        onChange={this.onChange}
        error={errors.skills}
        info = "Please use comma separated values (e.g. HTML, CSS, Javascript, PHP"
        />
        <TextFieldGroup 
        placeholder="GitHub Username"
        name="githubusername"
        value={this.state.githubusername}
        onChange={this.onChange}
        error={errors.githubusername}
        info = "if you want your latest repos and a Github link, include your username"
        />
        <TextAreaFieldGroup 
            placeholder='Short Bio'
            name='bio'
            value={this.state.bio}
            onChange={this.onChange}
            error={errors.bio}
            info="Tell us a little about yourself"  
        />

        <div className='mb-3'>
        <button type="button" onClick={() => {
            this.setState(
                prevState => ({
                    displaySocialInputs: !prevState.displaySocialInputs
                })
             )}
        } className="btn btn-light" >Add Social Network Links</button>
        <span className="text-muted">Optional</span></div>
        {socialInputs}
        <input type="submit" value="submit" className="btn btn-info btn-block mt-4" />
        </form>
        </div>
        </div>
        </div>
        </div>

    )

  }

}
const actions = {
    createProfile,
    getCurrentProfile
}

const mapStateToProps = (state) => {
    return {
        profile: state.profile,
        errors: state.errors
    }
}


export default connect(mapStateToProps, actions)(withRouter(EditProfile));
