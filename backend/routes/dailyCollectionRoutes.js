import express from 'express';
import db from '../db.js';

const router = express.Router();

//use middleware

router.use(express.json());

//Insert collections of individual employee

router.post("/addCollection", (req, res) => {
    const {EmployeeName, shift, hsd_opening, ms_opening, hsd_closing, ms_closing, hsd_price, ms_price, cashAsPerMeter, cash2000, cash500, cash200, cash100, cash50, cash20, cash10, cash5, coins, totalCash, phonePeQR, paytmQR, paytmCard, creditAmount, collections, difference, MpdNo} = req.body;

    const dateObject = new Date();
    let date = ("0" + dateObject.getDate()).slice(-2);
    let month = ("0" + (dateObject.getMonth() + 1)).slice(-2);
    let year = dateObject.getFullYear();

    let hours = dateObject.getHours();
    let minutes = dateObject.getMinutes();
    let seconds = dateObject.getSeconds();

    const dateTime = year + "-" + month + "-" + date + " " + hours + ":" + minutes + ":" + seconds;

    const addCollection = "Insert into collectionstransaction (dateTime, EmployeeName, shift, hsd_opening, ms_opening, hsd_closing, ms_closing, hsd_price, ms_price, cashAsPerMeter, 2000_cash, 500_cash, 200_cash, 100_cash, 50_cash, 20_cash, 10_cash, 5_cash, coins, totalCash, phonePeQR, paytmQR, paytmCard, creditAmount, collections, difference, MpdNo) values (?,?,?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";

    db.query(addCollection, [dateTime, EmployeeName, shift, hsd_opening, ms_opening, hsd_closing, ms_closing, hsd_price, ms_price, cashAsPerMeter, cash2000, cash500, cash200, cash100, cash50, cash20, cash10, cash5, coins, totalCash, phonePeQR, paytmQR, paytmCard, creditAmount, collections, difference, MpdNo], (err, result) => {
        if(err){
          res.status(400).json({"message": err})
        }else{
          res.status(200).json({"message": "Transaction added successfully"})
        }
    })
}) 

//get All the collections Transaction

router.get("/getCollection", (req, res) => {

  const getCollection = "SELECT * FROM collectionstransaction";

  db.query(getCollection, (err, result) => {
      if(err){
        res.status(400).json({"message": err})
      }else{
        res.status(200).json({"Data": result, "message": "fetched Transaction successfully"})
      }
  })
})


//get transaction according to dates   => convert it into only date search

router.get("/getCollection/:dateTime", (req, res) => {
  const {dateTime} = req.params;

  const getCollection = "SELECT * FROM collectionstransaction where dateTime=?";

  db.query(getCollection, dateTime, (err, result) => {
      if(err){
        res.status(400).json({"message": err})
      }else{
        res.status(200).json({"Data": result, "message": "Fetched Transaction successfully"})
      }
  })
})

//delete transaction from the db

router.delete("/deleteCollection/:transactionId", (req, res) => {
    const {transactionId} = req.params;

    const deleteCollection = "delete from collectionstransaction where transactionId=?";

    db.query(deleteCollection, transactionId, (err, result) => {
      if(err){
        res.status(400).json({"message": err})
      }else{
        res.status(200).json({"message": "Transaction deleted successfully"})
      }
    })
})




export default router;
     