import express from 'express';

const userRouter = require("./routes/user");
const app = express();

const cors = require ('cors');

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/v1/users", userRouter);

app.listen(3002, () => {
    console.log("Server is running on http://localhost:3002");
});