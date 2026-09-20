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
                    <img src="assets/logo_don_quijote.png" alt="Escudo" style="width: 46px; height: 46px; object-fit: contain; filter: drop-shadow(0 3px 6px rgba(0,0,0,0.3)); background: rgba(255,255,255,0.15); border-radius: 12px; padding: 3px;">
                    <div style="text-align: left;">
                        <h2 id="mapa-titulo" style="color: #ffffff; font-size: 1.45rem; line-height: 1.1; margin: 0; text-shadow: 0 2px 4px rgba(0,0,0,0.25);">Mapa del Curso</h2>
                        <div style="font-size: 0.9rem; color: #fef08a; font-weight: 800;">
                            Aventurero/a: <span id="mapa-nombre-personaje" style="color: #ffffff; font-weight: 900;">Aventurero</span>
                        </div>
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

// Configuración y personalización de Personajes Animales
Router.addRoute('/avatar', () => {
    const animalsList = [
        { id: 'zorro', name: 'Zorro Astuto', color: '#ea580c' },
        { id: 'panda', name: 'Panda Amable', color: '#ffffff' },
        { id: 'oso', name: 'Oso Perezoso', color: '#78350f' },
        { id: 'leon', name: 'León Valiente', color: '#eab308' },
        { id: 'conejo', name: 'Conejo Veloz', color: '#e2e8f0' },
        { id: 'gato', name: 'Gato Curioso', color: '#fb923c' },
        { id: 'perro', name: 'Perro Fiel', color: '#f59e0b' },
        { id: 'buho', name: 'Búho Sabio', color: '#8b5cf6' },
        { id: 'rana', name: 'Rana Saltarina', color: '#10b981' },
        { id: 'koala', name: 'Koala Tierno', color: '#94a3b8' }
    ];

    const animalsHTML = animalsList.map(a => `
        <button class="asset-choice-btn" onclick="Avatar.setProperty('species', '${a.id}')">
            <div style="width: 52px; height: 52px; display: flex; align-items: center; justify-content: center;">
                ${Avatar.renderSVG({ species: a.id, furColor: a.color }, 52)}
            </div>
            <span>${a.name}</span>
        </button>
    `).join('');

    return `
    <div class="view" id="view-avatar" style="align-items: center; justify-content: center; min-height: 100vh;">
        <div style="width: 100%; max-width: 1000px; display: flex; flex-direction: column; background: rgba(255,255,255,0.96); backdrop-filter: blur(14px); border-radius: 36px; padding: 2.2rem; box-shadow: 0 16px 45px rgba(0,0,0,0.06); border: 2px solid #ffffff;">
            
            <!-- Barra superior -->
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1.8rem; flex-wrap: wrap; gap: 1rem;">
                <button class="btn btn-secondary btn-sm" style="display: inline-flex; align-items: center; gap: 0.4rem;" onclick="Router.navigate('/seleccionar-curso')">
                    ${window.AppIcons ? window.AppIcons.backArrow : ''} Volver a Cursos
                </button>
                
                <div style="display: flex; align-items: center; gap: 0.8rem;">
                    <img src="assets/logo_don_quijote.png" alt="Logo" style="width: 44px; height: 44px; object-fit: contain;">
                    <div style="text-align: left;">
                        <h1 id="avatar-curso-titulo" style="color: var(--school-red); font-size: 1.8rem; margin: 0; line-height: 1.1;">Tu Mascota</h1>
                        <span style="font-size: 0.85rem; color: #16a34a; font-weight: 800;">
                            Todos los accesorios desbloqueados
                        </span>
                    </div>
                </div>

                <div class="chuchelete-badge">
                    ${window.AppIcons ? window.AppIcons.chuchelete(26, 18) : ''}
                    <span><span id="avatar-chuches">0</span> Chucheletes</span>
                </div>
            </div>
            
            <div style="display: flex; gap: 2.5rem; align-items: flex-start; justify-content: center; flex-wrap: wrap;">
                
                <!-- Columna Izquierda: Vista Previa y Nombre -->
                <div style="display: flex; flex-direction: column; align-items: center; gap: 1.2rem; width: 280px;">
                    
                    <!-- Campo para cambiar el Nombre -->
                    <div style="width: 100%; text-align: center;">
                        <label style="display: block; font-weight: 800; font-size: 1.05rem; color: #334155; margin-bottom: 0.4rem;">
                            Nombre de tu Personaje:
                        </label>
                        <input type="text" id="avatar-name-input" class="avatar-input-name" placeholder="Escribe un nombre..." maxlength="15">
                    </div>

                    <!-- Cuadro de Vista Previa -->
                    <div id="avatar-live-preview" style="width: 250px; height: 250px; background: linear-gradient(135deg, #e0f2fe 0%, #ede9fe 100%); border-radius: 50%; display: flex; align-items: center; justify-content: center; border: 6px solid #ffffff; box-shadow: 0 10px 25px rgba(37, 99, 235, 0.15);">
                        <!-- SVG inyectado en vivo -->
                    </div>

                    <button class="btn btn-primary" style="width: 100%; font-size: 1.25rem;" onclick="Router.navigate('/mapa')">
                        ¡Ir a Jugar!
                    </button>
                </div>
                
                <!-- Columna Derecha: Pestañas de personalización de Animales -->
                <div style="flex: 1; min-width: 320px; background: #ffffff; border: 2px solid #e2e8f0; border-radius: 26px; padding: 1.8rem; box-shadow: 0 4px 12px rgba(0,0,0,0.03);">
                    
                    <!-- Pestañas de categorías (Animales y complementos) -->
                    <div class="avatar-tabs">
                        <button id="tab-btn-animal" class="avatar-tab-btn active" onclick="Avatar.switchTab('animal')">Especie Animal</button>
                        <button id="tab-btn-pelaje" class="avatar-tab-btn" onclick="Avatar.switchTab('pelaje')">Color de Pelaje</button>
                        <button id="tab-btn-sombreros" class="avatar-tab-btn" onclick="Avatar.switchTab('sombreros')">Sombreros</button>
                        <button id="tab-btn-gafas" class="avatar-tab-btn" onclick="Avatar.switchTab('gafas')">Gafas y Rostro</button>
                        <button id="tab-btn-cuello" class="avatar-tab-btn" onclick="Avatar.switchTab('cuello')">Cuello y Ropa</button>
                    </div>

                    <!-- Contenido 1: Selección de Especie Animal (10 Animales) -->
                    <div id="tab-content-animal" class="avatar-tab-content">
                        <h4 style="margin-bottom: 0.8rem; color: #475569; font-size: 1.05rem;">Elige la especie de tu compañero/a:</h4>
                        <div class="asset-grid">
                            ${animalsHTML}
                        </div>
                    </div>

                    <!-- Contenido 2: Color de Pelaje (16 tonos vibrantes) -->
                    <div id="tab-content-pelaje" class="avatar-tab-content" style="display: none;">
                        <h4 style="margin-bottom: 0.8rem; color: #475569; font-size: 1.05rem;">Paleta de color de pelaje (16 tonos):</h4>
                        <div class="color-palette-grid">
                            <button class="color-btn" style="background: #ea580c;" title="Naranja Zorro" onclick="Avatar.setProperty('furColor', '#ea580c')"></button>
                            <button class="color-btn" style="background: #f59e0b;" title="Ámbar Dorado" onclick="Avatar.setProperty('furColor', '#f59e0b')"></button>
                            <button class="color-btn" style="background: #d97706;" title="Miel Canela" onclick="Avatar.setProperty('furColor', '#d97706')"></button>
                            <button class="color-btn" style="background: #78350f;" title="Marrón Bosque" onclick="Avatar.setProperty('furColor', '#78350f')"></button>
                            <button class="color-btn" style="background: #5c3826;" title="Castaño" onclick="Avatar.setProperty('furColor', '#5c3826')"></button>
                            <button class="color-btn" style="background: #382218;" title="Café Oscuro" onclick="Avatar.setProperty('furColor', '#382218')"></button>
                            <button class="color-btn" style="background: #0f172a;" title="Negro Azabache" onclick="Avatar.setProperty('furColor', '#0f172a')"></button>
                            <button class="color-btn" style="background: #334155;" title="Gris Pizarra" onclick="Avatar.setProperty('furColor', '#334155')"></button>
                            <button class="color-btn" style="background: #94a3b8;" title="Gris Plateado" onclick="Avatar.setProperty('furColor', '#94a3b8')"></button>
                            <button class="color-btn" style="background: #e2e8f0;" title="Blanco Nieve" onclick="Avatar.setProperty('furColor', '#e2e8f0')"></button>
                            <button class="color-btn" style="background: #fb7185;" title="Rosa Pastel" onclick="Avatar.setProperty('furColor', '#fb7185')"></button>
                            <button class="color-btn" style="background: #a855f7;" title="Lavanda Fantasía" onclick="Avatar.setProperty('furColor', '#a855f7')"></button>
                            <button class="color-btn" style="background: #3b82f6;" title="Azul Celeste" onclick="Avatar.setProperty('furColor', '#3b82f6')"></button>
                            <button class="color-btn" style="background: #10b981;" title="Verde Menta" onclick="Avatar.setProperty('furColor', '#10b981')"></button>
                            <button class="color-btn" style="background: #eab308;" title="Amarillo Brillante" onclick="Avatar.setProperty('furColor', '#eab308')"></button>
                            <button class="color-btn" style="background: #fcd5ce;" title="Melocotón Cálido" onclick="Avatar.setProperty('furColor', '#fcd5ce')"></button>
                        </div>
                    </div>

                    <!-- Contenido 3: Sombreros y Adornos de Cabeza -->
                    <div id="tab-content-sombreros" class="avatar-tab-content" style="display: none;">
                        <h4 style="margin-bottom: 0.8rem; color: #475569; font-size: 1.05rem;">Elige tu sombrero o accesorio para la cabeza:</h4>
                        <div class="asset-grid">
                            <button class="asset-choice-btn" onclick="Avatar.setProperty('hat', 'ninguno')">
                                <div style="width: 36px; height: 36px; display: flex; align-items: center; justify-content: center; color: #94a3b8;">
                                    <svg viewBox="0 0 24 24" width="28" height="28" stroke="currentColor" fill="none" stroke-width="2"><circle cx="12" cy="12" r="9"/><line x1="4.93" y1="4.93" x2="19.07" y2="19.07"/></svg>
                                </div>
                                <span>Sin Sombrero</span>
                            </button>
                            <button class="asset-choice-btn" onclick="Avatar.setProperty('hat', 'gorra')">
                                <span class="asset-tag" style="background: #dbeafe; color: #1d4ed8; padding: 0.2rem 0.6rem; border-radius: 8px; font-size: 0.75rem;">Deporte</span>
                                <span>Gorra Deportiva</span>
                            </button>
                            <button class="asset-choice-btn" onclick="Avatar.setProperty('hat', 'corona')">
                                <span class="asset-tag" style="background: #fef3c7; color: #d97706; padding: 0.2rem 0.6rem; border-radius: 8px; font-size: 0.75rem;">Realeza</span>
                                <span>Corona Real</span>
                            </button>
                            <button class="asset-choice-btn" onclick="Avatar.setProperty('hat', 'chistera')">
                                <span class="asset-tag" style="background: #e2e8f0; color: #0f172a; padding: 0.2rem 0.6rem; border-radius: 8px; font-size: 0.75rem;">Gala</span>
                                <span>Chistera Elegante</span>
                            </button>
                            <button class="asset-choice-btn" onclick="Avatar.setProperty('hat', 'brujo')">
                                <span class="asset-tag" style="background: #f3e8ff; color: #7e22ce; padding: 0.2rem 0.6rem; border-radius: 8px; font-size: 0.75rem;">Magia</span>
                                <span>Gorro Mágico</span>
                            </button>
                            <button class="asset-choice-btn" onclick="Avatar.setProperty('hat', 'laquitolazo')">
                                <span class="asset-tag" style="background: #fce7f3; color: #db2777; padding: 0.2rem 0.6rem; border-radius: 8px; font-size: 0.75rem;">Estilo</span>
                                <span>Lazo Coqueto</span>
                            </button>
                            <button class="asset-choice-btn" onclick="Avatar.setProperty('hat', 'auriculares')">
                                <span class="asset-tag" style="background: #ccfbf1; color: #0f766e; padding: 0.2rem 0.6rem; border-radius: 8px; font-size: 0.75rem;">Música</span>
                                <span>Auriculares</span>
                            </button>
                            <button class="asset-choice-btn" onclick="Avatar.setProperty('hat', 'pirata')">
                                <span class="asset-tag" style="background: #fee2e2; color: #b91c1c; padding: 0.2rem 0.6rem; border-radius: 8px; font-size: 0.75rem;">Aventura</span>
                                <span>Bicornio Pirata</span>
                            </button>
                            <button class="asset-choice-btn" onclick="Avatar.setProperty('hat', 'boina')">
                                <span class="asset-tag" style="background: #ede9fe; color: #6d28d9; padding: 0.2rem 0.6rem; border-radius: 8px; font-size: 0.75rem;">Arte</span>
                                <span>Boina Escolar</span>
                            </button>
                            <button class="asset-choice-btn" onclick="Avatar.setProperty('hat', 'flor')">
                                <span class="asset-tag" style="background: #ecfdf5; color: #047857; padding: 0.2rem 0.6rem; border-radius: 8px; font-size: 0.75rem;">Naturaleza</span>
                                <span>Flor Primaveral</span>
                            </button>
                        </div>
                    </div>

                    <!-- Contenido 4: Gafas y Rostro -->
                    <div id="tab-content-gafas" class="avatar-tab-content" style="display: none;">
                        <h4 style="margin-bottom: 0.8rem; color: #475569; font-size: 1.05rem;">Gafas y detalles faciales:</h4>
                        <div class="asset-grid">
                            <button class="asset-choice-btn" onclick="Avatar.setProperty('glasses', 'ninguno')">
                                <div style="width: 36px; height: 36px; display: flex; align-items: center; justify-content: center; color: #94a3b8;">
                                    <svg viewBox="0 0 24 24" width="28" height="28" stroke="currentColor" fill="none" stroke-width="2"><circle cx="12" cy="12" r="9"/><line x1="4.93" y1="4.93" x2="19.07" y2="19.07"/></svg>
                                </div>
                                <span>Sin Gafas</span>
                            </button>
                            <button class="asset-choice-btn" onclick="Avatar.setProperty('glasses', 'gafas_redondas')">
                                <span class="asset-tag" style="background: #e2e8f0; color: #334155; padding: 0.2rem 0.6rem; border-radius: 8px; font-size: 0.75rem;">Estudio</span>
                                <span>Gafas Sabias</span>
                            </button>
                            <button class="asset-choice-btn" onclick="Avatar.setProperty('glasses', 'gafas_sol')">
                                <span class="asset-tag" style="background: #0f172a; color: #ffffff; padding: 0.2rem 0.6rem; border-radius: 8px; font-size: 0.75rem;">Moderno</span>
                                <span>Gafas de Sol</span>
                            </button>
                            <button class="asset-choice-btn" onclick="Avatar.setProperty('glasses', 'monoculo')">
                                <span class="asset-tag" style="background: #fef3c7; color: #b45309; padding: 0.2rem 0.6rem; border-radius: 8px; font-size: 0.75rem;">Detective</span>
                                <span>Monóculo Fino</span>
                            </button>
                            <button class="asset-choice-btn" onclick="Avatar.setProperty('glasses', 'estrella')">
                                <span class="asset-tag" style="background: #fef9c3; color: #a16207; padding: 0.2rem 0.6rem; border-radius: 8px; font-size: 0.75rem;">Magia</span>
                                <span>Estrellas Mágicas</span>
                            </button>
                            <button class="asset-choice-btn" onclick="Avatar.setProperty('glasses', 'pecas')">
                                <span class="asset-tag" style="background: #fee2e2; color: #b91c1c; padding: 0.2rem 0.6rem; border-radius: 8px; font-size: 0.75rem;">Dulce</span>
                                <span>Pecas Tiernas</span>
                            </button>
                        </div>
                    </div>

                    <!-- Contenido 5: Cuello y Accesorios -->
                    <div id="tab-content-cuello" class="avatar-tab-content" style="display: none;">
                        <h4 style="margin-bottom: 0.8rem; color: #475569; font-size: 1.05rem;">Complementos de cuello y ropa:</h4>
                        <div class="asset-grid">
                            <button class="asset-choice-btn" onclick="Avatar.setProperty('collar', 'ninguno')">
                                <div style="width: 36px; height: 36px; display: flex; align-items: center; justify-content: center; color: #94a3b8;">
                                    <svg viewBox="0 0 24 24" width="28" height="28" stroke="currentColor" fill="none" stroke-width="2"><circle cx="12" cy="12" r="9"/><line x1="4.93" y1="4.93" x2="19.07" y2="19.07"/></svg>
                                </div>
                                <span>Sin Accesorio</span>
                            </button>
                            <button class="asset-choice-btn" onclick="Avatar.setProperty('collar', 'pajarita')">
                                <span class="asset-tag" style="background: #fee2e2; color: #dc2626; padding: 0.2rem 0.6rem; border-radius: 8px; font-size: 0.75rem;">Elegante</span>
                                <span>Pajarita Roja</span>
                            </button>
                            <button class="asset-choice-btn" onclick="Avatar.setProperty('collar', 'bufanda')">
                                <span class="asset-tag" style="background: #dbeafe; color: #2563eb; padding: 0.2rem 0.6rem; border-radius: 8px; font-size: 0.75rem;">Invierno</span>
                                <span>Bufanda Rayas</span>
                            </button>
                            <button class="asset-choice-btn" onclick="Avatar.setProperty('collar', 'bandana')">
                                <span class="asset-tag" style="background: #fef3c7; color: #d97706; padding: 0.2rem 0.6rem; border-radius: 8px; font-size: 0.75rem;">Explorador</span>
                                <span>Bandana Scout</span>
                            </button>
                            <button class="asset-choice-btn" onclick="Avatar.setProperty('collar', 'capa')">
                                <span class="asset-tag" style="background: #fee2e2; color: #b91c1c; padding: 0.2rem 0.6rem; border-radius: 8px; font-size: 0.75rem;">Héroe</span>
                                <span>Capa Heroica</span>
                            </button>
                            <button class="asset-choice-btn" onclick="Avatar.setProperty('collar', 'medalla')">
                                <span class="asset-tag" style="background: #fef9c3; color: #a16207; padding: 0.2rem 0.6rem; border-radius: 8px; font-size: 0.75rem;">Premio</span>
                                <span>Medalla de Oro</span>
                            </button>
                            <button class="asset-choice-btn" onclick="Avatar.setProperty('collar', 'corbata')">
                                <span class="asset-tag" style="background: #dbeafe; color: #1d4ed8; padding: 0.2rem 0.6rem; border-radius: 8px; font-size: 0.75rem;">Colegio</span>
                                <span>Corbata Escolar</span>
                            </button>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    </div>
    `;
}, () => {
    Avatar.initView();
});
