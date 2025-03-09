import { validationResult } from "express-validator";

const errorHandler = (err, req, res, next) => {
  if (err) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const statusCode = err.statusCode || 500;
    const msg = err.message || "Internal Server Error";

    res.status(statusCode).json({
      errors: [{ msg }],
      stack: process.env.NODE_ENV === "production" ? null : err.stack,
    });
  } else {
    next();
  }
};

export default errorHandler;
