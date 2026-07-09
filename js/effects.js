(function () {
    // El estado scrolled del nav no depende de las librerías de animación
    const nav = document.getElementById('nav');

    if (nav) {
        window.addEventListener('scroll', () => {
            nav.classList.toggle('scrolled', window.scrollY > 48);
        }, { passive: true });
    }

    if (typeof Lenis === 'undefined' || typeof gsap === 'undefined') return;

    // Respetar prefers-reduced-motion: solo animaciones, el resto sigue
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    gsap.registerPlugin(ScrollTrigger);

    const lenis = new Lenis({ lerp: 0.08, smoothWheel: true, syncTouch: false });

    gsap.ticker.add((t) => lenis.raf(t * 1000));
    gsap.ticker.lagSmoothing(0);

    lenis.on('scroll', () => ScrollTrigger.update());

    // Smooth anchor navigation
    document.querySelectorAll('a[href^="#"]').forEach(a => {
        a.addEventListener('click', e => {
            const id = a.getAttribute('href');
            if (!id || id === '#') return;
            const target = document.querySelector(id);
            if (target) {
                e.preventDefault();
                lenis.scrollTo(target, { duration: 1.2, easing: t => Math.min(1, 1.001 - Math.pow(2, -10 * t)) });
            }
        });
    });

    // ── Grain overlay ──────────────────────────────────────────────────
    const grainStyle = document.createElement('style');
    grainStyle.textContent = `
        .grain-overlay {
            position: fixed; inset: 0; z-index: 8000;
            pointer-events: none;
            background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='260' height='260'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.78' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='260' height='260' filter='url(%23n)'/%3E%3C/svg%3E");
            background-repeat: repeat;
            background-size: 260px 260px;
            opacity: 0.038;
            mix-blend-mode: multiply;
        }
    `;
    document.head.appendChild(grainStyle);
    const grain = document.createElement('div');
    grain.className = 'grain-overlay';
    grain.setAttribute('aria-hidden', 'true');
    document.body.appendChild(grain);

    // ── Custom cursor (solo desktop) ───────────────────────────────────
    // mix-blend-mode: difference se auto-invierte sobre fotos oscurecidas
    // (brightness 0.7-0.88 en todo el sitio) y sobre fondos claros por igual;
    // un cursor #0A0A0A liso queda invisible contra las fotos, que son casi
    // todas oscuras a propósito.
    if (!('ontouchstart' in window) && window.innerWidth > 768) {
        const cursorStyle = document.createElement('style');
        cursorStyle.textContent = `
            *, *::before, *::after { cursor: none !important; }

            .cur-dot {
                position: fixed; top: 0; left: 0;
                width: 6px; height: 6px;
                background: var(--sand, #B5A898); border-radius: 50%;
                pointer-events: none; z-index: 9999;
                transform: translate(-50%,-50%);
                mix-blend-mode: difference;
                will-change: transform;
                transition: transform 0.06s;
            }
            .cur-ring {
                position: fixed; top: 0; left: 0;
                width: 34px; height: 34px;
                border: 1px solid var(--sand, #B5A898);
                border-radius: 50%;
                pointer-events: none; z-index: 9998;
                transform: translate(-50%,-50%);
                mix-blend-mode: difference;
                will-change: transform;
                transition: width 0.35s cubic-bezier(0.16,1,0.3,1),
                            height 0.35s cubic-bezier(0.16,1,0.3,1),
                            opacity 0.3s;
            }
            .cur-ring.is-link  { width: 44px; height: 44px; }
            .cur-ring.is-image { width: 82px; height: 82px; }
            .cur-ring.is-hidden { opacity: 0; }

            .cur-label {
                position: fixed; top: 0; left: 0;
                width: 82px; height: 82px;
                border-radius: 50%;
                display: flex; align-items: center; justify-content: center;
                font-family: var(--serif, 'Bodoni Moda', Georgia, serif);
                font-size: 13px; font-style: italic; font-weight: 400;
                color: var(--sand, #B5A898);
                pointer-events: none; z-index: 9997;
                transform: translate(-50%,-50%) scale(0.82);
                mix-blend-mode: difference;
                will-change: transform, opacity;
                opacity: 0;
                transition: opacity 0.3s cubic-bezier(0.16,1,0.3,1),
                            transform 0.35s cubic-bezier(0.16,1,0.3,1);
            }
            .cur-ring.is-image ~ .cur-label { opacity: 1; transform: translate(-50%,-50%) scale(1); }
        `;
        document.head.appendChild(cursorStyle);

        const dot   = document.createElement('div'); dot.className = 'cur-dot';
        const ring  = document.createElement('div'); ring.className = 'cur-ring';
        const label = document.createElement('div'); label.className = 'cur-label';
        label.textContent = 'Ver';
        document.body.append(dot, ring, label);

        let mx = -100, my = -100, rx = -100, ry = -100;

        document.addEventListener('mousemove', e => {
            mx = e.clientX; my = e.clientY;
            dot.style.transform = `translate(${mx}px, ${my}px)`;
        });
        document.addEventListener('mouseleave', () => ring.classList.add('is-hidden'));
        document.addEventListener('mouseenter', () => ring.classList.remove('is-hidden'));

        (function tickRing() {
            rx += (mx - rx) * 0.095;
            ry += (my - ry) * 0.095;
            ring.style.transform  = `translate(${rx}px, ${ry}px)`;
            label.style.transform = `translate(${rx}px, ${ry}px)`;
            requestAnimationFrame(tickRing);
        })();

        document.querySelectorAll('a, button').forEach(el => {
            el.addEventListener('mouseenter', () => { ring.classList.add('is-link'); ring.classList.remove('is-image'); });
            el.addEventListener('mouseleave', () => ring.classList.remove('is-link'));
        });

        const imageEls = '.strip-item, .case-hero-img, .case-block-img, .case-full, .hero-img-main, .hero-img-float, .about-photo';
        document.querySelectorAll(imageEls).forEach(el => {
            el.addEventListener('mouseenter', () => { ring.classList.add('is-image'); ring.classList.remove('is-link'); });
            el.addEventListener('mouseleave', () => ring.classList.remove('is-image'));
        });
    }

    // ── Section reveals ────────────────────────────────────────────────
    const serviceItems = document.querySelectorAll('.service-item');
    if (serviceItems.length) {
        gsap.from(serviceItems, {
            opacity: 0, y: 18, duration: 0.85, stagger: 0.08, ease: 'power2.out',
            scrollTrigger: { trigger: serviceItems[0], start: 'top 90%' },
        });
    }

    document.querySelectorAll('.work-item').forEach((el, i) => {
        gsap.from(el, {
            opacity: 0, y: 20, duration: 0.8, ease: 'power2.out',
            scrollTrigger: { trigger: el, start: 'top 90%' },
            delay: (i % 3) * 0.08,
        });
    });

    document.querySelectorAll('.case-block, .case-full, .case-gallery').forEach(el => {
        gsap.from(el, {
            opacity: 0, y: 26, duration: 0.95, ease: 'power2.out',
            scrollTrigger: { trigger: el, start: 'top 86%' },
        });
    });

    [
        '.strip-header',
        '.about-editorial-headline',
        '.about-inner',
        '.contact-headline',
        '.contact-form',
        '.case-intro',
        '.case-credits',
        '.case-next',
    ].forEach(sel => {
        document.querySelectorAll(sel).forEach(el => {
            gsap.from(el, {
                opacity: 0, y: 22, duration: 0.88, ease: 'power2.out',
                scrollTrigger: { trigger: el, start: 'top 88%' },
            });
        });
    });

    window._lenis = lenis;
})();
