const niveles = ['primaria1', 'primaria2', 'primaria3', 'primaria4', 'primaria5', 'primaria6'];
const zonas = ['castillo', 'bosque', 'laboratorio', 'biblioteca', 'taller'];

window.AULA_DATA = {};

niveles.forEach(nivel => {
    window.AULA_DATA[nivel] = {};
    zonas.forEach(zona => {
        window.AULA_DATA[nivel][zona] = [
            {
                id: nivel + '_' + zona + '_1',
                tipo: 'multiple',
                pregunta: 'Zona ' + zona.toUpperCase() + ': Selecciona la respuesta adecuada:',
                opciones: ['Opción correcta', 'Opción secundaria', 'Opción de prueba'],
                respuesta: 0
            },
            {
                id: nivel + '_' + zona + '_2',
                tipo: 'multiple',
                pregunta: '¿Cuál de las siguientes afirmaciones es correcta?',
                opciones: ['La Tierra gira alrededor del Sol', 'La Luna es más grande que la Tierra', 'Los árboles no necesitan luz'],
                respuesta: 0
            }
        ];
    });
});

// Preguntas adaptadas por niveles y zonas
window.AULA_DATA.primaria1.castillo = [
    {
        id: 'p1_c_frutas',
        tipo: 'contar_frutas',
        pregunta: '¿Cuántas manzanas 🍎 hay en la mesa del mercado?',
        frutaObjetivo: '🍎',
        frutas: ['🍎', '🍌', '🍎', '🍊', '🍎', '🍌', '🍐'],
        respuesta: 3,
        opciones: [2, 3, 4, 5]
    },
    {
        id: 'p1_c_balanza',
        tipo: 'balanza',
        pregunta: '¡Equilibra la balanza! Resuelve la suma del platillo izquierdo:',
        operacionIzquierda: '5 + 3',
        pesoIzquierda: 8,
        operacionDerecha: '?',
        pesosOpciones: [6, 7, 8, 9],
        respuesta: 8
    },
    {
        id: 'p1_c_ordenar',
        tipo: 'ordenar_numeros',
        pregunta: 'Coloca los números en su posición en la regla (de menor a mayor)',
        direccion: 'menor_a_mayor',
        rulerMin: 0,
        rulerMax: 10,
        rulerStep: 1,
        numeros: [1, 4, 8]
    },
    {
        id: 'p1_c_adivinanza',
        tipo: 'adivinanza_numeros',
        pregunta: 'El Enigma del Mago',
        pistas: [
            'Soy un número mayor que 10 y menor que 15.',
            'Soy un número par (se divide en dos partes iguales).',
            'Termino en la cifra 2.'
        ],
        pista: 'Soy mayor que 10 y menor que 15. Soy un número par y termino en 2. ¿Quién soy?',
        opciones: ['11', '12', '13', '14'],
        respuesta: 1
    },
    {
        id: 'p1_c_dados',
        tipo: 'dados',
        pregunta: '¡Tira los dados! ¿Cuánto suman los puntos?',
        dado1: 3,
        dado2: 2,
        opciones: [4, 5, 6, 7],
        respuesta: 1
    },
    {
        id: 'p1_c_frutas_2',
        tipo: 'contar_frutas',
        pregunta: '¿Cuántos plátanos 🍌 hay en la mesa del mercado?',
        frutaObjetivo: '🍌',
        frutas: ['🍌', '🍎', '🍌', '🍊', '🍌', '🍌', '🍓'],
        respuesta: 4,
        opciones: [2, 3, 4, 5]
    },
    {
        id: 'p1_c_balanza_2',
        tipo: 'balanza',
        pregunta: '¡Equilibra la balanza! ¿Qué peso falta para igualar al platillo izquierdo?',
        operacionIzquierda: '6 + 4',
        pesoIzquierda: 10,
        operacionDerecha: '7 + ?',
        pesoBaseDerecha: 7,
        pesosOpciones: [2, 3, 4, 5],
        respuesta: 3
    }
];

window.AULA_DATA.primaria1.bosque = [
    { tipo: 'burbujas', pregunta: '¡Explota las palabras bien escritas!', correctas: ['Sol', 'Mano', 'Pato'], incorrectas: ['Zol', 'Namo', 'Pt', 'Zapo'] },
    { tipo: 'multiple', pregunta: '¿Cuál de estos elementos es un ser vivo?', opciones: ['Una piedra', 'Un río', 'Un roble', 'Una mesa'], respuesta: 2 },
    { tipo: 'multiple', pregunta: '¿Qué palabra empieza por la letra M?', opciones: ['Manzana', 'Pera', 'Plátano', 'Naranja'], respuesta: 0 }
];

window.AULA_DATA.primaria2.castillo = [
    {
        id: 'p2_c_frutas',
        tipo: 'contar_frutas',
        pregunta: '¿Cuántas fresas 🍓 hay en la mesa del mercado?',
        frutaObjetivo: '🍓',
        frutas: ['🍓', '🍌', '🍓', '🍎', '🍓', '🍊', '🍓', '🍌', '🍐', '🍓'],
        respuesta: 5,
        opciones: [3, 4, 5, 6]
    },
    {
        id: 'p2_c_balanza',
        tipo: 'balanza',
        pregunta: '¡Equilibra la balanza! ¿Qué peso falta en el platillo derecho para igualar?',
        operacionIzquierda: '9 + 7',
        pesoIzquierda: 16,
        operacionDerecha: '10 + ?',
        pesoBaseDerecha: 10,
        pesosOpciones: [4, 5, 6, 7],
        respuesta: 6
    },
    {
        id: 'p2_c_ordenar',
        tipo: 'ordenar_numeros',
        pregunta: 'Coloca los números en su posición en la regla (de menor a mayor)',
        direccion: 'menor_a_mayor',
        rulerMin: 0,
        rulerMax: 50,
        rulerStep: 5,
        numeros: [5, 20, 45]
    },
    {
        id: 'p2_c_adivinanza',
        tipo: 'adivinanza_numeros',
        pregunta: 'El Enigma de las Runas del Sabio',
        pistas: [
            'Tengo 4 decenas completas.',
            'Si a mi cifra de las unidades le sumas 3, obtienes 8.',
            '¿Qué número secreto soy?'
        ],
        pista: 'Tengo 4 decenas completas. Si a mi cifra de las unidades le sumas 3, obtienes 8. ¿Qué número soy?',
        opciones: ['43', '45', '48', '54'],
        respuesta: 1
    },
    {
        id: 'p2_c_dados',
        tipo: 'dados',
        pregunta: '¡Han rodado 3 dados mágicos! ¿Cuánto suman en total?',
        dados: [5, 4, 3],
        opciones: [10, 11, 12, 13],
        respuesta: 2
    },
    {
        id: 'p2_c_balanza_resta',
        tipo: 'balanza',
        pregunta: '¡Equilibra la balanza con una resta! ¿Cuánto da el platillo izquierdo?',
        operacionIzquierda: '20 - 6',
        pesoIzquierda: 14,
        operacionDerecha: '?',
        pesosOpciones: [12, 13, 14, 15],
        respuesta: 14
    },
    {
        id: 'p2_c_ordenar_2',
        tipo: 'ordenar_numeros',
        pregunta: 'Coloca los números en su posición en la regla (de menor a mayor)',
        direccion: 'menor_a_mayor',
        rulerMin: 0,
        rulerMax: 20,
        rulerStep: 2,
        numeros: [2, 9, 18]
    },
    {
        id: 'p2_c_adivinanza_2',
        tipo: 'adivinanza_numeros',
        pregunta: 'El Enigma del Doble Mágico',
        pistas: [
            'Soy el doble de 15.',
            'Pero si me restas 4 unidades...',
            '¿En qué número me convierto?'
        ],
        pista: 'Soy el doble de 15, pero si me restas 4 unidades, ¿en qué número me convierto?',
        opciones: ['24', '26', '28', '30'],
        respuesta: 1
    }
];

window.AULA_DATA.primaria2.bosque = [
    { tipo: 'burbujas', pregunta: 'Explota las burbujas con palabras escritas CORRECTAMENTE', correctas: ['Árbol', 'Hielo', 'Coche', 'Sapo'], incorrectas: ['Arvol', 'Ielo', 'Caxe', 'Zapo', 'Havlar'] },
    { tipo: 'letra_perdida', pregunta: '¡Falta una letra! ¿Cuál es?', palabra: 'B O _ Q U E', opciones: ['S', 'Z', 'C', 'X'], respuesta: 0 },
    { tipo: 'letra_perdida', pregunta: 'Adivina la letra que falta', palabra: 'C A _ A L L O', opciones: ['V', 'B', 'Y', 'LL'], respuesta: 1 },
    { tipo: 'multiple', pregunta: '¿Cuál es el antónimo (lo contrario) de "alto"?', opciones: ['Grande', 'Bajo', 'Fuerte', 'Rápido'], respuesta: 1 },
    { tipo: 'multiple', pregunta: '¿Qué palabra está bien escrita?', opciones: ['Carro', 'Caro (vehículo)', 'Karr', 'Cahro'], respuesta: 0 }
];

window.AULA_DATA.primaria2.laboratorio = [
    { tipo: 'multiple', pregunta: '¿Qué tipo de animal es un perro?', opciones: ['Ave', 'Reptil', 'Mamífero', 'Pez'], respuesta: 2 },
    { tipo: 'multiple', pregunta: '¿Por dónde respiran las plantas?', opciones: ['Por la raíz', 'Por las hojas', 'Por el tallo', 'Por las flores'], respuesta: 1 },
    { tipo: 'multiple', pregunta: '¿Cuál de estos es un hábito saludable?', opciones: ['Comer muchos dulces', 'Dormir poco', 'Lavarse los dientes', 'No beber agua'], respuesta: 2 },
    { tipo: 'multiple', pregunta: '¿Qué animal es herbívoro (come plantas)?', opciones: ['León', 'Tiburón', 'Vaca', 'Lobo'], respuesta: 2 },
    { tipo: 'multiple', pregunta: '¿Con qué sentido notamos que algo está suave?', opciones: ['Vista', 'Oído', 'Olfato', 'Tacto'], respuesta: 3 }
];

window.AULA_DATA.primaria2.biblioteca = [
    { tipo: 'memory', pregunta: 'Encuentra las parejas de Don Quijote', parejas: ['🐴', '🛡️', '⚔️', '📖', '👴', '🏰'] },
    { tipo: 'multiple', pregunta: '¿En qué estación del año hace más calor?', opciones: ['Invierno', 'Otoño', 'Primavera', 'Verano'], respuesta: 3 },
    { tipo: 'multiple', pregunta: '¿Quién es el escudero de Don Quijote?', opciones: ['Rocinante', 'Sancho Panza', 'Dulcinea', 'Cervantes'], respuesta: 1 },
    { tipo: 'multiple', pregunta: '¿Cómo se llama la localidad o ciudad donde vivimos?', opciones: ['Ciudad Real', 'Madrid', 'Barcelona', 'Sevilla'], respuesta: 0 }
];

window.AULA_DATA.primaria2.taller = [
    { tipo: 'multiple', pregunta: 'Si mezclamos amarillo y azul, ¿qué color sale?', opciones: ['Verde', 'Morado', 'Naranja', 'Marrón'], respuesta: 0 },
    { tipo: 'multiple', pregunta: 'Adivina: "Tiene dientes y no come, tiene cabeza y no es hombre." ¿Qué es?', opciones: ['Un peine', 'Un ajo', 'Un cepillo', 'Un tenedor'], respuesta: 1 },
    { tipo: 'multiple', pregunta: '¿Qué instrumento es de percusión (se golpea)?', opciones: ['Guitarra', 'Flauta', 'Tambor', 'Violín'], respuesta: 2 },
    { tipo: 'multiple', pregunta: 'Si mezclas blanco y rojo, ¿qué color obtienes?', opciones: ['Rosa', 'Gris', 'Negro', 'Celeste'], respuesta: 0 },
    { tipo: 'multiple', pregunta: 'Adivina: "Oro parece, plata no es..." ¿Qué es?', opciones: ['Una joya', 'El plátano', 'Una moneda', 'El sol'], respuesta: 1 }
];

window.AULA_DATA.primaria3.laboratorio = [
    { tipo: 'multiple', pregunta: '¿Qué número es el mayor de los siguientes?', opciones: ['142', '124', '150', '105'], respuesta: 2 },
    { tipo: 'multiple', pregunta: '¿Cuánto es 4 x 5?', opciones: ['15', '20', '25', '30'], respuesta: 1 }
];

window.AULA_DATA.primaria4.biblioteca = [
    { tipo: 'multiple', pregunta: '¿Quién es el autor de la célebre novela "Don Quijote de la Mancha"?', opciones: ['Federico García Lorca', 'Miguel de Cervantes', 'Lope de Vega', 'Francisco de Quevedo'], respuesta: 1 },
    { tipo: 'multiple', pregunta: '¿Cómo se llamaba el caballo de Don Quijote?', opciones: ['Bucéfalo', 'Rocinante', 'Pegaso', 'Babieca'], respuesta: 1 }
];

window.AULA_DATA.primaria5.castillo = [
    { tipo: 'multiple', pregunta: '¿Cuánto es 12 x 8?', opciones: ['86', '96', '106', '92'], respuesta: 1 },
    { tipo: 'multiple', pregunta: '¿Cuántos minutos hay en 3 horas?', opciones: ['120', '180', '240', '150'], respuesta: 1 }
];

window.AULA_DATA.primaria6.laboratorio = [
    { tipo: 'multiple', pregunta: '¿Cuál es el planeta con mayor masa de nuestro sistema solar?', opciones: ['Marte', 'Saturno', 'Júpiter', 'Neptuno'], respuesta: 2 },
    { tipo: 'multiple', pregunta: '¿Cuál es el órgano principal del sistema circulatorio?', opciones: ['Pulmón', 'Hígado', 'Cerebro', 'Corazón'], respuesta: 3 }
];
