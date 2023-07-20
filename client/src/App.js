import React, { Fragment, useEffect } from 'react';
import { loadUser } from './actions/auth';
import { setAuthToken } from './components/general-utils';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import Landing from './components/layout/Landing';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import AddExperience from './components/profile-forms/AddExperience';
import AddEducation from './components/profile-forms/AddEducation';
import Dashboard from './components/dashboard/Dashboard';
import CreateProfile from './components/profile-forms/CreateProfile';
import Profiles from './components/profiles/Profiles';
import Profile from './components/profile/Profile';
import Posts from './components/posts/Posts';
import Post from './components/post/Post';
import PrivateRoute from './components/routing/PrivateRoute';
import { Provider } from 'react-redux'
import store from './store';
import './App.css';

if (localStorage.token) {
  setAuthToken(localStorage.token)
}

function App() {

  useEffect(() => {
    store.dispatch(loadUser())
  }, []);

  return (
    <Provider store={store}>
      <Fragment>
        <BrowserRouter>
          <Navbar />
          <Routes>
            <Route exact path="/" element={<Landing />} />
            <Route exact path='/Login' element={<Login />} />
            <Route exact path='/Register' element={<Register />} />
            <Route exact path='/Profiles' element={<Profiles />} />
            <Route exact path='/Profile/:id' element={<Profile />} />
            <Route exact path='/' element={<PrivateRoute />}>
              <Route exact path='/Dashboard' element={<Dashboard />} />
              <Route exact path='/Create-Profile' element={<CreateProfile />} />
              <Route exact path='/Add-Experience' element={<AddExperience />} />
              <Route exact path='/Add-Education' element={<AddEducation />} />
              <Route exact path='/Posts' element={<Posts />} />
              <Route exact path='/Post/:id' element={<Post />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </Fragment>
    </Provider>
  )
}

export default App;
