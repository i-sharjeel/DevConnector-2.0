// import { createStore, applyMiddleware } from 'redux';
// import { composeWithDevTools } from 'redux-devtools-extension';
// import thunk from 'redux-thunk';

// const initialState = {};
// const middleware = [thunk];
// const store = createStore(rootReducer, initialState, composeWithDevTools(applyMiddleware(...middleware)));


import { configureStore } from '@reduxjs/toolkit'
import rootReducer from './reducers';

const store = configureStore({
    reducer: rootReducer,
})

export default store;