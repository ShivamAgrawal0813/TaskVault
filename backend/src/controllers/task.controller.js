import Task from "../models/Task.js";
import AppError from "../utils/AppError.js";

export const createTask = async (req, res, next) => {
    try {

        const userId = req.user.userId;

        const {title, status, description} = req.body;

        if(!title){
            // return res.status(400).json({
            //     success : false,
            //     message : "Task title is required"
            // });
            throw new AppError("Task title is required", 400);
        }

        const task = await Task.create({
            title,
            status,
            description,
            user : userId
        });

        return res.status(201).json({
            success : true,
            message : "Task created successfully",
            task,
        });
    }catch(error){
        next(error);
    }
};

export const getTasks = async (req, res, next) => {
    try{

        const userId = req.user.userId;

        const tasks = await Task.find({user : userId}).sort({
            created_at : -1
        });

        return res.status(200).json({
            success : true,
            count : tasks.length,
            tasks,
        });
    }catch(error){
        next(error);
    }
};

export const updateTask = async (req, res, next) => {
    try{

        const taskId = req.params.id;

        const userId = req.user.userId;

        const {title, status, description} = req.body;

        const updateData = {};

        if(title !== undefined) updateData.title = title;
        if(status !== undefined) updateData.status = status;
        if(description !== undefined) updateData.description = description;

        const updatedTask = await Task.findOneAndUpdate(
            {_id : taskId, user : userId},
            updateData,
            {new: true, runValidators:true}
        );

        if(!updatedTask){
            // return res.status(404).json({
            //     success : false,
            //     message : "Task not found or access denied"
            // });
            throw new AppError("Task not found or access denied", 404);
        }

        return res.status(200).json({
            success : true,
            message : "Task updated successfully",
            task : updatedTask,
        });

    }catch(error){
        next(error);
    }
};

export const deleteTask = async (req, res, next) => {
    try{

        const taskId = req.params.id;

        const userId = req.user.userId;

        const deletedTask = await Task.findOneAndDelete({
            _id : taskId,
            user : userId
        });

        if(!deletedTask){
            // return res.status(404).json({
            //     success : false,
            //     message : "Task not found or access denied"
            // });
            throw new AppError("Task not found or access denied", 404);
        }

        return res.status(200).json({
            success : true,
            message : "Task deleted successfully"
        });


    }catch(error){
        next(error);
    }
}