<<<<<<< HEAD
const express = require("express");

const userRouter = require("./routes/UserRoute");
const truckRouter = require("./routes/TruckRoute");

const app = express();

const cors = require("cors");

=======
import express from 'express';
import cors from 'cors';
import userRouter from "./routes/user.js"; 

const app = express();

>>>>>>> 083baca4e6ad28e6a5d70c0245a9777b8c05c8f4
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/v1/users", userRouter);
app.use("/api/v1/trucks", truckRouter);

app.listen(3002, () => {
  console.log("Server is running on http://localhost:3002");
});
