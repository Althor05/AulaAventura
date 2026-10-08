window.StorageHelper = {
    save(key, data) {
        try {
            localStorage.setItem(`aula_aventura_${key}`, JSON.stringify(data));
        } catch (e) {
            console.error("Error guardando en localStorage", e);
        }
    },
    
    load(key, defaultValue = null) {
        try {
            const item = localStorage.getItem(`aula_aventura_${key}`);
            return item ? JSON.parse(item) : defaultValue;
        } catch (e) {
            console.error("Error cargando de localStorage", e);
            return defaultValue;
        }
    },

    exportData() {
        const data = {};
        for(let i=0; i<localStorage.length; i++) {
            const key = localStorage.key(i);
            if(key.startsWith('aula_aventura_')) {
                data[key] = localStorage.getItem(key);
            }
        }
        const blob = new Blob([JSON.stringify(data)], { type: "application/json" });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `aula_aventura_backup_${new Date().toISOString().slice(0,10)}.json`;
        a.click();
        URL.revokeObjectURL(url);
    },

    importData(jsonString) {
        try {
            const data = JSON.parse(jsonString);
            for(const key in data) {
                if(key.startsWith('aula_aventura_')) {
                    localStorage.setItem(key, data[key]);
                }
            }
            return true;
        } catch(e) {
            console.error("Archivo de guardado inválido", e);
            return false;
        }
    }
};
