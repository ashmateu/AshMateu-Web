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
        },
        pt: {
            'nav.work':                'Trabalho',
            'nav.press':               'Imprensa',
            'nav.notes':               'Notas',
            'nav.vlog':                'Vlog',
            'nav.shop':                'Loja',
            'nav.contact':             'Contato',
            'section.work':            'Trabalho',
            'section.services':        'Serviços',
            'section.contact':         'Contato',
            'hero.cta.primary':        'Ver trabalho',
            'hero.cta.secondary':      'Contato',
            'form.name.label':         'Nome',
            'form.name.placeholder':   'Seu nome',
            'form.email.label':        'Email',
            'form.email.placeholder':  'voce@email.com',
            'form.message.label':      'Mensagem',
            'form.message.placeholder':'Fale-me sobre seu projeto',
            'form.submit':             'Enviar →',
            'form.sending':            'Enviando...',
            'form.sent':               'Enviado',
            'form.success':            'Mensagem recebida. Escrevo em breve.',
            'form.error':              'Erro ao enviar. Escreva-me diretamente em ash.mateu@gmail.com',
            'footer.work':             'Trabalho',
            'footer.contact':          'Contato',
        }
    };

    var PLACEHOLDER_KEYS = {
        'form.name.placeholder':    true,
        'form.email.placeholder':   true,
        'form.message.placeholder': true,
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
        var htmlLang = lang === 'pt' ? 'pt-BR' : (lang === 'en' ? 'en' : 'es');
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
        style.textContent = '.lang-switcher{display:flex;align-items:center;gap:2px;margin-right:20px}.lang-switcher-btn{background:none;border:none;cursor:pointer;font-family:var(--sans,system-ui);font-size:10px;letter-spacing:0.18em;text-transform:uppercase;color:var(--sand,#B5A898);padding:2px 4px;line-height:1;transition:opacity 0.2s}.lang-switcher-btn:hover{opacity:0.75!important}.lang-switcher-sep{color:rgba(181,168,152,0.25);font-size:10px;pointer-events:none}@media(max-width:900px){.lang-switcher{margin-right:12px}}';
        document.head.appendChild(style);
    }

    function injectSwitcher() {
        var nav = document.getElementById('nav');
        if (!nav) return;
        var hamburger = nav.querySelector('.nav-hamburger');
        var sw = document.createElement('div');
        sw.className = 'lang-switcher';
        var lang = getLang();
        ['es', 'en', 'pt'].forEach(function (l, i) {
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
            btn.setAttribute('aria-label', l === 'es' ? 'Español' : (l === 'en' ? 'English' : 'Português'));
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
