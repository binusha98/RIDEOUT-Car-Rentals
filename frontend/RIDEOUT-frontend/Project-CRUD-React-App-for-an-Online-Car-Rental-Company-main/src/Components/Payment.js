import React,{Component} from 'react'

import {Form, Row, Col, Button} from 'react-bootstrap';
import {addPayment} from '../services/PaymentService';
import {toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import NavBar from './UserNavBar';
import banner from '../imgs/banner.png';
import {Container, Image } from 'react-bootstrap';


import Swal from "sweetalert2"; 

toast.configure();

class Payment extends Component{
    state = {
        
        userName: "",
        vehicleNo: "",
        paidDate: "",
        total: ""
      };

   
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

    
  

      onSubmit = async (v) => {


        console.log(this.state.userName)

        if(this.state.userName== ''){
          console.log('here');
  
          Swal.fire({  
            icon: 'error',  
            title: 'Oops...',  
            text: 'User Name is Required !',  
           
          });  
          
        }
   
        else if(this.state.vehicleNo== '')  {
          console.log('here');
  
          Swal.fire({  
            icon: 'error',  
            title: 'Oops...',  
            text: 'Vehicle No is Required !',  
           
          });  
          
        }


        else if(this.state.paidDate == ''){
          console.log('here');
  
          Swal.fire({  
            icon: 'error',  
            title: 'Oops...',  
            text: 'Paid Date is Required !',  
           
          });  
          
        }

        else if(this.state.total== ''){
          console.log('here');
  
          Swal.fire({  
            icon: 'error',  
            title: 'Oops...',  
            text: ' Total is Required !',  
           
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
          const vehi = await addPayment(payment);
          console.log(vehi.status);
          toast('Payment Added!')
          this.props.history.push("/paymentdetails");
        } catch (e) {
          console.log(e);
        }
        }

    
    
    };


    render(){
        return(
            <Row className="create">
     <div class="container">
      <NavBar />
           
      <Container fluid style={{padding:"0"}}>
            <Image src={banner} fluid style={{width:"1320px"}}/>
          </Container>
         
          </div>
<br></br>
            <h2>Add New Payment</h2>
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
                    vehicle No
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

                        <Form.Control type="date" placeholder="Paid Date" value={this.state.paidDate} onChange={this.onChangePaidDate} noValidate/>

                       
                    </Col>
                </Form.Group>

                <Form.Group as={Row} className="mb-3">
                    <Form.Label column sm="2">
                    Total
                    </Form.Label>
                    <Col sm="10">

                        <Form.Control type="text" placeholder="Total" value={this.state.total} onChange={this.onChangeTotal} noValidate/>

                    </Col>
                </Form.Group>

             
              <Button type="submit" >Add Payment</Button>
                 
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


export default Payment
