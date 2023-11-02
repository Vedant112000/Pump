import mySql from 'mysql2';



const db = mySql.createPool({
  host: "localhost",
  user: "root",
  password: "root",
  database:"petrol_pump",
})

export default db;