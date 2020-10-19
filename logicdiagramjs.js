function onMouseMove(e) {
	mouseX = e.pageX - document.getElementById("cv").offsetLeft
	mouseY = e.pageY - document.getElementById("cv").offsetTop
}


function onResize() {
	document.getElementById("cv").style.width = document.getElementById("cvdiv").width
	document.getElementById("cv").style.height = document.getElementById("cvdiv").height
	document.getElementById("cv").width = 1280
	document.getElementById("cv").height = 720
}


function update() {
	
	
	document.getElementById("mousePos").innerHTML = "X=" + mouseX + " Y=" + mouseY
	
	x++
	if (x >= document.getElementById("cv").width) {
		x = 0;
	}

	ctx.clearRect(0,0,document.getElementById("cv").width,document.getElementById("cv").height)
	ctx.fillStyle = "#232323"
	ctx.fillRect(x,100,100,100)
	
	
}

var ctx = document.getElementById("cv").getContext("2d");

mouseX = 0
mouseY = 0
x = 0
setInterval(update,10)

document.captureEvents(Event.MOUSEMOVE)
document.onmousemove = onMouseMove




