import store from './core/store.js';

document.addEventListener('DOMContentLoaded', () => {
    // Initial UI rendering
    renderProductGrid();
    updateCartUI();

    // Setup event listeners
    setupEventListeners();
});

function setupEventListeners() {
    // Holographic card effect
    const productGrid = document.getElementById('product-grid');
    if(productGrid) {
        productGrid.addEventListener('mousemove', handleHolographicEffect);
        productGrid.addEventListener('click', handleGridClick);
    }
    
    // Neural Search
    const searchButton = document.getElementById('search-button');
    const searchOverlay = document.getElementById('search-overlay');
    const searchInput = document.getElementById('search-input');
    
    searchButton.addEventListener('click', toggleSearch);
    searchOverlay.addEventListener('click', (e) => {
        if (e.target === searchOverlay) toggleSearch(); // Close if clicking on background
    });
    document.addEventListener('keydown', (e) => {
        if (e.ctrlKey && e.key === 'k') {
            e.preventDefault();
            toggleSearch();
        }
        if (e.key === 'Escape' && !searchOverlay.classList.contains('hidden')) {
            toggleSearch();
        }
    });
    searchInput.addEventListener('input', handleSearch);


    // Cart Drawer
    const cartButton = document.getElementById('cart-button');
    const closeCartButton = document.getElementById('close-cart-button');
    const cartDrawer = document.getElementById('cart-drawer');
    const cartItemsContainer = document.getElementById('cart-items');

    cartButton.addEventListener('click', toggleCart);
    closeCartButton.addEventListener('click', toggleCart);
    cartItemsContainer.addEventListener('change', handleCartQuantityChange);
    cartItemsContainer.addEventListener('click', handleCartRemove);
}

// --- RENDERING FUNCTIONS ---

function renderProductGrid() {
    const productGrid = document.getElementById('product-grid');
    if (!productGrid) return;
    
    const products = store.getProducts();
    productGrid.innerHTML = products.map(product => `
        <div class="holographic-card glass-effect rounded-lg p-4 flex flex-col justify-between transform transition-transform duration-300" data-product-id="${product.id}">
            <div>
                <img src="${product.imageUrl}" alt="${product.name}" class="rounded-md mb-4 w-full h-48 object-cover">
                <h3 class="text-lg font-bold text-white">${product.name}</h3>
                <p class="text-sm text-gray-400">${product.category} - ${product.brand}</p>
            </div>
            <div class="mt-4 flex justify-between items-center">
                <p class="text-xl font-semibold text-electric-cyan">Rs. ${product.price.toLocaleString()}</p>
                <button ${!product.inStock ? 'disabled' : ''} class="add-to-cart-btn bg-hyper-violet hover:bg-hyper-violet/80 text-white font-bold py-2 px-4 rounded transition-colors disabled:bg-gray-600 disabled:cursor-not-allowed">
                    ${product.inStock ? 'Add to Cart' : 'Out of Stock'}
                </button>
            </div>
        </div>
    `).join('');
}


function updateCartUI() {
    const cart = store.getCart();
    const products = store.getProducts();
    const cartItemsContainer = document.getElementById('cart-items');
    const cartTotalEl = document.getElementById('cart-total');
    const cartItemCountEl = document.getElementById('cart-item-count');

    if (!cartItemsContainer || !cartTotalEl || !cartItemCountEl) return;
    
    cartItemCountEl.textContent = cart.reduce((sum, item) => sum + item.quantity, 0);

    if (cart.length === 0) {
        cartItemsContainer.innerHTML = '<p class="text-gray-400">Your cart is empty.</p>';
    } else {
        cartItemsContainer.innerHTML = cart.map(item => {
            const product = products.find(p => p.id === item.productId);
            if (!product) return '';
            return `
                <div class="flex items-center justify-between mb-4" data-product-id="${product.id}">
                    <div class="flex items-center">
                        <img src="${product.imageUrl}" alt="${product.name}" class="w-16 h-16 object-cover rounded-md mr-4">
                        <div>
                            <h4 class="text-white font-semibold">${product.name}</h4>
                            <p class="text-gray-400">Rs. ${product.price.toLocaleString()}</p>
                        </div>
                    </div>
                    <div class="flex items-center">
                        <input type="number" min="1" value="${item.quantity}" class="quantity-input w-16 text-center bg-dark-gray border border-gray-600 rounded-md p-1 mr-2">
                        <button class="remove-from-cart-btn text-red-500 hover:text-red-400">&times;</button>
                    </div>
                </div>
            `;
        }).join('');
    }

    cartTotalEl.textContent = `Rs. ${store.getCartTotal().toLocaleString()}`;
}


// --- EVENT HANDLERS ---

function handleHolographicEffect(e) {
    const card = e.target.closest('.holographic-card');
    if (!card) return;

    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const rotateY = (x / rect.width - 0.5) * -25; // Max rotation 12.5deg
    const rotateX = (y / rect.height - 0.5) * 25;  // Max rotation 12.5deg

    card.style.setProperty('--rotateY', `${rotateY}deg`);
    card.style.setProperty('--rotateX', `${rotateX}deg`);
}

function handleGridClick(e) {
    if (e.target.classList.contains('add-to-cart-btn')) {
        const productId = e.target.closest('[data-product-id]').dataset.productId;
        store.addToCart(productId, 1);
        updateCartUI();
        // Optional: show a notification
    }
}

function handleCartQuantityChange(e) {
    if (e.target.classList.contains('quantity-input')) {
        const productId = e.target.closest('[data-product-id]').dataset.productId;
        const quantity = parseInt(e.target.value, 10);
        store.updateCartItemQuantity(productId, quantity);
        updateCartUI();
    }
}

function handleCartRemove(e) {
    if (e.target.classList.contains('remove-from-cart-btn')) {
        const productId = e.target.closest('[data-product-id]').dataset.productId;
        store.removeFromCart(productId);
        updateCartUI();
    }
}


// --- UI TOGGLES & SEARCH ---

function toggleSearch() {
    const searchOverlay = document.getElementById('search-overlay');
    const searchInput = document.getElementById('search-input');
    const isHidden = searchOverlay.classList.toggle('hidden');
    
    if (!isHidden) {
        searchInput.focus();
    }
}

function toggleCart() {
    const cartDrawer = document.getElementById('cart-drawer');
    cartDrawer.classList.toggle('translate-x-full');
}


function handleSearch(e) {
    const query = e.target.value.toLowerCase();
    const resultsContainer = document.getElementById('search-results');
    
    if (query.length < 2) {
        resultsContainer.innerHTML = '<p class="text-center text-gray-500">Start typing to see magic...</p>';
        return;
    }

    const products = store.getProducts();
    const filteredProducts = products.filter(p => 
        p.name.toLowerCase().includes(query) ||
        p.brand.toLowerCase().includes(query) ||
        p.category.toLowerCase().includes(query)
    );

    if (filteredProducts.length === 0) {
        resultsContainer.innerHTML = '<p class="text-center text-gray-500">No components found matching your query.</p>';
    } else {
        resultsContainer.innerHTML = `
            <div class="glass-effect rounded-lg p-4 max-h-96 overflow-y-auto">
                ${filteredProducts.map(product => `
                    <div class="flex items-center justify-between p-3 hover:bg-gray-700/50 rounded-lg">
                        <div class="flex items-center">
                            <img src="${product.imageUrl}" alt="${product.name}" class="w-12 h-12 object-cover rounded-md mr-4">
                            <div>
                                <h4 class="text-white font-semibold">${product.name}</h4>
                                <p class="text-gray-400 text-sm">Rs. ${product.price.toLocaleString()}</p>
                            </div>
                        </div>
                         <button data-product-id="${product.id}" class="add-to-cart-btn-search text-sm bg-hyper-violet hover:bg-hyper-violet/80 text-white font-bold py-1 px-3 rounded transition-colors">Add</button>
                    </div>
                `).join('')}
            </div>
        `;
    }
}

// Add to cart from search results
document.getElementById('search-results').addEventListener('click', (e) => {
    if (e.target.classList.contains('add-to-cart-btn-search')) {
        const productId = e.target.dataset.productId;
        store.addToCart(productId, 1);
        updateCartUI();
        // Maybe give some feedback
        e.target.textContent = 'Added!';
        setTimeout(() => { e.target.textContent = 'Add'; }, 1000);
    }
});
