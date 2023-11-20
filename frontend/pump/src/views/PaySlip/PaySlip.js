import React, { useEffect, useState } from 'react';
import './PaySlip.css';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import DynamicInput from '../DynamicInput/DynamicInput';

const PaySlip = () => {

  const navigate = useNavigate();

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
    twoThousand_cash: 0,
    fiveHun_cash: 0,
    twoHun_cash: 0,
    oneHun_cash: 0,
    fifty_cash: 0,
    twenty_cash: 0,
    ten_cash: 0,
    five_cash: 0,
    Coins: 0,
    totalCash: 0,
    PhonePeQR: 0,
    paytmQR: 0,
    paytmCard: 0,
    CreditAmount: 0,
    Collections: 0,
    difference: 0,
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
        sendRequest(formData);
        // Update the latest closing data
        const creditorId = formData.MpdNo; // Assuming you have CreditorID in your form data
        const hsdClosing = formData.hsd_closing;
        const msClosing = formData.ms_closing;
        updateLatestClosing(creditorId, hsdClosing, msClosing);

        toast.success("Added Transaction Slip Successfully");
        navigate("/Dashboard");
       
      };
      
      const sendRequest = async (data) => {
        try{
          if(window.confirm("are you sure you want to create this slip check once before submitting")){
          const response = await axios.post('http://localhost:5000/collections/addCollection', data);
          console.log(response);
          }
          else{
            navigate("/");
          }
        }catch(error){
          console.error(error);
          toast.error("Error occured while operation");
          navigate("/Dashboard");
        }
      
      
        
      }
      

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

      const getTotalCash = () => {

          const TotalCash = ((formData.twoThousand_cash * 2000) + (formData.fiveHun_cash * 500) + (formData.twoHun_cash * 200) + (formData.oneHun_cash * 100) + (formData.fifty_cash * 50) + (formData.twenty_cash * 20) + (formData.ten_cash * 10) + (formData.five_cash * 5) + (formData.Coins * 1));
          setFormData({...formData, totalCash: TotalCash});
          
      }

      const[onlineCollection, setOnlineCollection] = useState(0);

      const getOnlineCollections = () => {
          const oncollect = (formData.PhonePeQR * 1) + (formData.paytmQR * 1) + (formData.paytmCard * 1);
          setOnlineCollection(oncollect);
      }

      const calcCollections = () => {
        const totalCollection = (formData.totalCash * 1) + (onlineCollection * 1);
        setFormData({...formData, Collections: totalCollection});
      }

      const getDifference = () => {
        const diff = (formData.Collections * 1 ) - (formData.cashAsPerMeter * 1);
        const diff1 = diff.toFixed(2);
        setFormData({...formData, difference: diff1});
      }
      
      //setting latest closing for the specific mpd for next opening 
      
      const updateLatestClosing = async (creditorId, hsdClosing, msClosing) => {
        try {
          // Create an object with the data you want to update
          const latestClosingData = {
            hsd_closing: hsdClosing,
            ms_closing: msClosing,
          };
      
          // Make a POST request to your API endpoint to update the latest closing data
          const response = await axios.put(`http://localhost:5000/closing/update/${creditorId}`, latestClosingData);
      
          console.log(response); // You can handle the response as needed
        } catch (error) {
          console.error(error);
        }
      };

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
              <select className="form-control" name="MpdNo" value={closing.ClosingID} onChange={handleInputChange}>
                
              <option>Select the option below</option>

              {
                  closing.map((closing) => {
                    return(
                    <option key={closing.ClosingID} value={closing.ClosingID} name="MpdNo">{closing.mpd_no}</option>
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
                onFocus={(e) => e.target.addEventListener("wheel", function (e) { e.preventDefault() }, { passive: false })}
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
                onFocus={(e) => e.target.addEventListener("wheel", function (e) { e.preventDefault() }, { passive: false })}
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
                readonly
              />
            </div>

            <div className="form-group">
              <label>₹2000 Notes:</label>
              <input
                type="number"
                className="form-control"
                name="twoThousand_cash"
                value={formData.twoThousand_cash}  
                onChange={handleInputChange}
                onFocus={(e) => e.target.addEventListener("wheel", function (e) { e.preventDefault() }, { passive: false })}
              />
            </div>

            <div className="form-group">
              <label>₹500 Notes:</label>
              <input
                type="number"
                className="form-control"
                name="fiveHun_cash"
                value={formData.fiveHun_cash}  
                onChange={handleInputChange}
                onFocus={(e) => e.target.addEventListener("wheel", function (e) { e.preventDefault() }, { passive: false })}
              />
            </div>

            <div className="form-group">
              <label>₹200 Notes:</label>
              <input
                type="number"
                className="form-control"
                name="twoHun_cash"
                value={formData.twoHun_cash}  
                onChange={handleInputChange}
                onFocus={(e) => e.target.addEventListener("wheel", function (e) { e.preventDefault() }, { passive: false })}
              />
            </div>

            <div className="form-group">
              <label>₹100 Notes:</label>
              <input
                type="number"
                className="form-control"
                name="oneHun_cash"
                value={formData.oneHun_cash}  
                onChange={handleInputChange}
                onFocus={(e) => e.target.addEventListener("wheel", function (e) { e.preventDefault() }, { passive: false })}
              />
            </div>

            <div className="form-group">
              <label>₹50 Notes:</label>
              <input
                type="number"
                className="form-control"
                name="fifty_cash"
                value={formData.fifty_cash}  
                onChange={handleInputChange}
                onFocus={(e) => e.target.addEventListener("wheel", function (e) { e.preventDefault() }, { passive: false })}
              />
            </div>

            <div className="form-group">
              <label>₹20 Notes:</label>
              <input
                type="number"
                className="form-control"
                name="twenty_cash"
                value={formData.twenty_cash}  
                onChange={handleInputChange}
                onFocus={(e) => e.target.addEventListener("wheel", function (e) { e.preventDefault() }, { passive: false })}
              />
            </div>

            <div className="form-group">
              <label>₹10 Notes:</label>
              <input
                type="number"
                className="form-control"
                name="ten_cash"
                value={formData.ten_cash}  
                onChange={handleInputChange}
                onFocus={(e) => e.target.addEventListener("wheel", function (e) { e.preventDefault() }, { passive: false })}
              />
            </div>

            <div className="form-group">
              <label>₹5 Note/Coin:</label>
              <input
                type="number"
                className="form-control"
                name="five_cash"
                value={formData.five_cash}  
                onChange={handleInputChange}
                onFocus={(e) => e.target.addEventListener("wheel", function (e) { e.preventDefault() }, { passive: false })}
              />
            </div>
            

            <div className="form-group">
              <label>Coins:</label>
              <input
                type="number"
                className="form-control"
                name="Coins"
                value={formData.Coins}  
                onChange={handleInputChange}
                onFocus={(e) => e.target.addEventListener("wheel", function (e) { e.preventDefault() }, { passive: false })}
              />
            </div>

            <div className="form-group">
              <label>Total Cash:</label>
              <input
                type="number"
                className="form-control"
                name="TotalCash"
                value={formData.totalCash}  
                onClick={getTotalCash} readOnly
              />
            </div>

            <div className="form-group">
              <label>PhonePe(QR):</label>
              <input
                type="number"
                className="form-control"
                name="PhonePeQR"
                value={formData.PhonePeQR}  
                onChange={handleInputChange}
                onFocus={(e) => e.target.addEventListener("wheel", function (e) { e.preventDefault() }, { passive: false })}
              />
            </div>

            <div className="form-group">
              <label>Paytm(QR):</label>
              <input
                type="number"
                className="form-control"
                name="paytmQR"
                value={formData.paytmQR}  
                onChange={handleInputChange}
                onFocus={(e) => e.target.addEventListener("wheel", function (e) { e.preventDefault() }, { passive: false })}
              />
            </div>
            

            <div className="form-group">
              <label>Paytm Card:</label>
              <input
                type="number"
                className="form-control"
                name="paytmCard"
                value={formData.paytmCard}  
                onChange={handleInputChange}
                onFocus={(e) => e.target.addEventListener("wheel", function (e) { e.preventDefault() }, { passive: false })}
              />
            </div>

            <div className="form-group">
              <label>Total online Collections:</label>
              <input
                type="number"
                className="form-control"
                value={onlineCollection}  
                onClick={getOnlineCollections}
                readOnly
              />
            </div>

            <div className="form-group">
              <label>Collections:</label>
              <input
                type="number"
                className="form-control"
                name="Collections"
                value={formData.Collections}  
                onClick={calcCollections}
                readOnly
              />
            </div>

            <div className="form-group">
              <label>Difference:</label>
              <input
                type="number"
                className="form-control"
                name="difference"
                value={formData.difference}  
                onClick={getDifference}
                readOnly
              />
            </div>

            <div>
              <DynamicInput />
            </div>

            <button type="submit" id='paySlipSubmitBtn' className="btn btn-primary" style={{marginTop: 15}}>Submit</button>
          </form>
  </div>
  )
}

export default PaySlip