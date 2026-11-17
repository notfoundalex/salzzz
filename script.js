(() => {
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const modal = document.getElementById("password-modal");
  const toast = document.getElementById("toast");
  const stage = document.querySelector("[data-stage]");
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

  /* Pointer parallax for the 3D stage */
  if (!reduceMotion && stage) {
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

    stage.addEventListener(
      "pointermove",
      (event) => {
        const rect = stage.getBoundingClientRect();
        targetX = ((event.clientX - rect.left) / rect.width - 0.5) * 2;
        targetY = ((event.clientY - rect.top) / rect.height - 0.5) * 2;
      },
      { passive: true }
    );

    stage.addEventListener("pointerleave", () => {
      targetX = 0;
      targetY = 0;
    });

    raf = requestAnimationFrame(tick);
    window.addEventListener("beforeunload", () => cancelAnimationFrame(raf));
  }

  /* Magnetic subscribe button */
  if (!reduceMotion) {
    document.querySelectorAll("[data-magnetic]").forEach((btn) => {
      btn.addEventListener("pointermove", (event) => {
        const rect = btn.getBoundingClientRect();
        const x = event.clientX - rect.left - rect.width / 2;
        const y = event.clientY - rect.top - rect.height / 2;
        btn.style.transform = `translate(${x * 0.12}px, ${y * 0.18}px) scale(1.02)`;
      });
      btn.addEventListener("pointerleave", () => {
        btn.style.transform = "";
      });
    });
  }

  /* Floating particles */
  const canvas = document.querySelector("[data-particles]");
  if (!reduceMotion && canvas) {
    const ctx = canvas.getContext("2d");
    let width = 0;
    let height = 0;
    let particles = [];
    let pointer = { x: 0.5, y: 0.4 };
    let frame = 0;

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = canvas.clientWidth;
      height = canvas.clientHeight;
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      const count = Math.max(28, Math.floor((width * height) / 28000));
      particles = Array.from({ length: count }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        z: Math.random() * 1 + 0.2,
        r: Math.random() * 1.8 + 0.4,
        vx: (Math.random() - 0.5) * 0.25,
        vy: (Math.random() - 0.5) * 0.25 - 0.15,
        a: Math.random() * 0.45 + 0.15,
      }));
    };

    const draw = () => {
      ctx.clearRect(0, 0, width, height);
      for (const p of particles) {
        p.x += p.vx + (pointer.x * width - p.x) * 0.00035 * p.z;
        p.y += p.vy + (pointer.y * height - p.y) * 0.0002 * p.z;
        if (p.x < -20) p.x = width + 20;
        if (p.x > width + 20) p.x = -20;
        if (p.y < -20) p.y = height + 20;
        if (p.y > height + 20) p.y = -20;

        const depth = p.z;
        ctx.beginPath();
        ctx.fillStyle = `rgba(255,255,255,${p.a})`;
        ctx.arc(p.x, p.y, p.r * depth, 0, Math.PI * 2);
        ctx.fill();
      }
      frame = requestAnimationFrame(draw);
    };

    stage?.addEventListener(
      "pointermove",
      (event) => {
        const rect = stage.getBoundingClientRect();
        pointer.x = (event.clientX - rect.left) / rect.width;
        pointer.y = (event.clientY - rect.top) / rect.height;
      },
      { passive: true }
    );

    resize();
    draw();
    window.addEventListener("resize", resize);
    window.addEventListener("beforeunload", () => cancelAnimationFrame(frame));
  }

  /* Dock icon follow tilt */
  if (!reduceMotion) {
    document.querySelectorAll("[data-file]").forEach((file) => {
      const face = file.querySelector(".file-face");
      if (!face) return;
      file.addEventListener("pointermove", (event) => {
        const rect = file.getBoundingClientRect();
        const x = (event.clientX - rect.left) / rect.width - 0.5;
        const y = (event.clientY - rect.top) / rect.height - 0.5;
        face.style.transform = `translateY(-10px) rotateY(${x * 28}deg) rotateX(${-y * 22}deg) scale(1.08)`;
      });
      file.addEventListener("pointerleave", () => {
        face.style.transform = "";
      });
    });
  }
})();
