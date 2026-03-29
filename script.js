/* ===================================
   Studio Artvika — JavaScript
   =================================== */

document.addEventListener('DOMContentLoaded', () => {

  // =======================================
  // EVENTS DATA
  // =======================================
  const EVENTS = [
    {
      id: 1,
      title: 'Paper Flower Bouquet Workshop',
      type: 'flower',
      typeLabel: 'Paper Flowers',
      date: '2026-04-12',
      time: '14:00 - 17:00',
      location: 'Studio Artvika, Maura',
      description: 'Create a stunning bouquet of handmade paper flowers using premium crepe paper. Perfect for beginners — take your forever bouquet home!',
      spots: 8,
      spotsLeft: 5,
      duration: 3 // hours
    },
    {
      id: 2,
      title: 'Stained Glass Painting Evening',
      type: 'glass',
      typeLabel: 'Stained Glass',
      date: '2026-04-19',
      time: '18:00 - 21:00',
      location: 'Studio Artvika, Maura',
      description: 'Design luminous glass artworks with rich paints. Learn line work, layering, and finishing techniques in a cozy evening session.',
      spots: 10,
      spotsLeft: 7,
      duration: 3
    },
    {
      id: 3,
      title: 'Traditional Ebru — Water Marbling',
      type: 'ebru',
      typeLabel: 'Ebru',
      date: '2026-04-26',
      time: '13:00 - 16:00',
      location: 'Studio Artvika, Maura',
      description: 'Guide pigments across water to create one-of-a-kind marbled patterns. A slow, meditative, and endlessly surprising experience.',
      spots: 6,
      spotsLeft: 3,
      duration: 3
    },
    {
      id: 4,
      title: 'Linocut Workshop — Lino Trykk',
      type: 'lino',
      typeLabel: 'Linocut',
      date: '2026-05-03',
      time: '15:00 - 18:00',
      location: 'Studio Artvika, Maura',
      description: 'Carve and print your own linocut art. Learn the tactile craft of relief printing and take home your artwork.',
      spots: 8,
      spotsLeft: 6,
      duration: 3
    },
    {
      id: 5,
      title: 'Spring Paper Flowers — Daffodils',
      type: 'flower',
      typeLabel: 'Paper Flowers',
      date: '2026-05-10',
      time: '14:00 - 16:30',
      location: 'Studio Artvika, Maura',
      description: 'Welcome spring by crafting beautiful paper daffodils. A joyful workshop for all ages and skill levels.',
      spots: 10,
      spotsLeft: 8,
      duration: 2.5
    },
    {
      id: 6,
      title: 'Ebru Art & Tea Evening',
      type: 'ebru',
      typeLabel: 'Ebru',
      date: '2026-05-17',
      time: '18:00 - 20:30',
      location: 'Studio Artvika, Maura',
      description: 'An intimate evening of Turkish water marbling art paired with warm tea. Create, connect, and unwind.',
      spots: 8,
      spotsLeft: 4,
      duration: 2.5
    }
  ];

  // =======================================
  // NAVBAR
  // =======================================
  const navbar = document.getElementById('navbar');

  const handleScroll = () => {
    navbar.classList.toggle('scrolled', window.scrollY > 60);
  };

  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll();

  // Mobile nav toggle
  const navToggle = document.getElementById('navToggle');
  const navLinks  = document.getElementById('navLinks');

  navToggle.addEventListener('click', () => {
    navToggle.classList.toggle('active');
    navLinks.classList.toggle('open');
  });

  navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      navToggle.classList.remove('active');
      navLinks.classList.remove('open');
    });
  });

  // =======================================
  // SCROLL-REVEAL ANIMATIONS
  // =======================================
  const observerOptions = { root: null, rootMargin: '0px 0px -80px 0px', threshold: 0.15 };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in-view');
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  document.querySelectorAll('[data-animate]').forEach(el => observer.observe(el));

  // =======================================
  // GALLERY LIGHTBOX
  // =======================================
  const lightbox    = document.getElementById('lightbox');
  const lightboxImg = document.getElementById('lightboxImg');
  const lightboxClose = document.getElementById('lightboxClose');

  document.querySelectorAll('.gallery-item').forEach(item => {
    item.addEventListener('click', () => {
      const img = item.querySelector('img');
      lightboxImg.src = img.src;
      lightboxImg.alt = img.alt;
      lightbox.classList.add('active');
      document.body.style.overflow = 'hidden';
    });
  });

  lightboxClose.addEventListener('click', closeLightbox);
  lightbox.addEventListener('click', (e) => { if (e.target === lightbox) closeLightbox(); });
  document.addEventListener('keydown', (e) => { if (e.key === 'Escape') { closeLightbox(); closeModal(); } });

  function closeLightbox() {
    lightbox.classList.remove('active');
    document.body.style.overflow = '';
  }

  // =======================================
  // SMOOTH SCROLL
  // =======================================
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
      const target = document.querySelector(anchor.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });

  // =======================================
  // ACTIVE NAV LINK HIGHLIGHT
  // =======================================
  const sections = document.querySelectorAll('section[id]');

  const navObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.id;
        document.querySelectorAll('.nav-links a').forEach(a => {
          a.classList.toggle('active-link', a.getAttribute('href') === `#${id}`);
        });
      }
    });
  }, { rootMargin: '-50% 0px -50% 0px', threshold: 0 });

  sections.forEach(section => navObserver.observe(section));

  // =======================================
  // CALENDAR
  // =======================================
  let currentCalDate = new Date();

  const calMonthYear = document.getElementById('calMonthYear');
  const calDays      = document.getElementById('calDays');
  const calPrev      = document.getElementById('calPrev');
  const calNext      = document.getElementById('calNext');

  const MONTHS = ['January','February','March','April','May','June',
                  'July','August','September','October','November','December'];

  function getEventDatesForMonth(year, month) {
    const dates = new Set();
    EVENTS.forEach(ev => {
      const d = new Date(ev.date);
      if (d.getFullYear() === year && d.getMonth() === month) {
        dates.add(d.getDate());
      }
    });
    return dates;
  }

  function renderCalendar() {
    const year  = currentCalDate.getFullYear();
    const month = currentCalDate.getMonth();

    calMonthYear.textContent = `${MONTHS[month]} ${year}`;

    const firstDay  = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const startDay  = firstDay === 0 ? 6 : firstDay - 1; // Monday start

    const eventDates = getEventDatesForMonth(year, month);
    const today = new Date();

    let html = '';

    // Previous month filler
    const prevMonth = new Date(year, month, 0).getDate();
    for (let i = startDay - 1; i >= 0; i--) {
      html += `<div class="cal-day other-month">${prevMonth - i}</div>`;
    }

    // Current month days
    for (let d = 1; d <= daysInMonth; d++) {
      let classes = 'cal-day';
      if (today.getDate() === d && today.getMonth() === month && today.getFullYear() === year) {
        classes += ' today';
      }
      if (eventDates.has(d)) {
        classes += ' has-event';
      }
      html += `<div class="${classes}" data-date="${year}-${String(month+1).padStart(2,'0')}-${String(d).padStart(2,'0')}">${d}</div>`;
    }

    // Next month filler
    const totalCells = startDay + daysInMonth;
    const remaining = totalCells % 7 === 0 ? 0 : 7 - (totalCells % 7);
    for (let i = 1; i <= remaining; i++) {
      html += `<div class="cal-day other-month">${i}</div>`;
    }

    calDays.innerHTML = html;

    // Click handlers on event days
    calDays.querySelectorAll('.cal-day.has-event').forEach(day => {
      day.addEventListener('click', () => {
        const dateStr = day.dataset.date;
        const eventCard = document.querySelector(`.event-card[data-date="${dateStr}"]`);
        if (eventCard) {
          eventCard.scrollIntoView({ behavior: 'smooth', block: 'center' });
          eventCard.style.outline = '2px solid var(--color-primary)';
          setTimeout(() => eventCard.style.outline = '', 2000);
        }
      });
    });
  }

  calPrev.addEventListener('click', () => {
    currentCalDate.setMonth(currentCalDate.getMonth() - 1);
    renderCalendar();
  });

  calNext.addEventListener('click', () => {
    currentCalDate.setMonth(currentCalDate.getMonth() + 1);
    renderCalendar();
  });

  renderCalendar();

  // =======================================
  // EVENT CARDS
  // =======================================
  const eventsList = document.getElementById('eventsList');

  function formatDate(dateStr) {
    const d = new Date(dateStr);
    return d.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
  }

  function getDay(dateStr) { return new Date(dateStr).getDate(); }
  function getMonthShort(dateStr) {
    return new Date(dateStr).toLocaleDateString('en-US', { month: 'short' });
  }

  function buildGoogleCalUrl(event) {
    const start = event.date.replace(/-/g, '') + 'T' + event.time.split(' - ')[0].replace(':', '') + '00';
    const endTime = event.time.split(' - ')[1];
    const end   = event.date.replace(/-/g, '') + 'T' + endTime.replace(':', '') + '00';

    const params = new URLSearchParams({
      action: 'TEMPLATE',
      text: event.title,
      dates: `${start}/${end}`,
      details: event.description + '\n\nStudio Artvika — studioartvika7@gmail.com\nhttps://www.instagram.com/artvika.no/',
      location: event.location,
      ctz: 'Europe/Oslo'
    });

    return `https://calendar.google.com/calendar/render?${params.toString()}`;
  }

  function renderEvents() {
    let html = '';

    EVENTS.forEach(event => {
      const gcalUrl = buildGoogleCalUrl(event);
      const spotsColor = event.spotsLeft <= 3 ? 'color: #e65100;' : '';

      html += `
        <div class="event-card" data-date="${event.date}" data-animate>
          <div style="display:flex;gap:1.25rem;align-items:flex-start;">
            <div class="event-date-badge">
              <span class="day">${getDay(event.date)}</span>
              <span class="month">${getMonthShort(event.date)}</span>
            </div>
            <div style="flex:1;">
              <span class="event-type ${event.type}">${event.typeLabel}</span>
              <h3 class="event-title">${event.title}</h3>
              <p class="event-meta">
                <span>🕐 ${event.time}</span>
                <span>📍 ${event.location}</span>
              </p>
              <p class="event-desc">${event.description}</p>
              <div class="event-actions">
                <button class="btn-register" onclick="openRegistration(${event.id})">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 11.08V12a10 10 0 11-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>
                  Register
                </button>
                <a href="${gcalUrl}" target="_blank" rel="noopener" class="btn-gcal">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
                  Google Calendar
                </a>
              </div>
              <div class="event-spots" style="${spotsColor}">
                <span class="dot"></span>
                ${event.spotsLeft} of ${event.spots} spots available
              </div>
            </div>
          </div>
        </div>
      `;
    });

    eventsList.innerHTML = html;

    // Re-observe newly added animated elements
    eventsList.querySelectorAll('[data-animate]').forEach(el => observer.observe(el));
  }

  renderEvents();

  // =======================================
  // REGISTRATION MODAL
  // =======================================
  const modal     = document.getElementById('registrationModal');
  const modalClose = document.getElementById('modalClose');
  const modalTitle = document.getElementById('modalTitle');
  const modalDate  = document.getElementById('modalDate');
  const modalBadge = document.getElementById('modalBadge');
  const regForm    = document.getElementById('registrationForm');
  const formSuccess = document.getElementById('formSuccess');
  const btnGoogleCal = document.getElementById('btnGoogleCal');
  const btnGoogleCalSuccess = document.getElementById('btnGoogleCalSuccess');

  let currentEventId = null;

  window.openRegistration = function(eventId) {
    const event = EVENTS.find(e => e.id === eventId);
    if (!event) return;

    currentEventId = eventId;

    modalBadge.textContent = event.typeLabel;
    modalBadge.className = `modal-badge`;
    modalBadge.style.background = getTypeColor(event.type);

    modalTitle.textContent = event.title;
    modalDate.textContent = `${formatDate(event.date)} • ${event.time} • ${event.location}`;

    const gcalUrl = buildGoogleCalUrl(event);
    btnGoogleCal.href = gcalUrl;
    btnGoogleCalSuccess.href = gcalUrl;

    // Reset form
    regForm.reset();
    regForm.style.display = '';
    formSuccess.style.display = 'none';

    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
  };

  function getTypeColor(type) {
    const colors = {
      flower: '#e1306c',
      glass: '#5b7cdb',
      ebru: '#d4a85c',
      lino: '#8ba888'
    };
    return colors[type] || '#c0785a';
  }

  function closeModal() {
    modal.classList.remove('active');
    document.body.style.overflow = '';
  }

  modalClose.addEventListener('click', closeModal);
  modal.addEventListener('click', (e) => { if (e.target === modal) closeModal(); });

  regForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const formData = new FormData(regForm);
    const data = Object.fromEntries(formData.entries());
    data.eventId = currentEventId;

    console.log('Registration submitted:', data);

    // Show success
    regForm.style.display = 'none';
    formSuccess.style.display = '';
  });
});
