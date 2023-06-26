import React, { Fragment } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import { Landing } from './components/layout/Landing';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import { Provider } from 'react-redux'
import store from './store';
import './App.css';

function App() {
  return (
    <Provider store={store}>
      <Fragment>
        <BrowserRouter>
          <Navbar />
          <Routes>
            <Route exact path="/" element={<Landing />} />
            <Route exact path='/Login' element={<Login />} />
            <Route exact path='/Register' element={<Register />} />
          </Routes>
        </BrowserRouter>
      </Fragment>
    </Provider>
  )
}

export default App;
