import express from "express";
import cors from "cors";
import todo_router from "./routes/todo_router.js"

import dotenv from "dotenv";
import { connectDB } from "./config/db.js";
dotenv.config();

const app=express();
const port=process.env.PORT  || 3000;

//middleware
app.use(cors());
app.use(express.json());

// Connect to database 
connectDB();



// Defining all routes from todor_route
app.use('/',todo_router)






// Server 
app.listen(port,()=>{
    console.log("Server is Runiing At port number 3000")
});