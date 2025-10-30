(() => {
  if (typeof window === "undefined") {
    return;
  }

  const CART_STORAGE_KEY = "fewes_cart";

  const ensureFirebase = () => {
    if (typeof firebase === "undefined") {
      console.warn("Firebase SDK not loaded. shared/app.js requires firebase-app-compat.js before this script.");
      return null;
    }

    if (!firebase.apps || firebase.apps.length === 0) {
      console.warn("Firebase app is not initialized. Ensure firebase-config.js runs before shared/app.js.");
      return null;
    }

    return firebase;
  };

  const firebaseInstance = ensureFirebase();
  if (!firebaseInstance) {
    return;
  }

  const auth = firebaseInstance.auth();

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

      return parsed.filter((item) => typeof item === "object" && item !== null);
    } catch (error) {
      console.error("Unable to read cart from storage", error);
      return [];
    }
  };

  const updateCartBadges = () => {
    const cart = readCart();
    const count = cart.reduce((sum, item) => sum + (Number(item.quantity) || 0), 0);
    const total = cart.reduce((sum, item) => sum + (Number(item.unitPrice) || 0) * (Number(item.quantity) || 0), 0);

    document.querySelectorAll("[data-cart-count]").forEach((element) => {
      element.textContent = String(count);
      if (count === 0) {
        element.classList.add("cart-empty");
      } else {
        element.classList.remove("cart-empty");
      }
    });

    document.querySelectorAll("[data-cart-total]").forEach((element) => {
      element.textContent = total.toLocaleString(undefined, {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
      });
    });
  };

  const updateAuthLinks = (user) => {
    const signedIn = Boolean(user);

    document.querySelectorAll("[data-auth-link]").forEach((link) => {
      const signedOutLabel = link.dataset.authSignedOutText || "Sign In";
      const signedInLabel = link.dataset.authSignedInText || "My Orders";
      const signedOutHref = link.dataset.authSignedOutHref || "../Auth/login.html";
      const signedInHref = link.dataset.authSignedInHref || "../Orders/checkout.html";

      if (signedIn) {
        link.textContent = signedInLabel;
        link.setAttribute("href", signedInHref);
        link.classList.add("auth-signed-in");
      } else {
        link.textContent = signedOutLabel;
        link.setAttribute("href", signedOutHref);
        link.classList.remove("auth-signed-in");
      }
    });

    document.querySelectorAll("[data-auth-name]").forEach((element) => {
      element.textContent = user?.displayName || user?.email || "";
      element.style.display = signedIn ? "" : "none";
    });

    document.querySelectorAll("[data-signout]").forEach((element) => {
      if (signedIn) {
        element.style.display = "";
        element.addEventListener(
          "click",
          (event) => {
            event.preventDefault();
            auth.signOut();
          },
          { once: true }
        );
      } else {
        element.style.display = "none";
      }
    });
  };

  auth.onAuthStateChanged((user) => {
    updateAuthLinks(user);
  });

  updateCartBadges();
  window.addEventListener("storage", (event) => {
    if (event.key === CART_STORAGE_KEY) {
      updateCartBadges();
    }
  });

  window.FewesHelpers = Object.assign(window.FewesHelpers || {}, {
    refreshCartIndicators: updateCartBadges,
    getAuthInstance: () => auth
  });
})();
