window.AppState = {
    currentLevel: StorageHelper.load('currentLevel', 'primaria1'),
    settings: {
        soundEnabled: true,
        animationsEnabled: true
    },
    progress: {}
};

// Sistema de Iconos SVG Integrados (Sin emojis)
window.AppIcons = {
    gear: `<svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 1 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 1 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 1 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 1 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1Z"/></svg>`,
    fullscreen: `<svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M8 3H5a2 2 0 0 0-2 2v3m18 0V5a2 2 0 0 0-2-2h-3m0 18h3a2 2 0 0 0 2-2v-3M3 16v3a2 2 0 0 0 2 2h3"/></svg>`,
    exitFullscreen: `<svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 14h6m0 0v6m0-6L3 21m17-11h-6m0 0V4m0 6 7-7M14 10l7-7"/></svg>`,
    fullscreenMini: `<svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" style="display:inline-block;vertical-align:middle;margin-right:4px;"><path d="M8 3H5a2 2 0 0 0-2 2v3m18 0V5a2 2 0 0 0-2-2h-3m0 18h3a2 2 0 0 0 2-2v-3M3 16v3a2 2 0 0 0 2 2h3"/></svg>`,
    exitFullscreenMini: `<svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" style="display:inline-block;vertical-align:middle;margin-right:4px;"><path d="M4 14h6m0 0v6m0-6L3 21m17-11h-6m0 0V4m0 6 7-7M14 10l7-7"/></svg>`,
    backArrow: `<svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" style="display:inline-block;vertical-align:middle;margin-right:4px;"><path d="M19 12H5m7 7-7-7 7-7"/></svg>`,
    chuchelete(w = 28, h = 20) {
        return `<svg viewBox="0 0 36 24" width="${w}" height="${h}" style="display: inline-block; vertical-align: middle; filter: drop-shadow(0 1px 2px rgba(0,0,0,0.15)); flex-shrink: 0;" fill="none">
            <rect x="1" y="1" width="34" height="22" rx="3" fill="#10b981" stroke="#047857" stroke-width="1.5" />
            <rect x="3.5" y="3.5" width="29" height="17" rx="2" fill="none" stroke="#a7f3d0" stroke-width="1" stroke-dasharray="2 1.5" />
            <circle cx="5" cy="5" r="1" fill="#ecfdf5" />
            <circle cx="31" cy="5" r="1" fill="#ecfdf5" />
            <circle cx="5" cy="19" r="1" fill="#ecfdf5" />
            <circle cx="31" cy="19" r="1" fill="#ecfdf5" />
            <circle cx="18" cy="12" r="6.5" fill="#ecfdf5" stroke="#34d399" stroke-width="1" />
            <polygon points="12,12 10,9 10,15" fill="#f43f5e" />
            <polygon points="24,12 26,9 26,15" fill="#f43f5e" />
            <circle cx="18" cy="12" r="3.8" fill="#fb7185" />
            <path d="M 16.5 10.5 Q 18 12 19.5 13.5" stroke="#ffffff" stroke-width="1" stroke-linecap="round" fill="none" />
        </svg>`;
    },
    castillo: `<svg viewBox="0 0 24 24" width="34" height="34" fill="none" stroke="#1e3a8a" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <path d="M2 20h20"/>
        <path d="M4 20V4h4v3.5h2V4h4v3.5h2V4h4v16"/>
        <path d="M9.5 20v-5a2.5 2.5 0 0 1 5 0v5"/>
        <line x1="7" y1="11" x2="7" y2="14"/>
        <line x1="17" y1="11" x2="17" y2="14"/>
    </svg>`,
    bosque: `<svg viewBox="0 0 24 24" width="34" height="34" fill="none" stroke="#047857" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <path d="M5 21h14"/>
        <path d="M12 21v-6"/>
        <path d="M12 15l-3-3"/>
        <path d="M12 15l3-3"/>
        <path d="M7 16a4.5 4.5 0 0 1-3.5-4.4 4.5 4.5 0 0 1 4-4.4A5.5 5.5 0 0 1 12 2a5.5 5.5 0 0 1 4.5 5.2 4.5 4.5 0 0 1 4 4.4 4.5 4.5 0 0 1-3.5 4.4q-5 -1.5 -10 0z"/>
    </svg>`,
    laboratorio: `<svg viewBox="0 0 24 24" width="34" height="34" fill="none" stroke="#0891b2" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M10 2v7.31M14 2v7.31M8.5 2h7M14 9.3l4.5 9A2 2 0 0 1 16.7 21H7.3a2 2 0 0 1-1.8-2.7l4.5-9"/><path d="M7 16h10"/></svg>`,
    biblioteca: `<svg viewBox="0 0 24 24" width="34" height="34" fill="none" stroke="#92400e" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/><line x1="8" y1="7" x2="16" y2="7"/><line x1="8" y1="11" x2="14" y2="11"/></svg>`,
    taller: `<svg viewBox="0 0 24 24" width="34" height="34" fill="none" stroke="#c0262d" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="13.5" cy="6.5" r=".5" fill="currentColor"/><circle cx="17.5" cy="10.5" r=".5" fill="currentColor"/><circle cx="8.5" cy="7.5" r=".5" fill="currentColor"/><circle cx="6.5" cy="12.5" r=".5" fill="currentColor"/><path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10c.926 0 1.648-.746 1.648-1.688 0-.437-.18-.835-.437-1.125-.29-.289-.438-.652-.438-1.125a1.64 1.64 0 0 1 1.668-1.668h1.996c3.051 0 5.555-2.503 5.555-5.554C21.965 6.012 17.461 2 12 2z"/></svg>`,
    course1_lapiz: `<svg viewBox="0 0 24 24" width="34" height="34" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z"/><path d="m15 5 4 4"/></svg>`,
    course2_libro: `<svg viewBox="0 0 24 24" width="34" height="34" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/></svg>`,
    course3_lupa: `<svg viewBox="0 0 24 24" width="34" height="34" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="7"/><line x1="21" y1="21" x2="16" y2="16"/><path d="M8.5 11a2.5 2.5 0 0 1 2.5-2.5"/></svg>`,
    course4_brujula: `<svg viewBox="0 0 24 24" width="34" height="34" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76"/></svg>`,
    course4_globo: `<svg viewBox="0 0 24 24" width="34" height="34" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76"/></svg>`,
    course5_bombilla: `<svg viewBox="0 0 24 24" width="34" height="34" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 18h6"/><path d="M10 22h4"/><path d="M12 2a7 7 0 0 0-7 7c0 2.5 1.3 4.7 3.3 6 .4.3.7.8.7 1.3V17h6v-.7c0-.5.3-1 .7-1.3A7 7 0 0 0 19 9a7 7 0 0 0-7-7z"/><path d="M12 6v3"/></svg>`,
    course6_birrete: `<svg viewBox="0 0 24 24" width="34" height="34" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 10v6"/><path d="M2 10l10-5 10 5-10 5z"/><path d="M6 12v5c3 3 9 3 12 0v-5"/></svg>`,
    coursesGraduation: `<svg viewBox="0 0 24 24" width="28" height="28" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 10v6M2 10l10-5 10 5-10 5z"/><path d="M6 12v5c3 3 9 3 12 0v-5"/></svg>`,
    screenProjector: `<svg viewBox="0 0 24 24" width="28" height="28" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="3" width="20" height="14" rx="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/></svg>`
};

// Control inteligente de Pantalla Completa (Entrar / Salir al pulsar)
window.isFullscreenActive = function() {
    return !!(
        document.fullscreenElement ||
        document.webkitFullscreenElement ||
        document.mozFullScreenElement ||
        document.msFullscreenElement
    );
};

window.toggleFullscreen = function() {
    if (!window.isFullscreenActive()) {
        const docEl = document.documentElement;
        const request = docEl.requestFullscreen ||
                        docEl.webkitRequestFullscreen ||
                        docEl.mozRequestFullScreen ||
                        docEl.msRequestFullscreen;
        if (request) {
            try {
                const promise = request.call(docEl);
                if (promise && promise.catch) {
                    promise.catch(e => console.log('Aviso pantalla completa:', e));
                }
            } catch (err) {
                console.log('Aviso pantalla completa:', err);
            }
        }
    } else {
        const exit = document.exitFullscreen ||
                     document.webkitExitFullscreen ||
                     document.mozCancelFullScreen ||
                     document.msExitFullscreen;
        if (exit) {
            try {
                const promise = exit.call(document);
                if (promise && promise.catch) {
                    promise.catch(e => console.log('Aviso salir pantalla completa:', e));
                }
            } catch (err) {
                console.log('Aviso salir pantalla completa:', err);
            }
        }
    }
};

window.updateFullscreenButtons = function() {
    const isFS = window.isFullscreenActive();
    document.querySelectorAll('.btn-toggle-fullscreen').forEach(btn => {
        if (btn.classList.contains('top-bar-icon-btn')) {
            btn.innerHTML = isFS ? AppIcons.exitFullscreen : AppIcons.fullscreen;
            btn.title = isFS ? 'Salir de pantalla completa' : 'Pantalla completa';
            btn.setAttribute('aria-label', isFS ? 'Salir de pantalla completa' : 'Pantalla completa');
        } else {
            btn.innerHTML = isFS
                ? `${AppIcons.exitFullscreenMini} Salir de Pantalla Completa`
                : `${AppIcons.fullscreenMini} Pantalla Completa`;
            btn.title = isFS ? 'Salir de pantalla completa' : 'Activar pantalla completa';
        }
    });
};

['fullscreenchange', 'webkitfullscreenchange', 'mozfullscreenchange', 'MSFullscreenChange'].forEach(evt => {
    document.addEventListener(evt, window.updateFullscreenButtons);
});

function initApp() {
    AppState.settings = StorageHelper.load('settings', AppState.settings);
    Router.init('app-container');

    // Pantalla de Inicio Oficial CEIP Don Quijote
    Router.addRoute('/', () => `
        <div class="view home-fullscreen-view" id="view-home">
            
            <!-- Barra Superior Full-Width -->
            <header class="home-top-bar">
                <div class="home-top-brand">
                    <img src="assets/logo_don_quijote.png" alt="Escudo CEIP Don Quijote" class="home-top-logo">
                    <div class="home-top-brand-text">
                        <h2>CEIP Don Quijote</h2>
                        <span>Colegio de Educación Infantil y Primaria</span>
                    </div>
                </div>

                <!-- Botones de Acción de Icono en la barra superior -->
                <div class="home-top-actions">
                    <button class="top-bar-icon-btn btn-toggle-fullscreen" onclick="toggleFullscreen()" title="${isFullscreenActive() ? 'Salir de pantalla completa' : 'Pantalla completa'}" aria-label="Pantalla completa">
                        ${isFullscreenActive() ? AppIcons.exitFullscreen : AppIcons.fullscreen}
                    </button>
                    <button class="top-bar-icon-btn" onclick="Router.navigate('/configuracion')" title="Configuración" aria-label="Configuración">
                        ${AppIcons.gear}
                    </button>
                </div>
            </header>

            <!-- Sección Hero Expansiva y Centrada (Sin banner redundante ni emojis) -->
            <section class="home-hero-full">
                <h1 class="home-hero-title">
                    AULA AVENTURA
                </h1>

                <p class="home-hero-desc">
                    Descubre retos divertidos, gana chucheletes y explora las 5 zonas del saber diseñadas para aprender en la pizarra digital o en el ordenador de clase.
                </p>

                <div class="home-hero-buttons">
                    <button class="btn btn-primary btn-hero-cta" onclick="Router.navigate('/seleccionar-curso')">
                        ¡EMPEZAR AVENTURA!
                    </button>
                </div>
            </section>

            <!-- Franja Expansiva de las 5 Zonas (Informativas) -->
            <section class="home-zones-strip">
                <div class="home-strip-header">
                    <div>
                        <h2>Las 5 Zonas del Saber</h2>
                        <p>Cada zona esconde preguntas interactivas adaptadas para motivar a los alumnos.</p>
                    </div>
                </div>

                <div class="home-zones-cards-row">
                    <div class="home-zone-card-big zone-castillo">
                        <div class="home-zone-big-icon-wrap">${AppIcons.castillo}</div>
                        <div class="home-zone-big-title">Castillo del Saber</div>
                        <div class="home-zone-big-desc">Matemáticas, series numéricas y lógica divertida.</div>
                    </div>

                    <div class="home-zone-card-big zone-bosque">
                        <div class="home-zone-big-icon-wrap">${AppIcons.bosque}</div>
                        <div class="home-zone-big-title">Bosque de Palabras</div>
                        <div class="home-zone-big-desc">Vocabulario, lectoescritura y comprensión lectora.</div>
                    </div>

                    <div class="home-zone-card-big zone-lab">
                        <div class="home-zone-big-icon-wrap">${AppIcons.laboratorio}</div>
                        <div class="home-zone-big-title">Laboratorio</div>
                        <div class="home-zone-big-desc">El mundo natural, seres vivos y experimentos.</div>
                    </div>

                    <div class="home-zone-card-big zone-biblioteca">
                        <div class="home-zone-big-icon-wrap">${AppIcons.biblioteca}</div>
                        <div class="home-zone-big-title">Biblioteca Mágica</div>
                        <div class="home-zone-big-desc">Historias de Don Quijote, ingenio y cultura.</div>
                    </div>

                    <div class="home-zone-card-big zone-taller">
                        <div class="home-zone-big-icon-wrap">${AppIcons.taller}</div>
                        <div class="home-zone-big-title">Taller Creativo</div>
                        <div class="home-zone-big-desc">Formas, colores, arte y agilidad visual.</div>
                    </div>
                </div>
            </section>

            <!-- Sección de Tres Características Destacadas -->
            <section class="home-features-full">
                <div class="home-features-grid">
                    <div class="home-feature-box feature-box-courses">
                        <div class="home-feature-icon" style="background: #dbeafe; color: #1d4ed8;">${AppIcons.coursesGraduation}</div>
                        <div class="home-feature-text">
                            <h4>6 Cursos de Primaria</h4>
                            <p>Desde 1.º hasta 6.º de Primaria, cada nivel cuenta con su dificultad calibrada para el aula.</p>
                        </div>
                    </div>

                    <div class="home-feature-box feature-box-candies">
                        <div class="home-feature-icon" style="background: #ecfdf5; color: #047857;">${AppIcons.chuchelete(32, 22)}</div>
                        <div class="home-feature-text">
                            <h4>Premio con Chucheletes</h4>
                            <p>Los alumnos ganan billetes de chucheletes con cada acierto, celebrando el aprendizaje colaborativo en clase.</p>
                        </div>
                    </div>

                    <div class="home-feature-box feature-box-screen">
                        <div class="home-feature-icon" style="background: #cffafe; color: #0891b2;">${AppIcons.screenProjector}</div>
                        <div class="home-feature-text">
                            <h4>Pizarra Digital y Proyector</h4>
                            <p>Diseñado para proyectar en el aula y dinamizar la participación activa de los alumnos.</p>
                        </div>
                    </div>
                </div>
            </section>

            <!-- Footer Informativo Institucional -->
            <footer class="home-footer-full">
                <div>
                    <strong>C.E.I.P. Don Quijote</strong> · Plataforma Educativa Interactiva de Aula
                </div>
                <div>
                    Diseñado para Pizarra Digital y Proyector en el Aula
                </div>
            </footer>

        </div>
    `, () => {
        window.updateFullscreenButtons();
    });

    // Selección de Cursos Vertical con Mini Avatar Animal y Nombre
    Router.addRoute('/seleccionar-curso', () => {
        const cursos = [
            { id: 'primaria1', nombre: '1.º de Primaria', sub: '6 a 7 años', color: '#10b981', darkColor: '#047857', iconSvg: AppIcons.course1_lapiz },
            { id: 'primaria2', nombre: '2.º de Primaria', sub: '7 a 8 años', color: '#8b5cf6', darkColor: '#6d28d9', iconSvg: AppIcons.course2_libro },
            { id: 'primaria3', nombre: '3.º de Primaria', sub: '8 a 9 años', color: '#f59e0b', darkColor: '#b45309', iconSvg: AppIcons.course3_lupa },
            { id: 'primaria4', nombre: '4.º de Primaria', sub: '9 a 10 años', color: '#06b6d4', darkColor: '#0e7490', iconSvg: AppIcons.course4_brujula },
            { id: 'primaria5', nombre: '5.º de Primaria', sub: '10 a 11 años', color: '#ef4444', darkColor: '#b91c1c', iconSvg: AppIcons.course5_bombilla },
            { id: 'primaria6', nombre: '6.º de Primaria', sub: '11 a 12 años', color: '#334155', darkColor: '#0f172a', iconSvg: AppIcons.course6_birrete }
        ];

        const cardsHTML = cursos.map(c => {
            const chucheletes = Avatar.getCourseChucheletes(c.id);
            const avatarData = Avatar.getCourseAvatar(c.id);
            const svgPreview = Avatar.renderSVG(avatarData, 70);

            return `
                <div class="course-card" style="--card-accent: ${c.color}; --card-tint: ${c.color}18; --course-color: ${c.color}; --course-dark: ${c.darkColor};">
                    <div class="course-left">
                        <div class="course-badge" style="background-color: ${c.color}; color: white;" title="${c.nombre}">
                            ${c.iconSvg}
                        </div>
                        <div class="course-info">
                            <h3>${c.nombre}</h3>
                            <div class="course-chuches-tag">
                                ${AppIcons.chuchelete(20, 13)} <span>${chucheletes} Chucheletes</span>
                            </div>
                        </div>
                    </div>

                    <div class="course-right">
                        <div class="student-character-wrap" title="Haz clic para personalizar la mascota de ${c.nombre}" onclick="Avatar.editCourseAvatar('${c.id}')" style="cursor: pointer;">
                            <div class="mini-avatar-box">
                                ${svgPreview}
                            </div>
                            <div class="avatar-name-badge" title="${avatarData.name || 'Aventurero'}">
                                ${avatarData.name || 'Aventurero'}
                            </div>
                        </div>
                        <button class="btn-course-play" onclick="seleccionarCurso('${c.id}')">
                            ¡Jugar!
                        </button>
                    </div>
                </div>
            `;
        }).join('');

        return `
            <div class="view" id="view-cursos" style="min-height: 100vh; padding: 0 !important; display: flex; flex-direction: column; width: 100%;">
                
                <!-- Barra Superior Full-Width Coherente con Inicio (Logo quieto a la izquierda, Volver a la derecha) -->
                <header class="home-top-bar">
                    <div class="home-top-brand">
                        <img src="assets/logo_don_quijote.png" alt="Escudo CEIP Don Quijote" class="home-top-logo">
                        <div class="home-top-brand-text">
                            <h2>CEIP Don Quijote</h2>
                            <span>Colegio de Educación Infantil y Primaria</span>
                        </div>
                    </div>

                    <div class="home-top-actions">
                        <button class="top-bar-back-btn" onclick="Router.navigate('/')" title="Volver al Inicio">
                            ${AppIcons.backArrow} Volver al Inicio
                        </button>
                    </div>
                </header>

                <!-- Contenedor Principal de Cursos -->
                <div style="width: 100%; max-width: 920px; margin: 0 auto; padding: 2.2rem 1.5rem 4rem 1.5rem; flex: 1;">
                    
                    <div style="text-align: center; margin-bottom: 2.2rem;">
                        <h1 style="font-size: 2.4rem; font-weight: 900; color: #1e3a8a; margin: 0; letter-spacing: -0.02em;">
                            Elige tu curso
                        </h1>
                    </div>
                    
                    <div class="course-list">
                        ${cardsHTML}
                    </div>
                </div>
            </div>
        `;
    }, () => {
        window.updateFullscreenButtons();
    });

    // Configuración
    Router.addRoute('/configuracion', () => `
        <div class="view" id="view-configuracion" style="min-height: 100vh; padding: 0 !important; display: flex; flex-direction: column; width: 100%;">
            
            <!-- Barra Superior Full-Width Coherente con Inicio -->
            <header class="home-top-bar">
                <div style="display: flex; align-items: center; gap: 1.2rem;">
                    <button class="top-bar-back-btn" onclick="Router.navigate('/')" title="Volver al Inicio">
                        ${AppIcons.backArrow} Volver al Inicio
                    </button>
                    <div class="home-top-brand">
                        <img src="assets/logo_don_quijote.png" alt="Escudo CEIP Don Quijote" class="home-top-logo">
                        <div class="home-top-brand-text">
                            <h2>CEIP Don Quijote</h2>
                            <span>Ajustes y Configuración</span>
                        </div>
                    </div>
                </div>

                <div class="home-top-actions">
                    <button class="top-bar-icon-btn btn-toggle-fullscreen" onclick="toggleFullscreen()" title="${isFullscreenActive() ? 'Salir de pantalla completa' : 'Pantalla completa'}" aria-label="Pantalla completa">
                        ${isFullscreenActive() ? AppIcons.exitFullscreen : AppIcons.fullscreen}
                    </button>
                </div>
            </header>
            
            <div style="width: 100%; max-width: 860px; margin: 0 auto; padding: 2.2rem 1.5rem 4rem 1.5rem; flex: 1;">
                <div style="background: rgba(255,255,255,0.94); padding: 2.2rem; border-radius: 28px; box-shadow: 0 8px 24px rgba(0,0,0,0.05); margin-bottom: 2rem; border: 2px solid #ffffff;">
                    <h2 style="font-size: 1.6rem; color: #1e293b; margin-bottom: 0.5rem;">Opciones de Sonido y Pantalla</h2>
                    <p style="margin-bottom: 1.5rem; color: #64748b;">Ajusta los efectos sonoros o pon la app a pantalla completa para el proyector del aula.</p>
                    
                    <div style="display: flex; gap: 1.2rem; flex-wrap: wrap;">
                        <button id="btn-toggle-sonido" class="btn btn-primary" onclick="TeacherConfig.toggleSonido()">Sonido: ACTIVADO</button>
                        <button class="btn btn-secondary btn-toggle-fullscreen" onclick="toggleFullscreen()">
                            ${isFullscreenActive() ? 'Salir de Pantalla Completa' : 'Pantalla Completa'}
                        </button>
                    </div>
                </div>

                <div style="background: rgba(255,255,255,0.94); padding: 2.2rem; border-radius: 28px; box-shadow: 0 8px 24px rgba(0,0,0,0.05); border: 2px solid #ffffff;">
                    <h2 style="font-size: 1.6rem; color: #1e293b; margin-bottom: 0.5rem;">Copia de Seguridad para Pendrive (USB)</h2>
                    <p style="margin-bottom: 1.5rem; color: #64748b;">
                        Los personajes animales y los chucheletes se guardan en el navegador. Puedes descargar una copia de seguridad para llevarla en tu USB y cargarla en cualquier otra aula del colegio.
                    </p>
                    
                    <div style="display: flex; gap: 1.2rem; flex-wrap: wrap;">
                        <button class="btn btn-primary" style="background: #16a34a;" onclick="TeacherConfig.exportarDatos()">Exportar al USB</button>
                        <button class="btn btn-primary" style="background: #f59e0b;" onclick="TeacherConfig.importarDatos()">Importar del USB</button>
                        <button class="btn btn-secondary" style="background: #fee2e2; color: #b91c1c; border-color: #fca5a5;" onclick="TeacherConfig.borrarDatos()">Reiniciar Progresos</button>
                    </div>
                </div>
            </div>
        </div>
    `, () => {
        TeacherConfig.init();
        window.updateFullscreenButtons();
    });

    Router.addRoute('/profesora', () => {
        Router.navigate('/configuracion');
        return '';
    });

    if(!window.location.hash || window.location.hash === '#') {
        Router.navigate('/');
    } else {
        Router.handleRouting();
    }
}

document.addEventListener('DOMContentLoaded', initApp);
