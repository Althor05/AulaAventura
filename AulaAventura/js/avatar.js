window.Avatar = {
    currentCourse: 'primaria1',
    currentSkinIndex: 0,
    activeAvatar: null,

    // Los 10 Animales Oficiales (en assets/animales/)
    SKINS: [
        { id: 'perro', name: 'Perro', file: 'Perro.png', defaultName: 'Tobby' },
        { id: 'panda', name: 'Panda', file: 'Panda.png', defaultName: 'Bambú' },
        { id: 'leon', name: 'León', file: 'Leon.png', defaultName: 'Simba' },
        { id: 'oso', name: 'Oso', file: 'Oso.png', defaultName: 'Grizzly' },
        { id: 'elefante', name: 'Elefante', file: 'Elefante.png', defaultName: 'Trompi' },
        { id: 'jirafa', name: 'Jirafa', file: 'Jirafa.png', defaultName: 'Manchas' },
        { id: 'cerdo', name: 'Cerdo', file: 'Cerdo.png', defaultName: 'Porky' },
        { id: 'vaca', name: 'Vaca', file: 'Vaca.png', defaultName: 'Margarita' },
        { id: 'oveja', name: 'Oveja', file: 'Oveja.png', defaultName: 'Copito' },
        { id: 'gallina', name: 'Gallina', file: 'Gallina.png', defaultName: 'Pita' }
    ],

    getSkin(id) {
        if (!id) return this.SKINS[0];
        const cleanId = String(id).toLowerCase().trim();
        const found = this.SKINS.find(s => s.id === cleanId || s.name.toLowerCase() === cleanId);
        if (found) return found;

        // Compatibilidad con identificadores anteriores
        const aliases = {
            'zorro': 'perro',
            'gato': 'panda',
            'conejo': 'oveja',
            'buho': 'oso',
            'rana': 'cerdo',
            'koala': 'oso'
        };
        if (aliases[cleanId]) {
            return this.SKINS.find(s => s.id === aliases[cleanId]) || this.SKINS[0];
        }
        return this.SKINS[0];
    },

    getSkinImgSrc(skinId) {
        const skin = this.getSkin(skinId);
        return `assets/animales/${skin.file}`;
    },

    // Presets animales oficiales para los 6 cursos de Primaria
    getDefault(cursoId) {
        const presets = {
            'primaria1': { skinId: 'perro', name: 'Tobby' },
            'primaria2': { skinId: 'panda', name: 'Bambú' },
            'primaria3': { skinId: 'oso', name: 'Grizzly' },
            'primaria4': { skinId: 'elefante', name: 'Trompi' },
            'primaria5': { skinId: 'jirafa', name: 'Manchas' },
            'primaria6': { skinId: 'leon', name: 'Simba' }
        };
        const p = presets[cursoId] || { skinId: 'perro', name: 'Aventurero' };
        const skin = this.getSkin(p.skinId);
        return {
            skinId: skin.id,
            species: skin.id,
            name: p.name,
            file: skin.file
        };
    },

    getCourseAvatar(cursoId) {
        if (cursoId === 'infantil') cursoId = 'primaria1';
        const def = this.getDefault(cursoId);
        const progress = StorageHelper.load('progress_' + cursoId, null);
        if (progress && progress.avatar) {
            const skinId = progress.avatar.skinId || progress.avatar.species || def.skinId;
            const skin = this.getSkin(skinId);
            return {
                skinId: skin.id,
                species: skin.id,
                name: progress.avatar.name || def.name,
                file: skin.file
            };
        }
        return def;
    },

    saveCourseAvatar(cursoId, avatarData) {
        if (cursoId === 'infantil') cursoId = 'primaria1';
        let progress = StorageHelper.load('progress_' + cursoId, { chucheletes: 0 });
        progress.avatar = avatarData;
        StorageHelper.save('progress_' + cursoId, progress);
    },

    getCourseChucheletes(cursoId) {
        if (cursoId === 'infantil') cursoId = 'primaria1';
        const progress = StorageHelper.load('progress_' + cursoId, null);
        if (progress) {
            if (typeof progress.chucheletes === 'number') return progress.chucheletes;
            if (typeof progress.chuches === 'number') return progress.chuches;
        }
        return 0;
    },

    getCourseChuches(cursoId) {
        return this.getCourseChucheletes(cursoId);
    },

    addCourseChucheletes(cursoId, amount) {
        if (cursoId === 'infantil') cursoId = 'primaria1';
        let progress = StorageHelper.load('progress_' + cursoId, { chucheletes: 0 });
        let val = (typeof progress.chucheletes === 'number') ? progress.chucheletes : (progress.chuches || 0);
        val += amount;
        progress.chucheletes = val;
        progress.chuches = val;
        StorageHelper.save('progress_' + cursoId, progress);
        return val;
    },

    addCourseChuches(cursoId, amount) {
        return this.addCourseChucheletes(cursoId, amount);
    },

    editCourseAvatar(cursoId) {
        if (cursoId === 'infantil') cursoId = 'primaria1';
        this.currentCourse = cursoId;
        AppState.currentLevel = cursoId;
        StorageHelper.save('currentLevel', cursoId);
        Router.navigate('/avatar');
    },

    renderPreview(avatarData, size = 70) {
        const skin = this.getSkin(avatarData.skinId || avatarData.species);
        return `<img src="${this.getSkinImgSrc(skin.id)}" alt="${avatarData.name || skin.name}" class="mini-avatar-img" onerror="this.src='assets/Nueva carpeta (2)/${skin.file}'">`;
    },

    renderSVG(cfg, size = 120) {
        return this.renderPreview(cfg, size);
    },

    // =========================================================================
    // CONTROLADOR DEL CARRUSEL CÍCLICO
    // =========================================================================
    initCarousel(cursoId) {
        this.currentCourse = cursoId || AppState.currentLevel || 'primaria1';
        this.activeAvatar = Object.assign({}, this.getCourseAvatar(this.currentCourse));
        
        const idx = this.SKINS.findIndex(s => s.id === this.activeAvatar.skinId);
        this.currentSkinIndex = idx >= 0 ? idx : 0;
        
        // Comprobar si el nombre actual es uno de los predeterminados de las mascotas
        const isKnownDefault = this.SKINS.some(s => s.defaultName.toLowerCase() === (this.activeAvatar.name || '').toLowerCase());
        this.isCustomName = !isKnownDefault && Boolean(this.activeAvatar.name);

        this.renderCarouselUI();
        this.setupKeyboard();
    },

    renderCarouselUI() {
        const skin = this.SKINS[this.currentSkinIndex];
        const mainImg = document.getElementById('skin-main-img');
        const speciesTag = document.getElementById('skin-species-tag');
        const counterTag = document.getElementById('skin-counter');
        const nameInput = document.getElementById('skin-name-input');
        
        if (mainImg) {
            mainImg.src = `assets/animales/${skin.file}`;
            mainImg.alt = skin.name;
            mainImg.onerror = () => { mainImg.src = `assets/Nueva carpeta (2)/${skin.file}`; };
            mainImg.style.animation = 'none';
            mainImg.offsetHeight; // reflow para reiniciar animación
            mainImg.style.animation = 'skinPopIn 0.28s cubic-bezier(0.16, 1, 0.3, 1)';
        }

        if (speciesTag) {
            speciesTag.textContent = skin.name;
        }

        if (counterTag) {
            counterTag.textContent = `${this.currentSkinIndex + 1} / ${this.SKINS.length}`;
        }

        if (nameInput) {
            nameInput.value = this.activeAvatar.name || skin.defaultName;
        }

        // Actualizar miniaturas activas
        document.querySelectorAll('.skin-thumb-btn').forEach((btn, i) => {
            if (i === this.currentSkinIndex) {
                btn.classList.add('active');
            } else {
                btn.classList.remove('active');
            }
        });

        // Guardar selección
        this.activeAvatar.skinId = skin.id;
        this.activeAvatar.species = skin.id;
        this.activeAvatar.file = skin.file;
        this.saveCourseAvatar(this.currentCourse, this.activeAvatar);
    },

    nextSkin() {
        this.currentSkinIndex = (this.currentSkinIndex + 1) % this.SKINS.length;
        if (!this.isCustomName) {
            this.activeAvatar.name = this.SKINS[this.currentSkinIndex].defaultName;
        }
        this.renderCarouselUI();
    },

    prevSkin() {
        this.currentSkinIndex = (this.currentSkinIndex - 1 + this.SKINS.length) % this.SKINS.length;
        if (!this.isCustomName) {
            this.activeAvatar.name = this.SKINS[this.currentSkinIndex].defaultName;
        }
        this.renderCarouselUI();
    },

    selectSkinIndex(index) {
        if (index >= 0 && index < this.SKINS.length) {
            this.currentSkinIndex = index;
            if (!this.isCustomName) {
                this.activeAvatar.name = this.SKINS[this.currentSkinIndex].defaultName;
            }
            this.renderCarouselUI();
        }
    },

    setCustomName(name) {
        const val = name.trim();
        const currentSkin = this.SKINS[this.currentSkinIndex];
        if (val && val.toLowerCase() !== currentSkin.defaultName.toLowerCase()) {
            this.isCustomName = true;
            this.activeAvatar.name = val;
        } else {
            this.isCustomName = false;
            this.activeAvatar.name = val || currentSkin.defaultName;
        }
        this.saveCourseAvatar(this.currentCourse, this.activeAvatar);
    },

    setupKeyboard() {
        if (this._keyHandler) {
            window.removeEventListener('keydown', this._keyHandler);
        }
        this._keyHandler = (e) => {
            if (window.location.hash !== '#/avatar') return;
            if (document.activeElement && document.activeElement.tagName === 'INPUT') return;
            if (e.key === 'ArrowRight') {
                e.preventDefault();
                Avatar.nextSkin();
            } else if (e.key === 'ArrowLeft') {
                e.preventDefault();
                Avatar.prevSkin();
            }
        };
        window.addEventListener('keydown', this._keyHandler);
    }
};
