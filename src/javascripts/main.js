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
const standardWidth = 768;
const navbarMenu = document.querySelector(".navbar__menu");
navbarMenu.addEventListener("click", (event) => {
  // console.log(event.target.dataset.link);
  const target = event.target;
  const link = target.dataset.link;

  if (link == null) {
    return;
  }

  navbarMenu.classList.remove("show");
  scrollingSection(link);
});

// Handle  click on Contact button on home
const contactBtn = document.querySelector(".home__btnContact");
contactBtn.addEventListener("click", () => {
  scrollingSection("#contact");
});

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

  // Remove selection from the previous item and select the new one
  const selected = document.querySelector(".category__btn.selected");
  selected.classList.remove("selected");
  const target =
    event.target.nodeName === "BUTTON" ? event.target : event.target.parentNode;
  target.classList.add("selected");

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

/**
 * Menubar
 * Need to get the information from sections
 *
 */

const sectionIds = ["#home", "#about", "#skills", "#portfolio", "#contact"];
const sections = sectionIds.map((id) => document.querySelector(id));
const navItems = sectionIds.map((id) =>
  document.querySelector(`[data-link="${id}"]`)
);

let selectedNavIndex = getIdxOfSectionOnViewPort();
let selectedNavItem = navItems[selectedNavIndex];
function selectNavItem(selected) {
  selectedNavItem.classList.remove("active");
  selectedNavItem = selected;
  selectedNavItem.classList.add("active");
}

function scrollingSection(selector) {
  const scrollTo = document.querySelector(selector);
  if (window.innerWidth > standardWidth) {
    scrollTo.scrollIntoView({
      behavior: "smooth",
      block: "end",
      inline: "nearest",
    });
  } else {
    scrollTo.scrollIntoView({
      behavior: "smooth",
      block: "start",
      inline: "nearest",
    });
  }
  selectNavItem(navItems[sectionIds.indexOf(selector)]);
}

const observerOptions = {
  root: null,
  rootMargin: "0px",
  threshold: 0.3,
};

const observerCallback = (entries, observer) => {
  entries.forEach((entry) => {
    if (!entry.isIntersecting && entry.intersectionRatio > 0) {
      console.log("y");
      const index = sectionIds.indexOf(`#${entry.target.id}`);
      // 스크롤링이 아래로 되어서 페이지가 올라옴
      if (entry.boundingClientRect.y < 0) {
        selectedNavIndex = index + 1;
      } else {
        selectedNavIndex = index - 1;
      }
    }
  });
};

const observer = new IntersectionObserver(observerCallback, observerOptions);
sections.forEach((section) => observer.observe(section));

window.addEventListener("wheel", () => {
  console.log(`scrollY: ${window.scrollY}`);

  console.log(`window.innerHeight: ${window.innerHeight}`);

  console.log(`document.body.clientHeight: ${document.body.clientHeight}`);

  if (window.scrollY === 0) {
    selectedNavIndex = 0;
  } else if (
    Math.round(window.scrollY + window.innerHeight) >=
    document.body.clientHeight
  ) {
    console.log("요기");
    selectedNavIndex = navItems.length - 1;
  }
  selectNavItem(navItems[selectedNavIndex]);
});

// 새로고침 시
function getIdxOfSectionOnViewPort() {
  const section = document
    .elementFromPoint(window.innerWidth / 2, window.innerHeight * (2 / 3))
    .closest(".section");

  const idx = sectionIds.indexOf(`#${section.id}`);

  return idx;
}

window.addEventListener("load", () => {
  selectNavItem(navItems[selectedNavIndex]);
});
