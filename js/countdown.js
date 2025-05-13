// Countdown Timer for AFCON Morocco 2025
let countdownInterval;

document.addEventListener('DOMContentLoaded', function() {
  // Set the tournament start date (January 15, 2025)
  const tournamentStartDate = new Date('2025-12-21T20:00:00+00:00').getTime();
  
  // Get countdown elements
  const daysElement = document.getElementById('days');
  const hoursElement = document.getElementById('hours');
  const minutesElement = document.getElementById('minutes');
  const secondsElement = document.getElementById('seconds');
  
  // Check if all elements exist
  if (!daysElement || !hoursElement || !minutesElement || !secondsElement) {
    console.warn('Countdown elements not found in the DOM');
    return;
  }
  
  // Function to update countdown
  function updateCountdown() {
    // Get current time
    const now = new Date().getTime();
    
    // Calculate time remaining
    const timeRemaining = tournamentStartDate - now;
    
    // Calculate days, hours, minutes and seconds
    const days = Math.floor(timeRemaining / (1000 * 60 * 60 * 24));
    const hours = Math.floor((timeRemaining % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((timeRemaining % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((timeRemaining % (1000 * 60)) / 1000);
    
    // Check if countdown is over
    if (timeRemaining < 0) {
      // Tournament has started
      daysElement.textContent = '000';
      hoursElement.textContent = '00';
      minutesElement.textContent = '00';
      secondsElement.textContent = '00';
      
      // Replace countdown with tournament started message
      const countdownContainer = document.querySelector('.countdown');
      if (countdownContainer) {
        countdownContainer.innerHTML = '<div class="tournament-started">Tournament Has Started!</div>';
      }
      
      // Clear the interval
      clearInterval(countdownInterval);
      return;
    }
    
    // Add leading zeros for formatting
    const formattedDays = String(days).padStart(3, '0');
    const formattedHours = String(hours).padStart(2, '0');
    const formattedMinutes = String(minutes).padStart(2, '0');
    const formattedSeconds = String(seconds).padStart(2, '0');
    
    // Update the DOM elements
    daysElement.textContent = formattedDays;
    hoursElement.textContent = formattedHours;
    minutesElement.textContent = formattedMinutes;
    secondsElement.textContent = formattedSeconds;
    
    // Add animation effect when seconds change
    secondsElement.classList.add('pulse');
    setTimeout(() => {
      secondsElement.classList.remove('pulse');
    }, 500);
    
    // Add animation effect when minutes change
    if (seconds === 0) {
      minutesElement.classList.add('pulse');
      setTimeout(() => {
        minutesElement.classList.remove('pulse');
      }, 500);
    }
    
    // Add animation effect when hours change
    if (seconds === 0 && minutes === 0) {
      hoursElement.classList.add('pulse');
      setTimeout(() => {
        hoursElement.classList.remove('pulse');
      }, 500);
    }
    
    // Add animation effect when days change
    if (seconds === 0 && minutes === 0 && hours === 0) {
      daysElement.classList.add('pulse');
      setTimeout(() => {
        daysElement.classList.remove('pulse');
      }, 500);
    }
  }
  
  // Add CSS for pulse animation
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
  document.head.appendChild(style);
  
  // Update countdown immediately
  updateCountdown();
  
  // Update countdown every second
  countdownInterval = setInterval(updateCountdown, 1000);
  
  // Add flip animation to countdown numbers
  const countdownItems = document.querySelectorAll('.countdown-item');
  countdownItems.forEach((item, index) => {
    // Add staggered entrance animation
    item.style.opacity = '0';
    item.style.transform = 'translateY(20px)';
    
    setTimeout(() => {
      item.style.transition = 'all 0.5s ease';
      item.style.opacity = '1';
      item.style.transform = 'translateY(0)';
    }, 100 * index);
  });
});