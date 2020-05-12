import React from "react";
import BookService from "../services/booksService";
import {Link, Redirect} from "react-router-dom";
import AuthenticationService from "../services/AuthenticationService";
class BookDetails extends React.Component
{
    constructor(props) {
        super(props);
        this.state=
            {
                book:[],
                authors:[],
                isAuthenticated:AuthenticationService.isUserAuthenticated(),
                star:'☆',
                wishBooks:[],
                shouldRedirect:false,
                update:[],
                newUser:{},
                cart:'🛒',
                cartBooks:[]
            }
            this.stateCheck=this.stateCheck.bind(this)
        this.addWishlist=this.addWishlist.bind(this)
        this.getWishList=this.getWishList.bind(this)
        this.addCart=this.addCart.bind(this)

    }
    componentDidMount() {
        this.getBook()
        this.getWishList()
        this.getCart()

    }
    getWishList()
    {
        if(this.state.isAuthenticated) {
            BookService.fetchWishList(AuthenticationService.getUser()).then(response => {
                this.setState({
                    wishBooks: response.data,

                })
            }).then(this.stateCheck)
        }
    }
    getCart()
    {
        if(this.state.isAuthenticated) {
            BookService.fetchCart(AuthenticationService.getUser()).then(response => {
                this.setState({
                    cartBooks: response.data,

                })
            }).then(this.stateCheck)
        }
    }

stateCheck()
{

    for(let i=0;i<Object.keys(this.state.wishBooks).length;i++)
    {
        if(this.state.wishBooks[i].id===this.state.book.id)
        {
            this.setState({
                star:'★'
            })
            break;
        }
    }

    for(let i=0;i<Object.keys(this.state.cartBooks).length;i++)
    {
        if(this.state.cartBooks[i].id===this.state.book.id)
        {
            this.setState({
                cart:'✓'
            })
            break;
        }
    }
}

getBook()
    {
        BookService.fetchBookDetails(this.props.match.params.bookId).then(response=>{
            this.setState({
                book: response.data,
                authors:response.data.authors

            })
        })
    }
    componentDidUpdate(prevProps, prevState, snapshot) {
        if(prevProps!==this.props)
            this.getBook();


    }
    addWishlist()
    {
        if(!AuthenticationService.isUserAuthenticated())
           {
               this.setState({
                   shouldRedirect:true
               })
           }
        else
        {
            if(this.state.star==='★')
            {
                //REMOVE
                BookService.fetchUserByUsername(AuthenticationService.getUser()).then(response=>
                    this.setState({
                        newUser:response.data
                    })
                ).then(()=>{
                    console.log(this.state.newUser.id+"fejdn")

                    BookService.removeTry(this.state.book.id,this.state.newUser.id).then(response=>{console.log("SUCCESS")}).catch(error=>{console.log(error)})
                    this.setState({
                        star:'☆'
                    })
                })
            }
            else
            {
                //ADD
                BookService.fetchUserByUsername(AuthenticationService.getUser()).then(response=>
                    this.setState({
                        newUser:response.data
                    })
                ).then(()=>{
                    console.log(this.state.newUser.id+"fejdn")

                    BookService.updateTry(this.state.book.id,this.state.newUser.id).then(response=>{console.log("SUCCESS")}).catch(error=>{console.log(error)})
                    this.setState({
                        star:'★'
                    })
                })

            }

        }
    }
    addCart()
    {
        if(!AuthenticationService.isUserAuthenticated())
        {
            this.setState({
                shouldRedirect:true
            })
        }
        else
        {
            if(this.state.cart==='🛒')
            {
                //ADD
                BookService.fetchUserByUsername(AuthenticationService.getUser()).then(response=>
                    this.setState({
                        newUser:response.data
                    })
                ).then(()=>{
                    BookService.updateTryCart(this.state.book.id,this.state.newUser.id).then(response=>{console.log("SUCCESS")}).catch(error=>{console.log(error)})
                    this.setState({
                        cart:'✓'
                    })
                })

            }
            else
            {
                //  REMOVE

                BookService.fetchUserByUsername(AuthenticationService.getUser()).then(response=>
                    this.setState({
                        newUser:response.data
                    })
                ).then(()=>{
                    BookService.removeTryCart(this.state.book.id,this.state.newUser.id).then(response=>{console.log("SUCCESS")}).catch(error=>{console.log(error)})
                    this.setState({
                        cart:'🛒'
                    })
                })

            }

        }
    }


    render() {
        if(this.state.shouldRedirect)
            return <Redirect to={"/login"}/>
        else return(

            <div className={"row rounded d-block pr-4"} style={{backgroundColor:"white",width:'78em',marginTop:"-1.4em",paddingTop:'1.4em',paddingLeft:'1.4em',height:'46.1em'}}>
                <h1>{this.state.book.title}</h1>
                <hr/>
                <table>

                    <tbody>
                    <tr>
                        <td>
                            <img src={this.state.book.poster} className={'rounded'} style={{height:'29em',width:'24em',borderBottom:'solid',borderRight:'solid',borderWidth:'0.2em',borderColor:"lightgrey"}}/>
                        </td>

                        <td className={"pl-4 text-justify  pr-0 "} style={{verticalAlign:'top'}}>

                            <span style={{fontSize:'2em'}} className={""}  >

                            {(this.state.authors.length>1)?<span>Authors: </span>:<span>Author: </span>}
                             </span>
                            <span style={{fontSize:'2em'}} className={"font-weight-lighter"}>
                            {
                                 this.state.authors.map((author,i)=>
                                    {
                                         if(i===this.state.authors.length-1) return(<span>{author.nameFull}</span>)
                                         else return (<span>{author.nameFull}, </span>)
                                    })
                            }
                             </span>
                             <hr/>

                             <span style={{fontSize:'1.5em'}} className={'font-weight-lighter'}>
                                <i>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{this.state.book.description}</i>
                            </span>
                        </td>
                    </tr>
                    </tbody>
                </table>
                <hr/>
                <table>

                    <tbody>
                    <tr>
                        <td>
                            <span style={{fontSize:'1.6em'}} className={""}  >Release date: </span>
                            <span style={{fontSize:'1.6em'}} className={"font-weight-lighter"}>{this.state.book.year}</span><br/>
                            <span style={{fontSize:'1.6em'}} className={""}  >Number of pages: </span>
                            <span style={{fontSize:'1.6em'}} className={"font-weight-lighter"}>{this.state.book.pagesNum}</span><br/>
                            <span style={{fontSize:'1.6em'}} className={""}  >Price: </span>
                            <span style={{fontSize:'1.6em'}} className={"font-weight-lighter"}>{this.state.book.price}$</span><br/><br/>
                        </td>
                        <td>
                            <Link className="btn btn-danger  btn-lg mb-2  " to={'#'} style={{marginLeft:'18em',fontSize:'1.5em'}} onClick={this.addCart} ><span className={"small"}>{this.state.cart} </span>Add to cart</Link>
                            <Link className="btn btn-danger  btn-lg mb-2 ml-2  " to={'#'} style={{fontSize:'1.5em'}} onClick={this.addWishlist}><span>{this.state.star} Wishlist</span></Link>
                        </td>

                    </tr>
                    </tbody>
                </table>


            </div>

        )
    }
}
export default BookDetails