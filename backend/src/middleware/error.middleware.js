const errorHandler = (err, req, res, next) => {
    const statusCode = err.statusCode || 500;
    const message = err.message || "Internal server error";

    console.error("Error:",err);

    res.status(statusCode).json({
        success : false,
        message,
        statusCode,
    });
};

export default errorHandler;