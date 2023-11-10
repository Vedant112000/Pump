import jsPDF from "jspdf";
import "jspdf-autotable";
// Date Fns is used to format the dates we receive
// from our API call
// import { format } from "date-fns";

// define a generatePDF function that accepts a tickets argument
const generatePDF = transactions => {
  // initialize jsPDF
  const doc = new jsPDF();

  const today = new Date().toISOString().split("T")[0];
  let isFirstPage = true;

  transactions.forEach((transaction, index) => {
    // Filter transactions for today's date
    if (transaction.dateTime.split("T")[0] === today) {
      const tableData = [];
      for (const key in transaction) {
        if (transaction.hasOwnProperty(key)) {
          tableData.push({
            Property: key,
            Value: transaction[key],
          });
        }
      }

      const rows = tableData.map(column => Object.values(column));
      const tableColumns = ["Property", "Value"];

      if (!isFirstPage) {
        doc.addPage(); // Add a new page for each subsequent transaction
      } else {
        isFirstPage = false;
      }

      doc.autoTable({
        head: [tableColumns],
        body: rows,
        startY: 20,
      });

      // Add a title for each transaction
      doc.text(`Transaction ${index + 1} Report`, 14, 15);
    }
  });

  const date = new Date().toISOString().split("T")[0];
  doc.save(`transaction_report_${date}.pdf`);



};

export default generatePDF;