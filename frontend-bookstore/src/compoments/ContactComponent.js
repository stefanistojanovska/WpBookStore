import React from "react";
class ContactComponent extends React.Component
{
    render() {
        return(
            <table className={"row rounded"} style={{backgroundColor:"white",width:'78em',height:'46em',marginTop:"-1.5em"}}>
                <tbody>
                <tr>
                    <td className={"p-4"}>
                        <h1>🕮 Book Repository<small>©</small></h1>
                        <hr style={{color:'black'}}/>

                    </td>
                </tr>
                <tr>
                    <td>
                <h3 className={"p-4"}><address>
                    4700 One Microsoft Way<br />
                    Redmond, WA 98052-6399<br />
                    <abbr title="Phone">P: </abbr>
                    425.555.0100
                </address>
                    <address>
                        <strong>Support:</strong>   <a href="mailto:support@brep.com">support@brep.com</a><br />
                        <strong>Marketing:</strong> <a href="mailto:marketing@brep.com">marketing@brep.com</a>
                    </address>
                </h3>
                    </td>
                </tr>
                </tbody>
            </table>
        )
    }
}
export default ContactComponent