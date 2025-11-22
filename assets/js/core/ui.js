/**
 * assets/js/core/ui.js
 * The Face - Centralized UI Manager for Notifications and Modals
 */

class UIManager {
    constructor() {
        this.initToastContainer();
        this.initModalContainer();
        this.initPreloader();
    }

    // --- Preloader ---
    initPreloader() {
        // Preloader is expected to be in the HTML.
        // If it's there, we handle its removal.
        // Check if load already fired
        if (document.readyState === 'complete') {
            this.removePreloader();
        } else {
            // Also listen for DOMContentLoaded as a fallback,
            // though 'load' is preferred for full asset loading
            window.addEventListener('load', () => this.removePreloader());
        }
    }

    removePreloader() {
        const preloader = document.getElementById('global-preloader');
        if (preloader) {
            preloader.style.opacity = '0';
            setTimeout(() => {
                preloader.remove();
            }, 500);
        }
    }

    // --- Toasts ---
    initToastContainer() {
        if (!document.getElementById('toast-container')) {
            const container = document.createElement('div');
            container.id = 'toast-container';
            container.className = 'fixed bottom-5 right-5 z-50 flex flex-col gap-3';
            document.body.appendChild(container);
        }
    }

    showToast(message, type = 'info') {
        const container = document.getElementById('toast-container');
        const toast = document.createElement('div');

        let colors = 'border-electric-cyan bg-dark-gray text-white';
        let icon = '<svg class="w-6 h-6 text-electric-cyan" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>';

        if (type === 'success') {
            colors = 'border-green-500 bg-dark-gray text-white';
            icon = '<svg class="w-6 h-6 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>';
        } else if (type === 'error') {
            colors = 'border-red-500 bg-dark-gray text-white';
            icon = '<svg class="w-6 h-6 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>';
        }

        toast.className = `flex items-center gap-3 p-4 rounded-lg border-l-4 shadow-lg transform translate-y-10 opacity-0 transition-all duration-300 ${colors}`;
        toast.innerHTML = `
            ${icon}
            <span class="font-medium">${message}</span>
        `;

        container.appendChild(toast);

        // Animate In
        requestAnimationFrame(() => {
            toast.classList.remove('translate-y-10', 'opacity-0');
        });

        // Remove after 3s
        setTimeout(() => {
            toast.classList.add('translate-x-full', 'opacity-0');
            setTimeout(() => {
                toast.remove();
            }, 300);
        }, 3000);
    }

    // --- Modals ---
    initModalContainer() {
        if (!document.getElementById('modal-overlay')) {
            const overlay = document.createElement('div');
            overlay.id = 'modal-overlay';
            overlay.className = 'fixed inset-0 bg-black/80 backdrop-blur-sm z-[60] hidden flex items-center justify-center p-4 opacity-0 transition-opacity duration-300';
            overlay.innerHTML = `
                <div id="modal-content" class="bg-dark-gray border border-gray-700 rounded-xl max-w-md w-full p-6 transform scale-95 transition-transform duration-300 shadow-2xl relative overflow-hidden">
                    <div class="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-electric-cyan to-hyper-violet"></div>
                    <h3 id="modal-title" class="text-2xl font-bold text-white mb-4">Notification</h3>
                    <p id="modal-body" class="text-gray-300 mb-8"></p>
                    <div id="modal-actions" class="flex justify-end gap-4">
                        <!-- Buttons injected here -->
                    </div>
                </div>
            `;
            document.body.appendChild(overlay);
        }
    }

    confirm(title, message, onConfirm, onCancel) {
        const overlay = document.getElementById('modal-overlay');
        const content = document.getElementById('modal-content');
        const titleEl = document.getElementById('modal-title');
        const bodyEl = document.getElementById('modal-body');
        const actionsEl = document.getElementById('modal-actions');

        titleEl.textContent = title;
        bodyEl.textContent = message;

        actionsEl.innerHTML = `
            <button id="modal-cancel" class="px-4 py-2 text-gray-400 hover:text-white transition-colors">Cancel</button>
            <button id="modal-confirm" class="px-6 py-2 bg-electric-cyan text-black font-bold rounded hover:bg-white transition-colors">Confirm</button>
        `;

        overlay.classList.remove('hidden');
        // Trigger reflow
        void overlay.offsetWidth;
        overlay.classList.remove('opacity-0');
        content.classList.remove('scale-95');
        content.classList.add('scale-100');

        const cleanup = () => {
            overlay.classList.add('opacity-0');
            content.classList.remove('scale-100');
            content.classList.add('scale-95');
            setTimeout(() => {
                overlay.classList.add('hidden');
            }, 300);
        };

        document.getElementById('modal-confirm').onclick = () => {
            if (onConfirm) onConfirm();
            cleanup();
        };

        document.getElementById('modal-cancel').onclick = () => {
            if (onCancel) onCancel();
            cleanup();
        };
    }
}

// Singleton
const uiManager = new UIManager();
export default uiManager;
