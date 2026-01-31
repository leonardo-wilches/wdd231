const spotlightContainer = document.querySelector("#spotlight-container");
const membersURL = "data/members.json";

async function loadSpotlights() {
    try {
        const response = await fetch(membersURL);
        const members = await response.json();

        const qualifiedMembers = members.filter(member =>
            member.membershipLevel === 2 || member.membershipLevel === 3
        );

        const shuffled = qualifiedMembers.sort(() => 0.5 - Math.random());

        const spotlightCount = Math.floor(Math.random() * 2) + 2;
        const selectedMembers = shuffled.slice(0, spotlightCount);

        selectedMembers.forEach(member => {
            const card = document.createElement("div");
            card.classList.add("spotlight-card");

            const level =
                member.membershipLevel === 3 ? "Gold Member" : "Silver Member";

            card.innerHTML = `
                <h3>${member.name}</h3>
                <img src="images/${member.image}" alt="${member.name} logo">
                <p>${member.address[0]}</p>
                <p>${member.phone}</p>
                <p><a href="${member.website}" target="_blank">${member.website}</a></p>
                <p><strong>${level}</strong></p>
            `;

            spotlightContainer.appendChild(card);
        });

    } catch (error) {
        console.error("Error loading spotlight members:", error);
    }
}

loadSpotlights();