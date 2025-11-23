// tests/store.test.js

// Mock localStorage
const localStorageMock = (function() {
    let store = {};
    return {
        getItem: function(key) {
            return store[key] || null;
        },
        setItem: function(key, value) {
            store[key] = value.toString();
        },
        removeItem: function(key) {
            delete store[key];
        },
        clear: function() {
            store = {};
        }
    };
})();

Object.defineProperty(window, 'localStorage', {
    value: localStorageMock
});

// Import the Store object (assuming it's in a way that can be imported or is global)
// For now, we'll manually define a simplified version based on its structure
// In a real browser environment, it would likely be accessible via <script> tags
// For Node.js testing, you might need JSDOM or similar to simulate browser environment
// or adapt the Store to be exportable.

const STORAGE_KEYS = {
    PRODUCTS: 'ge_products',
    CATEGORIES: 'ge_categories',
    ORDERS: 'ge_orders',
    CART: 'ge_cart',
    WISHLIST: 'ge_wishlist',
    RECENT_VIEWS: 'ge_recent',
    SEARCH_HISTORY: 'ge_searches',
    PC_BUILDS: 'ge_builds',
    ADMIN_AUTH: 'ge_admin_auth',
    SETTINGS: 'ge_settings',
    ACTIVITY_LOG: 'ge_activity',
    THEME: 'ge_theme',
    NEWSLETTER: 'ge_newsletter',
    SEEDED: 'ge_seeded'
};

const Store = {
    _get(key, defaultValue = []) {
        try {
            const value = localStorage.getItem(key);
            return value ? JSON.parse(value) : defaultValue;
        } catch (e) {
            console.error(`Error reading from localStorage key “${key}”:`, e);
            return defaultValue;
        }
    },

    _set(key, value) {
        try {
            localStorage.setItem(key, JSON.stringify(value));
        } catch (e) {
            console.error(`Error writing to localStorage key “${key}”:`, e);
        }
    },

    getProducts: () => Store._get(STORAGE_KEYS.PRODUCTS, []),
    saveProducts: (products) => Store._set(STORAGE_KEYS.PRODUCTS, products),
    getProductById: (id) => Store.getProducts().find(p => p.id === id),

    getCategories: () => Store._get(STORAGE_KEYS.CATEGORIES, []),
    saveCategories: (categories) => Store._set(STORAGE_KEYS.CATEGORIES, categories),
    getCategoryById: (id) => Store.getCategories().find(c => c.id === id),

    getOrders: () => Store._get(STORAGE_KEYS.ORDERS, []),
    saveOrders: (orders) => Store._set(STORAGE_KEYS.ORDERS, orders),

    getCart: () => Store._get(STORAGE_KEYS.CART, []),
    saveCart: (cartItems) => Store._set(STORAGE_KEYS.CART, cartItems),

    getSettings: () => Store._get(STORAGE_KEYS.SETTINGS, {}),
    saveSettings: (settings) => Store._set(STORAGE_KEYS.SETTINGS, settings),

    getAdminAuth: () => Store._get(STORAGE_KEYS.ADMIN_AUTH, {}),
    saveAdminAuth: (authData) => Store._set(STORAGE_KEYS.ADMIN_AUTH, authData),
    
    isSeeded: () => Store._get(STORAGE_KEYS.SEEDED, false),
    setSeeded: (value) => Store._set(STORAGE_KEYS.SEEDED, value),
    
    clearAllData() {
        Object.values(STORAGE_KEYS).forEach(key => {
            localStorage.removeItem(key);
        });
    }
};


// Test suite for Store object
describe('Store object', () => {
    beforeEach(() => {
        localStorage.clear(); // Clear localStorage before each test
    });

    // Test for generic getter and setter
    test('should set and get generic data correctly', () => {
        const testKey = 'test_data';
        const testValue = { item: 'value' };
        Store._set(testKey, testValue);
        expect(Store._get(testKey)).toEqual(testValue);
    });

    test('should return default value if item is not in localStorage', () => {
        const testKey = 'non_existent_data';
        const defaultValue = [];
        expect(Store._get(testKey, defaultValue)).toEqual(defaultValue);
    });

    // Test for Products
    test('should save and retrieve products', () => {
        const products = [{ id: '1', name: 'Product 1' }];
        Store.saveProducts(products);
        expect(Store.getProducts()).toEqual(products);
    });

    test('should retrieve a product by ID', () => {
        const products = [{ id: '1', name: 'Product 1' }, { id: '2', name: 'Product 2' }];
        Store.saveProducts(products);
        expect(Store.getProductById('2')).toEqual({ id: '2', name: 'Product 2' });
    });

    // Test for Categories
    test('should save and retrieve categories', () => {
        const categories = [{ id: 'cat1', name: 'Category 1' }];
        Store.saveCategories(categories);
        expect(Store.getCategories()).toEqual(categories);
    });

    test('should retrieve a category by ID', () => {
        const categories = [{ id: 'cat1', name: 'Category 1' }, { id: 'cat2', name: 'Category 2' }];
        Store.saveCategories(categories);
        expect(Store.getCategoryById('cat2')).toEqual({ id: 'cat2', name: 'Category 2' });
    });

    // Test for Orders
    test('should save and retrieve orders', () => {
        const orders = [{ id: 'ord1', total: 100 }];
        Store.saveOrders(orders);
        expect(Store.getOrders()).toEqual(orders);
    });

    // Test for Cart
    test('should save and retrieve cart items', () => {
        const cartItems = [{ prodId: 'p1', qty: 2 }];
        Store.saveCart(cartItems);
        expect(Store.getCart()).toEqual(cartItems);
    });

    // Test for Settings
    test('should save and retrieve settings', () => {
        const settings = { theme: 'dark' };
        Store.saveSettings(settings);
        expect(Store.getSettings()).toEqual(settings);
    });

    // Test for Admin Auth
    test('should save and retrieve admin auth data', () => {
        const authData = { loggedIn: true };
        Store.saveAdminAuth(authData);
        expect(Store.getAdminAuth()).toEqual(authData);
    });

    // Test for isSeeded
    test('should correctly report if data is seeded', () => {
        Store.setSeeded(true);
        expect(Store.isSeeded()).toBe(true);
        Store.setSeeded(false);
        expect(Store.isSeeded()).toBe(false);
    });

    // Test for clearAllData
    test('should clear all data from localStorage', () => {
        Store.saveProducts([{ id: '1' }]);
        Store.saveCategories([{ id: 'c1' }]);
        Store.clearAllData();
        expect(Store.getProducts()).toEqual([]);
        expect(Store.getCategories()).toEqual([]);
        expect(localStorage.getItem(STORAGE_KEYS.PRODUCTS)).toBeNull();
        expect(localStorage.getItem(STORAGE_KEYS.CATEGORIES)).toBeNull();
    });
});
