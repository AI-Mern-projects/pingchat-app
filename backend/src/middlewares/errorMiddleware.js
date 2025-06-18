// middlewares/errorMiddleware.js

const errorHandler = (err, req, res, next) => {
  console.error("🔥 Error Name:", err.name);
  console.error("📍 Message:", err.message);
  console.error("📄 Stack Trace:\n", err.stack);

  const statusCode = res.statusCode === 200 ? 500 : res.statusCode;

  res.status(statusCode).json({
    success: false,
    message: err.message,
    stack: process.env.NODE_ENV === "development" ? err.stack : "🧪 There is issue in the server contact with the cocered person",
  });
};

export default errorHandler;
