import React from "react";
import BookService from "../services/booksService";
import AuthenticationService from "../services/AuthenticationService";
import {Link, Redirect, Route} from "react-router-dom";


class CartComponent extends React.Component
{
    constructor(props) {
        super(props);
        this.state={
            books:[],
            loaded:false,
            total:0
        }


    }
    componentDidMount() {

        let tmp=0
        BookService.fetchCart(AuthenticationService.getUser()).then(response=>{
            this.setState({
                books:response.data,

            })
        }).then(()=>{

            for(let i=0;i<Object.keys(this.state.books).length;i++)
            {
                tmp+=this.state.books[i].price
            }
            console.log(tmp+"total")
            this.setState({
                total:tmp
            })


        })


    }
    tmp()
    {
        return <Redirect to={"/"}/>
    }
    render() {

        if(Object.keys(this.state.books).length==0)
            return   (
                <div className={"row rounded pt-2 justify-content-center"} style={{backgroundColor:"white",width:'78em',marginTop:"-10.5em"}}>
                    <span style={{fontSize:'2em',padding:'2em'}}><u><i>Your cart is empty!</i></u></span></div>)

        else  return(
            <table  className={"row rounded"} style={{backgroundColor:"white",width:'78em',marginTop:"-10.3em"}}>
                <tbody>
                <tr>
                    <div className={"d-inline"}><span style={{width:"",fontSize:'2em'}} className={"  pl-4"}><small>🛒</small> Shopping cart <hr/></span></div>
                </tr>
                <tr>
                    <table>
                        <thead>
                        <th> </th>
                        <th className={"p-2"}>Book</th>
                        <th className={"p-2"}>Price</th>
                        </thead>
                        <tbody>
                        {this.state.books.map((book,i)=>{
                            return(
                                <tr >
                                    <td className={"p-2"}><b>{i+1}.  </b></td>
                                    <td className={"p-2"}><Link to={`/book/${book.id}`} >{book.title}</Link></td>
                                    <td className={"p-2"}>{book.price}</td>
                                </tr>)
                        })}
                        </tbody>
                    </table>
                    <hr/>
                    <div className={"pb-2"}>
                    <span className={"p-3 "} style={{fontSize:'1.5em'}} ><b>Total:{this.state.total}$</b></span>

                    <Link   to={{pathname:"/payment"}} ><button className={"btn btn-danger  mb-2"} style={{fontColor:"white"}}>Proceed to payment</button></Link>

                    </div>
                </tr>
                </tbody>
            </table>









        )
    }
}
export default CartComponent