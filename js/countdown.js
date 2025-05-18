// Compte à rebours pour la CAN Maroc 2025
let countdownInterval; // Variable pour stocker l'intervalle du compte à rebours

// Attendre que le DOM soit entièrement chargé avant d'exécuter le script
document.addEventListener('DOMContentLoaded', function() {
  // Définir la date de début du tournoi (21 décembre 2025 à 20h00 UTC)
  const tournamentStartDate = new Date('2025-12-21T20:00:00+00:00').getTime();
  
  // Récupérer les éléments du compte à rebours dans le DOM
  const daysElement = document.getElementById('days'); // Élément pour les jours
  const hoursElement = document.getElementById('hours'); // Élément pour les heures
  const minutesElement = document.getElementById('minutes'); // Élément pour les minutes
  const secondsElement = document.getElementById('seconds'); // Élément pour les secondes
  
  // Vérifier si tous les éléments existent
  if (!daysElement || !hoursElement || !minutesElement || !secondsElement) {
    console.warn('Éléments du compte à rebours introuvables dans le DOM');
    return; // Arrêter l'exécution si des éléments sont manquants
  }
  
  // Fonction pour mettre à jour le compte à rebours
  function updateCountdown() {
    // Obtenir l'heure actuelle
    const now = new Date().getTime();
    
    // Calculer le temps restant jusqu'au tournoi
    const timeRemaining = tournamentStartDate - now;
    
    // Calculer les jours, heures, minutes et secondes restantes
    const days = Math.floor(timeRemaining / (1000 * 60 * 60 * 24)); // Conversion en jours
    const hours = Math.floor((timeRemaining % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)); // Conversion en heures
    const minutes = Math.floor((timeRemaining % (1000 * 60 * 60)) / (1000 * 60)); // Conversion en minutes
    const seconds = Math.floor((timeRemaining % (1000 * 60)) / 1000); // Conversion en secondes
    
    // Vérifier si le compte à rebours est terminé
    if (timeRemaining < 0) {
      // Le tournoi a commencé
      daysElement.textContent = '000'; // Réinitialiser les jours
      hoursElement.textContent = '00'; // Réinitialiser les heures
      minutesElement.textContent = '00'; // Réinitialiser les minutes
      secondsElement.textContent = '00'; // Réinitialiser les secondes
      
      // Remplacer le compte à rebours par un message
      const countdownContainer = document.querySelector('.countdown');
      if (countdownContainer) {
        countdownContainer.innerHTML = '<div class="tournament-started">Le Tournoi a Commencé!</div>';
      }
      
      // Arrêter l'intervalle
      clearInterval(countdownInterval);
      return;
    }
    
    // Formater les nombres avec des zéros initiaux
    const formattedDays = String(days).padStart(3, '0'); // 3 chiffres pour les jours
    const formattedHours = String(hours).padStart(2, '0'); // 2 chiffres pour les heures
    const formattedMinutes = String(minutes).padStart(2, '0'); // 2 chiffres pour les minutes
    const formattedSeconds = String(seconds).padStart(2, '0'); // 2 chiffres pour les secondes
    
    // Mettre à jour les éléments du DOM
    daysElement.textContent = formattedDays;
    hoursElement.textContent = formattedHours;
    minutesElement.textContent = formattedMinutes;
    secondsElement.textContent = formattedSeconds;
    
    // Ajouter un effet d'animation lors du changement des secondes
    secondsElement.classList.add('pulse');
    setTimeout(() => {
      secondsElement.classList.remove('pulse');
    }, 500);
    
    // Ajouter un effet d'animation lors du changement des minutes
    if (seconds === 0) {
      minutesElement.classList.add('pulse');
      setTimeout(() => {
        minutesElement.classList.remove('pulse');
      }, 500);
    }
    
    // Ajouter un effet d'animation lors du changement des heures
    if (seconds === 0 && minutes === 0) {
      hoursElement.classList.add('pulse');
      setTimeout(() => {
        hoursElement.classList.remove('pulse');
      }, 500);
    }
    
    // Ajouter un effet d'animation lors du changement des jours
    if (seconds === 0 && minutes === 0 && hours === 0) {
      daysElement.classList.add('pulse');
      setTimeout(() => {
        daysElement.classList.remove('pulse');
      }, 500);
    }
  }
  
  // Créer et ajouter le CSS pour les animations
  const style = document.createElement('style');
  style.textContent = `
    @keyframes pulse {
      0% { transform: scale(1); }
      50% { transform: scale(1.1); }
      100% { transform: scale(1); }
    }
    
    .pulse {
      animation: pulse 0.5s ease-in-out;
    }
    
    .tournament-started {
      font-family: var(--heading-font);
      font-size: 2rem;
      font-weight: 700;
      color: var(--accent);
      text-align: center;
      padding: 1rem;
      background-color: rgba(255, 255, 255, 0.1);
      backdrop-filter: blur(5px);
      border-radius: var(--radius-md);
      animation: pulse 1.5s infinite;
    }
    
    @media (max-width: 768px) {
      .tournament-started {
        font-size: 1.5rem;
      }
    }
  `;
  document.head.appendChild(style); // Ajouter le style au head du document
  
  // Mettre à jour le compte à rebours immédiatement
  updateCountdown();
  
  // Mettre à jour le compte à rebours toutes les secondes
  countdownInterval = setInterval(updateCountdown, 1000);
  
  // Ajouter une animation d'apparition aux éléments du compte à rebours
  const countdownItems = document.querySelectorAll('.countdown-item');
  countdownItems.forEach((item, index) => {
    // Initialiser l'état avant l'animation
    item.style.opacity = '0';
    item.style.transform = 'translateY(20px)';
    
    // Démarrer l'animation avec un délai progressif
    setTimeout(() => {
      item.style.transition = 'all 0.5s ease';
      item.style.opacity = '1';
      item.style.transform = 'translateY(0)';
    }, 100 * index); // Délai basé sur l'index pour un effet "stagger"
  });
});