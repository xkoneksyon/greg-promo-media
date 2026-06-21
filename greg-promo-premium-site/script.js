const toggle = document.querySelector('.nav-toggle');
const menu = document.querySelector('#nav-menu');
if (toggle && menu) {
  toggle.addEventListener('click', () => {
    const isOpen = menu.classList.toggle('open');
    toggle.setAttribute('aria-expanded', String(isOpen));
  });
  menu.querySelectorAll('a').forEach(link => link.addEventListener('click', () => {
    menu.classList.remove('open');
    toggle.setAttribute('aria-expanded', 'false');
  }));
}

document.querySelector('#year').textContent = new Date().getFullYear();

const revealObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.15 });
document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

const countdown = document.querySelector('[data-countdown]');
if (countdown) {
  const target = new Date(countdown.dataset.countdown).getTime();
  const daysEl = countdown.querySelector('[data-days]');
  const hoursEl = countdown.querySelector('[data-hours]');
  const minutesEl = countdown.querySelector('[data-minutes]');
  const secondsEl = countdown.querySelector('[data-seconds]');
  const updateCountdown = () => {
    const diff = Math.max(0, target - Date.now());
    const day = 1000 * 60 * 60 * 24;
    const hour = 1000 * 60 * 60;
    const minute = 1000 * 60;
    daysEl.textContent = Math.floor(diff / day);
    hoursEl.textContent = Math.floor((diff % day) / hour).toString().padStart(2, '0');
    minutesEl.textContent = Math.floor((diff % hour) / minute).toString().padStart(2, '0');
    secondsEl.textContent = Math.floor((diff % minute) / 1000).toString().padStart(2, '0');
  };
  updateCountdown();
  setInterval(updateCountdown, 1000);
}

const form = document.querySelector('#booking-form');
if (form) {
  form.addEventListener('submit', event => {
    event.preventDefault();
    const data = new FormData(form);
    const subject = encodeURIComponent(`Greg Promo Media Inquiry - ${data.get('type')}`);
    const body = encodeURIComponent(`Name: ${data.get('name')}\nEmail: ${data.get('email')}\nCampaign Type: ${data.get('type')}\n\nMessage:\n${data.get('message')}`);
    window.location.href = `mailto:booking@gregpromo.com?subject=${subject}&body=${body}`;
  });
}
