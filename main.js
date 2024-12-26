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

  var c = document.getElementById("canvas");
  var ctx = c.getContext("2d");
  
  var cwidth, cheight;
  var shells = [];
  var pass = [];
  var colors = ['#FF5252', '#FF4081', '#E040FB', '#7C4DFF', '#536DFE', '#448AFF', '#40C4FF', '#18FFFF', '#64FFDA', '#69F0AE', '#B2FF59', '#EEFF41', '#FFFF00', '#FFD740', '#FFAB40', '#FF6E40'];
  var backgroundImage = new Image();
  backgroundImage.src = 'fondo.jpg'; // Ruta a tu imagen de fondo
  
  window.onresize = function() { reset(); }
  reset();
  
  function reset() {
    cwidth = window.innerWidth;
    cheight = window.innerHeight;
    c.width = cwidth;
    c.height = cheight;
  }
  
  function newShell() {
    var left = (Math.random() > 0.5);
    var shell = {};
    shell.x = (1 * left);
    shell.y = 1;
    shell.xoff = (0.01 + Math.random() * 0.007) * (left ? 1 : -1);
    shell.yoff = 0.01 + Math.random() * 0.007;
    
    // Aumentamos el tamaño de la cáscara para hacer el estallido más grande
    shell.size = Math.random() * 10 + 10;  // Ahora el tamaño será entre 10 y 25
  
    shell.color = colors[Math.floor(Math.random() * colors.length)];
  
    shells.push(shell);
  }
  
  function newPass(shell) {
    var pasCount = Math.ceil(Math.pow(shell.size, 2) * Math.PI);
  
    for (i = 0; i < pasCount; i++) {
      var pas = {};
      pas.x = shell.x * cwidth;
      pas.y = shell.y * cheight;
  
      var a = Math.random() * 4;
      var s = Math.random() * 15;  // Hacemos que la velocidad sea mayor
  
      pas.xoff = s * Math.sin((5 - a) * (Math.PI / 2));
      pas.yoff = s * Math.sin(a * (Math.PI / 2));
  
      pas.color = shell.color;
      pas.size = Math.sqrt(shell.size);  // El tamaño de la partícula depende del tamaño de la cáscara
  
      if (pass.length < 1000) { pass.push(pas); }
    }
  }
  
  var lastRun = 0;
  Run();
  
  function Run() {
    var dt = 1;
    if (lastRun != 0) { dt = Math.min(50, (performance.now() - lastRun)); }
    lastRun = performance.now();
  
    // Dibujar la imagen de fondo (escalada para cubrir toda la pantalla)
    ctx.drawImage(backgroundImage, 0, 0, cwidth, cheight);
  
    if ((shells.length < 10) && (Math.random() > 0.96)) { newShell(); }
  
    for (let ix in shells) {
      var shell = shells[ix];
  
      ctx.beginPath();
      ctx.arc(shell.x * cwidth, shell.y * cheight, shell.size, 0, 2 * Math.PI);
      ctx.fillStyle = shell.color;
      ctx.fill();
  
      shell.x -= shell.xoff;
      shell.y -= shell.yoff;
      shell.xoff -= (shell.xoff * dt * 0.001);
      shell.yoff -= ((shell.yoff + 0.2) * dt * 0.00005);
  
      if (shell.yoff < -0.005) {
        newPass(shell);
        shells.splice(ix, 1);
      }
    }
  
    for (let ix in pass) {
      var pas = pass[ix];
  
      // Ajustamos la opacidad basándonos en el tamaño
      var opacity = pas.size / 10;  // Hace que la opacidad disminuya según el tamaño
      if (opacity < 0) opacity = 0;  // Aseguramos que la opacidad no sea negativa
  
      ctx.globalAlpha = opacity;  // Aplicamos la opacidad
  
      ctx.beginPath();
      ctx.arc(pas.x, pas.y, pas.size, 0, 2 * Math.PI);
      ctx.fillStyle = pas.color;  // Usamos el color original
      ctx.fill();
  
      pas.x -= pas.xoff;
      pas.y -= pas.yoff;
      pas.xoff -= (pas.xoff * dt * 0.001);
      pas.yoff -= ((pas.yoff + 5) * dt * 0.0005);
  
      // Reducimos el tamaño
      pas.size -= (dt * 0.01 * Math.random());  // Hacemos que el fuego se desvanezca más rápido
  
      if (pas.size <= 0) {
          pass.splice(ix, 1);  // Eliminar el fuego cuando se desvanecen completamente
      }
    }
  
    ctx.globalAlpha = 1;  // Restaurar la opacidad global después de dibujar
  
    requestAnimationFrame(Run);
  }
  