// utils.js - Core helper functions

const Utils = {
  // Format price in LKR
  formatLKR(amount) {
    return 'Rs. ' + new Intl.NumberFormat('en-LK').format(amount);
  },
  
  // Generate unique ID
  generateId(prefix = 'id') {
    return `${prefix}_${Date.now().toString(36)}_${Math.random().toString(36).substr(2, 9)}`;
  },
  
  // Get URL parameter
  getUrlParam(param) {
    const params = new URLSearchParams(window.location.search);
    return params.get(param);
  },
  
  // Debounce function
  debounce(func, wait = 300) {
    let timeout;
    return function executedFunction(...args) {
      const later = () => {
        clearTimeout(timeout);
        func(...args);
      };
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
    };
  },
  
  // Format date
  formatDate(dateString) {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric', month: 'short', day: 'numeric'
    });
  },
  
  // Calculate discount percentage
  calcDiscount(original, current) {
    if (original === 0) return 0;
    return Math.round(((original - current) / original) * 100);
  },
  
  // Truncate text
  truncate(str, length = 100) {
    if (typeof str !== 'string') return '';
    return str.length > length ? str.substring(0, length) + '...' : str;
  },
  
  // Show toast notification
  showToast(message, type = 'success') {
    const toast = document.createElement('div');
    const typeClasses = {
        success: 'bg-success-green',
        error: 'bg-error-red',
        info: 'bg-neon-cyan'
    };
    const typeIcons = {
        success: 'check',
        error: 'alert-triangle',
        info: 'info'
    };

    toast.className = `fixed bottom-5 right-5 flex items-center gap-4 px-6 py-3 rounded-lg text-white z-[9999] shadow-lg transform translate-x-[calc(100%+20px)] transition-transform duration-300 ease-out ${typeClasses[type] || typeClasses.info}`;
    
    toast.innerHTML = `
        <i data-lucide="${typeIcons[type] || typeIcons.info}" class="w-5 h-5"></i>
        <span>${message}</span>
    `;
    
    document.body.appendChild(toast);
    lucide.createIcons({
        nodes: [toast.querySelector('i')]
    });
    
    // Animate in
    requestAnimationFrame(() => {
        toast.style.transform = 'translateX(0)';
    });
    
    // Remove after 3 seconds
    setTimeout(() => {
      toast.style.transform = 'translateX(calc(100% + 20px))';
      setTimeout(() => toast.remove(), 300);
    }, 3000);
  }
};
