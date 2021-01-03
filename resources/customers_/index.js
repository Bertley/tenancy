import React from 'react';
import ReactDOM from 'react-dom';
import { applyMiddleware, createStore, compose } from 'redux';
import { Provider } from 'react-redux';
import createSagaMiddleware from 'redux-saga';
import { BrowserRouter, Switch, Route} from 'react-router-dom';

import rootSaga from "./sagas";
import { loginWatcher  } from "./pages/Login/sagas"
import IndexReducer from './reducers';


// pages 
import Landing from './pages/Landing'; 
import Login from './pages/Login'; 
import Manager from './pages/Manager'; 
import Products from './pages/Products'; 
import SignUp from './pages/Signup'; 


const sagaMiddleware = createSagaMiddleware(); 

/*eslint-disable */
const composeSetup = process.env.NODE_ENV !== 'production' && typeof window === 'object' &&
  window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ?
  window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ : compose
/*eslint-enable */

const store = createStore(
  IndexReducer, 
  composeSetup(applyMiddleware(sagaMiddleware))
); 

// sagaMiddleware.run(rootSaga); 
sagaMiddleware.run(loginWatcher); 

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter history={history}>
      <Switch>
          <Route path="/" exact={true} render={() => <Landing />} />
          <Route path="/login" exact={true} render={() => <Login/>} />
          <Route path="/manager" exact={true} render={() => <Landing/>} />
          <Route path="/products" exact={true} render={() => <Products/>} />
          <Route path="/signup" exact={true} render={() => <SignUp/>} />
      </Switch>
    </BrowserRouter>
  </Provider>,
  document.getElementById('customers')
);