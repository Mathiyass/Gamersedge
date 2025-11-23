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
    // Generic getter
    _get(key, defaultValue = []) {
        try {
            const value = localStorage.getItem(key);
            return value ? JSON.parse(value) : defaultValue;
        } catch (e) {
            console.error(`Error reading from localStorage key “${key}”:`, e);
            return defaultValue;
        }
    },

    // Generic setter
    _set(key, value) {
        try {
            localStorage.setItem(key, JSON.stringify(value));
        } catch (e) {
            console.error(`Error writing to localStorage key “${key}”:`, e);
        }
    },

    // Products
    getProducts: () => Store._get(STORAGE_KEYS.PRODUCTS, []),
    saveProducts: (products) => Store._set(STORAGE_KEYS.PRODUCTS, products),
    getProductById: (id) => Store.getProducts().find(p => p.id === id),

    // Categories
    getCategories: () => Store._get(STORAGE_KEYS.CATEGORIES, []),
    saveCategories: (categories) => Store._set(STORAGE_KEYS.CATEGORIES, categories),
    getCategoryById: (id) => Store.getCategories().find(c => c.id === id),

    // Orders
    getOrders: () => Store._get(STORAGE_KEYS.ORDERS, []),
    saveOrders: (orders) => Store._set(STORAGE_KEYS.ORDERS, orders),

    // Cart
    getCart: () => Store._get(STORAGE_KEYS.CART, []),
    saveCart: (cartItems) => Store._set(STORAGE_KEYS.CART, cartItems),

    // Settings
    getSettings: () => Store._get(STORAGE_KEYS.SETTINGS, {}),
    saveSettings: (settings) => Store._set(STORAGE_KEYS.SETTINGS, settings),

    // Admin Auth
    getAdminAuth: () => Store._get(STORAGE_KEYS.ADMIN_AUTH, {}),
    saveAdminAuth: (authData) => Store._set(STORAGE_KEYS.ADMIN_AUTH, authData),
    
    // Seeder flag
    isSeeded: () => Store._get(STORAGE_KEYS.SEEDED, false),
    setSeeded: (value) => Store._set(STORAGE_KEYS.SEEDED, value),
    
    // Clear all data
    clearAllData() {
        Object.values(STORAGE_KEYS).forEach(key => {
            localStorage.removeItem(key);
        });
        console.log('All GamersEdge data has been cleared from localStorage.');
    }
};