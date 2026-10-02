# 📖 CONTEXTO DE "AULA AVENTURA" (CEIP DON QUIJOTE)
> **Instrucciones para la IA:** Lee este documento para entender de qué trata la plataforma web educativa y qué tipo de contenidos debes generar. Tu misión principal es crear **actividades educativas y divertidas para niños de 2.º de Primaria (7 a 8 años)**.

---

## 🏫 1. ¿De qué trata la plataforma?

**Aula Aventura** es una aplicación web educativa interactiva desarrollada para el colegio **CEIP Don Quijote**. 
Está pensada para ser proyectada en la **pizarra digital del aula** o utilizada en los ordenadores de clase, funcionando de forma 100% interactiva, visual y offline.

### 🎮 Enfoque y Gamificación:
* **Temática escolar y de aventura:** Inspirada en el espíritu aventurero de Don Quijote de la Mancha, combinada con un estilo visual moderno, colorido y amigable para niños.
* **Cursos escolares:** Abarca desde 1.º hasta 6.º de Primaria.
* **Mascotas cúbicas personalizables:** Cada curso tiene su propia mascota animal (perrito, oso, panda, león, elefante, jirafa...) que los niños pueden bautizar y personalizar.
* **Moneda de recompensa ("Chucheletes"):** Al acertar retos y preguntas, los alumnos ganan *Chucheletes* que se acumulan en el marcador de la clase, fomentando el aprendizaje cooperativo y la motivación.

---

## 🗺️ 2. El Mapa de Aventura: Las 5 Zonas del Saber

Al entrar en cualquier curso, los alumnos exploran un **mapa interactivo** con 5 zonas temáticas que cubren las áreas del currículo escolar:

1. 🏰 **El Castillo del Saber (Matemáticas y Lógica):**
   * Cálculo mental, sumas, restas, series de números, figuras geométricas, problemas cotidianos sencillos y razonamiento lógico.
2. 🌳 **El Bosque de Palabras (Lengua Castellana y Lectura):**
   * Vocabulario, ortografía básica, sinónimos y antónimos, tipos de palabras (nombres, adjetivos, verbos), separación de sílabas y comprensión lectora breve.
3. 🧪 **El Laboratorio (Ciencias de la Naturaleza):**
   * Seres vivos (animales, plantas), el cuerpo humano y los sentidos, hábitos saludables, el agua, el aire y el cuidado del medio ambiente.
4. 📚 **La Biblioteca Mágica (Ciencias Sociales y Cultura Quijotesca):**
   * El entorno, la localidad, el paso del tiempo, las estaciones del año, convivencia, y anécdotas o personajes adaptados de Don Quijote y Sancho Panza.
5. 🎨 **El Taller Creativo (Educación Artística, Música e Ingenio):**
   * Colores primarios y secundarios, instrumentos musicales, sonidos del entorno, formas visuales, adivinanzas infantiles y agilidad mental.

---

## 🎯 3. NUESTRA NECESIDAD: Actividades para 2.º de Primaria (7 - 8 años)

### 👶 Perfil del alumnado de 2.º de Primaria:
* Tienen entre **7 y 8 años**.
* Ya leen y escriben con soltura textos breves, pero las preguntas deben ser **claras, directas y con vocabulario accesible**.
* Tono: motivador, cercano, positivo y divertido (¡nada de textos largos ni preguntas trampa que frustren!).
* Contenidos curriculares acordes al nivel:
  * **Matemáticas:** Números hasta el 999, decenas y centenas, sumas y restas con llevadas sencillas, iniciación a las tablas de multiplicar (tabla del 2, 5, 10), figuras básicas (círculo, cuadrado, triángulo, rectángulo).
  * **Lengua:** Mayúsculas y punto, sonido R fuerte y suave (r / rr), c/qu, g/gu, sílabas, palabras contrarias (antónimos), palabras parecidas (sinónimos), singular y plural, femenino y masculino.
  * **Ciencias de la Naturaleza:** Animales vertebrados e invertebrados (mamíferos, aves, peces, insectos), carnívoros/herbívoros/omnívoros, partes de una planta, los 5 sentidos, alimentación saludable.
  * **Ciencias Sociales:** La familia, el colegio, el pueblo o la ciudad, las estaciones del año, el día y la noche, medios de transporte, Don Quijote, su fiel escudero Sancho Panza y su caballo Rocinante.
  * **Artística e Ingenio:** Mezcla de colores (amarillo + azul = verde), familias de instrumentos (cuerda, viento, percusión), adivinanzas populares infantiles y retos de ingenio visual.

---

## 💻 4. Formato Técnico de las Preguntas

La plataforma lee las actividades directamente desde el archivo `data/db_full.js`.
Cada actividad es un objeto en JavaScript / JSON con este formato exacto:

```javascript
{
    tipo: 'multiple',             // Tipo de pregunta: siempre 'multiple'
    pregunta: '¿Texto claro de la pregunta para los niños?',
    opciones: ['Opción A', 'Opción B', 'Opción C', 'Opción D'], // 3 o 4 opciones
    respuesta: 0                  // Índice de la opción correcta (0 para la primera, 1 para la segunda, 2 para la tercera...)
}
```

*Nota: El índice `respuesta` empieza en `0` (`0` = primera opción, `1` = segunda opción, etc.). Procura alternar la posición de la respuesta correcta para que no sea siempre la misma.*

---

## 🚀 5. Lo que esperamos que genere la otra IA

Pídele a la otra IA lo siguiente:

> *"Genera una batería completa de preguntas interactivas para alumnos de 2.º de Primaria en el formato especificado, organizadas en las 5 zonas del saber:*
> 1. *Castillo del Saber (Matemáticas)*
> 2. *Bosque de Palabras (Lengua)*
> 3. *Laboratorio (Ciencias Naturales)*
> 4. *Biblioteca Mágica (Sociales y Don Quijote)*
> 5. *Taller Creativo (Arte, Música e Ingenio)*
>
> *Las preguntas deben ser alegres, educativas, variadas y adaptadas exactamente a la edad de 7-8 años, entregadas en el bloque de código de `window.AULA_DATA.primaria2` listo para copiar y pegar."*

---
