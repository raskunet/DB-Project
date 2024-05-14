document.addEventListener('DOMContentLoaded', function() {
    const cards = document.querySelectorAll('.card');

    // Function to hide all cards
    function hideAllCards() {
        cards.forEach(card => {
            card.style.display = 'none';
        });
    }

    // Function to show all cards
    function showAllCards() {
        cards.forEach(card => {
            card.style.display = 'block';
        });
    }

    // Initially, show all cards
    showAllCards();
});
