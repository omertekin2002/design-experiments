const revealElements = document.querySelectorAll(".reveal");

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("in-view");
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.18 }
);

revealElements.forEach((element, index) => {
  element.style.transitionDelay = `${index * 60}ms`;
  revealObserver.observe(element);
});

const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
const tiltCards = document.querySelectorAll(".tilt-card");

if (!prefersReducedMotion && !("ontouchstart" in window)) {
  tiltCards.forEach((card) => {
    const maxTilt = 8;

    card.addEventListener("mousemove", (event) => {
      const rect = card.getBoundingClientRect();
      const x = event.clientX - rect.left;
      const y = event.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      const rotateX = ((centerY - y) / centerY) * maxTilt;
      const rotateY = ((x - centerX) / centerX) * maxTilt;

      card.style.transform = `perspective(900px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
    });

    card.addEventListener("mouseleave", () => {
      card.style.transform = "perspective(900px) rotateX(0deg) rotateY(0deg)";
    });
  });
} else {
  tiltCards.forEach((card) => {
    card.classList.remove("tilt-card");
  });
}
