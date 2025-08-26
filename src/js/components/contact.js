// Contact form validation and map functionality
(function($) {
  'use strict';

  $(document).ready(function() {
    initContactForm();
    initMap();
    initOfficeLinks();
  });

  // Contact form functionality
  function initContactForm() {
    const form = $('#contactForm');
    const nameField = $('#name');
    const emailField = $('#email');
    const messageField = $('#message');
    const submitBtn = form.find('button[type="submit"]');
    const successMessage = $('#form-success');

    // Form submission handler
    form.on('submit', function(e) {
      e.preventDefault();
      
      // Validate form
      if (validateForm()) {
        submitForm();
      }
    });

    // Real-time validation
    nameField.on('blur input', function() {
      validateField('name', $(this).val().trim(), window.validateRequired);
    });

    emailField.on('blur input', function() {
      const email = $(this).val().trim();
      if (!email) {
        showFieldError('email', "Can't be empty");
      } else if (!window.validateEmail(email)) {
        showFieldError('email', 'Please use a valid email address');
      } else {
        hideFieldError('email');
      }
    });

    messageField.on('blur input', function() {
      validateField('message', $(this).val().trim(), window.validateRequired);
    });

    function validateForm() {
      let isValid = true;
      
      // Validate name
      if (!validateField('name', nameField.val().trim(), window.validateRequired)) {
        isValid = false;
      }
      
      // Validate email
      const email = emailField.val().trim();
      if (!email) {
        showFieldError('email', "Can't be empty");
        isValid = false;
      } else if (!window.validateEmail(email)) {
        showFieldError('email', 'Please use a valid email address');
        isValid = false;
      } else {
        hideFieldError('email');
      }
      
      // Validate message
      if (!validateField('message', messageField.val().trim(), window.validateRequired)) {
        isValid = false;
      }
      
      return isValid;
    }

    function validateField(fieldName, value, validator) {
      if (!validator(value)) {
        showFieldError(fieldName, "Can't be empty");
        return false;
      } else {
        hideFieldError(fieldName);
        return true;
      }
    }

    function showFieldError(fieldName, message) {
      const field = $('#' + fieldName);
      const errorElement = $('#' + fieldName + '-error');
      
      field.addClass('error');
      errorElement.text(message).addClass('show');
    }

    function hideFieldError(fieldName) {
      const field = $('#' + fieldName);
      const errorElement = $('#' + fieldName + '-error');
      
      field.removeClass('error');
      errorElement.removeClass('show');
    }

    function submitForm() {
      // Show loading state
      submitBtn.addClass('loading');
      submitBtn.find('.btn-text').hide();
      submitBtn.find('.loading-spinner').show();
      
      // Simulate form submission
      setTimeout(function() {
        // Hide loading state
        submitBtn.removeClass('loading');
        submitBtn.find('.btn-text').show();
        submitBtn.find('.loading-spinner').hide();
        
        // Show success message
        form.hide();
        successMessage.fadeIn();
        
        // Reset form after delay
        setTimeout(function() {
          form.trigger('reset');
          form.find('.form-control').removeClass('error');
          form.find('.form-error').removeClass('show');
          successMessage.fadeOut(function() {
            form.fadeIn();
          });
        }, 3000);
        
      }, 2000);
    }
  }

  // Map functionality
  function initMap() {
    // Only initialize if Leaflet is available
    if (typeof L === 'undefined') {
      console.warn('Leaflet not loaded, map functionality disabled');
      return;
    }

    try {
      // Office locations
      const offices = {
        main: {
          lat: 36.1627,
          lng: -86.7816,
          name: 'Main Office - Tennessee',
          address: '1892 Chenoweth Drive TN',
          phone: '123-456-3451',
          email: 'archone@mail.com'
        },
        texas: {
          lat: 29.7604,
          lng: -95.3698,
          name: 'Office II - Texas',
          address: '3399 Wines Lane TX',
          phone: '832-123-4321',
          email: 'archtwo@mail.com'
        }
      };

      // Initialize map centered between both offices
      const map = L.map('leaflet-map', {
        center: [32.9613, -91.0369], // Midpoint between offices
        zoom: 6,
        scrollWheelZoom: false
      });

      // Add tile layer
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap contributors',
        maxZoom: 18
      }).addTo(map);

      // Add markers for each office
      const markers = {};
      
      Object.keys(offices).forEach(function(key) {
        const office = offices[key];
        
        // Custom icon
        const icon = L.divIcon({
          className: 'custom-marker',
          html: '<div class="marker-pin"></div>',
          iconSize: [30, 30],
          iconAnchor: [15, 30],
          popupAnchor: [0, -30]
        });
        
        // Create marker
        const marker = L.marker([office.lat, office.lng], { icon: icon })
          .addTo(map)
          .bindPopup(createPopupContent(office));
        
        markers[key] = marker;
      });

      // Store map and markers for external access
      window.ArchStudioMap = {
        map: map,
        markers: markers,
        focusOffice: function(officeKey) {
          if (markers[officeKey]) {
            const office = offices[officeKey];
            map.setView([office.lat, office.lng], 12);
            markers[officeKey].openPopup();
          }
        }
      };

      // Remove placeholder
      $('.map-placeholder').remove();

    } catch (error) {
      console.error('Error initializing map:', error);
      $('.map-placeholder .map-text').text('Unable to load interactive map');
    }
  }

  function createPopupContent(office) {
    return `
      <div class="map-popup">
        <h4>${office.name}</h4>
        <p><strong>Address:</strong> ${office.address}</p>
        <p><strong>Phone:</strong> ${office.phone}</p>
        <p><strong>Email:</strong> ${office.email}</p>
      </div>
    `;
  }

  // Office links functionality
  function initOfficeLinks() {
    $('.office-link').on('click', function(e) {
      e.preventDefault();
      
      const officeKey = $(this).data('office');
      
      // Smooth scroll to map
      $('html, body').animate({
        scrollTop: $('#map').offset().top - 100
      }, 600);
      
      // Focus on specific office after scroll
      setTimeout(function() {
        if (window.ArchStudioMap) {
          window.ArchStudioMap.focusOffice(officeKey);
        }
      }, 700);
    });
  }

  // Add custom marker styles
  const markerStyles = `
    <style>
      .custom-marker {
        background: transparent;
        border: none;
      }
      .marker-pin {
        width: 20px;
        height: 20px;
        background-color: #1B1D23;
        border: 3px solid #fff;
        border-radius: 50% 50% 50% 0;
        transform: rotate(-45deg);
        box-shadow: 0 2px 10px rgba(0,0,0,0.3);
      }
      .marker-pin::after {
        content: '';
        position: absolute;
        top: 50%;
        left: 50%;
        width: 8px;
        height: 8px;
        background-color: #fff;
        border-radius: 50%;
        transform: translate(-50%, -50%);
      }
      .map-popup {
        font-family: 'League Spartan', sans-serif;
        min-width: 200px;
      }
      .map-popup h4 {
        margin: 0 0 10px 0;
        color: #1B1D23;
        font-size: 16px;
        font-weight: 600;
      }
      .map-popup p {
        margin: 5px 0;
        font-size: 14px;
        color: #60636D;
      }
      .leaflet-popup-content-wrapper {
        border-radius: 8px;
      }
      .leaflet-popup-tip {
        background: white;
      }
    </style>
  `;

  // Inject marker styles
  if (!$('#map-marker-styles').length) {
    $('head').append('<style id="map-marker-styles">' + markerStyles + '</style>');
  }

  // Export for potential external use
  window.ArchStudio = window.ArchStudio || {};
  window.ArchStudio.Contact = {
    focusOffice: function(officeKey) {
      if (window.ArchStudioMap) {
        window.ArchStudioMap.focusOffice(officeKey);
      }
    },
    validateForm: function() {
      return $('#contactForm').length > 0;
    }
  };

})(jQuery);