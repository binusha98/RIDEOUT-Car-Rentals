import React from 'react'
import Swal from "sweetalert2";
import {Form, Row, Col, Button, Alert} from 'react-bootstrap';
import  { Component } from "react";
import { getPaymentById,updatePayment } from "../services/PaymentService";
import {toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import NavBar from './NavBar';
import banner from '../imgs/banner.png';
import {Container, Image } from 'react-bootstrap';
import Pdf from "react-to-pdf";
toast.configure();



const ref = React.createRef();
class UpdatePayment extends Component{

    constructor(props) {
        super(props)

        this.state = {
            payment_id: this.props.match.params.payment_id,
            userName: "",
            vehicleNo: "",
            paidDate: "",
            total: ""
        }
       
    }

    componentDidMount() {
        this.getPayment();
      }


  
    onChangeUserName = (userName) => {
        this.setState({
            userName: userName.target.value,
        });
      };
      onChangeVehicleNo = (vehicleNo) => {
        this.setState({
            vehicleNo: vehicleNo.target.value,
        });
      };
      onChangePaidDate = (paidDate) => {
        this.setState({
            paidDate: paidDate.target.value,
        });
      };
      onChangeTotal = (total) => {
        this.setState({
            total: total.target.value,
        });
      };




      getPayment = async () =>{

        console.log(this.props.match.params)
         

        try{
             getPaymentById(this.props.match.params.id).then((res)=>{
              // console.log(this.props.match.params.id)
                let payment = res.data.post;
                 this.setState({payment_id: payment._id,
                    userName: payment.userName,
                    vehicleNo : payment.vehicleNo,
                    paidDate:payment.paidDate,
                    total:payment.total
                
                 });
            })
       
  
        }catch(e){
            console.log(e);
        }
   }
   onSubmit = async (v) => {

    console.log(v)
    if(this.state.userName === ''){


      Swal.fire({  
        icon: 'error',  
        title: 'Oops...',  
        text: 'User Name is Required !',  
       
      });  

  
    
    }
    else if(this.state.vehicleNo === ''){


      Swal.fire({  
        icon: 'error',  
        title: 'Oops...',  
        text: ' Vehicle No is Required !',  
       
      });  
   
    }
    else if(this.state.paidDate === ''){
 

      Swal.fire({  
        icon: 'error',  
        title: 'Oops...',  
        text: 'Paid Date is Required !',  
       
      });  

    }

 
    else if(this.state.total === ''){
   

      Swal.fire({  
        icon: 'error',  
        title: 'Oops...',  
        text: 'Total is Required !',  
       
      });  

    }
   

      v.preventDefault();

      if(this.state.userName != '' && this.state.vehicleNo != '' && this.state.paidDate != ''&& this.state.total != ''){

        const payment = {
        
          vehicleNo: this.state.vehicleNo,
          paidDate: this.state.paidDate,
          total: this.state.total,
          userName: this.state.userName,
      };

      console.log(payment)
      try {
        const pay = await updatePayment(this.state.payment_id,payment);
        console.log(pay.status);
        toast('Successfully Updated!')
        this.props.history.push("/paymentdetails");
      } catch (e) {
        console.log(e);
      }
      }
  };


    render() {
        return(
            <Row className="update">
    <div class="container">
      <NavBar />
           
      <Container fluid style={{padding:"0"}}>
            <Image src={banner} fluid style={{width:"1320px"}}/>
          </Container>
         
          </div>
<br></br>
            <h2>Update Payment</h2>
            <Form onSubmit={this.onSubmit} noValidate>
               
                <Form.Group as={Row} className="mb-3">
                    <Form.Label column sm="2">
                    User Name
                    </Form.Label>
                    <Col sm="10">
                        <Form.Control type="text" placeholder=" User Name" value={this.state.userName} onChange={this.onChangeUserName} noValidate/>
                    </Col>
                </Form.Group>
                <Form.Group as={Row} className="mb-3">
                    <Form.Label column sm="2">
                    Vehicle No
                    </Form.Label>
                    <Col sm="10">
                        <Form.Control type="text" placeholder="Vehicle No" value={this.state.vehicleNo} onChange={this.onChangeVehicleNo} noValidate/>
                    </Col>
                </Form.Group>
                <Form.Group as={Row} className="mb-3">
                    <Form.Label column sm="2">
                    Paid Date
                    </Form.Label>
                    <Col sm="10">
                        <Form.Control type="text" placeholder="Paid Date" value={this.state.paidDate} onChange={this.onChangePaidDate} noValidate/>
                    </Col>
                </Form.Group>

                <Form.Group as={Row} className="mb-3">
                    <Form.Label column sm="2">
                    Total 
                    </Form.Label>
                    <Col sm="10">
                        <Form.Control type="text" placeholder=" Total" value={this.state.total} onChange={this.onChangeTotal} noValidate/>
                    </Col>
                </Form.Group>

    
              <Button type="submit" >Update Payment</Button>
              
            <br></br>
            <br></br>

            <Pdf targetRef={ref}  filename="DriverReport.pdf">
                    {({ toPdf }) => <button className="btn btn-secondary" onClick={toPdf}>Capture report as PDF</button>}
                     </Pdf>

                     <br></br>
            <br></br>
            <Container fluid className="bg-dark text-white text-center pt-3 pb-3">
              <Row>
                <Col>
                  <p class="fs-5">RIDEOUT Car Rentals</p>
                </Col>
              </Row>
              <Row>
                <Col>
                  <p class="fs-6">All Right Reserved by rideout.com </p>
                </Col>
              </Row>
            </Container>
<br></br>
            </Form>
          </Row>
        )
    }


}

export default UpdatePayment
