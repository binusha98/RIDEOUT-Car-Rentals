import React, { Component } from 'react'
import {Form, Row, Col, Button, Alert, ButtonGroup} from 'react-bootstrap';
import { Link } from 'react-router-dom';
import axios from 'axios';
import {toast} from 'react-toastify';
import Swal from "sweetalert2";
import ReactDOM from "react-dom";
import NavBar from './NavBar';
import banner from '../imgs/banner.png';
import {Container, Image } from 'react-bootstrap';

import Pdf from "react-to-pdf";

import { getAllBookings, deleteBookingByID } from './../services/BookingService';


const ref = React.createRef();
class BookingDetail extends Component {
    constructor(props) {
        super(props)

        this.state = {
          booking: [],
          searchedText: "",
          searchId:''
        }
       
    }
    componentDidMount() {
      this.getAllBookings();
      
    }

    getAllBookings = async () => {
        try {
          const book = await getAllBookings();
          console.log(book.data);
          this.setState({ booking: book.data || [] });
        } catch (e) {
          console.log(e);
        }
      };



      deleteBooking = async (id) => {
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
              const book =  deleteBookingByID(id);
    
      
    
              this.getAllBooking();    
              this.setState({
                    booking: this.state.booking.filter((book) => book.id !== id),
              });
              toast('Successfully Deleted!')
    
            } catch (e) {
              console.log(e);
            }
          }else{
           
            Swal.fire({  
              icon: 'info',  
              title: 'OK..',  
              text: 'Booking details are safe!',  
             
            }); 
          }
        });
      }




      


    //   retrieveDriverDetails() {
    //     axios.get("http://localhost:3000/driver/").then(res => {
    //         if (res.data.success) {
    //             this.setState({
    //               DriverDetails: res.data.existingdriverdetails
    //             });

    //             console.log(this.state.DriverDetails)
    //         }


    //     });
    // }







    //   filterData(driver, searchkey) {

    //     const result = driver.filter((driver) =>
    //     driver.driver_name.includes(getAllDrivers,searchkey)
    //     // driver.driver_name.includes(searchkey) ||
    //     // driver.email.toLowerCase().includes(searchkey) ||
    //     // driver.nic.toLowerCase().includes(searchkey) ||
    //     // driver.phone_number.toLowerCase().includes(searchkey)
    //     )

    //     this.setState({ driver: result })
    // }

    // handleSearchArea = (e) => {
    //     console.log(e.currentTarget.value);
      
    //     const searchkey = e.currentTarget.value;
    //     getAllDrivers = async () => {
    //       try {
    //         const dri = await getAllDrivers();
    //         console.log(dri.data);
    //         this.setState({ driver: dri.data || [] });
    //       } catch (e) {
    //         console.log(e);
    //       }
    //     };
  

    //   //  axios.get("http://localhost:3000/driver/").then(res =>{
    //   //    if(res.data.success){
    //   //      this.filterData(res.data.getAllDrivers,searchkey)
    //   //    }
    //   //  })
    //     };


        // axios.get("http://localhost:3000/driver/").then(res => {
        //     if (res.data.success) {

        //         this.filterData(res.data.existingdriverdetails, searchkey)

        //     }
        // });

    





      // deleteDriver = async (id) => {
      //   try {
      //     const dri = await deleteDriverByID(id);
    
      //     console.log(dri.data);

      //     this.getAllDrivers();    
      //     this.setState({
      //       driver: this.state.driver.filter((dri) => dri.id !== id),
      //     });
      //     toast('Deleted!')
      //   } catch (e) {
      //     console.log(e);
      //   }
      // };
      searchBooking(event){
        this.setState({ searchId: event.target.value.substr(0,
            20)});
  
    }

    render() {
      let filterBooking = this.state.booking.filter((
        booking)=>{
            return booking.username.toLowerCase().indexOf(this.state.searchId.toLowerCase())!==-1;
                
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


            <div>
                 <h2 className="text-center">Booking List</h2>
                 
                 <div className = "row">
                 <div className = "text-center">
               
                <br></br>
                    <button className="btn btn-primary" style={{ marginLeft: "40px" ,width:"200px", }} onClick={()=> {this.props.history.replace('/booking/add')}}>  Add New Booking</button>
                 </div></div>
                 <br></br>
                 <div className = "form-group col-md-4">
                    <input type="text" class="form-control" style={{marginLeft:0}} placeholder="Enter Booking Name" value={this.state.searchId} onChange={this.searchBooking.bind(this)}/>
                </div>

                 {/* <div className="col-lg-3 mt-2 mb-2">
                            <input
                                className="form-control"
                                type="search"
                                placeholder="search"
                                name="searchQuery"
                                aria-label="Search"
                                onChange={this.handleSearchArea}>

                            </input>
                        </div> */}



                 <br></br>
                 <div className = "row"  ref={ref}  >
                        <table className = "table table-striped table-bordered">

                            <thead>
                                <tr>
                                   
                                    <th> User Name</th>
                                    <th> Vehicle No</th>
                                    <th> Start Date</th>
                                    <th> End Date</th>
                                    
                                    <th> Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                
                                { 
                                filterBooking.map(
                                  booking=> 
                                //this.state.booking.map(
                                   // booking =>
                                      
                                        <tr>
                                               
                                             <td> {booking.username}</td>
                                             <td> {booking.vehicleNo}</td>
                                             <td> {booking.startDate}</td>
                                             <td> {booking.endDate}</td>
                                          
                                          <td>
                                                 <Button as={Link} to={`/updateBooking/${booking._id}`} style={{marginLeft: "10px"}}  className="btn btn-info">Update </Button>
                                                 <button style={{marginLeft: "10px"}} onClick={ () => this.deleteBooking(booking._id)} className="btn btn-danger">Delete </button>
                                                 {/* <button style={{marginLeft: "10px"}} onClick={ () => this.viewDriver(driver.driver_id)} className="btn btn-info">View </button>
                                              */}
                                             </td>
                          
                                        </tr>
                                )
                                }
                                  
                            </tbody>
                     
                        </table>
                       
                 </div>     
                
                              

            </div>


            <Pdf targetRef={ref}  filename="BookingReport.pdf">
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

export default BookingDetail
