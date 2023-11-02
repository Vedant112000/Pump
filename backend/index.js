import express from 'express'
const app = express();


import employeeRoutes from './routes/employeeRoutes.js'
import creditorRoutes from './routes/creditorRoutes.js'
import latestClosingRoutes from './routes/latestClosingRoutes.js'
 import fuelPriceRoutes from './routes/fuelPriceRoutes.js'
import shiftRoutes from './routes/shiftRoutes.js'
import userRoutes from './routes/userRoutes.js'
import dailyCollection from './routes/dailyCollectionRoutes.js'

//middleware
app.use("/employee", employeeRoutes)
app.use("/creditor",creditorRoutes)
app.use("/closing",latestClosingRoutes)
app.use("/fuel",fuelPriceRoutes)
app.use("/shifts", shiftRoutes)
app.use("/users",userRoutes)
app.use("/collections", dailyCollection)
//build the server

app.listen(5000, () => {
  console.log("server is up and running");
})

