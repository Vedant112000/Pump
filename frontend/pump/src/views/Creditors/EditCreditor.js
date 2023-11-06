import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useNavigate } from 'react-router-dom';
import {toast} from 'react-toastify';

const EditCreditor = () => {

  const {id} = useParams();
  const nav = useNavigate();

  const [creditor, setCreditor] = useState(
    {
      id: id,
      name: "",
      totalCreditAmount: 0,
    }
  )


  const [formData, setFormData] = useState({
    id: id,
    name: "",
    totalCreditAmount: 0,
    amountReceived: 0,
  }) 

  const [finalData, setFinalData] = useState({
    id: id,
    name: "",
    contact_details: 0,
    totalCreditAmount: 0,

  }) 


  useEffect(() => {
    axios.get(`http://localhost:5000/creditor/get/${id}`)
    .then(response => {
      setCreditor({...creditor, name: response.data.data[0].name, totalCreditAmount: response.data.data[0].totalCreditAmount});
      setFormData({...formData, name: response.data.data[0].name, totalCreditAmount: response.data.data[0].totalCreditAmount});
      setFinalData({...finalData, name:response.data.data[0].name, contact_details: response.data.data[0].contact_details});
    })
    .catch(error => {
      console.error(error);
    })
  },[id])


  //to fill the data into formdata

  const handleChange = (e) => {
    const {name, value} = e.target;

    setFormData({
      ...formData, 
      [name] : value,
    })

  }

  

  const handleSubmit = (e) => {
      e.preventDefault();
      const newTotalCreditAmount = formData.totalCreditAmount - formData.amountReceived;
      console.log(newTotalCreditAmount);
      const updatedFinalData = { ...finalData, totalCreditAmount: newTotalCreditAmount };
      console.log(updatedFinalData);
      sendRequest(updatedFinalData);
      toast.info("Updated Total Credit Amount of "+finalData.name);
      nav("/creditors");
      
  }

  const sendRequest =  (fidata) => {
    if(window.confirm("Are you sure that you received the amount from "+creditor.name)){
       axios.put(`http://localhost:5000/creditor/update/${id}`,fidata)
      .then(response => {
        console.log(response.data);
      })
      .catch(error => {
        console.log(error);
      })
    }else{
      nav("/creditors");
    }
  }

  

  return (
    <div className='container p-3 mt-5'>
      <h3>Enter the Amount Received</h3>
            <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3" controlId="formBasicName">
            <Form.Label>Creditor Name: </Form.Label>
            <Form.Control type="text" name="name" value={formData.name} placeholder="Creditor Name" readOnly/>
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicContact">
            <Form.Label>Contact Details: </Form.Label>
            <Form.Control type="Number" name='totalCreditAmount' value={formData.totalCreditAmount} placeholder="Total Credit Amount"  readOnly/>
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicCredit">
            <Form.Label>Amount Received: </Form.Label>
            <Form.Control type="Number" name='amountReceived' value={formData.amountReceived} onChange={handleChange} placeholder="Enter Amount Received" />
          </Form.Group>
          
          <Button variant="primary" type="submit">
            Submit
          </Button>
        </Form>
  </div>
  )
}

export default EditCreditor