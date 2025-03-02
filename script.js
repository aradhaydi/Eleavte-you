// Wait for DOM content to load
document.addEventListener('DOMContentLoaded', function() {
  // Add animation classes to elements when they come into view
  const animateOnScroll = function() {
    const elements = document.querySelectorAll('.section-title, .featured-card, .article-card, .course-card, .exercise-card');

    elements.forEach(element => {
      const elementPosition = element.getBoundingClientRect().top;
      const windowHeight = window.innerHeight;

      if (elementPosition < windowHeight - 100) {
        if (element.classList.contains('section-title')) {
          element.classList.add('slide-up');
        } else if (element.classList.contains('featured-card') || element.classList.contains('article-card')) {
          element.classList.add('fade-in');
        } else {
          element.classList.add('slide-in-right');
        }
      }
    });
  };

  // Run once on load
  animateOnScroll();

  // Run on scroll
  window.addEventListener('scroll', animateOnScroll);

  // Mobile Menu Toggle
  const menuToggle = document.querySelector('.menu-toggle');
  const menu = document.querySelector('.menu');

  if (menuToggle) {
    menuToggle.addEventListener('click', function() {
      menu.classList.toggle('active');
      const icon = menuToggle.querySelector('i');
      if (icon.classList.contains('fa-bars')) {
        icon.classList.remove('fa-bars');
        icon.classList.add('fa-times');
      } else {
        icon.classList.remove('fa-times');
        icon.classList.add('fa-bars');
      }
    });
  }

  // Featured Content Slider
  const sliderContainer = document.querySelector('.slider-container');
  const sliderDots = document.querySelectorAll('.slider-dot');
  const prevSlideBtn = document.querySelector('.prev-slide');
  const nextSlideBtn = document.querySelector('.next-slide');
  const featuredCards = document.querySelectorAll('.featured-card');

  let currentSlide = 0;

  if (sliderContainer && featuredCards.length > 0) {
    // Make sure the slider has the right structure for mobile and desktop
    sliderContainer.style.display = 'flex';

    // Function to adjust slider based on screen size
    function adjustSliderForScreenSize() {
      // Size container appropriately based on responsive design
      sliderContainer.style.width = `${featuredCards.length * 100}%`;

      // Get visible cards count based on screen width
      let visibleCards = 1;
      if (window.innerWidth >= 1200) {
        visibleCards = 3;
      } else if (window.innerWidth >= 768) {
        visibleCards = 2;
      }

      // Apply proper width to each card
      featuredCards.forEach(card => {
        card.style.width = `${100 / (featuredCards.length * visibleCards)}%`;
        
        // Make sure cards are visible
        card.style.display = 'block';
        card.style.opacity = '1';
      });

      // Make sure slider is visible
      sliderContainer.style.opacity = '1';
      sliderContainer.style.overflow = 'visible';
    }

    // Call once on load
    adjustSliderForScreenSize();

    // Listen for window resize
    window.addEventListener('resize', adjustSliderForScreenSize);

    // Update slider position
    function updateSliderPosition() {
      // Get visible cards count based on screen width
      let visibleCards = 1;
      if (window.innerWidth >= 1200) {
        visibleCards = 3;
      } else if (window.innerWidth >= 768) {
        visibleCards = 2;
      }

      // Calculate the correct slide percentage based on visible cards
      const slidePercentage = 100 / (featuredCards.length * visibleCards) * visibleCards;
      sliderContainer.style.transform = `translateX(-${currentSlide * slidePercentage}%)`;
      sliderContainer.style.transition = 'transform 0.5s ease';

      // Update active dot
      sliderDots.forEach((dot, index) => {
        if (index === currentSlide) {
          dot.classList.add('active');
        } else {
          dot.classList.remove('active');
        }
      });
    }

    // Next slide
    function nextSlide() {
      currentSlide = (currentSlide + 1) % featuredCards.length;
      updateSliderPosition();
    }

    // Previous slide
    function prevSlide() {
      currentSlide = (currentSlide - 1 + featuredCards.length) % featuredCards.length;
      updateSliderPosition();
    }

    // Event listeners for slider controls
    if (nextSlideBtn) nextSlideBtn.addEventListener('click', nextSlide);
    if (prevSlideBtn) prevSlideBtn.addEventListener('click', prevSlide);

    // Event listeners for slider dots
    sliderDots.forEach(dot => {
      dot.addEventListener('click', function() {
        currentSlide = parseInt(this.getAttribute('data-index'));
        updateSliderPosition();
      });
    });

    // Auto slide
    setInterval(nextSlide, 5000);

    // Initial position
    updateSliderPosition();
  }

  // Back to Top button
  const backToTopBtn = document.querySelector('.back-to-top');

  if (backToTopBtn) {
    window.addEventListener('scroll', function() {
      if (window.pageYOffset > 300) {
        backToTopBtn.classList.add('visible');
      } else {
        backToTopBtn.classList.remove('visible');
      }
    });

    backToTopBtn.addEventListener('click', function() {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }

  // Smooth scrolling for navigation links
  const navLinks = document.querySelectorAll('header nav a, .hero a');

  navLinks.forEach(link => {
    link.addEventListener('click', function(e) {
      // Only process links that start with #
      if (this.getAttribute('href').startsWith('#')) {
        e.preventDefault();

        // Close mobile menu if open
        if (menu.classList.contains('active')) {
          menu.classList.remove('active');
          const icon = menuToggle.querySelector('i');
          icon.classList.remove('fa-times');
          icon.classList.add('fa-bars');
        }

        const targetId = this.getAttribute('href');
        const targetSection = document.querySelector(targetId);

        if (targetSection) {
          window.scrollTo({
            top: targetSection.offsetTop - 90,
            behavior: 'smooth'
          });

          // Update active link
          navLinks.forEach(navLink => navLink.classList.remove('active'));
          this.classList.add('active');
        }
      }
    });
  });

  // Highlight active section on scroll
  window.addEventListener('scroll', function() {
    const scrollPosition = window.scrollY;

    // Get all sections
    const sections = document.querySelectorAll('section');

    sections.forEach(section => {
      // Calculate section position
      const sectionTop = section.offsetTop - 100;
      const sectionHeight = section.offsetHeight;

      if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
        // Get section id
        const sectionId = section.getAttribute('id');

        // Remove active class from all links
        navLinks.forEach(link => link.classList.remove('active'));

        // Add active class to corresponding link
        const activeLink = document.querySelector(`header nav a[href="#${sectionId}"]`);
        if (activeLink) {
          activeLink.classList.add('active');
        }
      }
    });

    // Change header background on scroll
    const header = document.querySelector('header');
    if (scrollPosition > 50) {
      header.style.background = 'white';
      header.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
    } else {
      header.style.background = 'white';
      header.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
    }
  });

  // Simple testimonial slider
  let currentTestimonial = 0;
  const testimonials = document.querySelectorAll('.testimonial');
  const testimonialSlider = document.querySelector('.testimonials-slider');

  if (testimonials.length > 0 && testimonialSlider) {
    // Auto-scroll testimonials
    setInterval(() => {
      currentTestimonial = (currentTestimonial + 1) % testimonials.length;
      testimonialSlider.scrollTo({
        left: testimonials[currentTestimonial].offsetLeft - testimonialSlider.offsetLeft,
        behavior: 'smooth'
      });
    }, 5000);
  }

  // Newsletter form submission
  const newsletterForm = document.querySelector('.newsletter-form');

  if (newsletterForm) {
    newsletterForm.addEventListener('submit', function(e) {
      e.preventDefault();
      const emailInput = this.querySelector('input[type="email"]');

      if (emailInput && emailInput.value) {
        // In a real application, you would send this to your backend
        alert(`Thank you for subscribing with ${emailInput.value}!`);
        emailInput.value = '';
      }
    });
  }

  // Animation for exercise cards
  const exerciseCards = document.querySelectorAll('.exercise-card');

  if (exerciseCards.length > 0) {
    const observerOptions = {
      threshold: 0.2,
      rootMargin: '0px 0px -50px 0px'
    };

    const exerciseObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.style.opacity = '1';
          entry.target.style.transform = 'translateY(0)';
          exerciseObserver.unobserve(entry.target);
        }
      });
    }, observerOptions);

    exerciseCards.forEach((card, index) => {
      card.style.opacity = '0';
      card.style.transform = 'translateY(20px)';
      card.style.transition = `all 0.4s ease ${index * 0.1}s`;
      exerciseObserver.observe(card);
    });
  }

  // Download buttons for exercises
  const downloadButtons = document.querySelectorAll('.download-btn');

  if (downloadButtons.length > 0) {
    // Create sample PDF content (this is just a demo)
    const generateDummyPDF = (title, exerciseType) => {
      // In a real application, you would serve actual PDF files
      // This is just to demonstrate functionality
      const a = document.createElement('a');
      a.href = "data:application/pdf;base64,JVBERi0xLjcKCjEgMCBvYmogICUgZW50cnkgcG9pbnQKPDwKICAvVHlwZSAvQ2F0YWxvZwogIC9QYWdlcyAyIDAgUgo+PgplbmRvYmoKCjIgMCBvYmoKPDwKICAvVHlwZSAvUGFnZXMKICAvTWVkaWFCb3ggWyAwIDAgMjAwIDIwMCBdCiAgL0NvdW50IDEKICAvS2lkcyBbIDMgMCBSIF0KPj4KZW5kb2JqCgozIDAgb2JqCjw8CiAgL1R5cGUgL1BhZ2UKICAvUGFyZW50IDIgMCBSCiAgL1Jlc291cmNlcyA8PAogICAgL0ZvbnQgPDwKICAgICAgL0YxIDQgMCBSIAogICAgPj4KICA+PgogIC9Db250ZW50cyA1IDAgUgo+PgplbmRvYmoKCjQgMCBvYmoKPDwKICAvVHlwZSAvRm9udAogIC9TdWJ0eXBlIC9UeXBlMQogIC9CYXNlRm9udCAvVGltZXMtUm9tYW4KPj4KZW5kb2JqCgo1IDAgb2JqICAlIHBhZ2UgY29udGVudAo8PAogIC9MZW5ndGggNDQKPj4Kc3RyZWFtCkJUCjcwIDUwIFRECi9GMSAxMiBUZgooSGVsbG8sIHdvcmxkISkgVGoKRVQKZW5kc3RyZWFtCmVuZG9iagoKeHJlZgowIDYKMDAwMDAwMDAwMCA2NTUzNSBmIAowMDAwMDAwMDEwIDAwMDAwIG4gCjAwMDAwMDAwNzkgMDAwMDAgbiAKMDAwMDAwMDE3MyAwMDAwMCBuIAowMDAwMDAwMzAxIDAwMDAwIG4gCjAwMDAwMDAzODAgMDAwMDAgbiAKdHJhaWxlcgo8PAogIC9TaXplIDYKICAvUm9vdCAxIDAgUgo+PgpzdGFydHhyZWYKNDkyCiUlRU9G";
      a.download = `Evolve_You_${title.replace(/\s+/g, '_')}_${exerciseType}.pdf`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    };

    downloadButtons.forEach(button => {
      button.addEventListener('click', function(e) {
        e.preventDefault();
        const exerciseCard = this.closest('.exercise-card');
        const exerciseTitle = exerciseCard.querySelector('h3').textContent;
        const exerciseType = this.getAttribute('data-exercise') || 'resource';

        // Show downloading animation
        const originalText = this.textContent;
        this.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Downloading...';
        this.disabled = true;

        // Simulate download delay
        setTimeout(() => {
          generateDummyPDF(exerciseTitle, exerciseType);

          // Reset button
          setTimeout(() => {
            this.innerHTML = '<i class="fas fa-check"></i> Downloaded!';

            // Return to original state after 2 seconds
            setTimeout(() => {
              this.innerHTML = originalText;
              this.disabled = false;
            }, 2000);
          }, 500);
        }, 1000);
      });
    });
  }

// Dark mode toggle
function initDarkMode() {
  // Check if toggle already exists to avoid duplicates
  if (document.querySelector('.dark-mode-toggle')) {
    return;
  }

  const darkModeToggle = document.createElement('button');
  darkModeToggle.className = 'dark-mode-toggle';
  darkModeToggle.innerHTML = '<i class="fas fa-moon"></i>';
  darkModeToggle.title = 'Toggle Dark Mode';
  document.body.appendChild(darkModeToggle);

  // Check for saved theme preference or respect OS preference
  const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');
  const savedTheme = localStorage.getItem('theme');

  if (savedTheme === 'dark' || (!savedTheme && prefersDarkScheme.matches)) {
    document.body.classList.add('dark-theme');
    darkModeToggle.innerHTML = '<i class="fas fa-sun"></i>';
  }

  darkModeToggle.addEventListener('click', () => {
    document.body.classList.toggle('dark-theme');

    if (document.body.classList.contains('dark-theme')) {
      localStorage.setItem('theme', 'dark');
      darkModeToggle.innerHTML = '<i class="fas fa-sun"></i>';
    } else {
      localStorage.setItem('theme', 'light');
      darkModeToggle.innerHTML = '<i class="fas fa-moon"></i>';
    }
  });
}

// Calculate and display reading time for articles
function calculateReadingTime() {
  const articleContent = document.querySelector('.article-content');

  if (articleContent) {
    const text = articleContent.textContent;
    const wordCount = text.split(/\s+/).length;
    const readingTime = Math.ceil(wordCount / 200); // Assuming 200 words per minute reading speed

    // Create reading time element
    const readingTimeElement = document.createElement('span');
    readingTimeElement.classList.add('reading-time');
    readingTimeElement.innerHTML = `<i class="far fa-clock"></i> ${readingTime} min read`;

    // Add it to article meta if exists, or create new meta section
    const articleMeta = document.querySelector('.article-meta');
    if (articleMeta) {
      articleMeta.appendChild(readingTimeElement);
    } else {
      const newMeta = document.createElement('div');
      newMeta.className = 'article-meta';
      newMeta.appendChild(readingTimeElement);

      const headerContent = document.querySelector('.header-content');
      if (headerContent) {
        headerContent.appendChild(newMeta);
      }
    }
  }
}

  // Course enrollment buttons (for demo purposes)
  const courseButtons = document.querySelectorAll('.course-btn');

  if (courseButtons.length > 0) {
    courseButtons.forEach(button => {
      button.addEventListener('click', function(e) {
        e.preventDefault();
        const courseCard = this.closest('.course-card');
        const courseTitle = courseCard.querySelector('h3').textContent;
        const courseType = this.getAttribute('data-course') || 'general-course';

        // Show enrollment animation
        const originalText = this.textContent;
        this.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Processing...';
        this.disabled = true;

        // Simulate enrollment process
        setTimeout(() => {
          // Success message
          this.innerHTML = '<i class="fas fa-check"></i> Enrolled!';

          // Create a success notification
          const notification = document.createElement('div');
          notification.className = 'enrollment-notification';
          notification.innerHTML = `<i class="fas fa-check-circle"></i> You've successfully enrolled in "${courseTitle}". Check your email for course access!`;

          document.body.appendChild(notification);

          // Show notification
          setTimeout(() => {
            notification.classList.add('show');

            // Hide after 5 seconds
            setTimeout(() => {
              notification.classList.remove('show');

              // Remove from DOM after animation
              setTimeout(() => {
                document.body.removeChild(notification);
              }, 500);
            }, 5000);
          }, 100);

          // Return button to original state
          setTimeout(() => {
            this.innerHTML = originalText;
            this.disabled = false;
          }, 3000);
        }, 1500);
      });
    });
  }

  // All article links are now implemented
  // Enable smooth transitions between articles
  document.querySelectorAll('a[href^="article"]').forEach(link => {
    if (link.getAttribute('href').endsWith('.html')) {
      link.addEventListener('click', function(e) {
        // No need to prevent default, all articles now exist
      });
    }
  });
});