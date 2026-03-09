class Header extends HTMLElement {
    constructor() {
        super();
    }

    connectedCallback() {
        this.innerHTML = `
            <nav class="navbar">
                <div class="container">
                    <div class="nav-content">
                        <a href="#home" class="logo">
                            <span class="logo-text">BF</span>
                            <span class="logo-name">Bryam Fernández</span>
                        </a>
                        
                        <ul class="nav-menu">
                            <li><a href="#home" class="nav-link active">Inicio</a></li>
                            <li><a href="#projects" class="nav-link">Proyectos</a></li>
                            <li><a href="#about" class="nav-link">Sobre mí</a></li>
                            <li><a href="#skills" class="nav-link">Habilidades</a></li>
                            <li><a href="#contact" class="nav-link">Contacto</a></li>
                        </ul>
                        
                        <div class="nav-actions">
                            <a href="../public/docs/Bryam_Fernandez_CV.pdf" 
                               class="btn btn-outline" 
                               download="Bryam_Fernandez_CV.pdf">
                                Descargar CV
                            </a>
                            <button class="theme-toggle" aria-label="Cambiar tema">
                                <span class="theme-icon">🌓</span>
                            </button>
                        </div>
                    </div>
                </div>
            </nav>
        `;
    }
}

customElements.define('main-header', Header);