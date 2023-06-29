// Listen for changes in checkboxes
const checkboxes = document.querySelectorAll('input[type="checkbox"]');
checkboxes.forEach(checkbox => {
    checkbox.addEventListener('change', () => {
        // Get all the selected checkbox values
        const selectedValues = Array.from(checkboxes)
            .filter(checkbox => checkbox.checked)
            .map(checkbox => checkbox.value);

        // Send an asynchronous request to update the database
        const formData = new FormData();
        selectedValues.forEach(value => {
            formData.append('selected_plants', value);
        });
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
    });
});
