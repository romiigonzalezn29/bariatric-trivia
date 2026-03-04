document.addEventListener('DOMContentLoaded', function() {
    // Elementos del DOM
    const canvas = document.getElementById('wheelCanvas');
    const ctx = canvas.getContext('2d');
    const spinBtn = document.getElementById('spinBtn');
    const centerSpinBtn = document.getElementById('centerSpinBtn');
    const resetBtn = document.getElementById('resetBtn');
    const pointsDisplay = document.getElementById('points');
    const questionModal = document.getElementById('questionModal');
    const questionTitle = document.getElementById('questionTitle');
    const optionsContainer = document.getElementById('optionsContainer');
    const congratsModal = document.getElementById('congratsModal');
    const closeCongratsBtn = document.getElementById('closeCongratsBtn');
    const spinWheelSound = new Audio('assets/spin-wheel.mov');
    const correctAnswerSound = new Audio('assets/correct-answer.mp3');
    const wrongAnswerSound = new Audio('assets/wrong-answer.mp3');
    
    // Configuración de la ruleta
    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;
    const radius = Math.min(centerX, centerY) - 20;
    let currentRotation = 0;
    let isSpinning = false;
    let points = 0;
    let currentQuestion = null;
    
    // Sectores de la ruleta y sus preguntas
const sectors = [
    { 
        text: "Complicaciones y efectos secundarios", 
        color: "#00b290", 
        icon: "assets/complicaciones.png",
        questions: [
            {
                text: "¿Cuál de estas personas requiere mayor monitoreo del calcio y vitamina D?",
                options: [
                    { text: "Persona con bypass gástrico", correct: true },
                    { text: "Persona con banda gástrica", correct: false },
                    { text: "Persona con balón intragástrico", correct: false },
                    { text: "Persona con manga gástrica sin síntomas", correct: false }
                ]
            },
            {
                text: "Una persona bariátrica come un postre muy azucarado y poco después experimenta mareos, sudoración y taquicardia. ¿Qué le está ocurriendo?",
                options: [
                    { text: "Síndrome de Dumping", correct: true },
                    { text: "Hipoglucemia reactiva", correct: false },
                    { text: "Alergia alimentaria", correct: false },
                    { text: "Intoxicación por alimentos", correct: false }
                ]
            }
        ]
    },
    { 
        text: "Alimentación postcirugía", 
        color: "#c5d64a", 
        icon: "./assets/alimentacion.png",
        questions: [
            {
                text: "¿Cuál es la recomendación de ingesta diaria de agua después de una cirugía bariátrica?",
                options: [
                    { text: "1-1.5 litros", correct: false },
                    { text: "1.5-2 litros", correct: false },
                    { text: "2-2.5 litros", correct: true },
                    { text: "Solo cuando se tenga sed", correct: false }
                ]
            },
            {
                text: "¿Cuál es la mejor opción de alimento para esta etapa? (Primera semana postcirugía)",
                options: [
                    { text: "Batido de proteínas sin azúcar", correct: true },
                    { text: "Jugo de naranja", correct: false },
                    { text: "Sopa con trozos de pollo", correct: false },
                    { text: "Galletas integrales", correct: false }
                ]
            },
            {
                text: "Después de varias semanas, ¿cuál es la mejor opción para iniciar la fase de alimentos sólidos?",
                options: [
                    { text: "Pan blanco", correct: false },
                    { text: "Carne de res asada", correct: false },
                    { text: "Pechuga de pollo desmenuzada", correct: true },
                    { text: "Frutas enteras con cáscara", correct: false }
                ]
            }
        ]
    },
    { 
        text: "Suplementación", 
        color: "#f59645", 
        icon: "assets/suplementacion.png",
        questions: [
            {
                text: "¿Cuál de estas personas requiere mayor monitoreo del calcio y vitamina D?",
                options: [
                    { text: "Persona con bypass gástrico", correct: true },
                    { text: "Persona con banda gástrica", correct: false },
                    { text: "Persona con balón intragástrico", correct: false },
                    { text: "Persona con manga gástrica sin síntomas", correct: false }
                ]
            },
            {
                text: "¿Por qué las personas con bypass gástrico requieren mayor vigilancia de los niveles de vitamina B12?",
                options: [
                    { text: "Porque se reduce el ácido gástrico y el factor intrínseco, necesarios para su absorción", correct: true },
                    { text: "Porque la cirugía elimina completamente la vitamina B12 del cuerpo", correct: false },
                    { text: "Porque la vitamina B12 produce aumento de peso", correct: false },
                    { text: "Porque causa estreñimiento severo", correct: false }
                ]
            },
            {
                text: "Respecto a una mujer embarazada con antecedente de bypass gástrico, ¿cuál es el principal riesgo si no recibe un suplemento prenatal adecuado?",
                options: [
                    { text: "Aumento de peso excesivo durante el embarazo", correct: false },
                    { text: "Mayor riesgo de intolerancia a los lácteos", correct: false },
                    { text: "Déficit de micronutrientes esenciales que afectan al desarrollo fetal", correct: true },
                    { text: "Riesgo exclusivo de anemia sin otras complicaciones", correct: false }
                ]
            }
        ]
    },
    { 
        text: "Hidratación y digestión", 
        color: "#6b95ce", 
        icon: "assets/hidratacion.png",
        questions: [
            {
                text: "¿Cuál de estas personas requiere mayor monitoreo del calcio y vitamina D?",
                options: [
                    { text: "Persona con bypass gástrico", correct: true },
                    { text: "Persona con banda gástrica", correct: false },
                    { text: "Persona con balón intragástrico", correct: false },
                    { text: "Persona con manga gástrica sin síntomas", correct: false }
                ]
            },
            {
                text: "¿Cuándo se recomienda beber agua después de comer?",
                options: [
                    { text: "30 minutos después", correct: true },
                    { text: "Inmediatamente", correct: false },
                    { text: "Solo antes de la comida", correct: false },
                    { text: "No importa, se puede tomar en cualquier momento", correct: false }
                ]
            }
        ]
    },
    { 
        text: "Cambios fisiológicos y salud general", 
        color: "#e5b018", 
        icon: "assets/cambios.png",
        questions: [
            {
                text: "¿Cuál de estas personas requiere mayor monitoreo del calcio y vitamina D?",
                options: [
                    { text: "Persona con bypass gástrico", correct: true },
                    { text: "Persona con banda gástrica", correct: false },
                    { text: "Persona con balón intragástrico", correct: false },
                    { text: "Persona con manga gástrica sin síntomas", correct: false }
                ]
            },
            {
                text: "Verdadero o Falso: Después de una gastrectomía en manga, el riesgo de deficiencia de calcio y vitamina D es menor que en un bypass gástrico.",
                options: [
                    { text: "VERDADERO", correct: true },
                    { text: "FALSO", correct: false }
                ]
            }
        ]
    },
    { 
        text: "Hábitos y adherencias", 
        color: "#f37761", 
        icon: "assets/habitos.png",
        questions: [
            {
                text: "¿Cuál de estas personas requiere mayor monitoreo del calcio y vitamina D?",
                options: [
                    { text: "Persona con bypass gástrico", correct: true },
                    { text: "Persona con banda gástrica", correct: false },
                    { text: "Persona con balón intragástrico", correct: false },
                    { text: "Persona con manga gástrica sin síntomas", correct: false }
                ]
            },
            {
                text: "Un año después de la cirugía, ¿qué hábito es clave para mantener el éxito en la pérdida de peso y la salud?",
                options: [
                    { text: "Dejar de tomar suplementos si ya se siente bien", correct: false },
                    { text: "Comer lo que quiera en pequeñas cantidades", correct: false },
                    { text: "Continuar con suplementación y alimentación equilibrada", correct: true },
                    { text: "Evitar hacer ejercicio para no perder más peso", correct: false }
                ]
            }
        ]
    },
    { 
        text: "Apoyo psicológico y recuperación", 
        color: "#adb1c0", 
        icon: "assets/apoyo.png",
        questions: [
            {
                text: "¿Cuál de estas personas requiere mayor monitoreo del calcio y vitamina D?",
                options: [
                    { text: "Persona con bypass gástrico", correct: true },
                    { text: "Persona con banda gástrica", correct: false },
                    { text: "Persona con balón intragástrico", correct: false },
                    { text: "Persona con manga gástrica sin síntomas", correct: false }
                ]
            },
            {
                text: "¿Qué papel cumple la atención psicológica en la adherencia al tratamiento bariátrico?",
                options: [
                    { text: "Ayuda a prevenir recaídas en patrones alimentarios disfuncionales", correct: true },
                    { text: "Mejora la imagen corporal y la motivación", correct: false },
                    { text: "Detecta trastornos mentales que interfieren en el autocuidado", correct: false },
                    { text: "Solo es útil en personas con depresión diagnosticada", correct: false }
                ]
            }
        ]
    }
];
    
    // Precargar imágenes
    const icons = {};
    let loadedIcons = 0;
    
    function loadIcons() {
        sectors.forEach((sector, index) => {
            const img = new Image();
            img.src = sector.icon;
            img.onload = () => {
                loadedIcons++;
                icons[index] = img;
                if (loadedIcons === sectors.length) {
                    drawWheel();
                }
            };
            img.onerror = () => {
                console.error("Error al cargar el icono:", sector.icon);
                loadedIcons++;
                if (loadedIcons === sectors.length) {
                    drawWheel();
                }
            };
        });
    }
    
    // Dibujar la ruleta
    function drawWheel(rotation = 0) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        const sectorAngle = (2 * Math.PI) / sectors.length;
        
        // Dibujar sectores
        sectors.forEach((sector, index) => {
            const startAngle = index * sectorAngle + rotation;
            const endAngle = (index + 1) * sectorAngle + rotation;
            
            // Dibujar sector
            ctx.beginPath();
            ctx.moveTo(centerX, centerY);
            ctx.arc(centerX, centerY, radius, startAngle, endAngle);
            ctx.closePath();
            ctx.fillStyle = sector.color;
            ctx.fill();
            
            // Dibujar borde
            ctx.strokeStyle = '#fff';
            ctx.lineWidth = 2;
            ctx.stroke();
            
            // Ángulo medio del sector
            const middleAngle = startAngle + sectorAngle / 2;
            
            // Posicionar texto
            const textRadius = radius * 0.85;
            const textX = centerX + Math.cos(middleAngle) * textRadius;
            const textY = centerY + Math.sin(middleAngle) * textRadius;
            
            // Dibujar texto (siempre legible)
            ctx.save();
            ctx.translate(textX, textY);
            ctx.rotate(middleAngle + Math.PI/2);
            
            ctx.textAlign = 'center';
            ctx.fillStyle = 'black';
            ctx.font = "50px 'Montserrat', sans-serif";
            
            //ctx.shadowColor = 'rgba(0, 0, 0, 0.5)';
            ctx.shadowOffsetX = 1;
            ctx.shadowOffsetY = 1;
            
            // Dividir texto en líneas si es necesario
            const words = sector.text.split(' ');
            let lines = [''];
            words.forEach(word => {
                const testLine = lines[lines.length - 1] + ' ' + word;
                const metrics = ctx.measureText(testLine);
                if (metrics.width < 80) {
                    lines[lines.length - 1] = testLine;
                } else {
                    lines.push(word);
                }
            });
            
            // Dibujar líneas de texto
            lines.forEach((line, i) => {
                ctx.fillText(line.trim(), 0, i * 50 - (lines.length - 1) * 7.5);
            });
            
            ctx.restore();
            
            // Posicionar icono
            const iconRadius = radius * 0.4;
            const iconX = centerX + Math.cos(middleAngle) * iconRadius;
            const iconY = centerY + Math.sin(middleAngle) * iconRadius;
            const iconSize = 120;
            
            ctx.save();
            ctx.translate(iconX, iconY);
            ctx.rotate(middleAngle + Math.PI/2);
            
            // Dibujar icono
            if (icons[index] && icons[index].complete) {
                ctx.drawImage(icons[index], -iconSize/2, -iconSize/2 - 15, iconSize, iconSize);
            }
            
            ctx.restore();
        });
        
        // Dibujar centro
        ctx.beginPath();
        ctx.arc(centerX, centerY, 20, 0, 2 * Math.PI);
        ctx.fillStyle = '#fff';
        ctx.fill();
        ctx.strokeStyle = '#ddd';
        ctx.lineWidth = 2;
        ctx.stroke();
    }
    
    // Girar la ruleta
    function spinWheel() {
        if (isSpinning) return;
        
        isSpinning = true;
        spinBtn.disabled = true;
        centerSpinBtn.disabled = true;
        spinWheelSound.play();
        
        const spinDuration = 3000;
        const startTime = Date.now();
        const startRotation = currentRotation;
        const spinDegrees = 1440 + Math.floor(Math.random() * 360);
        const endRotation = startRotation + spinDegrees * (Math.PI / 180);
        
        function animate() {
            const elapsed = Date.now() - startTime;
            const progress = Math.min(elapsed / spinDuration, 1);
            const easeProgress = 1 - Math.pow(1 - progress, 3);
            
            currentRotation = startRotation + (endRotation - startRotation) * easeProgress;
            drawWheel(currentRotation);
            
            if (progress < 1) {
                requestAnimationFrame(animate);
            } else {
                isSpinning = false;
                spinBtn.disabled = false;
                centerSpinBtn.disabled = false;
                showSelectedSector();
            }
        }
        
        animate();
    }
    
    // Mostrar pregunta del sector seleccionado
    function showSelectedSector() {
        const normalizedRotation = (currentRotation % (2 * Math.PI) + 2 * Math.PI) % (2 * Math.PI);
        const sectorAngle = (2 * Math.PI) / sectors.length;
        const sectorIndex = Math.floor(((2 * Math.PI - normalizedRotation) + sectorAngle/2) / sectorAngle) % sectors.length;
        
        // Seleccionar una pregunta aleatoria del sector
        const sector = sectors[sectorIndex];
        const questions = sector.questions;
        const randomQuestionIndex = Math.floor(Math.random() * questions.length);
        currentQuestion = {
            text: questions[randomQuestionIndex].text,
            options: questions[randomQuestionIndex].options
        };
        
        showQuestion();
    }
    // Mostrar la pregunta y opciones
        function showQuestion() {
        // Asegúrate que currentQuestion tiene la estructura correcta
        if (!currentQuestion || !currentQuestion.text || !currentQuestion.options) {
            console.error("La pregunta no tiene la estructura correcta:", currentQuestion);
            return;
        }
        
        questionTitle.textContent = currentQuestion.text; // Cambiado de .question a .text
        optionsContainer.innerHTML = '';
        
        // Mezclar opciones para que no siempre estén en el mismo orden
        const shuffledOptions = [...currentQuestion.options].sort(() => Math.random() - 0.5);
        
        shuffledOptions.forEach(option => {
            const optionElement = document.createElement('div');
            optionElement.className = 'option';
            optionElement.textContent = option.text;
            optionElement.dataset.correct = option.correct;
            
            optionElement.addEventListener('click', function() {
                checkAnswer(option.correct, optionElement);
            });
            
            optionsContainer.appendChild(optionElement);
        });
        
        questionModal.style.display = 'flex';
    }
    
    // Verificar respuesta seleccionada
    function checkAnswer(isCorrect, selectedOption) {
        // Deshabilitar todas las opciones
        const options = document.querySelectorAll('.option');
        options.forEach(option => {
            option.style.pointerEvents = 'none';
            if (option.dataset.correct === 'true') {
                option.classList.add('correct');
            }
        });
        
        // Resaltar selección del usuario
        if (isCorrect) {
            selectedOption.classList.add('correct');
            correctAnswerSound.play();
            points += 10;
            pointsDisplay.textContent = points;
        } else {
            selectedOption.classList.add('incorrect');
            wrongAnswerSound.play();
        }

        // Ocultar pregunta después de mostrar los resultados
        // setTimeout(() => {
        //     questionModal.style.display = 'none';
        // }, 1500);
    }
    
    // Configurar eventos
    function setupEventListeners() {
        spinBtn.addEventListener('click', spinWheel);
        centerSpinBtn.addEventListener('click', spinWheel);
        
        resetBtn.addEventListener('click', function() {
            currentRotation = 0;
            points = 0;
            pointsDisplay.textContent = points;
            drawWheel();
        });
        
        // closeCongratsBtn.addEventListener('click', function() {
        //     congratsModal.style.display = 'none';
        // });
        
        canvas.addEventListener('touchstart', function(e) {
            if (!isSpinning) {
                spinWheel();
            }
            e.preventDefault();
        });
        
        // Cerrar modales al hacer clic fuera del contenido
        [questionModal, congratsModal].forEach(modal => {
            modal.addEventListener('click', function(e) {
                if (e.target === modal) {
                    modal.style.display = 'none';
                }
            });
        });
    }
    
    // Inicializar
    function init() {
        loadIcons();
        setupEventListeners();
        pointsDisplay.textContent = points;
    }
    
    init();
});