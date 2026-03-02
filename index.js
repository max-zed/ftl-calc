// Service Worker registrieren
if ("serviceWorker" in navigator) {
    navigator.serviceWorker.register("service-worker.js");
}

function update_app() {
    //location.reload(true);
}

const updateBtn = document.getElementById("update-btn");
updateBtn.addEventListener("click", async () => {
  if ("serviceWorker" in navigator) {
    const registration = await navigator.serviceWorker.getRegistration();

    if (registration?.waiting) {
      // Neuer SW wartet → sofort aktivieren
      registration.waiting.postMessage({ type: "SKIP_WAITING" });
      registration.waiting.addEventListener("statechange", e => {
        if (e.target.state === "activated") {
          window.location.reload(); // Seite neu laden
        }
      });
    } else {
      // Kein SW waiting → einfach normal reload
      window.location.reload(true);
    }
  } else {
    // Fallback
    window.location.reload(true);
  }
});