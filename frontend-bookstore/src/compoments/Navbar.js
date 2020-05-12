import React from "react";
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.js';
import {Link} from "react-router-dom";
import LoginComponent from "./LoginComponent";
import AuthenticationService from "../services/AuthenticationService";
import BookService from "../services/booksService";

class Header extends React.Component {
    constructor(props) {
        super(props);
        this.state={
            isLoggedIn: this.props.auth,
            role:'',
            redirect:''
        }
        this.changeState=this.changeState.bind(this)
        this.createShow=this.createShow.bind(this)
        this.fetchRole=this.fetchRole.bind(this)
    }
    componentDidUpdate(prevProps, prevState, snapshot) {
        if(this.state.isLoggedIn!==prevState.isLoggedIn)
            this.fetchRole()
    }

    componentWillReceiveProps(nextProps, nextContext) {
        this.setState({
            isLoggedIn:nextProps.auth
        })

    }

    componentDidMount() {
        this.fetchRole()

    }
    fetchRole()
    {
        if(this.state.isLoggedIn)
        {
            BookService.fetchUserByUsername(AuthenticationService.getUser()).then(response=> {
                console.log(response.data.userRole.name+"HH")
                this.setState({
                    role: response.data.userRole.name
                })
            })

        }
    }


    createShow() {

      if( this.state.isLoggedIn)
      {
            if(this.state.role==='Admin') {
                return (
                    <li className="nav-item">
                        <Link className="nav-link " style={{width: "3.6em"}} to={"/add/"}>Create</Link>
                    </li>)
            }

      }
        return ""

    }

    renderAuth()
    {
        return (<div >
            {this.state.isLoggedIn?
                (<li style={{marginLeft:'30em'}}><Link className="nav-link " to="/" onClick={this.changeState}>Log Out</Link></li>):
                (<li style={{marginLeft:'31em'}}><Link className="nav-link" to="/login"  >Log In</Link></li>)}

        </div>)
    }
    changeState()
    {
        AuthenticationService.LogOut()
        this.setState({
            role:''
        })
        this.props.action()
    }


    render() {

    return(
        <nav className="navbar-nav navbar-expand bg-dark navbar-dark fixed-top   ">


            <a className="navbar-brand d-inline " href="#"><span className=" font-weight-bolder  " style={{fontSize: '1.5em'}}>&nbsp;&nbsp;🕮 Book Repository</span>  <span style={{fontWeight:'100',fontSize:"1.5em",color:"darkgrey"}}>|</span></a>


            <ul className="navbar-nav container  "  style={{marginLeft: 0    + 'em',marginTop:0.3+'em' ,fontSize: '1.3em'}}>
                <li className="nav-item">
                    <Link className="nav-link" to={"/"}>Home</Link>
                </li>

                {/* <li className="nav-item">
                    <Link className="nav-link" to={"/books"}>Books</Link>
                </li>*/}
                <li>
                    <div className="dropdown">
                        <button className="btn btn-dark dropdown-toggle" type="button" id="dropdownMenuButton"
                                data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"  style={{fontSize: '0.9em',marginTop:"0.1em"}}>
                            Books
                        </button>
                        <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                            <Link className="nav-link dropdown-item text-dark "  to={"/books/category/Bestsellers"}>Bestsellers</Link>
                            <div className="dropdown-divider"  ></div>
                            {/*//KATEGORII*/}
                            {

                                this.props.cats.map(category=> {
                                    return <Link key={category.id} className="nav-link dropdown-item text-dark " to={"/books/category/"+category.categoryName} >{category.categoryName}</Link>
                                })
                            }

                        </div>
                    </div>
                </li>
                <li className="nav-item">
                <Link  className="nav-link " to={"/wishlist"}>Wishlist</Link>
            </li>
                <li className="nav-item">
                    <Link  className="nav-link " style={{width:"3.6em"}} to={"/cart"}>Cart<span style={{fontSize:"0.7em"}}>🛒</span></Link>
                </li>

                <li className="nav-item">
                    <Link  className="nav-link " style={{width:"3.6em"}} to={"/contact"}>Contact</Link>
                </li>
                <li className="nav-item">
                   {this.createShow()}
                </li>

                <li>
                    <div>
                        {this.renderAuth()}
                    </div>

                </li>

            </ul>


        </nav>
    )

}


}
export default Header
