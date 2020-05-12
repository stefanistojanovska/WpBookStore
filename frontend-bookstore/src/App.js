import 'bootstrap/dist/css/bootstrap.min.css';
import React,{Component} from 'react';
import {
    Route,
    withRouter,
    Switch} from 'react-router-dom';
import {BrowserRouter} from "react-router-dom";
import './App.css';
import Header from './compoments/Navbar'
import BooksTable from "./compoments/BooksTable";
import BookService from "./services/booksService";
import BookDetails from "./compoments/BookDetails";
import SideBar from "./compoments/SideBar";
import 'font-awesome/css/font-awesome.min.css';
import BookForm from "./compoments/BookForm";
import LoginComponent from "./compoments/LoginComponent";
import AuthenticationService from "./services/AuthenticationService";
import Register from "./compoments/RegisterComponent";
import AuthenticatedRoute from "./compoments/AuthenticatedRoute";
import WishlListComponent from "./compoments/WishlListComponent";
import CartComponent from "./compoments/CartComponent";
import PaymentComponent from "./stripe/PaymentComponent";
import HomeComponent from "./compoments/HomeComponent";
import ContactComponent from "./compoments/ContactComponent";



class  App extends Component{

   constructor(props) {
       super(props);
       this.state={
           categories: [],
           isLoading: false,
           isAuthenticated:AuthenticationService.isUserAuthenticated()
       }
       this.handler=this.handler.bind(this)
   }
   handler()
   {
       this.setState({
           isAuthenticated:AuthenticationService.isUserAuthenticated()
       })

   }
   componentDidUpdate(prevProps, prevState, snapshot) {
       if(this.state!==prevState)
           this.render()
   }

    componentDidMount() {
       BookService.fetchCategories().then(response=>{
           console.log(response.data)
           this.setState({
               categories: response.data
           })
       });
       console.log(this.state)
   }




    render()
   {
       return (
           <div  style={{marginTop:'5em'}} >
           <BrowserRouter>
               <Header cats={this.state.categories} action={this.handler} auth={this.state.isAuthenticated} />

               <table>
                   <tbody>
                   <tr>
                       <td>
                           <div className={""}>
                               <SideBar/>
                           </div>
                       </td>
                       <td>
                           <div className={" pl-4"} style={{}}>


                                <Switch>
                                        <Route path={"/"} exact component={HomeComponent}/>
                                    <Route path={"/contact"} exact component={ContactComponent}/>
                                    {<Route path="/books/category/:cname" exact component={BooksTable}/>}
                                   { <Route path="/book/:bookId"  exact component={BookDetails}/>}
                                   {<AuthenticatedRoute path="/books/create"  exact component={BookForm}/>}
                                   <AuthenticatedRoute path={"/wishlist"} exact component={WishlListComponent}/>
                                   <Route path="/login" > <LoginComponent action={this.handler} auth={this.state.isAuthenticated}/></Route>}
                                    <Route path={"/register"}><Register/></Route>
                                    <Route path={"/payment"}><PaymentComponent/></Route>
                                    <AuthenticatedRoute path={"/cart"}><CartComponent/></AuthenticatedRoute>
                                    <AuthenticatedRoute path={"/add"}><BookForm/></AuthenticatedRoute>

                                 </Switch>

                           </div>

                       </td>
                   </tr>
                   </tbody>
               </table>



               {console.log("redirect")}


           </BrowserRouter>

               <hr style={{color:'black',width:'96em',marginLeft:'1.3em'}} className={""}/>

               <footer className="text-center p-3">
                   <a href="#" className="btn btn-outline-dark rounded-circle ">
                       <i className="fab fa-facebook-f"></i>
                   </a>
                   <a href="#" className="btn btn-outline-dark rounded-circle">
                       <i className="fab fa-linkedin"></i>
                   </a>
                   <a href="#" className="btn btn-outline-dark rounded-circle">
                       <i className="fab fa-twitter"></i>
                   </a>
                   <br/>
                       <span>Copyright @ 2020</span>


               </footer>


           </div>

       );
   }


}

export default App;
