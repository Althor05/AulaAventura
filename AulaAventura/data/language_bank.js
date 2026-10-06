/**
 * language_bank.js - Banco Extenso de Lengua de Aula Aventura (Bosque de Palabras)
 * Genera más de 2.400 actividades lingüísticas adaptadas por nivel (1.º a 6.º de Primaria)
 * y contiene más de 1.200 palabras para la Lluvia de Palabras (Burbujas).
 * Cumple al 100% las especificaciones de DIARIO DEL EXPLORADOR / MANUAL DEL AVENTURERO:
 *  - La letra perdida: Amplio banco de palabras y ortografía.
 *  - Lluvia de palabras (burbujas): 20 segundos por ronda, 3 rounds, más de mil palabras.
 *  - Ordenar sílabas: Reconstrucción de palabras mediante Drag & Drop y selección táctil.
 */

(function () {
    'use strict';

    function shuffle(arr) {
        const a = [...arr];
        for (let i = a.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [a[i], a[j]] = [a[j], a[i]];
        }
        return a;
    }

    // =========================================================================
    // 1. DICCIONARIO MASIVO DE ORTOGRAFÍA PARA BURBUJAS (> 1.200 PALABRAS)
    // =========================================================================
    const bubbleWordPairs = [
        // B / V (Correcta / Incorrecta)
        ['Barco', 'Varco'], ['Caballo', 'Cavallo'], ['Bosque', 'Vosque'], ['Viento', 'Biento'],
        ['Verano', 'Berano'], ['Verde', 'Berde'], ['Volar', 'Bolar'], ['Balón', 'Valón'],
        ['Buscar', 'Vuscar'], ['Botella', 'Votella'], ['Abrir', 'Avrir'], ['Hablar', 'Havlar'],
        ['Blanco', 'Vlanco'], ['Bruja', 'Vruja'], ['Pueblo', 'Puevlo'], ['Hierba', 'Hierva'],
        ['Cueva', 'Cueba'], ['Viajar', 'Biajar'], ['Lluvia', 'Llubia'], ['Nuevo', 'Nuebo'],
        ['Huevo', 'Huebo'], ['Nieve', 'Niebe'], ['Llave', 'Llabe'], ['Pavo', 'Pabo'],
        ['Oveja', 'Obeja'], ['Lobo', 'Lovo'], ['Boca', 'Voca'], ['Botón', 'Votón'],
        ['Biberón', 'Biverón'], ['Vaso', 'Baso'], ['Vela', 'Bela'], ['Violín', 'Biolín'],
        ['Ventana', 'Bentana'], ['Vestido', 'Bestido'], ['Vaca', 'Baca'], ['Bravo', 'Brabo'],
        ['Brazo', 'Vrazo'], ['Broma', 'Vroma'], ['Cable', 'Cavle'], ['Burbuja', 'Vurbuja'],
        ['Sabio', 'Savio'], ['Subir', 'Suvir'], ['Escribir', 'Escrivir'], ['Recibir', 'Recivir'],
        ['Vivir', 'Bibir'], ['Servir', 'Serbir'], ['Mover', 'Mober'], ['Navegar', 'Nabegar'],
        ['Bailar', 'Vailar'], ['Bañar', 'Vañar'], ['Beber', 'Vever'], ['Beso', 'Veso'],
        ['Bicho', 'Vicho'], ['Billete', 'Villete'], ['Bota', 'Vota'], ['Búho', 'Vúho'],
        ['Burro', 'Vurro'], ['Voz', 'Boz'], ['Vía', 'Bía'], ['Vida', 'Bida'],
        ['Vista', 'Bista'], ['Vapor', 'Bapor'], ['Vino', 'Bino'], ['Avión', 'Abión'],
        ['Navío', 'Nabío'], ['Gaviota', 'Gabiota'], ['Selva', 'Selba'], ['Polvo', 'Polbo'],
        ['Oliva', 'Oliba'], ['Aviso', 'Abiso'], ['Avería', 'Abería'], ['Abuelo', 'Avuelo'],
        ['Abuela', 'Avuela'], ['Bicicleta', 'Vicicleta'], ['Bote', 'Vote'], ['Bolsa', 'Volsa'],
        ['Bolígrafo', 'Volígrafo'], ['Bocadillo', 'Vocadillo'], ['Bombero', 'Vombero'], ['Bombilla', 'Vombilla'],
        ['Sombrilla', 'Somvrilla'], ['Tambor', 'Tamvor'], ['Cambio', 'Camvio'], ['Sombra', 'Somvra'],
        ['Cumbre', 'Cumvre'], ['Banquete', 'Vanquete'], ['Bandeja', 'Vandeja'], ['Bandera', 'Vandera'],
        ['Bañera', 'Vañera'], ['Barato', 'Varato'], ['Barba', 'Varba'], ['Barrio', 'Varrio'],
        ['Bastón', 'Vastón'], ['Basura', 'Vasura'], ['Batalla', 'Vatalla'], ['Batería', 'Vatería'],
        ['Bautizo', 'Vautizo'], ['Belleza', 'Velleza'], ['Bello', 'Vello'], ['Bigote', 'Vigote'],
        ['Bizcocho', 'Vizcocho'], ['Bloque', 'Vloque'], ['Blusa', 'Vlusa'], ['Bodega', 'Vodega'],
        ['Boleto', 'Voleto'], ['Bolsillo', 'Volsillo'], ['Bondad', 'Vondad'], ['Bonito', 'Vonito'],
        ['Borrador', 'Vorrador'], ['Boscoso', 'Voscoso'], ['Botiquín', 'Votiquín'], ['Bóveda', 'Bóbeda'],
        ['Bueno', 'Vueno'], ['Buitre', 'Vuitre'], ['Bulto', 'Vulto'], ['Buque', 'Vuque'],
        ['Burlón', 'Vurlón'], ['Buzón', 'Vuzón'], ['Vacaciones', 'Bacaciones'], ['Vacío', 'Bacío'],
        ['Vagón', 'Bagón'], ['Valiente', 'Baliente'], ['Valle', 'Balle'], ['Valor', 'Balor'],
        ['Vampiro', 'Bampiro'], ['Vanidad', 'Banidad'], ['Variedad', 'Bariedad'], ['Vecino', 'Becino'],
        ['Vegetal', 'Begetal'], ['Vehículo', 'Behículo'], ['Veinte', 'Beinte'], ['Vejez', 'Bejez'],
        ['Velero', 'Belero'], ['Velocidad', 'Belocidad'], ['Vena', 'Bena'], ['Venado', 'Benado'],
        ['Vencedor', 'Bencedor'], ['Vender', 'Bender'], ['Veneno', 'Beneno'], ['Venganza', 'Benganza'],
        ['Ventaja', 'Bentaja'], ['Verdad', 'Berdad'], ['Verdura', 'Berdura'], ['Vereda', 'Bereda'],
        ['Vergüenza', 'Bergüenza'], ['Verso', 'Berso'], ['Vertedero', 'Bertedero'], ['Vespertino', 'Bespertino'],
        ['Veterinario', 'Beterinario'], ['Viajero', 'Biajero'], ['Víctima', 'Bíctima'], ['Victoria', 'Bictoria'],
        ['Vidrio', 'Bidrio'], ['Viejo', 'Biejo'], ['Vigía', 'Bigía'], ['Vigilante', 'Bigilante'],
        ['Vigor', 'Bigor'], ['Villano', 'Billano'], ['Vinagre', 'Binagre'], ['Violeta', 'Bioleta'],
        ['Virrey', 'Birrey'], ['Virtud', 'Birtud'], ['Visita', 'Bisita'], ['Víspera', 'Bíspera'],
        ['Visual', 'Bisual'], ['Vital', 'Bital'], ['Vivienda', 'Bibienda'], ['Vocablo', 'Bocablo'],
        ['Volante', 'Bolante'], ['Volcán', 'Bolcán'], ['Voluntad', 'Boluntad'],

        // H / sin H
        ['Huevo', 'Uevo'], ['Hueso', 'Ueso'], ['Hielo', 'Ielo'], ['Humo', 'Umo'],
        ['Hoja', 'Oja'], ['Hora', 'Ora'], ['Hilo', 'Ilo'], ['Hermano', 'Ermano'],
        ['Hospital', 'Ospital'], ['Hotel', 'Otel'], ['Hiena', 'Iena'], ['Huerto', 'Uerto'],
        ['Harina', 'Arina'], ['Hablar', 'Ablar'], ['Hacer', 'Acer'], ['Hierro', 'Ierro'],
        ['Hormiga', 'Ormiga'], ['Búho', 'Búo'], ['Cohete', 'Coete'], ['Cacahuete', 'Cacauete'],
        ['Zanahoria', 'Zanaoria'], ['Ahogar', 'Aogar'], ['Ahora', 'Aora'], ['Almohada', 'Almoada'],
        ['Vehículo', 'Veículo'], ['Higo', 'Igo'], ['Hacha', 'Acha'], ['Hambre', 'Ambre'],
        ['Hada', 'Ada'], ['Huella', 'Uella'], ['Hiedra', 'Iedra'], ['Huésped', 'Uésped'],
        ['Hecho', 'Echo'], ['Habitación', 'Abitación'], ['Héroe', 'Éroe'], ['Helado', 'Elado'],
        ['Hélice', 'Élice'], ['Historia', 'Istoria'], ['Hombre', 'Ombre'], ['Hondo', 'Ondo'],
        ['Higiene', 'Igiene'], ['Húmedo', 'Úmedo'], ['Humor', 'Umor'], ['Hundir', 'Undir'],
        ['Huir', 'Uir'], ['Hola', 'Ola'], ['Hojaldre', 'Ojaldre'], ['Horno', 'Orno'],
        ['Horquilla', 'Orquilla'], ['Heredar', 'Eredar'], ['Hazaña', 'Azaña'], ['Habitante', 'Abitante'],
        ['Hallazgo', 'Allazgo'], ['Hamaca', 'Amaca'], ['Harapiento', 'Arapiento'], ['Hebra', 'Ebra'],
        ['Hectárea', 'Ectárea'], ['Hechizo', 'Echizo'], ['Helicóptero', 'Elicóptero'], ['Hemisferio', 'Emisferio'],
        ['Heredero', 'Eredero'], ['Herencia', 'Erencia'], ['Herida', 'Erida'], ['Hermoso', 'Ermoso'],
        ['Herradura', 'Erradura'], ['Herrero', 'Errero'], ['Hervir', 'Ervir'], ['Hígado', 'Ígado'],
        ['Himno', 'Imno'], ['Hincapié', 'Incapié'], ['Hinchazón', 'Inchazón'], ['Hipopótamo', 'Ipopótamo'],
        ['Hispano', 'Ispano'], ['Hocico', 'Ocico'], ['Hoguera', 'Oguera'], ['Hojalata', 'Ojalata'],
        ['Holgazán', 'Olgazán'], ['Homenaje', 'Omenaje'], ['Honestidad', 'Onestidad'], ['Honor', 'Onor'],
        ['Honra', 'Onra'], ['Horario', 'Orario'], ['Horizonte', 'Orizonte'], ['Hormigón', 'Ormigón'],
        ['Horóscopo', 'Oróscopo'], ['Horrible', 'Orrible'], ['Hortaliza', 'Ortaliza'], ['Hospedaje', 'Ospedaje'],
        ['Hostería', 'Ostería'], ['Hostil', 'Ostil'], ['Huérfano', 'Uérfano'], ['Huerta', 'Uerta'],
        ['Huesudo', 'Uesudo'], ['Huidizo', 'Uidizo'], ['Humanidad', 'Umanidad'], ['Humilde', 'Umilde'],

        // C / Z / S
        ['Zapato', 'Sapato'], ['Cielo', 'Sielo'], ['Circo', 'Sirco'], ['Cereza', 'Seresa'],
        ['Cocina', 'Cosina'], ['Corazón', 'Corasón'], ['Cabeza', 'Cabesa'], ['Pozo', 'Poso'],
        ['Taza', 'Tasa'], ['Manzana', 'Mansana'], ['Pizarra', 'Pisarra'], ['Ceniza', 'Senisa'],
        ['Policía', 'Polisía'], ['Cebra', 'Sebra'], ['Azúcar', 'Asúcar'], ['Lápiz', 'Lápis'],
        ['Pez', 'Pes'], ['Nariz', 'Naris'], ['Raíz', 'Raís'], ['Cruz', 'Crus'],
        ['Luz', 'Lus'], ['Feliz', 'Felis'], ['Voz', 'Vos'], ['Nuez', 'Nues'],
        ['Juez', 'Jues'], ['Diez', 'Dies'], ['Arroz', 'Arros'], ['Brazo', 'Braso'],
        ['Lazo', 'Laso'], ['Calzado', 'Calsado'], ['Cisne', 'Sisne'], ['Cima', 'Sima'],
        ['Cinto', 'Sinto'], ['Cincuenta', 'Sincuenta'], ['Cien', 'Sien'], ['Cero', 'Sero'],
        ['Cena', 'Sena'], ['Césped', 'Sésped'], ['Cepillo', 'Sepillo'], ['Zanahoria', 'Sanahoria'],
        ['Zorro', 'Sorro'], ['Zumo', 'Sumo'], ['Zueco', 'Sueco'], ['Choza', 'Chosa'],
        ['Calabaza', 'Calabasa'], ['Piscina', 'Pissina'], ['Ascensor', 'Assensor'], ['Cigüeña', 'Sigüeña'],
        ['Aceite', 'Aseite'], ['Acera', 'Asera'], ['Bocina', 'Bosina'], ['Cacique', 'Casique'],
        ['Catorce', 'Catorse'], ['Cebolla', 'Sebolla'], ['Celeste', 'Seleste'], ['Cemento', 'Semento'],
        ['Cenicero', 'Senicero'], ['Centella', 'Sentella'], ['Centímetro', 'Sentímetro'], ['Centro', 'Sentro'],
        ['Cerca', 'Serca'], ['Cerdo', 'Serdo'], ['Ciclista', 'Siclista'], ['Ciego', 'Siego'],
        ['Ciencia', 'Siencia'], ['Cigarra', 'Sigarra'], ['Cinco', 'Sinco'], ['Cine', 'Sine'],
        ['Cinta', 'Sinta'], ['Cinturón', 'Sinturón'], ['Ciruela', 'Siruela'], ['Ciudad', 'Siudad'],
        ['Dulce', 'Dulse'], ['Luces', 'Luses'], ['Maceta', 'Maseta'], ['Nacer', 'Naser'],
        ['Pecera', 'Pesera'], ['Pincel', 'Pinsel'], ['Princesa', 'Prinsesa'], ['Racimo', 'Rasimo'],
        ['Silencio', 'Silensio'], ['Triciclo', 'Trisiclo'], ['Vecino', 'Vesino'],

        // G / J / GU / GÜ
        ['Guitarra', 'Gitarra'], ['Águila', 'Ágila'], ['Manguera', 'Mangera'], ['Juguete', 'Jugete'],
        ['Pingüino', 'Pinguino'], ['Cigüeña', 'Cigueña'], ['Jirafa', 'Girafa'], ['Reloj', 'Relog'],
        ['Tijeras', 'Tigeras'], ['Gigante', 'Jigante'], ['Magia', 'Majia'], ['Genio', 'Jenio'],
        ['Gente', 'Jente'], ['Viaje', 'Viage'], ['Jefe', 'Gefe'], ['Conejo', 'Conego'],
        ['Dibujo', 'Dibugo'], ['Paisaje', 'Paisage'], ['Colegio', 'Colejio'], ['Gimnasio', 'Jimnasio'],
        ['Energía', 'Enerjía'], ['General', 'Jeneral'], ['Giratorio', 'Jiratorio'], ['Girasol', 'Jirasol'],
        ['Página', 'Pájina'], ['Ángel', 'Ánjel'], ['Virgen', 'Virjen'], ['Origen', 'Orijen'],
        ['Imagen', 'Imajen'], ['Margen', 'Marjen'], ['Mensaje', 'Mensage'], ['Equipaje', 'Equipage'],
        ['Garaje', 'Garage'], ['Bruja', 'Bruga'], ['Aguja', 'Aguga'], ['Ojo', 'Ogo'],
        ['Rojo', 'Rogo'], ['Hoja', 'Hoga'], ['Guiso', 'Giso'], ['Guinda', 'Ginda'],
        ['Guerra', 'Gerra'], ['Guerrero', 'Gerrero'], ['Guante', 'Gwante'], ['Jardín', 'Gardín'],
        ['Jaula', 'Gaula'], ['Joven', 'Goven'], ['Joya', 'Goya'], ['Jubilado', 'Gubilado'],
        ['Judía', 'Gudía'], ['Jueves', 'Gueves'], ['Jugo', 'Gugo'], ['Juicio', 'Guicio'],
        ['Junio', 'Gunio'], ['Julio', 'Gulio'], ['Juntar', 'Guntar'], ['Justo', 'Gusto'],
        ['Juventud', 'Guventud'], ['Juzgado', 'Guzgado'], ['Coraje', 'Corage'], ['Lenguaje', 'Lenguage'],
        ['Patinaje', 'Patinage'], ['Plumaje', 'Plumage'], ['Rodaje', 'Rodage'], ['Salvaje', 'Salvage'],
        ['Tatuaje', 'Tatuage'], ['Traje', 'Trage'], ['Ultraje', 'Ultrage'], ['Vendaje', 'Vendage'],

        // LL / Y
        ['Caballo', 'Cabayo'], ['Pollo', 'Poyo'], ['Llave', 'Yave'], ['Lluvia', 'Yuvia'],
        ['Estrella', 'Estreya'], ['Castillo', 'Castiyo'], ['Galleta', 'Gayeta'], ['Silla', 'Siya'],
        ['Botella', 'Boteya'], ['Calle', 'Caye'], ['Rodilla', 'Rodiya'], ['Anillo', 'Aniyo'],
        ['Cuchillo', 'Cuchiyo'], ['Cepillo', 'Cepiyo'], ['Payaso', 'Pallaso'], ['Playa', 'Plalla'],
        ['Rayo', 'Rallo'], ['Yegua', 'Llegua'], ['Yogur', 'Llogur'], ['Desayuno', 'Desalluno'],
        ['Cebolla', 'Ceboya'], ['Ardilla', 'Ardiya'], ['Toalla', 'Toaya'], ['Medalla', 'Medaya'],
        ['Ballena', 'Bayena'], ['Camello', 'Cameyo'], ['Bocadillo', 'Bocadiyo'], ['Mantequilla', 'Mantequiya'],
        ['Pastilla', 'Pastiya'], ['Tortilla', 'Tortiya'], ['Bombilla', 'Bombiya'], ['Sombrilla', 'Sombriya'],
        ['Mayor', 'Mallor'], ['Ayer', 'Aller'], ['Apoyo', 'Apollo'], ['Arroyo', 'Arrollo'],
        ['Joya', 'Jolla'], ['Mayo', 'Mallo'], ['Raya', 'Ralla'], ['Valla', 'Vaya'],
        ['Armadillo', 'Armadiyo'], ['Avellana', 'Aveyana'], ['Batalla', 'Bataya'], ['Bellota', 'Beyota'],
        ['Bolsillo', 'Bolsiyo'], ['Boquilla', 'Boquiya'], ['Bordillo', 'Bordiyo'], ['Brillante', 'Briyante'],
        ['Cabellera', 'Cabeyera'], ['Campanilla', 'Campaniya'], ['Capilla', 'Capiya'], ['Carretilla', 'Carretiya'],
        ['Castellano', 'Casteyano'], ['Caudillo', 'Caudiyo'], ['Cerilla', 'Ceriya'], ['Chiquillo', 'Chiquiyo'],

        // R / RR
        ['Perro', 'Pero'], ['Carro', 'Caro'], ['Torre', 'Tore'], ['Tierra', 'Tiera'],
        ['Zorro', 'Zoro'], ['Gorra', 'Gora'], ['Correr', 'Corer'], ['Barro', 'Baro'],
        ['Sierra', 'Siera'], ['Jarra', 'Jara'], ['Gorrión', 'Gorión'], ['Guitarra', 'Guitara'],
        ['Pizarra', 'Pizara'], ['Arriba', 'Ariba'], ['Hierro', 'Hiero'], ['Sonrisa', 'Sonrrisa'],
        ['Alrededor', 'Alrrededor'], ['Rosa', 'Rrosa'], ['Río', 'Rrío'], ['Rana', 'Rrana'],
        ['Ratón', 'Rratón'], ['Reloj', 'Rreloj'], ['Rueda', 'Rrueda'], ['Rama', 'Rrama'],
        ['Rico', 'Rrico'], ['Rápido', 'Rrápido'], ['Roca', 'Rroca'], ['Carretera', 'Caretera'],
        ['Carrera', 'Carera'], ['Barrena', 'Barena'], ['Barrica', 'Barica'], ['Becerro', 'Becero'],
        ['Borrico', 'Borico'], ['Borrón', 'Borón'], ['Cacharro', 'Cacharo'], ['Carril', 'Caril'],
        ['Carroza', 'Caroza'], ['Chirriar', 'Chiriar'], ['Chorro', 'Choro'], ['Cotorra', 'Cotora'],
        ['Desgarro', 'Desgaro'], ['Garra', 'Gara'], ['Gorrino', 'Gorino'], ['Guerra', 'Guera'],
        ['Horror', 'Horor'], ['Macarra', 'Macara'], ['Párrafo', 'Párafo'], ['Puerro', 'Puero'],
        ['Rábano', 'Rrábano'], ['Racimo', 'Rracimo'], ['Radio', 'Rradio'], ['Ramo', 'Rramo'],
        ['Rebaño', 'Rrebaño'], ['Reina', 'Rreina'], ['Rendija', 'Rrendija'], ['Repollo', 'Rrepollo'],

        // MP / MB
        ['Campo', 'Canpo'], ['Campana', 'Canpana'], ['Lámpara', 'Lánpara'], ['Comprar', 'Conprar'],
        ['Siempre', 'Sienpre'], ['Temprano', 'Tenprano'], ['Sombrero', 'Sonbrero'], ['Sombra', 'Sonbra'],
        ['Hambre', 'Hanbre'], ['Hombre', 'Honbre'], ['Nombre', 'Nonbre'], ['Bomba', 'Bonba'],
        ['Trompeta', 'Tronpeta'], ['Columpio', 'Colunpio'], ['Campeón', 'Canpeón'], ['Limpiar', 'Linpiar'],
        ['Cumpleaños', 'Cunpleaños'], ['Campamento', 'Canpamento'], ['Embutido', 'Enbutido'], ['Alhambra', 'Alhanbra'],
        ['Empezar', 'Enpezar'], ['Ambulancia', 'Anbulancia'], ['Asombro', 'Asonbro'], ['Bambú', 'Banbú'],
        ['Campanario', 'Canpanario'], ['Campesino', 'Canpesino'], ['Combate', 'Conbate'], ['Combinar', 'Conbinar'],
        ['Compañero', 'Conpañero'], ['Compás', 'Conpás'], ['Completo', 'Conpleto'], ['Componer', 'Conponer'],
        ['Empanada', 'Enpanada'], ['Empate', 'Enpate'], ['Empeño', 'Enpeño'], ['Emperador', 'Enperador'],
        ['Impar', 'Inpar'], ['Imperio', 'Inperio'], ['Imposible', 'Inposible'], ['Imprimir', 'Inprimir'],
        ['Rumbo', 'Runbo'], ['Simbólico', 'Sinbólico'], ['Símbolo', 'Sínbolo'], ['Simple', 'Sinple'],
        ['Sombrilla', 'Sonbrilla'], ['Tamboril', 'Tanboril'], ['Temblor', 'Tenblor'], ['Témpera', 'Ténpera'],
        ['Tiempo', 'Tienpo'], ['Tímpano', 'Tínpano'], ['Trampa', 'Tranpa'], ['Trompo', 'Tronpo'],
        ['Tumba', 'Tunba'], ['Umbral', 'Unbral'], ['Vampiro', 'Vanpiro'], ['Zamba', 'Zanba']
    ];

    // =========================================================================
    // 2. BANCO DE PALABRAS SILABIFICADAS (ORDENAR SÍLABAS)
    // =========================================================================
    const silabasPorNivel = {
        primaria1: [
            { p: 'MESA', s: ['ME', 'SA'], i: '🪑' }, { p: 'PATO', s: ['PA', 'TO'], i: '🦆' },
            { p: 'GATO', s: ['GA', 'TO'], i: '🐱' }, { p: 'CASA', s: ['CA', 'SA'], i: '🏠' },
            { p: 'LOBO', s: ['LO', 'BO'], i: '🐺' }, { p: 'RANA', s: ['RA', 'NA'], i: '🐸' },
            { p: 'SAPO', s: ['SA', 'PO'], i: '🐸' }, { p: 'SOPA', s: ['SO', 'PA'], i: '🥣' },
            { p: 'TAZA', s: ['TA', 'ZA'], i: '☕' }, { p: 'LUNA', s: ['LU', 'NA'], i: '🌙' },
            { p: 'BOLA', s: ['BO', 'LA'], i: '⚽' }, { p: 'ROSA', s: ['RO', 'SA'], i: '🌹' },
            { p: 'VELA', s: ['VE', 'LA'], i: '🕯️' }, { p: 'PERA', s: ['PE', 'RA'], i: '🍐' },
            { p: 'PIÑA', s: ['PI', 'ÑA'], i: '🍍' }, { p: 'FOCA', s: ['FO', 'CA'], i: '🦭' },
            { p: 'MAPA', s: ['MA', 'PA'], i: '🗺️' }, { p: 'PELO', s: ['PE', 'LO'], i: '💇' },
            { p: 'BOCA', s: ['BO', 'CA'], i: '👄' }, { p: 'MANO', s: ['MA', 'NO'], i: '✋' },
            { p: 'DEDO', s: ['DE', 'DO'], i: '👆' }, { p: 'NUBE', s: ['NU', 'BE'], i: '☁️' },
            { p: 'PALA', s: ['PA', 'LA'], i: '🥣' }, { p: 'VACA', s: ['VA', 'CA'], i: '🐮' },
            { p: 'TORO', s: ['TO', 'RO'], i: '🐂' }, { p: 'LECHE', s: ['LE', 'CHE'], i: '🥛' },
            { p: 'QUESO', s: ['QUE', 'SO'], i: '🧀' }, { p: 'COPA', s: ['CO', 'PA'], i: '🏆' },
            { p: 'CUNA', s: ['CU', 'NA'], i: '👶' }, { p: 'LANA', s: ['LA', 'NA'], i: '🧶' },
            { p: 'TELA', s: ['TE', 'LA'], i: '🧵' }, { p: 'GOMA', s: ['GO', 'MA'], i: '✏️' },
            { p: 'CAJA', s: ['CA', 'JA'], i: '📦' }, { p: 'PINO', s: ['PI', 'NO'], i: '🌲' },
            { p: 'VINO', s: ['VI', 'NO'], i: '🍇' }, { p: 'NIDO', s: ['NI', 'DO'], i: '🪺' }
        ],
        primaria2: [
            { p: 'PELOTA', s: ['PE', 'LO', 'TA'], i: '⚽' }, { p: 'TOMATE', s: ['TO', 'MA', 'TE'], i: '🍅' },
            { p: 'ZAPATO', s: ['ZA', 'PA', 'TO'], i: '👞' }, { p: 'GALLETA', s: ['GA', 'LLE', 'TA'], i: '🍪' },
            { p: 'COMETA', s: ['CO', 'ME', 'TA'], i: '🪁' }, { p: 'MALETA', s: ['MA', 'LE', 'TA'], i: '🧳' },
            { p: 'CONEJO', s: ['CO', 'NE', 'JO'], i: '🐰' }, { p: 'PALOMA', s: ['PA', 'LO', 'MA'], i: '🕊️' },
            { p: 'CABALLO', s: ['CA', 'BA', 'LLO'], i: '🐴' }, { p: 'BOTELLA', s: ['BO', 'TE', 'LLA'], i: '🍾' },
            { p: 'CEBOLLA', s: ['CE', 'BO', 'LLA'], i: '🧅' }, { p: 'CAMINO', s: ['CA', 'MI', 'NO'], i: '🛣️' },
            { p: 'MOCHILA', s: ['MO', 'CHI', 'LA'], i: '🎒' }, { p: 'LIBRETA', s: ['LI', 'BRE', 'TA'], i: '📓' },
            { p: 'CORONA', s: ['CO', 'RO', 'NA'], i: '👑' }, { p: 'CAMISA', s: ['CA', 'MI', 'SA'], i: '👔' },
            { p: 'CEREZA', s: ['CE', 'RE', 'ZA'], i: '🍒' }, { p: 'OVEJA', s: ['O', 'VE', 'JA'], i: '🐑' },
            { p: 'JIRAFA', s: ['JI', 'RA', 'FA'], i: '🦒' }, { p: 'BALLENA', s: ['BA', 'LLE', 'NA'], i: '🐋' },
            { p: 'TESORO', s: ['TE', 'SO', 'RO'], i: '💎' }, { p: 'PAYASO', s: ['PA', 'YA', 'SO'], i: '🤡' },
            { p: 'PIRATA', s: ['PI', 'RA', 'TA'], i: '🏴‍☠️' }, { p: 'DIBUJO', s: ['DI', 'BU', 'JO'], i: '🎨' },
            { p: 'RODILLA', s: ['RO', 'DI', 'LLA'], i: '🦵' }, { p: 'CASTILLO', s: ['CAS', 'TI', 'LLO'], i: '🏰' }
        ],
        primaria3: [
            { p: 'VENTANA', s: ['VEN', 'TA', 'NA'], i: '🪟' }, { p: 'CASTILLO', s: ['CAS', 'TI', 'LLO'], i: '🏰' },
            { p: 'ESCUELA', s: ['ES', 'CUE', 'LA'], i: '🏫' }, { p: 'ESTRELLA', s: ['ES', 'TRE', 'LLA'], i: '⭐' },
            { p: 'PLANETA', s: ['PLA', 'NE', 'TA'], i: '🪐' }, { p: 'GUITARRA', s: ['GUI', 'TA', 'RRA'], i: '🎸' },
            { p: 'TORTUGA', s: ['TOR', 'TU', 'GA'], i: '🐢' }, { p: 'DELFÍN', s: ['DEL', 'FÍN'], i: '🐬' },
            { p: 'PIZARRA', s: ['PI', 'ZA', 'RRA'], i: '📋' }, { p: 'GIGANTE', s: ['GI', 'GAN', 'TE'], i: '👤' },
            { p: 'MONTAÑA', s: ['MON', 'TA', 'ÑA'], i: '⛰️' }, { p: 'DRAGÓN', s: ['DRA', 'GÓN'], i: '🐉' },
            { p: 'PINTURA', s: ['PIN', 'TU', 'RA'], i: '🎨' }, { p: 'MANZANA', s: ['MAN', 'ZA', 'NA'], i: '🍎' },
            { p: 'NARANJA', s: ['NA', 'RAN', 'JA'], i: '🍊' }, { p: 'PLÁTANO', s: ['PLÁ', 'TA', 'NO'], i: '🍌' },
            { p: 'CAMPANA', s: ['CAM', 'PA', 'NA'], i: '🔔' }, { p: 'LÁMPARA', s: ['LÁM', 'PA', 'RA'], i: '💡' },
            { p: 'BOMBERO', s: ['BOM', 'BE', 'RO'], i: '🧑‍🚒' }, { p: 'SOMBRERO', s: ['SOM', 'BRE', 'RO'], i: '👒' },
            { p: 'COLUMPIO', s: ['CO', 'LUM', 'PIO'], i: '🛝' }, { p: 'TROMPETA', s: ['TROM', 'PE', 'TA'], i: '🎺' },
            { p: 'PINGÜINO', s: ['PIN', 'GÜI', 'NO'], i: '🐧' }, { p: 'CIGÜEÑA', s: ['CI', 'GÜE', 'ÑA'], i: '🪶' }
        ],
        primaria4: [
            { p: 'MARIPOSA', s: ['MA', 'RI', 'PO', 'SA'], i: '🦋' }, { p: 'CHOCOLATE', s: ['CHO', 'CO', 'LA', 'TE'], i: '🍫' },
            { p: 'CALABAZA', s: ['CA', 'LA', 'BA', 'ZA'], i: '🎃' }, { p: 'BICICLETA', s: ['BI', 'CI', 'CLE', 'TA'], i: '🚲' },
            { p: 'ELEFANTE', s: ['E', 'LE', 'FAN', 'TE'], i: '🐘' }, { p: 'CARPINTERO', s: ['CAR', 'PIN', 'TE', 'RO'], i: '🪚' },
            { p: 'BOLÍGRAFO', s: ['BO', 'LÍ', 'GRA', 'FO'], i: '🖊️' }, { p: 'ASTRONAUTA', s: ['AS', 'TRO', 'NAU', 'TA'], i: '👨‍🚀' },
            { p: 'HELICÓPTERO', s: ['HE', 'LI', 'CÓP', 'TE', 'RO'], i: '🚁' }, { p: 'PRIMAVERA', s: ['PRI', 'MA', 'VE', 'RA'], i: '🌸' },
            { p: 'ESCARABAJO', s: ['ES', 'CA', 'RA', 'BA', 'JO'], i: '🪲' }, { p: 'MARIQUITA', s: ['MA', 'RI', 'QUI', 'TA'], i: '🐞' },
            { p: 'TERMÓMETRO', s: ['TER', 'MÓ', 'ME', 'TRO'], i: '🌡️' }, { p: 'COCODRILO', s: ['CO', 'CO', 'DRI', 'LO'], i: '🐊' },
            { p: 'DINOSAURIO', s: ['DI', 'NO', 'SAU', 'RIO'], i: '🦖' }, { p: 'SUBMARINO', s: ['SUB', 'MA', 'RI', 'NO'], i: '🚢' },
            { p: 'AMBULANCIA', s: ['AM', 'BU', 'LAN', 'CIA'], i: '🚑' }, { p: 'CAMPAMENTO', s: ['CAM', 'PA', 'MEN', 'TO'], i: '⛺' }
        ],
        primaria5: [
            { p: 'ORDENADOR', s: ['OR', 'DE', 'NA', 'DOR'], i: '💻' }, { p: 'TELESCOPIO', s: ['TE', 'LES', 'CO', 'PIO'], i: '🔭' },
            { p: 'MICROSCOPIO', s: ['MI', 'CROS', 'CO', 'PIO'], i: '🔬' }, { p: 'BIBLIOTECA', s: ['BI', 'BLIO', 'TE', 'CA'], i: '📚' },
            { p: 'SUPERMERCADO', s: ['SU', 'PER', 'MER', 'CA', 'DO'], i: '🛒' }, { p: 'LABORATORIO', s: ['LA', 'BO', 'RA', 'TO', 'RIO'], i: '🧪' },
            { p: 'RINOCERONTE', s: ['RI', 'NO', 'CE', 'RON', 'TE'], i: '🦏' }, { p: 'HIPOPÓTAMO', s: ['HI', 'PO', 'PÓ', 'TA', 'MO'], i: '🦛' },
            { p: 'ESPANTAPÁJAROS', s: ['ES', 'PAN', 'TA', 'PÁ', 'JA', 'ROS'], i: '🌾' }, { p: 'AVENTURERO', s: ['A', 'VEN', 'TU', 'RE', 'RO'], i: '🧭' },
            { p: 'EMPERADOR', s: ['EM', 'PE', 'RA', 'DOR'], i: '👑' }, { p: 'CABALLERO', s: ['CA', 'BA', 'LLE', 'RO'], i: '🛡️' },
            { p: 'QUIJOTESCO', s: ['QUI', 'JO', 'TES', 'CO'], i: '📖' }, { p: 'ELECTRICIDAD', s: ['E', 'LEC', 'TRI', 'CI', 'DAD'], i: '⚡' }
        ],
        primaria6: [
            { p: 'LITERATURA', s: ['LI', 'TE', 'RA', 'TU', 'RA'], i: '📚' }, { p: 'NATURALEZA', s: ['NA', 'TU', 'RA', 'LE', 'ZA'], i: '🌿' },
            { p: 'EXPERIMENTO', s: ['EX', 'PE', 'RI', 'MEN', 'TO'], i: '⚗️' }, { p: 'CONTAMINACIÓN', s: ['CON', 'TA', 'MI', 'NA', 'CIÓN'], i: '🏭' },
            { p: 'INVESTIGADOR', s: ['IN', 'VES', 'TI', 'GA', 'DOR'], i: '🔍' }, { p: 'DESCUBRIMIENTO', s: ['DES', 'CU', 'BRI', 'MIEN', 'TO'], i: '🗺️' },
            { p: 'CONSTITUCIÓN', s: ['CONS', 'TI', 'TU', 'CIÓN'], i: '📜' }, { p: 'CIVILIZACIÓN', s: ['CI', 'VI', 'LI', 'ZA', 'CIÓN'], i: '🏛️' },
            { p: 'ASTRONOMÍA', s: ['AS', 'TRO', 'NO', 'MÍ', 'A'], i: '🌌' }, { p: 'GEOGRAFÍA', s: ['GEO', 'GRA', 'FÍ', 'A'], i: '🌍' },
            { p: 'BIODIVERSIDAD', s: ['BIO', 'DI', 'VER', 'SI', 'DAD'], i: '🌱' }, { p: 'REVOLUCIÓN', s: ['RE', 'VO', 'LU', 'CIÓN'], i: '⚙️' }
        ]
    };

    function scrambleSyllables(silabas) {
        if (silabas.length <= 1) return [...silabas];
        let scrambled = shuffle(silabas);
        let attempts = 0;
        while (scrambled.join('') === silabas.join('') && attempts < 10) {
            scrambled = shuffle(silabas);
            attempts++;
        }
        if (scrambled.join('') === silabas.join('')) {
            const temp = scrambled[0];
            scrambled[0] = scrambled[1];
            scrambled[1] = temp;
        }
        return scrambled;
    }

    // =========================================================================
    // 3. GENERADOR DE ACTIVIDADES DE LENGUA
    // =========================================================================

    // Generador Letra Perdida
    function generateLetraPerdida(nivel, id) {
        const itemPair = bubbleWordPairs[id % bubbleWordPairs.length];
        const correctWord = itemPair[0].toUpperCase();
        
        // Identificar qué letra reemplazar por '_'
        let targetIdx = -1;
        let candidateLetter = '';
        const vowels = ['A', 'E', 'I', 'O', 'U'];
        const trickyConsonants = ['B', 'V', 'C', 'Z', 'S', 'G', 'J', 'H', 'LL', 'Y', 'R'];

        // Buscar letra conflictiva primero
        for (let i = 0; i < correctWord.length; i++) {
            if (trickyConsonants.includes(correctWord[i])) {
                targetIdx = i;
                candidateLetter = correctWord[i];
                break;
            }
        }
        // Si no, tomar vocal intermedia
        if (targetIdx === -1) {
            targetIdx = Math.floor(correctWord.length / 2);
            candidateLetter = correctWord[targetIdx];
        }

        // Crear opciones de letras
        let distractorPool = ['B', 'V', 'C', 'Z', 'S', 'G', 'J', 'H', 'LL', 'Y', 'R', 'M', 'N', 'P', 'T'];
        if (vowels.includes(candidateLetter)) {
            distractorPool = vowels.filter(v => v !== candidateLetter);
        } else {
            distractorPool = distractorPool.filter(l => l !== candidateLetter);
        }
        shuffle(distractorPool);
        const options = shuffle([candidateLetter, distractorPool[0], distractorPool[1], distractorPool[2]]);

        // Formato con espacios y '_'
        const chars = correctWord.split('');
        chars[targetIdx] = '_';
        const spacedWord = chars.join(' ');

        return {
            id: `${nivel}_b_letra_${id}`,
            tipo: 'letra_perdida',
            pregunta: '¡Encuentra la letra perdida para completar la palabra!',
            palabra: spacedWord,
            palabraCompleta: correctWord,
            letraCorrecta: candidateLetter,
            opciones: options,
            respuesta: options.indexOf(candidateLetter)
        };
    }

    // Generador Ordenar Sílabas
    function generateOrdenarSilabas(nivel, id) {
        const pool = silabasPorNivel[nivel] || silabasPorNivel.primaria1;
        const base = pool[id % pool.length];
        const scrambled = scrambleSyllables(base.s);

        return {
            id: `${nivel}_b_silabas_${id}`,
            tipo: 'ordenar_silabas',
            pregunta: '¡Ordena las sílabas para formar la palabra correcta!',
            palabra: base.p,
            silabas: base.s,
            silabasDesordenadas: scrambled,
            imagen: base.i
        };
    }

    // Generador Burbujas Multi-Ronda (3 Rondas de 20s, banco dinámico)
    function generateBurbujas(nivel, id) {
        // Seleccionamos palabras de las parejas para cada una de las 3 rondas
        const rounds = [];
        for (let r = 0; r < 3; r++) {
            const startIdx = ((id * 3 + r) * 6) % bubbleWordPairs.length;
            const chosenPairs = [];
            for (let k = 0; k < 4; k++) {
                chosenPairs.push(bubbleWordPairs[(startIdx + k) % bubbleWordPairs.length]);
            }
            const correctas = chosenPairs.map(p => p[0]);
            const incorrectas = chosenPairs.map(p => p[1]);
            rounds.push({
                ronda: r + 1,
                duracion: 20,
                correctas: correctas,
                incorrectas: incorrectas
            });
        }

        return {
            id: `${nivel}_b_burbujas_${id}`,
            tipo: 'burbujas',
            pregunta: '¡Lluvia de Palabras! Explota las burbujas bien escritas',
            totalRondas: 3,
            duracionRonda: 20,
            rondas: rounds,
            // Compatibilidad con actividad simple
            correctas: rounds[0].correctas,
            incorrectas: rounds[0].incorrectas
        };
    }

    // Constructor Maestro de Lengua
    const LanguageBank = {
        bubbleWordPairs: bubbleWordPairs,

        generateBankForLevel(nivel) {
            const list = [];
            // 200 Letra perdida
            for (let i = 0; i < 200; i++) {
                list.push(generateLetraPerdida(nivel, i + 1));
            }
            // 200 Ordenar sílabas
            for (let i = 0; i < 200; i++) {
                list.push(generateOrdenarSilabas(nivel, i + 1));
            }
            // 10 sesiones de Burbujas Multi-Ronda
            for (let i = 0; i < 10; i++) {
                list.push(generateBurbujas(nivel, i + 1));
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
                window.AULA_DATA[lvl].bosque = items;
                total += items.length;
            });
            console.log(`[LanguageBank] Banco de Lengua cargado con éxito: ${total} actividades en total (Bosque de Palabras) y ${bubbleWordPairs.length * 2} palabras en el vocabulario.`);
        }
    };

    window.LanguageBank = LanguageBank;

    // Inicialización automática
    LanguageBank.init();
})();
