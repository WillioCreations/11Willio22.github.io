var canvas = document.getElementById("canvas")
canvas.width = 1280
canvas.height = 720
canvas.style.width = "90vw"
canvas.style.height = "calc(90vw * 9 / 16)"
//Mr. Koren was here!
var ctx = canvas.getContext("2d")

document.body.style.backgroundImage = "url(https://upload.wikimedia.org/wikipedia/commons/a/a7/Field-thunderstorm-rainy-meadow_%2824241934691%29.jpg)"

var width = 10
var height = 10
var pixels = []

var fontSize = 700 / height
var boxSize = fontSize
var mouse = -1
var mx = 0
var my = 0

var tx = 0
var ty = 0

var text = "#F1F1F1"
var bg = "#272727"

var brush = 74

var brushes = []
fillBrushes()
var boxWidth = 20
var brushesPage = 0
var maxASCII = 10175
var numBrushPage = parseInt(Math.ceil(maxASCII / (boxWidth * boxWidth)))

var colors = ["\\033[0m","\\033[91m","\\033[92m","\\033[93m","\\033[94m","\\033[95m","\\033[96m","\\033[02m","\\033[37m"]
var showColors = ["#F1F1F1","#F12323","#23F123","#F0B400","#4c7a8a","#857091","#12c7a9","#373737","#C1C1C1"]
var colorNames = ["WHITE","RED","GREEN","YELLOW","BLUE","PURPLE","CYAN","GRAY","LIGHT GRAY"]
var colorSelected = 0

function fillBrushes() {
	for (let i = 32; i < 10175; i++) {
  	brushes.push(String.fromCharCode(i))
  }
  for (let i = 127344; i < 129510; i++) {
  	brushes.push(String.fromCharCode(i))
  }
  numBrushPage = parseInt(Math.ceil(brushes.length / (boxWidth * boxWidth)))
}

canvas.addEventListener("contextmenu", function(e){ 
	e.preventDefault() 
	return false
})

document.getElementById("size").onchange = function(e) {
	let i = document.getElementById("size").value
  width = i
  height = i
  fontSize = 700 / height
  boxSize = fontSize
	createPixels()
  draw()
}

function mouseInput(e) {
	let st = getComputedStyle(canvas)
  let bb = canvas.getBoundingClientRect()
  let mxx = e.clientX - bb.left
  let myy = e.clientY - bb.top
	mx = parseInt((mxx) / (parseInt(st.width.substring(0,st.width.length - 2)) / 1280))
	my = parseInt((myy) / (parseInt(st.height.substring(0,st.width.length - 2)) / 720))
  tx = parseInt(mx / boxSize)
  ty = parseInt(my / boxSize)
	if (mouse != -1) {
  	if (mx < 700) {
    	if (tx >= width || tx < 0 || ty >= height || ty < 0) return
      if (mouse == 0) pixels[tx + ty * width] = [brushes[brush],colorSelected]
      if (mouse == 2) pixels[tx + ty * width] = [" ",pixels[tx + ty * width][1]]
    } else if (mx > 815 && my > 204) {
    	let tx = parseInt((mx - 815) / 20)
      let ty = parseInt((my - 194) / 20)
      brush = tx + (ty + brushesPage * boxWidth) * boxWidth
     
    } else if (mx > 900 && my > 20 && mx < 1170 && my < 50) {
    	colorSelected = Math.min(colors.length - 1,Math.max(0,parseInt((mx - 900) / 25)))
    }
  
  } 
  draw()
}

canvas.addEventListener("mousedown", function(e) {
	mouse = e.button	
  mouseInput(e)
})
canvas.addEventListener("mouseup", function(e) {
	mouse = -1
})
canvas.addEventListener("mousemove", function(e) {
  mouseInput(e)
  
})
canvas.addEventListener("mouseleave", function(e){
	mouse = -1
})
canvas.addEventListener("mousein", function(e){
	mouse = -1
})
window.addEventListener("keydown", function(e){
  if (e.key == "ArrowRight") {
  	if (brushesPage < numBrushPage) brushesPage++
  }
  if (e.key == "ArrowLeft") {
  	if (brushesPage > 0) brushesPage--
  }
  draw()
})
document.getElementById("reset").onclick = function(e) {
	createPixels()
  draw()
  document.getElementById("formatted").value = ""
}
document.getElementById("format").onclick = function(e) {
	let output = ""
  for (let y = 0; y < height; y++) {
  	for (let x = 0; x < width; x++) {
    	let hex = pixels[x + y * width][0].charCodeAt(0).toString(16)
      while (hex.length < 4) {
      	hex = "0" + hex
      }
      output += colors[pixels[x + y * width][1]] + "\\" + "u" + hex + " "
    }
    output += "\\n"
  }
  document.getElementById("formatted").value = output + colors[0]
}
	
createPixels()
draw()

setInterval(update,16)

function update() {
	
	
}

function createPixels() {
  pixels = new Array(width * height)
  for (let i = 0; i < pixels.length; i++) pixels[i] = [" ",0]
}

function draw() {
	ctx.fillStyle = bg
  ctx.fillRect(0, 0, 1280, 720)
  ctx.fillStyle = "#5E5E5E"
  if (tx < width && ty < height && tx > -1 && ty > -1)
  	ctx.fillRect(tx * boxSize, ty * boxSize, boxSize, boxSize)
  ctx.fillStyle = text
  ctx.font = fontSize + "px Tahoma"
  ctx.textAlign = "center"
  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
    	ctx.fillStyle = showColors[pixels[x + y * width][1]]
      ctx.fillText(pixels[x + y * width][0], x * boxSize + boxSize / 2, y * boxSize + boxSize)
    }
  }
  
  ctx.fillStyle = "#575757"
  ctx.fillRect(760, 10, 510, 700)
  
  ctx.fillStyle = "#717171"
  ctx.fillRect(770, 20, 100, 100)
  
  ctx.fillStyle = text
  ctx.font = "27px Tahoma"
  ctx.fillText("Brush", 820, 50)
  ctx.font = "37px Tahoma"
  ctx.fillText(brushes[brush], 820, 95)
 	
  ctx.font = "16px Tahoma"
  ctx.textAlign = "left"
  for (let y = 0; y < boxWidth; y++) {
  	for (let x = 0; x < boxWidth; x++) {
    	if (x + (y + brushesPage * boxWidth) * boxWidth == brush) {
      	ctx.fillStyle = "#373737"
        ctx.fillRect(815 + x * 20, 204 + (y - 1) * 20, 20, 20)
        ctx.fillStyle = text
      }
    	ctx.fillText(brushes[x + (y + brushesPage * boxWidth) * boxWidth], 820 + x * 20, 200 + y * 20)
    }
  }
  ctx.font = "30px Tahoma"
  ctx.textAlign = "right"
  ctx.fillText((brushesPage + 1) + "/" + (numBrushPage + 1), 1207, 620)
  
  ctx.fillStyle = "#717171"
  ctx.fillRect(895, 20, 270, 30)
  ctx.fillStyle = "#A7A7A7"
  ctx.fillRect(898 + colorSelected * 25, 23, 24, 24)
  for (let x = 0; x < colors.length; x++) {
  	ctx.fillStyle = showColors[x]
    ctx.fillRect(900 + x * 25, 25, 20, 20)
  }
  
}
