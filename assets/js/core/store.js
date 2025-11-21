/**
 * assets/js/core/store.js
 * The Brain - Centralized State Management
 */

class Store {
    constructor() {
        this.state = {
            products: [],
            cart: [],
            orders: [],
            userSession: null, // { username: 'admin', expiresAt: timestamp }
            filters: {
                category: 'all',
                search: ''
            }
        };
        this.listeners = [];
        this.loadFromStorage();
    }

    // --- Pub/Sub ---
    subscribe(listener) {
        this.listeners.push(listener);
        return () => {
            this.listeners = this.listeners.filter(l => l !== listener);
        };
    }

    notify() {
        this.listeners.forEach(listener => listener(this.state));
        this.saveToStorage();
    }

    // --- Persistence ---
    saveToStorage() {
        localStorage.setItem('gamersedge_products', JSON.stringify(this.state.products));
        localStorage.setItem('gamersedge_cart', JSON.stringify(this.state.cart));
        localStorage.setItem('gamersedge_orders', JSON.stringify(this.state.orders));
        localStorage.setItem('gamersedge_session', JSON.stringify(this.state.userSession));
    }

    loadFromStorage() {
        const products = localStorage.getItem('gamersedge_products');
        const cart = localStorage.getItem('gamersedge_cart');
        const orders = localStorage.getItem('gamersedge_orders');
        const session = localStorage.getItem('gamersedge_session');

        if (products) {
            this.state.products = JSON.parse(products);
        } else {
            this.seedData();
        }

        if (cart) this.state.cart = JSON.parse(cart);
        if (orders) this.state.orders = JSON.parse(orders);
        if (session) this.state.userSession = JSON.parse(session);
    }

    // --- Seeding ---
    seedData() {
        const initialProducts = [
            // GPUs
            { id: 'gpu-1', name: 'NVIDIA GeForce RTX 4090', category: 'GPU', price: 650000, image: 'https://dlcdnwebimgs.asus.com/gain/9d545e52-6e39-4322-87eb-31b54312933f/w800', stock: 5, brand: 'ASUS' },
            { id: 'gpu-2', name: 'NVIDIA GeForce RTX 4080 Super', category: 'GPU', price: 420000, image: 'https://dlcdnwebimgs.asus.com/gain/59b5083e-5c11-4b23-821f-801663035547/w800', stock: 8, brand: 'ASUS' },
            { id: 'gpu-3', name: 'AMD Radeon RX 7900 XTX', category: 'GPU', price: 380000, image: 'https://dlcdnwebimgs.asus.com/gain/41d60197-6350-4400-945a-484542511223/w800', stock: 10, brand: 'ASUS' },
            { id: 'gpu-4', name: 'NVIDIA GeForce RTX 4070 Ti', category: 'GPU', price: 290000, image: 'https://dlcdnwebimgs.asus.com/gain/2560d09f-6456-4d26-931d-137265272340/w800', stock: 12, brand: 'MSI' },

            // CPUs
            { id: 'cpu-1', name: 'Intel Core i9-14900K', category: 'CPU', price: 210000, image: 'https://m.media-amazon.com/images/I/6125J75cv3L._AC_SL1000_.jpg', stock: 15, brand: 'Intel' },
            { id: 'cpu-2', name: 'AMD Ryzen 9 7950X3D', category: 'CPU', price: 225000, image: 'https://m.media-amazon.com/images/I/51f2hk81wmL._AC_SL1000_.jpg', stock: 10, brand: 'AMD' },
            { id: 'cpu-3', name: 'Intel Core i7-14700K', category: 'CPU', price: 145000, image: 'https://m.media-amazon.com/images/I/61sYd6lP4PL._AC_SL1000_.jpg', stock: 20, brand: 'Intel' },
            { id: 'cpu-4', name: 'AMD Ryzen 7 7800X3D', category: 'CPU', price: 135000, image: 'https://m.media-amazon.com/images/I/516X8fVvXnL._AC_SL1000_.jpg', stock: 25, brand: 'AMD' },

            // Motherboards
            { id: 'mobo-1', name: 'ASUS ROG Maximus Z790 Hero', category: 'Motherboard', price: 230000, image: 'https://dlcdnwebimgs.asus.com/gain/02936472-7797-4c64-9994-04425402009a/w800', stock: 7, brand: 'ASUS', compatibility: 'Intel' },
            { id: 'mobo-2', name: 'MSI MEG Z790 GODLIKE', category: 'Motherboard', price: 350000, image: 'https://storage-asset.msi.com/global/picture/image/feature/mb/MEG-Z790-GODLIKE/board01.png', stock: 3, brand: 'MSI', compatibility: 'Intel' },
            { id: 'mobo-3', name: 'ASUS ROG Crosshair X670E Hero', category: 'Motherboard', price: 215000, image: 'https://dlcdnwebimgs.asus.com/gain/4e6d7e0e-1926-4d0e-93c6-6e5689266066/w800', stock: 6, brand: 'ASUS', compatibility: 'AMD' },
            { id: 'mobo-4', name: 'Gigabyte X670E AORUS Master', category: 'Motherboard', price: 180000, image: 'https://static.gigabyte.com/StaticFile/Image/Global/63333a5091196057d739311576099f78/Product/32623/png/1000', stock: 8, brand: 'Gigabyte', compatibility: 'AMD' },

            // RAM
            { id: 'ram-1', name: 'G.SKILL Trident Z5 RGB 32GB (2x16GB) DDR5-7200', category: 'Memory', price: 75000, image: 'https://www.gskill.com/img/pr/trident_z5_rgb_silver.png', stock: 30, brand: 'G.SKILL' },
            { id: 'ram-2', name: 'Corsair Dominator Titanium RGB 64GB (2x32GB) DDR5-6000', category: 'Memory', price: 110000, image: 'https://assets.corsair.com/image/upload/f_auto,q_auto/products/Memory/Dominator-Titanium-First-Edition/Gallery/DOMINATOR_TITANIUM_FIRST_EDITION_01.webp', stock: 15, brand: 'Corsair' },

            // Storage
            { id: 'ssd-1', name: 'Samsung 990 PRO 2TB NVMe SSD', category: 'Storage', price: 65000, image: 'https://image-us.samsung.com/SamsungUS/home/computing/memory-and-storage/solid-state-drives/10042022/990PRO_1.jpg', stock: 40, brand: 'Samsung' },
            { id: 'ssd-2', name: 'WD_BLACK SN850X 4TB NVMe SSD', category: 'Storage', price: 120000, image: 'https://www.westerndigital.com/content/dam/store/en-us/assets/products/internal-storage/wd-black-sn850x-nvme-ssd/gallery/wd-black-sn850x-nvme-ssd-4tb-front.png', stock: 10, brand: 'WD' },

            // Cases
            { id: 'case-1', name: 'Lian Li O11 Dynamic EVO XL', category: 'Case', price: 85000, image: 'https://lian-li.com/wp-content/uploads/2023/09/o11d-evo-xl-black-01.png', stock: 12, brand: 'Lian Li' },
            { id: 'case-2', name: 'HYTE Y70 Touch', category: 'Case', price: 125000, image: 'https://hyte.com/store/y70-touch/black/main.png', stock: 5, brand: 'HYTE' },

            // PSU
            { id: 'psu-1', name: 'ASUS ROG Thor 1200W P2', category: 'PSU', price: 115000, image: 'https://dlcdnwebimgs.asus.com/gain/99581428-0342-464e-8502-046286639138/w800', stock: 8, brand: 'ASUS' },

            // Monitors
            { id: 'mon-1', name: 'Samsung Odyssey Neo G9 57"', category: 'Monitor', price: 780000, image: 'https://image-us.samsung.com/SamsungUS/home/computing/monitors/gaming/08232023/G95NC_001_Front_Black_S.jpg', stock: 2, brand: 'Samsung' },
            { id: 'mon-2', name: 'Alienware 34 QD-OLED AW3423DW', category: 'Monitor', price: 350000, image: 'https://i.dell.com/is/image/DellContent/content/dam/ss2/product-images/dell-client-products/peripherals/monitors/alienware/aw3423dw/media-gallery/monitor-alienware-aw3423dw-gallery-1.psd?fmt=png-alpha&pscan=auto&scl=1&hei=402&wid=494&qlt=100,1&resMode=sharp2&size=494,402&chrss=full', stock: 6, brand: 'Dell' }
        ];

        this.state.products = initialProducts;
        this.saveToStorage();
    }

    // --- Actions ---

    addToCart(productId, quantity = 1) {
        const product = this.state.products.find(p => p.id === productId);
        if (!product) return;

        const existingItem = this.state.cart.find(item => item.productId === productId);
        if (existingItem) {
            existingItem.quantity += quantity;
        } else {
            this.state.cart.push({
                productId,
                quantity,
                name: product.name,
                price: product.price,
                image: product.image
            });
        }
        this.notify();
    }

    removeFromCart(productId) {
        this.state.cart = this.state.cart.filter(item => item.productId !== productId);
        this.notify();
    }

    updateCartQuantity(productId, quantity) {
        const item = this.state.cart.find(item => item.productId === productId);
        if (item) {
            item.quantity = quantity;
            if (item.quantity <= 0) {
                this.removeFromCart(productId);
            } else {
                this.notify();
            }
        }
    }

    clearCart() {
        this.state.cart = [];
        this.notify();
    }

    createOrder(customerDetails) {
        const order = {
            id: 'ORD-' + Date.now(),
            date: new Date().toISOString(),
            items: [...this.state.cart],
            total: this.getCartTotal(),
            status: 'Processing', // Processing -> Dispatching -> Delivered
            customer: customerDetails
        };
        this.state.orders.unshift(order);
        this.clearCart();
        return order;
    }

    getCartTotal() {
        return this.state.cart.reduce((total, item) => total + (item.price * item.quantity), 0);
    }

    // --- Admin Actions ---

    login(username, password) {
        if (username === 'admin' && password === 'admin') {
            const session = {
                username,
                expiresAt: Date.now() + (30 * 60 * 1000) // 30 mins
            };
            this.state.userSession = session;
            this.notify();
            return true;
        }
        return false;
    }

    logout() {
        this.state.userSession = null;
        this.notify();
    }

    checkSession() {
        if (!this.state.userSession) return false;
        if (Date.now() > this.state.userSession.expiresAt) {
            this.logout();
            return false;
        }
        // Refresh session
        this.state.userSession.expiresAt = Date.now() + (30 * 60 * 1000);
        this.saveToStorage();
        return true;
    }

    updateProduct(productId, updates) {
        const index = this.state.products.findIndex(p => p.id === productId);
        if (index !== -1) {
            this.state.products[index] = { ...this.state.products[index], ...updates };
            this.notify();
        }
    }

    updateOrderStatus(orderId, status) {
        const order = this.state.orders.find(o => o.id === orderId);
        if (order) {
            order.status = status;
            this.notify();
        }
    }
}

// Singleton instance
const store = new Store();
export default store;
