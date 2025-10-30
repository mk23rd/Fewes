import type { RequestHandler } from "express";
import { FieldValue } from "firebase-admin/firestore";

import type { AuthedRequest } from "../auth";
import { getRolesFromToken } from "../auth";
import { appConfig } from "../config";
import { ordersCollection, serializeOrder, type PaymentStatus } from "../orders/controller";

const splitName = (value: string | undefined) => {
  if (!value) {
    return { firstName: undefined, lastName: undefined };
  }

  const parts = value.trim().split(/\s+/).filter((part) => part.length > 0);
  if (parts.length === 0) {
    return { firstName: undefined, lastName: undefined };
  }

  const [first, ...rest] = parts;
  return {
    firstName: first,
    lastName: rest.length > 0 ? rest.join(" ") : undefined
  };
};

const mapChapaStatus = (status: unknown): PaymentStatus => {
  if (typeof status !== "string") {
    return "failed";
  }

  const normalized = status.toLowerCase();
  if (normalized === "success") {
    return "paid";
  }

  if (normalized === "pending" || normalized === "processing") {
    return "pending";
  }

  return "failed";
};

export const initializeChapaPayment: RequestHandler = async (req, res) => {
  const authed = req as AuthedRequest;
  const { orderId, returnUrl } = (authed.body ?? {}) as {
    orderId?: string;
    returnUrl?: string;
  };

  if (!orderId) {
    res.status(400).json({ error: "orderId is required." });
    return;
  }

  if (!authed.user) {
    res.status(401).json({ error: "Authentication required." });
    return;
  }

  const chapaConfig = appConfig.payments?.chapa;
  if (!chapaConfig?.secretKey) {
    res.status(503).json({ error: "Chapa integration is not configured." });
    return;
  }

  try {
    const docRef = ordersCollection.doc(orderId);
    const snapshot = await docRef.get();

    if (!snapshot.exists) {
      res.status(404).json({ error: "Order not found." });
      return;
    }

    const order = serializeOrder(snapshot);
    if (!order) {
      res.status(500).json({ error: "Order payload missing." });
      return;
    }

    const roles = getRolesFromToken(authed.user);
    const isAdmin = roles.includes("admin");
    if (order.userId !== authed.user.uid && !isAdmin) {
      res.status(403).json({ error: "Forbidden." });
      return;
    }

    if (!order.pricing || order.pricing.total <= 0) {
      res.status(400).json({ error: "Order total must be greater than zero." });
      return;
    }

    if (order.payment?.status === "paid") {
      res.status(400).json({ error: "Order is already paid." });
      return;
    }

    if (order.payment?.status === "pending" && order.payment.checkoutUrl) {
      res.json({
        checkoutUrl: order.payment.checkoutUrl,
        txRef: order.payment.txRef,
        order
      });
      return;
    }

    const txRef = `fewes-${orderId}-${Date.now()}`;
    const { firstName, lastName } = splitName(order.customerName ?? authed.user.name ?? undefined);
    const targetReturnUrl =
      typeof returnUrl === "string" && returnUrl.trim().length > 0
        ? returnUrl.trim()
        : chapaConfig.returnUrl ?? undefined;

    const initializePayload = {
      amount: order.pricing.total.toFixed(2),
      currency: appConfig.payments.currency,
      email: order.customerEmail ?? authed.user.email ?? undefined,
      first_name: firstName,
      last_name: lastName,
      phone_number: order.contactPhone,
      tx_ref: txRef,
      callback_url: chapaConfig.callbackUrl,
      return_url: targetReturnUrl,
      customization: {
        title: "Fewes Meal Kits",
        description: `Payment for order ${orderId}`
      },
      meta: {
        orderId,
        userId: authed.user.uid
      }
    };

    const response = await fetch(`${chapaConfig.baseUrl}/v1/transaction/initialize`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${chapaConfig.secretKey}`
      },
      body: JSON.stringify(initializePayload)
    });

    const data = await response.json().catch(() => ({}));

    if (!response.ok || data?.status?.toLowerCase?.() !== "success") {
      const message = typeof data?.message === "string" ? data.message : "Unable to initialize payment.";
      console.error("Chapa initialize failed", data);
      res.status(502).json({ error: message });
      return;
    }

    const checkoutUrl: string | undefined = data?.data?.checkout_url;
    const receiptUrl: string | undefined = data?.data?.receipt_url;

    if (!checkoutUrl) {
      res.status(502).json({ error: "Missing checkout URL from Chapa." });
      return;
    }

    const paymentUpdate: Record<string, unknown> = {
      provider: "chapa",
      status: "pending",
      txRef,
      updatedAt: FieldValue.serverTimestamp(),
      checkoutUrl
    };

    if (receiptUrl) {
      paymentUpdate.receiptUrl = receiptUrl;
    }

    await docRef.update({
      payment: paymentUpdate,
      updatedAt: FieldValue.serverTimestamp()
    });

    const refreshed = await docRef.get();
    const refreshedOrder = serializeOrder(refreshed);

    res.json({ checkoutUrl, txRef, receiptUrl, order: refreshedOrder });
  } catch (error) {
    console.error("Failed to initialize Chapa payment", error);
    res.status(500).json({ error: "Unable to initialize payment." });
  }
};

export const verifyChapaPayment: RequestHandler = async (req, res) => {
  const authed = req as AuthedRequest;
  const { orderId, txRef } = (authed.body ?? {}) as {
    orderId?: string;
    txRef?: string;
  };

  if (!orderId || !txRef) {
    res.status(400).json({ error: "orderId and txRef are required." });
    return;
  }

  if (!authed.user) {
    res.status(401).json({ error: "Authentication required." });
    return;
  }

  const chapaConfig = appConfig.payments?.chapa;
  if (!chapaConfig?.secretKey) {
    res.status(503).json({ error: "Chapa integration is not configured." });
    return;
  }

  try {
    const docRef = ordersCollection.doc(orderId);
    const snapshot = await docRef.get();

    if (!snapshot.exists) {
      res.status(404).json({ error: "Order not found." });
      return;
    }

    const order = serializeOrder(snapshot);
    if (!order) {
      res.status(500).json({ error: "Order payload missing." });
      return;
    }

    const roles = getRolesFromToken(authed.user);
    const isAdmin = roles.includes("admin");
    if (order.userId !== authed.user.uid && !isAdmin) {
      res.status(403).json({ error: "Forbidden." });
      return;
    }

    const response = await fetch(`${chapaConfig.baseUrl}/v1/transaction/verify/${encodeURIComponent(txRef)}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${chapaConfig.secretKey}`
      }
    });

    const data = await response.json().catch(() => ({}));

    if (!response.ok || !data?.data) {
      const message = typeof data?.message === "string" ? data.message : "Unable to verify payment.";
      res.status(502).json({ error: message });
      return;
    }

    const paymentStatus = mapChapaStatus(data.data.status);
    const receiptUrl: string | undefined = data.data?.receipt_url ?? order.payment?.receiptUrl;
    const checkoutUrl: string | undefined =
      order.payment?.checkoutUrl ?? data.data?.checkout_url ?? undefined;

    const paymentUpdate: Record<string, unknown> = {
      provider: "chapa",
      status: paymentStatus,
      txRef,
      updatedAt: FieldValue.serverTimestamp()
    };

    if (checkoutUrl) {
      paymentUpdate.checkoutUrl = checkoutUrl;
    }

    if (receiptUrl) {
      paymentUpdate.receiptUrl = receiptUrl;
    }

    const updates: Record<string, unknown> = {
      payment: paymentUpdate,
      updatedAt: FieldValue.serverTimestamp()
    };

    if (paymentStatus === "paid" && order.status === "pending") {
      updates.status = "confirmed";
    }

    await docRef.update(updates);

    const refreshed = await docRef.get();
    const refreshedOrder = serializeOrder(refreshed);

    res.json({ order: refreshedOrder, paymentStatus });
  } catch (error) {
    console.error("Failed to verify Chapa payment", error);
    res.status(500).json({ error: "Unable to verify payment." });
  }
};
