import React,{Component} from 'react'

import {Form, Row, Col, Button, Alert} from 'react-bootstrap';
import {addSupplier} from '../services/supplierService';
import {toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import NavBar from './NavBar';
import banner from '../imgs/banner.png';
import {Container, Image } from 'react-bootstrap';


import Swal from "sweetalert2"; 

toast.configure();

class AddSupplier extends Component{
    state = {
        
        supplier_name: "",
        email: "",
        nic: "",
        phone_number: "",
        gender: "",
        setError:""
      };

   
    onChangeSupplierName = (supplier_name) => {
        this.setState({
            supplier_name: supplier_name.target.value,
        });
      };
      onChangeSupplierEmail = (email) => {
        this.setState({
            email: email.target.value,
        });
      };
      onChangeSupplierNIC = (nic) => {
        this.setState({
            nic: nic.target.value,
        });
      };
      onChangeSupplierPhoneNumber = (phone_number) => {
    
        this.setState({
            phone_number: phone_number.target.value,
        });
      };

      onChangeSupplierGender = (gender) => {
        this.setState({
            gender: gender.target.value,
        });
      };

    validateEmail = (email) => {
        return String(email)
            .toLowerCase()
            .match(
                /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
            );
    }

      onSubmit = async (v) => {


        console.log(this.state.supplier_name)

        if(this.state.supplier_name== ''){
          console.log('here');
  
          Swal.fire({  
            icon: 'error',  
            title: 'Oops...',  
            text: 'Supplier Name is Required !',  
           
          });  
          
        }
   
        else if(this.state.email== '')  {
          console.log('here');
  
          Swal.fire({  
            icon: 'error',  
            title: 'Oops...',  
            text: 'E-mail is Required !',  
           
          });  
          
        }


        else if(this.state.nic == ''){
          console.log('here');
  
          Swal.fire({  
            icon: 'error',  
            title: 'Oops...',  
            text: 'NIC is Required !',  
           
          });  
          
        }

        else if(this.state.phone_number== ''){
          console.log('here');
  
          Swal.fire({  
            icon: 'error',  
            title: 'Oops...',  
            text: 'Phone Number is Required !',  
           
          });  
          
        }

        else if(this.state.gender== ''){
          console.log('here');
  
          Swal.fire({  
            icon: 'error',  
            title: 'Oops...',  
            text: 'Gender is Required !',  
           
          });  
          
        }

        v.preventDefault();


        if(this.state.supplier_name != '' && this.state.email != '' && this.state.nic != ''&& this.state.phone_number != '' && this.state.gender!= ''){

          const supplier = {
          
            gender: this.state.gender,
            nic: this.state.nic,
            phone_number: this.state.phone_number,
            email: this.state.email,
            supplier_name: this.state.supplier_name,
        };

        console.log(supplier)
        try {
          const sup = await addSupplier(supplier);
          console.log(sup.status);
          toast('Driver Added!')
          this.props.history.push("/supplierlist");
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

          
            <h2>Add New Supplier</h2>
            <Form onSubmit={this.onSubmit} noValidate>
             
                <Form.Group as={Row} className="mb-3">
                    <Form.Label column sm="2">
                    Supplier Name
                    </Form.Label>
                    <Col sm="10">

                        <Form.Control type="text" placeholder=" Supplier Name" value={this.state.supplier_name} onChange={this.onChangeSupplierName} noValidate/>

                      
                    </Col>
                </Form.Group>
                <Form.Group as={Row} className="mb-3">
                    <Form.Label column sm="2">
                    E-mail
                    </Form.Label>
                    <Col sm="10">

                        <Form.Control type="text" placeholder="E-mail" value={this.state.email} onChange={this.onChangeSupplierEmail} noValidate/>

                       
                    </Col>
                </Form.Group>
                <Form.Group as={Row} className="mb-3">
                    <Form.Label column sm="2">
                    NIC
                    </Form.Label>
                    <Col sm="10">

                        <Form.Control type="text" placeholder="NIC" value={this.state.nic} onChange={this.onChangeSupplierNIC} noValidate/>

                       
                    </Col>
                </Form.Group>

                <Form.Group as={Row} className="mb-3">
                    <Form.Label column sm="2">
                    Phone Number
                    </Form.Label>
                    <Col sm="10">

                        <Form.Control type="text" placeholder="Phone Number" value={this.state.phone_number} onChange={this.onChangeSupplierPhoneNumber} noValidate/>

                       
                    </Col>
                </Form.Group>
                <Form.Group as={Row} className="mb-3">
                <Form.Label column sm="2">
                    Gender
                    </Form.Label>
                    <Col sm="10">
                    <Form.Label column sm="2">    <input type="radio" value="Male" name="gender" onChange={this.onChanageDriverGender} noValidate/> Male
                    </Form.Label>  <Form.Label column sm="2">  <input type="radio" value="Female" name="gender" onChange={this.onChanageDriverGender} noValidate/> Female
                    </Form.Label>  <Form.Label column sm="2"> <input type="radio" value="Other" name="gender" onChange={this.onChanageDriverGender} noValidate/> Other
                    </Form.Label></Col>
                </Form.Group>
               
    
              <Button type="submit" >Add Supplier</Button>
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


export default AddSupplier
