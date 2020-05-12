import React from "react";
import {Link} from "react-router-dom";
import BookService from "../services/booksService";
class AuthorForm extends React.Component
{
    constructor(props)
    {
        super(props)
        this.state={
            name:'',

        }
        this.handleChange=this.handleChange.bind(this)
        this.handleSubmit=this.handleSubmit.bind(this)

    }
    handleChange(event)
    {
        this.setState({
            [event.target.name]:event.target.value
        })

    }

    handleSubmit(event)
    {
        event.preventDefault();
        BookService.createNewAuthor(this.state.name).then(response=>console.log("AUTHOR ADDED")).catch(error=>console.log(error)).then(()=>{
            this.setState({
                name:'',

            })
            this.props.action()
        })



    }
    render() {
        return(


            <div style={{ paddingLeft:"2em"}}>


                <main>
                    <form onSubmit={this.handleSubmit} >
                    <div className="">
                        <input className={"rounded"} type="text" style={{border:'solid',borderColor:'lightgrey',borderWidth:'0.05em',height:'2.4em',width:'12em'}} name="name" value={this.state.name} onChange={this.handleChange} />
                        <button  type={"submit"} className="btn btn-danger mb-1 ml-1"  > Add</button>
                    </div>

                    </form>
                </main>
            </div>
        )
    }
}
export default AuthorForm