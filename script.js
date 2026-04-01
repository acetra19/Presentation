(() => {
  const root = document.documentElement;
  const body = document.body;
  const sections = Array.from(document.querySelectorAll(".section"));
  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  body.classList.add("js-enabled");

  if (!prefersReducedMotion) {
    let rafId = 0;
    let nextX = window.innerWidth * 0.5;
    let nextY = window.innerHeight * 0.35;

    const paintPointerGlow = () => {
      root.style.setProperty("--mx", `${(nextX / window.innerWidth) * 100}%`);
      root.style.setProperty("--my", `${(nextY / window.innerHeight) * 100}%`);
      rafId = 0;
    };

    window.addEventListener("pointermove", (event) => {
      nextX = event.clientX;
      nextY = event.clientY;
      if (!rafId) {
        rafId = window.requestAnimationFrame(paintPointerGlow);
      }
    });
  }

  const revealSection = (entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("is-visible");
    }
  };

  if (!("IntersectionObserver" in window)) {
    sections.forEach((section) => section.classList.add("is-visible"));
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => entries.forEach(revealSection),
    { threshold: 0.12, rootMargin: "0px 0px -8% 0px" }
  );

  sections.forEach((section) => observer.observe(section));
})();
