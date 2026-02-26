/**
 * Atelier — Scroll reveals, header scroll state, card tilt
 */

(function () {
  "use strict";

  // ── Scroll reveal ─────────────────────────────────────────
  const revealEls = document.querySelectorAll(".reveal");
  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("in-view");
          revealObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
  );

  revealEls.forEach((el) => revealObserver.observe(el));

  // ── Header scroll state ───────────────────────────────────
  const header = document.querySelector(".header");
  if (header) {
    const onScroll = () => {
      header.classList.toggle("scrolled", window.scrollY > 80);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll(); // init
  }

  // ── Card tilt (3D parallax on hover) ───────────────────────
  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const tiltCards = document.querySelectorAll("[data-tilt]");

  if (!prefersReducedMotion && !("ontouchstart" in window)) {
    tiltCards.forEach((card) => {
      card.addEventListener("mousemove", (e) => {
        const rect = card.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width;
        const y = (e.clientY - rect.top) / rect.height;
        const tiltX = (y - 0.5) * 8;
        const tiltY = (x - 0.5) * -8;
        card.style.transform = `perspective(1000px) rotateX(${tiltX}deg) rotateY(${tiltY}deg)`;
      });

      card.addEventListener("mouseleave", () => {
        card.style.transform = "perspective(1000px) rotateX(0) rotateY(0)";
      });
    });
  }

  // ── Smooth scroll for anchor links ─────────────────────────
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", (e) => {
      const href = anchor.getAttribute("href");
      if (href === "#") return;
      const target = document.querySelector(href);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    });
  });
})();
