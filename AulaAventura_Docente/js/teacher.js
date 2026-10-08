window.TeacherConfig = {
    init() {
        this.updateUI();
    },

    updateUI() {
        const vol = (window.AppState && AppState.settings && AppState.settings.volume !== undefined)
            ? AppState.settings.volume
            : (window.AppState && AppState.settings && AppState.settings.soundEnabled === false ? 0 : 80);

        const slider = document.getElementById('volume-slider');
        const badge = document.getElementById('volume-badge');
        const iconWrap = document.getElementById('volume-icon-indicator');

        if (slider) {
            slider.value = vol;
            slider.style.setProperty('--val-percent', `${vol}%`);
        }
        if (badge) {
            badge.textContent = `${vol}%`;
            badge.style.color = vol === 0 ? '#94a3b8' : '#1e40af';
            badge.style.borderColor = vol === 0 ? '#cbd5e1' : '#bfdbfe';
            badge.style.background = vol === 0 ? '#f1f5f9' : '#eff6ff';
        }
        if (iconWrap && window.AppIcons) {
            iconWrap.innerHTML = vol === 0 
                ? AppIcons.volumeMute 
                : (vol < 50 ? AppIcons.volumeLow : AppIcons.volumeHigh);
            iconWrap.style.color = vol === 0 ? '#94a3b8' : '#1e40af';
            iconWrap.title = vol === 0 ? 'Activar sonido' : 'Silenciar sonido';
        }
    },

    setVolume(val, playTest = true) {
        const vol = Math.max(0, Math.min(100, parseInt(val, 10) || 0));
        AppState.settings.volume = vol;
        AppState.settings.soundEnabled = vol > 0;
        StorageHelper.save('settings', AppState.settings);
        this.updateUI();

        if (playTest && vol > 0 && window.Activities && window.Activities.playSound) {
            if (this._soundDebounce) clearTimeout(this._soundDebounce);
            this._soundDebounce = setTimeout(() => {
                Activities.playSound('success');
            }, 90);
        }
    },

    toggleMute() {
        const current = (AppState.settings && AppState.settings.volume !== undefined) 
            ? AppState.settings.volume 
            : 80;
        if (current > 0) {
            this._lastVol = current;
            this.setVolume(0, false);
        } else {
            this.setVolume(this._lastVol || 80, true);
        }
    },

    toggleSonido() {
        this.toggleMute();
    },

    exportarDatos() {
        StorageHelper.exportData();
    },

    importarDatos() {
        const input = document.createElement('input');
        input.type = 'file';
        input.accept = '.json';
        input.onchange = e => {
            const file = e.target.files[0];
            if(!file) return;

            const reader = new FileReader();
            reader.onload = e => {
                const exito = StorageHelper.importData(e.target.result);
                if(exito) {
                    alert("¡Datos y personajes importados correctamente! Recargando aplicación...");
                    window.location.reload();
                } else {
                    alert("Error al importar los datos. El archivo no es válido.");
                }
            };
            reader.readAsText(file);
        };
        input.click();
    },

    borrarDatos() {
        if(confirm("¿Estás seguro/a de que deseas reiniciar todos los personajes y chucheletes? Esta acción no se puede deshacer.")) {
            localStorage.clear();
            alert("Progresos reiniciados. Recargando...");
            window.location.reload();
        }
    }
};

window.Teacher = window.TeacherConfig;
