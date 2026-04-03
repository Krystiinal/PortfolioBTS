document.addEventListener('DOMContentLoaded', function() {
    // Animation au scroll - Fade in elements
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);

    // Observer tous les éléments avec la classe fade-in
    const fadeElements = document.querySelectorAll('.fade-in');
    fadeElements.forEach(el => observer.observe(el));

    // Gestion du menu mobile
    const menuToggle = document.getElementById('menu-toggle');
    const mobileMenu = document.getElementById('mobile-menu');

    if (menuToggle && mobileMenu) {
        menuToggle.addEventListener('click', function() {
            mobileMenu.classList.toggle('hidden');
        });

        // Fermer le menu mobile lors du clic sur un lien
        const mobileLinks = mobileMenu.querySelectorAll('a');
        mobileLinks.forEach(link => {
            link.addEventListener('click', function() {
                mobileMenu.classList.add('hidden');
            });
        });
    }

    // Smooth scroll pour les ancres
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const headerOffset = 80;
                const elementPosition = target.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Transition entre les tableaux Stack Technique
    window.switchProject = function(project) {
        const tables = document.querySelectorAll('.stack-table');
        const buttons = document.querySelectorAll('.stack-tab');

        // Fade out toutes les tables
        tables.forEach(t => {
            t.style.opacity = '0';
            t.style.transform = 'translateY(10px)';
        });

        setTimeout(() => {
            tables.forEach(t => t.classList.add('hidden'));

            const target = document.getElementById('table-' + project);
            if (target) {
                target.classList.remove('hidden');
                requestAnimationFrame(() => {
                    target.style.opacity = '1';
                    target.style.transform = 'translateY(0)';
                });
            }
        }, 200);

        // Mise à jour des boutons
        buttons.forEach(btn => {
            btn.classList.remove('bg-turquoise', 'text-dark');
            btn.classList.add('text-turquoise', 'bg-transparent');
        });
        const activeBtn = document.getElementById('btn-' + project);
        if (activeBtn) {
            activeBtn.classList.remove('text-turquoise', 'bg-transparent');
            activeBtn.classList.add('bg-turquoise', 'text-dark');
        }
    };

    // Init transition style sur les tables
    document.querySelectorAll('.stack-table').forEach(t => {
        t.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
        t.style.opacity = '1';
        t.style.transform = 'translateY(0)';
    });


    // Highlight active section dans la navigation
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('nav a[href^="#"]');

    function highlightNavigation() {
        const scrollY = window.pageYOffset;

        sections.forEach(section => {
            const sectionHeight = section.offsetHeight;
            const sectionTop = section.offsetTop - 100;
            const sectionId = section.getAttribute('id');

            if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                navLinks.forEach(link => {
                    link.classList.remove('text-turquoise');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('text-turquoise');
                    }
                });
            }
        });
    }

    window.addEventListener('scroll', highlightNavigation);
});
