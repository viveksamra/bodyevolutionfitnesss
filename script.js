// Native Scroll Animations (Works Scrolling Up AND Down)
const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        } else {
            entry.target.classList.remove('visible'); 
        }
    });
}, { 
    threshold: 0.15, 
    rootMargin: "0px 0px -50px 0px" 
});

document.querySelectorAll('.reveal').forEach((el) => {
    revealObserver.observe(el);
});

// Mobile Menu Toggle
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');
const links = document.querySelectorAll('.nav-links li a');

hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    const icon = hamburger.querySelector('i');
    if(navLinks.classList.contains('active')) {
        icon.classList.remove('fa-bars');
        icon.classList.add('fa-times');
    } else {
        icon.classList.remove('fa-times');
        icon.classList.add('fa-bars');
    }
});

links.forEach(link => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('active');
        const icon = hamburger.querySelector('i');
        icon.classList.remove('fa-times');
        icon.classList.add('fa-bars');
    });
});

// Counter Animation for Hero Stats
function animateCounter(el) {
    const target = parseInt(el.dataset.count, 10);
    const duration = 2000;
    const start = performance.now();
    
    function step(now) {
        const progress = Math.min((now - start) / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3);
        el.textContent = Math.floor(eased * target) + (el.dataset.suffix || '');
        if (progress < 1) requestAnimationFrame(step);
    }
    requestAnimationFrame(step);
}

const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            animateCounter(entry.target);
            counterObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

document.querySelectorAll('.stat-num').forEach(el => counterObserver.observe(el));

// Typed Effect in Hero
const typedEl = document.querySelector('.hero-typed');
if (typedEl) {
    const words = ['LIFE', 'MINDSET', 'POWER', 'FUTURE'];
    let wIdx = 0, cIdx = 0, deleting = false;
    
    function type() {
        const word = words[wIdx];
        typedEl.textContent = deleting ? word.substring(0, cIdx--) : word.substring(0, cIdx++);
        
        if (!deleting && cIdx > word.length) { 
            deleting = true; 
            setTimeout(type, 1500); 
            return; 
        }
        if (deleting && cIdx < 0) { 
            deleting = false; 
            wIdx = (wIdx + 1) % words.length; 
            cIdx = 0; 
        }
        setTimeout(type, deleting ? 50 : 120);
    }
    type();
}

// FAQ Accordion
document.querySelectorAll('.faq-question').forEach(btn => {
    btn.addEventListener('click', () => {
        const item = btn.closest('.faq-item');
        const isOpen = item.classList.contains('open');
        document.querySelectorAll('.faq-item').forEach(i => i.classList.remove('open'));
        if (!isOpen) item.classList.add('open');
    });
});

// Dynamic Pricing Toggle (General vs Women)
function switchPricing(planType) {
    const btnGeneral = document.getElementById('btn-general');
    const btnWomen = document.getElementById('btn-women');
    const gridGeneral = document.getElementById('pricing-general');
    const gridWomen = document.getElementById('pricing-women');

    if (planType === 'general') {
        btnGeneral.classList.add('active');
        btnWomen.classList.remove('active');
        gridGeneral.classList.remove('hidden-grid');
        gridGeneral.classList.add('active-grid');
        gridWomen.classList.remove('active-grid');
        gridWomen.classList.add('hidden-grid');
    } else if (planType === 'women') {
        btnWomen.classList.add('active');
        btnGeneral.classList.remove('active');
        gridWomen.classList.remove('hidden-grid');
        gridWomen.classList.add('active-grid');
        gridGeneral.classList.remove('active-grid');
        gridGeneral.classList.add('hidden-grid');
    }
}

// BMI Calculator Logic
function calculateBMI() {
    const weight = parseFloat(document.getElementById('weight').value);
    const heightCm = parseFloat(document.getElementById('height').value);
    const resultBox = document.getElementById('bmi-result');
    const valueDisplay = document.getElementById('bmi-value');
    const statusDisplay = document.getElementById('bmi-status');

    if (!weight || !heightCm || weight <= 0 || heightCm <= 0) {
        alert("Please enter valid positive numbers for weight and height.");
        return;
    }

    const heightM = heightCm / 100;
    const bmi = (weight / (heightM * heightM)).toFixed(1);
    
    valueDisplay.innerText = bmi;
    resultBox.classList.remove('hidden');

    if (bmi < 18.5) {
        statusDisplay.innerText = "Underweight";
        resultBox.style.borderLeftColor = "#3498db";
        valueDisplay.style.color = "#3498db";
    } else if (bmi >= 18.5 && bmi <= 24.9) {
        statusDisplay.innerText = "Normal Weight";
        resultBox.style.borderLeftColor = "#2ecc71";
        valueDisplay.style.color = "#2ecc71";
    } else if (bmi >= 25.0 && bmi <= 29.9) {
        statusDisplay.innerText = "Overweight";
        resultBox.style.borderLeftColor = "#f39c12";
        valueDisplay.style.color = "#f39c12";
    } else {
        statusDisplay.innerText = "Obese";
        resultBox.style.borderLeftColor = "#e74c3c";
        valueDisplay.style.color = "#e74c3c";
    }
}