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
