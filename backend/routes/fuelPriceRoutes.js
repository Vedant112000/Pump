import express from 'express';
import db from '../db.js'
import cors from 'cors';

const router = express.Router();

//connection to middleware
router.use(express.json());
router.use(cors());

//get all fuel prices

router.get("/get", (req, res) => {
    
    const getAllFuelPrices = "SELECT * FROM fuel_price";

    db.query(getAllFuelPrices, (err, result) => {
        if(err){
          res.status(400).json({"Message":"problem raised while fetching fuel prices", "error": err})
        }
        else{
          res.status(200).json({"data": result, "Message": "data fetched successfully"})
        }
    })
})

//get only ms price

router.get("/get/ms", (req, res) => {
    
  const getMsFuelPrices = "SELECT ms_price FROM fuel_price";

  db.query(getMsFuelPrices, (err, result) => {
      if(err){
        res.status(400).json({"Message":"problem raised while fetching fuel prices", "error": err})
      }
      else{
        res.status(200).json({"data": result, "Message": "data fetched successfully"})
      }
  })
})

//get only hsd price

router.get("/get/hsd", (req, res) => {
    
  const getHsdFuelPrices = "SELECT hsd_price FROM fuel_price";

  db.query(getHsdFuelPrices, (err, result) => {
      if(err){
        res.status(400).json({"Message":"problem raised while fetching fuel prices", "error": err})
      }
      else{
        res.status(200).json({"data": result, "Message": "data fetched successfully"})
      }
  })
})

//update ms price

router.put("/update/ms/:id", (req, res) => {
    const {id} = req.params;
    const {ms_price} = req.body;

  const updateMsFuelPrices = "update fuel_price set ms_price = ? where id =?";

  db.query(updateMsFuelPrices, [ms_price, id], (err, result) => {
      if(err){
        res.status(400).json({"Message":"problem raised while updating fuel prices", "error": err})
      }
      else{
        res.status(200).json({"Message": "data updated successfully"})
      }
  })
})

//update hsd price

router.put("/update/hsd/:id", (req, res) => {
  const {id} = req.params;
  const {hsd_price} = req.body;

const updateHsdFuelPrices = "update fuel_price set hsd_price = ? where id =?";

db.query(updateHsdFuelPrices, [hsd_price, id], (err, result) => {
    if(err){
      res.status(400).json({"Message":"problem raised while updating fuel prices", "error": err})
    }
    else{
      res.status(200).json({"Message": "data updated successfully"})
    }
})
})

export default router;