import type { Request, Response, NextFunction } from "express";
import type { DecodedIdToken } from "firebase-admin/auth";

import { auth } from "../utils/firebaseAdmin";

export interface AuthedRequest extends Request {
  user?: DecodedIdToken;
}

const getTokenFromHeader = (authorizationHeader: string | undefined): string | null => {
  if (!authorizationHeader) {
    return null;
  }

  const [scheme, token] = authorizationHeader.split(" ");
  if (scheme?.toLowerCase() !== "bearer" || !token) {
    return null;
  }

  return token;
};

export const requireAuth = async (req: Request, res: Response, next: NextFunction) => {
  const token = getTokenFromHeader(req.headers.authorization);

  if (!token) {
    res.status(401).json({ error: "Missing Bearer token." });
    return;
  }

  try {
    const decoded = await auth.verifyIdToken(token, true);
    (req as AuthedRequest).user = decoded;
    next();
  } catch (error) {
    console.error("Failed to authenticate", error);
    res.status(401).json({ error: "Invalid or expired token." });
  }
};

const extractRoles = (decoded: DecodedIdToken): string[] => {
  const claim = decoded.roles;

  if (Array.isArray(claim)) {
    return claim.filter((role) => typeof role === "string");
  }

  if (typeof claim === "string") {
    return [claim];
  }

  return [];
};

export const requireRole = (role: string) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const user = (req as AuthedRequest).user;

    if (!user) {
      res.status(401).json({ error: "Authentication required." });
      return;
    }

    const roles = extractRoles(user);
    if (!roles.includes(role)) {
      res.status(403).json({ error: "Insufficient permissions." });
      return;
    }

    next();
  };
};
