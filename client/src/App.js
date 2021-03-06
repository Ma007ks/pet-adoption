import React, { Component } from 'react';
import './css/App.css';
import './css/bootstrap.min.css';
import './css/header.css';
import NavComponent from './components/NavComponent';
import MainPage from './main/Page';
import FindPage from './find/Page';
import AddPage from './add/Page';
import AuthPage from './auth/Page';
import RegPage from './reg/Page';
import Cookies from 'js-cookie';
import { BrowserRouter as Router, Route } from "react-router-dom";

class App extends Component {
    state = {};

    constructor(props) {
        super(props);

        this.state.isAuthorized = this.getIsAuthorized();
    }

    getIsAuthorized() {
        return !!Cookies.get('sid');
    }

    authChangeHandler = () => {
        const isAuthorized = this.getIsAuthorized();
        this.setState({ isAuthorized })
    }

    render() {
        return (
            <Router>
                <div>
                    <NavComponent isAuthorized={this.state.isAuthorized} authChangeHandler={this.authChangeHandler} />

                    <Route
                        exact path="/"
                        render={(props) => <MainPage {...props} isAuthorized={this.state.isAuthorized} />} />

                    <Route
                        path="/find"
                        render={(props) => <FindPage {...props} />} />

                    <Route
                        path="/add"
                        render={(props) => <AddPage {...props} isAuthorized={this.state.isAuthorized} />} />

                    <Route
                        path="/login"
                        render={(props) => <AuthPage {...props} isAuthorized={this.state.isAuthorized} authChangeHandler={this.authChangeHandler} />} />

                    <Route
                        path="/register"
                        render={(props) => <RegPage {...props} isAuthorized={this.state.isAuthorized} authChangeHandler={this.authChangeHandler} />} />
                </div>
            </Router>
        );
    }
}

export default App;