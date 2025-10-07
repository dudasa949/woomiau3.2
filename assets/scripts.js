/* Woo&Miau BARF Shop JavaScript with Bootstrap Integration */

(function() {
    'use strict';
    
    // Constants
    const LS_PRODUCTS = 'woomiau_products_v2';
    const LS_CART = 'woomiau_cart_v2';
    
    // Enhanced product data with BARF-specific categories
    const defaults = [
        {
            id: 'p1',
            name: 'BARF Csirkemell fagyasztott 1kg',
            price: 3499,
            originalPrice: 3999,
            cat: 'dogs',
            tags: ['frozen', 'sale'],
            img: 'assets/placeholder-1.svg',
            desc: 'Friss csirkemell, ideális minden méretű kutyának. Fagyasztott formában hosszú eltarthatóság.',
            rating: 4.8,
            reviews: 127,
            inStock: true
        },
        {
            id: 'p2',
            name: 'BARF Marhamix macskáknak 500g',
            price: 2799,
            cat: 'cats',
            tags: ['premium'],
            img: 'assets/placeholder-2.svg',
            desc: 'Kalciumban gazdag húskeverék macskáknak, prémium minőségben.',
            rating: 4.9,
            reviews: 89,
            inStock: true
        },
        {
            id: 'p3',
            name: 'Jutalomfalatok mix 200g',
            price: 1499,
            cat: 'treats',
            tags: ['treats', 'new'],
            img: 'assets/placeholder-3.svg',
            desc: 'Egészséges jutalomfalatok természetes alapanyagokból.',
            rating: 4.5,
            reviews: 45,
            inStock: true
        },
        {
            id: 'p4',
            name: 'Fagyasztott bárányhús 1kg',
            price: 4299,
            cat: 'dogs',
            tags: ['frozen', 'premium'],
            img: 'assets/placeholder-1.svg',
            desc: 'Prémium bárányhús fagyasztott formában, kutyák számára.',
            rating: 4.7,
            reviews: 76,
            inStock: true
        },
        {
            id: 'p5',
            name: 'BARF Pulykaszív 300g',
            price: 1899,
            cat: 'cats',
            tags: ['organs'],
            img: 'assets/placeholder-2.svg',
            desc: 'Szervhús macskáknak - természetes táplálék-kiegészítő.',
            rating: 4.6,
            reviews: 32,
            inStock: true
        },
        {
            id: 'p6',
            name: 'Fagyasztott hal mix 800g',
            price: 3299,
            cat: 'cats',
            tags: ['frozen', 'fish'],
            img: 'assets/placeholder-3.svg',
            desc: 'Tengeri és édesvizi halak keveréke macskáknak.',
            rating: 4.4,
            reviews: 58,
            inStock: true
        },
        {
            id: 'p7',
            name: 'Kutyakeksz természetes 250g',
            price: 1699,
            cat: 'treats',
            tags: ['treats', 'natural'],
            img: 'assets/placeholder-1.svg',
            desc: 'Házi készítésű kutyakeksz természetes alapanyagokból.',
            rating: 4.7,
            reviews: 94,
            inStock: true
        },
        {
            id: 'p8',
            name: 'BARF Vegyes csomag 2kg',
            price: 5999,
            originalPrice: 6999,
            cat: 'dogs',
            tags: ['sale', 'mixed'],
            img: 'assets/placeholder-2.svg',
            desc: 'Változatos húsfajták keveréke nagy kutyáknak.',
            rating: 4.8,
            reviews: 143,
            inStock: true
        },
        {
            id: 'p9',
            name: 'Bio zöldségkeverék 400g',
            price: 1299,
            cat: 'supplements',
            tags: ['bio', 'vegetables', 'new'],
            img: 'assets/placeholder-3.svg',
            desc: 'Fagyasztva szárított bio zöldségek BARF étrendhez.',
            rating: 4.3,
            reviews: 67,
            inStock: true
        },
        {
            id: 'p10',
            name: 'Fagyasztott nyúlhús 600g',
            price: 3799,
            cat: 'dogs',
            tags: ['frozen', 'rabbit'],
            img: 'assets/placeholder-1.svg',
            desc: 'Allergiás kutyáknak kiváló nyúlhús fagyasztott formában.',
            rating: 4.6,
            reviews: 71,
            inStock: true
        },
        {
            id: 'p11',
            name: 'Macska jutalomfalatok 150g',
            price: 1399,
            cat: 'treats',
            tags: ['treats', 'cats'],
            img: 'assets/placeholder-2.svg',
            desc: 'Speciális jutalomfalatok macskáknak, egészséges összetétellel.',
            rating: 4.5,
            reviews: 38,
            inStock: true
        },
        {
            id: 'p12',
            name: 'BARF Starter csomag',
            price: 4499,
            originalPrice: 5299,
            cat: 'starter',
            tags: ['sale', 'starter', 'new'],
            img: 'assets/placeholder-3.svg',
            desc: 'Tökéletes kezdő csomag BARF táplálásba váltóknak.',
            rating: 4.9,
            reviews: 156,
            inStock: true
        },
        {
            id: 'p13',
            name: 'Szárított marhafül 10db',
            price: 1199,
            cat: 'treats',
            tags: ['treats', 'dried', 'natural'],
            img: 'assets/placeholder-1.svg',
            desc: 'Természetesen szárított marhafül, hosszan tartó rágcsa.',
            rating: 4.4,
            reviews: 82,
            inStock: true
        },
        {
            id: 'p14',
            name: 'Fagyasztott kacsamell 700g',
            price: 4199,
            cat: 'cats',
            tags: ['frozen', 'duck', 'premium'],
            img: 'assets/placeholder-2.svg',
            desc: 'Prémium kacsamell, tökéletes finnyás macskáknak.',
            rating: 4.7,
            reviews: 43,
            inStock: true
        },
        {
            id: 'p15',
            name: 'BARF Komplett menü 1.5kg',
            price: 5699,
            cat: 'dogs',
            tags: ['complete', 'mixed'],
            img: 'assets/placeholder-3.svg',
            desc: 'Komplett BARF menü húsokkal, zöldségekkel és kiegészítőkkel.',
            rating: 4.8,
            reviews: 118,
            inStock: true
        }
    ];

    // Data management functions
    function readProducts() {
        try {
            const raw = localStorage.getItem(LS_PRODUCTS);
            return raw ? JSON.parse(raw) : defaults;
        } catch (e) {
            return defaults;
        }
    }

    function writeProducts(arr) {
        localStorage.setItem(LS_PRODUCTS, JSON.stringify(arr));
    }

    function readCart() {
        try {
            const raw = localStorage.getItem(LS_CART);
            return raw ? JSON.parse(raw) : [];
        } catch (e) {
            return [];
        }
    }

    function writeCart(c) {
        localStorage.setItem(LS_CART, JSON.stringify(c));
    }

    // Expose functions globally
    window.WooMiau = window.WooMiau || {};
    window.WooMiau.data = {
        readProducts,
        writeProducts,
        readCart,
        writeCart
    };

    // Product carousel management with Bootstrap
    class ProductCarousel {
        constructor(containerId, carouselId) {
            this.container = document.getElementById(containerId);
            this.carousel = document.getElementById(carouselId);
            this.itemsPerSlide = this.getItemsPerSlide();
            
            this.init();
        }
        
        getItemsPerSlide() {
            if (window.innerWidth >= 1200) return 4;
            if (window.innerWidth >= 992) return 3;
            if (window.innerWidth >= 768) return 2;
            return 1;
        }
        
        init() {
            this.renderProducts();
            this.setupResponsive();
        }
        
        renderProducts() {
            if (!this.container) return;
            
            const products = readProducts();
            let filteredProducts = products.slice(0, 15); // Show up to 15 products
            
            // Group products by slides
            const slides = [];
            for (let i = 0; i < filteredProducts.length; i += this.itemsPerSlide) {
                slides.push(filteredProducts.slice(i, i + this.itemsPerSlide));
            }
            
            if (slides.length === 0) return;
            
            // Create carousel items
            const carouselInner = this.carousel?.querySelector('.carousel-inner');
            if (!carouselInner) return;
            
            carouselInner.innerHTML = '';
            
            slides.forEach((slide, index) => {
                const carouselItem = document.createElement('div');
                carouselItem.className = `carousel-item${index === 0 ? ' active' : ''}`;
                
                const row = document.createElement('div');
                row.className = 'row g-4';
                
                slide.forEach(product => {
                    const col = document.createElement('div');
                    col.className = `col-md-${12 / this.itemsPerSlide}`;
                    col.innerHTML = this.createProductCard(product);
                    row.appendChild(col);
                });
                
                carouselItem.appendChild(row);
                carouselInner.appendChild(carouselItem);
            });
            
            // Hide controls if only one slide
            if (slides.length <= 1) {
                const controls = this.carousel?.querySelectorAll('.carousel-control-prev, .carousel-control-next');
                controls?.forEach(control => control.style.display = 'none');
            }
        }
        
        createProductCard(product) {
            const tagsHtml = product.tags ? product.tags.map(tag => 
                `<span class="product-tag ${tag}">${this.getTagLabel(tag)}</span>`
            ).join('') : '';
            
            const starsHtml = '★'.repeat(Math.floor(product.rating)) + 
                             (product.rating % 1 >= 0.5 ? '☆' : '') + 
                             '☆'.repeat(5 - Math.ceil(product.rating));
            
            return `
                <div class="product-card h-100">
                    <div class="product-image position-relative">
                        <img src="${product.img}" alt="${product.name}" class="w-100 h-100 object-fit-cover">
                        ${tagsHtml ? `<div class="product-tags">${tagsHtml}</div>` : ''}
                    </div>
                    <div class="product-body">
                        <h5 class="product-title">${product.name}</h5>
                        <p class="text-muted small mb-2">${product.desc}</p>
                        <div class="d-flex align-items-center mb-2">
                            <div class="text-warning me-2">${starsHtml}</div>
                            <small class="text-muted">(${product.reviews})</small>
                        </div>
                        <div class="d-flex align-items-center justify-content-between">
                            <div class="product-price">
                                <span class="fw-bold text-primary">${this.formatPrice(product.price)}</span>
                                ${product.originalPrice ? `<small class="text-decoration-line-through text-muted ms-1">${this.formatPrice(product.originalPrice)}</small>` : ''}
                            </div>
                            <button class="btn btn-outline-primary btn-sm" onclick="viewProduct('${product.id}')">
                                Megnézem
                            </button>
                        </div>
                    </div>
                </div>
            `;
        }
        
        getTagLabel(tag) {
            const labels = {
                sale: 'Akciós',
                frozen: 'Fagyasztott',
                new: 'Új',
                premium: 'Prémium',
                treats: 'Falatok',
                organs: 'Szervhús',
                bio: 'Bio',
                natural: 'Természetes',
                starter: 'Kezdő',
                complete: 'Komplett'
            };
            return labels[tag] || tag;
        }
        
        formatPrice(price) {
            return new Intl.NumberFormat('hu-HU', {
                minimumFractionDigits: 0,
                maximumFractionDigits: 0
            }).format(price) + ' Ft';
        }
        
        setupResponsive() {
            let resizeTimeout;
            window.addEventListener('resize', () => {
                clearTimeout(resizeTimeout);
                resizeTimeout = setTimeout(() => {
                    const newItemsPerSlide = this.getItemsPerSlide();
                    if (newItemsPerSlide !== this.itemsPerSlide) {
                        this.itemsPerSlide = newItemsPerSlide;
                        this.renderProducts();
                    }
                }, 250);
            });
        }
    }

    // Main application initialization
    function initializeApp() {
        updateCartCount();
        
        const page = document.body.dataset.page;
        
        switch (page) {
            case 'home':
                initHome();
                break;
            case 'shop':
                initShop();
                break;
            case 'product':
                initProduct();
                break;
            case 'cart':
                initCart();
                break;
            case 'admin':
                initAdmin();
                break;
        }
    }

    function initHome() {
        // Initialize product carousels
        const featuredCarousel = new ProductCarousel('featured-products', 'featuredCarousel');
        const newProductsCarousel = new ProductCarousel('new-products', 'newProductsCarousel');
        
        // Add some animation to elements when they come into view
        observeElements();
    }

    function observeElements() {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('fade-in-up');
                }
            });
        }, { threshold: 0.1 });

        // Observe sections for animation
        document.querySelectorAll('.products-section, .categories-section, .barf-info-section').forEach(el => {
            observer.observe(el);
        });
    }

    function updateCartCount() {
        const cartCountEl = document.getElementById('cart-count');
        if (cartCountEl) {
            const cart = readCart();
            const totalItems = cart.reduce((sum, item) => sum + item.qty, 0);
            cartCountEl.textContent = totalItems;
            cartCountEl.style.display = totalItems > 0 ? 'inline-block' : 'none';
        }
    }

    // Shop page functionality
    function initShop() {
        renderShopGrid();
        initShopFilters();
        setupPagination();
    }

    function renderShopGrid() {
        const grid = document.getElementById('shop-grid');
        if (!grid) return;
        
        const products = readProducts();
        const urlParams = new URLSearchParams(window.location.search);
        const category = urlParams.get('cat');
        const sort = urlParams.get('sort');
        const page = parseInt(urlParams.get('page')) || 1;
        const itemsPerPage = 12;
        
        let filteredProducts = products;
        
        // Filter by category
        if (category && category !== 'all') {
            filteredProducts = products.filter(p => {
                if (category === 'frozen') return p.tags && p.tags.includes('frozen');
                if (category === 'treats') return p.cat === 'treats';
                return p.cat === category;
            });
        }
        
        // Sort products
        if (sort === 'price-asc') {
            filteredProducts.sort((a, b) => a.price - b.price);
        } else if (sort === 'price-desc') {
            filteredProducts.sort((a, b) => b.price - a.price);
        } else if (sort === 'rating') {
            filteredProducts.sort((a, b) => b.rating - a.rating);
        } else if (sort === 'new') {
            filteredProducts.sort((a, b) => {
                const aNew = a.tags && a.tags.includes('new');
                const bNew = b.tags && b.tags.includes('new');
                return bNew - aNew;
            });
        }
        
        // Pagination
        const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
        const startIndex = (page - 1) * itemsPerPage;
        const paginatedProducts = filteredProducts.slice(startIndex, startIndex + itemsPerPage);
        
        // Update results count
        const resultsCount = document.getElementById('results-count');
        if (resultsCount) {
            resultsCount.textContent = `${filteredProducts.length} termék találva`;
        }
        
        grid.innerHTML = '';
        
        if (paginatedProducts.length === 0) {
            grid.innerHTML = '<div class="col-12"><div class="alert alert-info text-center">Nem találhatók termékek ebben a kategóriában.</div></div>';
            return;
        }
        
        paginatedProducts.forEach(product => {
            const col = document.createElement('div');
            col.className = 'col-lg-3 col-md-4 col-sm-6 mb-4';
            col.innerHTML = createShopProductCard(product);
            grid.appendChild(col);
        });
        
        // Update pagination
        updatePagination(page, totalPages);
    }

    function createShopProductCard(product) {
        const tagsHtml = product.tags ? product.tags.map(tag => 
            `<span class="product-tag ${tag}">${getTagLabel(tag)}</span>`
        ).join('') : '';
        
        const starsHtml = '★'.repeat(Math.floor(product.rating)) + 
                         (product.rating % 1 >= 0.5 ? '☆' : '') + 
                         '☆'.repeat(5 - Math.ceil(product.rating));
        
        return `
            <div class="product-card h-100">
                <div class="product-image position-relative">
                    <img src="${product.img}" alt="${product.name}" class="w-100 h-100 object-fit-cover">
                    ${tagsHtml ? `<div class="product-tags">${tagsHtml}</div>` : ''}
                </div>
                <div class="product-body">
                    <h5 class="product-title">${product.name}</h5>
                    <p class="text-muted small mb-2">${product.desc}</p>
                    <div class="d-flex align-items-center mb-2">
                        <div class="text-warning me-2">${starsHtml}</div>
                        <small class="text-muted">(${product.reviews})</small>
                    </div>
                    <div class="d-flex align-items-center justify-content-between">
                        <div class="product-price">
                            <span class="fw-bold text-primary">${formatPrice(product.price)}</span>
                            ${product.originalPrice ? `<small class="text-decoration-line-through text-muted ms-1">${formatPrice(product.originalPrice)}</small>` : ''}
                        </div>
                        <button class="btn btn-outline-primary btn-sm" onclick="viewProduct('${product.id}')">
                            Megnézem
                        </button>
                    </div>
                </div>
            </div>
        `;
    }

    function initShopFilters() {
        // Category filters
        document.querySelectorAll('.filter-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                const category = btn.dataset.category;
                updateURL('cat', category);
                updateURL('page', '1'); // Reset to first page
                renderShopGrid();
                
                // Update active state
                document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
            });
        });
        
        // Sort dropdown
        const sortSelect = document.getElementById('sort-select');
        if (sortSelect) {
            sortSelect.addEventListener('change', (e) => {
                updateURL('sort', e.target.value);
                updateURL('page', '1'); // Reset to first page
                renderShopGrid();
            });
        }
    }

    function setupPagination() {
        document.addEventListener('click', (e) => {
            if (e.target.matches('.page-link')) {
                e.preventDefault();
                const page = e.target.dataset.page;
                if (page && page !== 'prev' && page !== 'next') {
                    updateURL('page', page);
                    renderShopGrid();
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                }
            }
        });
    }

    function updatePagination(currentPage, totalPages) {
        const pagination = document.getElementById('pagination');
        if (!pagination || totalPages <= 1) {
            if (pagination) pagination.style.display = 'none';
            return;
        }
        
        pagination.style.display = 'flex';
        pagination.innerHTML = '';
        
        // Previous button
        const prevBtn = document.createElement('li');
        prevBtn.className = `page-item${currentPage === 1 ? ' disabled' : ''}`;
        prevBtn.innerHTML = `<a class="page-link" href="#" data-page="${currentPage - 1}">Előző</a>`;
        pagination.appendChild(prevBtn);
        
        // Page numbers
        const startPage = Math.max(1, currentPage - 2);
        const endPage = Math.min(totalPages, currentPage + 2);
        
        for (let i = startPage; i <= endPage; i++) {
            const pageItem = document.createElement('li');
            pageItem.className = `page-item${i === currentPage ? ' active' : ''}`;
            pageItem.innerHTML = `<a class="page-link" href="#" data-page="${i}">${i}</a>`;
            pagination.appendChild(pageItem);
        }
        
        // Next button
        const nextBtn = document.createElement('li');
        nextBtn.className = `page-item${currentPage === totalPages ? ' disabled' : ''}`;
        nextBtn.innerHTML = `<a class="page-link" href="#" data-page="${currentPage + 1}">Következő</a>`;
        pagination.appendChild(nextBtn);
    }

    function updateURL(param, value) {
        const url = new URL(window.location);
        if (value && value !== 'all') {
            url.searchParams.set(param, value);
        } else {
            url.searchParams.delete(param);
        }
        window.history.pushState({}, '', url);
    }

    // Utility functions
    function getTagLabel(tag) {
        const labels = {
            sale: 'Akciós',
            frozen: 'Fagyasztott',
            new: 'Új',
            premium: 'Prémium',
            treats: 'Falatok',
            organs: 'Szervhús',
            bio: 'Bio',
            natural: 'Természetes',
            starter: 'Kezdő',
            complete: 'Komplett'
        };
        return labels[tag] || tag;
    }

    function formatPrice(price) {
        return new Intl.NumberFormat('hu-HU', {
            minimumFractionDigits: 0,
            maximumFractionDigits: 0
        }).format(price) + ' Ft';
    }

    // Global functions for onclick handlers
    window.viewProduct = function(id) {
        window.location.href = `product.html?id=${id}`;
    };

    window.addToCart = function(id, qty = 1) {
        const cart = readCart();
        const existingItem = cart.find(item => item.id === id);
        
        if (existingItem) {
            existingItem.qty += qty;
        } else {
            cart.push({ id: id, qty: qty });
        }
        
        writeCart(cart);
        updateCartCount();
        
        // Show toast notification using Bootstrap
        showToast('Termék hozzáadva a kosárhoz!', 'success');
    };

    function showToast(message, type = 'info') {
        // Create toast element
        const toastHtml = `
            <div class="toast align-items-center text-bg-${type} border-0" role="alert">
                <div class="d-flex">
                    <div class="toast-body">
                        ${message}
                    </div>
                    <button type="button" class="btn-close btn-close-white me-2 m-auto" data-bs-dismiss="toast"></button>
                </div>
            </div>
        `;
        
        // Add to page
        let toastContainer = document.querySelector('.toast-container');
        if (!toastContainer) {
            toastContainer = document.createElement('div');
            toastContainer.className = 'toast-container position-fixed top-0 end-0 p-3';
            document.body.appendChild(toastContainer);
        }
        
        toastContainer.insertAdjacentHTML('beforeend', toastHtml);
        const toastElement = toastContainer.lastElementChild;
        
        // Initialize and show toast
        const toast = new bootstrap.Toast(toastElement);
        toast.show();
        
        // Remove element after hiding
        toastElement.addEventListener('hidden.bs.toast', () => {
            toastElement.remove();
        });
    }

    // Cart functionality
    function initCart() {
        renderCart();
        setupCartEvents();
    }

    function renderCart() {
        const cartItems = document.getElementById('cart-items');
        const cartTotal = document.getElementById('cart-total');
        
        if (!cartItems) return;
        
        const cart = readCart();
        const products = readProducts();
        
        if (cart.length === 0) {
            cartItems.innerHTML = '<div class="text-center py-5"><h4 class="text-muted">A kosár üres</h4><a href="shop.html" class="btn btn-primary">Vásárlás kezdése</a></div>';
            if (cartTotal) cartTotal.textContent = '0 Ft';
            return;
        }
        
        cartItems.innerHTML = '';
        let total = 0;
        
        cart.forEach(item => {
            const product = products.find(p => p.id === item.id);
            if (!product) return;
            
            const itemTotal = product.price * item.qty;
            total += itemTotal;
            
            const cartItemHtml = `
                <div class="cart-item d-flex align-items-center p-3 mb-3 bg-white rounded shadow-sm">
                    <img src="${product.img}" alt="${product.name}" class="cart-item-image me-3" style="width: 80px; height: 80px; object-fit: cover;">
                    <div class="flex-grow-1">
                        <h6 class="mb-1">${product.name}</h6>
                        <p class="text-muted small mb-0">${product.desc}</p>
                        <div class="text-primary fw-bold">${formatPrice(product.price)}</div>
                    </div>
                    <div class="d-flex align-items-center me-3">
                        <button class="btn btn-outline-secondary btn-sm" onclick="updateCartItem('${item.id}', ${item.qty - 1})">-</button>
                        <span class="mx-3 fw-bold">${item.qty}</span>
                        <button class="btn btn-outline-secondary btn-sm" onclick="updateCartItem('${item.id}', ${item.qty + 1})">+</button>
                    </div>
                    <div class="text-end me-3">
                        <div class="fw-bold text-primary">${formatPrice(itemTotal)}</div>
                    </div>
                    <button class="btn btn-outline-danger btn-sm" onclick="removeFromCart('${item.id}')">
                        <i class="bi bi-trash"></i>
                    </button>
                </div>
            `;
            cartItems.insertAdjacentHTML('beforeend', cartItemHtml);
        });
        
        if (cartTotal) cartTotal.textContent = formatPrice(total);
    }

    function setupCartEvents() {
        // Clear cart button
        const clearCartBtn = document.getElementById('clear-cart');
        if (clearCartBtn) {
            clearCartBtn.addEventListener('click', () => {
                if (confirm('Biztosan ki szeretnéd üríteni a kosarat?')) {
                    writeCart([]);
                    renderCart();
                    updateCartCount();
                    showToast('Kosár kiürítve', 'info');
                }
            });
        }
    }

    window.updateCartItem = function(productId, newQty) {
        if (newQty <= 0) {
            removeFromCart(productId);
            return;
        }
        
        const cart = readCart();
        const item = cart.find(i => i.id === productId);
        if (item) {
            item.qty = newQty;
            writeCart(cart);
            renderCart();
            updateCartCount();
        }
    };

    window.removeFromCart = function(productId) {
        const cart = readCart().filter(item => item.id !== productId);
        writeCart(cart);
        renderCart();
        updateCartCount();
        showToast('Termék eltávolítva a kosárból', 'info');
    };

    // Initialize app when DOM is loaded
    document.addEventListener('DOMContentLoaded', initializeApp);

    // Search functionality
    document.addEventListener('DOMContentLoaded', function() {
        const searchForm = document.querySelector('form[role="search"]');
        if (searchForm) {
            searchForm.addEventListener('submit', function(e) {
                e.preventDefault();
                const searchInput = searchForm.querySelector('input[type="search"]');
                const query = searchInput.value.trim();
                
                if (query) {
                    window.location.href = `shop.html?search=${encodeURIComponent(query)}`;
                }
            });
        }
    });

})();