// Product Module
import { addToCart } from './cart.js';

let currentProductGallery = {
    images: [],
    currentIndex: 0
};

export function initializeProductSearch(products) {
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

export function showProductModal(productId, products) {
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
        addToCart(productId, products);
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
