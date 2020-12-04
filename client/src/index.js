import React from 'react';
import ReactDOM from 'react-dom';
import {createStore, applyMiddleware, compose} from 'redux';
import {Provider} from 'react-redux';
import reduxThunk from 'redux-thunk';

import App from './components/App';
import reducer from './reducers';

const composeEnhencers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore (
  reducer,
  composeEnhencers (applyMiddleware (reduxThunk))
);

ReactDOM.render (
  <Provider store={store}><App /></Provider>,
  document.querySelector ('#root')
);
