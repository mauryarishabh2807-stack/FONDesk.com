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
const STORAGE_KEY = 'fnDeskEnrollmentRequests';
const ADMIN_PHONE = '8318433378';

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
  enrollmentForm.addEventListener('submit', async (event) => {
    event.preventDefault();

    const inputs = enrollmentForm.querySelectorAll('input');
    const values = Array.from(inputs).map((input) => input.value.trim());
    const [fullName, email, mobile] = values;

    if (!fullName || !email || !mobile) {
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

    if (mobile.length < 10) {
      formMessage.textContent = 'Please enter a valid 10-digit mobile number.';
      formMessage.className = 'form-message error';
      return;
    }

    const enrollment = {
      fullName,
      email,
      mobile,
      submittedAt: new Date().toISOString(),
    };

    try {
      const existingEntries = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
      existingEntries.push(enrollment);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(existingEntries));
    } catch (storageError) {
      console.warn('Enrollment storage was unavailable:', storageError);
    }

    const notificationMessage = `New enrollment request\nName: ${enrollment.fullName}\nEmail: ${enrollment.email}\nMobile: ${enrollment.mobile}\nSubmitted: ${new Date(enrollment.submittedAt).toLocaleString()}`;

    try {
      if (window.ENROLLMENT_WEBHOOK_URL) {
        await fetch(window.ENROLLMENT_WEBHOOK_URL, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            to: ADMIN_PHONE,
            message: notificationMessage,
            enrollment,
          }),
        });
        formMessage.textContent = 'Enrollment submitted successfully! Your request has been received and sent to the admin.';
      } else {
        const whatsappUrl = `https://wa.me/91${ADMIN_PHONE}?text=${encodeURIComponent(notificationMessage)}`;
        window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
        formMessage.textContent = 'Enrollment submitted successfully! Your request has been received and a WhatsApp chat was opened.';
      }
    } catch (notificationError) {
      console.warn('Notification delivery failed:', notificationError);
      formMessage.textContent = 'Enrollment submitted successfully! Your request has been received. The admin notification could not be sent automatically.';
    }

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
