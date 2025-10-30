const cartApi = window.FewesCart;
const helpers = window.FewesHelpers;

if (!cartApi) {
  console.error("FewesCart helpers are not available. Ensure shared/orders.js is loaded before checkout.js.");
}

const auth = helpers?.getAuthInstance ? helpers.getAuthInstance() : null;

const cartList = document.getElementById("cart-list");
const emptyState = document.getElementById("empty-state");
const clearCartButton = document.getElementById("clear-cart");
const subtotalElement = document.getElementById("summary-subtotal");
const feeElement = document.getElementById("summary-fee");
const totalElement = document.getElementById("summary-total");
const form = document.getElementById("order-form");
const submitButton = document.getElementById("submit-order");
const feedbackElement = document.getElementById("order-feedback");
const nameInput = document.getElementById("customer-name");
const emailInput = document.getElementById("customer-email");
const phoneInput = document.getElementById("customer-phone");
const addressInput = document.getElementById("delivery-address");
const notesInput = document.getElementById("delivery-notes");
const authActionButton = document.getElementById("auth-action");

const SERVICE_FEE_RATE = 0.05;
const SERVICE_FEE_MINIMUM = 1.5;

if (submitButton) {
  submitButton.disabled = true;
}

const formatCurrency = (value) => {
  return value.toLocaleString(undefined, {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  });
};

const calculateServiceFee = (subtotal) => {
  if (subtotal <= 0) {
    return 0;
  }

  const fee = subtotal * SERVICE_FEE_RATE;
  return Math.max(SERVICE_FEE_MINIMUM, fee);
};

const renderCartItems = (items) => {
  if (!cartList) {
    return;
  }

  cartList.innerHTML = "";

  if (!items.length) {
    emptyState.hidden = false;
    clearCartButton.disabled = true;
    return;
  }

  emptyState.hidden = true;
  clearCartButton.disabled = false;

  items.forEach((item) => {
    const row = document.createElement("div");
    row.className = "cart-item";
    row.dataset.id = item.id;
    row.innerHTML = `
      <div class="cart-item-info">
        <h3>${item.name}</h3>
        <span>${formatCurrency(item.unitPrice)} each</span>
      </div>
      <div class="cart-item-actions">
        <div class="quantity-control">
          <button type="button" data-action="decrement" aria-label="Decrease quantity">-</button>
          <span>${item.quantity}</span>
          <button type="button" data-action="increment" aria-label="Increase quantity">+</button>
        </div>
        <button type="button" class="remove-btn" data-action="remove">Remove</button>
      </div>
    `;

    cartList.appendChild(row);
  });
};

const updateSummary = (items) => {
  const subtotal = items.reduce((sum, item) => sum + item.unitPrice * item.quantity, 0);
  const fee = calculateServiceFee(subtotal);
  const total = subtotal + fee;

  subtotalElement.textContent = formatCurrency(subtotal);
  feeElement.textContent = formatCurrency(fee);
  totalElement.textContent = formatCurrency(total);
};

const showFeedback = (variant, message) => {
  feedbackElement.textContent = message;
  feedbackElement.className = `feedback show ${variant}`;
};

const resetFeedback = () => {
  feedbackElement.textContent = "";
  feedbackElement.className = "feedback";
};

const attachCartListeners = () => {
  if (!cartApi) {
    return;
  }

  cartApi.onUpdate((items) => {
    renderCartItems(items);
    updateSummary(items);
  });

  clearCartButton.addEventListener("click", () => {
    cartApi.clear();
    showFeedback("success", "Cart cleared.");
  });

  cartList.addEventListener("click", (event) => {
    const button = event.target.closest("button[data-action]");
    if (!button) {
      return;
    }

    const parent = button.closest(".cart-item");
    const id = parent?.dataset.id;
    if (!id) {
      return;
    }

    const quantityDisplay = parent.querySelector(".quantity-control span");
    const currentQuantity = Number(quantityDisplay?.textContent) || 0;

    switch (button.dataset.action) {
      case "increment":
        cartApi.setQuantity(id, currentQuantity + 1);
        break;
      case "decrement":
        cartApi.setQuantity(id, currentQuantity - 1);
        break;
      case "remove":
        cartApi.remove(id);
        showFeedback("success", "Item removed from cart.");
        break;
      default:
        break;
    }
  });
};

const handleFormSubmit = () => {
  form.addEventListener("submit", async (event) => {
    event.preventDefault();
    resetFeedback();

    if (!cartApi) {
      showFeedback("error", "Cart utilities are unavailable. Reload and try again.");
      return;
    }

    const cartItems = cartApi.read();
    if (!cartItems.length) {
      showFeedback("error", "Add items to your cart before placing an order.");
      return;
    }

    const user = auth?.currentUser;
    if (!user) {
      showFeedback("error", "Please sign in to place your order.");
      return;
    }

    if (!form.reportValidity()) {
      return;
    }

    submitButton.disabled = true;
    submitButton.textContent = "Submitting...";

    try {
      await cartApi.createOrder({
        deliveryAddress: addressInput.value.trim(),
        contactPhone: phoneInput.value.trim(),
        notes: notesInput.value.trim() || undefined
      });

      showFeedback("success", "Order placed! We will email you with updates shortly.");
      form.reset();
      if (user.displayName) {
        nameInput.value = user.displayName;
      }
      if (user.email) {
        emailInput.value = user.email;
      }
      if (user.phoneNumber) {
        phoneInput.value = user.phoneNumber;
      }
    } catch (error) {
      const message = error instanceof Error ? error.message : "Unable to submit your order.";
      showFeedback("error", message);
    } finally {
      submitButton.disabled = false;
      submitButton.textContent = "Place Order";
    }
  });
};

const setupAuthButton = () => {
  if (!auth) {
    authActionButton.textContent = "Sign In";
    authActionButton.addEventListener("click", () => {
      window.location.href = "../Auth/login.html";
    });
    submitButton.disabled = true;
    return;
  }

  auth.onAuthStateChanged((user) => {
    if (user) {
      authActionButton.textContent = "Sign Out";
      authActionButton.onclick = async () => {
        try {
          await auth.signOut();
        } catch (error) {
          const message = error instanceof Error ? error.message : "Unable to sign out.";
          showFeedback("error", message);
        }
      };
      submitButton.disabled = false;
      if (user.displayName && !nameInput.value) {
        nameInput.value = user.displayName;
      }
      if (user.email) {
        emailInput.value = user.email;
        emailInput.readOnly = true;
      }
    } else {
      authActionButton.textContent = "Sign In";
      authActionButton.onclick = () => {
        window.location.href = "../Auth/login.html";
      };
      submitButton.disabled = true;
      emailInput.readOnly = false;
      emailInput.value = "";
      nameInput.value = "";
      phoneInput.value = "";
      addressInput.value = "";
      notesInput.value = "";
    }
  });
};

if (form) {
  setupAuthButton();
  resetFeedback();

  if (cartApi) {
    attachCartListeners();
    handleFormSubmit();
  } else {
    form.addEventListener("submit", (event) => {
      event.preventDefault();
      showFeedback("error", "Cart services are unavailable. Please refresh the page.");
    });
  }
}
