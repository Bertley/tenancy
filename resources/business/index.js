import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux'; 
import createSagaMiddleware from 'redux-saga';
import rootSaga from "./store/sagas/sagas";
import reducer from './store/reducers';
import App from './App';

// const sagaMiddleware = createSagaMiddleware(); 
// const store = createStore(reducer, applyMiddleware(sagaMiddleware)); 
// sagaMiddleware.run(rootSaga); 

ReactDOM.render(
  <App/>,
  document.getElementById('business')
);