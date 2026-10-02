// Global functions used by inline HTML event handlers
window.seleccionarCurso = function(cursoId) {
    AppState.currentLevel = cursoId;
    Avatar.currentCourse = cursoId;
    StorageHelper.save('currentLevel', cursoId);
    console.log("Curso seleccionado:", cursoId);
    Router.navigate('/mapa');
};

Router.addRoute('/mapa', () => `
    <div class="view" id="view-mapa" style="min-height: 100vh; padding: 0 !important; display: flex; flex-direction: column; width: 100%;">
        
        <!-- Barra Superior Full-Width Coherente con Inicio y Cursos -->
        <header class="home-top-bar">
            <div class="home-top-brand">
                <img src="assets/logo_don_quijote.png" alt="Escudo CEIP Don Quijote" class="home-top-logo">
                <div class="home-top-brand-text">
                    <h2 id="mapa-titulo">1.º de Primaria</h2>
                    <span>CEIP Don Quijote · Colegio de Educación Infantil y Primaria</span>
                </div>
            </div>

            <div class="home-top-actions">
                <!-- Personaje con su nombre debajo (a la izquierda de los Chucheletes) -->
                <div class="map-character-badge" style="display: flex; flex-direction: column; align-items: center; gap: 2px; pointer-events: none; user-select: none; margin-right: 0.3rem;">
                    <img id="mapa-avatar-img" src="" alt="Mascota" style="width: 36px; height: 36px; object-fit: contain; filter: drop-shadow(0 2px 4px rgba(0,0,0,0.35)); display: block;">
                    <span id="mapa-nombre-personaje" style="font-size: 0.72rem; font-weight: 800; color: #ffffff; background: rgba(0,0,0,0.28); padding: 0.08rem 0.45rem; border-radius: 6px; border: 1px solid rgba(255,255,255,0.25); max-width: 90px; text-overflow: ellipsis; overflow: hidden; white-space: nowrap; line-height: 1.1; text-shadow: 0 1px 2px rgba(0,0,0,0.4);">
                        Aventurero
                    </span>
                </div>

                <div class="chuchelete-badge" style="background: rgba(255,255,255,0.18); border: 1.5px solid rgba(255,255,255,0.35); color: #ffffff; text-shadow: 0 1px 2px rgba(0,0,0,0.3); padding: 0.42rem 0.95rem; font-size: 0.95rem; border-radius: 14px;">
                    ${window.AppIcons ? window.AppIcons.chuchelete(22, 15) : ''}
                    <span><span id="mapa-chuches">0</span> Chucheletes</span>
                </div>
                <button class="top-bar-back-btn" onclick="Router.navigate('/seleccionar-curso')" title="Cambiar Curso">
                    ${window.AppIcons ? window.AppIcons.backArrow : ''} Cambiar Curso
                </button>
            </div>
        </header>

        <!-- Contenedor Principal del Mapa en Cajita Enmarcada (Como al principio) -->
        <div class="map-card-wrapper">
            <div class="adventure-world-wrap">

                <!-- 1. CASTILLO DEL SABER (Arriba Izquierda - Castillo de Bloques Pastel) -->
                <div class="adventure-zone-node" style="top: 25%; left: 24%;" onclick="GameCore.startZone('castillo')" title="Entrar al Castillo del Saber">
                    <div class="zone-medallion zone-castillo">
                        <div class="zone-pulse-ring"></div>
                        <svg viewBox="0 0 24 24" fill="none" stroke="#ffffff" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
                            <path d="M2 20h20"/>
                            <path d="M4 20V4h4v3.5h2V4h4v3.5h2V4h4v16"/>
                            <path d="M9.5 20v-5a2.5 2.5 0 0 1 5 0v5"/>
                            <line x1="7" y1="11" x2="7" y2="14"/>
                            <line x1="17" y1="11" x2="17" y2="14"/>
                        </svg>
                    </div>
                    <div class="zone-info-card">
                        <span class="zone-mini-dot dot-castillo"></span>
                        <span class="zone-title">Castillo del Saber</span>
                        <span class="zone-reward-badge">+10 🍬</span>
                        <span class="zone-hover-cta">¡Jugar!</span>
                    </div>
                </div>

                <!-- 2. BOSQUE DE LAS PALABRAS (Arriba Derecha - Bosque Mágico de Setas) -->
                <div class="adventure-zone-node" style="top: 28%; left: 72%;" onclick="GameCore.startZone('bosque')" title="Entrar al Bosque de las Palabras">
                    <div class="zone-medallion zone-bosque">
                        <div class="zone-pulse-ring"></div>
                        <svg viewBox="0 0 24 24" fill="none" stroke="#ffffff" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
                            <path d="M5 21h14"/>
                            <path d="M12 21v-6"/>
                            <path d="M12 15l-3-3"/>
                            <path d="M12 15l3-3"/>
                            <path d="M7 16a4.5 4.5 0 0 1-3.5-4.4 4.5 4.5 0 0 1 4-4.4A5.5 5.5 0 0 1 12 2a5.5 5.5 0 0 1 4.5 5.2 4.5 4.5 0 0 1 4 4.4 4.5 4.5 0 0 1-3.5 4.4q-5 -1.5 -10 0z"/>
                        </svg>
                    </div>
                    <div class="zone-info-card">
                        <span class="zone-mini-dot dot-bosque"></span>
                        <span class="zone-title">Bosque de Palabras</span>
                        <span class="zone-reward-badge">+10 🍬</span>
                        <span class="zone-hover-cta">¡Jugar!</span>
                    </div>
                </div>

                <!-- 3. LABORATORIO DE INVENTOS (Centro - Laboratorio de Pociones y Robot) -->
                <div class="adventure-zone-node" style="top: 40%; left: 51%;" onclick="GameCore.startZone('laboratorio')" title="Entrar al Laboratorio de Inventos">
                    <div class="zone-medallion zone-laboratorio">
                        <div class="zone-pulse-ring"></div>
                        <svg viewBox="0 0 24 24" fill="none" stroke="#ffffff" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
                            <path d="M10 2v7.31M14 2v7.31M8.5 2h7M14 9.3l4.5 9A2 2 0 0 1 16.7 21H7.3a2 2 0 0 1-1.8-2.7l4.5-9"/>
                            <path d="M7 16h10"/>
                        </svg>
                    </div>
                    <div class="zone-info-card">
                        <span class="zone-mini-dot dot-laboratorio"></span>
                        <span class="zone-title">Laboratorio</span>
                        <span class="zone-reward-badge">+10 🍬</span>
                        <span class="zone-hover-cta">¡Jugar!</span>
                    </div>
                </div>

                <!-- 4. BIBLIOTECA DE DON QUIJOTE (Abajo Derecha - Molino y Pradera de Flores) -->
                <div class="adventure-zone-node" style="top: 72%; left: 76%;" onclick="GameCore.startZone('biblioteca')" title="Entrar a la Biblioteca de Don Quijote">
                    <div class="zone-medallion zone-biblioteca">
                        <div class="zone-pulse-ring"></div>
                        <svg viewBox="0 0 24 24" fill="none" stroke="#ffffff" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
                            <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/>
                            <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/>
                            <line x1="8" y1="7" x2="16" y2="7"/>
                            <line x1="8" y1="11" x2="14" y2="11"/>
                        </svg>
                    </div>
                    <div class="zone-info-card">
                        <span class="zone-mini-dot dot-biblioteca"></span>
                        <span class="zone-title">Biblioteca Quijote</span>
                        <span class="zone-reward-badge">+10 🍬</span>
                        <span class="zone-hover-cta">¡Jugar!</span>
                    </div>
                </div>

                <!-- 5. TALLER CREATIVO (Abajo Centro - Taller de Arte y Lápices) -->
                <div class="adventure-zone-node" style="top: 78%; left: 46%;" onclick="GameCore.startZone('taller')" title="Entrar al Taller Creativo">
                    <div class="zone-medallion zone-taller">
                        <div class="zone-pulse-ring"></div>
                        <svg viewBox="0 0 24 24" fill="none" stroke="#ffffff" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
                            <circle cx="13.5" cy="6.5" r=".8" fill="currentColor"/>
                            <circle cx="17.5" cy="10.5" r=".8" fill="currentColor"/>
                            <circle cx="8.5" cy="7.5" r=".8" fill="currentColor"/>
                            <circle cx="6.5" cy="12.5" r=".8" fill="currentColor"/>
                            <path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10c.926 0 1.648-.746 1.648-1.688 0-.437-.18-.835-.437-1.125-.29-.289-.438-.652-.438-1.125a1.64 1.64 0 0 1 1.668-1.668h1.996c3.051 0 5.555-2.503 5.555-5.554C21.965 6.012 17.461 2 12 2z"/>
                        </svg>
                    </div>
                    <div class="zone-info-card">
                        <span class="zone-mini-dot dot-taller"></span>
                        <span class="zone-title">Taller Creativo</span>
                        <span class="zone-reward-badge">+10 🍬</span>
                        <span class="zone-hover-cta">¡Jugar!</span>
                    </div>
                </div>

            </div>
        </div>
    </div>
`, () => {
    const cursoId = AppState.currentLevel || 'primaria1';
    const nombresCursos = {
        'primaria1': '1.º de Primaria',
        'primaria2': '2.º de Primaria',
        'primaria3': '3.º de Primaria',
        'primaria4': '4.º de Primaria',
        'primaria5': '5.º de Primaria',
        'primaria6': '6.º de Primaria'
    };
    
    const avatarData = Avatar.getCourseAvatar(cursoId);
    document.getElementById('mapa-titulo').textContent = nombresCursos[cursoId] || 'Mapa de Aventura';
    document.getElementById('mapa-nombre-personaje').textContent = avatarData.name || 'Aventurero';
    document.getElementById('mapa-chuches').textContent = Avatar.getCourseChucheletes(cursoId);
    const mapImg = document.getElementById('mapa-avatar-img');
    if (mapImg) {
        mapImg.src = Avatar.getSkinImgSrc(avatarData.skinId || avatarData.species);
        mapImg.onerror = () => { mapImg.src = `assets/Nueva carpeta (2)/${avatarData.file}`; };
    }
    if (window.updateFullscreenButtons) window.updateFullscreenButtons();
});

Router.addRoute('/actividad', () => `
    <div class="view" id="view-actividad" style="align-items: center; justify-content: center; min-height: 100vh;">
        <div style="width: 100%; max-width: 900px; min-height: 500px; display: flex; flex-direction: column; background: rgba(255,255,255,0.96); backdrop-filter: blur(12px); border-radius: 32px; box-shadow: 0 16px 40px rgba(0,0,0,0.08); padding: 2.2rem; border: 2px solid #ffffff;">
            
            <!-- Cabecera Actividad -->
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 2rem; border-bottom: 2px solid #f1f5f9; padding-bottom: 1.2rem; flex-wrap: wrap; gap: 0.8rem;">
                <button class="btn btn-secondary btn-sm" style="display: inline-flex; align-items: center; gap: 0.4rem;" onclick="GameCore.endSession()">
                    ${window.AppIcons ? window.AppIcons.backArrow : ''} Volver al Mapa
                </button>
                <div style="font-weight: 800; font-size: 1.25rem; color: #64748b;">Reto: <span id="act-progreso" style="color: var(--school-blue);">1/1</span></div>
                <div style="display: flex; align-items: center; gap: 0.8rem;">
                    <div class="chuchelete-badge">
                        ${window.AppIcons ? window.AppIcons.chuchelete(24, 16) : ''}
                        <span><span id="act-chuches">0</span> Chucheletes</span>
                    </div>
                    <button class="top-bar-icon-btn btn-toggle-fullscreen" onclick="toggleFullscreen()" title="${window.isFullscreenActive && window.isFullscreenActive() ? 'Salir de pantalla completa' : 'Pantalla completa'}" aria-label="Pantalla completa">
                        ${window.isFullscreenActive && window.isFullscreenActive() ? window.AppIcons.exitFullscreen : window.AppIcons.fullscreen}
                    </button>
                </div>
            </div>
            
            <!-- Contenedor Principal de la Actividad -->
            <div id="actividad-container" style="flex: 1; display: flex; flex-direction: column; align-items: center; justify-content: center; text-align: center;">
                <!-- Inyección por activities.js -->
            </div>

        </div>
    </div>
`, () => {
    GameCore.startSession();
    if (window.updateFullscreenButtons) window.updateFullscreenButtons();
});

window.GameCore = {
    currentZone: null,
    activitiesList: [],
    currentIndex: 0,
    sessionChuches: 0,
    sessionStats: { correctas: 0, errores: 0 },

    startZone(zoneId) {
        this.currentZone = zoneId;
        console.log(`Iniciando zona ${zoneId} para el nivel ${AppState.currentLevel}`);
        Router.navigate('/actividad');
    },

    startSession() {
        const nivel = AppState.currentLevel || 'primaria1';
        if (!this.currentZone) {
            Router.navigate('/mapa');
            return;
        }

        const dataNivel = window.AULA_DATA[nivel];
        if (dataNivel && dataNivel[this.currentZone]) {
            this.activitiesList = dataNivel[this.currentZone];
        } else {
            this.activitiesList = [];
        }

        this.currentIndex = 0;
        this.sessionChuches = 0;
        this.sessionStats = { correctas: 0, errores: 0 };

        if (this.activitiesList.length === 0) {
            document.getElementById('actividad-container').innerHTML = `
                <div style="margin-bottom: 1rem; color: #f59e0b;">
                    <svg viewBox="0 0 24 24" width="64" height="64" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>
                </div>
                <h3 style="font-size: 1.8rem; margin-bottom: 0.5rem; color: #334155;">¡Zona en preparación!</h3>
                <p style="color: #64748b; font-size: 1.1rem; margin-bottom: 1.5rem;">Pronto habrá nuevos retos de Don Quijote aquí.</p>
                <button class="btn btn-primary" onclick="Router.navigate('/mapa')">Volver al Mapa</button>
            `;
            return;
        }

        this.updateHeader();
        this.renderCurrentActivity();
    },

    renderCurrentActivity() {
        const actividad = this.activitiesList[this.currentIndex];
        Activities.render(actividad, 'actividad-container', (acierto) => this.handleActivityComplete(acierto));
    },

    handleActivityComplete(acierto) {
        const nivel = AppState.currentLevel || 'primaria1';
        if (acierto) {
            this.sessionStats.correctas++;
            this.sessionChuches += 10;
            Avatar.addCourseChucheletes(nivel, 10);
        } else {
            this.sessionStats.errores++;
        }

        this.currentIndex++;
        
        if (this.currentIndex < this.activitiesList.length) {
            this.updateHeader();
            this.renderCurrentActivity();
        } else {
            this.showResults();
        }
    },

    updateHeader() {
        const nivel = AppState.currentLevel || 'primaria1';
        document.getElementById('act-progreso').textContent = `${this.currentIndex + 1}/${this.activitiesList.length}`;
        document.getElementById('act-chuches').textContent = Avatar.getCourseChucheletes(nivel);
    },

    showResults() {
        const total = this.sessionStats.correctas + this.sessionStats.errores;
        const pct = Math.round((this.sessionStats.correctas / total) * 100) || 0;
        const nivel = AppState.currentLevel || 'primaria1';
        const avatarData = Avatar.getCourseAvatar(nivel);
        
        const container = document.getElementById('actividad-container');
        container.innerHTML = `
            <div style="animation: smoothFadeIn 0.5s; width: 100%; max-width: 550px;">
                <div style="display: flex; justify-content: center; margin-bottom: 1rem;">
                    <div style="width: 80px; height: 80px; border-radius: 50%; background: #dcfce7; color: #16a34a; display: flex; align-items: center; justify-content: center; box-shadow: 0 8px 24px rgba(22, 163, 74, 0.2);">
                        <svg viewBox="0 0 24 24" width="48" height="48" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                    </div>
                </div>
                <h1 style="color: var(--school-red); font-size: 2.6rem; margin-bottom: 0.5rem; font-weight: 900;">¡Reto Superado!</h1>
                <p style="font-size: 1.25rem; color: #334155; font-weight: 800;">¡Enhorabuena, <b>${avatarData.name || 'Aventurero'}</b>!</p>
                
                <div style="background: #ecfdf5; border: 3px dashed #10b981; padding: 1.6rem; border-radius: 24px; text-align: center; margin: 1.5rem 0; box-shadow: 0 8px 20px rgba(16, 185, 129, 0.12);">
                    <div style="margin-bottom: 0.6rem; display: flex; justify-content: center; gap: 0.6rem;">
                        ${window.AppIcons ? window.AppIcons.chuchelete(52, 34) : ''}
                        ${window.AppIcons ? window.AppIcons.chuchelete(52, 34) : ''}
                    </div>
                    <h2 style="color: #065f46; font-size: 2.2rem; font-weight: 900;">+${this.sessionChuches} Chucheletes ganados</h2>
                    <p style="color: #047857; margin-top: 0.3rem; font-weight: 700;">¡Guardados en el personaje de tu clase!</p>
                </div>

                <div style="background: #f8fafc; padding: 1.2rem 1.6rem; border-radius: 20px; text-align: left; margin-bottom: 2rem; border: 2px solid #e2e8f0;">
                    <h3 style="margin-bottom: 0.8rem; text-align: center; font-size: 1.25rem; color: #334155;">Resumen de la Partida</h3>
                    <p style="font-size: 1.1rem; margin-bottom: 0.4rem; color: #16a34a; font-weight: 800;">Aciertos: <strong>${this.sessionStats.correctas}</strong></p>
                    <p style="font-size: 1.1rem; margin-bottom: 0.4rem; color: #e11d48; font-weight: 800;">Intentos adicionales: <strong>${this.sessionStats.errores}</strong></p>
                    <p style="font-size: 1.1rem; color: #1e3a8a; font-weight: 800;">Precisión: <strong>${pct}%</strong></p>
                </div>
                
                <div style="display: flex; gap: 1.2rem; justify-content: center; flex-wrap: wrap;">
                    <button class="btn btn-primary btn-large" onclick="Router.navigate('/mapa')">Volver al Mapa</button>
                    <button class="btn btn-secondary btn-large" onclick="Router.navigate('/seleccionar-curso')">Cursos de Primaria</button>
                </div>
            </div>
        `;
        
        if (AppState.settings.soundEnabled) Activities.playSound('success');
    },

    endSession() {
        Router.navigate('/mapa');
    }
};

// Configuración y personalización de Personajes Animales Cuadrados (Carrusel Cíclico)
Router.addRoute('/avatar', () => {
    const cursoId = Avatar.currentCourse || AppState.currentLevel || 'primaria1';
    const nombresCursos = {
        'primaria1': '1.º de Primaria',
        'primaria2': '2.º de Primaria',
        'primaria3': '3.º de Primaria',
        'primaria4': '4.º de Primaria',
        'primaria5': '5.º de Primaria',
        'primaria6': '6.º de Primaria'
    };
    const nombreCurso = nombresCursos[cursoId] || 'Primaria';
    const avatarData = Avatar.getCourseAvatar(cursoId);
    const skin = Avatar.getSkin(avatarData.skinId || avatarData.species);

    const thumbnailsHTML = Avatar.SKINS.map((s, idx) => `
        <button type="button" class="skin-thumb-btn ${s.id === skin.id ? 'active' : ''}" onclick="Avatar.selectSkinIndex(${idx})" title="${s.name}">
            <img src="assets/animales/${s.file}" alt="${s.name}" onerror="this.src='assets/Nueva carpeta (2)/${s.file}'">
        </button>
    `).join('');

    return `
    <div class="view" id="view-avatar" style="min-height: 100vh; padding: 0 !important; display: flex; flex-direction: column; width: 100%;">
        
        <!-- Barra Superior Full-Width Coherente con Inicio y Cursos -->
        <header class="home-top-bar">
            <div class="home-top-brand">
                <img src="assets/logo_don_quijote.png" alt="Escudo CEIP Don Quijote" class="home-top-logo">
                <div class="home-top-brand-text">
                    <h2>CEIP Don Quijote</h2>
                    <span>Colegio de Educación Infantil y Primaria</span>
                </div>
            </div>

            <div class="home-top-actions">
                <button class="top-bar-back-btn" onclick="Router.navigate('/seleccionar-curso')" title="Volver a Cursos">
                    ${AppIcons.backArrow} Volver a Cursos
                </button>
            </div>
        </header>

        <!-- Contenedor del Selector de Personajes en Carrusel Cíclico -->
        <div class="view-body" style="width: 100%; max-width: 860px; margin: 0 auto; padding: 1.2rem 1.5rem 2rem 1.5rem; flex: 1;">
            
            <div style="text-align: center; margin-bottom: 0.9rem;">
                <h1 style="font-size: 2rem; font-weight: 900; color: #1e3a8a; margin: 0 0 0.25rem 0; letter-spacing: -0.02em;">
                    Mascota de ${nombreCurso}
                </h1>
                <p style="color: #64748b; font-size: 1rem; font-weight: 700; margin: 0;">
                    Elige tu personaje animal con las flechas o pulsando sobre ellos
                </p>
            </div>

            <div class="skin-selector-card">
                
                <!-- Carrusel Cíclico Principal con Flechas Izquierda y Derecha -->
                <div class="skin-carousel-stage">
                    <button type="button" class="skin-nav-arrow skin-arrow-prev" onclick="Avatar.prevSkin()" title="Personaje anterior (o Flecha Izquierda)" aria-label="Anterior">
                        <svg viewBox="0 0 24 24" width="32" height="32" fill="none" stroke="currentColor" stroke-width="3.2" stroke-linecap="round" stroke-linejoin="round"><path d="M15 18l-6-6 6-6"/></svg>
                    </button>

                    <div class="skin-center-card">
                        <div class="skin-preview-wrapper" onclick="Avatar.nextSkin()" title="Haz clic para pasar a la siguiente mascota">
                            <img id="skin-main-img" src="assets/animales/${skin.file}" alt="${skin.name}" class="skin-large-img" onerror="this.src='assets/Nueva carpeta (2)/${skin.file}'">
                        </div>

                        <div class="skin-info-wrap">
                            <div class="skin-species-tag" id="skin-species-tag">
                                ${skin.name}
                            </div>
                            <div class="skin-counter-tag" id="skin-counter">
                                1 / ${Avatar.SKINS.length}
                            </div>
                        </div>
                    </div>

                    <button type="button" class="skin-nav-arrow skin-arrow-next" onclick="Avatar.nextSkin()" title="Siguiente personaje (o Flecha Derecha)" aria-label="Siguiente">
                        <svg viewBox="0 0 24 24" width="32" height="32" fill="none" stroke="currentColor" stroke-width="3.2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 18l6-6-6-6"/></svg>
                    </button>
                </div>

                <!-- Tira de Miniaturas Cuadradas de los 10 Animales -->
                <div class="skin-thumbnails-row">
                    ${thumbnailsHTML}
                </div>

                <!-- Barra Inferior: Nombre y Botón Aceptar Alineados al Lado -->
                <div class="skin-footer-bar">
                    <div class="skin-name-field-compact">
                        <label for="skin-name-input">Nombre del Aventurero/a:</label>
                        <input type="text" id="skin-name-input" class="skin-name-input" maxlength="16" placeholder="Escribe un nombre..." oninput="Avatar.setCustomName(this.value)" value="${avatarData.name || skin.defaultName}">
                    </div>
                    <button type="button" class="btn-action-green skin-btn-accept" onclick="Router.navigate('/seleccionar-curso')">
                        Aceptar
                    </button>
                </div>

            </div>

        </div>
    </div>
    `;
}, () => {
    const cursoId = Avatar.currentCourse || AppState.currentLevel || 'primaria1';
    Avatar.initCarousel(cursoId);
    if (window.updateFullscreenButtons) window.updateFullscreenButtons();
});

