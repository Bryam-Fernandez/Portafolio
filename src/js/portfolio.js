(() => {
  const $ = (sel, root = document) => root.querySelector(sel);
  const $$ = (sel, root = document) => [...root.querySelectorAll(sel)];

  const storageKey = "bf_portfolio_theme";
  const toastRootId = "toast-root";

  function ensureToastRoot() {
    let root = document.getElementById(toastRootId);
    if (!root) {
      root = document.createElement("div");
      root.id = toastRootId;
      root.className = "toast";
      document.body.appendChild(root);
    }
    return root;
  }

  function toast(message, icon = "fa-check") {
    const root = ensureToastRoot();
    const item = document.createElement("div");
    item.className = "toast-item";
    item.innerHTML = `<i class="fas ${icon}"></i><div>${message}</div>`;
    root.appendChild(item);
    setTimeout(() => {
      item.style.opacity = "0";
      item.style.transform = "translateY(6px)";
      item.style.transition = "180ms ease";
      setTimeout(() => item.remove(), 220);
    }, 2600);
  }

  function setTheme(next) {
    document.documentElement.setAttribute("data-theme", next);
    localStorage.setItem(storageKey, next);
    const icon = $("#themeToggle i");
    if (icon) icon.className = next === "light" ? "fas fa-moon" : "fas fa-sun";
  }

  function initTheme() {
    const saved = localStorage.getItem(storageKey);
    const prefersLight = window.matchMedia && window.matchMedia("(prefers-color-scheme: light)").matches;
    const initial = saved || (prefersLight ? "light" : "dark");
    setTheme(initial);
    const btn = $("#themeToggle");
    if (btn) {
      btn.addEventListener("click", () => {
        const current = document.documentElement.getAttribute("data-theme") || "dark";
        setTheme(current === "dark" ? "light" : "dark");
      });
    }
  }

  function initYear() {
    const el = $("#currentYear");
    if (el) el.textContent = String(new Date().getFullYear());
  }

  async function copyText(text) {
    try {
      await navigator.clipboard.writeText(text);
      toast("Copiado al portapapeles.");
    } catch {
      toast("No se pudo copiar.", "fa-triangle-exclamation");
    }
  }

  function initCopyButtons() {
    $$("[data-copy]").forEach((btn) => {
      btn.addEventListener("click", () => copyText(btn.getAttribute("data-copy") || ""));
    });
  }

  function initContactForm() {
    const form = $("#contactForm");
    if (!form) return;

    form.addEventListener("submit", async (e) => {
      e.preventDefault();
      const action = form.getAttribute("action");
      if (!action) return;

      const submitBtn = $("button[type='submit']", form);
      const original = submitBtn ? submitBtn.innerHTML : "";
      if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.innerHTML = `<i class="fas fa-spinner fa-spin"></i> Enviando...`;
      }

      try {
        const resp = await fetch(action, {
          method: "POST",
          body: new FormData(form),
          headers: { Accept: "application/json" },
        });

        if (resp.ok) {
          form.reset();
          toast("Mensaje enviado. Gracias por contactarme.");
        } else {
          toast("No se pudo enviar. Intenta nuevamente.", "fa-triangle-exclamation");
        }
      } catch {
        toast("Error de conexión. Verifica tu internet.", "fa-triangle-exclamation");
      } finally {
        if (submitBtn) {
          submitBtn.disabled = false;
          submitBtn.innerHTML = original;
        }
      }
    });
  }

  // ===== PROYECTOS (render dinámico + filtros + modal) =====
  const PROJECTS = [
    {
      id: "saludvit",
      title: "SaludVit",
      icon: "fa-hospital",
      summary: "Sistema web para la gestión diaria de una clínica: pacientes, médicos, citas y tratamientos.",
      year: "2025",
      duration: "2 meses",
      status: "En desarrollo",
      statusTone: "warning",
      categories: ["web"],
      stack: ["Java", "Spring Boot", "JPA/Hibernate", "MySQL", "JWT", "Docker"],
      demoUrl: "https://saludvital-uubz.onrender.com",
      codeUrl: "https://github.com/Bryam-Fernandez/SaludVital",
      highlights: [
        "Arquitectura en capas y endpoints REST.",
        "Autenticación con JWT y control de acceso.",
        "Modelo de datos relacional y operaciones CRUD.",
      ],
    },
    {
      id: "nutrimama",
      title: "Nutrimama",
      icon: "fa-baby",
      summary: "Aplicación para acompañar a gestantes con recordatorios, registro de controles y un asistente con IA.",
      year: "2025",
      duration: "2 meses",
      status: "Fuera de servicio",
      statusTone: "muted",
      categories: ["mobile", "ai", "web"],
      stack: ["Java", "Spring Boot", "MySQL", "HTML", "CSS", "JavaScript", "Ollama"],
      demoUrl: "progreso.html",
      codeUrl: "https://github.com/Bryam-Fernandez/Nutrimama",
      highlights: [
        "Flujos orientados a seguimiento y recordatorios.",
        "Integración de IA para consultas frecuentes.",
        "Persistencia y endpoints para consumo multiplataforma.",
      ],
    },
    {
      id: "weatherflow",
      title: "WeatherFlow",
      icon: "fa-cloud-sun-rain",
      summary: "App móvil para consultar clima de forma rápida, con pronóstico por día y alertas básicas.",
      year: "2026",
      duration: "1 mes",
      status: "Fuera de servicio",
      statusTone: "muted",
      categories: ["mobile"],
      stack: ["Swift", "SwiftUI", "REST API"],
      demoUrl: "progreso.html",
      codeUrl: "https://github.com/DiegoCastilla12/ProyectoFinalMoviles2",
      highlights: [
        "Consumo de API meteorológica y parsing.",
        "UI simple enfocada en lectura rápida.",
        "Manejo básico de estados y errores.",
      ],
    },
  ];

  function categoryLabel(cat) {
    switch (cat) {
      case "all":
        return "Todos";
      case "web":
        return "Web";
      case "mobile":
        return "Móvil";
      case "ai":
        return "IA";
      default:
        return cat;
    }
  }

  function projectCard(p) {
    const techTags = p.stack.slice(0, 4).map((t) => `<span class="tag">${t}</span>`).join("");
    const catTags = p.categories
      .slice(0, 3)
      .map((c) => `<span class="tag ${c === "web" ? "primary" : c === "ai" ? "accent" : ""}">${categoryLabel(c)}</span>`)
      .join("");

    const statusTag =
      p.statusTone === "warning"
        ? `<span class="tag accent"><i class="fas fa-spinner"></i> ${p.status}</span>`
        : p.statusTone === "muted"
          ? `<span class="tag"><i class="fas fa-cloud"></i> ${p.status}</span>`
          : `<span class="tag success"><i class="fas fa-check"></i> ${p.status}</span>`;

    return `
      <article class="project-card" data-id="${p.id}" data-categories="${p.categories.join(" ")}">
        <div class="project-top">
          <div class="project-title">
            <div>
              <div class="mini">${catTags}</div>
              <h3>${p.title}</h3>
            </div>
            <i class="fas ${p.icon} p-icon"></i>
          </div>
          <div class="project-meta">
            <span><i class="far fa-calendar"></i> ${p.year}</span>
            <span><i class="far fa-clock"></i> ${p.duration}</span>
            ${statusTag}
          </div>
        </div>
        <div class="project-body">
          <div class="project-desc">${p.summary}</div>
          <div class="tags">${techTags}</div>
          <div class="project-actions">
            <a class="primary" href="${p.demoUrl}" target="${p.demoUrl.startsWith("http") ? "_blank" : "_self"}" rel="noreferrer">
              <i class="fas fa-play"></i> Demo
            </a>
            <a href="${p.codeUrl}" target="_blank" rel="noreferrer">
              <i class="fab fa-github"></i> Código
            </a>
            <a href="#" data-open="${p.id}">
              <i class="fas fa-circle-info"></i> Detalles
            </a>
          </div>
        </div>
      </article>
    `;
  }

  function renderProjects(list) {
    const root = $("#projectsGrid");
    if (!root) return;
    root.innerHTML = list.map(projectCard).join("");
  }

  function openModal(project) {
    const modal = $("#projectModal");
    if (!modal) return;
    $("#modalTitle").textContent = project.title;
    $("#modalSummary").textContent = project.summary;
    $("#modalYear").textContent = project.year;
    $("#modalDuration").textContent = project.duration;
    $("#modalStatus").textContent = project.status;

    const list = $("#modalHighlights");
    list.innerHTML = project.highlights.map((h) => `<li>${h}</li>`).join("");

    const stack = $("#modalStack");
    stack.innerHTML = project.stack.map((t) => `<span class="tag">${t}</span>`).join("");

    const demo = $("#modalDemo");
    const code = $("#modalCode");
    demo.href = project.demoUrl;
    demo.target = project.demoUrl.startsWith("http") ? "_blank" : "_self";
    code.href = project.codeUrl;

    modal.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";
  }

  function closeModal() {
    const modal = $("#projectModal");
    if (!modal) return;
    modal.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";
  }

  function initModal() {
    const modal = $("#projectModal");
    if (!modal) return;

    $("#modalClose")?.addEventListener("click", (e) => {
      e.preventDefault();
      closeModal();
    });

    modal.addEventListener("click", (e) => {
      if (e.target === modal) closeModal();
    });

    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && modal.getAttribute("aria-hidden") === "false") closeModal();
    });
  }

  function initProjectsPage() {
    const root = $("#projectsGrid");
    if (!root) return;

    let activeCat = "all";
    let query = "";

    renderProjects(PROJECTS);

    function apply() {
      const filtered = PROJECTS.filter((p) => {
        const catOk = activeCat === "all" || p.categories.includes(activeCat);
        const q = query.trim().toLowerCase();
        const qOk =
          !q ||
          p.title.toLowerCase().includes(q) ||
          p.summary.toLowerCase().includes(q) ||
          p.stack.join(" ").toLowerCase().includes(q);
        return catOk && qOk;
      });
      renderProjects(filtered);
      $("#resultsCount").textContent = String(filtered.length);
    }

    // Category buttons
    $$("[data-cat]").forEach((btn) => {
      btn.addEventListener("click", () => {
        activeCat = btn.getAttribute("data-cat") || "all";
        $$("[data-cat]").forEach((b) => b.setAttribute("aria-pressed", "false"));
        btn.setAttribute("aria-pressed", "true");
        apply();
      });
    });

    // Search
    const input = $("#projectSearch");
    input?.addEventListener("input", () => {
      query = input.value || "";
      apply();
    });

    // Delegated modal open
    document.addEventListener("click", (e) => {
      const target = e.target instanceof Element ? e.target.closest("[data-open]") : null;
      if (!target) return;
      e.preventDefault();
      const id = target.getAttribute("data-open");
      const project = PROJECTS.find((p) => p.id === id);
      if (project) openModal(project);
    });

    apply();
  }

  function initActiveNav() {
    const path = (location.pathname || "").toLowerCase();
    const isProjects = path.endsWith("proyectos.html");
    const isIndex = path.endsWith("index.html") || path.endsWith("/") || path.endsWith("\\");
    const linkIndex = $("#navIndex");
    const linkProjects = $("#navProjects");
    if (isProjects) {
      linkProjects?.setAttribute("aria-current", "page");
      linkIndex?.removeAttribute("aria-current");
    } else if (isIndex) {
      linkIndex?.setAttribute("aria-current", "page");
      linkProjects?.removeAttribute("aria-current");
    }
  }

  document.addEventListener("DOMContentLoaded", () => {
    initTheme();
    initYear();
    initCopyButtons();
    initContactForm();
    initModal();
    initProjectsPage();
    initActiveNav();
  });
})();

