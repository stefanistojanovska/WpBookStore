import React from "react";
import {Elements, StripeProvider,CardElement} from "react-stripe-elements";
import BookService from "../services/booksService";
import AuthenticationService from "../services/AuthenticationService";
import {Redirect} from "react-router-dom";


class PaymentComponent extends React.Component
{
    constructor(props) {
        super(props);
        this.state={
            fullname:'',
            total:0,
            user:[],
            booksCart:[],
            payed:false
        }
        this.pay=this.pay.bind(this)
        this.handleChange=this.handleChange.bind(this)
    }
    componentDidMount() {
        console.log(this.props.location+"LINK PASSS")
        BookService.fetchUserByUsername(AuthenticationService.getUser()).then(response=>this.setState({
            user:response.data
        }))

       // BookService.
        BookService.fetchCart(AuthenticationService.getUser()).then(response=>{
            console.log(response.data)
            this.setState({
                booksCart:response.data
            })
        })
    }

    handleChange(event)
    {
        this.setState({
            [event.target.name]:event.target.value
        })

    }
    pay()
    {
        console.log("PAY()")
        console.log(this.state.user.id+"IDDDd")
            console.log(this.state.booksCart)
            for(let i=0;i<Object.keys(this.state.booksCart).length;i++)
            {
                console.log("Book:"+this.state.booksCart[i].id)
                BookService.buy(this.state.booksCart[i].id,this.state.user.id).then(response=> {
                  console.log("BOUGHT")}).catch(error=>{console.log(error)})



            }
        for(let i=0;i<Object.keys(this.state.booksCart).length;i++){
           BookService.removeTryCart(this.state.booksCart[i].id, this.state.user.id).then(response=>{console.log(response+"RES")}).catch(error=>{console.log(error)})
        }
        this.setState({
            payed:true
        })

    }
    render() {
        if(this.state.payed)
            return (<Redirect to={"/cart"}/>)
        else return(    <div style={{ paddingLeft:"2em",marginLeft:'22em'}}>
          <span style={{fontSize:'1.5em',marginLeft:''}}>  Please enter your card information bellow↴</span>
            <div style={{backgroundColor:'white'}} className={"rounded p-4"}>
            <div className="form-group">
                <label >Name:</label><input className={"form-control"} type="text" name="fullname" value={this.state.fullname} onChange={this.handleChange} />
            </div>
            Card information:
            <div className={"form-control"} style={{width:'27em'}}>
            <StripeProvider
                stripe={window.Stripe("your-api-key", {
                    betas: ["payment_intent_beta_3"]
                })}
            >
                <Elements>
                    <CardElement  />

                </Elements>
            </StripeProvider>
            </div><br/>
            <button className={"btn btn-danger"} onClick={this.pay}>Pay</button>

            </div>
        </div>)
    }
}
export default PaymentComponent