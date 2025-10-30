(() => {
  if (typeof window === "undefined") {
    return;
  }

  const ensureFirebase = () => {
    if (typeof firebase === "undefined") {
      console.warn("Firebase SDK not loaded. shared/payments.js requires firebase-app-compat.js before this script.");
      return null;
    }

    if (!firebase.apps || firebase.apps.length === 0) {
      console.warn("Firebase app is not initialized. Ensure firebase-config.js runs before shared/payments.js.");
      return null;
    }

    return firebase;
  };

  const firebaseInstance = ensureFirebase();
  if (!firebaseInstance) {
    return;
  }

  const auth = firebaseInstance.auth();

  const getAuthToken = async () => {
    const user = auth.currentUser;
    if (!user) {
      throw new Error("Sign in to continue.");
    }

    return user.getIdToken();
  };

  const postJson = async (url, body) => {
    const token = await getAuthToken();
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify(body)
    });

    if (!response.ok) {
      const data = await response.json().catch(() => ({}));
      throw new Error(data.error || "Request failed.");
    }

    return response.json();
  };

  const initializeChapa = async ({ orderId, returnUrl }) => {
    if (!orderId) {
      throw new Error("orderId is required.");
    }

    return postJson("/api/payments/chapa/initialize", { orderId, returnUrl });
  };

  const verifyChapa = async ({ orderId, txRef }) => {
    if (!orderId || !txRef) {
      throw new Error("orderId and txRef are required.");
    }

    return postJson("/api/payments/chapa/verify", { orderId, txRef });
  };

  window.FewesPayments = Object.assign(window.FewesPayments || {}, {
    initializeChapa,
    verifyChapa
  });
})();
