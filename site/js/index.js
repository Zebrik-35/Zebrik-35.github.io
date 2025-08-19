document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                
                const targetId = this.getAttribute('href');
                if (targetId === '#') return;
                
                const targetElement = document.querySelector(targetId);
                if (targetElement) {
                    window.scrollTo({
                        top: targetElement.offsetTop - 80,
                        behavior: 'smooth'
                    });
                }
            });
        });
        
        
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