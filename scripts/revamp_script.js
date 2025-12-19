window.onload = () => {
  const canvas = document.getElementById("bg");
  const ctx = canvas.getContext("2d");
  const main = document.querySelector("main");
  
  const maxScroll = main.scrollHeight - main.clientHeight;
  const maxGridMove = -7;

  let width, height, centerX, centerY, originX, originY;
  let mouse = { x: 0, y: 0, targetX: 0, targetY: 0 };

  window.addEventListener("resize", resize);
  resize();

  window.addEventListener("mousemove", (e) => {
    mouse.targetX = e.clientX;
    mouse.targetY = e.clientY;
  });

  function resize() {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
    centerX = width / 2;
    centerY = height / 2;
  }

  function lerp(a, b, t) {
    return a + (b - a) * t;
  }

  function drawGrid(originX, originY, spacing = 50) {
    ctx.strokeStyle = "rgba(12, 189, 207, 0.1)";
    ctx.lineWidth = 1;

    const cols = Math.ceil(width / spacing) + 2;
    const rows = Math.ceil(height / spacing) + 2;
    const offsetX = originX % spacing;
    const offsetY = originY % spacing;

    for (let i = -1; i < cols; i++) {
      const x = i * spacing - offsetX;
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, height);
      ctx.stroke();
    }

    for (let j = -1; j < rows; j++) {
      const y = j * spacing - offsetY;
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(width, y);
      ctx.stroke();
    }

    ctx.strokeStyle = "rgba(255, 255, 255, 0.2)";
    ctx.lineWidth = 1.2;
    ctx.beginPath();
    ctx.moveTo(originX, 0);
    ctx.lineTo(originX, height);
    ctx.moveTo(0, originY);
    ctx.lineTo(width, originY);
    ctx.stroke();
  }

  const particles = Array.from({ length: 40 }, (_, i) => ({
    r: 70 + i * 7,
    a: Math.random() * Math.PI * 2,
    speed: 0.002 + i * 0.0002,
  }));

  const tilt = Math.PI / 8;
  const cosT = Math.cos(tilt);
  const sinT = Math.sin(tilt);
  const depth = 0.4;
  

  function drawParticles(originX, originY) {
    particles.forEach((p) => {
      p.a += p.speed;

      const lx = Math.cos(p.a) * p.r;
      const ly = Math.sin(p.a) * Math.cos(p.a) * p.r;

      const rx = lx * cosT - ly * sinT;
      let ry = lx * sinT + ly * cosT;

      ry *= depth

      const x = originX + rx;
      const y = originY + ry;

      ctx.beginPath();
      ctx.arc(x, y, 2, 0, Math.PI * 2);
      ctx.fillStyle = "rgba(0,255,240,0.9)";
      ctx.fill();
    });
  }

  function animate() {
    mouse.x = lerp(mouse.x, mouse.targetX, 0.04);
    mouse.y = lerp(mouse.y, mouse.targetY, 0.04);

    originX = lerp(centerX, mouse.x, 0.2);
    originY = lerp(centerY, mouse.y, 0.2);

    ctx.clearRect(0, 0, width, height);

    drawGrid(originX, originY);
    drawParticles(originX, originY);

    requestAnimationFrame(animate);
  }

  animate();


}