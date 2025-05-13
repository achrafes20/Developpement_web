// Interactive Map for AFCON Morocco 2025

document.addEventListener('DOMContentLoaded', function() {
  // Map points data
  const hostCities = [
    {
      name: 'Casablanca',
      stadium: 'Mohammed V Stadium',
      id: 'casablanca',
      position: { top: '40%', left: '20%' }
    },
    {
      name: 'Rabat',
      stadium: 'Moulay Abdellah Stadium',
      id: 'rabat',
      position: { top: '35%', left: '28%' }
    },
    {
      name: 'Marrakech',
      stadium: 'Grand Stade de Marrakech',
      id: 'marrakech',
      position: { top: '55%', left: '35%' }
    },
    {
      name: 'Agadir',
      stadium: 'Stade Adrar',
      id: 'agadir',
      position: { top: '65%', left: '15%' }
    },
    {
      name: 'Tangier',
      stadium: 'Stade Ibn Battouta',
      id: 'tangier',
      position: { top: '15%', left: '22%' }
    },
    {
      name: 'Fez',
      stadium: 'Stade de Fès',
      id: 'fez',
      position: { top: '30%', left: '38%' }
    }
  ];

  // Get map container
  const mapContainer = document.querySelector('.map-container');
  if (!mapContainer) {
    console.warn('Map container not found');
    return;
  }

  // Function to create map points dynamically
  function createMapPoints() {
    // Clear existing points
    const existingPoints = mapContainer.querySelectorAll('.map-point');
    existingPoints.forEach(point => point.remove());

    // Create new points
    hostCities.forEach(city => {
      const pointElement = document.createElement('div');
      pointElement.className = 'map-point';
      pointElement.setAttribute('data-city', city.id);
      pointElement.style.top = city.position.top;
      pointElement.style.left = city.position.left;

      // Create point dot
      const dotElement = document.createElement('div');
      dotElement.className = 'point-dot';
      pointElement.appendChild(dotElement);

      // Create city info
      const infoElement = document.createElement('div');
      infoElement.className = 'city-info';
      
      // Add city name
      const nameElement = document.createElement('h4');
      nameElement.textContent = city.name;
      infoElement.appendChild(nameElement);
      
      // Add stadium name
      const stadiumElement = document.createElement('p');
      stadiumElement.textContent = city.stadium;
      infoElement.appendChild(stadiumElement);
      
      // Add view details button
      const buttonElement = document.createElement('a');
      buttonElement.href = `stadiums.html#${city.id}`;
      buttonElement.className = 'btn btn-sm btn-outline-light';
      buttonElement.textContent = 'View Details';
      infoElement.appendChild(buttonElement);
      
      pointElement.appendChild(infoElement);
      
      // Add point to map
      mapContainer.appendChild(pointElement);
    });
  }

  // Initialize map points
  createMapPoints();

  // Add event listeners to map points
  function addMapPointListeners() {
    const mapPoints = document.querySelectorAll('.map-point');
    
    mapPoints.forEach(point => {
      // Mouse enter event
      point.addEventListener('mouseenter', () => {
        // Highlight this point
        const dot = point.querySelector('.point-dot');
        dot.style.transform = 'scale(1.3)';
        dot.style.backgroundColor = 'var(--accent)';
        
        // Show info box
        const info = point.querySelector('.city-info');
        info.style.opacity = '1';
        info.style.visibility = 'visible';
      });
      
      // Mouse leave event
      point.addEventListener('mouseleave', () => {
        // Remove highlight
        const dot = point.querySelector('.point-dot');
        dot.style.transform = '';
        dot.style.backgroundColor = '';
        
        // Hide info box
        const info = point.querySelector('.city-info');
        info.style.opacity = '0';
        info.style.visibility = 'hidden';
      });
      
      // Click event for mobile
      point.addEventListener('click', (e) => {
        // Prevent default only if clicking the dot, not the button
        const isInfoButton = e.target.closest('.btn');
        if (!isInfoButton) {
          e.preventDefault();
        }
      });
    });
  }

  // Add listeners to map points
  addMapPointListeners();

  // Handle window resize to adjust map points
  window.addEventListener('resize', () => {
    // Recreate points on window resize if needed
    // In a real application, you might want to use percentages
    // to avoid having to recreate points
  });

  // Add zoom functionality to map (optional)
  let scale = 1;
  const mapImage = mapContainer.querySelector('.morocco-map');
  
  if (mapImage) {
    mapContainer.addEventListener('wheel', (e) => {
      // Prevent page scrolling
      e.preventDefault();
      
      // Update scale
      if (e.deltaY < 0) {
        // Zoom in
        scale = Math.min(scale + 0.1, 2);
      } else {
        // Zoom out
        scale = Math.max(scale - 0.1, 1);
      }
      
      // Apply scale transform
      mapImage.style.transform = `scale(${scale})`;
      
      // Adjust point positions
      const mapPoints = document.querySelectorAll('.map-point');
      mapPoints.forEach(point => {
        // This would need more complex logic for proper zooming
        // This is a simplified example
      });
    });
  }

  // Add city highlights when hovering stadium names in text
  const stadiumLinks = document.querySelectorAll('a[href^="stadiums.html#"]');
  stadiumLinks.forEach(link => {
    link.addEventListener('mouseenter', () => {
      const cityId = link.getAttribute('href').split('#')[1];
      const mapPoint = document.querySelector(`.map-point[data-city="${cityId}"]`);
      
      if (mapPoint) {
        const dot = mapPoint.querySelector('.point-dot');
        dot.style.transform = 'scale(1.3)';
        dot.style.backgroundColor = 'var(--accent)';
        
        // Show info box
        const info = mapPoint.querySelector('.city-info');
        info.style.opacity = '1';
        info.style.visibility = 'visible';
      }
    });
    
    link.addEventListener('mouseleave', () => {
      const cityId = link.getAttribute('href').split('#')[1];
      const mapPoint = document.querySelector(`.map-point[data-city="${cityId}"]`);
      
      if (mapPoint) {
        const dot = mapPoint.querySelector('.point-dot');
        dot.style.transform = '';
        dot.style.backgroundColor = '';
        
        // Hide info box
        const info = mapPoint.querySelector('.city-info');
        info.style.opacity = '0';
        info.style.visibility = 'hidden';
      }
    });
  });

  // Function to add lazy loading for map image
  function setupLazyLoading() {
    const mapImage = document.querySelector('.morocco-map');
    if (mapImage) {
      // Create an IntersectionObserver
      const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
          // If element is in view
          if (entry.isIntersecting) {
            // Load the image
            const src = mapImage.getAttribute('data-src');
            if (src) {
              mapImage.src = src;
            }
            // Stop observing once loaded
            observer.unobserve(entry.target);
          }
        });
      }, {
        rootMargin: '0px 0px 200px 0px' // Load when within 200px of viewport
      });
      
      // Start observing
      observer.observe(mapImage);
    }
  }

  // Setup lazy loading
  setupLazyLoading();
});