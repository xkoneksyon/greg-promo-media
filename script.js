const CONFIG = {
  bookingEmail: "booking@gregpromo.com",
  instagramUrl: "https://www.instagram.com/gregpromo?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw=="
};

const root = document.documentElement;
const savedTheme = localStorage.getItem("gregpromo-theme");
const prefersLight = window.matchMedia("(prefers-color-scheme: light)").matches;
root.dataset.theme = savedTheme || (prefersLight ? "light" : "dark");

document.querySelector("[data-theme-toggle]")?.addEventListener("click", () => {
  root.dataset.theme = root.dataset.theme === "light" ? "dark" : "light";
  localStorage.setItem("gregpromo-theme", root.dataset.theme);
});

const header = document.querySelector("[data-header]");
function updateHeader() {
  header?.classList.toggle("is-scrolled", window.scrollY > 10);
}
updateHeader();
window.addEventListener("scroll", updateHeader, { passive: true });

const menuToggle = document.querySelector("[data-menu-toggle]");
const menu = document.querySelector("[data-menu]");
menuToggle?.addEventListener("click", () => {
  const open = menu?.classList.toggle("is-open");
  menuToggle.setAttribute("aria-expanded", String(Boolean(open)));
});
menu?.querySelectorAll("a").forEach((link) => link.addEventListener("click", () => {
  menu.classList.remove("is-open");
  menuToggle?.setAttribute("aria-expanded", "false");
}));

const revealItems = document.querySelectorAll(".reveal");
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("is-visible");
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });
revealItems.forEach((item) => revealObserver.observe(item));

document.querySelectorAll("[data-year]").forEach((el) => el.textContent = new Date().getFullYear());

const countdown = document.querySelector("[data-countdown]");
function updateCountdown() {
  if (!countdown) return;
  const target = new Date(countdown.dataset.countdown).getTime();
  const distance = Math.max(0, target - Date.now());

  const seconds = Math.floor(distance / 1000);
  const days = Math.floor(seconds / 86400);
  const hours = Math.floor((seconds % 86400) / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const remainingSeconds = seconds % 60;

  countdown.querySelector("[data-days]").textContent = String(days).padStart(2, "0");
  countdown.querySelector("[data-hours]").textContent = String(hours).padStart(2, "0");
  countdown.querySelector("[data-minutes]").textContent = String(minutes).padStart(2, "0");
  countdown.querySelector("[data-seconds]").textContent = String(remainingSeconds).padStart(2, "0");
}
updateCountdown();
setInterval(updateCountdown, 1000);

const form = document.querySelector("[data-contact-form]");
const formNote = document.querySelector("[data-form-note]");
form?.addEventListener("submit", (event) => {
  event.preventDefault();
  const data = new FormData(form);
  const name = data.get("name")?.toString().trim();
  const email = data.get("email")?.toString().trim();
  const type = data.get("type")?.toString().trim();
  const message = data.get("message")?.toString().trim();

  const subject = encodeURIComponent(`Greg Promo inquiry: ${type || "Business"}`);
  const body = encodeURIComponent(
    `Name: ${name}\nEmail: ${email}\nInquiry Type: ${type}\n\nMessage:\n${message}\n\nSent from Greg Promo Media website.`
  );

  window.location.href = `mailto:${CONFIG.bookingEmail}?subject=${subject}&body=${body}`;
  if (formNote) formNote.textContent = "Opening your email app. If nothing happens, please reach out via Instagram.";
});
