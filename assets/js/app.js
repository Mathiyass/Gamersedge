import store from './core/store.js';

/**
 * assets/js/app.js
 * The Controller - UI Logic
 */

// --- Utility ---
const formatCurrency = (amount) => {
    return 'Rs. ' + amount.toLocaleString('en-LK');
};

// --- Components ---

const renderProductCard = (product) => {
    return `
        <div class="holo-card glass-effect p-4 rounded-xl flex flex-col group" data-id="${product.id}">
            <div class="relative h-48 w-full overflow-hidden rounded-lg mb-4 bg-white/5 flex items-center justify-center">
                <img src="${product.image}" alt="${product.name}" class="object-contain h-full w-full transition-transform duration-500 group-hover:scale-110">
                <div class="absolute top-2 right-2 bg-black/80 text-white text-xs font-bold px-2 py-1 rounded border border-electric-cyan">
                    ${product.brand}
                </div>
                ${product.stock < 5 ? `<div class="absolute bottom-2 left-2 bg-red-600/90 text-white text-xs font-bold px-2 py-1 rounded animate-pulse">Low Stock</div>` : ''}
            </div>
            <h3 class="text-lg font-bold text-white mb-1 leading-tight group-hover:text-electric-cyan transition-colors">${product.name}</h3>
            <p class="text-sm text-gray-400 mb-3">${product.category}</p>
            <div class="mt-auto flex justify-between items-center">
                <span class="text-xl font-bold text-white">${formatCurrency(product.price)}</span>
                <button class="add-to-cart-btn bg-white/10 hover:bg-electric-cyan text-white hover:text-black p-2 rounded-full transition-all transform active:scale-95" data-id="${product.id}" aria-label="Add to Cart">
                    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path></svg>
                </button>
            </div>
        </div>
    `;
};

const renderCartItem = (item) => {
    return `
        <div class="flex items-center gap-4 mb-4 p-3 glass-effect rounded-lg border border-gray-700/50">
            <img src="${item.image}" alt="${item.name}" class="w-16 h-16 object-cover rounded bg-white/5">
            <div class="flex-1">
                <h4 class="text-sm font-bold text-white line-clamp-1">${item.name}</h4>
                <p class="text-sm text-electric-cyan">${formatCurrency(item.price)}</p>
                <div class="flex items-center gap-2 mt-2">
                    <button class="decrease-qty text-gray-400 hover:text-white bg-gray-800 w-6 h-6 rounded flex items-center justify-center" data-id="${item.productId}">-</button>
                    <span class="text-sm text-white">${item.quantity}</span>
                    <button class="increase-qty text-gray-400 hover:text-white bg-gray-800 w-6 h-6 rounded flex items-center justify-center" data-id="${item.productId}">+</button>
                </div>
            </div>
            <button class="remove-item text-gray-500 hover:text-red-500 transition-colors" data-id="${item.productId}">
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg>
            </button>
        </div>
    `;
};

// --- UI Updates ---

const updateProductGrid = (products) => {
    const grid = document.getElementById('product-grid');
    if (grid) {
        grid.innerHTML = products.map(renderProductCard).join('');
        attachProductListeners();
        initHoloCards();
    }
};

const updateCartUI = (cart) => {
    const cartCount = document.getElementById('cart-item-count');
    const cartItemsContainer = document.getElementById('cart-items');
    const cartTotal = document.getElementById('cart-total');

    if (cartCount) {
        const totalItems = cart.reduce((acc, item) => acc + item.quantity, 0);
        cartCount.textContent = totalItems;
        cartCount.classList.toggle('hidden', totalItems === 0);
    }

    if (cartItemsContainer) {
        cartItemsContainer.innerHTML = cart.length > 0
            ? cart.map(renderCartItem).join('')
            : '<div class="text-center text-gray-500 mt-10">Your cart is empty. <br>Time to gear up!</div>';

        // Attach cart item listeners
        document.querySelectorAll('.increase-qty').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const id = e.target.closest('button').dataset.id;
                const item = cart.find(i => i.productId === id);
                store.updateCartQuantity(id, item.quantity + 1);
            });
        });

        document.querySelectorAll('.decrease-qty').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const id = e.target.closest('button').dataset.id;
                const item = cart.find(i => i.productId === id);
                store.updateCartQuantity(id, item.quantity - 1);
            });
        });

        document.querySelectorAll('.remove-item').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const id = e.target.closest('button').dataset.id;
                store.removeFromCart(id);
            });
        });
    }

    if (cartTotal) {
        cartTotal.textContent = formatCurrency(store.getCartTotal());
    }
};

// --- Interaction Logic ---

const attachProductListeners = () => {
    document.querySelectorAll('.add-to-cart-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            // Animation effect
            const id = e.currentTarget.dataset.id;
            store.addToCart(id);

            // Visual feedback
            const originalContent = e.currentTarget.innerHTML;
            e.currentTarget.innerHTML = `<svg class="w-5 h-5 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path></svg>`;
            setTimeout(() => {
                e.currentTarget.innerHTML = originalContent;
            }, 1000);
        });
    });
};

const initHoloCards = () => {
    document.querySelectorAll('.holo-card').forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            const rotateX = ((y - centerY) / centerY) * -10; // Tilt X
            const rotateY = ((x - centerX) / centerX) * 10;  // Tilt Y

            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
        });

        card.addEventListener('mouseleave', () => {
            card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale3d(1, 1, 1)';
        });
    });
};

// --- Neural Search ---
const initSearch = () => {
    const searchOverlay = document.getElementById('search-overlay');
    const searchInput = document.getElementById('search-input');
    const searchResults = document.getElementById('search-results');
    const searchButton = document.getElementById('search-button');

    const toggleSearch = () => {
        if (searchOverlay) {
            searchOverlay.classList.toggle('hidden');
            if (!searchOverlay.classList.contains('hidden')) {
                searchInput.focus();
            }
        }
    };

    if (searchButton) searchButton.addEventListener('click', toggleSearch);

    // Ctrl+K Shortcut
    document.addEventListener('keydown', (e) => {
        if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
            e.preventDefault();
            toggleSearch();
        }
        if (e.key === 'Escape' && searchOverlay && !searchOverlay.classList.contains('hidden')) {
            toggleSearch();
        }
    });

    // Close when clicking outside
    if (searchOverlay) {
        searchOverlay.addEventListener('click', (e) => {
            if (e.target === searchOverlay) toggleSearch();
        });
    }

    if (searchInput) {
        searchInput.addEventListener('input', (e) => {
            const query = e.target.value.toLowerCase();
            if (query.length < 2) {
                searchResults.innerHTML = '';
                return;
            }

            const matches = store.state.products.filter(p =>
                p.name.toLowerCase().includes(query) ||
                p.category.toLowerCase().includes(query) ||
                p.brand.toLowerCase().includes(query)
            );

            searchResults.innerHTML = matches.length > 0
                ? `<div class="bg-dark-gray border border-gray-700 rounded-lg overflow-hidden max-h-96 overflow-y-auto">
                    ${matches.map(p => `
                        <div class="flex items-center gap-4 p-3 hover:bg-white/5 cursor-pointer border-b border-gray-700/50 last:border-0 transition-colors" onclick="window.location.href='#product-grid'; document.getElementById('search-overlay').classList.add('hidden');">
                            <img src="${p.image}" class="w-10 h-10 object-contain bg-white/5 rounded">
                            <div>
                                <div class="font-bold text-white">${p.name}</div>
                                <div class="text-xs text-electric-cyan">${formatCurrency(p.price)}</div>
                            </div>
                        </div>
                    `).join('')}
                   </div>`
                : `<div class="text-center text-gray-500 p-4">No components found.</div>`;
        });
    }
};

// --- Cart Drawer ---
const initCartDrawer = () => {
    const cartDrawer = document.getElementById('cart-drawer');
    const cartButton = document.getElementById('cart-button');
    const closeCartButton = document.getElementById('close-cart-button');
    const checkoutBtn = document.getElementById('checkout-btn');

    const toggleCart = () => {
        if (cartDrawer) {
            const isClosed = cartDrawer.classList.contains('translate-x-full');
            if (isClosed) {
                cartDrawer.classList.remove('translate-x-full');
            } else {
                cartDrawer.classList.add('translate-x-full');
            }
        }
    };

    if (cartButton) cartButton.addEventListener('click', toggleCart);
    if (closeCartButton) closeCartButton.addEventListener('click', toggleCart);

    if (checkoutBtn) {
        checkoutBtn.addEventListener('click', () => {
            if (store.state.cart.length === 0) {
                alert('Your cart is empty!');
                return;
            }

            // Simulate Checkout Process
            if (confirm(`Proceed to checkout for ${formatCurrency(store.getCartTotal())}?`)) {
                const order = store.createOrder({ name: 'Guest User', email: 'guest@example.com' });
                alert(`Order Placed Successfully! Order ID: ${order.id}`);
                toggleCart(); // Close drawer
            }
        });
    }
};

// --- Init ---
const init = () => {
    // Subscribe to store changes
    store.subscribe((state) => {
        updateProductGrid(state.products);
        updateCartUI(state.cart);
    });

    // Initial Render
    updateProductGrid(store.state.products);
    updateCartUI(store.state.cart);

    // Setup Interactions
    initSearch();
    initCartDrawer();
};

// Run when DOM is ready
document.addEventListener('DOMContentLoaded', init);
