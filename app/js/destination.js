const parentDestination = document.querySelector(".hero__grid");
const imageContainer = parentDestination.querySelector(".hero__img--container");
const heroContext = parentDestination.querySelector(".hero__context");

async function fetchData() {
  const res = await fetch("data.json");
  const response = await res.json();

  response.destinations.forEach((data) => {
    const { name, images, description, distance, travel } = data;

    const div = document.createElement("div");
    const heroNameDiv = document.createElement("div");
    const heroMoreInfo = document.createElement("div");
    heroMoreInfo.className = "hero__context--more-info";

    div.setAttribute("data-image-value", `${name}`);
    heroNameDiv.setAttribute("data-heading-value", `${name}`);
    heroMoreInfo.setAttribute("data-more-info-value", `${name}`);

    if (name === "Moon") {
      div.setAttribute("data-active-destination-img", true);
      heroNameDiv.setAttribute("data-active-destination-heading", true);
      heroMoreInfo.setAttribute("data-active-destination-more-info", true);
    } else {
      heroNameDiv.setAttribute("data-active-destination-heading", false);
      heroMoreInfo.setAttribute("data-active-destination-more-info", false);
    }

    div.innerHTML = `
    
      <img class="hero__img ${name === "Moon" ? "active" : ""}" src="${images.webp}" alt="${name} Picture" />

    `;

    heroNameDiv.innerHTML = `
    
      <h1 class="hero__context--title">${name}</h1>
      <p class="hero__context--description">${description}</p>

    `;

    heroMoreInfo.innerHTML = `
    <div class="avg-km">
      <p class="subheading2">AVG. DISTANCE</p>
      <p class="subheading1">${distance}</p>
    </div>
    <div class="travel-time">
      <p class="subheading2">Est. travel time</p>
      <p class="subheading1">${travel}</p>
    </div>
    `;

    imageContainer.appendChild(div);
    heroContext.appendChild(heroNameDiv);
    heroContext.appendChild(heroMoreInfo);
  });
}

window.addEventListener("click", (e) => {
  const target = e.target;

  const activeTab = parentDestination.querySelector("[data-active-tab]");
  const activeImage = parentDestination.querySelector("[data-active-destination-img]");
  const activeHeading = parentDestination.querySelector("[data-active-destination-heading='true']");
  const activeMoreInfo = parentDestination.querySelector("[data-active-destination-more-info='true']");
  const hero__imgActiveTransition = activeImage.querySelector(".hero__img");

  if (target.matches("[aria-controls]") && !target.hasAttribute("data-active-tab")) {
    const planet = target.getAttribute("aria-controls");

    const planetImage = parentDestination.querySelector(`[data-image-value='${planet}']`);
    const planetHeading = parentDestination.querySelector(`[data-heading-value='${planet}']`);
    const planetMoreInfo = parentDestination.querySelector(`[data-more-info-value='${planet}']`);
    const hero__img = planetImage.querySelector(".hero__img");

    setTimeout(() => {
      hero__img.classList.add("active");
    }, 0.1);

    hero__imgActiveTransition.classList.remove("active");

    target.dataset.activeTab = true;
    delete activeTab.dataset.activeTab;

    planetImage.dataset.activeDestinationImg = true;
    delete activeImage.dataset.activeDestinationImg;

    planetHeading.dataset.activeDestinationHeading = true;
    activeHeading.dataset.activeDestinationHeading = false;

    planetMoreInfo.dataset.activeDestinationMoreInfo = true;
    activeMoreInfo.dataset.activeDestinationMoreInfo = false;
  }
});

fetchData();
