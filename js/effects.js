(function () {
    if (typeof Lenis === 'undefined' || typeof gsap === 'undefined') return;

    gsap.registerPlugin(ScrollTrigger);

    const lenis = new Lenis({ lerp: 0.08, smoothWheel: true, syncTouch: false });

    gsap.ticker.add((t) => lenis.raf(t * 1000));
    gsap.ticker.lagSmoothing(0);

    // Nav scroll state via Lenis (replaces window scroll listener)
    const nav = document.getElementById('nav');
    if (nav) {
        lenis.on('scroll', ({ scroll }) => {
            nav.classList.toggle('scrolled', scroll > 48);
            ScrollTrigger.update();
        });
    }

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

    // Service items — staggered reveal
    const serviceItems = document.querySelectorAll('.service-item');
    if (serviceItems.length) {
        gsap.from(serviceItems, {
            opacity: 0, y: 18, duration: 0.85, stagger: 0.08, ease: 'power2.out',
            scrollTrigger: { trigger: serviceItems[0], start: 'top 90%' },
        });
    }

    // Case page blocks — individual scroll reveal
    document.querySelectorAll('.case-block, .case-full, .case-gallery').forEach(el => {
        gsap.from(el, {
            opacity: 0, y: 26, duration: 0.95, ease: 'power2.out',
            scrollTrigger: { trigger: el, start: 'top 86%' },
        });
    });

    // Generic reveals
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
