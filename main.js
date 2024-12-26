console.log("¡Feliz Año 2025!");
document.addEventListener("DOMContentLoaded", () => {
    const text = "✨2025 Es un lienzo en blanco, píntalo con sueños cumplidos y momentos inolvidables ¡Feliz Año Nuevo!🎄";
    const speed = 100; 
    const delayBeforeFade = 2000;
    const fadeDuration = 1000; 
    let i = 0;
  
    const typewriterText = document.getElementById("typewriter-text");
    const typewriterContainer = document.querySelector(".typewriter");
  
    function typeWriter() {
      if (i < text.length) {
        typewriterText.innerHTML += text.charAt(i);
        i++;
        setTimeout(typeWriter, speed);
      } else {
        setTimeout(() => {
          typewriterContainer.style.transition = `opacity ${fadeDuration}ms`;
          typewriterContainer.style.opacity = 0; 
        }, delayBeforeFade);
      }
    }
  
    typeWriter();
  });

  document.addEventListener("DOMContentLoaded", () => {
    const fireworksContainer = document.querySelector(".fireworks-container");

    function createFirework() {
      const firework = document.createElement("div");
      firework.classList.add("firework");
  
      const startX = Math.random() * window.innerWidth;
      const startY = Math.random() * window.innerHeight;
      firework.style.left = `${startX}px`;
      firework.style.bottom = `${startY}px`;
  
      const colors = ['rgba(255, 255, 255, 0)']; 
      firework.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
  
      fireworksContainer.appendChild(firework);

      firework.style.animation = "launch 1s ease-out forwards, explode 1s ease-out forwards";
  
      setTimeout(() => {
        firework.remove();
      }, 2000); 
    }

    setInterval(createFirework, 300); 
  });
  