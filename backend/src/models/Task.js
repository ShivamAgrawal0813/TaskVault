import mongoose from "mongoose";

const taskSchema = new mongoose.Schema(
    {
        title : {
            type : String,
            required : [true, "Title is required"],
            trim: true,
        },

        status : {
            type : String,
            required : true,
            enum : ["pending", "in-progress", "completed"],
            default : "pending"
        },

        description : {
            type : String,
            trim : true,
            default : ""
        },

        user : {
            type : mongoose.Schema.Types.ObjectId,
            ref : "User",
            required : true
        }
    },
    {
        timestamps : {
            createdAt : "created_at",
            updatedAt : "updated_at"
        }
    }
);

const Task = mongoose.model("Task", taskSchema);

export default Task;