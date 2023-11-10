import React, {useState, useEffect} from 'react';
import axios from 'axios';
import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { Link } from 'react-router-dom';
import { FaBookOpen } from "@react-icons/all-files/fa/FaBookOpen";

const Dashboard = () => {

  const [creditors, setCreditors] = useState([]);
  const [count, setCount] = useState([]);
  const [creditAmount, setCreditAmount] = useState([]);
  const [employee, setEmployee] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/creditor/get')
    .then((response) => {
      setCreditors(response.data.data);
      setCount(response.data.count);
      
    })
    .catch((error) => {
      console.error(error);
    })
  }, [])

  //employee fetch data

   useEffect(() => {
    axios.get('http://localhost:5000/employee/get')
    .then((response) => {
      setEmployee(response.data);
    })
    .catch((error) => {
      console.error(error);
    })
   }, [])


   const[trans, setTrans] = useState({
    MpdNo: 0,
    EmployeeName: "",
    collections: 0,
    date: 0,
   });

   useEffect(() => {
    axios.get('http://localhost:5000/collections/getCollection')
    .then(response => {
      setTrans({...trans, MpdNo: response.data.Data[0].MpdNo, EmployeeName: response.data.Data[0].EmployeeName, collections: response.data.Data[0].Collections, date: response.data.Data[0].dateTime});
      console.log(response.data.Data[0].MpdNo);
    })
    .catch(error => {
      console.error(error);
    })
   },[])

  //calculate the total creditors amount

  useEffect(() => {
    
    const sum = creditors.reduce((total, item) => total + item.totalCreditAmount, 0);
    setCreditAmount(sum);
  }, [creditors])


  return (
    <>
    <div>
      <h2 style={{textAlign: 'center', margin: 10}}>Dashboard</h2>

  {/* The Below code displays the metrics on dashboard
   */}
            <div style={{marginTop: 18}}>
            <Container fluid>
              <Row style={{marginTop: 10}}>
                <Col style={{marginTop: 6, marginRight: 10}} xs={13} lg={3} ><Card border="primary" >
                <Card.Header>Total Creditors (Current)</Card.Header>
                <Card.Body>
                  <Card.Title>{count}</Card.Title>
                  <Card.Text>
                    Total Active Creditors
                  </Card.Text>
                </Card.Body>
              </Card></Col>

              
              <Col style={{marginTop: 6, marginRight: 10}} xs={13} lg={3}>
              <Card border="danger">
                <Card.Header>Total Employees</Card.Header>
                <Card.Body>
                <Card.Title>{employee.count}</Card.Title>
                <Card.Text>
                  Total Active Employees.
                </Card.Text>
                </Card.Body>
              </Card>
              </Col>
              
                      <Col style={{marginTop: 6, marginRight: 10}} xs={13} lg={3} ><Card border="primary" >
                          <Card.Header>Total Credit Amount</Card.Header>
                          <Card.Body>
                              <Card.Title>₹ {creditAmount}</Card.Title>
                            <Card.Text>
                              Total Amount to be received from creditors.
                            </Card.Text>
                          </Card.Body>
                        </Card>
                      </Col>
                      
                          <Link to={'/transactionReport'}>
                          <button type="button" class="btn btn-primary mt-2"><FaBookOpen style={{marginRight: 5, padding: 2}} />Generate Report</button>

                          </Link>
                      
              </Row>
              <Row style={{marginTop: 10}}>
              <Col style={{marginTop: 6, marginRight: 10}} xs={13} lg={3} ><Card border="primary" >
                          <Card.Header>Last Transaction Slip</Card.Header>
                          <Card.Body>
                              <Card.Title>MpdNo: {trans.MpdNo}</Card.Title>
                              <Card.Title>Employee Name: {trans.EmployeeName}</Card.Title>
                              <Card.Title>Collections: ₹ {trans.collections}</Card.Title>
                            <Card.Text>
                              Date & Time: {trans.date}
                            </Card.Text>
                          </Card.Body>
                        </Card>
                      </Col>
              </Row>
            </Container>
            </div>

    </div>
    </>
  )
}

export default Dashboard  