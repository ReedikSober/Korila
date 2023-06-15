document.getElementById("searchButton").addEventListener("click", function () {
    const searchInput = document.getElementById("searchInput").value;

    // Make an AJAX request to the server
    const xhr = new XMLHttpRequest();
    const url = "/search/";
    const params = "searchInput=" + searchInput;
    xhr.open("GET", url + "?" + params, true);

    xhr.onreadystatechange = function () {
        if (xhr.readyState === XMLHttpRequest.DONE) {
            if (xhr.status === 200) {
                const response = JSON.parse(xhr.responseText);
                displayPopup(response);
            } else {
                console.error("Error: " + xhr.status);
            }
        }
    };

    xhr.send();
});

function displayPopup(data) {
    const popupContent = document.getElementById("popupContent");
    popupContent.innerHTML = ""; // Clear previous content

    data.forEach(function (flora) {
        // Create elements to display the retrieved data
        const nameElement = document.createElement("p");
        nameElement.textContent = flora.name;
        nameElement.classList.add("center"); // Add center class

        const harvestElement = document.createElement("p");
        const startMonth = new Date(flora.harvest_start_month).toLocaleString('default', {month: 'long'});
        const endMonth = new Date(flora.harvest_end_month).toLocaleString('default', {month: 'long'});
        harvestElement.textContent = startMonth + " - " + endMonth;
        harvestElement.classList.add("center"); // Add center class

        const imageContainer = document.createElement("div");
        imageContainer.className = "image-container";

        const imageElement = document.createElement("img");
        imageElement.src = flora.picture_url;

        // Add image element to the container
        imageContainer.appendChild(imageElement);

        // Add elements to the popup content
        popupContent.appendChild(nameElement);
        popupContent.appendChild(harvestElement);
        popupContent.appendChild(imageContainer);
    });

    // Display the pop-up
    const popup = document.getElementById("popup");
    popup.style.display = "block";
}


document.addEventListener("click", function (event) {
    closePopup(event);
});

document.addEventListener("keydown", function (event) {
    if (event.key === "Escape") {
        closePopup(event);
    }
});

function closePopup(event) {
    const popup = document.getElementById("popup");
    const popupContent = document.getElementById("popupContent");
    const searchInput = document.getElementById("searchInput");

    if (popup.style.display === "block" && !popupContent.contains(event.target) && !searchInput.contains(event.target)) {
        popup.style.display = "none";
    }
}
