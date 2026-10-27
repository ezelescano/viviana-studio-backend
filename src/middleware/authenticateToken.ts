import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { Role } from "@prisma/client";
import { JWT_SECRET } from "../configs/envs.js";
import { tokenBlacklist } from "../utils/blackList.js";

interface TokenPayload {
  id: string;
  role: Role;
}

export const authenticateToken = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res
      .status(401)
      .json({ message: "Authentication required: No token provided" });
  }

  const parts = authHeader.split(" ");
  if (parts.length !== 2 || parts[0] !== "Bearer") {
    return res.status(401).json({
      message: "Invalid authorization format. Format must be: Bearer <token>",
    });
  }

  const token = parts[1];
  if (!token) {
    return res
      .status(401)
      .json({ message: "Authentication required: No token provided" });
  }

  if (tokenBlacklist.has(token)) {
    return res.status(401).json({ message: "Token has been revoked" });
  }

  if (!JWT_SECRET) {
    return res.status(500).json({ message: "JWT secret is not configured" });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET) as jwt.JwtPayload;

    if (
      !decoded ||
      typeof decoded !== "object" ||
      typeof decoded.id !== "string" ||
      (decoded.role !== Role.ADMIN && decoded.role !== Role.EMPLOYEE)
    ) {
      return res.status(401).json({ message: "Invalid token payload" });
    }

    const payload = decoded as unknown as TokenPayload;

    req.user = {
      id: payload.id,
      role: payload.role,
    };
    req.token = token;

    next();
  } catch (error) {
    if (error instanceof jwt.TokenExpiredError) {
      return res.status(401).json({ message: "Token expired" });
    }

    if (error instanceof jwt.JsonWebTokenError) {
      return res.status(401).json({ message: "Invalid token" });
    }

    return res.status(401).json({ message: "Authentication failed" });
  }
};

