import store from './core/store.js';

const SESSION_TIMEOUT_DURATION = 300 * 1000; // 5 minutes in milliseconds
let sessionTimeout;

document.addEventListener('DOMContentLoaded', () => {
    checkSession();
    setupEventListeners();
});

function checkSession() {
    const session = store.getState().userSession;
    const now = Date.now();

    if (session.isLoggedIn && (now - session.sessionStart < SESSION_TIMEOUT_DURATION)) {
        showDashboard();
        startSessionTimeout(now - session.sessionStart);
    } else {
        showLogin();
        store.logout(); // Ensure state is clean
    }
}

function setupEventListeners() {
    const loginForm = document.getElementById('login-form');
    if (loginForm) loginForm.addEventListener('submit', handleLogin);

    const logoutButton = document.getElementById('logout-button');
    if (logoutButton) logoutButton.addEventListener('click', handleLogout);
    
    const inventoryTableBody = document.getElementById('inventory-table-body');
    if(inventoryTableBody) inventoryTableBody.addEventListener('click', handleInventoryAction);

    const ordersTableBody = document.getElementById('orders-table-body');
    if(ordersTableBody) ordersTableBody.addEventListener('change', handleOrderAction);

}

function handleLogin(e) {
    e.preventDefault();
    const username = e.target.username.value;
    const password = e.target.password.value;
    const loginError = document.getElementById('login-error');

    if (store.login(username, password)) {
        showDashboard();
        startSessionTimeout(0);
    } else {
        loginError.textContent = 'Invalid credentials. Please try again.';
        setTimeout(() => loginError.textContent = '', 3000);
    }
}

function handleLogout() {
    store.logout();
    clearTimeout(sessionTimeout);
    showLogin();
}

function showLogin() {
    document.getElementById('login-section').classList.remove('hidden');
    document.getElementById('dashboard-section').classList.add('hidden');
}

function showDashboard() {
    document.getElementById('login-section').classList.add('hidden');
    document.getElementById('dashboard-section').classList.remove('hidden');
    renderDashboard();
}

function startSessionTimeout(elapsedTime) {
    clearTimeout(sessionTimeout);
    const remainingTime = SESSION_TIMEOUT_DURATION - elapsedTime;
    
    const timerEl = document.getElementById('session-timer');
    let timeLeft = Math.ceil(remainingTime / 1000);

    const intervalId = setInterval(() => {
        timeLeft--;
        if(timerEl) timerEl.textContent = timeLeft;
        if (timeLeft <= 0) {
            clearInterval(intervalId);
        }
    }, 1000);

    sessionTimeout = setTimeout(() => {
        alert('Session timed out. Please log in again.');
        handleLogout();
    }, remainingTime);
}

// --- RENDER FUNCTIONS ---

function renderDashboard() {
    renderStats();
    renderInventoryTable();
    renderOrdersTable();
}

function renderStats() {
    const state = store.getState();
    
    // Simulate revenue for demonstration
    const revenueTicker = document.getElementById('revenue-ticker');
    if (revenueTicker) {
        let currentRevenue = state.orders.reduce((sum, order) => sum + order.total, 0);
        revenueTicker.textContent = `Rs. ${Math.round(currentRevenue).toLocaleString()}`;
        setInterval(() => {
            currentRevenue += Math.random() * 1000;
            revenueTicker.textContent = `Rs. ${Math.round(currentRevenue).toLocaleString()}`;
        }, 3000);
    }

    const totalOrders = document.getElementById('total-orders');
    if (totalOrders) totalOrders.textContent = state.orders.length;

    const inventoryCount = document.getElementById('inventory-count');
    if (inventoryCount) inventoryCount.textContent = state.products.length;
}

function renderInventoryTable() {
    const products = store.getProducts();
    const tableBody = document.getElementById('inventory-table-body');
    if (!tableBody) return;

    tableBody.innerHTML = products.map(p => `
        <tr class="border-b border-gray-800 hover:bg-gray-800/50" data-product-id="${p.id}">
            <td class="p-3">${p.name}</td>
            <td class="p-3">
                <span class="price-text">${p.price.toLocaleString()}</span>
                <button class="edit-price-btn ml-2 text-sm text-electric-cyan hover:underline">Edit</button>
            </td>
            <td class="p-3">
                <label class="inline-flex items-center cursor-pointer">
                  <input type="checkbox" ${p.inStock ? 'checked' : ''} class="sr-only peer toggle-stock-cbx">
                  <div class="relative w-11 h-6 bg-gray-600 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-hyper-violet"></div>
                  <span class="ms-3 text-sm font-medium text-gray-300">${p.inStock ? 'In Stock' : 'Out'}</span>
                </label>
            </td>
            <td class="p-3 truncate max-w-xs">
                <span class="url-text">${p.imageUrl}</span>
                <button class="edit-url-btn ml-2 text-sm text-electric-cyan hover:underline">Edit</button>
            </td>
            <td class="p-3">
                 <button class="text-red-500 hover:underline disabled:text-gray-500" title="Cannot delete, feature not implemented">Delete</button>
            </td>
        </tr>
    `).join('');
}


function renderOrdersTable() {
    const orders = store.getState().orders;
    const tableBody = document.getElementById('orders-table-body');
    if(!tableBody) return;

    const statusOptions = ['Processing', 'Dispatching', 'Delivered', 'Cancelled'];

    tableBody.innerHTML = orders.map(o => `
         <tr class="border-b border-gray-800 hover:bg-gray-800/50" data-order-id="${o.id}">
            <td class="p-3 font-mono text-sm">${o.id}</td>
            <td class="p-3">${new Date(o.date).toLocaleString()}</td>
            <td class="p-3">Rs. ${o.total.toLocaleString()}</td>
            <td class="p-3">
                <select class="order-status-select bg-dark-gray border border-gray-600 rounded-lg p-2">
                    ${statusOptions.map(s => `<option value="${s}" ${o.status === s ? 'selected' : ''}>${s}</option>`).join('')}
                </select>
            </td>
            <td class="p-3">
                <button class="text-electric-cyan hover:underline">View Details</button>
            </td>
        </tr>
    `).join('');
}

// --- CRUD ACTION HANDLERS ---

function handleInventoryAction(e) {
    const target = e.target;
    const row = target.closest('tr');
    if (!row) return;

    const productId = row.dataset.productId;

    if (target.classList.contains('edit-price-btn')) {
        const currentPrice = store.getProductById(productId).price;
        const newPrice = prompt(`Enter new price for product ID ${productId}:`, currentPrice);
        if (newPrice && !isNaN(newPrice)) {
            store.updateProduct(productId, { price: parseFloat(newPrice) });
            renderInventoryTable(); // Re-render to reflect change
        }
    }

    if (target.classList.contains('edit-url-btn')) {
        const currentUrl = store.getProductById(productId).imageUrl;
        const newUrl = prompt(`Enter new image URL for product ID ${productId}:`, currentUrl);
        if (newUrl) {
            store.updateProduct(productId, { imageUrl: newUrl });
            renderInventoryTable(); // Re-render to reflect change
        }
    }
    
    if (target.classList.contains('toggle-stock-cbx')) {
        const isInStock = target.checked;
        store.updateProduct(productId, { inStock: isInStock });
        renderInventoryTable(); // Re-render to reflect change
    }
}

function handleOrderAction(e) {
    const target = e.target;
     if (target.classList.contains('order-status-select')) {
        const orderId = target.closest('tr').dataset.orderId;
        const newStatus = target.value;
        store.updateOrderStatus(orderId, newStatus);
        // No re-render needed if only the select value changes, but good practice
        // renderOrdersTable();
     }
}
