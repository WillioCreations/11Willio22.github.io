var canvas = document.getElementById("canvas")
var ctx = canvas.getContext("2d")

var boxWidth = 512 / 8
var boxHeight = 512 / 8

var img_grass = loadImage("pixel-frame-0.png")
img.onload = onLoad()
var tiles = new Array(64)

class Tile {
	constructor(name,imgsrc,x,y) {
  
  	this.name = name;
    this.img = new Image();
    this.img.src = imgsrc;
    this.x = x;
    this.y = y;
  
  }
  render() {
    ctx.drawImage(this.img,this.x * boxWidth, this.y * boxHeight, boxWidth, boxHeight)
  }
}

function loadImage(imgsrc) {
	let im = new Image();
  im.src = imgsrc;
  return im;
}

function createTiles() {
	tiles = new Array(64)
  for (let y = 0; y < 8; y++) {
  	for (let x = 0; x < 8; x++) {
    	tiles[x + y * 8] = new Tile("grass",img_grass,x,y)
    }
  }
  
}

function draw() {
	for (let x = 0; x < tiles.length; x++) {
  	tiles[x].render()
  }
}

function onLoad() {
	createTiles()
  	draw()
	inspect()
}

onLoad()
