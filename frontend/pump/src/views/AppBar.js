import React from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { Link } from 'react-router-dom';

const AppBar = () => {
  return (
    <div>
      <Navbar bg="primary" data-bs-theme="dark" >
        <Container fluid="xl">
          <Row>
          <Col xs={1} sm lg xxl>
              <Navbar.Brand href="#home" style={{marginTop: 18,}}>Sainam Petroleum Services</Navbar.Brand>
          </Col>
          <Col sm={1} md lg xl xxl>
              <Nav className="me-auto" style={{marginTop: 18, margin: 5}}>
                <Link style={{color: "white", textDecoration: "none", margin: 8}} to={'/'}>Dashboard</Link>
                <Link style={{color: "white", textDecoration: "none", margin: 8}} to={'/employee'}>Employee</Link>
                <Link style={{color: "white", textDecoration: "none", margin: 8}} to={'/creditors'}>Creditors</Link>
                <Link style={{color: "white", textDecoration: "none", margin: 8, fontSize: 12
              
              }} to={'/users'}>Generate Sales Slip</Link>
              </Nav>
          </Col>
          </Row>
        </Container>
      </Navbar>
    </div>
  )
}

export default AppBar