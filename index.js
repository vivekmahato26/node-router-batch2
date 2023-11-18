require("dotenv").config();
const express = require("express");
const {json,urlencoded} = require("express");
const cors = require("cors");
const userRouter = require("./routes/userRouter");
const auth = require("./middlewares/auth");

const app = express();
app.use(cors());
app.use(json());
app.use(urlencoded({extended:true}));
app.use(auth);

app.use("/users",userRouter);

app.listen(4000, ()=>console.log("Server running at port 4000"));