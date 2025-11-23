document.addEventListener('DOMContentLoaded', () => {
    const WishlistPage = {
        init() {
            // The global Wishlist object is already initialized in app.js
            this.render();
            // The global Cart object is initialized in app.js
            // The global Store object is initialized in app.js
        },

        render() {
            const container = document.getElementById('wishlist-container');
            if (!container) return;

            const items = Wishlist.items;

            if (items.length === 0) {
                container.innerHTML = `
                    <div class="text-center bg-surface-dark p-12 rounded-xl">
                        <i data-lucide="heart" class="w-24 h-24 text-text-muted mx-auto mb-4"></i>
                        <h2 class="text-2xl font-bold mb-2">Your Wishlist is Empty</h2>
                        <p class="text-text-secondary mb-6">Explore products and save your favorites here.</p>
                        <a href="shop.html" class="bg-neon-cyan text-void font-bold py-3 px-8 rounded-lg hover:bg-opacity-80 transition-all">Find Products</a>
                    </div>
                `;
            } else {
                container.innerHTML = `
                    <div class="grid grid-cols-1 gap-6">
                        ${items.map(item => this.createItem(item)).join('')}
                    </div>
                `;
            }
            lucide.createIcons();
            this.addEventListeners();
        },

        createItem(product) {
            return `
                <div class="flex items-center gap-4 bg-surface-dark p-4 rounded-xl">
                    <img src="${product.primaryImage}" alt="${product.name}" class="w-24 h-24 object-cover rounded-lg">
                    <div class="flex-1">
                        <a href="product.html?id=${product.id}" class="text-lg font-semibold hover:text-neon-cyan">${product.name}</a>
                        <p class="text-text-muted font-mono">${Utils.formatLKR(product.price)}</p>
                    </div>
                    <div class="flex items-center gap-4">
                        <button data-product-id="${product.id}" class="add-to-cart-wishlist-btn bg-neon-cyan text-void font-bold py-2 px-4 rounded-lg hover:bg-opacity-80 transition-all">Add to Cart</button>
                        <button data-product-id="${product.id}" class="remove-from-wishlist-btn text-error-red hover:opacity-75"><i data-lucide="trash-2"></i></button>
                    </div>
                </div>
            `;
        },

        addEventListeners() {
            document.querySelectorAll('.add-to-cart-wishlist-btn').forEach(btn => {
                btn.addEventListener('click', e => {
                    const productId = e.currentTarget.dataset.productId;
                    this.addToCart(productId);
                });
            });
            document.querySelectorAll('.remove-from-wishlist-btn').forEach(btn => {
                btn.addEventListener('click', e => {
                    const productId = e.currentTarget.dataset.productId;
                    Wishlist.remove(productId);
                    this.render(); // Re-render the wishlist
                });
            });
        },

        addToCart(productId) {
            const product = Wishlist.items.find(p => p.id === productId);
            if(product) {
                Cart.add(product);
                Wishlist.remove(productId);
                window.location.reload();
            }
        }
    };
    
    WishlistPage.init();
});
