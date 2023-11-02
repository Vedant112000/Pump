import express from 'express';
import db from '../db.js';

const router = express.Router();

//use middleware
router.use(express.json());

//add user into db

router.post("/add", (req, res) => {
    const {username, password} = req.body;

    const addUser = "INSERT INTO USERS (username, password) VALUES (?,?)";

    db.query(addUser, [username, password], (err, result) => {
        if(err){
          res.status(400).json({"message": err});
        }
        else{
          res.status(200).json({"data": result});
        }
    })
})

//read single user username

router.get("/getUsername/:userId", (req, res) => {
    const {userId} = req.params;

    const getUser = "SELECT username from users where userId=?";

    db.query(getUser, userId, (err, result) => {
      if(err){
        res.status(400).json({"message": err});
      }
      else{
        res.status(200).json({"data": result});
      }
    })
})

//read single user data

router.get("/get/:userId", (req, res) => {
  const {userId} = req.params;

  const getUser = "SELECT * from users where userId=?";

  db.query(getUser, userId, (err, result) => {
    if(err){
      res.status(400).json({"message": err});
    }
    else{
      res.status(200).json({"data": result});
    }
  })
})

export default router;