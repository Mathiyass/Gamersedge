// GamersEdge - Advanced Interactive JavaScript

// Global Variables
let cart = JSON.parse(localStorage.getItem('gamersedge-cart')) || [];
let isLoading = true;
let particles = [];
let musicPlaying = false;
let currentProductGallery = {
    images: [],
    currentIndex: 0
};

// Product Database
const products = {
    'rtx-4090': {
        name: 'NVIDIA RTX 4090',
        price: 1599,
        images: [
            'https://images.pexels.com/photos/2582937/pexels-photo-2582937.jpeg?auto=compress&cs=tinysrgb&w=400',
            'https://images.pexels.com/photos/2582937/pexels-photo-2582937.jpeg?auto=compress&cs=tinysrgb&w=400',
            'https://images.pexels.com/photos/2582937/pexels-photo-2582937.jpeg?auto=compress&cs=tinysrgb&w=400'
        ],
        description: 'The ultimate gaming graphics card with unparalleled performance for 4K gaming and ray tracing.',
        category: 'gpu'
    },
    'rtx-4080': {
        name: 'NVIDIA RTX 4080',
        price: 1199,
        images: ['https://images.pexels.com/photos/2582937/pexels-photo-2582937.jpeg?auto=compress&cs=tinysrgb&w=400'],
        description: 'High-performance graphics card perfect for 1440p and 4K gaming with excellent ray tracing capabilities.',
        category: 'gpu'
    },
    'gaming-pc-ultimate': {
        name: 'Ultimate Gaming PC',
        price: 2499,
        images: [
            'https://images.pexels.com/photos/2582937/pexels-photo-2582937.jpeg?auto=compress&cs=tinysrgb&w=400',
            'https://images.pexels.com/photos/2582937/pexels-photo-2582937.jpeg?auto=compress&cs=tinysrgb&w=400'
        ],
        description: 'Top-tier gaming PC with RTX 4090, Intel i9, 32GB RAM, and liquid cooling for maximum performance.',
        category: 'pc'
    },
    'gaming-pc-pro': {
        name: 'Pro Gaming PC',
        price: 1899,
        images: ['https://images.pexels.com/photos/2582937/pexels-photo-2582937.jpeg?auto=compress&cs=tinysrgb&w=400'],
        description: 'High-performance gaming PC with RTX 4080, Intel i7, 16GB RAM, perfect for competitive gaming.',
        category: 'pc'
    },
    'monitor-4k': {
        name: '4K Gaming Monitor 32"',
        price: 599,
        images: ['https://images.pexels.com/photos/1029757/pexels-photo-1029757.jpeg?auto=compress&cs=tinysrgb&w=400'],
        description: '32-inch 4K gaming monitor with 144Hz refresh rate, HDR support, and ultra-low input lag.',
        category: 'monitor'
    },
    'monitor-ultrawide': {
        name: 'Ultrawide Gaming Monitor',
        price: 799,
        images: ['https://images.pexels.com/photos/1029757/pexels-photo-1029757.jpeg?auto=compress&cs=tinysrgb&w=400'],
        description: '34-inch ultrawide curved gaming monitor with 165Hz refresh rate and G-Sync compatibility.',
        category: 'monitor'
    },
    'keyboard-mechanical': {
        name: 'RGB Mechanical Keyboard',
        price: 149,
        images: ['https://images.pexels.com/photos/2115257/pexels-photo-2115257.jpeg?auto=compress&cs=tinysrgb&w=400'],
        description: 'Premium mechanical gaming keyboard with RGB backlighting and programmable keys.',
        category: 'keyboard'
    },
    'headset-pro': {
        name: 'Pro Gaming Headset',
        price: 199,
        images: ['https://images.pexels.com/photos/3394650/pexels-photo-3394650.jpeg?auto=compress&cs=tinysrgb&w=400'],
        description: 'Professional gaming headset with 7.1 surround sound and noise-canceling microphone.',
        category: 'headset'
    },
    'cooling-liquid': {
        name: 'Liquid Cooling System',
        price: 299,
        images: ['https://images.pexels.com/photos/2582937/pexels-photo-2582937.jpeg?auto=compress&cs=tinysrgb&w=400'],
        description: 'Advanced liquid cooling system with RGB lighting and whisper-quiet operation.',
        category: 'cooling'
    },
    'gaming-mouse': {
        name: 'Gaming Mouse',
        price: 79,
        images: ['https://images.pexels.com/photos/2115257/pexels-photo-2115257.jpeg?auto=compress&cs=tinysrgb&w=400'],
        description: 'High-precision gaming mouse with RGB lighting and programmable buttons.',
        category: 'accessories'
    },
    'mouse-pad': {
        name: 'RGB Mouse Pad',
        price: 39,
        images: ['https://images.pexels.com/photos/2115257/pexels-photo-2115257.jpeg?auto=compress&cs=tinysrgb&w=400'],
        description: 'Large RGB mouse pad with smooth surface and customizable lighting.',
        category: 'accessories'
    },
    'webcam': {
        name: '4K Webcam',
        price: 129,
        images: ['https://images.pexels.com/photos/2115257/pexels-photo-2115257.jpeg?auto=compress&cs=tinysrgb&w=400'],
        description: '4K streaming webcam with auto-focus and built-in microphone.',
        category: 'accessories'
    },
    'cable-management': {
        name: 'Cable Management Kit',
        price: 25,
        images: ['https://images.pexels.com/photos/2115257/pexels-photo-2115257.jpeg?auto=compress&cs=tinysrgb&w=400'],
        description: 'Complete cable management solution for clean PC builds.',
        category: 'accessories'
    }
};

// DOM Content Loaded
document.addEventListener('DOMContentLoaded', function() {
    initializeWebsite();
});

// Initialize Website
function initializeWebsite() {
    // Initialize components
    initializeTooltips();
    initializeLiveSearch();
    // Loading Screen
    if (document.getElementById('loading-screen')) {
        // Total animation time for "GAMERSEDGE" to write out is 1s.
        // Let it display for a bit, then fade out.
        setTimeout(() => {
            hideLoadingScreen();
        }, 2500); // Wait for the animation to play out
    }

    // Initialize components
    initializeCursor();
    initializeNavigation();
    initializeClock();
    initializeParticles();
    initializeScrollAnimations();
    initializeParallax();
    initializeCart();
    initializeTilt();
    initializeModals();
    initializeFilters();
    initializeForms();
    initializeFAQ();
    initializeStats();
    initializeMusic();
    
    // Page-specific initializations
    const currentPage = getCurrentPage();
    switch(currentPage) {
        case 'products':
            initializeProductSearch();
            break;
        case 'cart':
            renderCartItems();
            break;
        case 'checkout':
            initializeCheckout();
            break;
    }

    // Back to top button
    initializeBackToTop();
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

// Initialize Navigation
function initializeNavigation() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    const navbar = document.getElementById('navbar');

    // Mobile menu toggle
    if (hamburger && navMenu) {
        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
        });

        // Close menu when clicking on links
        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', () => {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
            });
        });
    }

    // Navbar scroll effect
    if (navbar) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 100) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
        });
    }
}

// Initialize Live Clock
function initializeClock() {
    const clockElement = document.getElementById('live-clock');
    if (!clockElement) return;

    function updateClock() {
        const now = new Date();
        const timeString = now.toLocaleTimeString('en-US', {
            hour12: false,
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit'
        });
        const dateString = now.toLocaleDateString('en-US', {
            weekday: 'short',
            month: 'short',
            day: 'numeric'
        });
        clockElement.textContent = `${dateString} ${timeString}`;
    }

    updateClock();
    setInterval(updateClock, 1000);
}

// Initialize Particles
function initializeParticles() {
    const particleContainers = document.querySelectorAll('.particles-container, .particles-bg, .footer-particles');
    
    particleContainers.forEach(container => {
        createParticles(container);
    });
}

// Create Particles
function createParticles(container) {
    const particleCount = 50;
    
    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        
        const size = Math.random() * 4 + 1;
        const x = Math.random() * 100;
        const y = Math.random() * 100;
        const duration = Math.random() * 3 + 2;
        const delay = Math.random() * 2;
        
        particle.style.cssText = `
            width: ${size}px;
            height: ${size}px;
            left: ${x}%;
            top: ${y}%;
            animation-duration: ${duration}s;
            animation-delay: ${delay}s;
        `;
        
        container.appendChild(particle);
    }
}

// Initialize Scroll Animations
function initializeScrollAnimations() {
    gsap.registerPlugin(ScrollTrigger);

    // Fade in animation
    gsap.utils.toArray('.gsap-fade-in').forEach(el => {
        gsap.from(el, {
            opacity: 0,
            y: 50,
            duration: 1,
            scrollTrigger: {
                trigger: el,
                start: 'top 80%',
                toggleActions: 'play none none none'
            }
        });
    });

    // Slide from left animation
    gsap.utils.toArray('.gsap-slide-from-left').forEach(el => {
        gsap.from(el, {
            opacity: 0,
            x: -100,
            duration: 1,
            scrollTrigger: {
                trigger: el,
                start: 'top 80%',
                toggleActions: 'play none none none'
            }
        });
    });

    // Slide from right animation
    gsap.utils.toArray('.gsap-slide-from-right').forEach(el => {
        gsap.from(el, {
            opacity: 0,
            x: 100,
            duration: 1,
            scrollTrigger: {
                trigger: el,
                start: 'top 80%',
                toggleActions: 'play none none none'
            }
        });
    });

    // Zoom in animation
    gsap.utils.toArray('.gsap-zoom-in').forEach(el => {
        gsap.from(el, {
            opacity: 0,
            scale: 0.8,
            duration: 1,
            scrollTrigger: {
                trigger: el,
                start: 'top 80%',
                toggleActions: 'play none none none'
            }
        });
    });

    // Staggered slide-in for feature cards
    gsap.from(".animated-feature-card", {
        scrollTrigger: {
            trigger: ".features-grid",
            start: "top 80%",
            toggleActions: "play none none none"
        },
        y: 100,
        opacity: 0,
        stagger: 0.2,
        duration: 0.8,
        ease: "power2.out"
    });
}

// Initialize Parallax Effect
function initializeParallax() {
    gsap.utils.toArray('.hero').forEach(hero => {
        gsap.to(hero, {
            backgroundPosition: '50% 100%',
            ease: 'none',
            scrollTrigger: {
                trigger: hero,
                start: 'top top',
                end: 'bottom top',
                scrub: true
            }
        });
    });

    gsap.utils.toArray('.page-header').forEach(header => {
        gsap.to(header, {
            backgroundPosition: '50% 100%',
            ease: 'none',
            scrollTrigger: {
                trigger: header,
                start: 'top top',
                end: 'bottom top',
                scrub: true
            }
        });
    });
}

// Initialize Cart
function initializeCart() {
    updateCartCount();
    
    // Add to cart buttons
    document.querySelectorAll('.add-to-cart').forEach(button => {
        button.addEventListener('click', (e) => {
            e.preventDefault();
            const productId = button.getAttribute('data-product');
            addToCart(productId);
        });
    });

    // Clear cart button
    const clearCartBtn = document.getElementById('clear-cart');
    if (clearCartBtn) {
        clearCartBtn.addEventListener('click', clearCart);
    }
}

// Add to Cart
function addToCart(productId) {
    const product = products[productId];
    if (!product) return;

    const existingItem = cart.find(item => item.id === productId);
    
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({
            id: productId,
            name: product.name,
            price: product.price,
            image: product.images[0], // Use the first image as the thumbnail
            quantity: 1
        });
    }

    localStorage.setItem('gamersedge-cart', JSON.stringify(cart));
    updateCartCount();
    showCartNotification(product.name);
}

// Remove from Cart
function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId);
    localStorage.setItem('gamersedge-cart', JSON.stringify(cart));
    updateCartCount();
    renderCartItems();
}

// Update Cart Quantity
function updateCartQuantity(productId, quantity) {
    const item = cart.find(item => item.id === productId);
    if (item) {
        item.quantity = Math.max(1, quantity);
        localStorage.setItem('gamersedge-cart', JSON.stringify(cart));
        updateCartCount();
        renderCartItems();
    }
}

// Clear Cart
function clearCart() {
    cart = [];
    localStorage.setItem('gamersedge-cart', JSON.stringify(cart));
    updateCartCount();
    renderCartItems();
}

// Update Cart Count
function updateCartCount() {
    const cartCount = document.getElementById('cart-count');
    if (cartCount) {
        const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
        cartCount.textContent = totalItems;
    }
}

// Show Cart Notification
function showCartNotification(productName) {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = 'cart-notification';
    notification.innerHTML = `
        <i class="fas fa-check-circle"></i>
        <span>${productName} added to cart!</span>
    `;
    
    // Add styles
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: var(--gradient-primary);
        color: var(--secondary-color);
        padding: 1rem 1.5rem;
        border-radius: var(--border-radius);
        box-shadow: var(--shadow-glow);
        z-index: 10000;
        transform: translateX(100%);
        transition: transform 0.3s ease;
        display: flex;
        align-items: center;
        gap: 0.5rem;
        font-weight: bold;
    `;
    
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Animate out and remove
    setTimeout(() => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 3000);
}

// Render Cart Items
function renderCartItems() {
    const cartItemsContainer = document.getElementById('cart-items');
    const emptyCart = document.getElementById('empty-cart');
    
    if (!cartItemsContainer) return;

    if (cart.length === 0) {
        cartItemsContainer.style.display = 'none';
        if (emptyCart) emptyCart.style.display = 'block';
        updateCartSummary();
        return;
    }

    cartItemsContainer.style.display = 'block';
    if (emptyCart) emptyCart.style.display = 'none';

    cartItemsContainer.innerHTML = cart.map(item => `
        <div class="cart-item">
            <div class="cart-item-image">
                <img src="${item.image}" alt="${item.name}">
            </div>
            <div class="cart-item-details">
                <h3>${item.name}</h3>
                <p class="cart-item-price">$${item.price}</p>
            </div>
            <div class="cart-item-controls">
                <div class="quantity-controls">
                    <button class="quantity-btn" onclick="updateCartQuantity('${item.id}', ${item.quantity - 1})">-</button>
                    <input type="number" class="quantity-input" value="${item.quantity}" min="1" 
                           onchange="updateCartQuantity('${item.id}', parseInt(this.value))">
                    <button class="quantity-btn" onclick="updateCartQuantity('${item.id}', ${item.quantity + 1})">+</button>
                </div>
                <button class="remove-btn" onclick="removeFromCart('${item.id}')">
                    <i class="fas fa-trash"></i>
                </button>
            </div>
        </div>
    `).join('');

    updateCartSummary();
}

// Update Cart Summary
function updateCartSummary() {
    const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const shipping = subtotal > 0 ? 25 : 0;
    const tax = subtotal * 0.08;
    const total = subtotal + shipping + tax;

    // Update summary elements
    const elements = {
        'cart-subtotal': `$${subtotal.toFixed(2)}`,
        'cart-shipping': `$${shipping.toFixed(2)}`,
        'cart-tax': `$${tax.toFixed(2)}`,
        'cart-total': `$${total.toFixed(2)}`,
        'checkout-subtotal': `$${subtotal.toFixed(2)}`,
        'checkout-shipping': `$${shipping.toFixed(2)}`,
        'checkout-tax': `$${tax.toFixed(2)}`,
        'checkout-total': `$${total.toFixed(2)}`
    };

    Object.entries(elements).forEach(([id, value]) => {
        const element = document.getElementById(id);
        if (element) element.textContent = value;
    });
}

// Initialize Tilt Effect
function initializeTilt() {
    const tiltElements = document.querySelectorAll('[data-tilt]');
    
    tiltElements.forEach(element => {
        element.addEventListener('mousemove', (e) => {
            const rect = element.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const rotateX = (y - centerY) / 10;
            const rotateY = (centerX - x) / 10;
            
            element.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.05, 1.05, 1.05)`;
        });
        
        element.addEventListener('mouseleave', () => {
            element.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
        });
    });
}

// Initialize Modals
function initializeModals() {
    // Product modal
    const productModal = document.getElementById('product-modal');
    const checkoutModal = document.getElementById('checkout-modal');
    
    // View details buttons
    document.querySelectorAll('.view-details').forEach(button => {
        button.addEventListener('click', (e) => {
            e.preventDefault();
            const productId = button.getAttribute('data-product');
            showProductModal(productId);
        });
    });

    // Checkout button
    const checkoutBtn = document.getElementById('checkout-btn');
    if (checkoutBtn) {
        checkoutBtn.addEventListener('click', () => {
            if (cart.length === 0) {
                alert('Your cart is empty!');
                return;
            }
            showCheckoutModal();
        });
    }

    // Close modal buttons
    document.querySelectorAll('.close-modal').forEach(button => {
        button.addEventListener('click', closeModals);
    });

    // Close modal on outside click
    window.addEventListener('click', (e) => {
        if (e.target.classList.contains('modal')) {
            closeModals();
        }
    });

    // Gallery navigation
    const prevBtn = document.getElementById('modal-prev-btn');
    const nextBtn = document.getElementById('modal-next-btn');

    if (prevBtn && nextBtn) {
        prevBtn.addEventListener('click', () => {
            currentProductGallery.currentIndex--;
            if (currentProductGallery.currentIndex < 0) {
                currentProductGallery.currentIndex = currentProductGallery.images.length - 1;
            }
            updateModalImage();
        });

        nextBtn.addEventListener('click', () => {
            currentProductGallery.currentIndex++;
            if (currentProductGallery.currentIndex >= currentProductGallery.images.length) {
                currentProductGallery.currentIndex = 0;
            }
            updateModalImage();
        });
    }
}

// Show Product Modal
function showProductModal(productId) {
    const product = products[productId];
    if (!product) return;

    const modal = document.getElementById('product-modal');
    if (!modal) return;

    // Initialize gallery state
    currentProductGallery.images = product.images;
    currentProductGallery.currentIndex = 0;

    // Update static content
    document.getElementById('modal-product-name').textContent = product.name;
    document.getElementById('modal-product-price').textContent = `$${product.price}`;
    document.getElementById('modal-product-description').textContent = product.description;

    // Update rating (dummy 5 stars for now)
    const ratingContainer = document.getElementById('modal-product-rating');
    ratingContainer.innerHTML = Array(5).fill('<i class="fas fa-star"></i>').join('');

    // Update add to cart button
    const addToCartBtn = document.getElementById('add-to-cart-modal');
    addToCartBtn.onclick = () => {
        addToCart(productId);
        closeModals();
    };

    // Update thumbnails
    const thumbnailsContainer = document.getElementById('modal-thumbnails');
    thumbnailsContainer.innerHTML = product.images.map((img, index) => `
        <div class="modal-thumbnail" data-index="${index}">
            <img src="${img}" alt="Thumbnail ${index + 1}">
        </div>
    `).join('');

    thumbnailsContainer.addEventListener('click', (e) => {
        const thumb = e.target.closest('.modal-thumbnail');
        if (thumb) {
            currentProductGallery.currentIndex = parseInt(thumb.dataset.index);
            updateModalImage();
        }
    });

    // Update image and controls
    updateModalImage();

    modal.style.display = 'block';
}

// Update Modal Image
function updateModalImage() {
    const { images, currentIndex } = currentProductGallery;

    const imageElement = document.getElementById('modal-product-image');
    const counterElement = document.getElementById('modal-counter');
    const prevBtn = document.getElementById('modal-prev-btn');
    const nextBtn = document.getElementById('modal-next-btn');
    const thumbnails = document.querySelectorAll('.modal-thumbnail');

    if (images.length > 1) {
        imageElement.src = images[currentIndex];
        counterElement.textContent = `${currentIndex + 1} / ${images.length}`;
        counterElement.style.display = 'block';
        prevBtn.style.display = 'flex';
        nextBtn.style.display = 'flex';
    } else {
        imageElement.src = images[0];
        counterElement.style.display = 'none';
        prevBtn.style.display = 'none';
        nextBtn.style.display = 'none';
    }

    // Update active thumbnail
    thumbnails.forEach((thumb, index) => {
        thumb.classList.toggle('active', index === currentIndex);
    });
}

// Show Checkout Modal
function showCheckoutModal() {
    const modal = document.getElementById('checkout-modal');
    if (!modal) return;

    // Update checkout items review
    const reviewContainer = document.getElementById('checkout-items-review');
    if (reviewContainer) {
        reviewContainer.innerHTML = cart.map(item => `
            <div class="checkout-item">
                <span>${item.name} x${item.quantity}</span>
                <span>$${(item.price * item.quantity).toFixed(2)}</span>
            </div>
        `).join('');
    }

    updateCartSummary();
    modal.style.display = 'block';
}

// Close Modals
function closeModals() {
    document.querySelectorAll('.modal').forEach(modal => {
        modal.style.display = 'none';
    });
}

// Initialize Filters
function initializeFilters() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const productCards = document.querySelectorAll('.product-card');

    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            const filter = button.getAttribute('data-filter');
            
            // Update active button
            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            
            // Filter products
            productCards.forEach(card => {
                const category = card.getAttribute('data-category');
                if (filter === 'all' || category === filter) {
                    card.style.display = 'block';
                    card.classList.add('fade-in');
                } else {
                    card.style.display = 'none';
                }
            });
        });
    });
}

// Initialize Product Search
function initializeProductSearch() {
    const searchInput = document.getElementById('search-input');
    if (!searchInput) return;

    searchInput.addEventListener('input', (e) => {
        const searchTerm = e.target.value.toLowerCase();
        const productCards = document.querySelectorAll('.product-card');

        productCards.forEach(card => {
            const productName = card.querySelector('h3').textContent.toLowerCase();
            if (productName.includes(searchTerm)) {
                card.style.display = 'block';
            } else {
                card.style.display = 'none';
            }
        });
    });
}

// Initialize Forms
function initializeForms() {
    // Contact form
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', handleContactForm);
    }

    // Checkout form
    const checkoutForm = document.getElementById('checkout-form');
    if (checkoutForm) {
        initializeCheckoutSteps();
        checkoutForm.addEventListener('submit', handleCheckoutForm);
    }

    // Newsletter form
    document.querySelectorAll('.newsletter-btn').forEach(btn => {
        btn.addEventListener('click', handleNewsletterSignup);
    });

    // Promo code
    const applyPromoBtn = document.getElementById('apply-promo');
    if (applyPromoBtn) {
        applyPromoBtn.addEventListener('click', applyPromoCode);
    }
}

// Handle Contact Form
function handleContactForm(e) {
    e.preventDefault();
    const submitBtn = e.target.querySelector('.submit-btn');
    
    // Show loading state
    submitBtn.classList.add('loading');
    
    // Simulate form submission
    setTimeout(() => {
        submitBtn.classList.remove('loading');
        alert('Thank you for your message! We\'ll get back to you soon.');
        e.target.reset();
    }, 2000);
}

// Initialize Checkout Steps
function initializeCheckoutSteps() {
    const steps = document.querySelectorAll('.step');
    const sections = document.querySelectorAll('.checkout-section');
    const nextBtns = document.querySelectorAll('.next-step');
    const prevBtns = document.querySelectorAll('.prev-step');
    
    let currentStep = 0;

    function showStep(stepIndex) {
        // Update step indicators
        steps.forEach((step, index) => {
            step.classList.toggle('active', index <= stepIndex);
        });

        // Update sections
        sections.forEach((section, index) => {
            section.classList.toggle('active', index === stepIndex);
        });
    }

    nextBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            if (currentStep < sections.length - 1) {
                currentStep++;
                showStep(currentStep);
            }
        });
    });

    prevBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            if (currentStep > 0) {
                currentStep--;
                showStep(currentStep);
            }
        });
    });
}

// Handle Checkout Form
function handleCheckoutForm(e) {
    e.preventDefault();
    
    // Simulate order processing
    const placeOrderBtn = e.target.querySelector('.place-order');
    placeOrderBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Processing...';
    
    setTimeout(() => {
        alert('Order placed successfully! Thank you for your purchase.');
        clearCart();
        closeModals();
        placeOrderBtn.innerHTML = '<i class="fas fa-lock"></i> Place Order';
    }, 3000);
}

// Handle Newsletter Signup
function handleNewsletterSignup(e) {
    const input = e.target.previousElementSibling;
    const email = input.value;
    
    if (email && email.includes('@')) {
        alert('Thank you for subscribing to our newsletter!');
        input.value = '';
    } else {
        alert('Please enter a valid email address.');
    }
}

// Apply Promo Code
function applyPromoCode() {
    const promoInput = document.getElementById('promo-input');
    const promoCode = promoInput.value.toUpperCase();
    
    const validCodes = {
        'GAMER10': 0.1,
        'WELCOME20': 0.2,
        'SAVE15': 0.15
    };
    
    if (validCodes[promoCode]) {
        alert(`Promo code applied! You saved ${validCodes[promoCode] * 100}%`);
        promoInput.value = '';
        // Update cart summary with discount
        updateCartSummary();
    } else {
        alert('Invalid promo code. Please try again.');
    }
}

// Initialize FAQ
function initializeFAQ() {
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        question.addEventListener('click', () => {
            const isActive = item.classList.contains('active');
            
            // Close all FAQ items
            faqItems.forEach(faq => faq.classList.remove('active'));
            
            // Open clicked item if it wasn't active
            if (!isActive) {
                item.classList.add('active');
            }
        });
    });
}

// Initialize Stats Counter
function initializeStats() {
    const statNumbers = document.querySelectorAll('.stat-number');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const target = parseInt(entry.target.getAttribute('data-target'));
                animateCounter(entry.target, target);
                observer.unobserve(entry.target);
            }
        });
    });

    statNumbers.forEach(stat => {
        observer.observe(stat);
    });
}

// Animate Counter
function animateCounter(element, target) {
    let current = 0;
    const increment = target / 100;
    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            current = target;
            clearInterval(timer);
        }
        element.textContent = Math.floor(current);
    }, 20);
}

// Initialize Music
function initializeMusic() {
    const musicToggle = document.getElementById('music-toggle');
    if (!musicToggle) return;

    // NOTE: Replace with a real, copyright-free audio file URL
    const musicUrl = 'https://archive.org/download/cyberpunk-underground/cyberpunk-underground.mp3';
    const audio = new Audio(musicUrl);
    audio.loop = true;
    audio.volume = 0.3; // Start with a lower volume

    musicToggle.addEventListener('click', () => {
        if (musicPlaying) {
            audio.pause();
            musicToggle.classList.remove('playing');
            musicPlaying = false;
        } else {
            audio.play().catch(error => {
                console.error("Audio playback failed:", error);
                // Autoplay is often blocked by browsers, we can't do much here.
                // The user has to interact with the page first.
            });
            musicToggle.classList.add('playing');
            musicPlaying = true;
        }
    });
}

// Initialize Back to Top
function initializeBackToTop() {
    const backToTopBtn = document.getElementById('back-to-top');
    if (!backToTopBtn) return;

    window.addEventListener('scroll', () => {
        if (window.scrollY > 300) {
            backToTopBtn.classList.add('visible');
        } else {
            backToTopBtn.classList.remove('visible');
        }
    });

    backToTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// Smooth Scrolling for Anchor Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Initialize Checkout (for cart page)
function initializeCheckout() {
    // This function handles checkout-specific functionality
    updateCartSummary();
}

// Initialize Custom Cursor
function initializeCursor() {
    const cursorDot = document.querySelector('[data-cursor-dot]');
    const cursorOutline = document.querySelector('[data-cursor-outline]');

    window.addEventListener('mousemove', function(e) {
        const posX = e.clientX;
        const posY = e.clientY;

        cursorDot.style.left = `${posX}px`;
        cursorDot.style.top = `${posY}px`;

        cursorOutline.animate({
            left: `${posX}px`,
            top: `${posY}px`
        }, { duration: 500, fill: 'forwards' });
    });

    document.querySelectorAll('a, button').forEach(el => {
        el.addEventListener('mouseover', () => {
            cursorOutline.style.transform = 'scale(1.5)';
        });
        el.addEventListener('mouseleave', () => {
            cursorOutline.style.transform = 'scale(1)';
        });
    });
}

// Initialize Live Search
function initializeLiveSearch() {
    const searchIcon = document.getElementById('search-icon');
    const searchContainer = document.querySelector('.search-input-container');
    const searchInput = document.getElementById('nav-search-input');
    const searchResults = document.getElementById('nav-search-results');

    if (!searchIcon) return;

    searchIcon.addEventListener('click', (e) => {
        e.stopPropagation();
        searchContainer.classList.toggle('active');
        if (searchContainer.classList.contains('active')) {
            searchInput.focus();
        }
    });

    searchInput.addEventListener('input', () => {
        const searchTerm = searchInput.value.toLowerCase();
        if (searchTerm.length < 2) {
            searchResults.innerHTML = '';
            return;
        }

        const results = Object.entries(products).filter(([id, product]) => {
            return product.name.toLowerCase().includes(searchTerm);
        });

        if (results.length > 0) {
            searchResults.innerHTML = results.map(([id, product]) => {
                return `<a href="products.html#${id}">${product.name}</a>`;
            }).join('');
        } else {
            searchResults.innerHTML = '<a>No results found</a>';
        }
    });

    document.addEventListener('click', (e) => {
        if (!searchContainer.contains(e.target)) {
            searchContainer.classList.remove('active');
        }
    });
}

// Initialize Tooltips
function initializeTooltips() {
    document.querySelectorAll('[data-tooltip]').forEach(el => {
        const tooltipText = el.getAttribute('data-tooltip');
        const tooltip = document.createElement('span');
        tooltip.className = 'tooltip';
        tooltip.textContent = tooltipText;
        el.appendChild(tooltip);
    });
}

// Utility Functions
function formatPrice(price) {
    return `$${price.toFixed(2)}`;
}

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

// Export functions for global access
window.addToCart = addToCart;
window.removeFromCart = removeFromCart;
window.updateCartQuantity = updateCartQuantity;
window.clearCart = clearCart;