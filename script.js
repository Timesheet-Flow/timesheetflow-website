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

// Cookie consent popup
document.addEventListener("DOMContentLoaded", function () {
  const cookiePopup = document.getElementById("cookie-popup");
  const cookieAgreeBtn = document.getElementById("cookie-agree");
  const cookieDeclineBtn = document.getElementById("cookie-decline");
  const subscribeForm = document.getElementById("subscribe-form");

  // Check if user has already made a choice
  const consentChoice = localStorage.getItem("cookieConsent");
  if (!consentChoice) {
    cookiePopup.classList.remove("hidden");
  } else if (consentChoice === "declined") {
    // If previously declined, disable form features that might set cookies
    if (subscribeForm) {
      subscribeForm.style.opacity = "0.5";
      subscribeForm.style.pointerEvents = "none";
      const formMessage = document.createElement("p");
      formMessage.textContent =
        "Newsletter subscription requires cookie consent.";
      formMessage.style.color = "#666";
      formMessage.style.fontSize = "0.875rem";
      formMessage.style.textAlign = "center";
      formMessage.style.marginTop = "0.5rem";
      subscribeForm.appendChild(formMessage);
    }
  }

  // Handle agree button click
  cookieAgreeBtn.addEventListener("click", function () {
    localStorage.setItem("cookieConsent", "accepted");
    cookiePopup.classList.add("hidden");
    // Re-enable form if it was disabled
    if (subscribeForm) {
      subscribeForm.style.opacity = "1";
      subscribeForm.style.pointerEvents = "auto";
      const message = subscribeForm.querySelector("p");
      if (message && message.textContent.includes("requires cookie consent")) {
        message.remove();
      }
    }
  });

  // Handle decline button click
  cookieDeclineBtn.addEventListener("click", function () {
    localStorage.setItem("cookieConsent", "declined");
    cookiePopup.classList.add("hidden");
    // Disable form features that might set cookies
    if (subscribeForm) {
      subscribeForm.style.opacity = "0.5";
      subscribeForm.style.pointerEvents = "none";
      const formMessage = document.createElement("p");
      formMessage.textContent =
        "Newsletter subscription requires cookie consent.";
      formMessage.style.color = "#666";
      formMessage.style.fontSize = "0.875rem";
      formMessage.style.textAlign = "center";
      formMessage.style.marginTop = "0.5rem";
      subscribeForm.appendChild(formMessage);
    }
  });
});
