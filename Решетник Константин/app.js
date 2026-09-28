const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.12 },
);

document
  .querySelectorAll(".reveal")
  .forEach((element) => observer.observe(element));

const hero = document.querySelector(".hero-content");

document.addEventListener("mousemove", (event) => {
  if (!hero) return;
  const x = event.clientX / window.innerWidth - 0.5;
  const y = event.clientY / window.innerHeight - 0.5;
  hero.style.transform = `translate(${x * 8}px, ${y * 8}px)`;
});

document.querySelectorAll(".card").forEach((card) => {
  card.addEventListener("mousemove", (event) => {
    const rect = card.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    const rotateX = (y / rect.height - 0.5) * -6;
    const rotateY = (x / rect.width - 0.5) * 6;

    card.style.transform = `
      perspective(800px)
      rotateX(${rotateX}deg)
      rotateY(${rotateY}deg)
      translateY(-8px)
    `;
  });

  card.addEventListener("mouseleave", () => {
    card.style.transform = "";
  });
});

const title = document.querySelector(".hero h1 span");

setInterval(() => {
  if (!title) return;

  title.style.transform = `translateX(${Math.random() * 3 - 1.5}px)`;

  title.style.textShadow = `
    ${Math.random() * 8 - 4}px 0
    rgba(255,48,79,.7)
  `;

  setTimeout(() => {
    title.style.transform = "";
    title.style.textShadow = "";
  }, 70);
}, 3500);

const cursor = document.querySelector(".terminal-line:last-child .command");

setInterval(() => {
  if (!cursor) return;
  cursor.style.opacity = cursor.style.opacity === "0" ? "1" : "0";
}, 500);

document.querySelectorAll('a[href^="#"]').forEach((link) => {
  link.addEventListener("click", (event) => {
    const target = document.querySelector(link.getAttribute("href"));
    if (!target) return;

    event.preventDefault();

    target.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  });
});

const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

if (reducedMotion.matches) {
  document.documentElement.style.scrollBehavior = "auto";

  document.querySelectorAll(".reveal").forEach((element) => {
    element.classList.add("visible");
  });
}
