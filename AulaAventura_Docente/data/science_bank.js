/**
 * science_bank.js - Banco Extenso de Conocimiento del Medio / Ciencias (Laboratorio de Inventos)
 * Genera más de 2.700 actividades adaptadas por nivel (1.º a 6.º de Primaria)
 * Cumple al 100% las especificaciones de DIARIO DEL EXPLORADOR / MANUAL DEL AVENTURERO:
 *  - Reciclaje: Clasificación en los 4 contenedores (Azul, Amarillo, Verde, Marrón) con Drag & Drop y selección accesible.
 *  - ¿Dónde vive...? (Hábitats): Animales y sus hogares naturales (Desierto, Océano, Polo, Selva, Sabana, Bosque, Granja).
 *  - Seguridad Vial: Ceras escolares verde y roja ("¿Es seguro o peligroso?"), situaciones reales y recompensas.
 */

(function () {
    'use strict';

    function shuffle(arr) {
        for (let i = arr.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [arr[i], arr[j]] = [arr[j], arr[i]];
        }
        return arr;
    }

    // ==========================================
    // 1. BANCO DE DATOS DE RECICLAJE (4 CONTENEDORES)
    // ==========================================
    const CONTENEDORES_INFO = {
        azul: { id: 'azul', nombre: 'Papel y Cartón', color: '#2563eb', bgHover: '#dbeafe', emoji: '📦', icon: '📄', desc: 'Folios, periódicos, cajas de cartón y revistas' },
        amarillo: { id: 'amarillo', nombre: 'Plásticos y Latas', color: '#eab308', bgHover: '#fef9c3', emoji: '🥫', icon: '🧴', desc: 'Botellas plásticas, latas de refresco, briks y envases' },
        verde: { id: 'verde', nombre: 'Vidrio', color: '#16a34a', bgHover: '#dcfce7', emoji: '🍾', icon: '🫙', desc: 'Botellas de cristal, tarros de mermelada y conservas' },
        marron: { id: 'marron', nombre: 'Orgánico', color: '#854d0e', bgHover: '#fef3c7', emoji: '🍂', icon: '🍎', desc: 'Restos de comida, pieles de fruta, cáscaras y hojas' }
    };

    const RESIDUOS_RECICLAJE = [
        // --- AZUL: PAPEL Y CARTÓN ---
        { n: 'Caja de zapatos de cartón', e: '📦', c: 'azul', exp: 'El cartón limpio va al contenedor azul para fabricar cajas nuevas.' },
        { n: 'Periódico de ayer', e: '📰', c: 'azul', exp: 'Los periódicos viejos se reciclan en el contenedor azul para hacer más papel.' },
        { n: 'Revista de cómics vieja', e: '📖', c: 'azul', exp: 'Las revistas de papel van al contenedor azul.' },
        { n: 'Bolsa de papel de la panadería', e: '🛍️', c: 'azul', exp: 'Las bolsas de papel sin plastificar van directamente al azul.' },
        { n: 'Folio de dibujo usado', e: '📄', c: 'azul', exp: 'Los folios usados de clase van al contenedor azul.' },
        { n: 'Huevera de cartón vacía', e: '🥚', c: 'azul', exp: 'Las hueveras hechas de cartón deben depositarse en el contenedor azul.' },
        { n: 'Tubo de cartón de papel higiénico', e: '🧻', c: 'azul', exp: 'El cartón del rollo higiénico o de cocina va al contenedor azul.' },
        { n: 'Caja de galletas de cartón', e: '🍪', c: 'azul', exp: 'Las cajas de cartón de galletas o cereales se reciclan en el contenedor azul.' },
        { n: 'Cuaderno escolar usado', e: '📓', c: 'azul', exp: 'Las hojas de libreta van al contenedor azul (quitando la espiral metálica).' },
        { n: 'Folleto publicitario de papel', e: '📑', c: 'azul', exp: 'La publicidad de buzón en papel se deposita en el contenedor azul.' },
        { n: 'Sobre de carta de papel', e: '✉️', c: 'azul', exp: 'Los sobres de papel van siempre al contenedor azul.' },
        { n: 'Papel de regalo usado', e: '🎁', c: 'azul', exp: 'El papel de envolver regalos debe ir al contenedor azul.' },
        { n: 'Caja de pizza de cartón sin grasa', e: '🍕', c: 'azul', exp: 'El cartón de la caja de pizza va al contenedor azul.' },
        { n: 'Cartulina de manualidades', e: '🎨', c: 'azul', exp: 'Los recortes de cartulinas escolares van al contenedor azul.' },
        { n: 'Bolsa de papel kraft', e: '🛍️', c: 'azul', exp: 'Las bolsas de papel marrón o kraft se tiran al azul.' },
        { n: 'Calendario de papel del año pasado', e: '🗓️', c: 'azul', exp: 'El papel de almanaques y calendarios se recicla en el contenedor azul.' },
        { n: 'Caja de cereales de desayuno', e: '🥣', c: 'azul', exp: 'La caja exterior de cartón de los cereales va al contenedor azul.' },
        { n: 'Guía telefónica o libro estropeado', e: '📚', c: 'azul', exp: 'El papel de los libros viejos inservibles va al azul.' },
        { n: 'Etiqueta de cartón de la ropa', e: '🏷️', c: 'azul', exp: 'Las etiquetas de cartón van al contenedor azul.' },
        { n: 'Envase de cartón de bombones', e: '🍫', c: 'azul', exp: 'La caja de cartón de los bombones pertenece al contenedor azul.' },

        // --- AMARILLO: ENVASES DE PLÁSTICO, LATAS Y BRIKS ---
        { n: 'Botella de plástico de agua', e: '🧴', c: 'amarillo', exp: 'Las botellas de plástico siempre deben tirarse al contenedor amarillo aplastadas.' },
        { n: 'Brik de leche', e: '🥛', c: 'amarillo', exp: 'Los briks combinan cartón, plástico y aluminio y van al contenedor amarillo.' },
        { n: 'Lata de refresco de naranja', e: '🥫', c: 'amarillo', exp: 'Las latas de aluminio se reciclan en el contenedor amarillo.' },
        { n: 'Brik de zumo de frutas', e: '🧃', c: 'amarillo', exp: 'Los envases tipo brik van al contenedor amarillo.' },
        { n: 'Bandeja blanca de corcho (poliespán)', e: '🍱', c: 'amarillo', exp: 'El poliestireno o corcho blanco de bandejas de comida va al contenedor amarillo.' },
        { n: 'Bolsa de plástico de la compra', e: '🛍️', c: 'amarillo', exp: 'Las bolsas de plástico de supermercado van al contenedor amarillo.' },
        { n: 'Bote de champú vacío', e: '🧴', c: 'amarillo', exp: 'Los envases de gel y champú de plástico se tiran al amarillo.' },
        { n: 'Vaso de yogur de plástico', e: '🥣', c: 'amarillo', exp: 'El envase de plástico del yogur y su tapa van al contenedor amarillo.' },
        { n: 'Lata de conserva de atún', e: '🐟', c: 'amarillo', exp: 'Las latas metálicas de conserva van al contenedor amarillo.' },
        { n: 'Bolsa de patatas fritas', e: '🥔', c: 'amarillo', exp: 'Los envoltorios de snacks y patatas van al contenedor amarillo.' },
        { n: 'Tubo de pasta de dientes gastado', e: '🪥', c: 'amarillo', exp: 'Los tubos de plástico de dentífrico van al contenedor amarillo.' },
        { n: 'Tarrina de mantequilla de plástico', e: '🧈', c: 'amarillo', exp: 'Las tarrinas de plástico de alimentos van al contenedor amarillo.' },
        { n: 'Chapas metálicas de botellín', e: '🏷️', c: 'amarillo', exp: 'Las chapas y tapones metálicos van al contenedor amarillo.' },
        { n: 'Botella de detergente líquido', e: '🧴', c: 'amarillo', exp: 'Las botellas de plástico de limpieza del hogar van al contenedor amarillo.' },
        { n: 'Film transparente de plástico', e: '🍙', c: 'amarillo', exp: 'El plástico film envolvente va al contenedor amarillo.' },
        { n: 'Envoltorio de plástico de magdalenas', e: '🧁', c: 'amarillo', exp: 'Los envoltorios de bollería van al contenedor amarillo.' },
        { n: 'Redecilla plástica de naranjas', e: '🍊', c: 'amarillo', exp: 'Las mallas de plástico de fruta van al contenedor amarillo.' },
        { n: 'Bote de crema solar vacío', e: '☀️', c: 'amarillo', exp: 'Los botes de crema y lociones de plástico van al contenedor amarillo.' },
        { n: 'Lata de maíz dulce', e: '🌽', c: 'amarillo', exp: 'Las latas de hojalata van al contenedor amarillo.' },
        { n: 'Bandeja transparente de fruta', e: '🍇', c: 'amarillo', exp: 'Las bandejas de plástico de frutas van al contenedor amarillo.' },

        // --- VERDE: VIDRIO ---
        { n: 'Botella de vidrio de zumo', e: '🍾', c: 'verde', exp: 'Las botellas de vidrio van al contenedor verde (iglú de vidrio).' },
        { n: 'Tarro de cristal de mermelada', e: '🫙', c: 'verde', exp: 'Los tarros de mermelada de vidrio van al contenedor verde (sin la tapa metálica).' },
        { n: 'Tarro de tomate frito de cristal', e: '🥫', c: 'verde', exp: 'Los frascos de conserva de vidrio van al contenedor verde.' },
        { n: 'Frasco de colonia de cristal', e: '🌸', c: 'verde', exp: 'Los frascos de colonia y perfume de vidrio van al contenedor verde.' },
        { n: 'Tarro de miel de cristal', e: '🍯', c: 'verde', exp: 'Los botes de miel de cristal van al contenedor verde.' },
        { n: 'Botella de aceite de vidrio', e: '🫒', c: 'verde', exp: 'Las botellas de vidrio de aceite se tiran al contenedor verde.' },
        { n: 'Frasco de especias de cristal', e: '🧂', c: 'verde', exp: 'Los pequeños tarros de cristal de orégano o pimienta van al verde.' },
        { n: 'Tarro de legumbres de vidrio', e: '🫘', c: 'verde', exp: 'Los tarros de garbanzos o judías cocidas de cristal van al verde.' },
        { n: 'Botellín de agua con gas de cristal', e: '💧', c: 'verde', exp: 'Las botellas de cristal van siempre al contenedor verde.' },
        { n: 'Tarro de aceitunas de vidrio', e: '🫒', c: 'verde', exp: 'Los botes de aceitunas de vidrio se reciclan en el contenedor verde.' },
        { n: 'Frasco de potito de bebé de cristal', e: '👶', c: 'verde', exp: 'Los potitos de cristal van al contenedor verde.' },
        { n: 'Botella de refresco de cristal', e: '🍾', c: 'verde', exp: 'El vidrio es 100% reciclable infinitas veces en el contenedor verde.' },
        { n: 'Tarro de espárragos de cristal', e: '🌱', c: 'verde', exp: 'Los tarros de conserva de cristal van al contenedor verde.' },
        { n: 'Frasco de mayonesa de cristal', e: '🥣', c: 'verde', exp: 'Los tarros de mayonesa de vidrio van limpios al contenedor verde.' },

        // --- MARRÓN: ORGÁNICO ---
        { n: 'Piel de plátano', e: '🍌', c: 'marron', exp: 'Las cáscaras de plátano son restos de fruta y van al contenedor marrón para hacer compost.' },
        { n: 'Espinas de pescado', e: '🐟', c: 'marron', exp: 'Los restos de pescado y comida cocinada van al contenedor marrón.' },
        { n: 'Restos de manzana comida', e: '🍎', c: 'marron', exp: 'Los corazones y mondas de fruta van al contenedor marrón de materia orgánica.' },
        { n: 'Cáscaras de huevo', e: '🥚', c: 'marron', exp: 'Las cáscaras de huevo son materia orgánica y van al contenedor marrón.' },
        { n: 'Posos de café o bolsita de té', e: '☕', c: 'marron', exp: 'Los posos de café y bolsitas de infusión biodegradables van al marrón.' },
        { n: 'Hojas caídas y restos de poda', e: '🍂', c: 'marron', exp: 'Los restos vegetales del jardín van al contenedor marrón.' },
        { n: 'Hojas marchitas de lechuga', e: '🥬', c: 'marron', exp: 'Las sobras de verdura de ensaladas van al contenedor marrón.' },
        { n: 'Huesos de pollo de la comida', e: '🍗', c: 'marron', exp: 'Los huesos de carne y restos de alimentos van al contenedor marrón.' },
        { n: 'Miga y corteza de pan duro', e: '🥖', c: 'marron', exp: 'Los restos de pan duro van al contenedor de restos orgánicos.' },
        { n: 'Cáscaras de nueces y almendras', e: '🥜', c: 'marron', exp: 'Las cáscaras de frutos secos son orgánicas y van al marrón.' },
        { n: 'Tapón de corcho natural', e: '🪵', c: 'marron', exp: 'El corcho natural es corteza de árbol y se descompone en el contenedor marrón.' },
        { n: 'Servilleta de papel manchada de comida', e: '🧻', c: 'marron', exp: 'El papel de cocina o servilletas con grasa/comida van al orgánico (marrón).' },
        { n: 'Cáscara de sandía o melón', e: '🍉', c: 'marron', exp: 'Las cáscaras de melón y sandía son orgánicas y van al marrón.' },
        { n: 'Peladuras de patata', e: '🥔', c: 'marron', exp: 'Las mondas de hortalizas van al contenedor marrón de residuos orgánicos.' },
        { n: 'Corazón de pera madura', e: '🍐', c: 'marron', exp: 'Los restos de fruta van al contenedor marrón.' },
        { n: 'Sobras de arroz cocinado', e: '🍚', c: 'marron', exp: 'Las sobras de comida van al contenedor de orgánico para aprovecharlas en abono.' }
    ];

    // ==========================================
    // 2. BANCO DE DATOS DE HÁBITATS ("¿DÓNDE VIVE EL CAMELLO?")
    // ==========================================
    const HABITATS_INFO = {
        desierto: {
            id: 'desierto',
            nombre: 'Desierto',
            emoji: '🏜️',
            bg: 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)',
            clima: 'Arena dorada, sol abrasador y casi sin lluvia',
            color: '#b45309'
        },
        oceano: {
            id: 'oceano',
            nombre: 'Océano / Mar',
            emoji: '🌊',
            bg: 'linear-gradient(135deg, #0284c7 0%, #0369a1 100%)',
            clima: 'Aguas profundas, olas saladas y arrecifes',
            color: '#0369a1'
        },
        polo: {
            id: 'polo',
            nombre: 'Zona Polar',
            emoji: '❄️',
            bg: 'linear-gradient(135deg, #38bdf8 0%, #0284c7 100%)',
            clima: 'Nieve perpetua, glaciares y frío extremo',
            color: '#0284c7'
        },
        selva: {
            id: 'selva',
            nombre: 'Selva',
            emoji: '🌴',
            bg: 'linear-gradient(135deg, #10b981 0%, #047857 100%)',
            clima: 'Árboles altos, mucha lluvia y hojas verdes',
            color: '#047857'
        },
        sabana: {
            id: 'sabana',
            nombre: 'Sabana',
            emoji: '🌾',
            bg: 'linear-gradient(135deg, #eab308 0%, #b45309 100%)',
            clima: 'Llanuras cálidas de hierba con acacias',
            color: '#a16207'
        },
        bosque: {
            id: 'bosque',
            nombre: 'Bosque',
            emoji: '🌲',
            bg: 'linear-gradient(135deg, #15803d 0%, #166534 100%)',
            clima: 'Robles, pinos, setas y arroyos de montaña',
            color: '#15803d'
        },
        granja: {
            id: 'granja',
            nombre: 'Granja',
            emoji: '🚜',
            bg: 'linear-gradient(135deg, #d97706 0%, #78350f 100%)',
            clima: 'Prados cercados, pajar y establos cuidados',
            color: '#78350f'
        }
    };

    const ANIMALES_HABITATS = [
        // --- DESIERTO ---
        { n: 'Camello', e: '🐪', h: 'desierto', cur: 'primaria1', exp: 'El camello almacena grasa en sus jorobas y resiste el calor de las dunas del desierto.' },
        { n: 'Dromedario', e: '🐫', h: 'desierto', cur: 'primaria1', exp: 'El dromedario tiene una joroba y aguanta altísimas temperaturas en las arenas del desierto.' },
        { n: 'Escorpión', e: '🦂', h: 'desierto', cur: 'primaria2', exp: 'El escorpión se entierra bajo las arenas calientes del desierto para protegerse del sol.' },
        { n: 'Serpiente de cascabel', e: '🐍', h: 'desierto', cur: 'primaria2', exp: 'Se camufla entre las rocas y matorrales secos de las zonas desérticas.' },
        { n: 'Fénec (Zorro del desierto)', e: '🦊', h: 'desierto', cur: 'primaria3', exp: 'Tiene orejas gigantes que le ayudan a enfriar su cuerpo en el desierto abrasador.' },
        { n: 'Suricata', e: '🐾', h: 'desierto', cur: 'primaria3', exp: 'Las suricatas excavan madrigueras subterráneas en las zonas secas y desérticas.' },
        { n: 'Correcaminos', e: '🐦', h: 'desierto', cur: 'primaria4', exp: 'Corre velozmente entre los cactus y llanuras áridas del desierto.' },
        { n: 'Lagarto espinoso', e: '🦎', h: 'desierto', cur: 'primaria4', exp: 'Su piel escamosa evita perder agua en el clima desértico.' },

        // --- OCÉANO ---
        { n: 'Ballena azul', e: '🐋', h: 'oceano', cur: 'primaria1', exp: 'La ballena azul nada por los océanos y es el animal más grande de la Tierra.' },
        { n: 'Delfín', e: '🐬', h: 'oceano', cur: 'primaria1', exp: 'Los delfines saltan y se comunican en manadas en las aguas del océano.' },
        { n: 'Tiburón blanco', e: '🦈', h: 'oceano', cur: 'primaria2', exp: 'Es un gran depredador marino que respira por branquias en el océano.' },
        { n: 'Pulpo', e: '🐙', h: 'oceano', cur: 'primaria2', exp: 'El pulpo se camufla entre los arrecifes de coral y rocas del fondo del océano.' },
        { n: 'Tortuga marina', e: '🐢', h: 'oceano', cur: 'primaria2', exp: 'Viaja miles de kilómetros nadando por las corrientes templadas de los océanos.' },
        { n: 'Pez payaso', e: '🐠', h: 'oceano', cur: 'primaria3', exp: 'Vive en simbiosis entre las anémonas venenosas de los arrecifes marinos.' },
        { n: 'Medusa', e: '🪼', h: 'oceano', cur: 'primaria3', exp: 'Flota suavemente impulsada por las olas en aguas oceánicas.' },
        { n: 'Caballito de mar', e: '🌊', h: 'oceano', cur: 'primaria4', exp: 'Se sujeta con su cola a las algas y corales del fondo del mar.' },
        { n: 'Mantarraya', e: '🐟', h: 'oceano', cur: 'primaria5', exp: 'Parece volar bajo el agua batiendo sus aletas por los mares tropicales.' },
        { n: 'Estrella de mar', e: '⭐', h: 'oceano', cur: 'primaria1', exp: 'Habita en el lecho marino adherida a las rocas bajo el agua salada.' },

        // --- POLO ---
        { n: 'Oso polar', e: '🐻‍❄️', h: 'polo', cur: 'primaria1', exp: 'El oso polar tiene una gruesa capa de grasa y pelaje impermeable para el frío glacial del polo.' },
        { n: 'Pingüino emperador', e: '🐧', h: 'polo', cur: 'primaria1', exp: 'Los pingüinos viven en la Antártida y son expertos buceadores en aguas gélidas.' },
        { n: 'Morsa marina', e: '🦭', h: 'polo', cur: 'primaria2', exp: 'La morsa descansa sobre grandes témpanos de hielo polar con sus largos colmillos.' },
        { n: 'Foca ártica', e: '🦭', h: 'polo', cur: 'primaria2', exp: 'Nada bajo el grueso hielo polar gracias a su densa grasa corporal.' },
        { n: 'Zorro ártico', e: '🦊', h: 'polo', cur: 'primaria3', exp: 'Su pelaje se vuelve blanco como la nieve polar para ocultarse en invierno.' },
        { n: 'Narval', e: '🐋', h: 'polo', cur: 'primaria4', exp: 'Llamado el unicornio marino, nada entre las placas de hielo del océano Glacial Ártico.' },
        { n: 'Búho nival', e: '🦉', h: 'polo', cur: 'primaria4', exp: 'Caza silenciosamente en la tundra helada gracias a su plumaje blanco de camuflaje.' },
        { n: 'Reno del ártico', e: '🦌', h: 'polo', cur: 'primaria3', exp: 'Sus pezuñas anchas le permiten caminar sobre la nieve profunda sin hundirse.' },

        // --- SELVA ---
        { n: 'Tucán', e: '🦜', h: 'selva', cur: 'primaria1', exp: 'El tucán come frutas en lo alto de las copas de los árboles de la selva tropical.' },
        { n: 'Mono chimpancé', e: '🐒', h: 'selva', cur: 'primaria1', exp: 'Se balancea entre ramas y lianas en la espesura de la selva tropical.' },
        { n: 'Jaguar', e: '🐆', h: 'selva', cur: 'primaria2', exp: 'El jaguar es el felino más poderoso de la selva tropical americana.' },
        { n: 'Oso perezoso', e: '🦥', h: 'selva', cur: 'primaria2', exp: 'Pasa casi todo el día colgado boca abajo de las ramas de la selva húmeda.' },
        { n: 'Guacamayo rojo', e: '🦜', h: 'selva', cur: 'primaria3', exp: 'Vuela con sus plumas de intensos colores sobre el dosel de la selva.' },
        { n: 'Rana dardo venenosa', e: '🐸', h: 'selva', cur: 'primaria3', exp: 'Sus vivos colores avisan de su peligro en el suelo húmedo de la selva.' },
        { n: 'Serpiente Anaconda', e: '🐍', h: 'selva', cur: 'primaria4', exp: 'Repta y nada silenciosamente por los ríos y marismas de la selva tropical.' },
        { n: 'Camaleón tropical', e: '🦎', h: 'selva', cur: 'primaria4', exp: 'Cambia de color para confundirse con las hojas y ramas de la selva.' },

        // --- SABANA ---
        { n: 'León', e: '🦁', h: 'sabana', cur: 'primaria1', exp: 'El león ruge y vigila las grandes praderas de hierba de la sabana africana.' },
        { n: 'Jirafa', e: '🦒', h: 'sabana', cur: 'primaria1', exp: 'La jirafa alcanza las hojas más altas de las acacias en la sabana.' },
        { n: 'Elefante africano', e: '🐘', h: 'sabana', cur: 'primaria1', exp: 'Camina en manada por las llanuras soleadas de la sabana en busca de charcas de agua.' },
        { n: 'Cebra', e: '🦓', h: 'sabana', cur: 'primaria2', exp: 'Sus rayas blancas y negras confunden a los depredadores en las llanuras de la sabana.' },
        { n: 'Guepardo', e: '🐆', h: 'sabana', cur: 'primaria2', exp: 'Es el corredor más rápido sobre tierra firme y caza en los campos abiertos de la sabana.' },
        { n: 'Hipopótamo', e: '🦛', h: 'sabana', cur: 'primaria3', exp: 'Se sumerge durante el día en las pozas y ríos de la calurosa sabana.' },
        { n: 'Avestruz', e: '🐦', h: 'sabana', cur: 'primaria3', exp: 'Es un ave gigante no voladora adaptada a correr a toda velocidad por la sabana.' },
        { n: 'Rinoceronte', e: '🦏', h: 'sabana', cur: 'primaria4', exp: 'Con su cuerno y piel gruesa, pasta en las praderas de arbustos de la sabana.' },

        // --- BOSQUE TEMPLADO ---
        { n: 'Oso pardo', e: '🐻', h: 'bosque', cur: 'primaria1', exp: 'El oso pardo come bayas, salmones y miel en los frondosos bosques de montaña.' },
        { n: 'Ciervo', e: '🦌', h: 'bosque', cur: 'primaria1', exp: 'El ciervo corre ágil entre los troncos de robles y pinos del bosque.' },
        { n: 'Zorro rojo', e: '🦊', h: 'bosque', cur: 'primaria2', exp: 'El zorro construye su madriguera escondida bajo las raíces de los árboles del bosque.' },
        { n: 'Búho real', e: '🦉', h: 'bosque', cur: 'primaria2', exp: 'Caza ratones de noche escuchando atentamente en las ramas del bosque.' },
        { n: 'Ardilla roja', e: '🐿️', h: 'bosque', cur: 'primaria1', exp: 'Salta de árbol en árbol escondiendo piñas y bellotas en el bosque.' },
        { n: 'Lobo ibérico', e: '🐺', h: 'bosque', cur: 'primaria3', exp: 'Caza en manadas organizadas recorriendo las sierras y bosques espesos.' },
        { n: 'Jabalí', e: '🐗', h: 'bosque', cur: 'primaria3', exp: 'Hociquea la tierra buscando raíces y bellotas bajo los robles del bosque.' },
        { n: 'Erizo común', e: '🦔', h: 'bosque', cur: 'primaria2', exp: 'Se hace una bola de púas entre la hojarasca y musgo del suelo del bosque.' },

        // --- GRANJA ---
        { n: 'Vaca lechera', e: '🐄', h: 'granja', cur: 'primaria1', exp: 'La vaca pasta en los prados verdes y descansa en el establo de la granja.' },
        { n: 'Cerdo', e: '🐖', h: 'granja', cur: 'primaria1', exp: 'Los cerdos viven en el corral de la granja y se bañan en barro para refrescarse.' },
        { n: 'Gallina ponedora', e: '🐔', h: 'granja', cur: 'primaria1', exp: 'La gallina picotea grano en el corral de la granja y duerme en el gallinero.' },
        { n: 'Caballo', e: '🐎', h: 'granja', cur: 'primaria2', exp: 'El caballo vive cuidado en los establos de la granja y corre por los cercados.' },
        { n: 'Oveja de lana', e: '🐑', h: 'granja', cur: 'primaria1', exp: 'Las ovejas pastan juntas en el rebaño de la granja protegidas por el pastor.' },
        { n: 'Perro pastor', e: '🐕', h: 'granja', cur: 'primaria2', exp: 'Ayuda a vigilar y guiar a los animales en los campos de la granja.' },
        { n: 'Pato doméstico', e: '🦆', h: 'granja', cur: 'primaria1', exp: 'Nada felizmente en la charca del corral de la granja con sus polluelos.' },
        { n: 'Cabra lechera', e: '🐐', h: 'granja', cur: 'primaria2', exp: 'Trepa por los riscos del cercado de la granja y come pastos frescos.' }
    ];

    // ==========================================
    // 3. BANCO DE DATOS DE SEGURIDAD VIAL (CERAS VERDE Y ROJA)
    // ==========================================
    const SITUACIONES_VIALES = [
        // --- PEATONES (SEGURO = true / PELIGROSO = false) ---
        { s: 'Cruzar la calle mirando a la izquierda y derecha por el paso de peatones', e: '🚶‍♂️🚸', ok: true, exp: '¡Excelente! Siempre debemos mirar a ambos lados antes de cruzar la calzada.' },
        { s: 'Cruzar corriendo cuando el semáforo para peatones está en luz roja', e: '🚦🏃‍♂️', ok: false, exp: '¡Peligroso! La luz roja nos indica que los coches tienen preferencia y debemos parar.' },
        { s: 'Esperar pacientemente en la acera a que el semáforo se ponga en verde', e: '🚦🧍‍♀️', ok: true, exp: '¡Muy bien! Debemos esperar a que el muñeco esté verde y los coches se detengan.' },
        { s: 'Cruzar la calle mirando la pantalla del teléfono móvil y con cascos puestos', e: '📱🎧', ok: false, exp: '¡Peligroso! Mirar el móvil nos distrae y los auriculares impiden oír el tráfico y las bocinas.' },
        { s: 'Caminar siempre por la acera y alejados del bordillo de la carretera', e: '🚶‍♀️🏢', ok: true, exp: '¡Correcto! La acera es el espacio protegido para los peatones.' },
        { s: 'Correr detrás de una pelota que se va rodando a la carretera', e: '⚽🏃‍♂️', ok: false, ok: false, exp: '¡Peligroso! Nunca salgas a la carretera sin mirar. Pide ayuda a un adulto.' },
        { s: 'Llevar prendas o chaleco reflectante si caminamos de noche o al anochecer', e: '🦺🌙', ok: true, exp: '¡Seguro! Los elementos reflectantes hacen que los coches nos vean desde lejos.' },
        { s: 'Caminar por el arcén en carreteras interurbanas por el lado izquierdo mirando a los coches', e: '🚶‍♂️🛣️', ok: true, exp: '¡Perfecto! En carretera sin acera, los peatones caminan por la izquierda para ver venir los vehículos.' },
        { s: 'Cruzar la carretera saliendo de repente entre dos coches aparcados', e: '🚗🏃‍♂️🚙', ok: false, exp: '¡Peligroso! Los conductores no nos ven si salimos escondidos entre vehículos aparcados.' },
        { s: 'Dar la mano a una persona adulta al cruzar calles con mucho tráfico', e: '🤝🚶‍♂️', ok: true, exp: '¡Seguro y prudente! Cruzar de la mano garantiza nuestra seguridad.' },
        { s: 'Jugar al pilla-pilla o patinar en mitad de la carretera abierta al tráfico', e: '🛼🚗', ok: false, exp: '¡Peligroso! Las calles con tráfico no son zonas de juego; hay parques y pistas para jugar.' },
        { s: 'Asegurarse de que el autobús ha frenado por completo antes de cruzar por detrás', e: '🚌👀', ok: true, exp: '¡Correcto! Nunca cruces pegado al autobús porque tapa la visión de otros coches.' },

        // --- VIAJEROS / PASAJEROS EN COCHE Y AUTOBÚS ---
        { s: 'Abrocharse el cinturón de seguridad nada más subir al coche', e: '🚗🔒', ok: true, exp: '¡Imprescindible! El cinturón de seguridad salva vidas en todos los trayectos.' },
        { s: 'Sacar la cabeza o los brazos por la ventanilla del coche en marcha', e: '🪟😱', ok: false, exp: '¡Peligroso! Cualquier objeto o vehículo puede golpearnos con graves consecuencias.' },
        { s: 'Bajar del coche siempre por la puerta que da hacia la acera protegida', e: '🚪🚶‍♂️', ok: true, exp: '¡Muy bien! Bajar por el lado de la calzada expone al peligro del tráfico continuo.' },
        { s: 'Gritar, pelear o saltar dentro del coche molestando al conductor', e: '🚗🗣️', ok: false, exp: '¡Peligroso! Quien conduce necesita máxima concentración en la carretera.' },
        { s: 'Sentarse en una sillita infantil homologada adaptada a nuestra altura', e: '👶💺', ok: true, exp: '¡Perfecto! El sistema de retención infantil protege a los más pequeños ante frenazos.' },
        { s: 'Desabrocharse el cinturón antes de que el vehículo se detenga del todo', e: '🔓🚗', ok: false, exp: '¡Peligroso! Una frenada imprevista antes de aparcar puede causar lesiones.' },
        { s: 'Permanecer sentado y agarrado en el autobús escolar durante el trayecto', e: '🚌💺', ok: true, exp: '¡Seguro! Evita caídas bruscas ante curvas o paradas repentinas.' },
        { s: 'Tirar papeles, latas o envoltorios por la ventanilla del coche a la carretera', e: '🪟🚮', ok: false, ok: false, exp: '¡Peligroso e incívico! Los objetos en la calzada pueden desestabilizar a otros coches y motos.' },

        // --- BICICLETA Y PATINETE ---
        { s: 'Llevar siempre el casco bien ajustado y abrochado al montar en bicicleta', e: '🚲⛑️', ok: true, exp: '¡Seguro y obligatorio! El casco protege la cabeza frente a cualquier caída.' },
        { s: 'Conducir la bicicleta sin manos en el manillar haciendo piruetas con tráfico', e: '🚲🤸‍♂️', ok: false, exp: '¡Peligroso! Puedes perder el control y caerte delante de un vehículo.' },
        { s: 'Llevar luces blanca delantera y roja trasera al circular en bicicleta de noche', e: '🚲💡', ok: true, exp: '¡Seguro! Permite ver el camino y que los demás nos distingan con claridad.' },
        { s: 'Ir dos niños subidos a la vez en un patinete pensado para una sola persona', e: '🛴👥', ok: false, exp: '¡Peligroso! Dos personas desestabilizan el patinete y hacen fallar los frenos.' },
        { s: 'Avisar con el timbre al acercarse con la bici a peatones despistados', e: '🚲🔔', ok: true, exp: '¡Muy correcto! El timbre avisa amablemente sin asustar a los transeúntes.' },
        { s: 'Circular con la bicicleta llevando auriculares con música a todo volumen', e: '🎧🚲', ok: false, exp: '¡Peligroso y prohibido! Te aísla del entorno y no oyes motores ni advertencias.' },
        { s: 'Respetar todas las señales de stop y semáforos al montar en bicicleta', e: '🛑🚲', ok: true, exp: '¡Exacto! Las bicis son vehículos y deben respetar todas las normas de tráfico.' },
        { s: 'Bajar de la bicicleta y cruzar andando como peatón en los pasos de cebra', e: '🚲🚶‍♂️', ok: true, exp: '¡Excelente conducta! En los pasos peatonales se debe cruzar caminando junto a la bici.' },
        { s: 'Circular por la acera a gran velocidad rozando a personas mayores y niños', e: '🛴⚡', ok: false, exp: '¡Peligroso! La acera es para pasear tranquilamente; los peatones tienen preferencia absoluta.' }
    ];

    // ==========================================
    // GENERADORES POR NIVEL ESCOLAR
    // ==========================================

    function generateReciclajeActivity(nivel, idNum) {
        // Seleccionamos un residuo al azar
        const idx = (idNum - 1) % RESIDUOS_RECICLAJE.length;
        const res = RESIDUOS_RECICLAJE[idx];
        const correctContenedor = res.c;

        return {
            id: `reciclaje_${nivel}_${idNum}`,
            tipo: 'reciclaje',
            titulo: '¡Misión Reciclaje!',
            instruccion: '¿A qué contenedor debe ir este desperdicio?',
            residuo: {
                nombre: res.n,
                emoji: res.e,
                contenedor: res.c,
                explicacion: res.exp
            },
            contenedores: CONTENEDORES_INFO,
            respuestaCorrecta: correctContenedor,
            nivel
        };
    }

    function generateHabitatsActivity(nivel, idNum) {
        // Seleccionar animal y habitats
        const animalIdx = (idNum - 1) % ANIMALES_HABITATS.length;
        const animal = ANIMALES_HABITATS[animalIdx];
        const correctHabitatId = animal.h;
        const correctHabitat = HABITATS_INFO[correctHabitatId];

        // Escogemos 2 hábitats distractores distintos
        const otherIds = Object.keys(HABITATS_INFO).filter(h => h !== correctHabitatId);
        shuffle(otherIds);
        const selectedHabitats = [correctHabitat, HABITATS_INFO[otherIds[0]], HABITATS_INFO[otherIds[1]]];
        // Si es primaria 4, 5 o 6, podemos poner 4 opciones de hábitats
        if (nivel === 'primaria4' || nivel === 'primaria5' || nivel === 'primaria6') {
            selectedHabitats.push(HABITATS_INFO[otherIds[2]]);
        }
        const habitatsShuffled = shuffle(selectedHabitats);

        return {
            id: `habitats_${nivel}_${idNum}`,
            tipo: 'habitats',
            titulo: `¿Dónde vive el ${animal.n.toLowerCase()}?`,
            instruccion: `¡Arrastra o toca para llevar al animal a su hogar natural!`,
            animal: {
                nombre: animal.n,
                emoji: animal.e,
                habitatId: animal.h,
                explicacion: animal.exp
            },
            habitats: habitatsShuffled,
            respuestaCorrecta: correctHabitatId,
            nivel
        };
    }

    function generateSeguridadVialActivity(nivel, idNum) {
        const idx = (idNum - 1) % SITUACIONES_VIALES.length;
        const sit = SITUACIONES_VIALES[idx];

        return {
            id: `seguridad_${nivel}_${idNum}`,
            tipo: 'seguridad_vial',
            titulo: 'Seguridad Vial: ¿Es Seguro o Peligroso?',
            instruccion: 'Usa la cera verde si es seguro, o la cera roja si es peligroso:',
            situacion: sit.s,
            emoji: sit.e,
            esSeguro: sit.ok,
            explicacion: sit.exp,
            nivel
        };
    }

    const ScienceBank = {
        CONTENEDORES_INFO,
        RESIDUOS_RECICLAJE,
        HABITATS_INFO,
        ANIMALES_HABITATS,
        SITUACIONES_VIALES,

        generateBankForLevel(nivel) {
            const list = [];
            // 150 actividades de Reciclaje
            for (let i = 1; i <= 150; i++) {
                list.push(generateReciclajeActivity(nivel, i));
            }
            // 150 actividades de Hábitats
            for (let i = 1; i <= 150; i++) {
                list.push(generateHabitatsActivity(nivel, i));
            }
            // 150 actividades de Seguridad Vial
            for (let i = 1; i <= 150; i++) {
                list.push(generateSeguridadVialActivity(nivel, i));
            }
            // Total: 450 actividades por nivel (x 6 niveles = 2.700 actividades)
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
                window.AULA_DATA[lvl].laboratorio = items;
                total += items.length;
            });
            console.log(`[ScienceBank] Banco de Conocimiento del Medio cargado con éxito: ${total} actividades en total (Laboratorio de Inventos).`);
        }
    };

    window.ScienceBank = ScienceBank;

    // Inicialización automática
    ScienceBank.init();
})();
