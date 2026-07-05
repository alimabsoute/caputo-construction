/* CAPUTO V3 — Kinetic Workshop interactions (vanilla) */
(() => {
  const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const fine = matchMedia('(hover: hover) and (pointer: fine)').matches;

  /* nav */
  const nav = document.getElementById('nav');
  addEventListener('scroll', () => nav.classList.toggle('on', scrollY > 50), { passive: true });

  /* sheet menu */
  const sheet = document.getElementById('sheetMenu');
  document.getElementById('burger').addEventListener('click', () => sheet.classList.add('open'));
  document.getElementById('sheetClose').addEventListener('click', () => sheet.classList.remove('open'));
  sheet.querySelectorAll('a').forEach((a) => a.addEventListener('click', () => sheet.classList.remove('open')));

  /* reveal groups */
  document.querySelectorAll('.svc__grid, .work__grid, .why__rows, .tally').forEach((group) => {
    [...group.children].forEach((el, i) => { el.classList.add('rv'); el.style.setProperty('--i', i % 6); });
  });
  if (reduced) {
    document.querySelectorAll('.rv').forEach((el) => el.classList.add('visible'));
  } else {
    const io = new IntersectionObserver((es) => es.forEach((e) => {
      if (!e.isIntersecting) return;
      e.target.classList.add('visible');
      const n = e.target.querySelector?.('.tally__n');
      if (n) countUp(n);
      io.unobserve(e.target);
    }), { threshold: 0.2 });
    document.querySelectorAll('.rv').forEach((el) => io.observe(el));
  }

  function countUp(el) {
    if (el.dataset.done) return;
    el.dataset.done = '1';
    const target = Number(el.dataset.count);
    const pre = el.dataset.prefix || '', suf = el.dataset.suffix || '';
    if (reduced || target <= 1) { el.textContent = pre + target + suf; return; }
    const t0 = performance.now();
    (function tick(now) {
      const p = Math.min((now - t0) / 1400, 1);
      el.textContent = pre + Math.round(target * (1 - Math.pow(1 - p, 3))) + suf;
      if (p < 1) requestAnimationFrame(tick);
    })(t0);
  }
  if (reduced) document.querySelectorAll('.tally__n').forEach((el) => {
    el.textContent = (el.dataset.prefix || '') + el.dataset.count + (el.dataset.suffix || '');
  });

  /* hero video pause off-screen */
  const hero = document.getElementById('heroVideo');
  if (hero) {
    new IntersectionObserver((es) => es.forEach((e) => {
      if (e.isIntersecting) hero.play().catch(() => {}); else hero.pause();
    }), { threshold: 0.1 }).observe(hero);
    if (reduced) { hero.removeAttribute('autoplay'); hero.pause(); }
  }

  /* yard video lazy play */
  const yard = document.getElementById('yardVideo');
  if (yard && !reduced) {
    new IntersectionObserver((es) => es.forEach((e) => {
      if (e.isIntersecting) { if (yard.readyState === 0) yard.load(); yard.play().catch(() => {}); }
      else yard.pause();
    }), { threshold: 0.25 }).observe(yard);
  }

  /* hover tilt (max 6deg) */
  if (fine && !reduced) {
    document.querySelectorAll('[data-tilt]').forEach((el) => {
      let raf = null;
      el.addEventListener('pointermove', (e) => {
        if (raf) return;
        raf = requestAnimationFrame(() => {
          const r = el.getBoundingClientRect();
          const rx = ((e.clientY - r.top) / r.height - 0.5) * -6;
          const ry = ((e.clientX - r.left) / r.width - 0.5) * 6;
          el.style.transform = `perspective(700px) rotateX(${rx.toFixed(2)}deg) rotateY(${ry.toFixed(2)}deg)`;
          raf = null;
        });
      });
      el.addEventListener('pointerleave', () => { el.style.transform = ''; });
    });

    /* magnetic buttons */
    document.querySelectorAll('[data-mag]').forEach((btn) => {
      const inner = btn.querySelector('span');
      let raf = null;
      btn.addEventListener('pointermove', (e) => {
        if (raf) return;
        raf = requestAnimationFrame(() => {
          const r = btn.getBoundingClientRect();
          const dx = e.clientX - (r.left + r.width / 2);
          const dy = e.clientY - (r.top + r.height / 2);
          btn.style.transform = `translate(${dx * 0.22}px, ${dy * 0.22}px)`;
          if (inner) inner.style.transform = `translate(${dx * 0.1}px, ${dy * 0.1}px)`;
          raf = null;
        });
      });
      btn.addEventListener('pointerleave', () => {
        btn.style.transition = 'transform .45s cubic-bezier(0.22, 1, 0.36, 1)';
        btn.style.transform = '';
        if (inner) { inner.style.transition = 'transform .45s cubic-bezier(0.22, 1, 0.36, 1)'; inner.style.transform = ''; }
        setTimeout(() => { btn.style.transition = ''; if (inner) inner.style.transition = ''; }, 450);
      });
    });
  }

  /* order form */
  const form = document.getElementById('orderForm');
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    if (form.querySelector('.hp').value) return;
    let ok = true;

    form.querySelectorAll('.ofield input[required], .ofield textarea[required]').forEach((input) => {
      const field = input.closest('.ofield');
      const err = field.querySelector('.oerr');
      if (!input.checkValidity()) {
        ok = false; field.classList.add('bad');
        err.textContent = input.validity.valueMissing ? 'Required'
          : input.name === 'phone' ? 'Enter a valid phone number' : 'Check this entry';
      } else { field.classList.remove('bad'); err.textContent = ''; }
    });

    const typeErr = document.getElementById('oTypeErr');
    if (!form.querySelector('input[name="type"]:checked')) { ok = false; typeErr.textContent = 'Pick a project type'; }
    else typeErr.textContent = '';

    if (!ok) return;

    const data = Object.fromEntries(new FormData(form).entries());
    data.submittedAt = new Date().toISOString();
    try {
      const inbox = JSON.parse(localStorage.getItem('caputo-inquiries') || '[]');
      inbox.push(data);
      localStorage.setItem('caputo-inquiries', JSON.stringify(inbox));
    } catch {}

    const btn = document.getElementById('orderSubmit');
    btn.disabled = true;
    btn.querySelector('span').textContent = 'SENDING…';
    setTimeout(() => {
      const wo = document.getElementById('workOrder');
      wo.hidden = false;
      requestAnimationFrame(() => wo.classList.add('go'));
      wo.scrollIntoView({ behavior: reduced ? 'auto' : 'smooth', block: 'center' });
    }, reduced ? 0 : 800);
  });
})();
