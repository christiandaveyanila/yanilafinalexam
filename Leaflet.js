document.addEventListener("DOMContentLoaded", () => {
    const locationInput = document.getElementById("locationInput");
    const addLocationButton = document.getElementById("addLocationButton");
    const locationsList = document.getElementById("locationsList");

    let locationsArray = [];
    let map = L.map("map").setView([14.5995, 120.9842], 5);

    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution: "© OpenStreetMap contributors"
    }).addTo(map);

    addLocationButton.addEventListener("click", () => {
        const location = locationInput.value.trim();
        if (location !== "") {
            locationsArray.push(location);
            locationInput.value = "";
            updateLocationsList();
            updateMap(location);
        }
    });

    function updateLocationsList() {
        locationsList.innerHTML = "";
        locationsArray.forEach((location) => {
            const li = document.createElement("li");
            li.textContent = location;
            li.addEventListener("click", () => updateMap(location));
            locationsList.appendChild(li);
        });
    }

    function updateMap(location) {
        const coordinates = getCoordinatesForLocation(location);
        if (coordinates) {
            map.setView(coordinates, 12);
            L.marker(coordinates).addTo(map).bindPopup(location).openPopup();
        } else {
            alert("Location not found.");
        }
    }

    function getCoordinatesForLocation(location) {
        const locationCoordinates = {
            "philippines": [13.41, 122.56],
            "taiwan": [23.6978, 120.9605],
            "manila": [14.5995, 120.9842],
            "america": [37.0902, -95.7129],
            "iloilo": [10.7202, 122.5621],
            "oton": [10.693, 122.474]
        };
        return locationCoordinates[location.toLowerCase()];
    }
});
