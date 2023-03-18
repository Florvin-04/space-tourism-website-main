const imageGrandParentContainer = document.querySelector(".crew__img--container");
const contextGrandParentContainer = document.querySelector(".crew__context");

async function fetchData() {
  const res = await fetch("data.json");
  const response = await res.json();

  response.crew.forEach((data) => {
    const { name, images, role, bio } = data;

    const imageParentContainer = document.createElement("div");
    imageParentContainer.setAttribute("data-image-name", `${name}`);

    const crewParentContainer = document.createElement("div");
    crewParentContainer.setAttribute("data-context-name", `${name}`);

    if (name === "Douglas Hurley") {
      imageParentContainer.setAttribute("data-crew-image-container-active", "true");
      crewParentContainer.setAttribute("data-crew-context-container-active", "true");
    }

    imageParentContainer.innerHTML = `
    
    <img class="${name === "Douglas Hurley" ? "transition-img" : ""}" src="${images.webp}" alt="${name} picture" />

    `;

    crewParentContainer.innerHTML = `
    
    <h4 class="crew--role">${role}</h4>
    <h3 class="hero__context--title crew--title">${name}</h3>
    <p class="hero__context--description crew--description">${bio}</p>
    
    `;

    contextGrandParentContainer.prepend(crewParentContainer);
    imageGrandParentContainer.appendChild(imageParentContainer);
  });
}

fetchData();

window.addEventListener("click", (e) => {
  const target = e.target;
  const tab = target.matches("[aria-controls]");

  const activeImage = document.querySelector("[data-crew-image-container-active]");
  const activeContext = document.querySelector("[data-crew-context-container-active]");
  const activeTab = document.querySelector("[data-active-tab]");

  if (tab && !target.hasAttribute("data-active-tab")) {
    const targetValue = target.getAttribute("aria-controls");
    const imageTarget = document.querySelector(`[data-image-name='${targetValue}']`);
    const contextTarget = document.querySelector(`[data-context-name='${targetValue}']`);

    setTimeout(() => {
      imageTarget.children[0].classList.add("transition-img");
    }, 0.1);

    activeImage.children[0].classList.remove("transition-img");

    target.dataset.activeTab = true;
    delete activeTab.dataset.activeTab;

    imageTarget.dataset.crewImageContainerActive = true;
    delete activeImage.dataset.crewImageContainerActive;

    contextTarget.dataset.crewContextContainerActive = true;
    delete activeContext.dataset.crewContextContainerActive;
  }
});
