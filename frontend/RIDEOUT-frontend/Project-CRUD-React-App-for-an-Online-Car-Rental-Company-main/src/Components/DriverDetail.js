import React, { Component } from 'react'
import { Row, Col, Button} from 'react-bootstrap';
import { Link } from 'react-router-dom';
import axios from 'axios';
import {toast} from 'react-toastify';
import Swal from "sweetalert2";


import Pdf from "react-to-pdf";
import NavBar from './NavBar';
import banner from '../imgs/banner.png';
import {Container, Image } from 'react-bootstrap';

import { getAllDrivers, deleteDriverByID } from './../services/DriverService';


const ref = React.createRef();
class DriverDetail extends Component {
    constructor(props) {
        super(props)

        this.state = {
          driver: [],
          searchedText: "",
          searchId:''
        }
       
    }
    componentDidMount() {
      this.getAllDrivers();
      
    }

    getAllDrivers = async () => {
        try {
          const dri = await getAllDrivers();
          console.log(dri.data);
          this.setState({ driver: dri.data || [] });
        } catch (e) {
          console.log(e);
        }
      };



      deleteDriver = async (id) => {
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
              const dri =  deleteDriverByID(id);
    
      
    
              this.getAllDrivers();    
              this.setState({
                    driver: this.state.driver.filter((dri) => dri.id !== id),
              });
              toast('Successfully Deleted!')
    
            } catch (e) {
              console.log(e);
            }
          }else{
           
            Swal.fire({  
              icon: 'info',  
              title: 'OK..',  
              text: 'Driver details are safe!',  
             
            }); 
          }
        });
      }







      filterData(driver, searchkey) {

        const result = driver.filter((driver) =>

        driver.driver_name.includes(searchkey) ||
        driver.email.toLowerCase().includes(searchkey) ||
        driver.nic.toLowerCase().includes(searchkey) ||
        driver.phone_number.toLowerCase().includes(searchkey)
        )

        this.setState({ driver: result })
    }

    handleSearchArea = (e) => {

        const searchkey = e.currentTarget.value;

        axios.get("http://localhost:3000/driver/").then(res => {
            if (res.data.success) {

                this.filterData(res.data.getAllDrivers, searchkey)

            }
        });

    }


    searchDriverName(event){
      this.setState({ searchId: event.target.value.substr(0,
          20)});

  }


  

    render() {
      let filterDriverName = this.state.driver.filter((
        driver)=>{
            return driver.driver_name.toLowerCase().indexOf(this.state.searchId.toLowerCase())!==-1;
                
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
                 <h2 className="text-center">Driver List</h2>
                 
                 <div className = "row">
                 <div className = "text-center">
               
                <br></br>
                    <button className="btn btn-primary" style={{ marginLeft: "40px" ,width:"200px", }} onClick={()=> {this.props.history.replace('/driver/add')}}>  Add New Driver</button>
                 </div></div>
                 <br></br>
                 <div className = "form-group col-md-4">
                    <input type="text" class="form-control" style={{marginLeft:0}} placeholder="Enter Driver Name" value={this.state.searchId} onChange={this.searchDriverName.bind(this)}/>
                </div>
                <br></br>
             


                 <br></br>
                 <div className = "row"  ref={ref}  >
                        <table className = "table table-striped table-bordered">

                            <thead>
                                <tr>
                                   
                                    <th> Driver Name</th>
                                    <th> E-mail</th>
                                    <th> NIC</th>
                                    <th> Mobile</th>
                                    <th> Gender</th>
                                    <th> Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                
                                {
                                  filterDriverName.map(
                                    driver=>
                               
                                        <tr>
                                               
                                             <td> {driver.driver_name}</td>
                                             <td> {driver.email}</td>
                                             <td> {driver.nic}</td>
                                             <td> {driver.phone_number}</td>
                                             <td> {driver.gender}</td>
                                          <td>
                                                 <Button as={Link} to={`/updateDriver/${driver._id}`} style={{marginLeft: "10px"}}  className="btn btn-info">Update </Button>
                                                 <button style={{marginLeft: "10px"}} onClick={ () => this.deleteDriver(driver._id)} className="btn btn-danger">Delete </button>
                                               
                                             </td>
                          
                                        </tr>
                                )
                                }
                                  
                            </tbody>
                     
                        </table>
                       
                 </div>     
                
                              

            </div>


            <Pdf targetRef={ref}  filename="DriverReport.pdf">
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

export default DriverDetail
