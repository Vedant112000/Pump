import React, { useEffect, useState } from "react";
import generatePDF from "./reportGenerator";
import axios from 'axios';

const TransactionReport = () => {
    const [tickets, setTickets] = useState([]);
  

    useEffect(() => {
      const getAllTickets = async () => {
        try {
          const response = await axios.get("http://localhost:5000/collections/getCollection");
          setTickets(response.data.Data);
        } catch (err) {
          console.log("error");
        }
      };
      getAllTickets();
    }, []);
  
//   const reportTickets = tickets.filter(ticket => ticket.status === "completed");
    
    return (
      <div>
        <div className="container mb-4 mt-4 p-3">
          <div className="row">
            
              <button
                className="btn btn-primary"
                onClick={() => generatePDF(tickets)}
              >
                Generate Transaction report for Today!
              </button>
          </div>
        </div>

       
      </div>
    );
  };

export default TransactionReport