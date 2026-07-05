/* CAPUTO V2 — Editorial Monolith (GSAP ScrollTrigger choreography) */
(() => {
  const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const hasGsap = typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined';

  /* nav */
  const nav = document.getElementById('nav');
  addEventListener('scroll', () => nav.classList.toggle('solid', scrollY > 60), { passive: true });

  /* split manifesto + quote into words */
  document.querySelectorAll('.split').forEach((el) => {
    const cite = el.querySelector('cite');
    const citeHTML = cite ? cite.outerHTML : '';
    if (cite) cite.remove();
    el.innerHTML = el.innerHTML.split(/(<em>.*?<\/em>)/g).map((chunk) => {
      if (chunk.startsWith('<em>')) {
        const inner = chunk.replace(/<\/?em>/g, '');
        return inner.split(' ').map((w) => `<em><span class="word">${w}</span></em>`).join(' ');
      }
      return chunk.split(' ').map((w) => (w.trim() ? `<span class="word">${w}</span>` : w)).join(' ');
    }).join(' ') + citeHTML;
  });

  /* hero video: pause off-screen */
  const hero = document.getElementById('heroVideo');
  if (hero) {
    new IntersectionObserver((es) => es.forEach((e) => {
      if (e.isIntersecting) hero.play().catch(() => {}); else hero.pause();
    }), { threshold: 0.1 }).observe(hero);
    if (reduced) { hero.removeAttribute('autoplay'); hero.pause(); }
  }

  /* craft video: lazy-load + play only in view */
  const craft = document.getElementById('craftVideo');
  if (craft && !reduced) {
    new IntersectionObserver((es) => es.forEach((e) => {
      if (e.isIntersecting) { if (craft.readyState === 0) craft.load(); craft.play().catch(() => {}); }
      else craft.pause();
    }), { threshold: 0.2 }).observe(craft);
  }

  /* stats count-up */
  const fmt = (el, v) => { el.textContent = (el.dataset.prefix || '') + Math.round(v) + (el.dataset.suffix || ''); };
  const statIo = new IntersectionObserver((es) => es.forEach((e) => {
    if (!e.isIntersecting) return;
    const el = e.target; statIo.unobserve(el);
    const target = Number(el.dataset.count);
    if (reduced) return fmt(el, target);
    const t0 = performance.now();
    (function tick(now) {
      const p = Math.min((now - t0) / 1500, 1);
      fmt(el, target * (1 - Math.pow(1 - p, 3)));
      if (p < 1) requestAnimationFrame(tick);
    })(t0);
  }), { threshold: 0.5 });
  document.querySelectorAll('.stat__n').forEach((el) => statIo.observe(el));

  /* service hover preview */
  const preview = document.getElementById('svcPreview');
  if (preview && matchMedia('(hover: hover)').matches) {
    const pimg = preview.querySelector('img');
    let raf = null;
    document.querySelectorAll('.svcrow').forEach((row) => {
      row.addEventListener('mouseenter', () => { pimg.src = row.dataset.img; preview.classList.add('on'); });
      row.addEventListener('mouseleave', () => preview.classList.remove('on'));
    });
    addEventListener('mousemove', (e) => {
      if (!preview.classList.contains('on') || raf) return;
      raf = requestAnimationFrame(() => {
        preview.style.left = `${Math.min(e.clientX + 28, innerWidth - 330)}px`;
        preview.style.top = `${Math.min(e.clientY - 100, innerHeight - 260)}px`;
        raf = null;
      });
    }, { passive: true });
  }

  /* ── GSAP choreography ── */
  if (hasGsap && !reduced) {
    gsap.registerPlugin(ScrollTrigger);

    gsap.to('.hero__video', { scale: 1.08, ease: 'none', scrollTrigger: { trigger: '.hero', start: 'top top', end: 'bottom top', scrub: true } });

    document.querySelectorAll('.split').forEach((el) => {
      gsap.to(el.querySelectorAll('.word'), {
        opacity: 1, stagger: 0.06, ease: 'none',
        scrollTrigger: { trigger: el, start: 'top 78%', end: 'bottom 45%', scrub: true },
      });
    });

    /* pinned era: 1977 → 2026 */
    const yearEl = document.getElementById('eraYear');
    const caps = [...document.querySelectorAll('.era__cap-line')];
    const marks = [1977, 1994, 2011, 2026];
    ScrollTrigger.create({
      trigger: '.era', start: 'top top', end: '+=220%', pin: '.era__pin', scrub: 0.4,
      onUpdate(self) {
        const year = Math.round(1977 + (2026 - 1977) * self.progress);
        yearEl.textContent = year;
        let idx = 0;
        marks.forEach((m, i) => { if (year >= m) idx = i; });
        caps.forEach((c, i) => c.classList.toggle('on', i === idx));
      },
    });
    caps[0].classList.add('on');

    /* parallax project images */
    document.querySelectorAll('.parallax img').forEach((img) => {
      gsap.fromTo(img, { yPercent: -8 }, {
        yPercent: 8, ease: 'none',
        scrollTrigger: { trigger: img.closest('.piece'), start: 'top bottom', end: 'bottom top', scrub: true },
      });
    });

    /* piece info fade-rise */
    document.querySelectorAll('.piece__info').forEach((info) => {
      gsap.from(info, { y: 60, opacity: 0, duration: 1, ease: 'power3.out', scrollTrigger: { trigger: info, start: 'top 82%' } });
    });
    document.querySelectorAll('.assure__item').forEach((item, i) => {
      gsap.from(item, { y: 40, opacity: 0, duration: .8, delay: (i % 2) * .12, ease: 'power3.out', scrollTrigger: { trigger: item, start: 'top 88%' } });
    });
  } else {
    /* no GSAP (offline CDN) or reduced motion: static final state */
    document.querySelectorAll('.split .word').forEach((w) => { w.style.opacity = 1; });
    document.querySelector('.era__cap-line')?.classList.add('on');
    document.getElementById('eraYear').textContent = '1977';
  }

  /* ── wizard ── */
  const form = document.getElementById('wizForm');
  const steps = [...form.querySelectorAll('.wstep')];
  const fill = document.getElementById('wizFill');
  const stepNum = document.getElementById('wizStepNum');
  let current = 0;

  const show = (i) => {
    steps.forEach((s, j) => { s.hidden = j !== i; });
    current = i;
    stepNum.textContent = i + 1;
    fill.style.width = `${((i + 1) / steps.length) * 100}%`;
  };

  const validateStep = (i) => {
    const step = steps[i];
    const err = step.querySelector('.werr');
    err.textContent = '';
    if (i === 0) {
      if (!form.querySelector('input[name="type"]:checked')) { err.textContent = 'Choose a project type to continue.'; return false; }
      return true;
    }
    for (const input of step.querySelectorAll('input[required], select[required]')) {
      if (!input.checkValidity()) {
        err.textContent = input.validity.valueMissing ? 'Please complete every field.'
          : input.name === 'phone' ? 'That phone number doesn’t look complete.' : 'Please check your entries.';
        input.focus();
        return false;
      }
    }
    return true;
  };

  form.addEventListener('click', (e) => {
    if (e.target.matches('[data-next]')) { if (validateStep(current)) show(current + 1); }
    if (e.target.matches('[data-prev]')) show(current - 1);
  });

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    if (form.querySelector('.hp').value) return;
    if (!validateStep(current)) return;
    const data = Object.fromEntries(new FormData(form).entries());
    data.submittedAt = new Date().toISOString();
    try {
      const inbox = JSON.parse(localStorage.getItem('caputo-inquiries') || '[]');
      inbox.push(data);
      localStorage.setItem('caputo-inquiries', JSON.stringify(inbox));
    } catch {}
    const btn = document.getElementById('wizSubmit');
    btn.disabled = true; btn.textContent = 'Sending…';
    setTimeout(() => {
      document.getElementById('thanks').hidden = false;
      document.body.style.overflow = 'hidden';
    }, reduced ? 0 : 700);
  });

  document.getElementById('thanksClose').addEventListener('click', () => {
    document.getElementById('thanks').hidden = true;
    document.body.style.overflow = '';
  });

  show(0);
})();
