var canvas = document.getElementById("canvas")
canvas.width = WIDTH = 1920
canvas.height = HEIGHT = 1080
canvas.style.width = "90vw"
canvas.style.height = "calc(90vw * 9 / 16)"

var ctx = canvas.getContext("2d")

var lessons = ["Basics", "Nouns", "Verbs", "Grammer"]
var lessonImages = []

var imagesToLoad = 0;

load()

function onload() {
	draw()
}

function load() {
	lessonImages = [
		loadImage("https://www.celladorales.com/wp-content/uploads/2016/12/ShippingBox_sq.jpg"),
		loadImage("https://cdn.mos.cms.futurecdn.net/42E9as7NaTaAi4A6JcuFwG-1200-80.jpg"),
		loadImage("https://library.kissclipart.com/20180903/usq/kissclipart-silhouette-running-clipart-running-clip-art-6770cbae58c4ba1c.jpg"),
		loadImage("https://images.macrumors.com/t/Nef1flhQYBFH40BZXBYVOXz5d0Q=/1600x0/article-new/2017/11/crying-tears-of-joy-emoji.jpg"),
	]
}

function oneachimageload() {
	imagesToLoad--;
	if (imagesToLoad <= 0) {
		onload()
	}
}

function loadImage(src) {
	let img = new Image()
	img.src = src;
	imagesToLoad++
	img.onload = oneachimageload
	return img
}

function draw() {
	//Background
	ctx.fillStyle = "#272727"
	ctx.fillRect(0,0,WIDTH,HEIGHT)
	
	ctx.font = "50px Clickuper"
	ctx.fillStyle = "#E7E7E7"
	ctx.textAlign = "center"
	
	for (let i = 0; i < lessons.length; i++) {	
		ctx.fillText(lessons[i], 228 + i * 450, 700)
		ctx.drawImage(lessonImages[i], 100 + i * 450, 350, 256, 256)
	}

}	

draw()