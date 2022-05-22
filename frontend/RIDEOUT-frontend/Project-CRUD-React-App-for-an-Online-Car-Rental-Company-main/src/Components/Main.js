import React from 'react'

import { Row, Col, Button} from 'react-bootstrap';
import { Link } from 'react-router-dom';


import banner from '../imgs/banner.png';
import {Container, Image } from 'react-bootstrap';

function Main() {
         
    

    return (  
<div class="container">
  
   <Container fluid style={{padding:"0"}}>
         <Image src={banner} fluid style={{width:"1320px"}}/>
       </Container>
       <br></br> <br></br>
       
       <div align="center"><Button style={{ marginLeft: "40px" ,width:"200px"}} className="btn btn-dark" as={Link} to={`/AdminSignIn`}> SignIn as Admin </Button>
       <br></br> <br></br><Button style={{ marginLeft: "40px", width:"200px" }} className="btn btn-dark" as={Link} to={`/SignIn`}> SignIn as User </Button></div>
          
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
<br></br></div> )
}

export default Main
