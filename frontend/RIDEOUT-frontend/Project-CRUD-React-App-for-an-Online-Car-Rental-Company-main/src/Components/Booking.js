import Swal from "sweetalert2";
import React,{Component} from 'react'

import {Form, Row, Col, Button} from 'react-bootstrap';
import {addBooking} from '../services/BookingService';
import {toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import NavBar from './NavBar';
import banner from '../imgs/banner.png';
import {Container, Image } from 'react-bootstrap';
toast.configure();


class Booking extends Component{
   

    state = {
        username: "",
        vehicleNo: "",
        startDate: "",
        endDate: ""
      };

    onChanagUserName = (username) => {
        this.setState({
            username: username.target.value,
        });
      };
      onChanageVehicleNo = (vehicleNo) => {
        this.setState({
            vehicleNo: vehicleNo.target.value,
        });
      };
      onChanageStartDate = (startDate) => {
        this.setState({
            startDate: startDate.target.value,
        });
      };

      onChanageEndDate = (endDate) => {
        this.setState({
            endDate: endDate.target.value,
        });
      };
     
      onSubmit = async (v) => {

        console.log(this.state.username)

        if(this.state.username == ''){
          console.log('here');
  
          Swal.fire({  
            icon: 'error',  
            title: 'Oops...',  
            text: 'User Name is Required !',  
           
          });  
          
        }
        else if(this.state.vehicleNo == ''){
          console.log('here');
  
          Swal.fire({  
            icon: 'error',  
            title: 'Oops...',  
            text: 'Vehicle No is Required !',  
           
          });  
          
        }
        else if(this.state.startDate == ''){
          console.log('here');
  
          Swal.fire({  
            icon: 'error',  
            title: 'Oops...',  
            text: 'Start Date is Required !',  
           
          });  
          
        }

        else if(this.state.endDate == ''){
            console.log('here');
    
            Swal.fire({  
              icon: 'error',  
              title: 'Oops...',  
              text: 'End Date is Required !',  
             
            });  
            
          }
         

          v.preventDefault();


          if(this.state.username != '' && this.state.vehicleNo != '' && this.state.startDate != ''&& this.state.endDate != ''){

            const booking = {
            
              endDate: this.state.endDate,
              startDate: this.state.startDate,
              vehicleNo: this.state.vehicleNo,
              username: this.state.username,
          };
  
          console.log(booking)
          try {
            const book = await addBooking(booking);
            console.log(book.status);
            toast('Booking Added!')
            this.props.history.push("/CarListUser");
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
            <h2>Add New Booking</h2>
            <Form onSubmit={this.onSubmit} noValidate>
                <Form.Group as={Row} className="mb-3">
                    <Form.Label column sm="2">
                    User Name
                    </Form.Label>
                    <Col sm="10">
                        <Form.Control type="text" placeholder="User Name" value={this.state.username} onChange={this.onChanagUserName} noValidate/>
                    </Col>
                </Form.Group>
                <Form.Group as={Row} className="mb-3">
                    <Form.Label column sm="2">
                    Vehicle No 
                    </Form.Label>
                    <Col sm="10">
                        <Form.Control type="text" placeholder="Vehicle No" value={this.state.vehicleNo} onChange={this.onChanageVehicleNo} noValidate/>
                    </Col>
                </Form.Group>
                <Form.Group as={Row} className="mb-3">
                    <Form.Label column sm="2">
                    Start Date
                    </Form.Label>
                    <Col sm="10">
                        <Form.Control type="date" placeholder="Start Date" value={this.state.startDate} onChange={this.onChanageStartDate} noValidate/>
                    </Col>
                </Form.Group>
                <Form.Group as={Row} className="mb-3">
                    <Form.Label column sm="2">
                    End Date
                    </Form.Label>
                    <Col sm="10">
                        <Form.Control type="date" placeholder="EndDate" value={this.state.endDate} onChange={this.onChanageEndDate} noValidate/>
                    </Col>
                </Form.Group>
               
               
    
              <Button type="submit" >Add Booking</Button>
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


export default Booking
