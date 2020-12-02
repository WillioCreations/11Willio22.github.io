class Tile {
	constructor(img_src) {
		this.img = new Image();
		this.img.src = img_src + ".png"
	}
	
}

function execute(cmd,args) {
	if (cmd == "up") playerTargetY -= Number(args)
	if (cmd == "down") playerTargetY += Number(args)
	if (cmd == "right") playerTargetX += Number(args)
	if (cmd == "left7") playerTargetX -= Number(args)
}

function compile() {
	 let lines = codeField.value.split(";")
}

function run() {
	compile()
	for (let c = 0; c < code.length; c++) {
		let spl = code[c].split(" ")
		setTimeout(execute(code[c]),100 * Number(spl[1]) )
	}
}

function render() {
	for (let y = 0; y < mapHeight; y++) {
		for (let x = 0; x < mapWidth; x++) {
			ctx.drawImage(map[x + y * mapWidth].img,x * tileSize,y * tileSize,tileSize,tileSize)	
		}
	}
	ctx.drawImage(img_player.img,playerX,playerY,tileSize,tileSize)
}

function createMap() {
	map = []
	for (let y = 0; y < mapHeight; y++) {
		for (let x = 0; x < mapWidth; x++) {
			let r = randint(100)
			if (r >= 98) map[x + y * mapWidth] = tile_puddle
			else if (r >= 95) map[x + y * mapWidth] = tile_flower2
			else if (r >= 70 && r < 90) map[x + y * mapWidth] = tile_flower
			else if (r >= 30 && r < 70) map[x + y * mapWidth] = tile_grass1
			else map[x + y * mapWidth] = tile_grass
		}
	}
}

async function onLoad() {

	createMap()
	render()
	
}

function randint(max) {
	return Math.floor(Math.random() * max)
}

//Document
var canvas = document.getElementById("canvas")
var ctx = canvas.getContext("2d")
canvas.width = 1280
canvas.height = 720
canvas.style.width = 640
canvas.style.height = 360

var codeField = document.getElementById("command")

//Executing
var code = []

//Player
var playerX = 0
var playerY = 0

//Target

//Map
var map = []
var mapWidth = 32
var mapHeight = 32
var tileSize = 64

//Tiles
var img_player = new Tile("player")
var img_target = new Tile("target")

var tile_grass = new Tile("grass")
var tile_grass1 = new Tile("grass1")
var tile_flower = new Tile("flower")
var tile_flower2 = new Tile("flower2")
var tile_puddle = new Tile("puddle")

var grassTiles = [tile_grass,tile_grass1,tile_flower,tile_flower2]

var tiles = [tile_grass,tile_grass1,tile_flower,tile_flower2]




