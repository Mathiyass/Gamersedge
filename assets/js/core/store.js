const STORE_KEY = 'gamersedge.store';

class Store {
    constructor() {
        this.state = this.loadState();
        if (!this.state.products || this.state.products.length === 0) {
            this.seedData();
        }
    }

    loadState() {
        try {
            const serializedState = localStorage.getItem(STORE_KEY);
            if (serializedState === null) {
                return this.getInitialState();
            }
            return JSON.parse(serializedState);
        } catch (err) {
            console.error("Error loading state from localStorage:", err);
            return this.getInitialState();
        }
    }

    saveState() {
        try {
            const serializedState = JSON.stringify(this.state);
            localStorage.setItem(STORE_KEY, serializedState);
        } catch (err) {
            console.error("Error saving state to localStorage:", err);
        }
    }

    getInitialState() {
        return {
            products: [],
            cart: [],
            userSession: {
                isLoggedIn: false,
                username: null,
                sessionStart: null,
            },
            orders: [],
        };
    }

    getState() {
        return this.state;
    }
    
    // The "commit" in Redux terms, but simplified.
    setState(newState) {
        this.state = { ...this.state, ...newState };
        this.saveState();
        // In a more complex app, we'd dispatch events here to update the UI.
    }
    
    // --- Product Management ---
    getProducts() {
        return this.state.products;
    }

    getProductById(id) {
        return this.state.products.find(p => p.id === id);
    }
    
    updateProduct(productId, updatedProductData) {
        const products = this.state.products.map(p => 
            p.id === productId ? { ...p, ...updatedProductData } : p
        );
        this.setState({ products });
    }

    // --- Cart Management ---
    getCart() {
        return this.state.cart;
    }

    addToCart(productId, quantity = 1) {
        const product = this.getProductById(productId);
        if (!product || !product.inStock) {
            console.error("Product not found or out of stock.");
            return;
        }

        const cartItem = this.state.cart.find(item => item.productId === productId);

        if (cartItem) {
            cartItem.quantity += quantity;
        } else {
            this.state.cart.push({ productId, quantity });
        }
        this.saveState();
    }

    updateCartItemQuantity(productId, quantity) {
        if (quantity <= 0) {
            this.removeFromCart(productId);
            return;
        }
        const cartItem = this.state.cart.find(item => item.productId === productId);
        if (cartItem) {
            cartItem.quantity = quantity;
            this.saveState();
        }
    }

    removeFromCart(productId) {
        this.state.cart = this.state.cart.filter(item => item.productId !== productId);
        this.saveState();
    }
    
    getCartTotal() {
        return this.state.cart.reduce((total, item) => {
            const product = this.getProductById(item.productId);
            return total + (product ? product.price * item.quantity : 0);
        }, 0);
    }

    // --- User Session ---
    login(username, password) {
        // Simulated login
        if (username === 'admin' && password === 'admin') {
            this.setState({
                userSession: {
                    isLoggedIn: true,
                    username: 'admin',
                    sessionStart: Date.now(),
                }
            });
            return true;
        }
        return false;
    }

    logout() {
        this.setState({
            userSession: this.getInitialState().userSession
        });
    }

    // --- Order Management ---
    createOrder(cart, customerDetails) {
        const newOrder = {
            id: `ORD-${Date.now()}`,
            date: new Date().toISOString(),
            items: cart,
            total: this.getCartTotal(),
            status: 'Processing', // Processing -> Dispatching -> Delivered
            customer: customerDetails,
        };
        this.setState({ orders: [...this.state.orders, newOrder] });
        this.setState({ cart: [] }); // Clear cart after order
    }
    
    updateOrderStatus(orderId, status) {
        const orders = this.state.orders.map(o => 
            o.id === orderId ? { ...o, status } : o
        );
        this.setState({ orders });
    }


    seedData() {
        console.log("Seeding initial product data...");
        const products = [
            // CPUs
            { id: 'cpu001', name: 'Intel Core i9-14900K', category: 'CPU', brand: 'Intel', price: 240000, inStock: true, imageUrl: 'https://via.placeholder.com/300x300.png?text=i9-14900K' },
            { id: 'cpu002', name: 'AMD Ryzen 9 7950X3D', category: 'CPU', brand: 'AMD', price: 260000, inStock: true, imageUrl: 'https://via.placeholder.com/300x300.png?text=7950X3D' },
            { id: 'cpu003', name: 'Intel Core i5-14600K', category: 'CPU', brand: 'Intel', price: 120000, inStock: true, imageUrl: 'https://via.placeholder.com/300x300.png?text=i5-14600K' },
            { id: 'cpu004', name: 'AMD Ryzen 7 7800X3D', category: 'CPU', brand: 'AMD', price: 150000, inStock: false, imageUrl: 'https://via.placeholder.com/300x300.png?text=7800X3D' },
            
            // GPUs
            { id: 'gpu001', name: 'NVIDIA GeForce RTX 4090', category: 'GPU', brand: 'NVIDIA', price: 650000, inStock: true, imageUrl: 'https://via.placeholder.com/300x300.png?text=RTX+4090' },
            { id: 'gpu002', name: 'NVIDIA GeForce RTX 4080 Super', category: 'GPU', brand: 'NVIDIA', price: 450000, inStock: true, imageUrl: 'https://via.placeholder.com/300x300.png?text=RTX+4080S' },
            { id: 'gpu003', name: 'AMD Radeon RX 7900 XTX', category: 'GPU', brand: 'AMD', price: 400000, inStock: true, imageUrl: 'https://via.placeholder.com/300x300.png?text=RX+7900XTX' },
            { id: 'gpu004', name: 'NVIDIA GeForce RTX 4070 Ti Super', category: 'GPU', brand: 'NVIDIA', price: 350000, inStock: true, imageUrl: 'https://via.placeholder.com/300x300.png?text=RTX+4070TiS' },

            // Motherboards
            { id: 'mobo001', name: 'ASUS ROG MAXIMUS Z790 (Intel)', category: 'Motherboard', brand: 'ASUS', price: 220000, inStock: true, imageUrl: 'https://via.placeholder.com/300x300.png?text=Z790+Maximus' },
            { id: 'mobo002', name: 'MSI MEG X670E GODLIKE (AMD)', category: 'Motherboard', brand: 'MSI', price: 250000, inStock: true, imageUrl: 'https://via.placeholder.com/300x300.png?text=X670E+Godlike' },
            { id: 'mobo003', name: 'Gigabyte AORUS Z790 ELITE (Intel)', category: 'Motherboard', brand: 'Gigabyte', price: 95000, inStock: true, imageUrl: 'https://via.placeholder.com/300x300.png?text=Z790+Aorus' },
            { id: 'mobo004', name: 'ASRock X670E Taichi (AMD)', category: 'Motherboard', brand: 'ASRock', price: 180000, inStock: true, imageUrl: 'https://via.placeholder.com/300x300.png?text=X670E+Taichi' },

            // RAM
            { id: 'ram001', name: 'Corsair Dominator Platinum 32GB DDR5 6000MHz', category: 'RAM', brand: 'Corsair', price: 65000, inStock: true, imageUrl: 'https://via.placeholder.com/300x300.png?text=Dominator+RAM' },
            { id: 'ram002', name: 'G.Skill Trident Z5 RGB 32GB DDR5 6400MHz', category: 'RAM', brand: 'G.Skill', price: 70000, inStock: true, imageUrl: 'https://via.placeholder.com/300x300.png?text=TridentZ5+RAM' },
            
            // Storage
            { id: 'ssd001', name: 'Samsung 990 Pro 2TB NVMe SSD', category: 'Storage', brand: 'Samsung', price: 80000, inStock: true, imageUrl: 'https://via.placeholder.com/300x300.png?text=990+Pro+SSD' },
            { id: 'ssd002', name: 'Crucial T700 2TB Gen5 NVMe SSD', category: 'Storage', brand: 'Crucial', price: 110000, inStock: true, imageUrl: 'https://via.placeholder.com/300x300.png?text=T700+Gen5' },

            // PSU
            { id: 'psu001', name: 'Corsair AX1600i 1600W 80+ Titanium', category: 'PSU', brand: 'Corsair', price: 150000, inStock: true, imageUrl: 'https://via.placeholder.com/300x300.png?text=AX1600i' },
            { id: 'psu002', name: 'Seasonic PRIME TX-1000 1000W 80+ Titanium', category: 'PSU', brand: 'Seasonic', price: 90000, inStock: true, imageUrl: 'https://via.placeholder.com/300x300.png?text=PRIME+TX-1000' },

            // Case
            { id: 'case001', name: 'Lian Li O11 Dynamic EVO', category: 'Case', brand: 'Lian Li', price: 60000, inStock: true, imageUrl: 'https://via.placeholder.com/300x300.png?text=O11+Dynamic' },
            { id: 'case002', name: 'Fractal Design Meshify 2', category: 'Case', brand: 'Fractal Design', price: 55000, inStock: false, imageUrl: 'https://via.placeholder.com/300x300.png?text=Meshify+2' },
            
            // Peripherals
            { id: 'peri001', name: 'Razer Huntsman V3 Pro Keyboard', category: 'Peripherals', brand: 'Razer', price: 90000, inStock: true, imageUrl: 'https://via.placeholder.com/300x300.png?text=Huntsman+V3' },
            { id: 'peri002', name: 'Logitech G Pro X Superlight 2 Mouse', category: 'Peripherals', brand: 'Logitech', price: 55000, inStock: true, imageUrl: 'https://via.placeholder.com/300x300.png?text=G+Pro+X+2' },
            { id: 'peri003', name: 'SteelSeries Arctis Nova Pro Wireless Headset', category: 'Peripherals', brand: 'SteelSeries', price: 130000, inStock: true, imageUrl: 'https://via.placeholder.com/300x300.png?text=Arctis+Nova' },
            
            // Monitors
            { id: 'mon001', name: 'Alienware AW3423DWF 34" QD-OLED', category: 'Monitor', brand: 'Dell', price: 450000, inStock: true, imageUrl: 'https://via.placeholder.com/300x300.png?text=AW3423DWF' },
            { id: 'mon002', name: 'ASUS ROG Swift PG27AQDM 27" OLED', category: 'Monitor', brand: 'ASUS', price: 380000, inStock: true, imageUrl: 'https://via.placeholder.com/300x300.png?text=PG27AQDM' },
            
            // Laptops
            { id: 'lap001', name: 'Razer Blade 16 (RTX 4090)', category: 'Laptop', brand: 'Razer', price: 1800000, inStock: true, imageUrl: 'https://via.placeholder.com/300x300.png?text=Razer+Blade+16' },
            { id: 'lap002', name: 'ASUS ROG Zephyrus G14 (RTX 4070)', category: 'Laptop', brand: 'ASUS', price: 950000, inStock: true, imageUrl: 'https://via.placeholder.com/300x300.png?text=Zephyrus+G14' },
            
            // Cooling
            { id: 'cool001', name: 'Corsair iCUE LINK H150i LCD AIO Cooler', category: 'Cooling', brand: 'Corsair', price: 110000, inStock: true, imageUrl: 'https://via.placeholder.com/300x300.png?text=H150i+AIO' },
            { id: 'cool002', name: 'Noctua NH-D15 chromax.black', category: 'Cooling', brand: 'Noctua', price: 45000, inStock: true, imageUrl: 'https://via.placeholder.com/300x300.png?text=NH-D15' },
            { id: 'cool003', name: 'Lian Li UNI FAN SL-INF 120 (3-Pack)', category: 'Cooling', brand: 'Lian Li', price: 38000, inStock: true, imageUrl: 'https://via.placeholder.com/300x300.png?text=UNI+FAN+SL' },

        ];
        this.setState({ products });
    }
}

// Export a singleton instance
const store = new Store();
export default store;
