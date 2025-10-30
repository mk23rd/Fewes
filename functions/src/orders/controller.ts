import type { RequestHandler } from "express";
import {
  DocumentData,
  DocumentSnapshot,
  FieldValue,
  QueryDocumentSnapshot,
  Timestamp
} from "firebase-admin/firestore";

import type { AuthedRequest } from "../auth";
import { appConfig } from "../config";
import { firestore } from "../utils/firebaseAdmin";

export type OrderStatus =
  | "pending"
  | "confirmed"
  | "preparing"
  | "out_for_delivery"
  | "delivered"
  | "cancelled";

export interface OrderItem {
  id: string;
  name: string;
  quantity: number;
  unitPrice: number;
}

export interface OrderPayload {
  items: OrderItem[];
  deliveryAddress: string;
  contactPhone: string;
  scheduledFor?: string;
  notes?: string;
}

type FirestoreOrderRecord = {
  userId: string;
  status: OrderStatus;
  items: OrderItem[];
  deliveryAddress: string;
  contactPhone: string;
  scheduledFor?: Timestamp;
  notes?: string;
  createdAt: Timestamp;
  updatedAt: Timestamp;
};

const ordersCollection = firestore.collection(appConfig.ordersCollection);

const serializeOrder = (snapshot: DocumentSnapshot<DocumentData>) => {
  const rawData = snapshot.data() as FirestoreOrderRecord | undefined;

  if (!rawData) {
    return null;
  }

  return {
    id: snapshot.id,
    items: rawData.items,
    deliveryAddress: rawData.deliveryAddress,
    contactPhone: rawData.contactPhone,
    notes: rawData.notes,
    status: rawData.status,
    scheduledFor: rawData.scheduledFor?.toDate().toISOString(),
    createdAt: rawData.createdAt.toDate().toISOString(),
    updatedAt: rawData.updatedAt.toDate().toISOString(),
    userId: rawData.userId
  };
};

const isValidItem = (item: unknown): item is OrderItem => {
  if (typeof item !== "object" || item === null) {
    return false;
  }

  const candidate = item as Partial<OrderItem>;
  return (
    typeof candidate.id === "string" &&
    typeof candidate.name === "string" &&
    typeof candidate.quantity === "number" &&
    candidate.quantity > 0 &&
    typeof candidate.unitPrice === "number"
  );
};

const parseOrderPayload = (incoming: unknown): OrderPayload | null => {
  if (typeof incoming !== "object" || incoming === null) {
    return null;
  }

  const candidate = incoming as Partial<OrderPayload>;

  if (!Array.isArray(candidate.items) || candidate.items.length === 0) {
    return null;
  }

  if (typeof candidate.deliveryAddress !== "string" || candidate.deliveryAddress.length === 0) {
    return null;
  }

  if (typeof candidate.contactPhone !== "string" || candidate.contactPhone.length === 0) {
    return null;
  }

  const normalizedItems = candidate.items.filter(isValidItem) as OrderItem[];
  if (normalizedItems.length !== candidate.items.length) {
    return null;
  }

  const payload: OrderPayload = {
    items: normalizedItems,
    deliveryAddress: candidate.deliveryAddress,
    contactPhone: candidate.contactPhone
  };

  if (candidate.notes && typeof candidate.notes === "string") {
    payload.notes = candidate.notes;
  }

  if (candidate.scheduledFor) {
    const parsed = new Date(candidate.scheduledFor);
    if (!Number.isNaN(parsed.getTime())) {
      payload.scheduledFor = parsed.toISOString();
    }
  }

  return payload;
};

export const createOrder: RequestHandler = async (req, res) => {
  const authed = req as AuthedRequest;
  const payload = parseOrderPayload(authed.body);

  if (!payload || !authed.user?.uid) {
    res.status(400).json({ error: "Invalid order payload." });
    return;
  }

  try {
    const now = FieldValue.serverTimestamp();
    const scheduledFor = payload.scheduledFor
      ? Timestamp.fromDate(new Date(payload.scheduledFor))
      : undefined;

    const docRef = await ordersCollection.add({
      ...payload,
      scheduledFor,
      userId: authed.user.uid,
      status: "pending" as OrderStatus,
      createdAt: now,
      updatedAt: now
    });

    const snapshot = await docRef.get();
    const order = serializeOrder(snapshot);

    if (!order) {
      res.status(500).json({ error: "Order saved without payload." });
      return;
    }

    res.status(201).json(order);
  } catch (error) {
    console.error("Failed to create order", error);
    res.status(500).json({ error: "Unable to create order." });
  }
};

export const listOrders: RequestHandler = async (req, res) => {
  const authed = req as AuthedRequest;

  try {
    const querySnapshot = await ordersCollection
      .where("userId", "==", authed.user?.uid ?? "")
      .orderBy("createdAt", "desc")
      .get();

    const orders = querySnapshot.docs
      .map((doc) => serializeOrder(doc))
      .filter((entry): entry is NonNullable<ReturnType<typeof serializeOrder>> => entry !== null);

    res.json({ orders });
  } catch (error) {
    console.error("Failed to list orders", error);
    res.status(500).json({ error: "Unable to load orders." });
  }
};

export const getOrderById: RequestHandler = async (req, res) => {
  const authed = req as AuthedRequest;
  const orderId = (req.params as Record<string, string | undefined>).orderId ?? req.params.id;

  if (!orderId) {
    res.status(400).json({ error: "Order ID is required." });
    return;
  }

  try {
    const doc = await ordersCollection.doc(orderId).get();

    if (!doc.exists) {
      res.status(404).json({ error: "Order not found." });
      return;
    }

    const data = doc.data() as FirestoreOrderRecord;
    const userRoles = authed.user?.roles;
    const roles = Array.isArray(userRoles)
      ? userRoles
      : typeof userRoles === "string"
      ? [userRoles]
      : [];
    const isAdmin = roles.includes("admin");

    if (data.userId !== authed.user?.uid && !isAdmin) {
      res.status(403).json({ error: "Forbidden." });
      return;
    }

    const order = serializeOrder(doc);

    if (!order) {
      res.status(500).json({ error: "Order payload is missing." });
      return;
    }

    res.json(order);
  } catch (error) {
    console.error("Failed to load order", error);
    res.status(500).json({ error: "Unable to load order." });
  }
};

export const updateOrderStatus: RequestHandler = async (req, res) => {
  const orderId = (req.params as Record<string, string | undefined>).orderId ?? req.params.id;
  const { status } = req.body as { status?: OrderStatus };

  if (!orderId || !status) {
    res.status(400).json({ error: "Order ID and status are required." });
    return;
  }

  const allowedStatuses: OrderStatus[] = [
    "pending",
    "confirmed",
    "preparing",
    "out_for_delivery",
    "delivered",
    "cancelled"
  ];

  if (!allowedStatuses.includes(status)) {
    res.status(400).json({ error: "Unsupported order status." });
    return;
  }

  try {
    const document = ordersCollection.doc(orderId);
    await document.update({
      status,
      updatedAt: FieldValue.serverTimestamp()
    });

    const updated = await document.get();
    const order = serializeOrder(updated);

    if (!order) {
      res.status(500).json({ error: "Order payload is missing." });
      return;
    }

    res.json(order);
  } catch (error) {
    console.error("Failed to update order", error);
    res.status(500).json({ error: "Unable to update order." });
  }
};
