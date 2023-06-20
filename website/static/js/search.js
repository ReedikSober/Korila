// Event listeners
document.getElementById("searchInput").addEventListener("keydown", handleSearchInput);
document.getElementById("searchButton").addEventListener("click", handleSearchButton);
document.addEventListener("click", closePopupOnClick);
document.addEventListener("keydown", closePopupOnEscape);

// Functions
function handleSearchInput(event) {
    if (event.key === "Enter") {
        event.preventDefault();
        document.getElementById("searchButton").click();
    }
}

function handleSearchButton() {
    const searchInputValue = document.getElementById("searchInput").value;

    const xhr = new XMLHttpRequest();
    const url = "/search/";
    const params = "searchInput=" + searchInputValue;
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
}

function closePopupOnClick(event) {
    const popup = document.getElementById("popup");
    const popupContent = document.getElementById("popupContent");
    const searchInput = document.getElementById("searchInput");

    if (popup.style.display === "block" && !popupContent.contains(event.target) && !searchInput.contains(event.target)) {
        popup.style.display = "none";
    }
}

function closePopupOnEscape(event) {
    if (event.key === "Escape") {
        closePopupOnClick(event);
    }
}

function displayPopup(data) {
    resetPopupContent();

    if (data.length === 0) {
        displayNoResults();
    } else {
        data.forEach(function (flora) {
            createFloraElements(flora);
        });
    }

    showPopup();
    addScrollbarIfNeeded();
}

function displayNoResults() {
    const noResultsElement = document.createElement("p");
    noResultsElement.textContent = "Cannot find the desired object!";
    noResultsElement.classList.add("center");

    const popupContent = document.getElementById("popupContent");
    popupContent.appendChild(noResultsElement);
}

function createFloraElements(flora) {
    const popupContent = document.getElementById("popupContent");

    const nameElement = document.createElement("p");
    nameElement.textContent = flora.name;
    nameElement.classList.add("center");

    const harvestElement = document.createElement("p");
    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    const startMonth = months[flora.harvest_start_month - 1];
    const endMonth = months[flora.harvest_end_month - 1];
    harvestElement.textContent = startMonth + " - " + endMonth;
    harvestElement.classList.add("center");

    const description = document.createElement("p");
    description.textContent = flora.description;
    description.classList.add("center");

    const imageContainer = document.createElement("div");
    imageContainer.className = "image-container";

    const imageElement = document.createElement("img");
    imageElement.src = flora.picture_url;

    const addToCalendarButton = document.createElement("button");
    addToCalendarButton.textContent = "Add";
    addToCalendarButton.addEventListener("click", function () {
        addToCalendar(flora);
    });

    const removeFromCalendarButton = document.createElement("button");
    removeFromCalendarButton.textContent = "Remove";
    removeFromCalendarButton.addEventListener("click", function () {
        removeFromCalendar(flora);
    });

    const bottomImageContainer = document.createElement("div");
    bottomImageContainer.className = "bottomimage-container";

    const bottomImageElement = document.createElement("img");
    bottomImageElement.src = "https://static.vecteezy.com/system/resources/thumbnails/020/434/480/small/cute-floral-page-divider-doodle-illustrations-simple-flower-border-line-art-vector.jpg";


    imageContainer.appendChild(imageElement);
    bottomImageContainer.appendChild(bottomImageElement);

    popupContent.appendChild(nameElement);
    popupContent.appendChild(harvestElement);
    popupContent.appendChild(description);
    popupContent.appendChild(imageContainer);
    popupContent.appendChild(addToCalendarButton);
    popupContent.appendChild(removeFromCalendarButton);
    popupContent.appendChild(bottomImageContainer);
}

function showPopup() {
    const popup = document.getElementById("popup");
    popup.style.display = "block";
}

function addScrollbarIfNeeded() {
    const popupContent = document.getElementById("popupContent");
    const maxHeight = "455px";
    const contentHeight = popupContent.scrollHeight;

    // Reset height and overflow properties
    popupContent.style.height = "auto";
    popupContent.style.overflowY = "visible";

    // Apply height and overflow changes if needed
    if (contentHeight > parseInt(maxHeight, 10)) {
        popupContent.style.height = maxHeight;
        popupContent.style.overflowY = "scroll";
    } else {
        popupContent.style.overflowY = "hidden";
    }
}

function addToCalendar(flora) {
    const csrftoken = getCookie('csrftoken');

    const xhr = new XMLHttpRequest();
    const url = "/add-to-calendar/";
    const params = "floraId=" + flora.id;
    xhr.open("POST", url, true);
    xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhr.setRequestHeader("X-CSRFToken", csrftoken);

    xhr.onreadystatechange = function () {
        if (xhr.readyState === XMLHttpRequest.DONE) {
            if (xhr.status === 200) {
                showSuccessMessage("Added to calendar");
                refreshTable();
            } else {
                console.error("Error: " + xhr.status);
            }
        }
    };

    xhr.send(params);
}

function removeFromCalendar(flora) {
    const csrftoken = getCookie('csrftoken');

    const xhr = new XMLHttpRequest();
    const url = "/remove-from-calendar/";
    const params = "floraId=" + flora.id;
    xhr.open("POST", url, true);
    xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhr.setRequestHeader("X-CSRFToken", csrftoken);

    xhr.onreadystatechange = function () {
        if (xhr.readyState === XMLHttpRequest.DONE) {
            if (xhr.status === 200) {
                showSuccessMessage("Removed from calendar");
                refreshTable();
            } else {
                console.error("Error: " + xhr.status);
            }
        }
    };

    xhr.send(params);
}

function getCookie(name) {
    const cookieValue = document.cookie.match('(^|;)\\s*' + name + '\\s*=\\s*([^;]+)');
    return cookieValue ? cookieValue.pop() : '';
}

function showSuccessMessage(message) {
    const successMessageElement = document.getElementById("successMessage");
    successMessageElement.textContent = message;
    successMessageElement.classList.add("success-message");

    const successPopup = document.getElementById("successPopup");
    successPopup.style.display = "block";

    setTimeout(function () {
        successPopup.style.display = "none";
        successMessageElement.classList.remove("success-message");
    }, 1000);
}

const successPopupHTML = `
  <div id="successPopup" class="popup">
      <span id="successMessage"></span>
  </div>
`;
document.body.insertAdjacentHTML("beforeend", successPopupHTML);
document.getElementById("calendarTable");

function refreshTable() {
    const xhr = new XMLHttpRequest();
    const url = "/refresh-table/";
    xhr.open("GET", url, true);

    xhr.onreadystatechange = function () {
        if (xhr.readyState === XMLHttpRequest.DONE) {
            if (xhr.status === 200) {
                const updatedTableContent = xhr.responseText;
                const table = document.getElementById("calendarTable");
                table.innerHTML = updatedTableContent;
            } else {
                console.error("Error: " + xhr.status);
            }
        }
    };

    xhr.send();
}

function resetPopupContent() {
    const popupContent = document.getElementById("popupContent");
    popupContent.innerHTML = "";
    popupContent.style.height = "auto";
    popupContent.style.overflowY = "visible";
}
