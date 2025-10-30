import type { DecodedIdToken } from "firebase-admin/auth";

declare global {
  namespace Express {
    // Augment Express request with the authenticated Firebase user payload.
    interface Request {
      user?: DecodedIdToken;
    }
  }
}

export {};
