(async () => {
    const slug = document.body.dataset.slug;
    if (!slug) return;

    // Lee el idioma directo de localStorage (no depende de que i18n.js ya haya
    // corrido: este script empieza antes en el <head>, pero i18n.js normalmente
    // ya está listo para cuando el fetch a Sanity resuelve).
    function getLang() {
        return localStorage.getItem('ash_lang') || 'es';
    }

    // Traducción del campo `esValue` para este slug/campo, o null si no hay
    // traducción (falla silenciosa a español, nunca deja el campo vacío).
    function tr(field, esValue) {
        const lang = getLang();
        if (lang === 'es') return esValue;
        const dict = window.CASE_I18N?.[slug]?.[lang];
        if (!dict || dict[field] == null) return esValue;
        return dict[field];
    }

    let _project = null;

    function render(project) {
        _project = project;
        const lang = getLang();
        const dict = lang !== 'es' ? window.CASE_I18N?.[slug]?.[lang] : null;

        // Hero
        const heroTitleEl = document.querySelector('.case-title');
        const heroCatEl   = document.querySelector('.case-category');
        const heroMetaEls = document.querySelectorAll('.case-hero-meta span');
        if (heroTitleEl && project.title) heroTitleEl.textContent = tr('title', project.title);
        if (heroCatEl && project.category) {
            heroCatEl.textContent = dict?.categoryLine || `${project.category} — ${project.location || ''}`;
        }
        if (heroMetaEls[0] && project.location) heroMetaEls[0].textContent = tr('location', project.location);
        if (heroMetaEls[1] && project.category) heroMetaEls[1].textContent = tr('category', project.category);
        if (heroMetaEls[2] && dict?.meta3) heroMetaEls[2].textContent = dict.meta3;

        // Hero image
        const heroImg = document.querySelector('.case-hero-img');
        if (heroImg) {
            const src = project.localHeroImage
                || (project.heroImage ? imageUrl(project.heroImage.asset._ref, 1600) : null);
            if (src) heroImg.src = src;
            if (project.heroImageAlt || project.title) heroImg.alt = project.heroImageAlt || project.title;
        }

        // Lede
        const ledeEl = document.querySelector('.case-lede');
        if (ledeEl && project.lede) ledeEl.textContent = tr('lede', project.lede);

        // Content blocks
        if (project.blocks?.length) {
            const bodyEl = document.querySelector('.case-body');
            if (bodyEl) {
                bodyEl.innerHTML = project.blocks.map((block, i) => {
                    const trBlock = dict?.blocks?.[i];
                    const heading = trBlock?.heading || block.heading;
                    const bodyHtml = trBlock?.body || (block.body ? toHtml(block.body) : '');
                    const imgSrc = block.localImage
                        || (block.image ? imageUrl(block.image.asset._ref, 900) : null);
                    const imgHtml = imgSrc
                        ? `<img class="case-block-img" src="${imgSrc}" alt="${block.imageAlt || ''}" loading="lazy">`
                        : '';
                    const textHtml = `
                        <div class="case-block-text">
                            ${heading ? `<h2>${heading}</h2>` : ''}
                            ${bodyHtml}
                        </div>`;
                    return `
                        <div class="case-block${block.reversed ? ' case-block--reverse' : ''}">
                            ${imgHtml}${textHtml}
                        </div>`;
                }).join('');
            }
        }

        // Credits
        if (project.credits?.length) {
            const creditsGrid = document.querySelector('.credits-grid');
            if (creditsGrid) {
                const trCredits = dict?.credits;
                creditsGrid.innerHTML = project.credits.map((c, i) => {
                    const key = trCredits?.[i]?.key || c.key;
                    const value = trCredits?.[i]?.value || c.value;
                    return `<span class="credits-key">${key}</span><span class="credits-val">${value}</span>`;
                }).join('');
            }
        }

        // Next project
        if (project.nextProject) {
            const nextLink = document.querySelector('.case-next-link');
            if (nextLink) {
                nextLink.href = `${project.nextProject.slug}.html`;
                const title = tr('nextTitle', project.nextProject.title);
                nextLink.innerHTML = `${title} <span class="case-next-arrow">→</span>`;
            }
        }

        // SEO meta
        if (project.seoDescription) {
            const meta = document.querySelector('meta[name="description"]');
            if (meta) meta.setAttribute('content', project.seoDescription);
        }
        if (project.title) document.title = `${tr('title', project.title)} — Ash Mateu`;
    }

    try {
        const project = await sanityFetch(
            `*[_type == "project" && slug.current == $slug][0]{
                title, category, location, lede,
                heroImage, heroImageAlt, localHeroImage,
                blocks[]{heading, body, reversed, imageAlt, localImage, image},
                credits[]{key, value},
                nextProject->{title, "slug": slug.current},
                seoDescription
            }`,
            { slug }
        );

        if (!project) return;
        render(project);

        // Re-renderiza con la traducción correcta si cambia el idioma después
        // de que ya cargó el contenido de Sanity.
        window.addEventListener('ash:langchange', () => {
            if (_project) render(_project);
        });

    } catch (e) {
        // Sanity no disponible, usa contenido hardcodeado (ya viene en español
        // en el HTML; i18n.js lo traduce vía data-i18n-override si corresponde)
    }
})();
