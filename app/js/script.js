const hamburgerMenu = document.querySelector("[data-hamburger-menu]");
const headerNav = document.querySelector("[data-header-navigation]");
const navLink = document.querySelectorAll(".nav__link");

hamburgerMenu.addEventListener("click", () => {
  headerNav.classList.toggle("active-nav");

  let bool = hamburgerMenu.dataset.hamburgerMenu;

  if (bool == "true") {
    hamburgerMenu.dataset.hamburgerMenu = false;
  }
  if (bool == "false") {
    hamburgerMenu.dataset.hamburgerMenu = true;
  }
});

navLink.forEach((link) => {
  link.addEventListener("mouseover", (e) => {
    const target = e.target;
    const activeNav = target.closest(".nav__item").hasAttribute("data-active-link");

    if (!activeNav) target.closest(".nav__item").dataset.hover = true;
  });
});

navLink.forEach((link) => {
  link.addEventListener("mouseout", (e) => {
    const target = e.target;
    // const activeNav = target.closest(".nav__item").hasAttribute("data-active-link");
    delete target.closest(".nav__item").dataset.hover;
  });
});
