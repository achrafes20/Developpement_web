// JavaScript pour la page des équipes - CAN Maroc 2025

document.addEventListener('DOMContentLoaded', function() {
  // Initialiser la fonctionnalité de filtrage des équipes
  initTeamFilters();
  
  // Initialiser la fonctionnalité de recherche des équipes
  initTeamSearch();
  
  // Initialiser les graphiques statistiques
  initTeamCharts();
  
  // Ajouter un ordre d’animation aux cartes des équipes
  addAnimationOrderToTeams();
});

// Fonction pour initialiser les filtres d’équipes
function initTeamFilters() {
  const filterButtons = document.querySelectorAll('.btn-filter'); // Sélectionne tous les boutons de filtre
  const teamItems = document.querySelectorAll('.team-item'); // Sélectionne tous les éléments représentant une équipe
  
  if (!filterButtons.length || !teamItems.length) return; // Si aucun bouton ou aucune équipe n’est présent, on quitte

  filterButtons.forEach(button => {
    button.addEventListener('click', function() {
      // Supprimer la classe active de tous les boutons
      filterButtons.forEach(btn => btn.classList.remove('active'));
      
      // Ajouter la classe active au bouton cliqué
      this.classList.add('active');
      
      // Récupérer la valeur du filtre (ex. "groupe A", "groupe B", etc.)
      const filterValue = this.getAttribute('data-filter');
      
      // Filtrer les équipes en fonction de la valeur sélectionnée
      teamItems.forEach(item => {
        if (filterValue === 'all') {
          // Afficher tous les éléments si le filtre est "all"
          item.classList.remove('hidden');
          setTimeout(() => {
            item.style.display = 'block';
          }, 300); // Attendre 300ms pour une transition douce
        } else {
          // Afficher uniquement les éléments dont l’attribut "data-group" correspond
          if (item.getAttribute('data-group') === filterValue) {
            item.classList.remove('hidden');
            setTimeout(() => {
              item.style.display = 'block';
            }, 300);
          } else {
            // Cacher les éléments qui ne correspondent pas au filtre
            item.classList.add('hidden');
            setTimeout(() => {
              item.style.display = 'none';
            }, 300);
          }
        }
      });
    });
  });
}

// Fonction pour initialiser la recherche d’équipes
function initTeamSearch() {
  const searchInput = document.getElementById('team-search'); // Champ de recherche
  const teamItems = document.querySelectorAll('.team-item'); // Éléments représentant les équipes
  
  if (!searchInput || !teamItems.length) return; // Si aucun champ ou élément d’équipe n’existe, on arrête

  searchInput.addEventListener('keyup', function() {
    const searchValue = this.value.toLowerCase().trim(); // Récupère la valeur recherchée en minuscules et sans espaces
    
    // Filtrer les équipes en fonction du nom de l’équipe ou de l’entraîneur
    teamItems.forEach(item => {
      const teamName = item.querySelector('.team-name').textContent.toLowerCase(); // Nom de l’équipe
      const coachName = item.querySelector('.coach-name').textContent.toLowerCase(); // Nom de l’entraîneur
      
      // Affiche si la recherche correspond au nom de l’équipe ou à l’entraîneur
      if (teamName.includes(searchValue) || coachName.includes(searchValue)) {
        item.classList.remove('hidden');
        setTimeout(() => {
          item.style.display = 'block';
        }, 300);
      } else {
        item.classList.add('hidden');
        setTimeout(() => {
          item.style.display = 'none';
        }, 300);
      }
    });
    
    // Réinitialiser les filtres si une recherche est active
    if (searchValue) {
      const filterButtons = document.querySelectorAll('.btn-filter'); // Tous les boutons de filtre
      filterButtons.forEach(btn => btn.classList.remove('active')); // Retirer les classes actives
      document.querySelector('[data-filter="all"]').classList.add('active'); // Activer le filtre "tous"
    }
  });
}

// Fonction pour initialiser les graphiques des régions
function initTeamCharts() {
  const regionsChart = document.getElementById('regions-chart'); // Élément canvas pour le graphique
  
  if (!regionsChart) return; // Si aucun graphique présent, arrêter

  // Données d’exemple pour les régions africaines
  const regionsData = {
    labels: ['Afrique du Nord', 'Afrique de l’Ouest', 'Afrique de l’Est', 'Afrique Centrale', 'Afrique Australe'],
    datasets: [{
      label: 'Nombre d’équipes',
      data: [5, 8, 3, 4, 4], // Données fictives
      backgroundColor: [
        '#c1272d', // Nord - Rouge Marocain
        '#006233', // Ouest - Vert Marocain
        '#c8a45c', // Est - Or
        '#6366F1', // Centre - Violet clair
        '#8B5CF6'  // Sud - Violet foncé
      ],
      borderWidth: 0, // Pas de bordure autour des parts
      hoverOffset: 15 // Décalage au survol
    }]
  };

  // Création du graphique en camembert (doughnut)
  new Chart(regionsChart, {
    type: 'doughnut',
    data: regionsData,
    options: {
      responsive: true, // Adaptatif
      maintainAspectRatio: false, // Ne pas garder les proportions fixes
      plugins: {
        legend: {
          position: 'right', // Légende à droite
          labels: {
            font: {
              family: "'Poppins', sans-serif",
              size: 14
            },
            color: '#0F172A', // Couleur du texte
            padding: 20 // Espacement entre les éléments
          }
        },
        tooltip: {
          backgroundColor: 'rgba(255, 255, 255, 0.8)', // Fond clair
          titleColor: '#0F172A', // Couleur du titre
          bodyColor: '#0F172A', // Couleur du contenu
          bodyFont: {
            family: "'Poppins', sans-serif",
            size: 14
          },
          titleFont: {
            family: "'Montserrat', sans-serif",
            size: 16,
            weight: 'bold'
          },
          padding: 12, // Marge intérieure
          boxWidth: 10,
          usePointStyle: true, // Style de point
          borderColor: 'rgba(0, 0, 0, 0.1)',
          borderWidth: 1,
          caretSize: 8, // Taille de la flèche
          cornerRadius: 8 // Bords arrondis
        }
      },
      cutout: '60%', // Trou au centre du graphique
      animation: {
        animateScale: true, // Animation d’échelle
        animateRotate: true // Animation de rotation
      }
    }
  });
}

// Fonction pour ajouter l’ordre d’animation aux cartes des équipes
function addAnimationOrderToTeams() {
  const teamCards = document.querySelectorAll('.team-card'); // Sélection de toutes les cartes d’équipe
  
  teamCards.forEach((card, index) => {
    card.style.setProperty('--animation-order', index); // Définir une variable CSS personnalisée pour l’ordre
  });
}

// Fonction pour gérer la page de détails d’une équipe
function loadTeamDetails() {
  // Cela est utilisé sur la page des détails d’une équipe
  const urlParams = new URLSearchParams(window.location.search); // Paramètres de l’URL
  const teamId = urlParams.get('team'); // Identifiant de l’équipe récupéré depuis l’URL
  
  if (teamId) {
    // Dans une application réelle, cela récupérerait les données depuis une API
    console.log(`Chargement des détails pour l’équipe : ${teamId}`);
    
    const teamDetailsContainer = document.getElementById('team-details-container'); // Conteneur des détails d’équipe
    
    if (teamDetailsContainer) {
      // Récupérer les données simulées de l’équipe
      fetchTeamData(teamId).then(data => {
        updateTeamDetailsUI(data); // Mettre à jour l’interface avec les données récupérées
      }).catch(error => {
        console.error('Erreur lors du chargement des détails de l’équipe :', error);
        teamDetailsContainer.innerHTML = `<div class="alert alert-danger">Erreur lors du chargement des détails de l’équipe. Veuillez réessayer.</div>`;
      });
    }
  }
}

// Simulation d’appel API pour récupérer les données d’une équipe
function fetchTeamData(teamId) {
  return new Promise((resolve) => {
    setTimeout(() => {
      // Données simulées d’une équipe
      resolve({
        name: teamId.charAt(0).toUpperCase() + teamId.slice(1), // Nom avec majuscule
        flag: `assets/images/flags/${teamId}.png`, // Drapeau fictif
        group: 'A',
        coach: 'Entraîneur Exemple',
        ranking: 25,
        appearances: 10,
        bestFinish: '2ème (2019)',
        players: [] // Liste vide pour simplification
      });
    }, 500); // Simulation de délai réseau
  });
}

// Mise à jour de l’interface des détails d’équipe
function updateTeamDetailsUI(teamData) {
  // Cette fonction doit afficher les données dans la page des détails
  console.log('Mise à jour de l’interface avec les données :', teamData);
}

// Ajout du défilement fluide vers les sections d’équipe
document.addEventListener('DOMContentLoaded', function() {
  const scrollLinks = document.querySelectorAll('a[href^="#team-"]'); // Liens qui mènent à des sections d’équipe
  
  scrollLinks.forEach(link => {
    link.addEventListener('click', function(e) {
      e.preventDefault(); // Empêcher le comportement par défaut du lien
      
      const targetId = this.getAttribute('href'); // ID de la cible
      const targetElement = document.querySelector(targetId); // Élément cible
      
      if (targetElement) {
        window.scrollTo({
          top: targetElement.offsetTop - 100, // Scroll en haut de la cible avec un décalage de 100px
          behavior: 'smooth' // Animation fluide
        });
      }
    });
  });
});
