var canvas = document.getElementById("canvas")
var ctx = canvas.getContext("2d")
var width = 1920*2
var height = 1080*2



canvas.width = width
canvas.height = height
canvas.style.width = 640
canvas.style.height = 360


var bg = new Image()

bg.src="bg.png"
bg.onload=function() {
	draw()
};



var DAYS = ["SUN","MON","TUE","WED","THU","FRI","SAT"]

var SUNNY = "SUNNY"
var PARTLY_CLOUDY = "PARTLY CLOUDY"
var STORMY = "STORMY"
var RAINY = "RAINY"
var CLOUDY = "CLOUDY"

var RAINY_SUN = "RAINY SUN"
var THUNDER_SUN = "THUNDER SUN"
var LIGHT_SNOW = "LIGHT SNOW"
var SNOWY_SUN = "SNOWY_SUN"
var BLIZZARD = "BLIZZARD"

var loaded = 0

function onImageLoads() {
	loaded++
	if (loaded >= 10) {
		draw();
	}
}

var img_sunny = new Image()
img_sunny.src = "sunny.png"
img_sunny.onload = onImageLoads
var img_partly_cloudy = new Image()
img_partly_cloudy.src = "partly_cloudy.png"
img_partly_cloudy.onload = onImageLoads
var img_stormy = new Image()
img_stormy.src = "stormy.png"
img_stormy.onload = onImageLoads
var img_rainy = new Image()
img_rainy.src = "rainy.png"
img_rainy.onload = onImageLoads
var img_cloudy = new Image()
img_cloudy.src = "cloudy.png"
img_cloudy.onload = onImageLoads

var img_rainy_sun = new Image()
img_rainy_sun.src = "rainy_sun.png"
img_rainy_sun.onload = onImageLoads
var img_thunder_sun = new Image()
img_thunder_sun.src = "thunder_sun.png"
img_thunder_sun.onload = onImageLoads
var img_light_snow = new Image()
img_light_snow.src = "light_snow.png"
img_light_snow.onload = onImageLoads
var img_snowy_sun = new Image()
img_snowy_sun.src = "snowy_sun.png"
img_snowy_sun.onload = onImageLoads
var img_blizzard = new Image()
img_blizzard.src = "blizzard.png"
img_blizzard.onload = onImageLoads

var HIGHS = [0,0,0,0,0,0,0]
var LOWS = [0,0,0,0,0,0,0]
var WEATHER = [0,1,4,3,7,9,2]
var SYMBOLS = [
	img_sunny,
	img_partly_cloudy,
	img_stormy,
	img_rainy,
	img_cloudy,
	
	img_rainy_sun,
	img_thunder_sun,
	img_light_snow,
	img_snowy_sun,
	img_blizzard
]

var boxWidth = width / 8
var boxHeight = height / 2
var boxOffset = 5
var boxX = (width / 2) - (((boxWidth + boxOffset) * 7) - boxOffset) / 2
var boxY = (height / 2) - (boxHeight / 2)

var boxFont = height / 20
var boxTitleFont = height / 30
var boxTitleSize = boxTitleFont + 20
var titleSize = height / 10
var title = "Madisonian Weather!"

function draw() {

  ctx.drawImage(bg,0,0,width,height);
  
  ctx.globalAlpha = 0.7;
  ctx.fillStyle="#232323"
  ctx.fillRect(5,5,width - 10,titleSize * 1.5)
  ctx.globalAlpha = 1.0;
  
  
  ctx.textAlign = "center"
  ctx.fillStyle = "#F1F1F1"
  ctx.font = titleSize + "px Tahoma"
  ctx.fillText(title,width / 2,25 + titleSize)
  
  for (let i = 0; i < 7; i++) {
	ctx.textAlign = "center"
	ctx.font = boxTitleFont + "px Trebuchet MS"
  	let xp = boxX + i * (boxWidth + boxOffset);
	
	ctx.globalAlpha = 0.87
	
    ctx.fillStyle = "#2F2F2F"
    ctx.fillRect(xp,boxY,boxWidth,boxTitleSize);
    ctx.fillStyle = "#23A7F1"
    ctx.fillRect(xp,boxY + boxTitleSize,boxWidth,boxHeight - boxTitleSize);
	ctx.globalAlpha = 1
	
   	
	ctx.textAlign = "center"
    ctx.fillStyle = "#F1F1F1"
    ctx.fillText(DAYS[i],xp + (boxWidth / 2), boxY + boxTitleFont)
	
	ctx.drawImage(SYMBOLS[i],xp + 5,boxY + (boxHeight / 2) - ((boxWidth - 10) / 2),boxWidth - 10, boxWidth - 10)
	
	ctx.textAlign = "left"
	ctx.font = boxFont + "px Trebuchet MS"
    ctx.fillText(LOWS[i],xp + 20,boxY + boxHeight - 23)
	ctx.textAlign = "right"
    ctx.fillText(HIGHS[i],xp + boxWidth - 20,boxY + boxHeight - 23)
  }

}

