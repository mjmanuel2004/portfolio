// Initialisation d'AOS (Animate On Scroll) avec configuration optimisée
AOS.init({
    duration: 1200,
    easing: 'ease-out-cubic',
    once: true,
    offset: 100,
    delay: 0,
    anchorPlacement: 'top-bottom'
});

// Navigation mobile améliorée
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');
const navLinks = document.querySelectorAll('.nav-link');

// Toggle menu mobile avec animation fluide
hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
    
    // Animation des barres du hamburger
    const bars = hamburger.querySelectorAll('.bar');
    bars.forEach((bar, index) => {
        if (hamburger.classList.contains('active')) {
            bar.style.animation = `slideIn 0.3s ease forwards ${index * 0.1}s`;
        } else {
            bar.style.animation = 'none';
        }
    });
});

// Fermer le menu quand on clique sur un lien
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

// Navigation smooth scroll améliorée
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const offsetTop = target.offsetTop - 80;
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// Navbar background au scroll avec effet de parallaxe
let lastScrollY = window.scrollY;
const navbar = document.querySelector('.navbar');

window.addEventListener('scroll', () => {
    const currentScrollY = window.scrollY;
    
    // Effet de transparence et flou
    if (currentScrollY > 100) {
        navbar.style.background = 'rgba(255, 255, 255, 0.98)';
        navbar.style.backdropFilter = 'blur(20px)';
        navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
    } else {
        navbar.style.background = 'rgba(255, 255, 255, 0.95)';
        navbar.style.backdropFilter = 'blur(10px)';
        navbar.style.boxShadow = 'none';
    }
    
    // Effet de parallaxe subtil
    const scrolled = window.pageYOffset;
    const rate = scrolled * -0.3;
    navbar.style.transform = `translateY(${rate}px)`;
    
    lastScrollY = currentScrollY;
});

// Animation du texte de typing améliorée
function typeWriter(element, text, speed = 80) {
    let i = 0;
    element.innerHTML = '';
    
    function type() {
        if (i < text.length) {
            element.innerHTML += text.charAt(i);
            i++;
            setTimeout(type, speed);
        } else {
            // Ajouter un effet de clignotement après la fin
            element.style.borderRight = '3px solid transparent';
            setTimeout(() => {
                element.style.borderRight = '3px solid white';
            }, 500);
        }
    }
    
    type();
}

// Démarrer l'animation de typing avec le nom complet
const typingElement = document.querySelector('.typing-text');
if (typingElement) {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                typeWriter(typingElement, 'Bonjour, je suis Emmanuel Monsan');
                observer.unobserve(entry.target);
            }
        });
    });
    observer.observe(typingElement);
}

// Filtrage des projets amélioré avec animations
const filterButtons = document.querySelectorAll('.filter-btn');
const projectCards = document.querySelectorAll('.project-card');

filterButtons.forEach(button => {
    button.addEventListener('click', () => {
        // Retirer la classe active de tous les boutons
        filterButtons.forEach(btn => btn.classList.remove('active'));
        // Ajouter la classe active au bouton cliqué
        button.classList.add('active');
        
        const filter = button.getAttribute('data-filter');
        
        // Animation de filtrage avec stagger
        projectCards.forEach((card, index) => {
            const category = card.getAttribute('data-category');
            
            if (filter === 'all' || category === filter) {
                card.style.display = 'block';
                card.style.animation = `fadeInUp 0.6s ease ${index * 0.1}s both`;
            } else {
                card.style.animation = 'fadeOut 0.3s ease forwards';
                setTimeout(() => {
                    card.style.display = 'none';
                }, 300);
            }
        });
    });
});

// Animation des barres de compétences avec effet de progression
function animateSkillBars() {
    const skillBars = document.querySelectorAll('.skill-progress');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const progressBar = entry.target;
                const width = progressBar.style.width;
                progressBar.style.width = '0%';
                
                // Animation de progression avec effet de rebond
                setTimeout(() => {
                    progressBar.style.width = width;
                    progressBar.style.transition = 'width 1.5s cubic-bezier(0.4, 0, 0.2, 1)';
                }, 200);
                
                observer.unobserve(entry.target);
            }
        });
    });
    
    skillBars.forEach(bar => observer.observe(bar));
}

// Initialiser l'animation des barres de compétences
animateSkillBars();

// Compteur animé pour les statistiques avec effet de rebond
function animateCounters() {
    const counters = document.querySelectorAll('.stat-number');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const counter = entry.target;
                const target = parseInt(counter.textContent.replace('+', '').replace('%', ''));
                const increment = target / 60;
                let current = 0;
                
                const updateCounter = () => {
                    if (current < target) {
                        current += increment;
                        const displayValue = Math.ceil(current);
                        counter.textContent = displayValue + (counter.textContent.includes('+') ? '+' : counter.textContent.includes('%') ? '%' : '');
                        requestAnimationFrame(updateCounter);
                    } else {
                        counter.textContent = target + (counter.textContent.includes('+') ? '+' : counter.textContent.includes('%') ? '%' : '');
                    }
                };
                
                updateCounter();
                observer.unobserve(entry.target);
            }
        });
    });
    
    counters.forEach(counter => observer.observe(counter));
}

// Initialiser les compteurs animés
animateCounters();

// Formulaire de contact amélioré avec validation avancée
const contactForm = document.getElementById('contactForm');

if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Récupérer les données du formulaire
        const formData = new FormData(this);
        const name = formData.get('name');
        const email = formData.get('email');
        const company = formData.get('company');
        const subject = formData.get('subject');
        const message = formData.get('message');
        
        // Validation avancée
        if (!name || !email || !subject || !message) {
            showNotification('Veuillez remplir tous les champs obligatoires', 'error');
            return;
        }
        
        if (!isValidEmail(email)) {
            showNotification('Veuillez entrer une adresse email valide', 'error');
            return;
        }
        
        if (message.length < 10) {
            showNotification('Votre message doit contenir au moins 10 caractères', 'error');
            return;
        }
        
        // Simulation d'envoi avec animation de chargement
        const submitBtn = this.querySelector('button[type="submit"]');
        const originalText = submitBtn.innerHTML;
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Envoi en cours...';
        submitBtn.disabled = true;
        
        setTimeout(() => {
            showNotification('Message envoyé avec succès ! Je vous répondrai dans les plus brefs délais.', 'success');
            this.reset();
            submitBtn.innerHTML = originalText;
            submitBtn.disabled = false;
        }, 2000);
    });
}

// Validation email améliorée
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Système de notification amélioré avec différents types
function showNotification(message, type = 'info') {
    // Créer l'élément de notification
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <div class="notification-icon">
                ${type === 'success' ? '<i class="fas fa-check-circle"></i>' : 
                  type === 'error' ? '<i class="fas fa-exclamation-circle"></i>' : 
                  '<i class="fas fa-info-circle"></i>'}
            </div>
            <div class="notification-text">
                <span class="notification-message">${message}</span>
            </div>
            <button class="notification-close">&times;</button>
        </div>
    `;
    
    // Styles pour la notification
    const colors = {
        success: '#10b981',
        error: '#ef4444',
        info: '#3b82f6'
    };
    
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${colors[type]};
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 12px;
        box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
        z-index: 10000;
        transform: translateX(100%);
        transition: transform 0.4s cubic-bezier(0.4, 0, 0.2, 1);
        max-width: 400px;
        font-family: 'Inter', sans-serif;
    `;
    
    // Ajouter au DOM
    document.body.appendChild(notification);
    
    // Animer l'entrée
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Fermer la notification
    const closeBtn = notification.querySelector('.notification-close');
    closeBtn.addEventListener('click', () => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            if (document.body.contains(notification)) {
                document.body.removeChild(notification);
            }
        }, 400);
    });
    
    // Auto-fermeture après 6 secondes
    setTimeout(() => {
        if (document.body.contains(notification)) {
            notification.style.transform = 'translateX(100%)';
            setTimeout(() => {
                if (document.body.contains(notification)) {
                    document.body.removeChild(notification);
                }
            }, 400);
        }
    }, 6000);
}

// Effet parallaxe amélioré pour le hero
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero');
    if (hero) {
        const rate = scrolled * -0.5;
        hero.style.transform = `translateY(${rate}px)`;
    }
});

// Animation des cartes de projets au hover avec effet 3D
projectCards.forEach(card => {
    card.addEventListener('mouseenter', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        card.style.transform = 'translateY(-12px) scale(1.02) rotateX(2deg) rotateY(2deg)';
        card.style.boxShadow = '0 25px 50px rgba(0, 0, 0, 0.15)';
    });
    
    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        const rotateX = (y - centerY) / 10;
        const rotateY = (centerX - x) / 10;
        
        card.style.transform = `translateY(-12px) scale(1.02) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
    });
    
    card.addEventListener('mouseleave', () => {
        card.style.transform = 'translateY(0) scale(1) rotateX(0deg) rotateY(0deg)';
        card.style.boxShadow = 'var(--shadow-lg)';
    });
});

// Lazy loading pour les images avec effet de fade
function lazyLoadImages() {
    const images = document.querySelectorAll('img[data-src]');
    
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.style.opacity = '0';
                img.style.transition = 'opacity 0.5s ease';
                
                img.onload = () => {
                    img.style.opacity = '1';
                };
                
                img.classList.remove('lazy');
                imageObserver.unobserve(img);
            }
        });
    });
    
    images.forEach(img => imageObserver.observe(img));
}

// Initialiser le lazy loading
lazyLoadImages();

// Animation des icônes de compétences avec effet de rebond
const skillItems = document.querySelectorAll('.skill-item');

skillItems.forEach(item => {
    item.addEventListener('mouseenter', () => {
        const icon = item.querySelector('i');
        icon.style.transform = 'scale(1.2) rotate(5deg)';
        icon.style.transition = 'transform 0.3s cubic-bezier(0.4, 0, 0.2, 1)';
    });
    
    item.addEventListener('mouseleave', () => {
        const icon = item.querySelector('i');
        icon.style.transform = 'scale(1) rotate(0deg)';
    });
});

// Effet de particules en arrière-plan amélioré
function createParticles() {
    const hero = document.querySelector('.hero');
    if (!hero) return;
    
    // Supprimer les particules existantes
    const existingParticles = hero.querySelectorAll('.particle');
    existingParticles.forEach(particle => particle.remove());
    
    for (let i = 0; i < 30; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.cssText = `
            position: absolute;
            width: ${Math.random() * 3 + 1}px;
            height: ${Math.random() * 3 + 1}px;
            background: rgba(255, 255, 255, ${Math.random() * 0.3 + 0.1});
            border-radius: 50%;
            pointer-events: none;
            animation: float ${Math.random() * 4 + 4}s ease-in-out infinite;
            left: ${Math.random() * 100}%;
            animation-delay: ${Math.random() * 4}s;
        `;
        hero.appendChild(particle);
    }
}

// Animation pour les particules améliorée
const style = document.createElement('style');
style.textContent = `
    @keyframes float {
        0%, 100% {
            transform: translateY(0px) rotate(0deg);
            opacity: 0;
        }
        50% {
            transform: translateY(-100px) rotate(180deg);
            opacity: 1;
        }
    }
    
    @keyframes fadeInUp {
        from {
            opacity: 0;
            transform: translateY(40px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
    
    @keyframes fadeOut {
        from {
            opacity: 1;
            transform: translateY(0);
        }
        to {
            opacity: 0;
            transform: translateY(-20px);
        }
    }
`;
document.head.appendChild(style);

// Initialiser les particules
createParticles();

// Amélioration de l'accessibilité avec navigation au clavier
document.addEventListener('keydown', (e) => {
    // Navigation au clavier
    if (e.key === 'Escape') {
        // Fermer le menu mobile
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    }
    
    // Navigation avec les flèches
    if (e.key === 'ArrowDown' && e.ctrlKey) {
        e.preventDefault();
        const currentSection = getCurrentSection();
        const nextSection = getNextSection(currentSection);
        if (nextSection) {
            nextSection.scrollIntoView({ behavior: 'smooth' });
        }
    }
    
    if (e.key === 'ArrowUp' && e.ctrlKey) {
        e.preventDefault();
        const currentSection = getCurrentSection();
        const prevSection = getPreviousSection(currentSection);
        if (prevSection) {
            prevSection.scrollIntoView({ behavior: 'smooth' });
        }
    }
});

// Fonctions utilitaires pour la navigation
function getCurrentSection() {
    const sections = document.querySelectorAll('section[id]');
    const scrollPosition = window.scrollY + 100;
    
    for (let section of sections) {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        
        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
            return section;
        }
    }
    return sections[0];
}

function getNextSection(currentSection) {
    const sections = Array.from(document.querySelectorAll('section[id]'));
    const currentIndex = sections.indexOf(currentSection);
    return sections[currentIndex + 1] || null;
}

function getPreviousSection(currentSection) {
    const sections = Array.from(document.querySelectorAll('section[id]'));
    const currentIndex = sections.indexOf(currentSection);
    return sections[currentIndex - 1] || null;
}

// Préchargement des images importantes
function preloadImages() {
    const imageUrls = [
        'https://via.placeholder.com/400x250/4a90e2/ffffff?text=E-commerce+Platform',
        'https://via.placeholder.com/400x250/50c878/ffffff?text=CRM+System',
        'https://via.placeholder.com/400x250/f39c12/ffffff?text=Fitness+App',
        'https://via.placeholder.com/400x250/e74c3c/ffffff?text=REST+API',
        'https://via.placeholder.com/400x250/9b59b6/ffffff?text=Dashboard+Analytics',
        'https://via.placeholder.com/400x250/2ecc71/ffffff?text=Real-time+Chat'
    ];
    
    imageUrls.forEach(url => {
        const img = new Image();
        img.src = url;
    });
}

// Précharger les images
preloadImages();

// Animation de scroll progressif pour les sections
function animateOnScroll() {
    const sections = document.querySelectorAll('section');
    
    const sectionObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, {
        threshold: 0.1
    });
    
    sections.forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(50px)';
        section.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
        sectionObserver.observe(section);
    });
}

// Initialiser les animations au scroll
animateOnScroll();

console.log('Portfolio JavaScript d\'Emmanuel Monsan chargé avec succès ! 🚀');
