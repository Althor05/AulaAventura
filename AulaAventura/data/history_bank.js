/**
 * history_bank.js - Banco Extenso de Historia y Lengua (La Biblioteca Mágica)
 * CEIP Don Quijote - Primaria (1.º a 6.º de Primaria)
 * 
 * Actividades del Bloque:
 *  1. Comprensión lectora: 60 textos cotidianos e infantiles (incluye los 10 textos originales del usuario + 50 adicionales).
 *     Cada texto con 4 preguntas claras y opciones directas (240 preguntas en total).
 *  2. Continúa la historia: Más de 220 frases con huecos ("Luis encontró una __. Dentro había __.")
 *     Indicación limpia: "Continúa el relato en tu diario".
 *     Evaluado por la profesora mediante 3 botones: [Oops], [Bien], [Genial].
 *  3. Crea una historia con palabras: 4 palabras sencillas aleatorias (sin categorías complejas).
 *     Botón para pedir 4 nuevas palabras de un gran banco de más de 520 términos.
 *     Evaluado también por la profesora mediante [Oops], [Bien], [Genial].
 */

(function () {
    'use strict';

    function shuffle(arr) {
        const copy = [...arr];
        for (let i = copy.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [copy[i], copy[j]] = [copy[j], copy[i]];
        }
        return copy;
    }

    // 1. BANCO DE TEXTOS SENCILLOS PARA COMPRENSIÓN LECTORA (60 Textos x 4 Preguntas)
    const TEXTOS_COMPRENSION = [
        {
                "id": 1,
                "titulo": "El gato de Marta",
                "texto": "Marta tiene un gato que se llama Nube.\nNube es blanco y tiene los ojos verdes.\nLe gusta dormir encima del sofá.\nPor las tardes, Marta juega con él con una pelota roja.",
                "preguntas": [
                        {
                                "q": "¿Cómo se llama el gato?",
                                "opts": [
                                        "Nube",
                                        "Pelusa",
                                        "Manchas",
                                        "Tom"
                                ],
                                "correct": 0
                        },
                        {
                                "q": "¿De qué color es Nube?",
                                "opts": [
                                        "Blanco",
                                        "Negro",
                                        "Marrón",
                                        "Gris"
                                ],
                                "correct": 0
                        },
                        {
                                "q": "¿Dónde le gusta dormir?",
                                "opts": [
                                        "Encima del sofá",
                                        "En la cama",
                                        "En una caja",
                                        "En la alfombra"
                                ],
                                "correct": 0
                        },
                        {
                                "q": "¿Con qué juega Marta con Nube?",
                                "opts": [
                                        "Con una pelota roja",
                                        "Con una cuerda",
                                        "Con un ratón de juguete",
                                        "Con una lana azul"
                                ],
                                "correct": 0
                        }
                ]
        },
        {
                "id": 2,
                "titulo": "Una mañana en el parque",
                "texto": "Lucas fue al parque con su abuela.\nLlevó una cometa de muchos colores.\nHacía un poco de viento y la cometa volaba muy alto.\nDespués, Lucas y su abuela se sentaron en un banco a descansar.",
                "preguntas": [
                        {
                                "q": "¿Con quién fue Lucas al parque?",
                                "opts": [
                                        "Con su abuela",
                                        "Con su primo",
                                        "Con su hermano",
                                        "Con su amigo"
                                ],
                                "correct": 0
                        },
                        {
                                "q": "¿Qué llevó Lucas?",
                                "opts": [
                                        "Una cometa de muchos colores",
                                        "Una bicicleta",
                                        "Un patinete",
                                        "Una pelota"
                                ],
                                "correct": 0
                        },
                        {
                                "q": "¿Cómo era la cometa?",
                                "opts": [
                                        "De muchos colores",
                                        "Toda blanca",
                                        "De rayas negras",
                                        "Pequeña y azul"
                                ],
                                "correct": 0
                        },
                        {
                                "q": "¿Dónde se sentaron después?",
                                "opts": [
                                        "En un banco a descansar",
                                        "En la hierba",
                                        "En los columpios",
                                        "En el suelo"
                                ],
                                "correct": 0
                        }
                ]
        },
        {
                "id": 3,
                "titulo": "El desayuno",
                "texto": "Antes de ir al colegio, Sara desayuna con su familia.\nHoy ha tomado leche y una tostada con tomate.\nSu hermano Pablo ha comido un plátano.\nDespués de desayunar, los dos se han lavado los dientes.",
                "preguntas": [
                        {
                                "q": "¿Con quién desayuna Sara?",
                                "opts": [
                                        "Con su familia",
                                        "Sola",
                                        "Con sus amigos",
                                        "Con su profesora"
                                ],
                                "correct": 0
                        },
                        {
                                "q": "¿Qué ha tomado Sara?",
                                "opts": [
                                        "Leche y una tostada con tomate",
                                        "Zumo y galletas",
                                        "Cereales con miel",
                                        "Chocolate con churros"
                                ],
                                "correct": 0
                        },
                        {
                                "q": "¿Qué ha comido Pablo?",
                                "opts": [
                                        "Un plátano",
                                        "Una manzana",
                                        "Una pera",
                                        "Un yogur"
                                ],
                                "correct": 0
                        },
                        {
                                "q": "¿Qué hicieron después de desayunar?",
                                "opts": [
                                        "Se lavaron los dientes",
                                        "Se fueron a dormir",
                                        "Vieron la televisión",
                                        "Salieron corriendo"
                                ],
                                "correct": 0
                        }
                ]
        },
        {
                "id": 4,
                "titulo": "La excursión",
                "texto": "La clase de Ana fue de excursión al bosque.\nLos niños caminaron por un camino rodeado de árboles.\nDurante el paseo vieron una ardilla y varios pájaros.\nAntes de volver al colegio, se sentaron a comer sus bocadillos.",
                "preguntas": [
                        {
                                "q": "¿Adónde fue la clase de Ana?",
                                "opts": [
                                        "Al bosque",
                                        "A la playa",
                                        "Al museo",
                                        "Al zoológico"
                                ],
                                "correct": 0
                        },
                        {
                                "q": "¿Qué animales vieron?",
                                "opts": [
                                        "Una ardilla y varios pájaros",
                                        "Un ciervo y un zorro",
                                        "Un conejo y una tortuga",
                                        "Mariposas y ranas"
                                ],
                                "correct": 0
                        },
                        {
                                "q": "¿Dónde caminaron los niños?",
                                "opts": [
                                        "Por un camino rodeado de árboles",
                                        "Por la orilla del río",
                                        "Por unas piedras",
                                        "Por la carretera"
                                ],
                                "correct": 0
                        },
                        {
                                "q": "¿Qué hicieron antes de volver al colegio?",
                                "opts": [
                                        "Se sentaron a comer sus bocadillos",
                                        "Jugaron al fútbol",
                                        "Se bañaron",
                                        "Recogieron hojas secas"
                                ],
                                "correct": 0
                        }
                ]
        },
        {
                "id": 5,
                "titulo": "El cumpleaños",
                "texto": "Hoy es el cumpleaños de Hugo.\nSu familia le ha preparado una pequeña fiesta en casa.\nHay una tarta de chocolate y globos de muchos colores.\nHugo está muy contento porque sus primos han venido a jugar.",
                "preguntas": [
                        {
                                "q": "¿De quién es el cumpleaños?",
                                "opts": [
                                        "De Hugo",
                                        "De su hermano",
                                        "De su primo",
                                        "De su abuelo"
                                ],
                                "correct": 0
                        },
                        {
                                "q": "¿Dónde hacen la fiesta?",
                                "opts": [
                                        "En casa",
                                        "En el parque",
                                        "En el colegio",
                                        "En un restaurante"
                                ],
                                "correct": 0
                        },
                        {
                                "q": "¿De qué es la tarta?",
                                "opts": [
                                        "De chocolate",
                                        "De fresa",
                                        "De manzana",
                                        "De nata"
                                ],
                                "correct": 0
                        },
                        {
                                "q": "¿Quiénes han venido a jugar con Hugo?",
                                "opts": [
                                        "Sus primos",
                                        "Sus vecinos",
                                        "Sus profesores",
                                        "Sus compañeros de clase"
                                ],
                                "correct": 0
                        }
                ]
        },
        {
                "id": 6,
                "titulo": "Un día de lluvia",
                "texto": "Esta mañana ha llovido mucho.\nClara ha salido de casa con sus botas y su paraguas amarillo.\nEn el camino al colegio ha visto varios charcos.\nAl llegar a clase, ha dejado el paraguas junto a la puerta.",
                "preguntas": [
                        {
                                "q": "¿Qué tiempo hacía?",
                                "opts": [
                                        "Llovía mucho",
                                        "Hacía mucho sol",
                                        "Nevaba",
                                        "Hacía mucho viento"
                                ],
                                "correct": 0
                        },
                        {
                                "q": "¿De qué color era el paraguas?",
                                "opts": [
                                        "Amarillo",
                                        "Rojo",
                                        "Verde",
                                        "Azul"
                                ],
                                "correct": 0
                        },
                        {
                                "q": "¿Qué vio Clara por el camino?",
                                "opts": [
                                        "Varios charcos",
                                        "Flores de colores",
                                        "Caracoles en el suelo",
                                        "Un perro jugando"
                                ],
                                "correct": 0
                        },
                        {
                                "q": "¿Dónde dejó el paraguas?",
                                "opts": [
                                        "Junto a la puerta",
                                        "Debajo de su mesa",
                                        "En su mochila",
                                        "En el patio"
                                ],
                                "correct": 0
                        }
                ]
        },
        {
                "id": 7,
                "titulo": "La huerta de la abuela",
                "texto": "La abuela de Leo tiene una huerta pequeña.\nEn ella cultiva tomates, lechugas y zanahorias.\nLeo la ayuda a regar las plantas cada sábado.\nDespués, los dos recogen algunas verduras para preparar la comida.",
                "preguntas": [
                        {
                                "q": "¿Quién tiene una huerta?",
                                "opts": [
                                        "La abuela de Leo",
                                        "Su vecino",
                                        "El colegio",
                                        "Su tío"
                                ],
                                "correct": 0
                        },
                        {
                                "q": "¿Qué verduras cultiva?",
                                "opts": [
                                        "Tomates, lechugas y zanahorias",
                                        "Patatas y pimientos",
                                        "Fresas y calabazas",
                                        "Cebollas y pepinos"
                                ],
                                "correct": 0
                        },
                        {
                                "q": "¿Cuándo ayuda Leo a su abuela?",
                                "opts": [
                                        "Cada sábado",
                                        "Todos los días",
                                        "Los domingos por la tarde",
                                        "Solo en verano"
                                ],
                                "correct": 0
                        },
                        {
                                "q": "¿Para qué recogen las verduras?",
                                "opts": [
                                        "Para preparar la comida",
                                        "Para venderlas",
                                        "Para dárselas a los pájaros",
                                        "Para guardarlas en cajas"
                                ],
                                "correct": 0
                        }
                ]
        },
        {
                "id": 8,
                "titulo": "El perro perdido",
                "texto": "Al salir del colegio, Elena encontró un perro pequeño.\nEl perro llevaba un collar azul, pero estaba solo.\nElena preguntó a varias personas si conocían al animal.\nFinalmente, encontró a su dueño, que estaba muy preocupado.",
                "preguntas": [
                        {
                                "q": "¿Qué encontró Elena?",
                                "opts": [
                                        "Un perro pequeño",
                                        "Un gato blanco",
                                        "Un pájaro herido",
                                        "Una mochila"
                                ],
                                "correct": 0
                        },
                        {
                                "q": "¿De qué color era el collar?",
                                "opts": [
                                        "Azul",
                                        "Rojo",
                                        "Verde",
                                        "Negro"
                                ],
                                "correct": 0
                        },
                        {
                                "q": "¿Qué hizo Elena para encontrar al dueño?",
                                "opts": [
                                        "Preguntó a varias personas",
                                        "Puso un cartel",
                                        "Llamó a la policía",
                                        "Se fue a su casa"
                                ],
                                "correct": 0
                        },
                        {
                                "q": "¿Cómo estaba el dueño?",
                                "opts": [
                                        "Muy preocupado",
                                        "Muy enfadado",
                                        "Muy tranquilo",
                                        "Muy cansado"
                                ],
                                "correct": 0
                        }
                ]
        },
        {
                "id": 9,
                "titulo": "La biblioteca",
                "texto": "A Marcos le gusta mucho leer.\nLos miércoles va con su padre a la biblioteca del barrio.\nEsta semana ha elegido un libro sobre dinosaurios.\nCuando termina de leerlo, lo guarda en su mochila para llevarlo a casa.",
                "preguntas": [
                        {
                                "q": "¿Qué le gusta hacer a Marcos?",
                                "opts": [
                                        "Leer",
                                        "Dibujar",
                                        "Cantar",
                                        "Jugar a la pelota"
                                ],
                                "correct": 0
                        },
                        {
                                "q": "¿Cuándo va a la biblioteca?",
                                "opts": [
                                        "Los miércoles",
                                        "Los viernes",
                                        "Los lunes",
                                        "Los fines de semana"
                                ],
                                "correct": 0
                        },
                        {
                                "q": "¿Sobre qué es el libro que ha elegido?",
                                "opts": [
                                        "Sobre dinosaurios",
                                        "Sobre planetas",
                                        "Sobre animales marinos",
                                        "Sobre castillos"
                                ],
                                "correct": 0
                        },
                        {
                                "q": "¿Dónde guarda el libro?",
                                "opts": [
                                        "En su mochila",
                                        "En una bolsa",
                                        "En el bolsillo",
                                        "En un cajón"
                                ],
                                "correct": 0
                        }
                ]
        },
        {
                "id": 10,
                "titulo": "La planta de Julia",
                "texto": "Julia tiene una planta en su habitación.\nLa planta tiene unas hojas grandes y verdes.\nCada mañana, Julia le pone un poco de agua.\nDespués de varias semanas, apareció una pequeña flor amarilla.",
                "preguntas": [
                        {
                                "q": "¿Dónde tiene Julia la planta?",
                                "opts": [
                                        "En su habitación",
                                        "En el balcón",
                                        "En la cocina",
                                        "En el jardín"
                                ],
                                "correct": 0
                        },
                        {
                                "q": "¿Cómo son sus hojas?",
                                "opts": [
                                        "Grandes y verdes",
                                        "Pequeñas y secas",
                                        "Amarillas y finas",
                                        "Redondas y rojas"
                                ],
                                "correct": 0
                        },
                        {
                                "q": "¿Cuándo la riega Julia?",
                                "opts": [
                                        "Cada mañana",
                                        "Por las noches",
                                        "Cada domingo",
                                        "Solo cuando llueve"
                                ],
                                "correct": 0
                        },
                        {
                                "q": "¿De qué color es la flor?",
                                "opts": [
                                        "Amarilla",
                                        "Roja",
                                        "Rosa",
                                        "Azul"
                                ],
                                "correct": 0
                        }
                ]
        },
        {
                "id": 11,
                "titulo": "La bicicleta de Carlos",
                "texto": "Carlos tiene una bicicleta roja muy bonita.\nTodos los domingos sale a pasear por el carril bici.\nSiempre lleva puesto su casco azul para protegerse.\nAl terminar el paseo, guarda la bicicleta en el garaje.",
                "preguntas": [
                        {
                                "q": "¿De qué color es la bicicleta de Carlos?",
                                "opts": [
                                        "Roja",
                                        "Verde",
                                        "Negra",
                                        "Amarilla"
                                ],
                                "correct": 0
                        },
                        {
                                "q": "¿Qué día sale a pasear Carlos?",
                                "opts": [
                                        "Los domingos",
                                        "Los lunes",
                                        "Los martes",
                                        "Los jueves"
                                ],
                                "correct": 0
                        },
                        {
                                "q": "¿De qué color es su casco?",
                                "opts": [
                                        "Azul",
                                        "Rojo",
                                        "Blanco",
                                        "Naranja"
                                ],
                                "correct": 0
                        },
                        {
                                "q": "¿Dónde guarda la bicicleta al terminar?",
                                "opts": [
                                        "En el garaje",
                                        "En su habitación",
                                        "En el balcón",
                                        "En el parque"
                                ],
                                "correct": 0
                        }
                ]
        },
        {
                "id": 12,
                "titulo": "El dibujo de Lucía",
                "texto": "En la clase de plástica, Lucía pintó un paisaje de montaña.\nUsó pinturas de cera de color verde y marrón.\nEn lo alto de la montaña dibujó un sol brillante.\nEl profesor colgó el dibujo en el corcho de la clase.",
                "preguntas": [
                        {
                                "q": "¿Qué pintó Lucía en la clase de plástica?",
                                "opts": [
                                        "Un paisaje de montaña",
                                        "Un barco en el mar",
                                        "Un gato jugando",
                                        "Un coche de carreras"
                                ],
                                "correct": 0
                        },
                        {
                                "q": "¿Qué tipo de pinturas usó?",
                                "opts": [
                                        "Pinturas de cera",
                                        "Acuarelas",
                                        "Témperas",
                                        "Rotuladores"
                                ],
                                "correct": 0
                        },
                        {
                                "q": "¿Qué dibujó en lo alto de la montaña?",
                                "opts": [
                                        "Un sol brillante",
                                        "Una nube gris",
                                        "Un pájaro volando",
                                        "Una casita"
                                ],
                                "correct": 0
                        },
                        {
                                "q": "¿Dónde colgó el profesor el dibujo?",
                                "opts": [
                                        "En el corcho de la clase",
                                        "En la puerta del colegio",
                                        "En la pizarra",
                                        "En la ventana"
                                ],
                                "correct": 0
                        }
                ]
        },
        {
                "id": 13,
                "titulo": "El pez de Mateo",
                "texto": "Mateo tiene un pez naranja en una pecera redonda.\nEl pez se llama Chispa y nada muy rápido.\nCada tarde, Mateo le echa tres granitos de comida.\nA Chispa le gusta esconderse detrás de un barquito de juguete.",
                "preguntas": [
                        {
                                "q": "¿Cómo se llama el pez de Mateo?",
                                "opts": [
                                        "Chispa",
                                        "Burbuja",
                                        "Nemo",
                                        "Aleta"
                                ],
                                "correct": 0
                        },
                        {
                                "q": "¿De qué color es el pez?",
                                "opts": [
                                        "Naranja",
                                        "Azul",
                                        "Plateado",
                                        "Negro"
                                ],
                                "correct": 0
                        },
                        {
                                "q": "¿Cuántos granitos de comida le echa Mateo?",
                                "opts": [
                                        "Tres granitos",
                                        "Cinco granitos",
                                        "Un grano",
                                        "Diez granitos"
                                ],
                                "correct": 0
                        },
                        {
                                "q": "¿Dónde le gusta esconderse a Chispa?",
                                "opts": [
                                        "Detrás de un barquito de juguete",
                                        "Bajo una concha",
                                        "En una cueva",
                                        "Cerca de las plantas"
                                ],
                                "correct": 0
                        }
                ]
        },
        {
                "id": 14,
                "titulo": "La merienda en el campo",
                "texto": "David y su hermana fueron a merendar al campo.\nSu madre preparó zumo de naranja y bocadillos de queso.\nExtendieron una manta a cuadros sobre la hierba verde.\nDespués de comer, jugaron a buscar mariquitas y flores.",
                "preguntas": [
                        {
                                "q": "¿Adónde fueron a merendar David y su hermana?",
                                "opts": [
                                        "Al campo",
                                        "A la playa",
                                        "Al cine",
                                        "A casa de sus abuelos"
                                ],
                                "correct": 0
                        },
                        {
                                "q": "¿De qué eran los bocadillos?",
                                "opts": [
                                        "De queso",
                                        "De jamón",
                                        "De tortilla",
                                        "De chocolate"
                                ],
                                "correct": 0
                        },
                        {
                                "q": "¿Dónde extendieron la manta?",
                                "opts": [
                                        "Sobre la hierba verde",
                                        "Sobre la arena",
                                        "En una mesa",
                                        "En el camino de tierra"
                                ],
                                "correct": 0
                        },
                        {
                                "q": "¿A qué jugaron después de merendar?",
                                "opts": [
                                        "A buscar mariquitas y flores",
                                        "Al escondite",
                                        "A la pelota",
                                        "A las cartas"
                                ],
                                "correct": 0
                        }
                ]
        },
        {
                "id": 15,
                "titulo": "El muñeco de nieve",
                "texto": "En invierno cayó una gran nevada en el pueblo de Álvaro.\nÁlvaro y sus amigos salieron al jardín a jugar.\nHicieron un gran muñeco de nieve con una bufanda roja.\nPara la nariz usaron una zanahoria que les dio su madre.",
                "preguntas": [
                        {
                                "q": "¿En qué estación del año cayó la nevada?",
                                "opts": [
                                        "En invierno",
                                        "En primavera",
                                        "En verano",
                                        "En otoño"
                                ],
                                "correct": 0
                        },
                        {
                                "q": "¿Dónde salieron a jugar los niños?",
                                "opts": [
                                        "Al jardín",
                                        "Al parque",
                                        "A la plaza",
                                        "Al bosque"
                                ],
                                "correct": 0
                        },
                        {
                                "q": "¿De qué color era la bufanda del muñeco?",
                                "opts": [
                                        "Roja",
                                        "Verde",
                                        "Azul",
                                        "Amarilla"
                                ],
                                "correct": 0
                        },
                        {
                                "q": "¿Qué usaron para la nariz del muñeco?",
                                "opts": [
                                        "Una zanahoria",
                                        "Una piedra",
                                        "Un palo",
                                        "Un botón"
                                ],
                                "correct": 0
                        }
                ]
        },
        {
                "id": 16,
                "titulo": "La visita a la granja",
                "texto": "El colegio organizó una visita a una granja escuela.\nLos alumnos vieron vacas, ovejas y gallinas.\nPaula le dio un poco de hierba fresca a una cabra blanca.\nAl final del día, el granjero les regaló queso recién hecho.",
                "preguntas": [
                        {
                                "q": "¿Adónde fueron de visita los alumnos?",
                                "opts": [
                                        "A una granja escuela",
                                        "A un zoológico",
                                        "A un museo",
                                        "A una fábrica"
                                ],
                                "correct": 0
                        },
                        {
                                "q": "¿Qué animal alimentó Paula?",
                                "opts": [
                                        "A una cabra blanca",
                                        "A una oveja",
                                        "A un caballo",
                                        "A una vaca"
                                ],
                                "correct": 0
                        },
                        {
                                "q": "¿Qué comida le dio Paula a la cabra?",
                                "opts": [
                                        "Hierba fresca",
                                        "Pan duro",
                                        "Una manzana",
                                        "Granos de maíz"
                                ],
                                "correct": 0
                        },
                        {
                                "q": "¿Qué les regaló el granjero al final del día?",
                                "opts": [
                                        "Queso recién hecho",
                                        "Huevos frescos",
                                        "Un vaso de leche",
                                        "Miel casera"
                                ],
                                "correct": 0
                        }
                ]
        },
        {
                "id": 17,
                "titulo": "La cometa en la playa",
                "texto": "Un sábado de verano, Nuria fue a la playa con sus padres.\nHacía una brisa agradable y el mar estaba tranquilo.\nNuria voló una cometa con forma de mariposa.\nLa cometa subió tan alto que parecía tocar las nubes.",
                "preguntas": [
                        {
                                "q": "¿Cuándo fue Nuria a la playa?",
                                "opts": [
                                        "Un sábado de verano",
                                        "Un domingo de invierno",
                                        "Un viernes por la tarde",
                                        "En primavera"
                                ],
                                "correct": 0
                        },
                        {
                                "q": "¿Cómo estaba el mar?",
                                "opts": [
                                        "Tranquilo",
                                        "Con muchas olas",
                                        "Muy agitado",
                                        "Lleno de barcos"
                                ],
                                "correct": 0
                        },
                        {
                                "q": "¿Qué forma tenía la cometa de Nuria?",
                                "opts": [
                                        "De mariposa",
                                        "De pájaro",
                                        "De pez",
                                        "De estrella"
                                ],
                                "correct": 0
                        },
                        {
                                "q": "¿Hasta dónde parecía subir la cometa?",
                                "opts": [
                                        "Parecía tocar las nubes",
                                        "Hasta la torre",
                                        "Hasta los árboles",
                                        "Hasta el faro"
                                ],
                                "correct": 0
                        }
                ]
        },
        {
                "id": 18,
                "titulo": "El nido de pájaros",
                "texto": "En el árbol del patio del colegio hay un nido pequeño.\nUna mañana, los niños vieron tres huevos de color azul claro.\nDías después nacieron tres pajaritos que piaban con fuerza.\nLa mamá pájaro les llevaba gusanitos para comer.",
                "preguntas": [
                        {
                                "q": "¿Dónde está el nido?",
                                "opts": [
                                        "En el árbol del patio del colegio",
                                        "En el tejado de la casa",
                                        "En una farola",
                                        "En la ventana de clase"
                                ],
                                "correct": 0
                        },
                        {
                                "q": "¿De qué color eran los huevos?",
                                "opts": [
                                        "Azul claro",
                                        "Blancos con manchas",
                                        "Marrones",
                                        "Amarillos"
                                ],
                                "correct": 0
                        },
                        {
                                "q": "¿Cuántos pajaritos nacieron?",
                                "opts": [
                                        "Tres pajaritos",
                                        "Dos pajaritos",
                                        "Cuatro pajaritos",
                                        "Un pajarito"
                                ],
                                "correct": 0
                        },
                        {
                                "q": "¿Qué les llevaba la mamá pájaro para comer?",
                                "opts": [
                                        "Gusanitos",
                                        "Migas de pan",
                                        "Semillas de girasol",
                                        "Fruta madura"
                                ],
                                "correct": 0
                        }
                ]
        },
        {
                "id": 19,
                "titulo": "La fiesta de disfraces",
                "texto": "En la fiesta de carnaval del colegio, todos llevaban disfraces.\nTomás se disfrazó de astronauta con un casco plateado.\nSu amiga Valeria iba vestida de leona con una melena marrón.\nBailaron en el gimnasio y comieron rosquillas de azúcar.",
                "preguntas": [
                        {
                                "q": "¿Qué fiesta celebraban en el colegio?",
                                "opts": [
                                        "La fiesta de carnaval",
                                        "La fiesta de Navidad",
                                        "El fin de curso",
                                        "La fiesta de la primavera"
                                ],
                                "correct": 0
                        },
                        {
                                "q": "¿De qué se disfrazó Tomás?",
                                "opts": [
                                        "De astronauta",
                                        "De pirata",
                                        "De superhéroe",
                                        "De bombero"
                                ],
                                "correct": 0
                        },
                        {
                                "q": "¿De qué iba vestida Valeria?",
                                "opts": [
                                        "De leona",
                                        "De princesa",
                                        "De mariposa",
                                        "De médica"
                                ],
                                "correct": 0
                        },
                        {
                                "q": "¿Dónde bailaron los niños?",
                                "opts": [
                                        "En el gimnasio",
                                        "En el patio",
                                        "En el comedor",
                                        "En el salón de actos"
                                ],
                                "correct": 0
                        }
                ]
        },
        {
                "id": 20,
                "titulo": "La tortuga del jardín",
                "texto": "En el jardín de la casa de Pedro vive una tortuga pequeña.\nSe llama Lenta y tiene el caparazón verde y marrón.\nLe gusta comer hojas tiernas de lechuga.\nCuando hace sol, se sube a una piedra plana a calentarse.",
                "preguntas": [
                        {
                                "q": "¿Dónde vive la tortuga de Pedro?",
                                "opts": [
                                        "En el jardín de su casa",
                                        "En una caja de cartón",
                                        "En el balcón",
                                        "En el salón"
                                ],
                                "correct": 0
                        },
                        {
                                "q": "¿Cómo se llama la tortuga?",
                                "opts": [
                                        "Lenta",
                                        "Pepa",
                                        "Conchita",
                                        "Verdosa"
                                ],
                                "correct": 0
                        },
                        {
                                "q": "¿Qué comida le gusta a la tortuga?",
                                "opts": [
                                        "Hojas tiernas de lechuga",
                                        "Zanahoria rallada",
                                        "Trozos de manzana",
                                        "Pan mojado"
                                ],
                                "correct": 0
                        },
                        {
                                "q": "¿Dónde se sube cuando hace sol?",
                                "opts": [
                                        "A una piedra plana",
                                        "A un tronco seco",
                                        "A un banco",
                                        "A la hierba alta"
                                ],
                                "correct": 0
                        }
                ]
        },
        {
                "id": 21,
                "titulo": "El castillo de arena",
                "texto": "Sergio y su primo fueron a la playa por la tarde.\nCon sus cubos y palas hicieron un castillo de arena muy alto.\nLe pusieron cuatro torres y una concha blanca en la cima.\nEl agua del mar no llegó a tocarlo porque estaba lejos de la orilla.",
                "preguntas": [
                        {
                                "q": "¿Quién acompañó a Sergio a la playa?",
                                "opts": [
                                        "Su primo",
                                        "Su abuelo",
                                        "Su hermano mayor",
                                        "Su profesor"
                                ],
                                "correct": 0
                        },
                        {
                                "q": "¿Qué herramientas usaron para el castillo?",
                                "opts": [
                                        "Cubos y palas",
                                        "Rastrillos y carretillas",
                                        "Cucharas y vasos",
                                        "Manos y palos"
                                ],
                                "correct": 0
                        },
                        {
                                "q": "¿Qué colocaron en la cima del castillo?",
                                "opts": [
                                        "Una concha blanca",
                                        "Una banderita de papel",
                                        "Una piedra brillante",
                                        "Una ramita verde"
                                ],
                                "correct": 0
                        },
                        {
                                "q": "¿Por qué el agua no tocó el castillo?",
                                "opts": [
                                        "Porque estaba lejos de la orilla",
                                        "Porque hicieron un muro",
                                        "Porque no subió la marea",
                                        "Porque lo protegieron con piedras"
                                ],
                                "correct": 0
                        }
                ]
        },
        {
                "id": 22,
                "titulo": "El pastel de manzana",
                "texto": "El abuelo de Daniel preparó un pastel de manzana para la merienda.\nPeló tres manzanas dulces y las cortó en trocitos pequeños.\nPuso el pastel en el horno durante media hora.\nEl olor a manzana y canela llenó toda la cocina.",
                "preguntas": [
                        {
                                "q": "¿Quién preparó el pastel?",
                                "opts": [
                                        "El abuelo de Daniel",
                                        "La madre de Daniel",
                                        "Daniel con sus amigos",
                                        "Su tía María"
                                ],
                                "correct": 0
                        },
                        {
                                "q": "¿Cuántas manzanas peló el abuelo?",
                                "opts": [
                                        "Tres manzanas",
                                        "Cinco manzanas",
                                        "Dos manzanas",
                                        "Cuatro manzanas"
                                ],
                                "correct": 0
                        },
                        {
                                "q": "¿Cuánto tiempo estuvo el pastel en el horno?",
                                "opts": [
                                        "Media hora",
                                        "Una hora entera",
                                        "Quince minutos",
                                        "Diez minutos"
                                ],
                                "correct": 0
                        },
                        {
                                "q": "¿A qué olía la cocina?",
                                "opts": [
                                        "A manzana y canela",
                                        "A chocolate y fresa",
                                        "A vainilla y limón",
                                        "A pan tostado"
                                ],
                                "correct": 0
                        }
                ]
        },
        {
                "id": 23,
                "titulo": "La ardilla del parque",
                "texto": "Sofía vio una ardilla de cola larga en el parque del barrio.\nLa ardilla bajó de un pino y cogió una piña del suelo.\nSubió muy rápido por el tronco para guardarla en su hueco.\nSofía se quedó muy quieta para no asustar al animal.",
                "preguntas": [
                        {
                                "q": "¿Qué animal vio Sofía en el parque?",
                                "opts": [
                                        "Una ardilla de cola larga",
                                        "Un conejo marrón",
                                        "Un erizo pequeño",
                                        "Un pájaro carpintero"
                                ],
                                "correct": 0
                        },
                        {
                                "q": "¿De qué árbol bajó la ardilla?",
                                "opts": [
                                        "De un pino",
                                        "De un roble",
                                        "De un olmo",
                                        "De una palmera"
                                ],
                                "correct": 0
                        },
                        {
                                "q": "¿Qué recogió la ardilla del suelo?",
                                "opts": [
                                        "Una piña",
                                        "Una castaña",
                                        "Una bellota",
                                        "Una nuez"
                                ],
                                "correct": 0
                        },
                        {
                                "q": "¿Qué hizo Sofía para no asustarla?",
                                "opts": [
                                        "Se quedó muy quieta",
                                        "Caminó despacio",
                                        "Le dio comida",
                                        "Hizo una foto"
                                ],
                                "correct": 0
                        }
                ]
        },
        {
                "id": 24,
                "titulo": "El partido de fútbol",
                "texto": "En el recreo, los niños de segundo jugaron un partido de fútbol.\nEl equipo con camisetas verdes metió dos goles en la primera parte.\nMarcos fue el portero del equipo azul y paró tres balones difíciles.\nAl sonar la campana, todos se dieron la mano con deportividad.",
                "preguntas": [
                        {
                                "q": "¿En qué momento jugaron el partido?",
                                "opts": [
                                        "En el recreo",
                                        "Al salir de clase",
                                        "En la clase de educación física",
                                        "El sábado por la mañana"
                                ],
                                "correct": 0
                        },
                        {
                                "q": "¿Cuántos goles metió el equipo verde en la primera parte?",
                                "opts": [
                                        "Dos goles",
                                        "Un gol",
                                        "Tres goles",
                                        "Cuatro goles"
                                ],
                                "correct": 0
                        },
                        {
                                "q": "¿Quién fue el portero del equipo azul?",
                                "opts": [
                                        "Marcos",
                                        "Carlos",
                                        "Hugo",
                                        "Lucas"
                                ],
                                "correct": 0
                        },
                        {
                                "q": "¿Qué hicieron todos al sonar la campana?",
                                "opts": [
                                        "Se dieron la mano",
                                        "Siguieron jugando",
                                        "Se fueron enfadados",
                                        "Bebieron agua corriendo"
                                ],
                                "correct": 0
                        }
                ]
        },
        {
                "id": 25,
                "titulo": "La visita al museo",
                "texto": "La clase fue al museo de ciencias naturales de la ciudad.\nEn la entrada había un esqueleto gigante de dinosaurio.\nLa guía les explicó cómo vivían los animales prehistóricos.\nAl final del recorrido, cada niño eligió una postal de recuerdo.",
                "preguntas": [
                        {
                                "q": "¿A qué museo fue la clase?",
                                "opts": [
                                        "Al museo de ciencias naturales",
                                        "Al museo de pintura",
                                        "Al museo del ferrocarril",
                                        "Al museo naval"
                                ],
                                "correct": 0
                        },
                        {
                                "q": "¿Qué había en la entrada del museo?",
                                "opts": [
                                        "Un esqueleto gigante de dinosaurio",
                                        "Una nave espacial",
                                        "Una estatua de piedra",
                                        "Un barco antiguo"
                                ],
                                "correct": 0
                        },
                        {
                                "q": "¿Quién explicó cómo vivían los animales?",
                                "opts": [
                                        "La guía",
                                        "El profesor",
                                        "El conserje",
                                        "Un científico"
                                ],
                                "correct": 0
                        },
                        {
                                "q": "¿Qué eligió cada niño al final del recorrido?",
                                "opts": [
                                        "Una postal de recuerdo",
                                        "Una pegatina",
                                        "Un lápiz de colores",
                                        "Un fósil pequeño"
                                ],
                                "correct": 0
                        }
                ]
        },
        {
                "id": 26,
                "titulo": "La tarde de cine",
                "texto": "El sábado por la tarde, Irene fue al cine con sus primos.\nVieron una película de dibujos animados sobre animales de la selva.\nComieron palomitas recién hechas y bebieron agua fresca.\nAl salir del cine, Irene contó su parte favorita de la película.",
                "preguntas": [
                        {
                                "q": "¿Con quién fue Irene al cine?",
                                "opts": [
                                        "Con sus primos",
                                        "Con sus padres",
                                        "Con sus tíos",
                                        "Con su mejor amiga"
                                ],
                                "correct": 0
                        },
                        {
                                "q": "¿Sobre qué era la película que vieron?",
                                "opts": [
                                        "Sobre animales de la selva",
                                        "Sobre superhéroes",
                                        "Sobre naves espaciales",
                                        "Sobre carreras de coches"
                                ],
                                "correct": 0
                        },
                        {
                                "q": "¿Qué comieron durante la película?",
                                "opts": [
                                        "Palomitas recién hechas",
                                        "Golosinas",
                                        "Patatas fritas",
                                        "Galletas de chocolate"
                                ],
                                "correct": 0
                        },
                        {
                                "q": "¿Qué hizo Irene al salir del cine?",
                                "opts": [
                                        "Contó su parte favorita",
                                        "Se fue a dormir",
                                        "Compró un juguete",
                                        "Se despidió corriendo"
                                ],
                                "correct": 0
                        }
                ]
        },
        {
                "id": 27,
                "titulo": "El huerto escolar",
                "texto": "En el colegio han creado un huerto en una esquina del patio.\nLos alumnos de primaria plantaron semillas de lechuga y rabanitos.\nCada día de la semana, dos alumnos se encargan de regar los surcos.\nPronto las hojas verdes empezaron a asomar entre la tierra.",
                "preguntas": [
                        {
                                "q": "¿Dónde está el huerto del colegio?",
                                "opts": [
                                        "En una esquina del patio",
                                        "En la entrada principal",
                                        "Junto al gimnasio",
                                        "Detrás de las aulas"
                                ],
                                "correct": 0
                        },
                        {
                                "q": "¿Qué semillas plantaron los alumnos?",
                                "opts": [
                                        "De lechuga y rabanitos",
                                        "De tomates y pimientos",
                                        "De flores rojas",
                                        "De calabazas grandes"
                                ],
                                "correct": 0
                        },
                        {
                                "q": "¿Cuántos alumnos riegan los surcos cada día?",
                                "opts": [
                                        "Dos alumnos",
                                        "Cuatro alumnos",
                                        "Toda la clase",
                                        "Un solo alumno"
                                ],
                                "correct": 0
                        },
                        {
                                "q": "¿Qué empezó a asomar entre la tierra?",
                                "opts": [
                                        "Hojas verdes",
                                        "Flores amarillas",
                                        "Piedrecitas",
                                        "Tallos secos"
                                ],
                                "correct": 0
                        }
                ]
        },
        {
                "id": 28,
                "titulo": "El estuche nuevo",
                "texto": "Para su primer día de clase, Javier estrenó un estuche azul.\nDentro guardó tres lápices con punta, una goma blanca y una regla.\nSu abuela le regaló además un sacapuntas con depósito verde.\nJavier colocó su nombre en una pegatina sobre la tapa del estuche.",
                "preguntas": [
                        {
                                "q": "¿De qué color es el estuche nuevo de Javier?",
                                "opts": [
                                        "Azul",
                                        "Rojo",
                                        "Verde",
                                        "Negro"
                                ],
                                "correct": 0
                        },
                        {
                                "q": "¿De qué color es la goma que guardó dentro?",
                                "opts": [
                                        "Blanca",
                                        "Rosa",
                                        "Azul",
                                        "Amarilla"
                                ],
                                "correct": 0
                        },
                        {
                                "q": "¿Quién le regaló el sacapuntas con depósito?",
                                "opts": [
                                        "Su abuela",
                                        "Su madre",
                                        "Su tía",
                                        "Su primo"
                                ],
                                "correct": 0
                        },
                        {
                                "q": "¿Qué colocó Javier sobre la tapa del estuche?",
                                "opts": [
                                        "Su nombre en una pegatina",
                                        "Un dibujo de un coche",
                                        "Una foto pequeña",
                                        "Una estrella dorada"
                                ],
                                "correct": 0
                        }
                ]
        },
        {
                "id": 29,
                "titulo": "La visita al parque de atracciones",
                "texto": "El domingo, Clara visitó el parque de atracciones con su familia.\nSubió a la noria gigante y vio toda la ciudad desde arriba.\nTambién montó en los caballitos del tiovivo con su hermano pequeño.\nAntes de marcharse, tomaron un delicioso helado de fresa.",
                "preguntas": [
                        {
                                "q": "¿A qué atracción subió Clara para ver la ciudad?",
                                "opts": [
                                        "A la noria gigante",
                                        "A la montaña rusa",
                                        "A los coches de choque",
                                        "Al barco pirata"
                                ],
                                "correct": 0
                        },
                        {
                                "q": "¿Con quién montó en los caballitos del tiovivo?",
                                "opts": [
                                        "Con su hermano pequeño",
                                        "Con su padre",
                                        "Con su prima",
                                        "Con su madre"
                                ],
                                "correct": 0
                        },
                        {
                                "q": "¿De qué sabor era el helado que tomaron?",
                                "opts": [
                                        "De fresa",
                                        "De chocolate",
                                        "De vainilla",
                                        "De limón"
                                ],
                                "correct": 0
                        },
                        {
                                "q": "¿Qué día visitó el parque de atracciones?",
                                "opts": [
                                        "El domingo",
                                        "El sábado",
                                        "El viernes",
                                        "El martes"
                                ],
                                "correct": 0
                        }
                ]
        },
        {
                "id": 30,
                "titulo": "El pajarito de la ventana",
                "texto": "Cada mañana, un pajarito pardal se posa en la ventana de Alba.\nAlba le deja unas miguitas de pan tierno en el alféizar de piedra.\nEl pajarito come despacio y luego canta una melodía alegre.\nAlba sonríe y le dice adiós con la mano antes de ponerse la mochila.",
                "preguntas": [
                        {
                                "q": "¿Dónde se posa el pajarito cada mañana?",
                                "opts": [
                                        "En la ventana de Alba",
                                        "En el balcón del vecino",
                                        "En la barandilla de la escalera",
                                        "En el tejado"
                                ],
                                "correct": 0
                        },
                        {
                                "q": "¿Qué comida le deja Alba en el alféizar?",
                                "opts": [
                                        "Miguitas de pan tierno",
                                        "Semillas de manzana",
                                        "Trozos de queso",
                                        "Granos de arroz"
                                ],
                                "correct": 0
                        },
                        {
                                "q": "¿Qué hace el pajarito después de comer?",
                                "opts": [
                                        "Canta una melodía alegre",
                                        "Se duerme al sol",
                                        "Se limpia las alas",
                                        "Bebe un poco de agua"
                                ],
                                "correct": 0
                        },
                        {
                                "q": "¿Cómo se despide Alba del pajarito?",
                                "opts": [
                                        "Con la mano",
                                        "Dando una palmada",
                                        "Diciéndole un silbido",
                                        "Cerrando la ventana"
                                ],
                                "correct": 0
                        }
                ]
        },
        {
                "id": 31,
                "titulo": "El telescopio de Mario",
                "texto": "Mario recibió un telescopio pequeño por su cumpleaños.\nPor la noche subió a la terraza con su padre a mirar el cielo.\nVieron la luna llena muy brillante y con muchos cráteres.\nMario apuntó en su libreta tres estrellas que titilaban con fuerza.",
                "preguntas": [
                        {
                                "q": "¿Qué recibió Mario por su cumpleaños?",
                                "opts": [
                                        "Un telescopio pequeño",
                                        "Un microscopio",
                                        "Unos prismáticos",
                                        "Un libro de astronomía"
                                ],
                                "correct": 0
                        },
                        {
                                "q": "¿Adónde subió por la noche?",
                                "opts": [
                                        "A la terraza con su padre",
                                        "Al tejado con su hermano",
                                        "Al parque del barrio",
                                        "Al balcón de su casa"
                                ],
                                "correct": 0
                        },
                        {
                                "q": "¿Cómo era la luna que vieron?",
                                "opts": [
                                        "Llena y con cráteres",
                                        "Nueva y oscura",
                                        "Media luna roja",
                                        "Tapada por la niebla"
                                ],
                                "correct": 0
                        },
                        {
                                "q": "¿Qué apuntó Mario en su libreta?",
                                "opts": [
                                        "Tres estrellas brillantes",
                                        "La hora exacta",
                                        "El dibujo de un planeta",
                                        "Un deseo secreto"
                                ],
                                "correct": 0
                        }
                ]
        },
        {
                "id": 32,
                "titulo": "La receta de galletas",
                "texto": "El sábado por la mañana, Elena hizo galletas con su abuela.\nMezclaron harina, azúcar, mantequilla y chispas de chocolate.\nElena usó un molde con forma de estrella para cortar la masa.\nCuando salieron del horno, olían de maravilla.",
                "preguntas": [
                        {
                                "q": "¿Con quién hizo galletas Elena?",
                                "opts": [
                                        "Con su abuela",
                                        "Con su madre",
                                        "Con su tía",
                                        "Con su prima"
                                ],
                                "correct": 0
                        },
                        {
                                "q": "¿Qué tipo de chispas le añadieron a la masa?",
                                "opts": [
                                        "De chocolate",
                                        "De colores",
                                        "De fresa",
                                        "De vainilla"
                                ],
                                "correct": 0
                        },
                        {
                                "q": "¿Qué forma tenía el molde que usó Elena?",
                                "opts": [
                                        "De estrella",
                                        "De corazón",
                                        "De flor",
                                        "De luna"
                                ],
                                "correct": 0
                        },
                        {
                                "q": "¿Cuándo hicieron las galletas?",
                                "opts": [
                                        "El sábado por la mañana",
                                        "El domingo por la tarde",
                                        "El viernes por la noche",
                                        "Un lunes festivo"
                                ],
                                "correct": 0
                        }
                ]
        },
        {
                "id": 33,
                "titulo": "El gato curioso",
                "texto": "Micho es un gato negro con patitas blancas.\nVio una caja de cartón grande en medio del pasillo.\nPrimero la olió con cuidado y luego se metió dentro de un salto.\nSe acurrucó allí y se quedó profundamente dormido.",
                "preguntas": [
                        {
                                "q": "¿De qué color son las patitas de Micho?",
                                "opts": [
                                        "Blancas",
                                        "Negras",
                                        "Marrones",
                                        "Grises"
                                ],
                                "correct": 0
                        },
                        {
                                "q": "¿Qué vio Micho en el pasillo?",
                                "opts": [
                                        "Una caja de cartón grande",
                                        "Una pelota de lana",
                                        "Un ratón de peluche",
                                        "Un cesto de ropa"
                                ],
                                "correct": 0
                        },
                        {
                                "q": "¿Qué hizo Micho antes de meterse dentro?",
                                "opts": [
                                        "La olió con cuidado",
                                        "La arañó con las uñas",
                                        "La empujó con la pata",
                                        "Maulló muy fuerte"
                                ],
                                "correct": 0
                        },
                        {
                                "q": "¿Qué hizo el gato una vez dentro de la caja?",
                                "opts": [
                                        "Se quedó dormido",
                                        "Empezó a saltar",
                                        "Salió corriendo",
                                        "Jugó con una cuerda"
                                ],
                                "correct": 0
                        }
                ]
        },
        {
                "id": 34,
                "titulo": "El día de piscina",
                "texto": "Hacía mucho calor y Pablo fue a la piscina municipal.\nSe puso sus manguitos amarillos y su bañador azul.\nSu monitora le enseñó a meter la cabeza bajo el agua y soplar burbujas.\nPablo estaba muy orgulloso porque ya no tenía miedo.",
                "preguntas": [
                        {
                                "q": "¿De qué color eran los manguitos de Pablo?",
                                "opts": [
                                        "Amarillos",
                                        "Rojos",
                                        "Verdes",
                                        "Naranjas"
                                ],
                                "correct": 0
                        },
                        {
                                "q": "¿Adónde fue Pablo porque hacía calor?",
                                "opts": [
                                        "A la piscina municipal",
                                        "Al río del pueblo",
                                        "A la playa",
                                        "Al parque de agua"
                                ],
                                "correct": 0
                        },
                        {
                                "q": "¿Qué le enseñó su monitora?",
                                "opts": [
                                        "A meter la cabeza y soplar burbujas",
                                        "A tirarse de cabeza",
                                        "A nadar como un delfín",
                                        "A flotar boca arriba"
                                ],
                                "correct": 0
                        },
                        {
                                "q": "¿Cómo se sentía Pablo al final de la clase?",
                                "opts": [
                                        "Muy orgulloso",
                                        "Muy cansado",
                                        "Asustado",
                                        "Aburrido"
                                ],
                                "correct": 0
                        }
                ]
        },
        {
                "id": 35,
                "titulo": "La cometa de papel",
                "texto": "Raúl construyó una cometa con papel de seda rojo y dos palitos.\nLe ató una cola larga con lazos de colores.\nFue a una colina donde soplaba una brisa constante.\nLa cometa bailaba en el aire al compás del viento.",
                "preguntas": [
                        {
                                "q": "¿De qué material era la cometa de Raúl?",
                                "opts": [
                                        "De papel de seda rojo",
                                        "De plástico transparente",
                                        "De tela blanca",
                                        "De cartón fino"
                                ],
                                "correct": 0
                        },
                        {
                                "q": "¿Qué le puso en la cola?",
                                "opts": [
                                        "Lazos de colores",
                                        "Trozos de lana",
                                        "Campanitas",
                                        "Tiras de tela negra"
                                ],
                                "correct": 0
                        },
                        {
                                "q": "¿Dónde fue a volar la cometa?",
                                "opts": [
                                        "A una colina",
                                        "A la playa",
                                        "Al patio de su casa",
                                        "A la plaza del pueblo"
                                ],
                                "correct": 0
                        },
                        {
                                "q": "¿Qué hacía la cometa en el aire?",
                                "opts": [
                                        "Bailaba al compás del viento",
                                        "Daba vueltas sin parar",
                                        "Cayó en picado",
                                        "Se quedó quieta"
                                ],
                                "correct": 0
                        }
                ]
        },
        {
                "id": 36,
                "titulo": "El concurso de dibujo",
                "texto": "En el colegio se celebró un concurso de dibujo sobre la naturaleza.\nLaura pintó un campo verde con flores rojas y un arcoíris.\nEl jurado eligió su dibujo como el más alegre de todos.\nLaura recibió como premio una bonita caja de témperas.",
                "preguntas": [
                        {
                                "q": "¿Sobre qué tema era el concurso de dibujo?",
                                "opts": [
                                        "Sobre la naturaleza",
                                        "Sobre los animales marinos",
                                        "Sobre el espacio exterior",
                                        "Sobre los cuentos de hadas"
                                ],
                                "correct": 0
                        },
                        {
                                "q": "¿Qué elementos pintó Laura?",
                                "opts": [
                                        "Un campo con flores y un arcoíris",
                                        "Un bosque con animales",
                                        "Una montaña con nieve",
                                        "Un río con barquitos"
                                ],
                                "correct": 0
                        },
                        {
                                "q": "¿Por qué eligieron su dibujo?",
                                "opts": [
                                        "Porque era el más alegre",
                                        "Porque era el más grande",
                                        "Porque tenía más colores",
                                        "Porque fue el primero en entregarse"
                                ],
                                "correct": 0
                        },
                        {
                                "q": "¿Cuál fue el premio que recibió Laura?",
                                "opts": [
                                        "Una caja de témperas",
                                        "Un estuche nuevo",
                                        "Un libro de cuentos",
                                        "Una medalla de oro"
                                ],
                                "correct": 0
                        }
                ]
        },
        {
                "id": 37,
                "titulo": "El cachorro de la vecina",
                "texto": "La vecina de Carmen adoptó un cachorro de color canela.\nEl perrito se llama Toby y tiene las orejas caídas.\nCarmen va cada tarde a jugar con él al patio.\nToby ya ha aprendido a dar la patita cuando le ofrecen una galleta.",
                "preguntas": [
                        {
                                "q": "¿Cómo se llama el cachorro de la vecina?",
                                "opts": [
                                        "Toby",
                                        "Rocky",
                                        "Max",
                                        "Bruno"
                                ],
                                "correct": 0
                        },
                        {
                                "q": "¿De qué color es el cachorro?",
                                "opts": [
                                        "Canela",
                                        "Negro",
                                        "Blanco",
                                        "Gris"
                                ],
                                "correct": 0
                        },
                        {
                                "q": "¿Cómo tiene las orejas Toby?",
                                "opts": [
                                        "Caídas",
                                        "Puntiagudas",
                                        "Cortas",
                                        "Una levantada y otra no"
                                ],
                                "correct": 0
                        },
                        {
                                "q": "¿Qué truco ha aprendido a hacer Toby?",
                                "opts": [
                                        "A dar la patita",
                                        "A rodar por el suelo",
                                        "A traer la pelota",
                                        "A ladrar al aviso"
                                ],
                                "correct": 0
                        }
                ]
        },
        {
                "id": 38,
                "titulo": "El día del árbol",
                "texto": "En primavera, los alumnos celebraron el día del árbol.\nCada clase plantó un pequeño árbol en el parque municipal.\nLa clase de segundo plantó un castaño joven.\nTodos se turnaron para echar tierra con palas y regarlo con agua.",
                "preguntas": [
                        {
                                "q": "¿En qué estación celebraron el día del árbol?",
                                "opts": [
                                        "En primavera",
                                        "En otoño",
                                        "En invierno",
                                        "En verano"
                                ],
                                "correct": 0
                        },
                        {
                                "q": "¿Dónde plantaron los árboles?",
                                "opts": [
                                        "En el parque municipal",
                                        "En el patio del colegio",
                                        "En el bosque cercano",
                                        "Junto al río"
                                ],
                                "correct": 0
                        },
                        {
                                "q": "¿Qué tipo de árbol plantó la clase de segundo?",
                                "opts": [
                                        "Un castaño joven",
                                        "Un pino",
                                        "Un roble",
                                        "Un olivo"
                                ],
                                "correct": 0
                        },
                        {
                                "q": "¿Con qué herramientas echaron tierra?",
                                "opts": [
                                        "Con palas",
                                        "Con las manos",
                                        "Con rastrillos",
                                        "Con carretillas"
                                ],
                                "correct": 0
                        }
                ]
        },
        {
                "id": 39,
                "titulo": "La tienda de campaña",
                "texto": "En vacaciones, Nico montó una tienda de campaña en el jardín.\nMetió su saco de dormir y una linterna de color verde.\nPor la noche escuchó el canto de los grillos entre la hierba.\nSe sintió como un auténtico explorador de la selva.",
                "preguntas": [
                        {
                                "q": "¿Dónde montó Nico la tienda de campaña?",
                                "opts": [
                                        "En el jardín",
                                        "En el salón de casa",
                                        "En el bosque",
                                        "En la terraza"
                                ],
                                "correct": 0
                        },
                        {
                                "q": "¿De qué color era la linterna de Nico?",
                                "opts": [
                                        "Verde",
                                        "Roja",
                                        "Azul",
                                        "Amarilla"
                                ],
                                "correct": 0
                        },
                        {
                                "q": "¿Qué sonido escuchó Nico por la noche?",
                                "opts": [
                                        "El canto de los grillos",
                                        "El viento en las ramas",
                                        "El ladrido de un perro",
                                        "El agua de una fuente"
                                ],
                                "correct": 0
                        },
                        {
                                "q": "¿Cómo se sintió Nico en la tienda?",
                                "opts": [
                                        "Como un auténtico explorador",
                                        "Con mucho miedo",
                                        "Cansado y con frío",
                                        "Aburrido"
                                ],
                                "correct": 0
                        }
                ]
        },
        {
                "id": 40,
                "titulo": "La feria del libro",
                "texto": "El domingo, Marina fue a la feria del libro en la alameda.\nHabía muchas casetas de madera llenas de cuentos y cómics.\nMarina eligió un libro ilustrado sobre el fondo del mar.\nEl librero le regaló un marcapáginas con dibujo de ballena.",
                "preguntas": [
                        {
                                "q": "¿Adónde fue Marina el domingo?",
                                "opts": [
                                        "A la feria del libro",
                                        "Al cine del centro",
                                        "A una librería del barrio",
                                        "A la biblioteca municipal"
                                ],
                                "correct": 0
                        },
                        {
                                "q": "¿De qué eran las casetas de la feria?",
                                "opts": [
                                        "De madera",
                                        "De tela",
                                        "De ladrillo",
                                        "De metal"
                                ],
                                "correct": 0
                        },
                        {
                                "q": "¿Sobre qué tema era el libro que eligió?",
                                "opts": [
                                        "Sobre el fondo del mar",
                                        "Sobre animales de la granja",
                                        "Sobre caballeros medievales",
                                        "Sobre dragones mágicos"
                                ],
                                "correct": 0
                        },
                        {
                                "q": "¿Qué regalo le dio el librero?",
                                "opts": [
                                        "Un marcapáginas con dibujo de ballena",
                                        "Una pegatina de pez",
                                        "Un lápiz azul",
                                        "Un póster gigante"
                                ],
                                "correct": 0
                        }
                ]
        },
        {
                "id": 41,
                "titulo": "El erizo en el jardín",
                "texto": "Una tarde de otoño, Mateo descubrió un erizo pequeño en su jardín.\nEstaba buscando bichitos entre las hojas secas de los árboles.\nTenía púas puntiagudas y una naricilla negra y húmeda.\nMateo no lo tocó para no asustarlo y le dejó una tapa con agua.",
                "preguntas": [
                        {
                                "q": "¿Qué animal descubrió Mateo en el jardín?",
                                "opts": [
                                        "Un erizo pequeño",
                                        "Un conejo gris",
                                        "Un topo negro",
                                        "Una comadreja"
                                ],
                                "correct": 0
                        },
                        {
                                "q": "¿En qué estación del año ocurrió?",
                                "opts": [
                                        "En otoño",
                                        "En primavera",
                                        "En verano",
                                        "En invierno"
                                ],
                                "correct": 0
                        },
                        {
                                "q": "¿Qué buscaba el erizo entre las hojas secas?",
                                "opts": [
                                        "Bichitos",
                                        "Frutos caídos",
                                        "Hierba fresca",
                                        "Un refugio para dormir"
                                ],
                                "correct": 0
                        },
                        {
                                "q": "¿Qué le dejó Mateo al animal?",
                                "opts": [
                                        "Una tapa con agua",
                                        "Un trozo de queso",
                                        "Un poco de leche",
                                        "Migas de pan"
                                ],
                                "correct": 0
                        }
                ]
        },
        {
                "id": 42,
                "titulo": "La tarde de patinaje",
                "texto": "Carla estrenó sus patines en línea nuevos el sábado.\nFue a la pista del polideportivo junto con su madre.\nLlevaba rodilleras, coderas y un casco morado.\nAl principio fue despacio, pero pronto aprendió a girar sin caerse.",
                "preguntas": [
                        {
                                "q": "¿Qué estrenó Carla el sábado?",
                                "opts": [
                                        "Sus patines en línea nuevos",
                                        "Una bicicleta de montaña",
                                        "Un patinete eléctrico",
                                        "Unas zapatillas con ruedas"
                                ],
                                "correct": 0
                        },
                        {
                                "q": "¿De qué color era el casco de Carla?",
                                "opts": [
                                        "Morado",
                                        "Rosa",
                                        "Blanco",
                                        "Negro"
                                ],
                                "correct": 0
                        },
                        {
                                "q": "¿Adónde fue a patinar?",
                                "opts": [
                                        "A la pista del polideportivo",
                                        "Al parque de su barrio",
                                        "A la acera de su calle",
                                        "A la plaza mayor"
                                ],
                                "correct": 0
                        },
                        {
                                "q": "¿Qué aprendió a hacer sin caerse?",
                                "opts": [
                                        "A girar",
                                        "A saltar obstáculos",
                                        "A frenar de golpe",
                                        "A patinar hacia atrás"
                                ],
                                "correct": 0
                        }
                ]
        },
        {
                "id": 43,
                "titulo": "El muñeco de trapo",
                "texto": "La abuela de Lucía cose muñecos con retales de tela.\nEsta semana le ha hecho a Lucía un osito de peluche muy suave.\nLe puso dos botones negros como ojos y una bufanda de lana roja.\nLucía duerme cada noche abrazada a su nuevo osito.",
                "preguntas": [
                        {
                                "q": "¿Quién cose los muñecos de trapo?",
                                "opts": [
                                        "La abuela de Lucía",
                                        "La madre de Lucía",
                                        "Lucía misma",
                                        "Su tía Rosa"
                                ],
                                "correct": 0
                        },
                        {
                                "q": "¿Qué animal de peluche le hizo a Lucía?",
                                "opts": [
                                        "Un osito",
                                        "Un perrito",
                                        "Un gatito",
                                        "Un conejito"
                                ],
                                "correct": 0
                        },
                        {
                                "q": "¿Qué usó la abuela para los ojos del muñeco?",
                                "opts": [
                                        "Dos botones negros",
                                        "Dos cuentas de cristal",
                                        "Bordados con hilo",
                                        "Ojos de plástico"
                                ],
                                "correct": 0
                        },
                        {
                                "q": "¿Qué lleva puesto el osito en el cuello?",
                                "opts": [
                                        "Una bufanda de lana roja",
                                        "Un lazo azul",
                                        "Un cascabel dorado",
                                        "Un pañuelo a cuadros"
                                ],
                                "correct": 0
                        }
                ]
        },
        {
                "id": 44,
                "titulo": "El tren de madera",
                "texto": "Héctor montó un circuito de tren de madera en el suelo de su cuarto.\nColocó una estación pequeña, un puente rojo y varios árboles.\nEl tren tenía una locomotora azul y tres vagones cargados de bloques.\nHéctor hizo sonar el silbato de juguete al pasar por el túnel.",
                "preguntas": [
                        {
                                "q": "¿De qué material era el circuito de tren de Héctor?",
                                "opts": [
                                        "De madera",
                                        "De plástico",
                                        "De metal",
                                        "De cartón"
                                ],
                                "correct": 0
                        },
                        {
                                "q": "¿De qué color era el puente del circuito?",
                                "opts": [
                                        "Rojo",
                                        "Azul",
                                        "Amarillo",
                                        "Verde"
                                ],
                                "correct": 0
                        },
                        {
                                "q": "¿Cuántos vagones llevaba la locomotora?",
                                "opts": [
                                        "Tres vagones",
                                        "Dos vagones",
                                        "Cuatro vagones",
                                        "Un vagón"
                                ],
                                "correct": 0
                        },
                        {
                                "q": "¿Qué hizo sonar Héctor al pasar por el túnel?",
                                "opts": [
                                        "Un silbato de juguete",
                                        "Una campanita",
                                        "Una bocina",
                                        "Un tambor"
                                ],
                                "correct": 0
                        }
                ]
        },
        {
                "id": 45,
                "titulo": "Las flores del balcón",
                "texto": "Daniela cuida las plantas del balcón con mucho cariño.\nTiene tiestos con geranios de color rojo y blanco.\nCada dos días los riega con una pequeña regadera verde.\nCuando florecen, las abejas y mariposas visitan su balcón.",
                "preguntas": [
                        {
                                "q": "¿Dónde tiene Daniela sus plantas?",
                                "opts": [
                                        "En el balcón",
                                        "En el jardín",
                                        "En la cocina",
                                        "En la azotea"
                                ],
                                "correct": 0
                        },
                        {
                                "q": "¿Qué tipo de flores tiene Daniela?",
                                "opts": [
                                        "Geranios",
                                        "Rosas",
                                        "Margaritas",
                                        "Tulipanes"
                                ],
                                "correct": 0
                        },
                        {
                                "q": "¿De qué color es su pequeña regadera?",
                                "opts": [
                                        "Verde",
                                        "Azul",
                                        "Roja",
                                        "Amarilla"
                                ],
                                "correct": 0
                        },
                        {
                                "q": "¿Qué animales visitan el balcón cuando florecen?",
                                "opts": [
                                        "Abejas y mariposas",
                                        "Pájaros y ardillas",
                                        "Gatos del vecindario",
                                        "Mariquitas y grillos"
                                ],
                                "correct": 0
                        }
                ]
        },
        {
                "id": 46,
                "titulo": "El circo en la ciudad",
                "texto": "El circo de las estrellas llegó a la ciudad el fin de semana.\nTenía una gran carpa de rayas rojas y blancas.\nLos payasos hicieron reír a todos con sus zapatones gigantes.\nAl final, los malabaristas lanzaron aros luminosos al aire.",
                "preguntas": [
                        {
                                "q": "¿De qué colores eran las rayas de la carpa del circo?",
                                "opts": [
                                        "Rojas y blancas",
                                        "Azules y amarillas",
                                        "Verdes y blancas",
                                        "Moradas y doradas"
                                ],
                                "correct": 0
                        },
                        {
                                "q": "¿Qué hicieron los payasos en el circo?",
                                "opts": [
                                        "Hicieron reír a todos",
                                        "Cantaron una ópera",
                                        "Tocaron la batería",
                                        "Hicieron trucos de magia"
                                ],
                                "correct": 0
                        },
                        {
                                "q": "¿Qué llevaban puesto los payasos?",
                                "opts": [
                                        "Zapatones gigantes",
                                        "Gorros con flores",
                                        "Narices cuadradas",
                                        "Trajes brillantes"
                                ],
                                "correct": 0
                        },
                        {
                                "q": "¿Qué lanzaron los malabaristas al aire al final?",
                                "opts": [
                                        "Aros luminosos",
                                        "Pelotas de fuego",
                                        "Cintas de seda",
                                        "Platos de porcelana"
                                ],
                                "correct": 0
                        }
                ]
        },
        {
                "id": 47,
                "titulo": "El arcoíris después de la tormenta",
                "texto": "Por la tarde cayó un fuerte chaparrón con truenos.\nAl cabo de un rato dejó de llover y salió un sol resplandeciente.\nEn el cielo apareció un arcoíris con siete colores brillantes.\nTodos los niños salieron a las ventanas a contemplarlo maravillados.",
                "preguntas": [
                        {
                                "q": "¿Qué tiempo hizo al principio de la tarde?",
                                "opts": [
                                        "Un fuerte chaparrón con truenos",
                                        "Una nevada copiosa",
                                        "Mucho viento sin lluvia",
                                        "Una densa niebla"
                                ],
                                "correct": 0
                        },
                        {
                                "q": "¿Qué apareció en el cielo al salir el sol?",
                                "opts": [
                                        "Un arcoíris de siete colores",
                                        "Una nube con forma de corazón",
                                        "Una bandada de pájaros",
                                        "Un globo aerostático"
                                ],
                                "correct": 0
                        },
                        {
                                "q": "¿Cuántos colores tiene el arcoíris?",
                                "opts": [
                                        "Siete colores",
                                        "Cinco colores",
                                        "Diez colores",
                                        "Cuatro colores"
                                ],
                                "correct": 0
                        },
                        {
                                "q": "¿Qué hicieron los niños al verlo?",
                                "opts": [
                                        "Salieron a las ventanas a contemplarlo",
                                        "Se fueron a dormir",
                                        "Salieron corriendo a la calle",
                                        "Dibujaron un mapa"
                                ],
                                "correct": 0
                        }
                ]
        },
        {
                "id": 48,
                "titulo": "El desayuno del domingo",
                "texto": "Los domingos por la mañana, la familia de Rubén desayuna junta.\nEl padre de Rubén cocina tortitas calientes en la sartén.\nRubén les pone miel de flores y unas rodajas de plátano.\nDesayunan despacio mientras charlan sobre los planes del día.",
                "preguntas": [
                        {
                                "q": "¿Qué día desayuna junta la familia de Rubén?",
                                "opts": [
                                        "Los domingos",
                                        "Los sábados",
                                        "Los viernes",
                                        "Todos los días laborables"
                                ],
                                "correct": 0
                        },
                        {
                                "q": "¿Qué prepara el padre de Rubén?",
                                "opts": [
                                        "Tortitas calientes",
                                        "Churros con chocolate",
                                        "Tostadas de mantequilla",
                                        "Huevos revueltos"
                                ],
                                "correct": 0
                        },
                        {
                                "q": "¿Qué le pone Rubén a las tortitas?",
                                "opts": [
                                        "Miel de flores y plátano",
                                        "Sirope de fresa y nata",
                                        "Chocolate fundido",
                                        "Azúcar glas y canela"
                                ],
                                "correct": 0
                        },
                        {
                                "q": "¿De qué hablan mientras desayunan?",
                                "opts": [
                                        "De los planes del día",
                                        "De las notas del colegio",
                                        "Del tiempo que hace fuera",
                                        "De las noticias de la tele"
                                ],
                                "correct": 0
                        }
                ]
        },
        {
                "id": 49,
                "titulo": "El fósil en la montaña",
                "texto": "Adrián fue de excursión a la montaña con sus tíos.\nMientras caminaban por un sendero de piedras, vio una roca curiosa.\nAl mirarla de cerca, descubrió la marca de una caracola petrificada.\nSu tío le explicó que hace millones de años allí había mar.",
                "preguntas": [
                        {
                                "q": "¿Adónde fue Adrián de excursión?",
                                "opts": [
                                        "A la montaña",
                                        "A la playa",
                                        "A unas cuevas",
                                        "A un volcán"
                                ],
                                "correct": 0
                        },
                        {
                                "q": "¿Qué descubrió Adrián en la roca?",
                                "opts": [
                                        "La marca de una caracola petrificada",
                                        "Una huella de dinosaurio",
                                        "Un trozo de cuarzo blanco",
                                        "Una punta de flecha"
                                ],
                                "correct": 0
                        },
                        {
                                "q": "¿Quién le explicó el origen del fósil?",
                                "opts": [
                                        "Su tío",
                                        "Su padre",
                                        "Un guarda forestal",
                                        "Su prima mayor"
                                ],
                                "correct": 0
                        },
                        {
                                "q": "¿Qué había allí hace millones de años?",
                                "opts": [
                                        "Mar",
                                        "Un bosque de robles",
                                        "Un gran glaciar",
                                        "Un desierto de arena"
                                ],
                                "correct": 0
                        }
                ]
        },
        {
                "id": 50,
                "titulo": "La carrera de sacos",
                "texto": "En el festival de primavera del colegio hubo juegos populares.\nSara se apuntó a la carrera de sacos con sus compañeros.\nSe metió dentro de un saco de tela grande y saltó con todas sus fuerzas.\nCruzó la meta en segundo lugar y recibió un fuerte aplauso.",
                "preguntas": [
                        {
                                "q": "¿En qué juego popular participó Sara?",
                                "opts": [
                                        "En la carrera de sacos",
                                        "En el pañuelo",
                                        "En la comba",
                                        "En el juego de las sillas"
                                ],
                                "correct": 0
                        },
                        {
                                "q": "¿En qué fiesta del colegio se celebró?",
                                "opts": [
                                        "En el festival de primavera",
                                        "En el día de la paz",
                                        "En carnaval",
                                        "En la fiesta de Navidad"
                                ],
                                "correct": 0
                        },
                        {
                                "q": "¿En qué puesto cruzó la meta?",
                                "opts": [
                                        "En segundo lugar",
                                        "En primer lugar",
                                        "En tercer lugar",
                                        "En cuarto lugar"
                                ],
                                "correct": 0
                        },
                        {
                                "q": "¿Cómo celebró el público su llegada?",
                                "opts": [
                                        "Con un fuerte aplauso",
                                        "Con una canción",
                                        "Tirando serpentinas",
                                        "Tocando tambores"
                                ],
                                "correct": 0
                        }
                ]
        },
        {
                "id": 51,
                "titulo": "El barco de papel",
                "texto": "Después de llover, Gonzalo hizo un barquito con una hoja de papel azul.\nFue con sus botas de agua hasta un gran charco en el parque.\nPuso el barquito sobre el agua y sopló suavemente para que navegara.\nEl barquito cruzó el charco de un lado al otro sin hundirse.",
                "preguntas": [
                        {
                                "q": "¿De qué color era el papel del barquito de Gonzalo?",
                                "opts": [
                                        "Azul",
                                        "Blanco",
                                        "Rojo",
                                        "Amarillo"
                                ],
                                "correct": 0
                        },
                        {
                                "q": "¿Dónde puso a navegar el barco?",
                                "opts": [
                                        "En un gran charco en el parque",
                                        "En una fuente de la plaza",
                                        "En la bañera de casa",
                                        "En un cubo con agua"
                                ],
                                "correct": 0
                        },
                        {
                                "q": "¿Qué hizo Gonzalo para que el barquito avanzara?",
                                "opts": [
                                        "Sopló suavemente",
                                        "Lo empujó con un palito",
                                        "Tiró una piedrecita",
                                        "Movió el agua con la mano"
                                ],
                                "correct": 0
                        },
                        {
                                "q": "¿Qué calzado llevaba puesto Gonzalo?",
                                "opts": [
                                        "Botas de agua",
                                        "Zapatillas de deporte",
                                        "Botas de montaña",
                                        "Sandalias"
                                ],
                                "correct": 0
                        }
                ]
        },
        {
                "id": 52,
                "titulo": "La visita al acuario",
                "texto": "La familia de Natalia pasó el sábado en el acuario de la costa.\nCaminaron por un túnel de cristal rodeados de peces y tiburones.\nNatalia se quedó maravillada al ver una mantarraya gigante pasar sobre su cabeza.\nEn la tienda compró un peluche pequeño con forma de foca.",
                "preguntas": [
                        {
                                "q": "¿Dónde pasó el sábado la familia de Natalia?",
                                "opts": [
                                        "En el acuario de la costa",
                                        "En el zoológico",
                                        "En el museo marítimo",
                                        "En un barco de recreo"
                                ],
                                "correct": 0
                        },
                        {
                                "q": "¿Por dónde caminaron para ver los peces?",
                                "opts": [
                                        "Por un túnel de cristal",
                                        "Por una pasarela de madera",
                                        "Por una barca con fondo transparente",
                                        "Por una cueva oscura"
                                ],
                                "correct": 0
                        },
                        {
                                "q": "¿Qué animal gigante pasó sobre la cabeza de Natalia?",
                                "opts": [
                                        "Una mantarraya",
                                        "Un tiburón blanco",
                                        "Una ballena azul",
                                        "Una tortuga marina"
                                ],
                                "correct": 0
                        },
                        {
                                "q": "¿De qué animal era el peluche que compró?",
                                "opts": [
                                        "De foca",
                                        "De delfín",
                                        "De pingüino",
                                        "De caballito de mar"
                                ],
                                "correct": 0
                        }
                ]
        },
        {
                "id": 53,
                "titulo": "El reloj de cuco",
                "texto": "En el salón de la casa de los abuelos de Iván hay un reloj de cuco.\nEstá hecho de madera tallada con hojas y ardillas.\nCada vez que llega una hora en punto, una puertecita se abre.\nSale un pajarito de madera que canta '¡cu-cú!' tantas veces como horas son.",
                "preguntas": [
                        {
                                "q": "¿En qué casa está el reloj de cuco?",
                                "opts": [
                                        "En la casa de los abuelos de Iván",
                                        "En casa de Iván",
                                        "En la casa de su tía",
                                        "En el colegio"
                                ],
                                "correct": 0
                        },
                        {
                                "q": "¿De qué material está hecho el reloj?",
                                "opts": [
                                        "De madera tallada",
                                        "De metal plateado",
                                        "De mármol blanco",
                                        "De plástico barnizado"
                                ],
                                "correct": 0
                        },
                        {
                                "q": "¿Qué animal sale por la puertecita?",
                                "opts": [
                                        "Un pajarito de madera",
                                        "Un ratón",
                                        "Un gatito",
                                        "Una ardilla"
                                ],
                                "correct": 0
                        },
                        {
                                "q": "¿Cuándo se abre la puertecita del reloj?",
                                "opts": [
                                        "Cada hora en punto",
                                        "Cada media hora",
                                        "Solo al mediodía",
                                        "A las ocho de la mañana"
                                ],
                                "correct": 0
                        }
                ]
        },
        {
                "id": 54,
                "titulo": "La casa del árbol",
                "texto": "Los primos de Samuel construyeron una cabaña en un roble viejo.\nUsaron tablones de madera pulida y una escalera de cuerda firme.\nDentro pusieron unos cojines mullidos y una pequeña mesa.\nAllí arriba leen tebeos y observan los pájaros con unos prismáticos.",
                "preguntas": [
                        {
                                "q": "¿En qué tipo de árbol construyeron la cabaña?",
                                "opts": [
                                        "En un roble viejo",
                                        "En un pino alto",
                                        "En un nogal",
                                        "En un castaño"
                                ],
                                "correct": 0
                        },
                        {
                                "q": "¿Cómo suben a la cabaña?",
                                "opts": [
                                        "Por una escalera de cuerda",
                                        "Por una rampa de madera",
                                        "Por una escalera de mano fija",
                                        "Trepando por las ramas"
                                ],
                                "correct": 0
                        },
                        {
                                "q": "¿Qué tienen dentro de la cabaña?",
                                "opts": [
                                        "Cojines mullidos y una pequeña mesa",
                                        "Una cama y un armario",
                                        "Una tienda de campaña",
                                        "Una estantería de libros"
                                ],
                                "correct": 0
                        },
                        {
                                "q": "¿Con qué observan los pájaros desde arriba?",
                                "opts": [
                                        "Con unos prismáticos",
                                        "Con una lupa",
                                        "Con un catalejo antiguo",
                                        "A simple vista"
                                ],
                                "correct": 0
                        }
                ]
        },
        {
                "id": 55,
                "titulo": "El día de la nieve",
                "texto": "El colegio cerró un día porque cayó una nevada récord.\nGuillermo y sus hermanas salieron a jugar con gorro y guantes térmicos.\nHicieron un iglú pequeño apilando bloques compactos de nieve.\nAl terminar, entraron en casa y su madre les sirvió chocolate caliente.",
                "preguntas": [
                        {
                                "q": "¿Por qué cerró el colegio ese día?",
                                "opts": [
                                        "Por una nevada récord",
                                        "Por una avería en la calefacción",
                                        "Por ser día festivo",
                                        "Por lluvia torrencial"
                                ],
                                "correct": 0
                        },
                        {
                                "q": "¿Qué construyeron Guillermo y sus hermanas?",
                                "opts": [
                                        "Un iglú pequeño",
                                        "Un muñeco de nieve gigante",
                                        "Un castillo con foso",
                                        "Un fuerte de hielo"
                                ],
                                "correct": 0
                        },
                        {
                                "q": "¿Qué ropa llevaban para protegerse del frío?",
                                "opts": [
                                        "Gorro y guantes térmicos",
                                        "Solo un abrigo gordo",
                                        "Bufanda y orejeras",
                                        "Botas de lana y chubasquero"
                                ],
                                "correct": 0
                        },
                        {
                                "q": "¿Qué tomaron caliente al entrar a casa?",
                                "opts": [
                                        "Chocolate caliente",
                                        "Sopa de fideos",
                                        "Taza de leche con miel",
                                        "Té con galletas"
                                ],
                                "correct": 0
                        }
                ]
        },
        {
                "id": 56,
                "titulo": "El espantapájaros del huerto",
                "texto": "El tío de Raquel colocó un espantapájaros en medio del maizal.\nTenía una camisa de cuadros viejos rellena de paja seca.\nEn la cabeza llevaba un sombrero de paja y una sonrisa dibujada con pintura.\nLos cuervos no se atrevían a acercarse al maíz tierno.",
                "preguntas": [
                        {
                                "q": "¿Dónde colocó el espantapájaros el tío de Raquel?",
                                "opts": [
                                        "En medio del maizal",
                                        "Junto al pozo de agua",
                                        "En la entrada de la granja",
                                        "Cerca del granero"
                                ],
                                "correct": 0
                        },
                        {
                                "q": "¿De qué estaba rellena la camisa?",
                                "opts": [
                                        "De paja seca",
                                        "De hojas secas",
                                        "De trapos viejos",
                                        "De lana de oveja"
                                ],
                                "correct": 0
                        },
                        {
                                "q": "¿Qué llevaba en la cabeza el espantapájaros?",
                                "opts": [
                                        "Un sombrero de paja",
                                        "Una gorra de lana",
                                        "Una boina negra",
                                        "Un pañuelo atado"
                                ],
                                "correct": 0
                        },
                        {
                                "q": "¿Qué aves no se atrevían a acercarse al maíz?",
                                "opts": [
                                        "Los cuervos",
                                        "Las palomas",
                                        "Los gorriones",
                                        "Las urracas"
                                ],
                                "correct": 0
                        }
                ]
        },
        {
                "id": 57,
                "titulo": "El nido de golondrinas",
                "texto": "En primavera, dos golondrinas hicieron su nido bajo el alero del tejado de Inés.\nVolaban una y otra vez trayendo bolitas de barro y paja en el pico.\nConstruyeron una cuna redonda muy resistente y abrigada.\nUnas semanas después, asomaban cuatro piquitos amarillos piando con alegría.",
                "preguntas": [
                        {
                                "q": "¿Qué aves hicieron el nido en el tejado de Inés?",
                                "opts": [
                                        "Golondrinas",
                                        "Cigüeñas",
                                        "Gorriones",
                                        "Palomas"
                                ],
                                "correct": 0
                        },
                        {
                                "q": "¿Qué materiales usaron para construir el nido?",
                                "opts": [
                                        "Bolitas de barro y paja",
                                        "Ramitas secas y hojas",
                                        "Musgo y plumas",
                                        "Hilos de lana y cartón"
                                ],
                                "correct": 0
                        },
                        {
                                "q": "¿Dónde colocaron exactamente el nido?",
                                "opts": [
                                        "Bajo el alero del tejado",
                                        "En la chimenea",
                                        "En la barandilla del balcón",
                                        "En una rama del jardín"
                                ],
                                "correct": 0
                        },
                        {
                                "q": "¿Cuántos piquitos amarillos asomaban semanas después?",
                                "opts": [
                                        "Cuatro piquitos",
                                        "Tres piquitos",
                                        "Dos piquitos",
                                        "Cinco piquitos"
                                ],
                                "correct": 0
                        }
                ]
        },
        {
                "id": 58,
                "titulo": "La noche de San Juan",
                "texto": "El veintitrés de junio se celebra la noche mágica de San Juan.\nLa familia de Brais fue a la playa al anochecer con toallas y mantas.\nEncendieron hogueras en la arena y cenaron sardinas asadas.\nA medianoche, Brais se mojó los pies en el mar para pedir tres deseos.",
                "preguntas": [
                        {
                                "q": "¿Qué fiesta celebraba la familia de Brais?",
                                "opts": [
                                        "La noche de San Juan",
                                        "El solsticio de invierno",
                                        "La fiesta del Carmen",
                                        "El fin de las vacaciones"
                                ],
                                "correct": 0
                        },
                        {
                                "q": "¿Dónde se reunieron para celebrar la fiesta?",
                                "opts": [
                                        "En la playa",
                                        "En la plaza del pueblo",
                                        "En el campo comunal",
                                        "En el jardín de casa"
                                ],
                                "correct": 0
                        },
                        {
                                "q": "¿Qué cenaron junto a las hogueras?",
                                "opts": [
                                        "Sardinas asadas",
                                        "Bocadillos de tortilla",
                                        "Empanada de atún",
                                        "Carne a la brasa"
                                ],
                                "correct": 0
                        },
                        {
                                "q": "¿Qué hizo Brais a medianoche para pedir deseos?",
                                "opts": [
                                        "Se mojó los pies en el mar",
                                        "Saltó sobre la hoguera",
                                        "Tiró una moneda al agua",
                                        "Miró una estrella fugaz"
                                ],
                                "correct": 0
                        }
                ]
        },
        {
                "id": 59,
                "titulo": "El taller de alfarería",
                "texto": "En una excursión cultural, la clase de Andrés visitó un taller de alfarería.\nEl maestro alfarero les enseñó a moldear arcilla húmeda en un torno giratorio.\nAndrés moldeó un cuenco redondo con sus propias manos.\nDejaron las piezas secando al sol para cocerlas luego en el horno.",
                "preguntas": [
                        {
                                "q": "¿Qué tipo de taller visitó la clase de Andrés?",
                                "opts": [
                                        "Un taller de alfarería",
                                        "Un taller de carpintería",
                                        "Un taller de pintura",
                                        "Una herrería tradicional"
                                ],
                                "correct": 0
                        },
                        {
                                "q": "¿Qué material usaron para hacer las piezas?",
                                "opts": [
                                        "Arcilla húmeda",
                                        "Plastilina de colores",
                                        "Yeso blanco",
                                        "Barro con arena"
                                ],
                                "correct": 0
                        },
                        {
                                "q": "¿Qué objeto moldeó Andrés con sus manos?",
                                "opts": [
                                        "Un cuenco redondo",
                                        "Un jarrón alto",
                                        "Un plato hondo",
                                        "Una tacita pequeña"
                                ],
                                "correct": 0
                        },
                        {
                                "q": "¿Qué máquina giratoria usaron para dar forma?",
                                "opts": [
                                        "Un torno de alfarero",
                                        "Una rueda de molino",
                                        "Una mesa giratoria simple",
                                        "Un rodillo automático"
                                ],
                                "correct": 0
                        }
                ]
        },
        {
                "id": 60,
                "titulo": "La feria de artesanía",
                "texto": "El primer sábado de mayo se montó la feria de artesanía en el bulevar.\nHabía puestos con juguetes de madera, cestas de mimbre y jabones de lavanda.\nBeatriz probó una muestra de miel de romero que le ofreció un apicultor.\nSu madre compró una flauta de bambú para que Beatriz aprendiera música.",
                "preguntas": [
                        {
                                "q": "¿Qué tipo de feria se montó en el bulevar?",
                                "opts": [
                                        "Una feria de artesanía",
                                        "Una feria del ganado",
                                        "Un mercado medieval",
                                        "Una feria de antigüedades"
                                ],
                                "correct": 0
                        },
                        {
                                "q": "¿Qué muestra probó Beatriz?",
                                "opts": [
                                        "Miel de romero",
                                        "Queso curado",
                                        "Mermelada de moras",
                                        "Pan de espelta"
                                ],
                                "correct": 0
                        },
                        {
                                "q": "¿Quién le ofreció la muestra a Beatriz?",
                                "opts": [
                                        "Un apicultor",
                                        "Un panadero",
                                        "Un granjero",
                                        "Un fabricante de jabón"
                                ],
                                "correct": 0
                        },
                        {
                                "q": "¿Qué instrumento musical le compró su madre?",
                                "opts": [
                                        "Una flauta de bambú",
                                        "Un tamboril pequeño",
                                        "Un xilófono de madera",
                                        "Una armónica de metal"
                                ],
                                "correct": 0
                        }
                ]
        }
];

    // 2. BANCO DE FRASES PARA CONTINÚA LA HISTORIA (220+ frases con huecos para rellenar en el diario)
    const INICIOS_CONTINUA_HISTORIA = [
        {
                "texto": "Luis encontró una __. Dentro había __."
        },
        {
                "texto": "El pájaro voló hasta __. Allí vio __."
        },
        {
                "texto": "Debajo de la mesa había __. Era de __."
        },
        {
                "texto": "En el bosque encontró __. Era muy __."
        },
        {
                "texto": "El caballo llegó a __. Allí encontró __."
        },
        {
                "texto": "Un hada llegó a __. Traía __."
        },
        {
                "texto": "El unicornio voló hasta __. Allí vio __."
        },
        {
                "texto": "Marta abrió la caja de __. Dentro descubrió __."
        },
        {
                "texto": "El perro corrió hacia __. Llevaba en la boca __."
        },
        {
                "texto": "En lo alto del árbol había __. Brillaba como __."
        },
        {
                "texto": "El gato saltó sobre __. De repente vio __."
        },
        {
                "texto": "Detrás de la puerta sonaba __. Parecía un __."
        },
        {
                "texto": "La niña caminó por __. Encontró un __."
        },
        {
                "texto": "El barco navegó hasta __. En la orilla esperaba __."
        },
        {
                "texto": "En el fondo del mar había __. Tenía forma de __."
        },
        {
                "texto": "El dragón voló sobre __. Desde el aire vio __."
        },
        {
                "texto": "En el cajón secreto había __. Pertenecía a __."
        },
        {
                "texto": "El tren llegó a __. De él bajó un __."
        },
        {
                "texto": "La tortuga nadó hasta __. Allí comió __."
        },
        {
                "texto": "El mago sacó de su chistera __. Se transformó en __."
        },
        {
                "texto": "En el tejado de la casa había __. Era de color __."
        },
        {
                "texto": "Lucas buscó debajo de __. Encontró una __."
        },
        {
                "texto": "El león paseaba por __. De repente escuchó __."
        },
        {
                "texto": "La mariposa se posó en __. Olía a __."
        },
        {
                "texto": "El coche paró junto a __. Alguien dejó allí __."
        },
        {
                "texto": "En la cueva oscura brillaba __. Parecía una __."
        },
        {
                "texto": "El astronauta aterrizó en __. Lo primero que vio fue __."
        },
        {
                "texto": "La princesa corrió hacia __. En sus manos llevaba __."
        },
        {
                "texto": "El pirata desenterró un __. Estaba lleno de __."
        },
        {
                "texto": "En la cesta del mercado había __. Sabía a __."
        },
        {
                "texto": "El conejo saltó dentro de __. Salió con un __."
        },
        {
                "texto": "El robot caminó hacia __. Emitía un sonido __."
        },
        {
                "texto": "En la biblioteca encontró un libro sobre __. Al abrirlo vio __."
        },
        {
                "texto": "El pez dorado nadaba en __. Cerca de él había __."
        },
        {
                "texto": "El abuelo guardaba en su bolsillo __. Servía para __."
        },
        {
                "texto": "La lechuza se posó en __. Traía una carta para __."
        },
        {
                "texto": "El río cruzaba por __. Sus aguas eran de color __."
        },
        {
                "texto": "Al levantar la piedra apareció __. Se movía muy __."
        },
        {
                "texto": "La estrella cayó sobre __. Dejó un rastro __."
        },
        {
                "texto": "El elefante caminó hasta __. Allí bebió __."
        },
        {
                "texto": "En la mochila de Sara había __. Lo necesitaba para __."
        },
        {
                "texto": "El viento sopló fuerte en __. Se llevó volando __."
        },
        {
                "texto": "El puente cruzaba hacia __. En medio había __."
        },
        {
                "texto": "La muñeca estaba sentada en __. Llevaba puesto un __."
        },
        {
                "texto": "El delfín saltó sobre __. Hizo una pirueta muy __."
        },
        {
                "texto": "En la huerta creció una __. Era tan grande como __."
        },
        {
                "texto": "El soldado llegó a __. Vio a lo lejos un __."
        },
        {
                "texto": "La llave dorada abría __. Detrás esperaba __."
        },
        {
                "texto": "El reloj sonó en __. Eran las __."
        },
        {
                "texto": "La nube blanca tenía forma de __. Flotaba sobre __."
        },
        {
                "texto": "El zorro se escondió en __. Nadie pudo ver su __."
        },
        {
                "texto": "En el armario viejo había __. Estaba cubierto de __."
        },
        {
                "texto": "La cometa voló hasta __. Se enredó en __."
        },
        {
                "texto": "El zapatero fabricó unos zapatos de __. Servían para __."
        },
        {
                "texto": "En la orilla del lago había __. Parecía un __."
        },
        {
                "texto": "El oso encontró miel en __. Estaba muy __."
        },
        {
                "texto": "La campana sonó en __. Avisaba de que venía __."
        },
        {
                "texto": "El pintor mezcló pintura de color __. Dibujó un __."
        },
        {
                "texto": "La ardilla escondió una nuez en __. La tapó con __."
        },
        {
                "texto": "El caballero levantó su escudo de __. Tenía dibujado un __."
        },
        {
                "texto": "En el patio del colegio sonó __. Todos corrieron hacia __."
        },
        {
                "texto": "La rana dio un salto hacia __. Aterrizó sobre __."
        },
        {
                "texto": "En el fondo del pozo brillaba __. Parecía de __."
        },
        {
                "texto": "El árbol del jardín daba frutos de __. Eran muy __."
        },
        {
                "texto": "El marinero miró por el catalejo hacia __. Vio aparecer un __."
        },
        {
                "texto": "La reina llevaba una corona de __. Pesaba mucho porque __."
        },
        {
                "texto": "El duende vivía dentro de __. Su casa tenía __."
        },
        {
                "texto": "El patinete de Pablo era de color __. Corría tanto como __."
        },
        {
                "texto": "En la cocina olía a __. Mamá estaba preparando __."
        },
        {
                "texto": "El avión despegó hacia __. Volaba por encima de __."
        },
        {
                "texto": "La guitarra sonaba muy __. La tocaba un __."
        },
        {
                "texto": "El espejo mágico mostraba __. Cada vez que alguien decía __."
        },
        {
                "texto": "En la cima de la colina había un __. Estaba rodeado de __."
        },
        {
                "texto": "El lobo aulló desde __. La luna brillaba con color __."
        },
        {
                "texto": "La niña sopló las velas de __. Pidió un deseo sobre __."
        },
        {
                "texto": "El carpintero talló una figura de __. Tenía forma de __."
        },
        {
                "texto": "En el nido del tejado había __. La mamá pájaro traía __."
        },
        {
                "texto": "El semáforo se puso de color __. Los coches se detuvieron ante __."
        },
        {
                "texto": "La mochila pesaba mucho porque llevaba __. Era para __."
        },
        {
                "texto": "El caracol caminaba sobre __. Dejaba una línea de __."
        },
        {
                "texto": "En la orilla de la playa recogieron una concha de __. Dentro sonaba __."
        },
        {
                "texto": "El fuego del campamento calentaba __. Todos contaban historias de __."
        },
        {
                "texto": "La puerta secreta daba paso a __. Olía a __."
        },
        {
                "texto": "El pájaro carpintero picaba en __. Hacía un ruido como __."
        },
        {
                "texto": "El paraguas voló con el viento hacia __. Cayó encima de __."
        },
        {
                "texto": "En el joyero de la abuela había __. Brillaba como __."
        },
        {
                "texto": "El tractor avanzaba por __. Iba cargado de __."
        },
        {
                "texto": "La pequeña flor creció junto a __. Tenía pétalos de color __."
        },
        {
                "texto": "El ratoncito encontró un trozo de __. Se lo llevó corriendo a __."
        },
        {
                "texto": "La linterna iluminó un rincón de __. Allí descansaba __."
        },
        {
                "texto": "El camello cruzó por __. Soportaba el calor gracias a __."
        },
        {
                "texto": "En la panadería horneaban pan de __. Estaba recién __."
        },
        {
                "texto": "El faro lanzaba su luz hacia __. Avisaba a los barcos de __."
        },
        {
                "texto": "La gota de lluvia cayó sobre __. Hizo un sonido __."
        },
        {
                "texto": "El ciervo corrió hacia __. Sus cuernos eran de __."
        },
        {
                "texto": "El reloj de arena marcaba __. Cuando caía el último grano salía __."
        },
        {
                "texto": "En la cima del monte nevado había __. Estaba custodiado por __."
        },
        {
                "texto": "El koala trepó hasta __. Sus hojas favoritas sabían a __."
        },
        {
                "texto": "La nave espacial viajó hasta __. Sus tripulantes eran __."
        },
        {
                "texto": "En el estanque nadaban tres patos de color __. Seguían a su __."
        },
        {
                "texto": "El pirata encontró un cofre de __. La cerradura era de __."
        },
        {
                "texto": "La niña abrió el paraguas de __. De repente empezó a __."
        },
        {
                "texto": "En la cueva de hielo había __. Resplandecía como __."
        },
        {
                "texto": "El niño encontró una pluma de __. La guardó en su __."
        },
        {
                "texto": "La oveja blanca pastaba en __. Escuchó el ladrido de __."
        },
        {
                "texto": "El coche de bomberos corrió hacia __. Llevaba una sirena de color __."
        },
        {
                "texto": "En la maceta de la ventana brotó __. Tenía un aroma a __."
        },
        {
                "texto": "El gigante pisó sobre __. La tierra tembló como __."
        },
        {
                "texto": "La abuela tejió una bufanda de __. Tenía rayas de color __."
        },
        {
                "texto": "El barco de vapor cruzó el río __. En su cubierta tocaba __."
        },
        {
                "texto": "En el buzón de la entrada había __. El sobre estaba cerrado con __."
        },
        {
                "texto": "El águila construyó su nido en __. Desde allí vigilaba __."
        },
        {
                "texto": "El caballo negro relinchó ante __. No quería cruzar el __."
        },
        {
                "texto": "En el mercado vendían cestas de __. Estaban tejidas con __."
        },
        {
                "texto": "La mariquita voló hasta __. Se posó sobre una hoja de __."
        },
        {
                "texto": "El músico tocó su flauta de __. Los niños empezaron a __."
        },
        {
                "texto": "En el desierto apareció un oasis con __. Había palmeras llenas de __."
        },
        {
                "texto": "El detective examinó con su lupa __. Encontró una pista de __."
        },
        {
                "texto": "La ardilla saltó de rama en rama hasta __. Llevaba una bellota de __."
        },
        {
                "texto": "El muñeco de nieve tenía ojos de __. Su sombrero era un __."
        },
        {
                "texto": "En el castillo medieval había un pasadizo hacia __. Estaba iluminado por __."
        },
        {
                "texto": "El pez espada nadó junto a __. Cortó una red hecha de __."
        },
        {
                "texto": "La comadreja se escurrió bajo __. Llevaba en la boca __."
        },
        {
                "texto": "En la cocina de la cabaña hervía una sopa de __. Olía a __."
        },
        {
                "texto": "El mago pronunció las palabras mágicas sobre __. Apareció de pronto __."
        },
        {
                "texto": "El perro pastor guió al rebaño hacia __. El cielo amenazaba con __."
        },
        {
                "texto": "En el fondo de la mochila apareció una moneda de __. Tenía grabado un __."
        },
        {
                "texto": "El submarino descendió hasta __. Sus focos iluminaron un __."
        },
        {
                "texto": "La mariposa azul se posó sobre la nariz de __. Los dos se quedaron __."
        },
        {
                "texto": "En lo alto de la torre ondeaba una bandera de color __. Tenía el dibujo de __."
        },
        {
                "texto": "El gato blanco trepó por la verja de __. Cazó al vuelo una __."
        },
        {
                "texto": "El cazador de tesoros encontró un mapa de __. La cruz roja marcaba __."
        },
        {
                "texto": "La lechera llevaba un cántaro de __. Tropezó con una piedra de __."
        },
        {
                "texto": "En el campanario del pueblo anidaban dos cigüeñas de __. Cuidaban con cariño de __."
        },
        {
                "texto": "El coche de carreras cruzó la meta de __. La bandera a cuadros era de __."
        },
        {
                "texto": "El osito de peluche estaba escondido tras __. Tenía cosido un corazón de __."
        },
        {
                "texto": "En el taller de pintura había botes de color __. Con ellos pintaron un __."
        },
        {
                "texto": "El pingüino se deslizó sobre el hielo de __. Cayó al agua como un __."
        },
        {
                "texto": "La princesa montó en su corcel de color __. Galopó sin parar hacia __."
        },
        {
                "texto": "En la huerta maduraron unas calabazas de __. Parecían carros de __."
        },
        {
                "texto": "El vendedor ambulante tocaba una campanilla de __. Ofrecía ricos dulces de __."
        },
        {
                "texto": "El pájaro azul traía en su pico una ramita de __. Se la entregó a __."
        },
        {
                "texto": "La campana de la escuela sonó a las __. Los niños salieron gritando de __."
        },
        {
                "texto": "En el bosque encantado crecían setas de color __. Quien las pisaba escuchaba __."
        },
        {
                "texto": "El mono travieso robó un plátano de __. Subió corriendo a la copa de __."
        },
        {
                "texto": "El viejo molinero molió trigo en __. La harina blanca llenó __."
        },
        {
                "texto": "La estrella fugaz cruzó la noche de __. Dejó una estela de polvo __."
        },
        {
                "texto": "El niño metió la mano en el bolsillo de __. Sacó una canica de __."
        },
        {
                "texto": "En el jardín botánico floreció una rosa de color __. Desprendía un perfume a __."
        },
        {
                "texto": "El explorador encendió su antorcha de __. La cueva retumbó con el sonido de __."
        },
        {
                "texto": "La tortuga gigante vivía en una isla de __. Su caparazón estaba cubierto de __."
        },
        {
                "texto": "El zapato de cristal encajaba en el pie de __. El príncipe la reconoció por __."
        },
        {
                "texto": "En la feria del pueblo montaron una noria de __. Desde arriba se veía todo __."
        },
        {
                "texto": "El castor taló un tronco de __. Con él construyó un dique en __."
        },
        {
                "texto": "La niña abrió el joyero musical de __. Una bailarina de madera empezó a __."
        },
        {
                "texto": "El dragón escupió una llamarada de color __. Calentó la tetera de __."
        },
        {
                "texto": "En el huerto de fresas apareció un caracol de __. Tenía una concha con rayas __."
        },
        {
                "texto": "El astronauta colocó una bandera de __ en la superficie de __."
        },
        {
                "texto": "La barca de remos cruzó el lago hacia __. La niebla cubría la orilla de __."
        },
        {
                "texto": "En el desván de la casa vieja encontraron un baúl de __. La tapa tenía __."
        },
        {
                "texto": "El búho sabio parpadeó desde __. Dio un consejo muy útil a __."
        },
        {
                "texto": "El cocinero echó en la cazuela tres hojas de __. El caldo tomó un color __."
        },
        {
                "texto": "La bicicleta amarilla tenía una cesta de __. Dentro viajaba un perrito de __."
        },
        {
                "texto": "En la playa de arena dorada construyeron un foso de __. El agua de mar trajo __."
        },
        {
                "texto": "El hada madrina agitó su varita con forma de __. Una calabaza se convirtió en __."
        },
        {
                "texto": "El lobo bueno compartió su merienda con __. Comieron juntos un trozo de __."
        },
        {
                "texto": "En el nido del halcón había una pluma de __. Brillaba bajo los rayos de __."
        },
        {
                "texto": "El tren de vapor pitó al entrar en la estación de __. De la chimenea salía humo __."
        },
        {
                "texto": "La niña encontró un trébol de cuatro hojas en __. Deseó con fuerza que __."
        },
        {
                "texto": "El patinador sobre hielo dibujó un círculo de __. La pista resplandecía con luz __."
        },
        {
                "texto": "En el pozo de los deseos arrojaron una moneda de __. Al instante brotó un chorro de __."
        },
        {
                "texto": "El caballo alado batió sus alas de __. Ascendió por encima de las nubes de __."
        },
        {
                "texto": "La gata mimosa se acurrucó sobre el jersey de __. Empezó a ronronear como un __."
        },
        {
                "texto": "En la cima del faro encendieron la gran lámpara de __. Su rayo de luz llegó hasta __."
        },
        {
                "texto": "El campesino cosechó uvas dulces en __. Con ellas preparó un mosto de __."
        },
        {
                "texto": "La marioneta de madera movió sus hilos de __. Hizo una reverencia ante __."
        },
        {
                "texto": "En el río de aguas cristalinas nadaban truchas de color __. Esquivaban las piedras de __."
        },
        {
                "texto": "El duendecillo del bosque llevaba un gorro picudo de color __. Se escondió tras una hoja de __."
        },
        {
                "texto": "La niña sopló una pompa de jabón gigante hacia __. La pompa flotó hasta tocar __."
        },
        {
                "texto": "El perro fiel esperó a su dueño en la puerta de __. Llevaba en la boca la correa de __."
        },
        {
                "texto": "En el árbol hueco vivía una familia de __. Su despensa estaba repleta de __."
        },
        {
                "texto": "El barquito de vela sorteó las olas de __. Llegó sano y salvo al puerto de __."
        },
        {
                "texto": "La princesa y el sapo se sentaron junto a la fuente de __. El sapo llevaba una corona de __."
        },
        {
                "texto": "En la panadería del barrio el panadero sacó una bandeja de __. Crujían como hojas de __."
        },
        {
                "texto": "El detective encontró una huella misteriosa en el barro de __. Pertenecía sin duda a __."
        },
        {
                "texto": "La cometa con cara de sol voló tan alto que __. La cuerda se tensó con el viento de __."
        },
        {
                "texto": "En el castillo de la reina de las nieves todo era de __. Las paredes reflejaban luz __."
        },
        {
                "texto": "El pequeño erizo se hizo una bola de púas al ver a __. Solo asomaba su hocico de __."
        },
        {
                "texto": "El campesino encontró una herradura oxidada en __. La colgó en la puerta para tener __."
        },
        {
                "texto": "La golondrina mensajera cruzó mares y montañas para llegar a __. Traía una carta atada con __."
        },
        {
                "texto": "En la fiesta mayor del pueblo lanzaron fuegos artificiales de color __. El cielo se iluminó como __."
        },
        {
                "texto": "El canguro dio un salto gigante sobre __. En su bolsa llevaba a su cría de __."
        },
        {
                "texto": "La flauta mágica hacía bailar a quien escuchaba su melodía de __. Los animales se pusieron a __."
        },
        {
                "texto": "En el rincón del cuarto de juegos había un baúl lleno de __. El tesoro más bonito era __."
        },
        {
                "texto": "El sol de la tarde bañaba la pradera de __. Los pájaros cantaban canciones de __."
        },
        {
                "texto": "La niña ató una cinta de color __ a la rama de __. Prometió regresar al llegar __."
        },
        {
                "texto": "El oso pardo despertó de su largo sueño en la cueva de __. Lo primero que buscó fue __."
        },
        {
                "texto": "En la orilla del mar recogieron caracolas de forma __. Al ponerlas en el oído se escuchaba __."
        },
        {
                "texto": "El astronauta saludó a la Tierra desde la ventana de __. El planeta azul brillaba como una __."
        },
        {
                "texto": "El duende zapatero arregló las botas de __ con hilo de __. Ahora podían caminar sin hacer __."
        },
        {
                "texto": "El camaleón cambió de color al posarse sobre __. Se volvió completamente __."
        },
        {
                "texto": "En el laboratorio de inventos crearon una máquina de __. Funcionaba con ruedas de __."
        },
        {
                "texto": "La leona cuidaba a sus cachorros a la sombra de __. El sol caía con fuerza sobre __."
        },
        {
                "texto": "El relojero colocó la última pieza en el reloj de __. El péndulo empezó a oscilar como __."
        },
        {
                "texto": "La niña dibujó una puerta mágica con tiza de color __ en la pared de __. Al empujarla vio __."
        },
        {
                "texto": "El pájaro de fuego extendió sus plumas doradas sobre __. La noche se convirtió en __."
        },
        {
                "texto": "En el huerto de calabazas creció una tan enorme que __. Tuvieron que moverla entre __."
        },
        {
                "texto": "El barco de piratas buenos repartía juguetes de __ a todos los niños de __."
        },
        {
                "texto": "La pequeña mariquita roja tenía siete lunares de color __. Voló hacia la flor de __."
        },
        {
                "texto": "El caballo blanco relinchó de alegría al divisar el prado de __. Corrió veloz como __."
        },
        {
                "texto": "En la biblioteca del colegio había un rincón secreto con cojines de __. Allí leían historias de __."
        },
        {
                "texto": "El gato siamés de ojos azules se subió al tejado de __. Cazó un rayo de sol con su __."
        },
        {
                "texto": "La abuela sacó de la lata metálica unas galletas con forma de __. Olían a mantequilla y __."
        },
        {
                "texto": "El puente de arcoíris unía el reino de __ con la tierra de __. Por él cruzaban animales de __."
        },
        {
                "texto": "El pequeño explorador anotó en su cuaderno de tapas de __ que había descubierto un __."
        },
        {
                "texto": "La música de la caja sonaba suavemente en la habitación de __. Todos cerraron los ojos para soñar con __."
        },
        {
                "texto": "En el fondo de la botella flotaba un mensaje escrito en __. Decía que el tesoro estaba en __."
        },
        {
                "texto": "El dragón bondadoso apagó el fuego de la chimenea soplando __. La gente del pueblo le regaló __."
        },
        {
                "texto": "La semilla que plantaron en el patio germinó con una hoja de color __. Parecía una estrella de __."
        },
        {
                "texto": "El tren expreso cruzó el túnel de la montaña de __. Al salir al otro lado apareció un valle de __."
        },
        {
                "texto": "La reina generosa regaló a los niños del pueblo manzanas de __ y cestas de __."
        },
        {
                "texto": "El robot ayudante preparó un vaso de zumo de __ con cubitos de __."
        },
        {
                "texto": "En el bosque de las luciérnagas todo brillaba con luz de color __. Parecía un cielo lleno de __."
        },
        {
                "texto": "La niña se puso la capa mágica de color __ y descubrió que podía volar hasta __."
        },
        {
                "texto": "El viejo marinero contó la historia de una ballena blanca que vivía en __ y que cuidaba a los __."
        }
];

    // 3. GRAN BANCO DE PALABRAS SENCILLAS PARA CREAR UNA HISTORIA (520+ términos cotidianos)
    const BANCO_PALABRAS = [
        "perro",
        "gato",
        "caballo",
        "vaca",
        "oveja",
        "pájaro",
        "león",
        "elefante",
        "jirafa",
        "mono",
        "oso",
        "lobo",
        "zorro",
        "conejo",
        "ardilla",
        "ratón",
        "tortuga",
        "delfín",
        "ballena",
        "pez",
        "tiburón",
        "rana",
        "mariposa",
        "abeja",
        "hormiga",
        "caracol",
        "pingüino",
        "águila",
        "búho",
        "pato",
        "gallina",
        "gallo",
        "loro",
        "ciervo",
        "camello",
        "foca",
        "canguro",
        "dragón",
        "unicornio",
        "koala",
        "tigre",
        "leopardo",
        "panda",
        "cebra",
        "hipopótamo",
        "rinoceronte",
        "erizo",
        "castor",
        "nutria",
        "pulpo",
        "medusa",
        "cangrejo",
        "estrella de mar",
        "cisne",
        "cigüeña",
        "golondrina",
        "colibrí",
        "flamenco",
        "pavo",
        "burro",
        "cabra",
        "cerdito",
        "cordero",
        "potro",
        "halcón",
        "lechuza",
        "cuervo",
        "canario",
        "mariquita",
        "grillo",
        "saltamontes",
        "luciérnaga",
        "oruga",
        "topo",
        "hurón",
        "camaleón",
        "lagartija",
        "iguana",
        "lobezno",
        "gatito",
        "bosque",
        "montaña",
        "río",
        "mar",
        "playa",
        "isla",
        "cueva",
        "árbol",
        "flor",
        "sol",
        "luna",
        "estrella",
        "nube",
        "lluvia",
        "nieve",
        "viento",
        "fuego",
        "volcán",
        "desierto",
        "selva",
        "parque",
        "jardín",
        "huerto",
        "campo",
        "lago",
        "cascada",
        "valle",
        "pradera",
        "colina",
        "pantano",
        "acantilado",
        "glaciar",
        "charco",
        "riachuelo",
        "manantial",
        "ola",
        "marea",
        "arena",
        "roca",
        "piedra",
        "hierba",
        "musgo",
        "hoja",
        "rama",
        "tronco",
        "raíz",
        "semilla",
        "fruto",
        "rosa",
        "margarita",
        "girasol",
        "tulipán",
        "clavel",
        "pino",
        "roble",
        "palmera",
        "sauce",
        "arcoíris",
        "tormenta",
        "trueno",
        "relámpago",
        "niebla",
        "brisa",
        "helada",
        "rocío",
        "amanecer",
        "atardecer",
        "noche",
        "cielo",
        "horizonte",
        "castillo",
        "palacio",
        "casa",
        "cabaña",
        "torre",
        "puente",
        "camino",
        "pueblo",
        "ciudad",
        "colegio",
        "escuela",
        "granja",
        "molino",
        "faro",
        "plaza",
        "calle",
        "mercado",
        "tienda",
        "panadería",
        "biblioteca",
        "museo",
        "parque",
        "hospital",
        "estación",
        "aeropuerto",
        "puerto",
        "teatro",
        "cine",
        "circo",
        "gimnasio",
        "piscina",
        "estadio",
        "fábrica",
        "iglesia",
        "campanario",
        "muralla",
        "fuente",
        "mirador",
        "desván",
        "sótano",
        "cocina",
        "dormitorio",
        "salón",
        "baño",
        "terraza",
        "balcón",
        "patio",
        "garaje",
        "pasadizo",
        "cueva secreta",
        "llave",
        "tesoro",
        "cofre",
        "mapa",
        "brújula",
        "reloj",
        "libro",
        "cuaderno",
        "lápiz",
        "mochila",
        "estuche",
        "goma",
        "regla",
        "tijeras",
        "pincel",
        "pintura",
        "pegamento",
        "sacapuntas",
        "rotulador",
        "pizarra",
        "tiza",
        "mesa",
        "silla",
        "cama",
        "almohada",
        "manta",
        "espejo",
        "lámpara",
        "linterna",
        "vela",
        "farol",
        "cuadro",
        "reloj de pared",
        "teléfono",
        "radio",
        "televisión",
        "ordenador",
        "cámara",
        "taza",
        "plato",
        "vaso",
        "cuchara",
        "tenedor",
        "cuchillo",
        "sartén",
        "olla",
        "tetera",
        "jarra",
        "botella",
        "cesta",
        "caja",
        "maleta",
        "bolso",
        "sobre",
        "carta",
        "sello",
        "periódico",
        "revista",
        "pelota",
        "balón",
        "cometa",
        "peonza",
        "canica",
        "muñeca",
        "peluche",
        "puzle",
        "patinete",
        "bicicleta",
        "monopatín",
        "patines",
        "cuerda",
        "globo",
        "paraguas",
        "abanico",
        "toalla",
        "cepillo",
        "peine",
        "jabón",
        "esponja",
        "espejo mágico",
        "sombrero",
        "gorro",
        "gorra",
        "casco",
        "corona",
        "capa",
        "abrigo",
        "chaqueta",
        "jersey",
        "camiseta",
        "camisa",
        "pantalón",
        "falda",
        "vestido",
        "bañador",
        "pijama",
        "calcetines",
        "medias",
        "zapatos",
        "zapatillas",
        "botas",
        "sandalias",
        "chanclas",
        "bufanda",
        "guantes",
        "manoplas",
        "cinturón",
        "tirantes",
        "pañuelo",
        "corbata",
        "anillo",
        "collar",
        "pulsera",
        "pendientes",
        "reloj de pulsera",
        "gafas",
        "gafas de sol",
        "antifaz",
        "diadema",
        "lazo",
        "coche",
        "autobús",
        "camión",
        "furgoneta",
        "moto",
        "bicicleta",
        "tren",
        "metro",
        "tranvía",
        "avión",
        "avioneta",
        "helicóptero",
        "cohete",
        "nave espacial",
        "satélite",
        "globo aerostático",
        "barco",
        "velero",
        "barca",
        "lancha",
        "yate",
        "submarino",
        "canoa",
        "kayak",
        "góndola",
        "carreta",
        "carro",
        "trineo",
        "tractor",
        "patinete",
        "manzana",
        "plátano",
        "fresa",
        "naranja",
        "pera",
        "uva",
        "limón",
        "sandía",
        "melón",
        "cereza",
        "melocotón",
        "albaricoque",
        "ciruela",
        "piña",
        "kiwi",
        "mango",
        "mandarina",
        "higo",
        "granada",
        "mora",
        "frambuesa",
        "arándano",
        "castaña",
        "nuez",
        "almendra",
        "avellana",
        "cacahuete",
        "pan",
        "tostada",
        "galleta",
        "croissant",
        "bizcocho",
        "tarta",
        "pastel",
        "rosquilla",
        "muffin",
        "chocolate",
        "caramelo",
        "chupachups",
        "helado",
        "miel",
        "mermelada",
        "leche",
        "batido",
        "zumo",
        "agua",
        "yogur",
        "queso",
        "mantequilla",
        "huevo",
        "arroz",
        "pasta",
        "espaguetis",
        "macarrones",
        "sopa",
        "puré",
        "pizza",
        "hamburguesa",
        "bocadillo",
        "sándwich",
        "tortilla",
        "patata",
        "tomate",
        "lechuga",
        "zanahoria",
        "guisantes",
        "espinacas",
        "calabaza",
        "pepino",
        "pimiento",
        "niño",
        "niña",
        "bebé",
        "abuelo",
        "abuela",
        "papá",
        "mamá",
        "hermano",
        "hermana",
        "primo",
        "amigo",
        "amiga",
        "vecino",
        "vecina",
        "maestro",
        "maestra",
        "profesor",
        "profesora",
        "médico",
        "enfermera",
        "bombero",
        "policía",
        "cartero",
        "jardinero",
        "panadero",
        "cocinero",
        "camarero",
        "pintor",
        "escultor",
        "músico",
        "cantante",
        "bailarín",
        "actor",
        "escritor",
        "poeta",
        "científico",
        "astronauta",
        "piloto",
        "marinero",
        "capitán",
        "granjero",
        "pastor",
        "pescador",
        "carpintero",
        "albañil",
        "mecánico",
        "detective",
        "príncipe",
        "princesa",
        "rey",
        "reina",
        "caballero",
        "soldado",
        "mago",
        "hechicera",
        "hada",
        "duende",
        "gnomo",
        "gigante",
        "pirata",
        "rojo",
        "azul",
        "verde",
        "amarillo",
        "blanco",
        "negro",
        "naranja",
        "morado",
        "rosa",
        "marrón",
        "gris",
        "dorado",
        "plateado",
        "turquesa",
        "violeta",
        "grande",
        "pequeño",
        "enorme",
        "diminuto",
        "gigante",
        "alto",
        "bajo",
        "largo",
        "corto",
        "ancho",
        "estrecho",
        "rápido",
        "lento",
        "fuerte",
        "valiente",
        "listo",
        "sabio",
        "amable",
        "simpático",
        "alegre",
        "feliz",
        "divertido",
        "mágico",
        "antiguo",
        "moderno",
        "nuevo",
        "brillante",
        "luminoso",
        "oscuro",
        "suave",
        "blando",
        "duro",
        "dulce",
        "salado",
        "caliente",
        "alegría",
        "sonrisa",
        "risa",
        "abrazo",
        "beso",
        "amistad",
        "amor",
        "cariño",
        "sorpresa",
        "sueño",
        "deseo",
        "ilusión",
        "misterio",
        "secreto",
        "aventura",
        "viaje",
        "canción",
        "melodía",
        "música",
        "baile",
        "juego",
        "premio",
        "medalla",
        "trofeo",
        "varita",
        "poción",
        "hechizo",
        "talismán",
        "amuleto",
        "tesoro"
];

    // 4. GENERADORES DE ACTIVIDADES
    function generateComprensionActivity(nivel, idNum) {
        const textoObj = TEXTOS_COMPRENSION[(idNum - 1) % TEXTOS_COMPRENSION.length];
        const pregIdx = (Math.floor((idNum - 1) / TEXTOS_COMPRENSION.length)) % textoObj.preguntas.length;
        const pregData = textoObj.preguntas[pregIdx];

        const correctText = pregData.opts[pregData.correct];
        const allOpts = [...pregData.opts];
        const shuffledOpts = shuffle(allOpts);
        const correctIdx = shuffledOpts.indexOf(correctText);

        return {
            id: `comprension_${nivel}_${idNum}`,
            tipo: 'comprension_lectora',
            titulo: textoObj.titulo,
            texto: textoObj.texto,
            pregunta: pregData.q,
            opciones: shuffledOpts,
            respuesta: correctIdx,
            nivel
        };
    }

    function generateContinuaActivity(nivel, idNum) {
        const item = INICIOS_CONTINUA_HISTORIA[(idNum - 1) % INICIOS_CONTINUA_HISTORIA.length];
        return {
            id: `continua_${nivel}_${idNum}`,
            tipo: 'continua_historia',
            titulo: 'Continúa el relato en tu diario',
            texto: item.texto,
            nivel
        };
    }

    function generateCreaHistoriaActivity(nivel, idNum) {
        const shuffled = shuffle(BANCO_PALABRAS);
        const palabras = shuffled.slice(0, 4);

        return {
            id: `crea_${nivel}_${idNum}`,
            tipo: 'crea_historia',
            titulo: 'Crear una historia con Palabras',
            subtitulo: '¡Inventa un cuento fantástico con tu clase!',
            palabras,
            nivel
        };
    }

    const HistoryBank = {
        TEXTOS_COMPRENSION,
        INICIOS_CONTINUA_HISTORIA,
        BANCO_PALABRAS,

        getRandomFourWords() {
            return shuffle(BANCO_PALABRAS).slice(0, 4);
        },

        generateBankForLevel(nivel) {
            const list = [];
            // 70 de cada tipo para asegurar una rotación rica e inagotable (210 retos por nivel)
            for (let i = 1; i <= 70; i++) {
                list.push(generateComprensionActivity(nivel, i));
            }
            for (let i = 1; i <= 70; i++) {
                list.push(generateCreaHistoriaActivity(nivel, i));
            }
            for (let i = 1; i <= 70; i++) {
                list.push(generateContinuaActivity(nivel, i));
            }
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
                window.AULA_DATA[lvl].biblioteca = items;
                total += items.length;
            });
            console.log(`[HistoryBank] Banco de Biblioteca cargado: ${total} actividades en total.`);
        }
    };

    if (typeof window !== 'undefined') {
        window.HistoryBank = HistoryBank;
        HistoryBank.init();
    }

    if (typeof module !== 'undefined' && module.exports) {
        module.exports = HistoryBank;
    }
})();
