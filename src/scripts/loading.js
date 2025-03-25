document.addEventListener("DOMContentLoaded", function () {
  setTimeout(function() {
    document.getElementById("loading-screen").classList.add("opacity-0");
    
    setTimeout(function() {
      document.getElementById("loading-screen").style.display = "none";
      document.getElementById("content").classList.remove("hidden");
    }, 700);
  }, 3000);
});

if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('/service-worker.js').then((registration) => {
    console.log('Service Worker başarılı bir şekilde kaydedildi:', registration);

    registration.onupdatefound = () => {
      const installingWorker = registration.installing;
      installingWorker.onstatechange = () => {
        if (installingWorker.state === 'installed' && navigator.serviceWorker.controller) {
          window.location.reload();
        }
      };
    };
  }).catch((error) => {
    console.log('Service Worker kaydedilemedi:', error);
  });
}
