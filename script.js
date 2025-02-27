
// Wait for DOM content to load
document.addEventListener('DOMContentLoaded', function() {
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
  
  // For pages where article links don't exist yet
  document.querySelectorAll('a[href^="article"]').forEach(link => {
    if (link.getAttribute('href').endsWith('.html')) {
      link.addEventListener('click', function(e) {
        const articleNum = link.getAttribute('href').replace('article', '').replace('.html', '');
        if (articleNum > 2) {
          e.preventDefault();
          alert('This article is coming soon! Currently only article1.html and article2.html are fully implemented.');
        }
      });
    }
  });
});
