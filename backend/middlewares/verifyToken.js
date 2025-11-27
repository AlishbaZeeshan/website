import jwt from "jsonwebtoken";

const verifyToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1]; // Bearer <token>

  console.log(" JWT TOKEN VERIFICATION:");
  console.log("Route:", req.path);
  console.log("Token received:", token ? " Present" : " Missing");

  if (!token) {
    console.log(" No token provided");
    console.log("---");
    return res.status(401).json({ message: "Unauthorized: No token" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log(" Token verified successfully");
    console.log("Decoded payload:", decoded);
    console.log("---");
    req.user = decoded; // <-- this sets req.user.id & req.user.email
    next();
  } catch (error) {
    console.log(" Token verification failed:", error.message);
    console.log("---");
    return res.status(403).json({ message: "Forbidden: Invalid token" });
  }
};

export default verifyToken;
