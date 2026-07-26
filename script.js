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
const modal = document.getElementById('enrollment-modal');
const modalClose = document.querySelector('.modal-close');
const modalCancel = document.querySelector('.modal-cancel');
const enrollmentForm = document.getElementById('enrollment-form');
const formMessage = document.querySelector('.form-message');

const openEnrollmentModal = () => {
  if (!modal) return;
  modal.classList.add('active');
  modal.setAttribute('aria-hidden', 'false');
  document.body.style.overflow = 'hidden';
};

const closeEnrollmentModal = () => {
  if (!modal) return;
  modal.classList.remove('active');
  modal.setAttribute('aria-hidden', 'true');
  document.body.style.overflow = '';
  if (formMessage) {
    formMessage.textContent = '';
    formMessage.className = 'form-message';
  }
  if (enrollmentForm) {
    enrollmentForm.reset();
  }
};

if (enrollButtons.length) {
  enrollButtons.forEach((button) => {
    button.addEventListener('click', (event) => {
      event.preventDefault();
      openEnrollmentModal();
    });
  });
}

if (modal) {
  modal.addEventListener('click', (event) => {
    if (event.target === modal) {
      closeEnrollmentModal();
    }
  });
}

if (modalClose) {
  modalClose.addEventListener('click', closeEnrollmentModal);
}

if (modalCancel) {
  modalCancel.addEventListener('click', closeEnrollmentModal);
}

document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape' && modal && modal.classList.contains('active')) {
    closeEnrollmentModal();
  }
});

if (enrollmentForm && formMessage) {
  enrollmentForm.addEventListener('submit', (event) => {
    event.preventDefault();

    const inputs = enrollmentForm.querySelectorAll('input');
    const values = Array.from(inputs).map((input) => input.value.trim());
    const [fullName, email, contact] = values;

    if (!fullName || !email || !contact) {
      formMessage.textContent = 'Please fill in all fields before submitting.';
      formMessage.className = 'form-message error';
      return;
    }

    const emailPattern = /^\S+@\S+\.\S+$/;
    if (!emailPattern.test(email)) {
      formMessage.textContent = 'Please enter a valid email address.';
      formMessage.className = 'form-message error';
      return;
    }

    if (contact.length < 10) {
      formMessage.textContent = 'Please enter a valid 10-digit contact number.';
      formMessage.className = 'form-message error';
      return;
    }

    formMessage.textContent = 'Enrollment submitted successfully! We will contact you shortly.';
    formMessage.className = 'form-message';
    enrollmentForm.reset();
  });
}

const youtubeLinkInput = document.getElementById('youtube-channel-link');
const youtubeLinkButton = document.getElementById('youtube-channel-btn');

if (youtubeLinkInput && youtubeLinkButton) {
  const updateYoutubeLink = () => {
    const value = youtubeLinkInput.value.trim();
    const nextHref = value || 'https://www.youtube.com/';
    youtubeLinkButton.href = nextHref;
    youtubeLinkButton.setAttribute('aria-label', `Open YouTube channel at ${nextHref}`);
  };

  youtubeLinkInput.addEventListener('input', updateYoutubeLink);
  updateYoutubeLink();
}
