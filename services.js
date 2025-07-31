// Mobile navigation toggle
document.addEventListener('DOMContentLoaded', function() {
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');

    if (hamburger && navLinks) {
        hamburger.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            hamburger.classList.toggle('active');
        });
    }

    // Close mobile menu when clicking on a link
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
            hamburger.classList.remove('active');
        });
    });

    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Service card hover effects
    document.querySelectorAll('.service-card').forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });

    // Newsletter form handling
    const newsletterForm = document.querySelector('.newsletter-form');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const email = this.querySelector('input[type="email"]').value;
            if (!email) {
                alert('Please enter your email address');
                return;
            }
            
            alert('Thank you for subscribing to our newsletter!');
            this.reset();
        });
    }

    // Add loading animation
    window.addEventListener('load', () => {
        document.body.classList.add('loaded');
    });

    // Intersection Observer for animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
            }
        });
    }, observerOptions);

    // Observe elements for animation
    document.querySelectorAll('.service-card, .feature-item').forEach(el => {
        observer.observe(el);
    });

    // Service card click tracking
    document.querySelectorAll('.service-card .btn').forEach(btn => {
        btn.addEventListener('click', function() {
            const serviceName = this.closest('.service-card').querySelector('h3').textContent;
            console.log(`Service clicked: ${serviceName}`);
        });
    });

    // Add CSS for animations and mobile navigation
    const style = document.createElement('style');
    style.textContent = `
        .loaded .services-header {
            animation: fadeInUp 1s ease;
        }
        
        .animate {
            animation: fadeInUp 0.6s ease forwards;
        }
        
        @keyframes fadeInUp {
            from {
                opacity: 0;
                transform: translateY(30px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }
        
        .nav-links.active {
            display: flex !important;
            flex-direction: column;
            position: absolute;
            top: 100%;
            left: 0;
            right: 0;
            background: linear-gradient(135deg, #ff6b35, #f7931e);
            padding: 20px;
            box-shadow: 0 5px 15px rgba(0,0,0,0.2);
        }
        
        .hamburger.active span:nth-child(1) {
            transform: rotate(45deg) translate(5px, 5px);
        }
        
        .hamburger.active span:nth-child(2) {
            opacity: 0;
        }
        
        .hamburger.active span:nth-child(3) {
            transform: rotate(-45deg) translate(7px, -6px);
        }
        
        .service-card {
            opacity: 0;
            transform: translateY(30px);
            animation: fadeInUp 0.6s ease forwards;
        }
        
        .service-card:nth-child(1) { animation-delay: 0.1s; }
        .service-card:nth-child(2) { animation-delay: 0.2s; }
        .service-card:nth-child(3) { animation-delay: 0.3s; }
        .service-card:nth-child(4) { animation-delay: 0.4s; }
        .service-card:nth-child(5) { animation-delay: 0.5s; }
        .service-card:nth-child(6) { animation-delay: 0.6s; }
        
        .feature-item {
            opacity: 0;
            transform: translateY(30px);
            animation: fadeInUp 0.6s ease forwards;
        }
        
        .feature-item:nth-child(1) { animation-delay: 0.1s; }
        .feature-item:nth-child(2) { animation-delay: 0.2s; }
        .feature-item:nth-child(3) { animation-delay: 0.3s; }
        .feature-item:nth-child(4) { animation-delay: 0.4s; }
        .feature-item:nth-child(5) { animation-delay: 0.5s; }
        .feature-item:nth-child(6) { animation-delay: 0.6s; }
        
        .service-card:hover .service-icon {
            transform: scale(1.1);
        }
        
        .service-icon {
            transition: transform 0.3s ease;
        }
        
        .btn:hover {
            transform: translateY(-2px);
        }
        
        .feature-item:hover .feature-icon {
            transform: scale(1.1);
        }
        
        .feature-icon {
            transition: transform 0.3s ease;
        }
    `;

    document.head.appendChild(style);
});

// Add scroll to top functionality
window.addEventListener('scroll', function() {
    const scrollTop = document.querySelector('.scroll-top');
    if (window.pageYOffset > 300) {
        if (!scrollTop) {
            createScrollTopButton();
        }
        scrollTop.style.display = 'block';
    } else if (scrollTop) {
        scrollTop.style.display = 'none';
    }
});

function createScrollTopButton() {
    const scrollTop = document.createElement('button');
    scrollTop.className = 'scroll-top';
    scrollTop.innerHTML = '<i class="fas fa-arrow-up"></i>';
    scrollTop.style.cssText = `
        position: fixed;
        bottom: 30px;
        right: 30px;
        width: 50px;
        height: 50px;
        background: linear-gradient(135deg, #ff6b35, #f7931e);
        color: white;
        border: none;
        border-radius: 50%;
        cursor: pointer;
        font-size: 18px;
        box-shadow: 0 5px 15px rgba(255,107,53,0.3);
        transition: all 0.3s ease;
        z-index: 1000;
        display: none;
    `;
    
    scrollTop.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
    
    scrollTop.addEventListener('mouseenter', () => {
        scrollTop.style.transform = 'translateY(-3px)';
        scrollTop.style.boxShadow = '0 8px 25px rgba(255,107,53,0.4)';
    });
    
    scrollTop.addEventListener('mouseleave', () => {
        scrollTop.style.transform = 'translateY(0)';
        scrollTop.style.boxShadow = '0 5px 15px rgba(255,107,53,0.3)';
    });
    
    document.body.appendChild(scrollTop);
} 