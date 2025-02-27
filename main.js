import { gsap } from 'gsap';
import SplitType from 'split-type';

// Custom cursor
const cursor = document.querySelector('.cursor');

document.addEventListener('mousemove', (e) => {
  gsap.to(cursor, {
    x: e.clientX,
    y: e.clientY,
    duration: 0.1
  });
});

document.addEventListener('mousedown', () => {
  gsap.to(cursor, {
    scale: 0.8,
    duration: 0.2
  });
});

document.addEventListener('mouseup', () => {
  gsap.to(cursor, {
    scale: 1,
    duration: 0.2
  });
});

// Add hover effect to links and buttons
const hoverElements = document.querySelectorAll('a, button, .work-item');

hoverElements.forEach(element => {
  element.addEventListener('mouseenter', () => {
    gsap.to(cursor, {
      scale: 1.5,
      duration: 0.3
    });
  });
  
  element.addEventListener('mouseleave', () => {
    gsap.to(cursor, {
      scale: 1,
      duration: 0.3
    });
  });
});

// Page loader
window.addEventListener('load', () => {
  const loader = document.querySelector('.loader');
  
  gsap.to(loader, {
    opacity: 0,
    duration: 1,
    delay: 1,
    onComplete: () => {
      loader.style.display = 'none';
      animateHero();
    }
  });
});

// Hero animations
function animateHero() {
  // Split text for animation
  const heroTitle = new SplitType('.hero-title', { types: 'chars' });
  const heroSubtitle = new SplitType('.hero-subtitle', { types: 'words' });
  
  const tl = gsap.timeline();
  
  tl.from(heroTitle.chars, {
    opacity: 0,
    y: 50,
    rotateX: -90,
    stagger: 0.05,
    duration: 0.8,
    ease: 'back.out(1.7)'
  })
  .from(heroSubtitle.words, {
    opacity: 0,
    y: 20,
    stagger: 0.05,
    duration: 0.8,
    ease: 'power2.out'
  }, '-=0.4')
  .from('.hero-image-container', {
    opacity: 0,
    y: 100,
    duration: 1,
    stagger: 0.2,
    ease: 'power2.out'
  }, '-=0.6')
  .from('.scroll-indicator', {
    opacity: 0,
    y: -20,
    duration: 0.8,
    ease: 'power2.out'
  }, '-=0.4')
  .from('.animal', {
    opacity: 0,
    scale: 0,
    duration: 1,
    stagger: 0.3,
    ease: 'back.out(1.7)'
  }, '-=0.8');
}

// Scroll animations
function animateOnScroll() {
  // Section titles
  gsap.utils.toArray('.section-title').forEach(title => {
    gsap.from(title, {
      opacity: 0,
      y: 50,
      duration: 0.8,
      scrollTrigger: {
        trigger: title,
        start: 'top 80%',
        toggleActions: 'play none none none'
      }
    });
  });
  
  // About section
  gsap.from('.about-text p', {
    opacity: 0,
    y: 30,
    stagger: 0.2,
    duration: 0.8,
    scrollTrigger: {
      trigger: '.about-text',
      start: 'top 80%',
      toggleActions: 'play none none none'
    }
  });
  
  gsap.from('.about-image', {
    opacity: 0,
    x: 50,
    duration: 1,
    scrollTrigger: {
      trigger: '.about-image',
      start: 'top 80%',
      toggleActions: 'play none none none'
    }
  });
  
  // Work items
  gsap.utils.toArray('.work-item').forEach(item => {
    gsap.from(item, {
      opacity: 0,
      y: 50,
      duration: 0.8,
      scrollTrigger: {
        trigger: item,
        start: 'top 80%',
        toggleActions: 'play none none none'
      }
    });
  });
  
  // Contact section
  gsap.from('.contact-info', {
    opacity: 0,
    x: -50,
    duration: 0.8,
    scrollTrigger: {
      trigger: '.contact-info',
      start: 'top 80%',
      toggleActions: 'play none none none'
    }
  });
  
  gsap.from('.contact-form', {
    opacity: 0,
    x: 50,
    duration: 0.8,
    scrollTrigger: {
      trigger: '.contact-form',
      start: 'top 80%',
      toggleActions: 'play none none none'
    }
  });
}

// Animal animations
function animateAnimals() {
  const animals = document.querySelectorAll('.animal');
  
  animals.forEach(animal => {
    gsap.to(animal, {
      x: gsap.utils.random(-20, 20),
      y: gsap.utils.random(-20, 20),
      rotation: gsap.utils.random(-5, 5),
      duration: gsap.utils.random(3, 6),
      ease: 'sine.inOut',
      repeat: -1,
      yoyo: true
    });
  });
  
  // Make animals follow cursor slightly
  document.addEventListener('mousemove', (e) => {
    const mouseX = e.clientX / window.innerWidth;
    const mouseY = e.clientY / window.innerHeight;
    
    animals.forEach(animal => {
      gsap.to(animal, {
        x: (mouseX - 0.5) * 30,
        y: (mouseY - 0.5) * 30,
        duration: 1
      });
    });
  });
}

// Initialize animations
document.addEventListener('DOMContentLoaded', () => {
  // Initialize GSAP ScrollTrigger
  if (typeof gsap.registerPlugin === 'function') {
    gsap.registerPlugin(ScrollTrigger);
    animateOnScroll();
  }
  
  // Animate animals
  animateAnimals();
  
  // Form submission
  const contactForm = document.querySelector('.contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      alert('Form submission is just a demo in this clone. In a real application, this would send your message.');
      contactForm.reset();
    });
  }
});