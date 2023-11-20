import express from 'express';
import db from '../db.js';
import cors from 'cors';

const router = express.Router();

//use middleware

router.use(express.json());
router.use(cors());

//Insert collections of individual employee

router.post("/addCollection", (req, res) => {
    const {EmployeeName, shift, hsd_opening, ms_opening, hsd_closing, ms_closing, hsd_price, ms_price, cashAsPerMeter, twoThousand_cash, fiveHun_cash, twoHun_cash, oneHun_cash, fifty_cash, twenty_cash, ten_cash, five_cash, Coins, totalCash, PhonePeQR, paytmQR, paytmCard, CreditAmount, Collections, difference, MpdNo} = req.body;

    const dateObject = new Date();
    let date = ("0" + dateObject.getDate()).slice(-2);
    let month = ("0" + (dateObject.getMonth() + 1)).slice(-2);
    let year = dateObject.getFullYear();

    let hours = dateObject.getHours();
    let minutes = dateObject.getMinutes();
    let seconds = dateObject.getSeconds();

    const dateTime = year + "-" + month + "-" + date + " " + hours + ":" + minutes + ":" + seconds;

    const addCollection = "Insert into collectionstransaction (dateTime, EmployeeName, shift, hsd_opening, ms_opening, hsd_closing, ms_closing, hsd_price, ms_price, cashAsPerMeter, twoThousand_cash, fiveHun_cash, twoHun_cash, oneHun_cash, fifty_cash, twenty_cash, ten_cash, five_cash, Coins, totalCash, PhonePeQR, paytmQR, paytmCard, CreditAmount, Collections, difference, MpdNo) values (?,?,?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";

    db.query(addCollection, [dateTime, EmployeeName, shift, hsd_opening, ms_opening, hsd_closing, ms_closing, hsd_price, ms_price, cashAsPerMeter, twoThousand_cash, fiveHun_cash, twoHun_cash, oneHun_cash, fifty_cash, twenty_cash, ten_cash, five_cash, Coins, totalCash, PhonePeQR, paytmQR, paytmCard, CreditAmount, Collections, difference, MpdNo], (err, result) => {
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

//to get the latest transaction Id

router.get("/getLatestTransaction", (req, res) => {

  const getLatest = "SELECT TransactionId FROM collectionstransaction ORDER BY TransactionId DESC LIMIT 1";

  db.query(getLatest, (err, result) => {
    if(err){
      res.status(400).json({"Message": err})
    }else{
      res.status(200).json({"data": result});
    }
  })
})

//to join the data of collectionTransaction and creditor_transacation

router.get("/allTransactionDetails/:transactionId", (req, res) => {

  const {transactionId} = req.params;

  const getAllDetails = "SELECT dateTime, MpdNo, EmployeeName, shift, creditAmount, creditor, FuelAmount, Litres, FuelType FROM collectionstransaction LEFT JOIN creditor_transaction ON collectionstransaction.TransactionId = creditor_transaction.TransactionId WHERE collectionstransaction.TransactionId = ?";

  db.query(getAllDetails, transactionId, (err, result) => {
    if(err){
      res.status(400).json(err);
    }else{
      res.status(200).json({"data": result});
    }
  })

})

//to post all the data got from user into the creditor transaction table

router.post("/addCreditorDetails", (req,res) => {
  const {TransactionId, creditor, FuelAmount, Litres, FuelType} = req.body;

  const addDetails = "Insert into creditor_transaction (TransactionId, creditor, FuelAmount, Litres, FuelType) values (?,?,?,?,?)";

  db.query(addDetails, [TransactionId, creditor, FuelAmount, Litres, FuelType], (err,result) => {
    if(err){
      res.status(400).json(err)
    }else{
      res.status(200).json({"Message": "successfully added the creditor details for the transaction."})
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
     