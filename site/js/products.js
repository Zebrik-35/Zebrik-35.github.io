
    
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
    
    
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
            document.body.style.overflow = '';
        });
    });
    
    
    document.querySelectorAll('.filter-options input').forEach(checkbox => {
        checkbox.addEventListener('change', filterProducts);
    });
    
    
    const applyFiltersBtn = document.querySelector('.filters .btn');
    if (applyFiltersBtn) {
        applyFiltersBtn.addEventListener('click', filterProducts);
    }
    
    // Список продуктов
    const products = [
        {
            id: 1,
            name: "Аккумулятор для Алиса Мини 2",
            type: "battery",
            model: "mini",
            price: "2 990 ₽",
            features: [
                "Размеры: 120x120x35 мм",
                "Вес: 150 гр",
                "Емкость: 8000 мАч",
                "Быстрая зарядка"
            ]
        },
        {
            id: 2,
            name: "Аккумулятор для Алиса Мини 2 с часами",
            type: "battery",
            model: "mini",
            price: "3 790 ₽",
            features: [
                "Размеры: 125x125x40 мм",
                "Вес: 180 гр",
                "Емкость: 10000 мАч",
                "Быстрая зарядка 3.0"
            ]
        },
        {
            id: 3,
            name: "Умная розетка с Алисой",
            type: "socket",
            model: "mini",
            price: "1 590 ₽",
            features: [
                "Размеры: 65x65x45 мм",
                "Вес: 85 гр",
                "Управление через приложение",
                "Защита от перегрузок"
            ]
        },
        {
            id: 4,
            name: "Умный свет с Алисой",
            type: "light",
            model: "mini",
            price: "2 290 ₽",
            features: [
                "Размеры: 90x90x25 мм",
                "Вес: 120 гр",
                "RGB подсветка",
                "Управление со смартфона"
            ]
        },
        {
            id: 5,
            name: "Аккумулятор для Алиса Миди",
            type: "battery",
            model: "midi",
            price: "4 490 ₽",
            features: [
                "Размеры: 140x140x40 мм",
                "Вес: 200 гр",
                "Емкость: 12000 мАч",
                "Быстрая зарядка"
            ]
        },
        {
            id: 6,
            name: "Умная розетка с Алисой",
            type: "socket",
            model: "max",
            price: "1 890 ₽",
            features: [
                "Размеры: 75x75x50 мм",
                "Вес: 100 гр",
                "Управление через приложение",
                "Двойная защита"
            ]
        }
    ];
    
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
        const filteredProducts = products.filter(product => {
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
            productsGrid.innerHTML = `
                <div class="no-products">
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
            
            // Определяем цвет фона в зависимости от типа продукта
            let gradientStyle = 'background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);';
            let iconClass = 'fas fa-battery-full';
            
            if (product.type === 'socket') {
                gradientStyle = 'background: linear-gradient(135deg, #4facfe 0%, #00f2fe 100%);';
                iconClass = 'fas fa-plug';
            } else if (product.type === 'light') {
                gradientStyle = 'background: linear-gradient(135deg, #5ee7df 0%, #b490ca 100%);';
                iconClass = 'fas fa-lightbulb';
            }
            
            // Создаем HTML для карточки продукта
            productCard.innerHTML = `
                <div class="product-image" style="${gradientStyle}">
                    <i class="${iconClass}"></i>
                </div><div class="product-info">
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
    
    // Инициализация - отображаем все продукты при загрузке страницы
    document.addEventListener('DOMContentLoaded', function() {
        filterProducts();
    });
