import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from '../src/components/App';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import { combineReducers, compose} from 'redux';
import authReducer from '../src/reducers/authReducer';
import profileReducer from '../src/reducers/profileReducer';
import errorsReducer from '../src/reducers/errorsReducer';
import jwt_decode from 'jwt-decode';
import setAuthToken from './utils/setAuthToken';
import { setCurrentUser} from './actions/authActions';
import { clearCurrentProfile } from './actions/profileActions';
import { logoutUser } from './actions/authActions';
import postReducer from '../src/reducers/postReducer';

const initialState = {};
const rootReducers = combineReducers({
    auth: authReducer,
    errors: errorsReducer,
    profile: profileReducer,
    post: postReducer
    
})

const middleware = [thunk];

const store = createStore(
                        rootReducers,
                        initialState,
                        compose(
                            applyMiddleware(...middleware),
                            window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())
                        );


if(localStorage.jwtToken) {
    setAuthToken(localStorage.jwtToken);
    const decoded = jwt_decode(localStorage.jwtToken);
    store.dispatch(setCurrentUser(decoded))


    //check for expired token

    const currentTime = Date.now() / 1000;
    if(decoded.exp < currentTime) {
        store.dispatch(logoutUser());
        store.dispatch(clearCurrentProfile());
        window.location.href = '/login';
    }
}



ReactDOM.render(
    <Provider store={ store }>
    <BrowserRouter>
    <App />
    </BrowserRouter>
    </Provider>,
    document.getElementById('root'));


