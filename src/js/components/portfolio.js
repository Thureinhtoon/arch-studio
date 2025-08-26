// Portfolio filtering functionality
(function($) {
  'use strict';

  $(document).ready(function() {
    initPortfolioFilters();
    initPortfolioAnimations();
  });

  function initPortfolioFilters() {
    const filterButtons = $('.filter-btn');
    const portfolioItems = $('.portfolio-item');
    
    // Filter button click handlers
    filterButtons.on('click', function() {
      const filter = $(this).data('filter');
      
      // Update active button
      filterButtons.removeClass('active');
      $(this).addClass('active');
      
      // Filter items
      filterPortfolioItems(filter, portfolioItems);
    });
  }

  function filterPortfolioItems(filter, items) {
    items.each(function() {
      const $item = $(this);
      const category = $item.data('category');
      
      if (filter === 'all' || category === filter) {
        // Show item
        $item.removeClass('filter-hidden').addClass('filter-show');
      } else {
        // Hide item
        $item.removeClass('filter-show').addClass('filter-hidden');
      }
    });
    
    // Update layout after filtering
    setTimeout(updateMasonryLayout, 300);
  }

  function initPortfolioAnimations() {
    // Intersection Observer for scroll animations
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
      entries.forEach(function(entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-in');
          observer.unobserve(entry.target);
        }
      });
    }, observerOptions);

    // Observe portfolio items
    $('.portfolio-item').each(function(index) {
      const $item = $(this);
      $item.css('transition-delay', (index * 0.1) + 's');
      observer.observe(this);
    });
  }

  function updateMasonryLayout() {
    // Simple masonry-like layout adjustment
    // In a real project, you might use a library like Masonry.js
    const $container = $('.portfolio-items');
    const visibleItems = $container.find('.portfolio-item.filter-show');
    
    visibleItems.each(function(index) {
      const $item = $(this);
      
      // Reset any previous transforms
      $item.css('transform', '');
      
      // Add staggered animation delay
      $item.css({
        'animation-delay': (index * 0.05) + 's',
        'opacity': '1',
        'transform': 'translateY(0)'
      });
    });
  }

  // Sort functionality (optional enhancement)
  function initPortfolioSorting() {
    const $sortSelect = $('#portfolioSort');
    
    if ($sortSelect.length) {
      $sortSelect.on('change', function() {
        const sortBy = $(this).val();
        const $container = $('.portfolio-items');
        const $items = $container.find('.portfolio-item');
        
        // Sort items array
        const sortedItems = $items.sort(function(a, b) {
          const aValue = $(a).data(sortBy);
          const bValue = $(b).data(sortBy);
          
          if (sortBy === 'date') {
            return new Date(bValue) - new Date(aValue); // Newest first
          } else {
            return aValue.localeCompare(bValue); // Alphabetical
          }
        });
        
        // Re-append sorted items
        $container.append(sortedItems);
        updateMasonryLayout();
      });
    }
  }

  // Search functionality (optional enhancement)
  function initPortfolioSearch() {
    const $searchInput = $('#portfolioSearch');
    
    if ($searchInput.length) {
      let searchTimeout;
      
      $searchInput.on('input', function() {
        const searchTerm = $(this).val().toLowerCase();
        
        clearTimeout(searchTimeout);
        searchTimeout = setTimeout(function() {
          searchPortfolioItems(searchTerm);
        }, 300);
      });
    }
  }

  function searchPortfolioItems(searchTerm) {
    const $items = $('.portfolio-item');
    
    $items.each(function() {
      const $item = $(this);
      const title = $item.find('.portfolio-title').text().toLowerCase();
      const category = $item.find('.portfolio-category').text().toLowerCase();
      const description = $item.find('.portfolio-description').text().toLowerCase();
      
      const matchesSearch = !searchTerm || 
                           title.includes(searchTerm) || 
                           category.includes(searchTerm) || 
                           description.includes(searchTerm);
      
      if (matchesSearch) {
        $item.removeClass('filter-hidden').addClass('filter-show');
      } else {
        $item.removeClass('filter-show').addClass('filter-hidden');
      }
    });
    
    updateMasonryLayout();
  }

  // Lazy loading for portfolio images
  function initLazyLoading() {
    if ('IntersectionObserver' in window) {
      const imageObserver = new IntersectionObserver(function(entries, observer) {
        entries.forEach(function(entry) {
          if (entry.isIntersecting) {
            const img = entry.target;
            const src = img.dataset.src;
            
            if (src) {
              img.src = src;
              img.classList.remove('lazy');
              img.classList.add('loaded');
              observer.unobserve(img);
            }
          }
        });
      });

      document.querySelectorAll('img[data-src]').forEach(function(img) {
        imageObserver.observe(img);
      });
    }
  }

  // Initialize optional features if elements exist
  initPortfolioSorting();
  initPortfolioSearch();
  initLazyLoading();

  // Export functions for potential external use
  window.ArchStudio = window.ArchStudio || {};
  window.ArchStudio.Portfolio = {
    filterItems: filterPortfolioItems,
    updateLayout: updateMasonryLayout,
    searchItems: searchPortfolioItems
  };

})(jQuery);