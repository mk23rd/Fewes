(() => {
  if (typeof firebase === "undefined") {
    console.error("Firebase SDK not loaded. Ensure firebase-config.js is included before auth.js");
    return;
  }

  const auth = firebase.auth();
  const googleProvider = new firebase.auth.GoogleAuthProvider();
  googleProvider.setCustomParameters({ prompt: "select_account" });

  const setLoading = (form, isLoading) => {
    const button = form.querySelector("button[type='submit']");
    if (!button) {
      return;
    }

    if (!button.dataset.label) {
      button.dataset.label = button.textContent || "Submit";
    }

    button.disabled = isLoading;
    button.textContent = isLoading ? "Please wait..." : button.dataset.label;
  };

  const showFeedback = (form, message, type = "error") => {
    const feedback = form.querySelector(".feedback");
    if (!feedback) {
      return;
    }

    feedback.textContent = message;
    feedback.classList.remove("success");
    feedback.classList.remove("show");

    if (type === "success") {
      feedback.classList.add("success");
    }

    requestAnimationFrame(() => {
      feedback.classList.add("show");
    });
  };

  const redirectTo = (path) => {
    window.location.assign(path);
  };

  const loginForm = document.querySelector("#login-form");
  if (loginForm) {
    const defaultTarget = loginForm.dataset.redirect ?? "../Profile/index.html";
    const emailInput = loginForm.querySelector("input[type='email']");
    emailInput?.focus();

    loginForm.addEventListener("submit", async (event) => {
      event.preventDefault();
      setLoading(loginForm, true);

      const email = (loginForm.querySelector("input[name='email']")?.value || "").trim();
      const password = loginForm.querySelector("input[name='password']")?.value || "";

      try {
        await auth.signInWithEmailAndPassword(email, password);
        showFeedback(loginForm, "Signed in successfully. Redirecting…", "success");
        setTimeout(() => redirectTo(defaultTarget), 800);
      } catch (error) {
        console.error("Login failed", error);
        showFeedback(loginForm, error.message ?? "Unable to sign in.");
      } finally {
        setLoading(loginForm, false);
      }
    });
  }

  const signupForm = document.querySelector("#signup-form");
  if (signupForm) {
    const emailInput = signupForm.querySelector("input[type='email']");
    emailInput?.focus();

    signupForm.addEventListener("submit", async (event) => {
      event.preventDefault();
      setLoading(signupForm, true);

      const email = (signupForm.querySelector("input[name='email']")?.value || "").trim();
      const password = signupForm.querySelector("input[name='password']")?.value || "";
      const displayName = (signupForm.querySelector("input[name='name']")?.value || "").trim();

      if (password.length < 6) {
        showFeedback(signupForm, "Password must be at least 6 characters long.");
        setLoading(signupForm, false);
        return;
      }

      try {
        const { user } = await auth.createUserWithEmailAndPassword(email, password);
        if (user && displayName) {
          await user.updateProfile({ displayName });
        }

        showFeedback(signupForm, "Account created successfully. You can sign in now.", "success");
        signupForm.reset();
      } catch (error) {
        console.error("Signup failed", error);
        showFeedback(signupForm, error.message ?? "Unable to create account.");
      } finally {
        setLoading(signupForm, false);
      }
    });
  }

  const googleButton = document.querySelector("#google-signin");
  if (googleButton) {
    if (!googleButton.dataset.label) {
      googleButton.dataset.label = googleButton.textContent || "Continue";
    }

    googleButton.addEventListener("click", async () => {
  const target = loginForm?.dataset.redirect ?? "../Profile/index.html";
      googleButton.disabled = true;
      googleButton.textContent = "Connecting to Google…";

      try {
        await auth.signInWithPopup(googleProvider);
        redirectTo(target);
      } catch (error) {
        console.error("Google sign-in failed", error);
        showFeedback(loginForm ?? document.body, error.message ?? "Unable to sign in with Google.");
        googleButton.disabled = false;
        googleButton.textContent = googleButton.dataset.label;
      }
    });
  }
})();
