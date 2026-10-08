/**
 * taller_bank.js - Banco de Arte e Ingenio (Taller Creativo)
 * Diseñado exclusivamente con las 3 actividades solicitadas:
 *  1. Dibujo tipo Gartic Phone (dibujo_pizarra) - El alumno escoge el papel en físico, pantalla de espera previa, lienzo gigante de 1 minuto, cursor circular dinámico y botón para terminar antes si se adivina.
 *  2. Dibujo Viajero (dibujo_viajero) - Dinámica física guiada en clase con pantalla indicativa y valoración de la profe.
 *  3. Dibujo Paso a Paso (paso_a_paso) - Dibujo sin tiempo con guía secuencial de pasos, lienzo grande y valoración de la profe.
 */

(function () {
    'use strict';

    function shuffle(arr) {
        const copy = arr.slice();
        for (let i = copy.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [copy[i], copy[j]] = [copy[j], copy[i]];
        }
        return copy;
    }

    // ==============================================================
    // 1. DIBUJO VIAJERO: TEMAS Y RETOS COLECTIVOS
    // ==============================================================
    const TEMAS_DIBUJO_VIAJERO = [
        {
            titulo: "La Criatura Fantástica del Espacio",
            subtitulo: "Dibujad por turnos en las libretas un ser alienígena con detalles disparatados."
        },
        {
            titulo: "El Barco Pirata del Capitán Quijote",
            subtitulo: "Cada compañero añade una parte: el casco, las velas, la tripulación y los tesoros."
        },
        {
            titulo: "El Robot Ayudante del Colegio",
            subtitulo: "Un autómata creado entre todos para repartir cuadernos, lápices y chuches."
        },
        {
            titulo: "La Casa en el Árbol de las Aventuras",
            subtitulo: "Construid en la libreta un refugio con tirolinas, mirador secreto y columpios."
        },
        {
            titulo: "El Dragón Guardián de los Cuentos",
            subtitulo: "Un dragón sabio y simpático con alas gigantes que protege los libros de la clase."
        },
        {
            titulo: "El Supervehículo del Futuro",
            subtitulo: "Una máquina que rueda por tierra, vuela por el cielo y navega por el mar."
        },
        {
            titulo: "El Paisaje de la Isla del Tesoro",
            subtitulo: "Un mapa misterioso con playas doradas, palmeras, volcanes y cuevas secretas."
        },
        {
            titulo: "El Monstruo Glotón de los Chucheletes",
            subtitulo: "Una criatura alegre y rechoncha que solo come caramelos y sonrisas."
        },
        {
            titulo: "El Castillo Encantado en las Nubes",
            subtitulo: "Murallas de piedra flotante, puentes levadizos y torres puntiagudas en el cielo."
        },
        {
            titulo: "El Dinosaurio con Ropa Divertida",
            subtitulo: "Un tiranosaurio o triceratops vestido con zapatillas, gorra y pajarita elegante."
        },
        {
            titulo: "El Submarino de las Profundidades",
            subtitulo: "Una nave submarina explorando corales, peces luminosos y cofres hundidos."
        },
        {
            titulo: "La Mascota Inventada de la Clase",
            subtitulo: "Mezclad partes de varios animales: trompa, orejas de conejo, cola de león y alas."
        }
    ];

    // ==============================================================
    // 2. DIBUJO PASO A PASO: GUÍAS SECUENCIALES ILUSTRATIVAS
    // ==============================================================
    const BANCO_PASO_A_PASO = [
        {
            titulo: "Cómo dibujar un Cohete Espacial",
            categoria: "Espacio",
            dificultad: "Fácil",
            pasos: [
                { num: 1, inst: "Dibuja un óvalo vertical alto y puntiagudo en la parte de arriba, como una zanahoria invertida." },
                { num: 2, inst: "En la base inferior, dibuja dos aletas triangulares a los lados para equilibrar el cohete." },
                { num: 3, inst: "En el centro del cuerpo, dibuja dos círculos concéntricos para hacer la ventanilla de los astronautas." },
                { num: 4, inst: "En la parte de abajo, añade la tobera del motor con tres llamaradas de fuego en zigzag." },
                { num: 5, inst: "¡Detalles finales! Dibuja una estrella fugaz al fondo y franjas de colores en el morro del cohete." }
            ]
        },
        {
            titulo: "Cómo dibujar un Búho Sabio",
            categoria: "Animales",
            dificultad: "Fácil",
            pasos: [
                { num: 1, inst: "Dibuja un círculo grande para la cabeza y un óvalo debajo para el cuerpo rechoncho." },
                { num: 2, inst: "Arriba de la cabeza, dibuja dos triángulos que serán sus plumas u orejitas puntiagudas." },
                { num: 3, inst: "Dibuja dos ojos circulares enormes con pupilas negras y un pequeño pico triangular hacia abajo." },
                { num: 4, inst: "A los lados del cuerpo, dibuja dos alas curvas plegadas con plumitas en forma de ondas (U)." },
                { num: 5, inst: "¡Detalles finales! Dibuja una rama horizontal debajo de sus patitas y unas hojas verdes alrededor." }
            ]
        },
        {
            titulo: "Cómo dibujar un Castillo Medieval",
            categoria: "Edificios",
            dificultad: "Medio",
            pasos: [
                { num: 1, inst: "Dibuja una muralla rectangular horizontal en el centro con una puerta arqueada en el medio." },
                { num: 2, inst: "A cada lado de la muralla, levanta dos torres cilíndricas más altas que la muralla central." },
                { num: 3, inst: "En lo alto de las torres y de la muralla, dibuja almenas cuadradas como dientes alternos." },
                { num: 4, inst: "Corona las dos torres con tejados triangulares puntiagudos y una bandera ondeando en la cima." },
                { num: 5, inst: "¡Detalles finales! Dibuja piedras en las esquinas, un puente levadizo de madera y una ventana enrejada." }
            ]
        },
        {
            titulo: "Cómo dibujar un Coche de Carreras",
            categoria: "Transportes",
            dificultad: "Fácil",
            pasos: [
                { num: 1, inst: "Dibuja una línea horizontal larga y curva arriba para hacer la silueta baja y alargada del bólido." },
                { num: 2, inst: "Deja dos huecos semicirculares abajo y dibuja dos ruedas grandes con llantas circulares en el centro." },
                { num: 3, inst: "En el medio superior, dibuja el parabrisas inclinado y la cabeza del piloto con su casco y gafas." },
                { num: 4, inst: "En la parte trasera, levanta dos soportes y coloca un gran alerón horizontal de carreras." },
                { num: 5, inst: "¡Detalles finales! Pinta el número 1 en grande en el lateral y líneas de velocidad detrás del tubo de escape." }
            ]
        },
        {
            titulo: "Cómo dibujar un Molino Manchego de Don Quijote",
            categoria: "Cultura",
            dificultad: "Fácil",
            pasos: [
                { num: 1, inst: "Dibuja una torre cilíndrica blanca y recta, ligeramente más ancha por la base que por arriba." },
                { num: 2, inst: "En la cima de la torre, dibuja un tejado cónico como si fuera un sombrero puntiagudo." },
                { num: 3, inst: "En el centro superior de la torre, dibuja un círculo pequeño y una gran X con dos barras cruzadas." },
                { num: 4, inst: "En cada extremo de las barras de la X, añade un rectángulo con cuadrícula para formar las aspas de lona." },
                { num: 5, inst: "¡Detalles finales! Dibuja una puerta de madera abajo, dos ventanas pequeñas arriba y una colina con hierba." }
            ]
        },
        {
            titulo: "Cómo dibujar un Robot Amistoso",
            categoria: "Inventos",
            dificultad: "Fácil",
            pasos: [
                { num: 1, inst: "Dibuja un cuadrado con esquinas redondeadas para la cabeza y ponle una antena con bolita arriba." },
                { num: 2, inst: "Dibuja dos ojos circulares con tuercas y una boca rectangular con cuadrícula como si fuera una rejilla." },
                { num: 3, inst: "Debajo, dibuja un rectángulo más grande para el pecho con tres botones redondos y un dial de aguja." },
                { num: 4, inst: "A los lados, dibuja brazos articulados de acordeón con manos en forma de pinzas o imanes." },
                { num: 5, inst: "¡Detalles finales! Dibuja dos patas anchas de metal con tornillos y lucecitas parpadeantes." }
            ]
        },
        {
            titulo: "Cómo dibujar un Barco Pirata",
            categoria: "Aventuras",
            dificultad: "Medio",
            pasos: [
                { num: 1, inst: "Dibuja la base del barco con una línea recta arriba y una curva profunda abajo que suba en punta a los extremos." },
                { num: 2, inst: "Levanta dos mástiles verticales altos en el centro de la cubierta." },
                { num: 3, inst: "En cada mástil, dibuja dos grandes velas rectangulares curvadas hacia la derecha por el viento." },
                { num: 4, inst: "Arriba del mástil principal, dibuja la cesta de vigía y la bandera ondeante." },
                { num: 5, inst: "¡Detalles finales! Dibuja tres ojos de buey redondos en el casco y olas espumosas rompiendo abajo." }
            ]
        },
        {
            titulo: "Cómo dibujar una Mariposa Mágica",
            categoria: "Naturaleza",
            dificultad: "Fácil",
            pasos: [
                { num: 1, inst: "Dibuja en el centro un óvalo alargado vertical para el cuerpo y una cabecita redonda con dos antenas en espiral." },
                { num: 2, inst: "A cada lado del cuerpo, dibuja un ala superior grande y redondeada en forma de corazón lateral." },
                { num: 3, inst: "Debajo de las primeras alas, dibuja dos alas inferiores más pequeñas y redondeadas." },
                { num: 4, inst: "Dentro de cada ala, dibuja círculos concéntricos y gotas simétricas para formar los dibujos mágicos." },
                { num: 5, inst: "¡Detalles finales! Dibuja pequeñas motas de polen brillante y una flor sobre la que va a posarse." }
            ]
        },
        {
            titulo: "Cómo dibujar un Pingüino Polar",
            categoria: "Animales",
            dificultad: "Fácil",
            pasos: [
                { num: 1, inst: "Dibuja un óvalo vertical suave para el cuerpo, con la barriga blanca en el centro y los bordes negros." },
                { num: 2, inst: "Dibuja dos ojos negros redondos y un pico triangular naranja apuntando hacia adelante." },
                { num: 3, inst: "A cada lado del cuerpo, dibuja dos aletas negras cortas que caen hacia abajo o saludan." },
                { num: 4, inst: "En la base inferior, dibuja dos patitas palmeadas de color naranja sobre un bloque de hielo." },
                { num: 5, inst: "¡Detalles finales! Ponle una bufanda de lana al cuello y copos de nieve cayendo alrededor." }
            ]
        },
        {
            titulo: "Cómo dibujar una Casa del Bosque",
            categoria: "Paisajes",
            dificultad: "Fácil",
            pasos: [
                { num: 1, inst: "Dibuja un cuadrado grande para las paredes de la casa y un tejado triangular encima." },
                { num: 2, inst: "En el tejado, dibuja una chimenea rectangular que desprende nubecitas de humo en espiral." },
                { num: 3, inst: "En el centro de las paredes, dibuja una puerta redondeada con pomo y dos ventanas con cortinas." },
                { num: 4, inst: "A los lados de la casa, dibuja dos árboles altos con copas frondosas y un sendero de piedras." },
                { num: 5, inst: "¡Detalles finales! Dibuja flores silvestres junto a la puerta y el sol asomando por detrás del tejado." }
            ]
        }
    ];

    // ==============================================================
    // GENERADORES POR ACTIVIDAD
    // ==============================================================
    function generateDibujoPizarraActivity(nivel, idNum) {
        return {
            id: `pizarra_${nivel}_${idNum}`,
            tipo: 'dibujo_pizarra',
            titulo: 'Pizarra Mágica: Dibuja y Adivina',
            subtitulo: 'Coge tu papelito secreto en clase y dibújalo en la pantalla digital',
            nivel
        };
    }

    function generateDibujoViajeroActivity(nivel, idNum) {
        return {
            id: `viajero_${nivel}_${idNum}`,
            tipo: 'dibujo_viajero',
            titulo: 'El Dibujo Viajero',
            subtitulo: 'Dinámica colaborativa en 4 rondas de 30 segundos con cambio de diario',
            nivel
        };
    }

    function generatePasoAPasoActivity(nivel, idNum) {
        return {
            id: `paso_${nivel}_${idNum}`,
            tipo: 'paso_a_paso',
            titulo: 'Dibujo Paso a Paso en Parejas',
            subtitulo: 'Tu compañero/a te irá indicando los pasos para que los dibujes en la pizarra',
            nivel
        };
    }

    // ==============================================================
    // CONTROLADOR PRINCIPAL DEL BANCO DE TALLER CREATIVO (SOLO 3 ACTIVIDADES)
    // ==============================================================
    const TallerBank = {
        TEMAS_DIBUJO_VIAJERO,
        BANCO_PASO_A_PASO,

        generateBankForLevel(nivel) {
            const list = [];
            // 60 actividades de Dibujo tipo Gartic Phone
            for (let i = 1; i <= 60; i++) {
                list.push(generateDibujoPizarraActivity(nivel, i));
            }
            // 60 actividades de Dibujo Viajero
            for (let i = 1; i <= 60; i++) {
                list.push(generateDibujoViajeroActivity(nivel, i));
            }
            // 60 actividades de Dibujo Paso a Paso
            for (let i = 1; i <= 60; i++) {
                list.push(generatePasoAPasoActivity(nivel, i));
            }
            // Total: 180 actividades distribuidas equitativamente (1/3, 1/3, 1/3)
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
                window.AULA_DATA[lvl].taller = items;
                total += items.length;
            });
            console.log(`[TallerBank] Banco de Taller Creativo cargado con las 3 actividades exclusivas: ${total} retos en total.`);
        }
    };

    window.TallerBank = TallerBank;

    // Inicialización automática
    TallerBank.init();
})();
