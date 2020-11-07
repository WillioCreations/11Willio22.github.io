function onMouseMove(e) {
	mouseX = e.pageX - document.getElementById("cv").offsetLeft
	mouseY = e.pageY - document.getElementById("cv").offsetTop
}


function update() {
	
	
	document.getElementById("mousePos").innerHTML = "X=" + mouseX + " Y=" + mouseY
	
	x++
	if (x >= document.getElementById("cv").width) {
		x = 0;
	}
	
	ctx.clearRect(0,0,document.getElementById("cv").width,document.getElementById("cv").height)
	render()
	
}

function render() {
	
	for (var i = 0; i < entities.length; i++) {
		if (i == selected) {
			ctx.fillStyle = "#23E7F9"
			ctx.strokeRect(entities[i].x - 5,entities[i].y - 5,entities[i].w + 10,entities[i].h + 10);
		}
		entities[i].render()
	}
	
}

function initialize() {
	entities = [new AND("AND_0")]
}

function click(e) {
	let x = mouseX
	let y = mouseY
	for (let i = 0; i < entities.length; i++) {
		if ((x > entities[i].x) && (x <= entities[i].x + entities[i].w)) {
			if ((y > entities[i].y) && (y <= entities[i].y + entities[i].h)) {
				selected = i
			}	
		}			
	}
}

function rand(range) {
	return Math.random() * range
}

class LogicPiece {
	
	constructor(name) {
		this.name = name;
		this.x = rand(720)
		this.y = rand(480)
		this.w = 100
		this.h = 100
	}
	
	name() {
		return this.name
	}
	
	input(inputs) {
		return true
	}
	
	render() {
		ctx.fillStyle = "#232323"
		ctx.fillRect(this.x,this.y,this.w,this.h)
	}
	
		
}

class AND extends LogicPiece {
	
	constructor(name) {
		super(name)
	}
	
	render() {
		ctx.strokeStyle = "#2373F1"
		ctx.lineWidth = 2
		ctx.beginPath()
		ctx.moveTo(this.x,this.y)
		ctx.lineTo(this.x + this.w / 4 * 3, this.y)
		ctx.lineTo(this.x + this.w,this.y + this.h / 4)
		ctx.lineTo(this.x + this.w,this.y + this.h / 4 * 3)
		ctx.lineTo(this.x + this.w / 4 * 3, this.y + this.h)
		ctx.lineTo(this.x,this.y + this.h)
		ctx.lineTo(this.x,this.y)
		ctx.stroke()
		ctx.fillStyle = "#F3F3F3"
		ctx.fill()
	}
	
}

var entities = []

var ctx = document.getElementById("cv").getContext("2d");

var mouseX = 0
var mouseY = 0
var x = 0

var selected = 0


initialize()
update()

setInterval(update,10)

window.captureEvents(Event.MOUSEMOVE)
window.onmousemove = onMouseMove
window.onclick = click
window.ondrag = drag




