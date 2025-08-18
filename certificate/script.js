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

document.addEventListener("visibilitychange", function () {
  if (document.visibilityState === "visible") {
    document.title = "certificate | Portfolio Vaibhav Suman";
    $("#favicon").attr("href", "/assets/images/favicon.png");
  } else {
    document.title = "Come Back To Portfolio";
    $("#favicon").attr("href", "/assets/images/favhand.png");
  }
});

// fetch certificate start
function getCertificate() {
  return fetch("certificate.json")
    .then((response) => {
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return response.json();
    })
    .then((data) => {
      return data;
    })
    .catch((error) => {
      console.error("Error fetching certificates:", error);
      // Return fallback data
      return [
        {
          name: "Sample Certificate",
          desc: "Certificate information will be loaded soon",
          image: "placeholder",
          links: {
            view: "#",
          },
        },
      ];
    });
}

function showCertificate(certificate) {
  let certificateContainer = document.querySelector(
    ".certificates .box-container"
  );
  let certificateHTML = "";
  certificate.forEach((certificate) => {
    certificateHTML += `
        <div class="grid-item ${certificate.category || ""}">
        <div class="box tilt" style="width: 380px; margin: 1rem">
          <img draggable="false" src="/assets/images/certificate/${
            certificate.image
          }.png" alt="${certificate.name}" 
               onerror="this.src='/assets/images/placeholder.png'; this.onerror=null;" />
        <div class="content">
          <div class="tag">
            <h3>${certificate.name}</h3>
          </div>
          <div class="desc">
            <p>${certificate.desc}</p>
          <div class="btns">
            <a href="${
              certificate.links.view
            }" class="btn" target="_blank"><i class="fas fa-eye"></i>View</a>
          
          </div>
        </div>
      </div>
    </div>
    </div>`;
  });
  certificateContainer.innerHTML = certificateHTML;

  // vanilla tilt.js
  VanillaTilt.init(document.querySelectorAll(".tilt"), {
    max: 15,
  });

  /* ===== SCROLL REVEAL ANIMATION ===== */
  const srtop = ScrollReveal({
    origin: "top",
    distance: "80px",
    duration: 1000,
    reset: true,
  });

  /* SCROLL certificate */
  srtop.reveal(".certificates .box", { interval: 200 });

  // isotope filter products
  let $grid = $(".box-container").isotope({
    itemSelector: ".grid-item",
    layoutMode: "fitRows",
    masonry: {
      columnWidth: 200,
    },
  });

  // filter items on button click
  $(".button-group").on("click", "button", function () {
    $(".button-group").find(".is-checked").removeClass("is-checked");
    $(this).addClass("is-checked");
    let filterValue = $(this).attr("data-filter");
    $grid.isotope({ filter: filterValue });
  });
}

getCertificate()
  .then((data) => {
    showCertificate(data);
  })
  .catch((error) => {
    console.error("Error loading certificates:", error);
    // Show error message to user
    let certificateContainer = document.querySelector(
      ".certificates .box-container"
    );
    certificateContainer.innerHTML = `
    <div style="text-align: center; padding: 2rem; color: var(--text);">
      <h3>Unable to load certificates</h3>
      <p>Please try refreshing the page or check back later.</p>
    </div>
  `;
  });
// fetch certificate end

// Start of Tawk.to Live Chat
let Tawk_API = Tawk_API || {},
  Tawk_LoadStart = new Date();
(function () {
  let s1 = document.createElement("script"),
    s0 = document.getElementsByTagName("script")[0];
  s1.async = true;
  s1.src = "https://embed.tawk.to/60df10bf7f4b000ac03ab6a8/1f9jlirg6";
  s1.setAttribute("crossorigin", "*");
  s0.parentNode.insertBefore(s1, s0);
})();
// End of Tawk.to Live Chat

// disable developer mode
document.onkeydown = function (e) {
  if (e.key === "F12") {
    return false;
  }
  if (e.ctrlKey && e.shiftKey && e.key === "I") {
    return false;
  }
  if (e.ctrlKey && e.shiftKey && e.key === "C") {
    return false;
  }
  if (e.ctrlKey && e.shiftKey && e.key === "J") {
    return false;
  }
  if (e.ctrlKey && e.key === "U") {
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
