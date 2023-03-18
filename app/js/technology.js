const grandParentImageContainer = document.querySelector(".technology__img--container");
const grandParentContextContainer = document.querySelector(".technology__context");

async function fetchData() {
  const res = await fetch("data.json");
  const respose = await res.json();

  respose.technology.forEach((data) => {
    const { name, images, description } = data;

    const parentImageContainer = document.createElement("div");
    parentImageContainer.setAttribute("data-image-tab", `${name}`);

    const parentContextContainer = document.createElement("div");
    parentContextContainer.setAttribute("data-context-tab", `${name}`);

    if (name === "Launch vehicle") {
      parentImageContainer.setAttribute("data-active-image-container", "true");
      parentContextContainer.setAttribute("data-active-context-container", "true");
    }

    parentImageContainer.innerHTML = `
    
    <img class="full-width technology-img-landscape technology-image ${name === "Launch vehicle" ? "active-image" : ""}" src="${images.landscape}" alt="${name} landscape picture" />
    <img class="technology-img-portrait technology-image ${name === "Launch vehicle" ? "active-image" : ""}" src="${images.portrait}" alt="${name} portrait picture" />
    
    `;

    parentContextContainer.innerHTML = `
    
    <p class="terminology-txt">the terminoogy...</p>
    <h3 class="hero__context--title technology--title">${name}</h3>
    <p class="hero__context--description technology--description">${description}</p>
    
    `;

    grandParentImageContainer.appendChild(parentImageContainer);
    grandParentContextContainer.appendChild(parentContextContainer);
  });
}

fetchData();

window.addEventListener("click", (e) => {
  const target = e.target;
  //   const technologyImages = document.querySelectorAll(".technology-image");

  const targetTab = target.matches("[aria-controls]");

  const activeImage = document.querySelector("[data-active-image-container]");
  const activeImages = Array.from(activeImage.children);
  const activeContext = document.querySelector("[data-active-context-container]");
  const activeTab = document.querySelector("[data-active-tab]");

  if (targetTab && !target.hasAttribute("data-active-tab")) {
    const targetTabValue = target.getAttribute("aria-controls");
    const targetImage = document.querySelector(`[data-image-tab='${targetTabValue}']`);
    const targetContext = document.querySelector(`[data-context-tab='${targetTabValue}']`);

    const targetImages = Array.from(targetImage.children);

    setTimeout(() => {
      targetImages.forEach((child) => child.classList.add("active-image"));
    }, 0.1);
    activeImages.forEach((child) => child.classList.remove("active-image"));

    targetImage.dataset.activeImageContainer = true;
    delete activeImage.dataset.activeImageContainer;

    targetContext.dataset.activeContextContainer = true;
    delete activeContext.dataset.activeContextContainer;

    target.dataset.activeTab = true;
    delete activeTab.dataset.activeTab;
  }
});
