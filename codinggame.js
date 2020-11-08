function move(inp) {
	let spl = inp.split(" ")	
  let moveX = 0
  let moveY = 0
  let power = 0
  
  if (spl.length > 1) {
  	power = Number(spl[1])
  }
  if (spl[0] == "up") {
  	moveY = -power
  } else if (spl[0] == "down") {
  	moveY = power
  } else if (spl[0] == "right") {
  	moveX = power
  } else if (spl[0] == "left") {
  	moveX = -power
  }
  playerX += moveX
  playerY += moveY
}

function drawPlayer() {
	ctx.fillStyle = "#232323"
  ctx.fillRect(playerX * tileSize,playerY * tileSize,tileSize,tileSize)
}

function update() {
	
	ctx.clearRect(0,0,document.getElementById("canvas").width,document.getElementById("canvas").height)
  ctx.strokeStyle = "#232323"
	ctx.lineWidth = 1
	for (let y = 0; y < Math.ceil(tilesY); y++) {
  	for (let x = 0; x < Math.ceil(tilesX); x++) {
			ctx.strokeRect(x * tileSize, y * tileSize, tileSize, tileSize)
    }
  }
	drawPlayer()
}

function input(event) {
	if (event.keyCode == 13) {
    move(document.getElementById("command").value)
    inputHistory.push(document.getElementById("command").value)
    
    document.getElementById("command").value = ""
  	
  }
	
}


var canvas = document.getElementById("canvas")
var width = 1280
var height = 720
canvas.width = width
canvas.height = height
canvas.style.width = "640px"
canvas.style.height = "360px"
var ctx = document.getElementById("canvas").getContext("2d")

var playerX = 0
var playerY = 0
var inputHistory = []

var tileSize = 64
var tilesX = width / tileSize
var tilesY = height / tileSize

window.setInterval(update,100)



