// Header shrink on scroll and dynamic body padding
function updateHeaderAndBodyPadding() {
  const header = document.getElementById("header");
  const container = header.querySelector(".container");
  const scrollY = window.scrollY;
  const maxShrink = 100; // pixels to fully shrink
  const shrinkFactor = Math.min(scrollY / maxShrink, 1);

  // Padding from 1.5rem to 0.75rem
  const padding = 1.5 - shrinkFactor * 0.75;
  container.style.paddingTop = padding + "rem";
  container.style.paddingBottom = padding + "rem";

  // Dynamically set body top padding to header height
  document.body.style.paddingTop = header.offsetHeight + "px";
}

window.addEventListener("scroll", updateHeaderAndBodyPadding);
window.addEventListener("resize", updateHeaderAndBodyPadding);
window.addEventListener("DOMContentLoaded", updateHeaderAndBodyPadding);

// Scroll animations
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
      }
    });
  },
  { threshold: 0.1 }
);

document.querySelectorAll(".fade-in").forEach((el) => {
  observer.observe(el);
});

// Handle mailing list form submission
const form = document.getElementById("subscribe-form");
if (form) {
  form.addEventListener("submit", function (e) {
    // Show success message with banner background beneath the form
    const successBanner = document.createElement("div");
    successBanner.innerHTML =
      "&#10003; Thank you for subscribing. We will keep you updated!";
    successBanner.style.backgroundColor = "rgba(0, 128, 0, 0.8)"; // Semi-transparent green
    successBanner.style.color = "white";
    successBanner.style.padding = "10px";
    successBanner.style.borderRadius = "5px";
    successBanner.style.textAlign = "center";
    successBanner.style.fontWeight = "bold";
    successBanner.style.marginTop = "10px";
    successBanner.style.opacity = "1";
    successBanner.style.transition = "opacity 0.5s ease";
    this.appendChild(successBanner);
    // Fade out after 5 seconds
    setTimeout(() => {
      successBanner.style.opacity = "0";
      setTimeout(() => successBanner.remove(), 500);
    }, 5000);
  });
}

// Mobile menu toggle
const menuToggle = document.getElementById("menu-toggle");
const navMenu = document.getElementById("nav-menu");
const menuIcon = menuToggle.querySelector("i");
if (menuToggle && navMenu) {
  menuToggle.addEventListener("click", function () {
    navMenu.classList.toggle("mobile");
    if (navMenu.classList.contains("mobile")) {
      menuIcon.className = "fas fa-times text-2xl";
    } else {
      menuIcon.className = "fas fa-bars text-2xl";
    }
  });
}
