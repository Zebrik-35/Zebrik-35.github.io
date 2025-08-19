document.addEventListener('DOMContentLoaded', function() {
    const navSlide = () => {
        const burger = document.querySelector('.burger');
        const nav = document.querySelector('.nav-links');
        const navLinks = document.querySelectorAll('.nav-links li');
        const body = document.body;
        
        if (!burger || !nav) {
            console.log('Элементы не найдены');
            return;
        }
        
        console.log('Элементы найдены, добавляю обработчики');
        
        burger.addEventListener('click', () => {
            console.log('Бургер кликнут');
            
            // Переключение навбара
            nav.classList.toggle('nav-active');
            
            // Блокировка скролла
            if (nav.classList.contains('nav-active')) {
                body.style.overflow = 'hidden';
            } else {
                body.style.overflow = '';
            }
            
            // Анимация ссылок
            navLinks.forEach((link, index) => {
                if (nav.classList.contains('nav-active')) {
                    link.style.animation = 'navLinkFade 0.5s ease forwards ${index / 7 + 0.3}s';
                } else {
                    link.style.animation = 'none';
                }
            });
            
            // Анимация бургера
            burger.classList.toggle('toggle');
        });

        // Закрытие при клике на ссылку
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                nav.classList.remove('nav-active');
                body.style.overflow = '';
                burger.classList.remove('toggle');
                navLinks.forEach(link => {
                    link.style.animation = 'none';
                });
            });
        });
    }
    
    navSlide();
});