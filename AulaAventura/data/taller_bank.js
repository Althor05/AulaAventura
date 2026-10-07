/**
 * taller_bank.js - Banco Extenso de Educación Artística, Música e Ingenio (Taller Creativo)
 * Diseñado para CEIP Don Quijote (1.º a 6.º de Primaria)
 * Cumple al 100% las especificaciones de DIARIO DEL EXPLORADOR / MANUAL DEL AVENTURERO:
 *  1. Pizarra Mágica (Dibuja y Adivina estilo Gartic Phone en clase con lienzo y palabras secretas)
 *  2. El Dibujo Viajero (Dinámica circular de libretas en 4 rondas de 30 segundos con avisos sonoros)
 *  3. Dibujo Paso a Paso (Guía en pareja/clase: uno dicta las instrucciones y otro dibuja)
 *  4. Seguir Ritmos (Patrones musicales interactivos con sonido real sintetizado: tambor, palmas, triángulo, maraca)
 *  5. El Laboratorio del Color (Mezcla de colores, cálidos/fríos, tonos, primarios y secundarios)
 *  6. Adivinanzas de Arte e Instrumentos (Agudeza mental y cultura musical/artística)
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
    // 1. BANCO DE PIZARRA MÁGICA / GARTIC PHONE (DIBUJA Y ADIVINA)
    // ==============================================================
    const BANCO_DIBUJO_PIZARRA = [
        { palabra: "Un koala comiendo hojas", categoria: "Animales", pista1: "Tiene orejas peludas y redondas", pista2: "Le encanta trepar a los árboles" },
        { palabra: "Un astronauta en la Luna", categoria: "Fantasía y Espacio", pista1: "Lleva un casco blanco y un traje inflado", pista2: "Salta como si flotara" },
        { palabra: "Un dragón que lanza flores", categoria: "Fantasía", pista1: "Tiene alas grandes y cola con pinchos", pista2: "En vez de fuego, echa pétalos alegres" },
        { palabra: "Un submarino amarillo", categoria: "Transportes", pista1: "Va por debajo del mar con periscopio", pista2: "Parece un barco alargado con hélices" },
        { palabra: "Un muñeco de nieve con bufanda", categoria: "Invierno", pista1: "Hecho con tres bolas y nariz de zanahoria", pista2: "Lleva sombrero y ramas por brazos" },
        { palabra: "Un dinosaurio en patinete", categoria: "Humor", pista1: "Es gigante y verde con cola larga", pista2: "Rueda muy rápido sobre dos ruedas" },
        { palabra: "Un pirata con loro al hombro", categoria: "Aventuras", pista1: "Lleva un parche en el ojo y sombrero con pluma", pista2: "Tiene un ave de colores a su lado" },
        { palabra: "Un robot barriendo la cocina", categoria: "Inventos", pista1: "Cuerpo de metal con antena y pantalla", pista2: "Sostiene una escoba con manos de pinza" },
        { palabra: "Un pulpo tocando la batería", categoria: "Música y Animales", pista1: "Tiene ocho tentáculos largos", pista2: "Sostiene baquetas y golpea platillos" },
        { palabra: "Un castillo de arena con bandera", categoria: "Verano", pista1: "Torres con almenas hechas a la orilla del mar", pista2: "Tiene conchas y un foso alrededor" },
        { palabra: "Una jirafa con bufanda de lana", categoria: "Animales", pista1: "Tiene un cuello larguísimo y manchas", pista2: "Lleva una prenda para no resfriarse" },
        { palabra: "Un tren de vapor saliendo del túnel", categoria: "Transportes", pista1: "Chimenea que echa nubes de humo blanco", pista2: "Ruedas de hierro sobre vías" },
        { palabra: "Un perro detective con lupa", categoria: "Misterio", pista1: "Tiene orejas caídas y hocico alegre", pista2: "Lleva abrigo de cuadros y busca huellas" },
        { palabra: "Un helado gigante de tres bolas", categoria: "Comida", pista1: "Cucurucho crujiente de galleta", pista2: "Bolas de fresa, chocolate y nata con cereza" },
        { palabra: "Un cocinero lanzando una pizza", categoria: "Profesiones", pista1: "Gorro alto blanco y delantal", pista2: "La masa vuela girando en el aire" },
        { palabra: "Un faro en una noche de tormenta", categoria: "Paisajes", pista1: "Torre alta a rayas rojas y blancas", pista2: "Un rayo de luz ilumina las olas del mar" },
        { palabra: "Un mago sacando un conejo de la chistera", categoria: "Magia", pista1: "Capa oscura y varita con punta blanca", pista2: "Asoman dos orejas largas del sombrero" },
        { palabra: "Un avión volando entre nubes de algodón", categoria: "Transportes", pista1: "Dos alas rectas y cola con timón", pista2: "Deja una estela blanca en el cielo azul" },
        { palabra: "Una tortuga veloz con zapatillas deportivas", categoria: "Humor", pista1: "Caparazón redondeado con dibujo", pista2: "Lleva cordones y va a toda prisa" },
        { palabra: "Un reloj de cuco dando las doce", categoria: "Objetos", pista1: "Casita de madera colgada de la pared", pista2: "Sale un pajarito por una ventanita" },
        { palabra: "Un cofre del tesoro lleno de monedas", categoria: "Aventuras", pista1: "Caja de madera con refuerzos de hierro", pista2: "Tapa abierta con brillo dorado" },
        { palabra: "Una manzana roja con un gusanito simpático", categoria: "Naturaleza", pista1: "Fruta brillante con rabito y hoja verde", pista2: "Asoma una cabecita sonriente con antenas" },
        { palabra: "Un helicóptero sobrevolando un bosque", categoria: "Transportes", pista1: "Hélice grande girando en el techo", pista2: "Patines de aterrizaje y cabina acristalada" },
        { palabra: "Un pingüino esquiando por la nieve", categoria: "Invierno", pista1: "Cuerpo blanco y negro con pico naranja", pista2: "Lleva dos bastones y gafas de ventisca" },
        { palabra: "Un volcán pacífico echando nubecitas", categoria: "Naturaleza", pista1: "Montaña con forma de cono abierto arriba", pista2: "Cráter con humo suave que flota" },
        { palabra: "Un paraguas amarillo en un día de lluvia", categoria: "Objetos", pista1: "Tela redondeada con mango curvado", pista2: "Gotas de agua salpicando al caer" },
        { palabra: "Una cometa con lazos volando con el viento", categoria: "Juegos", pista1: "Forma de rombo con colores alegres", pista2: "Cola larga ondeando con lacitos" },
        { palabra: "Un gato con gafas de sol en la playa", categoria: "Animales", pista1: "Bigotes finos, orejas puntiagudas y cola", pista2: "Tumbado sobre una toalla a rayas" },
        { palabra: "Una casa en el árbol con columpio", categoria: "Construcciones", pista1: "Tablones de madera entre las ramas", pista2: "Una cuerda con una tabla colgando abajo" },
        { palabra: "Un barco de vela surcando las olas", categoria: "Transportes", pista1: "Vela blanca triangular hinchada por el viento", pista2: "Bandera pequeña en lo alto del mástil" },
        { palabra: "Un semáforo simpático con cara de guiño", categoria: "Ciudad", pista1: "Poste con tres luces redondas: verde, ámbar y rojo", pista2: "Ojos sonrientes en la caja metálica" },
        { palabra: "Una guitarra española con flores dibujadas", categoria: "Música", pista1: "Cuerpo con forma de ocho y mástil con cuerdas", pista2: "Boca redonda en el centro de la madera" },
        { palabra: "Un puente de piedra sobre un río cristalino", categoria: "Paisajes", pista1: "Arcos de piedra sobre el agua", pista2: "Peces nadando bajo la sombra del puente" },
        { palabra: "Un molino de viento de La Mancha", categoria: "Cultura", pista1: "Torre cilíndrica blanca con tejado cónico", pista2: "Cuatro grandes aspas cruzadas con lona" },
        { palabra: "Un pez payaso nadando entre corales", categoria: "Animales", pista1: "Franjas naranjas y blancas brillantes", pista2: "Aletas redondeadas y burbujas alrededor" },
        { palabra: "Una bicicleta con cesta llena de pan caliente", categoria: "Objetos", pista1: "Dos ruedas con radios, manillar y pedales", pista2: "Barras de pan crujientes asomando delante" },
        { palabra: "Un camaleón curioso sobre una rama", categoria: "Animales", pista1: "Cola enroscada como un muelle", pista2: "Ojos redondos que miran a lados distintos" },
        { palabra: "Una corona dorada con gemas de colores", categoria: "Fantasía", pista1: "Puntas afiladas pulidas en oro", pista2: "Piedras preciosas rojas, azules y verdes" },
        { palabra: "Un búho leyendo un libro con gafas redondas", categoria: "Animales", pista1: "Ojos grandes y plumas en forma de cejas", pista2: "Posado en una rama sujetando las páginas" },
        { palabra: "Un cohete de feria de fuegos artificiales", categoria: "Fiestas", pista1: "Punta de cono roja y palo largo de madera", pista2: "Chispas de colores que salen de la mecha" }
    ];

    // ==============================================================
    // 2. BANCO DE EL DIBUJO VIAJERO (DINÁMICA DE LIBRETAS EN 4 RONDAS)
    // ==============================================================
    const TEMAS_DIBUJO_VIAJERO = [
        {
            titulo: "La Criatura Fantástica del Espacio",
            subtitulo: "Inventad entre 4 compañeros un alienígena nunca antes visto",
            rondas: [
                { num: 1, tiempo: 30, inst: "Dibuja una cabeza curiosa (redonda, cuadrada o triangular) con tres ojos y antenas divertidas." },
                { num: 2, tiempo: 30, inst: "¡Cambio de libreta! Dibuja el cuerpo de la criatura: puede tener pelo, escamas, coraza o muchos botones." },
                { num: 3, tiempo: 30, inst: "¡Cambio de libreta! Añade patas locas, alas gigantes, tentáculos o ruedas para desplazarse." },
                { num: 4, tiempo: 30, inst: "¡Último pase! Dibuja el planeta o nave donde vive y escribe en grande el nombre de la criatura." }
            ]
        },
        {
            titulo: "El Barco Pirata del Capitán Quijote",
            subtitulo: "Navegad juntos en una nave marítima llena de detalles y secretos",
            rondas: [
                { num: 1, tiempo: 30, inst: "Dibuja el casco de un barco de madera flotando sobre olas grandes y espumosas." },
                { num: 2, tiempo: 30, inst: "¡Cambio de libreta! Dibuja dos o tres mástiles altos con grandes velas hinchadas por el viento." },
                { num: 3, tiempo: 30, inst: "¡Cambio de libreta! Añade la bandera pirata con un símbolo divertido, un timón y cañones en los laterales." },
                { num: 4, tiempo: 30, inst: "¡Último pase! Dibuja un monstruo marino asomando al fondo y el nombre del barco en el casco." }
            ]
        },
        {
            titulo: "El Robot Ayudante del Colegio",
            subtitulo: "Construid un autómata que ayude a repartir cuadernos y chuches",
            rondas: [
                { num: 1, tiempo: 30, inst: "Dibuja la cabeza del robot con pantalla digital, ojos brillantes y dos antenas con bombillas." },
                { num: 2, tiempo: 30, inst: "¡Cambio de libreta! Dibuja su torso de metal con engranajes, botones de colores y un altavoz." },
                { num: 3, tiempo: 30, inst: "¡Cambio de libreta! Añade brazos mecánicos que sostengan herramientas útiles (un lápiz, un plumero o un reloj)." },
                { num: 4, tiempo: 30, inst: "¡Último pase! Dibuja cómo se mueve (ruedas, muelles o propulsores) y ponle un nombre al robot." }
            ]
        },
        {
            titulo: "La Casa en el Árbol de las Aventuras",
            subtitulo: "Diseñad el refugio secreto más increíble en las ramas del bosque",
            rondas: [
                { num: 1, tiempo: 30, inst: "Dibuja un árbol gigantesco con un tronco muy grueso y ramas fuertes que se abren a los lados." },
                { num: 2, tiempo: 30, inst: "¡Cambio de libreta! Construye la cabaña de madera sobre las ramas con tejado, puerta y ventanas circulares." },
                { num: 3, tiempo: 30, inst: "¡Cambio de libreta! Añade escaleras de cuerda, un tobogán secreto, tirolinas y un mirador con catalejo." },
                { num: 4, tiempo: 30, inst: "¡Último pase! Dibuja animales amigos en las hojas (ardillas, pájaros) y una bandera en el tejado." }
            ]
        },
        {
            titulo: "El Dragón Guardián de la Biblioteca",
            subtitulo: "Dad vida a un dragón sabio que cuida los libros antiguos de Don Quijote",
            rondas: [
                { num: 1, tiempo: 30, inst: "Dibuja la cabeza del dragón con hocico simpático, cuernos curvados y gafas redondas para leer." },
                { num: 2, tiempo: 30, inst: "¡Cambio de libreta! Dibuja su cuerpo alargado con escamas brillantes y una cola con punta de flecha." },
                { num: 3, tiempo: 30, inst: "¡Cambio de libreta! Añade dos alas majestuosas abiertas y garras que sostienen un gran libro abierto." },
                { num: 4, tiempo: 30, inst: "¡Último pase! Dibuja montones de libros mágicos flotando a su alrededor y ponle nombre al dragón." }
            ]
        },
        {
            titulo: "El Vehículo Increíble del Futuro",
            subtitulo: "Una máquina que puede volar, nadar y rodar por las carreteras",
            rondas: [
                { num: 1, tiempo: 30, inst: "Dibuja la cabina aerodinámica del vehículo con parabrisas panorámico y alerones delanteros." },
                { num: 2, tiempo: 30, inst: "¡Cambio de libreta! Añade alas plegables de avión y propulsores de fuego en la parte trasera." },
                { num: 3, tiempo: 30, inst: "¡Cambio de libreta! Dibuja cuatro ruedas gigantes todoterreno y un flotador por si cae al agua." },
                { num: 4, tiempo: 30, inst: "¡Último pase! Añade faros de neón luminosos, un piloto sonriente y el nombre del súper vehículo." }
            ]
        },
        {
            titulo: "El Paisaje de la Isla del Tesoro",
            subtitulo: "Un mapa misterioso lleno de rincones secretos para explorar",
            rondas: [
                { num: 1, tiempo: 30, inst: "Dibuja la forma de una isla en medio del mar con playas de arena y acantilados de piedra." },
                { num: 2, tiempo: 30, inst: "¡Cambio de libreta! Añade un volcán humeante en el centro y una selva con palmeras altas." },
                { num: 3, tiempo: 30, inst: "¡Cambio de libreta! Dibuja una cueva misteriosa con calavera y una cruz roja marcando el tesoro." },
                { num: 4, tiempo: 30, inst: "¡Último pase! Dibuja una rosa de los vientos en una esquina, peces saltando y el nombre de la isla." }
            ]
        },
        {
            titulo: "El Monstruo Glotón de los Chucheletes",
            subtitulo: "Una criatura simpática que solo se alimenta de caramelos y risas",
            rondas: [
                { num: 1, tiempo: 30, inst: "Dibuja una boca gigante sonriente con dientes redondeados y lengua ondulada pidiendo chuches." },
                { num: 2, tiempo: 30, inst: "¡Cambio de libreta! Añade una cabeza redonda y peluda con ojos saltones y orejas de pompón." },
                { num: 3, tiempo: 30, inst: "¡Cambio de libreta! Dibuja un cuerpo gordito y bajito con brazos cortos que abrazan piruletas gigantes." },
                { num: 4, tiempo: 30, inst: "¡Último pase! Dibuja chuches, nubes de azúcar y gominolas cayendo del cielo y su nombre." }
            ]
        }
    ];

    // ==============================================================
    // 3. BANCO DE DIBUJO PASO A PASO (GUÍA EN PAREJAS O CLASE)
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
        }
    ];

    // ==============================================================
    // 4. BANCO DE SEGUIR RITMOS (PATRONES RÍTMICOS MUSICALES)
    // ==============================================================
    const BANCO_RITMOS = [
        {
            titulo: "El Galope de Rocinante",
            dificultad: "Nivel 1 (3 tiempos)",
            secuencia: ['tambor', 'tambor', 'palmas'],
            tempo: 520,
            desc: "Trota el caballo de Don Quijote por la llanura de La Mancha."
        },
        {
            titulo: "La Danza de la Lluvia",
            dificultad: "Nivel 1 (3 tiempos)",
            secuencia: ['triangulo', 'maraca', 'triangulo'],
            tempo: 500,
            desc: "Gotitas cristalinas y viento suave entre las hojas."
        },
        {
            titulo: "El Tamborilero del Castillo",
            dificultad: "Nivel 2 (4 tiempos)",
            secuencia: ['tambor', 'palmas', 'tambor', 'palmas'],
            tempo: 480,
            desc: "Un compás alegre para marcar el paso de la comitiva real."
        },
        {
            titulo: "Campanas de Fiesta Mayor",
            dificultad: "Nivel 2 (4 tiempos)",
            secuencia: ['triangulo', 'triangulo', 'palmas', 'tambor'],
            tempo: 480,
            desc: "Las campanas de la torre suenan para empezar el recreo."
        },
        {
            titulo: "El Baile de las Maracas",
            dificultad: "Nivel 2 (4 tiempos)",
            secuencia: ['maraca', 'maraca', 'tambor', 'palmas'],
            tempo: 460,
            desc: "Chasquidos vivos para mover las manos con destreza."
        },
        {
            titulo: "La Marcha de los Exploradores",
            dificultad: "Nivel 3 (5 tiempos)",
            secuencia: ['tambor', 'tambor', 'maraca', 'tambor', 'triangulo'],
            tempo: 450,
            desc: "Avanzamos con paso firme hacia la cumbre de la montaña."
        },
        {
            titulo: "La Canción del Molinero",
            dificultad: "Nivel 3 (5 tiempos)",
            secuencia: ['palmas', 'tambor', 'palmas', 'maraca', 'triangulo'],
            tempo: 450,
            desc: "Las aspas giran al compás del viento fresco."
        },
        {
            titulo: "Sinfonía en el Aula",
            dificultad: "Nivel 4 (6 tiempos)",
            secuencia: ['tambor', 'palmas', 'triangulo', 'maraca', 'palmas', 'tambor'],
            tempo: 440,
            desc: "Un reto maestro combinando los 4 instrumentos de percusión."
        },
        {
            titulo: "El Tren Chocochó",
            dificultad: "Nivel 3 (5 tiempos)",
            secuencia: ['tambor', 'maraca', 'maraca', 'tambor', 'palmas'],
            tempo: 450,
            desc: "El tren acelera sobre los raíles de madera."
        },
        {
            titulo: "El Salto de la Rana",
            dificultad: "Nivel 2 (4 tiempos)",
            secuencia: ['triangulo', 'tambor', 'triangulo', 'palmas'],
            tempo: 480,
            desc: "Salpicaduras juguetonas en el estanque del bosque."
        },
        {
            titulo: "Eco en la Cueva de Montesinos",
            dificultad: "Nivel 4 (6 tiempos)",
            secuencia: ['triangulo', 'triangulo', 'tambor', 'maraca', 'tambor', 'triangulo'],
            tempo: 440,
            desc: "Los misterios subterráneos resuenan con claridad."
        },
        {
            titulo: "El Reloj de Cuco Mágico",
            dificultad: "Nivel 3 (5 tiempos)",
            secuencia: ['maraca', 'triangulo', 'maraca', 'triangulo', 'palmas'],
            tempo: 460,
            desc: "Tic-tac, tic-tac, ¡sale el pajarito a cantar!"
        }
    ];

    // ==============================================================
    // 5. BANCO DE EL LABORATORIO DEL COLOR (MEZCLA Y TEORÍA VISUAL)
    // ==============================================================
    const BANCO_MEZCLA_COLORES = [
        // Mezclas primarias directas
        {
            tipoPregunta: 'mezcla_dos',
            c1: { nombre: 'Amarillo', hex: '#facc15' },
            c2: { nombre: 'Azul', hex: '#2563eb' },
            pregunta: 'Si mezclamos Amarillo y Azul en nuestra paleta, ¿qué color obtenemos?',
            opciones: [
                { nombre: 'Verde', hex: '#16a34a', correcto: true },
                { nombre: 'Naranja', hex: '#ea580c', correcto: false },
                { nombre: 'Morado', hex: '#7c3aed', correcto: false },
                { nombre: 'Marrón', hex: '#78350f', correcto: false }
            ],
            explicacion: 'El amarillo y el azul se combinan para dar el color verde de la naturaleza.'
        },
        {
            tipoPregunta: 'mezcla_dos',
            c1: { nombre: 'Rojo', hex: '#dc2626' },
            c2: { nombre: 'Amarillo', hex: '#facc15' },
            pregunta: 'Si mezclamos témpera Roja y Amarilla, ¿qué color aparece?',
            opciones: [
                { nombre: 'Naranja', hex: '#ea580c', correcto: true },
                { nombre: 'Verde', hex: '#16a34a', correcto: false },
                { nombre: 'Rosa', hex: '#ec4899', correcto: false },
                { nombre: 'Negro', hex: '#0f172a', correcto: false }
            ],
            explicacion: 'El rojo y el amarillo forman el cálido color naranja del atardecer.'
        },
        {
            tipoPregunta: 'mezcla_dos',
            c1: { nombre: 'Azul', hex: '#2563eb' },
            c2: { nombre: 'Rojo', hex: '#dc2626' },
            pregunta: 'Al juntar pintura Azul y pintura Roja, ¿qué color secundario creamos?',
            opciones: [
                { nombre: 'Morado / Violeta', hex: '#7c3aed', correcto: true },
                { nombre: 'Verde', hex: '#16a34a', correcto: false },
                { nombre: 'Amarillo', hex: '#facc15', correcto: false },
                { nombre: 'Blanco', hex: '#f8fafc', correcto: false }
            ],
            explicacion: 'El azul y el rojo crean el color morado o violeta brillante.'
        },
        {
            tipoPregunta: 'mezcla_dos',
            c1: { nombre: 'Rojo', hex: '#dc2626' },
            c2: { nombre: 'Blanco', hex: '#f1f5f9' },
            pregunta: 'Si añadimos pintura Blanca al color Rojo, ¿qué color suave surge?',
            opciones: [
                { nombre: 'Rosa', hex: '#f472b6', correcto: true },
                { nombre: 'Naranja', hex: '#ea580c', correcto: false },
                { nombre: 'Gris', hex: '#94a3b8', correcto: false },
                { nombre: 'Azul claro', hex: '#38bdf8', correcto: false }
            ],
            explicacion: 'El blanco aclara el tono del rojo convirtiéndolo en un bonito color rosa.'
        },
        {
            tipoPregunta: 'mezcla_dos',
            c1: { nombre: 'Negro', hex: '#0f172a' },
            c2: { nombre: 'Blanco', hex: '#f1f5f9' },
            pregunta: 'Al mezclar una gota de Negro con Blanco, ¿qué color obtenemos?',
            opciones: [
                { nombre: 'Gris', hex: '#64748b', correcto: true },
                { nombre: 'Marrón', hex: '#78350f', correcto: false },
                { nombre: 'Azul oscuro', hex: '#1e3a8a', correcto: false },
                { nombre: 'Morado', hex: '#7c3aed', correcto: false }
            ],
            explicacion: 'El negro y el blanco son colores opuestos que al unirse crean el gris.'
        },
        {
            tipoPregunta: 'mezcla_dos',
            c1: { nombre: 'Azul', hex: '#2563eb' },
            c2: { nombre: 'Blanco', hex: '#f1f5f9' },
            pregunta: 'Si mezclamos Azul oscuro con pintura Blanca, ¿qué tonalidad se forma?',
            opciones: [
                { nombre: 'Celeste / Azul claro', hex: '#38bdf8', correcto: true },
                { nombre: 'Verde menta', hex: '#2dd4bf', correcto: false },
                { nombre: 'Lila suave', hex: '#c084fc', correcto: false },
                { nombre: 'Gris perla', hex: '#94a3b8', correcto: false }
            ],
            explicacion: 'Aclarar el azul con blanco produce el color celeste como el cielo despejado.'
        },
        {
            tipoPregunta: 'mezcla_dos',
            c1: { nombre: 'Verde', hex: '#16a34a' },
            c2: { nombre: 'Rojo', hex: '#dc2626' },
            pregunta: 'Si mezclamos dos colores opuestos como el Verde y el Rojo, ¿qué color aparece?',
            opciones: [
                { nombre: 'Marrón / Tierra', hex: '#78350f', correcto: true },
                { nombre: 'Negro', hex: '#0f172a', correcto: false },
                { nombre: 'Naranja oscuro', hex: '#c2410c', correcto: false },
                { nombre: 'Azul petróleo', hex: '#0f766e', correcto: false }
            ],
            explicacion: 'La mezcla de verde y rojo genera tonos marrones y ocres de la tierra.'
        },
        {
            tipoPregunta: 'mezcla_dos',
            c1: { nombre: 'Verde', hex: '#16a34a' },
            c2: { nombre: 'Blanco', hex: '#f1f5f9' },
            pregunta: 'Si echamos Blanco en un bote de pintura Verde, ¿qué color conseguimos?',
            opciones: [
                { nombre: 'Verde claro / Menta', hex: '#4ade80', correcto: true },
                { nombre: 'Amarillo limón', hex: '#fde047', correcto: false },
                { nombre: 'Turquesa', hex: '#06b6d4', correcto: false },
                { nombre: 'Gris verdoso', hex: '#64748b', correcto: false }
            ],
            explicacion: 'El blanco suaviza e ilumina el verde creando verde claro.'
        },
        // Preguntas conceptuales con swatches de color
        {
            tipoPregunta: 'conceptual',
            c1: null,
            c2: null,
            pregunta: '¿Cuál de los siguientes colores es un COLOR CÁLIDO que recuerda al fuego y al sol?',
            opciones: [
                { nombre: 'Rojo / Naranja', hex: '#ea580c', correcto: true },
                { nombre: 'Azul marino', hex: '#1d4ed8', correcto: false },
                { nombre: 'Verde esmeralda', hex: '#047857', correcto: false },
                { nombre: 'Violeta oscuro', hex: '#6b21a8', correcto: false }
            ],
            explicacion: 'Los colores cálidos (rojo, naranja, amarillo) transmiten calor, energía y luz.'
        },
        {
            tipoPregunta: 'conceptual',
            c1: null,
            c2: null,
            pregunta: '¿Cuál de los siguientes colores es un COLOR FRÍO que recuerda al agua y al hielo?',
            opciones: [
                { nombre: 'Azul hielo', hex: '#0284c7', correcto: true },
                { nombre: 'Amarillo brillante', hex: '#eab308', correcto: false },
                { nombre: 'Rojo fuego', hex: '#dc2626', correcto: false },
                { nombre: 'Naranja melocotón', hex: '#f97316', correcto: false }
            ],
            explicacion: 'Los colores fríos (azul, verde, violeta) transmiten calma, frescor y serenidad.'
        },
        {
            tipoPregunta: 'conceptual',
            c1: null,
            c2: null,
            pregunta: '¿Cuáles son los tres COLORES PRIMARIOS (que no se pueden obtener mezclando otros)?',
            opciones: [
                { nombre: 'Amarillo, Azul y Rojo', hex: '#e11d48', correcto: true },
                { nombre: 'Verde, Naranja y Morado', hex: '#059669', correcto: false },
                { nombre: 'Blanco, Negro y Gris', hex: '#475569', correcto: false },
                { nombre: 'Rosa, Celeste y Marrón', hex: '#db2777', correcto: false }
            ],
            explicacion: 'Los colores primarios son el Rojo, el Azul y el Amarillo: la base de toda la paleta.'
        },
        {
            tipoPregunta: 'inversa',
            c1: { nombre: 'Verde', hex: '#16a34a' },
            c2: null,
            pregunta: '¿Qué dos colores necesitas mezclar para obtener el color Verde?',
            opciones: [
                { nombre: 'Amarillo y Azul', hex: '#16a34a', correcto: true },
                { nombre: 'Rojo y Azul', hex: '#7c3aed', correcto: false },
                { nombre: 'Rojo y Amarillo', hex: '#ea580c', correcto: false },
                { nombre: 'Negro y Blanco', hex: '#64748b', correcto: false }
            ],
            explicacion: 'Juntando amarillo y azul fabricamos el color verde.'
        },
        {
            tipoPregunta: 'inversa',
            c1: { nombre: 'Naranja', hex: '#ea580c' },
            c2: null,
            pregunta: '¿Qué dos botes de pintura debes abrir para hacer el color Naranja?',
            opciones: [
                { nombre: 'Rojo y Amarillo', hex: '#ea580c', correcto: true },
                { nombre: 'Azul y Amarillo', hex: '#16a34a', correcto: false },
                { nombre: 'Azul y Rojo', hex: '#7c3aed', correcto: false },
                { nombre: 'Verde y Blanco', hex: '#4ade80', correcto: false }
            ],
            explicacion: 'El rojo sumado al amarillo da como resultado el naranja.'
        },
        {
            tipoPregunta: 'inversa',
            c1: { nombre: 'Morado', hex: '#7c3aed' },
            c2: null,
            pregunta: 'Para conseguir pintura Morada, ¿qué dos colores primarios mezclamos?',
            opciones: [
                { nombre: 'Azul y Rojo', hex: '#7c3aed', correcto: true },
                { nombre: 'Amarillo y Azul', hex: '#16a34a', correcto: false },
                { nombre: 'Amarillo y Rojo', hex: '#ea580c', correcto: false },
                { nombre: 'Marrón y Blanco', hex: '#d97706', correcto: false }
            ],
            explicacion: 'El azul y el rojo crean el color morado.'
        }
    ];

    // ==============================================================
    // 6. BANCO DE ADIVINANZAS DE INGENIO Y MÚSICA / ARTE
    // ==============================================================
    const BANCO_ARTE_MULTIPLE = [
        {
            pregunta: 'Adivina: "Tiene dientes y no come, tiene cabeza y no es hombre." ¿Qué es?',
            opciones: ['Un peine', 'Un ajo', 'Un tenedor', 'Un serrucho'],
            respuesta: 1,
            pista: 'Se usa mucho en las comidas manchegas para dar sabor.'
        },
        {
            pregunta: 'Adivina: "Oro parece, plata no es. Quien no lo adivine, bien tonto es." ¿Qué es?',
            opciones: ['Una moneda', 'El plátano', 'Una joya dorada', 'El sol'],
            respuesta: 1,
            pista: 'Es una fruta amarilla y dulce que comen los monos.'
        },
        {
            pregunta: 'Adivina: "Blanca por dentro, verde por fuera. Si quieres que te lo diga, espera." ¿Qué es?',
            opciones: ['La pera', 'La manzana', 'El melón', 'La sandía'],
            respuesta: 0,
            pista: '¡La respuesta está escondida en la última palabra!'
        },
        {
            pregunta: 'Adivina: "Chiquito como un ratón y cuida la casa como un león." ¿Qué es?',
            opciones: ['El perro', 'El candado o cerradura', 'El timbre', 'La escoba'],
            respuesta: 1,
            pista: 'Se abre y se cierra con una llave de metal.'
        },
        {
            pregunta: 'Adivina: "Tiene hojas y no es un árbol, tiene lomo y no es caballo." ¿Qué es?',
            opciones: ['Una libreta', 'Un libro', 'Un periódico', 'Una revista'],
            respuesta: 1,
            pista: 'En la biblioteca de Don Quijote hay cientos de ellos.'
        },
        {
            pregunta: '¿A qué familia de instrumentos pertenece la Flauta dulce de clase?',
            opciones: ['Instrumento de Viento', 'Instrumento de Cuerda', 'Instrumento de Percusión', 'Instrumento Eléctrico'],
            respuesta: 0,
            pista: 'Para que suene debemos soplar aire con la boca.'
        },
        {
            pregunta: '¿A qué familia de instrumentos pertenece la Guitarra española?',
            opciones: ['Instrumento de Cuerda', 'Instrumento de Viento', 'Instrumento de Percusión', 'Instrumento de Metal'],
            respuesta: 0,
            pista: 'Sus notas nacen al rasguear o pulsar sus 6 cuerdas tensadas.'
        },
        {
            pregunta: '¿Qué instrumento de música se toca golpeándolo con baquetas o con las manos?',
            opciones: ['El violín', 'La flauta travesera', 'El tambor', 'El clarinete'],
            respuesta: 2,
            pista: 'Pertenece a la familia de percusión y marca el ritmo.'
        },
        {
            pregunta: '¿Qué herramienta usan los pintores para sujetar y mezclar los colores mientras pintan?',
            opciones: ['El caballete', 'La paleta de mezclas', 'La espátula', 'El estuche'],
            respuesta: 1,
            pista: 'Es una tabla ovalada con un agujero para meter el dedo pulgar.'
        },
        {
            pregunta: '¿Cómo se llama la figura musical que dura exactamente 1 tiempo?',
            opciones: ['La redonda', 'La negra', 'La blanca', 'La corchea'],
            respuesta: 1,
            pista: 'Tiene la cabecita negra rellena y una plica vertical.'
        },
        {
            pregunta: 'Adivina: "Vuelo sin alas, silbo sin boca, no me puedes ver ni tocar." ¿Qué es?',
            opciones: ['El humo', 'El viento', 'Un pájaro', 'Un fantasma'],
            respuesta: 1,
            pista: 'Es el que mueve las aspas de los molinos de viento.'
        },
        {
            pregunta: '¿Qué instrumento musical tiene teclas blancas y negras y martillos de cuerda por dentro?',
            opciones: ['El acordeón', 'El piano', 'La trompeta', 'El violonchelo'],
            respuesta: 1,
            pista: 'Es grande, elegante y puede ser de pared o de cola.'
        },
        {
            pregunta: '¿Cómo se llama una obra de arte hecha uniendo trocitos pequeños de piedras o vidrios de colores?',
            opciones: ['Escultura', 'Mosaico', 'Acuarela', 'Collage'],
            respuesta: 1,
            pista: 'Los antiguos romanos hacían suelos increíbles con esta técnica.'
        },
        {
            pregunta: '¿Qué ocurre con un color si le añadimos una pizca de pintura negra?',
            opciones: ['Se hace más claro', 'Se oscurece', 'Se vuelve amarillo', 'Se hace transparente'],
            respuesta: 1,
            pista: 'El negro absorbe la luz y vuelve los tonos más profundos y oscuros.'
        },
        {
            pregunta: 'Adivina: "Un arquito en el cielo de siete colores que sale cuando llueve y hace sol." ¿Qué es?',
            opciones: ['Una nube', 'El arcoíris', 'La luna', 'Un cometa'],
            respuesta: 1,
            pista: 'Tiene rojo, naranja, amarillo, verde, azul, añil y violeta.'
        }
    ];

    // ==============================================================
    // GENERADORES POR ACTIVIDAD
    // ==============================================================
    function generateDibujoPizarraActivity(nivel, idNum) {
        const item = BANCO_DIBUJO_PIZARRA[Math.floor(Math.random() * BANCO_DIBUJO_PIZARRA.length)];
        return {
            id: `pizarra_${nivel}_${idNum}`,
            tipo: 'dibujo_pizarra',
            titulo: 'Pizarra Mágica: Dibuja y Adivina',
            subtitulo: '¡Un alumno dibuja en la pantalla o pizarra y la clase adivina!',
            palabra: item.palabra,
            categoria: item.categoria,
            pistas: [item.pista1, item.pista2],
            nivel
        };
    }

    function generateDibujoViajeroActivity(nivel, idNum) {
        const item = TEMAS_DIBUJO_VIAJERO[Math.floor(Math.random() * TEMAS_DIBUJO_VIAJERO.length)];
        return {
            id: `viajero_${nivel}_${idNum}`,
            tipo: 'dibujo_viajero',
            titulo: item.titulo,
            subtitulo: item.subtitulo,
            rondas: item.rondas,
            nivel
        };
    }

    function generatePasoAPasoActivity(nivel, idNum) {
        const item = BANCO_PASO_A_PASO[Math.floor(Math.random() * BANCO_PASO_A_PASO.length)];
        return {
            id: `paso_${nivel}_${idNum}`,
            tipo: 'paso_a_paso',
            titulo: item.titulo,
            subtitulo: 'Un alumno dicta las instrucciones paso a paso mientras su compañero o la clase dibuja',
            categoria: item.categoria,
            dificultad: item.dificultad,
            pasos: item.pasos,
            nivel
        };
    }

    function generateSeguirRitmosActivity(nivel, idNum) {
        const item = BANCO_RITMOS[Math.floor(Math.random() * BANCO_RITMOS.length)];
        return {
            id: `ritmo_${nivel}_${idNum}`,
            tipo: 'seguir_ritmos',
            titulo: item.titulo,
            subtitulo: '¡Escucha con atención la secuencia de percusión y repítela con tu clase!',
            dificultad: item.dificultad,
            secuencia: item.secuencia.slice(),
            tempo: item.tempo,
            desc: item.desc,
            nivel
        };
    }

    function generateMezclaColoresActivity(nivel, idNum) {
        const item = BANCO_MEZCLA_COLORES[Math.floor(Math.random() * BANCO_MEZCLA_COLORES.length)];
        const shOpts = shuffle(item.opciones.slice());
        const respIdx = shOpts.findIndex(o => o.correcto);
        return {
            id: `mezcla_${nivel}_${idNum}`,
            tipo: 'mezcla_colores',
            titulo: 'El Laboratorio del Color',
            subtitulo: '¡Experimenta con las témperas y los tonos en el Taller de Arte!',
            tipoPregunta: item.tipoPregunta,
            c1: item.c1,
            c2: item.c2,
            pregunta: item.pregunta,
            opciones: shOpts,
            respuesta: respIdx,
            explicacion: item.explicacion,
            nivel
        };
    }

    function generateArteMultipleActivity(nivel, idNum) {
        const item = BANCO_ARTE_MULTIPLE[Math.floor(Math.random() * BANCO_ARTE_MULTIPLE.length)];
        return {
            id: `artmult_${nivel}_${idNum}`,
            tipo: 'multiple',
            titulo: 'Arte, Música e Ingenio',
            pregunta: item.pregunta,
            opciones: item.opciones.slice(),
            respuesta: item.respuesta,
            pista: item.pista,
            nivel
        };
    }

    // ==============================================================
    // CONTROLADOR PRINCIPAL DEL BANCO DE TALLER CREATIVO
    // ==============================================================
    const TallerBank = {
        BANCO_DIBUJO_PIZARRA,
        TEMAS_DIBUJO_VIAJERO,
        BANCO_PASO_A_PASO,
        BANCO_RITMOS,
        BANCO_MEZCLA_COLORES,
        BANCO_ARTE_MULTIPLE,

        generateBankForLevel(nivel) {
            const list = [];
            // 35 actividades de Pizarra Mágica
            for (let i = 1; i <= 35; i++) {
                list.push(generateDibujoPizarraActivity(nivel, i));
            }
            // 30 actividades de Dibujo Viajero
            for (let i = 1; i <= 30; i++) {
                list.push(generateDibujoViajeroActivity(nivel, i));
            }
            // 30 actividades de Dibujo Paso a Paso
            for (let i = 1; i <= 30; i++) {
                list.push(generatePasoAPasoActivity(nivel, i));
            }
            // 35 actividades de Seguir Ritmos
            for (let i = 1; i <= 35; i++) {
                list.push(generateSeguirRitmosActivity(nivel, i));
            }
            // 30 actividades de Mezcla de Colores
            for (let i = 1; i <= 30; i++) {
                list.push(generateMezclaColoresActivity(nivel, i));
            }
            // 20 actividades de Adivinanzas / Preguntas de Arte
            for (let i = 1; i <= 20; i++) {
                list.push(generateArteMultipleActivity(nivel, i));
            }
            // Total: 180 actividades variadas por nivel en Taller Creativo
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
            console.log(`[TallerBank] Banco de Taller Creativo cargado: ${total} actividades en total (180 por nivel).`);
        }
    };

    window.TallerBank = TallerBank;

    // Inicialización automática
    TallerBank.init();
})();
