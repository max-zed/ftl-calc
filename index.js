// Service Worker registrieren
if ("serviceWorker" in navigator) {
    navigator.serviceWorker.register("service-worker.js");
}


function update_app() {
    window.location.reload(true);
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



//////////////////////////////////


const checkInTimeElement = document.getElementById("check-in-datetime")

function calculate_final_data() {
    var checkInTime = new Date(checkInTimeElement.value + "Z")
    var latestOnBlock = checkInTime

    
    const year = latestOnBlock.getUTCFullYear();
    const month = String(latestOnBlock.getUTCMonth() + 1).padStart(2, "0");
    const day = String(latestOnBlock.getUTCDate()).padStart(2, "0");
    const hours = String(latestOnBlock.getUTCHours()).padStart(2, "0");
    const minutes = String(latestOnBlock.getUTCMinutes()).padStart(2, "0");
    

    console.log("Latest On-Block: "+day+"."+month+"."+year+" at "+hours+":"+minutes+" UTC")
}