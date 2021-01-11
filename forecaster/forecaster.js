var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d")

var inputTable = document.getElementById("inputTable")
var ctxIT = inputTable.getContext("2d")

var WIDTH_IT = 852
var HEIGHT_IT = 240

var days = ["MON","TUE","WED","THU","FRI","SAT","SUN"];
var symbols = []
var dewPointSymbol = 0

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

var inputTableData = []
var inputTableSelected = 0

var cellsX = 7
var cellsY = 8

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
			ctx.fillText(this.humidity + "%",this.x + this.w / 2.0,this.y + this.h * 0.87)
			if (this.dewPoint != 0) {
				ctx.fillStyle="#e1e1f7"
				ctx.font = (boxTitleSize * 0.7) + "px Tahoma"
				if (this.dewPoint >= 10) 
					ctx.drawImage(dewPointImage,this.x + this.w * 0.27,this.y + this.h * 0.907,this.w * 0.15, this.w * 0.15)
				else
					ctx.drawImage(dewPointImage,this.x + this.w * 0.33,this.y + this.h * 0.907,this.w * 0.15, this.w * 0.15)
				
				ctx.fillText(this.dewPoint,this.x + this.w * 0.57,this.y + this.h * 0.95	)
			}
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
	humidities = [10,40,30,73,50,40,70]
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

var download = document.getElementById("download") 
download.addEventListener("click", function(e) {
  var date = new Date();
  var link = document.createElement('a');
  link.download = "forecaster_" + date.getDate() + '.png';
  link.href = document.getElementById('canvas').toDataURL()
  link.click();
  delete link
});

function drawInputTable() {
	ctxIT.fillStyle = "#FDFDFD"
	ctxIT.fillRect(0,0,WIDTH_IT,HEIGHT_IT)
	
	let cellWidth = WIDTH_IT / cellsX
	let cellHeight = HEIGHT_IT / cellsY

	ctxIT.stroke="#232323E9"
	ctxIT.lineWidth=1
	ctxIT.textAlign="center"
	ctxIT.fillText("" + inputTableSelected, 10, 10)
	for (let y = 0; y < cellsY; y++) {
		for (let x = 0; x < cellsX; x++) {
			if (y > 0) {
				if (x == 0) 
					ctxIT.font="20px Arial"
				else
					ctxIT.font="15px Arial"
				if (x + y * cellsX == inputTableSelected) {
					ctxIT.fillStyle="#71717F"
					ctxIT.fillRect(x * cellWidth,y * cellHeight,cellWidth,cellHeight)
				}
				ctxIT.strokeRect(x * cellWidth,y * cellHeight,cellWidth,cellHeight)
				if (inputTableData[x + y * cellsX] != undefined) {
					ctxIT.fillStyle="#37373F"
					ctxIT.fillText("" + inputTableData[x + y * cellsX], x * cellWidth + (cellWidth / 2),y * cellHeight + (cellHeight* 0.7))
				}
			} else {
				ctxIT.font="20px Arial"
				if (inputTableData[x + y * cellsX] != undefined) {
					ctxIT.fillStyle="#37373F"
					ctxIT.fillText("" + inputTableData[x + y * cellsX], x * cellWidth + (cellWidth / 2),y * cellHeight + (cellHeight* 0.7))
				}
			}
		}
	}
}

function setupDefaultInputValues() {
	inputTableData = new Array(cellsX * cellsY)
	let titles = ["Symbol","High","Low","Humidity","DewPoint"]
	for (let y = 1; y < cellsY; y++) {
		inputTableData[0 + y * cellsX] = days[y - 1]
	}
	for (let x = 1; x < titles.length + 1; x++) {
		inputTableData[x] = titles[x - 1]
	}
}

function interpretInputDataTable() {
	for (let d = 1; d < 8; d++) {
		dayBoxes[d - 1].day = inputTableData[d * cellsX]
		if (inputTableData[1 + d * cellsX] != undefined && symbolNames.includes(inputTableData[1 + d * cellsX]))
			dayBoxes[d - 1].symbol = symbols[symbolNames.indexOf(inputTableData[1 + d * cellsX])]
		if (inputTableData[2 + d * cellsX] != undefined) 
			dayBoxes[d - 1].high = inputTableData[2 + d * cellsX]
		if (inputTableData[3 + d * cellsX] != undefined) 
			dayBoxes[d - 1].low = inputTableData[3 + d * cellsX]
		if (inputTableData[4 + d * cellsX] != undefined) 
			dayBoxes[d - 1].humidity = inputTableData[4 + d * cellsX]
		if (inputTableData[5 + d * cellsX] != undefined) 
			dayBoxes[d - 1].dewPoint = inputTableData[5 + d * cellsX]
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
	dewPointImage = loadImage("dewPointLogo.png")

	for (let i = 0; i < symbolNames.length; i++) {
		let img = loadImage(symbolNames[i] + ".png")
		symbols.push(img)
	}
}

function load() {
	createDayBoxes()
	draw()
	setupDefaultInputValues()
	drawInputTable()
}

let cellWidth = WIDTH_IT / cellsX
let cellHeight = HEIGHT_IT / cellsY
var alphabet = "abcdefghijklmnopqrstuvwxyz"
var numbers = "0123456789"

function onMouseClickIT(event) {
	let rect = inputTable.getBoundingClientRect()
	let mx = parseInt((event.clientX - rect.left) / cellWidth)
	let my = parseInt((event.clientY - rect.top - cellHeight / 2) / cellHeight)
	
	console.log((inputTableSelected % cellsX) + "," + (parseInt(inputTableSelected / cellsY)))
	
	if (my > 0) {
			
		inputTableSelected = mx + my * cellsX
		drawInputTable()
		
	}
}

function onKeyDown(event) {
	event.preventDefault()
	if (inputTableSelected != -1) {
		if (event.key == "Backspace") {
			inputTableData[inputTableSelected] = inputTableData[inputTableSelected].substring(0,inputTableData[inputTableSelected].length - 1)
		} else if (event.key == "Tab") {
			inputTableSelected += 1
			if (inputTableSelected % cellsX == 0) inputTableSelected += 1
			if (inputTableSelected >= cellsX * cellsY) 		inputTableSelected = cellsX + 1 
		} else if ((inputTableSelected % cellsX < 2 && alphabet.includes(event.key.toLowerCase())) || numbers.includes(event.key) || event.key == "_") {
			if (inputTableData[inputTableSelected] == undefined) 
				inputTableData[inputTableSelected] = event.key
			else 
				inputTableData[inputTableSelected] += event.key
		} else if (event.key == "ArrowUp") {
			if (parseInt(inputTableSelected / cellsX) != 1)
				inputTableSelected -= cellsX
			
		} else if (event.key == "ArrowRight") {
			inputTableSelected += 1
			
		} else if (event.key == "ArrowDown") {
			inputTableSelected += cellsX
		
		} else if (event.key == "ArrowLeft") {
			inputTableSelected -= 1
			
		}
		console.log(inputTableSelected)
		drawInputTable()
		interpretInputDataTable()
		draw()
	}
}

inputTable.addEventListener("mousedown",onMouseClickIT)

window.addEventListener("keydown",onKeyDown)

canvas.width = WIDTH;
canvas.height = HEIGHT;
canvas.style.width = "852px"
canvas.style.height = "480px"

inputTable.width = WIDTH_IT;
inputTable.height = HEIGHT_IT;
inputTable.style.width = "852px"
inputTable.style.height = "240px"

ctx = canvas.getContext("2d")
ctxIT = inputTable.getContext("2d")

loadResources()

