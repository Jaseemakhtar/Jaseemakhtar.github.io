window.onload = function() {
	const IMAGE_INDEX = 0,
		  DIV_INDEX = 1;
		  CANVAS_PARTICLES = 0,
		  CANVAS_GAME = 1;

	let requestAnimationFrame,
		requestId,
		canvasParticles,
		canvasGame,
		ctxParticles,
		ctxGame,
		width,
		height,
		dots = [],
		n = 22,
		dist = 260,
		snake,
		tile = 20,
		updatedTime,
		pageIndicators = document.querySelectorAll('.indicator'),
		contactTypes = document.querySelectorAll('.contact-icon');

	let canvasType = CANVAS_PARTICLES;

	pageIndicators[0].addEventListener('click', (evt => {
		toggleCanvas()
		toggleIndicator(canvasType)
	}));

	pageIndicators[1].addEventListener('click', (evt => {
		toggleCanvas()
		toggleIndicator(canvasType)
	}));

	contactTypes[0].addEventListener('click', (e => {
		openHyperLink("https://github.com/Jaseemakhtar")
	}))

	contactTypes[1].addEventListener('click', (e => {
		openHyperLink("https://t.me/Jaseemakhtar")
	}))

	contactTypes[2].addEventListener('click', (e => {
		openHyperLink("https://mail.google.com/mail/?view=cm&fs=1&to=jaseemamaljeri@gmail.com")
	}))

	function openHyperLink(link) {
		window.open(link, '_blank');
	}

	function toggleCanvas() {
		cancelAnimationFrame(requestId)

		if (canvasType == CANVAS_GAME) {
			canvasType = CANVAS_PARTICLES
		} else {
			canvasType = CANVAS_GAME
		}

		canvasGame.classList.toggle('hidden')
		canvasParticles.classList.toggle('hidden')

		draw()
	}

	function toggleIndicator(index) {
		pageIndicators[index].children[IMAGE_INDEX].classList.remove('hidden')
		pageIndicators[index].children[DIV_INDEX].classList.add('glow')

		if (index === 0) {
			pageIndicators[1].children[IMAGE_INDEX].classList.add('hidden')
			pageIndicators[1].children[DIV_INDEX].classList.remove('glow')
		} else {
			pageIndicators[0].children[IMAGE_INDEX].classList.add('hidden')
			pageIndicators[0].children[DIV_INDEX].classList.remove('glow')
		}
	}

	function setupEnvironment() {
		requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame 
		|| window.webkitRequestAnimationFrame || window.msRequestAnimationFrame
		
		canvasParticles = document.getElementById("canvasParticles")
		canvasGame = document.getElementById("canvasGame")

		ctxParticles = canvasParticles.getContext("2d")
		ctxGame = canvasGame.getContext("2d")
	}

	function setupCanvas() {
		width = window.innerWidth
		height = window.innerHeight
		
		canvasParticles.width = width
		canvasParticles.height = height

		canvasGame.width = width
		canvasGame.height = height
		
		snake = new Snake((width / tile) / 2, (height / tile) / 2, ctxGame, tile, width / tile)
		updatedTime = Date.now()

		for (let i = 0; i < n; i++) {
			let offset = 14
			let x = getRandomIntFromInterval(offset, width - offset)
			let y = getRandomIntFromInterval(offset, height - offset)
			let dot = new Dot(x, y, ctxParticles)
			dots.push(dot)
		}
	}

	function draw(){
		if (canvasType == CANVAS_PARTICLES) {
			drawParticles()
		} else {
			drawGame()
		}
	}

	function drawParticles() {
		ctxParticles.clearRect(0,0, width, height)
		for(let i=0; i<dots.length; i++){
			for(let j=0; j<dots.length; j++){
				if (i != j) {
					dots[j].check(dots[i], dist)
				}
			}
			dots[i].show()
			dots[i].update()
		}
		requestId = requestAnimationFrame(drawParticles)
	}

	function drawGame() {
		let currentTime = Date.now()

		if ((currentTime - updatedTime) >= 200) {
			ctxGame.clearRect(0, 0, width, height)
			
			snake.update()
			snake.show()

			let probabilityToTurn = Math.random() > 0.7

			if (probabilityToTurn) {
				snake.move(getRandomIntFromInterval(1, 4))
			}

			updatedTime = currentTime
		}

		requestId = requestAnimationFrame(drawGame)
	}

	if (window.innerWidth < 767) {
		n = 16;	
		dist = 160;
	}

	window.addEventListener('resize', (ev => {
		dots.length = 0
		cancelAnimationFrame(requestId)
		setupCanvas()
		draw()
	}))

	setupEnvironment()
	setupCanvas()
	draw()
}