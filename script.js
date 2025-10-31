import { initializeHomepage } from './modules/home.js';
import { initializeCart, renderCartItems } from './modules/cart.js';
import { initializeProductSearch } from './modules/product.js';
import { initializeUI } from './modules/ui.js';

// Global Variables
let products = {};

// DOM Content Loaded
document.addEventListener('DOMContentLoaded', function() {
    initializeWebsite();
});

// Initialize Website
async function initializeWebsite() {
    products = await loadProducts();

    // Initialize components
    initializeCart(products);
    
    // Page-specific initializations
    const currentPage = getCurrentPage();
    switch(currentPage) {
        case 'home':
            initializeHomepage();
            break;
        case 'products':
            initializeUI(products);
            initializeProductSearch(products);
            break;
        case 'cart':
            renderCartItems();
            break;
        // Add other cases as needed for other pages
    }
}

// Load Products
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

// Get Current Page
function getCurrentPage() {
    const path = window.location.pathname;
    if (path.includes('products')) return 'products';
    if (path.includes('services')) return 'services';
    if (path.includes('about')) return 'about';
    if (path.includes('contact')) return 'contact';
    if (path.includes('cart')) return 'cart';
    return 'home';
}
