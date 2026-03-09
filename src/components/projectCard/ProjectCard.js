class ProjectCard extends HTMLElement {
    constructor() {
        super();
    }

    connectedCallback() {
        const title = this.getAttribute('title') || 'Proyecto';
        const description = this.getAttribute('description') || 'Descripción del proyecto';
        const technologies = this.getAttribute('technologies') || '';
        const github = this.getAttribute('github') || '#';
        const demo = this.getAttribute('demo') || '#';
        const image = this.getAttribute('image') || '';

        const techArray = technologies.split(',').map(tech => tech.trim());

        this.innerHTML = `
            <div class="project-card">
                ${image ? `<div class="project-image" style="background-image: url('${image}')"></div>` : ''}
                
                <div class="project-content">
                    <h3 class="project-title">${title}</h3>
                    <p class="project-description">${description}</p>
                    
                    <div class="project-tech">
                        ${techArray.map(tech => 
                            `<span class="tech-tag">${tech}</span>`
                        ).join('')}
                    </div>
                    
                    <div class="project-links">
                        <a href="${github}" target="_blank" class="btn btn-outline">
                            <i class="fab fa-github"></i> Código
                        </a>
                        <a href="${demo}" target="_blank" class="btn btn-primary">
                            <i class="fas fa-external-link-alt"></i> Demo
                        </a>
                    </div>
                </div>
            </div>
        `;
    }
}

customElements.define('project-card', ProjectCard);