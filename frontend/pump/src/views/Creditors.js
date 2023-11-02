import React, {useState, useEffect} from 'react';
import Table from 'react-bootstrap/Table';
import axios from 'axios';
import {Link} from 'react-router-dom';

const Creditors = () => {

  const [creditor, setCreditors] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/creditor/get')
    .then((response) => {
      setCreditors(response.data.data);
    })
    .catch((error) => {
      console.error(error);
    })
  }, [])


  return (
    <div className='Container mt-3 p-5'> 
    <h2 className='mt-3'>Creditor Details</h2>
      <Link to='/addCreditor' style={{textDecoration: 'none', color: 'white'}}>

        <button type="button" class="btn btn-primary mt-2"><i class="bi bi-plus-square"></i>Add Creditor</button>

      </Link>
      
    
      <Table striped bordered hover className='mt-3 p-4'>
      <thead>
        <tr>
          <th>id</th>
          <th>Name</th>
          <th>Contact Details</th>
          <th>Total Credit Amount</th>
          <th>Actions</th>
        </tr>
        {
          creditor.map((creditors, index) => {
            return <tr key={index}>
                  <td>{index+1}</td>
                  <td>{creditors.name}</td>
                  <td>{creditors.contact_details}</td>
                  <td>{creditors.totalCreditAmount}</td>
                  <td></td>
                </tr> 
            
          })
        }
      </thead>
      <tbody>
        
      </tbody>
    </Table>
    </div>
  )
}

export default Creditors


 