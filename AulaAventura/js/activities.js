window.Activities = {
    render(actividad, containerId, onComplete) {
        const container = document.getElementById(containerId);
        if (!container) return;
        
        container.innerHTML = '';
        container.style.opacity = '1';
        container.style.transform = 'scale(1)';

        if (actividad.tipo === 'burbujas') {
            this.renderBurbujas(actividad, container, onComplete);
        } else if (actividad.tipo === 'letra_perdida') {
            this.renderLetraPerdida(actividad, container, onComplete);
        } else if (actividad.tipo === 'ordenar_silabas') {
            this.renderOrdenarSilabas(actividad, container, onComplete);
        } else if (actividad.tipo === 'memory') {
            this.renderMemory(actividad, container, onComplete);
        } else if (actividad.tipo === 'contar_frutas') {
            this.renderContarFrutas(actividad, container, onComplete);
        } else if (actividad.tipo === 'balanza') {
            this.renderBalanza(actividad, container, onComplete);
        } else if (actividad.tipo === 'ordenar_numeros') {
            this.renderOrdenarNumeros(actividad, container, onComplete);
        } else if (actividad.tipo === 'adivinanza_numeros') {
            this.renderAdivinanzaNumeros(actividad, container, onComplete);
        } else if (actividad.tipo === 'dados') {
            this.renderDados(actividad, container, onComplete);
        } else if (actividad.tipo === 'reciclaje') {
            this.renderReciclaje(actividad, container, onComplete);
        } else if (actividad.tipo === 'habitats' || actividad.tipo === 'donde_vive') {
            this.renderHabitats(actividad, container, onComplete);
        } else if (actividad.tipo === 'seguridad_vial') {
            this.renderSeguridadVial(actividad, container, onComplete);
        } else {
            this.renderStandard(actividad, container, onComplete);
        }
    },

    renderBurbujas(actividad, container, onComplete) {
        container.innerHTML = '';
        container.style.position = 'relative';
        container.style.width = '100%';
        container.style.height = '100%';
        container.style.overflow = 'hidden';

        let currentRound = 1;
        const totalRounds = 3;
        let roundTimeLeft = 20;
        let timerInterval = null;
        let spawnInterval = null;
        let roundPopped = 0;
        let totalPopped = 0;
        let isTransitioning = false;

        // HUD flotante con color vivo y contraste de alta visibilidad
        const hud = document.createElement('div');
        hud.style.position = 'absolute';
        hud.style.top = '18px';
        hud.style.left = '50%';
        hud.style.transform = 'translateX(-50%)';
        hud.style.zIndex = '50';
        hud.style.background = 'linear-gradient(135deg, #1e3a8a 0%, #0284c7 100%)';
        hud.style.padding = '0.65rem 2.2rem';
        hud.style.borderRadius = '9999px';
        hud.style.boxShadow = '0 10px 25px rgba(2, 132, 199, 0.35)';
        hud.style.border = '2.5px solid #ffffff';
        hud.style.display = 'flex';
        hud.style.alignItems = 'center';
        hud.style.gap = '1.4rem';
        hud.style.whiteSpace = 'nowrap';
        hud.style.width = 'max-content';
        hud.style.maxWidth = '92vw';
        hud.style.boxSizing = 'border-box';

        hud.innerHTML = `
            <div style="display: flex; align-items: center; gap: 0.6rem; font-size: 1.15rem; white-space: nowrap; font-weight: 900; color: #ffffff; text-shadow: 0 1px 3px rgba(0,0,0,0.35);">
                <span>¡Lluvia de Palabras!</span>
            </div>
            <div id="burbujas-round-badge" style="background: rgba(255, 255, 255, 0.22); color: #ffffff; font-weight: 900; font-size: 1.05rem; padding: 0.35rem 1rem; border-radius: 9999px; border: 1.5px solid rgba(255, 255, 255, 0.45); text-shadow: 0 1px 2px rgba(0,0,0,0.3);">
                Ronda 1 / 3
            </div>
            <div id="burbujas-timer-badge" style="background: rgba(245, 158, 11, 0.28); color: #fef08a; font-weight: 900; font-size: 1.15rem; padding: 0.35rem 1.1rem; border-radius: 9999px; border: 1.5px solid #fef08a; text-shadow: 0 1px 2px rgba(0,0,0,0.3); min-width: 65px; text-align: center;">
                ⏱️ 20s
            </div>
            <div style="background: rgba(255, 255, 255, 0.22); color: #fef08a; font-weight: 900; font-size: 1.05rem; padding: 0.35rem 1rem; border-radius: 9999px; border: 1.5px solid rgba(255, 255, 255, 0.45); text-shadow: 0 1px 2px rgba(0,0,0,0.3);">
                ⭐ Atrapadas: <span id="burbujas-counter" style="color: #ffffff;">0</span>
            </div>
        `;
        container.appendChild(hud);

        // Escenario a pantalla completa para las burbujas
        const stage = document.createElement('div');
        stage.style.position = 'absolute';
        stage.style.inset = '0';
        stage.style.width = '100%';
        stage.style.height = '100%';
        stage.style.overflow = 'hidden';
        stage.style.background = 'radial-gradient(ellipse at 50% 90%, #e0f2fe 0%, #f0fdf4 40%, #ffffff 100%)';
        container.appendChild(stage);

        const roundBadgeEl = hud.querySelector('#burbujas-round-badge');
        const timerBadgeEl = hud.querySelector('#burbujas-timer-badge');
        const counterEl = hud.querySelector('#burbujas-counter');

        // Modal / Banner de transición entre rondas
        const roundOverlay = document.createElement('div');
        roundOverlay.style.position = 'absolute';
        roundOverlay.style.inset = '0';
        roundOverlay.style.zIndex = '100';
        roundOverlay.style.background = 'radial-gradient(ellipse at center, rgba(15, 23, 42, 0.88) 0%, rgba(15, 23, 42, 0.96) 100%)';
        roundOverlay.style.backdropFilter = 'blur(8px)';
        roundOverlay.style.display = 'none';
        roundOverlay.style.alignItems = 'center';
        roundOverlay.style.justifyContent = 'center';
        roundOverlay.style.flexDirection = 'column';
        roundOverlay.style.gap = '1.5rem';
        roundOverlay.style.padding = '2rem';
        roundOverlay.style.boxSizing = 'border-box';
        roundOverlay.style.textAlign = 'center';
        roundOverlay.style.color = '#ffffff';
        container.appendChild(roundOverlay);

        const getWordsForRound = (rNum) => {
            const pairs = (window.LanguageBank && window.LanguageBank.bubbleWordPairs) || [];
            if (pairs.length > 0) {
                // Seleccionar 30 parejas completamente aleatorias y diversas de todo el diccionario global
                const shuffledPairs = [...pairs].sort(() => Math.random() - 0.5).slice(0, 30);
                // Garantizar 50% de palabras correctas y 50% incorrectas de manera perfectamente equilibrada
                const items = [];
                for (let i = 0; i < 15; i++) {
                    const p1 = shuffledPairs[i * 2];
                    const p2 = shuffledPairs[i * 2 + 1];
                    const pair = [
                        { text: p1[0], correct: true },
                        { text: p2[1], correct: false }
                    ].sort(() => Math.random() - 0.5);
                    items.push(pair[0], pair[1]);
                }
                return {
                    items: items,
                    correctas: shuffledPairs.map(p => p[0]),
                    incorrectas: shuffledPairs.map(p => p[1])
                };
            }
            if (actividad.rondas && actividad.rondas[rNum - 1]) {
                const rData = actividad.rondas[rNum - 1];
                const pool = [];
                const len = Math.min((rData.correctas || []).length, (rData.incorrectas || []).length);
                for (let i = 0; i < len; i += 2) {
                    const pair = [
                        { text: rData.correctas[i], correct: true },
                        { text: rData.incorrectas[i], correct: false }
                    ].sort(() => Math.random() - 0.5);
                    pool.push(pair[0], pair[1]);
                }
                return {
                    items: pool,
                    correctas: rData.correctas,
                    incorrectas: rData.incorrectas
                };
            }
            return {
                items: [
                    { text: 'Sol', correct: true }, { text: 'Zol', correct: false },
                    { text: 'Mano', correct: true }, { text: 'Namo', correct: false }
                ],
                correctas: ['Sol', 'Mano'],
                incorrectas: ['Zol', 'Namo']
            };
        };

        const spawnBubble = (palabra, esCorrecta, startY = null) => {
            if (!document.body.contains(stage) || isTransitioning) return;

            const bubble = document.createElement('div');
            bubble.textContent = palabra;
            bubble.style.position = 'absolute';
            bubble.style.top = '0px';
            bubble.style.left = (Math.random() * 65 + 12) + '%';
            bubble.style.padding = '18px 30px';
            bubble.style.minWidth = '130px';
            bubble.style.height = '120px';
            bubble.style.borderRadius = '50%';
            bubble.style.display = 'flex';
            bubble.style.alignItems = 'center';
            bubble.style.justifyContent = 'center';
            bubble.style.background = 'radial-gradient(circle at 35% 28%, rgba(255,255,255,0.98) 0%, rgba(186, 230, 253, 0.85) 45%, rgba(56, 189, 248, 0.75) 100%)';
            bubble.style.border = '2.5px solid rgba(255, 255, 255, 0.9)';
            bubble.style.color = '#0369a1';
            bubble.style.fontWeight = '900';
            bubble.style.fontSize = '1.45rem';
            bubble.style.cursor = 'pointer';
            bubble.style.boxShadow = '0 10px 25px rgba(2, 132, 199, 0.22), inset 0 0 16px rgba(255,255,255,0.85), inset -4px -6px 12px rgba(2, 132, 199, 0.25)';
            bubble.style.userSelect = 'none';
            bubble.style.touchAction = 'manipulation';
            bubble.style.zIndex = '10';

            const stageHeight = stage.clientHeight || window.innerHeight || 600;
            const startTop = startY !== null ? startY : -140;
            const remainingDist = (stageHeight + 150) - startTop;
            const totalDist = stageHeight + 290;
            const baseDuration = Math.random() * 2500 + 12000;
            const adjustedDuration = baseDuration * (remainingDist / totalDist);

            const sway = 22 + Math.random() * 10;
            const dir = Math.random() > 0.5 ? 1 : -1;

            const anim = bubble.animate([
                { transform: `translate(0px, ${startTop}px) rotate(0deg) scale(1, 1)`, opacity: startY !== null ? 1 : 0.2 },
                { transform: `translate(${dir * sway * 0.5}px, ${startTop + remainingDist * 0.15}px) rotate(${dir * 1.5}deg) scale(0.98, 1.02)`, opacity: 1, offset: 0.15 },
                { transform: `translate(${dir * sway}px, ${startTop + remainingDist * 0.35}px) rotate(${dir * 2}deg) scale(1.02, 0.98)`, opacity: 1, offset: 0.35 },
                { transform: `translate(0px, ${startTop + remainingDist * 0.55}px) rotate(0deg) scale(0.99, 1.01)`, opacity: 1, offset: 0.55 },
                { transform: `translate(${-dir * sway}px, ${startTop + remainingDist * 0.75}px) rotate(${-dir * 2}deg) scale(1.02, 0.98)`, opacity: 1, offset: 0.75 },
                { transform: `translate(${-dir * sway * 0.4}px, ${startTop + remainingDist * 0.9}px) rotate(${-dir * 1}deg) scale(1, 1)`, opacity: 0.95, offset: 0.9 },
                { transform: `translate(0px, ${stageHeight + 150}px) rotate(0deg) scale(1.03, 0.97)`, opacity: 0.8 }
            ], {
                duration: adjustedDuration,
                easing: 'cubic-bezier(0.4, 0, 0.6, 1)',
                fill: 'forwards'
            });

            const handlePop = (e) => {
                e.stopPropagation();
                if (bubble.dataset.popped || isTransitioning) return;

                if (esCorrecta) {
                    bubble.dataset.popped = 'true';
                    anim.pause();
                    bubble.style.pointerEvents = 'none';
                    bubble.style.background = 'radial-gradient(circle at 35% 35%, #ffffff 0%, #34d399 50%, #10b981 100%)';
                    bubble.style.color = '#ffffff';
                    bubble.style.borderColor = '#059669';
                    bubble.style.transform = 'scale(1.35)';
                    bubble.style.boxShadow = '0 0 35px rgba(16, 185, 129, 0.6)';
                    bubble.style.transition = 'all 0.2s cubic-bezier(0.16, 1, 0.3, 1)';
                    
                    roundPopped++;
                    totalPopped++;
                    if (counterEl) counterEl.textContent = totalPopped;
                    if (AppState.settings.soundEnabled) this.playSound('success');

                    setTimeout(() => {
                        bubble.style.opacity = '0';
                        setTimeout(() => { if (bubble.parentElement) bubble.remove(); }, 200);
                    }, 250);
                } else {
                    bubble.style.background = 'radial-gradient(circle at 35% 35%, #ffffff 0%, #f87171 50%, #ef4444 100%)';
                    bubble.style.color = '#ffffff';
                    bubble.style.borderColor = '#dc2626';
                    bubble.style.animation = 'shake 0.4s';
                    if (AppState.settings.soundEnabled) this.playSound('error');
                    setTimeout(() => {
                        bubble.style.background = 'radial-gradient(circle at 35% 28%, rgba(255,255,255,0.98) 0%, rgba(186, 230, 253, 0.85) 45%, rgba(56, 189, 248, 0.75) 100%)';
                        bubble.style.color = '#0369a1';
                        bubble.style.borderColor = 'rgba(255, 255, 255, 0.9)';
                        bubble.style.animation = '';
                    }, 500);
                }
            };

            bubble.onpointerdown = handlePop;
            bubble.onclick = handlePop;
            stage.appendChild(bubble);

            setTimeout(() => {
                if (bubble.parentElement) bubble.remove();
            }, adjustedDuration + 300);
        };

        const startRound = (rNum) => {
            isTransitioning = false;
            roundPopped = 0;
            roundTimeLeft = 20;

            if (roundBadgeEl) roundBadgeEl.textContent = `Ronda ${rNum} / ${totalRounds}`;
            if (timerBadgeEl) {
                timerBadgeEl.textContent = `⏱️ ${roundTimeLeft}s`;
                timerBadgeEl.style.background = 'rgba(245, 158, 11, 0.28)';
                timerBadgeEl.style.color = '#fef08a';
                timerBadgeEl.style.borderColor = '#fef08a';
            }

            stage.innerHTML = '';

            const roundData = getWordsForRound(rNum);
            const roundItems = roundData.items || [];

            // Spawn inicial de burbujas con 2 palabras totalmente distintas
            setTimeout(() => {
                const h = stage.clientHeight || 550;
                if (roundItems[0]) spawnBubble(roundItems[0].text, roundItems[0].correct, h * 0.25);
                if (roundItems[1]) spawnBubble(roundItems[1].text, roundItems[1].correct, h * 0.05);
            }, 80);

            let wordIdx = 2;
            spawnInterval = setInterval(() => {
                if (!document.body.contains(stage) || isTransitioning) {
                    clearInterval(spawnInterval);
                    return;
                }
                if (wordIdx < roundItems.length) {
                    const item = roundItems[wordIdx];
                    spawnBubble(item.text, item.correct);
                    wordIdx++;
                } else {
                    const pairs = (window.LanguageBank && window.LanguageBank.bubbleWordPairs) || [];
                    const p = pairs[Math.floor(Math.random() * pairs.length)];
                    const isCorrect = (wordIdx % 2 === 0);
                    spawnBubble(isCorrect ? p[0] : p[1], isCorrect);
                    wordIdx++;
                }
            }, 2300);

            // Temporizador de 20 segundos por ronda
            clearInterval(timerInterval);
            timerInterval = setInterval(() => {
                if (!document.body.contains(stage)) {
                    clearInterval(timerInterval);
                    clearInterval(spawnInterval);
                    return;
                }

                roundTimeLeft--;
                if (timerBadgeEl) {
                    timerBadgeEl.textContent = `⏱️ ${roundTimeLeft}s`;
                    if (roundTimeLeft <= 5) {
                        timerBadgeEl.style.background = 'rgba(239, 68, 68, 0.45)';
                        timerBadgeEl.style.color = '#fee2e2';
                        timerBadgeEl.style.borderColor = '#ef4444';
                    }
                }

                if (roundTimeLeft <= 0) {
                    clearInterval(timerInterval);
                    clearInterval(spawnInterval);
                    endRound(rNum);
                }
            }, 1000);
        };

        const endRound = (rNum) => {
            isTransitioning = true;
            clearInterval(timerInterval);
            clearInterval(spawnInterval);
            stage.innerHTML = ''; // Limpiar burbujas de la ronda anterior

            if (rNum < totalRounds) {
                if (AppState.settings.soundEnabled) this.playSound('success');
                roundOverlay.innerHTML = `
                    <div style="background: rgba(255, 255, 255, 0.12); padding: 1.2rem; border-radius: 50%; box-shadow: 0 10px 30px rgba(0,0,0,0.3); border: 2.5px solid rgba(255,255,255,0.25); display: flex; align-items: center; justify-content: center;">
                        <svg viewBox="0 0 24 24" width="68" height="68" fill="#facc15" stroke="#ca8a04" stroke-width="1.5">
                            <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
                        </svg>
                    </div>
                    <div style="display: flex; flex-direction: column; gap: 0.5rem; align-items: center;">
                        <h2 style="font-size: 2.3rem; font-weight: 900; margin: 0; color: #ffffff; text-shadow: 0 2px 10px rgba(0,0,0,0.45);">
                            ¡Ronda ${rNum} Superada!
                        </h2>
                        <p style="font-size: 1.3rem; font-weight: 800; color: #fef08a; margin: 0; text-shadow: 0 1px 4px rgba(0,0,0,0.3);">
                            ¡Prepárate para la Ronda ${rNum + 1}!
                        </p>
                        <p style="font-size: 1.05rem; font-weight: 700; color: #bae6fd; margin: 0.2rem 0 0 0;">
                            Palabras acertadas hasta ahora: <strong style="color: #ffffff; font-size: 1.25rem;">${totalPopped}</strong>
                        </p>
                    </div>
                    <button id="btn-next-round" class="tactile-btn tactile-btn-blue" style="margin-top: 0.6rem; padding: 0.85rem 2.6rem; font-size: 1.3rem; font-weight: 900; display: inline-flex; align-items: center; justify-content: center; gap: 0.8rem; cursor: pointer; border-radius: 20px; box-shadow: 0 8px 24px rgba(2, 132, 199, 0.45);">
                        <span>Siguiente Ronda</span>
                        <svg viewBox="0 0 24 24" width="26" height="26" fill="none" stroke="currentColor" stroke-width="2.8" stroke-linecap="round" stroke-linejoin="round">
                            <line x1="5" y1="12" x2="19" y2="12"></line>
                            <polyline points="12 5 19 12 12 19"></polyline>
                        </svg>
                    </button>
                `;
                roundOverlay.style.display = 'flex';

                const nextBtn = roundOverlay.querySelector('#btn-next-round');
                if (nextBtn) {
                    nextBtn.onclick = () => {
                        roundOverlay.style.display = 'none';
                        currentRound++;
                        startRound(currentRound);
                    };
                }
            } else {
                if (AppState.settings.soundEnabled) this.playSound('success');
                roundOverlay.innerHTML = `
                    <div style="background: rgba(255, 255, 255, 0.12); padding: 1.2rem; border-radius: 50%; box-shadow: 0 10px 30px rgba(0,0,0,0.3); border: 2.5px solid rgba(255,255,255,0.25); display: flex; align-items: center; justify-content: center;">
                        <svg viewBox="0 0 24 24" width="72" height="72" fill="#facc15" stroke="#ca8a04" stroke-width="1.5">
                            <path d="M6 9H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h2"/>
                            <path d="M18 9h2a2 2 0 0 0 2-2V5a2 2 0 0 0-2-2h-2"/>
                            <path d="M4 22h16"/>
                            <path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22"/>
                            <path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22"/>
                            <path d="M18 2H6v7a6 6 0 0 0 12 0V2Z"/>
                        </svg>
                    </div>
                    <div style="display: flex; flex-direction: column; gap: 0.5rem; align-items: center;">
                        <h2 style="font-size: 2.4rem; font-weight: 900; margin: 0; color: #ffffff; text-shadow: 0 2px 10px rgba(0,0,0,0.45);">
                            ¡Misión del Bosque Superada!
                        </h2>
                        <p style="font-size: 1.35rem; font-weight: 800; color: #86efac; margin: 0; text-shadow: 0 1px 4px rgba(0,0,0,0.3);">
                            ¡Has superado las 3 rondas y atrapado ${totalPopped} palabras!
                        </p>
                    </div>
                    <button id="btn-finish-mission" class="tactile-btn tactile-btn-blue" style="margin-top: 0.6rem; padding: 0.85rem 2.6rem; font-size: 1.3rem; font-weight: 900; display: inline-flex; align-items: center; justify-content: center; gap: 0.8rem; cursor: pointer; border-radius: 20px; box-shadow: 0 8px 24px rgba(2, 132, 199, 0.45);">
                        <span>Ver Resultados</span>
                        <svg viewBox="0 0 24 24" width="26" height="26" fill="none" stroke="currentColor" stroke-width="2.8" stroke-linecap="round" stroke-linejoin="round">
                            <polyline points="20 6 9 17 4 12"></polyline>
                        </svg>
                    </button>
                `;
                roundOverlay.style.display = 'flex';

                const finishBtn = roundOverlay.querySelector('#btn-finish-mission');
                if (finishBtn) {
                    finishBtn.onclick = () => {
                        onComplete(true);
                    };
                }
            }
        };

        // Iniciar Primera Ronda
        startRound(1);
    },

    renderLetraPerdida(actividad, container, onComplete) {
        container.innerHTML = '';
        container.style.position = 'relative';
        container.style.width = '100%';
        container.style.height = '100%';
        container.style.display = 'flex';
        container.style.flexDirection = 'column';
        container.style.alignItems = 'center';
        container.style.justifyContent = 'space-between';
        container.style.padding = '6.2rem 2rem 1.6rem 2rem';
        container.style.boxSizing = 'border-box';
        container.style.background = 'radial-gradient(ellipse at 50% 90%, #e0f2fe 0%, #f0fdf4 40%, #ffffff 100%)';
        container.style.overflow = 'hidden';

        // HUD flotante estilo Burbujas
        const hud = document.createElement('div');
        hud.style.position = 'absolute';
        hud.style.top = '18px';
        hud.style.left = '50%';
        hud.style.transform = 'translateX(-50%)';
        hud.style.zIndex = '50';
        hud.style.background = 'linear-gradient(135deg, #1e3a8a 0%, #0284c7 100%)';
        hud.style.padding = '0.65rem 2.4rem';
        hud.style.borderRadius = '9999px';
        hud.style.boxShadow = '0 10px 25px rgba(2, 132, 199, 0.35)';
        hud.style.border = '2.5px solid #ffffff';
        hud.style.display = 'flex';
        hud.style.alignItems = 'center';
        hud.style.gap = '1.6rem';
        hud.style.pointerEvents = 'none';
        hud.style.whiteSpace = 'nowrap';
        hud.style.width = 'max-content';
        hud.style.maxWidth = '92vw';
        hud.style.boxSizing = 'border-box';

        hud.innerHTML = `
            <div style="display: flex; align-items: center; gap: 0.6rem; font-size: 1.15rem; white-space: nowrap; font-weight: 900; color: #ffffff; text-shadow: 0 1px 3px rgba(0,0,0,0.35);">
                <span>${actividad.pregunta || '¡Encuentra la letra perdida para completar la palabra!'}</span>
            </div>
            <div style="background: rgba(255, 255, 255, 0.22); color: #fef08a; font-weight: 900; font-size: 1.1rem; padding: 0.35rem 1.1rem; border-radius: 9999px; border: 1.5px solid rgba(255, 255, 255, 0.45); text-shadow: 0 1px 2px rgba(0,0,0,0.3);">
                Ortografía
            </div>
        `;
        container.appendChild(hud);

        // Escenario Central con Casillas de Letras Grandes (Limpio y profesional)
        const centerStage = document.createElement('div');
        centerStage.style.display = 'flex';
        centerStage.style.flexDirection = 'column';
        centerStage.style.alignItems = 'center';
        centerStage.style.justifyContent = 'center';
        centerStage.style.gap = '2.2rem';
        centerStage.style.margin = 'auto 0';

        // Fila de Casillas de Letras
        const wordTilesRow = document.createElement('div');
        wordTilesRow.style.display = 'flex';
        wordTilesRow.style.alignItems = 'center';
        wordTilesRow.style.justifyContent = 'center';
        wordTilesRow.style.gap = '0.9rem';
        wordTilesRow.style.flexWrap = 'wrap';

        const wordLetters = actividad.palabra ? actividad.palabra.split(' ') : (actividad.palabraCompleta ? actividad.palabraCompleta.split('') : ['A']);
        let emptySlotTile = null;

        wordLetters.forEach(char => {
            const tile = document.createElement('div');
            tile.style.width = '68px';
            tile.style.height = '78px';
            tile.style.borderRadius = '18px';
            tile.style.display = 'flex';
            tile.style.alignItems = 'center';
            tile.style.justifyContent = 'center';
            tile.style.fontSize = '2.5rem';
            tile.style.fontWeight = '900';
            tile.style.userSelect = 'none';

            if (char === '_') {
                tile.style.background = '#e0f2fe';
                tile.style.border = '3.5px dashed #0284c7';
                tile.style.color = '#0284c7';
                tile.style.boxShadow = '0 0 20px rgba(2, 132, 199, 0.45)';
                tile.textContent = '?';
                emptySlotTile = tile;
            } else {
                tile.style.background = 'linear-gradient(180deg, #ffffff 0%, #f1f5f9 100%)';
                tile.style.border = '3px solid #cbd5e1';
                tile.style.color = '#1e3a8a';
                tile.style.boxShadow = '0 8px 18px rgba(0,0,0,0.08), inset 0 2px 4px rgba(255,255,255,0.8)';
                tile.textContent = char;
            }
            wordTilesRow.appendChild(tile);
        });

        centerStage.appendChild(wordTilesRow);
        container.appendChild(centerStage);

        // Fila de Botones de Opciones Táctiles
        const optionsRow = document.createElement('div');
        optionsRow.style.display = 'flex';
        optionsRow.style.alignItems = 'center';
        optionsRow.style.justifyContent = 'center';
        optionsRow.style.gap = '1.5rem';
        optionsRow.style.width = '100%';
        optionsRow.style.maxWidth = '850px';
        optionsRow.style.margin = '0 auto';
        optionsRow.style.flexShrink = '0';

        actividad.opciones.forEach((letra, index) => {
            const btn = document.createElement('button');
            btn.className = 'tactile-btn tactile-btn-amber';
            btn.textContent = letra;

            btn.onclick = () => {
                const rawWord = actividad.palabraCompleta || (actividad.palabra ? actividad.palabra.replace(/\s+/g, '') : '');
                let targetIdx = actividad.targetIdx;
                if (targetIdx === undefined || targetIdx === -1) {
                    const letters = actividad.palabra ? actividad.palabra.split(' ') : rawWord.split('');
                    targetIdx = letters.indexOf('_');
                    if (targetIdx === -1) targetIdx = 0;
                }
                const wordFormed = (rawWord.slice(0, targetIdx) + letra + rawWord.slice(targetIdx + 1)).toUpperCase();

                const esCorrecto = (index === actividad.respuesta) ||
                                   (letra === actividad.letraCorrecta) ||
                                   (actividad.letrasValidas && actividad.letrasValidas.includes(letra)) ||
                                   (window.LanguageBank && window.LanguageBank.esPalabraValida && window.LanguageBank.esPalabraValida(wordFormed));

                if (esCorrecto) {
                    if (emptySlotTile) {
                        emptySlotTile.style.background = 'linear-gradient(180deg, #10b981 0%, #059669 100%)';
                        emptySlotTile.style.border = '3.5px solid #047857';
                        emptySlotTile.style.color = '#ffffff';
                        emptySlotTile.style.boxShadow = '0 8px 24px rgba(16, 185, 129, 0.5)';
                        emptySlotTile.style.transform = 'scale(1.2)';
                        emptySlotTile.textContent = letra;
                        setTimeout(() => { emptySlotTile.style.transform = 'scale(1)'; }, 250);
                    }
                    btn.style.background = 'linear-gradient(180deg, #34d399 0%, #059669 100%)';
                    btn.style.borderColor = '#047857';
                    btn.style.color = '#ffffff';
                    if (AppState.settings.soundEnabled) this.playSound('success');
                    setTimeout(() => onComplete(true), 1100);
                } else {
                    btn.style.animation = 'shake 0.4s';
                    if (AppState.settings.soundEnabled) this.playSound('error');
                    setTimeout(() => { btn.style.animation = ''; }, 450);
                }
            };
            optionsRow.appendChild(btn);
        });
        container.appendChild(optionsRow);
    },

    renderOrdenarSilabas(actividad, container, onComplete) {
        container.innerHTML = '';
        container.style.position = 'relative';
        container.style.width = '100%';
        container.style.height = '100%';
        container.style.display = 'flex';
        container.style.flexDirection = 'column';
        container.style.alignItems = 'center';
        container.style.justifyContent = 'space-between';
        container.style.padding = '6.2rem 2rem 1.6rem 2rem';
        container.style.boxSizing = 'border-box';
        container.style.background = 'radial-gradient(ellipse at 50% 90%, #e0f2fe 0%, #f0fdf4 40%, #ffffff 100%)';
        container.style.overflow = 'hidden';

        const targetSilabas = actividad.silabas || ['ME', 'SA'];
        const totalSlots = targetSilabas.length;
        let currentStep = 0;

        // HUD flotante
        const hud = document.createElement('div');
        hud.style.position = 'absolute';
        hud.style.top = '18px';
        hud.style.left = '50%';
        hud.style.transform = 'translateX(-50%)';
        hud.style.zIndex = '50';
        hud.style.background = 'linear-gradient(135deg, #1e3a8a 0%, #0284c7 100%)';
        hud.style.padding = '0.65rem 2.4rem';
        hud.style.borderRadius = '9999px';
        hud.style.boxShadow = '0 10px 25px rgba(2, 132, 199, 0.35)';
        hud.style.border = '2.5px solid #ffffff';
        hud.style.display = 'flex';
        hud.style.alignItems = 'center';
        hud.style.gap = '1.6rem';
        hud.style.pointerEvents = 'none';
        hud.style.whiteSpace = 'nowrap';
        hud.style.width = 'max-content';
        hud.style.maxWidth = '92vw';
        hud.style.boxSizing = 'border-box';

        hud.innerHTML = `
            <div style="display: flex; align-items: center; gap: 0.6rem; font-size: 1.15rem; white-space: nowrap; font-weight: 900; color: #ffffff; text-shadow: 0 1px 3px rgba(0,0,0,0.35);">
                <span>¡Arrastra o toca las sílabas en orden para formar la palabra!</span>
            </div>
            <div style="background: rgba(255, 255, 255, 0.22); color: #fef08a; font-weight: 900; font-size: 1.1rem; padding: 0.35rem 1.1rem; border-radius: 9999px; border: 1.5px solid rgba(255, 255, 255, 0.45); text-shadow: 0 1px 2px rgba(0,0,0,0.3);">
                Colocadas: <span id="silabas-counter" style="color: #ffffff;">0</span> / ${totalSlots}
            </div>
        `;
        container.appendChild(hud);

        // Escenario Central con Imagen y Casillas Destino
        const centerStage = document.createElement('div');
        centerStage.style.display = 'flex';
        centerStage.style.flexDirection = 'column';
        centerStage.style.alignItems = 'center';
        centerStage.style.justifyContent = 'center';
        centerStage.style.gap = '1.6rem';
        centerStage.style.margin = 'auto 0';

        // Indicador didáctico profesional (sin emojis distractores)
        const badgeEl = document.createElement('div');
        badgeEl.style.display = 'inline-flex';
        badgeEl.style.alignItems = 'center';
        badgeEl.style.gap = '8px';
        badgeEl.style.padding = '0.5rem 1.4rem';
        badgeEl.style.borderRadius = '9999px';
        badgeEl.style.background = 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)';
        badgeEl.style.border = '2px solid #cbd5e1';
        badgeEl.style.boxShadow = '0 4px 12px rgba(100, 116, 139, 0.12)';
        badgeEl.style.color = '#334155';
        badgeEl.style.fontSize = '1.05rem';
        badgeEl.style.fontWeight = '800';
        badgeEl.style.letterSpacing = '0.5px';
        badgeEl.innerHTML = `<span style="display:inline-block; width:10px; height:10px; border-radius:50%; background:#0284c7;"></span> Palabra de ${totalSlots} sílabas`;
        centerStage.appendChild(badgeEl);

        // Fila de Casillas Destino de Sílabas
        const slotsRow = document.createElement('div');
        slotsRow.style.display = 'flex';
        slotsRow.style.alignItems = 'center';
        slotsRow.style.justifyContent = 'center';
        slotsRow.style.gap = '1.2rem';
        slotsRow.style.flexWrap = 'wrap';

        const slotElements = [];

        targetSilabas.forEach((sil, idx) => {
            const slotWrap = document.createElement('div');
            slotWrap.style.display = 'flex';
            slotWrap.style.flexDirection = 'column';
            slotWrap.style.alignItems = 'center';
            slotWrap.style.gap = '6px';

            const slot = document.createElement('div');
            slot.style.minWidth = '95px';
            slot.style.height = '78px';
            slot.style.padding = '0 16px';
            slot.style.borderRadius = '20px';
            slot.style.border = '3.5px dashed #94a3b8';
            slot.style.background = 'rgba(255, 255, 255, 0.9)';
            slot.style.display = 'flex';
            slot.style.alignItems = 'center';
            slot.style.justifyContent = 'center';
            slot.style.fontSize = '2rem';
            slot.style.fontWeight = '900';
            slot.style.color = '#94a3b8';
            slot.style.boxShadow = '0 6px 14px rgba(0,0,0,0.08)';
            slot.style.transition = 'all 0.25s cubic-bezier(0.16, 1, 0.3, 1)';
            slot.textContent = '?';
            slotWrap.appendChild(slot);

            const subLbl = document.createElement('span');
            subLbl.style.fontSize = '0.85rem';
            subLbl.style.fontWeight = '800';
            subLbl.style.color = '#64748b';
            subLbl.textContent = `${idx + 1}ª sílaba`;
            slotWrap.appendChild(subLbl);

            slotsRow.appendChild(slotWrap);
            slotElements.push(slot);
        });

        centerStage.appendChild(slotsRow);
        container.appendChild(centerStage);

        const highlightCurrentSlot = () => {
            slotElements.forEach((s, idx) => {
                if (idx === currentStep) {
                    s.style.border = '3.5px solid #0284c7';
                    s.style.boxShadow = '0 0 22px rgba(2, 132, 199, 0.65)';
                    s.style.background = '#e0f2fe';
                    s.style.color = '#0284c7';
                    s.style.transform = 'scale(1.08)';
                } else if (idx > currentStep) {
                    s.style.border = '3.5px dashed #94a3b8';
                    s.style.boxShadow = '0 4px 10px rgba(0,0,0,0.06)';
                    s.style.background = 'rgba(255, 255, 255, 0.9)';
                    s.style.color = '#94a3b8';
                    s.style.transform = 'scale(1)';
                }
            });
        };
        highlightCurrentSlot();

        // Bandeja Inferior con Sílabas Desordenadas Arrastrables
        const optionsRow = document.createElement('div');
        optionsRow.style.display = 'flex';
        optionsRow.style.alignItems = 'center';
        optionsRow.style.justifyContent = 'center';
        optionsRow.style.gap = '1.5rem';
        optionsRow.style.width = '100%';
        optionsRow.style.maxWidth = '850px';
        optionsRow.style.margin = '0 auto';
        optionsRow.style.flexShrink = '0';

        const placeSyllableSuccess = (sil, btn) => {
            const slot = slotElements[currentStep];
            if (slot) {
                slot.style.background = 'linear-gradient(180deg, #10b981 0%, #059669 100%)';
                slot.style.border = '3.5px solid #047857';
                slot.style.color = '#ffffff';
                slot.style.boxShadow = '0 8px 22px rgba(16, 185, 129, 0.45)';
                slot.style.transform = 'scale(1.15)';
                slot.textContent = sil;
                setTimeout(() => { slot.style.transform = 'scale(1)'; }, 220);
            }

            btn.style.visibility = 'hidden';
            btn.disabled = true;

            currentStep++;
            const counterEl = hud.querySelector('#silabas-counter');
            if (counterEl) counterEl.textContent = currentStep;

            highlightCurrentSlot();

            if (AppState.settings.soundEnabled) Activities.playSound('success');

            if (currentStep === totalSlots) {
                setTimeout(() => onComplete(true), 900);
            }
        };

        const scrambled = actividad.silabasDesordenadas || targetSilabas;

        scrambled.forEach(sil => {
            const btn = document.createElement('button');
            btn.className = 'tactile-btn tactile-btn-blue';
            btn.textContent = sil;
            btn.style.cursor = 'grab';
            btn.style.touchAction = 'none';
            btn.style.userSelect = 'none';
            btn.style.minWidth = '110px';
            btn.style.height = '78px';
            btn.style.fontSize = '2rem';

            // Drag & Drop con Pointer Events
            let isDragging = false;
            let startX = 0, startY = 0;
            let floatingEl = null;

            const onPointerDown = (e) => {
                if (e.button !== undefined && e.button !== 0) return;
                isDragging = false;
                startX = e.clientX;
                startY = e.clientY;

                const onPointerMove = (moveEvt) => {
                    const dx = moveEvt.clientX - startX;
                    const dy = moveEvt.clientY - startY;

                    if (!isDragging && Math.hypot(dx, dy) > 6) {
                        isDragging = true;
                        btn.style.opacity = '0.3';
                        btn.style.cursor = 'grabbing';

                        floatingEl = document.createElement('div');
                        floatingEl.className = 'tactile-btn tactile-btn-blue';
                        floatingEl.textContent = sil;
                        floatingEl.style.position = 'fixed';
                        floatingEl.style.left = `${moveEvt.clientX}px`;
                        floatingEl.style.top = `${moveEvt.clientY}px`;
                        floatingEl.style.transform = 'translate(-50%, -50%) scale(1.15)';
                        floatingEl.style.zIndex = '99999';
                        floatingEl.style.pointerEvents = 'none';
                        floatingEl.style.boxShadow = '0 16px 36px rgba(2, 132, 199, 0.45), 0 0 0 3px #0284c7';
                        floatingEl.style.transition = 'none';
                        document.body.appendChild(floatingEl);
                    }

                    if (isDragging && floatingEl) {
                        floatingEl.style.left = `${moveEvt.clientX}px`;
                        floatingEl.style.top = `${moveEvt.clientY}px`;

                        const currentSlot = slotElements[currentStep];
                        if (currentSlot) {
                            const rect = currentSlot.getBoundingClientRect();
                            const dist = Math.hypot(moveEvt.clientX - (rect.left + rect.width / 2), moveEvt.clientY - (rect.top + rect.height / 2));
                            if (dist < 90) {
                                currentSlot.style.transform = 'scale(1.22)';
                                currentSlot.style.boxShadow = '0 0 25px rgba(16, 185, 129, 0.8)';
                                currentSlot.style.borderColor = '#10b981';
                                currentSlot.style.background = '#dcfce7';
                            } else {
                                currentSlot.style.transform = 'scale(1.08)';
                                currentSlot.style.boxShadow = '0 0 22px rgba(2, 132, 199, 0.65)';
                                currentSlot.style.borderColor = '#0284c7';
                                currentSlot.style.background = '#e0f2fe';
                            }
                        }
                    }
                };

                const onPointerUp = (upEvt) => {
                    window.removeEventListener('pointermove', onPointerMove);
                    window.removeEventListener('pointerup', onPointerUp);
                    window.removeEventListener('pointercancel', onPointerUp);

                    btn.style.opacity = '1';
                    btn.style.cursor = 'grab';

                    if (isDragging && floatingEl) {
                        floatingEl.remove();
                        floatingEl = null;

                        const expectedSil = targetSilabas[currentStep];
                        const currentSlot = slotElements[currentStep];
                        let isDroppedOnTarget = false;
                        if (currentSlot) {
                            const rect = currentSlot.getBoundingClientRect();
                            const dist = Math.hypot(upEvt.clientX - (rect.left + rect.width / 2), upEvt.clientY - (rect.top + rect.height / 2));
                            if (dist < 95) isDroppedOnTarget = true;
                        }

                        if (isDroppedOnTarget) {
                            if (sil === expectedSil) {
                                placeSyllableSuccess(sil, btn);
                            } else {
                                if (currentSlot) currentSlot.style.transform = 'scale(1.08)';
                                highlightCurrentSlot();
                                btn.style.animation = 'shake 0.4s';
                                if (AppState.settings.soundEnabled) Activities.playSound('error');
                                setTimeout(() => { btn.style.animation = ''; }, 450);
                            }
                        } else {
                            highlightCurrentSlot();
                        }
                        setTimeout(() => { isDragging = false; }, 80);
                    }
                };

                window.addEventListener('pointermove', onPointerMove);
                window.addEventListener('pointerup', onPointerUp);
                window.addEventListener('pointercancel', onPointerUp);
            };

            btn.addEventListener('pointerdown', onPointerDown);

            // Tap o Clic directo accesible
            btn.onclick = () => {
                if (isDragging) return;
                const expectedSil = targetSilabas[currentStep];
                if (sil === expectedSil) {
                    placeSyllableSuccess(sil, btn);
                } else {
                    btn.style.animation = 'shake 0.4s';
                    if (AppState.settings.soundEnabled) Activities.playSound('error');
                    setTimeout(() => { btn.style.animation = ''; }, 450);
                }
            };

            optionsRow.appendChild(btn);
        });

        container.appendChild(optionsRow);
    },

    renderMemory(actividad, container, onComplete) {
        container.innerHTML = '';
        container.style.position = 'relative';
        container.style.width = '100%';
        container.style.height = '100%';
        container.style.display = 'flex';
        container.style.flexDirection = 'column';
        container.style.alignItems = 'center';
        container.style.justifyContent = 'space-between';
        container.style.padding = '6.2rem 2rem 1.6rem 2rem';
        container.style.boxSizing = 'border-box';
        container.style.background = 'radial-gradient(ellipse at 50% 90%, #e0f2fe 0%, #f0fdf4 40%, #ffffff 100%)';
        container.style.overflow = 'hidden';

        let rawItems = actividad.parejas || ['🐴', '🛡️', '⚔️', '📖', '👴', '🏰'];
        let cardList = [];
        if (typeof rawItems[0] === 'string') {
            const base = rawItems.slice(0, 6);
            cardList = [...base, ...base].map((emoji, idx) => ({ id: idx, valor: emoji, display: emoji }));
        } else {
            cardList = rawItems.map((it, idx) => ({ id: idx, valor: it.valor || it.display, display: it.display || it.valor }));
        }
        const totalPairs = cardList.length / 2;
        let matchesFound = 0;

        // HUD flotante estilo Burbujas
        const hud = document.createElement('div');
        hud.style.position = 'absolute';
        hud.style.top = '18px';
        hud.style.left = '50%';
        hud.style.transform = 'translateX(-50%)';
        hud.style.zIndex = '50';
        hud.style.background = 'linear-gradient(135deg, #1e3a8a 0%, #0284c7 100%)';
        hud.style.padding = '0.65rem 2.4rem';
        hud.style.borderRadius = '9999px';
        hud.style.boxShadow = '0 10px 25px rgba(2, 132, 199, 0.35)';
        hud.style.border = '2.5px solid #ffffff';
        hud.style.display = 'flex';
        hud.style.alignItems = 'center';
        hud.style.gap = '1.6rem';
        hud.style.pointerEvents = 'none';
        hud.style.whiteSpace = 'nowrap';
        hud.style.width = 'max-content';
        hud.style.maxWidth = '92vw';
        hud.style.boxSizing = 'border-box';

        hud.innerHTML = `
            <div style="display: flex; align-items: center; gap: 0.6rem; font-size: 1.15rem; white-space: nowrap; font-weight: 900; color: #ffffff; text-shadow: 0 1px 3px rgba(0,0,0,0.35);">
                <span>${actividad.pregunta || 'Las Parejas de Don Quijote: ¡Encuentra todas las parejas!'}</span>
            </div>
            <div style="background: rgba(255, 255, 255, 0.22); color: #fef08a; font-weight: 900; font-size: 1.1rem; padding: 0.35rem 1.1rem; border-radius: 9999px; border: 1.5px solid rgba(255, 255, 255, 0.45); text-shadow: 0 1px 2px rgba(0,0,0,0.3);">
                Parejas: <span id="memory-counter" style="color: #ffffff;">0</span> / ${totalPairs}
            </div>
        `;
        container.appendChild(hud);

        // Escenario Cuadrícula de Cartas Panorámica
        const grid = document.createElement('div');
        grid.style.display = 'grid';
        grid.style.gridTemplateColumns = 'repeat(4, minmax(110px, 140px))';
        grid.style.gap = '1.2rem';
        grid.style.alignContent = 'center';
        grid.style.justifyContent = 'center';
        grid.style.margin = 'auto';
        grid.style.width = '100%';
        grid.style.maxWidth = '850px';

        let hasFlippedCard = false;
        let lockBoard = false;
        let firstCard, secondCard;

        const shuffled = [...cardList].sort(() => 0.5 - Math.random());

        shuffled.forEach(item => {
            const card = document.createElement('div');
            card.style.height = '145px';
            card.style.position = 'relative';
            card.style.transformStyle = 'preserve-3d';
            card.style.transition = 'transform 0.45s cubic-bezier(0.16, 1, 0.3, 1)';
            card.style.cursor = 'pointer';
            card.dataset.name = item.valor;

            const frontFace = document.createElement('div');
            frontFace.style.position = 'absolute';
            frontFace.style.width = '100%';
            frontFace.style.height = '100%';
            frontFace.style.backfaceVisibility = 'hidden';
            frontFace.style.borderRadius = '24px';
            frontFace.style.display = 'flex';
            frontFace.style.alignItems = 'center';
            frontFace.style.justifyContent = 'center';
            frontFace.style.fontSize = '3.8rem';
            frontFace.style.background = 'linear-gradient(135deg, #ffffff 0%, #f0fdf4 100%)';
            frontFace.style.border = '3.5px solid #22c55e';
            frontFace.style.boxShadow = '0 10px 22px rgba(34, 197, 94, 0.25)';
            frontFace.style.transform = 'rotateY(180deg)';
            frontFace.textContent = item.display;

            const backFace = document.createElement('div');
            backFace.style.position = 'absolute';
            backFace.style.width = '100%';
            backFace.style.height = '100%';
            backFace.style.backfaceVisibility = 'hidden';
            backFace.style.borderRadius = '24px';
            backFace.style.display = 'flex';
            backFace.style.alignItems = 'center';
            backFace.style.justifyContent = 'center';
            backFace.style.fontSize = '3rem';
            backFace.style.fontWeight = '900';
            backFace.style.color = '#f43f5e';
            backFace.style.background = 'linear-gradient(135deg, #e0f2fe 0%, #bae6fd 100%)';
            backFace.style.border = '3.5px solid #0284c7';
            backFace.style.boxShadow = '0 10px 22px rgba(2, 132, 199, 0.25), inset 0 2px 4px rgba(255,255,255,0.8)';
            backFace.textContent = '?';

            card.appendChild(frontFace);
            card.appendChild(backFace);

            card.onclick = () => {
                if (lockBoard || card === firstCard) return;

                card.style.transform = 'rotateY(180deg)';

                if (!hasFlippedCard) {
                    hasFlippedCard = true;
                    firstCard = card;
                    return;
                }

                secondCard = card;
                lockBoard = true;

                if (firstCard.dataset.name === secondCard.dataset.name) {
                    if (AppState.settings.soundEnabled) this.playSound('success');
                    matchesFound++;
                    const memCounterEl = hud.querySelector('#memory-counter');
                    if (memCounterEl) memCounterEl.textContent = matchesFound;

                    firstCard.style.pointerEvents = 'none';
                    secondCard.style.pointerEvents = 'none';
                    resetBoard();
                    if (matchesFound === totalPairs) {
                        setTimeout(() => onComplete(true), 1000);
                    }
                } else {
                    if (AppState.settings.soundEnabled) this.playSound('error');
                    setTimeout(() => {
                        firstCard.style.transform = 'rotateY(0deg)';
                        secondCard.style.transform = 'rotateY(0deg)';
                        resetBoard();
                    }, 900);
                }
            };

            grid.appendChild(card);
        });

        function resetBoard() {
            [hasFlippedCard, lockBoard] = [false, false];
            [firstCard, secondCard] = [null, null];
        }

        container.appendChild(grid);
    },

    renderContarFrutas(actividad, container, onComplete) {
        container.innerHTML = '';
        container.style.position = 'relative';
        container.style.width = '100%';
        container.style.height = '100%';
        container.style.display = 'flex';
        container.style.flexDirection = 'column';
        container.style.alignItems = 'center';
        container.style.justifyContent = 'space-between';
        container.style.padding = '6.2rem 2rem 1.6rem 2rem';
        container.style.boxSizing = 'border-box';
        container.style.background = 'radial-gradient(ellipse at 50% 90%, #e0f2fe 0%, #f0fdf4 40%, #ffffff 100%)';
        container.style.overflow = 'hidden';

        const targetFruit = actividad.frutaObjetivo || 'manzanas';
        const targetFruitImg = actividad.frutaObjetivoImg || null;
        let count = 0;

        // HUD flotante estilo Burbujas
        const hud = document.createElement('div');
        hud.style.position = 'absolute';
        hud.style.top = '18px';
        hud.style.left = '50%';
        hud.style.transform = 'translateX(-50%)';
        hud.style.zIndex = '50';
        hud.style.background = 'linear-gradient(135deg, #1e3a8a 0%, #0284c7 100%)';
        hud.style.padding = '0.65rem 2.4rem';
        hud.style.borderRadius = '9999px';
        hud.style.boxShadow = '0 10px 25px rgba(2, 132, 199, 0.35)';
        hud.style.border = '2.5px solid #ffffff';
        hud.style.display = 'flex';
        hud.style.alignItems = 'center';
        hud.style.gap = '1.6rem';
        hud.style.pointerEvents = 'none';
        hud.style.whiteSpace = 'nowrap';
        hud.style.width = 'max-content';
        hud.style.maxWidth = '92vw';
        hud.style.boxSizing = 'border-box';

        hud.innerHTML = `
            <div style="display: flex; align-items: center; gap: 0.8rem; font-size: 1.15rem; white-space: nowrap; font-weight: 900; color: #ffffff; text-shadow: 0 1px 3px rgba(0,0,0,0.35);">
                ${targetFruitImg ? `<img src="${targetFruitImg}" alt="${actividad.nombreFruta || ''}" style="width: 38px; height: 38px; object-fit: contain; filter: drop-shadow(0 2px 4px rgba(0,0,0,0.3)); vertical-align: middle;">` : ''}
                <span>${actividad.pregunta || `¿Cuántas ${targetFruit} hay en la mesa? (¡Tócalas para contarlas!)`}</span>
            </div>
            <div style="display: flex; align-items: center; gap: 0.6rem; background: rgba(255, 255, 255, 0.22); color: #fef08a; font-weight: 900; font-size: 1.1rem; padding: 0.35rem 1.1rem; border-radius: 9999px; border: 1.5px solid rgba(255, 255, 255, 0.45); text-shadow: 0 1px 2px rgba(0,0,0,0.3);">
                ${targetFruitImg ? `<img src="${targetFruitImg}" style="width: 24px; height: 24px; object-fit: contain;">` : ''}
                <span>${actividad.textoContadas || 'Contadas'}:</span> <span id="fruit-count-val" style="color: #ffffff;">0</span>
            </div>
        `;
        container.appendChild(hud);

        // Escenario Mesa de Madera Amplia y Espaciosa con Mantel Infantil
        const tableStage = document.createElement('div');
        tableStage.style.width = '94%';
        tableStage.style.maxWidth = '980px';
        tableStage.style.height = '370px';
        tableStage.style.margin = 'auto 0';
        tableStage.style.background = 'linear-gradient(180deg, #d97706 0%, #b45309 100%)';
        tableStage.style.borderRadius = '32px';
        tableStage.style.border = '5px solid #78350f';
        tableStage.style.boxShadow = '0 18px 40px rgba(180, 83, 9, 0.22), inset 0 3px 8px rgba(255,255,255,0.4)';
        tableStage.style.padding = '1.2rem 2rem';
        tableStage.style.display = 'flex';
        tableStage.style.flexDirection = 'column';
        tableStage.style.alignItems = 'center';
        tableStage.style.justifyContent = 'center';
        tableStage.style.position = 'relative';
        tableStage.style.boxSizing = 'border-box';

        // Mantel de cuadros en el centro de la mesa
        const cloth = document.createElement('div');
        cloth.style.position = 'absolute';
        cloth.style.inset = '16px';
        cloth.style.background = 'radial-gradient(circle, #fef9c3 15%, transparent 16%) 0 0, radial-gradient(circle, #fef9c3 15%, #fef08a 16%) 18px 18px';
        cloth.style.backgroundSize = '36px 36px';
        cloth.style.borderRadius = '24px';
        cloth.style.border = '3.5px dashed #ca8a04';
        cloth.style.boxShadow = 'inset 0 3px 10px rgba(0,0,0,0.06)';
        cloth.style.display = 'flex';
        cloth.style.alignItems = 'center';
        cloth.style.justifyContent = 'center';
        cloth.style.padding = '1.2rem 2.4rem';
        cloth.style.boxSizing = 'border-box';

        // Disposición amplia y orgánica de Frutas
        const fruitsRow = document.createElement('div');
        fruitsRow.style.display = 'flex';
        fruitsRow.style.flexWrap = 'wrap';
        fruitsRow.style.gap = '2rem 3.5rem';
        fruitsRow.style.alignItems = 'center';
        fruitsRow.style.justifyContent = 'center';
        fruitsRow.style.alignContent = 'center';
        fruitsRow.style.maxWidth = '880px';
        fruitsRow.style.width = '100%';
        fruitsRow.style.height = '100%';
        fruitsRow.style.padding = '0.5rem';
        fruitsRow.style.boxSizing = 'border-box';

        const fruitPool = actividad.items || actividad.frutas || [
            targetFruit, '🍌', targetFruit, '🍊', targetFruit, '🍌', '🍐'
        ];

        fruitPool.forEach((item) => {
            const fruitImg = typeof item === 'object' && item.img ? item.img : (typeof item === 'string' && (item.endsWith('.png') || item.includes('/')) ? item : null);
            const isTarget = typeof item === 'object' && item.esObjetivo !== undefined 
                ? item.esObjetivo 
                : (fruitImg ? (fruitImg === targetFruitImg) : (item === targetFruit || item.name === targetFruit || item.emoji === targetFruit));

            const fruitWrap = document.createElement('div');
            fruitWrap.className = 'market-fruit-item';
            fruitWrap.style.position = 'relative';
            fruitWrap.style.cursor = 'pointer';
            fruitWrap.style.display = 'flex';
            fruitWrap.style.flexDirection = 'column';
            fruitWrap.style.alignItems = 'center';

            // Pin con número que aparece al tocar
            const pin = document.createElement('div');
            pin.style.position = 'absolute';
            pin.style.top = '-12px';
            pin.style.width = '34px';
            pin.style.height = '34px';
            pin.style.borderRadius = '50%';
            pin.style.background = '#ef4444';
            pin.style.border = '2.5px solid #ffffff';
            pin.style.color = '#ffffff';
            pin.style.fontWeight = '900';
            pin.style.fontSize = '1.1rem';
            pin.style.display = 'none';
            pin.style.alignItems = 'center';
            pin.style.justifyContent = 'center';
            pin.style.boxShadow = '0 3px 8px rgba(0,0,0,0.25)';
            pin.style.zIndex = '10';
            fruitWrap.appendChild(pin);

            let icon;
            if (fruitImg) {
                icon = document.createElement('img');
                icon.src = fruitImg;
                icon.alt = (typeof item === 'object' && item.name) ? item.name : 'Fruta';
                icon.style.width = '74px';
                icon.style.height = '74px';
                icon.style.objectFit = 'contain';
                icon.style.userSelect = 'none';
                icon.style.pointerEvents = 'none';
                icon.style.filter = 'drop-shadow(0 8px 14px rgba(0,0,0,0.22))';
                icon.style.display = 'block';
                icon.style.transition = 'transform 0.15s ease';
            } else {
                icon = document.createElement('span');
                icon.textContent = typeof item === 'string' ? item : (item.emoji || '🍎');
                icon.style.fontSize = '4.6rem';
                icon.style.userSelect = 'none';
                icon.style.pointerEvents = 'none';
                icon.style.filter = 'drop-shadow(0 8px 12px rgba(0,0,0,0.2))';
                icon.style.display = 'block';
                icon.style.transition = 'transform 0.15s ease';
            }
            fruitWrap.appendChild(icon);

            let isMarked = false;
            fruitWrap.onclick = () => {
                icon.style.animation = 'fruitBounce 0.5s cubic-bezier(0.34, 1.56, 0.64, 1)';
                setTimeout(() => { icon.style.animation = ''; }, 500);

                if (isTarget) {
                    isMarked = !isMarked;
                    if (isMarked) {
                        count++;
                        pin.style.display = 'flex';
                        pin.textContent = count;
                        icon.style.transform = 'scale(1.15)';
                        if (AppState.settings.soundEnabled) this.playSound('success');
                    } else {
                        count = Math.max(0, count - 1);
                        pin.style.display = 'none';
                        icon.style.transform = 'scale(1)';
                    }
                    const countValEl = hud.querySelector('#fruit-count-val');
                    if (countValEl) countValEl.textContent = count;
                } else {
                    if (AppState.settings.soundEnabled) this.playSound('click');
                }
            };

            fruitsRow.appendChild(fruitWrap);
        });

        cloth.appendChild(fruitsRow);
        tableStage.appendChild(cloth);
        container.appendChild(tableStage);

        // Fila de Botones Táctiles Centrados
        const optionsRow = document.createElement('div');
        optionsRow.style.display = 'flex';
        optionsRow.style.alignItems = 'center';
        optionsRow.style.justifyContent = 'center';
        optionsRow.style.gap = '1.5rem';
        optionsRow.style.width = '100%';
        optionsRow.style.maxWidth = '850px';
        optionsRow.style.margin = '0 auto';
        optionsRow.style.flexShrink = '0';

        actividad.opciones.forEach((num, index) => {
            const btn = document.createElement('button');
            btn.className = 'tactile-btn tactile-btn-amber';
            btn.textContent = num;
            btn.onclick = () => {
                const esCorrecto = (index === actividad.respuesta) || (num === actividad.respuesta);
                if (esCorrecto) {
                    btn.style.background = 'linear-gradient(180deg, #34d399 0%, #059669 100%)';
                    btn.style.borderColor = '#047857';
                    btn.style.boxShadow = '0 8px 0 #064e3b, 0 12px 20px rgba(5, 150, 105, 0.4)';
                }
                this.feedback(esCorrecto, btn, null, onComplete);
            };
            optionsRow.appendChild(btn);
        });
        container.appendChild(optionsRow);
    },

    renderBalanza(actividad, container, onComplete) {
        container.innerHTML = '';
        container.style.position = 'relative';
        container.style.width = '100%';
        container.style.height = '100%';
        container.style.display = 'flex';
        container.style.flexDirection = 'column';
        container.style.alignItems = 'center';
        container.style.justifyContent = 'space-between';
        container.style.padding = '6.2rem 2rem 1.6rem 2rem';
        container.style.boxSizing = 'border-box';
        container.style.background = 'radial-gradient(ellipse at 50% 90%, #e0f2fe 0%, #f0fdf4 40%, #ffffff 100%)';
        container.style.overflow = 'hidden';

        const targetPesoIzq = actividad.pesoIzquierda !== undefined ? actividad.pesoIzquierda : 8;
        const textoOpIzq = actividad.operacionIzquierda || `${targetPesoIzq}`;
        const textoOpDer = actividad.operacionDerecha || '?';

        // HUD flotante estilo Burbujas
        const hud = document.createElement('div');
        hud.style.position = 'absolute';
        hud.style.top = '18px';
        hud.style.left = '50%';
        hud.style.transform = 'translateX(-50%)';
        hud.style.zIndex = '50';
        hud.style.background = 'linear-gradient(135deg, #1e3a8a 0%, #0284c7 100%)';
        hud.style.padding = '0.65rem 2.4rem';
        hud.style.borderRadius = '9999px';
        hud.style.boxShadow = '0 10px 25px rgba(2, 132, 199, 0.35)';
        hud.style.border = '2.5px solid #ffffff';
        hud.style.display = 'flex';
        hud.style.alignItems = 'center';
        hud.style.gap = '1.6rem';
        hud.style.pointerEvents = 'none';
        hud.style.whiteSpace = 'nowrap';
        hud.style.width = 'max-content';
        hud.style.maxWidth = '92vw';
        hud.style.boxSizing = 'border-box';

        hud.innerHTML = `
            <div style="display: flex; align-items: center; gap: 0.6rem; font-size: 1.15rem; white-space: nowrap; font-weight: 900; color: #ffffff; text-shadow: 0 1px 3px rgba(0,0,0,0.35);">
                <span>${actividad.pregunta || '¡Equilibra la balanza! Resuelve la operación del platillo izquierdo:'}</span>
            </div>
            <div id="balanza-status-badge" style="background: rgba(255, 255, 255, 0.22); color: #fef08a; font-weight: 900; font-size: 1.1rem; padding: 0.35rem 1.1rem; border-radius: 9999px; border: 1.5px solid rgba(255, 255, 255, 0.45); text-shadow: 0 1px 2px rgba(0,0,0,0.3);">
                Desequilibrada
            </div>
        `;
        container.appendChild(hud);

        // Escenario Balanza SVG 100% Conectada
        const scaleBox = document.createElement('div');
        scaleBox.style.width = '100%';
        scaleBox.style.maxWidth = '820px';
        scaleBox.style.height = '370px';
        scaleBox.style.margin = 'auto 0';
        scaleBox.style.display = 'flex';
        scaleBox.style.alignItems = 'center';
        scaleBox.style.justifyContent = 'center';

        const fontIzq = textoOpIzq.length > 5 ? '26' : '34';
        const fontDer = textoOpDer.length > 4 ? '26' : (textoOpDer === '?' ? '42' : '32');

        scaleBox.innerHTML = `
            <svg viewBox="0 0 800 440" style="width: 100%; height: 100%; filter: drop-shadow(0 12px 20px rgba(0,0,0,0.15));">
                <defs>
                    <linearGradient id="woodGrad" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stop-color="#b45309" />
                        <stop offset="50%" stop-color="#78350f" />
                        <stop offset="100%" stop-color="#451a03" />
                    </linearGradient>
                    <linearGradient id="brassPillarGrad" x1="0" y1="0" x2="1" y2="0">
                        <stop offset="0%" stop-color="#b45309" />
                        <stop offset="30%" stop-color="#fef08a" />
                        <stop offset="70%" stop-color="#f59e0b" />
                        <stop offset="100%" stop-color="#78350f" />
                    </linearGradient>
                    <linearGradient id="beamGrad" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stop-color="#fef08a" />
                        <stop offset="35%" stop-color="#f59e0b" />
                        <stop offset="85%" stop-color="#d97706" />
                        <stop offset="100%" stop-color="#78350f" />
                    </linearGradient>
                    <linearGradient id="dishGrad" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stop-color="#fef08a" />
                        <stop offset="50%" stop-color="#f59e0b" />
                        <stop offset="100%" stop-color="#b45309" />
                    </linearGradient>
                    <radialGradient id="dialGrad" cx="50%" cy="100%" r="100%">
                        <stop offset="0%" stop-color="#ffffff" />
                        <stop offset="60%" stop-color="#fef08a" />
                        <stop offset="100%" stop-color="#d97706" />
                    </radialGradient>
                </defs>

                <!-- Base de Madera Tallada -->
                <rect x="260" y="405" width="280" height="26" rx="13" fill="url(#woodGrad)" stroke="#451a03" stroke-width="3" />
                <rect x="290" y="399" width="220" height="9" rx="4.5" fill="url(#beamGrad)" stroke="#78350f" stroke-width="2" />

                <!-- Columna Central Vertical de Bronce (CONECTADA DIRECTAMENTE DE 160 A 400) -->
                <rect x="388" y="160" width="24" height="240" rx="6" fill="url(#brassPillarGrad)" stroke="#78350f" stroke-width="2.5" />
                <rect x="384" y="375" width="32" height="8" rx="3" fill="url(#beamGrad)" stroke="#78350f" stroke-width="1.5" />
                <rect x="384" y="270" width="32" height="8" rx="3" fill="url(#beamGrad)" stroke="#78350f" stroke-width="1.5" />

                <!-- Cuadrante del Pivote -->
                <path d="M 330 160 A 70 70 0 0 1 470 160 Z" fill="url(#dialGrad)" stroke="#78350f" stroke-width="3" />
                <line x1="400" y1="160" x2="400" y2="100" stroke="#78350f" stroke-width="3" />
                <polygon points="400,95 396,102 404,102" fill="#78350f" />
                <text x="400" y="145" text-anchor="middle" font-size="14" font-weight="900" fill="#78350f">0°</text>

                <!-- Brazo y Platillos -->
                <g id="scaleBeam" style="transform-origin: 400px 160px; transform: rotate(-10deg); transition: transform 0.7s cubic-bezier(0.34, 1.56, 0.64, 1);">
                    <rect x="120" y="152" width="560" height="16" rx="8" fill="url(#beamGrad)" stroke="#78350f" stroke-width="2.5" />
                    
                    <!-- Aguja roja -->
                    <polygon points="397,160 403,160 401,98 399,98" fill="#dc2626" />
                    <circle cx="400" cy="98" r="4.5" fill="#ef4444" stroke="#991b1b" stroke-width="1.5" />

                    <!-- Ganchos -->
                    <circle cx="140" cy="160" r="9" fill="url(#beamGrad)" stroke="#78350f" stroke-width="2" />
                    <circle cx="660" cy="160" r="9" fill="url(#beamGrad)" stroke="#78350f" stroke-width="2" />

                    <!-- Platillo Izquierdo con Pizarrón -->
                    <g id="panLeft" style="transform-origin: 140px 160px; transform: rotate(10deg); transition: transform 0.7s cubic-bezier(0.34, 1.56, 0.64, 1);">
                        <line x1="140" y1="160" x2="80" y2="280" stroke="#b45309" stroke-width="3" stroke-linecap="round" />
                        <line x1="140" y1="160" x2="200" y2="280" stroke="#b45309" stroke-width="3" stroke-linecap="round" />
                        <ellipse cx="140" cy="285" rx="72" ry="18" fill="url(#dishGrad)" stroke="#78350f" stroke-width="3" />

                        <!-- Pizarrín Escolar Izquierdo -->
                        <rect x="75" y="195" width="130" height="85" rx="14" fill="#78350f" stroke="#451a03" stroke-width="3" />
                        <rect x="83" y="203" width="114" height="69" rx="8" fill="#1e293b" />
                        <text x="140" y="250" text-anchor="middle" font-size="${fontIzq}" font-weight="900" fill="#ffffff" font-family="'Comic Sans MS', cursive, sans-serif">${textoOpIzq}</text>
                    </g>

                    <!-- Platillo Derecho con Incógnita / Pizarrón Derecho -->
                    <g id="panRight" style="transform-origin: 660px 160px; transform: rotate(10deg); transition: transform 0.7s cubic-bezier(0.34, 1.56, 0.64, 1);">
                        <line x1="660" y1="160" x2="600" y2="280" stroke="#b45309" stroke-width="3" stroke-linecap="round" />
                        <line x1="660" y1="160" x2="720" y2="280" stroke="#b45309" stroke-width="3" stroke-linecap="round" />
                        <ellipse cx="660" cy="285" rx="72" ry="18" fill="url(#dishGrad)" stroke="#78350f" stroke-width="3" />

                        <g id="mysteryBox">
                            <rect x="595" y="195" width="130" height="85" rx="14" fill="#3b82f6" stroke="#1d4ed8" stroke-width="3" />
                            <rect x="603" y="203" width="114" height="69" rx="8" fill="#1e293b" />
                            <text x="660" y="250" text-anchor="middle" font-size="${fontDer}" font-weight="900" fill="#ffffff" font-family="'Comic Sans MS', cursive, sans-serif">${textoOpDer}</text>
                        </g>
                    </g>
                </g>

                <!-- Tapa del Pivote -->
                <circle cx="400" cy="160" r="20" fill="url(#brassPillarGrad)" stroke="#78350f" stroke-width="3" />
                <circle cx="400" cy="160" r="8" fill="#451a03" />
                <circle cx="397" cy="157" r="3" fill="#ffffff" opacity="0.7" />
            </svg>
        `;
        container.appendChild(scaleBox);

        // Fila de Botones de Pesas Doradas Centrados
        const optionsRow = document.createElement('div');
        optionsRow.style.display = 'flex';
        optionsRow.style.alignItems = 'center';
        optionsRow.style.justifyContent = 'center';
        optionsRow.style.gap = '1.5rem';
        optionsRow.style.width = '100%';
        optionsRow.style.maxWidth = '850px';
        optionsRow.style.margin = '0 auto';
        optionsRow.style.flexShrink = '0';

        const pesoList = actividad.pesosOpciones || actividad.opciones || [6, 7, 8, 9];
        pesoList.forEach((num, index) => {
            const btn = document.createElement('button');
            btn.className = 'tactile-btn tactile-btn-brass';
            btn.innerHTML = `
                <span class="tactile-btn-brass-num">${num}</span>
                <span class="tactile-btn-brass-sub">Pesas</span>
            `;

            btn.onclick = () => {
                const esCorrecto = (num === actividad.respuesta) || (index === actividad.respuesta);
                const beam = scaleBox.querySelector('#scaleBeam');
                const panL = scaleBox.querySelector('#panLeft');
                const panR = scaleBox.querySelector('#panRight');
                const mystery = scaleBox.querySelector('#mysteryBox');
                const badgeEl = hud.querySelector('#balanza-status-badge');

                if (esCorrecto) {
                    if (beam) beam.style.transform = 'rotate(0deg)';
                    if (panL) panL.style.transform = 'rotate(0deg)';
                    if (panR) panR.style.transform = 'rotate(0deg)';
                    if (mystery) {
                        const solvedText = textoOpDer === '?' ? `${num} ✓` : `${textoOpDer.replace('?', num)} ✓`;
                        const fs = solvedText.length > 7 ? '22' : (solvedText.length > 5 ? '26' : '32');
                        mystery.innerHTML = `
                            <rect x="595" y="195" width="130" height="85" rx="14" fill="#10b981" stroke="#047857" stroke-width="3" />
                            <rect x="603" y="203" width="114" height="69" rx="8" fill="#065f46" />
                            <text x="660" y="250" text-anchor="middle" font-size="${fs}" font-weight="900" fill="#ffffff" font-family="'Comic Sans MS', cursive, sans-serif">${solvedText}</text>
                        `;
                    }
                    if (badgeEl) {
                        badgeEl.style.background = 'rgba(16, 185, 129, 0.45)';
                        badgeEl.style.color = '#ffffff';
                        badgeEl.innerHTML = '¡Equilibrada!';
                    }
                    if (AppState.settings.soundEnabled) this.playSound('success');
                    setTimeout(() => onComplete(true), 1100);
                } else {
                    if (beam) {
                        beam.style.transform = 'rotate(-14deg)';
                        setTimeout(() => { beam.style.transform = 'rotate(-10deg)'; }, 350);
                    }
                    btn.style.animation = 'shake 0.4s';
                    if (AppState.settings.soundEnabled) this.playSound('error');
                    setTimeout(() => { btn.style.animation = ''; }, 450);
                }
            };
            optionsRow.appendChild(btn);
        });
        container.appendChild(optionsRow);
    },

    renderOrdenarNumeros(actividad, container, onComplete) {
        container.innerHTML = '';
        container.style.position = 'relative';
        container.style.width = '100%';
        container.style.height = '100%';
        container.style.display = 'flex';
        container.style.flexDirection = 'column';
        container.style.alignItems = 'center';
        container.style.justifyContent = 'space-between';
        container.style.padding = '6.2rem 2rem 1.6rem 2rem';
        container.style.boxSizing = 'border-box';
        container.style.background = 'radial-gradient(ellipse at 50% 90%, #e0f2fe 0%, #f0fdf4 40%, #ffffff 100%)';
        container.style.overflow = 'hidden';

        const isMenorMayor = actividad.direccion !== 'mayor_a_menor';
        const totalSlots = actividad.numeros.length;
        let placedCount = 0;
        let selectedToken = null;

        // HUD flotante estilo Burbujas
        const hud = document.createElement('div');
        hud.style.position = 'absolute';
        hud.style.top = '18px';
        hud.style.left = '50%';
        hud.style.transform = 'translateX(-50%)';
        hud.style.zIndex = '50';
        hud.style.background = 'linear-gradient(135deg, #1e3a8a 0%, #0284c7 100%)';
        hud.style.padding = '0.65rem 2.4rem';
        hud.style.borderRadius = '9999px';
        hud.style.boxShadow = '0 10px 25px rgba(2, 132, 199, 0.35)';
        hud.style.border = '2.5px solid #ffffff';
        hud.style.display = 'flex';
        hud.style.alignItems = 'center';
        hud.style.gap = '1.6rem';
        hud.style.pointerEvents = 'none';
        hud.style.whiteSpace = 'nowrap';
        hud.style.width = 'max-content';
        hud.style.maxWidth = '92vw';
        hud.style.boxSizing = 'border-box';

        hud.innerHTML = `
            <div style="display: flex; align-items: center; gap: 0.6rem; font-size: 1.15rem; white-space: nowrap; font-weight: 900; color: #ffffff; text-shadow: 0 1px 3px rgba(0,0,0,0.35);">
                <span>¡Coloca cada número en su casilla de la regla!</span>
            </div>
            <div style="background: rgba(255, 255, 255, 0.22); color: #fef08a; font-weight: 900; font-size: 1.1rem; padding: 0.35rem 1.1rem; border-radius: 9999px; border: 1.5px solid rgba(255, 255, 255, 0.45); text-shadow: 0 1px 2px rgba(0,0,0,0.3);">
                Colocados: <span id="ordenar-counter" style="color: #ffffff;">0</span> / ${totalSlots}
            </div>
        `;
        container.appendChild(hud);

        const rMin = actividad.rulerMin !== undefined ? actividad.rulerMin : 0;
        const rMax = actividad.rulerMax !== undefined ? actividad.rulerMax : 10;
        const rStep = actividad.rulerStep || (rMax <= 10 ? 1 : (rMax <= 20 ? 2 : 5));

        const refValues = actividad.referencias || [
            rMin,
            Math.round((rMin + rMax) / 2),
            rMax
        ];

        // Escenario Gran Regla Escolar Panorámica
        const rulerStage = document.createElement('div');
        rulerStage.style.width = '100%';
        rulerStage.style.maxWidth = '980px';
        rulerStage.style.flex = '1';
        rulerStage.style.maxHeight = '340px';
        rulerStage.style.position = 'relative';
        rulerStage.style.display = 'flex';
        rulerStage.style.alignItems = 'center';
        rulerStage.style.justifyContent = 'center';
        rulerStage.style.margin = '0.8rem 0';

        // Cuerpo de la regla
        const rulerBody = document.createElement('div');
        rulerBody.style.position = 'absolute';
        rulerBody.style.bottom = '40px';
        rulerBody.style.left = '0';
        rulerBody.style.right = '0';
        rulerBody.style.height = '110px';
        rulerBody.style.background = 'linear-gradient(180deg, #fef08a 0%, #fde047 30%, #eab308 100%)';
        rulerBody.style.borderRadius = '22px';
        rulerBody.style.border = '4px solid #ca8a04';
        rulerBody.style.boxShadow = '0 14px 30px rgba(202, 138, 4, 0.25), inset 0 2px 5px rgba(255,255,255,0.7)';

        const hole = document.createElement('div');
        hole.style.position = 'absolute';
        hole.style.left = '22px';
        hole.style.top = '50%';
        hole.style.transform = 'translateY(-50%)';
        hole.style.width = '24px';
        hole.style.height = '24px';
        hole.style.borderRadius = '50%';
        hole.style.background = '#94a3b8';
        hole.style.border = '3px solid #ca8a04';
        hole.style.boxShadow = 'inset 0 2px 4px rgba(0,0,0,0.4)';
        rulerBody.appendChild(hole);

        const ticks = document.createElement('div');
        ticks.style.position = 'absolute';
        ticks.style.left = '8%';
        ticks.style.width = '84%';
        ticks.style.top = '0';
        ticks.style.height = '100%';

        const tickLabelsMap = new Map();

        for (let v = rMin; v <= rMax; v += rStep) {
            const pct = ((v - rMin) / (rMax - rMin)) * 100;
            const isAnchor = refValues.includes(v);

            const mark = document.createElement('div');
            mark.style.position = 'absolute';
            mark.style.left = `${pct}%`;
            mark.style.top = '0';
            mark.style.transform = 'translateX(-50%)';
            mark.style.display = 'flex';
            mark.style.flexDirection = 'column';
            mark.style.alignItems = 'center';

            const line = document.createElement('div');
            line.style.width = isAnchor ? '3.5px' : '2px';
            line.style.height = isAnchor ? '32px' : '20px';
            line.style.background = '#78350f';
            mark.appendChild(line);

            const lbl = document.createElement('span');
            lbl.style.fontSize = isAnchor ? '1.2rem' : '0.92rem';
            lbl.style.fontWeight = '900';
            lbl.style.color = '#78350f';
            lbl.style.marginTop = '6px';
            if (isAnchor) lbl.textContent = v;
            mark.appendChild(lbl);

            ticks.appendChild(mark);
            tickLabelsMap.set(v, lbl);
        }
        rulerBody.appendChild(ticks);
        rulerStage.appendChild(rulerBody);

        // Crear casillas (slots) de la regla - 100% libres, ninguna preseleccionada
        const slots = actividad.numeros.map(num => {
            const pct = 8 + (((num - rMin) / (rMax - rMin)) * 84);

            const slotWrap = document.createElement('div');
            slotWrap.style.position = 'absolute';
            slotWrap.style.left = `${pct}%`;
            slotWrap.style.bottom = '165px';
            slotWrap.style.transform = 'translateX(-50%)';
            slotWrap.style.display = 'flex';
            slotWrap.style.flexDirection = 'column';
            slotWrap.style.alignItems = 'center';
            slotWrap.style.zIndex = '5';
            slotWrap.style.cursor = 'pointer';

            const pinCircle = document.createElement('div');
            pinCircle.style.width = '68px';
            pinCircle.style.height = '68px';
            pinCircle.style.borderRadius = '50%';
            pinCircle.style.border = '3.5px dashed #94a3b8';
            pinCircle.style.background = 'rgba(255, 255, 255, 0.95)';
            pinCircle.style.display = 'flex';
            pinCircle.style.alignItems = 'center';
            pinCircle.style.justifyContent = 'center';
            pinCircle.style.fontSize = '2rem';
            pinCircle.style.fontWeight = '900';
            pinCircle.style.color = '#94a3b8';
            pinCircle.style.boxShadow = '0 6px 14px rgba(0,0,0,0.1)';
            pinCircle.style.transition = 'all 0.22s cubic-bezier(0.16, 1, 0.3, 1)';
            pinCircle.textContent = '?';
            slotWrap.appendChild(pinCircle);

            const arrow = document.createElement('div');
            arrow.style.fontSize = '1.4rem';
            arrow.style.color = '#ca8a04';
            arrow.style.marginTop = '-2px';
            arrow.textContent = '▼';
            slotWrap.appendChild(arrow);

            rulerStage.appendChild(slotWrap);

            return {
                targetNum: num,
                isFilled: false,
                wrap: slotWrap,
                pin: pinCircle,
                arrow: arrow
            };
        });

        container.appendChild(rulerStage);

        const resetSlotNeutral = (slot) => {
            if (slot.isFilled) return;
            slot.pin.style.background = 'rgba(255, 255, 255, 0.95)';
            slot.pin.style.border = '3.5px dashed #94a3b8';
            slot.pin.style.color = '#94a3b8';
            slot.pin.style.boxShadow = '0 6px 14px rgba(0,0,0,0.1)';
            slot.pin.style.transform = 'scale(1)';
            slot.pin.textContent = '?';
            slot.pin.style.animation = '';
        };

        const showSlotHover = (slot) => {
            if (slot.isFilled) return;
            slot.pin.style.border = '3.5px solid #0284c7';
            slot.pin.style.boxShadow = '0 0 22px rgba(2, 132, 199, 0.7)';
            slot.pin.style.background = '#e0f2fe';
            slot.pin.style.color = '#0284c7';
            slot.pin.style.transform = 'scale(1.15)';
        };

        const deselectToken = () => {
            if (selectedToken) {
                selectedToken.btn.style.transform = 'scale(1)';
                selectedToken.btn.style.boxShadow = '';
                selectedToken.btn.style.borderColor = '';
                selectedToken = null;
            }
            slots.filter(s => !s.isFilled).forEach(s => resetSlotNeutral(s));
        };

        const evaluatePlacement = (num, btn, slot) => {
            if (slot.isFilled) return;

            if (num === slot.targetNum) {
                // ¡Acierto! Se bloquea en verde en su posición exacta
                slot.isFilled = true;
                slot.pin.style.background = 'linear-gradient(180deg, #10b981 0%, #059669 100%)';
                slot.pin.style.border = '3.5px solid #047857';
                slot.pin.style.color = '#ffffff';
                slot.pin.style.boxShadow = '0 8px 22px rgba(16, 185, 129, 0.45)';
                slot.pin.style.transform = 'scale(1.18)';
                slot.pin.textContent = num;
                slot.pin.style.animation = '';
                setTimeout(() => { slot.pin.style.transform = 'scale(1)'; }, 220);

                const tickLbl = tickLabelsMap.get(num);
                if (tickLbl) {
                    tickLbl.textContent = num;
                    tickLbl.style.color = '#15803d';
                    tickLbl.style.background = '#dcfce7';
                    tickLbl.style.padding = '2px 6px';
                    tickLbl.style.borderRadius = '6px';
                    tickLbl.style.fontWeight = '900';
                }

                btn.style.visibility = 'hidden';
                btn.disabled = true;

                if (selectedToken && selectedToken.btn === btn) {
                    selectedToken = null;
                }

                placedCount++;
                const ordCounterEl = hud.querySelector('#ordenar-counter');
                if (ordCounterEl) ordCounterEl.textContent = placedCount;

                if (AppState.settings.soundEnabled) Activities.playSound('success');

                slots.filter(s => !s.isFilled).forEach(s => resetSlotNeutral(s));

                if (placedCount === totalSlots) {
                    setTimeout(() => onComplete(true), 900);
                }
            } else {
                // ¡Error! La casilla se pone en ROJO con animación shake
                slot.pin.style.background = 'linear-gradient(180deg, #ef4444 0%, #dc2626 100%)';
                slot.pin.style.border = '3.5px solid #b91c1c';
                slot.pin.style.color = '#ffffff';
                slot.pin.style.boxShadow = '0 8px 22px rgba(239, 68, 68, 0.55)';
                slot.pin.style.transform = 'scale(1.15)';
                slot.pin.textContent = num;
                slot.pin.style.animation = 'shake 0.45s ease';

                btn.style.animation = 'shake 0.45s ease';
                if (AppState.settings.soundEnabled) Activities.playSound('error');

                setTimeout(() => {
                    btn.style.animation = '';
                    if (!slot.isFilled) {
                        resetSlotNeutral(slot);
                    }
                }, 550);
            }
        };

        // Fichas Numéricas Táctiles Arrastrables (Bandeja Inferior)
        const optionsRow = document.createElement('div');
        optionsRow.style.display = 'flex';
        optionsRow.style.alignItems = 'center';
        optionsRow.style.justifyContent = 'center';
        optionsRow.style.gap = '1.5rem';
        optionsRow.style.width = '100%';
        optionsRow.style.maxWidth = '850px';
        optionsRow.style.margin = '0 auto';
        optionsRow.style.flexShrink = '0';

        // Permitir tocar cualquier casilla directamente para colocar ficha seleccionada
        slots.forEach(slot => {
            const onSlotClick = (e) => {
                if (e) e.stopPropagation();
                if (slot.isFilled) return;
                if (selectedToken) {
                    evaluatePlacement(selectedToken.num, selectedToken.btn, slot);
                } else {
                    slot.pin.style.animation = 'shake 0.3s ease';
                    setTimeout(() => { slot.pin.style.animation = ''; }, 300);
                }
            };
            slot.wrap.onclick = onSlotClick;
            slot.pin.onclick = onSlotClick;
        });

        const shuffled = [...actividad.numeros].sort(() => Math.random() - 0.5);

        shuffled.forEach(num => {
            const btn = document.createElement('button');
            btn.className = 'tactile-btn tactile-btn-white';
            btn.textContent = num;
            btn.style.cursor = 'grab';
            btn.style.touchAction = 'none';
            btn.style.userSelect = 'none';
            btn.style.position = 'relative';

            let isDragging = false;
            let startX = 0, startY = 0;
            let floatingEl = null;
            let activeHoveredSlot = null;

            const onPointerDown = (e) => {
                if (e.button !== undefined && e.button !== 0) return;
                isDragging = false;
                startX = e.clientX;
                startY = e.clientY;

                const onPointerMove = (moveEvt) => {
                    const dx = moveEvt.clientX - startX;
                    const dy = moveEvt.clientY - startY;

                    if (!isDragging && Math.hypot(dx, dy) > 6) {
                        isDragging = true;
                        btn.style.opacity = '0.3';
                        btn.style.cursor = 'grabbing';

                        floatingEl = document.createElement('div');
                        floatingEl.className = 'tactile-btn tactile-btn-white';
                        floatingEl.textContent = num;
                        floatingEl.style.position = 'fixed';
                        floatingEl.style.left = `${moveEvt.clientX}px`;
                        floatingEl.style.top = `${moveEvt.clientY}px`;
                        floatingEl.style.transform = 'translate(-50%, -50%) scale(1.15)';
                        floatingEl.style.zIndex = '99999';
                        floatingEl.style.pointerEvents = 'none';
                        floatingEl.style.boxShadow = '0 16px 36px rgba(59, 130, 246, 0.45), 0 0 0 3px #3b82f6';
                        floatingEl.style.transition = 'none';
                        document.body.appendChild(floatingEl);
                    }

                    if (isDragging && floatingEl) {
                        floatingEl.style.left = `${moveEvt.clientX}px`;
                        floatingEl.style.top = `${moveEvt.clientY}px`;

                        let closestSlot = null;
                        let minDist = Infinity;
                        slots.filter(s => !s.isFilled).forEach(s => {
                            const rect = s.pin.getBoundingClientRect();
                            const dist = Math.hypot(
                                moveEvt.clientX - (rect.left + rect.width / 2),
                                moveEvt.clientY - (rect.top + rect.height / 2)
                            );
                            if (dist < 85 && dist < minDist) {
                                minDist = dist;
                                closestSlot = s;
                            }
                        });

                        if (closestSlot !== activeHoveredSlot) {
                            if (activeHoveredSlot) resetSlotNeutral(activeHoveredSlot);
                            activeHoveredSlot = closestSlot;
                            if (activeHoveredSlot) showSlotHover(activeHoveredSlot);
                        }
                    }
                };

                const onPointerUp = (upEvt) => {
                    window.removeEventListener('pointermove', onPointerMove);
                    window.removeEventListener('pointerup', onPointerUp);
                    window.removeEventListener('pointercancel', onPointerUp);

                    btn.style.opacity = '1';
                    btn.style.cursor = 'grab';

                    if (isDragging && floatingEl) {
                        floatingEl.remove();
                        floatingEl = null;

                        let droppedSlot = null;
                        let minDist = Infinity;
                        slots.filter(s => !s.isFilled).forEach(s => {
                            const rect = s.pin.getBoundingClientRect();
                            const dist = Math.hypot(
                                upEvt.clientX - (rect.left + rect.width / 2),
                                upEvt.clientY - (rect.top + rect.height / 2)
                            );
                            if (dist < 95 && dist < minDist) {
                                minDist = dist;
                                droppedSlot = s;
                            }
                        });

                        if (activeHoveredSlot && activeHoveredSlot !== droppedSlot) {
                            resetSlotNeutral(activeHoveredSlot);
                        }
                        activeHoveredSlot = null;

                        if (droppedSlot) {
                            evaluatePlacement(num, btn, droppedSlot);
                        } else {
                            slots.filter(s => !s.isFilled).forEach(s => resetSlotNeutral(s));
                        }
                    } else {
                        onBtnTap();
                    }
                };

                window.addEventListener('pointermove', onPointerMove);
                window.addEventListener('pointerup', onPointerUp);
                window.addEventListener('pointercancel', onPointerUp);
            };

            const onBtnTap = () => {
                const unfilled = slots.filter(s => !s.isFilled);
                if (unfilled.length === 1) {
                    evaluatePlacement(num, btn, unfilled[0]);
                    return;
                }

                if (selectedToken && selectedToken.btn === btn) {
                    deselectToken();
                } else {
                    if (selectedToken) {
                        selectedToken.btn.style.transform = 'scale(1)';
                        selectedToken.btn.style.boxShadow = '';
                        selectedToken.btn.style.borderColor = '';
                    }
                    selectedToken = { num, btn };
                    btn.style.transform = 'scale(1.15)';
                    btn.style.borderColor = '#0284c7';
                    btn.style.boxShadow = '0 0 18px rgba(2, 132, 199, 0.7)';

                    slots.filter(s => !s.isFilled).forEach(s => {
                        s.pin.style.borderColor = '#0284c7';
                        s.pin.style.background = '#f0f9ff';
                    });
                }
            };

            let lastTapTime = 0;
            btn.onclick = (e) => {
                if (e) e.stopPropagation();
                if (Date.now() - lastTapTime < 250) return;
                lastTapTime = Date.now();
                onBtnTap();
            };

            btn.addEventListener('pointerdown', onPointerDown);
            optionsRow.appendChild(btn);
        });
        container.appendChild(optionsRow);
    },

    renderAdivinanzaNumeros(actividad, container, onComplete) {
        container.innerHTML = '';
        container.style.position = 'relative';
        container.style.width = '100%';
        container.style.height = '100%';
        container.style.display = 'flex';
        container.style.flexDirection = 'column';
        container.style.alignItems = 'center';
        container.style.justifyContent = 'space-between';
        container.style.padding = '6.2rem 2rem 1.6rem 2rem';
        container.style.boxSizing = 'border-box';
        container.style.background = 'radial-gradient(ellipse at 50% 90%, #e0f2fe 0%, #f0fdf4 40%, #ffffff 100%)';
        container.style.overflow = 'hidden';

        // HUD flotante estilo Burbujas (Púrpura Mágico)
        const hud = document.createElement('div');
        hud.style.position = 'absolute';
        hud.style.top = '18px';
        hud.style.left = '50%';
        hud.style.transform = 'translateX(-50%)';
        hud.style.zIndex = '50';
        hud.style.background = 'linear-gradient(135deg, #1e3a8a 0%, #0284c7 100%)';
        hud.style.padding = '0.65rem 2.4rem';
        hud.style.borderRadius = '9999px';
        hud.style.boxShadow = '0 10px 25px rgba(2, 132, 199, 0.35)';
        hud.style.border = '2.5px solid #ffffff';
        hud.style.display = 'flex';
        hud.style.alignItems = 'center';
        hud.style.gap = '1.6rem';
        hud.style.pointerEvents = 'none';
        hud.style.whiteSpace = 'nowrap';
        hud.style.width = 'max-content';
        hud.style.maxWidth = '92vw';
        hud.style.boxSizing = 'border-box';

        hud.innerHTML = `
            <div style="display: flex; align-items: center; gap: 0.6rem; font-size: 1.15rem; white-space: nowrap; font-weight: 900; color: #ffffff; text-shadow: 0 1px 3px rgba(0,0,0,0.35);">
                <span>${actividad.pregunta || 'El Enigma del Sabio: Descifra las pistas para hallar el número'}</span>
            </div>
            <div style="background: rgba(255, 255, 255, 0.22); color: #fef08a; font-weight: 900; font-size: 1.1rem; padding: 0.35rem 1.1rem; border-radius: 9999px; border: 1.5px solid rgba(255, 255, 255, 0.45); text-shadow: 0 1px 2px rgba(0,0,0,0.3);">
                Pistas
            </div>
        `;
        container.appendChild(hud);

        // Escenario Pergamino del Sabio
        const scrollBox = document.createElement('div');
        scrollBox.style.width = '100%';
        scrollBox.style.maxWidth = '800px';
        scrollBox.style.height = '260px';
        scrollBox.style.margin = 'auto 0';
        scrollBox.style.background = 'linear-gradient(180deg, #fefce8 0%, #fef9c3 100%)';
        scrollBox.style.borderRadius = '28px';
        scrollBox.style.border = '3.5px solid #d97706';
        scrollBox.style.boxShadow = '0 16px 36px rgba(217, 119, 6, 0.16), inset 0 2px 6px rgba(255,255,255,0.7)';
        scrollBox.style.padding = '1.5rem 2.5rem';
        scrollBox.style.display = 'flex';
        scrollBox.style.flexDirection = 'column';
        scrollBox.style.justifyContent = 'center';
        scrollBox.style.gap = '1.2rem';
        scrollBox.style.boxSizing = 'border-box';

        if (actividad.pistas && Array.isArray(actividad.pistas)) {
            actividad.pistas.forEach((p, i) => {
                const row = document.createElement('div');
                row.style.display = 'flex';
                row.style.alignItems = 'center';
                row.style.gap = '1.2rem';
                row.style.fontSize = '1.35rem';
                row.style.fontWeight = '800';
                row.style.color = '#713f12';

                const badge = document.createElement('span');
                badge.style.width = '34px';
                badge.style.height = '34px';
                badge.style.borderRadius = '50%';
                badge.style.background = '#fef08a';
                badge.style.border = '2.5px solid #d97706';
                badge.style.color = '#92400e';
                badge.style.fontWeight = '900';
                badge.style.fontSize = '1.15rem';
                badge.style.display = 'flex';
                badge.style.alignItems = 'center';
                badge.style.justifyContent = 'center';
                badge.style.flexShrink = '0';
                badge.textContent = `${i + 1}`;
                row.appendChild(badge);

                const tx = document.createElement('span');
                tx.textContent = p;
                row.appendChild(tx);

                scrollBox.appendChild(row);
            });
        } else {
            const riddleText = document.createElement('p');
            riddleText.style.fontSize = '1.6rem';
            riddleText.style.fontWeight = '800';
            riddleText.style.color = '#713f12';
            riddleText.style.lineHeight = '1.5';
            riddleText.innerHTML = `"${actividad.pista || actividad.pregunta}"`;
            scrollBox.appendChild(riddleText);
        }
        container.appendChild(scrollBox);

        // Fila de Runas Mágicas Táctiles Centradas
        const optionsRow = document.createElement('div');
        optionsRow.style.display = 'flex';
        optionsRow.style.alignItems = 'center';
        optionsRow.style.justifyContent = 'center';
        optionsRow.style.gap = '1.5rem';
        optionsRow.style.width = '100%';
        optionsRow.style.maxWidth = '850px';
        optionsRow.style.margin = '0 auto';
        optionsRow.style.flexShrink = '0';

        actividad.opciones.forEach((opcion, index) => {
            const btn = document.createElement('button');
            btn.className = 'tactile-btn tactile-btn-purple';
            btn.textContent = opcion;

            btn.onclick = () => {
                const esCorrecto = (index === actividad.respuesta) || (String(opcion) === String(actividad.respuesta));
                if (esCorrecto) {
                    btn.style.background = 'linear-gradient(180deg, #10b981 0%, #059669 100%)';
                    btn.style.borderColor = '#047857';
                    btn.style.color = '#ffffff';
                    if (AppState.settings.soundEnabled) this.playSound('success');
                    setTimeout(() => onComplete(true), 1100);
                } else {
                    btn.style.animation = 'shake 0.4s';
                    if (AppState.settings.soundEnabled) this.playSound('error');
                    setTimeout(() => { btn.style.animation = ''; }, 450);
                }
            };
            optionsRow.appendChild(btn);
        });
        container.appendChild(optionsRow);
    },

    renderDados(actividad, container, onComplete) {
        container.innerHTML = '';
        container.style.position = 'relative';
        container.style.width = '100%';
        container.style.height = '100%';
        container.style.display = 'flex';
        container.style.flexDirection = 'column';
        container.style.alignItems = 'center';
        container.style.justifyContent = 'space-between';
        container.style.padding = '6.2rem 2rem 1.6rem 2rem';
        container.style.boxSizing = 'border-box';
        container.style.background = 'radial-gradient(ellipse at 50% 90%, #e0f2fe 0%, #f0fdf4 40%, #ffffff 100%)';
        container.style.overflow = 'hidden';

        let pips = 0;

        // HUD flotante estilo Burbujas
        const hud = document.createElement('div');
        hud.style.position = 'absolute';
        hud.style.top = '18px';
        hud.style.left = '50%';
        hud.style.transform = 'translateX(-50%)';
        hud.style.zIndex = '50';
        hud.style.background = 'linear-gradient(135deg, #1e3a8a 0%, #0284c7 100%)';
        hud.style.padding = '0.65rem 2.4rem';
        hud.style.borderRadius = '9999px';
        hud.style.boxShadow = '0 10px 25px rgba(2, 132, 199, 0.35)';
        hud.style.border = '2.5px solid #ffffff';
        hud.style.display = 'flex';
        hud.style.alignItems = 'center';
        hud.style.gap = '1.6rem';
        hud.style.pointerEvents = 'none';
        hud.style.whiteSpace = 'nowrap';
        hud.style.width = 'max-content';
        hud.style.maxWidth = '92vw';
        hud.style.boxSizing = 'border-box';

        hud.innerHTML = `
            <div style="display: flex; align-items: center; gap: 0.6rem; font-size: 1.15rem; font-weight: 900; color: #ffffff; text-shadow: 0 1px 3px rgba(0,0,0,0.35); white-space: nowrap;">
                <span>${actividad.pregunta || '¡Han rodado los dados! Toca los puntos para contarlos:'}</span>
            </div>
            <div style="background: rgba(255, 255, 255, 0.22); color: #fef08a; font-weight: 900; font-size: 1.1rem; padding: 0.35rem 1.1rem; border-radius: 9999px; border: 1.5px solid rgba(255, 255, 255, 0.45); text-shadow: 0 1px 2px rgba(0,0,0,0.3); white-space: nowrap; flex-shrink: 0;">
                Puntos: <span id="pips-count-val" style="color: #ffffff;">0</span>
            </div>
        `;
        container.appendChild(hud);

        // Escenario Abierto para Dados
        const diceStage = document.createElement('div');
        diceStage.style.display = 'flex';
        diceStage.style.flexDirection = 'column';
        diceStage.style.alignItems = 'center';
        diceStage.style.justifyContent = 'center';
        diceStage.style.gap = '2.4rem';
        diceStage.style.margin = 'auto 0';
        diceStage.style.width = '100%';
        diceStage.style.maxWidth = '850px';

        // Dados 3D de Color Verde Esmeralda (Siempre 3 dados)
        let currentDiceValues = (actividad.dados && actividad.dados.length === 3)
            ? [...actividad.dados]
            : [actividad.dado1 || 3, actividad.dado2 || 4, actividad.dado3 || 5];
        while (currentDiceValues.length < 3) {
            currentDiceValues.push(Math.floor(Math.random() * 6) + 1);
        }
        if (currentDiceValues.length > 3) {
            currentDiceValues = currentDiceValues.slice(0, 3);
        }
        let currentSum = currentDiceValues.reduce((a, b) => a + b, 0);

        const diceRow = document.createElement('div');
        diceRow.style.display = 'flex';
        diceRow.style.alignItems = 'center';
        diceRow.style.justifyContent = 'center';
        diceRow.style.gap = '2.5rem';
        diceRow.style.perspective = '1000px';

        const dotPositions = {
            1: [4],
            2: [2, 6],
            3: [2, 4, 6],
            4: [0, 2, 6, 8],
            5: [0, 2, 4, 6, 8],
            6: [0, 2, 3, 5, 6, 8]
        };

        const diceElements = [];

        const setDieDots = (dieElement, val) => {
            dieElement.innerHTML = '';
            const active = dotPositions[val] || [4];
            for (let i = 0; i < 9; i++) {
                const c = document.createElement('div');
                c.style.display = 'flex';
                c.style.alignItems = 'center';
                c.style.justifyContent = 'center';

                if (active.includes(i)) {
                    const pt = document.createElement('div');
                    pt.style.width = '24px';
                    pt.style.height = '24px';
                    pt.style.borderRadius = '50%';
                    pt.style.background = '#ffffff';
                    pt.style.boxShadow = '0 2px 5px rgba(0,0,0,0.3), inset 0 1px 2px rgba(0,0,0,0.2)';
                    pt.style.cursor = 'pointer';
                    pt.style.transition = 'all 0.18s cubic-bezier(0.34, 1.56, 0.64, 1)';

                    let marked = false;
                    pt.onclick = (e) => {
                        e.stopPropagation();
                        marked = !marked;
                        if (marked) {
                            pips++;
                            pt.style.background = '#fef08a';
                            pt.style.transform = 'scale(1.35)';
                            pt.style.boxShadow = '0 0 12px #fde047';
                            if (AppState.settings.soundEnabled) Activities.playSound('success');
                        } else {
                            pips = Math.max(0, pips - 1);
                            pt.style.background = '#ffffff';
                            pt.style.transform = 'scale(1)';
                            pt.style.boxShadow = '0 2px 5px rgba(0,0,0,0.3), inset 0 1px 2px rgba(0,0,0,0.2)';
                        }
                        const pipsValEl = hud.querySelector('#pips-count-val');
                        if (pipsValEl) pipsValEl.textContent = pips;
                    };
                    c.appendChild(pt);
                }
                dieElement.appendChild(c);
            }
        };

        const makeDie = (val, idx) => {
            const d = document.createElement('div');
            d.style.width = '135px';
            d.style.height = '135px';
            d.style.background = 'linear-gradient(145deg, #10b981 0%, #059669 60%, #047857 100%)';
            d.style.borderRadius = '28px';
            d.style.border = '4px solid #064e3b';
            d.style.boxShadow = '0 16px 32px rgba(5, 150, 105, 0.38), inset 0 2px 5px rgba(255,255,255,0.4), inset 0 -4px 6px rgba(0,0,0,0.3)';
            d.style.display = 'grid';
            d.style.gridTemplate = 'repeat(3, 1fr) / repeat(3, 1fr)';
            d.style.padding = '16px';
            d.style.boxSizing = 'border-box';
            d.style.userSelect = 'none';
            d.style.cursor = 'pointer';
            d.style.transition = 'transform 0.4s cubic-bezier(0.16, 1, 0.3, 1)';

            const initialTilt = (idx === 0 ? -4 : (idx === 1 ? 5 : -2));
            d.style.transform = `rotate(${initialTilt}deg)`;

            setDieDots(d, val);

            // Girar individualmente al tocar el dado
            d.onclick = () => {
                const restingAngle = Math.floor(Math.random() * 24) - 12;
                const spin = (Math.random() > 0.5 ? 360 : -360) + restingAngle;
                d.style.transition = 'transform 0.5s cubic-bezier(0.2, 0.9, 0.3, 1)';
                d.style.transform = `rotate(${spin}deg) scale(1.12)`;
                if (AppState.settings.soundEnabled) Activities.playSound('dice');
                setTimeout(() => {
                    d.style.transform = `rotate(${restingAngle}deg) scale(1)`;
                }, 500);
            };

            return d;
        };

        currentDiceValues.forEach((val, idx) => {
            const die = makeDie(val, idx);
            diceElements.push({ die, val });
            diceRow.appendChild(die);

            if (idx < 2) {
                const plus = document.createElement('span');
                plus.textContent = '+';
                plus.style.fontSize = '3.5rem';
                plus.style.fontWeight = '900';
                plus.style.color = '#0284c7';
                plus.style.textShadow = '0 3px 8px rgba(2, 132, 199, 0.25)';
                diceRow.appendChild(plus);
            }
        });
        diceStage.appendChild(diceRow);

        // Controles de Ecuación y Botón Rodar
        const footer = document.createElement('div');
        footer.style.display = 'flex';
        footer.style.gap = '2rem';
        footer.style.alignItems = 'center';
        footer.style.justifyContent = 'center';

        const eq = document.createElement('div');
        eq.style.background = '#ffffff';
        eq.style.padding = '0.55rem 2rem';
        eq.style.borderRadius = '9999px';
        eq.style.border = '2.5px solid #0284c7';
        eq.style.color = '#0f172a';
        eq.style.fontSize = '1.6rem';
        eq.style.fontWeight = '900';
        eq.style.boxShadow = '0 8px 24px rgba(2, 132, 199, 0.15)';
        eq.innerHTML = `<span>${currentDiceValues.join(' + ')} = <strong style="color: #0284c7;">?</strong></span>`;
        footer.appendChild(eq);

        const rollBtn = document.createElement('button');
        rollBtn.className = 'tactile-btn tactile-btn-amber';
        rollBtn.style.padding = '0.65rem 1.8rem';
        rollBtn.style.fontSize = '1.15rem';
        rollBtn.style.borderRadius = '9999px';
        rollBtn.textContent = '🎲 ¡Lanzar Dados Nuevos!';

        // Fila de Botones Azules Táctiles Centrados
        const optionsRow = document.createElement('div');
        optionsRow.style.display = 'flex';
        optionsRow.style.alignItems = 'center';
        optionsRow.style.justifyContent = 'center';
        optionsRow.style.gap = '1.5rem';
        optionsRow.style.width = '100%';
        optionsRow.style.maxWidth = '850px';
        optionsRow.style.margin = '0 auto';
        optionsRow.style.flexShrink = '0';

        // Generador dinámico de 4 opciones para una suma
        const generateOptionsForSum = (sum) => {
            const opts = new Set([sum]);
            const deltas = [-3, -2, -1, 1, 2, 3, 4, -4, 5, -5];
            for (let i = deltas.length - 1; i > 0; i--) {
                const j = Math.floor(Math.random() * (i + 1));
                [deltas[i], deltas[j]] = [deltas[j], deltas[i]];
            }
            for (const d of deltas) {
                if (opts.size >= 4) break;
                const cand = sum + d;
                if (cand >= 3 && cand <= 18) opts.add(cand);
            }
            let fill = 3;
            while (opts.size < 4) {
                if (!opts.has(fill)) opts.add(fill);
                fill++;
            }
            const arr = Array.from(opts);
            for (let i = arr.length - 1; i > 0; i--) {
                const j = Math.floor(Math.random() * (i + 1));
                [arr[i], arr[j]] = [arr[j], arr[i]];
            }
            return arr;
        };

        const renderOptionButtons = (sum) => {
            optionsRow.innerHTML = '';
            const opts = generateOptionsForSum(sum);
            opts.forEach((num) => {
                const btn = document.createElement('button');
                btn.className = 'tactile-btn tactile-btn-blue';
                btn.textContent = num;

                btn.onclick = () => {
                    const esCorrecto = (num === sum);
                    if (esCorrecto) {
                        btn.style.background = 'linear-gradient(180deg, #34d399 0%, #059669 100%)';
                        btn.style.borderColor = '#047857';
                        btn.style.boxShadow = '0 8px 0 #064e3b, 0 12px 20px rgba(5, 150, 105, 0.4)';
                        eq.innerHTML = `<span>${currentDiceValues.join(' + ')} = <strong style="color: #34d399;">${num}</strong> ✓</span>`;
                    }
                    this.feedback(esCorrecto, btn, null, onComplete);
                };
                optionsRow.appendChild(btn);
            });
        };

        const rollDice = (isInitial = false) => {
            if (AppState.settings.soundEnabled) Activities.playSound('dice');
            rollBtn.disabled = true;

            pips = 0;
            const pipsValEl = hud.querySelector('#pips-count-val');
            if (pipsValEl) pipsValEl.textContent = 0;

            if (!isInitial) {
                // Generar 3 valores completamente nuevos aleatorios
                currentDiceValues = [
                    Math.floor(Math.random() * 6) + 1,
                    Math.floor(Math.random() * 6) + 1,
                    Math.floor(Math.random() * 6) + 1
                ];
                currentSum = currentDiceValues.reduce((a, b) => a + b, 0);
            }

            diceElements.forEach((item, idx) => {
                const { die } = item;
                const targetVal = currentDiceValues[idx];
                const spinDirection = Math.random() > 0.5 ? 1 : -1;
                const fullSpins = (Math.floor(Math.random() * 2) + 1) * 360 * spinDirection;
                const restingAngle = Math.floor(Math.random() * 24) - 12;
                const totalRotation = fullSpins + restingAngle;

                die.style.transition = 'transform 0.65s cubic-bezier(0.2, 0.9, 0.3, 1)';
                die.style.transform = `rotate(${totalRotation}deg) scale(1.18)`;

                let flickerCount = 0;
                const flickerInterval = setInterval(() => {
                    flickerCount++;
                    const tempVal = Math.floor(Math.random() * 6) + 1;
                    setDieDots(die, tempVal);
                    if (flickerCount >= 6) {
                        clearInterval(flickerInterval);
                        setDieDots(die, targetVal);
                        die.style.transform = `rotate(${restingAngle}deg) scale(1)`;
                    }
                }, 75);
            });

            setTimeout(() => {
                eq.innerHTML = `<span>${currentDiceValues.join(' + ')} = <strong style="color: #0284c7;">?</strong></span>`;
                renderOptionButtons(currentSum);
                rollBtn.disabled = false;
            }, 720);
        };

        rollBtn.onclick = () => rollDice(false);

        // Inicializar opciones acordes a los dados iniciales
        renderOptionButtons(currentSum);

        // Giro aleatorio inicial al entrar a la actividad
        setTimeout(() => rollDice(true), 150);

        footer.appendChild(rollBtn);
        diceStage.appendChild(footer);
        container.appendChild(diceStage);
        container.appendChild(optionsRow);
    },

    // ==========================================
    // ACTIVIDADES DE CONOCIMIENTO DEL MEDIO (CIENCIAS)
    // ==========================================

    renderReciclaje(actividad, container, onComplete) {
        container.innerHTML = '';
        container.style.position = 'relative';
        container.style.width = '100%';
        container.style.height = '100%';
        container.style.display = 'flex';
        container.style.flexDirection = 'column';
        container.style.alignItems = 'center';
        container.style.justifyContent = 'space-between';
        container.style.padding = '5.8rem 1.5rem 0 1.5rem';
        container.style.boxSizing = 'border-box';
        container.style.background = 'radial-gradient(ellipse at 50% 90%, #dcfce7 0%, #f0fdf4 40%, #ffffff 100%)';
        container.style.overflow = 'hidden';

        // HUD Superior
        const hud = document.createElement('div');
        hud.style.position = 'absolute';
        hud.style.top = '16px';
        hud.style.left = '50%';
        hud.style.transform = 'translateX(-50%)';
        hud.style.zIndex = '50';
        hud.style.background = 'linear-gradient(135deg, #065f46 0%, #059669 100%)';
        hud.style.padding = '0.65rem 2.2rem';
        hud.style.borderRadius = '9999px';
        hud.style.boxShadow = '0 10px 25px rgba(5, 150, 105, 0.35)';
        hud.style.border = '2.5px solid #ffffff';
        hud.style.display = 'flex';
        hud.style.alignItems = 'center';
        hud.style.gap = '1.2rem';
        hud.style.pointerEvents = 'none';
        hud.style.whiteSpace = 'nowrap';
        hud.style.maxWidth = '92vw';
        hud.style.boxSizing = 'border-box';

        hud.innerHTML = `
            <div style="display: flex; align-items: center; gap: 0.6rem; font-size: 1.15rem; font-weight: 900; color: #ffffff; text-shadow: 0 1px 3px rgba(0,0,0,0.35);">
                <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="#ffffff" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M7 19H4.815a1.83 1.83 0 0 1-1.57-.881 1.785 1.785 0 0 1-.004-1.784L7.196 9.5"/><path d="M11 19h8.2a1.8 1.8 0 0 0 1.57-.88 1.78 1.78 0 0 0 .004-1.78L17 9.5"/><path d="m14 2-3 4.5h6L14 2Z"/></svg>
                <span>¡Misión Reciclaje!</span>
            </div>
            <div style="background: rgba(255, 255, 255, 0.22); color: #fef08a; font-weight: 800; font-size: 1rem; padding: 0.3rem 1rem; border-radius: 9999px; border: 1.5px solid rgba(255, 255, 255, 0.45);">
                Arrastra o pulsa el contenedor adecuado
            </div>
        `;
        container.appendChild(hud);

        // Tarjeta Central del Residuo (Solo texto limpio sin emojis)
        const centerStage = document.createElement('div');
        centerStage.style.display = 'flex';
        centerStage.style.flexDirection = 'column';
        centerStage.style.alignItems = 'center';
        centerStage.style.justifyContent = 'center';
        centerStage.style.gap = '0.9rem';
        centerStage.style.margin = 'auto 0';
        centerStage.style.position = 'relative';

        const wasteCard = document.createElement('div');
        wasteCard.className = 'reciclaje-waste-card';
        wasteCard.style.background = '#ffffff';
        wasteCard.style.padding = '1.6rem 3.2rem';
        wasteCard.style.borderRadius = '28px';
        wasteCard.style.boxShadow = '0 18px 40px rgba(0, 0, 0, 0.1), 0 0 0 4px #ecfdf5';
        wasteCard.style.border = '3.5px solid #10b981';
        wasteCard.style.display = 'flex';
        wasteCard.style.flexDirection = 'column';
        wasteCard.style.alignItems = 'center';
        wasteCard.style.justifyContent = 'center';
        wasteCard.style.gap = '0.7rem';
        wasteCard.style.cursor = 'grab';
        wasteCard.style.touchAction = 'none';
        wasteCard.style.userSelect = 'none';
        wasteCard.style.transition = 'transform 0.25s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.25s ease';

        const wasteTag = document.createElement('div');
        wasteTag.style.display = 'inline-flex';
        wasteTag.style.alignItems = 'center';
        wasteTag.style.gap = '8px';
        wasteTag.style.padding = '0.45rem 1.4rem';
        wasteTag.style.borderRadius = '9999px';
        wasteTag.style.background = '#ecfdf5';
        wasteTag.style.border = '2px solid #a7f3d0';
        wasteTag.style.color = '#047857';
        wasteTag.style.fontSize = '1.05rem';
        wasteTag.style.fontWeight = '800';
        wasteTag.style.letterSpacing = '0.5px';
        wasteTag.innerHTML = `<span style="display:inline-block; width:10px; height:10px; border-radius:50%; background:#10b981;"></span> Residuo para clasificar`;
        wasteCard.appendChild(wasteTag);

        const wasteName = document.createElement('div');
        wasteName.textContent = actividad.residuo.nombre;
        wasteName.style.fontSize = '2.2rem';
        wasteName.style.fontWeight = '900';
        wasteName.style.color = '#0f172a';
        wasteName.style.textAlign = 'center';
        wasteName.style.lineHeight = '1.25';
        wasteName.style.maxWidth = '550px';
        wasteCard.appendChild(wasteName);

        centerStage.appendChild(wasteCard);

        container.appendChild(centerStage);

        // Fila Inferior con los 4 Contenedores (Papeleras limpias sin marcos ni textos extras)
        const binsRow = document.createElement('div');
        binsRow.style.display = 'flex';
        binsRow.style.justifyContent = 'center';
        binsRow.style.alignItems = 'flex-end';
        binsRow.style.gap = '2rem';
        binsRow.style.width = '100%';
        binsRow.style.maxWidth = '980px';
        binsRow.style.margin = '0 auto';
        binsRow.style.marginBottom = '-70px'; // Asoma de mitad para arriba desde el borde inferior
        binsRow.style.flexShrink = '0';
        binsRow.style.zIndex = '10';

        const binElements = {};
        const binKeys = ['azul', 'amarillo', 'verde', 'marron'];

        let resolved = false;

        const checkAnswer = (selectedBinKey, triggerElement) => {
            if (resolved) return;
            const esCorrecto = (selectedBinKey === actividad.respuestaCorrecta);

            if (esCorrecto) {
                resolved = true;
                if (AppState.settings.soundEnabled) Activities.playSound('success');

                // Animación de absorción del residuo
                wasteCard.style.transition = 'all 0.35s cubic-bezier(0.16, 1, 0.3, 1)';
                wasteCard.style.transform = 'scale(0) translateY(120px)';
                wasteCard.style.opacity = '0';

                // Iluminar papelera acertada
                const targetBin = binElements[selectedBinKey];
                if (targetBin) {
                    targetBin.style.transform = 'translateY(-30px) scale(1.12)';
                    const img = targetBin.querySelector('img');
                    if (img) {
                        img.style.filter = 'drop-shadow(0 0 25px rgba(34, 197, 94, 0.9)) drop-shadow(0 18px 30px rgba(0,0,0,0.35))';
                    }
                }

                // Pasar directamente a la victoria con un pelín más de pausa celebratoria
                setTimeout(() => onComplete(true), 850);
            } else {
                if (AppState.settings.soundEnabled) Activities.playSound('error');
                if (triggerElement) {
                    triggerElement.style.animation = 'shake 0.4s';
                    setTimeout(() => { triggerElement.style.animation = ''; }, 450);
                } else if (wasteCard) {
                    wasteCard.style.animation = 'shake 0.4s';
                    setTimeout(() => { wasteCard.style.animation = ''; }, 450);
                }
            }
        };

        binKeys.forEach(key => {
            const info = actividad.contenedores[key];
            const binBtn = document.createElement('button');
            binBtn.className = 'reciclaje-bin-btn';
            binBtn.dataset.bin = key;
            binBtn.style.background = 'transparent';
            binBtn.style.border = 'none';
            binBtn.style.outline = 'none';
            binBtn.style.padding = '0';
            binBtn.style.margin = '0';
            binBtn.style.cursor = 'pointer';
            binBtn.style.display = 'flex';
            binBtn.style.flexDirection = 'column';
            binBtn.style.alignItems = 'center';
            binBtn.style.justifyContent = 'flex-end';
            binBtn.style.transition = 'transform 0.25s cubic-bezier(0.16, 1, 0.3, 1), filter 0.25s ease';
            binBtn.style.userSelect = 'none';
            binBtn.style.position = 'relative';

            // Solo la papelera con su propia imagen, sin marco ni texto exterior
            binBtn.innerHTML = `
                <img src="assets/reciclaje/${key}.png" alt="${info.nombre}" style="width: 175px; max-width: 21vw; height: auto; object-fit: contain; display: block; filter: drop-shadow(0 14px 22px rgba(0,0,0,0.22)); pointer-events: none; transition: transform 0.2s ease, filter 0.2s ease;">
            `;

            binBtn.onmouseenter = () => {
                if (!resolved && !isDragging) {
                    binBtn.style.transform = 'translateY(-14px) scale(1.05)';
                }
            };
            binBtn.onmouseleave = () => {
                if (!resolved && !isDragging) {
                    binBtn.style.transform = 'translateY(0) scale(1)';
                }
            };

            binBtn.onclick = () => {
                checkAnswer(key, binBtn);
            };

            binsRow.appendChild(binBtn);
            binElements[key] = binBtn;
        });

        container.appendChild(binsRow);

        // Drag & Drop para el Residuo hacia los contenedores
        let isDragging = false;
        let startX = 0, startY = 0;
        let floatingEl = null;

        const onPointerDown = (e) => {
            if (resolved) return;
            if (e.button !== undefined && e.button !== 0) return;
            isDragging = false;
            startX = e.clientX;
            startY = e.clientY;

            const onPointerMove = (moveEvt) => {
                const dx = moveEvt.clientX - startX;
                const dy = moveEvt.clientY - startY;

                if (!isDragging && Math.hypot(dx, dy) > 8) {
                    isDragging = true;
                    wasteCard.style.opacity = '0.35';
                    wasteCard.style.cursor = 'grabbing';

                    floatingEl = document.createElement('div');
                    floatingEl.style.position = 'fixed';
                    floatingEl.style.left = `${moveEvt.clientX}px`;
                    floatingEl.style.top = `${moveEvt.clientY}px`;
                    floatingEl.style.transform = 'translate(-50%, -50%) scale(1.1)';
                    floatingEl.style.zIndex = '99999';
                    floatingEl.style.pointerEvents = 'none';
                    floatingEl.style.background = '#ffffff';
                    floatingEl.style.padding = '0.9rem 2.2rem';
                    floatingEl.style.borderRadius = '24px';
                    floatingEl.style.border = '3.5px solid #10b981';
                    floatingEl.style.boxShadow = '0 18px 36px rgba(0,0,0,0.25)';
                    floatingEl.style.display = 'flex';
                    floatingEl.style.alignItems = 'center';
                    floatingEl.style.justifyContent = 'center';
                    floatingEl.innerHTML = `
                        <span style="font-size: 1.35rem; font-weight: 900; color: #0f172a;">${actividad.residuo.nombre}</span>
                    `;
                    document.body.appendChild(floatingEl);
                }

                if (isDragging && floatingEl) {
                    floatingEl.style.left = `${moveEvt.clientX}px`;
                    floatingEl.style.top = `${moveEvt.clientY}px`;

                    // Highlight bin on hover
                    binKeys.forEach(k => {
                        const bEl = binElements[k];
                        const rect = bEl.getBoundingClientRect();
                        if (moveEvt.clientX >= rect.left && moveEvt.clientX <= rect.right &&
                            moveEvt.clientY >= rect.top && moveEvt.clientY <= rect.bottom) {
                            bEl.style.transform = 'translateY(-20px) scale(1.08)';
                            bEl.style.filter = 'brightness(1.15)';
                        } else {
                            bEl.style.transform = 'translateY(0) scale(1)';
                            bEl.style.filter = 'none';
                        }
                    });
                }
            };

            const onPointerUp = (upEvt) => {
                window.removeEventListener('pointermove', onPointerMove);
                window.removeEventListener('pointerup', onPointerUp);
                window.removeEventListener('pointercancel', onPointerUp);

                wasteCard.style.opacity = '1';
                wasteCard.style.cursor = 'grab';

                if (isDragging && floatingEl) {
                    floatingEl.remove();
                    floatingEl = null;

                    // Detectar sobre qué contenedor se soltó
                    let droppedKey = null;
                    binKeys.forEach(k => {
                        const bEl = binElements[k];
                        const rect = bEl.getBoundingClientRect();
                        bEl.style.transform = 'translateY(0) scale(1)';
                        bEl.style.filter = 'none';

                        if (upEvt.clientX >= rect.left && upEvt.clientX <= rect.right &&
                            upEvt.clientY >= rect.top && upEvt.clientY <= rect.bottom) {
                            droppedKey = k;
                        }
                    });

                    if (droppedKey) {
                        checkAnswer(droppedKey, binElements[droppedKey]);
                    }
                    setTimeout(() => { isDragging = false; }, 80);
                }
            };

            window.addEventListener('pointermove', onPointerMove);
            window.addEventListener('pointerup', onPointerUp);
            window.addEventListener('pointercancel', onPointerUp);
        };

        wasteCard.addEventListener('pointerdown', onPointerDown);
    },

    renderHabitats(actividad, container, onComplete) {
        container.innerHTML = '';
        container.style.position = 'relative';
        container.style.width = '100%';
        container.style.height = '100%';
        container.style.display = 'flex';
        container.style.flexDirection = 'column';
        container.style.alignItems = 'center';
        container.style.justifyContent = 'space-between';
        container.style.padding = '5.8rem 1.5rem 1.5rem 1.5rem';
        container.style.boxSizing = 'border-box';
        container.style.background = 'radial-gradient(ellipse at 50% 90%, #fef3c7 0%, #e0f2fe 50%, #ffffff 100%)';
        container.style.overflow = 'hidden';

        // HUD Superior
        const hud = document.createElement('div');
        hud.style.position = 'absolute';
        hud.style.top = '16px';
        hud.style.left = '50%';
        hud.style.transform = 'translateX(-50%)';
        hud.style.zIndex = '50';
        hud.style.background = 'linear-gradient(135deg, #0369a1 0%, #0284c7 100%)';
        hud.style.padding = '0.65rem 2.2rem';
        hud.style.borderRadius = '9999px';
        hud.style.boxShadow = '0 10px 25px rgba(2, 132, 199, 0.35)';
        hud.style.border = '2.5px solid #ffffff';
        hud.style.display = 'flex';
        hud.style.alignItems = 'center';
        hud.style.gap = '1.2rem';
        hud.style.pointerEvents = 'none';
        hud.style.whiteSpace = 'nowrap';
        hud.style.maxWidth = '92vw';
        hud.style.boxSizing = 'border-box';

        hud.innerHTML = `
            <div style="display: flex; align-items: center; gap: 0.6rem; font-size: 1.15rem; font-weight: 900; color: #ffffff; text-shadow: 0 1px 3px rgba(0,0,0,0.35);">
                <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="#ffffff" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>
                <span>¿Dónde vive el animal?</span>
            </div>
            <div style="background: rgba(255, 255, 255, 0.22); color: #fef08a; font-weight: 800; font-size: 1rem; padding: 0.3rem 1rem; border-radius: 9999px; border: 1.5px solid rgba(255, 255, 255, 0.45);">
                ¡Llévalo a su hábitat natural!
            </div>
        `;
        container.appendChild(hud);

        // Tarjeta Central del Animal (Solo texto limpio sin emojis)
        const centerStage = document.createElement('div');
        centerStage.style.display = 'flex';
        centerStage.style.flexDirection = 'column';
        centerStage.style.alignItems = 'center';
        centerStage.style.justifyContent = 'center';
        centerStage.style.gap = '0.9rem';
        centerStage.style.margin = 'auto 0';

        const animalCard = document.createElement('div');
        animalCard.className = 'habitats-animal-card';
        animalCard.style.background = '#ffffff';
        animalCard.style.padding = '1.6rem 3.4rem';
        animalCard.style.borderRadius = '28px';
        animalCard.style.boxShadow = '0 18px 40px rgba(0, 0, 0, 0.1), 0 0 0 4px #e0f2fe';
        animalCard.style.border = '3.5px solid #0284c7';
        animalCard.style.display = 'flex';
        animalCard.style.flexDirection = 'column';
        animalCard.style.alignItems = 'center';
        animalCard.style.justifyContent = 'center';
        animalCard.style.gap = '0.7rem';
        animalCard.style.cursor = 'grab';
        animalCard.style.touchAction = 'none';
        animalCard.style.userSelect = 'none';
        animalCard.style.transition = 'transform 0.25s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.25s ease';

        const animalTag = document.createElement('div');
        animalTag.style.display = 'inline-flex';
        animalTag.style.alignItems = 'center';
        animalTag.style.gap = '8px';
        animalTag.style.padding = '0.45rem 1.4rem';
        animalTag.style.borderRadius = '9999px';
        animalTag.style.background = '#e0f2fe';
        animalTag.style.border = '2px solid #7dd3fc';
        animalTag.style.color = '#0369a1';
        animalTag.style.fontSize = '1.05rem';
        animalTag.style.fontWeight = '800';
        animalTag.style.letterSpacing = '0.5px';
        animalTag.innerHTML = `<span style="display:inline-block; width:10px; height:10px; border-radius:50%; background:#0284c7;"></span> Animal a clasificar`;
        animalCard.appendChild(animalTag);

        const animalName = document.createElement('div');
        animalName.textContent = actividad.animal.nombre;
        animalName.style.fontSize = '2.4rem';
        animalName.style.fontWeight = '900';
        animalName.style.color = '#0f172a';
        animalName.style.textAlign = 'center';
        animalName.style.letterSpacing = '0.5px';
        animalCard.appendChild(animalName);

        centerStage.appendChild(animalCard);

        container.appendChild(centerStage);

        // Fila de Hábitats (3 o 4 tarjetas)
        const habitatsRow = document.createElement('div');
        habitatsRow.style.display = 'grid';
        habitatsRow.style.gridTemplateColumns = `repeat(${actividad.habitats.length}, 1fr)`;
        habitatsRow.style.gap = '1.4rem';
        habitatsRow.style.width = '100%';
        habitatsRow.style.maxWidth = actividad.habitats.length > 3 ? '960px' : '820px';
        habitatsRow.style.margin = '0 auto';
        habitatsRow.style.flexShrink = '0';

        const habitatElements = {};
        let resolved = false;

        const checkAnswer = (habitatId, triggerElement) => {
            if (resolved) return;
            const esCorrecto = (habitatId === actividad.respuestaCorrecta);

            if (esCorrecto) {
                resolved = true;
                if (AppState.settings.soundEnabled) Activities.playSound('success');

                // Absorber animal al hábitat
                animalCard.style.transition = 'all 0.35s cubic-bezier(0.16, 1, 0.3, 1)';
                animalCard.style.transform = 'scale(0) translateY(120px)';
                animalCard.style.opacity = '0';

                // Iluminar hábitat ganador
                const targetHab = habitatElements[habitatId];
                if (targetHab) {
                    targetHab.style.transform = 'scale(1.08) translateY(-10px)';
                    targetHab.style.boxShadow = '0 22px 45px rgba(0,0,0,0.35), 0 0 25px rgba(254, 240, 138, 0.7)';
                    targetHab.style.borderColor = '#fef08a';
                }

                // Pasar directamente a la victoria con un pelín más de pausa celebratoria
                setTimeout(() => onComplete(true), 850);
            } else {
                if (AppState.settings.soundEnabled) Activities.playSound('error');
                if (triggerElement) {
                    triggerElement.style.animation = 'shake 0.4s';
                    setTimeout(() => { triggerElement.style.animation = ''; }, 450);
                } else if (animalCard) {
                    animalCard.style.animation = 'shake 0.4s';
                    setTimeout(() => { animalCard.style.animation = ''; }, 450);
                }
            }
        };

        actividad.habitats.forEach(hab => {
            const habBtn = document.createElement('button');
            habBtn.className = 'habitat-card-btn';
            habBtn.dataset.habitat = hab.id;
            habBtn.style.position = 'relative';
            habBtn.style.height = '185px';
            habBtn.style.padding = '0';
            habBtn.style.border = '4px solid #ffffff';
            habBtn.style.borderRadius = '24px';
            habBtn.style.boxShadow = '0 14px 28px rgba(0,0,0,0.18)';
            habBtn.style.overflow = 'hidden';
            habBtn.style.cursor = 'pointer';
            habBtn.style.display = 'flex';
            habBtn.style.flexDirection = 'column';
            habBtn.style.justifyContent = 'flex-end';
            habBtn.style.background = '#1e293b';
            habBtn.style.transition = 'transform 0.25s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.25s ease, border-color 0.25s ease';
            habBtn.style.userSelect = 'none';

            // Tarjeta de paisaje inmersivo: la foto ocupa todo el espacio sin marcos de colores artificiales
            habBtn.innerHTML = `
                <img src="assets/habitats/${hab.id}.jpg" alt="${hab.nombre}" style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; object-fit: cover; display: block; transition: transform 0.35s ease; pointer-events: none;">
                <div style="position: relative; z-index: 2; width: 100%; background: linear-gradient(to top, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.5) 60%, transparent 100%); padding: 2rem 0.8rem 1rem 0.8rem; box-sizing: border-box; text-align: center; pointer-events: none;">
                    <div style="font-size: 1.35rem; font-weight: 900; color: #ffffff; text-shadow: 0 2px 4px rgba(0,0,0,0.7); line-height: 1.2; letter-spacing: 0.3px;">
                        ${hab.nombre}
                    </div>
                </div>
            `;

            habBtn.onmouseenter = () => {
                if (!resolved && !isDragging) {
                    habBtn.style.transform = 'translateY(-8px) scale(1.03)';
                    habBtn.style.boxShadow = '0 20px 36px rgba(0,0,0,0.28)';
                    const img = habBtn.querySelector('img');
                    if (img) img.style.transform = 'scale(1.08)';
                }
            };
            habBtn.onmouseleave = () => {
                if (!resolved && !isDragging) {
                    habBtn.style.transform = 'translateY(0) scale(1)';
                    habBtn.style.boxShadow = '0 14px 28px rgba(0,0,0,0.18)';
                    const img = habBtn.querySelector('img');
                    if (img) img.style.transform = 'scale(1)';
                }
            };

            habBtn.onclick = () => {
                checkAnswer(hab.id, habBtn);
            };

            habitatsRow.appendChild(habBtn);
            habitatElements[hab.id] = habBtn;
        });

        container.appendChild(habitatsRow);

        // Drag & Drop para el Animal hacia los hábitats
        let isDragging = false;
        let startX = 0, startY = 0;
        let floatingEl = null;

        const onPointerDown = (e) => {
            if (resolved) return;
            if (e.button !== undefined && e.button !== 0) return;
            isDragging = false;
            startX = e.clientX;
            startY = e.clientY;

            const onPointerMove = (moveEvt) => {
                const dx = moveEvt.clientX - startX;
                const dy = moveEvt.clientY - startY;

                if (!isDragging && Math.hypot(dx, dy) > 8) {
                    isDragging = true;
                    animalCard.style.opacity = '0.35';
                    animalCard.style.cursor = 'grabbing';

                    floatingEl = document.createElement('div');
                    floatingEl.style.position = 'fixed';
                    floatingEl.style.left = `${moveEvt.clientX}px`;
                    floatingEl.style.top = `${moveEvt.clientY}px`;
                    floatingEl.style.transform = 'translate(-50%, -50%) scale(1.15)';
                    floatingEl.style.zIndex = '99999';
                    floatingEl.style.pointerEvents = 'none';
                    floatingEl.style.background = '#ffffff';
                    floatingEl.style.padding = '0.9rem 2.2rem';
                    floatingEl.style.borderRadius = '24px';
                    floatingEl.style.border = '3.5px solid #0284c7';
                    floatingEl.style.boxShadow = '0 20px 40px rgba(0,0,0,0.25)';
                    floatingEl.style.display = 'flex';
                    floatingEl.style.alignItems = 'center';
                    floatingEl.style.justifyContent = 'center';
                    floatingEl.innerHTML = `
                        <span style="font-size: 1.4rem; font-weight: 900; color: #0f172a;">${actividad.animal.nombre}</span>
                    `;
                    document.body.appendChild(floatingEl);
                }

                if (isDragging && floatingEl) {
                    floatingEl.style.left = `${moveEvt.clientX}px`;
                    floatingEl.style.top = `${moveEvt.clientY}px`;

                    // Highlight hovered habitat
                    actividad.habitats.forEach(h => {
                        const hEl = habitatElements[h.id];
                        const rect = hEl.getBoundingClientRect();
                        if (moveEvt.clientX >= rect.left && moveEvt.clientX <= rect.right &&
                            moveEvt.clientY >= rect.top && moveEvt.clientY <= rect.bottom) {
                            hEl.style.transform = 'scale(1.06) translateY(-8px)';
                            hEl.style.borderColor = '#38bdf8';
                            hEl.style.boxShadow = '0 20px 38px rgba(0,0,0,0.3)';
                        } else {
                            hEl.style.transform = 'scale(1) translateY(0)';
                            hEl.style.borderColor = '#ffffff';
                            hEl.style.boxShadow = '0 14px 28px rgba(0,0,0,0.18)';
                        }
                    });
                }
            };

            const onPointerUp = (upEvt) => {
                window.removeEventListener('pointermove', onPointerMove);
                window.removeEventListener('pointerup', onPointerUp);
                window.removeEventListener('pointercancel', onPointerUp);

                animalCard.style.opacity = '1';
                animalCard.style.cursor = 'grab';

                if (isDragging && floatingEl) {
                    floatingEl.remove();
                    floatingEl = null;

                    let droppedHabitatId = null;
                    actividad.habitats.forEach(h => {
                        const hEl = habitatElements[h.id];
                        const rect = hEl.getBoundingClientRect();
                        hEl.style.transform = 'scale(1) translateY(0)';
                        hEl.style.borderColor = '#ffffff';
                        hEl.style.boxShadow = '0 14px 28px rgba(0,0,0,0.18)';

                        if (upEvt.clientX >= rect.left && upEvt.clientX <= rect.right &&
                            upEvt.clientY >= rect.top && upEvt.clientY <= rect.bottom) {
                            droppedHabitatId = h.id;
                        }
                    });

                    if (droppedHabitatId) {
                        checkAnswer(droppedHabitatId, habitatElements[droppedHabitatId]);
                    }
                    setTimeout(() => { isDragging = false; }, 80);
                }
            };

            window.addEventListener('pointermove', onPointerMove);
            window.addEventListener('pointerup', onPointerUp);
            window.addEventListener('pointercancel', onPointerUp);
        };

        animalCard.addEventListener('pointerdown', onPointerDown);
    },

    renderSeguridadVial(actividad, container, onComplete) {
        container.innerHTML = '';
        container.style.position = 'relative';
        container.style.width = '100%';
        container.style.height = '100%';
        container.style.display = 'flex';
        container.style.flexDirection = 'column';
        container.style.alignItems = 'center';
        container.style.justifyContent = 'space-between';
        container.style.padding = '5.8rem 1.5rem 1.6rem 1.5rem';
        container.style.boxSizing = 'border-box';
        container.style.background = 'radial-gradient(ellipse at 50% 90%, #fee2e2 0%, #f0fdf4 40%, #ffffff 100%)';
        container.style.overflow = 'hidden';

        // HUD Superior
        const hud = document.createElement('div');
        hud.style.position = 'absolute';
        hud.style.top = '16px';
        hud.style.left = '50%';
        hud.style.transform = 'translateX(-50%)';
        hud.style.zIndex = '50';
        hud.style.background = 'linear-gradient(135deg, #1e293b 0%, #0f172a 100%)';
        hud.style.padding = '0.65rem 2.2rem';
        hud.style.borderRadius = '9999px';
        hud.style.boxShadow = '0 10px 25px rgba(15, 23, 42, 0.35)';
        hud.style.border = '2.5px solid #ffffff';
        hud.style.display = 'flex';
        hud.style.alignItems = 'center';
        hud.style.gap = '1.2rem';
        hud.style.pointerEvents = 'none';
        hud.style.whiteSpace = 'nowrap';
        hud.style.maxWidth = '92vw';
        hud.style.boxSizing = 'border-box';

        hud.innerHTML = `
            <div style="display: flex; align-items: center; gap: 0.6rem; font-size: 1.15rem; font-weight: 900; color: #ffffff; text-shadow: 0 1px 3px rgba(0,0,0,0.35);">
                <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="#ffffff" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><rect x="6" y="2" width="12" height="20" rx="6"/><circle cx="12" cy="7" r="2" fill="#ef4444"/><circle cx="12" cy="12" r="2" fill="#eab308"/><circle cx="12" cy="17" r="2" fill="#22c55e"/></svg>
                <span>Educación Vial</span>
            </div>
            <div style="background: rgba(255, 255, 255, 0.18); color: #fef08a; font-weight: 800; font-size: 1rem; padding: 0.3rem 1rem; border-radius: 9999px; border: 1.5px solid rgba(255, 255, 255, 0.35);">
                ¿Es Seguro o Peligroso?
            </div>
        `;
        container.appendChild(hud);

        // Tarjeta Central de la Situación Vial (Sin emojis)
        const centerStage = document.createElement('div');
        centerStage.style.display = 'flex';
        centerStage.style.flexDirection = 'column';
        centerStage.style.alignItems = 'center';
        centerStage.style.justifyContent = 'center';
        centerStage.style.gap = '0.9rem';
        centerStage.style.margin = 'auto 0';

        const situationCard = document.createElement('div');
        situationCard.className = 'vial-situation-card';
        situationCard.style.background = '#ffffff';
        situationCard.style.padding = '2.2rem 3rem';
        situationCard.style.borderRadius = '28px';
        situationCard.style.boxShadow = '0 20px 45px rgba(0, 0, 0, 0.08), 0 0 0 4px #f1f5f9';
        situationCard.style.border = '3.5px solid #cbd5e1';
        situationCard.style.maxWidth = '780px';
        situationCard.style.display = 'flex';
        situationCard.style.flexDirection = 'column';
        situationCard.style.alignItems = 'center';
        situationCard.style.justifyContent = 'center';
        situationCard.style.textAlign = 'center';
        situationCard.style.transition = 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)';

        const badgeEl = document.createElement('div');
        badgeEl.style.display = 'inline-flex';
        badgeEl.style.alignItems = 'center';
        badgeEl.style.gap = '8px';
        badgeEl.style.padding = '0.45rem 1.4rem';
        badgeEl.style.borderRadius = '9999px';
        badgeEl.style.background = '#f1f5f9';
        badgeEl.style.border = '2px solid #cbd5e1';
        badgeEl.style.color = '#334155';
        badgeEl.style.fontSize = '1.05rem';
        badgeEl.style.fontWeight = '800';
        badgeEl.innerHTML = `<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="#2563eb" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg> Situación en la Vía Pública`;
        situationCard.appendChild(badgeEl);

        const situationText = document.createElement('div');
        situationText.textContent = actividad.situacion;
        situationText.style.fontSize = '1.85rem';
        situationText.style.fontWeight = '800';
        situationText.style.color = '#1e293b';
        situationText.style.marginTop = '0.8rem';
        situationText.style.lineHeight = '1.4';
        situationCard.appendChild(situationText);

        centerStage.appendChild(situationCard);

        container.appendChild(centerStage);

        // Fila Inferior con las Dos Ceras de Colores (Verde y Roja)
        const crayonsRow = document.createElement('div');
        crayonsRow.style.display = 'flex';
        crayonsRow.style.alignItems = 'center';
        crayonsRow.style.justifyContent = 'center';
        crayonsRow.style.gap = '2.2rem';
        crayonsRow.style.width = '100%';
        crayonsRow.style.maxWidth = '780px';
        crayonsRow.style.margin = '0 auto';
        crayonsRow.style.flexShrink = '0';

        let resolved = false;

        const checkAnswer = (userSaidSeguro, triggerCrayon) => {
            if (resolved) return;
            const esCorrecto = (userSaidSeguro === actividad.esSeguro);

            if (esCorrecto) {
                resolved = true;
                if (AppState.settings.soundEnabled) Activities.playSound('success');

                // Trazos de cera e iluminación
                situationCard.style.borderColor = actividad.esSeguro ? '#10b981' : '#ef4444';
                situationCard.style.boxShadow = actividad.esSeguro
                    ? '0 20px 45px rgba(16, 185, 129, 0.25), 0 0 0 5px #d1fae5'
                    : '0 20px 45px rgba(239, 68, 68, 0.25), 0 0 0 5px #fee2e2';

                triggerCrayon.style.transform = 'scale(1.1) translateY(-10px)';
                const svg = triggerCrayon.querySelector('svg');
                if (svg) {
                    svg.style.filter = actividad.esSeguro
                        ? 'drop-shadow(0 0 25px rgba(16, 185, 129, 0.95)) drop-shadow(0 14px 25px rgba(0,0,0,0.3))'
                        : 'drop-shadow(0 0 25px rgba(239, 68, 68, 0.95)) drop-shadow(0 14px 25px rgba(0,0,0,0.3))';
                }

                // Pasar directamente a la victoria con un pelín más de pausa celebratoria
                setTimeout(() => onComplete(true), 850);
            } else {
                if (AppState.settings.soundEnabled) Activities.playSound('error');
                triggerCrayon.style.animation = 'shake 0.45s';
                setTimeout(() => { triggerCrayon.style.animation = ''; }, 480);
            }
        };

        // 1. CERA VERDE (¡ES SEGURO!) - Botón con forma real de cera escolar sin borde blanco
        const greenCrayon = document.createElement('button');
        greenCrayon.className = 'cera-vial-btn cera-verde';
        greenCrayon.style.background = 'transparent';
        greenCrayon.style.border = 'none';
        greenCrayon.style.outline = 'none';
        greenCrayon.style.padding = '0';
        greenCrayon.style.cursor = 'pointer';
        greenCrayon.style.transition = 'transform 0.25s cubic-bezier(0.16, 1, 0.3, 1), filter 0.25s ease';
        greenCrayon.style.userSelect = 'none';
        greenCrayon.style.display = 'flex';
        greenCrayon.style.alignItems = 'center';
        greenCrayon.style.justifyContent = 'center';

        greenCrayon.innerHTML = `
            <svg viewBox="0 0 320 84" width="310" height="82" style="display: block; overflow: visible; filter: drop-shadow(0 10px 18px rgba(5, 150, 105, 0.35)); transition: transform 0.2s ease, filter 0.2s ease;">
                <defs>
                    <linearGradient id="tipGradVerde" x1="0%" y1="0%" x2="0%" y2="100%">
                        <stop offset="0%" stop-color="#6ee7b7"/>
                        <stop offset="35%" stop-color="#10b981"/>
                        <stop offset="80%" stop-color="#059669"/>
                        <stop offset="100%" stop-color="#047857"/>
                    </linearGradient>
                    <linearGradient id="bodyGradVerde" x1="0%" y1="0%" x2="0%" y2="100%">
                        <stop offset="0%" stop-color="#34d399"/>
                        <stop offset="25%" stop-color="#10b981"/>
                        <stop offset="75%" stop-color="#059669"/>
                        <stop offset="100%" stop-color="#047857"/>
                    </linearGradient>
                    <linearGradient id="wrapGradVerde" x1="0%" y1="0%" x2="0%" y2="100%">
                        <stop offset="0%" stop-color="#047857"/>
                        <stop offset="20%" stop-color="#059669"/>
                        <stop offset="75%" stop-color="#047857"/>
                        <stop offset="100%" stop-color="#064e3b"/>
                    </linearGradient>
                </defs>

                <!-- Cuerpo cilíndrico de cera base -->
                <rect x="46" y="14" width="264" height="56" rx="8" fill="url(#bodyGradVerde)"/>

                <!-- Punta afilada cónica de cera -->
                <path d="M 48 14 C 38 22, 22 34, 10 40 C 7 41.5, 7 42.5, 10 44 C 22 50, 38 62, 48 70 Z" fill="url(#tipGradVerde)" stroke="#047857" stroke-width="1"/>

                <!-- Faja / Etiqueta de papel de la cera (sin borde blanco) -->
                <rect x="60" y="12" width="236" height="60" rx="4" fill="url(#wrapGradVerde)" stroke="rgba(0,0,0,0.18)" stroke-width="1"/>
                
                <!-- Franjas decorativas oscuras clásicas de cera escolar -->
                <line x1="72" y1="12" x2="72" y2="72" stroke="rgba(0,0,0,0.35)" stroke-width="5"/>
                <line x1="84" y1="12" x2="84" y2="72" stroke="rgba(0,0,0,0.22)" stroke-width="3"/>

                <line x1="272" y1="12" x2="272" y2="72" stroke="rgba(0,0,0,0.22)" stroke-width="3"/>
                <line x1="284" y1="12" x2="284" y2="72" stroke="rgba(0,0,0,0.35)" stroke-width="5"/>

                <!-- Brillo cilíndrico sutil superior -->
                <rect x="60" y="16" width="236" height="5" fill="rgba(255,255,255,0.18)" rx="2"/>

                <!-- Círculo con tick de verificación -->
                <circle cx="112" cy="42" r="16" fill="rgba(255, 255, 255, 0.95)" filter="drop-shadow(0 2px 4px rgba(0,0,0,0.25))"/>
                <path d="M 104 42 L 109 47 L 120 36" fill="none" stroke="#047857" stroke-width="3.5" stroke-linecap="round" stroke-linejoin="round"/>

                <!-- Texto de la cera -->
                <text x="136" y="50" font-family="'Nunito', 'Segoe UI', system-ui, sans-serif" font-weight="900" font-size="20" fill="#ffffff" letter-spacing="1" style="text-shadow: 0 2px 4px rgba(0,0,0,0.5);">¡ES SEGURO!</text>
            </svg>
        `;

        greenCrayon.onmouseenter = () => {
            if (!resolved) greenCrayon.style.transform = 'translateY(-6px) scale(1.04)';
        };
        greenCrayon.onmouseleave = () => {
            if (!resolved) greenCrayon.style.transform = 'translateY(0) scale(1)';
        };

        greenCrayon.onclick = () => checkAnswer(true, greenCrayon);
        crayonsRow.appendChild(greenCrayon);

        // 2. CERA ROJA (¡ES PELIGROSO!) - Botón con forma real de cera escolar sin borde blanco
        const redCrayon = document.createElement('button');
        redCrayon.className = 'cera-vial-btn cera-roja';
        redCrayon.style.background = 'transparent';
        redCrayon.style.border = 'none';
        redCrayon.style.outline = 'none';
        redCrayon.style.padding = '0';
        redCrayon.style.cursor = 'pointer';
        redCrayon.style.transition = 'transform 0.25s cubic-bezier(0.16, 1, 0.3, 1), filter 0.25s ease';
        redCrayon.style.userSelect = 'none';
        redCrayon.style.display = 'flex';
        redCrayon.style.alignItems = 'center';
        redCrayon.style.justifyContent = 'center';

        redCrayon.innerHTML = `
            <svg viewBox="0 0 320 84" width="310" height="82" style="display: block; overflow: visible; filter: drop-shadow(0 10px 18px rgba(220, 38, 38, 0.35)); transition: transform 0.2s ease, filter 0.2s ease;">
                <defs>
                    <linearGradient id="tipGradRoja" x1="0%" y1="0%" x2="0%" y2="100%">
                        <stop offset="0%" stop-color="#f87171"/>
                        <stop offset="35%" stop-color="#ef4444"/>
                        <stop offset="80%" stop-color="#dc2626"/>
                        <stop offset="100%" stop-color="#b91c1c"/>
                    </linearGradient>
                    <linearGradient id="bodyGradRoja" x1="0%" y1="0%" x2="0%" y2="100%">
                        <stop offset="0%" stop-color="#f87171"/>
                        <stop offset="25%" stop-color="#ef4444"/>
                        <stop offset="75%" stop-color="#dc2626"/>
                        <stop offset="100%" stop-color="#991b1b"/>
                    </linearGradient>
                    <linearGradient id="wrapGradRoja" x1="0%" y1="0%" x2="0%" y2="100%">
                        <stop offset="0%" stop-color="#b91c1c"/>
                        <stop offset="20%" stop-color="#dc2626"/>
                        <stop offset="75%" stop-color="#b91c1c"/>
                        <stop offset="100%" stop-color="#7f1d1d"/>
                    </linearGradient>
                </defs>

                <!-- Cuerpo cilíndrico de cera base -->
                <rect x="46" y="14" width="264" height="56" rx="8" fill="url(#bodyGradRoja)"/>

                <!-- Punta afilada cónica de cera -->
                <path d="M 48 14 C 38 22, 22 34, 10 40 C 7 41.5, 7 42.5, 10 44 C 22 50, 38 62, 48 70 Z" fill="url(#tipGradRoja)" stroke="#991b1b" stroke-width="1"/>

                <!-- Faja / Etiqueta de papel de la cera (sin borde blanco) -->
                <rect x="60" y="12" width="236" height="60" rx="4" fill="url(#wrapGradRoja)" stroke="rgba(0,0,0,0.18)" stroke-width="1"/>
                
                <!-- Franjas decorativas oscuras clásicas de cera escolar -->
                <line x1="72" y1="12" x2="72" y2="72" stroke="rgba(0,0,0,0.35)" stroke-width="5"/>
                <line x1="84" y1="12" x2="84" y2="72" stroke="rgba(0,0,0,0.22)" stroke-width="3"/>

                <line x1="272" y1="12" x2="272" y2="72" stroke="rgba(0,0,0,0.22)" stroke-width="3"/>
                <line x1="284" y1="12" x2="284" y2="72" stroke="rgba(0,0,0,0.35)" stroke-width="5"/>

                <!-- Brillo cilíndrico sutil superior -->
                <rect x="60" y="16" width="236" height="5" fill="rgba(255,255,255,0.18)" rx="2"/>

                <!-- Círculo con aspa roja -->
                <circle cx="106" cy="42" r="16" fill="rgba(255, 255, 255, 0.95)" filter="drop-shadow(0 2px 4px rgba(0,0,0,0.25))"/>
                <path d="M 99 35 L 113 49 M 113 35 L 99 49" fill="none" stroke="#b91c1c" stroke-width="3.5" stroke-linecap="round" stroke-linejoin="round"/>

                <!-- Texto de la cera -->
                <text x="130" y="50" font-family="'Nunito', 'Segoe UI', system-ui, sans-serif" font-weight="900" font-size="19" fill="#ffffff" letter-spacing="0.5" style="text-shadow: 0 2px 4px rgba(0,0,0,0.5);">¡ES PELIGROSO!</text>
            </svg>
        `;

        redCrayon.onmouseenter = () => {
            if (!resolved) redCrayon.style.transform = 'translateY(-6px) scale(1.04)';
        };
        redCrayon.onmouseleave = () => {
            if (!resolved) redCrayon.style.transform = 'translateY(0) scale(1)';
        };

        redCrayon.onclick = () => checkAnswer(false, redCrayon);
        crayonsRow.appendChild(redCrayon);

        container.appendChild(crayonsRow);
    },

    renderStandard(actividad, container, onComplete) {
        container.innerHTML = '';
        container.style.position = 'relative';
        container.style.width = '100%';
        container.style.height = '100%';
        container.style.display = 'flex';
        container.style.flexDirection = 'column';
        container.style.alignItems = 'center';
        container.style.justifyContent = 'space-between';
        container.style.padding = '6.2rem 2rem 1.6rem 2rem';
        container.style.boxSizing = 'border-box';
        container.style.background = 'radial-gradient(ellipse at 50% 90%, #e0f2fe 0%, #f0fdf4 40%, #ffffff 100%)';
        container.style.overflow = 'hidden';

        // HUD flotante estilo Burbujas
        const hud = document.createElement('div');
        hud.style.position = 'absolute';
        hud.style.top = '18px';
        hud.style.left = '50%';
        hud.style.transform = 'translateX(-50%)';
        hud.style.zIndex = '50';
        hud.style.background = 'linear-gradient(135deg, #1e3a8a 0%, #0284c7 100%)';
        hud.style.padding = '0.65rem 2.4rem';
        hud.style.borderRadius = '9999px';
        hud.style.boxShadow = '0 10px 25px rgba(2, 132, 199, 0.35)';
        hud.style.border = '2.5px solid #ffffff';
        hud.style.display = 'flex';
        hud.style.alignItems = 'center';
        hud.style.gap = '1.6rem';
        hud.style.pointerEvents = 'none';
        hud.style.whiteSpace = 'nowrap';
        hud.style.width = 'max-content';
        hud.style.maxWidth = '92vw';
        hud.style.boxSizing = 'border-box';

        hud.innerHTML = `
            <div style="display: flex; align-items: center; gap: 0.6rem; font-size: 1.15rem; white-space: nowrap; font-weight: 900; color: #ffffff; text-shadow: 0 1px 3px rgba(0,0,0,0.35);">
                <span>Reto del Saber: ¡Elige la opción correcta!</span>
            </div>
            <div style="background: rgba(255, 255, 255, 0.22); color: #fef08a; font-weight: 900; font-size: 1.1rem; padding: 0.35rem 1.1rem; border-radius: 9999px; border: 1.5px solid rgba(255, 255, 255, 0.45); text-shadow: 0 1px 2px rgba(0,0,0,0.3);">
                Premio: Chucheletes
            </div>
        `;
        container.appendChild(hud);

        // Escenario Central Panorámico
        const centerStage = document.createElement('div');
        centerStage.style.flex = '1';
        centerStage.style.display = 'flex';
        centerStage.style.flexDirection = 'column';
        centerStage.style.alignItems = 'center';
        centerStage.style.justifyContent = 'center';
        centerStage.style.width = '100%';
        centerStage.style.maxWidth = '920px';
        centerStage.style.textAlign = 'center';
        centerStage.style.margin = '0.8rem 0';

        const qTitle = document.createElement('h2');
        qTitle.style.fontSize = '2.4rem';
        qTitle.style.marginBottom = '1rem';
        qTitle.style.color = '#0f172a';
        qTitle.style.lineHeight = '1.35';
        qTitle.style.maxWidth = '880px';
        qTitle.textContent = actividad.pregunta;
        centerStage.appendChild(qTitle);

        if (actividad.imagen) {
            const img = document.createElement('div');
            img.style.fontSize = '5.8rem';
            img.style.textAlign = 'center';
            img.style.margin = '0.5rem 0 1rem 0';
            img.style.filter = 'drop-shadow(0 8px 16px rgba(0,0,0,0.12))';
            img.textContent = actividad.imagen;
            centerStage.appendChild(img);
        }

        let wordDisplay = null;
        if (actividad.tipo === 'letra_perdida') {
            wordDisplay = document.createElement('div');
            wordDisplay.style.fontSize = '4.8rem';
            wordDisplay.style.fontWeight = '900';
            wordDisplay.style.letterSpacing = '16px';
            wordDisplay.style.color = 'var(--school-blue)';
            wordDisplay.style.textAlign = 'center';
            wordDisplay.style.margin = '1rem 0 1.5rem 0';
            wordDisplay.textContent = actividad.palabra;
            centerStage.appendChild(wordDisplay);
        }
        container.appendChild(centerStage);

        // Bandeja Inferior de Respuestas Panorámica
        const workArea = document.createElement('div');
        workArea.style.display = 'grid';
        workArea.style.gridTemplateColumns = 'repeat(2, 1fr)';
        workArea.style.gap = '1.2rem';
        workArea.style.width = '100%';
        workArea.style.maxWidth = '880px';
        workArea.style.flexShrink = '0';

        if (actividad.tipo === 'multiple' || actividad.tipo === 'completar') {
            const letters = ['A', 'B', 'C', 'D'];
            actividad.opciones.forEach((opcion, index) => {
                const btn = document.createElement('button');
                btn.className = 'btn btn-secondary';
                btn.style.padding = '1.1rem 1.6rem';
                btn.style.fontSize = '1.4rem';
                btn.style.borderRadius = '22px';
                btn.style.justifyContent = 'flex-start';
                btn.style.gap = '1.2rem';
                btn.style.textAlign = 'left';

                const badge = document.createElement('span');
                badge.style.width = '42px';
                badge.style.height = '42px';
                badge.style.borderRadius = '14px';
                badge.style.background = '#e2e8f0';
                badge.style.color = '#334155';
                badge.style.display = 'flex';
                badge.style.alignItems = 'center';
                badge.style.justifyContent = 'center';
                badge.style.fontWeight = '900';
                badge.style.fontSize = '1.15rem';
                badge.textContent = letters[index] || '•';

                const textSpan = document.createElement('span');
                textSpan.style.flex = '1';
                textSpan.textContent = opcion;

                btn.appendChild(badge);
                btn.appendChild(textSpan);

                btn.onclick = () => {
                    const esCorrecto = index === actividad.respuesta;
                    this.feedback(esCorrecto, btn, badge, onComplete);
                };
                workArea.appendChild(btn);
            });
        } else if (actividad.tipo === 'contar') {
            workArea.style.display = 'flex';
            workArea.style.justifyContent = 'center';
            workArea.style.gap = '1.4rem';

            const max = Math.max(5, actividad.respuesta + 2);
            for (let i = 1; i <= max; i++) {
                const btn = document.createElement('button');
                btn.className = 'tactile-btn tactile-btn-blue';
                btn.style.minWidth = '95px';
                btn.style.height = '76px';
                btn.textContent = i;
                btn.onclick = () => {
                    const esCorrecto = (i === actividad.respuesta) || (index === actividad.respuesta);
                    this.feedback(esCorrecto, btn, null, onComplete);
                };
                workArea.appendChild(btn);
            }
        } else if (actividad.tipo === 'letra_perdida') {
            workArea.style.display = 'flex';
            workArea.style.justifyContent = 'center';
            workArea.style.gap = '1.6rem';

            actividad.opciones.forEach((letra, index) => {
                const btn = document.createElement('button');
                btn.className = 'tactile-btn tactile-btn-white';
                btn.style.minWidth = '105px';
                btn.style.height = '82px';
                btn.textContent = letra;
                btn.onclick = () => {
                    const esCorrecto = index === actividad.respuesta;
                    if (esCorrecto && wordDisplay) wordDisplay.textContent = wordDisplay.textContent.replace('_', letra);
                    this.feedback(esCorrecto, btn, null, onComplete);
                };
                workArea.appendChild(btn);
            });
        }

        container.appendChild(workArea);
    },

    feedback(esCorrecto, btnNode, badgeNode, onComplete) {
        const container = btnNode.parentElement;
        container.style.pointerEvents = 'none';

        if(esCorrecto) {
            btnNode.style.backgroundColor = '#10b981';
            btnNode.style.borderColor = '#059669';
            btnNode.style.color = '#ffffff';
            btnNode.style.boxShadow = '0 6px 0 #047857';
            if (badgeNode) {
                badgeNode.style.background = '#059669';
                badgeNode.style.color = '#ffffff';
                badgeNode.textContent = '✓';
            }
            if(AppState.settings.soundEnabled) this.playSound('success');
            
            btnNode.style.transform = 'scale(1.05)';
            setTimeout(() => onComplete(true), 1100);
        } else {
            btnNode.style.backgroundColor = '#ef4444';
            btnNode.style.borderColor = '#dc2626';
            btnNode.style.color = '#ffffff';
            btnNode.style.boxShadow = '0 6px 0 #b91c1c';
            if (badgeNode) {
                badgeNode.style.background = '#dc2626';
                badgeNode.style.color = '#ffffff';
                badgeNode.textContent = '✕';
            }
            btnNode.style.animation = 'shake 0.45s';
            if(AppState.settings.soundEnabled) this.playSound('error');
            
            setTimeout(() => {
                btnNode.style.backgroundColor = '';
                btnNode.style.borderColor = '';
                btnNode.style.color = '';
                btnNode.style.boxShadow = '';
                btnNode.style.animation = '';
                if (badgeNode) {
                    badgeNode.style.background = '#e2e8f0';
                    badgeNode.style.color = '#334155';
                    badgeNode.textContent = badgeNode.dataset.originalText || '•';
                }
                container.style.pointerEvents = 'auto';
            }, 800);
        }
    },

    playSound(type) {
        try {
            const vol = (window.AppState && AppState.settings && AppState.settings.volume !== undefined)
                ? AppState.settings.volume
                : (window.AppState && AppState.settings && AppState.settings.soundEnabled === false ? 0 : 80);
            
            if (vol <= 0) return; // Silenciado al 0%
            
            const ctx = new (window.AudioContext || window.webkitAudioContext)();
            const osc = ctx.createOscillator();
            const gainNode = ctx.createGain();
            
            osc.connect(gainNode);
            gainNode.connect(ctx.destination);
            
            // Escalar volumen del 0% al 100% (amplitud máxima segura 0.35)
            const targetGain = (vol / 100) * 0.35;
            
            if(type === 'tick') {
                const now = ctx.currentTime;
                const o = ctx.createOscillator();
                const g = ctx.createGain();
                o.connect(g);
                g.connect(ctx.destination);
                o.type = 'triangle';
                o.frequency.setValueAtTime(620, now);
                o.frequency.exponentialRampToValueAtTime(320, now + 0.025);
                g.gain.setValueAtTime(targetGain * 0.45, now);
                g.gain.exponentialRampToValueAtTime(0.001, now + 0.025);
                o.start(now);
                o.stop(now + 0.025);
                return;
            } else if(type === 'dice') {
                const now = ctx.currentTime;
                for (let i = 0; i < 5; i++) {
                    const o = ctx.createOscillator();
                    const g = ctx.createGain();
                    o.connect(g);
                    g.connect(ctx.destination);
                    o.type = 'triangle';
                    o.frequency.setValueAtTime(320 + i * 45, now + i * 0.06);
                    g.gain.setValueAtTime(targetGain * 0.7, now + i * 0.06);
                    g.gain.exponentialRampToValueAtTime(0.001, now + i * 0.06 + 0.05);
                    o.start(now + i * 0.06);
                    o.stop(now + i * 0.06 + 0.05);
                }
                return;
            } else if(type === 'success') {
                osc.type = 'sine';
                osc.frequency.setValueAtTime(523.25, ctx.currentTime); // Do
                osc.frequency.setValueAtTime(659.25, ctx.currentTime + 0.08); // Mi
                osc.frequency.setValueAtTime(783.99, ctx.currentTime + 0.16); // Sol
                gainNode.gain.setValueAtTime(targetGain, ctx.currentTime);
                gainNode.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.35);
                osc.start();
                osc.stop(ctx.currentTime + 0.35);
            } else {
                osc.type = 'triangle';
                osc.frequency.setValueAtTime(260, ctx.currentTime);
                osc.frequency.exponentialRampToValueAtTime(140, ctx.currentTime + 0.22);
                gainNode.gain.setValueAtTime(targetGain, ctx.currentTime);
                gainNode.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.22);
                osc.start();
                osc.stop(ctx.currentTime + 0.22);
            }
        } catch(e) { 
            console.log("Audio API no disponible"); 
        }
    }
};

const style = document.createElement('style');
style.innerHTML = `
@keyframes shake {
  0% { transform: translateX(0); }
  25% { transform: translateX(-8px); }
  50% { transform: translateX(8px); }
  75% { transform: translateX(-8px); }
  100% { transform: translateX(0); }
}`;
document.head.appendChild(style);
