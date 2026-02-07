const params = new URLSearchParams(window.location.search);

function setText(id, value) {
    const element = document.getElementById(id);
    if (element) {
        element.textContent = value || "N/A";
    }
}

setText("fname", params.get("fname"));
setText("lname", params.get("lname"));
setText("email", params.get("email"));
setText("phone", params.get("phone"));
setText("business", params.get("business"));

const rawTimestamp = params.get("timestamp");

if (rawTimestamp) {
    const date = new Date(rawTimestamp);
    const formattedDate = date.toLocaleString();
    setText("timestamp", formattedDate);
}