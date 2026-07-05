/* CAPUTO V1 — Blueprint interactions (vanilla) */
(() => {
  const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* nav state */
  const nav = document.getElementById('nav');
  addEventListener('scroll', () => nav.classList.toggle('scrolled', scrollY > 40), { passive: true });

  /* mobile menu */
  const menu = document.getElementById('mobileMenu');
  document.getElementById('burger').addEventListener('click', () => menu.classList.add('open'));
  document.getElementById('mobileClose').addEventListener('click', () => menu.classList.remove('open'));
  menu.querySelectorAll('a').forEach((a) => a.addEventListener('click', () => menu.classList.remove('open')));

  /* stagger indices for reveal groups */
  document.querySelectorAll('.svc__grid, .sched__table, .proc__list, .why__list, .dwg__legend').forEach((group) => {
    [...group.children].forEach((el, i) => el.style.setProperty('--i', i));
  });

  /* prep SVG shapes for draw-on (normalize dash space) */
  document.querySelectorAll('.draw, .ply').forEach((g) => {
    g.querySelectorAll('path, line, rect, circle, polyline').forEach((s) => s.setAttribute('pathLength', '1'));
  });
  document.querySelectorAll('.ply').forEach((g) => g.style.setProperty('--d', (Number(g.dataset.ply || 1) - 1) * 0.55));

  if (reduced) {
    document.querySelectorAll('.reveal').forEach((el) => el.classList.add('visible'));
    document.querySelectorAll('.draw, .ply, .dwg__svg').forEach((el) => el.classList.add('drawn'));
    document.querySelectorAll('.sched__num').forEach(setFinalCount);
  } else {
    /* reveal + count-up + drawing observers */
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (!e.isIntersecting) return;
        e.target.classList.add('visible');
        if (e.target.classList.contains('sched__cell')) countUp(e.target.querySelector('.sched__num'));
        io.unobserve(e.target);
      });
    }, { threshold: 0.25 });
    document.querySelectorAll('.reveal').forEach((el) => io.observe(el));

    const drawIo = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (!e.isIntersecting) return;
        e.target.classList.add('drawn');
        drawIo.unobserve(e.target);
      });
    }, { threshold: 0.35 });
    document.querySelectorAll('.svc__icon, .ck').forEach((el) => drawIo.observe(el));
    const dwg = document.querySelector('.dwg__svg');
    if (dwg) drawIo.observe(dwg);

    const rail = document.querySelector('.proc__rail');
    if (rail) {
      const railIo = new IntersectionObserver((es) => es.forEach((e) => {
        if (e.isIntersecting) { rail.classList.add('go'); railIo.disconnect(); }
      }), { threshold: 0.6 });
      railIo.observe(rail);
    }
  }

  function setFinalCount(numEl) {
    const t = Number(numEl.dataset.count);
    numEl.textContent = (numEl.dataset.prefix || '') + t + (numEl.dataset.suffix || '');
  }
  function countUp(numEl) {
    if (!numEl || numEl.dataset.done) return;
    numEl.dataset.done = '1';
    const target = Number(numEl.dataset.count);
    const pre = numEl.dataset.prefix || '';
    const suf = numEl.dataset.suffix || '';
    const t0 = performance.now();
    const dur = 1400;
    (function tick(now) {
      const p = Math.min((now - t0) / dur, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      numEl.textContent = pre + Math.round(target * eased) + suf;
      if (p < 1) requestAnimationFrame(tick);
    })(t0);
  }

  /* hero video: pause when off-screen */
  const vid = document.getElementById('heroVideo');
  if (vid) {
    new IntersectionObserver((es) => es.forEach((e) => {
      if (e.isIntersecting) { vid.play().catch(() => {}); } else vid.pause();
    }), { threshold: 0.1 }).observe(vid);
    if (reduced) { vid.removeAttribute('autoplay'); vid.pause(); }
  }

  /* budget slider */
  const budget = document.getElementById('budget');
  const budgetOut = document.getElementById('budgetOut');
  const SCALE = ['$50K', '$100K', '$250K', '$500K', '$750K', '$1M', '$2M', '$5M', '$10M', '$10M+'];
  if (budget) budget.addEventListener('input', () => { budgetOut.textContent = SCALE[budget.value]; });

  /* spec sheet form */
  const form = document.getElementById('specForm');
  form.addEventListener('submit', (ev) => {
    ev.preventDefault();
    if (form.querySelector('.hp').value) return; // honeypot
    let ok = true;

    form.querySelectorAll('.cell input[required], .cell textarea[required]').forEach((input) => {
      const cell = input.closest('.cell');
      const err = cell.querySelector('.cell__err');
      if (!input.checkValidity()) {
        ok = false;
        cell.classList.add('bad');
        err.textContent = input.validity.valueMissing ? 'REQUIRED FIELD'
          : input.name === 'phone' ? 'ENTER A VALID PHONE NUMBER' : 'CHECK THIS ENTRY';
      } else { cell.classList.remove('bad'); err.textContent = ''; }
    });

    const types = form.querySelectorAll('input[name="type"]:checked');
    const typeErr = document.getElementById('typeErr');
    if (!types.length) { ok = false; typeErr.textContent = 'STAMP AT LEAST ONE PROJECT TYPE'; }
    else typeErr.textContent = '';

    if (!ok) return;

    const data = Object.fromEntries(new FormData(form).entries());
    data.type = [...types].map((t) => t.value).join(', ');
    data.budget = SCALE[form.budget.value];
    data.submittedAt = new Date().toISOString();
    try {
      const inbox = JSON.parse(localStorage.getItem('caputo-inquiries') || '[]');
      inbox.push(data);
      localStorage.setItem('caputo-inquiries', JSON.stringify(inbox));
    } catch {}

    const btn = document.getElementById('specSubmit');
    btn.disabled = true;
    btn.textContent = 'Filing…';
    setTimeout(() => {
      form.closest('.sheet').classList.add('stamped');
      document.getElementById('specDone').hidden = false;
      btn.textContent = 'Submitted';
    }, reduced ? 0 : 800);
  });
})();
