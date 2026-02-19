import souvenirs from "../data/souvenirs.mjs";

const container = document.querySelector("#places");

souvenirs.forEach((souvenir) => {

    const card = document.createElement("div");
    card.classList.add("product-card");

    const title = document.createElement("h2");
    title.textContent = souvenir.name;

    const figure = document.createElement("figure");

    const img = document.createElement("img");
    img.src = souvenir.image;
    img.alt = souvenir.name;
    img.loading = "lazy";

    figure.appendChild(img);

    const description = document.createElement("p");
    description.textContent = souvenir.description;

    const price = document.createElement("p");
    price.classList.add("price");

    price.textContent = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD"
    }).format(souvenir.price);

    card.appendChild(title);
    card.appendChild(figure);
    card.appendChild(description);
    card.appendChild(price);

    container.appendChild(card);
});