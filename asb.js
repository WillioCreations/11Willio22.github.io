var canvas = document.getElementById("canvas")
canvas.width = WIDTH = 1280
canvas.height = HEIGHT = 720
canvas.style.width = "90vw"
canvas.style.height = "calc(90vw * 9 / 16)"

var ctx = canvas.getContext("2d")

var question = ""

var questions = []
var usedQuestions = []

load()
draw()


function loadText(src) {
	let result = ""
	fetch('src.txt')
  .then(response => response.text())
  .then(text => result = text)
  return result
}

function load() {
	question = loadText("asb.txt")
}

function draw() {
	ctx.fillStyle = "#F1F1F1"
	ctx.fillRect(0,0,WIDTH,HEIGHT)
	
	ctx.fillStyle = "#272727"
	ctx.fillText(question, 100, 100)
}