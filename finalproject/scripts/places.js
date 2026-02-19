import places from "../data/places.mjs";

const container = document.querySelector("#places");

places.forEach(place => {

    const card = document.createElement("div");

    const title = document.createElement("h2");
    title.textContent = place.name;

    const figure = document.createElement("figure");
    const img = document.createElement("img");
    img.src = place.image;
    img.alt = place.name;
    img.loading = "lazy";
    figure.appendChild(img);

    const address = document.createElement("address");
    address.textContent = place.address;

    const description = document.createElement("p");
    description.textContent = place.description;

    const button = document.createElement("button");
    button.textContent = "Learn More";

    button.addEventListener("click", () => {
        document.querySelector("#modal-title").textContent = place.name;
        document.querySelector("#modal-info").textContent = place.modalInfo;

        document.querySelector("#place-modal").classList.add("show");
    });

    card.appendChild(title);
    card.appendChild(figure);
    card.appendChild(address);
    card.appendChild(description);
    card.appendChild(button);

    container.appendChild(card);
});

const modal = document.querySelector("#place-modal");
const closeModal = document.querySelector("#close-modal");

closeModal.addEventListener("click", () => {
    modal.classList.remove("show");
});