document.addEventListener('DOMContentLoaded', function () {
    const form = document.querySelector('form');
    const ingredientInput = document.getElementById('ingredients');
    const submitButton = form.querySelector('button[type="submit"]');

    // Handle form submission
    form.addEventListener('submit', function (event) {
        event.preventDefault(); // Prevent the default form submission

        // Display a loading spinner
        const loadingMessage = document.createElement('div');
        loadingMessage.className = 'flex justify-center items-center my-4';
        loadingMessage.innerHTML = `
            <svg class="animate-spin h-8 w-8 text-green-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"></path>
            </svg>
            <p class="text-green-300 ml-2">Loading recipes...</p>
        `;
        document.body.appendChild(loadingMessage);

        const ingredients = ingredientInput.value;
        submitButton.disabled = true; // Disable the submit button

        // Fetch recipes using fetch API
        fetch(`/?ingredients=${encodeURIComponent(ingredients)}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: new URLSearchParams({ ingredients })
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.text(); // Get the response as text
            })
            .then(html => {
                document.open(); // Open the document
                document.write(html); // Write the new HTML content
                document.close(); // Close the document
            })
            .catch(error => {
                console.error('Error fetching recipes:', error);
                alert('An error occurred while fetching recipes. Please try again.');
            })
            .finally(() => {
                loadingMessage.remove(); // Remove loading message
                submitButton.disabled = false; // Re-enable the submit button
            });
    });
});