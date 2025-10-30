import * as functions from "firebase-functions";
import express, { type Request, type Response } from "express";
import cors from "cors";

import { appConfig } from "./config";
import { requireAuth, requireRole } from "./auth";
import { createOrder, getOrderById, listOrders, updateOrderStatus } from "./orders/controller";

const app = express();

app.disable("x-powered-by");
app.use(cors({ origin: appConfig.allowedOrigins, credentials: true }));
app.use(express.json());

app.get("/health", (_req: Request, res: Response) => {
  res.json({ status: "ok" });
});

const ordersRouter = express.Router();

ordersRouter.post("/", createOrder);
ordersRouter.get("/", listOrders);
ordersRouter.get("/:id", getOrderById);
ordersRouter.patch("/:id/status", requireRole("admin"), updateOrderStatus);

app.use("/orders", requireAuth, ordersRouter);

export const api = functions
  .region(appConfig.defaultRegion)
  .runWith({ memory: "512MB", timeoutSeconds: 120 })
  .https.onRequest(app);
