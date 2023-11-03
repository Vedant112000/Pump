import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

const EditCreditor = () => {
  const [creditors, setCreditors] = useState([]);
  const [creditor, setCreditor] = useState(''); // Change to a string
  const [totalCreditAmount, setTotalCreditAmount] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);


  

  const fetchData = () => {
    axios
      .get('http://localhost:5000/creditor/get')
      .then((response) => {
        setCreditors(response.data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const selectedCreditor = (e) => {
    const { value } = e.target;
    setCreditor(value); // Update the selected creditor
    getCreditor(value); // Fetch the credit amount
  };

  const handleChangeAmount = (e) => {
    // Handle received amount as needed
  };

  useEffect(() => {
    getCreditor(creditor);
  },[creditor])

  const getCreditor = (creditorID) => {
    axios.get(`http://localhost:5000/creditor/get/${creditorID}`)
      .then((response) => {
        setTotalCreditAmount(response.data.data);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  console.log(creditors);
  console.log(creditor);
  console.log(totalCreditAmount);

  return (
    <div className='container p-3 mt-5'>
      <h3>Change the Amount Received</h3>
      <Form>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Creditor Name:</Form.Label>
          <Form.Select aria-label="Default select example" value={creditor} onChange={selectedCreditor}>
            <option value="">Select a Creditor</option>
            {creditors.map((creditor) => (
              <option key={creditor.CreditorID} value={creditor.CreditorID}>
                {creditor.name}
              </option>
            ))}
          </Form.Select>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicCurrentAmount">
          <Form.Label>Current Credit Amount</Form.Label>
          <Form.Control type="Number" value={totalCreditAmount.totalCreditAmount} readOnly />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicCreditAmount">
          <Form.Label>Received Credit Amount</Form.Label>
          <Form.Control type="Number" value="" onChange={handleChangeAmount} />
        </Form.Group>

        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </div>
  );
};

export default EditCreditor
