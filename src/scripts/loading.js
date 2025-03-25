document.addEventListener("DOMContentLoaded", function () {
    setTimeout(() => {
      document.getElementById("loading-screen").classList.add("opacity-0");
      
      setTimeout(() => {
        document.getElementById("loading-screen").style.display = "none";
        document.getElementById("content").classList.remove("hidden");
      }, 700);
    }, 3000);
  });

  if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
      navigator.serviceWorker.register('/service-worker.js').then(registration => {
        console.log('Service Worker başarılı bir şekilde kaydedildi: ', registration);
      }).catch(error => {
        console.log('Service Worker kaydedilemedi: ', error);
      });
    });
  }
  