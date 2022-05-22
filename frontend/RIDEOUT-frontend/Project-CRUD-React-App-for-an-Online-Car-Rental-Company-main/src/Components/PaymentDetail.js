import React, { Component } from 'react'
import { Row, Col, Button} from 'react-bootstrap';
import { Link } from 'react-router-dom';
import axios from 'axios';
import {toast} from 'react-toastify';
import Swal from "sweetalert2";

import NavBar from './NavBar';
import banner from '../imgs/banner.png';
import {Container, Image } from 'react-bootstrap';

import Pdf from "react-to-pdf";

import { getAllPayments, deletePaymentByID } from './../services/PaymentService';


const ref = React.createRef();
class PaymentDetail extends Component {
    constructor(props) {
        super(props)

        this.state = {
          payment: [],
          searchedText: "",
          searchId:''
        }
       
    }
    componentDidMount() {
      this.getAllPayments();
      
    }

    getAllPayments = async () => {
        try {
          const pay = await getAllPayments();
          console.log(pay.data);
          this.setState({ payment: pay.data || [] });
        } catch (e) {
          console.log(e);
        }
      };



      deletePayment = async (id) => {
        Swal.fire(
          {  
          title: 'Are you sure?',  
          text: 'User will have Admin Privileges',  
          icon: 'warning',  
          showCancelButton: true,  
          confirmButtonColor: '#3085d6',  
          cancelButtonColor: '#d33',  
          confirmButtonText: 'Yes!'  
        }).then((result)=>{
          console.log(result)
          if(result.isConfirmed == true){
            try {
              const pay =  deletePaymentByID(id);
    
      
    
              this.getAllPayments();    
              this.setState({
                    payment: this.state.payment.filter((pay) => pay.id !== id),
              });
              toast('Successfully Deleted!')
    
            } catch (e) {
              console.log(e);
            }
          }else{
           
            Swal.fire({  
              icon: 'info',  
              title: 'OK..',  
              text: 'Payment details are safe!',  
             
            }); 
          }
        });
      }







      filterData(payment, searchkey) {

        const result = payment.filter((payment) =>

        payment.userName.includes(searchkey) ||
        payment.vehicleNo.toLowerCase().includes(searchkey) ||
        payment.paidDate.toLowerCase().includes(searchkey) ||
        payment.total.toLowerCase().includes(searchkey)
        )

        this.setState({ payment: result })
    }

    handleSearchArea = (e) => {

        const searchkey = e.currentTarget.value;

        axios.get("http://localhost:3000/payment/").then(res => {
            if (res.data.success) {

                this.filterData(res.data.getAllPayments, searchkey)

            }
        });

    }


    searchUserName(event){
      this.setState({ searchId: event.target.value.substr(0,
          20)});

  }


    render() {
      let filterUserName = this.state.payment.filter((
        payment)=>{
            return payment.userName.toLowerCase().indexOf(this.state.searchId.toLowerCase())!==-1;
                
        }
    );
   
        return (

  <div className="App">
    <div class="container">
      <NavBar />
           
      <Container fluid style={{padding:"0"}}>
            <Image src={banner} fluid style={{width:"1320px"}}/>
          </Container>
         
          </div>

    
<br></br>

            <div>
                 <h2 className="text-center">Payment List</h2>
                 
                 <div className = "row">
                 <div className = "text-center">
               
                <br></br>
                    <button className="btn btn-primary" style={{ marginLeft: "40px" ,width:"200px", }} onClick={()=> {this.props.history.replace('/payment/add')}}>  Add New Payment</button>
                 </div></div>
                 <br></br>
                 <div className = "form-group col-md-4">
                    <input type="text" class="form-control" style={{marginLeft:0}} placeholder="Enter Payment" value={this.state.searchId} onChange={this.searchUserName.bind(this)}/>
                </div>
                <br></br>
             



                 <br></br>
                 <div className = "row"  ref={ref}  >
                        <table className = "table table-striped table-bordered">

                            <thead>
                                <tr>
                                   
                                    <th> User Name</th>
                                    <th> Vehicle No</th>
                                    <th> Paid Date</th>
                                    <th> Total</th>
                                 
                                    <th> Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                
                                {
                                  filterUserName.map(
                                    payment=>
                              
                                      
                                        <tr>
                                               
                                             <td> {payment.userName}</td>
                                             <td> {payment.vehicleNo}</td>
                                             <td> {payment.paidDate}</td>
                                             <td> {payment.total}</td>
                                          
                                          <td>
                                                 <Button as={Link} to={`/updatePayment/${payment._id}`} style={{marginLeft: "10px"}}  className="btn btn-info">Update </Button>
                                                 <button style={{marginLeft: "10px"}} onClick={ () => this.deletePayment(payment._id)} className="btn btn-danger">Delete </button>
                                               
                                             </td>
                          
                                        </tr>
                                )
                                }
                                  
                            </tbody>
                     
                        </table>
                       
                 </div>     
                
                              

            </div>


            <Pdf targetRef={ref}  filename="PaymentReport.pdf">
                    {({ toPdf }) => <button className="btn btn-success" onClick={toPdf}>Capture report as PDF</button>}
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

            </div>



        )
    }
}

export default PaymentDetail
