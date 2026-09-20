window.TeacherConfig = {
    init() {
        this.updateUI();
    },

    updateUI() {
        const btnSonido = document.getElementById('btn-toggle-sonido');
        if(btnSonido) {
            btnSonido.textContent = AppState.settings.soundEnabled ? "Sonido: ACTIVADO" : "Sonido: DESACTIVADO";
            btnSonido.className = AppState.settings.soundEnabled ? "btn btn-primary" : "btn btn-secondary";
        }
    },

    toggleSonido() {
        AppState.settings.soundEnabled = !AppState.settings.soundEnabled;
        StorageHelper.save('settings', AppState.settings);
        this.updateUI();
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
