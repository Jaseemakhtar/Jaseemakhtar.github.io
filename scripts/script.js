window.onload = function() {
	let requestAnimationFrame,
		canvas,
		ctx,
		width,
		height,
		dots = [],
		n = 22,
		dist = 320,
		open = false;
	// 	lis = document.querySelectorAll("nav > ul > li"),
	// 	menu = document.querySelector("ul"), 
	// 	hamburger = document.querySelector("img"),
	// 	btnContactMe = document.querySelector('#contactme'),
	// 	btnHome = document.querySelector('#btnHome'),
	// 	btnContact = document.querySelector('#btnContact'),
	// 	btnEducation = document.querySelector('#btnEducation'),
	// 	btnProjects = document.querySelector('#btnProjects'),
	// 	btnSkills = document.querySelector('#btnSkills'),
	// 	mainMenu = document.querySelector('main');

	// let count = -1, current;

	// btnContactMe.addEventListener('click',function(e){
	// 	current = 4;
	// 	setClicked();
	// 	ajaxCall("./links/contact.html");
	// });

	// btnHome.addEventListener('click',function(e){
	// 	current = 0;
	// 	setClicked();
	// 	ajaxCall("./links/home.html");
	// });
	// btnContact.addEventListener('click',function(e){
	// 	current = 4;
	// 	setClicked();
	// 	ajaxCall("./links/contact.html");
	// });
	// btnEducation.addEventListener('click',function(e){
	// 	current = 1;
	// 	setClicked();
	// 	ajaxCall("./links/education.html");
	// });
	// btnProjects.addEventListener('click',function(e){
	// 	current = 3;
	// 	setClicked();
	// 	ajaxCall("./links/projects.html");
	// });
	// btnSkills.addEventListener('click',function(e){
	// 	current = 2;
	// 	setClicked();
	// 	ajaxCall("./links/skills.html");
	// });

	function setClicked(){
		for(let i=0; i < lis.length; i++){
			count++;
			if(lis[i].classList.contains("clicked")){
				lis[i].classList.remove("clicked");
			}
			if(count == current){
				lis[i].classList.add("clicked");
			}
		}
		count = -1;
	}

	// hamburger.addEventListener('click',function(e){
	// 	if(open){
	// 		closeMenu();
	// 	}else{
	// 		openMenu();
	// 	}
	// 	e.preventDefault();
	// });

	function openMenu(){
		menu.style.display = "block";
		menu.classList.toggle('active');
		hamburger.src = "./assets/baseline-close-24px.svg";
		open = true;
	}

	function closeMenu(){
		menu.style.display = "none";
		menu.classList.toggle('active');
		hamburger.src = "./assets/baseline-menu-24px.svg";
		open = false;
	}

	function ajaxCall(url){
		let request;
		if (window.XMLHttpRequest) {
			// code for modern browsers
			request = new XMLHttpRequest();
		} else {
			// code for old IE browsers
			request = new ActiveXObject("Microsoft.XMLHTTP");
		} 
								
		request.open('GET',url);
		request.onreadystatechange = function(){
			if (this.readyState == 4 && this.status == 200) {                                 
				let response = request.responseText;
				let parser = new DOMParser();
				let doc = parser.parseFromString(response,"text/html");
				
				while (mainMenu.hasChildNodes()) {
					mainMenu.removeChild(mainMenu.lastChild);
				}

				if (doc.querySelector('#contactme')) {
					doc.querySelector('#contactme').addEventListener('click', function(e) {
						current = 4;
						setClicked();
						ajaxCall("./links/contact.html");
					});
				}
				mainMenu.appendChild(doc.querySelector('section'));
			}
			if (window.innerWidth < 767){
				if (menu.classList.contains("active")) {
					closeMenu();
				}
			}
			
		}
		request.send();
	}

	function setup() {
		requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame 
		|| window.webkitRequestAnimationFrame || window.msRequestAnimationFrame;
		canvas = document.getElementById("canvasDNA");
		ctx = canvas.getContext("2d");
		width = window.innerWidth;
		height = window.innerHeight;
		
		canvas.width = width;
		canvas.height = height;
		
		for (let i = 0; i < n; i++) {
			let offset = 14;
			let x = getRandomIntFromInterval(offset, width - offset);
			let y = getRandomIntFromInterval(offset, height - offset);
			let dot = new Dot(x, y, ctx);
			dots.push(dot);
		}
	}

	function draw(){
			ctx.clearRect(0,0, width, height);
			for(let i=0; i<dots.length; i++){
				for(let j=0; j<dots.length; j++){
					if (i != j) {
						dots[j].check(dots[i], dist);
					}
				}
				dots[i].show();
				dots[i].update();
			}
		requestAnimationFrame(draw);
	}

	if (window.innerWidth < 767) {
		n = 18;	
		dist = 130;
	}

	setup();
	draw();
}