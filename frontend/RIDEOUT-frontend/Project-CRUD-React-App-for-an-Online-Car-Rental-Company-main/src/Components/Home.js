import React,{useContext} from 'react'
import { MainContext } from '../Contexts/MainContext'
import CarList from './CarList';
import { Link } from 'react-router-dom';
import Pdf from "react-to-pdf";
import NavBar from './NavBar';
import banner from '../imgs/banner.png';
import {Container, Image, Row, Col, Button } from 'react-bootstrap';

const ref = React.createRef();
function Home() {
    const {cars, setCars}=useContext(MainContext);

    const handleDelete =(id)=>{
        const newCar=cars.filter((car)=>(car.id !== id));
        setCars(newCar);        
    }

    return (
        <Row> <div class="container">
        <NavBar />
             
        <Container fluid style={{padding:"0"}}>
              <Image src={banner} fluid style={{width:"1320px"}}/>
            </Container>
           
            </div>
            <br></br>
            <CarList cars={cars} handleDelete={handleDelete}/>
               
            <br></br>
            <br></br>
         <div>  <Button  className="btn btn-dark" as={Link} to={`/generateVehicleReport`}> Generate Report </Button>
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
        </Row>
    )
}

export default Home
