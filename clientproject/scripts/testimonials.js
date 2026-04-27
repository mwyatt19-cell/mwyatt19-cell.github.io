document.addEventListener("DOMContentLoaded", function () {
  let slides = document.querySelectorAll(".slide");
  if (slides.length === 0) return;

  let current = 0;
  slides[current].classList.add("active");

  function showSlide(index) {
    slides[current].classList.remove("active");
    current = index;
    if (current < 0) current = slides.length - 1;
    if (current >= slides.length) current = 0;
    slides[current].classList.add("active");
  }

  function nextSlide() {
    showSlide(current + 1);
  }

  function prevSlide() {
    showSlide(current - 1);
  }

  let slideInterval = setInterval(nextSlide, 5000);

  // Add event listeners for prev and next buttons
  let prevButton = document.querySelector(".prev");
  let nextButton = document.querySelector(".next");

  if (prevButton) {
    prevButton.addEventListener("click", function () {
      clearInterval(slideInterval);
      prevSlide();
      slideInterval = setInterval(nextSlide, 5000);
    });
  }

  if (nextButton) {
    nextButton.addEventListener("click", function () {
      clearInterval(slideInterval);
      nextSlide();
      slideInterval = setInterval(nextSlide, 5000);
    });
  }

  window.addEventListener("beforeunload", function () {
    clearInterval(slideInterval);
  });
});
