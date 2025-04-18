document.addEventListener("DOMContentLoaded", function () {
  const slider = document.querySelector(".slider");
  const slides = document.querySelectorAll(".slider img");
  const prevButton = document.querySelector(".slider-button.prev");
  const nextButton = document.querySelector(".slider-button.next");

  // If no slider or no slides, exit early
  if (!slider || slides.length === 0) {
    console.warn("Certificate slider not found or has no images.");
    return;
  }

  let currentIndex = 0;

  // Remove existing dots if any
  const existingDots = document.querySelector(".slider-dots");
  if (existingDots) {
    existingDots.remove();
  }

  // Create dots navigation
  const dotsContainer = document.createElement("div");
  dotsContainer.className = "slider-dots";
  slider.parentElement.appendChild(dotsContainer);

  // Create a dot for each slide
  slides.forEach((_, index) => {
    const dot = document.createElement("div");
    dot.className = "dot";
    if (index === 0) dot.classList.add("active");
    dot.addEventListener("click", () => goToSlide(index));
    dotsContainer.appendChild(dot);
  });

  // Get all dots
  const dots = document.querySelectorAll(".dot");

  function updateSliderPosition() {
    if (slider) {
      slider.style.transform = `translateX(-${currentIndex * 100}%)`;
      // Update dots
      dots.forEach((dot, index) => {
        dot.classList.toggle("active", index === currentIndex);
      });
    }
  }

  function nextSlide() {
    currentIndex = (currentIndex + 1) % slides.length;
    updateSliderPosition();
  }

  function prevSlide() {
    currentIndex = (currentIndex - 1 + slides.length) % slides.length;
    updateSliderPosition();
  }

  function goToSlide(index) {
    currentIndex = index;
    updateSliderPosition();
    resetInterval();
  }

  function resetInterval() {
    clearInterval(autoSlideInterval);
    autoSlideInterval = setInterval(nextSlide, 5000);
  }

  // Initialize slider position
  updateSliderPosition();

  // Auto slide every 5 seconds
  let autoSlideInterval = setInterval(nextSlide, 5000);

  // Event listeners for buttons
  if (prevButton) {
    prevButton.addEventListener("click", (e) => {
      e.preventDefault();
      prevSlide();
      resetInterval();
    });
  }

  if (nextButton) {
    nextButton.addEventListener("click", (e) => {
      e.preventDefault();
      nextSlide();
      resetInterval();
    });
  }

  // Pause auto-sliding when hovering over the slider
  slider.addEventListener("mouseenter", () => {
    clearInterval(autoSlideInterval);
  });

  slider.addEventListener("mouseleave", () => {
    autoSlideInterval = setInterval(nextSlide, 5000);
  });

  // Add keyboard navigation
  document.addEventListener("keydown", (e) => {
    if (e.key === "ArrowLeft") {
      prevSlide();
      resetInterval();
    } else if (e.key === "ArrowRight") {
      nextSlide();
      resetInterval();
    }
  });

  // Add touch support
  let touchStartX = 0;
  let touchEndX = 0;

  slider.addEventListener("touchstart", (e) => {
    touchStartX = e.changedTouches[0].screenX;
  });

  slider.addEventListener("touchend", (e) => {
    touchEndX = e.changedTouches[0].screenX;
    handleSwipe();
  });

  function handleSwipe() {
    const swipeThreshold = 50;
    const diff = touchStartX - touchEndX;

    if (Math.abs(diff) > swipeThreshold) {
      if (diff > 0) {
        nextSlide();
      } else {
        prevSlide();
      }
      resetInterval();
    }
  }
});
