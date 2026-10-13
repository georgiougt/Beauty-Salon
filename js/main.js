// Maison de Beauté - Interactive Logic

document.addEventListener('DOMContentLoaded', () => {
  // Mobile Nav
  const mobileToggle = document.getElementById('mobileToggle');
  const navLinks = document.getElementById('navLinks');

  if (mobileToggle && navLinks) {
    mobileToggle.addEventListener('click', () => {
      navLinks.classList.toggle('active');
      const icon = mobileToggle.querySelector('.material-symbols-outlined');
      if (icon) {
        icon.textContent = navLinks.classList.contains('active') ? 'close' : 'menu';
      }
    });

    navLinks.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        navLinks.classList.remove('active');
        const icon = mobileToggle.querySelector('.material-symbols-outlined');
        if (icon) icon.textContent = 'menu';
      });
    });
  }

  // Reservation Modal
  const modal = document.getElementById('bookingModal');
  const openBtns = document.querySelectorAll('.open-modal');
  const closeBtn = document.getElementById('closeModal');
  const bookingForm = document.getElementById('bookingForm');
  const serviceSelect = document.getElementById('serviceSelect');

  const openModal = (serviceName = '') => {
    if (!modal) return;
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
    if (serviceSelect && serviceName) {
      for (let i = 0; i < serviceSelect.options.length; i++) {
        if (serviceSelect.options[i].text.includes(serviceName) || serviceSelect.options[i].value.includes(serviceName)) {
          serviceSelect.selectedIndex = i;
          break;
        }
      }
    }
  };

  const closeModal = () => {
    if (!modal) return;
    modal.classList.remove('active');
    document.body.style.overflow = '';
  };

  openBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const service = btn.getAttribute('data-service') || '';
      openModal(service);
    });
  });

  // Hero Quick Book Widget
  const quickBookBtn = document.getElementById('quickBookBtn');
  const quickRitualSelect = document.getElementById('quickRitualSelect');

  if (quickBookBtn && quickRitualSelect) {
    quickBookBtn.addEventListener('click', () => {
      openModal(quickRitualSelect.value);
    });
  }

  if (closeBtn) closeBtn.addEventListener('click', closeModal);

  if (modal) {
    modal.addEventListener('click', (e) => {
      if (e.target === modal) closeModal();
    });
  }

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal && modal.classList.contains('active')) {
      closeModal();
    }
  });

  if (bookingForm) {
    bookingForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const submitBtn = bookingForm.querySelector('button[type="submit"]');
      submitBtn.disabled = true;
      submitBtn.innerHTML = `
        <span class="material-symbols-outlined" style="animation: spin 1s infinite linear;">sync</span>
        Confirming with Concierge...
      `;

      setTimeout(() => {
        bookingForm.innerHTML = `
          <div style="text-align: center; padding: 2rem 1rem;">
            <div style="width: 64px; height: 64px; background: rgba(212, 175, 55, 0.2); border-radius: 50%; display: flex; align-items: center; justify-content: center; margin: 0 auto 1.5rem; color: #D4AF37;">
              <span class="material-symbols-outlined" style="font-size: 36px;">task_alt</span>
            </div>
            <h3 style="font-family: var(--font-serif); font-size: 1.8rem; color: #FFF; margin-bottom: 0.5rem;">Sanctuary Suite Reserved</h3>
            <p style="color: #A89F98; font-size: 0.95rem; line-height: 1.6; margin-bottom: 1.5rem;">
              Your reservation has been confirmed. Our guest concierge will prepare your private styling suite and complimentary herbal infusion.
            </p>
            <button type="button" class="btn btn-gold" id="doneModalBtn" style="width: 100%; justify-content: center;">
              Return to Atelier
            </button>
          </div>
        `;

        const doneBtn = document.getElementById('doneModalBtn');
        if (doneBtn) doneBtn.addEventListener('click', closeModal);
      }, 900);
    });
  }
});
