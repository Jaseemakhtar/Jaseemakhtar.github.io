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

button.addEventListener('click',function(){
	console.log("Clicked");
});

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

