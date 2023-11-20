import React from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { Link } from 'react-router-dom';
import { useAuth0 } from "@auth0/auth0-react";


const AppBar = () => {

  const { loginWithRedirect, logout, isAuthenticated } = useAuth0();

  return (
    <div>
      <Navbar bg="primary" data-bs-theme="dark" >
        <Container fluid="xl">
          <Row>
          <Col xs={1} sm lg xxl>
            <Link to='/'>
              <Navbar.Brand style={{marginTop: 18,}}>Sainam Petroleum Services</Navbar.Brand>
              </Link>
          </Col>
          <Col sm={1} md lg xl xxl>
              <Nav className="me-auto" style={{marginTop: 18, margin: 5}}>
                <Link style={{color: "white", textDecoration: "none", margin: 8}} to={'/Dashboard'}>Dashboard</Link>
                <Link style={{color: "white", textDecoration: "none", margin: 8}} to={'/employee'}>Employee</Link>
                <Link style={{color: "white", textDecoration: "none", margin: 8}} to={'/creditors'}>Creditors</Link>
                <Link style={{color: "white", textDecoration: "none", margin: 8, fontSize: 12}} to={'/paySlip'}>Generate Sales Slip</Link>
                
                {
                    isAuthenticated ? <li>
                    <button type="button" class="btn btn-danger mt-2" onClick={() => logout({ logoutParams: { returnTo: window.location.origin } })}>
                      Log Out
                    </button>
                    </li> 
                    :
                    <li>
                      <button type="button" class="btn btn-warning mt-2" onClick={() => loginWithRedirect()}>Log In</button>
                    </li>
                }

                
                
              </Nav>
          </Col>
          </Row>
        </Container>
      </Navbar>
    </div>
  )
}

export default AppBar