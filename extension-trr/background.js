// Ash Mateu Curator & Stock Monitor Extension — Background Service Worker

const SERVER_TARGETS = [
  "https://ashmateu.com",
  "http://localhost:3000",
  "http://127.0.0.1:3000"
];

async function postWithFallback(url, payload) {
  const tryUrls = [url];
  if (url.includes("localhost:3000")) {
    tryUrls.push(url.replace("localhost:3000", "127.0.0.1:3000"));
  } else if (url.includes("127.0.0.1:3000")) {
    tryUrls.push(url.replace("127.0.0.1:3000", "localhost:3000"));
  }

  let lastError = null;

  for (const targetUrl of tryUrls) {
    try {
      const res = await fetch(targetUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      if (res.ok) {
        return { success: true, data };
      } else {
        return { success: false, error: data.error || "Error en el servidor" };
      }
    } catch (err) {
      lastError = err;
      console.warn("Intento fallido a " + targetUrl + ":", err);
    }
  }

  return {
    success: false,
    error: `No se pudo conectar con el servidor (${lastError ? lastError.message : "Error de red"}). Asegúrate de que npm run dev esté activo.`,
  };
}

// Configurar alarma para verificación de stock cada 60 minutos
chrome.runtime.onInstalled.addListener(() => {
  chrome.alarms.create("trr-hourly-stock-check", { periodInMinutes: 60 });
  console.log("✦ Ash Mateu: Monitor de stock TRR programado cada 60 minutos");
  runStockCheck();
});

chrome.runtime.onStartup.addListener(() => {
  runStockCheck();
});

chrome.alarms.onAlarm.addListener((alarm) => {
  if (alarm.name === "trr-hourly-stock-check") {
    console.log("✦ Ash Mateu: Iniciando verificación periódica de stock The RealReal...");
    runStockCheck();
  }
});

async function runStockCheck() {
  for (const base of SERVER_TARGETS) {
    try {
      const listRes = await fetch(`${base}/api/mercadito/sync/trr-check?action=list`);
      if (!listRes.ok) continue;

      const { products } = await listRes.json();
      if (!Array.isArray(products) || products.length === 0) continue;

      console.log(`✦ Ash TRR Monitor: Verificando ${products.length} productos en ${base}...`);
      const soldIds = [];

      for (const p of products) {
        if (!p.source_url) continue;

        try {
          const res = await fetch(p.source_url, {
            method: "GET",
            headers: { "Cache-Control": "no-cache" },
            redirect: "follow",
          });

          if (res.status === 404 || res.status === 410) {
            soldIds.push(p.id);
            continue;
          }

          if (res.url && !res.url.includes("/products/")) {
            soldIds.push(p.id);
            continue;
          }

          const html = await res.text();
          const lower = html.toLowerCase();

          if (
            lower.includes("schema.org/outofstock") ||
            lower.includes("schema.org/soldout") ||
            lower.includes("this item has been sold") ||
            lower.includes("this item is sold out") ||
            lower.includes("item is no longer available") ||
            (lower.includes("join the waitlist") && !lower.includes("add to bag"))
          ) {
            soldIds.push(p.id);
          }
        } catch (itemErr) {
          console.warn(`Error chequeando pieza ${p.name}:`, itemErr);
        }
      }

      if (soldIds.length > 0) {
        console.log(`✦ Ash TRR Monitor: ${soldIds.length} piezas encontradas como VENDIDAS en TRR. Sincronizando...`);
        await fetch(`${base}/api/mercadito/sync/trr-check`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            markSoldIds: soldIds,
            reason: "Pieza vendida / no disponible en The RealReal (Detectada por Extensión)",
          }),
        });
      } else {
        console.log("✦ Ash TRR Monitor: Todas las piezas verificadas siguen disponibles.");
      }

      break; // Si respondió con éxito este servidor, no reintentar en los otros
    } catch (err) {
      // Intentar con siguiente servidor
    }
  }
}

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === "importProduct") {
    postWithFallback(request.endpoint, request.payload).then((result) => {
      sendResponse(result);
    });
    return true; // Mantiene el canal abierto para respuesta asíncrona
  } else if (request.action === "checkStockNow") {
    runStockCheck().then(() => {
      sendResponse({ success: true, message: "Verificación de stock completada" });
    });
    return true;
  }
});
