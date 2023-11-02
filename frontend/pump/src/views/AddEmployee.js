import React, { useState } from 'react'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import axios from 'axios';
import {useNavigate} from 'react-router-dom';

const AddEmployee = () => {


  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: '',
    contact_details: '',
  });

  const handleChange = (e) => {
    const {name, value} = e.target;

    setFormData({
      ...formData,
      [name]: value,
    });
  }

  const handleSubmit = (e) => {
    e.preventDefault();

    sendRequest(formData);
    
    navigate('/employee');
  }
  

  const sendRequest = (data) => {

    if(window.confirm("Are you sure you want to add new employee ?")){
    axios.post('http://localhost:5000/employee/add', data)
    .then(response => {
      console.log('Response:', response.data);
    })
    .catch(error => {
      console.error('Error:', error);
    });
  }else{
    navigate('/employee');
  }
  }


  return (
    <div>

      <div className='container p-3 mt-5'>
          <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Employee Name: </Form.Label>
            <Form.Control type="text" name="name" value={formData.name} onChange={handleChange} placeholder="Enter Employee Name" />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Contact Details</Form.Label>
            <Form.Control type="Number" name='contact_details' value={formData.contact_details} onChange={handleChange} placeholder="Enter Employee mobile no." />
          </Form.Group>
          
          <Button variant="primary" type="submit">
            Submit
          </Button>
        </Form>


      </div>

    </div>
  )
}

export default AddEmployee