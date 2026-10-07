/**
 * history_bank.js - Banco Extenso de Historia y Lengua (La Biblioteca Mágica)
 * CEIP Don Quijote - Adaptado para Primaria (1.º a 6.º de Primaria)
 * 
 * Actividades del Bloque:
 *  1. Comprensión lectora: Gran banco de lecturas históricas/sociales sencillas y directas con preguntas claras.
 *  2. Continúa la historia: Textos narrativos con espacios en blanco o final abierto para continuar en clase.
 *     Evaluado por el maestro/a mediante 3 botones: [Oops], [Bien], [Genial] (sin puntos visibles en los botones).
 *  3. Crea una historia con palabras: Generador de palabras al azar para inventar una historia en clase.
 *     Evaluado también por el maestro/a mediante [Oops], [Bien], [Genial].
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

    // 1. BANCO DE TEXTOS HISTÓRICOS Y SOCIALES PARA COMPRENSIÓN LECTORA
    const TEXTOS_COMPRENSION = [
        {
                "titulo": "Don Quijote y los Molinos",
                "texto": "Don Quijote y Sancho Panza iban por el campo cuando vieron unos molinos de viento. Don Quijote creyó que eran gigantes con brazos largos y quiso luchar contra ellos. Sancho le avisó de que solo eran molinos movidos por el aire, pero el caballero fue valiente y no tuvo miedo.",
                "preguntas": [
                        {
                                "q": "¿Qué eran en realidad los supuestos gigantes?",
                                "opts": [
                                        "Molinos de viento",
                                        "Árboles altos",
                                        "Torres de piedra",
                                        "Montañas lejanas"
                                ],
                                "correct": 0
                        },
                        {
                                "q": "¿Quién le avisó a Don Quijote de que eran molinos?",
                                "opts": [
                                        "Sancho Panza",
                                        "El rey",
                                        "Un pastor",
                                        "Su caballo"
                                ],
                                "correct": 0
                        },
                        {
                                "q": "¿Qué mueve las aspas de los molinos?",
                                "opts": [
                                        "El viento",
                                        "El agua",
                                        "El calor",
                                        "La electricidad"
                                ],
                                "correct": 0
                        }
                ]
        },
        {
                "titulo": "Rocinante y el Burrito Rucio",
                "texto": "Don Quijote viajaba montado en su caballo Rocinante, un animal flaco pero muy cariñoso y leal. A su lado iba su amigo Sancho Panza, que montaba en un burrito gris muy simpático llamado Rucio. Los dos animales eran grandes amigos y nunca se separaban en el camino.",
                "preguntas": [
                        {
                                "q": "¿Cómo se llamaba el caballo de Don Quijote?",
                                "opts": [
                                        "Rocinante",
                                        "Pegaso",
                                        "Tornado",
                                        "Relámpago"
                                ],
                                "correct": 0
                        },
                        {
                                "q": "¿Qué animal montaba Sancho Panza?",
                                "opts": [
                                        "Un burrito gris llamado Rucio",
                                        "Un camello",
                                        "Un poni con manchas",
                                        "Una mula veloz"
                                ],
                                "correct": 0
                        },
                        {
                                "q": "¿Cómo se llevaban Rocinante y Rucio?",
                                "opts": [
                                        "Eran grandes amigos",
                                        "Se peleaban siempre",
                                        "No se conocían",
                                        "Se tenían miedo"
                                ],
                                "correct": 0
                        }
                ]
        },
        {
                "titulo": "Miguel de Cervantes",
                "texto": "Miguel de Cervantes fue un escritor español que nació en Alcalá de Henares. De joven le gustaba leer todos los libros que encontraba. Cuando fue mayor, escribió la famosa novela de Don Quijote para divertir a la gente y enseñarnos el valor de la amistad y la bondad.",
                "preguntas": [
                        {
                                "q": "¿A qué se dedicaba Miguel de Cervantes?",
                                "opts": [
                                        "Era un gran escritor",
                                        "Era marinero pirata",
                                        "Era herrero de pueblo",
                                        "Era pintor de cuadros"
                                ],
                                "correct": 0
                        },
                        {
                                "q": "¿Qué le gustaba hacer desde pequeño?",
                                "opts": [
                                        "Leer muchos libros",
                                        "Dormir todo el día",
                                        "Cazar mariposas",
                                        "Nadar en el río"
                                ],
                                "correct": 0
                        },
                        {
                                "q": "¿Qué libro famoso escribió Cervantes?",
                                "opts": [
                                        "Don Quijote de la Mancha",
                                        "Caperucita Roja",
                                        "La isla del tesoro",
                                        "Pinocho"
                                ],
                                "correct": 0
                        }
                ]
        },
        {
                "titulo": "El Castillo Medieval",
                "texto": "En la Edad Media, los castillos se construían en lo alto de las colinas de piedra. Tenían murallas muy gruesas para proteger a los habitantes del pueblo. Para entrar al castillo, había que cruzar un puente de madera llamado puente levadizo, que se levantaba si había peligro.",
                "preguntas": [
                        {
                                "q": "¿Dónde se construían los castillos?",
                                "opts": [
                                        "En lo alto de las colinas",
                                        "En el fondo del mar",
                                        "Dentro de cuevas oscuras",
                                        "Debajo de los árboles"
                                ],
                                "correct": 0
                        },
                        {
                                "q": "¿Cómo eran las murallas del castillo?",
                                "opts": [
                                        "Muy gruesas y de piedra",
                                        "De papel y cartón",
                                        "De hojas de hierba",
                                        "De cristal transparente"
                                ],
                                "correct": 0
                        },
                        {
                                "q": "¿Cómo se llamaba el puente para cruzar al castillo?",
                                "opts": [
                                        "Puente levadizo",
                                        "Puente colgante",
                                        "Puente romano",
                                        "Puente de cristal"
                                ],
                                "correct": 0
                        }
                ]
        },
        {
                "titulo": "El Caballero y su Escudo",
                "texto": "Los caballeros andantes llevaban una armadura de metal para proteger su cuerpo. En el brazo izquierdo sujetaban un escudo con el dibujo de su familia, como un león o un águila. Con su escudo se defendían y con su caballo recorrían los caminos ayudando a los débiles.",
                "preguntas": [
                        {
                                "q": "¿De qué material era la armadura del caballero?",
                                "opts": [
                                        "De metal resistente",
                                        "De madera blanda",
                                        "De tela fina",
                                        "De lana suave"
                                ],
                                "correct": 0
                        },
                        {
                                "q": "¿Qué llevaban pintado en su escudo?",
                                "opts": [
                                        "Un dibujo como un león o un águila",
                                        "Números de teléfono",
                                        "Letras del abecedario",
                                        "Comida del mercado"
                                ],
                                "correct": 0
                        },
                        {
                                "q": "¿Para qué servía el escudo?",
                                "opts": [
                                        "Para protegerse y defenderse",
                                        "Para cocinar sopa",
                                        "Para abanicarse",
                                        "Para dormir la siesta"
                                ],
                                "correct": 0
                        }
                ]
        },
        {
                "titulo": "El Fuego en la Prehistoria",
                "texto": "Hace miles de años, los primeros seres humanos aprendieron a hacer fuego frotando piedras o palos de madera seca. El fuego les cambió la vida porque les daba calor en el frío invierno, espantaba a los animales peligrosos y les permitía cocinar los alimentos.",
                "preguntas": [
                        {
                                "q": "¿Cómo conseguían hacer fuego en la prehistoria?",
                                "opts": [
                                        "Frotando piedras o maderas secas",
                                        "Con cerillas de caja",
                                        "Con un mechero eléctrico",
                                        "Con una linterna"
                                ],
                                "correct": 0
                        },
                        {
                                "q": "¿Para qué les servía el fuego?",
                                "opts": [
                                        "Para calentarse y cocinar",
                                        "Para pintar piedras",
                                        "Para hacer ropa",
                                        "Para navegar por el río"
                                ],
                                "correct": 0
                        },
                        {
                                "q": "¿Qué hacía el fuego con los animales salvajes?",
                                "opts": [
                                        "Los asustaba y espantaba",
                                        "Los llamaba a jugar",
                                        "Los dormía de inmediato",
                                        "Los hacía más grandes"
                                ],
                                "correct": 0
                        }
                ]
        },
        {
                "titulo": "La Invención de la Rueda",
                "texto": "Antes de inventar la rueda, las personas tenían que arrastrar cargas pesadas por el suelo o llevarlas a hombros. Cuando inventaron la rueda de madera, construyeron carros tirados por bueyes o caballos. Gracias a la rueda, transportar comida y herramientas fue mucho más fácil.",
                "preguntas": [
                        {
                                "q": "¿Cómo llevaban las cosas pesadas antes de la rueda?",
                                "opts": [
                                        "Arrastrándolas o a hombros",
                                        "En camiones grandes",
                                        "En aviones rápidos",
                                        "En trenes de vapor"
                                ],
                                "correct": 0
                        },
                        {
                                "q": "¿De qué material se hicieron las primeras ruedas?",
                                "opts": [
                                        "De madera",
                                        "De goma de coche",
                                        "De plástico suave",
                                        "De algodón"
                                ],
                                "correct": 0
                        },
                        {
                                "q": "¿Qué animales tiraban de los primeros carros?",
                                "opts": [
                                        "Bueyes o caballos",
                                        "Leones y tigres",
                                        "Águilas y búhos",
                                        "Peces del río"
                                ],
                                "correct": 0
                        }
                ]
        },
        {
                "titulo": "Las Pinturas de la Cueva de Altamira",
                "texto": "En la cueva de Altamira, en Cantabria, hay pinturas muy antiguas en el techo de roca. Los hombres prehistóricos pintaban bisontes, ciervos y caballos con pigmentos naturales de tierra y carbón. Usaban plumas y sus propios dedos para pintar en la piedra.",
                "preguntas": [
                        {
                                "q": "¿Qué animales pintaban en el techo de Altamira?",
                                "opts": [
                                        "Bisontes, ciervos y caballos",
                                        "Delfines y ballenas",
                                        "Jirafas y monos",
                                        "Pingüinos del polo"
                                ],
                                "correct": 0
                        },
                        {
                                "q": "¿De dónde sacaban los colores para pintar?",
                                "opts": [
                                        "De tierra de colores y carbón",
                                        "De botes de témpera",
                                        "De pinturas mágicas",
                                        "De flores de plástico"
                                ],
                                "correct": 0
                        },
                        {
                                "q": "¿En qué lugar de España está la cueva de Altamira?",
                                "opts": [
                                        "En Cantabria",
                                        "En una isla del sur",
                                        "En Madrid",
                                        "En los Pirineos"
                                ],
                                "correct": 0
                        }
                ]
        },
        {
                "titulo": "Los Acueductos Romanos",
                "texto": "Los romanos construyeron acueductos gigantes con arcos de piedra para llevar agua limpia desde las montañas hasta las ciudades. El agua viajaba por un canal en lo alto del puente gracias a una suave cuesta. En Segovia se conserva un acueducto romano impresionante.",
                "preguntas": [
                        {
                                "q": "¿Para qué servían los acueductos romanos?",
                                "opts": [
                                        "Para transportar agua a las ciudades",
                                        "Para que pasaran los trenes",
                                        "Para guardar soldados",
                                        "Para cazar pájaros"
                                ],
                                "correct": 0
                        },
                        {
                                "q": "¿De qué forma eran las estructuras que sostenían el acueducto?",
                                "opts": [
                                        "Grandes arcos de piedra",
                                        "Tubos de plástico",
                                        "Postes de madera fina",
                                        "Muros de barro"
                                ],
                                "correct": 0
                        },
                        {
                                "q": "¿En qué ciudad española hay un acueducto famoso?",
                                "opts": [
                                        "En Segovia",
                                        "En Bilbao",
                                        "En Sevilla",
                                        "En Valencia"
                                ],
                                "correct": 0
                        }
                ]
        },
        {
                "titulo": "Las Pirámides de Egipto",
                "texto": "En el antiguo Egipto, los faraones construían pirámides gigantescas de piedra en el desierto. Miles de constructores colocaban enormes bloques de piedra unos sobre otros. Cerca de las pirámides pasaba el gran río Nilo, cuyas aguas daban vida a los campos de cultivo.",
                "preguntas": [
                        {
                                "q": "¿Quiénes mandaban construir las pirámides?",
                                "opts": [
                                        "Los faraones de Egipto",
                                        "Los piratas del mar",
                                        "Los caballeros medievales",
                                        "Los astronautas"
                                ],
                                "correct": 0
                        },
                        {
                                "q": "¿Dónde se encuentran las pirámides?",
                                "opts": [
                                        "En el desierto de Egipto",
                                        "En la selva amazónica",
                                        "En una montaña helada",
                                        "En el fondo del mar"
                                ],
                                "correct": 0
                        },
                        {
                                "q": "¿Qué río importante pasa cerca de las pirámides?",
                                "opts": [
                                        "El río Nilo",
                                        "El río Tajo",
                                        "El río Ebro",
                                        "El río Amazonas"
                                ],
                                "correct": 0
                        }
                ]
        },
        {
                "titulo": "Los Barcos Vikingos",
                "texto": "Los vikingos eran navegantes del norte de Europa. Construían barcos largos de madera con remos y una gran vela a rayas. En la punta del barco tallaban la cabeza de un dragón de madera para asustar a los monstruos del mar y darse valor.",
                "preguntas": [
                        {
                                "q": "¿Cómo eran los barcos de los vikingos?",
                                "opts": [
                                        "Largos, de madera y con remos",
                                        "De hierro con motor",
                                        "Pequeñas canoas de corcho",
                                        "Balsas de goma"
                                ],
                                "correct": 0
                        },
                        {
                                "q": "¿Qué figura tallaban en la proa del barco?",
                                "opts": [
                                        "La cabeza de un dragón",
                                        "Un pez de colores",
                                        "Una flor grande",
                                        "Un perro dormilón"
                                ],
                                "correct": 0
                        },
                        {
                                "q": "¿De qué parte de Europa eran los vikingos?",
                                "opts": [
                                        "Del norte de Europa",
                                        "Del sur de África",
                                        "De una isla tropical",
                                        "De Asia central"
                                ],
                                "correct": 0
                        }
                ]
        },
        {
                "titulo": "El Reloj de Sol",
                "texto": "Antes de tener relojes de pulsera o teléfonos, la gente miraba al cielo para saber la hora. Inventaron el reloj de sol, que tenía una barrita de metal sobre una tabla con números. Cuando el sol brillaba, la sombra de la barrita marcaba la hora exacta.",
                "preguntas": [
                        {
                                "q": "¿Cómo funcionaba el reloj de sol?",
                                "opts": [
                                        "Con la sombra que proyectaba el sol",
                                        "Con una pequeña pila",
                                        "Con campanadas mecánicas",
                                        "Con agua caliente"
                                ],
                                "correct": 0
                        },
                        {
                                "q": "¿Cuándo no se podía usar el reloj de sol?",
                                "opts": [
                                        "De noche o con lluvia",
                                        "Al mediodía con luz",
                                        "A las diez de la mañana",
                                        "En días soleados"
                                ],
                                "correct": 0
                        },
                        {
                                "q": "¿Qué mide cualquier reloj?",
                                "opts": [
                                        "Las horas y el tiempo",
                                        "El peso de los libros",
                                        "La altura de las casas",
                                        "El frío del agua"
                                ],
                                "correct": 0
                        }
                ]
        },
        {
                "titulo": "El Reloj de Arena",
                "texto": "El reloj de arena tiene dos bombillas de cristal unidas por un cuello estrecho. Dentro hay arena muy fina que cae granito a granito desde arriba hacia abajo. Cuando toda la arena baja, ha pasado un tiempo exacto, como tres minutos o una hora.",
                "preguntas": [
                        {
                                "q": "¿Qué material cae dentro del reloj de arena?",
                                "opts": [
                                        "Arena muy fina",
                                        "Gotas de aceite",
                                        "Piedras grandes",
                                        "Agua de lluvia"
                                ],
                                "correct": 0
                        },
                        {
                                "q": "¿De qué material son las bombillas del reloj?",
                                "opts": [
                                        "De cristal transparente",
                                        "De metal opaco",
                                        "De madera tallada",
                                        "De barro cocido"
                                ],
                                "correct": 0
                        },
                        {
                                "q": "¿Qué hay que hacer para que vuelva a contar?",
                                "opts": [
                                        "Darle la vuelta al reloj",
                                        "Echarle más arena",
                                        "Ponerle una pila",
                                        "Agitarlo fuerte"
                                ],
                                "correct": 0
                        }
                ]
        },
        {
                "titulo": "La Brújula de los Navegantes",
                "texto": "La brújula tiene una aguja imantada que siempre señala hacia el norte de la Tierra. Gracias a la brújula, los marineros podían viajar en barco por la noche o con niebla sin perderse en el océano. Fue un invento que ayudó a descubrir nuevos continentes.",
                "preguntas": [
                        {
                                "q": "¿Hacia dónde señala siempre la aguja de la brújula?",
                                "opts": [
                                        "Hacia el norte",
                                        "Hacia el sur",
                                        "Hacia el sol",
                                        "Hacia donde sopla el viento"
                                ],
                                "correct": 0
                        },
                        {
                                "q": "¿A quiénes ayudaba especialmente la brújula?",
                                "opts": [
                                        "A los marineros en el mar",
                                        "A los panaderos del pueblo",
                                        "A los niños al dormir",
                                        "A los jardineros"
                                ],
                                "correct": 0
                        },
                        {
                                "q": "¿Por qué no se perdían con la brújula?",
                                "opts": [
                                        "Porque siempre sabían dónde estaba el norte",
                                        "Porque la brújula hablaba",
                                        "Porque tenía luces de colores",
                                        "Porque flotaba en el agua"
                                ],
                                "correct": 0
                        }
                ]
        },
        {
                "titulo": "Las Tres Carabelas de Colón",
                "texto": "En el año 1492, tres barcos de madera cruzaron el océano Atlántico. Se llamaban la Pinta, la Niña y la Santa María. Iban impulsados por el viento en sus grandes velas de tela. Tras muchas semanas en el mar, un marinero gritó: ¡Tierra a la vista!",
                "preguntas": [
                        {
                                "q": "¿Cuántos barcos hicieron el famoso viaje de 1492?",
                                "opts": [
                                        "Tres barcos",
                                        "Diez barcos",
                                        "Un solo barco",
                                        "Cinco barcos"
                                ],
                                "correct": 0
                        },
                        {
                                "q": "¿Qué océano tuvieron que cruzar?",
                                "opts": [
                                        "El océano Atlántico",
                                        "El océano Glacial Ártico",
                                        "El mar Muerto",
                                        "El océano Índico"
                                ],
                                "correct": 0
                        },
                        {
                                "q": "¿Qué movía a aquellos barcos?",
                                "opts": [
                                        "El viento en sus velas",
                                        "Un motor de gasolina",
                                        "Grandes hélices eléctricas",
                                        "Remos mecánicos"
                                ],
                                "correct": 0
                        }
                ]
        },
        {
                "titulo": "El Pergamino y la Pluma de Ave",
                "texto": "Antiguamente no había papel blanco de libreta. Se escribía sobre pergamino, que era una lámina fina hecha con piel de cordero limpia y alisada. Para escribir, afilaban la punta de una pluma de ganso y la mojaban en tinta negra hecha con carbón y agua.",
                "preguntas": [
                        {
                                "q": "¿Sobre qué escribían antes de tener papel?",
                                "opts": [
                                        "Sobre pergamino",
                                        "Sobre hojas de árbol secas",
                                        "Sobre placas de plástico",
                                        "Sobre telas de lana"
                                ],
                                "correct": 0
                        },
                        {
                                "q": "¿Qué usaban como bolígrafo para escribir?",
                                "opts": [
                                        "Plumas de ave afiladas",
                                        "Rotuladores de colores",
                                        "Tizas de pizarra",
                                        "Pinceles de pintor"
                                ],
                                "correct": 0
                        },
                        {
                                "q": "¿Dónde mojaban la pluma para que pintara?",
                                "opts": [
                                        "En tinta negra",
                                        "En agua limpia",
                                        "En zumo de naranja",
                                        "En leche fresca"
                                ],
                                "correct": 0
                        }
                ]
        },
        {
                "titulo": "La Imprenta de Gutenberg",
                "texto": "Antes de inventar la imprenta, los monjes copiaban los libros a mano uno a uno, tardando meses en cada libro. Un inventor llamado Gutenberg creó letras de metal que se mojaban en tinta y se estampaban en el papel. Así se pudieron imprimir muchos libros rápidamente.",
                "preguntas": [
                        {
                                "q": "¿Cómo se hacían los libros antes de la imprenta?",
                                "opts": [
                                        "Copiándolos a mano uno a uno",
                                        "Con fotocopiadoras",
                                        "Con impresoras láser",
                                        "Con fotos de móvil"
                                ],
                                "correct": 0
                        },
                        {
                                "q": "¿Quién inventó la imprenta de tipos de metal?",
                                "opts": [
                                        "Gutenberg",
                                        "Cervantes",
                                        "Don Quijote",
                                        "Sancho Panza"
                                ],
                                "correct": 0
                        },
                        {
                                "q": "¿Qué ventaja tuvo la imprenta?",
                                "opts": [
                                        "Se hacían muchos libros más rápido",
                                        "Los libros no pesaban nada",
                                        "Los libros tenían música",
                                        "Los libros brillaban en la noche"
                                ],
                                "correct": 0
                        }
                ]
        },
        {
                "titulo": "El Mercado y el Trueque",
                "texto": "En los pueblos antiguos no siempre había monedas para comprar cosas. La gente utilizaba el trueque: cambiaban unas cosas por otras. Por ejemplo, un campesino cambiaba un saco de trigo por una cesta de manzanas o por una manta de lana bien calentita.",
                "preguntas": [
                        {
                                "q": "¿En qué consistía el trueque en el mercado?",
                                "opts": [
                                        "En intercambiar cosas sin dinero",
                                        "En regalar todo gratis",
                                        "En pagar con tarjeta",
                                        "En jugar a las cartas"
                                ],
                                "correct": 0
                        },
                        {
                                "q": "¿Qué podía cambiar un campesino por trigo?",
                                "opts": [
                                        "Manzanas o mantas de lana",
                                        "Teléfonos móviles",
                                        "Coches de juguete",
                                        "Monopatines"
                                ],
                                "correct": 0
                        },
                        {
                                "q": "¿Dónde se reunía la gente para hacer intercambios?",
                                "opts": [
                                        "En la plaza del mercado",
                                        "En la cima del monte",
                                        "En el tejado de la iglesia",
                                        "En el río a oscuras"
                                ],
                                "correct": 0
                        }
                ]
        },
        {
                "titulo": "Las Murallas de Ávila",
                "texto": "La ciudad de Ávila tiene una muralla de piedra enorme que rodea todo el casco antiguo. Tiene casi noventa torres redondas y nueve puertas para entrar. Se construyó hace muchos siglos para defender a las familias que vivían dentro de la ciudad.",
                "preguntas": [
                        {
                                "q": "¿Qué rodea la ciudad de Ávila?",
                                "opts": [
                                        "Una gran muralla de piedra",
                                        "Un río de agua salada",
                                        "Un foso con cocodrilos",
                                        "Una valla de alambre"
                                ],
                                "correct": 0
                        },
                        {
                                "q": "¿Para qué se construyó la muralla?",
                                "opts": [
                                        "Para proteger y defender la ciudad",
                                        "Para que no entrara el viento",
                                        "Para colgar cuadros",
                                        "Para jugar al escondite"
                                ],
                                "correct": 0
                        },
                        {
                                "q": "¿Por dónde entraban las personas a la ciudad?",
                                "opts": [
                                        "Por las nueve puertas de la muralla",
                                        "Por ventanas altas",
                                        "Tirándose en tirolina",
                                        "Por túneles de agua"
                                ],
                                "correct": 0
                        }
                ]
        },
        {
                "titulo": "Dulcinea del Toboso",
                "texto": "Don Quijote decía que todo caballero necesitaba una dama a quien dedicar sus aventuras. Él eligió a una campesina bondadosa de El Toboso llamada Aldonza, a la que bautizó con el nombre de Dulcinea. Don Quijote siempre pensaba en ella cuando salía a los caminos.",
                "preguntas": [
                        {
                                "q": "¿En qué pueblo vivía Dulcinea?",
                                "opts": [
                                        "En El Toboso",
                                        "En Madrid",
                                        "En Barcelona",
                                        "En Sevilla"
                                ],
                                "correct": 0
                        },
                        {
                                "q": "¿Por qué Don Quijote le dedicaba sus triunfos?",
                                "opts": [
                                        "Porque era su dama elegida",
                                        "Porque era su profesora",
                                        "Para que le diese monedas",
                                        "Porque ella se lo pidió"
                                ],
                                "correct": 0
                        },
                        {
                                "q": "¿Cómo era Dulcinea en la realidad?",
                                "opts": [
                                        "Una bondadosa campesina del pueblo",
                                        "Una reina de un país lejano",
                                        "Una hechicera del bosque",
                                        "Una sirena del mar"
                                ],
                                "correct": 0
                        }
                ]
        },
        {
                "titulo": "El Alfarero y el Barro",
                "texto": "El alfarero es un artesano que trabaja con barro húmedo. Se sienta frente a una rueda que gira llamada torno y con sus manos da forma a cántaros, platos y vasijas. Después, mete las piezas en un horno caliente de leña para que el barro se endurezca.",
                "preguntas": [
                        {
                                "q": "¿Con qué material trabaja el alfarero?",
                                "opts": [
                                        "Con barro húmedo o arcilla",
                                        "Con lana de oveja",
                                        "Con madera de pino",
                                        "Con metal fundido"
                                ],
                                "correct": 0
                        },
                        {
                                "q": "¿Qué máquina usa para dar forma al barro?",
                                "opts": [
                                        "El torno de alfarero",
                                        "Una máquina de coser",
                                        "Un taladro grande",
                                        "Una carretilla"
                                ],
                                "correct": 0
                        },
                        {
                                "q": "¿Dónde mete las vasijas para que se endurezcan?",
                                "opts": [
                                        "En un horno caliente",
                                        "En el congelador",
                                        "En el fondo de la piscina",
                                        "Bajo la cama"
                                ],
                                "correct": 0
                        }
                ]
        },
        {
                "titulo": "El Herrero y el Yunque",
                "texto": "En los pueblos antiguos, el herrero fabricaba herraduras para los caballos y herramientas para el campo. Calentaba el hierro en una fragua con carbón al rojo vivo. Cuando el hierro estaba blando, lo golpeaba con un martillo pesado sobre un bloque de acero llamado yunque.",
                "preguntas": [
                        {
                                "q": "¿Qué fabricaba el herrero del pueblo?",
                                "opts": [
                                        "Herraduras y herramientas de hierro",
                                        "Pan dulce y pasteles",
                                        "Zapatos de cuero fino",
                                        "Libros de cuentos"
                                ],
                                "correct": 0
                        },
                        {
                                "q": "¿Dónde calentaba el hierro?",
                                "opts": [
                                        "En la fragua con carbón caliente",
                                        "En el microondas",
                                        "Al sol en la ventana",
                                        "Con una vela pequeña"
                                ],
                                "correct": 0
                        },
                        {
                                "q": "¿Cómo se llama el bloque de acero donde golpeaba el hierro?",
                                "opts": [
                                        "Yunque",
                                        "Torno",
                                        "Mesa de madera",
                                        "Piedra pómez"
                                ],
                                "correct": 0
                        }
                ]
        },
        {
                "titulo": "Las Palomas Mensajeras",
                "texto": "Antes del correo electrónico y los teléfonos, se utilizaban palomas mensajeras para enviar notas urgentes. Las palomas tienen un sentido de orientación increíble y siempre saben volver a su palomar. Les ataban un tubito con una carta diminuta en la patita.",
                "preguntas": [
                        {
                                "q": "¿Para qué se utilizaban las palomas mensajeras?",
                                "opts": [
                                        "Para enviar notas urgentes a distancia",
                                        "Para cazar insectos en el campo",
                                        "Para cantar en las fiestas",
                                        "Para vigilar la puerta"
                                ],
                                "correct": 0
                        },
                        {
                                "q": "¿Por qué eran tan buenas para esta tarea?",
                                "opts": [
                                        "Porque siempre saben volver a su nido",
                                        "Porque saben leer los mensajes",
                                        "Porque vuelan de noche sin luz",
                                        "Porque no se cansan nunca"
                                ],
                                "correct": 0
                        },
                        {
                                "q": "¿Dónde llevaban el tubito con el mensaje?",
                                "opts": [
                                        "Atado en una patita",
                                        "En el pico",
                                        "Debajo del ala",
                                        "En la cabeza"
                                ],
                                "correct": 0
                        }
                ]
        },
        {
                "titulo": "El Telescopio de Galileo",
                "texto": "Hace cuatrocientos años, el sabio Galileo Galilei fabricó un telescopio con tubos de madera y lentes de cristal. Miró al cielo nocturno y descubrió montañas en la Luna y cuatro lunas que daban vueltas alrededor del planeta Júpiter. ¡Fue un descubrimiento asombroso!",
                "preguntas": [
                        {
                                "q": "¿Qué instrumento construyó Galileo?",
                                "opts": [
                                        "Un telescopio",
                                        "Un microscopio",
                                        "Una brújula marina",
                                        "Un reloj de cuerda"
                                ],
                                "correct": 0
                        },
                        {
                                "q": "¿Qué vio en la Luna al mirarla con el telescopio?",
                                "opts": [
                                        "Montañas y cráteres",
                                        "Casas de madera",
                                        "Árboles verdes",
                                        "Ríos de agua dulce"
                                ],
                                "correct": 0
                        },
                        {
                                "q": "¿Alrededor de qué planeta descubrió lunas?",
                                "opts": [
                                        "Júpiter",
                                        "Marte",
                                        "Venus",
                                        "Mercurio"
                                ],
                                "correct": 0
                        }
                ]
        },
        {
                "titulo": "La Llegada a la Luna",
                "texto": "En el año 1969, tres astronautas viajaron al espacio en el cohete Saturno V. Cuando llegaron a la Luna, Neil Armstrong pisó su superficie y dijo una frase histórica. Fue la primera vez que los seres humanos caminaron sobre un lugar fuera de la Tierra.",
                "preguntas": [
                        {
                                "q": "¿En qué año viajaron los astronautas a la Luna?",
                                "opts": [
                                        "En 1969",
                                        "En 1500",
                                        "En 1820",
                                        "En el año 2000"
                                ],
                                "correct": 0
                        },
                        {
                                "q": "¿Cómo se llamaba el astronauta que pisó la Luna primero?",
                                "opts": [
                                        "Neil Armstrong",
                                        "Don Quijote",
                                        "Galileo Galilei",
                                        "Cristóbal Colón"
                                ],
                                "correct": 0
                        },
                        {
                                "q": "¿En qué viajaron hasta el espacio?",
                                "opts": [
                                        "En un cohete espacial",
                                        "En un avión con hélices",
                                        "En un barco de vapor",
                                        "En un globo de aire"
                                ],
                                "correct": 0
                        }
                ]
        },
        {
                "titulo": "Los Dinosaurios y los Fósiles",
                "texto": "Los dinosaurios vivieron en la Tierra hace millones de años, mucho antes de que existieran los primeros humanos. Hoy sabemos cómo eran gracias a los fósiles, que son huesos o huellas de dinosaurio que se quedaron petrificados en las rocas a lo largo del tiempo.",
                "preguntas": [
                        {
                                "q": "¿Cuándo vivieron los dinosaurios en la Tierra?",
                                "opts": [
                                        "Hace millones de años",
                                        "Hace cien años",
                                        "Ayer por la tarde",
                                        "En la Edad Media"
                                ],
                                "correct": 0
                        },
                        {
                                "q": "¿Cómo sabemos hoy cómo eran los dinosaurios?",
                                "opts": [
                                        "Por los fósiles y huesos en las rocas",
                                        "Por vídeos de internet",
                                        "Porque aún viven en el bosque",
                                        "Por fotos antiguas"
                                ],
                                "correct": 0
                        },
                        {
                                "q": "¿Qué es un fósil?",
                                "opts": [
                                        "Un resto antiguo convertido en piedra",
                                        "Una piedra preciosa nueva",
                                        "Un dibujo en papel",
                                        "Un tipo de comida"
                                ],
                                "correct": 0
                        }
                ]
        },
        {
                "titulo": "El Molino de Agua",
                "texto": "Además de molinos de viento, en los ríos había molinos de agua. El agua del río caía sobre una gran rueda con paletas y la hacía girar con fuerza. Esa rueda movía una piedra pesada por dentro del molino para triturar los granos de trigo y conseguir harina.",
                "preguntas": [
                        {
                                "q": "¿Qué hacía girar la rueda del molino de agua?",
                                "opts": [
                                        "La fuerza de la corriente del río",
                                        "El calor del sol",
                                        "El viento suave",
                                        "Animales tirando"
                                ],
                                "correct": 0
                        },
                        {
                                "q": "¿Para qué servía moler el trigo?",
                                "opts": [
                                        "Para conseguir harina para hacer pan",
                                        "Para hacer zumo",
                                        "Para pintar la pared",
                                        "Para encender fuego"
                                ],
                                "correct": 0
                        },
                        {
                                "q": "¿Dónde se construían estos molinos?",
                                "opts": [
                                        "Junto a la orilla del río",
                                        "En lo alto de los cerros secos",
                                        "En el centro de la plaza",
                                        "Bajo tierra"
                                ],
                                "correct": 0
                        }
                ]
        },
        {
                "titulo": "Los Juglares y sus Canciones",
                "texto": "En los pueblos medievales no había radios ni televisores. Cuando llegaba un juglar, toda la gente del pueblo se reunía en la plaza. El juglar tocaba un instrumento de cuerdas y cantaba poemas que contaban historias de caballeros valientes y dragones.",
                "preguntas": [
                        {
                                "q": "¿A qué se dedicaban los juglares?",
                                "opts": [
                                        "A cantar historias y tocar música",
                                        "A construir casas de piedra",
                                        "A vigilar las murallas",
                                        "A sembrar trigo en el campo"
                                ],
                                "correct": 0
                        },
                        {
                                "q": "¿Dónde se reunía la gente para escuchar al juglar?",
                                "opts": [
                                        "En la plaza del pueblo",
                                        "En el campanario a oscuras",
                                        "En el fondo del pozo",
                                        "En los establos"
                                ],
                                "correct": 0
                        },
                        {
                                "q": "¿Qué historias cantaban en sus poemas?",
                                "opts": [
                                        "Historias de caballeros y aventuras",
                                        "Cuentos de monstruos espaciales",
                                        "Noticias del tiempo de mañana",
                                        "Canciones en idiomas secretos"
                                ],
                                "correct": 0
                        }
                ]
        },
        {
                "titulo": "El Panadero y el Horno de Leña",
                "texto": "En la antigüedad, el panadero del pueblo se levantaba muy temprano, antes de que saliera el sol. Mezclaba harina, agua, sal y levadura para amasar el pan. Luego metía las barras en un horno de piedra caliente calentado con leña de encina. El pan salía crujiente y delicioso.",
                "preguntas": [
                        {
                                "q": "¿A qué hora empezaba a trabajar el panadero?",
                                "opts": [
                                        "Muy temprano, antes del amanecer",
                                        "A la hora de cenar",
                                        "Al mediodía",
                                        "Solo por las tardes"
                                ],
                                "correct": 0
                        },
                        {
                                "q": "¿Qué ingredientes usaba para hacer la masa?",
                                "opts": [
                                        "Harina, agua, sal y levadura",
                                        "Huevos, chocolate y nata",
                                        "Frutas y mermelada",
                                        "Queso y tomate"
                                ],
                                "correct": 0
                        },
                        {
                                "q": "¿Cómo calentaban el horno de piedra?",
                                "opts": [
                                        "Con leña de madera",
                                        "Con una estufa eléctrica",
                                        "Con gas de cocina",
                                        "Con agua hirviendo"
                                ],
                                "correct": 0
                        }
                ]
        },
        {
                "titulo": "La Campana de la Torre",
                "texto": "La torre de la iglesia tenía una gran campana de bronce. Cuando sonaba por la mañana, avisaba a los campesinos de que era hora de ir al campo. Si sonaba muy rápido, avisaba de una tormenta o de un fuego. Las campanas eran la voz del pueblo.",
                "preguntas": [
                        {
                                "q": "¿De qué material era la campana de la torre?",
                                "opts": [
                                        "De bronce",
                                        "De madera blanda",
                                        "De cristal fino",
                                        "De tela"
                                ],
                                "correct": 0
                        },
                        {
                                "q": "¿Para qué servían las campanadas matutinas?",
                                "opts": [
                                        "Para avisar del comienzo del día de trabajo",
                                        "Para asustar a los pájaros",
                                        "Para que todos cantaran",
                                        "Para pedir comida"
                                ],
                                "correct": 0
                        },
                        {
                                "q": "¿Qué significaba si la campana sonaba muy rápido?",
                                "opts": [
                                        "Una alarma de tormenta o fuego",
                                        "Que era fiesta de cumpleaños",
                                        "Que llegaban pasteles",
                                        "Que se abría el mercado"
                                ],
                                "correct": 0
                        }
                ]
        }
];

    // 2. BANCO DE CONTINÚA LA HISTORIA (Sin opciones fijas; con espacios y evaluación del maestro)
    const INICIOS_CONTINUA_HISTORIA = [
        {
                "titulo": "El Misterio del Pasadizo Secreto",
                "texto": "Una tarde de lluvia, el joven explorador retiró una pila de libros viejos en la biblioteca y vio una pequeña palanca de bronce oculta tras la pared. Al tirar de ella suavemente, la pared de piedra se abrió dejando al descubierto un pasadizo secreto que conducía hacia ________. Con el corazón latiendo de emoción, encendió su linterna y..."
        },
        {
                "titulo": "El Dragón del Jardín del Castillo",
                "texto": "En el patio trasero del castillo apareció una criatura con escamas verdes brillantes y alas pequeñas. En vez de rugir y asustar a la gente, el dragoncito tenía mucha hambre y pidió con voz dulce ________. La princesa corrió a la cocina para ayudarle y..."
        },
        {
                "titulo": "El Mapa dentro de la Tinaja",
                "texto": "Un alfarero limpiaba una vasija antigua encontrada en el río cuando notó que el fondo sonaba hueco. Al retirarlo con cuidado, cayó sobre la mesa un pergamino viejo donde estaba dibujado el camino hacia ________. En una esquina del mapa había una nota que decía..."
        },
        {
                "titulo": "El Molino que Brillaba de Noche",
                "texto": "A medianoche, las aspas del molino de viento manchego comenzaron a girar solas emitiendo un resplandor dorado. El molinero subió las escaleras de caracol y en la parte más alta encontró ________. Al acercar la mano despacio..."
        },
        {
                "titulo": "La Llave de la Torre Olvidada",
                "texto": "Durante una excursión al bosque, dos amigos hallaron una llave de hierro brillante enterrada entre las raíces de un roble centenario. La llave tenía grabada la palabra ________. Decidieron buscar en el pueblo qué puerta abría y..."
        },
        {
                "titulo": "La Máquina del Tiempo de la Inventora",
                "texto": "La inventora Lucía terminó de apretar el último tornillo de su máquina de ruedas doradas. Ajustó la aguja del reloj al año 1500 y pulsó el gran botón rojo. En un segundo, la habitación se llenó de humo blanco y apareció en medio de ________. Un señor con armadura se acercó y..."
        },
        {
                "titulo": "El Mensaje en la Botella del Río",
                "texto": "Paseando por la orilla del río Tajo al atardecer, dos niños vieron un brillo entre los juncos. Descorcharon un frasco de cristal verde y sacaron una carta que decía: \"Ayuda, hemos perdido ________ en la fortaleza de la colina\". Sin dudarlo, los dos amigos..."
        },
        {
                "titulo": "El Caballo que Sabía el Camino",
                "texto": "La niebla de la mañana era tan espesa que ningún vecino sabía cómo volver al pueblo tras la tormenta. El leal caballo Rocinante levantó las orejas, olió el aire y comenzó a trotar seguro hacia ________. Todos los viajeros le siguieron en fila y..."
        },
        {
                "titulo": "El Cofre Oculto en la Cueva",
                "texto": "Los pequeños exploradores entraron en una cueva iluminada por rayos de sol. En el rincón más hondo hallaron un cofre de madera cerrado con tres candados. En la tapa de madera ponía: \"Solo podrá abrirse cuando traigas ________\". Rápidamente se miraron y..."
        },
        {
                "titulo": "La Poción de la Botica Medieval",
                "texto": "En una pequeña cabaña del pueblo, la boticaria mezcló hojas de menta fresca, agua de manantial y unas gotas de miel dorada. Al remover el caldero con una cuchara de madera, el líquido se volvió de color ________ y empezó a soltar burbujas brillantes. De repente..."
        },
        {
                "titulo": "La Paloma Mensajera Despistada",
                "texto": "Una paloma blanca se posó en el alféizar de la ventana de la clase con un pequeño lazo rojo en la patita. En el papel enrollado ponía un mensaje secreto escrito con tinta azul: \"Reuníos esta tarde en ________ para descubrir el enigma\". Toda la clase..."
        },
        {
                "titulo": "El Escudo que Reflejaba la Verdad",
                "texto": "En la sala de armas del castillo había un escudo redondo tan pulido que parecía un espejo. Cuando el joven escudero se miró en él, no vio su rostro, sino la imagen de ________. Asombrado por lo que veía..."
        },
        {
                "titulo": "El Reloj de Arena Inagotable",
                "texto": "Un anciano sabio regaló a los niños un reloj de arena con granitos de color esmeralda. Lo más curioso era que la arena nunca se terminaba de caer. El anciano les susurró: \"Cada vez que caiga un granito, podréis pedir un deseo sobre ________\". Entonces los niños..."
        },
        {
                "titulo": "El Huerto Mágico del Monasterio",
                "texto": "En el huerto del convento crecía una planta muy especial que no daba tomates ni lechugas. Una mañana soleada, los escolares vieron que de sus ramas colgaban ________. Todos los vecinos del pueblo se acercaron admirados y..."
        },
        {
                "titulo": "La Pluma que Escribía Sola",
                "texto": "El maestro dejó sobre la mesa una pluma antigua con punta de plata. En cuanto todos salieron al recreo, la pluma se levantó en el aire y comenzó a escribir en la pizarra un cuento sobre ________. Al volver a entrar los alumnos..."
        },
        {
                "titulo": "El Barco Pirata sin Tripulación",
                "texto": "Al amanecer llegó a la bahía un barco de madera con velas moradas y el timón atado con una cuerda de oro. Cuando los vigías subieron a bordo, no había nadie, pero en la cubierta había una mesa con ________. El capitán de la guardia ordenó..."
        },
        {
                "titulo": "El Gran Enigma del Torneo Medieval",
                "texto": "Antes de que comenzara el torneo de caballeros, el heraldo real sopló una trompeta y leyó una adivinanza para todos los asistentes: \"El caballero que quiera ganar el trofeo debe traer primero ________\". Don Quijote se levantó de su asiento y..."
        },
        {
                "titulo": "La Campana que Sonaba al Revés",
                "texto": "La vieja campana de la ermita nunca sonaba como las demás. En lugar de hacer \"dinnn-donnn\", producía una melodía suave que hacía que todos los animales del bosque se acercaran a ________. Un día de fiesta..."
        },
        {
                "titulo": "El Telescopio hacia el Pasado",
                "texto": "Una noche de luna llena, la astrónoma enfocó su telescopio hacia las estrellas. Pero en vez de ver cometas, vio cómo era el pueblo hace trescientos años con gente vestida de capa reuniéndose en ________. Al mirar con más atención..."
        },
        {
                "titulo": "La Flor de la Cima Nevada",
                "texto": "Cuentan los pastores de la sierra que en la cima más alta crece una flor azul que cura la tristeza. Dos valientes niños se pusieron sus abrigos de lana y comenzaron a subir la montaña llevando en su mochila ________. Cuando llegaron a lo alto..."
        },
        {
                "titulo": "El Eco que Respondía con Rimas",
                "texto": "Cerca del desfiladero de piedra, cuando alguien gritaba, el eco no repetía lo mismo, sino que contestaba con una divertida rima sobre ________. Los niños pasaron toda la tarde jugando hasta que de pronto..."
        },
        {
                "titulo": "El Amuleto de Barro Romano",
                "texto": "Durante las obras del patio de la escuela, apareció una pequeña figura de barro con la forma de un delfín. Al limpiarla con agua templada, en su lomo se iluminó una frase en latín que significaba ________. La profesora de historia..."
        },
        {
                "titulo": "El Baile de los Trovadores",
                "texto": "El pueblo entero celebró la fiesta de la primavera en la plaza. Los músicos sacaron sus laúdes y panderetas y enseñaron a los niños un baile tradicional en el que todos tenían que saltar hacia ________. En medio del baile..."
        },
        {
                "titulo": "El Pan Gigante de la Fiesta",
                "texto": "Los panaderos de la comarca decidieron hornear el pan más grande del mundo en el horno comunal. Cuando abrieron la puerta del horno, el pan tenía la curiosa forma de ________. Para repartirlo entre todos..."
        },
        {
                "titulo": "El Carro de la Cosecha Perdida",
                "texto": "Un agricultor volvía del campo al anochecer cuando se le rompió una rueda del carro cargado de calabazas. Justo cuando empezaba a preocuparse, vio que desde el sendero venían a ayudarle ________. Juntos lograron..."
        },
        {
                "titulo": "La Corona de Laurel del Campeón",
                "texto": "En los juegos deportivos escolares de la villa romana, el vencedor no recibía una copa de oro, sino una corona tejida con hojas de laurel y una medalla que representaba ________. Cuando llamaron al podio al ganador..."
        },
        {
                "titulo": "El Libro que Cambiaba de Dibujos",
                "texto": "En la biblioteca del colegio había un cuento muy misterioso. Cada vez que un niño nuevo lo abría, las ilustraciones cambiaban para mostrar una aventura en ________. Cuando le tocó el turno a Pablo..."
        },
        {
                "titulo": "El Faro de la Isla Lejana",
                "texto": "En un islote rocoso, el farero subía cada tarde los cien escalones de caracol para encender la linterna del faro. Una noche de tormenta, la luz se apagó y el farero tuvo que usar ________ para salvar a los barcos. De pronto..."
        },
        {
                "titulo": "El Retablo de Títeres Ambulante",
                "texto": "Llegó a la plaza del pueblo una carreta con un teatro de títeres de madera tallada. El titiritero comenzó a mover las marionetas, que contaban la historia de una valiente niña que rescató ________. Todos los niños aplaudían cuando..."
        },
        {
                "titulo": "El Árbol Milenario de los Deseos",
                "texto": "En el centro de la dehesa crecía una encina gigantesca con un tronco tan ancho que hacían falta seis niños para abrazarlo. Cuenta la leyenda que si dejas una piedra redonda en su hueco y pides ________, el árbol te escucha. María se acercó en silencio y..."
        }
];

    // 3. BANCO DE PALABRAS PARA CREAR UNA HISTORIA
    const BANCO_CREA_HISTORIA = {
        "personajes": [
                {
                        "nombre": "Un caballero andante valiente"
                },
                {
                        "nombre": "Una inventora con gafas curiosas"
                },
                {
                        "nombre": "Un dragón bondadoso que come lechuga"
                },
                {
                        "nombre": "Un escudero leal con una mochila"
                },
                {
                        "nombre": "Una arqueóloga que busca tesoros"
                },
                {
                        "nombre": "Un alfarero con manos de barro"
                },
                {
                        "nombre": "Una princesa que ama la ciencia"
                },
                {
                        "nombre": "Un molinero alegre y cantarín"
                },
                {
                        "nombre": "Una astrónoma que mira las estrellas"
                },
                {
                        "nombre": "Un marinero que habla con delfines"
                },
                {
                        "nombre": "Un detective de misterios antiguos"
                },
                {
                        "nombre": "Una niña trovadora con su laúd"
                },
                {
                        "nombre": "Un pastor que cuida a sus ovejas"
                },
                {
                        "nombre": "Un herrero de martillo fuerte"
                },
                {
                        "nombre": "Un sabio monje que lee pergaminos"
                },
                {
                        "nombre": "Un panadero de harina mágica"
                },
                {
                        "nombre": "Una capitana de barco veloz"
                },
                {
                        "nombre": "Un duende guardián del bosque"
                },
                {
                        "nombre": "Una médica de plantas curativas"
                },
                {
                        "nombre": "Un astronauta recién llegado"
                }
        ],
        "lugares": [
                {
                        "nombre": "En las almenas de un castillo de piedra"
                },
                {
                        "nombre": "En lo alto de un molino de viento"
                },
                {
                        "nombre": "En una biblioteca secreta con pasadizos"
                },
                {
                        "nombre": "En una cueva con pinturas antiguas"
                },
                {
                        "nombre": "En la plaza mayor en día de mercado"
                },
                {
                        "nombre": "En un barco de madera cruzando el mar"
                },
                {
                        "nombre": "En una aldea romana junto al río"
                },
                {
                        "nombre": "En un taller de inventos mecánicos"
                },
                {
                        "nombre": "En un bosque de robles gigantescos"
                },
                {
                        "nombre": "En la cima nevada de una montaña"
                },
                {
                        "nombre": "En una isla desierta con palmeras"
                },
                {
                        "nombre": "En un puente de piedra sobre el río"
                },
                {
                        "nombre": "En una gruta de cristales brillantes"
                },
                {
                        "nombre": "En un jardín botánico con flores raras"
                },
                {
                        "nombre": "En un faro solitario frente a las olas"
                },
                {
                        "nombre": "En las ruinas de un anfiteatro"
                },
                {
                        "nombre": "En un campamento bajo las estrellas"
                },
                {
                        "nombre": "En una granja con animales traviesos"
                }
        ],
        "objetos": [
                {
                        "nombre": "Una brújula dorada que busca secretos"
                },
                {
                        "nombre": "Una llave antigua de hierro y plata"
                },
                {
                        "nombre": "Un mapa del tesoro con una cruz roja"
                },
                {
                        "nombre": "Un reloj de arena que cuenta minutos mágicos"
                },
                {
                        "nombre": "Un catalejo de latón para ver lejos"
                },
                {
                        "nombre": "Un pergamino con una carta secreta"
                },
                {
                        "nombre": "Una pluma mágica que escribe en el aire"
                },
                {
                        "nombre": "Un cántaro de barro que no se vacía"
                },
                {
                        "nombre": "Un escudo pulido que brilla con el sol"
                },
                {
                        "nombre": "Una herradura de plata de la buena suerte"
                },
                {
                        "nombre": "Un cofre pequeño con tres candados"
                },
                {
                        "nombre": "Una mochila llena de herramientas"
                },
                {
                        "nombre": "Una linterna de cristal con luz verde"
                },
                {
                        "nombre": "Un libro con tapas de cuero grabado"
                },
                {
                        "nombre": "Una corona hecha con hojas de laurel"
                },
                {
                        "nombre": "Un frasco con polvo de estrellas"
                },
                {
                        "nombre": "Una bota de cuero que da saltos altos"
                },
                {
                        "nombre": "Un silbato de madera que llama a las aves"
                }
        ],
        "misiones": [
                {
                        "nombre": "Tienen que descifrar un enigma antes de cenar"
                },
                {
                        "nombre": "Deben entregar un mensaje secreto de paz"
                },
                {
                        "nombre": "Tienen que salvar los libros de una tormenta"
                },
                {
                        "nombre": "Deben encontrar una rueda rota del carro"
                },
                {
                        "nombre": "Tienen que preparar una tarta para el rey"
                },
                {
                        "nombre": "Deben construir un puente para cruzar el río"
                },
                {
                        "nombre": "Tienen que ayudar a un viajero que se ha perdido"
                },
                {
                        "nombre": "Deben inventar una máquina que vuele"
                },
                {
                        "nombre": "Tienen que devolver un objeto a su dueño"
                },
                {
                        "nombre": "Deben encontrar el manantial de agua pura"
                },
                {
                        "nombre": "Tienen que celebrar la fiesta de primavera del pueblo"
                },
                {
                        "nombre": "Deben rescatar a un corderito atrapado en la colina"
                },
                {
                        "nombre": "Tienen que abrir una puerta que lleva cerrada cien años"
                },
                {
                        "nombre": "Deben aprender una canción tradicional con el trovador"
                }
        ]
};

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
            titulo: item.titulo,
            texto: item.texto,
            nivel
        };
    }

    function generateCreaHistoriaActivity(nivel, idNum) {
        const pList = BANCO_CREA_HISTORIA.personajes;
        const lList = BANCO_CREA_HISTORIA.lugares;
        const oList = BANCO_CREA_HISTORIA.objetos;
        const mList = BANCO_CREA_HISTORIA.misiones;

        const p = pList[(idNum * 3) % pList.length];
        const l = lList[(idNum * 5) % lList.length];
        const o = oList[(idNum * 7) % oList.length];
        const m = mList[(idNum * 11) % mList.length];

        return {
            id: `crea_${nivel}_${idNum}`,
            tipo: 'crea_historia',
            titulo: 'El Telar de Palabras',
            subtitulo: '¡Inventa un cuento fantástico con tu clase!',
            personaje: p.nombre,
            lugar: l.nombre,
            objeto: o.nombre,
            mision: m.nombre,
            palabras: [p.nombre, l.nombre, o.nombre, m.nombre],
            nivel
        };
    }

    // 5. CONTROLADOR PRINCIPAL DEL BANCO DE HISTORIA
    const HistoryBank = {
        TEXTOS_COMPRENSION,
        INICIOS_CONTINUA_HISTORIA,
        BANCO_CREA_HISTORIA,

        generateBankForLevel(nivel) {
            const list = [];
            // 60 actividades de Comprensión lectora
            for (let i = 1; i <= 60; i++) {
                list.push(generateComprensionActivity(nivel, i));
            }
            // 60 actividades de Continúa la historia
            for (let i = 1; i <= 60; i++) {
                list.push(generateContinuaActivity(nivel, i));
            }
            // 60 actividades de Crea una historia
            for (let i = 1; i <= 60; i++) {
                list.push(generateCreaHistoriaActivity(nivel, i));
            }
            // Total: 180 actividades variadas por nivel (distribución 1/3, 1/3, 1/3)
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
            console.log(`[HistoryBank] Banco de Historia cargado: ${total} actividades en total (Biblioteca Mágica).`);
        }
    };

    window.HistoryBank = HistoryBank;

    // Inicialización automática
    HistoryBank.init();
})();
