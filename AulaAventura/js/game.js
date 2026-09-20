// Global functions used by inline HTML event handlers
window.seleccionarCurso = function(cursoId) {
    AppState.currentLevel = cursoId;
    Avatar.currentCourse = cursoId;
    StorageHelper.save('currentLevel', cursoId);
    console.log("Curso seleccionado:", cursoId);
    Router.navigate('/mapa');
};

Router.addRoute('/mapa', () => `
    <div class="view" id="view-mapa" style="align-items: center; justify-content: flex-start; min-height: 100vh;">
        <div style="width: 100%; max-width: 940px; display: flex; flex-direction: column;">
            
            <!-- Barra superior con Escudo CEIP Don Quijote y Personaje -->
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1.5rem; background: linear-gradient(135deg, #1e3a8a 0%, #1e40af 55%, #991b1b 100%); padding: 0.85rem 1.8rem; border-radius: 26px; box-shadow: 0 8px 24px rgba(30, 58, 138, 0.22); border: 3px solid #f59e0b; flex-wrap: wrap; gap: 0.8rem;">
                <button class="btn btn-secondary btn-sm" style="background: rgba(255,255,255,0.18); color: white; border: 1.5px solid rgba(255,255,255,0.4); display: inline-flex; align-items: center; gap: 0.4rem;" onclick="Router.navigate('/seleccionar-curso')">
                    ${window.AppIcons ? window.AppIcons.backArrow : ''} Cambiar Curso
                </button>
                
                <div style="display: flex; align-items: center; gap: 0.9rem;">
                    <img src="assets/logo_don_quijote.png" alt="Escudo CEIP Don Quijote" style="height: 48px; width: auto; object-fit: contain; filter: drop-shadow(0 3px 6px rgba(0,0,0,0.35)); display: block;">
                    <div style="text-align: left;">
                        <h2 id="mapa-titulo" style="color: #ffffff; font-size: 1.45rem; line-height: 1.1; margin: 0; text-shadow: 0 2px 4px rgba(0,0,0,0.25);">Mapa del Curso</h2>
                        <div style="font-size: 0.9rem; color: #fef08a; font-weight: 800; display: flex; align-items: center; gap: 0.4rem; margin-top: 2px;">
                            <span>Aventurero/a:</span> <span id="mapa-nombre-personaje" style="color: #ffffff; font-weight: 900;">Aventurero</span>
                        </div>
                    </div>
                    <div class="mini-avatar-box" onclick="Avatar.editCourseAvatar(AppState.currentLevel)" title="Haz clic para personalizar tu mascota" style="width: 46px; height: 46px; border-radius: 12px; padding: 3px; cursor: pointer; border-color: rgba(255,255,255,0.85); box-shadow: 0 4px 10px rgba(0,0,0,0.2);">
                        <img id="mapa-avatar-img" src="" alt="Mascota" class="mini-avatar-img">
                    </div>
                </div>

                <div style="display: flex; gap: 0.8rem; align-items: center;">
                    <div class="chuchelete-badge">
                        ${window.AppIcons ? window.AppIcons.chuchelete(26, 18) : ''}
                        <span><span id="mapa-chuches">0</span> Chucheletes</span>
                    </div>
                    <button class="btn btn-primary btn-sm" onclick="Avatar.editCourseAvatar(AppState.currentLevel)">
                        Personalizar
                    </button>
                    <button class="top-bar-icon-btn btn-toggle-fullscreen" onclick="toggleFullscreen()" title="${window.isFullscreenActive && window.isFullscreenActive() ? 'Salir de pantalla completa' : 'Pantalla completa'}" aria-label="Pantalla completa">
                        ${window.isFullscreenActive && window.isFullscreenActive() ? window.AppIcons.exitFullscreen : window.AppIcons.fullscreen}
                    </button>
                </div>
            </div>
            
            <!-- Isla de Aventura Escolar -->
            <div style="height: 550px; width: 100%; background: linear-gradient(180deg, #86efac 0%, #34d399 35%, #10b981 100%); border-radius: 36px; border: 8px solid #059669; position: relative; overflow: hidden; box-shadow: 0 24px 50px rgba(5, 150, 105, 0.25), inset 0 8px 24px rgba(255,255,255,0.45);">
                
                <!-- Nubes mágicas decorativas -->
                <svg width="100%" height="100%" style="position: absolute; top:0; left:0; pointer-events: none; z-index: 2; opacity: 0.8;">
                    <ellipse cx="12%" cy="16%" rx="48" ry="18" fill="#ffffff" />
                    <ellipse cx="16%" cy="12%" rx="28" ry="20" fill="#ffffff" />
                    
                    <ellipse cx="88%" cy="20%" rx="55" ry="18" fill="#ffffff" />
                    <ellipse cx="84%" cy="15%" rx="32" ry="22" fill="#ffffff" />

                    <ellipse cx="50%" cy="90%" rx="52" ry="16" fill="#ffffff" opacity="0.6" />
                </svg>

                <!-- Senderos de exploración -->
                <svg width="100%" height="100%" style="position: absolute; top:0; left:0; pointer-events: none; z-index: 1;">
                    <path d="M 48% 22% L 22% 42% M 48% 22% L 76% 42% M 22% 52% L 36% 76% M 76% 52% L 66% 76% M 36% 76% L 66% 76%" stroke="#047857" stroke-width="9" stroke-dasharray="14,14" fill="none" opacity="0.6" stroke-linecap="round" />
                    <path d="M 48% 22% L 22% 42% M 48% 22% L 76% 42% M 22% 52% L 36% 76% M 76% 52% L 66% 76% M 36% 76% L 66% 76%" stroke="#fef08a" stroke-width="4.5" stroke-dasharray="14,14" fill="none" stroke-linecap="round" />
                </svg>
                
                <!-- Zonas temáticas de reto con Iconos SVG Limpios -->
                
                <!-- Castillo del Saber -->
                <div class="map-zone" style="top: 20%; left: 48%;" onclick="GameCore.startZone('castillo')">
                    <div class="map-pin">${window.AppIcons ? window.AppIcons.castillo : ''}</div>
                    <div class="map-label">CASTILLO DEL SABER</div>
                </div>

                <!-- Bosque de las Palabras -->
                <div class="map-zone" style="top: 44%; left: 22%;" onclick="GameCore.startZone('bosque')">
                    <div class="map-pin">${window.AppIcons ? window.AppIcons.bosque : ''}</div>
                    <div class="map-label">BOSQUE DE PALABRAS</div>
                </div>

                <!-- Laboratorio de Inventos -->
                <div class="map-zone" style="top: 44%; left: 76%;" onclick="GameCore.startZone('laboratorio')">
                    <div class="map-pin">${window.AppIcons ? window.AppIcons.laboratorio : ''}</div>
                    <div class="map-label">LABORATORIO</div>
                </div>

                <!-- Biblioteca de Don Quijote -->
                <div class="map-zone" style="top: 76%; left: 34%;" onclick="GameCore.startZone('biblioteca')">
                    <div class="map-pin">${window.AppIcons ? window.AppIcons.biblioteca : ''}</div>
                    <div class="map-label">BIBLIOTECA</div>
                </div>

                <!-- Taller Creativo -->
                <div class="map-zone" style="top: 76%; left: 66%;" onclick="GameCore.startZone('taller')">
                    <div class="map-pin">${window.AppIcons ? window.AppIcons.taller : ''}</div>
                    <div class="map-label">TALLER CREATIVO</div>
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

