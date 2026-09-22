import jwt from "jsonwebtoken";
import { AppError } from "../utils/AppError.js";

export const authenticate = (req, res, next) => {
  try {
    const token = req.cookies.token;

    if (!token) {
      throw new AppError("Authentication required", 401);
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    req.user = {
      id: decoded.userId,
    };

    next();
  } catch (error) {
    if (error.name === "JsonWebTokenError") {
      return next(new AppError("Invalid token", 401));
    }

    if (error.name === "TokenExpiredError") {
      return next(new AppError("Token expired", 401));
    }

    next(error);
  }
};
