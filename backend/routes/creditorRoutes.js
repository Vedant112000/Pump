import express from 'express';
import db from '../db.js'
import axios from 'axios';
import cors from 'cors';

const router = express.Router();

//use middleware 
router.use(cors());
router.use(express.json());

//just added to see whether git identify the changes or not

//add creditor into db

router.post("/add", (req,res) => {
  const {name, contact_details, totalCreditAmount} = req.body;

  const addCreditor = "INSERT INTO creditor (name, contact_details, totalCreditAmount) VALUES (?,?,?)";

  db.query(addCreditor, [name, contact_details, totalCreditAmount], (err, result) => {
      if(err){
        res.json({"message": err})
      }
      else{
        res.status(200).json({"data": name+" "+contact_details+" "+totalCreditAmount,"message": "creditor added successfully"})
      }
  })
})

//read all the creditors

router.get("/get", (req, res) => {

  const readAllCreditor = "SELECT * FROM creditor";

  db.query(readAllCreditor, (err, result) => {
      if(err){
        res.status(400).json({"Message": "Problem raised while fetching creditor data"})
      }else{
        res.status(200).json({"count": result.length, "data": result})
      }
  })
})

//read specific creditors

router.get("/get/:creditorId", (req, res) => {
  const {creditorId} = req.params;

  const getCreditor = "SELECT * FROM CREDITOR WHERE creditorId = ?";

  db.query(getCreditor, creditorId, (err, result) => {
      if(err){
        res.status(400).json({"Message": "Problem raised while fetching Creditor data"})
      }else{
        res.status(200).json({"data": result})
      }
  })
})


//update creditor details into db

router.put("/update/:creditorId", (req, res) => {
  const {creditorId} = req.params;
  const {name, contact_details, totalCreditAmount} = req.body;

  const updateCreditor = "UPDATE creditor SET name=?, contact_details=?, totalCreditAmount=? WHERE creditorId = ?";

  db.query(updateCreditor, [name, contact_details,totalCreditAmount, creditorId], (err, result) => {
      if(err){
        res.status(400).json({"Message": "Problem raised while fetching creditor data"})
      }else{
        res.status(200).json({"Message": "Creditor data updated"})
      }
  })
})

//delete creditor

router.delete("/delete/:creditorId", (req, res) => {
  const {creditorId} = req.params;

  const deleteCreditor = "DELETE FROM creditor WHERE creditorId = ?";

  db.query(deleteCreditor, creditorId , (err, result) => {
      if(err){
        res.status(400).json({"Message": "Problem raised while fetching creditor data"})
      }else{
        res.status(200).json({"Message": "creditor data deleted"})
      }
  })
})

//add credit transaction into table

router.post("/addTransaction", (req, res) => {
    const {employeeName, creditorName, paidAmount, creditAmount} = req.body;

    const dateObject = new Date();
    let date = ("0" + dateObject.getDate()).slice(-2);
    let month = ("0" + (dateObject.getMonth() + 1)).slice(-2);
    let year = dateObject.getFullYear();

    let hours = dateObject.getHours();
    let minutes = dateObject.getMinutes();
    let seconds = dateObject.getSeconds();

    const dateTime = year + "-" + month + "-" + date + " " + hours + ":" + minutes + ":" + seconds;

    const addTransaction = "Insert into creditor_transaction (employeeName, creditorName, paidAmount, creditAmount, dateTime) VALUES(?,?,?,?,?)";

    db.query(addTransaction, [employeeName, creditorName, paidAmount, creditAmount, dateTime], (err, result) => {
      if(err){
        res.status(400).json({"message": err})
      }
      else{
        res.status(200).json({"message": "Transaction added successfully"})
      }
    })
})


//get weather api call

router.get("/api/weather/:city", (req, res) => {

    const {city} = req.params;

    axios({
      url: "http://api.weatherapi.com/v1/current.json?key=792884a6fbcc4dfa97a151046232409&q="+city+"&aqi=no",
      method: "get",
    }).then((response) => {
			res.status(200).json(response.data.current.condition.text);
		}).catch((err) => {
			res.status(500).json({ message: err });
		});
})

export default router;  