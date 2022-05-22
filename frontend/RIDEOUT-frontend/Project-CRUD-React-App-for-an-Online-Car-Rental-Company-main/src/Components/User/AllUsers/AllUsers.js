import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import {
    Button,
    Card,
    Col,
    Spinner,
} from "react-bootstrap";
import { getAllUserAccountsService } from '../../../services/UserServices';
import ReactToPrint from 'react-to-print';
import banner from '../../../imgs/banner.png';
import {Container, Image } from 'react-bootstrap';
import { Row, Alert} from 'react-bootstrap';

class AllUsers extends Component {
    constructor(props) {
        super(props);
        this.state = {
            allUsers: [],
            filteredUsers: [],
            searchTag: "",
            loading: true,
        };
    }

    componentDidMount() {
        getAllUserAccountsService().then(res => {
            if (res.status) {
                this.setState({
                    allUsers: res.users,
                    filteredUsers: res.users,
                    loading: false
                });
            } else {
                this.setState({
                    loading: false
                });
            }
        })
    }

    search = (e) => {
        e.preventDefault();
        let searchTag = e.target.value;
        let filteredUsers = [];

        this.state.allUsers.forEach(user => {
            if (user.name.toLowerCase().includes(searchTag.toLowerCase())) {
                filteredUsers.push(user);
            } else if (user.email.toLowerCase().includes(searchTag.toLowerCase())) {
                filteredUsers.push(user);
            } else if (user.mobile.toLowerCase().includes(searchTag.toLowerCase())) {
                filteredUsers.push(user);
            } else if (user.gender.toLowerCase().includes(searchTag.toLowerCase())) {
                filteredUsers.push(user);
            } else if (user.nic.toLowerCase().includes(searchTag.toLowerCase())) {
                filteredUsers.push(user);
            }
        })

        this.setState({
            searchTag,
            filteredUsers
        });
    }


    render() {
        return (
            <React.Fragment>

    <div class="container">
    
           
    <Container fluid style={{padding:"0"}}>
          <Image src={banner} fluid style={{width:"1320px"}}/>
        </Container>
       
        </div>
                <Card>
                    <Card.Body>
                        {
                            this.state.loading
                                ? <Col className="text-center">
                                    <Spinner animation="border" variant="primary" />
                                    <Card.Text className="text-primary">Please Wait...</Card.Text>
                                </Col>
                                : <React.Fragment>
                                    <div className="form-inline d-flex w-25 mb-3">
                                        <input className="form-control mr-sm-2" value={this.state.searchTag} onChange={(e) => this.search(e)} type="search" placeholder="Search" aria-label="Search" />
                                        <button className="btn btn-outline-primary my-2 my-sm-0" type="submit">Search</button>
                                    </div>
                                    <div ref={el => (this.componentRef = el)}>
                                        <Card.Title className="text-center fs-2">All Users</Card.Title>
                                        <table className="table">
                                            <thead className="thead-dark">
                                                <tr>
                                                    <th scope="col">User Name</th>
                                                    <th scope="col">Email</th>
                                                    <th scope="col">Mobile</th>
                                                    <th scope="col">NIC</th>
                                                    <th scope="col">Gender</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {
                                                    this.state.filteredUsers.map(user => {
                                                        return <tr key={user._id}>
                                                            <td>{user.name}</td>
                                                            <td>{user.email}</td>
                                                            <td>{user.mobile}</td>
                                                            <td>{user.nic}</td>
                                                            <td>{user.gender}</td>
                                                        </tr>
                                                    })
                                                }
                                            </tbody>
                                        </table>
                                    </div>
                                    <Col className="text-center">
                                        <ReactToPrint
                                            documentTitle={"All Users"}
                                            trigger={() => {
                                                return <Button variant="outline-primary" className="me-1" disabled={this.state.loading}>Generate Report</Button>
                                            }}
                                            content={() => this.componentRef}
                                        />
                                    </Col>
                                </React.Fragment>
                        }
                    </Card.Body>
                </Card>
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
            </React.Fragment>
        );
    }
}

export default withRouter(AllUsers);