import axios from 'axios';
import { GET_PROFILE, PROFILE_LOADING, GET_ERRORS, CLEAR_CURRENT_PROFILE, SET_CURRENT_USER, GET_PROFILES} from './types';

// get current profile

export const getCurrentProfile = () => (dispatch) => {
        dispatch(setProfileLoading())
        axios.get('/api/profile')
            .then((res) => {
                 dispatch({
                      type: GET_PROFILE,
                      payload: res.data
                 })
        }).catch((error) => {
            dispatch({
                type: GET_PROFILE,
                payload: {}
      })
  })


};

// Create Profile

export const createProfile = (creds, history) => (dispatch) => {
        axios.post('/api/profile', creds)
            .then((profile) => {
                dispatch({
                    type: GET_ERRORS,
                    payload:{}
                })
             return history.push('/dashboard'); 
            })
            .catch(error => 
                dispatch({
                    type: GET_ERRORS,
                    payload:error.response.data
                })
            )
            
};





export const setProfileLoading = () => ({
            type: PROFILE_LOADING
    });
    

    export const clearCurrentProfile = () => ({
        type: CLEAR_CURRENT_PROFILE
});


export const addExperience = (experience, history) => (dispatch) => {
            axios.post('/api/profile/experience', experience)
                .then((res) => {
                    dispatch({
                        type:GET_PROFILE,
                        payload:res.data
                    })
                    history.push('/dashboard');
                })
                .catch((err) => {
                    dispatch({
                        type:GET_ERRORS,
                        payload:err.response.data
                    })
                })


};

export const addEducation = (education, history) => (dispatch) => {
    axios.post('/api/profile/education', education)
        .then((res) => {
            dispatch({
                type:GET_PROFILE,
                payload:res.data
            })
            history.push('/dashboard');
        })
        .catch((err) => {
            dispatch({
                type:GET_ERRORS,
                payload:err.response.data
            })
        })


};



export const deleteExperience = (experience) => (dispatch) => {
        axios.delete(`/api/profile/experience/${experience}`)
            .then((res) => {
                dispatch({
                    type:GET_PROFILE,
                    payload:res.data
                })
            })
            .catch(err => {
                dispatch({
                    type:GET_ERRORS,
                    payload:err.response.data
                })
            })
}

export const deleteEducation = (education) => (dispatch) => {
    axios.delete(`/api/profile/education/${education}`)
        .then((res) => {
            dispatch({
                type:GET_PROFILE,
                payload:res.data
            })
        })
        .catch(err => {
            dispatch({
                type:GET_ERRORS,
                payload:err.response.data
            })
        })
}


export const getProfiles = () => (dispatch) => {
    axios.get('/api/profile/all')
        .then((res) => {
            dispatch({
                type:GET_PROFILES,
                payload:res.data
            })
        
        })
        .catch(err => {
            dispatch({
                type:GET_PROFILES,
                payload:null
            })
        })
}

export const getProfileByHandle = (handle) => (dispatch) => {
    console.log("ths request has begun!");
    axios.get(`/api/profile/handle/${handle}`)
    .then((res) => {
        dispatch({
            type:GET_PROFILE,
            payload:res.data
        })
    })
    .catch((error) => {
        dispatch({
            type:GET_ERRORS,
            payload: error
        })
    })
    
};






export const deleteAccount = () => (dispatch) => {
    if(window.confirm('Are you sure you wish to delete User completely?')){
    axios.delete('/api/profile')
        .then((res) => {
            dispatch({
                type:SET_CURRENT_USER,
                payload:{}
            });
        })
        .catch((err) => {
            dispatch({
                type:GET_ERRORS,
                payload:err.response.data
            })
        })
}
}