// Mobile Navigation Toggle
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');

hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    hamburger.classList.toggle('active');
});

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

// FAQ Accordion Functionality
document.querySelectorAll('.faq-question').forEach(question => {
    question.addEventListener('click', () => {
        const faqItem = question.parentElement;
        const isActive = faqItem.classList.contains('active');
        
        // Close all FAQ items
        document.querySelectorAll('.faq-item').forEach(item => {
            item.classList.remove('active');
        });
        
        // Open clicked item if it wasn't active
        if (!isActive) {
            faqItem.classList.add('active');
        }
    });
});

// Contact Form Handling with WhatsApp
const contactForm = document.querySelector('.contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form data
        const firstName = document.getElementById('firstName').value;
        const lastName = document.getElementById('lastName').value;
        const email = document.getElementById('email').value;
        const phone = document.getElementById('phone').value;
        const subject = document.getElementById('subject').value;
        const tourType = document.getElementById('tourType').value;
        const participants = document.getElementById('participants').value;
        const preferredDate = document.getElementById('preferredDate').value;
        const message = document.getElementById('message').value;
        const newsletter = document.getElementById('newsletter').checked;
        
        // Simple validation
        if (!firstName || !lastName || !phone || !subject || !message) {
            showFormMessage('Please fill in all required fields (marked with *)', 'error');
            return;
        }
        
        // Show loading state
        const submitBtn = this.querySelector('.submit-btn');
        const btnText = submitBtn.querySelector('.btn-text');
        const btnLoading = submitBtn.querySelector('.btn-loading');
        
        btnText.style.display = 'none';
        btnLoading.style.display = 'inline-flex';
        submitBtn.disabled = true;
        
        // Create WhatsApp message
        const whatsappMessage = `*New Contact Form Submission*

*Name:* ${firstName} ${lastName}
*Phone:* ${phone}
${email ? `*Email:* ${email}` : ''}
*Subject:* ${subject}
${tourType ? `*Tour Type:* ${tourType}` : ''}
${participants ? `*Participants:* ${participants} people` : ''}
${preferredDate ? `*Preferred Date:* ${preferredDate}` : ''}
*Message:* ${message}
${newsletter ? '*Newsletter:* Yes, please subscribe' : ''}

---
Sent from Sunrise Jeep Contact Page`;

        // Encode message for WhatsApp URL
        const encodedMessage = encodeURIComponent(whatsappMessage);
        const whatsappUrl = `https://wa.me/+62895418222492?text=${encodedMessage}`;
        
        // Open WhatsApp after a short delay to show loading state
        setTimeout(() => {
            window.open(whatsappUrl, '_blank');
            
            // Reset form and button state
            this.reset();
            btnText.style.display = 'inline-flex';
            btnLoading.style.display = 'none';
            submitBtn.disabled = false;
            
            // Show success message
            showFormMessage('WhatsApp opened! Please send the message to complete your inquiry.', 'success');
        }, 1000);
    });
}

// Form message display function
function showFormMessage(message, type) {
    const formMessage = document.getElementById('formMessage');
    formMessage.textContent = message;
    formMessage.className = `form-message ${type}`;
    formMessage.style.display = 'block';
    
    // Hide message after 5 seconds
    setTimeout(() => {
        formMessage.style.display = 'none';
    }, 5000);
}

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
        
        // Show success feedback
        const button = this.querySelector('button');
        const originalContent = button.innerHTML;
        button.innerHTML = '<i class="fas fa-check"></i>';
        button.style.background = '#27ae60';
        
        setTimeout(() => {
            button.innerHTML = originalContent;
            button.style.background = '#ff6b35';
            this.reset();
        }, 2000);
    });
}

// Map placeholder click handler
const mapPlaceholder = document.querySelector('.map-placeholder');
if (mapPlaceholder) {
    mapPlaceholder.addEventListener('click', () => {
        window.open('https://maps.google.com/?q=Kintamani,Bali', '_blank');
    });
}

// Intersection Observer for animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate-in');
        }
    });
}, observerOptions);

// Observe elements for animation
document.addEventListener('DOMContentLoaded', () => {
    const animateElements = document.querySelectorAll('.contact-item, .faq-item, .map-container');
    animateElements.forEach(el => {
        observer.observe(el);
    });
});

// Add CSS for animations
const style = document.createElement('style');
style.textContent = `
    .contact-item, .faq-item, .map-container {
        opacity: 0;
        transform: translateY(30px);
        transition: all 0.6s ease;
    }
    
    .contact-item.animate-in, .faq-item.animate-in, .map-container.animate-in {
        opacity: 1;
        transform: translateY(0);
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
        box-shadow: 0 5px 15px rgba(0,0,0,0.1);
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
    
    @media (max-width: 768px) {
        .nav-links {
            display: none;
        }
    }
`;
document.head.appendChild(style);

// Page loading animation
window.addEventListener('load', () => {
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.5s ease';
    
    setTimeout(() => {
        document.body.style.opacity = '1';
    }, 100);
});

// Scroll to top button
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
    
    scrollTop.addEventListener('mouseenter', () => {
        scrollTop.style.transform = 'translateY(-3px)';
        scrollTop.style.boxShadow = '0 8px 20px rgba(255,107,53,0.4)';
    });
    
    scrollTop.addEventListener('mouseleave', () => {
        scrollTop.style.transform = 'translateY(0)';
        scrollTop.style.boxShadow = '0 5px 15px rgba(255,107,53,0.3)';
    });
    
    scrollTop.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
    
    document.body.appendChild(scrollTop);
}

// Contact item hover effects
document.querySelectorAll('.contact-item').forEach(item => {
    item.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-5px)';
    });
    
    item.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0)';
    });
});

// Quick contact button tracking
document.querySelectorAll('.quick-btn').forEach(btn => {
    btn.addEventListener('click', function(e) {
        const action = this.textContent.trim();
        console.log(`Quick contact button clicked: ${action}`);
    });
});

// Form field validation
document.querySelectorAll('.contact-form input, .contact-form select, .contact-form textarea').forEach(field => {
    field.addEventListener('blur', function() {
        if (this.hasAttribute('required') && !this.value.trim()) {
            this.style.borderColor = '#dc3545';
        } else {
            this.style.borderColor = '#e9ecef';
        }
    });
    
    field.addEventListener('input', function() {
        if (this.value.trim()) {
            this.style.borderColor = '#e9ecef';
        }
    });
});

// Phone number formatting
const phoneInput = document.getElementById('phone');
if (phoneInput) {
    phoneInput.addEventListener('input', function(e) {
        let value = e.target.value.replace(/\D/g, '');
        if (value.length > 0) {
            if (value.startsWith('62')) {
                value = value.replace(/(\d{2})(\d{3})(\d{4})(\d{4})/, '+$1 $2-$3-$4');
            } else if (value.startsWith('0')) {
                value = value.replace(/(\d{1})(\d{3})(\d{4})(\d{4})/, '+62 $2-$3-$4');
            }
        }
        e.target.value = value;
    });
}

// Date input minimum date (today)
const dateInput = document.getElementById('preferredDate');
if (dateInput) {
    const today = new Date().toISOString().split('T')[0];
    dateInput.setAttribute('min', today);
}

// Parallax effect for header
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const header = document.querySelector('.contact-header');
    if (header) {
        header.style.transform = `translateY(${scrolled * 0.5}px)`;
    }
});

// Social media link tracking
document.querySelectorAll('.contact-link').forEach(link => {
    link.addEventListener('click', function(e) {
        const platform = this.textContent.includes('WhatsApp') ? 'WhatsApp' : 
                        this.textContent.includes('Instagram') ? 'Instagram' : 
                        this.textContent.includes('Map') ? 'Google Maps' : 'Other';
        console.log(`Contact link clicked: ${platform}`);
    });
});

// Page performance tracking
window.addEventListener('load', () => {
    const loadTime = performance.now();
    console.log(`Contact page loaded in ${loadTime.toFixed(2)}ms`);
});

// Keyboard navigation support
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        // Close mobile menu if open
        if (navLinks.classList.contains('active')) {
            navLinks.classList.remove('active');
            hamburger.classList.remove('active');
        }
        
        // Close FAQ items
        document.querySelectorAll('.faq-item.active').forEach(item => {
            item.classList.remove('active');
        });
    }
});

// Touch gesture support for mobile
let touchStartY = 0;
let touchEndY = 0;

document.addEventListener('touchstart', (e) => {
    touchStartY = e.changedTouches[0].screenY;
});

document.addEventListener('touchend', (e) => {
    touchEndY = e.changedTouches[0].screenY;
    handleSwipe();
});

function handleSwipe() {
    const swipeThreshold = 50;
    const diff = touchStartY - touchEndY;
    
    if (Math.abs(diff) > swipeThreshold) {
        if (diff > 0) {
            // Swipe up - could trigger scroll to top
            if (window.pageYOffset > 500) {
                window.scrollTo({
                    top: 0,
                    behavior: 'smooth'
                });
            }
        }
    }
}

// Auto-resize textarea
const messageTextarea = document.getElementById('message');
if (messageTextarea) {
    messageTextarea.addEventListener('input', function() {
        this.style.height = 'auto';
        this.style.height = Math.min(this.scrollHeight, 200) + 'px';
    });
}

// Form submission analytics
function trackFormSubmission(formData) {
    console.log('Form submitted with data:', {
        subject: formData.subject,
        tourType: formData.tourType,
        participants: formData.participants,
        newsletter: formData.newsletter
    });
} 