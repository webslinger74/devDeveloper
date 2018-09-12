import { ADD_POST, POST_LOADING,GET_POSTS, DELETE_POST, GET_POST} from '../actions/types';


const initialState = {
    posts: [],
    post: {},
    loading: false
};


const postReducer = (state = initialState, action) => {
    switch(action.type){
        case POST_LOADING:
            return {
                ...state,
                loading:true
            }
        case GET_POSTS:
            return {
                ...state,
                posts: action.payload,
                loading:false
            }
        case DELETE_POST:
            return {
                ...state,
                posts: state.posts.filter(post => {
                    return post._id !== action.payload._id
                })
            }
        case GET_POST:
            return {
                    ...state,
                    post:action.payload,
                    loading:false

            }
        case ADD_POST:
            return {
            ...state,
            posts: [action.payload, ...state.posts]
            }
        
        default:
        return state;
    }
}


export default postReducer;
