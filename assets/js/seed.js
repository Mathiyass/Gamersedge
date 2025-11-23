// seed.js - Initialize Database with Sample Data

const Seeder = {
  run() {
    if (!Store.isSeeded()) {
      this.seedCategories();
      this.seedProducts();
      this.seedSettings();
      this.seedOrders(); // Add call to seed orders
      this.seedOrders(); // Add call to seed orders
      this.seedOrders(); // Add call to seed orders
      Store.setSeeded(true);
      console.log('🌱 Database seeded successfully');
    }
  },
  
  seedCategories() {
    const categories = [
      { id: 'gpu', name: 'Graphics Cards', slug: 'graphics-cards', icon: '🎮', description: 'High-performance GPUs for gaming and content creation', order: 1, status: 'active' },
      { id: 'cpu', name: 'Processors', slug: 'processors', icon: '⚡', description: 'Intel and AMD processors', order: 2, status: 'active' },
      { id: 'laptop', name: 'Gaming Laptops', slug: 'gaming-laptops', icon: '💻', description: 'Portable gaming powerhouses', order: 3, status: 'active' },
      { id: 'desktop', name: 'Desktop PCs', slug: 'desktop-pcs', icon: '🖥️', description: 'Pre-built gaming systems', order: 4, status: 'active' },
      { id: 'monitor', name: 'Monitors', slug: 'monitors', icon: '📺', description: 'Gaming and professional displays', order: 5, status: 'active' },
      { id: 'peripheral', name: 'Peripherals', slug: 'peripherals', icon: '⌨️', description: 'Keyboards, mice, and headsets', order: 6, status: 'active' },
      { id: 'component', name: 'Components', slug: 'components', icon: '🔧', description: 'RAM, storage, motherboards, and more', order: 7, status: 'active' }
    ];
    Store.saveCategories(categories);
  },
  
  seedProducts() {
    const products = [
      // Graphics Cards
      { id: 'prod_001', name: 'NVIDIA GeForce RTX 4090 Founders Edition', slug: 'rtx-4090-fe', brand: 'NVIDIA', category: 'gpu', price: 650000, originalPrice: 750000, stock: 12, lowStockThreshold: 5, primaryImage: 'https://images.unsplash.com/photo-1591488320449-011701bb6704?w=500', images: [], shortDescription: 'The ultimate gaming GPU with 24GB GDDR6X', description: 'Experience the pinnacle of gaming performance...', specifications: [{ key: 'CUDA Cores', value: '16,384' }, { key: 'Memory', value: '24GB GDDR6X' }, { key: 'Boost Clock', value: '2520 MHz' }, { key: 'TDP', value: '450W' }], featured: true, status: 'active', rating: 4.9, reviewCount: 128 },
      { id: 'prod_002', name: 'NVIDIA GeForce RTX 4080 Super', slug: 'rtx-4080-super', brand: 'NVIDIA', category: 'gpu', price: 420000, originalPrice: null, stock: 18, lowStockThreshold: 5, primaryImage: 'https://images.unsplash.com/photo-1587202372775-e229f172b9d7?w=500', images: [], shortDescription: 'High-end performance for enthusiasts', description: 'Incredible performance for 4K gaming...', specifications: [{ key: 'CUDA Cores', value: '10,240' }, { key: 'Memory', value: '16GB GDDR6X' }], featured: true, status: 'active', rating: 4.8, reviewCount: 95 },
      { id: 'prod_003', name: 'NVIDIA GeForce RTX 4070 Ti Super', slug: 'rtx-4070-ti-super', brand: 'NVIDIA', category: 'gpu', price: 280000, originalPrice: 320000, stock: 25, lowStockThreshold: 5, primaryImage: 'https://images.unsplash.com/photo-1555618254-84e6cc2f5a7c?w=500', images: [], shortDescription: 'Sweet spot for 1440p gaming', description: 'Perfect balance of price and performance...', specifications: [{ key: 'CUDA Cores', value: '8,448' }, { key: 'Memory', value: '16GB GDDR6X' }], featured: false, status: 'active', rating: 4.7, reviewCount: 156 },
      { id: 'prod_004', name: 'AMD Radeon RX 7900 XTX', slug: 'rx-7900-xtx', brand: 'AMD', category: 'gpu', price: 380000, originalPrice: null, stock: 15, lowStockThreshold: 5, primaryImage: 'https://images.unsplash.com/photo-1623820919239-0d0ff10797a1?w=500', images: [], shortDescription: 'AMDs flagship gaming GPU', description: 'Dominate with AMD RDNA 3 architecture...', specifications: [{ key: 'Stream Processors', value: '6,144' }, { key: 'Memory', value: '24GB GDDR6' }], featured: true, status: 'active', rating: 4.6, reviewCount: 78 },
      { id: 'prod_005', name: 'AMD Radeon RX 7800 XT', slug: 'rx-7800-xt', brand: 'AMD', category: 'gpu', price: 185000, originalPrice: null, stock: 30, lowStockThreshold: 5, primaryImage: 'https://images.unsplash.com/photo-1625225233840-695456021cde?w=500', images: [], shortDescription: 'Great value for 1440p', description: 'Excellent mid-range performance...', specifications: [{ key: 'Stream Processors', value: '3,840' }, { key: 'Memory', value: '16GB GDDR6' }], featured: false, status: 'active', rating: 4.5, reviewCount: 112 },
      
      // Processors
      { id: 'prod_006', name: 'Intel Core i9-14900K', slug: 'i9-14900k', brand: 'Intel', category: 'cpu', price: 210000, originalPrice: null, stock: 20, lowStockThreshold: 5, primaryImage: 'https://images.unsplash.com/photo-1555618568-bfe1c1b82fa0?w=500', images: [], shortDescription: 'Intels fastest gaming CPU', description: '24 cores of pure performance...', specifications: [{ key: 'Cores', value: '24 (8P + 16E)' }, { key: 'Threads', value: '32' }, { key: 'Boost Clock', value: '6.0 GHz' }, { key: 'TDP', value: '253W' }], featured: true, status: 'active', rating: 4.8, reviewCount: 89 },
      { id: 'prod_007', name: 'Intel Core i7-14700K', slug: 'i7-14700k', brand: 'Intel', category: 'cpu', price: 145000, originalPrice: null, stock: 28, lowStockThreshold: 5, primaryImage: 'https://images.unsplash.com/photo-1591799264318-7e6ef8ddb7ea?w=500', images: [], shortDescription: 'Best value high-end Intel', description: 'Incredible multi-threaded performance...', specifications: [{ key: 'Cores', value: '20 (8P + 12E)' }, { key: 'Threads', value: '28' }, { key: 'Boost Clock', value: '5.6 GHz' }], featured: false, status: 'active', rating: 4.7, reviewCount: 134 },
      { id: 'prod_008', name: 'AMD Ryzen 9 7950X3D', slug: 'ryzen-9-7950x3d', brand: 'AMD', category: 'cpu', price: 225000, originalPrice: null, stock: 10, lowStockThreshold: 5, primaryImage: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=500', images: [], shortDescription: 'Ultimate gaming with 3D V-Cache', description: 'Massive cache for gaming dominance...', specifications: [{ key: 'Cores', value: '16' }, { key: 'Threads', value: '32' }, { key: 'L3 Cache', value: '128MB' }], featured: true, status: 'active', rating: 4.9, reviewCount: 67 },
      { id: 'prod_009', name: 'AMD Ryzen 7 7800X3D', slug: 'ryzen-7-7800x3d', brand: 'AMD', category: 'cpu', price: 165000, originalPrice: null, stock: 22, lowStockThreshold: 5, primaryImage: 'https://images.unsplash.com/photo-1555617766-c94804975da3?w=500', images: [], shortDescription: 'Best gaming CPU per dollar', description: 'The ultimate 1080p and 1440p gaming chip...', specifications: [{ key: 'Cores', value: '8' }, { key: 'Threads', value: '16' }, { key: 'L3 Cache', value: '96MB' }], featured: true, status: 'active', rating: 4.9, reviewCount: 203 },
      
      // Gaming Laptops
      { id: 'prod_010', name: 'ASUS ROG Strix G16 (2024)', slug: 'rog-strix-g16-2024', brand: 'ASUS', category: 'laptop', price: 485000, originalPrice: 550000, stock: 8, lowStockThreshold: 3, primaryImage: 'https://images.unsplash.com/photo-1603302576837-37561b2e2302?w=500', images: [], shortDescription: 'RTX 4070 + i9-14900HX', description: 'Dominate with desktop-class performance...', specifications: [{ key: 'Display', value: '16" QHD 240Hz' }, { key: 'GPU', value: 'RTX 4070' }, { key: 'CPU', value: 'i9-14900HX' }, { key: 'RAM', value: '32GB DDR5' }], featured: true, status: 'active', rating: 4.7, reviewCount: 45 },
      { id: 'prod_011', name: 'MSI Katana 15 B13V', slug: 'msi-katana-15', brand: 'MSI', category: 'laptop', price: 385000, originalPrice: null, stock: 12, lowStockThreshold: 3, primaryImage: 'https://images.unsplash.com/photo-1593642632559-0c6d3fc62b89?w=500', images: [], shortDescription: 'RTX 4060 value champion', description: 'Great performance at a great price...', specifications: [{ key: 'Display', value: '15.6" FHD 144Hz' }, { key: 'GPU', value: 'RTX 4060' }, { key: 'CPU', value: 'i7-13620H' }], featured: false, status: 'active', rating: 4.5, reviewCount: 78 },
      { id: 'prod_012', name: 'Razer Blade 15 (2024)', slug: 'razer-blade-15-2024', brand: 'Razer', category: 'laptop', price: 725000, originalPrice: null, stock: 5, lowStockThreshold: 2, primaryImage: 'https://images.unsplash.com/photo-1525547719571-a2d4ac8945e2?w=500', images: [], shortDescription: 'Premium craftsmanship meets power', description: 'The MacBook Pro of gaming laptops...', specifications: [{ key: 'Display', value: '15.6" QHD 240Hz OLED' }, { key: 'GPU', value: 'RTX 4080' }, { key: 'Build', value: 'CNC Aluminum' }], featured: true, status: 'active', rating: 4.8, reviewCount: 34 },
      { id: 'prod_013', name: 'Lenovo Legion Pro 7i Gen 9', slug: 'legion-pro-7i-gen9', brand: 'Lenovo', category: 'laptop', price: 565000, originalPrice: 620000, stock: 7, lowStockThreshold: 3, primaryImage: 'https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?w=500', images: [], shortDescription: 'Workstation meets gaming beast', description: 'Incredible thermals and performance...', specifications: [{ key: 'Display', value: '16" WQXGA 240Hz' }, { key: 'GPU', value: 'RTX 4080' }, { key: 'Cooling', value: 'Legion Coldfront 5.0' }], featured: false, status: 'active', rating: 4.6, reviewCount: 56 },
      
      // More products...
    ];
    
    const now = new Date().toISOString();
    products.forEach(p => {
      p.createdAt = now;
      p.updatedAt = now;
      if (!p.id) p.id = Utils.generateId('prod');
    });
    
    Store.saveProducts(products);
  },
  
  seedSettings() {
    const settings = {
      storeName: 'GamersEdge',
      tagline: 'Dominate the Digital Realm',
      logo: 'assets/images/logo.webp',
      favicon: 'assets/images/favicon.jpg',
      email: 'sl.gamersedge@gmail.com',
      phone: '074 070 5733',
      phoneSecondary: '076 532 9455',
      address: '207/04/03/F/2, Wilimbula, Henegama, Wilimbula, Sri Lanka',
      coordinates: { lat: 7.026247, lng: 80.079536 },
      social: {
        facebook: 'https://www.facebook.com/profile.php?id=61580407830126'
      },
      currency: 'LKR',
      currencySymbol: 'Rs.',
      taxRate: 0,
      freeShippingThreshold: 50000,
      shippingRate: 2500,
      heroTitle: 'Build Your Dream Setup',
      heroSubtitle: 'Premium gaming hardware at unbeatable prices',
      heroCTA: 'Shop Now',
      heroBackground: 'assets/images/banner-main.jpg',
      featuredCount: 8,
      productsPerPage: 12,
      enableAnimations: true,
      theme: 'cyber'
    };
                  Store.saveSettings(settings);
                },
              
                seedOrders() {
                  const orders = [
                    { id: 'ord_001', customerName: 'Alice Smith', customerEmail: 'alice@example.com', createdAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(), total: 725000, status: 'delivered',
                      items: [{ id: 'prod_012', name: 'Razer Blade 15 (2024)', quantity: 1, price: 725000 }],
                      shippingAddress: '123 Gamers Lane, Colombo 00100'
                    },
                    { id: 'ord_002', customerName: 'Bob Johnson', customerEmail: 'bob@example.com', createdAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(), total: 210000, status: 'shipped',
                      items: [{ id: 'prod_006', name: 'Intel Core i9-14900K', quantity: 1, price: 210000 }],
                      shippingAddress: '456 Tech Road, Kandy 20000'
                    },
                    { id: 'ord_003', customerName: 'Charlie Brown', customerEmail: 'charlie@example.com', createdAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(), total: 115000, status: 'pending',
                      items: [{ id: 'prod_019', name: 'SteelSeries Arctis Nova Pro Wireless', quantity: 1, price: 115000 }],
                      shippingAddress: '789 Pixel Street, Galle 80000'
                    },
                    { id: 'ord_004', customerName: 'Diana Prince', customerEmail: 'diana@example.com', createdAt: new Date(Date.now() - 6 * 24 * 60 * 60 * 1000).toISOString(), total: 650000, status: 'delivered',
                      items: [{ id: 'prod_001', name: 'NVIDIA GeForce RTX 4090 Founders Edition', quantity: 1, price: 650000 }],
                      shippingAddress: '101 Wonder Ave, Jaffna 40000'
                    },
                    { id: 'ord_005', customerName: 'Clark Kent', customerEmail: 'clark@example.com', createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(), total: 72000, status: 'shipped',
                      items: [{ id: 'prod_022', name: 'Samsung 990 Pro 2TB NVMe', quantity: 1, price: 72000 }],
                      shippingAddress: '202 Daily Planet, Negombo'
                    }
                  ];
                  Store.saveOrders(orders);
                }
              };,
          
            seedOrders() {
              const orders = [
                { id: 'ord_001', customerName: 'Alice Smith', customerEmail: 'alice@example.com', createdAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(), total: 725000, status: 'delivered',
                  items: [{ id: 'prod_012', name: 'Razer Blade 15 (2024)', quantity: 1, price: 725000 }],
                  shippingAddress: '123 Gamers Lane, Colombo 00100'
                },
                { id: 'ord_002', customerName: 'Bob Johnson', customerEmail: 'bob@example.com', createdAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(), total: 210000, status: 'shipped',
                  items: [{ id: 'prod_006', name: 'Intel Core i9-14900K', quantity: 1, price: 210000 }],
                  shippingAddress: '456 Tech Road, Kandy 20000'
                },
                { id: 'ord_003', customerName: 'Charlie Brown', customerEmail: 'charlie@example.com', createdAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(), total: 115000, status: 'pending',
                  items: [{ id: 'prod_019', name: 'SteelSeries Arctis Nova Pro Wireless', quantity: 1, price: 115000 }],
                  shippingAddress: '789 Pixel Street, Galle 80000'
                },
                { id: 'ord_004', customerName: 'Diana Prince', customerEmail: 'diana@example.com', createdAt: new Date(Date.now() - 6 * 24 * 60 * 60 * 1000).toISOString(), total: 650000, status: 'delivered',
                  items: [{ id: 'prod_001', name: 'NVIDIA GeForce RTX 4090 Founders Edition', quantity: 1, price: 650000 }],
                  shippingAddress: '101 Wonder Ave, Jaffna 40000'
                },
                { id: 'ord_005', customerName: 'Clark Kent', customerEmail: 'clark@example.com', createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(), total: 72000, status: 'shipped',
                  items: [{ id: 'prod_022', name: 'Samsung 990 Pro 2TB NVMe', quantity: 1, price: 72000 }],
                  shippingAddress: '202 Daily Planet, Negombo'
                }
              ];
              Store.saveOrders(orders);
            }
          };,
    
      seedOrders() {
        const orders = [
          { id: 'ord_001', customerName: 'Alice Smith', customerEmail: 'alice@example.com', createdAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(), total: 725000, status: 'delivered',
            items: [{ id: 'prod_012', name: 'Razer Blade 15 (2024)', quantity: 1, price: 725000 }],
            shippingAddress: '123 Gamers Lane, Colombo 00100'
          },
          { id: 'ord_002', customerName: 'Bob Johnson', customerEmail: 'bob@example.com', createdAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(), total: 210000, status: 'shipped',
            items: [{ id: 'prod_006', name: 'Intel Core i9-14900K', quantity: 1, price: 210000 }],
            shippingAddress: '456 Tech Road, Kandy 20000'
          },
          { id: 'ord_003', customerName: 'Charlie Brown', customerEmail: 'charlie@example.com', createdAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(), total: 115000, status: 'pending',
            items: [{ id: 'prod_019', name: 'SteelSeries Arctis Nova Pro Wireless', quantity: 1, price: 115000 }],
            shippingAddress: '789 Pixel Street, Galle 80000'
          },
          { id: 'ord_004', customerName: 'Diana Prince', customerEmail: 'diana@example.com', createdAt: new Date(Date.now() - 6 * 24 * 60 * 60 * 1000).toISOString(), total: 650000, status: 'delivered',
            items: [{ id: 'prod_001', name: 'NVIDIA GeForce RTX 4090 Founders Edition', quantity: 1, price: 650000 }],
            shippingAddress: '101 Wonder Ave, Jaffna 40000'
          },
          { id: 'ord_005', customerName: 'Clark Kent', customerEmail: 'clark@example.com', createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(), total: 72000, status: 'shipped',
            items: [{ id: 'prod_022', name: 'Samsung 990 Pro 2TB NVMe', quantity: 1, price: 72000 }],
            shippingAddress: '202 Daily Planet, Negombo'
          }
        ];
        Store.saveOrders(orders);
      }
    };
    
    const Seeder = {
      run() {
        if (!Store.isSeeded()) {
          this.seedCategories();
          this.seedProducts();
          this.seedSettings();
          this.seedOrders(); // Add call to seed orders
          Store.setSeeded(true);
          console.log('🌱 Database seeded successfully');
        }
      },
