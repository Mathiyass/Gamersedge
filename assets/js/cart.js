// cart.js - Complete Cart Management

const Cart = {
  items: [],
  
  init() {
    this.items = Store.getCart();
    this.updateUI();
    this.initDrawer();
  },
  
  save() {
    Store.saveCart(this.items);
    this.updateUI();
  },
  
  add(product, quantity = 1) {
    if (!product || !product.id) {
        console.error("Invalid product added to cart:", product);
        return;
    }
    const existing = this.items.find(item => item.id === product.id);
    
    if (existing) {
      existing.quantity += quantity;
    } else {
      this.items.push({ ...product, quantity });
    }
    
    this.save();
    Utils.showToast(`${product.name} added to cart!`, 'success');
  },
  
  remove(productId) {
    const item = this.items.find(i => i.id === productId);
    this.items = this.items.filter(i => i.id !== productId);
    this.save();
    if(item) Utils.showToast(`${item.name} removed from cart.`, 'info');
  },
  
  updateQuantity(productId, quantity) {
    const item = this.items.find(i => i.id === productId);
    if (item) {
      item.quantity = Math.max(0, quantity);
      if(item.quantity === 0) {
          this.remove(productId);
      } else {
          this.save();
      }
    }
  },
  
  getTotal() {
    return this.items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  },
  
  getCount() {
    return this.items.reduce((sum, item) => sum + item.quantity, 0);
  },
  
  clear() {
    this.items = [];
    this.save();
  },
  
  updateUI() {
    // Update cart count badge
    document.querySelectorAll('.cart-count').forEach(el => {
      const count = this.getCount();
      el.textContent = count;
      el.style.display = count > 0 ? 'flex' : 'none';
      if (count > 0) {
        gsap.fromTo(el, {scale: 1.5}, {scale: 1, duration: 0.3, ease: 'back.out(1.7)'});
      }
    });
    
    // Update cart drawer contents
    this.renderDrawer();
  },
  
  initDrawer() {
    const drawer = document.getElementById('cart-drawer');
    const overlay = document.getElementById('cart-overlay');
    
    document.querySelectorAll('[data-open-cart]').forEach(btn => {
      btn.addEventListener('click', () => this.openDrawer());
    });
    
    document.querySelectorAll('[data-close-cart]').forEach(btn => {
      btn.addEventListener('click', () => this.closeDrawer());
    });
    
    if(overlay) overlay.addEventListener('click', () => this.closeDrawer());
  },
  
  openDrawer() {
    const drawer = document.getElementById('cart-drawer');
    const overlay = document.getElementById('cart-overlay');
    
    if(drawer) drawer.classList.remove('translate-x-full');
    if(overlay) overlay.classList.remove('opacity-0', 'pointer-events-none');
    document.body.style.overflow = 'hidden';
  },
  
  closeDrawer() {
    const drawer = document.getElementById('cart-drawer');
    const overlay = document.getElementById('cart-overlay');
    
    if(drawer) drawer.classList.add('translate-x-full');
    if(overlay) overlay.classList.add('opacity-0', 'pointer-events-none');
    document.body.style.overflow = '';
  },
  
  renderDrawer() {
    const container = document.getElementById('cart-items');
    if (!container) return;
    
    if (this.items.length === 0) {
      container.innerHTML = `
        <div class="flex flex-col items-center justify-center h-full text-center">
          <i data-lucide="shopping-cart" class="w-24 h-24 text-text-muted mb-4"></i>
          <p class="text-text-secondary text-lg">Your cart is empty</p>
          <a href="shop.html" class="mt-4 text-neon-cyan hover:underline font-semibold">Start Shopping</a>
        </div>
      `;
    } else {
        container.innerHTML = this.items.map(item => `
        <div class="flex gap-4 p-4 bg-surface rounded-lg mb-4" data-cart-item="${item.id}">
          <img src="${item.primaryImage}" alt="${item.name}" class="w-20 h-20 object-cover rounded-lg">
          <div class="flex-1">
            <h4 class="text-white font-medium text-sm">${Utils.truncate(item.name, 30)}</h4>
            <p class="text-neon-cyan font-mono text-sm">${Utils.formatLKR(item.price)}</p>
            <div class="flex items-center gap-2 mt-2">
              <button onclick="Cart.updateQuantity('${item.id}', ${item.quantity - 1})" 
                class="w-7 h-7 rounded bg-surface-light flex items-center justify-center text-text-muted hover:bg-neon-cyan hover:text-void transition-colors">-</button>
              <span class="text-white w-8 text-center font-mono">${item.quantity}</span>
              <button onclick="Cart.updateQuantity('${item.id}', ${item.quantity + 1})"
                class="w-7 h-7 rounded bg-surface-light flex items-center justify-center text-text-muted hover:bg-neon-cyan hover:text-void transition-colors">+</button>
            </div>
          </div>
          <button onclick="Cart.remove('${item.id}')" class="text-error-red hover:opacity-75 transition-opacity">
            <i data-lucide="trash-2" class="w-5 h-5"></i>
          </button>
        </div>
      `).join('');
    }
    
    const totalEl = document.getElementById('cart-total');
    if (totalEl) totalEl.textContent = Utils.formatLKR(this.getTotal());
    
    lucide.createIcons();
  }
};
