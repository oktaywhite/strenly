document.addEventListener("DOMContentLoaded", function () {
    setTimeout(() => {
      document.getElementById("loading-screen").classList.add("opacity-0");
      
      setTimeout(() => {
        document.getElementById("loading-screen").style.display = "none";
        document.getElementById("content").classList.remove("hidden");
      }, 700);
    }, 3000);
  });