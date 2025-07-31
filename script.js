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

// Mobile navigation toggle
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

// Active navigation highlighting
window.addEventListener('scroll', () => {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-links a');
    
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (scrollY >= (sectionTop - 200)) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
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

// Gallery image click handling with lightbox
document.querySelectorAll('.gallery-item').forEach(item => {
    item.addEventListener('click', function() {
        const img = this.querySelector('img');
        const title = this.querySelector('h3').textContent;
        const description = this.querySelector('p').textContent;
        
        // Create lightbox
        createLightbox(img.src, title, description);
    });
});

// Responsive lightbox functionality
function createLightbox(imageSrc, title, description) {
    // Remove existing lightbox if any
    const existingLightbox = document.querySelector('.lightbox');
    if (existingLightbox) {
        existingLightbox.remove();
    }

    // Create lightbox elements
    const lightbox = document.createElement('div');
    lightbox.className = 'lightbox';
    lightbox.innerHTML = `
        <div class="lightbox-content">
            <span class="lightbox-close">&times;</span>
            <div class="lightbox-image-container">
                <img src="${imageSrc}" alt="${title}" class="lightbox-image">
                <div class="lightbox-controls">
                    <button class="zoom-btn zoom-in" title="Zoom In">+</button>
                    <button class="zoom-btn zoom-out" title="Zoom Out">−</button>
                    <button class="zoom-btn zoom-reset" title="Reset Zoom">⟲</button>
                </div>
            </div>
            <div class="lightbox-info">
                <h3>${title}</h3>
                <p>${description}</p>
            </div>
        </div>
    `;

    // Add responsive lightbox styles
    const style = document.createElement('style');
    style.textContent = `
        .lightbox {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.95);
            display: flex;
            justify-content: center;
            align-items: center;
            z-index: 10000;
            opacity: 0;
            transition: opacity 0.3s ease;
            padding: 20px;
            box-sizing: border-box;
        }
        
        .lightbox.show {
            opacity: 1;
        }
        
        .lightbox-content {
            position: relative;
            width: 100%;
            max-width: 90vw;
            max-height: 90vh;
            background: white;
            border-radius: 15px;
            overflow: hidden;
            box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
            display: flex;
            flex-direction: column;
        }
        
        .lightbox-image-container {
            position: relative;
            flex: 1;
            overflow: auto;
            background: #f8f9fa;
            min-height: 300px;
            display: flex;
            align-items: center;
            justify-content: center;
        }
        
        .lightbox-image {
            max-width: 100%;
            max-height: 100%;
            width: auto;
            height: auto;
            object-fit: contain;
            transition: transform 0.3s ease;
            cursor: grab;
            user-select: none;
        }
        
        .lightbox-image:active {
            cursor: grabbing;
        }
        
        .lightbox-controls {
            position: absolute;
            top: 15px;
            right: 15px;
            display: flex;
            gap: 10px;
            z-index: 10;
        }
        
        .zoom-btn {
            width: 40px;
            height: 40px;
            background: rgba(255, 107, 53, 0.9);
            border: none;
            border-radius: 50%;
            color: white;
            font-size: 18px;
            font-weight: bold;
            cursor: pointer;
            transition: all 0.3s ease;
            display: flex;
            align-items: center;
            justify-content: center;
            backdrop-filter: blur(10px);
        }
        
        .zoom-btn:hover {
            background: rgba(255, 107, 53, 1);
            transform: scale(1.1);
        }
        
        .zoom-btn:active {
            transform: scale(0.95);
        }
        
        .lightbox-info {
            padding: 20px;
            text-align: center;
            background: white;
        }
        
        .lightbox-info h3 {
            font-size: 1.5rem;
            margin-bottom: 10px;
            color: #333;
        }
        
        .lightbox-info p {
            color: #666;
            line-height: 1.6;
        }
        
        .lightbox-close {
            position: absolute;
            top: 15px;
            right: 20px;
            font-size: 30px;
            color: white;
            cursor: pointer;
            background: rgba(0, 0, 0, 0.5);
            width: 40px;
            height: 40px;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            transition: background 0.3s ease;
            z-index: 20;
            backdrop-filter: blur(10px);
        }
        
        .lightbox-close:hover {
            background: rgba(0, 0, 0, 0.8);
        }
        
        /* Mobile Responsive */
        @media (max-width: 768px) {
            .lightbox {
                padding: 10px;
            }
            
            .lightbox-content {
                max-width: 95vw;
                max-height: 95vh;
            }
            
            .lightbox-image-container {
                min-height: 250px;
            }
            
            .lightbox-info {
                padding: 15px;
            }
            
            .lightbox-info h3 {
                font-size: 1.2rem;
            }
            
            .lightbox-controls {
                top: 10px;
                right: 10px;
                gap: 8px;
            }
            
            .zoom-btn {
                width: 35px;
                height: 35px;
                font-size: 16px;
            }
            
            .lightbox-close {
                top: 10px;
                right: 15px;
                width: 35px;
                height: 35px;
                font-size: 24px;
            }
        }
        
        @media (max-width: 480px) {
            .lightbox {
                padding: 5px;
            }
            
            .lightbox-content {
                max-width: 98vw;
                max-height: 98vh;
            }
            
            .lightbox-image-container {
                min-height: 200px;
            }
            
            .lightbox-controls {
                top: 8px;
                right: 8px;
                gap: 6px;
            }
            
            .zoom-btn {
                width: 30px;
                height: 30px;
                font-size: 14px;
            }
            
            .lightbox-close {
                top: 8px;
                right: 12px;
                width: 30px;
                height: 30px;
                font-size: 20px;
            }
        }
        
        .zoom-indicator {
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            background: rgba(0, 0, 0, 0.8);
            color: white;
            padding: 10px 20px;
            border-radius: 25px;
            font-size: 16px;
            font-weight: bold;
            opacity: 0;
            transition: opacity 0.3s ease;
            z-index: 30;
            pointer-events: none;
        }
    `;

    // Add styles and lightbox to document
    document.head.appendChild(style);
    document.body.appendChild(lightbox);

    // Show lightbox with animation
    setTimeout(() => {
        lightbox.classList.add('show');
    }, 10);

    // Get elements
    const lightboxImage = lightbox.querySelector('.lightbox-image');
    const zoomInBtn = lightbox.querySelector('.zoom-in');
    const zoomOutBtn = lightbox.querySelector('.zoom-out');
    const zoomResetBtn = lightbox.querySelector('.zoom-reset');
    const closeBtn = lightbox.querySelector('.lightbox-close');

    // Zoom functionality
    let currentZoom = 1;
    const zoomStep = 0.3;
    const maxZoom = 5;
    const minZoom = 0.5;

    function updateZoom() {
        lightboxImage.style.transform = `scale(${currentZoom})`;
        
        // Update cursor based on zoom level
        if (currentZoom > 1) {
            lightboxImage.style.cursor = 'grab';
        } else {
            lightboxImage.style.cursor = 'default';
        }
        
        // Show zoom level indicator
        showZoomIndicator();
    }
    
    function showZoomIndicator() {
        let indicator = document.querySelector('.zoom-indicator');
        if (!indicator) {
            indicator = document.createElement('div');
            indicator.className = 'zoom-indicator';
            lightbox.querySelector('.lightbox-content').appendChild(indicator);
        }
        
        indicator.textContent = `${Math.round(currentZoom * 100)}%`;
        indicator.style.opacity = '1';
        
        // Hide indicator after 2 seconds
        setTimeout(() => {
            indicator.style.opacity = '0';
        }, 2000);
    }

    zoomInBtn.addEventListener('click', () => {
        if (currentZoom < maxZoom) {
            currentZoom += zoomStep;
            updateZoom();
        }
    });

    zoomOutBtn.addEventListener('click', () => {
        if (currentZoom > minZoom) {
            currentZoom -= zoomStep;
            updateZoom();
        }
    });

    zoomResetBtn.addEventListener('click', () => {
        currentZoom = 1;
        updateZoom();
    });

    // Mouse wheel zoom
    lightboxImage.addEventListener('wheel', (e) => {
        e.preventDefault();
        if (e.deltaY < 0) {
            // Zoom in
            if (currentZoom < maxZoom) {
                currentZoom += zoomStep;
                updateZoom();
            }
        } else {
            // Zoom out
            if (currentZoom > minZoom) {
                currentZoom -= zoomStep;
                updateZoom();
            }
        }
    });

    // Pan functionality (drag to scroll)
    let isDragging = false;
    let startX, startY, scrollLeft, scrollTop;

    lightboxImage.addEventListener('mousedown', (e) => {
        if (currentZoom > 1) {
            isDragging = true;
            startX = e.pageX - lightboxImage.offsetLeft;
            startY = e.pageY - lightboxImage.offsetTop;
            scrollLeft = lightboxImage.scrollLeft;
            scrollTop = lightboxImage.scrollTop;
            lightboxImage.style.cursor = 'grabbing';
        }
    });

    lightboxImage.addEventListener('mouseleave', () => {
        isDragging = false;
        lightboxImage.style.cursor = 'grab';
    });

    lightboxImage.addEventListener('mouseup', () => {
        isDragging = false;
        lightboxImage.style.cursor = 'grab';
    });

    lightboxImage.addEventListener('mousemove', (e) => {
        if (!isDragging) return;
        e.preventDefault();
        const x = e.pageX - lightboxImage.offsetLeft;
        const y = e.pageY - lightboxImage.offsetTop;
        const walkX = (x - startX) * 2;
        const walkY = (y - startY) * 2;
        lightboxImage.scrollLeft = scrollLeft - walkX;
        lightboxImage.scrollTop = scrollTop - walkY;
    });

    // Touch support for mobile
    let touchStartX, touchStartY;

    lightboxImage.addEventListener('touchstart', (e) => {
        if (currentZoom > 1) {
            touchStartX = e.touches[0].clientX;
            touchStartY = e.touches[0].clientY;
        }
    });

    lightboxImage.addEventListener('touchmove', (e) => {
        if (currentZoom > 1) {
            e.preventDefault();
            const touchX = e.touches[0].clientX;
            const touchY = e.touches[0].clientY;
            const deltaX = touchStartX - touchX;
            const deltaY = touchStartY - touchY;
            
            lightboxImage.scrollLeft += deltaX;
            lightboxImage.scrollTop += deltaY;
            
            touchStartX = touchX;
            touchStartY = touchY;
        }
    });

    // Pinch to zoom for mobile
    let initialDistance = 0;
    let initialZoom = 1;

    lightboxImage.addEventListener('touchstart', (e) => {
        if (e.touches.length === 2) {
            initialDistance = Math.hypot(
                e.touches[0].clientX - e.touches[1].clientX,
                e.touches[0].clientY - e.touches[1].clientY
            );
            initialZoom = currentZoom;
        }
    });

    lightboxImage.addEventListener('touchmove', (e) => {
        if (e.touches.length === 2) {
            e.preventDefault();
            const currentDistance = Math.hypot(
                e.touches[0].clientX - e.touches[1].clientX,
                e.touches[0].clientY - e.touches[1].clientY
            );
            
            const scale = currentDistance / initialDistance;
            currentZoom = Math.max(minZoom, Math.min(maxZoom, initialZoom * scale));
            updateZoom();
        }
    });

    // Close lightbox functionality
    closeBtn.addEventListener('click', () => {
        lightbox.classList.remove('show');
        setTimeout(() => {
            lightbox.remove();
        }, 300);
    });

    // Close lightbox when clicking outside
    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox) {
            lightbox.classList.remove('show');
            setTimeout(() => {
                lightbox.remove();
            }, 300);
        }
    });

    // Keyboard shortcuts
    document.addEventListener('keydown', function(e) {
        const lightbox = document.querySelector('.lightbox');
        if (!lightbox) return;
        
        switch(e.key) {
            case 'Escape':
                lightbox.classList.remove('show');
                setTimeout(() => {
                    lightbox.remove();
                }, 300);
                break;
            case '+':
            case '=':
                e.preventDefault();
                if (currentZoom < maxZoom) {
                    currentZoom += zoomStep;
                    updateZoom();
                }
                break;
            case '-':
                e.preventDefault();
                if (currentZoom > minZoom) {
                    currentZoom -= zoomStep;
                    updateZoom();
                }
                break;
            case '0':
                e.preventDefault();
                currentZoom = 1;
                updateZoom();
                break;
        }
    });
}

// Button click handlers
document.querySelectorAll('.btn').forEach(button => {
    button.addEventListener('click', function(e) {
        // Only prevent default for buttons that don't have href attributes
        if (!this.hasAttribute('href')) {
            if (this.textContent.includes('Book Your Adventure')) {
                e.preventDefault();
                alert('Booking system coming soon! Please contact us for reservations.');
            }
        }
    });
});

// Add loading animation
window.addEventListener('load', () => {
    document.body.classList.add('loaded');
});

// Parallax effect for hero section
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero');
    if (hero) {
        const rate = scrolled * -0.5;
        hero.style.transform = `translateY(${rate}px)`;
    }
});

// Animate elements on scroll
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
document.querySelectorAll('.service-card, .gallery-item, .contact-item').forEach(el => {
    observer.observe(el);
});

// Add CSS for animations
const style = document.createElement('style');
style.textContent = `
    .loaded .hero-content {
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
`;

document.head.appendChild(style); 