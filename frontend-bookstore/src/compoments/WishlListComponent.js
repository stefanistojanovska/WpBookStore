import React from "react";
import Book from "./Book";
import BookService from "../services/booksService";
import AuthenticationService from "../services/AuthenticationService";
class WishlListComponent extends React.Component
{
    constructor(props) {
        super(props);
        this.state={
            books:[],
            loaded:false
        }

    }
    componentDidMount() {
        BookService.fetchWishList(AuthenticationService.getUser()).then(response=>{
            this.setState({
                books:response.data,

            })
        })}
    render() {
        if(Object.keys(this.state.books).length==0)
            return   (
                <div className={"row rounded pt-2 justify-content-center"} style={{backgroundColor:"white",width:'78em',marginTop:"-10.5em"}}>
                    <span style={{fontSize:'2em',padding:'2em'}}><u><i>Your wishlist is empty!</i></u></span></div>)

        else  return(
            <table  className={"row rounded"} style={{backgroundColor:"white",width:'78em',marginTop:"-10.3em"}}>
                <tbody>
                <tr>
                    <div className={"d-inline"}><span style={{width:"",fontSize:'2em'}} className={"  pl-4"}>Wishlist ☆<hr/></span></div>
                </tr>
                <tr>
                    {
                        this.state.isLoading ? <p>Loading..</p> : this.state.books.map(book=>{
                            return  (
                                <td >
                                    <Book className={"d-inline col"} item={book} key={book.id} />
                                </td>
                            )
                        })}
                </tr>
                </tbody>
            </table>


        )
    }
}
export  default  WishlListComponent