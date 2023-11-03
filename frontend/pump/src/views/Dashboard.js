import React, {useState, useEffect} from 'react';
import axios from 'axios';
import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

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

  //calculate the total creditors amount

  useEffect(() => {
    
    const sum = creditors.reduce((total, item) => total + item.totalCreditAmount, 0);
    setCreditAmount(sum);
  }, [creditors])


  return (
    <>
    <div>


        {/* <Container fluid="md" style={{marginTop:18}}>
          <Card>
            <h3 style={{marginTop: 13}}>Dashboard</h3>
              <Card.Header></Card.Header>
              <Card.Body>
                <Card.Title>Total Credits Outstanding</Card.Title>
                <Card.Text>
                  total credit will be presented here!
                </Card.Text>
                <Link to={'/creditors'}>Creditor Details</Link>
              </Card.Body>
          </Card>
        </Container> */}

  {/* The Below code displays the metrics on dashboard
   */}
            <div style={{marginTop: 18}}>
            <Container fluid>
              <Row>
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
              </Row>
            </Container>
            </div>

    </div>
    </>
  )
}

export default Dashboard  