const params = new URLSearchParams(window.location.search);

document.getElementById("firstName").textContent = params.get("firstName");
document.getElementById("lastName").textContent = params.get("lastName");
document.getElementById("email").textContent = params.get("email");
document.getElementById("phone").textContent = params.get("phone");
document.getElementById("business").textContent = params.get("business");
document.getElementById("timestamp").textContent = params.get("timestamp");