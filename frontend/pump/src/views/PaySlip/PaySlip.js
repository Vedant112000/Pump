import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

const PaySlip = () => {


  //Renders all the components at the time of mount
  useEffect(() => {
    fetchEmployee();
    fetchCreditor();
    fetchClosing();
    fetchFuelPrices();
    fetchShift();
  }, [])

  //To Fetch All employees data for payslip creation
  const [employee, setEmployee] = useState([]);
  const fetchEmployee = () => {
    axios.get('http://localhost:5000/employee/get')
    .then(response => {
      setEmployee(response.data.data);
    })
    .catch(error => {
      console.error(error);
    })
  }

  //To Fetch All creditors data
    const[creditors, setCreditors] = useState([]);
    const fetchCreditor = () => {
      axios.get('http://localhost:5000/creditor/get')
      .then(response => {
        setCreditors(response.data.data);
      })
      .catch(error => {
        console.error(error);
      })
    }


    //To Fetch all the individual closing of mpd
      const[closing, setClosing] = useState([]);
      const fetchClosing = () => {
        axios.get('http://localhost:5000/closing/get')
        .then(response => {
          setClosing(response.data.data);
        })
        .catch(error => {
          console.error(error);
        })
      }

      //To Fetch the fuel prices

      const [fuelPrices, setFuelPrices] = useState([]);
      
      const fetchFuelPrices= () => {
        axios.get('http://localhost:5000/fuel/get')
        .then(response => {
          setFuelPrices(response.data.data);
        })
        .catch(error => {
          console.error(error);
        })
      }

      //to fetch the shift of employees so that we can evaluate if it is pay slip of day or night
      const [shift, setShift] = useState([]);
      const fetchShift = () => {
        axios.get('http://localhost:5000/shifts/get')
        .then(response => {
          setShift(response.data.data);
        })
        .catch(error => {
          console.error(error);
        })

      }

  return (
    <div>

        <Form>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Email address</Form.Label>
                <Form.Control type="email" placeholder="Enter email" />
                <Form.Text className="text-muted">
                  We'll never share your email with anyone else.
                </Form.Text>
              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" placeholder="Password" />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formBasicCheckbox">
                <Form.Check type="checkbox" label="Check me out" />
              </Form.Group>
              <Button variant="primary" type="submit">
                Submit
              </Button>
        </Form>

    </div>
  )
}

export default PaySlip