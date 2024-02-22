const express = require("express");
const app = express();
const cors = require("cors");
const dotenv = require("dotenv");
const mongoose = require("mongoose");

const userRouter =  require("./route/userRoutes");

dotenv.config();

app.use(express.json());
app.use(cors());

app.use("/users",userRouter);

app.get("/",(req,res)=>{
    res.send("Nutrients backend API");
});

const PORT = process.env.PORT || 5000;





mongoose.connect(process.env.MONGO_URL)
    .then(()=>{
        app.listen(PORT,()=>{
            console.log("Server started on port no. " + PORT);
        });
    })
    .catch((error)=>{
        console.log(error);
    });
