// ====================================================
// FICHIER PRINCIPAL JAVASCRIPT - CAN MAROC 2025
// ====================================================

/**
 * Ce fichier contient toute la logique interactive du site :
 * - Gestion du préchargeur
 * - Effets de scroll
 * - Animations
 * - Gestion des formulaires
 * - Fonctionnalités du menu
 * - Gestion des vidéos
 */

// Attend que le DOM soit complètement chargé avant d'exécuter le code
document.addEventListener('DOMContentLoaded', function() {
  
  // =========================================
  // 1. GESTION DU PRÉCHARGEUR (LOADER)
  // =========================================
  const preloader = document.getElementById('preloader');
  if (preloader) {
    // Attend que toute la page soit chargée (images, etc.)
    window.addEventListener('load', () => {
      // Délai pour permettre l'animation
      setTimeout(() => {
        // Commence la disparition en douceur
        preloader.style.opacity = '0';
        
        // Cache complètement après la transition
        setTimeout(() => {
          preloader.style.display = 'none';
        }, 500); // Correspond à la durée de la transition CSS
      }, 1000); // Délai avant de commencer la disparition
    });
  }

  // =========================================
  // 2. EFFET DE SCROLL SUR LA NAVBAR
  // =========================================
  const navbar = document.querySelector('.navbar');
  if (navbar) {
    // Écoute l'événement de scroll
    window.addEventListener('scroll', () => {
      // Ajoute/supprime la classe 'scrolled' selon la position
      if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
      } else {
        navbar.classList.remove('scrolled');
      }
    });

    // Vérifie la position initiale au chargement
    if (window.scrollY > 50) {
      navbar.classList.add('scrolled');
    }
  }

  // =========================================
  // 3. ANIMATIONS AU SCROLL
  // =========================================
  const animateElements = document.querySelectorAll('.section-title, .fade-in, .reveal-text');
  if (animateElements.length > 0) {
    // Fonction pour déclencher les animations
    const animateOnScroll = () => {
      animateElements.forEach(element => {
        // Calcule la position de l'élément par rapport à la fenêtre
        const elementPosition = element.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;
        
        // Si l'élément est dans la zone visible
        if (elementPosition < windowHeight - 100) {
          // Animation spécifique pour les titres de section
          if (element.classList.contains('section-title')) {
            element.classList.add('animate');
          } 
          // Animation fade-in
          else if (element.classList.contains('fade-in')) {
            element.style.opacity = '1';
            element.style.transform = 'translateY(0)';
          } 
          // Animation de révélation de texte
          else if (element.classList.contains('reveal-text')) {
            element.style.clipPath = 'inset(0 0 0 0)';
          }
        }
      });
    };

    // Exécute une première fois au chargement
    animateOnScroll();
    
    // Ajoute l'écouteur d'événement pour le scroll
    window.addEventListener('scroll', animateOnScroll);
  }

  // =========================================
  // 4. AJOUT DES CLASSES POUR ANIMATIONS DIFFÉRÉES
  // =========================================
  const addFadeInClasses = () => {
    // Sélectionne différents types d'éléments à animer
    const elements = {
      'match-card': document.querySelectorAll('.match-card'),
      'group-card': document.querySelectorAll('.group-card'),
      'news-card': document.querySelectorAll('.news-card'),
      'sponsor-item': document.querySelectorAll('.sponsor-item')
    };

    // Parcourt chaque type d'élément
    for (const [className, nodeList] of Object.entries(elements)) {
      nodeList.forEach((element, index) => {
        // Ajoute les classes pour animation
        element.classList.add('fade-in');
        element.classList.add(`delay-${(index % 5) * 100}`);
        
        // État initial invisible
        element.style.opacity = '0';
        element.style.transform = 'translateY(20px)';
      });
    }
  };

  // Appelle la fonction
  addFadeInClasses();

  // =========================================
  // 5. GESTION DU FORMULAIRE DE NEWSLETTER
  // =========================================
  const newsletterForm = document.querySelector('.newsletter-form');
  if (newsletterForm) {
    newsletterForm.addEventListener('submit', function(e) {
      // Empêche l'envoi classique du formulaire
      e.preventDefault();
      
      // Récupère l'email saisi
      const emailInput = this.querySelector('input[type="email"]');
      const email = emailInput.value.trim();
      
      // Vérifie si l'email n'est pas vide
      if (email) {
        // Cache le formulaire
        this.style.display = 'none';
        
        // Crée un message de succès
        const successMessage = document.createElement('div');
        successMessage.className = 'alert alert-success';
        successMessage.innerHTML = 'Merci pour votre inscription à notre newsletter!';
        
        // Ajoute le message après le formulaire
        this.parentElement.appendChild(successMessage);
        
        // Réinitialise le formulaire
        this.reset();
      }
    });
  }

  // =========================================
  // 6. GESTION DU SELECTEUR DE LANGUE
  // =========================================
  const languageSelector = document.querySelector('.language-selector select');
  if (languageSelector) {
    languageSelector.addEventListener('change', function() {
      const selectedLang = this.value;
      
      // Logique de changement de langue (simulée)
      console.log(`Langue changée pour : ${selectedLang}`);
      
      // Gestion du RTL pour l'arabe
      if (selectedLang === 'ar') {
        document.documentElement.setAttribute('dir', 'rtl');
      } else {
        document.documentElement.setAttribute('dir', 'ltr');
      }
    });
  }

  // =========================================
  // 7. MENU MOBILE
  // =========================================
  const navbarToggler = document.querySelector('.navbar-toggler');
  const navbarCollapse = document.querySelector('.navbar-collapse');
  
  if (navbarToggler && navbarCollapse) {
    // Gestion du clic sur le bouton menu
    navbarToggler.addEventListener('click', () => {
      navbarCollapse.classList.toggle('show');
    });
    
    // Ferme le menu quand on clique à l'extérieur
    document.addEventListener('click', (e) => {
      if (!navbarToggler.contains(e.target) && !navbarCollapse.contains(e.target)) {
        navbarCollapse.classList.remove('show');
      }
    });
    
    // Ferme le menu après clic sur un lien
    const navLinks = navbarCollapse.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        navbarCollapse.classList.remove('show');
      });
    });
  }

  // =========================================
  // 8. SCROLL DOUX POUR LES LIENS D'ANCRE
  // =========================================
  const scrollLinks = document.querySelectorAll('a[href^="#"]:not([href="#"])');
  scrollLinks.forEach(link => {
    link.addEventListener('click', function(e) {
      e.preventDefault();
      
      // Récupère la cible du lien
      const targetId = this.getAttribute('href');
      const targetElement = document.querySelector(targetId);
      
      if (targetElement) {
        // Calcule la position en prenant en compte la navbar
        const navbarHeight = navbar ? navbar.offsetHeight : 0;
        const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - navbarHeight;
        
        // Scroll en douceur vers la cible
        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        });
      }
    });
  });

  // =========================================
  // 9. HIGHLIGHT DES LIENS DE NAVIGATION
  // =========================================
  const sections = document.querySelectorAll('section[id]');
  if (sections.length > 0 && navbar) {
    window.addEventListener('scroll', () => {
      let current = '';
      const navbarHeight = navbar.offsetHeight;
      
      // Détermine quelle section est visible
      sections.forEach(section => {
        const sectionTop = section.offsetTop - navbarHeight - 100;
        const sectionHeight = section.offsetHeight;
        
        if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
          current = section.getAttribute('id');
        }
      });
      
      // Met à jour les liens actifs
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
  
  // =========================================
  // 10. EFFET PARALLAX POUR LA SECTION HERO
  // =========================================
  const heroSection = document.getElementById('hero');
  if (heroSection) {
    window.addEventListener('scroll', () => {
      const scrollPosition = window.scrollY;
      if (scrollPosition < window.innerHeight) {
        // Ajuste l'opacité de l'overlay
        const overlay = heroSection.querySelector('.overlay');
        if (overlay) {
          overlay.style.opacity = 0.5 + (scrollPosition / window.innerHeight) * 0.3;
        }
        
        // Effet parallax sur la vidéo
        const video = heroSection.querySelector('#hero-video');
        if (video) {
          video.style.transform = `translateY(${scrollPosition * 0.2}px)`;
        }
      }
    });
  }

  // =========================================
  // 11. FALLBACK POUR LA VIDÉO DE FOND
  // =========================================
  const heroVideo = document.getElementById('hero-video');
  if (heroVideo) {
    heroVideo.addEventListener('error', () => {
      // Remplace la vidéo par une image si erreur
      const videoContainer = heroVideo.parentElement;
      videoContainer.style.backgroundImage = 'url(assets/images/hero-fallback.jpg)';
      videoContainer.style.backgroundSize = 'cover';
      videoContainer.style.backgroundPosition = 'center';
      heroVideo.style.display = 'none';
    });
  }
});

// =========================================
// 12. GESTION DE LA VISIBILITÉ DE LA PAGE
// =========================================
document.addEventListener('visibilitychange', function() {
  const heroVideo = document.getElementById('hero-video');
  if (heroVideo) {
    // Met en pause la vidéo quand la page n'est pas visible
    if (document.visibilityState === 'hidden') {
      heroVideo.pause();
    } else {
      // Relance la lecture quand la page redevient visible
      heroVideo.play().catch(e => {
        console.log('Auto-play bloqué par le navigateur:', e);
      });
    }
  }
});

// =========================================
// 13. PRÉVENTION DU FOUC (FLASH OF UNSTYLED CONTENT)
// =========================================
document.documentElement.className = 'js-enabled';