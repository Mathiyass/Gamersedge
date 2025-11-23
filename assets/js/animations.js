// animations.js - GSAP Animation System

const Animations = {
  // Initialize all animations
  init() {
    this.initLoadingScreen();
    this.initScrollAnimations();
    this.initNavbarScroll();
    this.init3DCards();
    this.initMagneticButtons();
  },
  
  // Loading Screen
  initLoadingScreen() {
    const loader = document.getElementById('loading-screen');
    if (!loader) return;

    const logo = document.querySelector('.loader-logo');
    const progressBar = document.querySelector('.loader-progress');
    const percentageText = document.getElementById('loader-percentage');
    const tasks = gsap.utils.toArray('.loader-task');
    const skipBtn = document.getElementById('skip-loader');

    const logoPulse = gsap.to(logo, {
        scale: 1.1,
        duration: 0.5,
        repeat: -1,
        yoyo: true,
        ease: 'power2.inOut'
    });

    const finishLoading = () => {
        logoPulse.kill();
        gsap.to(loader, {
            opacity: 0,
            duration: 0.5,
            onComplete: () => {
                loader.style.display = 'none';
                this.animatePageIn();
            }
        });
    };

    const tl = gsap.timeline({
        onComplete: finishLoading
    });

    let progress = { value: 0 };
    tl.to(progress, {
        value: 100,
        duration: 3,
        ease: 'power2.out',
        onUpdate: () => {
            progressBar.style.width = `${progress.value}%`;
            percentageText.textContent = `${Math.round(progress.value)}%`;
        }
    }, 0);

    tl.to(tasks[0], { opacity: 1, y: 0, duration: 0.3 }, 0.5)
      .to(tasks[1], { opacity: 1, y: 0, duration: 0.3 }, 1.5)
      .to(tasks[2], { opacity: 1, y: 0, duration: 0.3 }, 2.5);

    tl.to(skipBtn, { opacity: 1, duration: 0.5 }, 2);

    skipBtn.addEventListener('click', () => {
        tl.kill();
        finishLoading();
    });
  },
  
  // Page entrance animation
  animatePageIn() {
    gsap.from('header', { y: -100, opacity: 0, duration: 0.8, ease: 'power3.out' });
    gsap.utils.toArray('main > section').forEach(section => {
        gsap.from(section, {
            y: 50,
            opacity: 0,
            duration: 0.8,
            ease: 'power3.out',
            scrollTrigger: {
                trigger: section,
                start: 'top 95%',
                toggleActions: 'play none none reverse'
            }
        });
    });
  },
  
  // Scroll-triggered animations
  initScrollAnimations() {
    gsap.registerPlugin(ScrollTrigger);
    
    // Fade up elements
    gsap.utils.toArray('.animate-on-scroll').forEach(el => {
      gsap.from(el, {
        scrollTrigger: {
          trigger: el,
          start: 'top 85%',
          toggleActions: 'play none none reverse'
        },
        y: 60,
        opacity: 0,
        duration: 0.8,
        ease: 'power3.out'
      });
    });
    
    // Stagger children
    gsap.utils.toArray('.stagger-children').forEach(container => {
      gsap.from(container.children, {
        scrollTrigger: {
          trigger: container,
          start: 'top 80%'
        },
        y: 40,
        opacity: 0,
        duration: 0.6,
        stagger: 0.1,
        ease: 'power3.out'
      });
    });
  },
  
  // Navbar blur on scroll
  initNavbarScroll() {
    const navbar = document.querySelector('header');
    if (!navbar) return;
    
    ScrollTrigger.create({
      start: 'top -50px',
      end: 99999,
      onUpdate: (self) => {
        const { direction, scrollY } = self;
        if (scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
      }
    });
  },
  
  // 3D Card Tilt Effect
  init3DCards() {
    document.querySelectorAll('.product-card').forEach(card => {
      card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        const rotateX = (y - centerY) / 10;
        const rotateY = (centerX - x) / -10; // Invert for natural feel
        
        gsap.to(card, {
          rotateX: rotateX,
          rotateY: rotateY,
          duration: 0.3,
          ease: 'power2.out',
          transformPerspective: 1000
        });
      });
      
      card.addEventListener('mouseleave', () => {
        gsap.to(card, {
          rotateX: 0,
          rotateY: 0,
          duration: 0.5,
          ease: 'power2.out'
        });
      });
    });
  },
  
  // Magnetic Buttons
  initMagneticButtons() {
    document.querySelectorAll('.magnetic-btn').forEach(btn => {
      btn.addEventListener('mousemove', (e) => {
        const rect = btn.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;
        
        gsap.to(btn, {
          x: x * 0.3,
          y: y * 0.3,
          duration: 0.3,
          ease: 'power2.out'
        });
      });
      
      btn.addEventListener('mouseleave', () => {
        gsap.to(btn, { x: 0, y: 0, duration: 0.5, ease: 'elastic.out(1, 0.3)' });
      });
    });
  },
  
  // Flying cart animation
  flyToCart(element) {
    const cart = document.querySelector('#cart-icon');
    if(!element || !cart) return;

    const rect = element.getBoundingClientRect();
    const cartRect = cart.getBoundingClientRect();
    
    const clone = document.createElement('div');
    clone.innerHTML = element.outerHTML;
    const cloneEl = clone.firstChild;

    cloneEl.style.cssText = `
      position: fixed;
      top: ${rect.top}px;
      left: ${rect.left}px;
      width: ${rect.width}px;
      height: ${rect.height}px;
      z-index: 9999;
      pointer-events: none;
      border-radius: 8px;
      margin: 0;
    `;
    document.body.appendChild(cloneEl);
    
    gsap.to(cloneEl, {
      x: cartRect.left - rect.left + (cartRect.width/2) - (rect.width/2),
      y: cartRect.top - rect.top + (cartRect.height/2) - (rect.height/2),
      scale: 0.1,
      opacity: 0.5,
      duration: 0.8,
      ease: 'power2.in',
      onComplete: () => {
        cloneEl.remove();
        gsap.fromTo(cart, { scale: 1.5 }, { scale: 1, duration: 0.3, ease: 'back.out(1.7)' });
      }
    });
  }
};
