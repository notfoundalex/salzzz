(() => {
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const modal = document.getElementById("password-modal");
  const toast = document.getElementById("toast");
  const scene = document.querySelector("[data-scene]");
  const root = document.documentElement;
  let toastTimer;

  function showToast(message) {
    if (!toast) return;
    toast.hidden = false;
    toast.textContent = message;
    requestAnimationFrame(() => toast.classList.add("is-on"));
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => {
      toast.classList.remove("is-on");
      setTimeout(() => {
        toast.hidden = true;
      }, 250);
    }, 2400);
  }

  document.querySelectorAll("[data-open-password]").forEach((btn) => {
    btn.addEventListener("click", () => {
      if (typeof modal?.showModal === "function") modal.showModal();
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

  if (!reduceMotion && scene) {
    let targetX = 0;
    let targetY = 0;
    let currentX = 0;
    let currentY = 0;
    let raf = 0;

    const tick = () => {
      currentX += (targetX - currentX) * 0.08;
      currentY += (targetY - currentY) * 0.08;
      root.style.setProperty("--mx", currentX.toFixed(4));
      root.style.setProperty("--my", currentY.toFixed(4));
      raf = requestAnimationFrame(tick);
    };

    scene.addEventListener(
      "pointermove",
      (event) => {
        const rect = scene.getBoundingClientRect();
        targetX = ((event.clientX - rect.left) / rect.width - 0.5) * 2;
        targetY = ((event.clientY - rect.top) / rect.height - 0.5) * 2;
      },
      { passive: true }
    );

    scene.addEventListener("pointerleave", () => {
      targetX = 0;
      targetY = 0;
    });

    raf = requestAnimationFrame(tick);
    window.addEventListener("beforeunload", () => cancelAnimationFrame(raf));
  }
})();
