var canvas = document.getElementById("canvas")
canvas.width = 1280
canvas.height = 720
canvas.style.width = "70vw"
canvas.style.height = "calc(70vw / 16 * 9)"

var inputField = document.getElementById("in")
inputField.style.visibility = "hidden";

var state = 0;
var learnPoints = []

function load(file) {
	let result = ""
	fetch("https://11willio22.github.io/learn/" + file + '.txt')
  .then(response => response.text())
  .then(text => result = text)
  return result
}

var lessonsFile = load("lessons")

function randint(min,max) {
	return Number(Math.random()) * (max - min) + min
}

function createLearnPoints() {
	
}

var ctx = canvas.getContext("2d")
function draw() {
	if (state == 0) {
		ctx.fillStyle="#232323"
		ctx.fillText(lessonsFile,100,100)
	} else if (state == 1) {
		
	}
}
draw()
