// modules/home.js

/**
 * Loads products from the products.json file.
 * @returns {Promise<Object>} A promise that resolves to the products object.
 */
async function loadProducts() {
    try {
        const response = await fetch('products.json');
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return await response.json();
    } catch (error) {
        console.error('Error loading products:', error);
        return {};
    }
}

/**
 * Renders the "New Arrivals" section with the first four products.
 * @param {Object} products - The products object.
 */
function renderNewArrivals(products) {
    const newArrivalsGrid = document.getElementById('new-arrivals-grid');
    if (!newArrivalsGrid) {
        console.error('New arrivals grid not found');
        return;
    }

    const productEntries = Object.entries(products);
    const firstFourProducts = productEntries.slice(0, 4);

    if (firstFourProducts.length === 0) {
        newArrivalsGrid.innerHTML = '<p class="text-white/50 col-span-4 text-center">No new arrivals to display.</p>';
        return;
    }

    newArrivalsGrid.innerHTML = firstFourProducts.map(([id, product]) => {
        // Define an array of accent colors for the product cards
        const accentColors = ['primary', 'cyber-pink', 'lime-green', 'electric-blue'];
        // Use the index to cycle through the accent colors
        const accentColor = accentColors[firstFourProducts.indexOf(productEntries.find(p => p[0] === id)) % accentColors.length];

        return `
            <div class="group relative flex flex-col overflow-hidden rounded-xl border border-white-10 glassmorphism transition-all hover:border-${accentColor}/50 hover:shadow-2xl hover:shadow-${accentColor}/20">
                <div class="aspect-h-4 aspect-w-3 bg-gray-200">
                    <img class="h-full w-full object-cover object-center transition-transform group-hover:scale-105" src="${product.images[0]}" alt="${product.name}">
                </div>
                <div class="p-4 flex flex-col flex-1">
                    <h3 class="text-base font-semibold text-white">${product.name}</h3>
                    <p class="mt-1 text-sm text-white/60">${product.description || 'High-quality gaming gear'}</p>
                    <p class="mt-4 text-lg font-bold text-${accentColor}">LKR ${product.price.toLocaleString()}</p>
                </div>
                <div class="absolute bottom-4 right-4 opacity-0 transition-opacity group-hover:opacity-100">
                    <button class="add-to-cart flex h-10 w-10 items-center justify-center rounded-full bg-${accentColor} text-background-dark shadow-md transition-transform hover:scale-110" data-product="${id}">
                        <span class="material-symbols-outlined">add_shopping_cart</span>
                    </button>
                </div>
            </div>
        `;
    }).join('');
}

import { initializeCart } from './cart.js';

/**
 * Initializes the homepage functionality.
 */
export async function initializeHomepage() {
    const products = await loadProducts();
    renderNewArrivals(products);
    initializeCart(products);
}