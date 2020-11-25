import React, { Component } from 'react';
import { connect } from "react-redux";
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import Landing from './screens/Landing'; 
import Login from './screens/Login'; 
import Manager from './screens/Manager'; 
import Products from './screens/Products'; 
import SignUp from './screens/SignUp'; 


class App extends Component {
    
    render() {
        return (
            <BrowserRouter>
                <Switch>
                    <Route path="/" exact={true} render={() => <Landing/>} />
                    <Route path="/login" exact={true} render={() => <Login/>} />
                    <Route path="/manager" exact={true} render={() => <Manager/>} />
                    <Route path="/products" exact={true} render={() => <Products/>} />
                    <Route path="/signup" exact={true} render={() => <SignUp/>} />
                </Switch>
            </BrowserRouter>
        )
    }
}

export default App; 