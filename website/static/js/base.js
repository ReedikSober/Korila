document.getElementById("searchInput").addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
        event.preventDefault(); // Prevent the default form submission behavior
        document.getElementById("searchButton").click(); // Trigger the search button's click event
    }
});

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

    if (data.length === 0) {
        const noResultsElement = document.createElement("p");
        noResultsElement.textContent = "Cannot find the desired object!";
        noResultsElement.classList.add("center"); // Add center class

        // Add the "Cannot find the desired object!" element to the popup content
        popupContent.appendChild(noResultsElement);
    } else {
        // const flora = data[0]; // Retrieve the first object from the data array
        data.forEach(function (flora) {        // Create elements to display the retrieved data
            const nameElement = document.createElement("p");
            nameElement.textContent = flora.name;
            nameElement.classList.add("center"); // Add center class

            const harvestElement = document.createElement("p");
            const months = ["January", "February", "March", "April", "May", "June",
                "July", "August", "September", "October", "November", "December"];
            const startMonth = months[flora.harvest_start_month - 1]; // Subtract 1 to convert to array index
            const endMonth = months[flora.harvest_end_month - 1]; // Subtract 1 to convert to array index
            harvestElement.textContent = startMonth + " - " + endMonth;
            harvestElement.classList.add("center"); // Add center class

            const description = document.createElement("p");
            description.textContent = flora.description;
            description.classList.add("center"); // Add center class

            const imageContainer = document.createElement("div");
            imageContainer.className = "image-container";

            const imageElement = document.createElement("img");
            imageElement.src = flora.picture_url;

            // Add image element to the container
            imageContainer.appendChild(imageElement);

            // Add elements to the popup content
            popupContent.appendChild(nameElement);
            popupContent.appendChild(harvestElement);
            popupContent.appendChild(description);
            popupContent.appendChild(imageContainer);

            // Create "Add to calendar" button
            const addToCalendarButton = document.createElement("button");
            addToCalendarButton.textContent = "Add";
            addToCalendarButton.addEventListener("click", function () {
                addToCalendar(flora);
            });
            popupContent.appendChild(addToCalendarButton);
            // Create "Remove from calendar" button
            const removeFromCalendarButton = document.createElement("button");
            removeFromCalendarButton.textContent = "Remove";
            removeFromCalendarButton.addEventListener("click", function () {
                removeFromCalendar(flora);
            });
            popupContent.appendChild(removeFromCalendarButton);
        });
    }
    // Display the pop-up
    const popup = document.getElementById("popup");
    popup.style.display = "block";

    // Adjust the height and enable scrolling if necessary
    const maxHeight = "450px"; // Set the maximum height here
    const contentHeight = popupContent.scrollHeight;
    popupContent.style.height = contentHeight > parseInt(maxHeight, 10) ? maxHeight : "none";
    popupContent.style.overflowY = contentHeight > parseInt(maxHeight, 10) ? "scroll" : "visible";


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
        location.reload(); // Refresh the page
    }
}

function addToCalendar(flora) {
    // Retrieve the CSRF token from the cookie
    const csrftoken = getCookie('csrftoken');

    // Make an AJAX request to add the flora object to the calendar
    const xhr = new XMLHttpRequest();
    const url = "/add-to-calendar/";
    const params = "floraId=" + flora.id;
    xhr.open("POST", url, true);
    xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhr.setRequestHeader("X-CSRFToken", csrftoken); // Set the CSRF token

    xhr.onreadystatechange = function () {
        if (xhr.readyState === XMLHttpRequest.DONE) {
            if (xhr.status === 200) {
                console.log("Flora added to calendar");
                showSuccessMessage("Added to calendar"); // Display success message
                // Update the UI or perform any other necessary actions
            } else {
                console.error("Error: " + xhr.status);
            }
        }
    };

    xhr.send(params);
}

function removeFromCalendar(flora) {
    // Retrieve the CSRF token from the cookie
    const csrftoken = getCookie('csrftoken');

    // Make an AJAX request to add the flora object to the calendar
    const xhr = new XMLHttpRequest();
    const url = "/remove-from-calendar/";
    const params = "floraId=" + flora.id;
    xhr.open("POST", url, true);
    xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhr.setRequestHeader("X-CSRFToken", csrftoken); // Set the CSRF token

    xhr.onreadystatechange = function () {
        if (xhr.readyState === XMLHttpRequest.DONE) {
            if (xhr.status === 200) {
                console.log("Flora removed from calendar");
                showSuccessMessage("Removed from calendar"); // Display success message

                // Update the UI or perform any other necessary actions
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

// Dynamically add the success popup HTML code
const successPopupHTML = `
  <div id="successPopup" class="popup">
      <span id="successMessage"></span>
  </div>
`;
document.body.insertAdjacentHTML("beforeend", successPopupHTML);

