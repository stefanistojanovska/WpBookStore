import React from "react"
import BookService from "../services/booksService";
import Book from "./Book";
import AuthenticationService from "../services/AuthenticationService";
class BooksTable extends React.Component
{
    constructor(props) {
        super(props);
        this.state=
            {
                books: [],
                isLoading: false
            }

    }
    componentDidMount() {
        this.setState({
            isLoading:true
        });
        this.getBooks();
        console.log(this.props)
    }
    getBooks=()=>
    {


        BookService.fetchBooksByCategory(this.props.match.params.cname).then(response=>{
            console.log(response.data)
            this.setState({
                books: response.data,
                isLoading:false
            })
        });

        console.log(this.state)

    };

    componentDidUpdate(prevProps, prevState, snapshot) {
        if(prevProps!==this.props)
            this.getBooks();
    }

    render() {
        return(
            <div className={"row rounded"} style={{backgroundColor:"white",width:'78em',marginTop:"-16em"}}>

                {
                    this.state.isLoading ? <p>Loading..</p> : this.state.books.map(book=>{
                   return  (
                            <div >
                                 <Book item={book} key={book.id} />
                            </div>
                       )
                })}

            </div>
        )
    }
}
export default BooksTable;