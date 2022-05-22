import Swal from "sweetalert2";
import React,{useContext} from 'react'
import { MainContext } from '../Contexts/MainContext'
import { useState } from "react";
import { useHistory,useParams } from "react-router-dom";
import {Form, Row, Col, Button, Alert} from 'react-bootstrap';
import  { Component } from "react";
import { getBookById,updateBooking } from "../services/BookingService";
import {toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import NavBar from './NavBar';
import banner from '../imgs/banner.png';
import {Container, Image } from 'react-bootstrap';
toast.configure();




class UpdateBooking extends Component{

    constructor(props) {
        super(props)

        this.state = {
            booking_id: this.props.match.params.booking_id,
            username: "",
            startDate: "",
            endDate: ""
            
        }
       
    }

    componentDidMount() {
        this.getBooking();
      }


  
    onChangeUserName = (username) => {
        this.setState({
            username: username.target.value,
        });
      };
      onChangeVehicleNo = (vehicleNo) => {
        this.setState({
            vehicleNo: vehicleNo.target.value,
        });
      };
      onChangeStartDate= (startDate) => {
        this.setState({
            startDate: startDate.target.value,
        });
      };

      onChangeEndDate = (endDate) => {
        this.setState({
            endDate: endDate.target.value,
        });
      };


      getBooking = async () =>{

        console.log(this.props.match.params.id)

        try{
             getBookById(this.props.match.params.id).then((res)=>{
            
                let booking = res.data.post;
                 this.setState({booking_id: booking._id,
                    username: booking.username,
                    vehicleNo : booking.vehicleNo,
                    startDate:booking.startDate,
                    endDate:booking.endDate
                    
                 });
            })
       
  
        }catch(e){
            console.log(e);
        }
   }




 

 onSubmit = async (v) => {

  console.log(v)
  if(this.state.username === ''){


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
      text: 'Vehicle No is Required !',  
     
    });  
 
  }
  else if(this.state.startDate === ''){


    Swal.fire({  
      icon: 'error',  
      title: 'Oops...',  
      text: 'Start Date is Required !',  
     
    });  

  }

  //console.log(this.state.price)
  else if(this.state.endDate === ''){
 

    Swal.fire({  
      icon: 'error',  
      title: 'Oops...',  
      text: 'End Date is Required !',  
     
    });  

  }
 

    v.preventDefault();

    if(this.state.endDate != '' && this.state.startDate != ''&& this.state.vehicleNo != '' && this.state.username!= ''){

      const booking = {
      
        username: this.state.username,
        vehicleNo: this.state.vehicleNo,
        startDate: this.state.startDate,
        endDate: this.state.endDate
    };

    console.log(booking)
    try {
      const book = await updateBooking(this.state.booking_id,booking);
      console.log(book.status);
      toast('Successfully Updated!')
      this.props.history.push("/bookingdetail");
      
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
            <h2>Update Booking</h2>
            <Form onSubmit={this.onSubmit} noValidate>
               
                <Form.Group as={Row} className="mb-3">
                    <Form.Label column sm="2">
                    User Name
                    </Form.Label>
                    <Col sm="10">
                        <Form.Control type="text" placeholder=" User Name" value={this.state.username} onChange={this.onChangeUserName} noValidate/>
                    </Col>
                </Form.Group>
                <Form.Group as={Row} className="mb-3">
                    <Form.Label column sm="2">
                    Vehicle No
                    </Form.Label>
                    <Col sm="10">
                        <Form.Control type="vehicleNo" placeholder="Vehicle No" value={this.state.vehicleNo} onChange={this.onChangeVehicleNo} noValidate/>
                    </Col>
                </Form.Group>
                <Form.Group as={Row} className="mb-3">
                    <Form.Label column sm="2">
                    Start Date
                    </Form.Label>
                    <Col sm="10">
                        <Form.Control type="text" placeholder="startDate" value={this.state.startDate} onChange={this.onChangeStartDate} noValidate/>
                    </Col>
                </Form.Group>

                <Form.Group as={Row} className="mb-3">
                    <Form.Label column sm="2">
                    End Date
                    </Form.Label>
                    <Col sm="10">
                        <Form.Control type="text" placeholder="End Date" value={this.state.endDate} onChange={this.onChangeEndDate} noValidate/>
                    </Col>
                </Form.Group>

             
    
              <Button type="submit" >Update Booking</Button>
                 
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



export default UpdateBooking
