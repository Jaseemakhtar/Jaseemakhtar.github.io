console.log("Connected");
var requestAnimationFrame;
var canvas;
var ctx;
var width;
var height;

var dots = [];
var n = 20;
var dist = 200;

var button = document.querySelector(".button");
var titleSection = document.querySelector(".section_title");
var detailSection = document.querySelector(".other_details");

var btnEdu = document.querySelector("#btn_edu");
var btnSkills = document.querySelector("#btn_skills");
var btnExp = document.querySelector("#btn_exp");
var btnProj = document.querySelector("#btn_proj");

btnEdu.addEventListener('click',function(){
	ajaxCall("./links/education.html");
})

btnSkills.addEventListener('click',function(){
	ajaxCall("./links/skills.html");
})

btnExp.addEventListener('click',function(){
	ajaxCall("./links/experience.html");
})

btnProj.addEventListener('click',function(){
	ajaxCall("./links/projects.html");
})

button.addEventListener('click',function(){
	ajaxCall("./links/education.html");
});


function ajaxCall(url){
	var request;
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
		var response = request.responseText;
		var parser = new DOMParser();
		var doc = parser.parseFromString(response,"text/html");
		var sec1 = doc.getElementById("section_1");
		var sec2 = doc.getElementById("section_2");

		document.getElementById("section_1").remove();
		document.getElementById("section_2").remove();

		detailSection.append(sec1);
		detailSection.append(sec2);

	}
}
request.send();
}

if (window.innerWidth < 500) {
	n = 9;	
	dist = 130;
}


setup();
draw();


function setup(){
	requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame 
	|| window.webkitRequestAnimationFrame || window.msRequestAnimationFrame;
	canvas = document.getElementById("myCanvas");
	ctx = canvas.getContext("2d");
	width = window.innerWidth;
	height = window.innerHeight;
	canvas.width = width;
	canvas.height = height;
	
	for(var i = 0; i < n; i++){
		var x = (Math.random() * (width - 8)) + 8;
		var y = (Math.random() * (height - 8)) + 8;
		var dot = new Dot(x, y, ctx);
		dots.push(dot);
	}
}

function draw(){
		ctx.clearRect(0,0, width, height);
		for(var i=0; i<dots.length; i++){
			for(var j=0; j<dots.length; j++){
				if (i != j) {
					dots[j].check(dots[i], dist);
				}
			}
			dots[i].show();
			dots[i].update();
		}
	requestAnimationFrame(draw);
}

