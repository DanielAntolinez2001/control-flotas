import express from 'express';
import cors from 'cors';
import userRouter from "./routes/UserRoute.js"; 
import truckRouter from "./routes/TruckRoute.js"; 

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/v1/users", userRouter);
app.use("/api/v1/trucks", truckRouter);

app.listen(3002, () => {
  console.log("Server is running on http://localhost:3002");
});
