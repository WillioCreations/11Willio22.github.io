var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d")

var inputTable = document.getElementById("inputTable")
var ctxIT = inputTable.getContext("2d")

var WIDTH_IT = 852
var HEIGHT_IT = 240

var days = ["MON","TUE","WED","THU","FRI","SAT","SUN"];
var symbols = []

var symbolNames = ["cloudy","rainy","rainy_sunny","sunny","sunny_cloudy","thunderstorm","thunderstorm_sunny"]

var WIDTH = 1280*2;
var HEIGHT = 720*2;

var CW = 852;
var CH = 480;

var loadedImages = 0;
var imagesToLoad = 0;


var boxWidth = 0;
var boxHeight = 0;
var boxSpacing = 0;
var boxTitleSize = 0;

var bgImage = 0;
var symbolSize = 0;

var STYLE_CENTER = 0;
var STYLE_HORIZONTAL = 1;
var style = STYLE_CENTER;


class DayBox {
	constructor(x, y, w, h, day, humidity, high, low, dewPoint, front, symbol) {
		this.x = x;
		this.y = y;
		this.w = w;
		this.h = h;
		this.cx = w / 2;
		this.cy = h / 2;
		this.day = day;
		this.humidity = humidity;
		this.high = high;
		this.low = low;
		this.dewPoint = dewPoint;
		this.front = front;
		this.symbol = symbol;
	}
	render() {
		ctx.fillStyle="#00000071"
		ctx.fillRect(this.x,this.y,this.w,this.h);
		ctx.fillStyle="#FFFFFFE7"
		ctx.filter = "none"
		
		ctx.font=boxTitleSize + "px Impact"
		ctx.textAlign = "center"
		ctx.fillText(this.day, this.x + this.w / 2, this.y + (boxTitleSize + 10));
		
		ctx.globalAlpha = 0.9
		ctx.drawImage(this.symbol,this.x + (this.w / 2) - (symbolSize / 2),this.y + this.h * 0.17,symbolSize,symbolSize)
		
		ctx.globalAlpha = 0.7
		
		if (style == STYLE_CENTER) {
			ctx.textAlign = "center"
			ctx.fillStyle="#ff8173"
			ctx.font = (boxTitleSize * 1.7) + "px Tahoma"
			ctx.fillText(this.high,this.x + this.w / 2,this.y + this.h * 0.67)
			ctx.fillStyle="#c7f2ff"
			ctx.font = (boxTitleSize * 1) + "px Tahoma"
			ctx.fillText(this.low,this.x + this.w / 2.0,this.y + this.h * 0.77)
			ctx.fillStyle="#f9f9f9"
			ctx.font = (boxTitleSize * 0.7) + "px Tahoma"
			ctx.fillText(this.low + "%",this.x + this.w / 2.0,this.y + this.h * 0.87)
		}
		
		if (style == STYLE_HORIZONTAL) {
			ctx.fillStyle="#ff8173"
			ctx.textAlign = "left"
			ctx.font = (boxTitleSize * 1.3) + "px Impact"
			ctx.fillText(this.high,this.x + this.w * 0.053,this.y + this.h * 0.70)
			ctx.fillStyle="#7381ff"
			ctx.textAlign = "right"
			ctx.font = (boxTitleSize * 1.3) + "px Impact"
			ctx.fillText(this.high,this.x + this.w * 0.957,this.y + this.h * 0.70)
		}
		
		
		
		ctx.globalAlpha = 1
			
		
	}
}

var dayBoxes = []

function createDayBoxes() {
	boxWidth = WIDTH / 8;
	boxHeight = HEIGHT / 1.5;
	boxSpacing = WIDTH * 0.01;
	boxTitleSize = boxHeight / 10;
	
	symbolSize = boxWidth * 0.90;
	humidities = [0,0,0,0,0,0,0]
	highs = [97,30,50,42,70,90,100]
	lows = [80,57,40,3,57,70,90]
	dewPoints = [0,0,10,7,0,4,10]
	front = 0
	
	for (let i = 0; i < 7; i++) {
		dayBoxes.push(new DayBox(
		((WIDTH / 2) - ((boxWidth) * 3.5) - (boxSpacing * 3)) + ((boxWidth + boxSpacing) * i), 
		(HEIGHT / 2) - (boxHeight / 2),
		boxWidth,
		boxHeight,
		days[i],humidities[i],highs[i],lows[i],dewPoints[i],front,symbols[i]));
	}
}

function drawInputTable() {
	ctxIT.fillStyle = "#F1F1F1"
	ctxIT.fillRect(0,0,WIDTH_IT,HEIGHT_IT)
	
	let cellsX = 10
	let cellsY = 7
	
	let cellWidth = WIDTH_IT / cellsX
	let cellHeight = HEIGHT_IT / cellsY

	ctxIT.stroke="#232323E9"
	ctxIT.lineWidth=1
	for (let y = 0; y < cellsY; y++) {
		for (let x = 0; x < cellsX; x++) {
			ctxIT.strokeRect(x * cellWidth,y * cellHeight,cellWidth,cellHeight)
		}
	}
}


function loadFunction() {
	loadedImages++;
	if (loadedImages == imagesToLoad) {
		load();
	}
}

function loadImage(src) {
	var image = new Image();
	image.src = src;
	image.onload = loadFunction
	imagesToLoad++;
	return image;
}

function draw() {
	ctx.drawImage(bgImage,0,0,WIDTH,HEIGHT)
	
	for (let i = 0; i < 7; i++) {
		dayBoxes[i].render()
	}
}

function loadResources() {
	bgImage = loadImage("adam-chang-IWenq-4JHqo-unsplash.jpg")

	for (let i = 0; i < symbolNames.length; i++) {
		let img = loadImage(symbolNames[i] + ".png")
		symbols.push(img)
	}
}

function load() {
	createDayBoxes()
	draw()
	drawInputTable()
}

canvas.width = WIDTH;
canvas.height = HEIGHT;
canvas.style.width = "852px"
canvas.style.height = "480px"

inputTable.width = WIDTH_IT;
inputTable.height = HEIGHT_IT;
inputTable.style.width = "852px"
inputTable.style.height = "240px"

ctx = canvas.getContext("2d")

loadResources()

