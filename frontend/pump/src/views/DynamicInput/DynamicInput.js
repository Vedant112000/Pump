import React, { useState } from 'react';
import "./DynamicInput.css"
import Button from 'react-bootstrap/Button';
import { FaPlus } from "@react-icons/all-files/fa/FaPlus";

const DynamicInput = () => {

    const[creditors, setCreditors] = useState({
        name: "",
        fuelType: "",
        fuelAmount: 0,

    });

    const handleInputChange = (e) => {
        const {name, value} = e.target;

        setCreditors({...creditors, 
            [name]: value});
    }

    const handleAdd = () => {

    }

  return (
    <div className='Container'>
        <div>
        <label>Add Creditors: </label>
        </div>

        <div>
            <label>Creditor Name: </label>
            <select name='name' value={creditors.name} onChange={e => handleInputChange}>
                <option disabled>Select any creditor below:</option>
                <option name='name' value='Aarti Drugs'>Aarti Drugs</option>
            </select>

            <label>Fuel Type: </label>
            <select onChange={e => handleInputChange}>
                <option disabled>Select any creditor below:</option>
                <option value='Hsd'>Hsd</option>
                <option value='Ms'>Ms</option>
            </select>
            
            <div>
            <label>Fuel Amount: </label>
            <input type='number' placeholder='Enter the amount of Fuel Filled.' onChange={e => handleInputChange} />


            <label>Litres Filled: </label>
            <input type='number' value="" />

            </div>

            <div style={{marginTop: 10}}>
                {/* on every button hit there should be an api call to store the creditor data */}
            <Button className='primary' onClick={handleAdd}><FaPlus style={{marginRight: 5}}/>Add More Creditors</Button>
            </div>

        </div>
        
            


        
    </div>
  )
}

export default DynamicInput