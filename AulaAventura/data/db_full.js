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
    { tipo: 'multiple', pregunta: '¿Cuánto es 3 + 2?', opciones: ['4', '5', '6', '7'], respuesta: 1 },
    { tipo: 'contar', pregunta: 'Selecciona el número 4 para completar el reto:', respuesta: 4 }
];

window.AULA_DATA.primaria1.bosque = [
    { tipo: 'multiple', pregunta: '¿Cuál de estos elementos es un ser vivo?', opciones: ['Una piedra', 'Un río', 'Un roble', 'Una mesa'], respuesta: 2 },
    { tipo: 'multiple', pregunta: '¿Qué palabra empieza por la letra M?', opciones: ['Manzana', 'Pera', 'Plátano', 'Naranja'], respuesta: 0 }
];

window.AULA_DATA.primaria2.castillo = [
    { tipo: 'multiple', pregunta: '¿Qué número va inmediatamente después del 29?', opciones: ['28', '30', '31', '39'], respuesta: 1 },
    { tipo: 'multiple', pregunta: '¿Cuánto es 10 + 15?', opciones: ['20', '25', '35', '30'], respuesta: 1 }
];

window.AULA_DATA.primaria2.bosque = [
    { tipo: 'multiple', pregunta: '¿Cuál es el antónimo (lo contrario) de "alto"?', opciones: ['Grande', 'Bajo', 'Fuerte', 'Rápido'], respuesta: 1 }
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
