import React from 'react'
import Swal from "sweetalert2";
import {Form, Row, Col, Button, Alert} from 'react-bootstrap';
import  { Component } from "react";
import { getSupplierById,updateSupplier } from "../services/supplierService";
import {toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import NavBar from './NavBar';
import banner from '../imgs/banner.png';
import {Container, Image } from 'react-bootstrap';
toast.configure();


class UpdateSupplier extends Component{

    constructor(props) {
        super(props)

        this.state = {
            supplier_id: this.props.match.params.supplier_id,
            supplier_name: "",
            email: "",
            nic: "",
            phone_number: "",
            gender: ""
        }
       
    }

    componentDidMount() {
        this.getSupplier();
      }

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

 


      getSupplier = async () =>{

        console.log(this.props.match.params.id)

        try{
             getSupplierById(this.props.match.params.id).then((res)=>{
            
                let supplier = res.data.post;
                 this.setState({supplier_id: supplier._id,
                    supplier_name: supplier.supplier_name,
                    email : supplier.email,
                    nic:supplier.nic,
                    phone_number:supplier.phone_number,
                    gender:supplier.gender
                 });
            })
       
  
        }catch(e){
            console.log(e);
        }
   }

   onSubmit = async (v) => {

    console.log(v)
    if(this.state.supplier_name === ''){


      Swal.fire({  
        icon: 'error',  
        title: 'Oops...',  
        text: 'Supplier Name is Required !',  
       
      });  

  
    
    }
    else if(this.state.email === ''){


      Swal.fire({  
        icon: 'error',  
        title: 'Oops...',  
        text: 'E-mail is Required !',  
       
      });  
   
    }
    else if(this.state.nic === ''){
 

      Swal.fire({  
        icon: 'error',  
        title: 'Oops...',  
        text: 'NIC is Required !',  
       
      });  

    }

   
    else if(this.state.phone_number === ''){
   

      Swal.fire({  
        icon: 'error',  
        title: 'Oops...',  
        text: 'Phone No is Required !',  
       
      });  

    }
   
    else if(this.state.gender === ''){
      Swal.fire({  
        icon: 'error',  
        title: 'Oops...',  
        text: 'Gender is Required !',  
       
      });  

    }

      v.preventDefault();

      if(this.state.supplier_name != '' && this.state.email != '' && this.state.nic != ''&& this.state.phone_number != '' && this.state.gender!= ''){

        const supplier = {
        
            email: this.state.email,
            nic: this.state.nic,
            phone_number: this.state.phone_number,
            gender: this.state.gender,
            supplier_name: this.state.supplier_name,
      };

      console.log(supplier)
      try {
        const sup = await updateSupplier(this.state.supplier_id,supplier);
        console.log(sup.status);
        toast('Successfully Updated!')
        this.props.history.push("/supplierlist");
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
            <h2 >Update Supplier</h2>
            
            <Form onSubmit={this.onSubmit} noValidate>
            <br></br>
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
                        <Form.Control type="text" placeholder="Gender" value={this.state.gender} onChange={this.onChangeSupplierGender} noValidate/>
                    </Col>
                </Form.Group>
               
    
              <Button type="submit"  >Update Supplier</Button>
              
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

export default UpdateSupplier
