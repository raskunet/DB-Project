// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Get references to the category select element and all product cards
    const categorySelect = document.getElementById('category-select');
    const cards = document.querySelectorAll('.card');

    // Add event listener to the category select element
    categorySelect.addEventListener('change', function() {
        // Get the selected category ID
        const selectedCategoryID = categorySelect.value;

        // If the selected category is not "Select Categories"
        if (selectedCategoryID !== 'Select Categories') {
            // Hide all cards
            cards.forEach(card => {
                card.style.display = 'none';
            });

            // Show only cards with the selected category
            const selectedCategoryCards = document.querySelectorAll(`.card[data-category="${selectedCategoryID}"]`);
            selectedCategoryCards.forEach(card => {
                card.style.display = 'block';
            });
        } else {
            // If "Select Categories" is selected, show all cards
            cards.forEach(card => {
                card.style.display = 'block';
            });
        }
    });
});
// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Get references to the search input and all product cards
    const searchInput = document.getElementById('search-input');
    const cards = document.querySelectorAll('.card');

    // Function to filter products based on search input
    function searchProducts(searchTerm) {
        // Convert the search term to lowercase for case-insensitive search
        const searchQuery = searchTerm.toLowerCase();

        // Loop through all product cards and hide/show based on the search term
        cards.forEach(card => {
            const productName = card.querySelector('.name').innerText.toLowerCase();
            if (productName.includes(searchQuery)) {
                card.style.display = 'block';
            } else {
                card.style.display = 'none';
            }
        });
    }

    // Add event listener to the search input
    searchInput.addEventListener('input', function(event) {
        const searchTerm = event.target.value.trim(); // Trim whitespace from the search term
        searchProducts(searchTerm);
    });
});

