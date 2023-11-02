import express from 'express';
import db from '../db.js'
import cors from 'cors';

const router = express.Router();


//use middleware 

router.use(express.json());
router.use(cors());

//add employee into db

router.post("/add", (req,res) => {
      const {name, contact_details} = req.body;

      const addEmployee = "INSERT INTO employee (name, contact_details) VALUES (?,?)";

      db.query(addEmployee, [name, contact_details], (err, result) => {
          if(err){
            res.json({"message": err})
          }
          else{
            res.status(200).json({"data": name+" "+contact_details,"message": "added successfully"})
          }
      })
})

//read employee from db

router.get("/get", (req, res) => {

    const readAllEmployee = "SELECT * FROM employee";

    db.query(readAllEmployee, (err, result) => {
        if(err){
          res.status(400).json({"Message": "Problem raised while fetching employee data"})
        }else{
          res.status(200).json({"count": result.length, "data": result})
        }
    })
})

//read specific employee

router.get("/get/:empId", (req, res) => {
    const {empId} = req.params;

    const getEmployee = "SELECT * FROM EMPLOYEE WHERE empId = ?";

    db.query(getEmployee, empId, (err, result) => {
        if(err){
          res.status(400).json({"Message": "Problem raised while fetching employee data"})
        }else{
          res.status(200).json({"data": result})
        }
    })
})

//update employee 

router.put("/update/:empId", (req, res) => {
  const {empId} = req.params;
  const {name, contact_details} = req.body;

  const updateEmployee = "UPDATE employee SET name=?, contact_details=? WHERE empId = ?";

  db.query(updateEmployee, [name, contact_details, empId], (err, result) => {
      if(err){
        res.status(400).json({"Message": "Problem raised while fetching employee data"})
      }else{
        res.status(200).json({"Message": "Employee data updated"})
      }
  })
})

//delete employee 

router.delete("/delete/:empId", (req, res) => {
  const {empId} = req.params;

  const deleteEmployee = "DELETE FROM employee WHERE empId = ?";

  db.query(deleteEmployee, empId , (err, result) => {
      if(err){
        res.status(400).json({"Message": "Problem raised while fetching employee data"})
      }else{
        res.status(200).json({"Message": "Employee data deleted"})
      }
  })
})

export default router;    