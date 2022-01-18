import asyncHandler from "../utils/async";
import Session from "../models/Session.model";
import ErrorResponse from "../utils/errResponse";

// Protect routes
export default function protect() {
  return asyncHandler(async (req, res, next) => {
    let token: string = "";

    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      // Set token from Bearer token in header
      token = req.headers.authorization.split(" ")[1];
    }

    // Make sure token exists
    if (!token) {
      return next(
        new ErrorResponse("Not authorized to access this route", 401)
      );
    }

    try {
      // Verify token
      const session = await Session.find({ token });
      if (session) {
        return next();
      }
      return next(new ErrorResponse("Invalid Token", 401));
    } catch (err) {
      return next(
        new ErrorResponse("Not authorized to access this route", 401)
      );
    }
  });
}
