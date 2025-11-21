/**
 * assets/js/core/ui.js
 * Centralized UI Manager for Industrial-Grade Interaction
 */

class UIManager {
    constructor() {
        this.toastContainer = null;
        this.modalContainer = null;
        this.loader = null;
        this.init();
    }

    init() {
        // Create containers if they don't exist
        if (!document.getElementById('toast-container')) {
            this.toastContainer = document.createElement('div');
            this.toastContainer.id = 'toast-container';
            this.toastContainer.className = 'fixed top-24 right-6 z-[60] flex flex-col gap-4 pointer-events-none';
            document.body.appendChild(this.toastContainer);
        } else {
            this.toastContainer = document.getElementById('toast-container');
        }

        // Modal Container (Dynamic)
        if (!document.getElementById('modal-overlay')) {
            this.modalContainer = document.createElement('div');
            this.modalContainer.id = 'modal-overlay';
            this.modalContainer.className = 'fixed inset-0 bg-black/80 backdrop-blur-sm z-[70] hidden flex items-center justify-center p-4 opacity-0 transition-opacity duration-300';
            document.body.appendChild(this.modalContainer);
        } else {
            this.modalContainer = document.getElementById('modal-overlay');
        }

        // Loader
        this.loader = document.getElementById('cyber-loader');
    }

    // --- Toasts ---
    showToast(message, type = 'info') {
        const toast = document.createElement('div');

        const colors = {
            info: 'border-electric-cyan text-white bg-dark-gray/90',
            success: 'border-green-500 text-white bg-dark-gray/90',
            error: 'border-red-500 text-white bg-dark-gray/90',
            warning: 'border-yellow-500 text-white bg-dark-gray/90'
        };

        const icons = {
            info: '<svg class="w-6 h-6 text-electric-cyan" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>',
            success: '<svg class="w-6 h-6 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>',
            error: '<svg class="w-6 h-6 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>',
            warning: '<svg class="w-6 h-6 text-yellow-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"/></svg>'
        };

        toast.className = `pointer-events-auto flex items-center gap-3 p-4 rounded-lg shadow-2xl border-l-4 min-w-[300px] transform translate-x-full transition-all duration-300 ${colors[type]}`;
        toast.innerHTML = `
            ${icons[type]}
            <p class="font-medium text-sm">${message}</p>
        `;

        this.toastContainer.appendChild(toast);

        // Animate in
        requestAnimationFrame(() => {
            toast.classList.remove('translate-x-full');
        });

        // Auto remove
        setTimeout(() => {
            toast.classList.add('translate-x-full', 'opacity-0');
            setTimeout(() => toast.remove(), 300);
        }, 4000);
    }

    // --- Modals ---
    showModal({ title, content, onConfirm, confirmText = 'Confirm', cancelText = 'Cancel', size = 'max-w-md' }) {
        this.modalContainer.innerHTML = `
            <div class="glass-effect w-full ${size} rounded-xl p-6 relative transform scale-95 transition-transform duration-300" id="modal-panel">
                <button id="modal-close-top" class="absolute top-4 right-4 text-gray-400 hover:text-white">&times;</button>
                <h3 class="text-2xl font-bold text-white mb-4">${title}</h3>
                <div class="mb-6 text-gray-300">
                    ${content}
                </div>
                <div class="flex justify-end gap-3">
                    ${cancelText ? `<button id="modal-cancel" class="px-4 py-2 rounded text-gray-300 hover:text-white hover:bg-white/10 transition-colors">${cancelText}</button>` : ''}
                    <button id="modal-confirm" class="px-6 py-2 rounded bg-gradient-to-r from-electric-cyan to-hyper-violet text-white font-bold hover:shadow-[0_0_15px_rgba(0,174,239,0.5)] transition-all">${confirmText}</button>
                </div>
            </div>
        `;

        this.modalContainer.classList.remove('hidden');
        requestAnimationFrame(() => {
            this.modalContainer.classList.remove('opacity-0');
            const panel = document.getElementById('modal-panel');
            if (panel) panel.classList.remove('scale-95');
            if (panel) panel.classList.add('scale-100');
        });

        // Handlers
        const close = () => {
            this.modalContainer.classList.add('opacity-0');
            const panel = document.getElementById('modal-panel');
            if (panel) panel.classList.remove('scale-100');
            if (panel) panel.classList.add('scale-95');
            setTimeout(() => {
                this.modalContainer.classList.add('hidden');
                this.modalContainer.innerHTML = '';
            }, 300);
        };

        const confirmBtn = document.getElementById('modal-confirm');
        const cancelBtn = document.getElementById('modal-cancel');
        const closeTop = document.getElementById('modal-close-top');

        if (confirmBtn) confirmBtn.addEventListener('click', async () => {
            if (onConfirm) {
                const result = await onConfirm();
                if (result !== false) close(); // Keep open if onConfirm returns false
            } else {
                close();
            }
        });

        if (cancelBtn) cancelBtn.addEventListener('click', close);
        if (closeTop) closeTop.addEventListener('click', close);
    }

    // --- Loader ---
    toggleLoader(visible) {
        if (!this.loader) this.loader = document.getElementById('cyber-loader');
        if (!this.loader) return;

        if (visible) {
            this.loader.classList.remove('hidden');
            requestAnimationFrame(() => this.loader.classList.remove('opacity-0'));
        } else {
            this.loader.classList.add('opacity-0');
            setTimeout(() => this.loader.classList.add('hidden'), 500);
        }
    }
}

const UI = new UIManager();
export default UI;
