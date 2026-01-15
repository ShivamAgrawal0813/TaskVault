import Task from "../models/Task.js";

export const createTask = async (req, res) => {
    try {

        const userId = req.user.userId;

        const {title, status, description} = req.body;

        if(!title){
            return res.status(400).json({
                success : false,
                message : "Task title is required"
            });
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
            task
        });
    }catch(error){
        console.error("Create task error:",error);
        return res.status(500).json({
            success : false,
            message : "Internal server error"
        });
    }
};