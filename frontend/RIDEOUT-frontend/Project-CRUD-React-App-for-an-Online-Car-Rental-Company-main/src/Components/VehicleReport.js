import React, { Component } from 'react'
import { Row, Col} from 'react-bootstrap';

import axios from 'axios';
import {toast} from 'react-toastify';
import Swal from "sweetalert2";

import Pdf from "react-to-pdf";
import { getAllVehicles, deleteVehicleByID } from './../services/carService';
import NavBar from './NavBar';
import banner from '../imgs/banner.png';
import {Container, Image } from 'react-bootstrap';


const ref = React.createRef();
class VehicleReport extends Component {
    constructor(props) {
        super(props)
        this.state = {
          vehicle: [],
          searchedText: ""
        }
 
    }
    componentDidMount() {
      this.getAllVehicles();
      
    }

    getAllVehicles = async () => {
        try {
          const vehi = await getAllVehicles();
          console.log(vehi.data);
          this.setState({ vehicle: vehi.data || [] });
        } catch (e) {
          console.log(e);
        }
      };

      deleteVehicle = async (id) => {
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
          if(result.isConfirmed === true){
            try {
              const vehi =  deleteVehicleByID(id);

              this.getAllVehicles();    
              this.setState({
                    vehicle: this.state.vehicle.filter((vehi) => vehi.id !== id),
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

     

    render() {
      
        return (
        

  <div className="App" >
    
      <div class="container">
      <NavBar />
           
      <Container fluid style={{padding:"0"}}>
            <Image src={banner} fluid style={{width:"1320px"}}/>
          </Container>
         
          </div>

            <div>
                 <h2 className="text-center">Vehicle List</h2>
                 
                 <div className = "text-center">
                 
               
                <br></br>
                    <button style={{ marginLeft: "40px" ,width:"200px", }}className="btn btn-primary" onClick={()=> {this.props.history.replace('/create')}}>  Add New Vehicle</button>
                 </div>

                
                 <br></br>
                 <div className = "row"  ref={ref}  >
                        <table className = "table table-striped table-bordered">

                            <thead>
                                <tr>
                                    <th> Model Name</th>
                                    <th> Brand Name</th>
                                    <th> Manufacture Year</th>
                                    <th> Price</th>
                                </tr>
                            </thead>
                            <tbody>
                                
                                {  this.state.vehicle.map(
                                    car =>
                                      
                                        <tr>
                                               
                                             <td> {car.modelName}</td>
                                             <td> {car.brandName}</td>
                                             <td> {car.manufactureYear}</td>
                                             <td> {car.price}</td>   
                                         
                                        </tr>
                                )
                                }
                                  
                            </tbody>
                     
                        </table>
                       
                 </div>                    

            </div>
            
            <Pdf targetRef={ref}  filename="Vehicle.pdf">
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
        
            </div>
       
       
        )
    }
}
export default VehicleReport
