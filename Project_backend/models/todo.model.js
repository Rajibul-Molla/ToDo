import mongoose from "mongoose";

const todoSchema = new mongoose.Schema(

    {
        id: {
      type: Number,
      default: () => Date.now() 
    },
        title:{
            type:String,
            required: [true, "Title is required"],
            trim: true
        },
    }
);
export default mongoose.model("Todo",todoSchema)