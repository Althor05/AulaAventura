// ============================================================================
// COPIA DE SEGURIDAD: RUTA /mapa VERSIÓN 3D RENDER NINTENDO OVERWORLD
// ============================================================================

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
                <div class="map-character-badge" style="display: flex; flex-direction: column; align-items: center; gap: 0.15rem; pointer-events: none; user-select: none; margin-right: 0.3rem;">
                    <img id="mapa-avatar-img" src="" alt="Mascota" style="width: 44px; height: 44px; object-fit: contain; filter: drop-shadow(0 3px 6px rgba(0,0,0,0.35)); display: block;">
                    <span id="mapa-nombre-personaje" style="font-size: 0.78rem; font-weight: 800; color: #ffffff; background: rgba(0,0,0,0.28); padding: 0.12rem 0.55rem; border-radius: 8px; border: 1px solid rgba(255,255,255,0.25); max-width: 95px; text-overflow: ellipsis; overflow: hidden; white-space: nowrap; line-height: 1.2; text-shadow: 0 1px 2px rgba(0,0,0,0.4);">
                        Aventurero
                    </span>
                </div>

                <div class="chuchelete-badge" style="background: rgba(255,255,255,0.18); border: 1.5px solid rgba(255,255,255,0.35); color: #ffffff; text-shadow: 0 1px 2px rgba(0,0,0,0.3); padding: 0.42rem 0.95rem; font-size: 0.95rem; border-radius: 14px;">
                    \${window.AppIcons ? window.AppIcons.chuchelete(22, 15) : ''}
                    <span><span id="mapa-chuches">0</span> Chucheletes</span>
                </div>
                <button class="top-bar-back-btn" onclick="Router.navigate('/seleccionar-curso')" title="Cambiar Curso">
                    \${window.AppIcons ? window.AppIcons.backArrow : ''} Cambiar Curso
                </button>
            </div>
        </header>

        <!-- Contenedor Principal del Mapa -->
        <div class="view-body" style="width: 100%; max-width: 1040px; margin: 0 auto; padding: 0.9rem 1.2rem 2.2rem 1.2rem; flex: 1; display: flex; flex-direction: column; justify-content: center; align-items: center;">
            
            <!-- Mundo de Aventura: El Archipiélago del Quijote (Render 3D) -->
            <div class="adventure-world-wrap">
                
                <!-- Nubes suaves flotantes -->
                <div class="adventure-cloud cloud-slow" style="top: 20px; left: 0;">
                    <svg width="150" height="52" viewBox="0 0 150 52" fill="none">
                        <path d="M 25 42 A 18 18 0 0 1 52 26 A 25 25 0 0 1 98 22 A 20 20 0 0 1 130 36 A 15 15 0 0 1 120 48 L 25 48 Z" fill="#ffffff" opacity="0.95"/>
                    </svg>
                </div>
                <div class="adventure-cloud cloud-fast" style="top: 75px; left: -120px;">
                    <svg width="180" height="60" viewBox="0 0 180 60" fill="none">
                        <path d="M 30 50 A 20 20 0 0 1 65 30 A 30 30 0 0 1 125 25 A 24 24 0 0 1 160 42 A 18 18 0 0 1 150 54 L 30 54 Z" fill="#ffffff" opacity="0.88"/>
                    </svg>
                </div>

                <!-- ========================================================
                     5 PINES INTERACTIVOS SOBRE LAS ZONAS 3D DEL MAPA
                     ======================================================== -->

                <!-- 1. CASTILLO DEL SABER (Arriba Izquierda - Matemáticas & Lógica) -->
                <div class="adventure-zone-node" style="top: 25%; left: 34%;" onclick="GameCore.startZone('castillo')" title="Entrar al Castillo del Saber">
                    <div class="zone-medallion zone-castillo">
                        <div class="zone-pulse-ring"></div>
                        <svg viewBox="0 0 24 24" fill="none" stroke="#ffffff" stroke-width="2.3" stroke-linecap="round" stroke-linejoin="round">
                            <path d="M2 20h20"/>
                            <path d="M4 20V4h4v3.5h2V4h4v3.5h2V4h4v16"/>
                            <path d="M9.5 20v-5a2.5 2.5 0 0 1 5 0v5"/>
                            <circle cx="12" cy="9" r="1.5" fill="#fde047"/>
                        </svg>
                    </div>
                    <div class="zone-info-card">
                        <span class="zone-subject-tag tag-castillo">MATES & LÓGICA</span>
                        <span class="zone-title">Castillo del Saber</span>
                        <span class="zone-reward-badge">\${window.AppIcons ? window.AppIcons.chuchelete(18, 12) : ''} +10 🍬</span>
                        <span class="zone-hover-cta">¡Jugar Reto! ➔</span>
                    </div>
                </div>

                <!-- 2. BOSQUE DE LAS PALABRAS (Arriba Derecha - Lengua Castellana) -->
                <div class="adventure-zone-node" style="top: 24%; left: 63%;" onclick="GameCore.startZone('bosque')" title="Entrar al Bosque de las Palabras">
                    <div class="zone-medallion zone-bosque">
                        <div class="zone-pulse-ring"></div>
                        <svg viewBox="0 0 24 24" fill="none" stroke="#ffffff" stroke-width="2.3" stroke-linecap="round" stroke-linejoin="round">
                            <path d="M5 21h14"/>
                            <path d="M12 21v-6"/>
                            <path d="M12 15l-3-3"/>
                            <path d="M12 15l3-3"/>
                            <path d="M7 16a4.5 4.5 0 0 1-3.5-4.4 4.5 4.5 0 0 1 4-4.4A5.5 5.5 0 0 1 12 2a5.5 5.5 0 0 1 4.5 5.2 4.5 4.5 0 0 1 4 4.4 4.5 4.5 0 0 1-3.5 4.4q-5 -1.5 -10 0z"/>
                        </svg>
                    </div>
                    <div class="zone-info-card">
                        <span class="zone-subject-tag tag-bosque">LENGUA & LETRAS</span>
                        <span class="zone-title">Bosque Palabras</span>
                        <span class="zone-reward-badge">\${window.AppIcons ? window.AppIcons.chuchelete(18, 12) : ''} +10 🍬</span>
                        <span class="zone-hover-cta">¡Jugar Reto! ➔</span>
                    </div>
                </div>

                <!-- 3. LABORATORIO DE INVENTOS (Centro Derecha - Ciencias de la Naturaleza) -->
                <div class="adventure-zone-node" style="top: 44%; left: 79%;" onclick="GameCore.startZone('laboratorio')" title="Entrar al Laboratorio de Inventos">
                    <div class="zone-medallion zone-laboratorio">
                        <div class="zone-pulse-ring"></div>
                        <svg viewBox="0 0 24 24" fill="none" stroke="#ffffff" stroke-width="2.3" stroke-linecap="round" stroke-linejoin="round">
                            <path d="M10 2v7.31M14 2v7.31M8.5 2h7M14 9.3l4.5 9A2 2 0 0 1 16.7 21H7.3a2 2 0 0 1-1.8-2.7l4.5-9"/>
                            <path d="M7 16h10"/>
                            <circle cx="12" cy="14" r="1.5" fill="#fef08a"/>
                        </svg>
                    </div>
                    <div class="zone-info-card">
                        <span class="zone-subject-tag tag-laboratorio">CIENCIAS & MUNDO</span>
                        <span class="zone-title">Laboratorio</span>
                        <span class="zone-reward-badge">\${window.AppIcons ? window.AppIcons.chuchelete(18, 12) : ''} +10 🍬</span>
                        <span class="zone-hover-cta">¡Jugar Reto! ➔</span>
                    </div>
                </div>

                <!-- 4. BIBLIOTECA DE DON QUIJOTE (Abajo Derecha - Molinos de Viento / Lectura) -->
                <div class="adventure-zone-node" style="top: 76%; left: 74%;" onclick="GameCore.startZone('biblioteca')" title="Entrar a la Biblioteca de Don Quijote">
                    <div class="zone-medallion zone-biblioteca">
                        <div class="zone-pulse-ring"></div>
                        <svg viewBox="0 0 24 24" fill="none" stroke="#ffffff" stroke-width="2.3" stroke-linecap="round" stroke-linejoin="round">
                            <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/>
                            <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/>
                            <line x1="8" y1="7" x2="16" y2="7"/>
                            <line x1="8" y1="11" x2="14" y2="11"/>
                        </svg>
                    </div>
                    <div class="zone-info-card">
                        <span class="zone-subject-tag tag-biblioteca">LECTURA & SOCIALES</span>
                        <span class="zone-title">Biblioteca Quijote</span>
                        <span class="zone-reward-badge">\${window.AppIcons ? window.AppIcons.chuchelete(18, 12) : ''} +10 🍬</span>
                        <span class="zone-hover-cta">¡Jugar Reto! ➔</span>
                    </div>
                </div>

                <!-- 5. TALLER CREATIVO (Abajo Izquierda - Casa de Arte y Arcoíris) -->
                <div class="adventure-zone-node" style="top: 63%; left: 28%;" onclick="GameCore.startZone('taller')" title="Entrar al Taller Creativo">
                    <div class="zone-medallion zone-taller">
                        <div class="zone-pulse-ring"></div>
                        <svg viewBox="0 0 24 24" fill="none" stroke="#ffffff" stroke-width="2.3" stroke-linecap="round" stroke-linejoin="round">
                            <circle cx="13.5" cy="6.5" r="1.5" fill="#fde047"/>
                            <circle cx="17.5" cy="10.5" r="1.5" fill="#38bdf8"/>
                            <circle cx="8.5" cy="7.5" r="1.5" fill="#4ade80"/>
                            <circle cx="6.5" cy="12.5" r="1.5" fill="#ffffff"/>
                            <path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10c.926 0 1.648-.746 1.648-1.688 0-.437-.18-.835-.437-1.125-.29-.289-.438-.652-.438-1.125a1.64 1.64 0 0 1 1.668-1.668h1.996c3.051 0 5.555-2.503 5.555-5.554C21.965 6.012 17.461 2 12 2z"/>
                        </svg>
                    </div>
                    <div class="zone-info-card">
                        <span class="zone-subject-tag tag-taller">ARTE & CREATIVIDAD</span>
                        <span class="zone-title">Taller Creativo</span>
                        <span class="zone-reward-badge">\${window.AppIcons ? window.AppIcons.chuchelete(18, 12) : ''} +10 🍬</span>
                        <span class="zone-hover-cta">¡Jugar Reto! ➔</span>
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
        mapImg.onerror = () => { mapImg.src = `assets/Nueva carpeta (2)/\${avatarData.file}`; };
    }
    if (window.updateFullscreenButtons) window.updateFullscreenButtons();
});
