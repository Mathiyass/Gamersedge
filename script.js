// GamersEdge - Advanced Interactive JavaScript
import { initializeUI } from './modules/ui.js';
import { initializeCart, renderCartItems } from './modules/cart.js';
import { initializeProductSearch } from './modules/product.js';

// Global Variables
let products = {};
let isLoading = true;

// DOM Content Loaded
document.addEventListener('DOMContentLoaded', function() {
    initializeWebsite();
});

// Initialize Website
async function initializeWebsite() {
    // Loading Screen
    if (document.getElementById('loading-screen')) {
        // Total animation time for "GAMERSEDGE" to write out is 1s.
        // Let it display for a bit, then fade out.
        setTimeout(() => {
            hideLoadingScreen();
        }, 2500); // Wait for the animation to play out
    }

    products = await loadProducts();

    // Initialize components
    initializeCart(products);
    
    // Page-specific initializations
    const currentPage = getCurrentPage();
    switch(currentPage) {
        case 'products':
            initializeUI(products);
            initializeProductSearch(products);
            break;
        case 'cart':
            renderCartItems();
            break;
        case 'checkout':
            // initializeCheckout();
            break;
    }
}

// Load Products
async function loadProducts() {
    try {
        const response = await fetch('products.json');
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

// Hide Loading Screen
function hideLoadingScreen() {
    const loadingScreen = document.getElementById('loading-screen');
    if (loadingScreen) {
        loadingScreen.classList.add('hidden');
        document.body.classList.add('loading-done'); // Add class to trigger main content animation
        setTimeout(() => {
            isLoading = false;
        }, 1000); // Match the CSS transition time
    }
}

// Utility Functions
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}
