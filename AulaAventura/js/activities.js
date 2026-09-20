window.Activities = {
    render(actividad, containerId, onComplete) {
        const container = document.getElementById(containerId);
        container.innerHTML = '';
        
        container.style.opacity = '0';
        container.style.transform = 'scale(0.96)';
        setTimeout(() => {
            container.style.transition = 'all 0.25s cubic-bezier(0.16, 1, 0.3, 1)';
            container.style.opacity = '1';
            container.style.transform = 'scale(1)';
        }, 30);
        
        // Pregunta con estilo limpio
        const title = document.createElement('h2');
        title.style.fontSize = '2.2rem';
        title.style.marginBottom = '1.5rem';
        title.style.color = '#0f172a';
        title.style.lineHeight = '1.3';
        title.textContent = actividad.pregunta;
        container.appendChild(title);

        // Imagen o elemento destacado
        if(actividad.imagen) {
            const img = document.createElement('div');
            img.style.fontSize = '5.5rem';
            img.style.textAlign = 'center';
            img.style.margin = '0.5rem 0 1.5rem 0';
            img.style.filter = 'drop-shadow(0 6px 12px rgba(0,0,0,0.1))';
            img.textContent = actividad.imagen;
            container.appendChild(img);
        }

        // Área interactiva de opciones
        const workArea = document.createElement('div');
        workArea.style.display = 'grid';
        workArea.style.gridTemplateColumns = 'repeat(auto-fit, minmax(200px, 1fr))';
        workArea.style.gap = '1.2rem';
        workArea.style.width = '100%';
        workArea.style.maxWidth = '680px';
        workArea.style.margin = '1rem auto 0 auto';

        const letters = ['A', 'B', 'C', 'D'];

        if(actividad.tipo === 'multiple' || actividad.tipo === 'completar') {
            actividad.opciones.forEach((opcion, index) => {
                const btn = document.createElement('button');
                btn.className = 'btn btn-secondary';
                btn.style.padding = '1.2rem 1.4rem';
                btn.style.fontSize = '1.35rem';
                btn.style.borderRadius = '20px';
                btn.style.justifyContent = 'flex-start';
                btn.style.gap = '1rem';
                btn.style.textAlign = 'left';

                const badge = document.createElement('span');
                badge.style.width = '38px';
                badge.style.height = '38px';
                badge.style.borderRadius = '12px';
                badge.style.background = '#e2e8f0';
                badge.style.color = '#334155';
                badge.style.display = 'flex';
                badge.style.alignItems = 'center';
                badge.style.justifyContent = 'center';
                badge.style.fontWeight = '900';
                badge.style.fontSize = '1.1rem';
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
        }
        else if (actividad.tipo === 'contar') {
            workArea.style.gridTemplateColumns = 'repeat(auto-fit, minmax(80px, 1fr))';
            workArea.style.maxWidth = '500px';

            const max = Math.max(5, actividad.respuesta + 2);
            for(let i=1; i<=max; i++) {
                const btn = document.createElement('button');
                btn.className = 'btn btn-primary';
                btn.style.fontSize = '1.8rem';
                btn.style.height = '80px';
                btn.style.borderRadius = '22px';
                btn.textContent = i;
                btn.onclick = () => {
                    const esCorrecto = i === actividad.respuesta;
                    this.feedback(esCorrecto, btn, null, onComplete);
                };
                workArea.appendChild(btn);
            }
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
            const ctx = new (window.AudioContext || window.webkitAudioContext)();
            const osc = ctx.createOscillator();
            const gainNode = ctx.createGain();
            
            osc.connect(gainNode);
            gainNode.connect(ctx.destination);
            
            if(type === 'success') {
                osc.type = 'sine';
                osc.frequency.setValueAtTime(523.25, ctx.currentTime); // Do
                osc.frequency.setValueAtTime(659.25, ctx.currentTime + 0.08); // Mi
                osc.frequency.setValueAtTime(783.99, ctx.currentTime + 0.16); // Sol
                gainNode.gain.setValueAtTime(0.25, ctx.currentTime);
                gainNode.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.35);
                osc.start();
                osc.stop(ctx.currentTime + 0.35);
            } else {
                osc.type = 'triangle';
                osc.frequency.setValueAtTime(260, ctx.currentTime);
                osc.frequency.exponentialRampToValueAtTime(140, ctx.currentTime + 0.22);
                gainNode.gain.setValueAtTime(0.25, ctx.currentTime);
                gainNode.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.22);
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
