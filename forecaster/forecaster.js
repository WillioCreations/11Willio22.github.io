var canvas = document.getElementById("canvas")
var ctx = canvas.getContext("2d")
var width = canvas.width
var height = canvas.height
var bgColor = "#232323"


var DAYS = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"]

var CLEAR = "CLEAR"
var STORMY = "STORMY"
var RAINY = "RAINY"
var CLOUDY = "CLOUDY"
var PARTLY_CLOUDY = "PARTLY CLOUDY"



var HIGHS = [0,0,0,0,0,0,0]
var LOWS = [0,0,0,0,0,0,0]
var WEATHER = [CLEAR,CLEAR,CLEAR,CLEAR,CLEAR,CLEAR,CLEAR]

var boxWidth = width / 9
var boxHeight = 200
var boxOffset = 5
var boxX = (width / 2) - (((boxWidth + boxOffset) * 7) - boxOffset) / 2
var boxY = (height / 2) - (boxHeight / 2)

function draw() {

	ctx.fillStyle = bgColor
  ctx.fillRect(0,0,width,height)
  
  ctx.font = "11px Courier New"
  for (let i = 0; i < 7; i++) {
  	let xp = boxX + i * (boxWidth + boxOffset);
    ctx.fillStyle = "#2323F1"
    ctx.fillRect(xp,boxY,boxWidth,boxHeight);
   	
    ctx.fillStyle = "#F1F1F1"
    ctx.fillText(DAYS[i],xp + 5,boxY + 14)
  }

}

draw()

