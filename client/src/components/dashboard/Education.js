import React, { Component } from  'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import Moment from 'react-moment';
import { deleteEducation } from '../../actions/profileActions';

class Education extends Component {
    constructor(props){
        super(props)
    }


    render(){
        const education = this.props.education.map((edu) => (
            <tr key={edu._id}>
            <td>{edu.school}</td>
            <td>{edu.degree}</td>
            <td>
            <Moment format="YYYY/MM/DD">{edu.from}</Moment>  - {" "}
            
            {edu.to === null ? (' current') : (<Moment format="YYYY/MM/DD">{edu.to}</Moment>)}

            </td>
            <td><button onClick={() => this.props.deleteEducation(edu._id)} className="btn btn-danger">Delete</button></td>
            </tr>
            
            
        ))


        return (
            <div>
            <h4 className="mb-4">Education</h4>
            <table className="table">
                <thead>
                <tr>
                <th>School</th>
                <th>Degree</th>
                <th>Years</th>
                <th></th>
                </tr>
    
                {education}

                </thead>

            </table>
                
            </div>

        )
    }
}

const actions = {
    deleteEducation
}

const mapStateToProps = (state) => {
    return {
        profile: state.profile
    }
}

export default connect(mapStateToProps, actions)(withRouter(Education));

