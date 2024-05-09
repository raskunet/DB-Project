document.addEventListener('DOMContentLoaded', function() {
    const categorySelect = document.getElementById('category-select');
    const searchInput = document.getElementById('search-input');
    const cards = document.querySelectorAll('.card');

    // Function to filter products based on category
    function filterProductsByCategory(categoryID) {
        cards.forEach(card => {
            if (categoryID === 'Select Categories' || card.getAttribute('data-category') === categoryID) {
                card.style.display = 'block';
            } else {
                card.style.display = 'none';
            }
        });
    }

    // Function to filter products based on search input
    function searchProducts(searchTerm) {
        const searchQuery = searchTerm.toLowerCase().trim();
        cards.forEach(card => {
            const productName = card.querySelector('.name').innerText.toLowerCase();
            if (productName.includes(searchQuery)) {
                card.style.display = 'block';
            } else {
                card.style.display = 'none';
            }
        });
    }

    // Function to sort products
  // Function to sort products
function sortProducts(sortOption) {
    switch (sortOption) {
        case 'low':
            Array.from(cards).sort((a, b) => {
                const priceA = parseFloat(a.querySelector('.price').innerText.replace('$', ''));
                const priceB = parseFloat(b.querySelector('.price').innerText.replace('$', ''));
                return priceA - priceB;
            }).forEach((card, index) => card.style.order = index);
            break;
        case 'high':
            Array.from(cards).sort((a, b) => {
                const priceA = parseFloat(a.querySelector('.price').innerText.replace('$', ''));
                const priceB = parseFloat(b.querySelector('.price').innerText.replace('$', ''));
                return priceB - priceA;
            }).forEach((card, index) => card.style.order = index);
            break;
        case 'bestreviews':
            // Implement sorting by best reviews (if applicable)
            break;
        case 'worstreviews':
            // Implement sorting by worst reviews (if applicable)
            break;
        default:
            break;
    }
}
    categorySelect.addEventListener('change', function() {
        filterProductsByCategory(categorySelect.value);
    });

    searchInput.addEventListener('input', function(event) {
        searchProducts(event.target.value);
    });

    // Add event listener to the sorting select element
    const sortingSelect = document.getElementById('Sorting');
    sortingSelect.addEventListener('change', function() {
        sortProducts(sortingSelect.value);
    });
    

    function fetchProductReviews(productId) {
        fetch(`/product/${productId}/reviews`)
            .then(response => response.json())
            .then(reviews => {
                const reviewsList = document.getElementById(`product-${productId}-reviews`);
                reviewsList.innerHTML = ''; // Clear previous reviews

                reviews.forEach(review => {
                    const listItem = document.createElement('li');
                    listItem.textContent = `${review.Text} - ${review.rating} stars`;

                    reviewsList.appendChild(listItem);
                });
            })
            .catch(error => {
                console.error('Error fetching product reviews:', error);
            });
    }
    // Fetch reviews for each product when the page loads
    cards.forEach(card => {
        const productId = card.dataset.productId;
        fetchProductReviews(productId);
    });
    const addToCartForms = document.querySelectorAll('.add-to-cart-form');
    addToCartForms.forEach(form => {
        form.addEventListener('submit', function(event) {
            event.preventDefault(); // Prevent default form submission
            const productId = form.querySelector('input[name="productId"]').value;
            addToCart(productId);
        });
    });

    // Function to add product to cart
    async function addToCart(productId) {
        try {
            const response = await fetch('/addToCart', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ productId })
            });

            if (response.ok) {
                console.log('Product added to cart successfully.');
                // Optionally, you can update the UI to reflect the item being added to the cart
            } else {
                console.error('Failed to add product to cart.');
            }
        } catch (error) {
            console.error('Error adding product to cart:', error);
        }
    }
    
});
