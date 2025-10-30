const helpers = window.FewesHelpers;
const cartApi = window.FewesCart;
const payments = window.FewesPayments;

const auth = helpers?.getAuthInstance ? helpers.getAuthInstance() : null;

const nameField = document.getElementById("profile-name");
const emailField = document.getElementById("profile-email");
const avatarField = document.getElementById("profile-avatar");
const uidField = document.getElementById("profile-uid");
const providerField = document.getElementById("profile-provider");
const ordersList = document.getElementById("orders-list");
const ordersEmpty = document.getElementById("orders-empty");
const ordersError = document.getElementById("orders-error");
const refreshButton = document.getElementById("refresh-orders");
const signOutButton = document.getElementById("sign-out");

const formatCurrency = (amount, currency = "ETB") => {
  try {
    return new Intl.NumberFormat(undefined, {
      style: "currency",
      currency,
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    }).format(amount);
  } catch (_error) {
    return `${amount.toFixed(2)} ${currency}`;
  }
};

const formatDateTime = (value) => {
  if (!value) {
    return "";
  }

  const parsed = new Date(value);
  if (Number.isNaN(parsed.getTime())) {
    return value;
  }

  return parsed.toLocaleString(undefined, {
    dateStyle: "medium",
    timeStyle: "short"
  });
};

const truncate = (value, length = 6) => {
  if (!value) {
    return "";
  }

  return value.length > length ? `${value.slice(0, length)}…` : value;
};

const renderUser = (user) => {
  if (!user) {
    return;
  }

  const displayName = user.displayName || user.email || "Fewes Customer";
  nameField.textContent = displayName;
  emailField.textContent = user.email || "";

  const initial = displayName.trim().charAt(0) || "F";
  avatarField.textContent = initial.toUpperCase();

  uidField.textContent = `UID: ${truncate(user.uid, 12)}`;

  const providerId = user.providerData?.[0]?.providerId ?? "password";
  providerField.textContent = `Sign-in: ${providerId}`;
};

const clearOrders = () => {
  ordersList.innerHTML = "";
  ordersEmpty.hidden = true;
  ordersError.hidden = true;
  ordersError.textContent = "";
};

const renderOrders = (orders) => {
  clearOrders();

  if (!orders || orders.length === 0) {
    ordersEmpty.hidden = false;
    return;
  }

  orders.forEach((order) => {
    const card = document.createElement("article");
    card.className = "order-card";
    card.dataset.orderId = order.id;

    const statusLabel = document.createElement("span");
    statusLabel.className = `status ${order.status}`;
    statusLabel.textContent = order.status.replace(/_/g, " ");

    const header = document.createElement("div");
    header.className = "order-header";
    const title = document.createElement("h3");
    title.textContent = `Order #${truncate(order.id)}`;
    header.append(title, statusLabel);

    const details = document.createElement("div");
    details.className = "order-details";
    const created = document.createElement("span");
    created.textContent = `Placed: ${formatDateTime(order.createdAt)}`;
    const scheduled = document.createElement("span");
    if (order.scheduledFor) {
      scheduled.textContent = `Scheduled for: ${formatDateTime(order.scheduledFor)}`;
    }
    const delivery = document.createElement("span");
    delivery.textContent = `Deliver to: ${order.deliveryAddress}`;
    details.append(created, delivery);
    if (scheduled.textContent) {
      details.appendChild(scheduled);
    }

    const itemsList = document.createElement("ul");
    itemsList.className = "order-items";
    order.items.forEach((item) => {
      const li = document.createElement("li");
      li.innerHTML = `<span>${item.quantity} × ${item.name}</span><span>${formatCurrency(
        item.unitPrice,
        order.pricing?.currency
      )}</span>`;
      itemsList.appendChild(li);
    });

    const meta = document.createElement("div");
    meta.className = "order-meta";

    if (order.pricing) {
      const subtotal = document.createElement("span");
      subtotal.innerHTML = `<strong>Subtotal:</strong> ${formatCurrency(
        order.pricing.subtotal,
        order.pricing.currency
      )}`;
      const fees = document.createElement("span");
      fees.innerHTML = `<strong>Service fee:</strong> ${formatCurrency(
        order.pricing.serviceFee,
        order.pricing.currency
      )}`;
      const total = document.createElement("span");
      total.innerHTML = `<strong>Total:</strong> ${formatCurrency(
        order.pricing.total,
        order.pricing.currency
      )}`;
      meta.append(subtotal, fees, total);
    }

    const paymentRow = document.createElement("span");
    const paymentStatus = order.payment?.status ?? "unpaid";
    const paymentLabel = document.createElement("strong");
    paymentLabel.textContent = "Payment:";

    const paymentStatusSpan = document.createElement("span");
    paymentStatusSpan.className = `payment-status ${paymentStatus}`;
    paymentStatusSpan.textContent = paymentStatus.replace(/_/g, " ");

    paymentRow.append(paymentLabel, " ", paymentStatusSpan);

    if (order.payment?.txRef) {
      paymentRow.append(` · Ref: ${order.payment.txRef}`);
    }

    if (order.payment?.receiptUrl) {
      const receiptLink = document.createElement("a");
      receiptLink.href = order.payment.receiptUrl;
      receiptLink.target = "_blank";
      receiptLink.rel = "noopener";
      receiptLink.textContent = "Receipt";
      receiptLink.className = "receipt-link";
      paymentRow.append(" · ", receiptLink);
    }

    meta.appendChild(paymentRow);

    const actions = document.createElement("div");
    actions.className = "order-actions";

    if (payments?.initializeChapa && paymentStatus !== "paid") {
      const payBtn = document.createElement("button");
      payBtn.type = "button";
      payBtn.className = "pay-btn";
      payBtn.dataset.action = "pay";
      payBtn.dataset.orderId = order.id;
      payBtn.textContent = "Pay with Chapa";
      actions.appendChild(payBtn);
    }

    if (payments?.verifyChapa && order.payment?.txRef && paymentStatus !== "paid") {
      const verifyBtn = document.createElement("button");
      verifyBtn.type = "button";
      verifyBtn.className = "verify-btn";
      verifyBtn.dataset.action = "verify";
      verifyBtn.dataset.orderId = order.id;
      verifyBtn.dataset.txRef = order.payment.txRef;
      verifyBtn.textContent = "Verify Payment";
      actions.appendChild(verifyBtn);
    }

    card.append(header, details, itemsList, meta);
    if (actions.childElementCount > 0) {
      card.appendChild(actions);
    }

    ordersList.appendChild(card);
  });
};

const loadOrders = async () => {
  if (!cartApi?.listOrders) {
    ordersError.hidden = false;
    ordersError.textContent = "Orders service is unavailable.";
    return;
  }

  ordersList.setAttribute("aria-busy", "true");
  ordersError.hidden = true;
  ordersError.textContent = "";

  try {
    const response = await cartApi.listOrders();
    const orders = Array.isArray(response?.orders) ? response.orders : [];
    renderOrders(orders);
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unable to load orders.";
    ordersError.hidden = false;
    ordersError.textContent = message;
  } finally {
    ordersList.removeAttribute("aria-busy");
  }
};

const redirectToLogin = () => {
  window.location.replace("../Auth/login.html");
};

if (!auth) {
  redirectToLogin();
} else {
  auth.onAuthStateChanged((user) => {
    if (!user) {
      redirectToLogin();
      return;
    }

    renderUser(user);
    loadOrders();
  });
}

if (signOutButton && auth) {
  signOutButton.addEventListener("click", async () => {
    signOutButton.disabled = true;
    signOutButton.textContent = "Signing out...";
    try {
      await auth.signOut();
    } catch (error) {
      console.error("Failed to sign out", error);
      window.location.href = "../Auth/login.html";
    }
  });
}

if (refreshButton) {
  refreshButton.addEventListener("click", () => {
    loadOrders();
  });
}

if (ordersList) {
  ordersList.addEventListener("click", async (event) => {
    const target = event.target.closest("button[data-action]");
    if (!target) {
      return;
    }

    const orderId = target.dataset.orderId;
    if (!orderId) {
      return;
    }

    if (target.dataset.action === "pay") {
      if (!payments?.initializeChapa) {
        return;
      }

      target.disabled = true;
      target.textContent = "Redirecting...";
      try {
        const initResponse = await payments.initializeChapa({
          orderId,
          returnUrl: window.location.href
        });

        if (initResponse?.checkoutUrl) {
          window.location.href = initResponse.checkoutUrl;
          return;
        }

        throw new Error("Payment link unavailable.");
      } catch (error) {
        const message = error instanceof Error ? error.message : "Unable to start payment.";
        ordersError.hidden = false;
        ordersError.textContent = message;
        target.disabled = false;
        target.textContent = "Pay with Chapa";
      }
    }

    if (target.dataset.action === "verify") {
      if (!payments?.verifyChapa) {
        return;
      }

      const txRef = target.dataset.txRef;
      if (!txRef) {
        return;
      }

      target.disabled = true;
      target.textContent = "Verifying...";
      try {
        await payments.verifyChapa({ orderId, txRef });
        await loadOrders();
      } catch (error) {
        const message = error instanceof Error ? error.message : "Unable to verify payment.";
        ordersError.hidden = false;
        ordersError.textContent = message;
      } finally {
        target.disabled = false;
        target.textContent = "Verify Payment";
      }
    }
  });
}

window.FewesProfile = {
  loadOrders
};
