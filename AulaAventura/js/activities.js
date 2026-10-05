window.Activities = {
    render(actividad, containerId, onComplete) {
        const container = document.getElementById(containerId);
        if (!container) return;
        
        container.innerHTML = '';
        container.style.opacity = '1';
        container.style.transform = 'scale(1)';

        if (actividad.tipo === 'burbujas') {
            this.renderBurbujas(actividad, container, onComplete);
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

        const totalToPop = Math.min(2, (actividad.correctas && actividad.correctas.length) || 2);
        let bubblesPopped = 0;

        // HUD flotante con color vivo y contraste de alta visibilidad
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
                <span>${actividad.pregunta || '¡Explota las palabras bien escritas!'}</span>
            </div>
            <div style="background: rgba(255, 255, 255, 0.22); color: #fef08a; font-weight: 900; font-size: 1.1rem; padding: 0.35rem 1.1rem; border-radius: 9999px; border: 1.5px solid rgba(255, 255, 255, 0.45); text-shadow: 0 1px 2px rgba(0,0,0,0.3);">
                Atrapadas: <span id="burbujas-counter" style="color: #ffffff;">0</span> / ${totalToPop}
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

        const counterEl = hud.querySelector('#burbujas-counter');

        const spawnBubble = (palabra, esCorrecta, startY = null) => {
            if (!document.body.contains(stage) || bubblesPopped >= totalToPop) return;

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
            // Caída muy pausada y tranquila: de 13 a 15.5 segundos
            const baseDuration = Math.random() * 2500 + 13000;
            const adjustedDuration = baseDuration * (remainingDist / totalDist);

            // Tambaleo orgánico como pompa de jabón real (suave, sin ángulos bruscos)
            const sway = 22 + Math.random() * 10; // Suave oscilación de solo 22px a 32px
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
                if (bubble.dataset.popped) return;

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
                    
                    bubblesPopped++;
                    if (counterEl) counterEl.textContent = bubblesPopped;
                    if (AppState.settings.soundEnabled) this.playSound('success');

                    setTimeout(() => {
                        bubble.style.opacity = '0';
                        setTimeout(() => { if (bubble.parentElement) bubble.remove(); }, 200);
                    }, 250);

                    if (bubblesPopped >= totalToPop) {
                        setTimeout(() => onComplete(true), 800);
                    }
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

        const allWords = [...(actividad.correctas || []), ...(actividad.incorrectas || [])].sort(() => Math.random() - 0.5);

        // Spawn inicial pausado y calmado: 2 burbujas visibles entrando suavemente
        setTimeout(() => {
            const h = stage.clientHeight || 550;
            if (allWords[0]) spawnBubble(allWords[0], (actividad.correctas || []).includes(allWords[0]), h * 0.25);
            if (allWords[1]) spawnBubble(allWords[1], (actividad.correctas || []).includes(allWords[1]), h * 0.05);
        }, 80);

        let wordIdx = 2;
        // Intervalo ligeramente ajustado para niños pequeños: 1 burbuja cada 2.8 segundos
        const intervalTimer = setInterval(() => {
            if (!document.body.contains(stage) || bubblesPopped >= totalToPop) {
                clearInterval(intervalTimer);
                return;
            }
            if (wordIdx >= allWords.length) {
                wordIdx = 0;
            }
            const word = allWords[wordIdx];
            spawnBubble(word, (actividad.correctas || []).includes(word));
            wordIdx++;
        }, 2800);
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

        const targetFruit = actividad.frutaObjetivo || '🍎';
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
            <div style="display: flex; align-items: center; gap: 0.6rem; font-size: 1.15rem; white-space: nowrap; font-weight: 900; color: #ffffff; text-shadow: 0 1px 3px rgba(0,0,0,0.35);">
                <span>${actividad.pregunta || `¿Cuántas ${targetFruit} hay en la mesa? (¡Tócalas para contarlas!)`}</span>
            </div>
            <div style="background: rgba(255, 255, 255, 0.22); color: #fef08a; font-weight: 900; font-size: 1.1rem; padding: 0.35rem 1.1rem; border-radius: 9999px; border: 1.5px solid rgba(255, 255, 255, 0.45); text-shadow: 0 1px 2px rgba(0,0,0,0.3);">
                ${targetFruit} Contadas: <span id="fruit-count-val" style="color: #ffffff;">0</span>
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
            const emoji = typeof item === 'string' ? item : (item.emoji || targetFruit);
            const isTarget = typeof item === 'string' ? (item === targetFruit) : (item.esObjetivo !== undefined ? item.esObjetivo : (item.emoji === targetFruit));

            const fruitWrap = document.createElement('div');
            fruitWrap.style.position = 'relative';
            fruitWrap.style.cursor = 'pointer';
            fruitWrap.style.display = 'flex';
            fruitWrap.style.flexDirection = 'column';
            fruitWrap.style.alignItems = 'center';

            // Pin con número que aparece al tocar
            const pin = document.createElement('div');
            pin.style.position = 'absolute';
            pin.style.top = '-14px';
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
            fruitWrap.appendChild(pin);

            const icon = document.createElement('span');
            icon.textContent = emoji;
            icon.style.fontSize = '4.6rem';
            icon.style.userSelect = 'none';
            icon.style.filter = 'drop-shadow(0 8px 12px rgba(0,0,0,0.2))';
            icon.style.display = 'block';
            icon.style.transition = 'transform 0.15s ease';
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
                        icon.style.transform = 'scale(1.1)';
                        if (AppState.settings.soundEnabled) this.playSound('success');
                    } else {
                        count = Math.max(0, count - 1);
                        pin.style.display = 'none';
                        icon.style.transform = 'scale(1)';
                    }
                    const countValEl = hud.querySelector('#fruit-count-val');
                    if (countValEl) countValEl.textContent = count;
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
                <span>${actividad.pregunta || '¡Equilibra la balanza! Resuelve la suma del platillo izquierdo:'}</span>
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

                        <!-- Pizarrín Escolar -->
                        <rect x="75" y="195" width="130" height="85" rx="14" fill="#78350f" stroke="#451a03" stroke-width="3" />
                        <rect x="83" y="203" width="114" height="69" rx="8" fill="#1e293b" />
                        <text x="140" y="250" text-anchor="middle" font-size="34" font-weight="900" fill="#ffffff" font-family="'Comic Sans MS', cursive, sans-serif">${textoOpIzq}</text>
                    </g>

                    <!-- Platillo Derecho con Incógnita -->
                    <g id="panRight" style="transform-origin: 660px 160px; transform: rotate(10deg); transition: transform 0.7s cubic-bezier(0.34, 1.56, 0.64, 1);">
                        <line x1="660" y1="160" x2="600" y2="280" stroke="#b45309" stroke-width="3" stroke-linecap="round" />
                        <line x1="660" y1="160" x2="720" y2="280" stroke="#b45309" stroke-width="3" stroke-linecap="round" />
                        <ellipse cx="660" cy="285" rx="72" ry="18" fill="url(#dishGrad)" stroke="#78350f" stroke-width="3" />

                        <g id="mysteryBox">
                            <rect x="610" y="205" width="100" height="75" rx="18" fill="#3b82f6" stroke="#1d4ed8" stroke-width="3" />
                            <text x="660" y="256" text-anchor="middle" font-size="42" font-weight="900" fill="#ffffff">?</text>
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
                        mystery.innerHTML = `
                            <rect x="610" y="205" width="100" height="75" rx="18" fill="#10b981" stroke="#047857" stroke-width="3" />
                            <text x="660" y="256" text-anchor="middle" font-size="38" font-weight="900" fill="#ffffff">${num} ✓</text>
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
        const sortedTarget = [...actividad.numeros].sort((a, b) => isMenorMayor ? a - b : b - a);
        const totalSlots = sortedTarget.length;

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
                <span>Coloca los números en la regla ${isMenorMayor ? 'de MENOR a MAYOR' : 'de MAYOR a MENOR'}</span>
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

        const slotMap = new Map();

        actividad.numeros.forEach(num => {
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

            const pinCircle = document.createElement('div');
            pinCircle.style.width = '64px';
            pinCircle.style.height = '64px';
            pinCircle.style.borderRadius = '50%';
            pinCircle.style.border = '3px dashed #94a3b8';
            pinCircle.style.background = 'rgba(255, 255, 255, 0.95)';
            pinCircle.style.display = 'flex';
            pinCircle.style.alignItems = 'center';
            pinCircle.style.justifyContent = 'center';
            pinCircle.style.fontSize = '1.9rem';
            pinCircle.style.fontWeight = '900';
            pinCircle.style.color = '#94a3b8';
            pinCircle.style.boxShadow = '0 4px 10px rgba(0,0,0,0.1)';
            pinCircle.style.transition = 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)';
            pinCircle.textContent = '?';
            slotWrap.appendChild(pinCircle);

            const arrow = document.createElement('div');
            arrow.style.fontSize = '1.3rem';
            arrow.style.color = '#ca8a04';
            arrow.style.marginTop = '-2px';
            arrow.textContent = '▼';
            slotWrap.appendChild(arrow);

            rulerStage.appendChild(slotWrap);
            slotMap.set(num, pinCircle);
        });

        container.appendChild(rulerStage);

        // Fichas Numéricas Táctiles Centradas
        const optionsRow = document.createElement('div');
        optionsRow.style.display = 'flex';
        optionsRow.style.alignItems = 'center';
        optionsRow.style.justifyContent = 'center';
        optionsRow.style.gap = '1.5rem';
        optionsRow.style.width = '100%';
        optionsRow.style.maxWidth = '850px';
        optionsRow.style.margin = '0 auto';
        optionsRow.style.flexShrink = '0';

        let currentStep = 0;

        const highlightCurrentSlot = () => {
            sortedTarget.forEach((num, idx) => {
                const s = slotMap.get(num);
                if (s) {
                    if (idx === currentStep) {
                        s.style.border = '3.5px solid #0284c7';
                        s.style.boxShadow = '0 0 18px rgba(2, 132, 199, 0.6)';
                        s.style.background = '#e0f2fe';
                        s.style.color = '#0284c7';
                    } else if (idx > currentStep) {
                        s.style.border = '3px dashed #94a3b8';
                        s.style.boxShadow = '0 4px 10px rgba(0,0,0,0.1)';
                        s.style.background = 'rgba(255, 255, 255, 0.9)';
                        s.style.color = '#94a3b8';
                    }
                }
            });
        };
        highlightCurrentSlot();

        const shuffled = [...actividad.numeros].sort(() => Math.random() - 0.5);

        shuffled.forEach(num => {
            const btn = document.createElement('button');
            btn.className = 'tactile-btn tactile-btn-white';
            btn.textContent = num;

            btn.onclick = () => {
                const nextExpected = sortedTarget[currentStep];
                if (num === nextExpected) {
                    const slot = slotMap.get(num);
                    slot.style.background = 'linear-gradient(180deg, #10b981 0%, #059669 100%)';
                    slot.style.border = '3px solid #047857';
                    slot.style.color = '#ffffff';
                    slot.style.boxShadow = '0 6px 16px rgba(16, 185, 129, 0.4)';
                    slot.style.transform = 'scale(1.15)';
                    slot.textContent = num;
                    setTimeout(() => { slot.style.transform = 'scale(1)'; }, 200);

                    const tickLbl = tickLabelsMap.get(num);
                    if (tickLbl) {
                        tickLbl.textContent = num;
                        tickLbl.style.color = '#15803d';
                        tickLbl.style.background = '#dcfce7';
                        tickLbl.style.padding = '1px 5px';
                        tickLbl.style.borderRadius = '4px';
                        tickLbl.style.fontWeight = '900';
                    }

                    btn.style.visibility = 'hidden';
                    btn.disabled = true;

                    currentStep++;
                    const ordCounterEl = hud.querySelector('#ordenar-counter');
                    if (ordCounterEl) ordCounterEl.textContent = currentStep;

                    highlightCurrentSlot();

                    if (AppState.settings.soundEnabled) this.playSound('success');

                    if (currentStep === totalSlots) {
                        setTimeout(() => onComplete(true), 900);
                    }
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

        // HUD flotante estilo Burbujas (Azul unificado como las demás)
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

        // Escenario Abierto para Dados (SIN cuadradito/tapete cerrado)
        const diceStage = document.createElement('div');
        diceStage.style.display = 'flex';
        diceStage.style.flexDirection = 'column';
        diceStage.style.alignItems = 'center';
        diceStage.style.justifyContent = 'center';
        diceStage.style.gap = '2.4rem';
        diceStage.style.margin = 'auto 0';
        diceStage.style.width = '100%';
        diceStage.style.maxWidth = '850px';

        // Dados 3D de Color Verde Esmeralda (destacan sobre el fondo blanco/claro)
        const diceValues = actividad.dados || [actividad.dado1 || 3, actividad.dado2 || 2];
        if (actividad.dado3) diceValues.push(actividad.dado3);

        const diceRow = document.createElement('div');
        diceRow.style.display = 'flex';
        diceRow.style.alignItems = 'center';
        diceRow.style.justifyContent = 'center';
        diceRow.style.gap = '3rem';

        const dotPositions = {
            1: [4],
            2: [2, 6],
            3: [2, 4, 6],
            4: [0, 2, 6, 8],
            5: [0, 2, 4, 6, 8],
            6: [0, 2, 3, 5, 6, 8]
        };

        const diceElements = [];

        const makeDie = (val) => {
            const d = document.createElement('div');
            d.style.width = '135px';
            d.style.height = '135px';
            // Verde esmeralda vivo con efecto 3D
            d.style.background = 'linear-gradient(145deg, #10b981 0%, #059669 60%, #047857 100%)';
            d.style.borderRadius = '28px';
            d.style.border = '4px solid #064e3b';
            d.style.boxShadow = '0 16px 32px rgba(5, 150, 105, 0.38), inset 0 2px 5px rgba(255,255,255,0.4), inset 0 -4px 6px rgba(0,0,0,0.3)';
            d.style.display = 'grid';
            d.style.gridTemplate = 'repeat(3, 1fr) / repeat(3, 1fr)';
            d.style.padding = '16px';
            d.style.boxSizing = 'border-box';
            d.style.userSelect = 'none';
            d.style.transition = 'transform 0.4s cubic-bezier(0.16, 1, 0.3, 1)';

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
                d.appendChild(c);
            }
            return d;
        };

        diceValues.forEach((val, idx) => {
            const die = makeDie(val);
            diceElements.push(die);
            diceRow.appendChild(die);

            if (idx < diceValues.length - 1) {
                const plus = document.createElement('span');
                plus.textContent = '+';
                plus.style.fontSize = '3.8rem';
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
        eq.innerHTML = `<span>${diceValues.join(' + ')} = <strong style="color: #0284c7;">?</strong></span>`;
        footer.appendChild(eq);

        const rollBtn = document.createElement('button');
        rollBtn.className = 'tactile-btn tactile-btn-amber';
        rollBtn.style.padding = '0.65rem 1.8rem';
        rollBtn.style.fontSize = '1.15rem';
        rollBtn.style.borderRadius = '9999px';
        rollBtn.textContent = '¡Agitar Dados!';
        rollBtn.onclick = () => {
            if (AppState.settings.soundEnabled) this.playSound('dice');
            diceElements.forEach((die, i) => {
                const rot = (i % 2 === 0 ? 1 : -1) * 360;
                die.style.transform = `rotate(${rot}deg) scale(1.15)`;
                setTimeout(() => { die.style.transform = 'rotate(0deg) scale(1)'; }, 450);
            });
        };
        footer.appendChild(rollBtn);
        diceStage.appendChild(footer);
        container.appendChild(diceStage);

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

        actividad.opciones.forEach((num, index) => {
            const btn = document.createElement('button');
            btn.className = 'tactile-btn tactile-btn-blue';
            btn.textContent = num;

            btn.onclick = () => {
                const esCorrecto = (index === actividad.respuesta) || (num === actividad.respuesta);
                if (esCorrecto) {
                    btn.style.background = 'linear-gradient(180deg, #34d399 0%, #059669 100%)';
                    btn.style.borderColor = '#047857';
                    btn.style.boxShadow = '0 8px 0 #064e3b, 0 12px 20px rgba(5, 150, 105, 0.4)';
                    eq.innerHTML = `<span>${diceValues.join(' + ')} = <strong style="color: #34d399;">${num}</strong> ✓</span>`;
                }
                this.feedback(esCorrecto, btn, null, onComplete);
            };
            optionsRow.appendChild(btn);
        });
        container.appendChild(optionsRow);
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
