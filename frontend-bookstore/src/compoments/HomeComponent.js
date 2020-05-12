import React from "react";

class HomeComponent extends React.Component
{
    render() {
        return(
            <div className={"row rounded align-content-center"} style={{backgroundColor:"white",width:'78em',height:'46em',marginTop:"-1.5em"}}>
                <span className={"display-4 text-align-center p-4 d-block ml-4"}>Hello!</span>
            </div>
        )
    }


}
export default HomeComponent