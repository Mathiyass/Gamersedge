import store from './core/store.js';
import ui from './core/ui.js';

/**
 * assets/js/admin.js
 * The Manager - Admin Dashboard Logic
 */

// --- Utility ---
const formatCurrency = (amount) => {
    return 'Rs. ' + amount.toLocaleString('en-LK');
};

// --- Auth Guard ---
const checkAuth = () => {
    if (!store.checkSession()) {
        document.getElementById('login-section').classList.remove('hidden');
        document.getElementById('dashboard-section').classList.add('hidden');
        return false;
    } else {
        document.getElementById('login-section').classList.add('hidden');
        document.getElementById('dashboard-section').classList.remove('hidden');
        return true;
    }
};

// --- Components ---

const renderInventoryRow = (product) => {
    return `
        <tr class="border-b border-gray-700/50 hover:bg-white/5 transition-colors">
            <td class="p-4 text-sm text-white font-bold">#${product.id}</td>
            <td class="p-4">
                <div class="flex items-center gap-3">
                    <img src="${product.image}" onerror="this.src='https://placehold.co/100x100/000000/FFF?text=X'" class="w-10 h-10 object-contain bg-white/5 rounded">
                    <span class="text-sm text-gray-300">${product.name}</span>
                </div>
            </td>
            <td class="p-4 text-sm text-gray-400">${product.category}</td>
            <td class="p-4 text-sm text-electric-cyan font-mono">${formatCurrency(product.price)}</td>
            <td class="p-4 text-sm">
                <span class="px-2 py-1 rounded ${product.stock < 5 ? 'bg-red-900/50 text-red-400' : 'bg-green-900/50 text-green-400'}">
                    ${product.stock}
                </span>
            </td>
            <td class="p-4">
                <button class="text-gray-400 hover:text-white transition-colors edit-product-btn" data-id="${product.id}">
                    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path></svg>
                </button>
            </td>
        </tr>
    `;
};

const renderOrderRow = (order) => {
    const statusColors = {
        'Processing': 'bg-yellow-900/50 text-yellow-400',
        'Dispatching': 'bg-blue-900/50 text-blue-400',
        'Delivered': 'bg-green-900/50 text-green-400'
    };

    return `
        <tr class="border-b border-gray-700/50 hover:bg-white/5 transition-colors">
            <td class="p-4 text-sm text-white font-mono">${order.id}</td>
            <td class="p-4 text-sm text-gray-400">${new Date(order.date).toLocaleDateString()}</td>
            <td class="p-4 text-sm text-white">${order.customer ? order.customer.name : 'Guest'}</td>
            <td class="p-4 text-sm text-electric-cyan font-mono">${formatCurrency(order.total)}</td>
            <td class="p-4">
                <span class="px-2 py-1 rounded text-xs uppercase font-bold ${statusColors[order.status] || 'bg-gray-700 text-gray-300'}">
                    ${order.status}
                </span>
            </td>
            <td class="p-4">
                <select class="bg-dark-gray border border-gray-600 text-xs text-white rounded p-1 status-select" data-id="${order.id}">
                    <option value="Processing" ${order.status === 'Processing' ? 'selected' : ''}>Processing</option>
                    <option value="Dispatching" ${order.status === 'Dispatching' ? 'selected' : ''}>Dispatching</option>
                    <option value="Delivered" ${order.status === 'Delivered' ? 'selected' : ''}>Delivered</option>
                </select>
            </td>
        </tr>
    `;
};

// --- Dashboard Logic ---

const updateDashboard = () => {
    if (!store.state.userSession) return;

    const products = store.state.products;
    const orders = store.state.orders;

    // Stats
    const totalRevenue = orders.reduce((sum, order) => sum + order.total, 0);
    const totalOrders = orders.length;
    const lowStockItems = products.filter(p => p.stock < 5).length;

    document.getElementById('total-revenue').textContent = formatCurrency(totalRevenue);
    document.getElementById('total-orders').textContent = totalOrders;
    document.getElementById('low-stock-count').textContent = lowStockItems;

    // Inventory Matrix
    const inventoryBody = document.getElementById('inventory-body');
    if (inventoryBody) {
        inventoryBody.innerHTML = products.map(renderInventoryRow).join('');

        // Attach edit listeners
        document.querySelectorAll('.edit-product-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                ui.showToast('Edit feature coming in V2', 'info');
            });
        });
    }

    // Order War Room
    const ordersBody = document.getElementById('orders-body');
    if (ordersBody) {
        ordersBody.innerHTML = orders.length > 0
            ? orders.map(renderOrderRow).join('')
            : '<tr><td colspan="6" class="p-4 text-center text-gray-500">No active orders.</td></tr>';

        // Attach listeners for status change
        document.querySelectorAll('.status-select').forEach(select => {
            select.addEventListener('change', (e) => {
                const orderId = e.target.dataset.id;
                const newStatus = e.target.value;
                store.updateOrderStatus(orderId, newStatus);
            });
        });
    }
};

// --- Event Listeners ---

const initAdmin = () => {
    // Login Form
    const loginForm = document.getElementById('login-form');
    if (loginForm) {
        loginForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const username = e.target.username.value;
            const password = e.target.password.value;

            if (store.login(username, password)) {
                checkAuth();
                updateDashboard();
                ui.showToast('Welcome back, Commander.', 'success');
            } else {
                ui.showToast('Invalid Credentials (try admin/admin)', 'error');
            }
        });
    }

    // Logout
    const logoutBtn = document.getElementById('logout-btn');
    if (logoutBtn) {
        logoutBtn.addEventListener('click', () => {
            store.logout();
            checkAuth();
        });
    }

    // Subscribe to store updates for live dashboard
    store.subscribe(() => {
        if (store.state.userSession) {
            updateDashboard();
        }
    });

    // Initial Check
    if (checkAuth()) {
        updateDashboard();
    }
};

document.addEventListener('DOMContentLoaded', initAdmin);
