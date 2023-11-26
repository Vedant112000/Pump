import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';

const DynamicExpenses = () => {

    const[expense, setExpense] = useState([{
        name: "",
        amount: 0,
    }])

    const handleChange = (e,index) => {
        const {name, value} = e.target;
        const list = [...expense];
        list[index,name] = value;
        setExpense(list);
    }

    const handleadd = () => {
        setExpense([...expense, {name: "",amount: 0}]);
    }

    const handleremove = (i) => {
        const list = [...expense];
        list.splice(i,1);
        setExpense(list);
    }

  return (
    <div>
        <div>
        {
            expense.map((z,i) => {
                return(
                    <>
                    <label>
                        Expense:
                    </label>
                    
                    <input type='text' name='name' value={i.expense} onChange={(e) => handleChange(e,i)}/>
        
                    <label>
                        Amount: 
                    </label>
                    <input type='number' name='amount' value={i.amount} onChange={(e) => handleChange(e,i)}/>
        
                    
                
                    <div style={{marginTop: 10}}>
                        {
                            expense.length !== 1 &&
                            <Button className="btn btn-danger" onClick={()=> handleremove(i)} style={{marginRight:10}}>Remove</Button>
                        }
                        {
                            expense.length-1 === i &&
                            <Button className="btn btn-success" onClick={handleadd}>Add Expense</Button>
                        }
                        
                    </div>
                    </>
                )
                    })
           }
    </div>
    </div>
  )
}

export default DynamicExpenses