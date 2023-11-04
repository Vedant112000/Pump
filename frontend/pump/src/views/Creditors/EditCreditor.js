import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

const EditCreditor = () => {

  const {id} = useParams();

  const [creditor, setCreditor] = useState(
    {
      id: id,
      name: "",
      totalCreditAmount: 0,
    }
  )

  useEffect(() => {
    axios.get(`http://localhost:5000/creditor/get/${id}`)
    .then(response => {
      setCreditor({...creditor, name: response.data.data[0].name, totalCreditAmount: response.data.data[0].totalCreditAmount});
    })
    .catch(error => {
      console.error(error);
    })
  },[])

  return (
    <div className='container p-3 mt-5'>
      <h3>Enter the Amount Received</h3>
            <Form>
          <Form.Group className="mb-3" controlId="formBasicName">
            <Form.Label>Creditor Name: </Form.Label>
            <Form.Control type="text" name="name" value={creditor.name} placeholder="Creditor Name" readOnly/>
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicContact">
            <Form.Label>Contact Details: </Form.Label>
            <Form.Control type="Number" name='contact_details' value={creditor.totalCreditAmount} placeholder="Total Credit Amount"  readOnly/>
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicCredit">
            <Form.Label>Initial Credit Amount: </Form.Label>
            <Form.Control type="Number" name='totalCreditAmount' value=""  placeholder="Enter Initial Credit Amount" />
          </Form.Group>
          
          <Button variant="primary" type="submit">
            Submit
          </Button>
        </Form>
  </div>
  )
}

export default EditCreditor