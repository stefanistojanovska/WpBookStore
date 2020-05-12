import React from "react";
import {Link} from "react-router-dom";

const Book =(props)=> {
    return (
        <div className={"card-inline text-center p-4"} id={props.key} /*style={{borderRight:'solid',borderBottom:"solid",borderColor:"lightgrey"}} */>
            <img className="card-img-top " src={props.item.poster} alt="Card image cap" style={{height:'13em',width:'10em',borderBottom:'solid',borderRight:'solid',borderWidth:'0.1em',borderColor:"lightgrey"}} />
                <div className="card-body"  style={{width:'11em', height:'13em'}}>
                    <h5 className="card-title text-left">{props.item.title}</h5>
                    <h6 className="card-text text-justify small" >{props.item.description.slice(0,80)}...</h6>

                </div>
            <Link className="btn btn-danger" to={"/book/"+props.item.id}>More Info</Link>

        </div>
    )

 }
 export default Book