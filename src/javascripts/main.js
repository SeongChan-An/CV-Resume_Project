"use strict";

// Make navbar transparent when it is on the top
const navbar = document.querySelector("#navbar");
const navbarHeight = navbar.getBoundingClientRect().height;

// Make home slowly fade to transparent as the window scrolls down
const home = document.querySelector(".home__container");
const homeHeight = home.getBoundingClientRect().height;

// Show "arrow up" button when scrolling down
const arrowUp = document.querySelector(".arrow_up");

window.addEventListener("scroll", () => {
  // console.log(window.scrollY);
  // console.log(navbarHeight);
  if (window.scrollY < navbarHeight) {
    navbar.classList.remove("navbar__scroll");
  } else {
    navbar.classList.add("navbar__scroll");
  }

  home.style.opacity = 1 - window.scrollY / homeHeight;

  if (window.scrollY > homeHeight / 2) {
    arrowUp.classList.add("visible");
  } else {
    arrowUp.classList.remove("visible");
  }
});

arrowUp.addEventListener("click", () => {
  console.log("clicked");
  scrollingSection("#home");
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

// Projects
const categoryBtn = document.querySelector(".portfolio__categories");
const projectContainer = document.querySelector(".portfolio__projects");
const projects = document.querySelectorAll(".project");

categoryBtn.addEventListener("click", (event) => {
  const filter =
    event.target.dataset.filter || event.target.parentNode.dataset.filter;

  if (filter == null) {
    return;
  }
  //
  projectContainer.classList.add("ani_out");

  setTimeout(() => {
    projects.forEach((project) => {
      if (filter === "*" || filter === project.dataset.type) {
        project.classList.remove("invisible");
      } else {
        project.classList.add("invisible");
      }
    });
    projectContainer.classList.remove("ani_out");
  }, 300);
});

// Responsive
const toggleBtn = document.querySelector(".navbar__toggleBtn");
const menu = document.querySelector(".navbar__menu");

toggleBtn.addEventListener("click", () => {
  menu.classList.toggle("show");
});
