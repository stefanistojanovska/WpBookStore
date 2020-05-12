import React from "react";
import BookService from "../services/booksService";
import {Redirect} from "react-router-dom";
import {Link} from "react-router-dom";
import AuthorForm from "./AuthorForm";
import AuthenticationService from "../services/AuthenticationService";

class BookForm extends React.Component
{
   constructor(props) {
       super(props);
       this.state={
           title:"",
           description:"",
           poster:"",
           year:"",
           bestseller:false,
           price:"",
           categories:[],
           authors:[],
           pagesNum:"",
           allCats:[],
           allAuthors:[],
           redirect:false,
           refreshAdd:false
       }
       this.handleChange=this.handleChange.bind(this)
       this.handleSubmit=this.handleSubmit.bind(this)
       this.handleChangeCheckbox=this.handleChangeCheckbox(this)
       this.handler=this.handler.bind(this)
       this.fetchAuthors=this.fetchAuthors.bind(this)

   }
   componentDidMount() {
       BookService.fetchCategories().then(response=>
       {
           this.setState({
               allCats:response.data
           })
       });
      this.fetchAuthors()

   }
   fetchAuthors()
   {
       BookService.fetchAuthors().then(response=>
       {
           this.setState({
               allAuthors: response.data
           })
       })
   }
   componentDidUpdate(prevProps, prevState, snapshot) {
       if(this.state.refreshAdd===true)
       {
           console.log(this.state.refreshAdd+"REFRESH")
          this.fetchAuthors()
       }
   }

    handleChange(event)
   {
       const{name,value,type,checked} = event.target
       if(name==='cats')
       {
           if(checked===true){
               BookService.fetchCategoryById(value).then(response=>
               {
                   this.setState({
                       categories:[...this.state.categories,response.data]
                   })
               })
           }
       }
       else if(name==='authors')
       {
           if(checked===true){
               BookService.fetchAuthorById(value).then(response=>
               {
                   this.setState({
                   authors:[...this.state.authors,response.data]
                   })
               })
           }
       }
       else{
           type==="checkbox"?
               this.setState({
                   [name]:checked
               }):
               this.setState({
                   [name]:value
               })
       }


   }
    handler()
    {
        console.log("handler")
        this.setState({
           refreshAdd:true
        })

    }
    handleSubmit ( event ) {

        event.preventDefault();
        console.log("TU SAM")
        BookService.createNewBook(this.state.title, this.state.description, this.state.poster, this.state.year, this.state.pagesNum, this.state.price, this.state.bestseller,this.state.authors,this.state.categories).then(r =>
            console.log(r + "jnfksdm"))
        this.setState({
            redirect:true
        })
    }
    handleChangeCheckbox(event)
    {
       /* const{value,checked}=event.target
        if(checked===true){
            BookService.fetchAuthorById(value).then(response=>
            {
                this.setState({
                    authors:response.data
                })
            })
        }*/
    }

   render() {
       if(this.state.redirect) return <Redirect to={"/books/category/Bestsellers"}/>

       return(
           <div className={"row rounded"} style={{backgroundColor:"white",width:'78em',marginTop:"-16em"}}>

           <main>
               <form onSubmit={this.handleSubmit} >
                   <table>
                   <tbody>
                       <tr>
                           <td className={"p-4"}>
                               <div className="form-check">Author/s:

                                   {this.state.allAuthors.map(author=>{
                                       return (
                                           <p>
                                               &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<input type={"checkbox"} value={author.id} onChange={this.handleChange }  name="authors"  />
                                               &nbsp;{author.nameFull}</p>

                                       )}
                                   )}
                                   <span>New author↴</span>



                               </div>
                           </td>
                           <td className={"p-2"}>
                               <div className="form-check">Category:

                                   {this.state.allCats.map(cat=>{
                                       return (
                                           <p>
                                               &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<input type={"checkbox"} value={cat.id} onChange={this.handleChange }  name="cats"  />
                                               &nbsp;{cat.categoryName}</p>

                                       )}
                                   )}

                               </div>
                           </td>

                           <td className={"p-4 "}>
                   <div className="form-group">
                       <label >Title:</label><input name={"title"} value={this.state.title} onChange={this.handleChange} placeholder={""}  className="form-control"/>
                   </div>
                   <div className="form-group">
                       <label >Description:</label>
                       <input name={"description"} value={this.state.description} onChange={this.handleChange}  className="form-control"/>
                   </div>
                   <div className="form-group">
                       <label >Poster(URL):</label>
                       <input name={"poster"} value={this.state.poster} onChange={this.handleChange}  className="form-control"/>
                   </div>
                           </td>
                           <td className={"pt-4 pl-4 pr-4"}>
                   <div className="form-group">
                       <label >Year:</label>
                       <input name={"year"} value={this.state.year} onChange={this.handleChange} className="form-control"/>
                   </div>
                   <div className="form-group">
                       <label >Price:</label>
                       <input name={"price"} value={this.state.price} onChange={this.handleChange} className="form-control"/>
                   </div>
                   <div className="form-group">
                       <label >Number of pages:</label>
                       <input name={"pagesNum"} value={this.state.pagesNum} onChange={this.handleChange}  className="form-control"/>
                   </div>
                   <div className="form-check">
                       <label>
                           Bestseller  <input type={"checkbox"} name={"bestseller"} onChange={this.handleChange } checked={this.state.bestseller} className=""/>
                       </label>
                   </div>
                           </td>
                           <td className={"p-4"}>

                               <button  type={"submit"} className="btn btn-danger ml-5 p-3"  > Submit</button>




                               {console.log(this.state)}
                           </td>

                       </tr>
                   </tbody>
                   </table>
               </form>
           </main>
               <AuthorForm action={this.handler}/>
           </div>
       )
   }
}
export default BookForm