// Ash Mateu — The RealReal Luxury Curator Extension

(function() {
  console.log("✦ Ash Mateu Curator Extension activa en The RealReal");

  // Crear botón flotante en la página de producto
  function injectCuratorButton() {
    if (document.getElementById("ash-curator-float-btn")) return;

    const btn = document.createElement("button");
    btn.id = "ash-curator-float-btn";
    btn.innerHTML = `
      <span style="font-size: 14px;">✦</span>
      <span>Publicar en El Mercadito</span>
    `;
    btn.style.cssText = `
      position: fixed;
      bottom: 24px;
      right: 24px;
      z-index: 999999;
      background: #0A0A0A;
      color: #FFFFFF;
      border: 1px solid rgba(181, 168, 152, 0.5);
      border-radius: 50px;
      padding: 14px 22px;
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
      font-size: 11px;
      font-weight: 600;
      letter-spacing: 0.18em;
      text-transform: uppercase;
      cursor: pointer;
      box-shadow: 0 10px 25px rgba(0,0,0,0.35);
      display: flex;
      align-items: center;
      gap: 10px;
      transition: all 0.3s ease;
    `;

    btn.onmouseover = () => {
      btn.style.transform = "translateY(-2px) scale(1.02)";
      btn.style.background = "#7A6A5A";
    };
    btn.onmouseout = () => {
      btn.style.transform = "translateY(0) scale(1)";
      btn.style.background = "#0A0A0A";
    };

    btn.onclick = openCuratorModal;
    document.body.appendChild(btn);
  }

  function openCuratorModal() {
    if (document.getElementById("ash-trr-extractor-modal")) {
      document.getElementById("ash-trr-extractor-modal").remove();
    }

    let productData = {
      title: "",
      designer: "",
      description: "",
      priceTRR: 0,
      currency: "USD",
      condition: "Excellent (Excelente estado)",
      dimensions: "",
      materials: "",
      images: [],
      sourceUrl: window.location.href,
      category: "bolsos"
    };

    // 1. Extraer JSON-LD
    const jsonLdScripts = document.querySelectorAll('script[type="application/ld+json"]');
    jsonLdScripts.forEach(script => {
      try {
        const data = JSON.parse(script.innerText);
        const items = Array.isArray(data) ? data : [data];
        items.forEach(p => {
          if (p["@type"] === "Product") {
            if (p.name) productData.title = p.name;
            if (p.brand?.name) productData.designer = p.brand.name;
            if (p.description) productData.description = p.description;
            if (p.offers?.price) productData.priceTRR = parseFloat(p.offers.price);
            if (p.offers?.priceCurrency) productData.currency = p.offers.priceCurrency;
            if (p.image) {
              if (Array.isArray(p.image)) productData.images = p.image;
              else if (typeof p.image === "string") productData.images = [p.image];
            }
          }
        });
      } catch (e) {}
    });

    // 2. Extraer del DOM si falta algo
    if (!productData.designer) {
      const dEl = document.querySelector('h1 a, .product-designer, [data-testid="product-designer"], .designer-name');
      if (dEl) productData.designer = dEl.innerText.trim();
    }
    if (!productData.title) {
      const tEl = document.querySelector('h1, .product-title, [data-testid="product-title"]');
      if (tEl) productData.title = tEl.innerText.trim();
    }
    if (!productData.priceTRR) {
      const pEl = document.querySelector('.price, .product-price, [data-testid="product-price"], .regular-price');
      if (pEl) {
        const match = pEl.innerText.replace(/[^0-9.]/g, "");
        if (match) productData.priceTRR = parseFloat(match);
      }
    }

    // 3. Imágenes en alta resolución
    const imgEls = document.querySelectorAll('img[src*="product-images"], [data-testid="pdp-image"] img, .product-gallery img');
    const foundImages = new Set(productData.images);
    imgEls.forEach(img => {
      let src = img.getAttribute("data-src") || img.src;
      if (src && (src.includes("product-images") || src.includes("therealreal.com"))) {
        src = src.replace(/\/[0-9]+x[0-9]+\//, "/original/");
        foundImages.add(src);
      }
    });
    productData.images = Array.from(foundImages).filter(url => url && url.startsWith("http"));

    // 4. Medidas y condición
    const details = document.querySelectorAll('.product-details, .pdp-description, [data-testid="product-details"]');
    details.forEach(sec => {
      const text = sec.innerText;
      if (text.includes("Measurements") || text.includes("Dimensions")) {
        productData.dimensions = text.split("\n").filter(l => l.includes(":")).slice(0, 3).join(" | ");
      }
      if (text.includes("Condition:")) {
        const condMatch = text.match(/Condition:\s*([^\n\.]+)/i);
        if (condMatch) productData.condition = condMatch[1].trim();
      }
    });

    // Categoría
    const path = window.location.pathname.toLowerCase();
    if (path.includes("handbag") || path.includes("bag")) productData.category = "bolsos";
    else if (path.includes("clothing") || path.includes("dress") || path.includes("coat")) productData.category = "indumentaria";
    else if (path.includes("jewelry") || path.includes("watch")) productData.category = "joyeria";
    else if (path.includes("shoe")) productData.category = "calzado";
    else productData.category = "accesorios";

    // El precio de venta se calcula para que el costo represente exactamente el 80% (cubierto por el anticipo)
    // y el 20% restante sea la ganancia neta de Ash.
    const suggestedPrice = Math.round(productData.priceTRR / 0.8);
    const ganancia = suggestedPrice - productData.priceTRR;

    // 5. Crear Modal en Pantalla
    const overlay = document.createElement("div");
    overlay.id = "ash-trr-extractor-modal";
    overlay.style.cssText = "position:fixed;inset:0;z-index:9999999;background:rgba(10,10,10,0.85);backdrop-filter:blur(10px);display:flex;align-items:center;justify-content:center;font-family:-apple-system,BlinkMacSystemFont,\"Segoe UI\",Roboto,sans-serif;color:#0A0A0A;padding:20px;box-sizing:border-box;";

    const modal = document.createElement("div");
    modal.style.cssText = "background:#F7F3EE;width:100%;max-width:640px;max-height:90vh;border-radius:24px;box-shadow:0 30px 60px rgba(0,0,0,0.5);border:1px solid rgba(181,168,152,0.4);overflow-y:auto;padding:28px;box-sizing:border-box;display:flex;flex-direction:column;gap:18px;";

    modal.innerHTML = `
      <div style="display:flex;justify-content:space-between;align-items:flex-start;border-bottom:1px solid rgba(181,168,152,0.3);padding-bottom:14px;">
        <div>
          <span style="font-size:10px;text-transform:uppercase;letter-spacing:0.25em;color:#7A6A5A;font-weight:600;">ASH MATEU — EL MERCADITO</span>
          <h2 style="margin:2px 0 0 0;font-family:Georgia,serif;font-size:20px;font-weight:normal;color:#0A0A0A;">Curaduría de Pieza Única</h2>
        </div>
        <button id="ash-close-btn" style="background:none;border:none;font-size:26px;cursor:pointer;color:#7A6A5A;">&times;</button>
      </div>

      <div style="display:flex;gap:8px;overflow-x:auto;padding-bottom:6px;">
        ${productData.images.slice(0, 5).map(img => `<img src="${img}" style="width:72px;height:90px;object-fit:cover;border-radius:8px;border:1px solid rgba(0,0,0,0.1);shrink:0;" />`).join("")}
      </div>

      <div style="display:grid;grid-template-columns:1fr 1fr;gap:12px;">
        <div>
          <label style="display:block;font-size:10px;text-transform:uppercase;letter-spacing:0.15em;color:#7A6A5A;margin-bottom:3px;">Diseñador / Marca</label>
          <input id="ash-designer" type="text" value="${productData.designer || "Chanel"}" style="width:100%;padding:8px 10px;border-radius:8px;border:1px solid #B5A898;background:#fff;font-size:13px;box-sizing:border-box;" />
        </div>

        <div>
          <label style="display:block;font-size:10px;text-transform:uppercase;letter-spacing:0.15em;color:#7A6A5A;margin-bottom:3px;">Categoría</label>
          <select id="ash-category" style="width:100%;padding:8px 10px;border-radius:8px;border:1px solid #B5A898;background:#fff;font-size:13px;box-sizing:border-box;">
            <option value="bolsos" ${productData.category === "bolsos" ? "selected" : ""}>Bolsos & Handbags</option>
            <option value="indumentaria" ${productData.category === "indumentaria" ? "selected" : ""}>Indumentaria</option>
            <option value="joyeria" ${productData.category === "joyeria" ? "selected" : ""}>Joyería</option>
            <option value="calzado" ${productData.category === "calzado" ? "selected" : ""}>Calzado</option>
            <option value="accesorios" ${productData.category === "accesorios" ? "selected" : ""}>Accesorios</option>
          </select>
        </div>

        <div style="grid-column:span 2;">
          <label style="display:block;font-size:10px;text-transform:uppercase;letter-spacing:0.15em;color:#7A6A5A;margin-bottom:3px;">Nombre de la Pieza</label>
          <input id="ash-title" type="text" value="${productData.title}" style="width:100%;padding:8px 10px;border-radius:8px;border:1px solid #B5A898;background:#fff;font-size:13px;box-sizing:border-box;" />
        </div>

        <div>
          <label style="display:block;font-size:10px;text-transform:uppercase;letter-spacing:0.15em;color:#7A6A5A;margin-bottom:3px;">Costo TRR (USD)</label>
          <input type="number" readonly value="${productData.priceTRR}" style="width:100%;padding:8px 10px;border-radius:8px;border:1px solid #ddd;background:#eee;font-size:13px;box-sizing:border-box;color:#666;" />
        </div>

        <div>
          <label style="display:block;font-size:10px;text-transform:uppercase;letter-spacing:0.15em;color:#7A6A5A;margin-bottom:3px;font-weight:bold;">Precio Venta Ash (USD)</label>
          <input id="ash-price-final" type="number" value="${suggestedPrice}" style="width:100%;padding:8px 10px;border-radius:8px;border:2px solid #0A0A0A;background:#fff;font-size:14px;font-weight:bold;box-sizing:border-box;" />
        </div>

        <div style="grid-column:span 2;background:#fff;padding:8px 12px;border-radius:8px;border:1px dashed #B5A898;font-size:11px;color:#7A6A5A;">
          ✦ <strong>Esquema 80/20:</strong> El cliente abona <strong>$${productData.priceTRR} USD</strong> de anticipo (cubre exactamente la compra) y <strong>$${ganancia} USD</strong> contra entrega (tu ganancia neta).
        </div>

        <div style="grid-column:span 2;">
          <label style="display:block;font-size:10px;text-transform:uppercase;letter-spacing:0.15em;color:#7A6A5A;margin-bottom:3px;">Condición de la Prenda</label>
          <input id="ash-condition" type="text" value="${productData.condition}" style="width:100%;padding:8px 10px;border-radius:8px;border:1px solid #B5A898;background:#fff;font-size:13px;box-sizing:border-box;" />
        </div>

        <div style="grid-column:span 2;">
          <label style="display:block;font-size:10px;text-transform:uppercase;letter-spacing:0.15em;color:#7A6A5A;margin-bottom:3px;">Tip de Estilismo de Ash (Opcional)</label>
          <input id="ash-styling-tip" type="text" placeholder="Ej: 'Ideal con sastre negro oversize para la noche.'" style="width:100%;padding:8px 10px;border-radius:8px;border:1px solid #B5A898;background:#fff;font-size:13px;box-sizing:border-box;" />
        </div>

        <div style="grid-column:span 2;">
          <label style="display:block;font-size:10px;text-transform:uppercase;letter-spacing:0.15em;color:#7A6A5A;margin-bottom:3px;">Servidor Destino</label>
          <select id="ash-target-server" style="width:100%;padding:8px 10px;border-radius:8px;border:1px solid #B5A898;background:#fff;font-size:12px;box-sizing:border-box;">
            <option value="https://ashmateu.com/api/mercadito/import" selected>Producción (https://ashmateu.com)</option>
            <option value="http://127.0.0.1:3000/api/mercadito/import">Local (http://127.0.0.1:3000)</option>
            <option value="http://localhost:3000/api/mercadito/import">Local (http://localhost:3000)</option>
          </select>
        </div>
      </div>

      <div style="display:flex;gap:10px;justify-content:flex-end;margin-top:8px;">
        <button id="ash-cancel-btn" style="background:none;border:1px solid #B5A898;padding:10px 18px;border-radius:50px;font-size:11px;text-transform:uppercase;letter-spacing:0.15em;cursor:pointer;">Cancelar</button>
        <button id="ash-submit-btn" style="background:#0A0A0A;color:#fff;border:none;padding:10px 24px;border-radius:50px;font-size:11px;text-transform:uppercase;letter-spacing:0.15em;cursor:pointer;font-weight:600;">
          Publicar en El Mercadito ↗
        </button>
      </div>
    `;

    overlay.appendChild(modal);
    document.body.appendChild(overlay);

    const close = () => overlay.remove();
    document.getElementById("ash-close-btn").onclick = close;
    document.getElementById("ash-cancel-btn").onclick = close;

    document.getElementById("ash-submit-btn").onclick = async function() {
      this.disabled = true;
      this.innerText = "Publicando...";

      const targetEndpoint = document.getElementById("ash-target-server").value;

      const payload = {
        name: document.getElementById("ash-title").value,
        designer: document.getElementById("ash-designer").value,
        category: document.getElementById("ash-category").value,
        price: parseFloat(document.getElementById("ash-price-final").value),
        currency: "USD",
        condition_state: document.getElementById("ash-condition").value,
        dimensions: productData.dimensions,
        ash_styling_tip: document.getElementById("ash-styling-tip").value,
        image_url: productData.images[0] || "",
        gallery_images: productData.images,
        source_url: productData.sourceUrl,
        is_unique_piece: true,
        description: productData.description || `Pieza única curada por Ash Mateu. Autenticidad verificada.`
      };

      // Abrir la web de Ash directamente para guardar la pieza sin bloqueos de red ni CORS
      const baseUrl = targetEndpoint.includes("ashmateu.com")
        ? "https://ashmateu.com"
        : "http://localhost:3000";

      const importUrl = `${baseUrl}/mercadito/guardar-pieza#data=${encodeURIComponent(JSON.stringify(payload))}`;
      window.open(importUrl, "_blank");
      close();
    };
  }

  // Ejecutar cuando cargue la página
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", injectCuratorButton);
  } else {
    injectCuratorButton();
  }

  // Re-chequear por navegación SPA
  setInterval(injectCuratorButton, 2000);
})();
