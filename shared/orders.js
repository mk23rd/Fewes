(() => {
  if (typeof window === "undefined") {
    return;
  }

  const CART_STORAGE_KEY = "fewes_cart";

  const readCart = () => {
    try {
      const raw = window.localStorage.getItem(CART_STORAGE_KEY);
      if (!raw) {
        return [];
      }

      const parsed = JSON.parse(raw);
      if (!Array.isArray(parsed)) {
        return [];
      }

      return parsed
        .filter((entry) => typeof entry === "object" && entry !== null)
        .map((entry) => ({
          id: String(entry.id || ""),
          name: String(entry.name || ""),
          unitPrice: Number(entry.unitPrice) || 0,
          quantity: Number(entry.quantity) || 1
        }))
        .filter((entry) => entry.id && entry.name && entry.quantity > 0);
    } catch (error) {
      console.error("Unable to parse cart contents", error);
      return [];
    }
  };

  const writeCart = (items) => {
    try {
      window.localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(items));
      window.dispatchEvent(new CustomEvent("fewes-cart-updated", { detail: { items } }));
    } catch (error) {
      console.error("Unable to persist cart", error);
    }
  };

  const notifyHelpers = () => {
    if (window.FewesHelpers?.refreshCartIndicators) {
      window.FewesHelpers.refreshCartIndicators();
    }
  };

  const addItem = ({ id, name, unitPrice }) => {
    if (!id || !name) {
      return;
    }

    const items = readCart();
    const existing = items.find((item) => item.id === id);

    if (existing) {
      existing.quantity += 1;
    } else {
      items.push({ id, name, unitPrice: Number(unitPrice) || 0, quantity: 1 });
    }

    writeCart(items);
    notifyHelpers();
  };

  const setQuantity = (id, quantity) => {
    if (!id) {
      return;
    }

    const items = readCart();
    const next = items
      .map((item) => {
        if (item.id !== id) {
          return item;
        }

        return Object.assign({}, item, {
          quantity: Math.max(0, Number(quantity) || 0)
        });
      })
      .filter((item) => item.quantity > 0);

    writeCart(next);
    notifyHelpers();
  };

  const clearCart = () => {
    writeCart([]);
    notifyHelpers();
  };

  const removeItem = (id) => {
    if (!id) {
      return;
    }

    const items = readCart().filter((item) => item.id !== id);
    writeCart(items);
    notifyHelpers();
  };

  const getAuthToken = async () => {
    if (typeof firebase === "undefined" || !firebase.apps?.length) {
      throw new Error("Firebase SDK not available. Ensure firebase-config.js is loaded.");
    }

    const auth = firebase.auth();
    const user = auth.currentUser;
    if (!user) {
      throw new Error("You need to sign in before placing an order.");
    }

    return user.getIdToken();
  };

  const createOrder = async ({
    deliveryAddress,
    contactPhone,
    scheduledFor,
    notes,
    customerName,
    customerEmail
  }) => {
    const items = readCart();
    if (!items.length) {
      throw new Error("Your cart is empty.");
    }

    if (!deliveryAddress || !contactPhone) {
      throw new Error("Delivery address and contact phone are required.");
    }

    const payload = {
      items: items.map(({ id, name, unitPrice, quantity }) => ({
        id,
        name,
        unitPrice,
        quantity
      })),
      deliveryAddress,
      contactPhone,
      customerName,
      customerEmail,
      scheduledFor: scheduledFor || undefined,
      notes: notes || undefined
    };

    const token = await getAuthToken();
    const response = await fetch("/api/orders", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify(payload)
    });

    if (!response.ok) {
      const data = await response.json().catch(() => ({}));
      throw new Error(data.error || "Unable to place order.");
    }

    const result = await response.json();
    clearCart();
    return result;
  };

  const listOrders = async () => {
    const token = await getAuthToken();
    const response = await fetch("/api/orders", {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });

    if (!response.ok) {
      const data = await response.json().catch(() => ({}));
      throw new Error(data.error || "Unable to load orders.");
    }

    return response.json();
  };

  window.FewesCart = Object.assign(window.FewesCart || {}, {
    read: readCart,
    add: addItem,
    remove: removeItem,
    setQuantity,
    clear: clearCart,
    onUpdate: (callback) => {
      window.addEventListener("fewes-cart-updated", (event) => {
        callback(event.detail?.items || readCart());
      });
      callback(readCart());
    },
    createOrder,
    listOrders
  });
})();
