import React, {useState } from 'react';
import axios from 'axios';
import {useNavigate} from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';


const AddCreditors = () => {


  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: '',
    contact_details: '',
    totalCreditAmount: ''
    // Add more fields as needed
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Use the formData to make the API request
    sendRequest(formData);
    navigate('/creditors');

  };

  const sendRequest = (data) => {
    // Use Axios or another library to send the data in the request body
    // Example using Axios:
    axios.post('http://localhost:5000/creditor/add', data)
      .then(response => {
        console.log('Response:', response.data);
      })
      .catch(error => {
        console.error('Error:', error);
      });
  };

  return (
    <div className='container p-3 mt-5'>
      <h3>Add Creditor</h3>
      <br />
      <br />
    <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3" controlId="formBasicName">
            <Form.Label>Creditor Name: </Form.Label>
            <Form.Control type="text" name="name" value={formData.name} onChange={handleChange} placeholder="Enter Employee Name" />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicContact">
            <Form.Label>Contact Details: </Form.Label>
            <Form.Control type="Number" name='contact_details' value={formData.contact_details} onChange={handleChange} placeholder="Enter Employee mobile no." />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicCredit">
            <Form.Label>Initial Credit Amount: </Form.Label>
            <Form.Control type="Number" name='totalCreditAmount' value={formData.totalCreditAmount} onChange={handleChange} placeholder="Enter Initial Credit Amount" />
          </Form.Group>
          
          <Button variant="primary" type="submit">
            Submit
          </Button>
        </Form>
  </div>
  )
}

export default AddCreditors