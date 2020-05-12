import React, { Component } from 'react'
import { Route, Redirect } from 'react-router-dom'
import AuthenticationService from "../services/AuthenticationService";


class AuthenticatedRoute extends Component {
    render() {
        let tmp=AuthenticationService.isUserAuthenticated()
        console.log(tmp+"tmp")
        if (tmp) {
            return <Route {...this.props} />
        } else {
            return <Redirect to="/login" />
        }


    }
}

export default AuthenticatedRoute