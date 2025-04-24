document.addEventListener('DOMContentLoaded', function() {
    // Sample data for the dashboard
    const orders = [
        { id: '#ORD-1001', customer: 'John Smith', date: '2023-05-15', amount: '$45.99', status: 'completed' },
        { id: '#ORD-1002', customer: 'Sarah Johnson', date: '2023-05-16', amount: '$89.50', status: 'processing' },
        { id: '#ORD-1003', customer: 'Michael Brown', date: '2023-05-16', amount: '$32.75', status: 'pending' },
        { id: '#ORD-1004', customer: 'Emily Davis', date: '2023-05-17', amount: '$120.00', status: 'completed' },
        { id: '#ORD-1005', customer: 'Robert Wilson', date: '2023-05-18', amount: '$67.25', status: 'completed' }
    ];

    const products = [
        { id: 1, name: 'Chill Cola Original', price: '$1.99', stock: 245, image: 'https://via.placeholder.com/150?text=Original' },
        { id: 2, name: 'Chill Cola Zero', price: '$2.29', stock: 180, image: 'https://via.placeholder.com/150?text=Zero' },
        { id: 3, name: 'Chill Cola Cherry', price: '$2.19', stock: 156, image: 'https://via.placeholder.com/150?text=Cherry' },
        { id: 4, name: 'Chill Cola Vanilla', price: '$2.19', stock: 98, image: 'https://via.placeholder.com/150?text=Vanilla' },
        { id: 5, name: 'Chill Cola Citrus', price: '$2.29', stock: 210, image: 'https://via.placeholder.com/150?text=Citrus' }
    ];

    // DOM Elements
    const ordersTable = document.querySelector('.recent-orders tbody');
    const productsGrid = document.querySelector('.products-grid');
    const addProductBtn = document.querySelector('.add-product');
    const productModal = document.getElementById('productModal');
    const closeModalBtn = document.querySelector('.close-modal');
    const cancelBtn = document.querySelector('.cancel-btn');
    const productForm = document.getElementById('productForm');

    // Populate orders table
    function populateOrders() {
        ordersTable.innerHTML = '';
        
        orders.forEach(order => {
            const row = document.createElement('tr');
            
            row.innerHTML = `
                <td>${order.id}</td>
                <td>${order.customer}</td>
                <td>${order.date}</td>
                <td>${order.amount}</td>
                <td><span class="status ${order.status}">${order.status.charAt(0).toUpperCase() + order.status.slice(1)}</span></td>
                <td>
                    <button class="action-btn view">View</button>
                    <button class="action-btn edit">Edit</button>
                </td>
            `;
            
            ordersTable.appendChild(row);
        });
    }

    // Populate products grid
    function populateProducts() {
        productsGrid.innerHTML = '';
        
        products.forEach(product => {
            const productCard = document.createElement('div');
            productCard.className = 'product-card';
            
            productCard.innerHTML = `
                <div class="product-image">
                    <img src="${product.image}" alt="${product.name}">
                </div>
                <div class="product-info">
                    <h4 class="product-name">${product.name}</h4>
                    <p class="product-price">${product.price}</p>
                    <p class="product-stock">Stock: ${product.stock}</p>
                    <div class="product-actions">
                        <button class="edit">Edit</button>
                        <button class="delete">Delete</button>
                    </div>
                </div>
            `;
            
            productsGrid.appendChild(productCard);
        });
    }

    // Modal functions
    function openModal() {
        productModal.classList.add('active');
    }

    function closeModal() {
        productModal.classList.remove('active');
    }

    // Event Listeners
    addProductBtn.addEventListener('click', openModal);
    closeModalBtn.addEventListener('click', closeModal);
    cancelBtn.addEventListener('click', closeModal);

    productModal.addEventListener('click', function(e) {
        if (e.target === productModal) {
            closeModal();
        }
    });

    productForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // In a real app, you would save the product to your database
        alert('Product saved successfully!');
        closeModal();
        productForm.reset();
    });

    // Initialize the dashboard
    populateOrders();
    populateProducts();

    // Add keyboard event to close modal with ESC key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && productModal.classList.contains('active')) {
            closeModal();
        }
    });
});