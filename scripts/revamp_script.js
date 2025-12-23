window.onload = () => {
  const canvas = document.getElementById("bg");
  const ctx = canvas.getContext("2d");

  const particlesLength = (window.innerWidth < 768) ? 20 : 40

  let centerX, centerY, originX, originY;
  let mouse = { x: 0, y: 0, targetX: 0, targetY: 0 };
  let dpr = 1;

  window.addEventListener("resize", resize);
  resize();

  window.addEventListener("mousemove", (e) => {
    mouse.targetX = e.clientX;
    mouse.targetY = e.clientY;
  });

  function clearCanvas() {
    ctx.save();
    ctx.setTransform(1, 0, 0, 1, 0, 0);
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.restore();
  }

  function resize() {
    const rect = canvas.getBoundingClientRect();

    dpr = window.devicePixelRatio || 1;

    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;

    canvas.style.width = rect.width + "px";
    canvas.style.height = rect.height + "px";

    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

    centerX = rect.width / 2;
    centerY = rect.height / 2;
  }

  function lerp(a, b, t) {
    return a + (b - a) * t;
  }

  function drawGrid(originX, originY, spacing = 50) {
    ctx.strokeStyle = "rgba(12, 189, 207, 0.1)";
    ctx.lineWidth = 1;

    const w = canvas.width / dpr;
    const h = canvas.height / dpr;

    const cols = Math.ceil(w / spacing) + 2;
    const rows = Math.ceil(h / spacing) + 2;

    const offsetX = originX % spacing;
    const offsetY = originY % spacing;

    for (let i = -1; i < cols; i++) {
      const x = i * spacing - offsetX;
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, h);
      ctx.stroke();
    }

    for (let j = -1; j < rows; j++) {
      const y = j * spacing - offsetY;
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(w, y);
      ctx.stroke();
    }

    ctx.strokeStyle = "rgba(255, 255, 255, 0.2)";
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(originX, 0);
    ctx.lineTo(originX, h);
    ctx.moveTo(0, originY);
    ctx.lineTo(w, originY);
    ctx.stroke();
  }

  const particles = Array.from({ length: particlesLength }, (_, i) => ({
    r: 70 + i * 7,
    a: Math.random() * Math.PI * 2,
    speed: 0.002 + i * 0.0002,
  }));

  const tilt = Math.PI / 8;
  const cosT = Math.cos(tilt);
  const sinT = Math.sin(tilt);
  const depth = 0.4;

  function drawParticles(originX, originY) {
    for (let i = 0; i < particlesLength; i++) {
      let p = particles[i]

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
    }
  }

  function animate() {
    mouse.x = lerp(mouse.x, mouse.targetX, 0.06);
    mouse.y = lerp(mouse.y, mouse.targetY, 0.06);

    originX = lerp(centerX, mouse.x, 0.4);
    originY = lerp(centerY, mouse.y, 0.4);

    clearCanvas()

    drawGrid(originX, originY);
    drawParticles(originX, originY);

    requestAnimationFrame(animate);
  }

  animate();


}