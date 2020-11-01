class Dot{
	
	constructor(x, y, ctx, innerWidth, innerHeight) {
		this.x = x;
		this.y = y;
		this.ctx = ctx;
		this.innerWidth = innerWidth;
		this.innerHeight = innerHeight
		this.radius = Math.floor(getRandomIntFromInterval(4, 9));
		this.directionX = Math.random() < 0.5 ? -1 : 1;
		this.directionY = Math.random() < 0.5 ? -1 : 1;
		this.xSpeed = getRandomArbitrary(0.1, 0.8) * this.directionX;
		this.ySpeed = getRandomArbitrary(0.1, 0.8) * this.directionY;
		this.alpha = getRandomArbitrary(0.1, 0.4);
	}

	update() {
		this.x += this.xSpeed;
		this.y += this.ySpeed;
		if (this.x < this.radius || this.x > this.innerWidth - this.radius) {
			this.xSpeed = -this.xSpeed;
		}
		if (this.y < this.radius || this.y > this.innerHeight - this.radius) {
			this.ySpeed = -this.xSpeed;
		}
	}

	show() {
		this.ctx.beginPath();
		this.ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
		this.ctx.fillStyle = `rgba(255,255,255,${this.alpha})`;
		this.ctx.fill();
		this.ctx.closePath();
	}

	check(dot, distance) {
		let d = this.dist(this.x, this.y, dot.x, dot.y);
		if (d <= distance) {
			this.ctx.beginPath();
			this.ctx.moveTo(this.x, this.y);
			this.ctx.lineTo(dot.x, dot.y);
			this.ctx.strokeStyle = `rgba(255,255,255,${1 - (d / distance)})`;
			this.ctx.stroke();
			this.ctx.closePath();
		}
	}

	dist(x1, y1, x2, y2){
		let a = Math.abs(x1 - x2);
		let b = Math.abs(y1 - y2);
		return Math.sqrt(a * a + b * b);
	}
}