// UI Module

export function initializeUI(products) {
    initializeTooltips();
    initializeLiveSearch(products);
    initializeCursor();
    initializeNavigation();
    initializeClock();
    initializeParticles();
    initializeScrollAnimations();
    initializeParallax();
    initializeTilt();
    initializeModals(products);
    initializeFilters();
    initializeForms();
    initializeFAQ();
    initializeStats();
    initializeMusic();
    initializeBackToTop();
}

function initializeTooltips() {
    document.querySelectorAll('[data-tooltip]').forEach(el => {
        const tooltipText = el.getAttribute('data-tooltip');
        const tooltip = document.createElement('span');
        tooltip.className = 'tooltip';
        tooltip.textContent = tooltipText;
        el.appendChild(tooltip);
    });
}

function initializeLiveSearch(products) {
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

function initializeParticles() {
    const particleContainers = document.querySelectorAll('.particles-container, .particles-bg, .footer-particles');

    particleContainers.forEach(container => {
        createParticles(container);
    });
}

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

function initializeModals(products) {
    // Product modal
    const productModal = document.getElementById('product-modal');
    const checkoutModal = document.getElementById('checkout-modal');

    // View details buttons
    document.querySelectorAll('.view-details').forEach(button => {
        button.addEventListener('click', (e) => {
            e.preventDefault();
            const productId = button.getAttribute('data-product');
            showProductModal(productId, products);
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

function closeModals() {
    document.querySelectorAll('.modal').forEach(modal => {
        modal.style.display = 'none';
    });
}
