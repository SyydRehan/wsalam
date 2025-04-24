// Product Data
const products = [
    {
        id: 1,
        name: "Zesty Lemon Splash",
        description: "(Evokes a wave of refreshing lemon flavor)",
        price: 1.99,
        image: "lemo1.jpg"
    },
    {
        id: 2,
        name: "Lemon Burst Chill",
        description: "(Suggests an explosive, refreshing experience)",
        price: 2.29,
        image: "lemo2.jpg"
    },
    {
        id: 3,
        name: "Citrus Wave Cooler",
        description: "(Emphasizes the fresh citrus flavor)",
        price: 2.19,
        image: "lemo3.jpg"
    },
    {
        id: 4,
        name: "Sunshine Lemon Fizz",
        description: "(Perfect for a sparkling lemon drink)",
        price: 2.19,
        image: "lemo4.jpg"
    },
    {
        id: 5,
        name: "Tropical Lemon Quencher",
        description: "(Great for a lemonade with tropical fruit hints)",
        price: 2.29,
        image: "lemo5.jpg"
    },
    {
        id: 6,
        name: "Frosty Lemon Splash",
        description: "(Ideal for an extra-cold, slushy-style drink)",
        price: 19.99,
        image: "lemo6.jpg"
    }
];

// Cart State
let cart = [];

// DOM Elements
const productGrid = document.querySelector('.product-grid');
const cartSidebar = document.querySelector('.cart-sidebar');
const cartItemsContainer = document.querySelector('.cart-items');
const cartCount = document.querySelector('.cart-count');
const subtotalAmount = document.querySelector('.subtotal-amount');
const taxAmount = document.querySelector('.tax-amount');
const totalAmount = document.querySelector('.total-amount');
const cartIcon = document.querySelector('.cart-icon');
const closeCartBtn = document.querySelector('.close-cart');
const overlay = document.querySelector('.overlay');
const checkoutBtn = document.querySelector('.checkout-btn');

// Initialize the app
function init() {
    renderProducts();
    setupEventListeners();
    updateCart();
}

// Render products to the page
function renderProducts() {
    productGrid.innerHTML = '';
    
    products.forEach(product => {
        const productCard = document.createElement('div');
        productCard.className = 'product-card';
        
        productCard.innerHTML = `
            <div class="product-image">
                <img src="${product.image}" alt="${product.name}">
            </div>
            <div class="product-info">
                <h3 class="product-title">${product.name}</h3>
                <p class="product-description">${product.description}</p>
                <p class="product-price">$${product.price.toFixed(2)}</p>
                <button class="add-to-cart" data-id="${product.id}">Add to Cart</button>
            </div>
        `;
        
        productGrid.appendChild(productCard);
    });
}

// Set up event listeners
function setupEventListeners() {
    // Add to cart buttons
    document.addEventListener('click', function(e) {
        if (e.target.classList.contains('add-to-cart')) {
            const productId = parseInt(e.target.getAttribute('data-id'));
            addToCart(productId);
        }
        
        // Quantity buttons
        if (e.target.classList.contains('quantity-btn')) {
            const itemId = parseInt(e.target.closest('.cart-item').getAttribute('data-id'));
            const isIncrease = e.target.classList.contains('increase');
            updateQuantity(itemId, isIncrease);
        }
        
        // Remove item button
        if (e.target.classList.contains('remove-item')) {
            const itemId = parseInt(e.target.closest('.cart-item').getAttribute('data-id'));
            removeFromCart(itemId);
        }
    });
    
    // Cart icon click
    cartIcon.addEventListener('click', toggleCart);
    
    // Close cart button
    closeCartBtn.addEventListener('click', toggleCart);
    
    // Overlay click
    overlay.addEventListener('click', toggleCart);
    
    // Checkout button
    checkoutBtn.addEventListener('click', checkout);
}

// Add item to cart
function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    
    if (!product) return;
    
    const existingItem = cart.find(item => item.id === productId);
    
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({
            ...product,
            quantity: 1
        });
    }
    
    updateCart();
    showAddToCartAnimation();
}

// Remove item from cart
function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId);
    updateCart();
}

// Update item quantity
function updateQuantity(productId, isIncrease) {
    const item = cart.find(item => item.id === productId);
    
    if (!item) return;
    
    if (isIncrease) {
        item.quantity += 1;
    } else {
        if (item.quantity > 1) {
            item.quantity -= 1;
        } else {
            removeFromCart(productId);
            return;
        }
    }
    
    updateCart();
}

// Update cart UI
function updateCart() {
    renderCartItems();
    updateCartSummary();
    saveCartToLocalStorage();
}

// Render cart items
function renderCartItems() {
    cartItemsContainer.innerHTML = '';
    
    if (cart.length === 0) {
        cartItemsContainer.innerHTML = `
            <div class="empty-cart-message">
                <i class="fas fa-shopping-cart"></i>
                <p>Your cart is empty</p>
            </div>
        `;
        return;
    }
    
    cart.forEach(item => {
        const cartItem = document.createElement('div');
        cartItem.className = 'cart-item';
        cartItem.setAttribute('data-id', item.id);
        
        cartItem.innerHTML = `
            <div class="cart-item-image">
                <img src="${item.image}" alt="${item.name}">
            </div>
            <div class="cart-item-details">
                <h4 class="cart-item-title">${item.name}</h4>
                <p class="cart-item-price">$${item.price.toFixed(2)}</p>
                <div class="cart-item-quantity">
                    <button class="quantity-btn decrease">-</button>
                    <span class="quantity-value">${item.quantity}</span>
                    <button class="quantity-btn increase">+</button>
                </div>
                <button class="remove-item">Remove</button>
            </div>
        `;
        
        cartItemsContainer.appendChild(cartItem);
    });
}

// Update cart summary
function updateCartSummary() {
    const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const tax = subtotal * 0.10; // 10% tax
    const total = subtotal + tax;
    
    subtotalAmount.textContent = `$${subtotal.toFixed(2)}`;
    taxAmount.textContent = `$${tax.toFixed(2)}`;
    totalAmount.textContent = `$${total.toFixed(2)}`;
    
    cartCount.textContent = cart.reduce((sum, item) => sum + item.quantity, 0);
}

// Toggle cart visibility
function toggleCart() {
    cartSidebar.classList.toggle('active');
    overlay.classList.toggle('active');
    document.body.classList.toggle('no-scroll');
}

// Show add to cart animation
function showAddToCartAnimation() {
    const cartIcon = document.querySelector('.cart-icon i');
    cartIcon.classList.add('animate');
    setTimeout(() => {
        cartIcon.classList.remove('animate');
    }, 500);
}

// Checkout function
function checkout() {
    if (cart.length === 0) {
        alert('Your cart is empty!');
        return;
    }
    
    // In a real app, this would redirect to a checkout page
    alert(`Order placed! Total: $${totalAmount.textContent}`);
    cart = [];
    updateCart();
    toggleCart();
}

// Save cart to localStorage
function saveCartToLocalStorage() {
    localStorage.setItem('chillColaCart', JSON.stringify(cart));
}

// Load cart from localStorage
function loadCartFromLocalStorage() {
    const savedCart = localStorage.getItem('chillColaCart');
    if (savedCart) {
        cart = JSON.parse(savedCart);
    }
}

// Initialize the app when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    loadCartFromLocalStorage();
    init();
});