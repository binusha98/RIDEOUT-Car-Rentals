import {Col, Card, ListGroup, ListGroupItem, Button, Row} from 'react-bootstrap';
import { Link } from 'react-router-dom';
import React, { Component } from "react";
import { getAllVehicles } from "../services/carService";
import {toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import NavBar from './UserNavBar';
import banner from '../imgs/banner.png';
import {Container, Image } from 'react-bootstrap';

toast.configure()

class CarListUser extends Component{

    constructor(props) {
        super(props)

    this.state = { vehicle: [],  searchId:'' };

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

      searchVehicleBrandName(event){
        this.setState({ searchId: event.target.value.substr(0,
            20)});

    }

render() {
  let filterBrandName = this.state.vehicle.filter((
    vehicle)=>{
        return vehicle.brandName.toLowerCase().indexOf(this.state.searchId.toLowerCase())!==-1;
            
    }
);
  
    return (

     <div>
          
      <div class="container">
      <NavBar />   
      <Container fluid style={{padding:"0"}}>
      <Image src={banner} fluid style={{width:"1320px"}}/>
      </Container>

     <br></br>
         
          <div className = "form-group col-md-6 mb-3">
                    <input type="text" class="form-control" style={{marginLeft:0}} placeholder="Enter Brand Name" value={this.state.searchId} onChange={this.searchVehicleBrandName.bind(this)}/>
                </div>
          </div>
     <div class="row">
            {
      filterBrandName.map(
        car=>

        
    
                      <Col lg={3} key={car._id} className="mb-3" >
            <Card className="h-100">
            <Card.Img variant="top" />
           <Card.Img variant="top" src={car.image} /> 
            <Card.Body>
                <Card.Title>{car.modelName} {car.manufactureYear}</Card.Title>
                
            </Card.Body>
            <ListGroup className="list-group-flush">
                <ListGroupItem><span className="fw-bold">Brand Name:</span> {car.brandName}</ListGroupItem>
                <ListGroupItem><span className="fw-bold">Price:</span> {car.price}</ListGroupItem>
                <ListGroupItem>
                    <Row>
                         <Row>
                           <Col> <Button className="w-100" width="50px" as={Link} to={`/booking/add/`}>Book-Now</Button></Col>
                           </Row>
                           <Row><Col></Col></Row>
                   </Row>
                    
                    
                </ListGroupItem>
            </ListGroup>
            </Card>
           
        </Col>
       

       
   
        
         )
     }
     </div>
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

  


  


       
            
    ) ;
}



};

 export default CarListUser;