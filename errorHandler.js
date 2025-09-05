// middleware/errorHandler.js
function errorHandler(err, req, res, next) {
// If the error is coming from express-validator, it will be handled in-route.
// This middleware handles unexpected (server) errors in a consistent way.


console.error(err.stack);


const isDev = process.env.NODE_ENV !== "production";


res.status(err.status || 500).json({
success: false,
message: err.message || "Internal Server Error",
// include stack only in development
...(isDev && { stack: err.stack })
});
}


module.exports = errorHandler;