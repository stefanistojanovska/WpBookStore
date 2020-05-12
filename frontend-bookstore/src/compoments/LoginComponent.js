import React from "react";
import BookService from "../services/booksService";
import AuthenticationService from "../services/AuthenticationService";
import {Link} from "react-router-dom";
import {Redirect} from 'react-router-dom'
import Register from "./RegisterComponent";
import {useHistory} from 'react-router-dom'

class LoginComponent extends React.Component
{


    constructor(props) {
        super(props);
        this.state={
            username:'',
            password:'',
            user:[],
            isAuthenticated:this.props.auth,
            usernameReg:'',
            passwordReg:'',
            confirmReg:'',
            redirect:null,
            msg:''
        }
        this.handleChange=this.handleChange.bind(this)
        this.loginClicked = this.loginClicked.bind(this)
        this.authenticate=this.authenticate.bind(this)


    }
    componentWillReceiveProps(nextProps, nextContext) {
        this.setState({
            isLoggedIn:nextProps.auth
        })
    }



    handleChange(event) {
        this.setState(
            {
                [event.target.name]
                    : event.target.value
            }
        )
    }
  loginClicked() {

      BookService.fetchUserByUsername(this.state.username).then(response => {

          this.setState({
              user: response.data
          })

      }).catch(function (error) {
          console.log("UNSUCCESSFUL")
      }).then(this.authenticate)
      
  }

  authenticate() {

      if (this.state.user != null && this.state.username === this.state.user.username && this.state.password === this.state.user.password) {
          AuthenticationService.LogInSuccessful(this.state.username)
      } else {
          AuthenticationService.LogOut();
      }
      this.props.action()
      console.log("IsAuthenticated:" + AuthenticationService.isUserAuthenticated())
      if (AuthenticationService.isUserAuthenticated()) {
          this.setState({redirect: true})
      }
      else
      {
          this.setState({
              msg:'Invalid password'
          })
      }
  }




    render() {
        if(this.state.redirect)
            return <Redirect to={"/"} />
        else

         return(


                <div style={{ paddingLeft:"2em",marginLeft:'25em'}}>

                        <div style={{marginTop:'-3.6em'}}>
                            <span style={{fontSize:"2em"}}><u>Log In</u></span><br/><br/><br/>
                            <div className="form-group">
                                <label >Username:</label><input className={"form-control"} type="text" name="username" value={this.state.username} onChange={this.handleChange} />
                            </div>
                            <div className="form-group">
                                <label >Password:</label><input className={"form-control"}  type="password" name="password" value={this.state.password} onChange={this.handleChange} />
                            </div>

                            <Link className="btn btn-danger  " style={{marginLeft:"4em"}} onClick={this.loginClicked}>Log In</Link><br/>
                            <span className={"small ml-4"}>No account? <Link className="" to="/register" >Register here</Link></span><br/>
                            <span style={{color:'red',fontSize:'0.7em',marginLeft:'5em'}}>{this.state.msg}</span>

                        </div>
                    </div>




      )
    }
}
export default LoginComponent
