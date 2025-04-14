"use strict";

// ACTIVE NAVIGATION
const navLinks = document.querySelectorAll(".navLink");
let currentPath = window.location.pathname;

navLinks.forEach((link) => {
  if (link.getAttribute("href") === currentPath) {
    link.classList.add("active");
  }
});

document.addEventListener("DOMContentLoaded", () => {
  // Check if the page was reloaded manually
  if (performance.getEntriesByType("navigation")[0].type === "reload") {
    window.location.href = "/index.html"; // Redirect to index.html
  }
});

// NAV //

const nav = document.querySelector(".nav");
const navBtn = document.querySelector(".navToggle");
navBtn.addEventListener("click", function () {
  nav.classList.toggle("stick");
});

// NAV STICK REMOVER //
const navs = document.querySelectorAll(".navLink");

navs.forEach((button) => {
  button.addEventListener("click", function () {
    navs.classList.remove("stick");
  });
});

// RELOAD COUNTER /
const counters = document.querySelectorAll(".counterTitle");
let isCounting = false;

function animateCounter(counter) {
  let target = +counter.getAttribute("data-target");
  let speed = target / 100;
  let count = 0;

  let updateCount = () => {
    count += speed;
    if (count < target) {
      counter.innerText = Math.floor(count) + "+";
      requestAnimationFrame(updateCount);
    } else {
      counter.innerText = target + "+";
    }
  };
  updateCount();
}

let observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting && !isCounting) {
        isCounting = true;
        counters.forEach((counter) => {
          counter.innerText = "0+";
          animateCounter(counter);
        });
      } else if (!entry.isIntersecting) {
        isCounting = false;
      }
    });
  },
  { threshold: 0.5 }
);

counters.forEach((counter) => {
  observer.observe(counter);
});
