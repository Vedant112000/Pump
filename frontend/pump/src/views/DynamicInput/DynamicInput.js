import React, { useState } from 'react';
import "./DynamicInput.css"
import Button from 'react-bootstrap/Button';
import { FaPlus } from "@react-icons/all-files/fa/FaPlus";

const DynamicInput = () => {

    const[creditors, setCreditors] = useState([{
        name: "",
        fuelType: "",
        fuelAmount: 0,
        Litres: 0,

    }]);

    const handleInputChange = (e,index) => {
        const {name, value} = e.target;
        const list = [...creditors];
        list[index,name] = value;

        setCreditors(list);
    }

    const handleAdd = () => {
        setCreditors([...creditors, {name: creditors.name, fuelType: creditors.fuelType, fuelAmount: creditors.fuelAmount, Litres: creditors.Litres}]);
    }

    const handleRemove = (index) => {
        const list = [...creditors];
        list.splice(index,1);
    }

  return (
    <div className='Container'>
        <div>
        <label>Add Creditors: </label>
        </div>
    {
        creditors.map( (x,i) =>{
        return(
        <div>
            <label>Creditor Name: </label>
            <select name='name' value={creditors.name} onChange={(e) => handleInputChange(e,i)}>
                <option disabled>Select any creditor below:</option>
                <option name='name' value={x.name}>{creditors.name}</option>
            </select>

            <label>Fuel Type: </label>
            <select name='fuelType' value={x.fuelType} onChange={(e) => handleInputChange(e,i)}>
                <option disabled>Select any creditor below:</option>
                <option value='Hsd'>Hsd</option>
                <option value='Ms'>Ms</option>
            </select>
            
           
            <label>Fuel Amount: </label>
            <input type='number' placeholder='Enter the amount of Fuel Filled.' name='fuelAmount' value={x.fuelAmount} onChange={(e) => handleInputChange(e,i)} />


            <label>Litres Filled: </label>
            <input type='number' value={x.Litres} />

            

            <div style={{marginTop: 10}}>
                {/* on every button hit there should be an api call to store the creditor data */}
                {
                    creditors.length !== 1 &&
                    <Button className='danger' onClick={() => handleRemove(i)}>Remove Creditors</Button>

                }
                {
                    creditors.length-1 === i &&
                    <Button className='primary' onClick={handleAdd()}><FaPlus style={{marginRight: 5}}/>Add More Creditors</Button>
                }
            </div>

               

        </div>
        
            
        );
    } )}

        
    </div>
  )
}

export default DynamicInput