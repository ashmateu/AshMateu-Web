(async function () {
  const SUPABASE_URL = 'https://jrxklahobxpxmtnncvst.supabase.co';
  const SUPABASE_ANON_KEY = 'sb_publishable_8vdBzcFdNVhjtjK9a4ZE9A_FPmxsHhd';

  const defaults = {
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

  let settings = { ...defaults };

  try {
    const res = await fetch(`${SUPABASE_URL}/rest/v1/site_settings?select=key,value`, {
      headers: {
        apikey: SUPABASE_ANON_KEY,
        Authorization: `Bearer ${SUPABASE_ANON_KEY}`,
      },
    });
    if (res.ok) {
      const rows = await res.json();
      rows.forEach(r => { if (r.key in defaults) settings[r.key] = r.value; });
    }
  } catch (_) {}

  applySettings(settings);

  function applySettings(s) {
    const root = document.documentElement;

    // Fuentes
    const serifName = s.font_serif || defaults.font_serif;
    const sansName  = s.font_sans  || defaults.font_sans;

    // Carga Google Fonts si no son las predeterminadas del HTML
    const encodedFonts = [
      encodeURIComponent(serifName) + ':ital,wght@0,400;0,500;1,400',
      encodeURIComponent(sansName)  + ':wght@300;400;500',
    ].join('&family=');
    const fontHref = `https://fonts.googleapis.com/css2?family=${encodedFonts}&display=swap`;
    if (!document.querySelector(`link[href*="${encodeURIComponent(serifName)}"]`)) {
      const link = document.createElement('link');
      link.rel = 'stylesheet';
      link.href = fontHref;
      document.head.appendChild(link);
    }

    // CSS custom properties
    root.style.setProperty('--serif', `'${serifName}', Georgia, serif`);
    root.style.setProperty('--sans',  `'${sansName}', system-ui, sans-serif`);
    root.style.setProperty('--font-size-base',   s.font_size_base   + 'px');
    root.style.setProperty('--line-height',      s.line_height);
    root.style.setProperty('--letter-spacing',   s.letter_spacing   + 'em');
    root.style.setProperty('--section-spacing',  s.section_spacing  + 'px');
    root.style.setProperty('--img-brightness',   s.img_brightness   + '%');
    root.style.setProperty('--img-contrast',     s.img_contrast     + '%');
    root.style.setProperty('--img-saturation',   s.img_saturation   + '%');
    root.style.setProperty('--img-position',     s.img_position);
    root.style.setProperty('--overlay-color',    s.overlay_color);
    root.style.setProperty('--overlay-opacity',  parseFloat(s.overlay_opacity) / 100);
    root.style.setProperty('--overlay-direction', s.overlay_direction);

    // Inyectar estilos dinámicos
    let styleEl = document.getElementById('_ash-settings');
    if (!styleEl) {
      styleEl = document.createElement('style');
      styleEl.id = '_ash-settings';
      document.head.appendChild(styleEl);
    }

    const brightness = s.img_brightness;
    const contrast   = s.img_contrast;
    const saturation = s.img_saturation;
    const position   = s.img_position;
    const ovColor    = s.overlay_color;
    const ovOpacity  = parseFloat(s.overlay_opacity) / 100;
    const ovDir      = s.overlay_direction;

    styleEl.textContent = `
      body { font-family: var(--sans); font-size: var(--font-size-base); line-height: var(--line-height); letter-spacing: var(--letter-spacing); }
      img { object-position: ${position}; }
      .press-featured-img img,
      .press-card-img img,
      .post-cover img,
      .hero-img img,
      .project-img img,
      [class*="-img"] img { filter: brightness(${brightness}%) contrast(${contrast}%) saturate(${saturation}%); object-position: ${position}; }
      ${ovOpacity > 0 ? `
      .press-featured-img,
      .press-card-img,
      .post-cover,
      [class*="-img"] { position: relative; }
      .press-featured-img::after,
      .press-card-img::after,
      .post-cover::after,
      [class*="-img"]::after {
        content: '';
        position: absolute;
        inset: 0;
        background: linear-gradient(${ovDir}, ${ovColor} 0%, transparent 100%);
        opacity: ${ovOpacity};
        pointer-events: none;
      }` : ''}
    `;
  }
})();
