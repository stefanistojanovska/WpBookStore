import React from "react";
import {Link} from "react-router-dom";
function SideBar()
{
    return(
        <div className={"col"}>
            <div style={{backgroundColor:"white",width:'17em'}} className={"rounded"} >
                <h6 className="card-title text-left pl-2 pt-2" style={{marginRight:'1em'}}>Coming soon</h6>
                <hr className={"mt-2"}/>
                <img src={"https://i1.wp.com/www.thenerddaily.com/wp-content/uploads/2019/11/Best-2019-Fantasy-Sci-Fi-Books.jpg?fit=1000%2C742&ssl=1"} style={{width:'17em',height:'10em',marginTop:'-0.8em'}}/>
            </div>
            <br/>
            <div style={{backgroundColor:"white",width:'17em', borderRight :"solid", borderColor:"#FF623B",borderWidth:'0.1em'}} className={"p-3 rounded"}>
                <i> "Whenever you read a good book, somewhere in the world a door opens to allow in more light."<br />
                <span style={{fontSize:'0.8em'}}> – Vera Nazarian</span></i>
            </div>
            <br/>
            <div style={{backgroundColor:"white",width:'17em'}} className={"rounded"}>
                <h6 className="card-title text-left pl-2 pt-2" style={{marginRight:'1em'}}>This week's bestseller</h6>
                <hr/>
                <div className={'row  '}>
                    <span className={'col-4'} style={{width:'5em'}}>
                        <img src={"https://d1w7fb2mkkr3kw.cloudfront.net/assets/images/book/lrg/9780/3854/9780385490818.jpg"} style={{width:'5em',height:'8.3em',paddingLeft:'0.4em'}}/>
                    </span>
                    <span className={"col-8 p-1"}>

                         <h6 className="card-text  text-left " >The Handmaid's Tale:</h6>
                        <span className={""} style={{fontSize: '0.6em',lineHeight:0.2}}>A story that describes the possible life of every handmaid...</span><br/><br/>
                        <span className={""}>
                            <Link className="btn btn-danger btn-sm mb-2 " to={"/book/7"}>More Info</Link>
                        </span>
                    </span>


                </div>
            </div>
            <br/>

            <div style={{backgroundColor:"white",width:'17em'}} className={"rounded"} >

                <img src={"https://www.brotherhoodbooks.org.au/pub/media/ubcontentslider/images/0/3/03bbooks_banner1_oct19_3.png"} className={"rounded"} style={{width:'17em',height:'8em',borderRight :"solid",borderBottom:'solid', borderColor:"#FF623B",borderWidth:'0.1em',borderHeight:'0.1em'}}/>
            </div>
            <br/>

        </div>
    )
}
export default SideBar