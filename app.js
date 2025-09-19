// Modern Portfolio JavaScript - Enhanced Version
(function () {
    // Navigation Controls
    const controls = [...document.querySelectorAll(".control")];
    const sections = [...document.querySelectorAll(".container")];
    
    controls.forEach(button => {
        button.addEventListener("click", function() {
            // Remove active class from current button
            document.querySelector(".active-btn").classList.remove("active-btn");
            // Add active class to clicked button
            this.classList.add("active-btn");
            
            // Remove active class from current section
            document.querySelector(".active").classList.remove("active");
            // Add active class to target section
            document.getElementById(button.dataset.id).classList.add("active");
            
            // Update URL hash without scrolling
            history.pushState(null, null, `#${button.dataset.id}`);
        });
    });
    
    // Theme Toggle with LocalStorage
    const themeBtn = document.querySelector(".theme-btn");
    const body = document.body;
    
    // Check for saved theme preference or default to dark mode
    const currentTheme = localStorage.getItem("theme");
    if (currentTheme === "light") {
        body.classList.add("light-mode");
    }
    
    themeBtn.addEventListener("click", () => {
        body.classList.toggle("light-mode");
        
        // Save theme preference
        if (body.classList.contains("light-mode")) {
            localStorage.setItem("theme", "light");
        } else {
            localStorage.setItem("theme", "dark");
        }
        
        // Animate theme button
        themeBtn.style.transform = "rotate(360deg)";
        setTimeout(() => {
            themeBtn.style.transform = "rotate(0deg)";
        }, 300);
    });
    
    // Initialize AOS (Animate On Scroll)
    AOS.init({
        duration: 1000,
        easing: 'ease-in-out',
        once: true,
        mirror: false
    });
    
    // Smooth Scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            if (href !== '#' && href !== '#contact') {
                e.preventDefault();
                const targetId = href.substring(1);
                const targetSection = document.getElementById(targetId);
                if (targetSection) {
                    // Find and click the corresponding control button
                    const targetControl = document.querySelector(`[data-id="${targetId}"]`);
                    if (targetControl) {
                        targetControl.click();
                    }
                }
            }
        });
    });
    
    // Typing Animation for Name
    const nameElement = document.querySelector('.name');
    if (nameElement) {
        const originalText = nameElement.innerHTML;
        nameElement.innerHTML = '';
        let index = 0;
        
        function typeWriter() {
            if (index < originalText.length) {
                nameElement.innerHTML = originalText.slice(0, index + 1);
                index++;
                setTimeout(typeWriter, 50);
            }
        }
        
        // Start typing animation after a short delay
        setTimeout(typeWriter, 500);
    }
    
    // Parallax Effect on Hero Section
    const heroSection = document.querySelector('.header-content');
    if (heroSection) {
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            const parallax = -scrolled * 0.5;
            heroSection.style.transform = `translateY(${parallax}px)`;
        });
    }
    
    // Dynamic Project Image Loading with Lazy Loading
    const projectImages = document.querySelectorAll('.project-image img');
    const imageOptions = {
        threshold: 0,
        rootMargin: "0px 0px 50px 0px"
    };
    
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.classList.add('fade-in');
                observer.unobserve(img);
            }
        });
    }, imageOptions);
    
    projectImages.forEach(image => {
        imageObserver.observe(image);
    });
    
    // Contact Form Enhancement
    const contactForm = document.querySelector('.contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(this);
            const formObject = {};
            formData.forEach((value, key) => {
                formObject[key] = value;
            });
            
            // Show success message (you would normally send this to a server)
            const submitBtn = this.querySelector('.btn-submit');
            const originalText = submitBtn.innerHTML;
            submitBtn.innerHTML = '<span>Message Sent!</span> <i class="fas fa-check"></i>';
            submitBtn.style.background = 'linear-gradient(135deg, #00d4ff 0%, #00ff88 100%)';
            
            // Reset form
            this.reset();
            
            // Reset button after 3 seconds
            setTimeout(() => {
                submitBtn.innerHTML = originalText;
                submitBtn.style.background = '';
            }, 3000);
        });
    }
    
    // Skill Tags Animation on Hover
    const skillTags = document.querySelectorAll('.skill-tag');
    skillTags.forEach(tag => {
        tag.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.1) rotate(5deg)';
        });
        
        tag.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1) rotate(0deg)';
        });
    });
    
    // Counter Animation for Stats
    const stats = document.querySelectorAll('.stat-item h3');
    const statsObserver = new IntersectionObserver(
        (entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const target = entry.target;
                    const finalValue = target.textContent;
                    
                    // Only animate numbers
                    if (/\d/.test(finalValue)) {
                        let currentValue = 0;
                        const increment = 1;
                        const duration = 1000;
                        const stepTime = duration / parseInt(finalValue);
                        
                        const counter = setInterval(() => {
                            currentValue += increment;
                            target.textContent = currentValue;
                            
                            if (currentValue >= parseInt(finalValue)) {
                                clearInterval(counter);
                                target.textContent = finalValue;
                            }
                        }, stepTime);
                    }
                    
                    statsObserver.unobserve(target);
                }
            });
        },
        { threshold: 0.5 }
    );
    
    stats.forEach(stat => {
        statsObserver.observe(stat);
    });
    
    // Mouse Follower Effect
    const mouseFollower = document.createElement('div');
    mouseFollower.className = 'mouse-follower';
    mouseFollower.style.cssText = `
        width: 20px;
        height: 20px;
        border: 2px solid var(--color-secondary);
        border-radius: 50%;
        position: fixed;
        pointer-events: none;
        transition: transform 0.1s ease;
        z-index: 9999;
        opacity: 0.5;
    `;
    document.body.appendChild(mouseFollower);
    
    document.addEventListener('mousemove', (e) => {
        mouseFollower.style.left = e.clientX - 10 + 'px';
        mouseFollower.style.top = e.clientY - 10 + 'px';
    });
    
    // Enhance hover effects for links and buttons
    const interactiveElements = document.querySelectorAll('a, button, .control, .btn');
    interactiveElements.forEach(element => {
        element.addEventListener('mouseenter', () => {
            mouseFollower.style.transform = 'scale(2)';
            mouseFollower.style.borderColor = 'var(--color-accent)';
        });
        
        element.addEventListener('mouseleave', () => {
            mouseFollower.style.transform = 'scale(1)';
            mouseFollower.style.borderColor = 'var(--color-secondary)';
        });
    });
    
    // Handle URL hash on page load
    window.addEventListener('load', () => {
        const hash = window.location.hash;
        if (hash) {
            const targetId = hash.substring(1);
            const targetControl = document.querySelector(`[data-id="${targetId}"]`);
            if (targetControl) {
                setTimeout(() => {
                    targetControl.click();
                }, 100);
            }
        }
    });
    
    // Add ripple effect to buttons
    const buttons = document.querySelectorAll('.btn, .control');
    buttons.forEach(button => {
        button.addEventListener('click', function(e) {
            const ripple = document.createElement('span');
            ripple.className = 'ripple';
            ripple.style.cssText = `
                position: absolute;
                border-radius: 50%;
                background: rgba(255, 255, 255, 0.5);
                transform: scale(0);
                animation: ripple-animation 0.6s ease-out;
                pointer-events: none;
            `;
            
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            ripple.style.width = ripple.style.height = size + 'px';
            ripple.style.left = x + 'px';
            ripple.style.top = y + 'px';
            
            this.style.position = 'relative';
            this.style.overflow = 'hidden';
            this.appendChild(ripple);
            
            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });
    
    // Add CSS for ripple animation
    const style = document.createElement('style');
    style.textContent = `
        @keyframes ripple-animation {
            to {
                transform: scale(4);
                opacity: 0;
            }
        }
        
        .fade-in {
            animation: fadeIn 0.6s ease-in-out;
        }
        
        @keyframes fadeIn {
            from {
                opacity: 0;
                transform: translateY(20px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }
    `;
    document.head.appendChild(style);
    
    // Console Easter Egg
    console.log('%c Welcome to James Niere\'s Portfolio! ', 'background: linear-gradient(135deg, #00d4ff 0%, #0066ff 100%); color: white; font-size: 20px; padding: 10px; border-radius: 5px;');
    console.log('%c Looking for opportunities? Let\'s connect! ', 'color: #00d4ff; font-size: 14px;');
    console.log('%c Email: jayniere@berkeley.edu ', 'color: #888; font-size: 12px;');
})();