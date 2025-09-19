// Japanese Aesthetic Interactive Features
(function () {
    'use strict';

    // Initialize on DOM ready
    document.addEventListener('DOMContentLoaded', init);

    function init() {
        // Core navigation
        initNavigation();
        // Theme toggle
        initThemeToggle();
        // Sakura petals
        initSakuraPetals();
        // Interactive particles
        initParticles();
        // Typing animation
        initTypingAnimation();
        // 3D card effects
        init3DCards();
        // Smooth parallax
        initParallax();
        // Interactive stats
        initInteractiveStats();
        // Magnetic buttons
        initMagneticButtons();
        // Scroll reveal
        initScrollReveal();
        // Custom cursor
        initCustomCursor();
        // Sound effects
        initSoundEffects();
        // Matrix rain effect
        initMatrixRain();
    }

    // Navigation Controls
    function initNavigation() {
        const controls = document.querySelectorAll('.control');
        const sections = document.querySelectorAll('.container');
        
        controls.forEach(button => {
            button.addEventListener('click', function(e) {
                e.preventDefault();
                
                // Remove active states
                document.querySelector('.active-btn')?.classList.remove('active-btn');
                document.querySelector('.active')?.classList.remove('active');
                
                // Add active states
                this.classList.add('active-btn');
                const targetSection = document.getElementById(this.dataset.id);
                if (targetSection) {
                    targetSection.classList.add('active');
                    
                    // Add entrance animation
                    targetSection.style.animation = 'none';
                    setTimeout(() => {
                        targetSection.style.animation = 'fadeInSlide 1s ease';
                    }, 10);
                }
                
                // Update URL without reload
                history.pushState(null, null, `#${this.dataset.id}`);
            });
        });
    }

    // Theme Toggle with Yin-Yang Animation
    function initThemeToggle() {
        const themeBtn = document.querySelector('.theme-btn');
        const body = document.body;
        
        // Load saved theme
        const savedTheme = localStorage.getItem('portfolio-theme');
        if (savedTheme === 'light') {
            body.classList.add('light-mode');
        }
        
        themeBtn?.addEventListener('click', () => {
            body.classList.toggle('light-mode');
            
            // Save preference
            const isLight = body.classList.contains('light-mode');
            localStorage.setItem('portfolio-theme', isLight ? 'light' : 'dark');
            
            // Rotation animation
            themeBtn.style.transform = 'rotate(360deg) scale(1.2)';
            setTimeout(() => {
                themeBtn.style.transform = 'rotate(0) scale(1)';
            }, 600);
            
            // Trigger theme change animation
            createThemeWave(themeBtn);
        });
    }

    // Create wave effect on theme change
    function createThemeWave(element) {
        const wave = document.createElement('div');
        wave.style.cssText = `
            position: fixed;
            top: ${element.offsetTop + element.offsetHeight/2}px;
            left: ${element.offsetLeft + element.offsetWidth/2}px;
            width: 0;
            height: 0;
            border-radius: 50%;
            background: linear-gradient(135deg, #ffb7c5, #ff6b9d);
            opacity: 0.3;
            z-index: 9999;
            pointer-events: none;
            transition: all 1s ease-out;
        `;
        document.body.appendChild(wave);
        
        setTimeout(() => {
            wave.style.width = '3000px';
            wave.style.height = '3000px';
            wave.style.marginLeft = '-1500px';
            wave.style.marginTop = '-1500px';
            wave.style.opacity = '0';
        }, 10);
        
        setTimeout(() => wave.remove(), 1000);
    }

    // Sakura Petals Animation
    function initSakuraPetals() {
        const container = document.getElementById('sakura-container');
        if (!container) return;
        
        const petalCount = 15;
        
        function createPetal() {
            const petal = document.createElement('div');
            petal.className = 'sakura';
            
            // Random properties
            const size = Math.random() * 15 + 10;
            const startX = Math.random() * window.innerWidth;
            const duration = Math.random() * 10 + 10;
            const delay = Math.random() * 5;
            
            petal.style.cssText = `
                width: ${size}px;
                height: ${size * 0.8}px;
                left: ${startX}px;
                top: -20px;
                animation-duration: ${duration}s;
                animation-delay: ${delay}s;
            `;
            
            container.appendChild(petal);
            
            // Remove petal after animation
            setTimeout(() => petal.remove(), (duration + delay) * 1000);
        }
        
        // Create initial petals
        for (let i = 0; i < petalCount; i++) {
            createPetal();
        }
        
        // Create new petals periodically
        setInterval(createPetal, 3000);
    }

    // Interactive Particle System
    function initParticles() {
        const bg = document.getElementById('interactive-bg');
        if (!bg) return;
        
        const particleCount = 30;
        const particles = [];
        
        class Particle {
            constructor() {
                this.element = document.createElement('div');
                this.element.className = 'particle';
                this.reset();
                bg.appendChild(this.element);
            }
            
            reset() {
                this.x = Math.random() * window.innerWidth;
                this.y = Math.random() * window.innerHeight;
                this.speedX = (Math.random() - 0.5) * 0.5;
                this.speedY = (Math.random() - 0.5) * 0.5;
                this.size = Math.random() * 3 + 1;
                this.opacity = Math.random() * 0.5 + 0.3;
                this.element.style.width = this.size + 'px';
                this.element.style.height = this.size + 'px';
                this.element.style.opacity = this.opacity;
            }
            
            update(mouseX, mouseY) {
                // Particle movement
                this.x += this.speedX;
                this.y += this.speedY;
                
                // Mouse interaction
                if (mouseX && mouseY) {
                    const dx = mouseX - this.x;
                    const dy = mouseY - this.y;
                    const distance = Math.sqrt(dx * dx + dy * dy);
                    
                    if (distance < 100) {
                        const force = (100 - distance) / 100;
                        this.x -= (dx / distance) * force * 2;
                        this.y -= (dy / distance) * force * 2;
                    }
                }
                
                // Boundary check
                if (this.x < 0 || this.x > window.innerWidth) this.speedX *= -1;
                if (this.y < 0 || this.y > window.innerHeight) this.speedY *= -1;
                
                // Apply position
                this.element.style.transform = `translate(${this.x}px, ${this.y}px)`;
            }
        }
        
        // Create particles
        for (let i = 0; i < particleCount; i++) {
            particles.push(new Particle());
        }
        
        // Mouse tracking
        let mouseX = null, mouseY = null;
        document.addEventListener('mousemove', (e) => {
            mouseX = e.clientX;
            mouseY = e.clientY;
        });
        
        // Animation loop
        function animate() {
            particles.forEach(p => p.update(mouseX, mouseY));
            requestAnimationFrame(animate);
        }
        animate();
    }

    // Advanced Typing Animation
    function initTypingAnimation() {
        const elements = document.querySelectorAll('[data-typing]');
        
        elements.forEach(el => {
            const text = el.textContent;
            el.textContent = '';
            el.style.opacity = '1';
            
            let index = 0;
            function type() {
                if (index < text.length) {
                    el.textContent += text[index];
                    index++;
                    setTimeout(type, Math.random() * 100 + 50);
                }
            }
            
            // Start typing when element is in view
            const observer = new IntersectionObserver(entries => {
                if (entries[0].isIntersecting) {
                    type();
                    observer.disconnect();
                }
            });
            observer.observe(el);
        });
    }

    // 3D Card Flip Effect for Projects
    function init3DCards() {
        const projectCards = document.querySelectorAll('.project-card');
        
        projectCards.forEach(card => {
            // Create card structure if not exists
            if (!card.querySelector('.project-card-inner')) {
                const content = card.innerHTML;
                card.innerHTML = `
                    <div class="project-card-inner">
                        <div class="project-card-front">${content}</div>
                        <div class="project-card-back">
                            <div class="project-back-content">
                                <h3>View Project</h3>
                                <p>Click the links below to explore this project in detail.</p>
                                <div class="project-links">
                                    ${card.querySelector('.project-overlay')?.innerHTML || ''}
                                </div>
                            </div>
                        </div>
                    </div>
                `;
            }
            
            // Tilt effect on mouse move
            card.addEventListener('mousemove', (e) => {
                const rect = card.getBoundingClientRect();
                const x = (e.clientX - rect.left) / rect.width;
                const y = (e.clientY - rect.top) / rect.height;
                
                const tiltX = (y - 0.5) * 10;
                const tiltY = (x - 0.5) * -10;
                
                card.style.transform = `perspective(1000px) rotateX(${tiltX}deg) rotateY(${tiltY}deg)`;
            });
            
            card.addEventListener('mouseleave', () => {
                card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0)';
            });
        });
    }

    // Smooth Parallax Scrolling
    function initParallax() {
        const parallaxElements = document.querySelectorAll('[data-parallax]');
        
        function updateParallax() {
            const scrolled = window.pageYOffset;
            
            parallaxElements.forEach(el => {
                const speed = el.dataset.parallax || 0.5;
                const yPos = -(scrolled * speed);
                el.style.transform = `translateY(${yPos}px)`;
            });
        }
        
        window.addEventListener('scroll', updateParallax);
    }

    // Interactive Stats Counter
    function initInteractiveStats() {
        const stats = document.querySelectorAll('.stat-item');
        
        stats.forEach(stat => {
            const target = stat.querySelector('h3');
            if (!target) return;
            
            const originalText = target.textContent;
            const hasNumber = /\d/.test(originalText);
            
            if (hasNumber) {
                const observer = new IntersectionObserver(entries => {
                    if (entries[0].isIntersecting) {
                        animateValue(target, 0, parseInt(originalText), 2000);
                        observer.disconnect();
                    }
                });
                observer.observe(stat);
            }
            
            // Hover effect
            stat.addEventListener('mouseenter', () => {
                createRipple(stat);
            });
        });
    }

    // Animate numeric values
    function animateValue(element, start, end, duration) {
        const range = end - start;
        const increment = range / (duration / 16);
        let current = start;
        
        const timer = setInterval(() => {
            current += increment;
            if (current >= end) {
                element.textContent = end;
                clearInterval(timer);
            } else {
                element.textContent = Math.floor(current);
            }
        }, 16);
    }

    // Magnetic Button Effect
    function initMagneticButtons() {
        const buttons = document.querySelectorAll('.btn, .social-link');
        
        buttons.forEach(button => {
            button.addEventListener('mousemove', (e) => {
                const rect = button.getBoundingClientRect();
                const x = e.clientX - rect.left - rect.width / 2;
                const y = e.clientY - rect.top - rect.height / 2;
                
                button.style.transform = `translate(${x * 0.3}px, ${y * 0.3}px)`;
            });
            
            button.addEventListener('mouseleave', () => {
                button.style.transform = 'translate(0, 0)';
            });
            
            button.addEventListener('click', (e) => {
                createRipple(button, e);
            });
        });
    }

    // Create ripple effect
    function createRipple(element, event) {
        const ripple = document.createElement('span');
        ripple.className = 'ripple-effect';
        
        const rect = element.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        
        ripple.style.cssText = `
            position: absolute;
            width: ${size}px;
            height: ${size}px;
            border-radius: 50%;
            background: rgba(255, 183, 197, 0.5);
            transform: scale(0);
            animation: ripple-animation 0.6s ease-out;
            pointer-events: none;
        `;
        
        if (event) {
            ripple.style.left = `${event.clientX - rect.left - size/2}px`;
            ripple.style.top = `${event.clientY - rect.top - size/2}px`;
        } else {
            ripple.style.left = '50%';
            ripple.style.top = '50%';
            ripple.style.marginLeft = `-${size/2}px`;
            ripple.style.marginTop = `-${size/2}px`;
        }
        
        element.style.position = 'relative';
        element.style.overflow = 'hidden';
        element.appendChild(ripple);
        
        setTimeout(() => ripple.remove(), 600);
    }

    // Scroll Reveal Animations
    function initScrollReveal() {
        const reveals = document.querySelectorAll('[data-aos]');
        
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('aos-animate');
                    observer.unobserve(entry.target);
                }
            });
        }, observerOptions);
        
        reveals.forEach(el => observer.observe(el));
    }

    // Custom Cursor
    function initCustomCursor() {
        const cursor = document.createElement('div');
        cursor.className = 'custom-cursor';
        cursor.style.cssText = `
            width: 20px;
            height: 20px;
            border: 2px solid var(--sakura-pink);
            border-radius: 50%;
            position: fixed;
            pointer-events: none;
            z-index: 10000;
            transition: all 0.1s ease;
            transform: translate(-50%, -50%);
            mix-blend-mode: difference;
        `;
        document.body.appendChild(cursor);
        
        const cursorDot = document.createElement('div');
        cursorDot.style.cssText = `
            width: 4px;
            height: 4px;
            background: var(--sakura-pink);
            border-radius: 50%;
            position: fixed;
            pointer-events: none;
            z-index: 10001;
            transform: translate(-50%, -50%);
        `;
        document.body.appendChild(cursorDot);
        
        document.addEventListener('mousemove', (e) => {
            cursor.style.left = e.clientX + 'px';
            cursor.style.top = e.clientY + 'px';
            cursorDot.style.left = e.clientX + 'px';
            cursorDot.style.top = e.clientY + 'px';
        });
        
        // Cursor interactions
        const interactives = document.querySelectorAll('a, button, .btn, .control');
        interactives.forEach(el => {
            el.addEventListener('mouseenter', () => {
                cursor.style.width = '40px';
                cursor.style.height = '40px';
                cursor.style.borderColor = 'var(--gold-accent)';
            });
            
            el.addEventListener('mouseleave', () => {
                cursor.style.width = '20px';
                cursor.style.height = '20px';
                cursor.style.borderColor = 'var(--sakura-pink)';
            });
        });
    }

    // Sound Effects (Optional - requires audio files)
    function initSoundEffects() {
        const sounds = {
            hover: 'data:audio/wav;base64,UklGRiQAAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQAAAAA=',
            click: 'data:audio/wav;base64,UklGRiQAAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQAAAAA='
        };
        
        // Create audio elements
        const hoverSound = new Audio(sounds.hover);
        const clickSound = new Audio(sounds.click);
        
        hoverSound.volume = 0.2;
        clickSound.volume = 0.3;
        
        // Add sound to interactive elements
        const buttons = document.querySelectorAll('.btn, .control');
        buttons.forEach(btn => {
            btn.addEventListener('mouseenter', () => {
                hoverSound.currentTime = 0;
                hoverSound.play().catch(() => {});
            });
            
            btn.addEventListener('click', () => {
                clickSound.currentTime = 0;
                clickSound.play().catch(() => {});
            });
        });
    }

    // Matrix Rain Effect (Toggle with keyboard)
    function initMatrixRain() {
        let matrixActive = false;
        let matrixCanvas = null;
        
        document.addEventListener('keydown', (e) => {
            // Press 'M' to toggle matrix effect
            if (e.key === 'm' || e.key === 'M') {
                matrixActive = !matrixActive;
                
                if (matrixActive) {
                    startMatrix();
                } else {
                    stopMatrix();
                }
            }
        });
        
        function startMatrix() {
            matrixCanvas = document.createElement('canvas');
            matrixCanvas.style.cssText = `
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                pointer-events: none;
                z-index: 1;
                opacity: 0.1;
            `;
            document.body.appendChild(matrixCanvas);
            
            const ctx = matrixCanvas.getContext('2d');
            matrixCanvas.width = window.innerWidth;
            matrixCanvas.height = window.innerHeight;
            
            const chars = '桜愛夢花月雪風光心';
            const fontSize = 16;
            const columns = matrixCanvas.width / fontSize;
            const drops = [];
            
            for (let i = 0; i < columns; i++) {
                drops[i] = 1;
            }
            
            function draw() {
                if (!matrixActive) return;
                
                ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
                ctx.fillRect(0, 0, matrixCanvas.width, matrixCanvas.height);
                
                ctx.fillStyle = '#ffb7c5';
                ctx.font = fontSize + 'px monospace';
                
                for (let i = 0; i < drops.length; i++) {
                    const text = chars[Math.floor(Math.random() * chars.length)];
                    ctx.fillText(text, i * fontSize, drops[i] * fontSize);
                    
                    if (drops[i] * fontSize > matrixCanvas.height && Math.random() > 0.975) {
                        drops[i] = 0;
                    }
                    
                    drops[i]++;
                }
                
                requestAnimationFrame(draw);
            }
            
            draw();
        }
        
        function stopMatrix() {
            if (matrixCanvas) {
                matrixCanvas.remove();
                matrixCanvas = null;
            }
        }
    }

    // Initialize AOS if available
    if (typeof AOS !== 'undefined') {
        AOS.init({
            duration: 1200,
            easing: 'ease-in-out',
            once: true,
            offset: 100
        });
    }

    // Add CSS for animations
    const style = document.createElement('style');
    style.textContent = `
        @keyframes ripple-animation {
            to {
                transform: scale(4);
                opacity: 0;
            }
        }
        
        .aos-animate {
            opacity: 1 !important;
            transform: translateY(0) !important;
        }
    `;
    document.head.appendChild(style);

    // Performance optimization - Throttle scroll events
    function throttle(func, limit) {
        let inThrottle;
        return function() {
            const args = arguments;
            const context = this;
            if (!inThrottle) {
                func.apply(context, args);
                inThrottle = true;
                setTimeout(() => inThrottle = false, limit);
            }
        }
    }

    // Smooth scroll to sections
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            if (href === '#') return;
            
            const target = document.querySelector(`[data-id="${href.substring(1)}"]`);
            if (target) {
                e.preventDefault();
                target.click();
            }
        });
    });

    // Console Easter Egg
    console.log('%c🌸 Welcome to James Niere\'s Portfolio 🌸', 'background: linear-gradient(135deg, #ffb7c5, #ff6b9d); color: white; font-size: 20px; padding: 10px; border-radius: 5px;');
    console.log('%c日本の美学 - Japanese Aesthetics', 'color: #ffb7c5; font-size: 14px; font-style: italic;');
    console.log('%cPress "M" to toggle Matrix effect!', 'color: #d4af37; font-size: 12px;');
})();
