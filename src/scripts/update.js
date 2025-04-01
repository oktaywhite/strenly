if ("serviceWorker" in navigator) {
  navigator.serviceWorker.register("/strenly/service-worker.js").then((registration) => {
    console.log("✅ Service Worker kayıt edildi.");

    navigator.serviceWorker.addEventListener("message", (event) => {
      if (event.data.type === "UPDATE_AVAILABLE") {
        showUpdateNotification();
      }
    });
  });
}

function showUpdateNotification() {
  const banner = document.createElement("div");
  banner.innerHTML = `
    <div style="position: fixed; bottom: 20px; left: 50%; transform: translateX(-50%); background: #2CCF4F; padding: 10px 20px; border-radius: 6px; color: black; font-weight: bold; box-shadow: 0px 4px 10px rgba(0,0,0,0.2);">
      Yeni güncelleme mevcut! <button id="reload-btn" style="margin-left: 10px; background: black; color: white; padding: 5px 10px; border-radius: 4px; cursor: pointer;">Yenile</button>
    </div>
  `;
  document.body.appendChild(banner);

  document.getElementById("reload-btn").addEventListener("click", () => {
    window.location.reload();
  });
}
