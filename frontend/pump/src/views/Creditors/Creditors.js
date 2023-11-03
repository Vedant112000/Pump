import React, {useState, useEffect} from 'react';
import Table from 'react-bootstrap/Table';
import axios from 'axios';
import {Link} from 'react-router-dom';
import Button from 'react-bootstrap/Button';

const Creditors = () => {

  const [creditor, setCreditors] = useState([]);

  useEffect(() => {
    fetchData();
  }, [])

  const fetchData = () => {
    axios.get('http://localhost:5000/creditor/get')
    .then((response) => {
      setCreditors(response.data.data);
    })
    .catch((error) => {
      console.error(error);
    })
  }


  const deleteCreditors = (id) => {
    if(window.confirm('Are you sure you want to delete this Creditor?')){
      axios.delete(`http://localhost:5000/creditor/delete/${id}`)
      .then(response => {
        fetchData();
        console.log(response.data.Message);
      })
    }
  }

  


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
                  <td><Button variant="danger" onClick={() => deleteCreditors(creditors.CreditorID)}>Delete</Button>
                  <Link to={'/editCreditor'}>
                    <Button variant="primary" style={{marginLeft: 10}}  >Amount Received</Button>
                  </Link>
                  </td>
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


 