window.Avatar = {
    currentCourse: 'primaria1',

    // Presets animales oficiales para los 6 cursos de Primaria
    getDefault(cursoId) {
        const presets = {
            'primaria1': { name: 'Tobby', species: 'perro', furColor: '#f59e0b', hat: 'gorra', glasses: 'ninguno', collar: 'bandana' },
            'primaria2': { name: 'Misi', species: 'gato', furColor: '#fb923c', hat: 'laquitolazo', glasses: 'ninguno', collar: 'pajarita' },
            'primaria3': { name: 'Tambor', species: 'conejo', furColor: '#e2e8f0', hat: 'auriculares', glasses: 'pecas', collar: 'bufanda' },
            'primaria4': { name: 'Rudy', species: 'zorro', furColor: '#ea580c', hat: 'ninguno', glasses: 'gafas_redondas', collar: 'capa' },
            'primaria5': { name: 'Bambú', species: 'panda', furColor: '#ffffff', hat: 'chistera', glasses: 'monoculo', collar: 'pajarita' },
            'primaria6': { name: 'Simba', species: 'leon', furColor: '#eab308', hat: 'corona', glasses: 'gafas_sol', collar: 'medalla' }
        };
        return presets[cursoId] || { name: 'Aventurero', species: 'zorro', furColor: '#ea580c', hat: 'gorra', glasses: 'ninguno', collar: 'bandana' };
    },

    getCourseAvatar(cursoId) {
        if (cursoId === 'infantil') cursoId = 'primaria1';
        const progress = StorageHelper.load('progress_' + cursoId, null);
        if (progress && progress.avatar) {
            const def = this.getDefault(cursoId);
            // Si el avatar guardado tiene formato antiguo humano (sin 'species'), migrar al animal por defecto
            if (!progress.avatar.species) {
                return def;
            }
            return Object.assign({}, def, progress.avatar);
        }
        return this.getDefault(cursoId);
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

    renderSVG(cfg, size = 120) {
        const species = cfg.species || 'zorro';
        const furColor = cfg.furColor || '#ea580c';
        const hat = cfg.hat || 'ninguno';
        const glasses = cfg.glasses || 'ninguno';
        const collar = cfg.collar || 'ninguno';

        // 1. CAPA ANIMAL BASE (Cuerpo, Cabeza, Orejas y Rasgos)
        let animalSVG = '';

        if (species === 'zorro') {
            animalSVG = `
                <!-- Orejas de zorro -->
                <polygon points="26,44 18,8 48,26" fill="${furColor}" />
                <polygon points="28,40 22,14 44,28" fill="#ffffff" />
                <polygon points="94,44 102,8 72,26" fill="${furColor}" />
                <polygon points="92,40 98,14 76,28" fill="#ffffff" />
                <polygon points="21,18 18,8 30,15" fill="#1e293b" />
                <polygon points="99,18 102,8 90,15" fill="#1e293b" />
                <!-- Pecho y cuerpo -->
                <path d="M 28 120 C 28 82, 92 82, 92 120 Z" fill="${furColor}" />
                <path d="M 46 80 L 60 100 L 74 80 Z" fill="#ffffff" />
                <!-- Cabeza -->
                <circle cx="60" cy="54" r="30" fill="${furColor}" />
                <!-- Mofletes blancos -->
                <path d="M 32 56 Q 44 76 60 76 Q 76 76 88 56 Q 76 64 60 64 Q 44 64 32 56 Z" fill="#ffffff" />
                <!-- Nariz -->
                <polygon points="56,64 64,64 60,70" fill="#0f172a" />
                <!-- Ojos brillantes -->
                <ellipse cx="46" cy="48" rx="4.5" ry="5.5" fill="#0f172a" />
                <circle cx="48" cy="46" r="1.6" fill="#ffffff" />
                <circle cx="44.5" cy="50.5" r="0.9" fill="#ffffff" />
                <ellipse cx="74" cy="48" rx="4.5" ry="5.5" fill="#0f172a" />
                <circle cx="76" cy="46" r="1.6" fill="#ffffff" />
                <circle cx="72.5" cy="50.5" r="0.9" fill="#ffffff" />
                <!-- Sonrisa y hocico -->
                <path d="M 60 70 L 60 73 M 55 74 Q 60 77 65 74" stroke="#0f172a" stroke-width="1.8" fill="none" stroke-linecap="round"/>
                <!-- Mejillas rosadas -->
                <ellipse cx="38" cy="58" rx="4.5" ry="3" fill="#fb7185" opacity="0.4" />
                <ellipse cx="82" cy="58" rx="4.5" ry="3" fill="#fb7185" opacity="0.4" />
            `;
        } else if (species === 'panda') {
            animalSVG = `
                <!-- Orejas negras redondeadas -->
                <circle cx="28" cy="28" r="14" fill="#0f172a" />
                <circle cx="92" cy="28" r="14" fill="#0f172a" />
                <!-- Pecho y hombros negros -->
                <path d="M 28 120 C 28 82, 92 82, 92 120 Z" fill="#0f172a" />
                <path d="M 44 80 L 60 98 L 76 80 Z" fill="#f8fafc" />
                <!-- Cabeza blanca -->
                <circle cx="60" cy="54" r="30" fill="#ffffff" stroke="#e2e8f0" stroke-width="1" />
                <!-- Manchas negras de los ojos -->
                <ellipse cx="44" cy="48" rx="9.5" ry="12" fill="#0f172a" transform="rotate(-18 44 48)"/>
                <ellipse cx="76" cy="48" rx="9.5" ry="12" fill="#0f172a" transform="rotate(18 76 48)"/>
                <!-- Ojos vivos dentro de la mancha -->
                <ellipse cx="45" cy="48" rx="3.5" ry="4.5" fill="#ffffff" />
                <ellipse cx="75" cy="48" rx="3.5" ry="4.5" fill="#ffffff" />
                <circle cx="45" cy="48" r="2.5" fill="#0f172a" />
                <circle cx="75" cy="48" r="2.5" fill="#0f172a" />
                <circle cx="46" cy="46.5" r="1" fill="#ffffff" />
                <circle cx="76" cy="46.5" r="1" fill="#ffffff" />
                <!-- Nariz oscura de oso -->
                <ellipse cx="60" cy="63" rx="5.5" ry="4" fill="#0f172a" />
                <path d="M 60 67 L 60 70 M 54 71 Q 60 75 66 71" stroke="#0f172a" stroke-width="1.8" fill="none" stroke-linecap="round"/>
                <!-- Mejillas rosadas suaves -->
                <ellipse cx="33" cy="59" rx="5" ry="3.5" fill="#f43f5e" opacity="0.3" />
                <ellipse cx="87" cy="59" rx="5" ry="3.5" fill="#f43f5e" opacity="0.3" />
            `;
        } else if (species === 'oso') {
            animalSVG = `
                <!-- Orejas de oso pardo -->
                <circle cx="28" cy="28" r="13" fill="${furColor}" />
                <circle cx="28" cy="28" r="7" fill="#fde68a" />
                <circle cx="92" cy="28" r="13" fill="${furColor}" />
                <circle cx="92" cy="28" r="7" fill="#fde68a" />
                <!-- Cuerpo -->
                <path d="M 28 120 C 28 82, 92 82, 92 120 Z" fill="${furColor}" />
                <!-- Cabeza -->
                <circle cx="60" cy="54" r="30" fill="${furColor}" />
                <!-- Hocico redondeado claro -->
                <ellipse cx="60" cy="64" rx="14" ry="11" fill="#fef3c7" />
                <ellipse cx="60" cy="61" rx="6" ry="4.5" fill="#382218" />
                <path d="M 60 65 L 60 68 M 55 69 Q 60 73 65 69" stroke="#382218" stroke-width="2" fill="none" stroke-linecap="round"/>
                <!-- Ojos -->
                <circle cx="45" cy="47" r="4.5" fill="#1e293b" />
                <circle cx="46.5" cy="45.5" r="1.6" fill="#ffffff" />
                <circle cx="75" cy="47" r="4.5" fill="#1e293b" />
                <circle cx="76.5" cy="45.5" r="1.6" fill="#ffffff" />
                <!-- Cejas amables -->
                <path d="M 40 39 Q 45 36 50 39" stroke="#382218" stroke-width="2" fill="none" stroke-linecap="round"/>
                <path d="M 70 39 Q 75 36 80 39" stroke="#382218" stroke-width="2" fill="none" stroke-linecap="round"/>
            `;
        } else if (species === 'leon') {
            animalSVG = `
                <!-- Melena frondosa radiante -->
                <circle cx="60" cy="54" r="38" fill="#b45309" />
                <circle cx="34" cy="32" r="13" fill="#b45309" />
                <circle cx="86" cy="32" r="13" fill="#b45309" />
                <circle cx="25" cy="52" r="13" fill="#b45309" />
                <circle cx="95" cy="52" r="13" fill="#b45309" />
                <circle cx="32" cy="74" r="13" fill="#b45309" />
                <circle cx="88" cy="74" r="13" fill="#b45309" />
                <!-- Orejas del león -->
                <circle cx="34" cy="28" r="10" fill="${furColor}" />
                <circle cx="34" cy="28" r="5" fill="#fef3c7" />
                <circle cx="86" cy="28" r="10" fill="${furColor}" />
                <circle cx="86" cy="28" r="5" fill="#fef3c7" />
                <!-- Cuerpo -->
                <path d="M 28 120 C 28 82, 92 82, 92 120 Z" fill="${furColor}" />
                <!-- Cabeza -->
                <circle cx="60" cy="54" r="28" fill="${furColor}" />
                <!-- Hocico blanco -->
                <ellipse cx="60" cy="64" rx="12" ry="9" fill="#fffbeb" />
                <polygon points="56,60 64,60 60,65" fill="#92400e" />
                <path d="M 60 65 L 60 68 M 55 69 Q 60 73 65 69" stroke="#92400e" stroke-width="2" fill="none" stroke-linecap="round"/>
                <!-- Ojos valientes -->
                <ellipse cx="46" cy="47" rx="4.5" ry="5.5" fill="#1e293b" />
                <circle cx="48" cy="45" r="1.7" fill="#ffffff" />
                <ellipse cx="74" cy="47" rx="4.5" ry="5.5" fill="#1e293b" />
                <circle cx="76" cy="45" r="1.7" fill="#ffffff" />
                <!-- Bigotes de león -->
                <line x1="38" y1="64" x2="48" y2="64" stroke="#92400e" stroke-width="1.2" stroke-linecap="round"/>
                <line x1="38" y1="67" x2="47" y2="68" stroke="#92400e" stroke-width="1.2" stroke-linecap="round"/>
                <line x1="82" y1="64" x2="72" y2="64" stroke="#92400e" stroke-width="1.2" stroke-linecap="round"/>
                <line x1="82" y1="67" x2="73" y2="68" stroke="#92400e" stroke-width="1.2" stroke-linecap="round"/>
            `;
        } else if (species === 'conejo') {
            animalSVG = `
                <!-- Orejas largas y erguidas -->
                <ellipse cx="42" cy="18" rx="8" ry="24" fill="${furColor}" transform="rotate(-6 42 18)"/>
                <ellipse cx="42" cy="18" rx="4.5" ry="18" fill="#fbcfe8" transform="rotate(-6 42 18)"/>
                <ellipse cx="78" cy="18" rx="8" ry="24" fill="${furColor}" transform="rotate(6 78 18)"/>
                <ellipse cx="78" cy="18" rx="4.5" ry="18" fill="#fbcfe8" transform="rotate(6 78 18)"/>
                <!-- Cuerpo -->
                <path d="M 28 120 C 28 82, 92 82, 92 120 Z" fill="${furColor}" />
                <!-- Cabeza -->
                <circle cx="60" cy="56" r="29" fill="${furColor}" />
                <!-- Ojos grandes y cariñosos -->
                <ellipse cx="45" cy="50" rx="5" ry="6" fill="#1e293b" />
                <circle cx="47" cy="48" r="1.9" fill="#ffffff" />
                <circle cx="43.5" cy="53" r="1" fill="#ffffff" />
                <ellipse cx="75" cy="50" rx="5" ry="6" fill="#1e293b" />
                <circle cx="77" cy="48" r="1.9" fill="#ffffff" />
                <circle cx="73.5" cy="53" r="1" fill="#ffffff" />
                <!-- Naricilla y boca de conejito -->
                <polygon points="57,61 63,61 60,65" fill="#f43f5e" />
                <path d="M 60 65 L 60 67 M 55 68 Q 60 72 65 68" stroke="#1e293b" stroke-width="1.8" fill="none" stroke-linecap="round"/>
                <rect x="58.5" y="68" width="3" height="3.5" fill="#ffffff" stroke="#1e293b" stroke-width="0.8" rx="0.5"/>
                <!-- Bigotes simpáticos -->
                <line x1="30" y1="62" x2="48" y2="64" stroke="#94a3b8" stroke-width="1.3" stroke-linecap="round"/>
                <line x1="30" y1="68" x2="48" y2="67" stroke="#94a3b8" stroke-width="1.3" stroke-linecap="round"/>
                <line x1="90" y1="62" x2="72" y2="64" stroke="#94a3b8" stroke-width="1.3" stroke-linecap="round"/>
                <line x1="90" y1="68" x2="72" y2="67" stroke="#94a3b8" stroke-width="1.3" stroke-linecap="round"/>
                <!-- Mejillas sonrosadas -->
                <ellipse cx="38" cy="59" rx="5" ry="3.5" fill="#fda4af" opacity="0.5" />
                <ellipse cx="82" cy="59" rx="5" ry="3.5" fill="#fda4af" opacity="0.5" />
            `;
        } else if (species === 'gato') {
            animalSVG = `
                <!-- Orejas triangulares -->
                <polygon points="28,42 22,14 50,26" fill="${furColor}" />
                <polygon points="30,38 26,18 46,28" fill="#fbcfe8" />
                <polygon points="92,42 98,14 70,26" fill="${furColor}" />
                <polygon points="90,38 94,18 74,28" fill="#fbcfe8" />
                <!-- Cuerpo -->
                <path d="M 28 120 C 28 82, 92 82, 92 120 Z" fill="${furColor}" />
                <!-- Cabeza -->
                <circle cx="60" cy="54" r="30" fill="${furColor}" />
                <!-- Ojos gatunos despiertos -->
                <ellipse cx="46" cy="48" rx="5" ry="5.8" fill="#1e293b" />
                <circle cx="47.5" cy="46" r="1.8" fill="#ffffff" />
                <circle cx="44" cy="50.5" r="0.9" fill="#ffffff" />
                <ellipse cx="74" cy="48" rx="5" ry="5.8" fill="#1e293b" />
                <circle cx="75.5" cy="46" r="1.8" fill="#ffffff" />
                <circle cx="72" cy="50.5" r="0.9" fill="#ffffff" />
                <!-- Naricilla y boca de gato -->
                <polygon points="57,60 63,60 60,64" fill="#f43f5e" />
                <path d="M 60 64 L 60 66 M 55 67 Q 60 70 65 67" stroke="#1e293b" stroke-width="1.8" fill="none" stroke-linecap="round"/>
                <!-- Bigotes de gato -->
                <line x1="28" y1="60" x2="48" y2="62" stroke="#64748b" stroke-width="1.5" stroke-linecap="round"/>
                <line x1="28" y1="67" x2="48" y2="65" stroke="#64748b" stroke-width="1.5" stroke-linecap="round"/>
                <line x1="92" y1="60" x2="72" y2="62" stroke="#64748b" stroke-width="1.5" stroke-linecap="round"/>
                <line x1="92" y1="67" x2="72" y2="65" stroke="#64748b" stroke-width="1.5" stroke-linecap="round"/>
                <!-- Mejillas sonrosadas -->
                <ellipse cx="38" cy="56" rx="4.5" ry="3" fill="#fda4af" opacity="0.4" />
                <ellipse cx="82" cy="56" rx="4.5" ry="3" fill="#fda4af" opacity="0.4" />
            `;
        } else if (species === 'perro') {
            animalSVG = `
                <!-- Orejas caídas y simpáticas -->
                <path d="M 32 36 C 18 42, 14 68, 22 80 C 26 84, 34 78, 36 60 Z" fill="${furColor}" />
                <path d="M 88 36 C 102 42, 106 68, 98 80 C 94 84, 86 78, 84 60 Z" fill="${furColor}" />
                <!-- Cuerpo -->
                <path d="M 28 120 C 28 82, 92 82, 92 120 Z" fill="${furColor}" />
                <!-- Cabeza -->
                <circle cx="60" cy="54" r="30" fill="${furColor}" />
                <!-- Mancha alrededor de un ojo -->
                <ellipse cx="46" cy="48" rx="12" ry="13" fill="#ffffff" opacity="0.35"/>
                <!-- Ojos leales y nobles -->
                <ellipse cx="46" cy="48" rx="4.5" ry="5.5" fill="#1e293b" />
                <circle cx="47.5" cy="46" r="1.7" fill="#ffffff" />
                <circle cx="44" cy="50.5" r="0.9" fill="#ffffff" />
                <ellipse cx="74" cy="48" rx="4.5" ry="5.5" fill="#1e293b" />
                <circle cx="75.5" cy="46" r="1.7" fill="#ffffff" />
                <circle cx="72" cy="50.5" r="0.9" fill="#ffffff" />
                <!-- Gran hocico juguetón -->
                <ellipse cx="60" cy="65" rx="13" ry="10" fill="#fef3c7" />
                <ellipse cx="60" cy="62" rx="6" ry="4.5" fill="#0f172a" />
                <path d="M 60 66 L 60 70 M 54 70 Q 60 76 66 70" stroke="#0f172a" stroke-width="2" fill="none" stroke-linecap="round"/>
                <!-- Lengua contenta -->
                <path d="M 58 72 C 58 78, 64 78, 64 72 Z" fill="#f43f5e" />
            `;
        } else if (species === 'buho') {
            animalSVG = `
                <!-- Penachos plumosos de búho -->
                <polygon points="34,36 28,14 46,26" fill="${furColor}" />
                <polygon points="86,36 92,14 74,26" fill="${furColor}" />
                <!-- Cuerpo con plumas -->
                <path d="M 28 120 C 28 80, 92 80, 92 120 Z" fill="${furColor}" />
                <ellipse cx="60" cy="100" rx="18" ry="16" fill="#fef3c7" />
                <!-- Cabeza redonda -->
                <circle cx="60" cy="54" r="30" fill="${furColor}" />
                <!-- Círculos de los ojos gigantes de búho -->
                <circle cx="45" cy="50" r="13" fill="#ffffff" stroke="#fde68a" stroke-width="2"/>
                <circle cx="75" cy="50" r="13" fill="#ffffff" stroke="#fde68a" stroke-width="2"/>
                <circle cx="45" cy="50" r="6" fill="#0f172a" />
                <circle cx="47" cy="48" r="2.2" fill="#ffffff" />
                <circle cx="75" cy="50" r="6" fill="#0f172a" />
                <circle cx="77" cy="48" r="2.2" fill="#ffffff" />
                <!-- Pico triangular dorado -->
                <polygon points="56,58 64,58 60,68" fill="#f59e0b" />
            `;
        } else if (species === 'rana') {
            animalSVG = `
                <!-- Ojos saltones sobre la cabeza -->
                <circle cx="40" cy="28" r="14" fill="${furColor}" />
                <circle cx="80" cy="28" r="14" fill="${furColor}" />
                <ellipse cx="40" cy="28" rx="8" ry="9" fill="#ffffff" />
                <ellipse cx="40" cy="28" rx="4.5" ry="5.5" fill="#0f172a" />
                <circle cx="42" cy="26" r="1.8" fill="#ffffff" />
                <ellipse cx="80" cy="28" rx="8" ry="9" fill="#ffffff" />
                <ellipse cx="80" cy="28" rx="4.5" ry="5.5" fill="#0f172a" />
                <circle cx="82" cy="26" r="1.8" fill="#ffffff" />
                <!-- Cuerpo -->
                <path d="M 28 120 C 28 82, 92 82, 92 120 Z" fill="${furColor}" />
                <ellipse cx="60" cy="102" rx="16" ry="14" fill="#bef264" />
                <!-- Cabeza ancha y divertida -->
                <ellipse cx="60" cy="56" rx="33" ry="26" fill="${furColor}" />
                <circle cx="56" cy="50" r="1.2" fill="#14532d" />
                <circle cx="64" cy="50" r="1.2" fill="#14532d" />
                <!-- Gran sonrisa de oreja a oreja -->
                <path d="M 38 60 Q 60 76 82 60" stroke="#14532d" stroke-width="2.6" fill="none" stroke-linecap="round"/>
                <ellipse cx="36" cy="60" rx="5.5" ry="4" fill="#fb7185" opacity="0.4" />
                <ellipse cx="84" cy="60" rx="5.5" ry="4" fill="#fb7185" opacity="0.4" />
            `;
        } else if (species === 'koala') {
            animalSVG = `
                <!-- Orejas redondas y peludas -->
                <circle cx="26" cy="38" r="16" fill="${furColor}" />
                <circle cx="26" cy="38" r="10" fill="#f8fafc" />
                <circle cx="94" cy="38" r="16" fill="${furColor}" />
                <circle cx="94" cy="38" r="10" fill="#f8fafc" />
                <circle cx="24" cy="28" r="4" fill="#ffffff" opacity="0.7"/>
                <circle cx="96" cy="28" r="4" fill="#ffffff" opacity="0.7"/>
                <!-- Cuerpo -->
                <path d="M 28 120 C 28 82, 92 82, 92 120 Z" fill="${furColor}" />
                <!-- Cabeza -->
                <circle cx="60" cy="54" r="30" fill="${furColor}" />
                <!-- Ojos soñadores -->
                <ellipse cx="44" cy="48" rx="4.5" ry="5" fill="#1e293b" />
                <circle cx="45.5" cy="46.5" r="1.6" fill="#ffffff" />
                <ellipse cx="76" cy="48" rx="4.5" ry="5" fill="#1e293b" />
                <circle cx="77.5" cy="46.5" r="1.6" fill="#ffffff" />
                <!-- Gran nariz ovalada de koala -->
                <ellipse cx="60" cy="62" rx="9.5" ry="13" fill="#1e293b" />
                <ellipse cx="58" cy="58" rx="2.5" ry="4" fill="#ffffff" opacity="0.3" />
                <path d="M 55 76 Q 60 78 65 76" stroke="#1e293b" stroke-width="1.8" fill="none" stroke-linecap="round"/>
                <ellipse cx="36" cy="58" rx="4.5" ry="3" fill="#fda4af" opacity="0.5" />
                <ellipse cx="84" cy="58" rx="4.5" ry="3" fill="#fda4af" opacity="0.5" />
            `;
        }

        // 2. GAFAS O ACCESORIOS DE ROSTRO
        let glassesSVG = '';
        if (glasses === 'gafas_redondas') {
            glassesSVG = `
                <circle cx="46" cy="48" r="11" stroke="#334155" stroke-width="2.8" fill="rgba(255,255,255,0.25)"/>
                <circle cx="74" cy="48" r="11" stroke="#334155" stroke-width="2.8" fill="rgba(255,255,255,0.25)"/>
                <line x1="57" y1="48" x2="63" y2="48" stroke="#334155" stroke-width="3"/>
                <line x1="35" y1="48" x2="26" y2="45" stroke="#334155" stroke-width="2.5" stroke-linecap="round"/>
                <line x1="85" y1="48" x2="94" y2="45" stroke="#334155" stroke-width="2.5" stroke-linecap="round"/>
            `;
        } else if (glasses === 'gafas_sol') {
            glassesSVG = `
                <path d="M 33 42 L 56 42 L 53 56 L 36 56 Z" fill="#0f172a" stroke="#020617" stroke-width="1.8" rx="3"/>
                <path d="M 64 42 L 87 42 L 84 56 L 67 56 Z" fill="#0f172a" stroke="#020617" stroke-width="1.8" rx="3"/>
                <line x1="56" y1="45" x2="64" y2="45" stroke="#020617" stroke-width="3.5"/>
                <line x1="38" y1="45" x2="47" y2="53" stroke="#ffffff" stroke-width="1.8" opacity="0.6"/>
                <line x1="69" y1="45" x2="78" y2="53" stroke="#ffffff" stroke-width="1.8" opacity="0.6"/>
            `;
        } else if (glasses === 'monoculo') {
            glassesSVG = `
                <circle cx="74" cy="48" r="11" stroke="#f59e0b" stroke-width="2.8" fill="rgba(254,243,199,0.3)"/>
                <path d="M 85 48 Q 94 65 88 80" stroke="#d97706" stroke-width="1.6" fill="none" stroke-linecap="round"/>
            `;
        } else if (glasses === 'estrella') {
            glassesSVG = `
                <polygon points="78,56 80,61 85,61 81,64 82.5,69 78,66 73.5,69 75,64 71,61 76,61" fill="#f59e0b" stroke="#d97706" stroke-width="0.8"/>
            `;
        } else if (glasses === 'pecas') {
            glassesSVG = `
                <circle cx="39" cy="55" r="1.2" fill="#9a3412" opacity="0.6"/>
                <circle cx="42" cy="57" r="1.4" fill="#9a3412" opacity="0.6"/>
                <circle cx="45" cy="55" r="1.2" fill="#9a3412" opacity="0.6"/>
                <circle cx="75" cy="55" r="1.2" fill="#9a3412" opacity="0.6"/>
                <circle cx="78" cy="57" r="1.4" fill="#9a3412" opacity="0.6"/>
                <circle cx="81" cy="55" r="1.2" fill="#9a3412" opacity="0.6"/>
            `;
        }

        // 3. SOMBREROS Y CABEZA
        let hatSVG = '';
        if (hat === 'gorra') {
            hatSVG = `
                <path d="M 36 34 C 38 16, 82 16, 84 34 Z" fill="#ef4444" />
                <ellipse cx="60" cy="34" rx="26" ry="4.5" fill="#dc2626" />
                <path d="M 52 34 Q 90 32 98 37 Q 66 40 48 35 Z" fill="#ef4444" stroke="#b91c1c" stroke-width="1"/>
                <circle cx="60" cy="18" r="3.2" fill="#fbbf24" />
            `;
        } else if (hat === 'corona') {
            hatSVG = `
                <path d="M 38 30 L 44 14 L 60 22 L 76 14 L 82 30 Z" fill="#f59e0b" stroke="#d97706" stroke-width="1.8" />
                <circle cx="44" cy="14" r="2.8" fill="#ef4444" />
                <circle cx="60" cy="22" r="3" fill="#06b6d4" />
                <circle cx="76" cy="14" r="2.8" fill="#8b5cf6" />
                <rect x="40" y="28" width="40" height="3.5" fill="#d97706" rx="1.5" />
            `;
        } else if (hat === 'chistera') {
            hatSVG = `
                <ellipse cx="60" cy="32" rx="34" ry="6" fill="#1e293b" />
                <path d="M 42 31 L 44 8 L 76 8 L 78 31 Z" fill="#334155" />
                <path d="M 43 30 L 44 24 L 76 24 L 77 30 Z" fill="#ef4444" />
            `;
        } else if (hat === 'brujo') {
            hatSVG = `
                <ellipse cx="60" cy="32" rx="36" ry="7" fill="#4338ca" transform="rotate(-3 60 32)"/>
                <path d="M 40 30 Q 52 14 78 -2 Q 74 16 80 30 Z" fill="#6366f1" />
                <path d="M 41 29 L 43 23 L 77 23 L 79 29 Z" fill="#f59e0b" />
                <polygon points="63,16 64.5,19 68,19 65,21 66.5,24 63,22 59.5,24 61,21 58,19 61.5,19" fill="#fef08a" />
            `;
        } else if (hat === 'laquitolazo') {
            hatSVG = `
                <circle cx="40" cy="24" r="4.5" fill="#dc2626" />
                <polygon points="40,24 22,12 24,34" fill="#ef4444" />
                <polygon points="40,24 58,12 56,34" fill="#ef4444" />
                <circle cx="40" cy="24" r="2.5" fill="#f87171" />
            `;
        } else if (hat === 'auriculares') {
            hatSVG = `
                <path d="M 28 44 C 26 8, 94 8, 92 44" stroke="#1e293b" stroke-width="5" fill="none" stroke-linecap="round"/>
                <rect x="22" y="36" width="10" height="20" rx="4" fill="#2563eb" stroke="#1d4ed8" stroke-width="2"/>
                <rect x="88" y="36" width="10" height="20" rx="4" fill="#2563eb" stroke="#1d4ed8" stroke-width="2"/>
            `;
        } else if (hat === 'pirata') {
            hatSVG = `
                <path d="M 30 32 C 32 12, 88 12, 90 32 Q 60 37 30 32 Z" fill="#0f172a" />
                <circle cx="60" cy="23" r="3.8" fill="#ffffff" />
                <circle cx="58.8" cy="23" r="0.9" fill="#0f172a" />
                <circle cx="61.2" cy="23" r="0.9" fill="#0f172a" />
                <line x1="54" y1="28" x2="66" y2="28" stroke="#ffffff" stroke-width="1.8" stroke-linecap="round"/>
                <polygon points="88,30 100,34 96,42 86,36" fill="#ef4444" />
            `;
        } else if (hat === 'boina') {
            hatSVG = `
                <ellipse cx="62" cy="26" rx="28" ry="11" fill="#1e3a8a" transform="rotate(-8 62 26)"/>
                <circle cx="62" cy="15" r="2.5" fill="#1e40af" />
            `;
        } else if (hat === 'flor') {
            hatSVG = `
                <circle cx="78" cy="24" r="4.5" fill="#fbbf24" />
                <circle cx="78" cy="16" r="4.5" fill="#ec4899" />
                <circle cx="85" cy="21" r="4.5" fill="#ec4899" />
                <circle cx="83" cy="29" r="4.5" fill="#ec4899" />
                <circle cx="73" cy="29" r="4.5" fill="#ec4899" />
                <circle cx="71" cy="21" r="4.5" fill="#ec4899" />
            `;
        }

        // 4. ACCESORIOS DE CUELLO / PECHO
        let collarSVG = '';
        if (collar === 'pajarita') {
            collarSVG = `
                <polygon points="60,82 48,74 48,90" fill="#dc2626" />
                <polygon points="60,82 72,74 72,90" fill="#dc2626" />
                <circle cx="60" cy="82" r="4" fill="#b91c1c" />
            `;
        } else if (collar === 'bufanda') {
            collarSVG = `
                <ellipse cx="60" cy="80" rx="22" ry="7" fill="#0284c7" />
                <path d="M 64 82 L 67 106 L 77 106 L 74 82 Z" fill="#0369a1" />
                <line x1="67" y1="106" x2="77" y2="106" stroke="#f0f9ff" stroke-width="2.5" stroke-dasharray="2,2"/>
            `;
        } else if (collar === 'bandana') {
            collarSVG = `
                <polygon points="44,78 76,78 60,96" fill="#16a34a" />
                <circle cx="60" cy="78" r="3.5" fill="#15803d" />
            `;
        } else if (collar === 'capa') {
            collarSVG = `
                <path d="M 40 82 Q 60 88 80 82 L 86 118 Q 60 112 34 118 Z" fill="#7c3aed" opacity="0.9"/>
                <circle cx="60" cy="82" r="4" fill="#fbbf24" stroke="#d97706" stroke-width="1"/>
            `;
        } else if (collar === 'medalla') {
            collarSVG = `
                <polygon points="54,78 60,88 66,78 63,78 60,83 57,78" fill="#2563eb" />
                <circle cx="60" cy="94" r="8" fill="#f59e0b" stroke="#d97706" stroke-width="1.5" />
                <polygon points="60,89 62,93 66,93 63,95 64,99 60,97 56,99 57,95 54,93 58,93" fill="#ffffff" />
            `;
        } else if (collar === 'corbata') {
            collarSVG = `
                <polygon points="57,78 63,78 64,83 56,83" fill="#1e3a8a" />
                <polygon points="56,83 64,83 62,102 60,107 58,102" fill="#2563eb" />
                <line x1="57" y1="88" x2="63" y2="92" stroke="#fde047" stroke-width="1.5" />
                <line x1="58" y1="96" x2="62" y2="100" stroke="#fde047" stroke-width="1.5" />
            `;
        }

        return `
            <svg viewBox="0 0 120 120" width="${size}" height="${size}" style="display: block; overflow: visible;">
                ${animalSVG}
                ${glassesSVG}
                ${hatSVG}
                ${collarSVG}
            </svg>
        `;
    },

    initView() {
        const cursoId = this.currentCourse || AppState.currentLevel || 'primaria1';
        const nombresCursos = {
            'primaria1': '1.º de Primaria',
            'primaria2': '2.º de Primaria',
            'primaria3': '3.º de Primaria',
            'primaria4': '4.º de Primaria',
            'primaria5': '5.º de Primaria',
            'primaria6': '6.º de Primaria'
        };

        const tituloEl = document.getElementById('avatar-curso-titulo');
        if (tituloEl) tituloEl.textContent = nombresCursos[cursoId] || 'Tu Personaje';
        
        const chucheletesEl = document.getElementById('avatar-chuches');
        if (chucheletesEl) chucheletesEl.textContent = this.getCourseChucheletes(cursoId);

        this.activeConfig = Object.assign({}, this.getCourseAvatar(cursoId));

        const nameInput = document.getElementById('avatar-name-input');
        if (nameInput) {
            nameInput.value = this.activeConfig.name || 'Aventurero';
            nameInput.oninput = (e) => {
                this.setName(e.target.value);
            };
        }

        this.updatePreview();
        this.switchTab('animal');
    },

    updatePreview() {
        const previewBox = document.getElementById('avatar-live-preview');
        if (previewBox) {
            previewBox.innerHTML = this.renderSVG(this.activeConfig, 220);
        }
    },

    setName(newName) {
        this.activeConfig.name = newName.trim() || 'Aventurero';
        const cursoId = this.currentCourse || AppState.currentLevel || 'primaria1';
        this.saveCourseAvatar(cursoId, this.activeConfig);
    },

    setProperty(key, val) {
        this.activeConfig[key] = val;
        this.updatePreview();
        const cursoId = this.currentCourse || AppState.currentLevel || 'primaria1';
        this.saveCourseAvatar(cursoId, this.activeConfig);
    },

    switchTab(tabId) {
        document.querySelectorAll('.avatar-tab-btn').forEach(b => b.classList.remove('active'));
        document.querySelectorAll('.avatar-tab-content').forEach(c => c.style.display = 'none');

        const activeBtn = document.getElementById('tab-btn-' + tabId);
        const activeContent = document.getElementById('tab-content-' + tabId);

        if (activeBtn) activeBtn.classList.add('active');
        if (activeContent) activeContent.style.display = 'block';
    }
};
