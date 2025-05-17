// Attend que le document HTML soit complètement chargé avant d'exécuter le code
document.addEventListener('DOMContentLoaded', function() {
    // Gestion du préchargeur (écran de chargement)
    const preloader = document.getElementById('preloader');
    
    // Cache le préchargeur quand la page est entièrement chargée
    window.addEventListener('load', function() {
        // Délai pour un effet visuel plus agréable
        setTimeout(function() {
            // Commence la transition de disparition
            preloader.style.opacity = '0';
            // Attend que la transition soit terminée avant de cacher complètement
            setTimeout(function() {
                preloader.style.display = 'none';
            }, 500); // 500ms = durée de la transition
        }, 500); // Délai initial de 500ms
    });

    // Fonctionnalité de filtrage des actualités
    const filterButtons = document.querySelectorAll('.btn-filter'); // Boutons de filtre
    const newsCards = document.querySelectorAll('.news-card'); // Cartes d'actualités
    const newsSearch = document.getElementById('news-search'); // Barre de recherche
    
    // Filtrage des actualités par catégorie
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Retire la classe 'active' de tous les boutons
            filterButtons.forEach(btn => btn.classList.remove('active'));
            // Ajoute la classe 'active' au bouton cliqué
            this.classList.add('active');
            
            // Récupère la valeur du filtre à appliquer
            const filterValue = this.getAttribute('data-filter');
            
            // Applique le filtre à chaque carte d'actualité
            newsCards.forEach(card => {
                if (filterValue === 'all') {
                    // Affiche toutes les cartes si filtre "tout"
                    card.style.display = 'block';
                    setTimeout(() => {
                        card.style.opacity = '1';
                        card.style.transform = 'translateY(0)';
                    }, 50);
                } else {
                    // Récupère la catégorie de la carte
                    const cardCategory = card.querySelector('.news-category').textContent.toLowerCase();
                    // Vérifie si la carte correspond au filtre
                    if (cardCategory.includes(filterValue)) {
                        // Affiche la carte avec animation
                        card.style.display = 'block';
                        setTimeout(() => {
                            card.style.opacity = '1';
                            card.style.transform = 'translateY(0)';
                        }, 50);
                    } else {
                        // Cache la carte avec animation
                        card.style.opacity = '0';
                        card.style.transform = 'translateY(20px)';
                        setTimeout(() => {
                            card.style.display = 'none';
                        }, 300); // Attend la fin de l'animation
                    }
                }
            });
        });
    });

    // Fonctionnalité de recherche dans les actualités
    newsSearch.addEventListener('input', function() {
        // Récupère le terme de recherche en minuscules
        const searchTerm = this.value.toLowerCase();
        
        // Parcourt toutes les cartes d'actualité
        newsCards.forEach(card => {
            // Récupère le titre, l'extrait et la catégorie
            const title = card.querySelector('.news-title').textContent.toLowerCase();
            const excerpt = card.querySelector('.news-excerpt').textContent.toLowerCase();
            const category = card.querySelector('.news-category').textContent.toLowerCase();
            
            // Vérifie si le terme de recherche correspond
            if (title.includes(searchTerm) || excerpt.includes(searchTerm) || category.includes(searchTerm)) {
                // Affiche la carte correspondante
                card.style.display = 'block';
                setTimeout(() => {
                    card.style.opacity = '1';
                    card.style.transform = 'translateY(0)';
                }, 50);
            } else {
                // Cache les cartes non correspondantes
                card.style.opacity = '0';
                card.style.transform = 'translateY(20px)';
                setTimeout(() => {
                    card.style.display = 'none';
                }, 300);
            }
        });
    });

    // Gestion de l'envoi du formulaire de newsletter
    const newsletterForm = document.querySelector('.newsletter-form');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            // Empêche l'envoi classique du formulaire
            e.preventDefault();
            // Récupère l'email saisi
            const emailInput = this.querySelector('input[type="email"]');
            const email = emailInput.value;
            
            // Vérifie si l'email est valide
            if (validateEmail(email)) {
                // En production, on enverrait ici les données au serveur
                alert('Merci pour votre inscription à notre newsletter !');
                // Réinitialise le champ
                emailInput.value = '';
            } else {
                alert('Veuillez entrer une adresse email valide.');
            }
        });
    }

    // Fonction utilitaire pour valider un email
    function validateEmail(email) {
        // Expression régulière pour valider le format d'email
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    }

    // Initialisation des animations des cartes d'actualité
    function initNewsCardAnimations() {
        const newsCards = document.querySelectorAll('.news-card');
        
        // Configure l'animation pour chaque carte
        newsCards.forEach((card, index) => {
            // Définit un délai d'animation basé sur l'index
            card.style.setProperty('--animation-order', index);
            // Initialise l'état invisible
            card.style.opacity = '0';
            card.style.transform = 'translateY(20px)';
            
            // Lance l'animation avec un délai progressif
            setTimeout(() => {
                card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
                card.style.opacity = '1';
                card.style.transform = 'translateY(0)';
            }, 100 * index); // Délai proportionnel à la position
        });
        
        // Animation spécifique pour l'actualité mise en avant
        const featuredNews = document.querySelector('.featured-news');
        if (featuredNews) {
            featuredNews.style.opacity = '0';
            featuredNews.style.transform = 'translateY(20px)';
            
            setTimeout(() => {
                featuredNews.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
                featuredNews.style.opacity = '1';
                featuredNews.style.transform = 'translateY(0)';
            }, 100); // Délai plus court pour prioriser l'affichage
        }
    }

    // Lance les animations au chargement de la page
    initNewsCardAnimations();
});