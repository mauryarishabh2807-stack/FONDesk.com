const menuToggle = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('.nav-links');

if (menuToggle && navLinks) {
  menuToggle.addEventListener('click', () => {
    navLinks.classList.toggle('open');
  });
}

const faqItems = document.querySelectorAll('.faq-item');

faqItems.forEach((item) => {
  item.addEventListener('toggle', () => {
    if (item.open) {
      faqItems.forEach((other) => {
        if (other !== item) {
          other.open = false;
        }
      });
    }
  });
});

const yearElement = document.getElementById('year');
if (yearElement) {
  yearElement.textContent = new Date().getFullYear();
}

const enrollButtons = document.querySelectorAll('a.enroll-now');
const pricingGrid = document.querySelector('.pricing-grid');

if (enrollButtons.length && pricingGrid) {
  enrollButtons.forEach((button) => {
    button.addEventListener('click', () => {
      pricingGrid.innerHTML = '';
    });
  });
}
