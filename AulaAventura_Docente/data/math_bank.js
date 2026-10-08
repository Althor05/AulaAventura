/**
 * math_bank.js - Banco Extenso de Matemáticas de Aula Aventura (Castillo del Saber)
 * Genera más de 1.300 actividades matemáticas adaptadas por nivel (1.º a 6.º de Primaria)
 * Cumple al 100% las especificaciones de DIARIO DEL EXPLORADOR / MANUAL DEL AVENTURERO:
 *  - Contar frutas: Variedad de frutas, conteo visual interactivo.
 *  - Balanza de números: Operaciones exactas, suma, resta, incógnitas (+ y -) y multiplicación/división.
 *  - Ordenar números (regla): Integrado con drag-and-drop táctil y progresiones curriculares.
 *  - Adivinanzas de números: Enigmas diversos con pistas progresivas.
 *  - Dados virtuales: Giros aleatorios en 3D y suma de puntos.
 */

(function () {
    'use strict';

    const frutasList = [
        { id: 'manzana', name: 'manzanas', singular: 'manzana', img: 'assets/frutas/MANZANA.png', emoji: '🍎', articulo: 'Cuántas', contadas: 'Contadas' },
        { id: 'platano', name: 'plátanos', singular: 'plátano', img: 'assets/frutas/PLATANO.png', emoji: '🍌', articulo: 'Cuántos', contadas: 'Contados' },
        { id: 'pera', name: 'peras', singular: 'pera', img: 'assets/frutas/PERA.png', emoji: '🍐', articulo: 'Cuántas', contadas: 'Contadas' },
        { id: 'sandia', name: 'sandías', singular: 'sandía', img: 'assets/frutas/SANDIAS.png', emoji: '🍉', articulo: 'Cuántas', contadas: 'Contadas' },
        { id: 'pina', name: 'piñas', singular: 'piña', img: 'assets/frutas/PINA.png', emoji: '🍍', articulo: 'Cuántas', contadas: 'Contadas' },
        { id: 'melocoton', name: 'melocotones', singular: 'melocotón', img: 'assets/frutas/MELOCOTON.png', emoji: '🍑', articulo: 'Cuántos', contadas: 'Contados' },
        { id: 'melon', name: 'melones', singular: 'melón', img: 'assets/frutas/MELON.png', emoji: '🍈', articulo: 'Cuántos', contadas: 'Contados' },
        { id: 'papaya', name: 'papayas', singular: 'papaya', img: 'assets/frutas/PAPAYA.png', emoji: '🥭', articulo: 'Cuántas', contadas: 'Contadas' }
    ];

    function shuffle(arr) {
        for (let i = arr.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [arr[i], arr[j]] = [arr[j], arr[i]];
        }
        return arr;
    }

    function makeUniqueOptions(correct, minVal = 1, maxVal = 100, count = 4) {
        const opts = new Set([correct]);
        const deltas = [-1, 1, -2, 2, -3, 3, -4, 4, -5, 5, -10, 10];
        shuffle(deltas);
        for (const d of deltas) {
            if (opts.size >= count) break;
            const candidate = correct + d;
            if (candidate >= minVal && candidate <= maxVal) {
                opts.add(candidate);
            }
        }
        let fill = minVal;
        while (opts.size < count) {
            if (!opts.has(fill)) opts.add(fill);
            fill++;
        }
        return shuffle(Array.from(opts));
    }

    // 1. Contar Frutas (Utilizando los iconos PNG de la carpeta Frutas)
    function generateContarFrutas(nivel, id) {
        const cfg = {
            primaria1: { minTotal: 6, maxTotal: 9, minTarget: 2, maxTarget: 5 },
            primaria2: { minTotal: 8, maxTotal: 12, minTarget: 3, maxTarget: 6 },
            primaria3: { minTotal: 10, maxTotal: 15, minTarget: 4, maxTarget: 7 },
            primaria4: { minTotal: 12, maxTotal: 17, minTarget: 4, maxTarget: 8 },
            primaria5: { minTotal: 14, maxTotal: 18, minTarget: 5, maxTarget: 9 },
            primaria6: { minTotal: 15, maxTotal: 20, minTarget: 5, maxTarget: 10 }
        }[nivel] || { minTotal: 7, maxTotal: 10, minTarget: 3, maxTarget: 5 };

        const targetFruit = frutasList[Math.floor(Math.random() * frutasList.length)];
        const targetCount = Math.floor(Math.random() * (cfg.maxTarget - cfg.minTarget + 1)) + cfg.minTarget;
        const otherCount = Math.floor(Math.random() * (cfg.maxTotal - cfg.minTotal + 1)) + cfg.minTotal - targetCount;

        const otherFruits = frutasList.filter(f => f.id !== targetFruit.id);
        const tableFruits = [];
        for (let i = 0; i < targetCount; i++) {
            tableFruits.push({
                id: targetFruit.id,
                name: targetFruit.name,
                img: targetFruit.img,
                emoji: targetFruit.emoji,
                esObjetivo: true
            });
        }
        for (let i = 0; i < otherCount; i++) {
            const of = otherFruits[Math.floor(Math.random() * otherFruits.length)];
            tableFruits.push({
                id: of.id,
                name: of.name,
                img: of.img,
                emoji: of.emoji,
                esObjetivo: false
            });
        }
        const shuffledFruits = shuffle(tableFruits);
        const options = makeUniqueOptions(targetCount, 1, Math.max(15, targetCount + 5), 4);

        return {
            id: `${nivel}_c_frutas_${id}`,
            tipo: 'contar_frutas',
            pregunta: `¿${targetFruit.articulo} ${targetFruit.name} hay en la mesa del mercado?`,
            frutaObjetivo: targetFruit.name,
            frutaObjetivoImg: targetFruit.img,
            frutaObjetivoEmoji: targetFruit.emoji,
            nombreFruta: targetFruit.name,
            textoContadas: targetFruit.contadas,
            frutas: shuffledFruits,
            respuesta: targetCount,
            opciones: options
        };
    }

    // 2. Balanza de Números (100% Exactitud Matemática y Variedad de Casos)
    function generateBalanza(nivel, id) {
        const tipos = ['suma_simple', 'suma_incognita', 'resta_simple', 'resta_incognita'];
        if (['primaria3', 'primaria4', 'primaria5', 'primaria6'].includes(nivel)) {
            tipos.push('multiplicacion', 'multiplicacion_incognita');
        }
        if (['primaria4', 'primaria5', 'primaria6'].includes(nivel)) {
            tipos.push('division');
        }
        const tipo = tipos[Math.floor(Math.random() * tipos.length)];

        let opIzq = '', pesoIzq = 0, opDer = '?', pesoBaseDer = 0, ans = 0, maxOpt = 20, pregunta = '';

        if (tipo === 'suma_simple') {
            const maxNum = nivel === 'primaria1' ? 7 : (nivel === 'primaria2' ? 20 : 40);
            const a = Math.floor(Math.random() * maxNum) + 2;
            const b = Math.floor(Math.random() * maxNum) + 1;
            pesoIzq = a + b;
            opIzq = `${a} + ${b}`;
            opDer = '?';
            ans = pesoIzq;
            maxOpt = pesoIzq + 10;
            pregunta = '¡Equilibra la balanza! Resuelve la suma del platillo izquierdo:';
        } else if (tipo === 'suma_incognita') {
            const maxNum = nivel === 'primaria1' ? 6 : (nivel === 'primaria2' ? 18 : 35);
            const a = Math.floor(Math.random() * maxNum) + 2;
            const b = Math.floor(Math.random() * maxNum) + 2;
            pesoIzq = a + b;
            opIzq = `${a} + ${b}`;
            const base = Math.floor(Math.random() * (pesoIzq - 2)) + 1;
            pesoBaseDer = base;
            opDer = `${base} + ?`;
            ans = pesoIzq - base;
            maxOpt = Math.max(10, ans + 6);
            pregunta = '¡Equilibra la balanza! ¿Qué peso falta en el platillo derecho para igualar?';
        } else if (tipo === 'resta_simple') {
            const maxNum = nivel === 'primaria1' ? 12 : (nivel === 'primaria2' ? 35 : 70);
            const a = Math.floor(Math.random() * maxNum) + 5;
            const b = Math.floor(Math.random() * (a - 2)) + 1;
            pesoIzq = a - b;
            opIzq = `${a} - ${b}`;
            opDer = '?';
            ans = pesoIzq;
            maxOpt = pesoIzq + 10;
            pregunta = '¡Equilibra la balanza! Resuelve la resta del platillo izquierdo:';
        } else if (tipo === 'resta_incognita') {
            const maxA = nivel === 'primaria1' ? 10 : (nivel === 'primaria2' ? 25 : 50);
            const a = Math.floor(Math.random() * maxA) + 4;
            const b = Math.floor(Math.random() * (a - 2)) + 1;
            pesoIzq = a - b;
            opIzq = `${a} - ${b}`;
            const extra = Math.floor(Math.random() * 8) + 2;
            const base = pesoIzq + extra;
            pesoBaseDer = base;
            opDer = `${base} - ?`;
            ans = base - pesoIzq;
            maxOpt = Math.max(10, ans + 8);
            pregunta = '¡Equilibra la balanza! ¿Cuánto peso debes restar en el platillo derecho?';
        } else if (tipo === 'multiplicacion') {
            const maxTable = nivel === 'primaria3' ? 6 : 10;
            const a = Math.floor(Math.random() * maxTable) + 2;
            const b = Math.floor(Math.random() * maxTable) + 2;
            pesoIzq = a * b;
            opIzq = `${a} × ${b}`;
            opDer = '?';
            ans = pesoIzq;
            maxOpt = pesoIzq + 15;
            pregunta = '¡Equilibra la balanza! Resuelve la multiplicación del platillo izquierdo:';
        } else if (tipo === 'multiplicacion_incognita') {
            const maxTable = nivel === 'primaria3' ? 6 : 9;
            const a = Math.floor(Math.random() * maxTable) + 2;
            const b = Math.floor(Math.random() * maxTable) + 2;
            pesoIzq = a * b;
            opIzq = `${a} × ${b}`;
            const base = Math.max(1, pesoIzq - (Math.floor(Math.random() * 8) + 2));
            pesoBaseDer = base;
            opDer = `${base} + ?`;
            ans = pesoIzq - base;
            maxOpt = Math.max(12, ans + 8);
            pregunta = '¡Equilibra la balanza! ¿Qué peso falta en el platillo derecho?';
        } else if (tipo === 'division') {
            const divisor = Math.floor(Math.random() * 7) + 2;
            ans = Math.floor(Math.random() * 8) + 2;
            const dividendo = divisor * ans;
            pesoIzq = ans;
            opIzq = `${dividendo} ÷ ${divisor}`;
            opDer = '?';
            maxOpt = ans + 6;
            pregunta = '¡Equilibra la balanza! Resuelve la división del platillo izquierdo:';
        }

        const options = makeUniqueOptions(ans, 1, maxOpt, 4);

        return {
            id: `${nivel}_c_balanza_${id}`,
            tipo: 'balanza',
            pregunta: pregunta,
            operacionIzquierda: opIzq,
            pesoIzquierda: pesoIzq,
            operacionDerecha: opDer,
            pesoBaseDerecha: pesoBaseDer,
            pesosOpciones: options,
            respuesta: ans
        };
    }

    // 3. Ordenar Números en Regla (Diseñado para Drag & Drop)
    function generateOrdenarNumeros(nivel, id) {
        const isMenorMayor = Math.random() < 0.7;
        const dir = isMenorMayor ? 'menor_a_mayor' : 'mayor_a_menor';

        let configs = [];
        if (nivel === 'primaria1') {
            configs = [
                { min: 0, max: 10, step: 1, count: 3 },
                { min: 0, max: 20, step: 2, count: 3 },
                { min: 1, max: 15, step: 1, count: 3 },
                { min: 5, max: 25, step: 2, count: 3 }
            ];
        } else if (nivel === 'primaria2') {
            configs = [
                { min: 0, max: 50, step: 5, count: 3 },
                { min: 0, max: 100, step: 10, count: 3 },
                { min: 10, max: 60, step: 5, count: 3 },
                { min: 0, max: 30, step: 2, count: 4 },
                { min: 20, max: 80, step: 5, count: 4 }
            ];
        } else if (nivel === 'primaria3') {
            configs = [
                { min: 0, max: 200, step: 20, count: 4 },
                { min: 0, max: 500, step: 50, count: 4 },
                { min: 50, max: 350, step: 25, count: 4 }
            ];
        } else if (nivel === 'primaria4') {
            configs = [
                { min: 0, max: 1000, step: 100, count: 4 },
                { min: 500, max: 1500, step: 100, count: 4 },
                { min: 0, max: 2000, step: 200, count: 4 }
            ];
        } else if (nivel === 'primaria5') {
            configs = [
                { min: 0, max: 5000, step: 500, count: 4 },
                { min: 1000, max: 6000, step: 500, count: 4 }
            ];
        } else {
            configs = [
                { min: 0, max: 10000, step: 1000, count: 4 },
                { min: 5000, max: 20000, step: 1500, count: 4 }
            ];
        }

        const cfg = configs[Math.floor(Math.random() * configs.length)];
        const pool = [];
        for (let v = cfg.min + cfg.step; v < cfg.max; v += cfg.step) {
            pool.push(v);
        }
        shuffle(pool);
        const chosen = pool.slice(0, cfg.count).sort((a, b) => a - b);
        const refMid = Math.round((cfg.min + cfg.max) / 2);

        return {
            id: `${nivel}_c_ordenar_${id}`,
            tipo: 'ordenar_numeros',
            pregunta: `Coloca los números en la regla (${isMenorMayor ? 'de menor a mayor' : 'de mayor a menor'})`,
            direccion: dir,
            rulerMin: cfg.min,
            rulerMax: cfg.max,
            rulerStep: cfg.step,
            referencias: [cfg.min, refMid, cfg.max],
            numeros: chosen
        };
    }

    // 4. Adivinanzas de Números (Gran variedad de enigmas con 3 pistas progresivas)
    const riddlesPrimaria1 = [
        { ans: 3, clues: ['Soy menor que 5 y mayor que 2.', 'Soy el número de lados de un triángulo.', 'Soy el número de ruedas de un triciclo.'] },
        { ans: 4, clues: ['Soy un número par mayor que 2 y menor que 6.', 'Tengo tantas patas como un perro o un gato.', 'Soy el número de esquinas de un cuadrado.'] },
        { ans: 5, clues: ['Estoy entre el 4 y el 6.', 'Soy un número impar.', 'Soy el número de dedos de una mano entera.'] },
        { ans: 6, clues: ['Soy un número mayor que 4 y menor que 8.', 'Soy un número par (se reparte en dos partes iguales).', 'Tengo tantas patas como una hormiga o abeja.'] },
        { ans: 7, clues: ['Soy mayor que 5 y menor que 9.', 'Soy un número impar.', 'Soy el número de días que tiene una semana.'] },
        { ans: 8, clues: ['Soy mayor que 6 y menor que 10.', 'Soy un número par.', 'Tengo tantas patas como un pulpo o una araña.'] },
        { ans: 9, clues: ['Soy el número de una sola cifra más grande.', 'Soy un número impar.', 'Si me sumas 1 llegas al número 10.'] },
        { ans: 10, clues: ['Soy una decena completa.', 'Tengo dos cifras y termino en cero.', 'Soy el número total de dedos de las dos manos.'] },
        { ans: 11, clues: ['Estoy entre el 10 y el 12.', 'Tengo dos cifras exactamente iguales.', 'Tengo 1 decena y 1 unidad.'] },
        { ans: 12, clues: ['Soy mayor que 10 y menor que 15.', 'Soy un número par.', 'Tengo 1 decena y 2 unidades (una docena de huevos).'] },
        { ans: 14, clues: ['Soy mayor que 12 y menor que 16.', 'Soy un número par.', 'Termino en la cifra 4 y tengo 1 decena.'] },
        { ans: 15, clues: ['Estoy justo entre el 14 y el 16.', 'Termino en 5.', 'Tengo 1 decena y 5 unidades.'] },
        { ans: 16, clues: ['Soy un número par entre el 14 y el 18.', 'Tengo 1 decena y 6 unidades.', 'Soy el doble exacto de 8.'] },
        { ans: 18, clues: ['Soy mayor que 16 y menor que 20.', 'Soy un número par.', 'Termino en 8 y soy el doble de 9.'] },
        { ans: 20, clues: ['Tengo exactamente 2 decenas completas.', 'Termino en cero.', 'Soy el número total de dedos entre manos y pies.'] }
    ];

    const riddlesPrimaria2 = [
        { ans: 24, clues: ['Tengo 2 decenas y 4 unidades.', 'Soy un número par.', 'Soy el número de horas que tiene un día completo.'] },
        { ans: 25, clues: ['Estoy entre el 20 y el 30.', 'Termino en 5.', 'Soy un cuarto de 100 y 5 veces 5.'] },
        { ans: 30, clues: ['Tengo exactamente 3 decenas completas.', 'Termino en la cifra 0.', 'Soy el doble exacto de 15.'] },
        { ans: 35, clues: ['Soy mayor que 30 y menor que 40.', 'Termino en 5.', 'Tengo 3 decenas y 5 unidades.'] },
        { ans: 40, clues: ['Tengo exactamente 4 decenas.', 'Si me restas 10 obtienes 30.', 'Termino en la cifra cero.'] },
        { ans: 45, clues: ['Estoy entre el 40 y el 50.', 'Soy un número impar que termina en 5.', 'Tengo 4 decenas y 5 unidades.'] },
        { ans: 50, clues: ['Tengo 5 decenas completas (medio centenar).', 'Soy la mitad exacta de 100.', 'Termino en cero.'] },
        { ans: 52, clues: ['Soy mayor que 50 y menor que 55.', 'Soy un número par.', 'Soy el número aproximado de semanas que tiene un año.'] },
        { ans: 60, clues: ['Tengo 6 decenas completas.', 'Soy el número de minutos que tiene una hora.', 'Termino en la cifra 0.'] },
        { ans: 64, clues: ['Estoy entre el 60 y el 70.', 'Tengo 6 decenas y 4 unidades.', 'Soy el número de casillas de un tablero de ajedrez.'] },
        { ans: 75, clues: ['Soy mayor que 70 y menor que 80.', 'Tengo 7 decenas y 5 unidades.', 'Soy tres cuartos de 100 (25 + 25 + 25).'] },
        { ans: 80, clues: ['Tengo exactamente 8 decenas completas.', 'Soy el doble de 40.', 'Termino en cero.'] },
        { ans: 90, clues: ['Tengo 9 decenas completas.', 'Si me sumas 10 llegas a 100.', 'Termino en cero.'] }
    ];

    const riddlesPrimaria3 = [
        { ans: 21, clues: ['Estoy en la tabla del 3 y del 7 (3 × 7).', 'Soy mayor que 15 y menor que 25.', 'Tengo 2 decenas y 1 unidad.'] },
        { ans: 28, clues: ['Estoy en la tabla del 4 y del 7 (4 × 7).', 'Soy un número par menor que 30.', 'Soy el número de días del mes de febrero (en año normal).'] },
        { ans: 36, clues: ['Soy el resultado de 6 × 6.', 'Soy un número par entre 30 y 40.', 'Termino en la cifra 6.'] },
        { ans: 42, clues: ['Estoy en la tabla del 6 y del 7 (6 × 7).', 'Soy un número par.', 'Tengo 4 decenas y 2 unidades.'] },
        { ans: 48, clues: ['Estoy en la tabla del 6 y del 8 (6 × 8).', 'Soy un número par entre 40 y 50.', 'Tengo 4 decenas y 8 unidades.'] },
        { ans: 54, clues: ['Estoy en la tabla del 6 y del 9 (6 × 9).', 'Soy un número par entre 50 y 60.', 'La suma de mis dos cifras (5 + 4) es 9.'] },
        { ans: 56, clues: ['Soy el producto de 7 × 8.', 'Tengo 5 decenas y 6 unidades.', 'Soy un número par entre 50 y 60.'] },
        { ans: 63, clues: ['Soy el producto de 7 × 9.', 'Soy un número impar entre 60 y 70.', 'La suma de mis cifras (6 + 3) es 9.'] },
        { ans: 72, clues: ['Soy el resultado de 8 × 9.', 'Soy un número par entre 70 y 80.', 'Tengo 7 decenas y 2 unidades.'] },
        { ans: 81, clues: ['Soy el producto de 9 × 9.', 'Soy un número impar entre 80 y 90.', 'La suma de mis cifras (8 + 1) es 9.'] },
        { ans: 100, clues: ['Tengo exactamente 1 centena completa.', 'Tengo 10 decenas completas.', 'Soy el número de centímetros en un metro.'] },
        { ans: 120, clues: ['Soy el doble exacto de 60.', 'Tengo 1 centena y 2 decenas.', 'Soy el número de minutos en 2 horas completas.'] },
        { ans: 150, clues: ['Tengo 1 centena y 5 decenas.', 'Soy el triple exacto de 50.', 'Termino en la cifra cero.'] },
        { ans: 200, clues: ['Tengo exactamente 2 centenas completas.', 'Soy el doble de 100.', 'Termino en dos ceros.'] },
        { ans: 250, clues: ['Soy la mitad exacta de 500.', 'Tengo 2 centenas y 5 decenas.', 'Soy un cuarto de millar.'] }
    ];

    const riddlesPrimaria4 = [
        { ans: 64, clues: ['Soy el resultado de 8 × 8.', 'Soy un número par.', 'Tengo 6 decenas y 4 unidades.'] },
        { ans: 81, clues: ['Soy el producto de 9 × 9.', 'Soy un número impar entre 80 y 90.', 'La suma de mis dos cifras es 9.'] },
        { ans: 120, clues: ['Soy el doble de 60.', 'Soy el número de minutos en 2 horas.', 'Tengo 1 centena y 2 decenas.'] },
        { ans: 144, clues: ['Soy el resultado de 12 × 12 (una docena de docenas).', 'Tengo 1 centena, 4 decenas y 4 unidades.', 'Soy un número par.'] },
        { ans: 180, clues: ['Soy el número de grados de un ángulo llano.', 'Soy la suma de los 3 ángulos de cualquier triángulo.', 'Soy el triple de 60.'] },
        { ans: 240, clues: ['Soy el cuádruple de 60.', 'Tengo 2 centenas y 4 decenas.', 'Soy el número de minutos en 4 horas.'] },
        { ans: 360, clues: ['Soy el número de grados en un círculo completo.', 'Soy el resultado de 6 × 60.', 'Tengo 3 centenas y 6 decenas.'] },
        { ans: 365, clues: ['Tengo 3 centenas, 6 decenas y 5 unidades.', 'Soy el número de días de un año común.', 'Termino en 5.'] },
        { ans: 366, clues: ['Tengo 3 centenas, 6 decenas y 6 unidades.', 'Soy el número de días de un año bisiesto.', 'Soy un número par.'] },
        { ans: 500, clues: ['Tengo 5 centenas completas.', 'Soy la mitad exacta de 1.000 (medio millar).', 'Termino en dos ceros.'] },
        { ans: 750, clues: ['Tengo 7 centenas y 5 decenas.', 'Soy tres cuartos de 1.000 (medio millar + un cuarto).', 'Termino en cero.'] },
        { ans: 1000, clues: ['Tengo exactamente 1 unidad de millar.', 'Tengo 10 centenas o 100 decenas.', 'Soy el número de metros en un kilómetro.'] }
    ];

    const riddlesPrimaria5 = [
        { ans: 90, clues: ['Soy el número de grados que tiene un ángulo recto.', 'Tengo 9 decenas.', 'Soy un cuarto de 360 grados.'] },
        { ans: 125, clues: ['Soy el resultado de 5 × 5 × 5 (5 al cubo).', 'Tengo 1 centena y 25 unidades.', 'Termino en 5.'] },
        { ans: 144, clues: ['Soy el resultado de 12 × 12 (una gruesa).', 'Tengo 1 centena, 4 decenas y 4 unidades.', 'Soy un número par.'] },
        { ans: 180, clues: ['Soy el número de grados de un ángulo llano.', 'Soy la mitad exacta de 360 grados.', 'Tengo 1 centena y 8 decenas.'] },
        { ans: 216, clues: ['Soy el cubo de 6 (6 × 6 × 6).', 'Tengo 2 centenas, 1 decena y 6 unidades.', 'Soy un número par.'] },
        { ans: 256, clues: ['Soy una potencia de 2 (2 elevado a 8 o 16 × 16).', 'Soy un número par entre 250 y 260.', 'Tengo 2 centenas, 5 decenas y 6 unidades.'] },
        { ans: 360, clues: ['Soy el número de grados de una circunferencia completa.', 'Soy el resultado de 6 × 60.', 'Tengo 3 centenas y 6 decenas.'] },
        { ans: 400, clues: ['Soy el cuadrado de 20 (20 × 20).', 'Tengo 4 centenas completas.', 'Termino en dos ceros.'] },
        { ans: 500, clues: ['Soy medio millar exacto.', 'Tengo 50 decenas.', 'Termino en dos ceros.'] },
        { ans: 625, clues: ['Soy el cuadrado de 25 (25 × 25).', 'Tengo 6 centenas y 25 unidades.', 'Termino en 5.'] },
        { ans: 1000, clues: ['Soy el resultado de 10 al cubo (10 × 10 × 10).', 'Tengo 1 unidad de millar.', 'Soy el número de mililitros en un litro.'] }
    ];

    const riddlesPrimaria6 = [
        { ans: 90, clues: ['Soy la medida en grados de cada ángulo de un cuadrado.', 'Soy la cuarta parte de 360.', 'Tengo 9 decenas.'] },
        { ans: 180, clues: ['Soy la suma de los tres ángulos de cualquier triángulo.', 'Soy la mitad de una vuelta completa.', 'Soy el producto de 20 × 9.'] },
        { ans: 360, clues: ['Soy el número de grados en una vuelta completa de reloj.', 'Soy divisible entre 2, 3, 4, 5, 6, 8, 9 y 10.', 'Termino en cero.'] },
        { ans: 400, clues: ['Soy el resultado de 20 al cuadrado (20 × 20).', 'Tengo 4 centenas completas.', 'Termino en dos ceros.'] },
        { ans: 625, clues: ['Soy el resultado de 25 al cuadrado (25 × 25).', 'Tengo 6 centenas y 25 unidades.', 'Termino en 5.'] },
        { ans: 720, clues: ['Soy el doble de 360 grados (dos vueltas completas).', 'Tengo 7 centenas y 2 decenas.', 'Soy el resultado de 8 × 90.'] },
        { ans: 1000, clues: ['Soy el resultado de 10 al cubo (10 × 10 × 10).', 'Tengo 1 unidad de millar.', 'Soy el número de gramos en un kilogramo.'] },
        { ans: 1024, clues: ['Soy una potencia de 2 (2 elevado a 10).', 'Soy el número de Bytes en un Kilobyte (KB).', 'Soy 32 al cuadrado (32 × 32).'] },
        { ans: 3600, clues: ['Soy el número de segundos que tiene una hora completa (60 × 60).', 'Tengo 3 unidades de millar y 6 centenas.', 'Termino en dos ceros.'] },
        { ans: 5000, clues: ['Soy la mitad exacta de diez mil.', 'Tengo 5 unidades de millar o 50 centenas.', 'Termino en tres ceros.'] }
    ];

    function generateAdivinanza(nivel, id) {
        const pool = {
            primaria1: riddlesPrimaria1,
            primaria2: riddlesPrimaria2,
            primaria3: riddlesPrimaria3,
            primaria4: riddlesPrimaria4,
            primaria5: riddlesPrimaria5,
            primaria6: riddlesPrimaria6
        }[nivel] || riddlesPrimaria1;

        const template = pool[id % pool.length];
        const options = makeUniqueOptions(template.ans, 1, Math.max(template.ans + 15, 20), 4);
        const titulos = [
            'El Enigma del Mago',
            'El Tesoro del Dragón',
            'El Secreto del Alquimista',
            'El Reto del Sabio',
            'El Enigma del Castillo'
        ];

        return {
            id: `${nivel}_c_adivinanza_${id}`,
            tipo: 'adivinanza_numeros',
            pregunta: titulos[id % titulos.length],
            pistas: template.clues,
            pista: template.clues.join(' '),
            opciones: options.map(String),
            respuesta: options.indexOf(template.ans)
        };
    }

    // 5. Dados Virtuales (Siempre 3 dados)
    function generateDados(nivel, id) {
        const d1 = Math.floor(Math.random() * 6) + 1;
        const d2 = Math.floor(Math.random() * 6) + 1;
        const d3 = Math.floor(Math.random() * 6) + 1;

        const diceArr = [d1, d2, d3];
        const sum = d1 + d2 + d3;
        const options = makeUniqueOptions(sum, 3, 18, 4);

        return {
            id: `${nivel}_c_dados_${id}`,
            tipo: 'dados',
            pregunta: '¡Han rodado 3 dados mágicos! ¿Cuánto suman en total?',
            dados: diceArr,
            dado1: d1,
            dado2: d2,
            dado3: d3,
            opciones: options,
            respuesta: options.indexOf(sum)
        };
    }

    // Constructor Maestro de Banco
    const MathBank = {
        generateBankForLevel(nivel) {
            const list = [];
            // 50 contar frutas
            for (let i = 0; i < 50; i++) {
                list.push(generateContarFrutas(nivel, i + 1));
            }
            // 50 balanza
            for (let i = 0; i < 50; i++) {
                list.push(generateBalanza(nivel, i + 1));
            }
            // 40 ordenar números
            for (let i = 0; i < 40; i++) {
                list.push(generateOrdenarNumeros(nivel, i + 1));
            }
            // 40 adivinanzas
            for (let i = 0; i < 40; i++) {
                list.push(generateAdivinanza(nivel, i + 1));
            }
            // 40 dados
            for (let i = 0; i < 40; i++) {
                list.push(generateDados(nivel, i + 1));
            }
            // Mezclamos aleatoriamente para garantizar variedad dinámica continua
            return shuffle(list);
        },

        init() {
            if (!window.AULA_DATA) {
                window.AULA_DATA = {};
            }
            const niveles = ['primaria1', 'primaria2', 'primaria3', 'primaria4', 'primaria5', 'primaria6'];
            let total = 0;
            niveles.forEach(lvl => {
                if (!window.AULA_DATA[lvl]) {
                    window.AULA_DATA[lvl] = {};
                }
                const items = this.generateBankForLevel(lvl);
                window.AULA_DATA[lvl].castillo = items;
                total += items.length;
            });
            console.log(`[MathBank] Banco de Matemáticas cargado con éxito: ${total} actividades en total (Castillo del Saber).`);
        }
    };

    window.MathBank = MathBank;

    // Inicialización automática
    MathBank.init();
})();
