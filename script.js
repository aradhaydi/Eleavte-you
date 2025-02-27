
// Wait for DOM content to load
document.addEventListener('DOMContentLoaded', function() {
  // Fix any layout issues on initial load
  function fixLayoutIssues() {
    // Fix content overflow issues
    const contentElements = document.querySelectorAll('.article-content img, .article-content p, .article-content .highlight-box');
    contentElements.forEach(element => {
      if (element.offsetWidth > element.parentElement.offsetWidth) {
        element.style.width = '100%';
        element.style.maxWidth = '100%';
      }
    });
    
    // Fix category tags alignment
    const tags = document.querySelectorAll('.tag');
    tags.forEach(tag => {
      tag.style.display = 'inline-block';
      tag.style.textAlign = 'center';
    });
    
    // Center align header content
    const headerContents = document.querySelectorAll('.header-content');
    headerContents.forEach(content => {
      content.style.margin = '0 auto';
      content.style.maxWidth = '800px';
    });
  }
  
  // Run fix immediately and after slight delay to ensure images are loaded
  fixLayoutIssues();
  setTimeout(fixLayoutIssues, 500);
  
  // Add floating elements to enhance visual appeal
  const hero = document.querySelector('.hero');
  if (hero) {
    for (let i = 0; i < 5; i++) {
      const floatingElement = document.createElement('div');
      floatingElement.classList.add('floating-element');
      floatingElement.style.left = `${Math.random() * 90}%`;
      floatingElement.style.top = `${Math.random() * 90}%`;
      floatingElement.style.animationDelay = `${Math.random() * 5}s`;
      floatingElement.style.width = `${30 + Math.random() * 60}px`;
      floatingElement.style.height = floatingElement.style.width;
      floatingElement.style.opacity = `${0.1 + Math.random() * 0.2}`;
      floatingElement.style.background = 'white';
      floatingElement.style.borderRadius = '50%';
      floatingElement.style.animation = 'float 6s ease-in-out infinite';
      floatingElement.style.animationDelay = `${Math.random() * 5}s`;
      hero.appendChild(floatingElement);
    }
  }
  
  // Add floating background to the entire site for enhanced visuals
  const addFloatingBg = () => {
    const sections = document.querySelectorAll('section:not(.hero)');
    sections.forEach(section => {
      // Add only 2 elements per section to avoid cluttering
      for (let i = 0; i < 2; i++) {
        const floatingElement = document.createElement('div');
        floatingElement.classList.add('floating-element');
        floatingElement.style.left = `${Math.random() * 90}%`;
        floatingElement.style.top = `${Math.random() * 90}%`;
        floatingElement.style.animationDelay = `${Math.random() * 5}s`;
        floatingElement.style.width = `${40 + Math.random() * 80}px`;
        floatingElement.style.height = floatingElement.style.width;
        floatingElement.style.opacity = `${0.03 + Math.random() * 0.05}`;
        floatingElement.style.background = 'linear-gradient(135deg, var(--primary-color), var(--accent-color))';
        floatingElement.style.borderRadius = '50%';
        floatingElement.style.filter = 'blur(20px)';
        section.appendChild(floatingElement);
      }
    });
  };
  
  // Execute floating background creation
  addFloatingBg();
  
  // Add logo animation
  const logo = document.querySelector('.logo h1');
  if (logo) {
    logo.addEventListener('mouseover', function() {
      this.style.letterSpacing = '2px';
    });
    
    logo.addEventListener('mouseout', function() {
      this.style.letterSpacing = '0';
    });
  }
  
  // Mobile Menu Toggle with enhanced animation
  const menuToggle = document.querySelector('.menu-toggle');
  const menu = document.querySelector('.menu');
  
  if (menuToggle) {
    menuToggle.addEventListener('click', function() {
      menu.classList.toggle('active');
      const icon = menuToggle.querySelector('i');
      if (icon.classList.contains('fa-bars')) {
        icon.classList.remove('fa-bars');
        icon.classList.add('fa-times');
        icon.style.transform = 'rotate(90deg)';
      } else {
        icon.classList.remove('fa-times');
        icon.classList.add('fa-bars');
        icon.style.transform = 'rotate(0deg)';
      }
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
  
  // Fix potential layout issues on resize
  window.addEventListener('resize', function() {
    // Force recalculation of grid layouts
    const grids = document.querySelectorAll('.featured-grid, .articles-grid, .courses-grid, .exercises-grid, .related-grid');
    grids.forEach(grid => {
      // This forces a reflow
      grid.style.display = 'none';
      setTimeout(() => {
        grid.style.display = '';
      }, 10);
    });
    
    // Adjust article header height on mobile
    const articleHeader = document.querySelector('.article-header');
    if (articleHeader && window.innerWidth <= 768) {
      articleHeader.style.height = 'auto';
      articleHeader.style.minHeight = '40vh';
      articleHeader.style.padding = '4rem 1rem 2rem';
    }
    
    // Fix content overflow issues
    const contentElements = document.querySelectorAll('.article-content img, .article-content p, .article-content .highlight-box');
    contentElements.forEach(element => {
      if (element.offsetWidth > element.parentElement.offsetWidth) {
        element.style.width = '100%';
        element.style.maxWidth = '100%';
      }
    });
    
    // Fix category tags alignment
    const tags = document.querySelectorAll('.tag');
    tags.forEach(tag => {
      tag.style.display = 'inline-block';
      tag.style.textAlign = 'center';
    });
    
    // Center align header content
    const headerContents = document.querySelectorAll('.header-content');
    headerContents.forEach(content => {
      content.style.margin = '0 auto';
      content.style.maxWidth = '800px';
    });
  });
  
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
  
  // Download buttons (for demo purposes)
  const downloadButtons = document.querySelectorAll('.download-btn');
  
  if (downloadButtons.length > 0) {
    downloadButtons.forEach(button => {
      button.addEventListener('click', function(e) {
        e.preventDefault();
        const exerciseTitle = this.closest('.exercise-card').querySelector('h3').textContent;
        alert(`The ${exerciseTitle} will download shortly!`);
      });
    });
  }
  
  // Course enrollment buttons (for demo purposes)
  const courseButtons = document.querySelectorAll('.course-btn');
  
  if (courseButtons.length > 0) {
    courseButtons.forEach(button => {
      button.addEventListener('click', function(e) {
        e.preventDefault();
        const courseTitle = this.closest('.course-card').querySelector('h3').textContent;
        const coursePrice = this.closest('.course-card').querySelector('.price').textContent;
        alert(`You're about to enroll in "${courseTitle}" for ${coursePrice}. In a real application, this would take you to a checkout page.`);
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
