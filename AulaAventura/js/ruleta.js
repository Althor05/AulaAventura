/**
 * Aula Aventura - Ruleta del Saber (CEIP Don Quijote)
 * Desplegable lateral con física fluida y textos siempre horizontales (estilo RuleTínez)
 */

window.RuletaSaber = {
    isOpen: false,
    isSpinning: false,
    currentAngle: 0,
    animFrameId: null,
    lastSector: -1,
    lastTickTime: 0,
    canvas: null,
    ctx: null,
    audioCtx: null,
    bulbBlinkCounter: 0,

    // Las 5 Zonas del Saber de Aula Aventura con colores alegres e infantiles
    defaultZonas: [
        { id: 'castillo', name: 'Castillo', fullName: 'Castillo del Saber', icon: '🏰', area: 'Matemáticas', color: '#9333ea', lightColor: '#c084fc', darkColor: '#7e22ce' },
        { id: 'bosque', name: 'Bosque', fullName: 'Bosque de Palabras', icon: '🌳', area: 'Lengua', color: '#10b981', lightColor: '#6ee7b7', darkColor: '#059669' },
        { id: 'laboratorio', name: 'Laboratorio', fullName: 'Laboratorio', icon: '🧪', area: 'Ciencias', color: '#0284c7', lightColor: '#38bdf8', darkColor: '#0369a1' },
        { id: 'biblioteca', name: 'Biblioteca', fullName: 'Biblioteca Quijote', icon: '📚', area: 'Sociales', color: '#f59e0b', lightColor: '#fde047', darkColor: '#d97706' },
        { id: 'taller', name: 'Taller', fullName: 'Taller Creativo', icon: '🎨', area: 'Arte', color: '#f43f5e', lightColor: '#fda4af', darkColor: '#e11d48' }
    ],

    init() {
        this.canvas = document.getElementById('ruleta-canvas');
        if (!this.canvas) return;
        this.ctx = this.canvas.getContext('2d');
        if (!this.zonePaths && typeof Path2D !== 'undefined') {
            this.zonePaths = {
                castillo: new Path2D("M2 20h20 M4 20V4h4v3.5h2V4h4v3.5h2V4h4v16 M9.5 20v-5a2.5 2.5 0 0 1 5 0v5 M7 11v3 M17 11v3"),
                bosque: new Path2D("M5 21h14 M12 21v-6 M12 15l-3-3 M12 15l3-3 M7 16a4.5 4.5 0 0 1-3.5-4.4 4.5 4.5 0 0 1 4-4.4A5.5 5.5 0 0 1 12 2a5.5 5.5 0 0 1 4.5 5.2 4.5 4.5 0 0 1 4 4.4 4.5 4.5 0 0 1-3.5 4.4q-5 -1.5 -10 0z"),
                laboratorio: new Path2D("M10 2v7.31M14 2v7.31M8.5 2h7M14 9.3l4.5 9A2 2 0 0 1 16.7 21H7.3a2 2 0 0 1-1.8-2.7l4.5-9 M7 16h10"),
                biblioteca: new Path2D("M4 19.5A2.5 2.5 0 0 1 6.5 17H20 M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z M8 7h8 M8 11h6"),
                taller: new Path2D("M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10c.926 0 1.648-.746 1.648-1.688 0-.437-.18-.835-.437-1.125-.29-.289-.438-.652-.438-1.125a1.64 1.64 0 0 1 1.668-1.668h1.996c3.051 0 5.555-2.503 5.555-5.554C21.965 6.012 17.461 2 12 2z")
            };
        }
        this.drawWheel();
    },

    drawZoneSvgIcon(ctx, zoneId, cx, cy, size = 26) {
        if (!this.zonePaths && typeof Path2D !== 'undefined') {
            this.init();
        }
        const path = this.zonePaths && this.zonePaths[zoneId];
        if (!path) return;

        ctx.save();
        ctx.translate(cx - size / 2, cy - size / 2);
        const scale = size / 24;
        ctx.scale(scale, scale);
        ctx.lineCap = 'round';
        ctx.lineJoin = 'round';

        // Sombra de contraste para visibilidad sobre cualquier color
        ctx.strokeStyle = 'rgba(0, 0, 0, 0.45)';
        ctx.lineWidth = 3.6;
        ctx.stroke(path);

        // Trazo principal blanco nítido
        ctx.strokeStyle = '#ffffff';
        ctx.lineWidth = 2.1;
        ctx.stroke(path);

        // Puntos de pintura en el caso de Taller
        if (zoneId === 'taller') {
            ctx.fillStyle = '#ffffff';
            ctx.beginPath();
            ctx.arc(13.5, 6.5, 0.9, 0, Math.PI * 2);
            ctx.arc(17.5, 10.5, 0.9, 0, Math.PI * 2);
            ctx.arc(8.5, 7.5, 0.9, 0, Math.PI * 2);
            ctx.arc(6.5, 12.5, 0.9, 0, Math.PI * 2);
            ctx.fill();
        }

        ctx.restore();
    },

    toggle() {
        if (this.isOpen) {
            this.close();
        } else {
            this.open();
        }
    },

    open() {
        const drawer = document.getElementById('ruleta-drawer');
        const overlay = document.getElementById('ruleta-overlay');
        const sideTab = document.getElementById('btn-side-ruleta');

        if (drawer) drawer.classList.add('open');
        if (overlay) overlay.classList.add('open');
        if (sideTab) sideTab.classList.add('docked-hidden');

        this.isOpen = true;
        this.init();
    },

    close() {
        if (this.isSpinning) return; // No cerrar durante el giro

        const drawer = document.getElementById('ruleta-drawer');
        const overlay = document.getElementById('ruleta-overlay');
        const sideTab = document.getElementById('btn-side-ruleta');

        if (drawer) drawer.classList.remove('open');
        if (overlay) overlay.classList.remove('open');
        if (sideTab) sideTab.classList.remove('docked-hidden');

        this.isOpen = false;
    },

    // Audio Context compartido de alto rendimiento (sin bloqueos de hilo)
    getAudioContext() {
        if (!this.audioCtx) {
            const AudioCtor = window.AudioContext || window.webkitAudioContext;
            if (AudioCtor) this.audioCtx = new AudioCtor();
        }
        if (this.audioCtx && this.audioCtx.state === 'suspended') {
            this.audioCtx.resume();
        }
        return this.audioCtx;
    },

    playTickSound() {
        try {
            const vol = (window.AppState && AppState.settings && AppState.settings.volume !== undefined)
                ? AppState.settings.volume
                : (window.AppState && AppState.settings && AppState.settings.soundEnabled === false ? 0 : 80);
            if (vol <= 0) return;

            const ctx = this.getAudioContext();
            if (!ctx) return;

            const now = ctx.currentTime;
            const osc = ctx.createOscillator();
            const gain = ctx.createGain();

            osc.type = 'triangle';
            osc.frequency.setValueAtTime(650, now);
            osc.frequency.exponentialRampToValueAtTime(200, now + 0.035);

            gain.gain.setValueAtTime(0.12 * (vol / 100), now);
            gain.gain.exponentialRampToValueAtTime(0.001, now + 0.035);

            osc.connect(gain);
            gain.connect(ctx.destination);

            osc.start(now);
            osc.stop(now + 0.036);
        } catch (e) {
            // Silenciar si hay políticas de autoplay
        }
    },

    drawWheel() {
        if (!this.canvas) this.canvas = document.getElementById('ruleta-canvas');
        if (!this.canvas) return;
        if (!this.ctx) this.ctx = this.canvas.getContext('2d');

        const canvas = this.canvas;
        const ctx = this.ctx;
        const dpr = window.devicePixelRatio || 1;
        const size = 350;

        if (canvas.width !== size * dpr || canvas.height !== size * dpr) {
            canvas.width = size * dpr;
            canvas.height = size * dpr;
            canvas.style.width = size + 'px';
            canvas.style.height = size + 'px';
        }

        ctx.save();
        ctx.scale(dpr, dpr);
        ctx.clearRect(0, 0, size, size);

        const cx = size / 2;
        const cy = size / 2;
        const outerRadius = 154;
        const rimWidth = 14;

        // 1. Sombra exterior estática suave
        ctx.beginPath();
        ctx.arc(cx, cy + 4, outerRadius + rimWidth, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(15, 23, 42, 0.15)';
        ctx.fill();

        // 2. Aro exterior estilo feria infantil dorado
        const rimGrad = ctx.createLinearGradient(cx - outerRadius, cy - outerRadius, cx + outerRadius, cy + outerRadius);
        rimGrad.addColorStop(0, '#fef08a');
        rimGrad.addColorStop(0.3, '#f59e0b');
        rimGrad.addColorStop(0.7, '#fbbf24');
        rimGrad.addColorStop(1, '#ea580c');

        ctx.beginPath();
        ctx.arc(cx, cy, outerRadius + rimWidth, 0, Math.PI * 2);
        ctx.fillStyle = rimGrad;
        ctx.fill();

        ctx.beginPath();
        ctx.arc(cx, cy, outerRadius + rimWidth, 0, Math.PI * 2);
        ctx.strokeStyle = '#c2410c';
        ctx.lineWidth = 2.5;
        ctx.stroke();

        // 3. Sectores de las 5 Zonas
        const numOptions = this.defaultZonas.length;
        const degPerOption = 360 / numOptions;
        const radPerOption = (2 * Math.PI) / numOptions;

        for (let i = 0; i < numOptions; i++) {
            const opt = this.defaultZonas[i];
            const startDeg = (this.currentAngle + i * degPerOption);
            const startRad = (startDeg * Math.PI) / 180;
            const endRad = startRad + radPerOption;

            ctx.beginPath();
            ctx.moveTo(cx, cy);
            ctx.arc(cx, cy, outerRadius, startRad, endRad);
            ctx.closePath();

            // Relleno degradado radial vibrante
            const secGrad = ctx.createRadialGradient(cx, cy, 20, cx, cy, outerRadius);
            secGrad.addColorStop(0, opt.lightColor || opt.color);
            secGrad.addColorStop(0.35, opt.color);
            secGrad.addColorStop(1, opt.darkColor || opt.color);

            ctx.fillStyle = secGrad;
            ctx.fill();

            // Separador blanco nítido
            ctx.strokeStyle = '#ffffff';
            ctx.lineWidth = 3.5;
            ctx.stroke();
        }

        // 4. TEXTOS E ICONOS TOTALMENTE HORIZONTALES (ESTILO RULETÍNEZ ORIGINAL)
        // Las letras quedan derechas (sin girar su ángulo) y se desplazan con su sector
        const textRadius = 96;
        for (let i = 0; i < numOptions; i++) {
            const opt = this.defaultZonas[i];
            const startDeg = (this.currentAngle + i * degPerOption);
            const midDeg = startDeg + degPerOption / 2;
            const midRad = (midDeg * Math.PI) / 180;

            const xPos = cx + textRadius * Math.cos(midRad);
            const yPos = cy + textRadius * Math.sin(midRad);

            ctx.save();
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';

            // Icono oficial SVG de la zona (arriba del texto)
            this.drawZoneSvgIcon(ctx, opt.id, xPos, yPos - 12, 28);

            // Nombre de la zona (abajo del icono) siempre horizontal
            ctx.font = '900 13px "Fredoka", "Quicksand", "Segoe UI", sans-serif';
            ctx.lineJoin = 'round';
            ctx.strokeStyle = 'rgba(0, 0, 0, 0.45)';
            ctx.lineWidth = 3;
            ctx.strokeText(opt.name, xPos, yPos + 13);

            ctx.fillStyle = '#ffffff';
            ctx.fillText(opt.name, xPos, yPos + 13);

            ctx.restore();
        }

        // 5. Bombillas brillantes alrededor del aro exterior
        const numBulbs = 15;
        this.bulbBlinkCounter++;
        for (let b = 0; b < numBulbs; b++) {
            const bulbAngle = (b * (360 / numBulbs) * Math.PI) / 180;
            const bx = cx + (outerRadius + rimWidth / 2) * Math.cos(bulbAngle);
            const by = cy + (outerRadius + rimWidth / 2) * Math.sin(bulbAngle);

            const isLit = this.isSpinning ? ((b + Math.floor(this.bulbBlinkCounter / 4)) % 2 === 0) : true;

            ctx.beginPath();
            ctx.arc(bx, by, 3.8, 0, Math.PI * 2);
            ctx.fillStyle = isLit ? '#ffffff' : '#fde047';
            ctx.fill();

            ctx.strokeStyle = isLit ? '#f59e0b' : '#b45309';
            ctx.lineWidth = 1.2;
            ctx.stroke();
        }

        // 6. Centro minimalista y pequeño (no tapa nada)
        ctx.beginPath();
        ctx.arc(cx, cy, 17, 0, Math.PI * 2);
        ctx.fillStyle = '#ffffff';
        ctx.fill();
        ctx.strokeStyle = '#fef08a';
        ctx.lineWidth = 2.5;
        ctx.stroke();

        const centerGrad = ctx.createRadialGradient(cx - 2, cy - 2, 1, cx, cy, 11);
        centerGrad.addColorStop(0, '#ffffff');
        centerGrad.addColorStop(0.5, '#fde68a');
        centerGrad.addColorStop(1, '#f59e0b');

        ctx.beginPath();
        ctx.arc(cx, cy, 11, 0, Math.PI * 2);
        ctx.fillStyle = centerGrad;
        ctx.fill();

        // 7. Flecha indicadora superior (Top Pointer a las 12 en punto)
        const ptrWidth = 16;
        const ptrYTop = 4;
        const ptrYTip = 34;

        ctx.beginPath();
        ctx.moveTo(cx - ptrWidth, ptrYTop);
        ctx.lineTo(cx + ptrWidth, ptrYTop);
        ctx.lineTo(cx, ptrYTip);
        ctx.closePath();

        const ptrGrad = ctx.createLinearGradient(cx - ptrWidth, ptrYTop, cx + ptrWidth, ptrYTip);
        ptrGrad.addColorStop(0, '#ef4444');
        ptrGrad.addColorStop(0.5, '#dc2626');
        ptrGrad.addColorStop(1, '#991b1b');

        ctx.fillStyle = ptrGrad;
        ctx.fill();

        ctx.strokeStyle = '#ffffff';
        ctx.lineWidth = 2.5;
        ctx.stroke();

        ctx.restore();
    },

    spin() {
        if (this.isSpinning) return;

        this.isSpinning = true;

        const btnSpin = document.getElementById('btn-spin-ruleta');
        if (btnSpin) btnSpin.disabled = true;

        // Física suave con curva de desaceleración temporal (quartic ease-out)
        // Garantiza giro 100% fluido a 60fps sin tirones ni trompicones
        const startAngle = this.currentAngle;
        const fullTurns = 5 + Math.floor(Math.random() * 3); // entre 5 y 7 vueltas completas
        const randomTargetAngle = Math.random() * 360;
        const totalRotation = fullTurns * 360 + randomTargetAngle;
        const duration = 4000; // 4.0 segundos de emoción fluida
        const startTime = performance.now();

        this.lastSector = -1;
        this.lastTickTime = 0;

        const animStep = (now) => {
            const elapsed = now - startTime;
            const p = Math.min(1, elapsed / duration);

            // Easing cuártico suave: arranca con dinamismo y frena de manera progresiva
            const ease = 1 - Math.pow(1 - p, 3.8);

            this.currentAngle = (startAngle + totalRotation * ease) % 360;
            this.drawWheel();

            // Sonido tick al cambiar de sector (con límite de frecuencia para fluidez)
            const degPerOption = 360 / this.defaultZonas.length;
            const relAngle = ((270 - this.currentAngle) % 360 + 360) % 360;
            const curSector = Math.floor(relAngle / degPerOption);

            if (curSector !== this.lastSector) {
                this.lastSector = curSector;
                if (now - this.lastTickTime > 40) {
                    this.playTickSound();
                    this.lastTickTime = now;
                }
            }

            if (p < 1) {
                this.animFrameId = requestAnimationFrame(animStep);
            } else {
                this.isSpinning = false;
                if (btnSpin) btnSpin.disabled = false;
                this.determineWinner();
            }
        };

        this.animFrameId = requestAnimationFrame(animStep);
    },

    determineWinner() {
        // Sonido de victoria
        if (window.Activities && window.Activities.playSound) {
            Activities.playSound('success');
        }

        // Confeti animado festivo dentro del drawer
        this.triggerConfetti();
    },

    triggerConfetti() {
        const drawer = document.getElementById('ruleta-drawer');
        if (!drawer) return;

        let container = drawer.querySelector('.ruleta-confetti-stage');
        if (!container) {
            container = document.createElement('div');
            container.className = 'ruleta-confetti-stage';
            drawer.appendChild(container);
        }

        const colors = ['#f59e0b', '#10b981', '#3b82f6', '#ec4899', '#8b5cf6', '#ef4444', '#06b6d4'];
        const numPieces = 35;

        for (let i = 0; i < numPieces; i++) {
            const piece = document.createElement('div');
            piece.className = 'ruleta-confetti-particle';
            piece.style.left = (Math.random() * 80 + 10) + '%';
            piece.style.top = (Math.random() * 40 + 15) + '%';
            piece.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
            piece.style.animationDelay = (Math.random() * 0.3) + 's';
            piece.style.transform = `rotate(${Math.random() * 360}deg)`;

            container.appendChild(piece);

            setTimeout(() => {
                if (piece.parentNode) piece.parentNode.removeChild(piece);
            }, 2400);
        }
    }
};
