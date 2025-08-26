// Animation enhancements and scroll effects
(function($) {
  'use strict';

  $(document).ready(function() {
    initScrollAnimations();
    initParallaxEffects();
    initHoverEnhancements();
    initPageTransitions();
  });

  // Enhanced scroll animations
  function initScrollAnimations() {
    // Intersection Observer for better performance
    const observerOptions = {
      threshold: [0, 0.1, 0.2, 0.5],
      rootMargin: '0px 0px -10% 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
      entries.forEach(function(entry) {
        const element = entry.target;
        const ratio = entry.intersectionRatio;

        if (entry.isIntersecting && ratio > 0.1) {
          // Add animation classes based on data attributes
          const animationType = element.dataset.animation || 'fadeInUp';
          const delay = element.dataset.delay || 0;

          setTimeout(function() {
            element.classList.add('animate__animated', 'animate__' + animationType);
            element.style.opacity = '1';
          }, delay);

          observer.unobserve(element);
        }
      });
    }, observerOptions);

    // Observe elements with animation data attributes
    document.querySelectorAll('[data-animation]').forEach(function(element) {
      element.style.opacity = '0';
      observer.observe(element);
    });

    // Generic fade-in observer for elements without specific animations
    const genericObserver = new IntersectionObserver(function(entries) {
      entries.forEach(function(entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('fade-in-visible');
          genericObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1 });

    document.querySelectorAll('.fade-in').forEach(function(element) {
      genericObserver.observe(element);
    });
  }

  // Parallax effects for hero sections
  function initParallaxEffects() {
    const parallaxElements = document.querySelectorAll('.parallax-element');
    
    if (parallaxElements.length === 0) return;

    let ticking = false;

    function updateParallax() {
      const scrolled = window.pageYOffset;
      const rate = scrolled * -0.5;

      parallaxElements.forEach(function(element) {
        const speed = element.dataset.speed || 0.5;
        const yPos = -(scrolled * speed);
        element.style.transform = `translateY(${yPos}px)`;
      });

      ticking = false;
    }

    function requestParallaxUpdate() {
      if (!ticking) {
        requestAnimationFrame(updateParallax);
        ticking = true;
      }
    }

    // Only enable parallax on non-touch devices for performance
    if (!('ontouchstart' in window)) {
      window.addEventListener('scroll', requestParallaxUpdate);
    }
  }

  // Enhanced hover effects
  function initHoverEnhancements() {
    // Magnetic button effect
    $('.btn-magnetic').each(function() {
      const button = this;
      
      button.addEventListener('mousemove', function(e) {
        const rect = button.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        const deltaX = (x - centerX) * 0.1;
        const deltaY = (y - centerY) * 0.1;
        
        button.style.transform = `translate(${deltaX}px, ${deltaY}px)`;
      });
      
      button.addEventListener('mouseleave', function() {
        button.style.transform = 'translate(0px, 0px)';
      });
    });

    // Image reveal effects
    $('.image-reveal').each(function() {
      const imageContainer = this;
      const image = imageContainer.querySelector('img');
      
      if (!image) return;

      imageContainer.addEventListener('mouseenter', function() {
        image.style.transform = 'scale(1.05)';
        imageContainer.classList.add('reveal-active');
      });
      
      imageContainer.addEventListener('mouseleave', function() {
        image.style.transform = 'scale(1)';
        imageContainer.classList.remove('reveal-active');
      });
    });

    // Text split animations
    $('.text-split').each(function() {
      const text = this.textContent;
      const chars = text.split('');
      
      this.innerHTML = chars.map(function(char, index) {
        return `<span class="char" style="animation-delay: ${index * 0.03}s">${char}</span>`;
      }).join('');
    });
  }

  // Page transition effects
  function initPageTransitions() {
    // Smooth page transitions
    $('a[href^="./"], a[href^="/"], a[href*=".html"]').on('click', function(e) {
      const link = this;
      const href = link.getAttribute('href');
      
      // Skip if it's the current page
      if (href === window.location.pathname || 
          href.replace('./', '') === window.location.pathname.split('/').pop()) {
        e.preventDefault();
        return;
      }
      
      // Skip external links
      if (link.hostname !== window.location.hostname) {
        return;
      }
      
      e.preventDefault();
      
      // Add transition class
      document.body.classList.add('page-transitioning');
      
      // Navigate after transition
      setTimeout(function() {
        window.location.href = href;
      }, 300);
    });

    // Remove transition class when page loads
    window.addEventListener('load', function() {
      document.body.classList.remove('page-transitioning');
    });

    // Page enter animation
    setTimeout(function() {
      document.body.classList.add('page-loaded');
    }, 100);
  }

  // Stagger animations for lists
  function staggerAnimation(elements, delay = 100) {
    elements.forEach(function(element, index) {
      setTimeout(function() {
        element.classList.add('animate-in');
      }, index * delay);
    });
  }

  // Text typewriter effect
  function typewriterEffect(element, text, speed = 50) {
    let i = 0;
    element.innerHTML = '';
    
    function typeWriter() {
      if (i < text.length) {
        element.innerHTML += text.charAt(i);
        i++;
        setTimeout(typeWriter, speed);
      }
    }
    
    typeWriter();
  }

  // Counter animation
  function animateCounter(element, target, duration = 2000) {
    let start = 0;
    const startTime = performance.now();
    
    function animate(currentTime) {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      
      // Easing function (ease out)
      const easeOut = 1 - Math.pow(1 - progress, 3);
      const current = Math.round(start + (target - start) * easeOut);
      
      element.textContent = current.toLocaleString();
      
      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    }
    
    requestAnimationFrame(animate);
  }

  // Scroll progress indicator
  function initScrollProgress() {
    const progressBar = document.querySelector('.scroll-progress');
    if (!progressBar) return;

    window.addEventListener('scroll', function() {
      const scrolled = (window.pageYOffset / (document.documentElement.scrollHeight - window.innerHeight)) * 100;
      progressBar.style.transform = `scaleX(${scrolled / 100})`;
    });
  }

  // Initialize scroll progress if element exists
  initScrollProgress();

  // Export functions for external use
  window.ArchStudio = window.ArchStudio || {};
  window.ArchStudio.Animations = {
    stagger: staggerAnimation,
    typewriter: typewriterEffect,
    counter: animateCounter,
    initParallax: initParallaxEffects
  };

  // Add CSS for animations
  const animationStyles = `
    <style>
      .page-transitioning {
        opacity: 0.8;
        transform: scale(0.98);
        transition: opacity 0.3s ease, transform 0.3s ease;
      }
      
      .page-loaded {
        animation: pageEnter 0.5s ease forwards;
      }
      
      @keyframes pageEnter {
        from {
          opacity: 0;
          transform: translateY(20px);
        }
        to {
          opacity: 1;
          transform: translateY(0);
        }
      }
      
      .image-reveal {
        overflow: hidden;
        position: relative;
      }
      
      .image-reveal::after {
        content: '';
        position: absolute;
        top: 0;
        left: -100%;
        width: 100%;
        height: 100%;
        background: linear-gradient(90deg, transparent, rgba(255,255,255,0.4), transparent);
        transition: left 0.6s ease;
      }
      
      .image-reveal:hover::after {
        left: 100%;
      }
      
      .text-split .char {
        display: inline-block;
        opacity: 0;
        animation: charReveal 0.5s ease forwards;
      }
      
      @keyframes charReveal {
        to {
          opacity: 1;
          transform: translateY(0);
        }
        from {
          opacity: 0;
          transform: translateY(20px);
        }
      }
      
      .scroll-progress {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 3px;
        background: #1B1D23;
        transform: scaleX(0);
        transform-origin: left;
        z-index: 9999;
        transition: transform 0.1s ease;
      }
    </style>
  `;

  // Inject animation styles
  if (!$('#animation-styles').length) {
    $('head').append(animationStyles.replace('<style>', '<style id="animation-styles">'));
  }

})(jQuery);