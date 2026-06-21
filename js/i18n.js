(function () {

    var TRANSLATIONS = {
        es: {
            'nav.work':                'Trabajo',
            'nav.press':               'Prensa',
            'nav.notes':               'Notas',
            'nav.vlog':                'Vlog',
            'nav.shop':                'Mercadito',
            'nav.contact':             'Contacto',
            'section.work':            'Trabajo',
            'section.services':        'Servicios',
            'section.contact':         'Contacto',
            'hero.cta.primary':        'Ver trabajo',
            'hero.cta.secondary':      'Contacto',
            'form.name.label':         'Nombre',
            'form.name.placeholder':   'Tu nombre',
            'form.email.label':        'Email',
            'form.email.placeholder':  'tu@email.com',
            'form.message.label':      'Mensaje',
            'form.message.placeholder':'Contame sobre tu proyecto',
            'form.submit':             'Enviar →',
            'form.sending':            'Enviando...',
            'form.sent':               'Enviado',
            'form.success':            'Mensaje recibido. Te escribo pronto.',
            'form.error':              'Error al enviar. Escribime directo a ash.mateu@gmail.com',
            'footer.work':             'Trabajo',
            'footer.contact':          'Contacto',
        },
        en: {
            'nav.work':                'Work',
            'nav.press':               'Press',
            'nav.notes':               'Notes',
            'nav.vlog':                'Vlog',
            'nav.shop':                'Shop',
            'nav.contact':             'Contact',
            'section.work':            'Work',
            'section.services':        'Services',
            'section.contact':         'Contact',
            'hero.cta.primary':        'See work',
            'hero.cta.secondary':      'Contact',
            'form.name.label':         'Name',
            'form.name.placeholder':   'Your name',
            'form.email.label':        'Email',
            'form.email.placeholder':  'you@email.com',
            'form.message.label':      'Message',
            'form.message.placeholder':'Tell me about your project',
            'form.submit':             'Send →',
            'form.sending':            'Sending...',
            'form.sent':               'Sent',
            'form.success':            'Message received. I\'ll write you soon.',
            'form.error':              'Error sending. Write me directly at ash.mateu@gmail.com',
            'footer.work':             'Work',
            'footer.contact':          'Contact',
            'hero.title':              'Fashion with intention.<br>The image from within.',
            'hero.subtitle':           'Chanel, Miu Miu, Gucci. Marie Claire covers.<br>Dolores Fonzi, Griselda Siciliani. Buenos Aires, New York, Paris.',
            'about.text':              '<p>Ash Mateu has worked in fashion since fashion was something else. Stylist, creative director, consultant: the titles change by project, but the work is always the same. Finding the image that connects.</p><p>Chanel, Louis Vuitton, Miu Miu, Dolce & Gabbana, Gucci, Nike, L\'Oréal, Mercedes Benz. Marie Claire Argentina covers more times than she can exactly recall. Styling for Dolores Fonzi, Griselda Siciliani, Valentina Zenere, and much of the Netflix Argentina cast.</p><p>In 2015 she founded Inside Studios, an online fashion school that reached more than 20,000 students across the region.</p><p>Available for editorial projects, campaigns, and brand collaborations.</p>',
            'contact.headline':        'New projects for 2026. Write me.',
            'service.1.name':          'Creative direction',
            'service.1.desc':          'From idea to result. I conceive and produce editorials, campaigns, and content for brands that need more than a supplier.',
            'service.2.name':          'Editorial and commercial styling',
            'service.2.desc':          'I build looks for photo and audiovisual productions. Direct work with brands, photographers, and full production teams.',
            'service.3.name':          'Celebrity styling',
            'service.3.desc':          'Red carpets, events, press, appearances. Styling for public figures has its own rules and its own rhythm.',
            'service.4.name':          'Brand consulting',
            'service.4.desc':          'Fashion, beauty, culture. I work on visual identity and communication tone with brands that need a perspective that comes from the set, not a PowerPoint presentation.',
            'service.5.name':          'Trend research',
            'service.5.desc':          'I analyze what\'s happening in culture before it appears in trends, and translate it into concrete communication decisions.',
        },
        fr: {
            'nav.work':                'Travaux',
            'nav.press':               'Presse',
            'nav.notes':               'Notes',
            'nav.vlog':                'Vlog',
            'nav.shop':                'Boutique',
            'nav.contact':             'Contact',
            'section.work':            'Travaux',
            'section.services':        'Services',
            'section.contact':         'Contact',
            'hero.cta.primary':        'Voir les travaux',
            'hero.cta.secondary':      'Contact',
            'form.name.label':         'Nom',
            'form.name.placeholder':   'Votre nom',
            'form.email.label':        'Email',
            'form.email.placeholder':  'vous@email.com',
            'form.message.label':      'Message',
            'form.message.placeholder':'Parlez-moi de votre projet',
            'form.submit':             'Envoyer →',
            'form.sending':            'Envoi...',
            'form.sent':               'Envoyé',
            'form.success':            'Message reçu. Je vous écris bientôt.',
            'form.error':              'Erreur d\'envoi. Écrivez-moi directement à ash.mateu@gmail.com',
            'footer.work':             'Travaux',
            'footer.contact':          'Contact',
            'hero.title':              'Mode avec intention.<br>L\'image de l\'intérieur.',
            'hero.subtitle':           'Chanel, Miu Miu, Gucci. Couvertures de Marie Claire.<br>Dolores Fonzi, Griselda Siciliani. Buenos Aires, New York, Paris.',
            'about.text':              '<p>Ash Mateu travaille dans la mode depuis que la mode était autre chose. Styliste, directrice créative, consultante : les titres changent selon le projet, mais le travail reste le même. Trouver l\'image qui connecte.</p><p>Chanel, Louis Vuitton, Miu Miu, Dolce & Gabbana, Gucci, Nike, L\'Oréal, Mercedes Benz. Couvertures de Marie Claire Argentine plus de fois qu\'elle ne s\'en souvient exactement. Styling pour Dolores Fonzi, Griselda Siciliani, Valentina Zenere et une grande partie du casting de Netflix Argentine.</p><p>En 2015, elle a fondé Inside Studios, une école de mode en ligne qui a atteint plus de 20 000 étudiants dans toute la région.</p><p>Disponible pour des projets éditoriaux, des campagnes et des collaborations de marque.</p>',
            'contact.headline':        'Nouveaux projets pour 2026. Écrivez-moi.',
            'service.1.name':          'Direction créative',
            'service.1.desc':          'De l\'idée au résultat. Je conçois et produis des éditoriaux, des campagnes et des contenus pour des marques qui ont besoin de plus qu\'un prestataire.',
            'service.2.name':          'Styling éditorial et publicitaire',
            'service.2.desc':          'Je construis des looks pour des productions photo et audiovisuelles. Travail direct avec des marques, des photographes et des équipes de production complètes.',
            'service.3.name':          'Celebrity styling',
            'service.3.desc':          'Tapis rouges, événements, presse, apparitions. Le styling pour les personnalités publiques a ses propres règles et son propre rythme.',
            'service.4.name':          'Conseil de marque',
            'service.4.desc':          'Mode, beauté, culture. Je travaille sur l\'identité visuelle et le ton de communication avec des marques qui ont besoin d\'une perspective qui vient du plateau, pas d\'une présentation PowerPoint.',
            'service.5.name':          'Trend research',
            'service.5.desc':          'J\'analyse ce qui se passe dans la culture avant que cela n\'apparaisse dans les tendances, et je le traduis en décisions de communication concrètes.',
        }
    };

    var PLACEHOLDER_KEYS = {
        'form.name.placeholder':    true,
        'form.email.placeholder':   true,
        'form.message.placeholder': true,
    };

    var HTML_KEYS = {
        'hero.title':   true,
        'hero.subtitle': true,
        'about.text':   true,
    };

    function getLang() {
        return localStorage.getItem('ash_lang') || 'es';
    }

    function t(key) {
        var lang = getLang();
        var dict = TRANSLATIONS[lang] || TRANSLATIONS.es;
        return dict[key] || TRANSLATIONS.es[key] || key;
    }

    function apply() {
        var lang = getLang();
        var dict = TRANSLATIONS[lang] || TRANSLATIONS.es;

        // Static UI elements — always translate
        document.querySelectorAll('[data-i18n]').forEach(function (el) {
            var key = el.dataset.i18n;
            var val = dict[key] || TRANSLATIONS.es[key];
            if (!val) return;
            if (PLACEHOLDER_KEYS[key]) {
                el.placeholder = val;
            } else {
                el.textContent = val;
            }
        });

        // Sanity-driven elements — translate only for non-ES so Sanity stays authoritative in Spanish
        if (lang !== 'es') {
            document.querySelectorAll('[data-i18n-override]').forEach(function (el) {
                var key = el.dataset.i18nOverride;
                var val = dict[key];
                if (!val) return;
                if (HTML_KEYS[key]) {
                    el.innerHTML = val;
                } else {
                    el.textContent = val;
                }
            });
        }

        var htmlLang = lang === 'fr' ? 'fr' : (lang === 'en' ? 'en' : 'es');
        document.documentElement.lang = htmlLang;
        updateSwitcher(lang);
    }

    function setLang(lang) {
        if (!TRANSLATIONS[lang]) return;
        localStorage.setItem('ash_lang', lang);
        apply();
    }

    function updateSwitcher(activeLang) {
        document.querySelectorAll('.lang-switcher-btn').forEach(function (btn) {
            btn.style.opacity = btn.dataset.lang === activeLang ? '1' : '0.35';
        });
    }

    function injectStyles() {
        var style = document.createElement('style');
        style.textContent = [
            '.lang-switcher{display:flex;align-items:center;gap:0;margin-right:16px}',
            '.lang-switcher-btn{background:none;border:none;cursor:pointer;font-family:var(--sans,system-ui);font-size:10px;letter-spacing:0.18em;text-transform:uppercase;color:var(--sand,#B5A898);padding:2px 5px;line-height:1;transition:opacity 0.2s}',
            '.lang-switcher-btn:hover{opacity:0.75!important}',
            '.lang-switcher-sep{color:rgba(181,168,152,0.25);font-size:10px;pointer-events:none;user-select:none}',
            '@media(max-width:900px){',
            '  .lang-switcher{margin-right:0;margin-left:auto}',
            '  .lang-switcher-btn{padding:6px 6px;min-height:32px}',
            '}'
        ].join('');
        document.head.appendChild(style);
    }

    function injectSwitcher() {
        var nav = document.getElementById('nav');
        if (!nav) return;
        var hamburger = nav.querySelector('.nav-hamburger');
        var sw = document.createElement('div');
        sw.className = 'lang-switcher';
        var lang = getLang();
        ['es', 'en', 'fr'].forEach(function (l, i) {
            if (i > 0) {
                var sep = document.createElement('span');
                sep.className = 'lang-switcher-sep';
                sep.textContent = '·';
                sw.appendChild(sep);
            }
            var btn = document.createElement('button');
            btn.className = 'lang-switcher-btn';
            btn.dataset.lang = l;
            btn.textContent = l.toUpperCase();
            btn.style.opacity = l === lang ? '1' : '0.35';
            btn.setAttribute('aria-label', l === 'es' ? 'Español' : (l === 'en' ? 'English' : 'Français'));
            sw.appendChild(btn);
        });
        nav.insertBefore(sw, hamburger);
        sw.addEventListener('click', function (e) {
            var btn = e.target.closest('.lang-switcher-btn');
            if (btn && btn.dataset.lang) setLang(btn.dataset.lang);
        });
    }

    document.addEventListener('DOMContentLoaded', function () {
        injectStyles();
        injectSwitcher();
        apply();
    });

    window.i18n = { t: t, apply: apply, getLang: getLang, setLang: setLang };
})();
