const hamburgerMenu = document.querySelector("[data-hamburger-menu]");
const headerNav = document.querySelector("[data-header-navigation]");
const navLink = document.querySelectorAll(".nav__link");

const destinationParent = document.getElementById("destination");

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

function getTabs(name) {
  return `
    <li class="tab__list--item" aria-controls=${name}  >
        ${name}
    </li>
    `;
}

// todo tablist

async function fetchData() {
  const res = await fetch("data.json");
  const response = await res.json();

  response.destinations.forEach((data) => {
    const { name, images, description, distance, travel } = data;

    const div = document.createElement("div");
    div.className = `hero__grid`;
    div.id = `${name}`;
    if (name == "Moon") {
      div.setAttribute("data-active-destination", "true");
    }
    div.innerHTML = `

  <div class="hero__img--container">
    <img class="hero__img" src="${images.webp}" alt=""  />
  </div>
  <div class="hero__context">
    <ul class="tab__list" role="tablist" data-destination-tab-list>
     
    
    <li class="tab__list--item" aria-controls="Moon" ${name === name ? "data-active-destination-tab" : ""}>moon</li>
    <li class="tab__list--item" aria-controls="Mars" ${name === name ? "data-active-destination-tab" : ""}>mars</li>
    <li class="tab__list--item" aria-controls="Europa" ${name === name ? "data-active-destination-tab" : ""}>europa</li>
    <li class="tab__list--item" aria-controls="Titan" ${name === name ? "data-active-destination-tab" : ""}>titan</li>
   

    </ul>
    <h1 class="hero__context--title">${name}</h1>
    <p class="hero__context--description">${description}</p>

    <div class="hero__context--more-info">
      <div class="avg-km">
        <p class="subheading2">AVG. DISTANCE</p>
        <p class="subheading1">${distance}</p>
      </div>
      <div class="travel-time">
        <p class="subheading2">Est. travel time</p>
        <p class="subheading1">${travel}</p>
      </div>
    </div>
  </div>
    
    `;

    destinationParent.appendChild(div);
  });

  // destinationTabList.forEach((tab) => {
  //   tab.addEventListener("click", (e) => {
  //     const target = e.target;
  //     const activeDestination = document.querySelector("[data-active-destination]");
  //     const activeTab = document.querySelector("[data-active-tab]");
  //     const targetDataSet = target.getAttribute("aria-controls");
  //     const parent = document.querySelector(`#${targetDataSet}`);

  //     if (target.hasAttribute("data-active-tab")) {
  //       return;
  //     }

  //     parent.setAttribute("data-active-destination", "true");
  //     delete activeDestination.dataset.activeDestination;

  //     target.setAttribute("data-active-tab", "true");
  //   });
  // });

  window.addEventListener("click", (e) => {
    const target = e.target;
    const destinationTab = document.querySelector("[data-destination-tab-list]");

    if (target.matches("[aria-controls]")) {
      const targetDataSet = target.getAttribute("aria-controls");
      const parent = document.querySelector(`#${targetDataSet}`);
      const activeDestination = document.querySelector("[data-active-destination]");
      const activeTab = destinationTab.querySelector("[data-active-destination-tab]");

      if (target.hasAttribute("data-active-destination-tab")) {
        return;
      }

      target.setAttribute("data-active-destination-tab", "true");
      delete activeTab.dataset.activeDestinationTab;

      console.log(activeTab);

      parent.setAttribute("data-active-destination", "true");
      delete activeDestination.dataset.activeDestination;
    }
  });
}

fetchData();
