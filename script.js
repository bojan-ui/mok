document.addEventListener('DOMContentLoaded', () => {
    // Mobile Menu Toggle
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');

    if (menuToggle && navLinks) {
        menuToggle.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            // Toggle hamburger icon animation
            menuToggle.classList.toggle('active');
        });
    }

    // Sticky Navbar on Scroll
    const navbar = document.querySelector('.navbar');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // Smooth Scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if(targetId === '#') return;
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                // Close mobile menu if open
                if (navLinks.classList.contains('active')) {
                    navLinks.classList.remove('active');
                }
                
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Magic Canvas Effects (Cursor trail for Hero section)
    initMagicCanvas();
    
    
    // Framework Scroll Animations
    initFrameworkAnimations();
    
    // Reveal Animations for cards
    initRevealAnimations();
});

// Reveal Animations
function initRevealAnimations() {
    const revealElements = document.querySelectorAll('.reveal');
    
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('in-view');
                // Optional: unobserve if you only want it to happen once
                // revealObserver.unobserve(entry.target);
            }
        });
    }, { 
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px' // Trigger slightly before it comes fully into view
    });
    
    revealElements.forEach(el => revealObserver.observe(el));
}

// Cursor Trail Effect
function initMagicCanvas() {
    const canvas = document.getElementById('magic-canvas');
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    
    // Resize canvas
    function resize() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
    window.addEventListener('resize', resize);
    resize();
    
    const particles = [];
    const colors = ['#EA4335', '#FBBC04', '#34A853', '#4285F4', '#FFFFFF'];
    
    const mouse = {
        x: undefined,
        y: undefined
    };
    
    let isMouseInHero = false;
    const heroSection = document.querySelector('.hero');
    
    if (heroSection) {
        heroSection.addEventListener('mousemove', (e) => {
            mouse.x = e.x;
            mouse.y = e.y;
            isMouseInHero = true;
            
            // Add particles on move
            for (let i = 0; i < 2; i++) {
                particles.push(new Particle());
            }
        });
        
        heroSection.addEventListener('mouseleave', () => {
            mouse.x = undefined;
            mouse.y = undefined;
            isMouseInHero = false;
        });
    }
    
    class Particle {
        constructor() {
            this.x = mouse.x;
            this.y = mouse.y;
            this.size = Math.random() * 3 + 1;
            this.speedX = Math.random() * 3 - 1.5;
            this.speedY = Math.random() * 3 - 1.5;
            this.color = colors[Math.floor(Math.random() * colors.length)];
            this.life = 100; // opacity life
            this.maxLife = 100;
        }
        
        update() {
            this.x += this.speedX;
            this.y += this.speedY;
            this.life -= 2;
            
            // Shrink size
            if (this.size > 0.1) this.size -= 0.05;
        }
        
        draw() {
            ctx.fillStyle = this.color;
            ctx.globalAlpha = this.life / this.maxLife;
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fill();
        }
    }
    
    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        for (let i = 0; i < particles.length; i++) {
            particles[i].update();
            particles[i].draw();
            
            if (particles[i].life <= 0 || particles[i].size <= 0.1) {
                particles.splice(i, 1);
                i--;
            }
        }
        
        requestAnimationFrame(animate);
    }
    
    animate();
}


// Framework Scroll Animations
function initFrameworkAnimations() {
    // Reveal entire grid at once
    const frameworkGrid = document.querySelector('.framework-grid');
    
    if (frameworkGrid) {
        const gridObserver = new IntersectionObserver((entries) => {
            if (entries[0].isIntersecting) {
                frameworkGrid.classList.add('in-view');
                gridObserver.unobserve(frameworkGrid);
            }
        }, { threshold: 0.15 }); // Trigger when 15% visible
        
        gridObserver.observe(frameworkGrid);
    }
}
