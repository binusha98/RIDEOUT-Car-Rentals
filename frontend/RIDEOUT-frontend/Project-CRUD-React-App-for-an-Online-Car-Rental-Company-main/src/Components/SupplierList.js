import React, { Component } from 'react'
import { Row, Col, Button} from 'react-bootstrap';
import { Link } from 'react-router-dom';

import NavBar from './NavBar';
import banner from '../imgs/banner.png';
import {Container, Image } from 'react-bootstrap';



import Pdf from "react-to-pdf";
import {toast} from 'react-toastify';

import { getAllSuppliers, deleteSupplierByID } from './../services/supplierService';


const ref = React.createRef();
class SupplierList extends Component {
    constructor(props) {
        super(props)

        this.state = {
          supplier: [],
          searchId:''
        }
       
    }
    componentDidMount() {
      this.getAllSuppliers();
    }

    getAllSuppliers = async () => {
        try {
          const sup = await getAllSuppliers();
          console.log(sup.data);
          this.setState({ supplier: sup.data || [] });
        } catch (e) {
          console.log(e);
        }
      };

      deleteSupplier = async (id) => {
        try {
          const sup = await deleteSupplierByID(id);
    
          console.log(sup.data);

          this.getAllSuppliers();    
          this.setState({
            supplier: this.state.supplier.filter((sup) => sup.id !== id),
          });
          toast('Deleted!')
        } catch (e) {
          console.log(e);
        }
      };

      searchSupplierName(event){
        this.setState({ searchId: event.target.value.substr(0,
            20)});

    }

 

    render() {
      let filterSupplierName = this.state.supplier.filter((
        supplier)=>{
            return supplier.supplier_name.toLowerCase().indexOf(this.state.searchId.toLowerCase())!==-1;
                
        }
    );
        
        return (
          
            <div>
      <div class="container">
      <NavBar />
           
      <Container fluid style={{padding:"0"}}>
            <Image src={banner} fluid style={{width:"1320px"}}/>
          </Container>
         
          </div>
<br></br>
                 <h2 className="text-center">Supplier List</h2>
                 <div className = "row">
                 <div className = "text-center">
                    <button className="btn btn-primary"  style={{ marginLeft: "40px" ,width:"200px", }}  onClick={()=> {this.props.history.replace('/supplier/add')}}>  Add Supplier</button>
                 </div></div>
                 <br></br>

                 <div className = "form-group col-md-4">
                    <input type="text" class="form-control" style={{marginLeft:0}} placeholder="Enter Supplier Name" value={this.state.searchId} onChange={this.searchSupplierName.bind(this)}/>
                </div>
                <br></br>
                <div className = "row"  ref={ref}  >
                        <table className = "table table-striped table-bordered">

                            <thead>
                                <tr>
                                   
                                    <th> Supplier Name</th>
                                    <th> E-mail</th>
                                    <th> NIC</th>
                                    <th> Mobile</th>
                                    <th> Gender</th>
                                    <th> Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                
                                {  
                                filterSupplierName.map(
                                  supplier=>
                               
                                      
                                        <tr>
                                               
                                             <td> {supplier.supplier_name}</td>
                                             <td> {supplier.email}</td>
                                             <td> {supplier.nic}</td>
                                             <td> {supplier.phone_number}</td>
                                             <td> {supplier.gender}</td>

                                             <td>
                                                 <Button as={Link} to={`/updateSupplier/${supplier._id}`} style={{marginLeft: "10px"}}  className="btn btn-info">Update </Button>
                                                 <button style={{marginLeft: "10px"}} onClick={ () => this.deleteSupplier(supplier._id)} className="btn btn-danger">Delete </button>
                                                 
                                             </td>
                                        </tr>
                                )
                                }
                            </tbody>
                          
                        </table>

                 </div>
   
                 <Pdf targetRef={ref}  filename="SupplierReport.pdf">
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

export default SupplierList
