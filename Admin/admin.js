(() => {
  if (typeof firebase === "undefined") {
    console.error("Firebase SDK not loaded. Ensure firebase-config.js is included before admin.js");
    return;
  }

  const auth = firebase.auth();
  const API_BASE = "/api";
  const statusOptions = [
    { value: "pending", label: "Pending" },
    { value: "confirmed", label: "Confirmed" },
    { value: "preparing", label: "Preparing" },
    { value: "out_for_delivery", label: "Out for delivery" },
    { value: "delivered", label: "Delivered" },
    { value: "cancelled", label: "Cancelled" }
  ];

  const ordersContainer = document.querySelector("#orders");
  const summaryContainer = document.querySelector("summary-card");
  const adminName = document.querySelector("#admin-name");
  const toast = document.querySelector(".toast");
  const refreshButton = document.querySelector("#refresh-orders");
  const signOutButton = document.querySelector("#sign-out");

  const showToast = (message) => {
    if (!toast) return;
    toast.textContent = message;
    toast.classList.add("show");
    setTimeout(() => toast.classList.remove("show"), 2800);
  };

  const renderSummary = (orders) => {
    if (!summaryContainer) return;

    const total = orders.length;
    const pending = orders.filter((order) => order.status === "pending").length;
    const delivering = orders.filter((order) => order.status === "out_for_delivery").length;
    const delivered = orders.filter((order) => order.status === "delivered").length;

    summaryContainer.innerHTML = `
      <div class="card">
        <div class="label">Total orders</div>
        <div class="value">${total}</div>
      </div>
      <div class="card">
        <div class="label">Pending</div>
        <div class="value">${pending}</div>
      </div>
      <div class="card">
        <div class="label">Out for delivery</div>
        <div class="value">${delivering}</div>
      </div>
      <div class="card">
        <div class="label">Delivered</div>
        <div class="value">${delivered}</div>
      </div>
    `;
  };

  const formatItems = (items) => {
    if (!Array.isArray(items) || items.length === 0) return "—";
    return items
      .map((item) => `${item.name} × ${item.quantity}`)
      .join("<br>");
  };

  const formatDate = (isoString) => {
    if (!isoString) return "—";
    const date = new Date(isoString);
    if (Number.isNaN(date.getTime())) return "—";
    return date.toLocaleString();
  };

  const renderOrders = (orders, token) => {
    if (!ordersContainer) return;

    if (!orders.length) {
      ordersContainer.innerHTML = `
        <div class="empty-state">
          <p>No orders yet. New orders will appear here.</p>
        </div>
      `;
      return;
    }

    const rows = orders
      .map((order) => {
        const options = statusOptions
          .map((option) => {
            const selected = option.value === order.status ? "selected" : "";
            return `<option value="${option.value}" ${selected}>${option.label}</option>`;
          })
          .join("");

        return `
          <div class="table-row" data-id="${order.id}">
            <div>
              <strong>${order.userId}</strong><br />
              <span class="order-items">${formatItems(order.items)}</span>
            </div>
            <span>${formatDate(order.createdAt)}</span>
            <span>${order.deliveryAddress}</span>
            <span>${order.contactPhone}</span>
            <span>
              <span class="status-pill ${order.status}">${order.status.replace(/_/g, " ")}</span>
            </span>
            <div>
              <select class="order-status" data-token="${token}">
                ${options}
              </select>
            </div>
          </div>
        `;
      })
      .join("");

    ordersContainer.innerHTML = `
      <div class="table-header">
        <span>Order</span>
        <span>Created</span>
        <span>Address</span>
        <span>Contact</span>
        <span>Status</span>
        <span>Action</span>
      </div>
      ${rows}
    `;

    document.querySelectorAll(".order-status").forEach((select) => {
      select.addEventListener("change", async (event) => {
        const row = event.target.closest(".table-row");
        if (!row) return;

        const orderId = row.dataset.id;
        const newStatus = event.target.value;
        await updateOrderStatus(orderId, newStatus);
        const pill = row.querySelector(".status-pill");
        if (pill) {
          pill.textContent = newStatus.replace(/_/g, " ");
          pill.className = `status-pill ${newStatus}`;
        }
      });
    });
  };

  const fetchOrders = async () => {
    const user = auth.currentUser;
    if (!user) return [];

    const token = await user.getIdToken();
    const response = await fetch(`${API_BASE}/orders?scope=all`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });

    if (!response.ok) {
      throw new Error(`Failed to load orders: ${response.status}`);
    }

    const payload = await response.json();
    renderOrders(payload.orders ?? [], token);
    renderSummary(payload.orders ?? []);
    return payload.orders ?? [];
  };

  const updateOrderStatus = async (orderId, status) => {
    const user = auth.currentUser;
    if (!user) return;

    const token = await user.getIdToken();
    const response = await fetch(`${API_BASE}/orders/${orderId}/status`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify({ status })
    });

    if (!response.ok) {
      showToast("Could not update status. Check the console for details.");
      console.error("Failed to update order", await response.text());
      return;
    }

    showToast("Order status updated");
    await fetchOrders();
  };

  const ensureAdmin = async (user) => {
    const tokenResult = await user.getIdTokenResult(true);
    const { roles } = tokenResult.claims;
    const normalized = Array.isArray(roles)
      ? roles
      : typeof roles === "string"
      ? [roles]
      : [];

    if (!normalized.includes("admin")) {
      document.body.innerHTML = `
        <div class="empty-state">
          <h2>Admin access required</h2>
          <p>Your account does not have admin permissions. Contact the project owner.</p>
          <button id="go-home">Go to homepage</button>
        </div>
      `;
      document.querySelector("#go-home")?.addEventListener("click", () => {
        window.location.assign("../Home/index.html");
      });
      return false;
    }

    if (adminName) {
      adminName.textContent = user.displayName || user.email || "Admin";
    }

    return true;
  };

  auth.onAuthStateChanged(async (user) => {
    if (!user) {
      window.location.replace("../Auth/login.html");
      return;
    }

    const hasAccess = await ensureAdmin(user);
    if (!hasAccess) {
      return;
    }

    try {
      await fetchOrders();
    } catch (error) {
      console.error(error);
      showToast("Unable to load orders. See console for details.");
    }
  });

  refreshButton?.addEventListener("click", async () => {
    try {
      await fetchOrders();
      showToast("Orders refreshed");
    } catch (error) {
      console.error(error);
      showToast("Unable to refresh orders.");
    }
  });

  signOutButton?.addEventListener("click", async () => {
    await auth.signOut();
    window.location.replace("../Auth/login.html");
  });
})();
