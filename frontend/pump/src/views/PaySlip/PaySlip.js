import React, { useEffect, useState } from 'react';
import './PaySlip.css';
import axios from 'axios';

const PaySlip = () => {


  //Renders all the components at the time of mount
  useEffect(() => {
    async function fetchData() {
      await fetchEmployee();
      await fetchCreditor();
      await fetchClosing();
      await fetchMsPrices();
      await fetchHsdPrices();
      await fetchShift();
    }
    fetchData();
  }, []);

  const [formData, setFormData] = useState({
    EmployeeName: '',
    shift: '',
    MpdNo: '',
    hsd_opening: 0,
    ms_opening: 0,
    hsd_closing: 0,
    ms_closing: 0,
    hsd_price: 0,
    ms_price: 0,
    cashAsPerMeter: 0,
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
  

  //To Fetch All employees data for payslip creation
  const [employee, setEmployee] = useState([]);
  const fetchEmployee = async () => {
    await axios.get('http://localhost:5000/employee/get')
    .then(response => {
      setEmployee(response.data.data);
    })
    .catch(error => {
      console.error(error);
    })
  }

  //To Fetch All creditors data
    const[creditors, setCreditors] = useState([]);
    const fetchCreditor = async () => {
      await axios.get('http://localhost:5000/creditor/get')
      .then(response => {
        setCreditors(response.data.data);
      })
      .catch(error => {
        console.error(error);
      })
    }


    //To Fetch all the individual closing of mpd
      const[closing, setClosing] = useState([]);
      const fetchClosing = async () => {
        await axios.get('http://localhost:5000/closing/get')
        .then(response => {
          setClosing(response.data.Data);
          console.log(response.data.Data);
        })
        .catch(error => {
          console.error(error);
        })
      }

      //To Fetch the fuel prices

      const [msPrices, setMsPrices] = useState([]);
      
      const fetchMsPrices= async () => {
        try {
          const response = await axios.get('http://localhost:5000/fuel/get/ms');
          const msPrice = response.data.data[0].ms_price;
          setMsPrices(msPrice);
      
          setFormData(prevData => ({
            ...prevData,
            ms_price: msPrice
          }));
        } catch (error) {
          console.error(error);
        }
      }

      const [hsdPrices, setHsdPrices] = useState([]);
      
      const fetchHsdPrices = async () => {
        try {
          const response = await axios.get('http://localhost:5000/fuel/get/hsd');
          const hsdPrice = response.data.data[0].hsd_price;
          setHsdPrices(hsdPrice);
      
          setFormData(prevData => ({
            ...prevData,
            hsd_price: hsdPrice
          }));
        } catch (error) {
          console.error(error);
        }
      }

      //to fetch the shift of employees so that we can evaluate if it is pay slip of day or night
      const [shift, setShift] = useState([]);
      const fetchShift = async () => {
        await axios.get('http://localhost:5000/shifts/get')
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
      
      const [cashMeter, setCashMeter] = useState();

      const cashAsPerMeter = () => {

        const msPrice = formData.ms_price;
        const hsdPrice = formData.hsd_price;
        const hsdclosing = formData.hsd_closing;
        const msclosing = formData.ms_closing;
        const hsdopening = formData.hsd_opening;
        const msopening = formData.ms_opening;

        const cashGot = (((hsdclosing - hsdopening) * hsdPrice) + ((msclosing - msopening) * msPrice));
        
        setFormData({...formData, cashAsPerMeter: cashGot});
        
      }
      
      console.log(formData);

  return (
    <div className="container p-3 mt-5">
          <h3 style={{marginTop: 10, marginBottom: 10}}>Transaction slip</h3>
          <form onSubmit={handleSubmit} style={{marginTop: 5}}>
            <div className="form-group">
              <label>Employee Name:</label>
              <br />
              <select className="form-control" name='EmployeeName' value={formData.Name} onChange={handleInputChange}>
                <option >Select the option below</option>
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
              <select className="form-control" name="shift" value={formData.shift} onChange={handleInputChange}>
              <option>Select the option below</option>
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
              <select className="form-control" name="MpdNo" value={closing.mpd_no} onChange={handleInputChange}>
                
              <option>Select the option below</option>

              {
                  closing.map((closing) => {
                    return(
                    <option key={closing.ClosingID} value={closing.mpd_no} name="MpdNo">{closing.mpd_no}</option>
                  )
                })


              }
                
                {/* Add more options for shift as needed */}
              </select>
            </div>

            {/* Input fields for the remaining parameters */}
            <div className="form-group">
              <label>Select the Mpd for Hsd opening (LAST CLOSING):</label>
              <select className="form-control" name="hsd_opening" value={closing.hsd_closing} onChange={handleInputChange}>
              <option>Select the option below</option>

              {
                  closing.map((closing) => {
                    return(
                    <option key={closing.ClosingID} value={closing.hsd_closing} name="MpdNo">{closing.mpd_no}</option>
                  )
                })


              }
              </select>
              <label>HSD Opening:</label>
              <input
                type="text"
                className="form-control"
                value={formData.hsd_opening}
              />
            </div>

            <div className="form-group">
              <label>Select the Mpd for MS opening (LAST CLOSING):</label>
              <select className="form-control" name="ms_opening" value={closing.ms_closing} onChange={handleInputChange}>
              <option>Select the option below</option>

              {
                  closing.map((closing) => {
                    return(
                    <option key={closing.ClosingID} value={closing.ms_closing} name="MpdNo">{closing.mpd_no}</option>
                  )
                })


              }
              </select>
              <label>MS Opening:</label>
              <input
                type="text"
                className="form-control"
                value={formData.ms_opening}
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
                readOnly
              />
            </div>

            <div className="form-group">
              <label>Ms Price:</label>
              <input
                type="number"
                className="form-control"
                name="ms_price"
                value={formData.ms_price} readOnly
              />
            </div>

            <div className="form-group">
              <label>Cash As Per Meter:</label>
              <input
                type="number"
                className="form-control"
                name="cashAsPerMeter"
                value={formData.cashAsPerMeter}
                onClick={cashAsPerMeter}
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