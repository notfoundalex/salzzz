(() => {
  const modal = document.getElementById("password-modal");
  const toast = document.getElementById("toast");
  let toastTimer;

  function showToast(message) {
    if (!toast) return;
    toast.hidden = false;
    toast.textContent = message;
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => {
      toast.hidden = true;
    }, 2400);
  }

  document.querySelectorAll("[data-open-password]").forEach((btn) => {
    btn.addEventListener("click", () => {
      if (typeof modal.showModal === "function") modal.showModal();
    });
  });

  document.querySelectorAll("[data-close-password]").forEach((btn) => {
    btn.addEventListener("click", () => modal.close());
  });

  document.querySelectorAll("#newsletter-form, #footer-form").forEach((form) => {
    form.addEventListener("submit", (event) => {
      event.preventDefault();
      const email = form.querySelector('input[type="email"]');
      if (!email?.value || !email.checkValidity()) {
        email?.reportValidity();
        return;
      }
      showToast("You're on the list.");
      form.reset();
    });
  });

  document.querySelector("[data-country]")?.addEventListener("click", () => {
    showToast("Shopping from España / EUR €");
  });

  modal?.addEventListener("submit", (event) => {
    event.preventDefault();
    const input = document.getElementById("site-password");
    if (!input?.value.trim()) {
      showToast("Enter a password.");
      return;
    }
    showToast("Access check coming soon.");
    modal.close();
    input.value = "";
  });
})();
