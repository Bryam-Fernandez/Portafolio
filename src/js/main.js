// src/js/main.js - VERSIÓN CORREGIDA Y OPTIMIZADA
console.log('✅ Portafolio Bryam Fernández - JS cargado correctamente');

// ========== CONFIGURACIÓN ==========
const CONFIG = {
    darkMode: false,
    visitCountKey: 'portfolioVisits',
    projects: [
        {
            id: 1,
            title: "Portafolio Personal",
            description: "Mi propio portafolio desarrollado con HTML, CSS y JavaScript vanilla.",
            technologies: ["HTML5", "CSS3", "JavaScript", "Responsive Design"],
            github: "https://github.com/tuusuario/portafolio",
            demo: "#",
            icon: "user"
        },
        {
            id: 2,
            title: "E-commerce Básico",
            description: "Tienda online con carrito de compras y gestión de productos.",
            technologies: ["JavaScript", "LocalStorage", "CSS Grid", "Bootstrap"],
            github: "https://github.com/tuusuario/ecommerce",
            demo: "#",
            icon: "shopping-cart"
        },
        {
            id: 3,
            title: "Dashboard de Tareas",
            description: "Aplicación para gestión de tareas diarias con recordatorios.",
            technologies: ["JavaScript", "Date API", "CSS Animations", "PWA"],
            github: "https://github.com/tuusuario/task-dashboard",
            demo: "#",
            icon: "tasks"
        }
    ],
    skills: [
        { name: 'HTML5', level: 95, color: '#e34c26' },
        { name: 'CSS3', level: 90, color: '#264de4' },
        { name: 'JavaScript', level: 85, color: '#f0db4f' },
        { name: 'React', level: 80, color: '#61dafb' },
        { name: 'Node.js', level: 75, color: '#68a063' },
        { name: 'Git', level: 90, color: '#f1502f' }
    ]
};

// ========== FUNCIONES PRINCIPALES ==========

// 1. Cargar proyectos
function loadProjects() {
    const projectsContainer = document.getElementById('projects-container');
    if (!projectsContainer) {
        console.log('❌ No se encontró el contenedor de proyectos');
        return;
    }
    
    // Si ya hay proyectos en el HTML, no los sobrescribas
    if (projectsContainer.children.length > 3) {
        console.log('✅ Proyectos ya cargados desde HTML');
        return;
    }
    
    projectsContainer.innerHTML = CONFIG.projects.map(project => `
        <div class="project-card">
            <div class="project-header">
                <div class="project-icon">
                    <i class="fas fa-${project.icon}"></i>
                </div>
                <h3 class="project-title">${project.title}</h3>
            </div>
            <p class="project-description">${project.description}</p>
            <div class="project-tech">
                ${project.technologies.map(tech => 
                    `<span class="tech-tag">${tech}</span>`
                ).join('')}
            </div>
            <div class="project-links">
                <a href="${project.github}" target="_blank" class="btn btn-outline btn-small">
                    <i class="fab fa-github"></i> Código
                </a>
                <a href="${project.demo}" class="btn btn-primary btn-small">
                    <i class="fas fa-external-link-alt"></i> Demo
                </a>
            </div>
        </div>
    `).join('');
    
    console.log(`✅ ${CONFIG.projects.length} proyectos cargados`);
    
    // Agregar efectos hover a los nuevos proyectos
    initProjectCardsHover();
}

// 2. Cargar habilidades
function loadSkills() {
    const skillsContainer = document.getElementById('skills-container');
    if (!skillsContainer) {
        console.log('❌ No se encontró el contenedor de habilidades');
        return;
    }
    
    // Si ya hay habilidades en el HTML, no hacer nada
    if (skillsContainer.children.length > 0) {
        console.log('✅ Habilidades ya cargadas desde HTML');
        return;
    }
    
    skillsContainer.innerHTML = CONFIG.skills.map(skill => `
        <div class="skill-item">
            <div class="skill-header">
                <span class="skill-name">${skill.name}</span>
                <span class="skill-percent">${skill.level}%</span>
            </div>
            <div class="skill-bar">
                <div class="skill-level" style="width: ${skill.level}%; background: ${skill.color};"></div>
            </div>
        </div>
    `).join('');
    
    console.log(`✅ ${CONFIG.skills.length} habilidades cargadas`);
}

// 3. Navegación suave
function initSmoothScroll() {
    const navLinks = document.querySelectorAll('a[href^="#"]');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href === '#' || href === '#!') return;
            
            e.preventDefault();
            const targetElement = document.querySelector(href);
            
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
                
                // Actualizar clase activa en navegación
                document.querySelectorAll('.nav-link').forEach(nav => {
                    nav.classList.remove('active');
                });
                this.classList.add('active');
            }
        });
    });
    
    console.log('✅ Navegación suave activada');
}

// 4. Modo oscuro/claro
function initThemeToggle() {
    // Buscar botón existente
    const themeToggle = document.getElementById('themeToggle') || 
                        document.querySelector('.theme-toggle') ||
                        document.querySelector('[data-theme-toggle]');
    
    // Si no existe, crear uno
    if (!themeToggle) {
        createThemeToggle();
        return;
    }
    
    themeToggle.addEventListener('click', function() {
        CONFIG.darkMode = !CONFIG.darkMode;
        document.body.classList.toggle('dark-mode', CONFIG.darkMode);
        
        if (CONFIG.darkMode) {
            this.innerHTML = '<i class="fas fa-sun"></i>';
            this.title = 'Modo claro';
            localStorage.setItem('theme', 'dark');
        } else {
            this.innerHTML = '<i class="fas fa-moon"></i>';
            this.title = 'Modo oscuro';
            localStorage.setItem('theme', 'light');
        }
        
        console.log(`🎨 Modo ${CONFIG.darkMode ? 'oscuro' : 'claro'} activado`);
    });
    
    // Cargar tema guardado
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
        CONFIG.darkMode = true;
        document.body.classList.add('dark-mode');
        themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
    }
    
    console.log('✅ Toggle de tema listo');
}

// 5. Crear botón de tema si no existe
function createThemeToggle() {
    const themeButton = document.createElement('button');
    themeButton.className = 'theme-toggle';
    themeButton.innerHTML = '🌓';
    themeButton.title = 'Cambiar tema';
    themeButton.style.cssText = `
        position: fixed;
        bottom: 20px;
        right: 20px;
        z-index: 1000;
        background: var(--primary-color);
        color: white;
        border: none;
        border-radius: 50%;
        width: 50px;
        height: 50px;
        cursor: pointer;
        font-size: 1.5rem;
        box-shadow: 0 4px 12px rgba(0,0,0,0.15);
        display: flex;
        align-items: center;
        justify-content: center;
    `;
    
    themeButton.addEventListener('click', function() {
        CONFIG.darkMode = !CONFIG.darkMode;
        document.body.classList.toggle('dark-mode', CONFIG.darkMode);
        
        if (CONFIG.darkMode) {
            this.innerHTML = '☀️';
            this.style.backgroundColor = '#333';
            localStorage.setItem('theme', 'dark');
        } else {
            this.innerHTML = '🌓';
            this.style.backgroundColor = '';
            localStorage.setItem('theme', 'light');
        }
    });
    
    document.body.appendChild(themeButton);
    console.log('✅ Botón de tema creado');
}

// 6. Efectos hover en proyectos
function initProjectCardsHover() {
    const projectCards = document.querySelectorAll('.project-card');
    projectCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-8px)';
            this.style.boxShadow = '0 20px 40px rgba(0,0,0,0.1)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
            this.style.boxShadow = '';
        });
    });
}

// 7. Contador de visitas
function updateVisitCount() {
    let visitCount = localStorage.getItem(CONFIG.visitCountKey) || 0;
    visitCount = parseInt(visitCount) + 1;
    localStorage.setItem(CONFIG.visitCountKey, visitCount);
    
    const visitElement = document.getElementById('visit-counter');
    if (visitElement) {
        visitElement.textContent = visitCount;
    }
    
    console.log(`👋 ¡Bienvenido! Visita #${visitCount}`);
}

// 8. Efecto typewriter en el título
function initTypewriter() {
    const heroTitle = document.querySelector('.hero-title');
    if (!heroTitle) return;
    
    const originalText = heroTitle.textContent;
    heroTitle.textContent = '';
    
    let i = 0;
    const typeWriter = () => {
        if (i < originalText.length) {
            heroTitle.textContent += originalText.charAt(i);
            i++;
            setTimeout(typeWriter, 50);
        }
    };
    
    // Iniciar después de 1 segundo
    setTimeout(typeWriter, 1000);
}

// 9. Actualizar año en el footer
function updateCurrentYear() {
    const currentYear = new Date().getFullYear();
    const yearElements = document.querySelectorAll('[data-year], #current-year');
    
    yearElements.forEach(element => {
        element.textContent = currentYear;
    });
}

// 10. Menú móvil
function initMobileMenu() {
    const menuToggle = document.querySelector('.menu-toggle');
    const navMenu = document.querySelector('.nav-menu');
    
    if (!menuToggle || !navMenu) return;
    
    menuToggle.addEventListener('click', function() {
        navMenu.classList.toggle('active');
        this.classList.toggle('active');
        
        // Cambiar ícono
        const icon = this.querySelector('i');
        if (icon) {
            if (navMenu.classList.contains('active')) {
                icon.className = 'fas fa-times';
            } else {
                icon.className = 'fas fa-bars';
            }
        }
    });
    
    // Cerrar menú al hacer clic en un enlace
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
            menuToggle.classList.remove('active');
            const icon = menuToggle.querySelector('i');
            if (icon) icon.className = 'fas fa-bars';
        });
    });
}

// 11. Formulario de contacto
function initContactForm() {
    const contactForm = document.getElementById('contactForm');
    if (!contactForm) return;
    
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Simular envío
        const submitBtn = this.querySelector('button[type="submit"]');
        const originalText = submitBtn.innerHTML;
        
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Enviando...';
        submitBtn.disabled = true;
        
        setTimeout(() => {
            alert('¡Gracias por tu mensaje! Te responderé pronto.');
            this.reset();
            submitBtn.innerHTML = originalText;
            submitBtn.disabled = false;
        }, 1500);
    });
}

// ========== INICIALIZACIÓN PRINCIPAL ==========

// Solo UN event listener DOMContentLoaded
document.addEventListener('DOMContentLoaded', function() {
    console.log('🚀 DOM completamente cargado');
    
    // Cargar datos
    loadProjects();
    loadSkills();
    
    // Inicializar funcionalidades
    initSmoothScroll();
    initThemeToggle();
    initMobileMenu();
    initContactForm();
    
    // Efectos adicionales
    updateVisitCount();
    updateCurrentYear();
    initTypewriter();
    
    console.log('🎉 Portafolio completamente inicializado');
});

// ========== FUNCIONES GLOBALES (para botones en HTML) ==========

// Para descargar CV
window.downloadCV = function() {
    console.log('📄 Descargando CV...');
    
    // Crear enlace temporal para descarga
    const link = document.createElement('a');
    link.href = '../public/docs/Bryan_LFernandez_CV.pdf';
    link.download = 'Bryam_Fernandez_CV.pdf';
    
    // Simular clic
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    // Feedback al usuario
    const btn = event?.target || document.querySelector('[onclick*="downloadCV"]');
    if (btn) {
        const originalText = btn.innerHTML;
        btn.innerHTML = '<i class="fas fa-check"></i> Descargado';
        btn.disabled = true;
        
        setTimeout(() => {
            btn.innerHTML = originalText;
            btn.disabled = false;
        }, 2000);
    }
};

// Para copiar email
window.copyEmail = function() {
    const email = 'bryam@ejemplo.com';
    
    navigator.clipboard.writeText(email).then(() => {
        // Mostrar notificación
        const notification = document.createElement('div');
        notification.textContent = `✓ Email copiado: ${email}`;
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: #10b981;
            color: white;
            padding: 12px 20px;
            border-radius: 8px;
            z-index: 9999;
            box-shadow: 0 4px 12px rgba(0,0,0,0.15);
        `;
        
        document.body.appendChild(notification);
        
        setTimeout(() => {
            notification.style.opacity = '0';
            notification.style.transform = 'translateY(-20px)';
            setTimeout(() => document.body.removeChild(notification), 300);
        }, 3000);
        
    }).catch(() => {
        // Fallback para navegadores antiguos
        prompt('Copiar email:', email);
    });
};

// Para abrir enlaces externos con confirmación
document.addEventListener('click', function(e) {
    if (e.target.tagName === 'A' && e.target.href && 
        (e.target.href.includes('github.com') || e.target.href.includes('linkedin.com'))) {
        
        if (!confirm('¿Abrir enlace externo?')) {
            e.preventDefault();
        }
    }
});