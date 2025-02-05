"use strict";

const canvas = document.createElement("canvas");
const context = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
canvas.style.backgroundColor = "#fff5db";
context.imageSmoothingEnabled = true;

document.body.appendChild(canvas);
document.body.style.overflow = "hidden";

context.strokeStyle = "blue";
context.strokeRect(100, 100, 100, 100);

const img = document.createElement('img'); 
img.src = './bakh.png'; // Specify the path to your image 
// img.alt = 'Description of the image'; // Alt text for accessibility 
// img.width = 300; // Optional: set width 
// img.height = 200; // Optional: set height

// img.addEventListener("load", () => {
// 	context.drawImage(img, 0, 0);
// });

const vid = document.createElement("video");
vid.src = './punch.mp4'
vid.loop = true;
vid.addEventListener('canplaythrough', function() {
	console.log("can play through");
});

// context.rotate(90 * Math.PI / 180);

let count = 0;
document.addEventListener("mousedown", () => {
	count++
	console.log(`count: ${count}`);
	if (count === 3) {
		context.translate(300, 500);
		context.rotate(Math.PI * 1.5);
		// ctx.translate(-150, -75);
		vid.play();  // start playing
		update(); //Start rendering
	}
});

function update() {
	console.log("drawing video");
	context.drawImage(
	  vid,
	  0,
	  0
	);
	requestAnimationFrame(update);
}