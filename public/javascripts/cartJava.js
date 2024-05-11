document.addEventListener('DOMContentLoaded', function() {
    const increaseButtons = document.querySelectorAll('.increase-btn');
    const decreaseButtons = document.querySelectorAll('.decrease-btn');
    const removeButtons = document.querySelectorAll('.remove-item-btn');
    const quantityValues = document.querySelectorAll('.quantity-value');
    const deliveryForm = document.getElementById('delivery-form');
    const totalPriceElement = document.querySelector('.total');
    const priceElements = document.querySelectorAll('.price');
    const productsData = document.getElementsByTagName('#prod');

    // Event listener for increasing quantity
    // increaseButtons.forEach(function(button, index) {
    //     button.addEventListener('click', function() {
    //         // Calculate the price per unit
    //         const pricePerUnit = parseFloat(priceElements[index].textContent) / parseInt(quantityValues[index].textContent);
            
    //         // Increment the quantity
    //         //productsData[index].Quantity.value++;
    //         //productsData.forEach(function(button, index){
    //         quantityValues[index].textContent++;
    //         quantityValues[index].value++;
    //         //});

    //         // Calculate the new total price for the item
    //         const newTotalPriceForItem = parseFloat(priceElements[index].textContent) + pricePerUnit;

    //         // Update the price element for the item
    //         priceElements[index].textContent = newTotalPriceForItem.toFixed(2);

    //         // Update the total price
    //         const totalPrice = parseFloat(totalPriceElement.textContent) + pricePerUnit;
    //         totalPriceElement.textContent = totalPrice.toFixed(2);
    //     });
    // });

    increaseButtons.forEach(function(button, index) {
        button.addEventListener('click', function() {
            // Calculate the price per unit
            const pricePerUnit = parseFloat(priceElements[index].textContent) / parseInt(quantityValues[index].textContent);
            
            // Increment the quantity
            const productId = 1;
            const updatedQuantity = parseInt(quantityValues[index].textContent) + 1; // Increment the quantity by 1
            const data = { productId: productId, quantity: updatedQuantity };
            
            // Send an AJAX request to update the quantity in the database
            const xhr = new XMLHttpRequest();
            xhr.open('POST', '/updateQuantity', true);
            xhr.setRequestHeader('Content-Type', 'application/json');
            xhr.onload = function() {
                if (xhr.status === 200) {
                    // Request was successful, update the quantity in the UI
                    quantityValues[index].textContent = updatedQuantity;
                    quantityValues[index].value = updatedQuantity;
    
                    // Calculate the new total price for the item
                    const newTotalPriceForItem = parseFloat(priceElements[index].textContent) + pricePerUnit;
    
                    // Update the price element for the item
                    priceElements[index].textContent = newTotalPriceForItem.toFixed(2);
    
                    // Update the total price
                    const totalPrice = parseFloat(totalPriceElement.textContent) + pricePerUnit;
                    totalPriceElement.textContent = totalPrice.toFixed(2);
                } else {
                    // Handle error if any
                    console.error('Request failed:', xhr.statusText);
                }
            };
            xhr.onerror = function() {
                console.error('Request failed.');
            };
            xhr.send(JSON.stringify(data));
        });
    });
    


        // Event listener for decreasing quantity
    decreaseButtons.forEach(function(button, index) {
        button.addEventListener('click', function() {
            if (quantityValues[index].textContent > 1) {
                // Calculate the price per unit
                const pricePerUnit = parseFloat(priceElements[index].textContent) / parseInt(quantityValues[index].textContent);

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


    // Event listener for removing item
    removeButtons.forEach(function(button, index) {
        button.addEventListener('click', function() {
            button.closest('.cart-item').remove();
            const priceT = parseFloat(priceElements[index].textContent);

            // Update the total price
            const totalPrice = parseFloat(totalPriceElement.textContent) - priceT.toFixed(2);
            totalPriceElement.textContent = totalPrice.toFixed(2);
        });
    });

    // Form validation for delivery details
    deliveryForm.addEventListener('submit', function(event) {
        // Prevent the default form submission behavior
        //event.preventDefault();
    
        const fullname = document.getElementById('fullname').value.trim();
        const address = document.getElementById('address').value.trim();
        const city = document.getElementById('city').value.trim();
    
        if (fullname === '' || address === '' || city === '') {
            alert('Please fill in all fields for delivery details.');
        } else {
            // Serialize the products array to JSON and set it as the value of the hidden input field
            //var productsInput = document.getElementById("productsInput");
            //productsInput.value = JSON.stringify(products);
            //const hiddenInput = document.querySelector('#products-input');
            //hiddenInput.value = JSON.stringify(products);
    
            // Now submit the form
            //deliveryForm.submit();
            
            alert('Order placed successfully!');
            // Optionally, you can redirect the user after form submission
            // window.location.href = '/home';
        }
    });
    
    
});
