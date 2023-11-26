import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';

const DynamicInput = () => {

    //got creditors data 

    const [creditor, setCreditor] = useState([]);

    useEffect(() => {
        fetchCreditor();
    },[])

    const fetchCreditor = () => {
        axios.get('http://localhost:5000/creditor/get')
        .then(response => {
            setCreditor(response.data.data);
        })
        .catch(error => {
            console.error(error);
        })
    }


    //created a array of object to store data of creditors for specific transaction

    const [creditorDetails, setCreditorDetails] = useState([{
        name: "",
        fuelAmount: 0,
        fuelType: "",
        Litres: 0,
    }]);


    //created a function that store values in the object on change of input

    const handleChange = (e,index) => {
        const {name, value} = e.target;
        const list = [...creditorDetails];
        list[index,name] = value;
        setCreditorDetails(list);
    }

    console.log(creditorDetails);


    //created a function to handle add button

    const handleadd = () => {
        setCreditorDetails([...creditorDetails, {name: "",fuelAmount: 0,fuelType: "",Litres: 0,}]);
    }

    const handleremove = (i) => {
        const list = [...creditorDetails];
        list.splice(i,1);
        setCreditorDetails(list);
    }

  return (
    <div>
        {
            creditorDetails.map((z,i) => {
                return(
                    <>
                    <label>
                        Creditor Name:
                    </label>
                    
                    <select name='name' value={i.name} onChange={(e) => handleChange(e,i)}>
                        <option>Select any creditor of below.</option>
                        {
                            creditor.map((x,index) => {
                                return(
                                <option key={index} name="name" value={x.name}>
                                    {x.name}
                                </option>
                                )
                            })
                        }
                    </select>
        
                    <label>
                        Fuel Amount: 
                    </label>
                    <input type='number' name='fuelAmount' value={i.fuelAmount} onChange={(e) => handleChange(e,i)}/>
        
                    <label>
                        Fuel Type:
                    </label>
                    <select name='fuelType' value={i.fuelType} onChange={(e)=> handleChange(e,i)}>
                        <option>Select the below option.</option>
                        <option value='Hsd'>Hsd</option>
                        <option value='Ms'>Ms</option>
                    </select>
        
                    <label>
                        Fuel in Litres:
                    </label>
                    <input type='number' value={i.Litres} onChange={(e)=> handleChange(e,i)}/>
                
                    <div style={{marginTop: 10}}>
                        {
                            creditorDetails.length !== 1 &&
                            <Button className="btn btn-danger" onClick={()=> handleremove(i)} style={{marginRight:10}}>Remove</Button>
                        }
                        {
                            creditorDetails.length-1 === i &&
                            <Button className="btn btn-success" onClick={handleadd}>Add Creditors</Button>
                        }
                        
                    </div>
                    </>
                )
                    })
           }
    </div>
  )
}

export default DynamicInput