🎯 Bariatric Trivia Wheel
🩺 Descripción

Aplicación web interactiva desarrollada para un congreso de pacientes bariátricos.
La dinámica consiste en una ruleta animada que selecciona categorías al azar y muestra preguntas de opción múltiple relacionadas con salud y cirugía bariátrica.

El objetivo es fomentar la participación del público a través de una experiencia visual dinámica y educativa.

🛠 Tecnologías utilizadas

HTML5

CSS3

JavaScript (Vanilla JS)

API Canvas de HTML5

🎮 Funcionalidades principales

🎡 Ruleta dibujada dinámicamente con Canvas

🧮 Cálculo matemático del sector seleccionado según rotación

🎞 Animación con efecto de desaceleración progresiva (easing)

🔀 Selección aleatoria de preguntas dentro de cada categoría

🔊 Efectos de sonido para giro y respuestas

⭐ Sistema de puntaje automático

📱 Diseño responsive para uso en dispositivos móviles

🖼 Precarga de iconos por sector

🧠 Lógica de funcionamiento

La ruleta se dibuja dinámicamente en un <canvas> utilizando coordenadas polares.

Cada sector tiene un ángulo calculado en función de la cantidad total de categorías.

Al girar, se genera una rotación aleatoria que supera varias vueltas completas.

Se normaliza la rotación final para determinar matemáticamente el sector ganador.

Se selecciona una pregunta aleatoria dentro de la categoría correspondiente.

Las opciones se mezclan para evitar patrones repetitivos.

🚀 Cómo usar el proyecto

Clonar el repositorio:

git clone https://github.com/romiigonzalezn29/bariatric-trivia.git

Abrir el archivo index.html en el navegador.

(No requiere instalación de dependencias).

🎯 Objetivo del proyecto

Este proyecto fue desarrollado como herramienta interactiva para un evento de salud, aplicando conceptos de:

Manipulación del DOM

Animaciones con requestAnimationFrame

Cálculo de ángulos en radianes

Gestión de estado del juego

Experiencia de usuario en eventos presenciales

Forma parte de mi crecimiento como desarrolladora frontend, enfocándome en lógica interactiva y diseño centrado en el usuario.

🔮 Posibles mejoras futuras

Temporizador por pregunta

Sistema de ranking
