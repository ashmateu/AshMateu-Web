// Ash Mateu Curator Extension — Background Service Worker

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

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === "importProduct") {
    postWithFallback(request.endpoint, request.payload).then((result) => {
      sendResponse(result);
    });
    return true; // Mantiene el canal abierto para respuesta asíncrona
  }
});
