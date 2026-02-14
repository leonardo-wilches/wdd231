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
    figure.appendChild(img);

    const address = document.createElement("address");
    address.textContent = place.address;

    const description = document.createElement("p");
    description.textContent = place.description;

    const button = document.createElement("button");
    button.textContent = "Learn More";

    card.appendChild(title);
    card.appendChild(figure);
    card.appendChild(address);
    card.appendChild(description);
    card.appendChild(button);

    container.appendChild(card);
});

document.addEventListener("DOMContentLoaded", () => {

    const messageText = document.querySelector("#message-text");
    const closeBtn = document.querySelector("#close-message");

    const now = Date.now();
    const lastVisit = localStorage.getItem("lastVisit");

    let message;

    if (!lastVisit) {
        message = "Welcome! Let us know if you have any questions.";
    } else {
        const millisecondsBetween = now - Number(lastVisit);
        const daysBetween = Math.floor(millisecondsBetween / (1000 * 60 * 60 * 24));

        if (daysBetween < 1) {
            message = "Back so soon! Awesome!";
        } else if (daysBetween === 1) {
            message = "You last visited 1 day ago.";
        } else {
            message = `You last visited ${daysBetween} days ago.`;
        }
    }

    messageText.textContent = message;

    localStorage.setItem("lastVisit", now);

    closeBtn.addEventListener("click", () => {
        document.querySelector("#visit-message").style.display = "none";
    });

});