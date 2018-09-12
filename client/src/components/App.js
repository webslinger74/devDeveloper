import React, { Component } from 'react';
import ReactDom from 'react-dom';
import {BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Dashboard from '../components/dashboard/Dashboard';
import PrivateRoute from '../components/common/PrivateRoute';
import Navbar from './Navbar';
import Footer from './Footer';
import Landing from './Landing';
import Register from './auth/Register';
import Login from './auth/Login';
import '../../src/App.css';
import CreateProfile from  '../components/create-profile/CreateProfile';
import EditProfile from './edit-profile/Edit-Profile';
import AddExperience from './add-credentials/AddExperience';
import AddEducation from './add-credentials/AddEducation';
import Profiles from '../components/profiles/Profiles';
import Profile from '../components/profile/Profile';
import NotFound from './not-found/NotFound';
import Posts from '../components/posts/Post';
import Post from '../components/post/Post';
 
class App extends Component {
  render() {
    return (
            
            <div className="App">
            <Navbar />
            <Switch>
            <Route exact path='/' component={Landing} />
            <Route path="/login" component={Login} />
            <Route path="/register" component={Register} />
            <Route exact path="/profile/:handle" component={Profile}/>
            <Route exact path="/profiles" component={Profiles} />
           
            </Switch>
            <Switch>
            <PrivateRoute exact path='/create-profile' component={CreateProfile} />
            </Switch>
            <Switch>
            <PrivateRoute exact path='/dashboard' component={Dashboard} />
            </Switch>
            <Switch>
            <PrivateRoute exact path='/edit-profile' component={EditProfile} />
            </Switch>
            <Switch>
            <PrivateRoute exact path='/add-experience' component={AddExperience} />
            </Switch>
            <Switch>
            <PrivateRoute exact path='/add-education' component={AddEducation} />
            </Switch>
            <Switch>
            <PrivateRoute exact path='/feed' component={Posts} />
            </Switch>
            <Switch>
            <PrivateRoute exact path='/post/:id' component={Post} />
            </Switch>
            <Route exact path="/not-found" component={NotFound} />
           <Footer />
      </div>
    
    );
  }
}

export default App;
