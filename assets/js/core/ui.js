const UI = {
    createProductCard(product) {
        const discount = product.originalPrice ? Utils.calcDiscount(product.originalPrice, product.price) : 0;
        const inStock = product.stock > 0;

        return `
            <div class="product-card bg-surface-dark rounded-xl overflow-hidden flex flex-col border border-transparent hover:border-neon-cyan transition-all duration-300 animate-on-scroll">
                <div class="relative">
                    ${discount > 0 ? `<div class="absolute top-4 left-4 bg-electric-pink text-white text-xs font-bold px-2 py-1 rounded">SALE -${discount}%</div>` : ''}
                    <button class="wishlist-btn absolute top-4 right-4 text-white hover:text-electric-pink transition-colors" data-product-id="${product.id}"><i data-lucide="heart"></i></button>
                    <div class="product-image-wrapper p-4">
                        <img src="${product.primaryImage}" alt="${product.name}" class="product-image w-full h-48 object-cover rounded-lg">
                    </div>
                </div>
                <div class="p-4 flex flex-col flex-grow">
                    <span class="text-xs text-text-muted mb-1">${product.brand.toUpperCase()}</span>
                    <h3 class="text-md font-bold text-white mb-2 flex-grow">${Utils.truncate(product.name, 45)}</h3>
                    <div class="flex items-center mb-2">
                        <div class="flex text-amber-400">
                            ${'★'.repeat(Math.round(product.rating))}${'☆'.repeat(5 - Math.round(product.rating))}
                        </div>
                        <span class="text-xs text-text-muted ml-2">(${product.reviewCount} reviews)</span>
                    </div>
                    <div class="mb-4">
                        ${product.originalPrice ? `<span class="text-sm text-text-muted line-through">${Utils.formatLKR(product.originalPrice)}</span>` : ''}
                        <span class="text-lg font-mono font-bold text-neon-cyan ml-2">${Utils.formatLKR(product.price)}</span>
                    </div>
                     <p class="text-sm mb-4 flex items-center ${inStock ? 'text-success-green' : 'text-error-red'}">
                        <i data-lucide="${inStock ? 'check-circle' : 'x-circle'}" class="w-4 h-4 mr-2"></i>
                        ${inStock ? 'In Stock' : 'Out of Stock'}
                    </p>
                    <div class="mt-auto grid grid-cols-2 gap-2">
                        <a href="product.html?id=${product.id}" class="text-center w-full bg-surface-light text-white font-bold py-2 px-4 rounded-lg hover:bg-opacity-80 transition-all text-sm">Quick View</a>
                        <button data-product-id="${product.id}" ${inStock ? '' : 'disabled'} class="add-to-cart-btn text-center w-full bg-neon-cyan text-void font-bold py-2 px-4 rounded-lg hover:bg-opacity-80 transition-all text-sm disabled:opacity-50 disabled:cursor-not-allowed">Add to Cart</button>
                    </div>
                </div>
            </div>
        `;
    },

    createCategoryCard(category) {
        return `
            <a href="shop.html?category=${category.slug}" class="bg-surface-dark p-4 rounded-lg flex flex-col items-center justify-center text-center hover:bg-surface-light hover:-translate-y-1 transition-all duration-300 animate-on-scroll">
                <span class="text-3xl mb-2">${category.icon}</span>
                <span class="text-sm font-semibold">${category.name}</span>
            </a>
        `;
    },

    createSearchResultItem(product) {
        return `
            <a href="product.html?id=${product.id}" class="flex items-center gap-4 p-3 rounded-lg hover:bg-surface-light transition-colors">
                <img src="${product.primaryImage}" alt="${product.name}" class="w-12 h-12 object-cover rounded-md">
                <div class="flex-1">
                    <p class="text-white font-semibold">${product.name}</p>
                    <p class="text-sm text-text-secondary">${product.brand}</p>
                </div>
                <p class="font-mono text-neon-cyan">${Utils.formatLKR(product.price)}</p>
            </a>
        `;
    }
};