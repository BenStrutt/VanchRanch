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

// Create a new image element 
const img = document.createElement('img'); 
 
// Set the source and other attributes 
img.src = './bakh.png'; // Specify the path to your image 
img.alt = 'Description of the image'; // Alt text for accessibility 
img.width = 300; // Optional: set width 
img.height = 200; // Optional: set height

img.addEventListener("load", () => {
	context.drawImage(img, 0, 0);
});