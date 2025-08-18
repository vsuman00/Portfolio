$(document).ready(function () {
  $("#menu").click(function () {
    $(this).toggleClass("fa-times");
    $(".navbar").toggleClass("nav-toggle");
  });

  $(window).on("scroll load", function () {
    $("#menu").removeClass("fa-times");
    $(".navbar").removeClass("nav-toggle");

    if (window.scrollY > 60) {
      document.querySelector("#scroll-top").classList.add("active");
    } else {
      document.querySelector("#scroll-top").classList.remove("active");
    }
  });

  // Initialize theme
  initTheme();
});

/* ===== SCROLL REVEAL ANIMATION ===== */
const srtop = ScrollReveal({
  origin: "top",
  distance: "80px",
  duration: 1000,
  reset: true,
});

/* SCROLL EXPERIENCE */
srtop.reveal(".experience .timeline", { delay: 400 });
srtop.reveal(".experience .timeline .container", { interval: 400 });

// Start of Tawk.to Live Chat
var Tawk_API = Tawk_API || {},
  Tawk_LoadStart = new Date();
(function () {
  var s1 = document.createElement("script"),
    s0 = document.getElementsByTagName("script")[0];
  s1.async = true;
  s1.src = "https://embed.tawk.to/60df10bf7f4b000ac03ab6a8/1f9jlirg6";
  s1.charset = "UTF-8";
  s1.setAttribute("crossorigin", "*");
  s0.parentNode.insertBefore(s1, s0);
})();
// End of Tawk.to Live Chat

// disable developer mode
document.onkeydown = function (e) {
  if (e.keyCode == 123) {
    return false;
  }
  if (e.ctrlKey && e.shiftKey && e.keyCode == "I".charCodeAt(0)) {
    return false;
  }
  if (e.ctrlKey && e.shiftKey && e.keyCode == "C".charCodeAt(0)) {
    return false;
  }
  if (e.ctrlKey && e.shiftKey && e.keyCode == "J".charCodeAt(0)) {
    return false;
  }
  if (e.ctrlKey && e.keyCode == "U".charCodeAt(0)) {
    return false;
  }
};

// Theme toggle functionality
function initTheme() {
  // Check if user previously selected a theme
  const userTheme = localStorage.getItem("theme");
  const themeToggle = document.getElementById("theme-toggle");
  const themeIcon = themeToggle.querySelector("i");

  // Set theme based on localStorage or default to dark
  if (userTheme === "light") {
    document.body.classList.add("light-theme");
    themeIcon.classList.replace("fa-sun", "fa-moon");
  } else {
    // Dark is the default
    document.body.classList.remove("light-theme");
    themeIcon.classList.replace("fa-moon", "fa-sun");
  }

  // Add event listener to toggle button
  themeToggle.addEventListener("click", function () {
    document.body.classList.toggle("light-theme");

    // Update localStorage
    if (document.body.classList.contains("light-theme")) {
      localStorage.setItem("theme", "light");
      themeIcon.classList.replace("fa-sun", "fa-moon");
    } else {
      localStorage.setItem("theme", "dark");
      themeIcon.classList.replace("fa-moon", "fa-sun");
    }
  });
}

document.addEventListener("visibilitychange", function () {
  if (document.visibilityState === "visible") {
    document.title = "Experience | Portfolio Vaibhav Suman";
    $("#favicon").attr("href", "/assets/images/favicon.png");
  } else {
    document.title = "Come Back To Portfolio";
    $("#favicon").attr("href", "/assets/images/favhand.png");
  }
});
