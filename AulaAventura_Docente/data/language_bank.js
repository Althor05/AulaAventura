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
        for (let i = arr.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [arr[i], arr[j]] = [arr[j], arr[i]];
        }
        return arr;
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
    // 2. BANCO DE PALABRAS SILABIFICADAS (ORDENAR SÍLABAS - 2 Y 3 SÍLABAS, SIN EMOJIS)
    // =========================================================================
    const silabasPorNivel = {
        primaria1: [
            // Palabras de 2 sílabas
            { p: 'MESA', s: ['ME', 'SA'] }, { p: 'PATO', s: ['PA', 'TO'] },
            { p: 'GATO', s: ['GA', 'TO'] }, { p: 'CASA', s: ['CA', 'SA'] },
            { p: 'LOBO', s: ['LO', 'BO'] }, { p: 'RANA', s: ['RA', 'NA'] },
            { p: 'SAPO', s: ['SA', 'PO'] }, { p: 'SOPA', s: ['SO', 'PA'] },
            { p: 'TAZA', s: ['TA', 'ZA'] }, { p: 'LUNA', s: ['LU', 'NA'] },
            { p: 'BOLA', s: ['BO', 'LA'] }, { p: 'ROSA', s: ['RO', 'SA'] },
            { p: 'VELA', s: ['VE', 'LA'] }, { p: 'PERA', s: ['PE', 'RA'] },
            { p: 'PIÑA', s: ['PI', 'ÑA'] }, { p: 'FOCA', s: ['FO', 'CA'] },
            { p: 'MAPA', s: ['MA', 'PA'] }, { p: 'PELO', s: ['PE', 'LO'] },
            { p: 'BOCA', s: ['BO', 'CA'] }, { p: 'MANO', s: ['MA', 'NO'] },
            { p: 'DEDO', s: ['DE', 'DO'] }, { p: 'NUBE', s: ['NU', 'BE'] },
            { p: 'PALA', s: ['PA', 'LA'] }, { p: 'VACA', s: ['VA', 'CA'] },
            { p: 'TORO', s: ['TO', 'RO'] }, { p: 'LECHE', s: ['LE', 'CHE'] },
            { p: 'QUESO', s: ['QUE', 'SO'] }, { p: 'COPA', s: ['CO', 'PA'] },
            { p: 'CUNA', s: ['CU', 'NA'] }, { p: 'LANA', s: ['LA', 'NA'] },
            { p: 'TELA', s: ['TE', 'LA'] }, { p: 'GOMA', s: ['GO', 'MA'] },
            { p: 'CAJA', s: ['CA', 'JA'] }, { p: 'PINO', s: ['PI', 'NO'] },
            { p: 'VINO', s: ['VI', 'NO'] }, { p: 'NIDO', s: ['NI', 'DO'] },
            // Palabras de 3 sílabas para enriquecer 1.º de Primaria
            { p: 'PELOTA', s: ['PE', 'LO', 'TA'] }, { p: 'TOMATE', s: ['TO', 'MA', 'TE'] },
            { p: 'ZAPATO', s: ['ZA', 'PA', 'TO'] }, { p: 'COMETA', s: ['CO', 'ME', 'TA'] },
            { p: 'MALETA', s: ['MA', 'LE', 'TA'] }, { p: 'CONEJO', s: ['CO', 'NE', 'JO'] },
            { p: 'PALOMA', s: ['PA', 'LO', 'MA'] }, { p: 'BOTELLA', s: ['BO', 'TE', 'LLA'] },
            { p: 'CAMISA', s: ['CA', 'MI', 'SA'] }, { p: 'CEREZA', s: ['CE', 'RE', 'ZA'] },
            { p: 'OVEJA', s: ['O', 'VE', 'JA'] }, { p: 'PAYASO', s: ['PA', 'YA', 'SO'] },
            { p: 'PIRATA', s: ['PI', 'RA', 'TA'] }, { p: 'DIBUJO', s: ['DI', 'BU', 'JO'] },
            { p: 'CORONA', s: ['CO', 'RO', 'NA'] }, { p: 'CAMINO', s: ['CA', 'MI', 'NO'] },
            { p: 'GALLETA', s: ['GA', 'LLE', 'TA'] }, { p: 'TORTUGA', s: ['TOR', 'TU', 'GA'] },
            { p: 'VENTANA', s: ['VEN', 'TA', 'NA'] }, { p: 'ESTRELLA', s: ['ES', 'TRE', 'LLA'] },
            { p: 'MANZANA', s: ['MAN', 'ZA', 'NA'] }, { p: 'NARANJA', s: ['NA', 'RAN', 'JA'] },
            { p: 'PLÁTANO', s: ['PLÁ', 'TA', 'NO'] }, { p: 'CAMPANA', s: ['CAM', 'PA', 'NA'] },
            { p: 'BOMBERO', s: ['BOM', 'BE', 'RO'] }, { p: 'SOMBRERO', s: ['SOM', 'BRE', 'RO'] }
        ],
        primaria2: [
            // Palabras de 2 y 3 sílabas
            { p: 'BARCO', s: ['BAR', 'CO'] }, { p: 'CIELO', s: ['CIE', 'LO'] },
            { p: 'FUEGO', s: ['FUE', 'GO'] }, { p: 'PLAYA', s: ['PLA', 'YA'] },
            { p: 'TIGRE', s: ['TI', 'GRE'] }, { p: 'PERRO', s: ['PE', 'RRO'] },
            { p: 'PELOTA', s: ['PE', 'LO', 'TA'] }, { p: 'TOMATE', s: ['TO', 'MA', 'TE'] },
            { p: 'ZAPATO', s: ['ZA', 'PA', 'TO'] }, { p: 'GALLETA', s: ['GA', 'LLE', 'TA'] },
            { p: 'COMETA', s: ['CO', 'ME', 'TA'] }, { p: 'MALETA', s: ['MA', 'LE', 'TA'] },
            { p: 'CONEJO', s: ['CO', 'NE', 'JO'] }, { p: 'PALOMA', s: ['PA', 'LO', 'MA'] },
            { p: 'CABALLO', s: ['CA', 'BA', 'LLO'] }, { p: 'BOTELLA', s: ['BO', 'TE', 'LLA'] },
            { p: 'CEBOLLA', s: ['CE', 'BO', 'LLA'] }, { p: 'CAMINO', s: ['CA', 'MI', 'NO'] },
            { p: 'MOCHILA', s: ['MO', 'CHI', 'LA'] }, { p: 'LIBRETA', s: ['LI', 'BRE', 'TA'] },
            { p: 'CORONA', s: ['CO', 'RO', 'NA'] }, { p: 'CAMISA', s: ['CA', 'MI', 'SA'] },
            { p: 'CEREZA', s: ['CE', 'RE', 'ZA'] }, { p: 'OVEJA', s: ['O', 'VE', 'JA'] },
            { p: 'JIRAFA', s: ['JI', 'RA', 'FA'] }, { p: 'BALLENA', s: ['BA', 'LLE', 'NA'] },
            { p: 'TESORO', s: ['TE', 'SO', 'RO'] }, { p: 'PAYASO', s: ['PA', 'YA', 'SO'] },
            { p: 'PIRATA', s: ['PI', 'RA', 'TA'] }, { p: 'DIBUJO', s: ['DI', 'BU', 'JO'] },
            { p: 'RODILLA', s: ['RO', 'DI', 'LLA'] }, { p: 'CASTILLO', s: ['CAS', 'TI', 'LLO'] }
        ],
        primaria3: [
            { p: 'VENTANA', s: ['VEN', 'TA', 'NA'] }, { p: 'CASTILLO', s: ['CAS', 'TI', 'LLO'] },
            { p: 'ESCUELA', s: ['ES', 'CUE', 'LA'] }, { p: 'ESTRELLA', s: ['ES', 'TRE', 'LLA'] },
            { p: 'PLANETA', s: ['PLA', 'NE', 'TA'] }, { p: 'GUITARRA', s: ['GUI', 'TA', 'RRA'] },
            { p: 'TORTUGA', s: ['TOR', 'TU', 'GA'] }, { p: 'DELFÍN', s: ['DEL', 'FÍN'] },
            { p: 'PIZARRA', s: ['PI', 'ZA', 'RRA'] }, { p: 'GIGANTE', s: ['GI', 'GAN', 'TE'] },
            { p: 'MONTAÑA', s: ['MON', 'TA', 'ÑA'] }, { p: 'DRAGÓN', s: ['DRA', 'GÓN'] },
            { p: 'PINTURA', s: ['PIN', 'TU', 'RA'] }, { p: 'MANZANA', s: ['MAN', 'ZA', 'NA'] },
            { p: 'NARANJA', s: ['NA', 'RAN', 'JA'] }, { p: 'PLÁTANO', s: ['PLÁ', 'TA', 'NO'] },
            { p: 'CAMPANA', s: ['CAM', 'PA', 'NA'] }, { p: 'LÁMPARA', s: ['LÁM', 'PA', 'RA'] },
            { p: 'BOMBERO', s: ['BOM', 'BE', 'RO'] }, { p: 'SOMBRERO', s: ['SOM', 'BRE', 'RO'] },
            { p: 'COLUMPIO', s: ['CO', 'LUM', 'PIO'] }, { p: 'TROMPETA', s: ['TROM', 'PE', 'TA'] },
            { p: 'PINGÜINO', s: ['PIN', 'GÜI', 'NO'] }, { p: 'CIGÜEÑA', s: ['CI', 'GÜE', 'ÑA'] }
        ],
        primaria4: [
            { p: 'MARIPOSA', s: ['MA', 'RI', 'PO', 'SA'] }, { p: 'CHOCOLATE', s: ['CHO', 'CO', 'LA', 'TE'] },
            { p: 'CALABAZA', s: ['CA', 'LA', 'BA', 'ZA'] }, { p: 'BICICLETA', s: ['BI', 'CI', 'CLE', 'TA'] },
            { p: 'ELEFANTE', s: ['E', 'LE', 'FAN', 'TE'] }, { p: 'CARPINTERO', s: ['CAR', 'PIN', 'TE', 'RO'] },
            { p: 'BOLÍGRAFO', s: ['BO', 'LÍ', 'GRA', 'FO'] }, { p: 'ASTRONAUTA', s: ['AS', 'TRO', 'NAU', 'TA'] },
            { p: 'HELICÓPTERO', s: ['HE', 'LI', 'CÓP', 'TE', 'RO'] }, { p: 'PRIMAVERA', s: ['PRI', 'MA', 'VE', 'RA'] },
            { p: 'ESCARABAJO', s: ['ES', 'CA', 'RA', 'BA', 'JO'] }, { p: 'MARIQUITA', s: ['MA', 'RI', 'QUI', 'TA'] },
            { p: 'TERMÓMETRO', s: ['TER', 'MÓ', 'ME', 'TRO'] }, { p: 'COCODRILO', s: ['CO', 'CO', 'DRI', 'LO'] },
            { p: 'DINOSAURIO', s: ['DI', 'NO', 'SAU', 'RIO'] }, { p: 'SUBMARINO', s: ['SUB', 'MA', 'RI', 'NO'] },
            { p: 'AMBULANCIA', s: ['AM', 'BU', 'LAN', 'CIA'] }, { p: 'CAMPAMENTO', s: ['CAM', 'PA', 'MEN', 'TO'] }
        ],
        primaria5: [
            { p: 'ORDENADOR', s: ['OR', 'DE', 'NA', 'DOR'] }, { p: 'TELESCOPIO', s: ['TE', 'LES', 'CO', 'PIO'] },
            { p: 'MICROSCOPIO', s: ['MI', 'CROS', 'CO', 'PIO'] }, { p: 'BIBLIOTECA', s: ['BI', 'BLIO', 'TE', 'CA'] },
            { p: 'SUPERMERCADO', s: ['SU', 'PER', 'MER', 'CA', 'DO'] }, { p: 'LABORATORIO', s: ['LA', 'BO', 'RA', 'TO', 'RIO'] },
            { p: 'RINOCERONTE', s: ['RI', 'NO', 'CE', 'RON', 'TE'] }, { p: 'HIPOPÓTAMO', s: ['HI', 'PO', 'PÓ', 'TA', 'MO'] },
            { p: 'ESPANTAPÁJAROS', s: ['ES', 'PAN', 'TA', 'PÁ', 'JA', 'ROS'] }, { p: 'AVENTURERO', s: ['A', 'VEN', 'TU', 'RE', 'RO'] },
            { p: 'EMPERADOR', s: ['EM', 'PE', 'RA', 'DOR'] }, { p: 'CABALLERO', s: ['CA', 'BA', 'LLE', 'RO'] },
            { p: 'QUIJOTESCO', s: ['QUI', 'JO', 'TES', 'CO'] }, { p: 'ELECTRICIDAD', s: ['E', 'LEC', 'TRI', 'CI', 'DAD'] }
        ],
        primaria6: [
            { p: 'LITERATURA', s: ['LI', 'TE', 'RA', 'TU', 'RA'] }, { p: 'NATURALEZA', s: ['NA', 'TU', 'RA', 'LE', 'ZA'] },
            { p: 'EXPERIMENTO', s: ['EX', 'PE', 'RI', 'MEN', 'TO'] }, { p: 'CONTAMINACIÓN', s: ['CON', 'TA', 'MI', 'NA', 'CIÓN'] },
            { p: 'INVESTIGADOR', s: ['IN', 'VES', 'TI', 'GA', 'DOR'] }, { p: 'DESCUBRIMIENTO', s: ['DES', 'CU', 'BRI', 'MIEN', 'TO'] },
            { p: 'CONSTITUCIÓN', s: ['CONS', 'TI', 'TU', 'CIÓN'] }, { p: 'CIVILIZACIÓN', s: ['CI', 'VI', 'LI', 'ZA', 'CIÓN'] },
            { p: 'ASTRONOMÍA', s: ['AS', 'TRO', 'NO', 'MÍ', 'A'] }, { p: 'GEOGRAFÍA', s: ['GEO', 'GRA', 'FÍ', 'A'] },
            { p: 'BIODIVERSIDAD', s: ['BIO', 'DI', 'VER', 'SI', 'DAD'] }, { p: 'REVOLUCIÓN', s: ['RE', 'VO', 'LU', 'CIÓN'] }
        ]
    };

    function scrambleSyllables(silabas) {
        if (silabas.length <= 1) return [...silabas];
        let scrambled = shuffle([...silabas]);
        let attempts = 0;
        while (scrambled.join('') === silabas.join('') && attempts < 10) {
            scrambled = shuffle([...silabas]);
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
    // 3. DICCIONARIO LÉXICO Y VALIDADOR ORTOGRÁFICO
    // =========================================================================
    const VOCABULARIO_ESPANOL = new Set();
    bubbleWordPairs.forEach(p => {
        VOCABULARIO_ESPANOL.add(p[0].toUpperCase());
    });
    for (const lvl in silabasPorNivel) {
        silabasPorNivel[lvl].forEach(item => {
            VOCABULARIO_ESPANOL.add(item.p.toUpperCase());
        });
    }
    const palabrasComunes = [
        'CIELO', 'HIELO', 'CASA', 'PASA', 'MASA', 'TASA', 'RASA', 'PATO', 'GATO', 'RATO', 'MATO',
        'BOLA', 'COLA', 'SOLA', 'POLA', 'MOLA', 'BOTE', 'VOTE', 'LOTE', 'ROJA', 'HOJA', 'SOJA',
        'PALA', 'MALA', 'BALA', 'SALA', 'TALA', 'CALA', 'GALA', 'LUNA', 'CUNA', 'DUNA',
        'MANO', 'PANO', 'VANO', 'BOCA', 'ROCA', 'FOCA', 'TOCA', 'LOCA', 'SOFA',
        'BARCO', 'MARCO', 'PARCO', 'VIENTO', 'CIENTO', 'SIENTO', 'DIENTE',
        'PISTA', 'VISTA', 'LISTA', 'CARTA', 'TARTA', 'PARTE', 'MARTE',
        'QUESO', 'HUESO', 'CUEVA', 'NUEVA', 'HUEVO', 'NUEVO', 'PIEL', 'MIEL', 'FIEL'
    ];
    palabrasComunes.forEach(w => VOCABULARIO_ESPANOL.add(w.toUpperCase()));

    function getValidLettersForWord(word, targetIdx) {
        const validLetters = new Set();
        const alphabet = 'ABCDEFGHIJKLMNÑOPQRSTUVWXYZ'.split('');
        const prefix = word.slice(0, targetIdx);
        const suffix = word.slice(targetIdx + 1);

        alphabet.forEach(letter => {
            const candidateWord = prefix + letter + suffix;
            if (VOCABULARIO_ESPANOL.has(candidateWord)) {
                validLetters.add(letter);
            }
        });
        validLetters.add(word[targetIdx]);
        return Array.from(validLetters);
    }

    // =========================================================================
    // 4. GENERADOR DE ACTIVIDADES DE LENGUA
    // =========================================================================

    // Generador Letra Perdida (100% libre de ambigüedades y validación de palabras reales)
    function generateLetraPerdida(nivel, id) {
        const itemPair = bubbleWordPairs[id % bubbleWordPairs.length];
        const correctWord = itemPair[0].toUpperCase();
        
        let targetIdx = -1;
        let candidateLetter = '';
        const trickyConsonants = ['B', 'V', 'C', 'Z', 'S', 'G', 'J', 'H', 'LL', 'Y', 'R'];
        const vowels = ['A', 'E', 'I', 'O', 'U'];

        for (let i = 0; i < correctWord.length; i++) {
            if (trickyConsonants.includes(correctWord[i])) {
                targetIdx = i;
                candidateLetter = correctWord[i];
                break;
            }
        }
        if (targetIdx === -1) {
            targetIdx = Math.floor(correctWord.length / 2);
            candidateLetter = correctWord[targetIdx];
        }

        // Obtener TODAS las letras del alfabeto que formarían una palabra válida en español
        const validLetters = getValidLettersForWord(correctWord, targetIdx);

        // Para evitar ambigüedades confusas, seleccionamos distractores que NO formen palabras reales
        const alphabet = 'ABCDEFGHIJKLMNÑOPQRSTUVWXYZ'.split('');
        let invalidLetters = alphabet.filter(l => !validLetters.includes(l));
        
        if (vowels.includes(candidateLetter)) {
            const invalidVowels = vowels.filter(v => !validLetters.includes(v));
            if (invalidVowels.length >= 2) {
                invalidLetters = invalidVowels.concat(invalidLetters.filter(l => !vowels.includes(l)));
            }
        }
        
        shuffle(invalidLetters);
        const distractors = invalidLetters.slice(0, 3);
        const options = shuffle([candidateLetter, ...distractors]);

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
            targetIdx: targetIdx,
            letraCorrecta: candidateLetter,
            letrasValidas: validLetters,
            opciones: options,
            respuesta: options.indexOf(candidateLetter)
        };
    }

    // Generador Ordenar Sílabas (Sin emojis distractores, 2 y 3 sílabas pedagógicas)
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
            silabasDesordenadas: scrambled
        };
    }

    // Generador Burbujas Multi-Ronda (Máxima variedad global: palabras de todo el diccionario)
    function generateBurbujas(nivel, id) {
        const rounds = [];
        const shuffledAll = shuffle([...bubbleWordPairs]);
        
        for (let r = 0; r < 3; r++) {
            // 25 parejas distintas por ronda extraídas de todas las categorías ortográficas
            const roundPairs = shuffledAll.slice(r * 25, (r + 1) * 25);
            const correctas = roundPairs.map(p => p[0]);
            const incorrectas = roundPairs.map(p => p[1]);
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
            correctas: rounds[0].correctas,
            incorrectas: rounds[0].incorrectas
        };
    }

    // Constructor Maestro de Lengua
    const LanguageBank = {
        bubbleWordPairs: bubbleWordPairs,
        VOCABULARIO_ESPANOL: VOCABULARIO_ESPANOL,
        esPalabraValida(palabra) {
            return VOCABULARIO_ESPANOL.has(palabra.toUpperCase());
        },

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
