const errorHandler = (err, req, res, next) => {
    const statusCode = err.status || 500;

    if (process.env.NODE_ENV === 'development') {
        console.error('Error:', err);
    }

    res.status(statusCode).json({
        success: false,
        message: err.message || 'Internal Server Error',
        errors: err.errors || null,
    });
};

export default errorHandler;
