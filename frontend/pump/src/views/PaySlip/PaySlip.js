import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

const PaySlip = () => {


  //Renders all the components at the time of mount
  useEffect(() => {
    fetchEmployee();
    fetchCreditor();
    fetchClosing();
    fetchFuelPrices();
    fetchShift();
  }, [])

  //To Fetch All employees data for payslip creation
  const [employee, setEmployee] = useState([]);
  const fetchEmployee = () => {
    axios.get('http://localhost:5000/employee/get')
    .then(response => {
      setEmployee(response.data.data);
    })
    .catch(error => {
      console.error(error);
    })
  }

  //To Fetch All creditors data
    const[creditors, setCreditors] = useState([]);
    const fetchCreditor = () => {
      axios.get('http://localhost:5000/creditor/get')
      .then(response => {
        setCreditors(response.data.data);
      })
      .catch(error => {
        console.error(error);
      })
    }


    //To Fetch all the individual closing of mpd
      const[closing, setClosing] = useState([]);
      const fetchClosing = () => {
        axios.get('http://localhost:5000/closing/get')
        .then(response => {
          setClosing(response.data.data);
        })
        .catch(error => {
          console.error(error);
        })
      }

      //To Fetch the fuel prices

      const [fuelPrices, setFuelPrices] = useState([]);
      
      const fetchFuelPrices= () => {
        axios.get('http://localhost:5000/fuel/get')
        .then(response => {
          setFuelPrices(response.data.data);
        })
        .catch(error => {
          console.error(error);
        })
      }

      //to fetch the shift of employees so that we can evaluate if it is pay slip of day or night
      const [shift, setShift] = useState([]);
      const fetchShift = () => {
        axios.get('http://localhost:5000/shifts/get')
        .then(response => {
          setShift(response.data.data);
        })
        .catch(error => {
          console.error(error);
        })

      }


      //logic for the component

      const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
          ...formData,
          [name]: value,
        });
      };
    
      const handleSubmit = (e) => {
        e.preventDefault();
        // You can handle form submission or data processing here.
        // For example, you can send this data to an API or update your application's state.
      };


      const [formData, setFormData] = useState({
        EmployeeName: '',
        shift: '',
        MpdNo: '',
        hsd_opening: '',
        ms_opening: '',
        hsd_closing: '',
        ms_closing: '',
        hsd_price: '',
        ms_price: '',
        cashAsPerMeter: '',
        '2000_cash': '',
        '500_cash': '',
        '200_cash': '',
        '100_cash': '',
        '50_cash': '',
        '20_cash': '',
        '10_cash': '',
        '5_cash': '',
        Coins: '',
        TotalCash: '',
        PhonePeQR: '',
        paytmQR: '',
        paytmCard: '',
        CreditAmount: '',
        Collections: '',
        difference: '',
      });

      console.log(formData);

  return (
    <div className="container p-3 mt-5">
          <h3 style={{marginTop: 10, marginBottom: 10}}>Transaction slip</h3>
          <form onSubmit={handleSubmit} style={{marginTop: 5}}>
            <div className="form-group">
              <label>Employee Name:</label>
              <br />
              <select className="form-control" name="EmployeeName" value={employee} onChange={handleInputChange}>
                <option value="">Select the option below</option>
                {
                    employee.map((employee) => {
                      return(
                      <option key={employee.EmpId} value={employee.Name} name="EmployeeName">{employee.Name}</option>
                    )
                  })
                    

                }
                
                {/* Add more options for EmployeeName as needed */}
              </select>
            </div>

            <div className="form-group">
              <label>Shift:</label>
              <br />
              <select className="form-control" name="shift" value={shift} onChange={handleInputChange}>
              <option value="">Select the option below</option>
              {
                  shift.map((shift) => {
                    return(
                    <option key={shift.idshifts} value={shift.shifts} name="shifts">{shift.shifts}</option>
                  )
                })


              }
                
                {/* Add more options for shift as needed */}
              </select>
            </div>

            <div className="form-group">
              <label>Mpd No:</label>
              <input
                type="Number"
                className="form-control"
                name="MpdNo"
                value=""
                onChange={handleInputChange}
              />
            </div>

            {/* Input fields for the remaining parameters */}
            <div className="form-group">
              <label>HSD Opening:</label>
              <input
                type="text"
                className="form-control"
                name="hsd_opening"
                value={formData.hsd_opening}
                onChange={handleInputChange}
              />
            </div>

            <div className="form-group">
              <label>MS Opening:</label>
              <input
                type="text"
                className="form-control"
                name="ms_opening"
                value={formData.ms_opening}
                onChange={handleInputChange}
              />
            </div>

            <div className="form-group">
              <label>HSD Closing:</label>
              <input
                type="text"
                className="form-control"
                name="hsd_closing"
                value={formData.hsd_closing}
                onChange={handleInputChange}
              />
            </div>

            <div className="form-group">
              <label>MS Closing:</label>
              <input
                type="text"
                className="form-control"
                name="ms_closing"
                value={formData.ms_closing}
                onChange={handleInputChange}
              />
            </div>

            <div className="form-group">
              <label>Hsd Price:</label>
              <input
                type="number"
                className="form-control"
                name="hsd_price"
                value={formData.hsd_price}
                onChange={handleInputChange}
              />
            </div>

            <div className="form-group">
              <label>Ms Price:</label>
              <input
                type="number"
                className="form-control"
                name="ms_price"
                value={formData.ms_price}
                onChange={handleInputChange}
              />
            </div>

            <div className="form-group">
              <label>Cash As Per Meter:</label>
              <input
                type="number"
                className="form-control"
                name="cashAsPerMeter"
                value={formData.cashAsPerMeter}
                onChange={handleInputChange}
              />
            </div>

            <div className="form-group">
              <label>₹2000 Notes:</label>
              <input
                type="number"
                className="form-control"
                name="cashAsPerMeter"
                value={formData}  //note paramter due to number not accepting
                onChange={handleInputChange}
              />
            </div>

            <div className="form-group">
              <label>₹500 Notes:</label>
              <input
                type="number"
                className="form-control"
                name="cashAsPerMeter"
                value={formData}  //note paramter due to number not accepting
                onChange={handleInputChange}
              />
            </div>

            <div className="form-group">
              <label>₹200 Notes:</label>
              <input
                type="number"
                className="form-control"
                name="cashAsPerMeter"
                value={formData}  //note paramter due to number not accepting
                onChange={handleInputChange}
              />
            </div>

            <div className="form-group">
              <label>₹100 Notes:</label>
              <input
                type="number"
                className="form-control"
                name="cashAsPerMeter"
                value={formData}  //note paramter due to number not accepting
                onChange={handleInputChange}
              />
            </div>

            <div className="form-group">
              <label>₹50 Notes:</label>
              <input
                type="number"
                className="form-control"
                name="cashAsPerMeter"
                value={formData}  //note paramter due to number not accepting
                onChange={handleInputChange}
              />
            </div>

            <div className="form-group">
              <label>₹20 Notes:</label>
              <input
                type="number"
                className="form-control"
                name="cashAsPerMeter"
                value={formData}  //note paramter due to number not accepting
                onChange={handleInputChange}
              />
            </div>

            <div className="form-group">
              <label>₹10 Notes:</label>
              <input
                type="number"
                className="form-control"
                name="cashAsPerMeter"
                value={formData}  //note paramter due to number not accepting
                onChange={handleInputChange}
              />
            </div>

            <div className="form-group">
              <label>₹5 Note/Coin:</label>
              <input
                type="number"
                className="form-control"
                name="cashAsPerMeter"
                value={formData}  //note paramter due to number not accepting
                onChange={handleInputChange}
              />
            </div>
            {/* Add similar input fields for the remaining parameters */}
            
            <button type="submit" className="btn btn-primary">Submit</button>
          </form>
  </div>
  )
}

export default PaySlip