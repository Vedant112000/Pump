import express from 'express';
import db from '../db.js';
import cors from 'cors';

const router = express.Router();

//use middleware to convert the request json object into js object

router.use(express.json());
router.use(cors());

//request to get all the data

router.get("/get", (req, res) => {
  const getAllClosing = "SELECT * FROM latestclosing";

  db.query(getAllClosing, (err, result) => {
      if(err){
        res.status(400).json({"Message":"problem raised while fetching data", "error": err});
      }
      else{
        res.status(200).json({"count": result.length, "Data": result});
      }
  })
})

//get the specific mpd data

router.get("/get/:closingId", (req, res) => {
  const {closingId} = req.params;

  const getSingleClosing = "SELECT * FROM latestclosing where closingId=?";
  db.query(getSingleClosing, closingId, (err, result) => {
      if(err){
        res.status(400).json({"Message":"problem raised while fetching data", "error": err})
      }else{
        res.status(200).json({"Data": result});
      }
  })

})

//update the closing of hsd and ms only

router.put("/update/:closingId", (req, res) => {
  const {closingId} = req.params;
  const {hsd_closing, ms_closing} = req.body;

  const updateClosing = "UPDATE latestclosing SET hsd_closing=?, ms_closing=? WHERE closingId = ?";

  db.query(updateClosing, [hsd_closing, ms_closing, closingId], (err, result) => {
    if(err){
      res.status(400).json({"Message":"problem raised while updating closing data", "error": err})
    }
    else{
      res.status(200).json({"Message": "closing data updated successfully"});
    }
  })
  
})

export default router;