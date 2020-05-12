import React from "react";
import {Link, Redirect} from "react-router-dom";
import BookService from "../services/booksService";


class Register extends React.Component
{
    constructor(props) {
        super(props);
        this.state={
            username:'',
            password:'',
            confirm:'',
            role:[],
            errorMessage:'',
            successfulRegistration:false
        }
        this.handleChange=this.handleChange.bind(this)
        this.handleSubmit=this.handleSubmit.bind(this)

    }
    componentDidMount() {
        BookService.fetchRole('Customer').then(response=>
        {this.setState({
            role:response.data
        })})
    }

    handleChange(event)
    {
        const{name,value} = event.target
        this.setState({
            [name]:value
        })
    }
    handleSubmit ( event ) {
        event.preventDefault();
        console.log(this.state)
        if(this.state.password===this.state.confirm )
        {
            this.setState({
                errorMessage:''
            })
            BookService.createNewUser(this.state.username,this.state.password,this.state.role).then(r=>console.log("Success"));
            this.setState({
                successfulRegistration:true
            })

        }

        else
        {
         this.setState({
             errorMessage:'Passwords do not match!'
         })
        }
    }

    render() {
        if(this.state.successfulRegistration)
        {

            return <Redirect to={"/login"}/>
        }


       else return(
            <main  style={{ paddingLeft:"2em",marginLeft:'25em'}}>
                <span style={{fontSize:"2em"}}><u>Register</u></span><br/><br/>
                <form onSubmit={this.handleSubmit} >
                    <div className="form-group">
                        <label >Username:</label><input name={"username"} value={this.state.username} onChange={this.handleChange} placeholder={""}  className="form-control"/>
                    </div>
                    <div className="form-group">
                        <label >Password:</label><input name={"password"} value={this.state.password} type={"password"} onChange={this.handleChange} placeholder={""}  className="form-control"/>
                    </div>
                    <div className="form-group">
                        <label >Confirm password:</label><input name={"confirm"} value={this.state.confirm} type={"password"} onChange={this.handleChange} placeholder={""}  className="form-control"/>
                    </div>

                    <button  type={"submit"} className="btn btn-danger ml-5"  >Register</button><br/>
                    <label style={{fontSize:'0.7em', color:'red',marginLeft:'2.4em'}}>{this.state.errorMessage}</label>

                    {console.log(this.state)}
                </form>
            </main>

        )
    }

}
export default Register