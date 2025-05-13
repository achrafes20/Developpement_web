// Main JavaScript file for AFCON Morocco 2025

document.addEventListener('DOMContentLoaded', function() {
  // Preloader
  const preloader = document.getElementById('preloader');
  if (preloader) {
    window.addEventListener('load', () => {
      setTimeout(() => {
        preloader.style.opacity = '0';
        setTimeout(() => {
          preloader.style.display = 'none';
        }, 500);
      }, 1000);
    });
  }

  // Navbar scroll effect
  const navbar = document.querySelector('.navbar');
  if (navbar) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
      } else {
        navbar.classList.remove('scrolled');
      }
    });

    // Check initial scroll position
    if (window.scrollY > 50) {
      navbar.classList.add('scrolled');
    }
  }

  // Animation on scroll
  const animateElements = document.querySelectorAll('.section-title, .fade-in, .reveal-text');
  if (animateElements.length > 0) {
    const animateOnScroll = () => {
      animateElements.forEach(element => {
        const elementPosition = element.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;
        
        if (elementPosition < windowHeight - 100) {
          if (element.classList.contains('section-title')) {
            element.classList.add('animate');
          } else if (element.classList.contains('fade-in')) {
            element.style.opacity = '1';
            element.style.transform = 'translateY(0)';
          } else if (element.classList.contains('reveal-text')) {
            element.style.clipPath = 'inset(0 0 0 0)';
          }
        }
      });
    };

    // Run once to check initial positions
    animateOnScroll();
    
    // Add scroll event listener
    window.addEventListener('scroll', animateOnScroll);
  }

  // Map interactions
  const mapPoints = document.querySelectorAll('.map-point');
  if (mapPoints.length > 0) {
    mapPoints.forEach(point => {
      // Mobile tap handling
      if ('ontouchstart' in window) {
        let isActive = false;
        
        point.addEventListener('touchstart', (e) => {
          if (!isActive) {
            e.preventDefault();
            
            // Hide all other info boxes
            mapPoints.forEach(p => {
              if (p !== point) {
                const info = p.querySelector('.city-info');
                info.style.opacity = '0';
                info.style.visibility = 'hidden';
              }
            });
            
            // Show this info box
            const info = point.querySelector('.city-info');
            info.style.opacity = '1';
            info.style.visibility = 'visible';
            isActive = true;
          } else {
            // If already active, allow the link to work
            isActive = false;
          }
        });
        
        // Close when tapping elsewhere
        document.addEventListener('touchstart', (e) => {
          if (!point.contains(e.target)) {
            const info = point.querySelector('.city-info');
            info.style.opacity = '0';
            info.style.visibility = 'hidden';
            isActive = false;
          }
        });
      }
    });
  }

  // Add fade-in classes to elements for staggered animations
  const addFadeInClasses = () => {
    const elements = {
      'match-card': document.querySelectorAll('.match-card'),
      'group-card': document.querySelectorAll('.group-card'),
      'news-card': document.querySelectorAll('.news-card'),
      'sponsor-item': document.querySelectorAll('.sponsor-item')
    };

    for (const [className, nodeList] of Object.entries(elements)) {
      nodeList.forEach((element, index) => {
        element.classList.add('fade-in');
        element.classList.add(`delay-${(index % 5) * 100}`);
        
        // Set initial state
        element.style.opacity = '0';
        element.style.transform = 'translateY(20px)';
      });
    }
  };

  addFadeInClasses();

  // Newsletter form submission
  const newsletterForm = document.querySelector('.newsletter-form');
  if (newsletterForm) {
    newsletterForm.addEventListener('submit', function(e) {
      e.preventDefault();
      
      const emailInput = this.querySelector('input[type="email"]');
      const email = emailInput.value.trim();
      
      if (email) {
        // Show success message (in a real app, this would send the data to a server)
        const formParent = this.parentElement;
        this.style.display = 'none';
        
        const successMessage = document.createElement('div');
        successMessage.className = 'alert alert-success';
        successMessage.innerHTML = 'Thank you for subscribing to our newsletter!';
        formParent.appendChild(successMessage);
        
        // Reset form
        this.reset();
      }
    });
  }

  // Language selector functionality
  const languageSelector = document.querySelector('.language-selector select');
  if (languageSelector) {
    languageSelector.addEventListener('change', function() {
      const selectedLang = this.value;
      
      // In a real application, this would change the language
      // For demo purposes, we'll just log the selection
      console.log(`Language changed to: ${selectedLang}`);
      
      // Set document direction for RTL languages (Arabic)
      if (selectedLang === 'ar') {
        document.documentElement.setAttribute('dir', 'rtl');
      } else {
        document.documentElement.setAttribute('dir', 'ltr');
      }
    });
  }

  // Mobile menu toggle
  const navbarToggler = document.querySelector('.navbar-toggler');
  const navbarCollapse = document.querySelector('.navbar-collapse');
  
  if (navbarToggler && navbarCollapse) {
    navbarToggler.addEventListener('click', () => {
      navbarCollapse.classList.toggle('show');
    });
    
    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
      if (!navbarToggler.contains(e.target) && !navbarCollapse.contains(e.target)) {
        navbarCollapse.classList.remove('show');
      }
    });
    
    // Close menu when a link is clicked
    const navLinks = navbarCollapse.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        navbarCollapse.classList.remove('show');
      });
    });
  }

  // Smooth scroll for anchor links
  const scrollLinks = document.querySelectorAll('a[href^="#"]:not([href="#"])');
  scrollLinks.forEach(link => {
    link.addEventListener('click', function(e) {
      e.preventDefault();
      
      const targetId = this.getAttribute('href');
      const targetElement = document.querySelector(targetId);
      
      if (targetElement) {
        const navbarHeight = navbar ? navbar.offsetHeight : 0;
        const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - navbarHeight;
        
        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        });
      }
    });
  });

  // Add active class to nav items based on scroll position
  const sections = document.querySelectorAll('section[id]');
  if (sections.length > 0 && navbar) {
    window.addEventListener('scroll', () => {
      let current = '';
      const navbarHeight = navbar.offsetHeight;
      
      sections.forEach(section => {
        const sectionTop = section.offsetTop - navbarHeight - 100;
        const sectionHeight = section.offsetHeight;
        
        if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
          current = section.getAttribute('id');
        }
      });
      
      const navLinks = document.querySelectorAll('.navbar-nav .nav-link');
      navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}` || 
            (current === 'hero' && link.getAttribute('href') === 'index.html')) {
          link.classList.add('active');
        }
      });
    });
  }

  // Initialize Bootstrap components
  // (Bootstrap 5 automatically initializes most components)
  
  // Custom initialization for carousels if needed
  const matchesCarousel = document.getElementById('matchesCarousel');
  if (matchesCarousel) {
    // Custom carousel controls if needed
  }

  // Add parallax effect to hero section
  const heroSection = document.getElementById('hero');
  if (heroSection) {
    window.addEventListener('scroll', () => {
      const scrollPosition = window.scrollY;
      if (scrollPosition < window.innerHeight) {
        const overlay = heroSection.querySelector('.overlay');
        if (overlay) {
          overlay.style.opacity = 0.5 + (scrollPosition / window.innerHeight) * 0.3;
        }
        
        const video = heroSection.querySelector('#hero-video');
        if (video) {
          video.style.transform = `translateY(${scrollPosition * 0.2}px)`;
        }
      }
    });
  }

  // Handle video background fallback
  const heroVideo = document.getElementById('hero-video');
  if (heroVideo) {
    heroVideo.addEventListener('error', () => {
      const videoContainer = heroVideo.parentElement;
      videoContainer.style.backgroundImage = 'url(assets/images/hero-fallback.jpg)';
      videoContainer.style.backgroundSize = 'cover';
      videoContainer.style.backgroundPosition = 'center';
      heroVideo.style.display = 'none';
    });
  }
});

// Handle page visibility for video pause/play
document.addEventListener('visibilitychange', function() {
  const heroVideo = document.getElementById('hero-video');
  if (heroVideo) {
    if (document.visibilityState === 'hidden') {
      heroVideo.pause();
    } else {
      heroVideo.play().catch(e => {
        console.log('Auto-play prevented by browser:', e);
      });
    }
  }
});

// Handle window resize events
window.addEventListener('resize', function() {
  // Adjust map points on window resize
  const mapContainer = document.querySelector('.map-container');
  if (mapContainer) {
    // Update map points positioning if needed
  }
});

// Prevent FOUC (Flash of Unstyled Content)
document.documentElement.className = 'js-enabled';