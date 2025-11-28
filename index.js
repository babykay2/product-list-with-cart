
// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', () => {
    const cartIcon = document.querySelector('#cart-icon');
    const cart = document.querySelector('.cart');
    const closeCart = document.querySelector('#close-cart');
    const cartContent = document.querySelector('.cart-content');
    const totalPrice = document.querySelector('.total-price');
    const buyButton = document.querySelector('.btn-buy');

    // Open/Close Cart
    cartIcon.addEventListener('click', () => {
        cart.classList.toggle('active');
    });

    closeCart.addEventListener('click', () => {
        cart.classList.remove('active');
    });

    // Add to Cart Functionality
    function addToCart(title, price, image) {
        // Check if item is already in cart
        const cartBoxes = cartContent.querySelectorAll('.cart-box');
        for (let box of cartBoxes) {
            if (box.querySelector('.cart-product-title').innerText === title) {
                alert('Item is already in the cart');
                return;
            }
        }

        // Create cart box HTML
        const cartBox = document.createElement('div');
        cartBox.classList.add('cart-box');
        cartBox.innerHTML = `
            <img src="${image}" alt="" class="cart-img" />
            <div class="detail-box">
                <div class="cart-product-title">${title}</div> 
                <div class="cart-price">$${price}</div>
                <input 
                    type="number"
                    name=""
                    id=""
                    value="1"
                    class="cart-quantity"
                    min="1"
                />
            </div>
            <i class="bx bx-trash-alt cart-remove"></i>
        `;

        // Add event listener for quantity change
        const quantityInput = cartBox.querySelector('.cart-quantity');
        quantityInput.addEventListener('change', updateTotal);

        // Add event listener for remove button
        const removeButton = cartBox.querySelector('.cart-remove');
        removeButton.addEventListener('click', removeCartItem);

        // Append to cart
        cartContent.appendChild(cartBox);
        
        // Update total and cart icon
        updateTotal();
        updateCartIcon();
    }

    // Remove Cart Item
    function removeCartItem(event) {
        const cartBox = event.target.closest('.cart-box');
        cartBox.remove();
        updateTotal();
        updateCartIcon();
    }

    // Update Total Price
    function updateTotal() {
        let total = 0;
        const cartBoxes = cartContent.querySelectorAll('.cart-box');
        
        cartBoxes.forEach(cartBox => {
            const priceElement = cartBox.querySelector('.cart-price');
            const quantityElement = cartBox.querySelector('.cart-quantity');
            
            const price = parseFloat(priceElement.innerText.replace('$', ''));
            const quantity = parseInt(quantityElement.value);
            
            total += price * quantity;
        });

        totalPrice.innerText = `$${total.toFixed(2)}`;
        updateCartIcon();
    }

    // Update Cart Icon Quantity
    function updateCartIcon() {
        const cartBoxes = cartContent.querySelectorAll('.cart-box');
        cartIcon.setAttribute('data-quantity', cartBoxes.length);
    }

    // Add to Cart Button Event Listeners
    const addToCartButtons = document.querySelectorAll('.btn');
    addToCartButtons.forEach(button => {
        button.addEventListener('click', (event) => {
            const place = event.target.closest('.place');
            const title = place.querySelector('b').innerText;
            const price = place.querySelector('p').innerText.match(/\$[\d.]+/)[0].replace('$', '');
            const image = place.querySelector('img.place').src;
            
            addToCart(title, price, image);
        });
    });

    // Buy Button (optional - you can add specific functionality)
    buyButton.addEventListener('click', () => {
        if (parseFloat(totalPrice.innerText.replace('$', '')) > 0) {
            alert('Thank you for your purchase!');
            // Clear the cart
            cartContent.innerHTML = '';
            updateTotal();
        } else {
            alert('Your cart is empty!');
        }
    });
});