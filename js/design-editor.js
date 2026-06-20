(function () {
  'use strict';

  const SUPABASE_URL = 'https://jrxklahobxpxmtnncvst.supabase.co';
  const SUPABASE_ANON_KEY = 'sb_publishable_8vdBzcFdNVhjtjK9a4ZE9A_FPmxsHhd';
  const PREFIX = '__de';

  const DEFAULTS = {
    font_serif: 'Playfair Display',
    font_sans: 'Inter',
    font_size_base: '16',
    line_height: '1.75',
    letter_spacing: '0',
    section_spacing: '96',
    img_brightness: '88',
    img_contrast: '106',
    img_saturation: '78',
    img_position: 'center center',
    overlay_color: '#000000',
    overlay_opacity: '0',
    overlay_direction: 'to bottom',
  };

  let sb, session, current = { ...DEFAULTS };

  // ── Esperar a que supabase esté disponible ──
  function waitForSupabase(cb) {
    if (window.supabase) return cb();
    const int = setInterval(() => { if (window.supabase) { clearInterval(int); cb(); } }, 100);
  }

  waitForSupabase(init);

  async function init() {
    sb = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
    const { data } = await sb.auth.getSession();
    session = data?.session;
    injectStyles();
    injectHTML();
    bindEvents();
    if (session) {
      await loadSettings();
      showEditor();
    }
  }

  // ── Estilos del editor ──
  function injectStyles() {
    const s = document.createElement('style');
    s.id = PREFIX + '-styles';
    s.textContent = `
      #${PREFIX}-btn {
        position: fixed; bottom: 24px; right: 24px; z-index: 99998;
        width: 44px; height: 44px; border-radius: 50%;
        background: rgba(10,10,10,0.75); backdrop-filter: blur(8px);
        border: 1px solid rgba(255,255,255,0.15); color: #fff;
        font-size: 18px; cursor: pointer; display: flex; align-items: center;
        justify-content: center; transition: opacity 0.2s, transform 0.2s;
        opacity: 0.55;
      }
      #${PREFIX}-btn:hover { opacity: 1; transform: scale(1.08); }
      #${PREFIX}-panel {
        position: fixed; top: 0; right: 0; bottom: 0; z-index: 99999;
        width: 300px; background: #111; color: #e8e4df;
        font-family: 'Inter', system-ui, sans-serif; font-size: 12px;
        transform: translateX(100%); transition: transform 0.3s cubic-bezier(0.16,1,0.3,1);
        display: flex; flex-direction: column; overflow: hidden;
        box-shadow: -4px 0 32px rgba(0,0,0,0.45);
      }
      #${PREFIX}-panel.open { transform: translateX(0); }
      #${PREFIX}-header {
        padding: 18px 20px 14px; border-bottom: 1px solid rgba(255,255,255,0.08);
        display: flex; justify-content: space-between; align-items: center; flex-shrink: 0;
      }
      #${PREFIX}-header strong { font-size: 11px; letter-spacing: 0.2em; text-transform: uppercase; color: #b5a898; }
      #${PREFIX}-close {
        background: none; border: none; color: rgba(255,255,255,0.4); cursor: pointer;
        font-size: 18px; line-height: 1; padding: 2px 6px;
      }
      #${PREFIX}-close:hover { color: #fff; }
      #${PREFIX}-body { flex: 1; overflow-y: auto; padding: 16px 20px 20px; }
      #${PREFIX}-body::-webkit-scrollbar { width: 4px; }
      #${PREFIX}-body::-webkit-scrollbar-track { background: transparent; }
      #${PREFIX}-body::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.15); border-radius: 2px; }

      /* Login */
      .${PREFIX}-login { display: flex; flex-direction: column; gap: 12px; padding: 8px 0; }
      .${PREFIX}-login p { font-size: 11px; color: rgba(255,255,255,0.4); line-height: 1.5; }
      .${PREFIX}-login input {
        width: 100%; padding: 9px 11px; background: rgba(255,255,255,0.07);
        border: 1px solid rgba(255,255,255,0.12); color: #fff; font-size: 13px;
        font-family: inherit; outline: none;
      }
      .${PREFIX}-login input:focus { border-color: rgba(181,168,152,0.6); }
      .${PREFIX}-login input::placeholder { color: rgba(255,255,255,0.25); }
      .${PREFIX}-btn-login {
        padding: 10px; background: #b5a898; color: #0a0a0a; border: none;
        font-size: 10px; letter-spacing: 0.2em; text-transform: uppercase;
        cursor: pointer; font-family: inherit;
      }
      .${PREFIX}-btn-login:hover { background: #c9baad; }
      .${PREFIX}-err { color: #e74c3c; font-size: 11px; display: none; }

      /* Editor sections */
      .${PREFIX}-section { margin-bottom: 20px; }
      .${PREFIX}-section-title {
        font-size: 9px; letter-spacing: 0.28em; text-transform: uppercase;
        color: rgba(181,168,152,0.7); margin-bottom: 12px;
        padding-bottom: 8px; border-bottom: 1px solid rgba(255,255,255,0.06);
      }
      .${PREFIX}-ctrl { margin-bottom: 12px; }
      .${PREFIX}-label {
        display: block; font-size: 10px; letter-spacing: 0.12em;
        text-transform: uppercase; color: rgba(255,255,255,0.35); margin-bottom: 6px;
      }
      .${PREFIX}-input {
        width: 100%; padding: 8px 10px; background: rgba(255,255,255,0.07);
        border: 1px solid rgba(255,255,255,0.1); color: #fff; font-size: 13px;
        font-family: inherit; outline: none;
      }
      .${PREFIX}-input:focus { border-color: rgba(181,168,152,0.5); }
      .${PREFIX}-select {
        width: 100%; padding: 8px 10px; background: #1a1a1a;
        border: 1px solid rgba(255,255,255,0.1); color: #e8e4df; font-size: 12px;
        font-family: inherit; outline: none; cursor: pointer;
      }
      .${PREFIX}-slider-row { display: flex; align-items: center; gap: 10px; }
      .${PREFIX}-slider {
        flex: 1; accent-color: #b5a898; height: 3px;
        background: rgba(255,255,255,0.12); border-radius: 2px;
      }
      .${PREFIX}-val { font-size: 11px; min-width: 38px; text-align: right; color: rgba(255,255,255,0.55); }
      .${PREFIX}-font-preview {
        margin-top: 6px; font-size: 16px; color: rgba(255,255,255,0.4);
        min-height: 24px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;
      }
      .${PREFIX}-color-row { display: flex; align-items: center; gap: 10px; }
      .${PREFIX}-color-input { width: 40px; height: 32px; border: 1px solid rgba(255,255,255,0.1); padding: 2px; background: #1a1a1a; cursor: pointer; }
      .${PREFIX}-pos-grid { display: grid; grid-template-columns: repeat(3, 30px); gap: 3px; }
      .${PREFIX}-pos-btn {
        width: 30px; height: 30px; background: rgba(255,255,255,0.05);
        border: 1px solid rgba(255,255,255,0.1); color: rgba(255,255,255,0.35);
        cursor: pointer; font-size: 10px; display: flex; align-items: center; justify-content: center;
        transition: background 0.15s;
      }
      .${PREFIX}-pos-btn:hover { background: rgba(255,255,255,0.1); }
      .${PREFIX}-pos-btn.sel { background: #b5a898; color: #0a0a0a; border-color: #b5a898; }
      .${PREFIX}-overlay-preview {
        width: 100%; height: 48px; border: 1px solid rgba(255,255,255,0.1);
        margin-top: 8px; border-radius: 2px;
      }

      /* Footer */
      #${PREFIX}-footer {
        padding: 14px 20px; border-top: 1px solid rgba(255,255,255,0.08);
        display: flex; gap: 10px; align-items: center; flex-shrink: 0;
      }
      .${PREFIX}-save {
        flex: 1; padding: 10px; background: #b5a898; color: #0a0a0a; border: none;
        font-size: 10px; letter-spacing: 0.2em; text-transform: uppercase;
        cursor: pointer; font-family: inherit;
      }
      .${PREFIX}-save:hover { background: #c9baad; }
      .${PREFIX}-logout {
        padding: 10px 12px; background: none; border: 1px solid rgba(255,255,255,0.12);
        color: rgba(255,255,255,0.35); font-size: 10px; cursor: pointer; font-family: inherit;
      }
      .${PREFIX}-logout:hover { color: #fff; border-color: rgba(255,255,255,0.4); }
      .${PREFIX}-msg { font-size: 10px; color: #27ae60; display: none; }
    `;
    document.head.appendChild(s);
  }

  // ── HTML del panel ──
  function injectHTML() {
    const btn = document.createElement('button');
    btn.id = PREFIX + '-btn';
    btn.title = 'Editar diseño';
    btn.innerHTML = '✦';
    document.body.appendChild(btn);

    const panel = document.createElement('div');
    panel.id = PREFIX + '-panel';
    panel.innerHTML = `
      <div id="${PREFIX}-header">
        <strong>Diseño</strong>
        <button id="${PREFIX}-close">×</button>
      </div>
      <div id="${PREFIX}-body">

        <!-- LOGIN -->
        <div id="${PREFIX}-view-login" style="display:none">
          <div class="${PREFIX}-login">
            <p>Ingresá para editar el diseño del sitio en tiempo real.</p>
            <input id="${PREFIX}-email" type="email" placeholder="Email">
            <input id="${PREFIX}-pass" type="password" placeholder="Contraseña">
            <button class="${PREFIX}-btn-login" id="${PREFIX}-login-btn">Entrar</button>
            <span class="${PREFIX}-err" id="${PREFIX}-login-err"></span>
          </div>
        </div>

        <!-- EDITOR -->
        <div id="${PREFIX}-view-editor" style="display:none">

          <div class="${PREFIX}-section">
            <div class="${PREFIX}-section-title">Tipografía</div>
            <div class="${PREFIX}-ctrl">
              <label class="${PREFIX}-label">Fuente de títulos (serif)</label>
              <input class="${PREFIX}-input" id="${PREFIX}-serif" type="text" placeholder="Playfair Display">
              <div class="${PREFIX}-font-preview" id="${PREFIX}-prev-serif">Ash Mateu</div>
            </div>
            <div class="${PREFIX}-ctrl">
              <label class="${PREFIX}-label">Fuente de texto (sans)</label>
              <input class="${PREFIX}-input" id="${PREFIX}-sans" type="text" placeholder="Inter">
              <div class="${PREFIX}-font-preview" id="${PREFIX}-prev-sans">directora creativa</div>
            </div>
          </div>

          <div class="${PREFIX}-section">
            <div class="${PREFIX}-section-title">Tamaño y espaciado</div>
            <div class="${PREFIX}-ctrl">
              <label class="${PREFIX}-label">Tamaño base <span id="${PREFIX}-v-size">16</span>px</label>
              <div class="${PREFIX}-slider-row">
                <input class="${PREFIX}-slider" type="range" id="${PREFIX}-size" min="13" max="20" step="1">
              </div>
            </div>
            <div class="${PREFIX}-ctrl">
              <label class="${PREFIX}-label">Altura de línea <span id="${PREFIX}-v-lh">1.75</span></label>
              <div class="${PREFIX}-slider-row">
                <input class="${PREFIX}-slider" type="range" id="${PREFIX}-lh" min="1.2" max="2.2" step="0.05">
              </div>
            </div>
            <div class="${PREFIX}-ctrl">
              <label class="${PREFIX}-label">Espaciado letras <span id="${PREFIX}-v-ls">0</span>em</label>
              <div class="${PREFIX}-slider-row">
                <input class="${PREFIX}-slider" type="range" id="${PREFIX}-ls" min="-0.05" max="0.2" step="0.005">
              </div>
            </div>
          </div>

          <div class="${PREFIX}-section">
            <div class="${PREFIX}-section-title">Fotos</div>
            <div class="${PREFIX}-ctrl">
              <label class="${PREFIX}-label">Brillo <span id="${PREFIX}-v-br">88</span>%</label>
              <input class="${PREFIX}-slider" type="range" id="${PREFIX}-br" min="50" max="130" step="1">
            </div>
            <div class="${PREFIX}-ctrl">
              <label class="${PREFIX}-label">Contraste <span id="${PREFIX}-v-co">106</span>%</label>
              <input class="${PREFIX}-slider" type="range" id="${PREFIX}-co" min="70" max="150" step="1">
            </div>
            <div class="${PREFIX}-ctrl">
              <label class="${PREFIX}-label">Saturación <span id="${PREFIX}-v-sa">78</span>%</label>
              <input class="${PREFIX}-slider" type="range" id="${PREFIX}-sa" min="0" max="150" step="1">
            </div>
            <div class="${PREFIX}-ctrl">
              <label class="${PREFIX}-label">Posición de imagen</label>
              <div class="${PREFIX}-pos-grid">
                <button class="${PREFIX}-pos-btn" data-p="top left">↖</button>
                <button class="${PREFIX}-pos-btn" data-p="top center">↑</button>
                <button class="${PREFIX}-pos-btn" data-p="top right">↗</button>
                <button class="${PREFIX}-pos-btn" data-p="center left">←</button>
                <button class="${PREFIX}-pos-btn sel" data-p="center center">●</button>
                <button class="${PREFIX}-pos-btn" data-p="center right">→</button>
                <button class="${PREFIX}-pos-btn" data-p="bottom left">↙</button>
                <button class="${PREFIX}-pos-btn" data-p="bottom center">↓</button>
                <button class="${PREFIX}-pos-btn" data-p="bottom right">↘</button>
              </div>
            </div>
          </div>

          <div class="${PREFIX}-section">
            <div class="${PREFIX}-section-title">Degradado sobre fotos</div>
            <div class="${PREFIX}-ctrl">
              <label class="${PREFIX}-label">Color y opacidad <span id="${PREFIX}-v-ov">0</span>%</label>
              <div class="${PREFIX}-color-row">
                <input class="${PREFIX}-color-input" type="color" id="${PREFIX}-ov-color" value="#000000">
                <input class="${PREFIX}-slider" type="range" id="${PREFIX}-ov-op" min="0" max="80" step="1" style="flex:1">
              </div>
            </div>
            <div class="${PREFIX}-ctrl">
              <label class="${PREFIX}-label">Dirección</label>
              <select class="${PREFIX}-select" id="${PREFIX}-ov-dir">
                <option value="to bottom">De arriba a abajo</option>
                <option value="to top">De abajo a arriba</option>
                <option value="to right">Izquierda a derecha</option>
                <option value="to left">Derecha a izquierda</option>
                <option value="to bottom right">Diagonal ↘</option>
                <option value="to bottom left">Diagonal ↙</option>
              </select>
            </div>
            <canvas class="${PREFIX}-overlay-preview" id="${PREFIX}-ov-canvas" width="260" height="48"></canvas>
          </div>

        </div><!-- end editor view -->
      </div><!-- end body -->

      <div id="${PREFIX}-footer" style="display:none">
        <button class="${PREFIX}-save" id="${PREFIX}-save-btn">Guardar</button>
        <button class="${PREFIX}-logout" id="${PREFIX}-logout-btn">Salir</button>
        <span class="${PREFIX}-msg" id="${PREFIX}-msg"></span>
      </div>
    `;
    document.body.appendChild(panel);
  }

  // ── Eventos ──
  function bindEvents() {
    const $ = id => document.getElementById(PREFIX + '-' + id);

    $('btn').addEventListener('click', togglePanel);
    $('close').addEventListener('click', closePanel);

    $('login-btn').addEventListener('click', doLogin);
    $('email').addEventListener('keydown', e => { if (e.key === 'Enter') $('pass').focus(); });
    $('pass').addEventListener('keydown', e => { if (e.key === 'Enter') doLogin(); });

    // Sliders con live preview
    const sliders = [
      ['size', 'v-size', applyAll],
      ['lh',   'v-lh',   applyAll],
      ['ls',   'v-ls',   applyAll],
      ['br',   'v-br',   applyAll],
      ['co',   'v-co',   applyAll],
      ['sa',   'v-sa',   applyAll],
      ['ov-op','v-ov',   () => { updateOvCanvas(); applyAll(); }],
    ];
    sliders.forEach(([id, valId, fn]) => {
      const el = $(id);
      if (!el) return;
      el.addEventListener('input', () => {
        const v = parseFloat(el.value);
        const vEl = $(valId);
        if (vEl) vEl.textContent = v;
        fn();
      });
    });

    // Fuentes
    $('serif').addEventListener('input', () => { loadGFont($('serif').value.trim()); previewFonts(); applyAll(); });
    $('sans').addEventListener('input',  () => { loadGFont($('sans').value.trim());  previewFonts(); applyAll(); });

    // Color overlay
    $('ov-color').addEventListener('input', () => { updateOvCanvas(); applyAll(); });
    $('ov-dir').addEventListener('change',  () => { updateOvCanvas(); applyAll(); });

    // Position grid
    document.querySelectorAll('.' + PREFIX + '-pos-btn').forEach(b => {
      b.addEventListener('click', () => {
        document.querySelectorAll('.' + PREFIX + '-pos-btn').forEach(x => x.classList.remove('sel'));
        b.classList.add('sel');
        applyAll();
      });
    });

    $('save-btn').addEventListener('click', saveSettings);
    $('logout-btn').addEventListener('click', doLogout);
  }

  function togglePanel() {
    const panel = document.getElementById(PREFIX + '-panel');
    if (panel.classList.contains('open')) {
      closePanel();
    } else {
      panel.classList.add('open');
      if (!session) showLogin();
    }
  }

  function closePanel() {
    document.getElementById(PREFIX + '-panel').classList.remove('open');
  }

  function showLogin() {
    document.getElementById(PREFIX + '-view-login').style.display = 'block';
    document.getElementById(PREFIX + '-view-editor').style.display = 'none';
    document.getElementById(PREFIX + '-footer').style.display = 'none';
  }

  function showEditor() {
    document.getElementById(PREFIX + '-view-login').style.display = 'none';
    document.getElementById(PREFIX + '-view-editor').style.display = 'block';
    document.getElementById(PREFIX + '-footer').style.display = 'flex';
    populateControls();
    updateOvCanvas();
    previewFonts();
  }

  async function doLogin() {
    const $ = id => document.getElementById(PREFIX + '-' + id);
    const email = $('email').value.trim();
    const pass  = $('pass').value;
    const err   = $('login-err');
    err.style.display = 'none';
    $('login-btn').textContent = '...';
    const { data, error } = await sb.auth.signInWithPassword({ email, password: pass });
    $('login-btn').textContent = 'Entrar';
    if (error) {
      err.textContent = 'Email o contraseña incorrectos.';
      err.style.display = 'block';
      return;
    }
    session = data.session;
    await loadSettings();
    showEditor();
  }

  async function doLogout() {
    await sb.auth.signOut();
    session = null;
    closePanel();
  }

  // ── Cargar settings de Supabase ──
  async function loadSettings() {
    const { data } = await sb.from('site_settings').select('key,value');
    current = { ...DEFAULTS };
    (data || []).forEach(r => { if (r.key in DEFAULTS) current[r.key] = r.value; });
    applyToPage(current);
  }

  function populateControls() {
    const $ = id => document.getElementById(PREFIX + '-' + id);
    $('serif').value = current.font_serif;
    $('sans').value  = current.font_sans;

    const setSlider = (id, valId, val) => {
      const el = $(id); if (el) el.value = val;
      const v  = $(valId); if (v) v.textContent = parseFloat(val);
    };
    setSlider('size', 'v-size', current.font_size_base);
    setSlider('lh',   'v-lh',   current.line_height);
    setSlider('ls',   'v-ls',   current.letter_spacing);
    setSlider('br',   'v-br',   current.img_brightness);
    setSlider('co',   'v-co',   current.img_contrast);
    setSlider('sa',   'v-sa',   current.img_saturation);
    setSlider('ov-op','v-ov',   current.overlay_opacity);

    $('ov-color').value = current.overlay_color;
    $('ov-dir').value   = current.overlay_direction;

    document.querySelectorAll('.' + PREFIX + '-pos-btn').forEach(b => {
      b.classList.toggle('sel', b.dataset.p === current.img_position);
    });

    loadGFont(current.font_serif);
    loadGFont(current.font_sans);
  }

  // ── Leer valores actuales de los controles ──
  function readControls() {
    const $ = id => document.getElementById(PREFIX + '-' + id);
    const selPos = document.querySelector('.' + PREFIX + '-pos-btn.sel');
    return {
      font_serif:        $('serif').value.trim()  || DEFAULTS.font_serif,
      font_sans:         $('sans').value.trim()   || DEFAULTS.font_sans,
      font_size_base:    $('size').value,
      line_height:       $('lh').value,
      letter_spacing:    $('ls').value,
      section_spacing:   current.section_spacing,
      img_brightness:    $('br').value,
      img_contrast:      $('co').value,
      img_saturation:    $('sa').value,
      img_position:      selPos ? selPos.dataset.p : current.img_position,
      overlay_color:     $('ov-color').value,
      overlay_opacity:   $('ov-op').value,
      overlay_direction: $('ov-dir').value,
    };
  }

  function applyAll() {
    applyToPage(readControls());
  }

  // ── Aplicar settings a la página ──
  function applyToPage(s) {
    const root = document.documentElement;

    loadGFont(s.font_serif);
    loadGFont(s.font_sans);

    root.style.setProperty('--serif', `'${s.font_serif}', Georgia, serif`);
    root.style.setProperty('--sans',  `'${s.font_sans}', system-ui, sans-serif`);
    root.style.setProperty('--font-size-base',  s.font_size_base + 'px');
    root.style.setProperty('--line-height',     s.line_height);
    root.style.setProperty('--letter-spacing',  s.letter_spacing + 'em');
    root.style.setProperty('--section-spacing', s.section_spacing + 'px');

    const br  = s.img_brightness, co = s.img_contrast, sa = s.img_saturation;
    const pos = s.img_position;
    const ovColor   = s.overlay_color;
    const ovOpacity = parseFloat(s.overlay_opacity) / 100;
    const ovDir     = s.overlay_direction;

    let st = document.getElementById('_ash-settings');
    if (!st) { st = document.createElement('style'); st.id = '_ash-settings'; document.head.appendChild(st); }

    st.textContent = `
      body { font-family: var(--sans); }
      .press-featured-img img, .press-card-img img,
      .post-cover img, .hero-img img, .project-img img,
      [class*="-img"] img {
        filter: brightness(${br}%) contrast(${co}%) saturate(${sa}%);
        object-position: ${pos};
      }
      ${ovOpacity > 0 ? `
        .press-featured-img, .press-card-img, .post-cover, [class*="-img"] { position: relative; }
        .press-featured-img::after, .press-card-img::after, .post-cover::after, [class*="-img"]::after {
          content: ''; position: absolute; inset: 0; pointer-events: none;
          background: linear-gradient(${ovDir}, ${ovColor} 0%, transparent 100%);
          opacity: ${ovOpacity};
        }` : ''}
    `;
  }

  // ── Preview de canvas de overlay ──
  function updateOvCanvas() {
    const $ = id => document.getElementById(PREFIX + '-' + id);
    const canvas = $('ov-canvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const color = $('ov-color').value;
    const op    = parseFloat($('ov-op').value) / 100;
    const dir   = $('ov-dir').value;

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = '#555';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    let x0 = 0, y0 = 0, x1 = 0, y1 = canvas.height;
    if (dir === 'to top')          { y0 = canvas.height; y1 = 0; }
    else if (dir === 'to right')   { x1 = canvas.width; y1 = 0; }
    else if (dir === 'to left')    { x0 = canvas.width; x1 = 0; y1 = 0; }
    else if (dir === 'to bottom right') { x1 = canvas.width; }
    else if (dir === 'to bottom left')  { x0 = canvas.width; }

    const r = parseInt(color.slice(1,3),16), g = parseInt(color.slice(3,5),16), b = parseInt(color.slice(5,7),16);
    const grad = ctx.createLinearGradient(x0, y0, x1, y1);
    grad.addColorStop(0, `rgba(${r},${g},${b},${op})`);
    grad.addColorStop(1, `rgba(${r},${g},${b},0)`);
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
  }

  // ── Preview de fuentes ──
  function previewFonts() {
    const $ = id => document.getElementById(PREFIX + '-' + id);
    const sf = $('serif').value.trim() || DEFAULTS.font_serif;
    const sn = $('sans').value.trim()  || DEFAULTS.font_sans;
    const ps = $('prev-serif'); if (ps) ps.style.fontFamily = `'${sf}', Georgia, serif`;
    const pn = $('prev-sans');  if (pn) pn.style.fontFamily = `'${sn}', system-ui, sans-serif`;
  }

  // ── Cargar Google Font dinámicamente ──
  function loadGFont(name) {
    if (!name) return;
    const id = 'gf-' + name.replace(/\s+/g, '-').toLowerCase();
    if (document.getElementById(id)) return;
    const l = document.createElement('link');
    l.id = id; l.rel = 'stylesheet';
    l.href = `https://fonts.googleapis.com/css2?family=${encodeURIComponent(name)}:wght@300;400;500;700&display=swap`;
    document.head.appendChild(l);
  }

  // ── Guardar en Supabase ──
  async function saveSettings() {
    const s = readControls();
    current = { ...s };
    const upserts = Object.entries(s).map(([key, value]) => ({ key, value: String(value) }));
    const { error } = await sb.from('site_settings').upsert(upserts, { onConflict: 'key' });
    const msg = document.getElementById(PREFIX + '-msg');
    if (error) {
      msg.style.color = '#e74c3c';
      msg.textContent = 'Error al guardar';
    } else {
      msg.style.color = '#27ae60';
      msg.textContent = 'Guardado';
    }
    msg.style.display = 'inline';
    setTimeout(() => { msg.style.display = 'none'; }, 2500);
  }

})();
