import { combineReducers } from 'redux'
import alert from './alert';
import auth from './auth';
import profile from './profile';
import post from './post';

const reducers = combineReducers({
    alert,
    profile,
    post,
    auth
})

export default reducers;