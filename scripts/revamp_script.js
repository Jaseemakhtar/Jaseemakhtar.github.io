// window.onload = () => {
    // ==== Dynamic Math Grid Background ====
const canvas = document.getElementById("bg");
const ctx = canvas.getContext("2d");

let width, height, centerX, centerY;
let mouse = { x: 0, y: 0, targetX: 0, targetY: 0 };

// Resize canvas dynamically
function resize() {
  width = canvas.width = window.innerWidth;
  height = canvas.height = window.innerHeight;
  centerX = width / 2;
  centerY = height / 2;
}
window.addEventListener("resize", resize);
resize();

// Track mouse movement
window.addEventListener("mousemove", (e) => {
  mouse.targetX = e.clientX;
  mouse.targetY = e.clientY;
});

// Simple lerp (smooth interpolation)
function lerp(a, b, t) {
  return a + (b - a) * t;
}

// Draw grid lines
function drawGrid(originX, originY, spacing = 50) {
  ctx.strokeStyle = "rgba(0, 255, 240, 0.1)";
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

  // Draw central axes
  ctx.strokeStyle = "rgba(255, 255, 255, 0.2)";
  ctx.lineWidth = 1.2;
  ctx.beginPath();
  ctx.moveTo(originX, 0);
  ctx.lineTo(originX, height);
  ctx.moveTo(0, originY);
  ctx.lineTo(width, originY);
  ctx.stroke();
}

// Draw orbiting math points
const particles = Array.from({ length: 20 }, (_, i) => ({
  r: 80 + i * 8,
  a: Math.random() * Math.PI * 2,
  speed: 0.002 + i * 0.0002,
}));

function drawParticles(originX, originY) {
  particles.forEach((p) => {
    p.a += p.speed;
    const x = originX + Math.cos(p.a) * p.r;
    const y = originY + Math.sin(p.a * 1.2) * p.r * 0.5;
    ctx.beginPath();
    ctx.arc(x, y, 2, 0, Math.PI * 2);
    ctx.fillStyle = "rgba(0,255,240,0.8)";
    ctx.fill();
  });
}

// Main animation loop
function animate() {
  // Smooth mouse interpolation
  mouse.x = lerp(mouse.x, mouse.targetX, 0.05);
  mouse.y = lerp(mouse.y, mouse.targetY, 0.05);

  ctx.clearRect(0, 0, width, height);
  const originX = lerp(centerX, mouse.x, 0.2);
  const originY = lerp(centerY, mouse.y, 0.2);

  drawGrid(originX, originY);
  drawParticles(originX, originY);

  requestAnimationFrame(animate);
}

animate();


// }