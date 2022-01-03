"use strict";

// Make navbar transparent when it is on the top
const navbar = document.querySelector("#navbar");
const navbarHeight = navbar.getBoundingClientRect().height;

// Make home slowly fade to transparent as the window scrolls down
const home = document.querySelector(".home__container");
const homeHeight = home.getBoundingClientRect().height;

window.addEventListener("scroll", () => {
  // console.log(window.scrollY);
  // console.log(navbarHeight);
  if (window.scrollY < navbarHeight) {
    navbar.classList.remove("navbar__scroll");
  } else {
    navbar.classList.add("navbar__scroll");
  }

  home.style.opacity = 1 - window.scrollY / homeHeight;
});

// Handle scrolling when tapping on the navbar menu
const navbarMenu = document.querySelector(".navbar__menu");
navbarMenu.addEventListener("click", (event) => {
  // console.log(event.target.dataset.link);
  const target = event.target;
  const link = target.dataset.link;

  if (link == null) {
    return;
  }

  scrollingSection(link);
});

// Handle  click on Contact button on home
const contactBtn = document.querySelector(".home__btnContact");
contactBtn.addEventListener("click", () => {
  scrollingSection("#contact");
});

function scrollingSection(selector) {
  const scrollTo = document.querySelector(selector);
  scrollTo.scrollIntoView({
    behavior: "smooth",
    block: "end",
    inline: "nearest",
  });
}

// Responsive
const toggleBtn = document.querySelector(".navbar__toggleBtn");
const menu = document.querySelector(".navbar__menu");

toggleBtn.addEventListener("click", () => {
  menu.classList.toggle("show");
});
