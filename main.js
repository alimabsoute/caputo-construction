/* ═══════════════════════════════════════════════════
   CAPUTO CONSTRUCTION — MAIN JS
   ═══════════════════════════════════════════════════ */

// ─── NAV SCROLL ───────────────────────────────────
const nav = document.getElementById('nav');
window.addEventListener('scroll', () => {
  nav.classList.toggle('scrolled', window.scrollY > 60);
}, { passive: true });

// ─── MOBILE MENU ──────────────────────────────────
const burger     = document.getElementById('burger');
const mobileMenu = document.getElementById('mobileMenu');
const mobileClose= document.getElementById('mobileClose');

const openMenu  = () => { mobileMenu.classList.add('open'); document.body.style.overflow = 'hidden'; };
const closeMenu = () => { mobileMenu.classList.remove('open'); document.body.style.overflow = ''; };

burger.addEventListener('click', openMenu);
mobileClose.addEventListener('click', closeMenu);
mobileMenu.querySelectorAll('a').forEach(a => a.addEventListener('click', closeMenu));

// ─── SMOOTH SCROLL ────────────────────────────────
document.querySelectorAll('a[href^="#"]').forEach(link => {
  link.addEventListener('click', e => {
    const target = document.querySelector(link.getAttribute('href'));
    if (!target) return;
    e.preventDefault();
    target.scrollIntoView({ behavior: 'smooth', block: 'start' });
  });
});

// ─── SCROLL REVEAL ────────────────────────────────
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

// ─── COUNTUP STATS ────────────────────────────────
let counted = false;
const statsObserver = new IntersectionObserver((entries) => {
  if (entries[0].isIntersecting && !counted) {
    counted = true;
    document.querySelectorAll('.stat__num').forEach(el => {
      const target   = +el.dataset.target;
      const prefix   = el.dataset.prefix  || '';
      const suffix   = el.dataset.suffix  || '';
      const duration = 1800;
      const step     = 16;
      const increment = target / (duration / step);
      let current = 0;
      const timer = setInterval(() => {
        current = Math.min(current + increment, target);
        el.textContent = prefix + Math.floor(current) + suffix;
        if (current >= target) clearInterval(timer);
      }, step);
    });
  }
}, { threshold: 0.5 });

const statsSection = document.getElementById('statsSection');
if (statsSection) statsObserver.observe(statsSection);

// ─── TESTIMONIALS CAROUSEL ────────────────────────
const slider = document.getElementById('slider');
const dots   = document.querySelectorAll('.dot');
let current  = 0;
let autoplay;

const goTo = (i) => {
  current = i;
  slider.style.transform = `translateX(-${i * 100}%)`;
  dots.forEach((d, idx) => d.classList.toggle('active', idx === i));
};

dots.forEach(dot => {
  dot.addEventListener('click', () => {
    goTo(+dot.dataset.i);
    resetAutoplay();
  });
});

const resetAutoplay = () => {
  clearInterval(autoplay);
  autoplay = setInterval(() => goTo((current + 1) % 3), 5000);
};

resetAutoplay();

// swipe support
let startX = 0;
slider.addEventListener('touchstart', e => { startX = e.touches[0].clientX; });
slider.addEventListener('touchend',   e => {
  const diff = startX - e.changedTouches[0].clientX;
  if (Math.abs(diff) > 50) {
    goTo(diff > 0 ? Math.min(current + 1, 2) : Math.max(current - 1, 0));
    resetAutoplay();
  }
});

// ─── PROJECT DATA ─────────────────────────────────
const projects = [
  {
    title:    'Hazleton Medical Office Building',
    category: 'Commercial',
    location: 'Hazleton, PA',
    year:     '2023',
    sqft:     '24,000',
    duration: '14 months',
    value:    '$8.2M',
    desc:     'A state-of-the-art medical office facility featuring cutting-edge HVAC systems, specialized medical-grade finishes, and ADA-compliant design throughout. The project required precise coordination with medical equipment vendors and healthcare consultants. Delivered on schedule despite challenging winter conditions.',
    image:    'https://images.unsplash.com/photo-1486325212027-8081e485255e?w=1200&q=80',
    gallery:  [
      'https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=600&q=80',
      'https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=600&q=80',
      'https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=600&q=80',
    ]
  },
  {
    title:    'Custom Luxury Residence',
    category: 'Residential',
    location: 'Mountain Top, PA',
    year:     '2023',
    sqft:     '4,800',
    duration: '11 months',
    value:    '$1.4M',
    desc:     'A fully custom luxury residence designed and built to the client's exact specifications. Features an open-plan living area, gourmet kitchen, home theater, and three-car garage. Premium finishes throughout including hardwood floors, custom millwork, and natural stone.',
    image:    'https://images.unsplash.com/photo-1570129477492-45c003edd2be?w=1200&q=80',
    gallery:  [
      'https://images.unsplash.com/photo-1484154218962-a197022b5858?w=600&q=80',
      'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=600&q=80',
      'https://images.unsplash.com/photo-1583608205776-bfd35f0d9f83?w=600&q=80',
    ]
  },
  {
    title:    'Industrial Warehouse & Distribution Center',
    category: 'Industrial',
    location: 'Wilkes-Barre, PA',
    year:     '2022',
    sqft:     '85,000',
    duration: '18 months',
    value:    '$12.5M',
    desc:     'A large-scale industrial warehouse and distribution facility with high-bay storage, 24 loading docks, and a 6,000 sq ft office wing. Designed for 24/7 logistics operations with redundant power systems, advanced security, and heavy-duty concrete flooring rated for 10,000 lb forklifts.',
    image:    'https://images.unsplash.com/photo-1565008447742-97f6f38c985c?w=1200&q=80',
    gallery:  [
      'https://images.unsplash.com/photo-1587293852726-70cdb56c2866?w=600&q=80',
      'https://images.unsplash.com/photo-1553413077-190dd305871c?w=600&q=80',
      'https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?w=600&q=80',
    ]
  },
  {
    title:    'Downtown Retail Renovation',
    category: 'Renovation',
    location: 'Scranton, PA',
    year:     '2022',
    sqft:     '6,200',
    duration: '6 months',
    value:    '$980K',
    desc:     'Full gut renovation of a historic downtown retail space, preserving original architectural details while modernizing all MEP systems. The project required careful coordination with adjacent business owners and compliance with historic preservation guidelines throughout.',
    image:    'https://images.unsplash.com/photo-1581858726788-75bc0f6a952d?w=1200&q=80',
    gallery:  [
      'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=600&q=80',
      'https://images.unsplash.com/photo-1524758631624-e2822e304c36?w=600&q=80',
      'https://images.unsplash.com/photo-1631889993959-41b4e9c6e3c5?w=600&q=80',
    ]
  }
];

// ─── MODAL ────────────────────────────────────────
const overlay    = document.getElementById('modalOverlay');
const modalClose = document.getElementById('modalClose');

function openModal(i) {
  const p = projects[i];
  document.getElementById('modalImg').src        = p.image;
  document.getElementById('modalImg').alt        = p.title;
  document.getElementById('modalCategory').textContent = p.category;
  document.getElementById('modalTitle').textContent    = p.title;
  document.getElementById('modalMeta').textContent     = `${p.location}  ·  ${p.year}`;
  document.getElementById('modalSqft').textContent     = p.sqft;
  document.getElementById('modalDuration').textContent = p.duration;
  document.getElementById('modalValue').textContent    = p.value;
  document.getElementById('modalDesc').textContent     = p.desc;

  const gallery = document.getElementById('modalGallery');
  gallery.innerHTML = p.gallery
    .map(src => `<img src="${src}" alt="${p.title}" loading="lazy">`)
    .join('');

  overlay.classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeModal(e) {
  if (e && e.target !== overlay && e.target !== modalClose) return;
  overlay.classList.remove('open');
  document.body.style.overflow = '';
}

overlay.addEventListener('click', closeModal);
modalClose.addEventListener('click', () => {
  overlay.classList.remove('open');
  document.body.style.overflow = '';
});

document.addEventListener('keydown', e => {
  if (e.key === 'Escape' && overlay.classList.contains('open')) {
    overlay.classList.remove('open');
    document.body.style.overflow = '';
  }
});

// expose for onclick in HTML
window.openModal = openModal;
window.closeModal = () => {
  overlay.classList.remove('open');
  document.body.style.overflow = '';
};
