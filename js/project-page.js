(async () => {
    const slug = document.body.dataset.slug;
    if (!slug) return;

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

        // Hero
        const heroTitleEl = document.querySelector('.case-title');
        const heroCatEl   = document.querySelector('.case-category');
        const heroMetaEls = document.querySelectorAll('.case-hero-meta span');
        if (heroTitleEl && project.title)    heroTitleEl.textContent = project.title;
        if (heroCatEl && project.category)   heroCatEl.textContent   = `${project.category} — ${project.location || ''}`;
        if (heroMetaEls[0] && project.location)  heroMetaEls[0].textContent = project.location;
        if (heroMetaEls[1] && project.category)  heroMetaEls[1].textContent = project.category;

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
        if (ledeEl && project.lede) ledeEl.textContent = project.lede;

        // Content blocks
        if (project.blocks?.length) {
            const bodyEl = document.querySelector('.case-body');
            if (bodyEl) {
                bodyEl.innerHTML = project.blocks.map(block => {
                    const imgSrc = block.localImage
                        || (block.image ? imageUrl(block.image.asset._ref, 900) : null);
                    const imgHtml = imgSrc
                        ? `<img class="case-block-img" src="${imgSrc}" alt="${block.imageAlt || ''}" loading="lazy">`
                        : '';
                    const textHtml = `
                        <div class="case-block-text">
                            ${block.heading ? `<h2>${block.heading}</h2>` : ''}
                            ${block.body ? toHtml(block.body) : ''}
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
                creditsGrid.innerHTML = project.credits.map(c => `
                    <span class="credits-key">${c.key}</span>
                    <span class="credits-val">${c.value}</span>`).join('');
            }
        }

        // Next project
        if (project.nextProject) {
            const nextLink = document.querySelector('.case-next-link');
            if (nextLink) {
                nextLink.href = `${project.nextProject.slug}.html`;
                nextLink.innerHTML = `${project.nextProject.title} <span class="case-next-arrow">→</span>`;
            }
        }

        // SEO meta
        if (project.seoDescription) {
            const meta = document.querySelector('meta[name="description"]');
            if (meta) meta.setAttribute('content', project.seoDescription);
        }
        if (project.title) document.title = `${project.title} — Ash Mateu`;

    } catch (e) {
        // Sanity no disponible, usa contenido hardcodeado
    }
})();
