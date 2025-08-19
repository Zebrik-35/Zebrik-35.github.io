

// Глобальная переменная для хранения продуктов
let productsData = [];

// Мобильное меню
const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
const closeMenuBtn = document.querySelector('.close-menu');
const navLinks = document.querySelector('.nav-links');

if (mobileMenuBtn) {
    mobileMenuBtn.addEventListener('click', () => {
        navLinks.classList.add('active');
        document.body.style.overflow = 'hidden';
    });
}

if (closeMenuBtn) {
    closeMenuBtn.addEventListener('click', () => {
        navLinks.classList.remove('active');
        document.body.style.overflow = '';
    });
}

// Закрытие меню при клике на ссылку
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('active');
        document.body.style.overflow = '';
    });
});

// Загрузка данных из JSON файла
async function loadProductsData() {
    try {
        const response = await fetch('../data/products.json');
        const data = await response.json();
        productsData = data.products;
        
        // Инициализируем фильтрацию после загрузки данных
        initFilters();
        filterProducts();
    } catch (error) {
        console.error('Ошибка загрузки данных:', error);
        document.querySelector('.products-grid').innerHTML = 
            `<div class="no-products">
                <i class="fas fa-exclamation-triangle"></i>
                <h3>Ошибка загрузки данных</h3>
                <p>Попробуйте обновить страницу</p>
            </div>`
        ;
    }
}

// Инициализация фильтров
function initFilters() {
    // Фильтрация продуктов
    document.querySelectorAll('.filter-options input').forEach(checkbox => {
        checkbox.addEventListener('change', filterProducts);
    });
    
    // Кнопка применения фильтров
    const applyFiltersBtn = document.querySelector('.filters .btn');
    if (applyFiltersBtn) {
        applyFiltersBtn.addEventListener('click', filterProducts);
    }
}

// Функция фильтрации продуктов
function filterProducts() {
    // Получаем выбранные типы аксессуаров
    const selectedTypes = [];
    if (document.getElementById('type-battery').checked) selectedTypes.push('battery');
    if (document.getElementById('type-socket').checked) selectedTypes.push('socket');
    if (document.getElementById('type-light').checked) selectedTypes.push('light');
    
    // Получаем выбранные модели колонок
    const selectedModels = [];
    if (document.getElementById('model-alice-mini').checked) selectedModels.push('mini');
    if (document.getElementById('model-alice-midi').checked) selectedModels.push('midi');
    if (document.getElementById('model-alice-max').checked) selectedModels.push('max');
    
    // Фильтруем продукты
    const filteredProducts = productsData.filter(product => {
        const typeMatch = selectedTypes.length === 0 || selectedTypes.includes(product.type);
        const modelMatch = selectedModels.length === 0 || selectedModels.includes(product.model);
        return typeMatch && modelMatch;
    });
    
    // Отображаем отфильтрованные продукты
    renderProducts(filteredProducts);
}

// Функция отрисовки продуктов
function renderProducts(productsToRender) {
    const productsGrid = document.querySelector('.products-grid');
    
    // Очищаем сетку продуктов
    productsGrid.innerHTML = '';
    
    // Если нет продуктов, соответствующих фильтрам
    if (productsToRender.length === 0) {
        productsGrid.innerHTML = 
            `<div class="no-products">
                <i class="fas fa-search"></i>
                <h3>Ничего не найдено</h3>
                <p>Попробуйте изменить параметры фильтрации</p>
            </div>`
        ;
        return;
    }
    
    // Добавляем каждый продукт в сетку
    productsToRender.forEach(product => {
        const productCard = document.createElement('div');
        productCard.className = 'product-card';
        
        // Создаем HTML для карточки продукта
        productCard.innerHTML = 
            `<div class="product-image">
                <img src="${product.image}" alt="${product.name}" loading="lazy">
            </div>
            <div class="product-info">
                <h3>${product.name}</h3>
                <ul class="product-features">
                    ${product.features.map(feature => `<li><i class="fas fa-check"></i> ${feature}</li>`).join('')}
                </ul>
                <div class="product-price">
                    <div class="price">${product.price}</div>
                    <a href="#" class="btn btn-sm">Заказать</a>
                </div>
            </div>`
        ;
        
        // Добавляем карточку в сетку
        productsGrid.appendChild(productCard);
    });
}

// Инициализация при загрузке страницы
document.addEventListener('DOMContentLoaded', function() {
    loadProductsData();
});