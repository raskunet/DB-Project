document.addEventListener('DOMContentLoaded', function() {
    const increaseButtons = document.querySelectorAll('.increase-btn');
    const decreaseButtons = document.querySelectorAll('.decrease-btn');
    const removeButtons = document.querySelectorAll('.remove-item-btn');
    const quantityValues = document.querySelectorAll('.quantity-value');
    const deliveryForm = document.getElementById('delivery-form');
    const totalPriceElement = document.querySelector('.total');
    const priceElements = document.querySelectorAll('.price');


    // Event listener for increasing quantity
    increaseButtons.forEach(function(button, index) {
        button.addEventListener('click', function() {
            // Calculate the price per unit
            const pricePerUnit = parseFloat(priceElements[index].textContent) / parseInt(quantityValues[index].textContent);
            var productsInput = document.getElementById("products-input");
                var products = [];
                products = JSON.parse(productsInput.value);
                products[index].Quantity --;
                var updatedProductsJson = JSON.stringify(products);
                productsInput.value = updatedProductsJson;
            quantityValues[index].textContent++;
            quantityValues[index].value++;
            //});
            // Calculate the new total price for the item
            const newTotalPriceForItem = parseFloat(priceElements[index].textContent) + pricePerUnit;

            // Update the price element for the item
            priceElements[index].textContent = newTotalPriceForItem.toFixed(2);

            // Update the total price
            const totalPrice = parseFloat(totalPriceElement.textContent) + pricePerUnit;
            totalPriceElement.textContent = totalPrice.toFixed(2);
        });
    });
    decreaseButtons.forEach(function(button, index) {
        button.addEventListener('click', function() {
            if (quantityValues[index].textContent > 1) {
                // Calculate the price per unit
                const pricePerUnit = parseFloat(priceElements[index].textContent) / parseInt(quantityValues[index].textContent);
                var productsInput = document.getElementById("products-input");
                var products = [];
                products = JSON.parse(productsInput.value);
                products[index].Quantity --;
                var updatedProductsJson = JSON.stringify(products);
                productsInput.value = updatedProductsJson;
                // Decrement the quantity
                quantityValues[index].textContent--;
                quantityValues[index].value--;
                // Calculate the new total price for the item
                const newTotalPriceForItem = parseFloat(priceElements[index].textContent) - pricePerUnit;

                // Update the price element for the item
                priceElements[index].textContent = newTotalPriceForItem.toFixed(2);

                // Update the total price
                const totalPrice = parseFloat(totalPriceElement.textContent) - pricePerUnit;
                totalPriceElement.textContent = totalPrice.toFixed(2);
            }
        });
    });

    // // Event listener for removing item
    removeButtons.forEach(function(button, index) {
        button.addEventListener('click', function() {
            button.closest('.cart-item').remove();
            const priceT = parseFloat(priceElements[index].textContent);
            var productsInput = document.getElementById("products-input");
                var products = [];
                products = JSON.parse(productsInput.value);
                products[index].Quantity=0;
                var updatedProductsJson = JSON.stringify(products);
                productsInput.value = updatedProductsJson;
            // Update the total price
            const totalPrice = parseFloat(totalPriceElement.textContent) - priceT.toFixed(2);
            totalPriceElement.textContent = totalPrice.toFixed(2);
        });
    });
});
