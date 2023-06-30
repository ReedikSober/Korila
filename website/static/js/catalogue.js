// Function to update the database asynchronously
function updateDatabase(selectedValues) {
    const formData = new FormData();
    if (selectedValues.length > 0) {
        selectedValues.forEach(value => {
            formData.append('selected_plants', value);
        });
    } else {
        formData.append('selected_plants', '0'); // Placeholder value
    }
    const csrfToken = document.querySelector('#csrf-token').value;
    formData.append('csrfmiddlewaretoken', csrfToken);
    fetch('/catalogue/', {
        method: 'POST',
        body: formData,
        headers: {
            'X-Requested-With': 'XMLHttpRequest',
        },
    })
        .then(response => response.json())
        .then(data => {
            console.log(data);
        })
        .catch(error => {
            console.error('Error:', error);
        });
}

// Listen for changes in checkboxes
const checkboxes = document.querySelectorAll('input[type="checkbox"]');
checkboxes.forEach(checkbox => {
    checkbox.addEventListener('change', () => {
        // Get all the selected checkbox values
        const selectedValues = Array.from(checkboxes)
            .filter(checkbox => checkbox.checked)
            .map(checkbox => checkbox.value);

        // Call the updateDatabase function
        updateDatabase(selectedValues);
    });
});

const addAllButtons = document.querySelectorAll('.add-all-btn');
addAllButtons.forEach(button => {
    button.addEventListener('click', () => {
        const category = button.dataset.category;
        const checkboxesInCategory = document.querySelectorAll(`input[type="checkbox"][data-category="${category}"]`);

        const allSelected = Array.from(checkboxesInCategory).every(checkbox => checkbox.checked);

        checkboxesInCategory.forEach(checkbox => {
            checkbox.checked = !allSelected;
            checkbox.dispatchEvent(new Event('change')); // Trigger the change event
        });

        const selectedValues = Array.from(document.querySelectorAll('input[type="checkbox"]:checked'))
            .map(checkbox => checkbox.value);

        // Call the updateDatabase function
        updateDatabase(selectedValues);
    });
});



