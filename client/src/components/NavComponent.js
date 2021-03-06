import React, { Component } from 'react';
import { BrowserRouter as Route, Router, Link } from "react-router-dom";

import User from '../api/User';
import logo from '../images/paw.png';
import house from '../images/dog_house.png';


class NavComponent extends Component {
    state = {};

    constructor(props) {
        super(props);
        this.state.authText = props.isAuthorized ? '' : 'Not authorized';
    }

    updateUserText() {
        User.getUsername()
            .then(username => {
                const authText = 'Authorized as: ' + username;
                this.setState({ authText });
            })
            .catch(err => {
                console.log(err);
            });
    }

    logoutHandler = () => {
        User.logout()
            .then(res => {
                const authText = 'Not authorized';
                this.setState({ authText });
                this.props.authChangeHandler();
            })
            .catch(err => {
                console.log(err)
            });
    }

    componentDidMount() {
        if (this.props.isAuthorized) {
            this.updateUserText();
        }
    }

    componentDidUpdate(prevProps) {
        if (this.props.isAuthorized && !prevProps.isAuthorized) {
            this.updateUserText();
        }
    }

    render() {
        let authButton;

        if (this.props.isAuthorized) {
            authButton = (
                <Link className="header-button header-login nodecoration text-nowrap align-items-center" onClick={this.logoutHandler} to="/">
                    <div>Выйти</div>
                    <div><img src={house} height="32" className="pl-3" alt="" /></div>
                </Link>
            )

        } else {
            authButton = (
                <Link className="header-button header-login nodecoration text-nowrap align-items-center" to="/login">
                    Войти
                        <img src={house} height="32" className="pl-3" alt="" />
                </Link>
            )
        }

        return (
            <div className="row p-0 m-0 d-flex justify-content-around header flex-wrap">
                <Link className="header-button header-logo nodecoration text-nowrap align-items-center" to="/">
                    <img src={logo} height="48" vspace="12" alt="" />
                    Pet Adoption
                    </Link>

                <div className="d-flex justify-content-center header-menu-group">
                    <Link className="nodecoration header-button menu-header-button" to="/find">Найти</Link>
                    <Link className="nodecoration header-button menu-header-button" to="/add">Отдать</Link>
                    <Link className="nodecoration header-button menu-header-button" to="/item">Статьи</Link>
                </div>

                {authButton}
            </div>
        );
    }
}

export default NavComponent;