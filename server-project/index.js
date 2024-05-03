const express = require("express");

const userRouter = require("./routes/UserRoute");
const truckRouter = require("./routes/TruckRoute");

const app = express();

const cors = require("cors");

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/v1/users", userRouter);
app.use("/api/v1/trucks", truckRouter);

app.listen(3002, () => {
  console.log("Server is running on http://localhost:3002");
});
