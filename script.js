
  // Mouse tracking for 3D card effects
  const cards = document.querySelectorAll('.identity-card, .project-card, .skill-group, .cert-card');
  
  cards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      const rotateX = ((y - centerY) / centerY) * 8;
      const rotateY = ((centerX - x) / centerX) * 8;
      
      // Set CSS variables for gradient position
      card.style.setProperty('--mx', `${(x / rect.width) * 100}%`);
      card.style.setProperty('--my', `${(y / rect.height) * 100}%`);
      
      // Apply smooth 3D transform with depth
      card.style.transform = `perspective(1200px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(20px) scale(1.02)`;
    });
    
    card.addEventListener('mouseenter', () => {
      card.style.transition = 'none';
    });
    
    card.addEventListener('mouseleave', () => {
      card.style.transition = 'all 0.5s cubic-bezier(0.34, 1.56, 0.64, 1)';
      card.style.transform = 'perspective(1200px) rotateX(0deg) rotateY(0deg) translateZ(0px) scale(1)';
      card.style.setProperty('--mx', '50%');
      card.style.setProperty('--my', '50%');
    });
  });

  // Enhanced parallax effect for hero glows
  window.addEventListener('mousemove', (e) => {
    const glowQA = document.querySelector('.hero-glow-qa');
    const glowDA = document.querySelector('.hero-glow-da');
    const heroContent = document.querySelector('.hero-content');
    
    if (glowQA && glowDA) {
      const x = (e.clientX / window.innerWidth - 0.5) * 2;
      const y = (e.clientY / window.innerHeight - 0.5) * 2;
      
      glowQA.style.transform = `translate(calc(-100px + ${x * 30}px), calc(-100px + ${y * 30}px)) scale(${1 + Math.abs(x) * 0.1})`;
      glowDA.style.transform = `translate(calc(-50px - ${x * 25}px), calc(50px - ${y * 25}px)) scale(${1 + Math.abs(y) * 0.1})`;
    }
    
    if (heroContent) {
      const x = (e.clientX / window.innerWidth - 0.5) * 0.5;
      const y = (e.clientY / window.innerHeight - 0.5) * 0.5;
      heroContent.style.transform = `perspective(1200px) rotateX(${y * 5}deg) rotateY(${x * 5}deg)`;
    }
  });

  // Scroll animations
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
      }
    });
  }, observerOptions);

  document.querySelectorAll('section').forEach(section => {
    section.style.opacity = '0';
    section.style.transform = 'translateY(20px)';
    section.style.transition = 'all 0.8s ease-out';
    observer.observe(section);
  });

  // Smooth navigation scroll with active state
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

  // Button ripple effect enhancement
  document.querySelectorAll('.btn').forEach(btn => {
    btn.addEventListener('click', function(e) {
      const ripple = document.createElement('span');
      const rect = this.getBoundingClientRect();
      const size = Math.max(rect.width, rect.height);
      const x = e.clientX - rect.left - size / 2;
      const y = e.clientY - rect.top - size / 2;
      
      ripple.style.width = ripple.style.height = size + 'px';
      ripple.style.left = x + 'px';
      ripple.style.top = y + 'px';
      this.appendChild(ripple);
      
      setTimeout(() => ripple.remove(), 600);
    });
  });
