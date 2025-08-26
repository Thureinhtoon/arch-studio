// Main JavaScript file for Arch Studio website
(function($) {
  'use strict';

  // Initialize when DOM is ready
  $(document).ready(function() {
    // Initialize all components
    initNavigation();
    initHeroCarousel();
    initScrollAnimations();
  });

  // Simple navigation functionality
  function initNavigation() {
    const toggle = document.getElementById('navbarToggle');
    const nav = document.getElementById('navbarNav');
    const overlay = document.getElementById('navbarOverlay');
    
    let isOpen = false;
    
    // Toggle menu
    toggle.addEventListener('click', function() {
      isOpen = !isOpen;
      
      if (isOpen) {
        nav.classList.add('show');
        overlay.classList.add('show');
        toggle.classList.add('active');
        toggle.setAttribute('aria-expanded', 'true');
        document.body.classList.add('menu-open');
      } else {
        nav.classList.remove('show');
        overlay.classList.remove('show');
        toggle.classList.remove('active');
        toggle.setAttribute('aria-expanded', 'false');
        document.body.classList.remove('menu-open');
      }
    });
    
    // Close menu when clicking overlay
    overlay.addEventListener('click', function() {
      isOpen = false;
      nav.classList.remove('show');
      overlay.classList.remove('show');
      toggle.classList.remove('active');
      toggle.setAttribute('aria-expanded', 'false');
      document.body.classList.remove('menu-open');
    });
    
    // Close menu on nav link click (mobile only)
    document.querySelectorAll('.nav-link').forEach(link => {
      link.addEventListener('click', function() {
        if (window.innerWidth <= 991) {
          isOpen = false;
          nav.classList.remove('show');
          overlay.classList.remove('show');
          toggle.classList.remove('active');
          toggle.setAttribute('aria-expanded', 'false');
          document.body.classList.remove('menu-open');
        }
      });
    });
    
    // Handle window resize - SIMPLE VERSION
    window.addEventListener('resize', function() {
      if (window.innerWidth >= 992) {
        // Desktop: always close mobile menu
        isOpen = false;
        nav.classList.remove('show');
        overlay.classList.remove('show');
        toggle.classList.remove('active');
        toggle.setAttribute('aria-expanded', 'false');
        document.body.classList.remove('menu-open');
      }
    });

    // Active page navigation highlighting
    const currentPath = window.location.pathname;
    document.querySelectorAll('.nav-link').forEach(link => {
      const linkPath = link.getAttribute('href');
      if (currentPath.includes(linkPath.replace('.html', '')) || 
          (currentPath === '/' && linkPath === 'index.html')) {
        link.classList.add('active');
      }
    });
  }

  // Hero Carousel functionality
  function initHeroCarousel() {
    const carousel = $('#heroCarousel');
    const carouselItems = $('.carousel-item');
    const indicators = $('.carousel-indicators button');
    let currentSlide = 0;
    let autoplayInterval;

    if (carouselItems.length === 0) return;

    // Set background images for carousel items
    carouselItems.each(function() {
      const bgImage = $(this).data('bg');
      if (bgImage) {
        $(this).css('background-image', `url(${bgImage})`);
      }
    });

    // Indicator click handlers
    indicators.on('click', function() {
      const slideIndex = parseInt($(this).data('slide'));
      goToSlide(slideIndex);
      resetAutoplay();
    });

    // Go to specific slide
    function goToSlide(slideIndex) {
      if (slideIndex === currentSlide) return;

      // Remove active classes
      carouselItems.removeClass('active');
      indicators.removeClass('active');

      // Add active classes to new slide
      carouselItems.eq(slideIndex).addClass('active');
      indicators.eq(slideIndex).addClass('active');

      currentSlide = slideIndex;
    }

    // Next slide function
    function nextSlide() {
      const nextIndex = (currentSlide + 1) % carouselItems.length;
      goToSlide(nextIndex);
    }

    // Auto-play functionality
    function startAutoplay() {
      autoplayInterval = setInterval(nextSlide, 5000); // 5 seconds
    }

    function resetAutoplay() {
      clearInterval(autoplayInterval);
      startAutoplay();
    }

    // Start autoplay
    startAutoplay();

    // Pause autoplay on hover
    carousel.on('mouseenter', function() {
      clearInterval(autoplayInterval);
    });

    carousel.on('mouseleave', function() {
      startAutoplay();
    });

    // Keyboard navigation
    $(document).on('keydown', function(e) {
      if (carousel.is(':visible')) {
        switch(e.key) {
          case 'ArrowLeft':
            e.preventDefault();
            const prevIndex = currentSlide === 0 ? carouselItems.length - 1 : currentSlide - 1;
            goToSlide(prevIndex);
            resetAutoplay();
            break;
          case 'ArrowRight':
            e.preventDefault();
            nextSlide();
            resetAutoplay();
            break;
        }
      }
    });
  }

  // Scroll animations
  function initScrollAnimations() {
    // Fade in elements on scroll
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
      entries.forEach(function(entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('fade-in-visible');
          observer.unobserve(entry.target);
        }
      });
    }, observerOptions);

    // Observe elements for animation
    const elementsToAnimate = document.querySelectorAll(
      '.welcome-section, .small-team-section, .featured-section, .featured-item'
    );

    elementsToAnimate.forEach(function(element) {
      element.classList.add('fade-in');
      observer.observe(element);
    });
  }

  // Smooth scrolling for anchor links
  $('a[href^=\"#\"]').on('click', function(e) {
    const target = $(this.getAttribute('href'));
    
    if (target.length) {
      e.preventDefault();
      $('html, body').animate({
        scrollTop: target.offset().top - 100
      }, 600);
    }
  });

  // Form validation utilities (for contact form)
  window.validateEmail = function(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  window.validateRequired = function(value) {
    return value.trim() !== '';
  };

  // Utility function to debounce scroll events
  function debounce(func, wait, immediate) {
    let timeout;
    return function executedFunction() {
      const context = this;
      const args = arguments;
      
      const later = function() {
        timeout = null;
        if (!immediate) func.apply(context, args);
      };
      
      const callNow = immediate && !timeout;
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
      
      if (callNow) func.apply(context, args);
    };
  }

  // Handle window scroll for header transparency (if needed)
  const debouncedScroll = debounce(function() {
    const header = $('.header');
    const scrollTop = $(window).scrollTop();
    
    if (scrollTop > 50) {
      header.addClass('scrolled');
    } else {
      header.removeClass('scrolled');
    }
  }, 10);

  $(window).on('scroll', debouncedScroll);

})(jQuery);