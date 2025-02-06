"use strict";

const canvas = document.createElement("canvas");
const context = canvas.getContext("2d");

const positions = {
	button: { x: 0, y: 0, w: 0, h: 0 },
	media: { x: 0, y: 0, w: 0, h: 0 },
};

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
canvas.style.backgroundColor = "#fff5db";
context.imageSmoothingEnabled = true;

document.body.appendChild(canvas);
document.body.style.overflow = "hidden";

window.onresize = resize;

const mediaList = [
	{ name: "bulldogs", ext: "jpg" },
	{ name: "cig", ext: "jpg" },
	{ name: "jorts", ext: "jpg", rotate: "left" },
	{ name: "pirate", ext: "jpg", rotate: "left" },
	{ name: "punch", ext: "jpg", rotate: "left" },
	{ name: "punch", ext: "mp4", rotate: "left" },
	{ name: "kitchendance", ext: "mp4" },
	{ name: "pinghole", ext: "mp4", rotate: "left" },
	{ name: "pelicanjump", ext: "mp4", rotate: "left" },
	{ name: "unicornangry", ext: "mp4", rotate: "left" },
	{ name: "turtleskiss", ext: "mp4" },
	{ name: "slipslide", ext: "mp4" },
	{ name: "bottlethief", ext: "mp4" },
	{ name: "marathonfinish", ext: "mp4" },
	{ name: "inflatehand", ext: "mp4" },
	{ name: "shirtsoff", ext: "mp4" },
	{ name: "rainingmen", ext: "mp4" },
	{ name: "mybestlife", ext: "mp4" },
	{ name: "walkplank", ext: "mp4", rotate: "left" },
	{ name: "arghhhhhh", ext: "mp4", rotate: "left" },
	{ name: "eyepatchcreep", ext: "mp4", rotate: "left" },
	{ name: "gameover", ext: "mp4" },
	{ name: "litfireworks", ext: "mp4", rotate: "left" },
	{ name: "daynnite", ext: "mp4" },
	{ name: "sleepcampingvance", ext: "mp4" },
	{ name: "bucketofice", ext: "mp4" },
	{ name: "dublinsleep", ext: "mp4" },
	{ name: "ormskirkmess", ext: "mp4" },
	{ name: "fistpump", ext: "mp4" },
	{ name: "showershot", ext: "mp4" },
	{ name: "bdaykayak", ext: "mp4", rotate: "left" },
	{ name: "bikeridehype", ext: "mp4" },
	{ name: "sandwhichshlong", ext: "mp4" },
	{ name: "tablebeat", ext: "mp4", rotate: "left" },
	{ name: "inflatewakeup", ext: "mp4" },
	{ name: "pigwin", ext: "mp4", rotate: "left" },
	{ name: "pattysfight", ext: "mp4", rotate: "left" },

	// { name: "punch", ext: "mp4", rotate: "left" },
	// { name: "punch", ext: "mp4", rotate: "left" },
	// { name: "punch", ext: "mp4", rotate: "left" },
	// { name: "punch", ext: "mp4", rotate: "left" },
	// { name: "punch", ext: "mp4", rotate: "left" },
	// { name: "punch", ext: "mp4", rotate: "left" },
];

let currentMedia;
let loading = false;

document.addEventListener("mousedown", (ev) => {
	if (!isNext(ev)) { return; }
	if (mediaList.length === 0) { return; }
	
	const idx = Math.floor(Math.random() * mediaList.length);
	currentMedia = mediaList[idx];
	mediaList.splice(idx, 1);

	let element = img;
	if (currentMedia.ext === "mp4") { element = vid; }
	element.src = `./${currentMedia.name}.${currentMedia.ext}`;
	loading = true;
});

const img = document.createElement('img');
img.addEventListener("load", drawImg);
const vid = document.createElement("video");
vid.addEventListener("canplaythrough", drawVideo);
vid.loop = true;

function drawImg() {
	loading = false;

	vid.pause();

	resize();
}

function drawVideo() {
	loading = false;

	vid.play();

	resize();
}

function update() {
	context.resetTransform();
	context.clearRect(0, 0, canvas.width, canvas.height);

	drawButton();

	if (!loading) { drawMedia(); }

	requestAnimationFrame(update);
}

function drawButton() {
	const { x, y, w, h } = positions.button;
	context.strokeRect(x - w * 0.5, y - h * 0.5, w, h);
	context.fillText("next", x, y + (h * 0.75) * 0.3);
}

function drawMedia() {
	if (currentMedia === undefined) { return; }

	context.translate(positions.media.x, positions.media.y);

	if (currentMedia.rotate !== undefined) {
		context.rotate(Math.PI * 1.5);
	}

	context.drawImage(
		vid.paused ? img : vid,
		-positions.media.w * 0.5,
		-positions.media.h * 0.5,
		positions.media.w,
		positions.media.h,
	);
}

function resize() {
	const width = window.innerWidth;
	const height = window.innerHeight;

	canvas.width = width;
	canvas.height = height;

	const { button, media } = positions;

	button.h = (height * 0.1) * 0.75;
	button.w = button.h * 4;
	if (button.w > width * 0.9) { button.w = width * 0.9; }
	button.x = width * 0.5;
	button.y = height * 0.9 + button.h * 0.5;

	const font = button.h * 0.75;
	context.font = `${font}px Arial, sans-serif`;
	context.strokeStyle = "blue";
	context.textAlign = "center";
	context.textBaseline = "alphabetic";
	context.fillStyle = "blue";

	if (currentMedia === undefined) { return; }

	let mediaWidth = vid.paused ? img.width : vid.videoWidth;
	let mediaHeight = vid.paused ? img.height : vid.videoHeight;

	const toRotate = currentMedia.rotate !== undefined;
	if (toRotate) {
		const tempDim = mediaWidth;
		mediaWidth = mediaHeight;
		mediaHeight = tempDim;
	}

	let scale = 1;
	if (mediaWidth > mediaHeight) {
		scale = (width * 0.9) / mediaWidth;
	} else {
		scale = (height * 0.85) / mediaHeight;
	}

	if (mediaWidth * scale > width * 0.9) {
		scale = (width * 0.9) / mediaWidth;
	}

	if (mediaHeight * scale > height * 0.85) {
		scale = (height * 0.85) / mediaHeight;
	}

	if (toRotate) {
		media.h = mediaWidth * scale;
		media.w = mediaHeight * scale;
	} else {
		media.w = mediaWidth * scale;
		media.h = mediaHeight * scale;
	}

	media.x = width * 0.5;
	media.y = (height * 0.85) * 0.5;
}

function isNext(ev) {
	const { x, y, w, h } = positions.button;

	return (
		ev.x >= x - w * 0.5 &&
		ev.x <= x + w * 0.5 &&
		ev.y >= y - h * 0.5 &&
		ev.y <= y + h * 0.5
	);
}

resize();
update();
