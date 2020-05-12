import React from "react";
class AuthenticationService {

    LogOut(username)
    {
        sessionStorage.clear();
        console.log("logout successful" )
    }

    LogInSuccessful(username) {
        window.sessionStorage.setItem("username",username)
    }
    isUserAuthenticated()
    {
        return window.sessionStorage.getItem("username")!==null
    }
    getUser()
    {
        return window.sessionStorage.getItem("username");
    }
}
export default new AuthenticationService()