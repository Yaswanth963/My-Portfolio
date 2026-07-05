/* ============================================================
   Portfolio interactions
   ============================================================ */
(function () {
  "use strict";

  const $ = (sel, ctx = document) => ctx.querySelector(sel);
  const $$ = (sel, ctx = document) => Array.from(ctx.querySelectorAll(sel));

  /* ---- Year ---- */
  const yearEl = $("#year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  /* ---- Navbar scroll state + progress bar ---- */
  const navbar = $("#navbar");
  const progress = $("#scrollProgress");

  function onScroll() {
    const y = window.scrollY;
    if (navbar) navbar.classList.toggle("scrolled", y > 40);
    if (progress) {
      const h = document.documentElement.scrollHeight - window.innerHeight;
      progress.style.width = h > 0 ? (y / h) * 100 + "%" : "0%";
    }
  }
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  /* ---- Mobile nav toggle ---- */
  const toggle = $("#navToggle");
  const navLinks = $("#navLinks");
  if (toggle && navLinks) {
    toggle.addEventListener("click", () => {
      toggle.classList.toggle("open");
      navLinks.classList.toggle("open");
    });
    $$("a", navLinks).forEach((a) =>
      a.addEventListener("click", () => {
        toggle.classList.remove("open");
        navLinks.classList.remove("open");
      })
    );
  }

  /* ---- Reveal on scroll ---- */
  const reveals = $$(".reveal");
  if ("IntersectionObserver" in window) {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry, i) => {
          if (entry.isIntersecting) {
            const el = entry.target;
            setTimeout(() => el.classList.add("visible"), (i % 4) * 90);
            io.unobserve(el);
          }
        });
      },
      { threshold: 0.14, rootMargin: "0px 0px -40px 0px" }
    );
    reveals.forEach((el) => io.observe(el));
  } else {
    reveals.forEach((el) => el.classList.add("visible"));
  }

  /* ---- Animated stat counters ---- */
  const stats = $$(".stat-num");
  const animateCount = (el) => {
    const target = parseInt(el.dataset.count, 10) || 0;
    const dur = 1400;
    const start = performance.now();
    const step = (now) => {
      const p = Math.min((now - start) / dur, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      el.textContent = Math.round(eased * target);
      if (p < 1) requestAnimationFrame(step);
      else el.textContent = target;
    };
    requestAnimationFrame(step);
  };
  if (stats.length && "IntersectionObserver" in window) {
    const statIO = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            animateCount(entry.target);
            statIO.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.6 }
    );
    stats.forEach((s) => statIO.observe(s));
  }

  /* ---- Cursor glow (desktop, fine pointer only) ---- */
  const glow = $(".cursor-glow");
  if (glow && window.matchMedia("(pointer: fine)").matches) {
    let raf = null;
    window.addEventListener("mousemove", (e) => {
      if (raf) return;
      raf = requestAnimationFrame(() => {
        glow.style.left = e.clientX + "px";
        glow.style.top = e.clientY + "px";
        glow.style.opacity = "1";
        raf = null;
      });
    });
    document.addEventListener("mouseleave", () => (glow.style.opacity = "0"));
  }

  /* ---- Active nav link highlight ---- */
  const sections = $$("section[id]");
  const navMap = new Map();
  $$(".nav-links a").forEach((a) => {
    const id = a.getAttribute("href").replace("#", "");
    navMap.set(id, a);
  });
  if ("IntersectionObserver" in window) {
    const spyIO = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const link = navMap.get(entry.target.id);
            navMap.forEach((el) => el.style.removeProperty("color"));
            if (link) link.style.color = "var(--text)";
          }
        });
      },
      { threshold: 0.5 }
    );
    sections.forEach((s) => spyIO.observe(s));
  }

  /* ---- Placeholder Medium link guard ---- */
  const medium = $('[data-social="medium"]');
  if (medium && medium.getAttribute("href") === "#") {
    medium.addEventListener("click", (e) => {
      e.preventDefault();
      alert("Add your Medium URL in index.html (search for data-social=\"medium\").");
    });
  }
})();
