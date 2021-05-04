var canvas = document.getElementById("canvas")
WIDTH = canvas.width = 1920
HEIGHT = canvas.height = 1080
canvas.style.width = "90vw"
canvas.style.height = "calc(90vw / 16 * 9)"

var ctx = canvas.getContext('2d')

//Hangman
var alphabet = "abcdefghijklmnopqrstuvwxyz"
var remainingKeys = alphabet.split("")

var lines = ["____ ___ __ __","----","____ __?"]
var lineSolutions = ["Xjmm zpv hp up","QSPN","xjui nf?"]

var showHint = true
var slotIndex = [0,0]
var slotTurning = false
var slotTimer = 0

var pazazz = false

setInterval(draw,100)

window.addEventListener("keydown", function(e) {//Jesus
	if (remainingKeys.includes(e.key)) {
  	showHint = false
    let index = remainingKeys.indexOf(e.key)
    remainingKeys.splice(index, 1)
    for (let l = 0; l < lines.length; l++) {
    	for (let j = 0; j < lines[l].length; j++) {
      	let skey = lineSolutions[l].substring(j,j + 1)
      	if (e.key == skey.toLowerCase()) {
        	lines[l] = lines[l].slice(0,j) + skey + lines[l].slice(j + 1)
          slotTurning = true
          for (let i = 0; i < lines.length; i++) {
          	if (lines[i] != lineSolutions[i]) {
            	slotTurning = false
            }
          }
        }
      }
    }
  }
})

setInterval(draw, 100)

function draw() {
	ctx.fillStyle = pazazz ? "#F77E7E" : (slotTurning ? "#5050F1" : "#000000")
	ctx.clearRect(0,0,WIDTH,HEIGHT)
	ctx.font = "100px Quicksand"
  ctx.textAlign = "center"
  ctx.fillText(lines[0], WIDTH / 2, HEIGHT / 2 - 200)
  ctx.fillText(lines[2], WIDTH / 2, HEIGHT / 2 + 300)
  
  ctx.font = "300px Quicksand"
  ctx.fillText(lines[1], WIDTH / 2, HEIGHT / 2 + 150)
  
 	if (slotTurning) {
  	slotTimer++
    if (slotTimer >= 7) {
    	if (slotIndex[0] >= lines[slotIndex[1]].length) {
        slotIndex[1]++ 
        slotIndex[0] = 0
        if (slotIndex[1] > 2)
        	slotTurning = false
          pazazz = true
          return
      }
      let cchar = lines[slotIndex[1]][slotIndex[0]]
      let index = 0
      if (alphabet.includes(cchar.toLowerCase())) {
      	index = (alphabet.indexOf(cchar.toLowerCase()) - 1) % alphabet.length
        lines[slotIndex[1]] = lines[slotIndex[1]].substring(0,slotIndex[0]) + (alphabet.toUpperCase().includes(cchar) ? alphabet.toUpperCase() : alphabet).substring(index,index + 1) + lines[slotIndex[1]].substring(slotIndex[0] + 1)
      	slotTimer = 0
      }
     	slotIndex[0]++
    }
  }
  
  if (pazazz) {
  	
  }
  
  if (showHint) {
  	 ctx.font = "50px Quicksand"
  	ctx.fillText("Guess the right letters!", WIDTH / 2, HEIGHT - 50)
  }
}

