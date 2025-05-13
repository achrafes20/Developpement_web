// JavaScript for Teams page - AFCON Morocco 2025

document.addEventListener('DOMContentLoaded', function() {
  // Initialize filter functionality
  initTeamFilters();
  
  // Initialize search functionality
  initTeamSearch();
  
  // Initialize charts
  initTeamCharts();
  
  // Add animation order to team cards
  addAnimationOrderToTeams();
});

// Function to initialize team filters
function initTeamFilters() {
  const filterButtons = document.querySelectorAll('.btn-filter');
  const teamItems = document.querySelectorAll('.team-item');
  
  if (!filterButtons.length || !teamItems.length) return;
  
  filterButtons.forEach(button => {
    button.addEventListener('click', function() {
      // Remove active class from all buttons
      filterButtons.forEach(btn => btn.classList.remove('active'));
      
      // Add active class to clicked button
      this.classList.add('active');
      
      // Get filter value
      const filterValue = this.getAttribute('data-filter');
      
      // Filter teams
      teamItems.forEach(item => {
        if (filterValue === 'all') {
          // Show all items
          item.classList.remove('hidden');
          setTimeout(() => {
            item.style.display = 'block';
          }, 300);
        } else {
          // Show only items with matching filter
          if (item.getAttribute('data-group') === filterValue) {
            item.classList.remove('hidden');
            setTimeout(() => {
              item.style.display = 'block';
            }, 300);
          } else {
            // Hide items that don't match
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

// Function to initialize search functionality
function initTeamSearch() {
  const searchInput = document.getElementById('team-search');
  const teamItems = document.querySelectorAll('.team-item');
  
  if (!searchInput || !teamItems.length) return;
  
  searchInput.addEventListener('keyup', function() {
    const searchValue = this.value.toLowerCase().trim();
    
    // Filter teams based on search value
    teamItems.forEach(item => {
      const teamName = item.querySelector('.team-name').textContent.toLowerCase();
      const coachName = item.querySelector('.coach-name').textContent.toLowerCase();
      
      // If team name or coach name contains search value, show team
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
    
    // Reset filter buttons if search is active
    if (searchValue) {
      const filterButtons = document.querySelectorAll('.btn-filter');
      filterButtons.forEach(btn => btn.classList.remove('active'));
      document.querySelector('[data-filter="all"]').classList.add('active');
    }
  });
}

// Function to initialize charts
function initTeamCharts() {
  const regionsChart = document.getElementById('regions-chart');
  
  if (!regionsChart) return;
  
  // Sample data for regions chart
  const regionsData = {
    labels: ['North Africa', 'West Africa', 'East Africa', 'Central Africa', 'Southern Africa'],
    datasets: [{
      label: 'Number of Teams',
      data: [5, 8, 3, 4, 4],
      backgroundColor: [
        '#c1272d', // North - Moroccan Red
        '#006233', // West - Moroccan Green
        '#c8a45c', // East - Gold
        '#6366F1', // Central - Purple
        '#8B5CF6'  // Southern - Violet
      ],
      borderWidth: 0,
      hoverOffset: 15
    }]
  };
  
  // Create pie chart
  new Chart(regionsChart, {
    type: 'doughnut',
    data: regionsData,
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          position: 'right',
          labels: {
            font: {
              family: "'Poppins', sans-serif",
              size: 14
            },
            color: '#0F172A',
            padding: 20
          }
        },
        tooltip: {
          backgroundColor: 'rgba(255, 255, 255, 0.8)',
          titleColor: '#0F172A',
          bodyColor: '#0F172A',
          bodyFont: {
            family: "'Poppins', sans-serif",
            size: 14
          },
          titleFont: {
            family: "'Montserrat', sans-serif",
            size: 16,
            weight: 'bold'
          },
          padding: 12,
          boxWidth: 10,
          usePointStyle: true,
          borderColor: 'rgba(0, 0, 0, 0.1)',
          borderWidth: 1,
          caretSize: 8,
          cornerRadius: 8
        }
      },
      cutout: '60%',
      animation: {
        animateScale: true,
        animateRotate: true
      }
    }
  });
}

// Function to add animation order to team cards
function addAnimationOrderToTeams() {
  const teamCards = document.querySelectorAll('.team-card');
  
  teamCards.forEach((card, index) => {
    card.style.setProperty('--animation-order', index);
  });
}

// Function to handle team details page
function loadTeamDetails() {
  // This would be used on the team details page
  const urlParams = new URLSearchParams(window.location.search);
  const teamId = urlParams.get('team');
  
  if (teamId) {
    // In a real application, this would fetch team data from API
    console.log(`Loading team details for: ${teamId}`);
    
    // Sample implementation for demo
    const teamDetailsContainer = document.getElementById('team-details-container');
    if (teamDetailsContainer) {
      // Fetch team data and update UI
      fetchTeamData(teamId).then(data => {
        updateTeamDetailsUI(data);
      }).catch(error => {
        console.error('Error loading team details:', error);
        teamDetailsContainer.innerHTML = `<div class="alert alert-danger">Error loading team details. Please try again.</div>`;
      });
    }
  }
}

// Simulated API call to fetch team data
function fetchTeamData(teamId) {
  // In a real app, this would be an actual API call
  return new Promise((resolve) => {
    setTimeout(() => {
      // Sample data
      resolve({
        name: teamId.charAt(0).toUpperCase() + teamId.slice(1),
        flag: `assets/images/flags/${teamId}.png`,
        group: 'A',
        coach: 'Sample Coach',
        ranking: 25,
        appearances: 10,
        bestFinish: '2nd (2019)',
        players: []
      });
    }, 500);
  });
}

// Update team details UI
function updateTeamDetailsUI(teamData) {
  // This would populate the team details page with data
  // Implementation would depend on the actual HTML structure
  console.log('Updating UI with team data:', teamData);
}

// Add smooth scrolling to team sections
document.addEventListener('DOMContentLoaded', function() {
  const scrollLinks = document.querySelectorAll('a[href^="#team-"]');
  
  scrollLinks.forEach(link => {
    link.addEventListener('click', function(e) {
      e.preventDefault();
      
      const targetId = this.getAttribute('href');
      const targetElement = document.querySelector(targetId);
      
      if (targetElement) {
        window.scrollTo({
          top: targetElement.offsetTop - 100,
          behavior: 'smooth'
        });
      }
    });
  });
});