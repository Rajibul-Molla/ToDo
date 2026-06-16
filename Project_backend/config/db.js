import mongoose from "mongoose";
import dns from "node:dns/promises";
 
export const connectDB = async ()=>{
    try{
        await mongoose.connect(process.env.MONGO_URI);
        console.log("Mongo Db Connected Sucessfully")

    }
    catch(err){
        console.log("Error in Mongo DB Connection");
        console.error(err.message)
        process.exit(1)
    }
}