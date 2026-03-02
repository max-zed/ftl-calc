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
const legsElement = document.getElementById("leg-count")
const latestOnBlockElement = document.getElementById("on-block-time")

function calculate_final_data() {
    var checkInTime = new Date(checkInTimeElement.value + "Z")
    var latestOnBlock = new Date(checkInTime)
    var maxFDP = latestOnBlock.getTime() - checkInTime.getTime()
    console.log(maxFDP)

    if (checkInTime.getUTCHours() >= 6 && (checkInTime.getUTCHours() < 13 || (checkInTime.getUTCHours() === 13 && checkInTime.getUTCMinutes() <= 29) )){
        latestOnBlock.setUTCHours(latestOnBlock.getUTCHours() + 13) //max fdp
    }else if (checkInTime.getUTCHours() === 13 && (checkInTime.getUTCMinutes() >= 30 && checkInTime.getUTCMinutes() <= 59)){
        latestOnBlock.setUTCHours(latestOnBlock.getUTCHours() + 12)
        latestOnBlock.setUTCMinutes(latestOnBlock.getUTCMinutes() + 45) 
    }else if (checkInTime.getUTCHours() === 14 && checkInTime.getUTCMinutes() <= 29){
        latestOnBlock.setUTCHours(latestOnBlock.getUTCHours() + 12)
        latestOnBlock.setUTCMinutes(latestOnBlock.getUTCMinutes() + 30) 
    }else if (checkInTime.getUTCHours() === 14 && (checkInTime.getUTCMinutes() >= 30 && checkInTime.getUTCMinutes() <= 59)){
        latestOnBlock.setUTCHours(latestOnBlock.getUTCHours() + 12)
        latestOnBlock.setUTCMinutes(latestOnBlock.getUTCMinutes() + 15) 
    }else if (checkInTime.getUTCHours() === 15 && checkInTime.getUTCMinutes() <= 29){
        latestOnBlock.setUTCHours(latestOnBlock.getUTCHours() + 12) 
    }else if (checkInTime.getUTCHours() === 15 && (checkInTime.getUTCMinutes() >= 30 && checkInTime.getUTCMinutes() <= 59)){
        latestOnBlock.setUTCHours(latestOnBlock.getUTCHours() + 11)
        latestOnBlock.setUTCMinutes(latestOnBlock.getUTCMinutes() + 45) 
    }else if (checkInTime.getUTCHours() === 16 && checkInTime.getUTCMinutes() <= 29){
        latestOnBlock.setUTCHours(latestOnBlock.getUTCHours() + 11)
        latestOnBlock.setUTCMinutes(latestOnBlock.getUTCMinutes() + 30) 
    }else if (checkInTime.getUTCHours() === 16 && (checkInTime.getUTCMinutes() >= 30 && checkInTime.getUTCMinutes() <= 59)){
        latestOnBlock.setUTCHours(latestOnBlock.getUTCHours() + 11)
        latestOnBlock.setUTCMinutes(latestOnBlock.getUTCMinutes() + 15) 
    }else if (checkInTime.getUTCHours() >= 17 || checkInTime.getUTCHours() < 5){
        latestOnBlock.setUTCHours(latestOnBlock.getUTCHours() + 11)
    }else if (checkInTime.getUTCHours() === 5 && checkInTime.getUTCMinutes() <= 14){
        latestOnBlock.setUTCHours(latestOnBlock.getUTCHours() + 12)
    }else if (checkInTime.getUTCHours() === 5 && (checkInTime.getUTCMinutes() >= 15 && checkInTime.getUTCMinutes() <= 29)){
        latestOnBlock.setUTCHours(latestOnBlock.getUTCHours() + 12)
        latestOnBlock.setUTCMinutes(latestOnBlock.getUTCMinutes() + 15)
    }else if (checkInTime.getUTCHours() === 5 && (checkInTime.getUTCMinutes() >= 30 && checkInTime.getUTCMinutes() <= 44)){
        latestOnBlock.setUTCHours(latestOnBlock.getUTCHours() + 12)
        latestOnBlock.setUTCMinutes(latestOnBlock.getUTCMinutes() + 30)
    }else if (checkInTime.getUTCHours() === 5 && (checkInTime.getUTCMinutes() >= 45 && checkInTime.getUTCMinutes() <= 59)){
        latestOnBlock.setUTCHours(latestOnBlock.getUTCHours() + 12)
        latestOnBlock.setUTCMinutes(latestOnBlock.getUTCMinutes() + 45)
    }

    
    
    


    

    var legCount = legsElement.value
    if (legCount >= 3) {
        for (let i = 0; i < legCount - 2; i++){
            ///REWORK
            if (i < 4){
                latestOnBlock.setUTCMinutes(latestOnBlock.getUTCMinutes() - 30)
            }else{
                break
            }
            
        }
    }
    
    maxFDP = latestOnBlock.getTime() - checkInTime.getTime()
    const diffMinutes = Math.floor(maxFDP / 1000 / 60);
    const diffHours = Math.floor(diffMinutes / 60);
    const remainingMinutes = diffMinutes % 60;

    console.log(diffHours+":"+remainingMinutes)
    
    const year = latestOnBlock.getUTCFullYear();
    const month = String(latestOnBlock.getUTCMonth() + 1).padStart(2, "0");
    const day = String(latestOnBlock.getUTCDate()).padStart(2, "0");
    const hours = String(latestOnBlock.getUTCHours()).padStart(2, "0");
    const minutes = String(latestOnBlock.getUTCMinutes()).padStart(2, "0");
    

    console.log("Latest On-Block: "+day+"."+month+"."+year+" at "+hours+":"+minutes+" UTC")
    latestOnBlockElement.textContent = `${day}.${month}.${year} at ${hours}:${minutes} UTC`
}