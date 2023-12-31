import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import {Link} from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import AddCreditors from '../Creditors/AddCreditors';
import {toast} from 'react-toastify';
import { FaTrash } from "@react-icons/all-files/fa/FaTrash";
import { FaPlus } from "@react-icons/all-files/fa/FaPlus";

const Employee = () => {

  const [employees, setEmployee] = useState([]);
  
  const navigate = useNavigate();

  useEffect(() => {
    fetchData();
  },[AddCreditors])

  const fetchData = () => {
    axios.get('http://localhost:5000/employee/get')
    .then((response) => {
      setEmployee(response.data.data);
    })
    .catch((error) => {
        console.error(error);
    })
  }



    
    const deleteEmployee = (id) => {

      if(window.confirm("Are you sure you want to delete this employee?")){
      axios.delete(`http://localhost:5000/employee/delete/${id}`)
        .then(response => {
          // Handle a successful response (e.g., update the UI)
          // setEmployee(employees.filter(employee => employee.EmpId !== id));
          fetchData();
          toast.error("Employee Deleted Successfully");
          
          navigate('/employee');
        })
        .catch(error => {
          // Handle errors (e.g., show an error message)
          console.error('Error deleting data:', error);
        });
      }else{
          navigate('/employee');
      }
    
  }


  return (
    <div>
      <div className='container p-3 mt-5'>
          <h3 className='mt-3'>Employee Data</h3>

          <Link to='/addEmployee' style={{textDecoration: 'none', color: 'white'}}><Button variant="primary" className='mt-3'><FaPlus style={{marginRight: 5, padding: 2}} />Add Employee</Button></Link>
          
          <Table striped bordered hover className='mt-3'>
      <thead>
        <tr>
          <th>No.</th>
          <th>Name</th>
          <th>Contact_details</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>

        {
            employees.map((employee, index) => {
             return <tr key={index}>
              <td>{index + 1}</td>
              <td>{employee.Name}</td>
              <td>{employee.Contact_Details}</td>
              <td><Button variant="danger" onClick={() => deleteEmployee(employee.EmpId)}><FaTrash /></Button></td>
            </tr>
            })
        }
        
        
        
      </tbody>
    </Table>
      </div>
    </div>
  )
}

export default Employee