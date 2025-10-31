// Cart Module

let cart = JSON.parse(localStorage.getItem('gamersedge-cart')) || [];

export function initializeCart(products) {
    updateCartCount();

    // Add to cart buttons
    document.querySelectorAll('.add-to-cart').forEach(button => {
        button.addEventListener('click', (e) => {
            e.preventDefault();
            const productId = button.getAttribute('data-product');
            addToCart(productId, products);
        });
    });

    // Clear cart button
    const clearCartBtn = document.getElementById('clear-cart');
    if (clearCartBtn) {
        clearCartBtn.addEventListener('click', () => {
            if (confirm('Are you sure you want to clear your cart?')) {
                clearCart();
            }
        });
    }
}

export function addToCart(productId, products) {
    const product = products[productId];
    if (!product) return;

    const existingItem = cart.find(item => item.id === productId);

    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({
            id: productId,
            name: product.name,
            price: product.price,
            image: product.images[0], // Use the first image as the thumbnail
            quantity: 1
        });
    }

    localStorage.setItem('gamersedge-cart', JSON.stringify(cart));
    updateCartCount();
    showCartNotification(product.name);
}

function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId);
    localStorage.setItem('gamersedge-cart', JSON.stringify(cart));
    updateCartCount();
    renderCartItems();
}

function updateCartQuantity(productId, quantity) {
    const item = cart.find(item => item.id === productId);
    if (item) {
        item.quantity = Math.max(1, quantity);
        localStorage.setItem('gamersedge-cart', JSON.stringify(cart));
        updateCartCount();
        renderCartItems();
    }
}

function clearCart() {
    cart = [];
    localStorage.setItem('gamersedge-cart', JSON.stringify(cart));
    updateCartCount();
    renderCartItems();
}

function updateCartCount() {
    const cartCount = document.getElementById('cart-count');
    if (cartCount) {
        const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
        cartCount.textContent = totalItems;
    }
}

function showCartNotification(productName) {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = 'cart-notification';
    notification.innerHTML = `
        <i class="fas fa-check-circle"></i>
        <span>${productName} added to cart!</span>
    `;

    // Add styles
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: var(--gradient-primary);
        color: var(--secondary-color);
        padding: 1rem 1.5rem;
        border-radius: var(--border-radius);
        box-shadow: var(--shadow-glow);
        z-index: 10000;
        transform: translateX(100%);
        transition: transform 0.3s ease;
        display: flex;
        align-items: center;
        gap: 0.5rem;
        font-weight: bold;
    `;

    document.body.appendChild(notification);

    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);

    // Animate out and remove
    setTimeout(() => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 3000);
}

export function renderCartItems() {
    const cartItemsContainer = document.getElementById('cart-items');
    const emptyCart = document.getElementById('empty-cart');

    if (!cartItemsContainer) return;

    if (cart.length === 0) {
        cartItemsContainer.innerHTML = '';
        cartItemsContainer.style.display = 'none';
        if (emptyCart) emptyCart.style.display = 'block';
        updateCartSummary();
        return;
    }

    cartItemsContainer.style.display = 'block';
    if (emptyCart) emptyCart.style.display = 'none';

    cartItemsContainer.innerHTML = cart.map(item => `
        <div class="cart-item" data-product-id="${item.id}">
            <div class="cart-item-image">
                <img src="${item.image}" alt="${item.name}">
            </div>
            <div class="cart-item-details">
                <h3>${item.name}</h3>
                <p class="cart-item-price">LKR ${item.price.toLocaleString()}</p>
            </div>
            <div class="cart-item-controls">
                <div class="quantity-controls">
                    <button class="quantity-btn decrease-quantity">-</button>
                    <input type="number" class="quantity-input" value="${item.quantity}" min="1">
                    <button class="quantity-btn increase-quantity">+</button>
                </div>
                <button class="remove-btn">
                    <i class="fas fa-trash"></i>
                </button>
            </div>
        </div>
    `).join('');

    // Add event listeners
    cartItemsContainer.querySelectorAll('.cart-item').forEach(cartItemElement => {
        const productId = cartItemElement.dataset.productId;
        const item = cart.find(i => i.id === productId);

        if (!item) return;

        cartItemElement.querySelector('.decrease-quantity').addEventListener('click', () => {
            updateCartQuantity(productId, item.quantity - 1);
        });

        cartItemElement.querySelector('.increase-quantity').addEventListener('click', () => {
            updateCartQuantity(productId, item.quantity + 1);
        });

        cartItemElement.querySelector('.quantity-input').addEventListener('change', (e) => {
            updateCartQuantity(productId, parseInt(e.target.value));
        });

        cartItemElement.querySelector('.remove-btn').addEventListener('click', () => {
            removeFromCart(productId);
        });
    });

    updateCartSummary();
}

function updateCartSummary() {
    const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const shipping = subtotal > 0 ? 25 : 0;
    const tax = subtotal * 0.08;
    const total = subtotal + shipping + tax;

    // Update summary elements
    const elements = {
        'cart-subtotal': `LKR ${subtotal.toLocaleString()}`,
        'cart-shipping': `LKR ${shipping.toLocaleString()}`,
        'cart-tax': `LKR ${tax.toLocaleString()}`,
        'cart-total': `LKR ${total.toLocaleString()}`,
        'checkout-subtotal': `LKR ${subtotal.toLocaleString()}`,
        'checkout-shipping': `LKR ${shipping.toLocaleString()}`,
        'checkout-tax': `LKR ${tax.toLocaleString()}`,
        'checkout-total': `LKR ${total.toLocaleString()}`
    };

    Object.entries(elements).forEach(([id, value]) => {
        const element = document.getElementById(id);
        if (element) element.textContent = value;
    });
}

