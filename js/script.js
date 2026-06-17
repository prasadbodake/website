// Email Configuration - Embedded for security
const EMAIL_CONFIG = {
    TO_EMAIL: "info@zenbyteapps.com"
};

// Small DOM helpers for SEO/meta updates
function setContent(id, value) {
    const el = document.getElementById(id);
    if (el) el.setAttribute('content', value);
}
function setAttr(id, attr, value) {
    const el = document.getElementById(id);
    if (el) el.setAttribute(attr, value);
}
function setMeta(id, value) {
    setContent(id, value);
}

document.addEventListener('DOMContentLoaded', function() {
    // Set current year in footers
    var yearEl = document.getElementById('year');
    if (yearEl) yearEl.textContent = new Date().getFullYear();

    initCarousel();
    initProductDetails();
    initScreenshotSlider();
    initContactForm();
    initMobileMenu();
});

// Carousel functionality
function initCarousel() {
    const slides = document.querySelectorAll('.carousel-slide');
    const dots = document.querySelectorAll('.dot');
    const prevBtn = document.querySelector('.carousel-btn.prev');
    const nextBtn = document.querySelector('.carousel-btn.next');

    if (!slides.length) return;
    
    let currentSlide = 0;
    const totalSlides = slides.length;
    
    function showSlide(index) {
        slides.forEach(slide => slide.classList.remove('active'));
        dots.forEach(dot => dot.classList.remove('active'));
        
        slides[index].classList.add('active');
        dots[index].classList.add('active');
    }
    
    function nextSlide() {
        currentSlide = (currentSlide + 1) % totalSlides;
        showSlide(currentSlide);
    }
    
    function prevSlide() {
        currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
        showSlide(currentSlide);
    }
    
    // Event listeners
    if (prevBtn) prevBtn.addEventListener('click', prevSlide);
    if (nextBtn) nextBtn.addEventListener('click', nextSlide);
    
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            currentSlide = index;
            showSlide(currentSlide);
        });
    });
    
    // Auto-advance carousel
    setInterval(nextSlide, 5000);
}

// Product details functionality
function initProductDetails() {
    const urlParams = new URLSearchParams(window.location.search);
    const productName = urlParams.get('name') || 'webcam-capture';

    const productData = {
        'webcam-capture': {
            title: 'Webcam Capture',
            category: 'Security & Surveillance',
            metaDescription: 'Webcam Capture turns any webcam into a smart Windows surveillance system with motion detection, multi-camera preview, recording, OneDrive upload, and email alerts. Download free.',
            description: 'Monitor, record and detect motion effortlessly with multi-camera preview, OneDrive upload, and instant email alerts.',
            longDescription: 'Webcam Capture turns ordinary webcams into a complete surveillance system for your home or business. Preview multiple cameras at once, record in high quality, and get instant alerts the moment motion is detected — with automatic uploads to OneDrive so your footage is always safe.',
            image: 'images/webcam-capture-features.jpeg',
            screenshots: [
                'images/webcam-surveillance.jpeg',
                'images/webcam-capture-features.jpeg'
            ],
            features: ['Webcam Preview', 'Webcam Video Recording', 'Motion Detection', 'Auto Upload to OneDrive', 'Email Alerts'],
            downloadUrl: 'https://apps.microsoft.com/detail/9nwl3cg9qsq1?ocid=webpdpshare'
        },
        'duplicate-file-cleaner-pro': {
            title: 'Duplicate File Cleaner Pro',
            category: 'PC Optimization',
            metaDescription: 'Duplicate File Cleaner Pro finds and removes true duplicate files on Windows using content-based scanning — across photos, documents, and videos. Preview before deleting. Download free.',
            description: 'Reclaim storage by finding and safely removing true duplicate files across images, documents, videos, and more.',
            longDescription: 'Duplicate File Cleaner Pro helps you reclaim valuable storage by finding true duplicates with content-based scanning — even when filenames differ. Review and preview files before removing them, and choose how they go: Recycle Bin, permanent delete, or archive.',
            image: 'images/duplicate-file-cleaner-pro.jpeg',
            screenshots: [
                'images/duplicate-file-cleaner-pro.jpeg'
            ],
            features: ['Content-Based Scanning: Analyzes file content for precise duplicate detection, even with different filenames.',
                 'Intelligent Removal: Recommends duplicates for deletion based on file content and type.',
                  'Diverse Deletion Modes: Choose from Recycle Bin, Permanent Delete, or Archive for flexibility.',
                   'Streamlined UI: User-friendly interface for efficient content-driven file management.',
                    'Rapid Scanning: Swiftly scans and compares file content, saving you valuable time.'],
            downloadUrl: 'https://apps.microsoft.com/detail/9p257b4wlhfk?ocid=webpdpshare'
        },
        'desk-time-monitor': {
            title: 'Desk Time Monitor',
            category: 'Productivity Tracking',
            metaDescription: 'Desk Time Monitor tracks work hours, app usage, and visited websites on Windows with automatic screenshots and clear productivity reports. Download free.',
            description: 'Track work hours, app usage, and visited websites with automatic screenshots and clear productivity insights.',
            longDescription: 'Desk Time Monitor gives you a clear picture of how your day is spent. It tracks application and website usage with precision, captures configurable screenshots, logs login and logout times, and starts automatically with Windows — so you can focus on results.',
            image: 'images/desktime-monitor.jpeg',
            screenshots: [
                'images/desktime-monitor.jpeg'
            ],
            features: ['Precise Time Tracking: Accurately monitor every second of your workday to optimize time management.', 
                'Website Usage Analysis: Identify and manage distractions with real-time website tracking.', 
                'Configurable Screenshots: Customize screenshot intervals to capture work progress effectively.',
                 'Login & Logout Monitoring: Track login times to understand work patterns and productivity.',
                  'Auto start: Automatically start Desk Time Monitor with Windows for effortless tracking.'],
            downloadUrl: 'https://apps.microsoft.com/detail/9pj8fsp43rf4?ocid=webpdpshare'
        }
    };
    
    const product = productData[productName];
    if (!product) {
        return;
    }

    const baseUrl = 'https://zenbyteapps.com';
    const canonicalUrl = `${baseUrl}/product.html?name=${productName}`;
    const pageTitle = `${product.title} for Windows — Free Download | ZenByte Apps`;

    // SEO: title, description, canonical, social tags
    document.title = pageTitle;
    setMeta('product-description-meta', product.metaDescription);
    setAttr('canonical-link', 'href', canonicalUrl);
    setContent('og-title', pageTitle);
    setContent('twitter-title', `${product.title} — ZenByte Apps`);
    setContent('og-description', product.metaDescription);
    setContent('twitter-description', product.metaDescription);
    setContent('og-url', canonicalUrl);
    setAttr('og-image', 'content', `${baseUrl}/${product.image}`);
    setAttr('twitter-image', 'content', `${baseUrl}/${product.image}`);

    // Breadcrumb (visible + schema)
    const breadcrumb = document.getElementById('breadcrumb-product');
    if (breadcrumb) breadcrumb.textContent = product.title;
    const crumbSchema = document.getElementById('breadcrumb-schema');
    if (crumbSchema) {
        crumbSchema.textContent = JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            "itemListElement": [
                { "@type": "ListItem", "position": 1, "name": "Home", "item": `${baseUrl}/` },
                { "@type": "ListItem", "position": 2, "name": "Products", "item": `${baseUrl}/#products` },
                { "@type": "ListItem", "position": 3, "name": product.title, "item": canonicalUrl }
            ]
        });
    }

    // SoftwareApplication structured data for this product
    const appSchema = document.createElement('script');
    appSchema.type = 'application/ld+json';
    appSchema.textContent = JSON.stringify({
        "@context": "https://schema.org",
        "@type": "SoftwareApplication",
        "name": product.title,
        "description": product.metaDescription,
        "applicationCategory": "UtilitiesApplication",
        "operatingSystem": "Windows 10, Windows 11",
        "url": canonicalUrl,
        "image": `${baseUrl}/${product.image}`,
        "downloadUrl": product.downloadUrl,
        "publisher": { "@type": "Organization", "name": "ZenByte Apps", "url": `${baseUrl}/` },
        "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD", "availability": "https://schema.org/InStock" }
    });
    document.head.appendChild(appSchema);

    // Visible content
    const productHeading = document.getElementById('product-heading');
    const productCategory = document.getElementById('product-category');
    const productDesc = document.querySelector('#product-description p');
    const productImage = document.querySelector('.product-image img');
    const downloadBtn = document.querySelector('.btn-download');

    if (productHeading) productHeading.textContent = product.title;
    if (productCategory && product.category) productCategory.textContent = product.category;
    if (productDesc) productDesc.textContent = product.longDescription;
    if (productImage) {
        productImage.src = product.image;
        productImage.alt = `${product.title} for Windows — application screenshot`;
    }

    if (downloadBtn && product.downloadUrl) {
        downloadBtn.href = product.downloadUrl;
        downloadBtn.target = '_blank';
        downloadBtn.rel = 'noopener noreferrer';
        downloadBtn.setAttribute('aria-label', `Download ${product.title} free from the Microsoft Store`);
    }

    // Add features list
    const productInfo = document.querySelector('.product-info');
    if (productInfo && product.features) {
        const featuresList = document.createElement('div');
        featuresList.className = 'product-features-list';
        featuresList.innerHTML = `
            <h2>Key features</h2>
            <ul>
                ${product.features.map(feature => `<li><i class="fas fa-check" aria-hidden="true"></i> ${feature}</li>`).join('')}
            </ul>
        `;
        productInfo.appendChild(featuresList);
    }
    
    // Populate screenshot slider section
    const screenshotSliderSection = document.querySelector('.screenshot-slider');
    if (screenshotSliderSection) {
        if (product.screenshots && product.screenshots.length > 0) {
            screenshotSliderSection.innerHTML = `
                <h3>Product Screenshots</h3>
                <div class="screenshot-container">
                    <div class="screenshot-slides">
                        ${product.screenshots.map((screenshot, index) => `
                            <div class="screenshot-slide">
                                <img src="${screenshot}" alt="${product.title} screenshot ${index + 1}" loading="lazy" decoding="async">
                            </div>
                        `).join('')}
                    </div>
                    <button class="screenshot-nav prev"><i class="fas fa-chevron-left"></i></button>
                    <button class="screenshot-nav next"><i class="fas fa-chevron-right"></i></button>
                </div>
                <div class="screenshot-dots">
                    ${product.screenshots.map((_, index) => `
                        <span class="screenshot-dot ${index === 0 ? 'active' : ''}" data-slide="${index}"></span>
                    `).join('')}
                </div>
            `;
            initScreenshotSlider();
        } else {
            screenshotSliderSection.innerHTML = '<p style="text-align:center;color:#888;">No screenshots available for this product.</p>';
        }
    }
}

// Screenshot slider functionality
function initScreenshotSlider() {
    const screenshotSlides = document.querySelector('.screenshot-slides');
    const screenshotDots = document.querySelectorAll('.screenshot-dot');
    const prevBtn = document.querySelector('.screenshot-nav.prev');
    const nextBtn = document.querySelector('.screenshot-nav.next');
    
    if (!screenshotSlides) return;
    
    let currentSlide = 0;
    const totalSlides = screenshotDots.length;
    
    function showScreenshot(index) {
        screenshotSlides.style.transform = `translateX(-${index * 100}%)`;
        screenshotDots.forEach(dot => dot.classList.remove('active'));
        screenshotDots[index].classList.add('active');
    }
    
    function nextScreenshot() {
        currentSlide = (currentSlide + 1) % totalSlides;
        showScreenshot(currentSlide);
    }
    
    function prevScreenshot() {
        currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
        showScreenshot(currentSlide);
    }
    
    // Event listeners
    if (prevBtn) prevBtn.addEventListener('click', prevScreenshot);
    if (nextBtn) nextBtn.addEventListener('click', nextScreenshot);
    
    screenshotDots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            currentSlide = index;
            showScreenshot(currentSlide);
        });
    });
}

// Contact form functionality with enhanced security
function initContactForm() {
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        // Rate limiting for form submissions
        let lastSubmissionTime = 0;
        const SUBMISSION_COOLDOWN = 30000; // 30 seconds
        
        // Input sanitization function
        function sanitizeInput(input) {
            if (typeof input !== 'string') return '';
            return input
                .trim()
                .replace(/[<>]/g, '') // Remove potential HTML tags
                .substring(0, 1000); // Limit length
        }
        
        // Email validation function
        function isValidEmail(email) {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            return emailRegex.test(email);
        }
        
        // Rate limiting check
        function isRateLimited() {
            const now = Date.now();
            if (now - lastSubmissionTime < SUBMISSION_COOLDOWN) {
                const remainingTime = Math.ceil((SUBMISSION_COOLDOWN - (now - lastSubmissionTime)) / 1000);
                showNotification(`Please wait ${remainingTime} seconds before submitting another message.`, 'error');
                return true;
            }
            return false;
        }
        
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Check rate limiting
            if (isRateLimited()) {
                return;
            }
            
            const name = sanitizeInput(document.getElementById('name').value);
            const email = sanitizeInput(document.getElementById('email').value);
            const subject = sanitizeInput(document.getElementById('subject')?.value || 'General Inquiry');
            const message = sanitizeInput(document.getElementById('message').value);
            
            // Enhanced validation
            if (!name || name.length < 2) {
                showNotification('Please enter a valid name (at least 2 characters).', 'error');
                return;
            }
            
            if (!isValidEmail(email)) {
                showNotification('Please enter a valid email address.', 'error');
                return;
            }
            
            if (!message || message.length < 10) {
                showNotification('Please enter a message (at least 10 characters).', 'error');
                return;
            }
            
            // Show loading state
            const submitBtn = contactForm.querySelector('button[type="submit"]');
            const originalText = submitBtn.innerHTML;
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
            submitBtn.disabled = true;
            
            // Prepare payload for Azure Function with additional security
            const payload = {
                to: EMAIL_CONFIG.TO_EMAIL,
                subject: `Contact Form: ${subject} from ${name}`,
                message: `
New contact form submission from your website:

Name: ${name}
Email: ${email}
Subject: ${subject}
Timestamp: ${new Date().toISOString()}
IP Address: [Will be logged by Azure Function]

Message:
${message}

---
Sent from ZenByte Apps website contact form.
                `.trim()
            };
            
            // Send email using Azure Function with timeout
            const controller = new AbortController();
            const timeoutId = setTimeout(() => controller.abort(), 10000); // 10 second timeout
            
            fetch('https://emailsenderv220240615132805.azurewebsites.net/api/SendEmail?code=K6WVYGUJ7zidlyrEx3UgubLqDzO4JfwQaYtaB3fjMMxXAzFuEa23uA==', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(payload),
                signal: controller.signal
            })
            .then(function(response) {
                clearTimeout(timeoutId);
                if (response.ok) {
                    lastSubmissionTime = Date.now(); // Update rate limiting
                    showNotification(`Thank you for your message, ${name}! We will get back to you at ${email} as soon as possible.`, 'success');
                    contactForm.reset();
                } else {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
            })
            .catch(function(error) {
                clearTimeout(timeoutId);
                if (error.name === 'AbortError') {
                    showNotification('Request timed out. Please try again later.', 'error');
                } else {
                    showNotification('Sorry, there was an error sending your message. Please try again or contact us directly at info@zenbyteapps.com', 'error');
                }
            })
            .finally(function() {
                // Reset button state
                submitBtn.innerHTML = originalText;
                submitBtn.disabled = false;
            });
        });
        
        // Real-time validation
        const emailInput = document.getElementById('email');
        if (emailInput) {
            emailInput.addEventListener('blur', function() {
                const email = this.value.trim();
                if (email && !isValidEmail(email)) {
                    this.style.borderColor = '#ff4444';
                    showNotification('Please enter a valid email address.', 'error');
                } else {
                    this.style.borderColor = '';
                }
            });
        }
    }
}

// Mobile menu functionality
function initMobileMenu() {
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');

    if (mobileMenuBtn && navLinks) {
        mobileMenuBtn.addEventListener('click', () => {
            const isOpen = navLinks.classList.toggle('active');
            mobileMenuBtn.setAttribute('aria-expanded', String(isOpen));
            const icon = mobileMenuBtn.querySelector('i');
            if (icon) {
                icon.classList.toggle('fa-bars', !isOpen);
                icon.classList.toggle('fa-xmark', isOpen);
            }
        });

        // Close the menu after following an in-page link
        navLinks.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                navLinks.classList.remove('active');
                mobileMenuBtn.setAttribute('aria-expanded', 'false');
                const icon = mobileMenuBtn.querySelector('i');
                if (icon) { icon.classList.add('fa-bars'); icon.classList.remove('fa-xmark'); }
            });
        });
    }
}

// Notification system
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <span>${message}</span>
            <button class="notification-close"><i class="fas fa-times"></i></button>
        </div>
    `;
    
    document.body.appendChild(notification);
    
    // Auto-remove after 5 seconds
    setTimeout(() => {
        notification.remove();
    }, 5000);
    
    // Close button functionality
    const closeBtn = notification.querySelector('.notification-close');
    if (closeBtn) {
        closeBtn.addEventListener('click', () => {
            notification.remove();
        });
    }
}

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]:not([href="#"])').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const headerOffset = 80; // Height of the fixed header
            const elementPosition = target.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        }
    });
}); 