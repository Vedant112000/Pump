import express from 'express';
import db from '../db.js';
import cors from 'cors';

const router = express.Router();

//use middleware

router.use(express.json());
router.use(cors());

//to get all shift data

router.get("/get", (req, res) => {
    const getShifts = "SELECT * FROM shifts";

    db.query(getShifts, (err, result) => {
        if(err){
          res.status(400).json({"Message": "problem raised during fetching shifts", "error": err})
        }
        else{
          res.status(200).json({"data": result});
        }
    })
})



export default router;