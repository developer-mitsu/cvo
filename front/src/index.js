import React from 'react'
import { render } from 'react-dom'
import App from './App'
import * as serviceWorker from './serviceWorker';


import 'normalize.css'
import '@fortawesome/fontawesome-free/js/all';
// import '@fortawesome/fontawesome-free/js/solid';
// import '@fortawesome/fontawesome-free/js/regular';

import { createStore } from 'redux';
import rootReducer from './reducers/index';
import { Provider } from 'react-redux';
import thunkMiddleware from 'redux-thunk'

import configureStore from './configureStore'


const store = configureStore()

console.log(store.getState())

render(
    <Provider store={store}>
        <App />
    </Provider>, document.getElementById('root')
)  

serviceWorker.unregister();

