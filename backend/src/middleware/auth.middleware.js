import jwt from "jsonwebtoken";
import AppError from "../utils/AppError.js";

const authMiddleware = (req, res, next) => {

    try {

        const authHeader = req.headers.authorization;

        if (!authHeader) {
            // return res.status(401).json({
            //     success: false,
            //     message: "Authentication token missing"
            // });
            throw new AppError("Authentication token missing", 401);
        }

        const token = authHeader.split(" ")[1];

        if(!token){
            // return res.status(401).json({
            //     success : false,
            //     message : "Authentication token malformed"
            // });
            throw new AppError("Authentication token malformed", 401);
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        req.user = decoded;

        next();

    }catch(error){

       next(new AppError("Invalid or expired token", 401));
    }    
};

export default authMiddleware;