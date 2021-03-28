var canvas = document.getElementById("canvas")
WIDTH = canvas.width = 1920
HEIGHT = canvas.height = 1080
canvas.style.width = "100vw"
canvas.style.height = "calc(100vw * 9 / 16)"

var ctx = canvas.getContext("2d")

//Images
var imagesToLoad = 0
var loadedImages = 0

//Game Info
var score = 0
var numQuestions = 0

//Classes
class State {
  constructor() {
    this.entities = []
  }
  add(entity) {
    this.entities.push(entity)
    entity.state = this;
  }
  drawBackground() {

    for (let i = 0; i < this.entities.length; i++) {
      this.entities[i].update()
      this.entities[i].draw()
    }

  }
  update() {

  }
  draw() {

  }
}



class Entity {
  constructor(name, x, y, w, h, color, shape = [
    [0, 0],
    [1, 0],
    [1, 1],
    [0, 1],
    [0, 0]
  ]) {
    this.name = name

    this.x = x
    this.y = y
    this.w = w
    this.h = h
    this.color = color

    this.shape = shape

    this.rotation = 0

    this.ox = 0.5
    this.oy = 0.5

  }

  setShape(shape) {
    this.shape = shape
  }

  update() {

  }

  draw() {
    ctx.fillStyle = this.color
    rotate(this.x + this.ox * this.w, this.y + this.oy * this.h, this.rotation)
    drawShape(this.shape, this.x, this.y, this.w, this.h)
    rotate(this.x + this.ox * this.w, this.y + this.oy * this.h, -this.rotation)
  }

}

class Sun extends Entity {
  constructor(r, r2) {
    super(0, 0, r, r)
    this.r = r
    this.r2 = r2
  }
  update() {
    this.x = -Math.cos(this.state.time / this.state.maxTime * Math.PI * 2 - Math.PI / 2) * this.r2 + WIDTH / 2
    this.y = -Math.sin((this.state.time / this.state.maxTime) * Math.PI * 2 - Math.PI / 2) * this.r2 + HEIGHT
  }
  draw() {
    ctx.fillStyle = "#E39444"
    ctx.beginPath()
    ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2)
    ctx.fill()
  }
}

class Moon extends Entity {
  constructor(r, r2) {
    super(0, 0, r, r)
    this.r = r
    this.r2 = r2
  }
  update() {
    this.x = -Math.cos(this.state.time / this.state.maxTime * Math.PI * 2 + Math.PI / 2) * this.r2 + WIDTH / 2
    this.y = -Math.sin((this.state.time / this.state.maxTime) * Math.PI * 2 + Math.PI / 2) * this.r2 + HEIGHT
  }
  draw() {
    ctx.fillStyle = "#CFCFCF"
    ctx.beginPath()
    ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2)
    ctx.fill()
  }
}

class Question {
  constructor(question, answers, correct, image) {
    this.question = question
    this.answers = answers
    this.correct = correct
    this.image = image
  }
}

class MainState extends State {
  constructor() {
    super()
    this.time = 250
    this.maxTime = 1000

    this.stars = []
    for (let i = 0; i < parseInt(Math.random() * 100); i++) {
      this.stars[i] = [Math.random() * WIDTH, Math.random() * HEIGHT - 400, parseInt(Math.random() * 10)]
    }

    this.add(new Sun(100, 700))
    this.add(new Moon(75, 700))

    let grass = [
      [0, 0]
    ]
    let points = parseInt(Math.random() * 30) + 5

    for (let i = 1; i < points; i++) {
      //Jesus Christ Heaven Good Protect
      grass.push([i / points, Math.random() / 10])
    }

    grass.push([1, 0], [1, 1], [0, 1])

    this.add(new Entity("Grass", 0, HEIGHT - 400, WIDTH, 400, "#37C737", grass))

    this.questions = [new Question("What's up?", ["Not much", "I'm good!"], [1]), new Question("How you?", ["Meh.", "I'm good!", "Fine.", "I want candy!"], [1])]
    numQuestions = this.questions.length
    this.question = 0
    this.highlighted = 0
    this.state = 0
  }
  mouseClick(button) {
    if (button == 0) {
      if (this.state == 0) {

        if (this.highlighted >= 0 && this.highlighted < this.questions[this.question].answers.length) {
          if (this.questions[this.question].correct.includes(this.highlighted)) {
            score++
          }
          this.state = 1
        }
      } else {
        if ((mx >= WIDTH - 300 && mx <= WIDTH - 10 && my >= HEIGHT - 200 && my <= HEIGHT - 10)) {
          this.question++
          if (this.question >= numQuestions) {
            state = 1
          }
          this.state = 0
        }
      }
    }
  }
  getTimeColor() {
    let c = 2
    let t = Math.PI * this.time / this.maxTime
    let b = parseInt(Math.sin(t) * 255)
    let r = parseInt((Math.sin(t) ** c) * 200)
    let g = parseInt((Math.sin(t) ** c) * 200)

    let r2 = r.toString(16)
    let g2 = g.toString(16)
    let b2 = b.toString(16)

    return "#" + (r2.length > 1 ? r2 : "0" + r2) + (g2.length > 1 ? g2 : "0" + g2) + (b2.length > 1 ? b2 : "0" + b2)
  }
  drawBackground() {
    this.time += 0.1
    if (this.time >= this.maxTime) this.time = 0
    ctx.fillStyle = this.getTimeColor()
    ctx.fillRect(0, 0, WIDTH, HEIGHT)

    let s = Math.abs(255 - parseInt(Math.sin(Math.PI * this.time / this.maxTime) * 255)).toString(16)
    let star = "#FFFFFF" + (s.length > 1 ? s : "0" + s)

    ctx.fillStyle = star
    for (let i = 0; i < this.stars.length; i++) {
      ctx.beginPath()
      ctx.fillRect(this.stars[i][0], this.stars[i][1], this.stars[i][2], this.stars[i][2])
      ctx.fill()

    }

    super.drawBackground()

  }
  update() {
    if (this.state == 0) {
      this.highlighted = -1
      for (let i = 0; i < 4; i++) {
        if (mx >= WIDTH * 0.1 + (i % 2) * WIDTH * 0.41 && mx <= WIDTH * 0.1 + (i % 2) * WIDTH * 0.41 + WIDTH * 0.39) {
          if (my >= HEIGHT * 0.54 + parseInt(i / 2) * HEIGHT * 0.22 && my <= HEIGHT * 0.54 + parseInt(i / 2) * HEIGHT * 0.22 + HEIGHT * 0.20) {
            this.highlighted = i
          }
        }
      }
    }
  }
  draw() { //Jesus Christ Heaven Good Protect

    ctx.fillStyle = "#F1F1F17F"
    roundRect(WIDTH * 0.1, HEIGHT * 0.1, WIDTH * 0.8, HEIGHT * 0.4, 50)
    for (let i = 0; i < this.questions[this.question].answers.length; i++) {
    	
      if (this.state != 0)
        ctx.fillStyle = (this.questions[this.question].correct.includes(i) ? "#57F157" : (this.highlighted == i ? "#F15757" : "#575757"))

      else
        ctx.fillStyle = answerColors[i] + (i == this.highlighted ? "F0" : "92")
      let x = WIDTH * 0.1 + (i % 2) * WIDTH * 0.41
      let y = HEIGHT * 0.54 + parseInt(i / 2) * HEIGHT * 0.22
      roundRect(x, y, WIDTH * 0.39, HEIGHT * 0.20, 50)


      //let px = Math.min((WIDTH * 1 / this.questions[this.question].answers[i].length), HEIGHT * 0.1)
	  let px = Math.max(100 - this.questions[this.question].answers[i].length,50)

      ctx.fillStyle = "#F1F1F1"
      drawText(this.questions[this.question].answers[i], x + 30, y + px + 10, parseInt(WIDTH * 0.71 / px), px, "Comic Sans MS")
    }

    ctx.fillStyle = "#373737"
    drawText("#" + (this.question + 1) + " " + this.questions[this.question].question, WIDTH * 0.1 + 50, HEIGHT * 0.1 + 100, 57, 50, "Comic Sans MS")

    if (this.state == 1) {
      ctx.fillStyle = (mx >= WIDTH - 300 && mx <= WIDTH - 10 && my >= HEIGHT - 200 && my <= HEIGHT - 10) ? "#F1F1F17F" : "#F1F1F170"
      roundRect(WIDTH - 300, HEIGHT - 200, 290, 190, 20)
      ctx.fillStyle = "#373737"
      drawText("NEXT", WIDTH - 250, HEIGHT - 75, 20, 70, "Comic Sans MS")
    }

  }
}

class EndState extends State {
  constructor() {
    super()
  }
  drawBackground() {
    ctx.fillStyle = "#F7F7F7"
    ctx.fillRect(0, 0, WIDTH, HEIGHT)
    super.drawBackground()
  }
  mouseClick(button) {
    if (button == 0) {
      if (mx >= WIDTH / 2 - 800 && mx <= WIDTH / 2 - 100 && my >= HEIGHT - 300 && my <= HEIGHT - 100) {
        state = 0
        states[0].question = 0
        score = 0
      }
      if (mx >= WIDTH / 2 + 100 && mx <= WIDTH / 2 + 800 && my >= HEIGHT - 300 && my <= HEIGHT - 100) {
        state = 2
        states[0].question = 0
        score = 0
      }
    }
  }
  update() {

  }
  draw() {
  	
    ctx.fillStyle = "#373737"
    ctx.font = "100px Comic Sans MS"
    ctx.textAlign = "center"
    ctx.fillText("THE END!", WIDTH / 2, HEIGHT / 2)
    ctx.fillText(score + "/" + numQuestions + " (" + (score / numQuestions * 100) + "%)", WIDTH / 2, HEIGHT / 2 + 100)

    ctx.fillStyle = "#F14747"
    roundRect(WIDTH / 2 - 800, HEIGHT - 300, 700, 200, 10)
    ctx.fillStyle = "#F1F1F1"
    ctx.fillText("RETRY", WIDTH / 2 - 450, HEIGHT - 170)
    
    ctx.fillStyle = "#47F147"
    roundRect(WIDTH / 2 + 100, HEIGHT - 300, 700, 200, 10)
    ctx.fillStyle = "#F1F1F1"
    ctx.fillText("HOME", WIDTH / 2 + 450, HEIGHT - 170)
    ctx.textAlign = "left"
  }
}

class PickState extends State {
  constructor() {
    super()
    this.lists = [
      ["Fine Arts (VISUAL)", "https://11willio22.github.io/academicsuperbowl/finearts/visual.txt"],
      ["Fine Arts (MUSIC)", "https://11willio22.github.io/academicsuperbowl/finearts/music.txt"]
    ]
  }
  mouseClick() {
    let selection = Math.min(parseInt((my - 100) / 155), this.lists.length - 1)
    state = 0
    read(this.lists[selection][1], function(text) {
    	states[state].questions = parseQuestionData(text)
    })
  }
  update() {}
  draw() {
  	ctx.clearRect(0,0,WIDTH,HEIGHT)
    ctx.font = "100px Comic Sans MS"
    for (let i = 0; i < this.lists.length; i++) {
      ctx.fillStyle = (my >= 100 + i * 155 && my <= 200 + i * 155) ? "#5757F7" : "#575757"
      ctx.fillText(this.lists[i][0], 100, 200 + i * 155)
    }
  }
}

var alphabet = "abcdefghijklmnopqrstuvwxyz".toUpperCase()
function parseQuestionData(d) {
	let data = d.replaceAll("\r","").replaceAll("‚Äú","").replaceAll("‚Äù","").replaceAll("‚Äù","").replaceAll("	","").replaceAll("‚Äô","'")
	console.log(data.search("‚Äú"))
  let questions = []
	let lines = data.split("\n")
  let question = 0
  numQuestions = 0
  for (let i = 0; i < lines.length; i++) {
  	let pointSplit = lines[i].split(".")
  	if (lines[i].startsWith("SD-")) {
      if (question != 0) {
      	questions.push(question)
        numQuestions++
      }
      question = new Question(lines[i + 1],[],[])
      i++
  	} else if (alphabet.includes(lines[i].substring(0,1)) && lines[i].substring(0,1) != "") {
    	if (question.answers != undefined && question != undefined) 
      	question.answers.push(lines[i].substring(2))
    } else if (!isNaN(parseInt(pointSplit[0])) && pointSplit.length > 1) {
    	let index = parseInt(pointSplit[0]) - 1
      pointSplit[1] = pointSplit[1].replaceAll(" ","")
      if (index < questions.length) {
           
     		questions[index].correct.push(alphabet.indexOf(pointSplit[1]))
      }
    }
  }
  questions.push(question)
  numQuestions++
  return randomizeArray(questions)
}

console.log("e,Äù,Äù ,Äé".replaceAll(",Äù","-").replaceAll(",Äé","-"))

function randomizeArray(arr) {
	return arr
}

function read(url, f) {
  fetch(url)
    .then(r => r.text())
    .then(t => f(t))
}

var answerColors = ["#F15757", "#5757F7", "#57F757", "#F7C757"]

//Game Variables
var states = [new MainState(), new EndState(), new PickState()]
var state = 2

var mx = 0
var my = 0

canvas.addEventListener("mousemove", function(e) {
  let b = canvas.getBoundingClientRect()
  mx = (e.clientX - b.left) / (b.right - b.left) * WIDTH
  my = (e.clientY - b.top) / (b.bottom - b.top) * HEIGHT
})

canvas.addEventListener("mousedown", function(e) {

  states[state].mouseClick(e.button)

})

setInterval(draw, 16)

function drawShape(shape, x, y, w, h) {
  ctx.beginPath()
  ctx.moveTo(shape[0][0] * w + x, shape[0][1] * h + y)
  for (let i = 1; i < shape.length; i++) {
    ctx.lineTo(shape[i][0] * w + x, shape[i][1] * h + y)
  }
  ctx.fill()
}

function drawText(text, x, y, w, fontSize, font) {
  ctx.font = fontSize + "px " + font
  let split = []
  let i = 0
  while (i < text.length) {
  	//let j = text.lastIndexOf(" ")
		let m = Math.min(i + w, text.length)
    split.push(text.substring(i, m))
    i += m
  }
  for (let i = 0; i < split.length; i++) {
    ctx.fillText(split[i], x, y + i * fontSize)

  }
}

function roundRect(x, y, w, h, r) {
  ctx.beginPath()
  ctx.moveTo(x + r, y)
  ctx.lineTo(x + w - r, y)
  ctx.arcTo(x + w, y, x + w, y + r, r)
  ctx.lineTo(x + w, y - r)
  ctx.arcTo(x + w, y + h, x + w - r, y + h, r)
  ctx.lineTo(x + r, y + h)
  ctx.arcTo(x, y + h, x, y + h - r, r)
  ctx.lineTo(x, y + r)
  ctx.arcTo(x, y, x + r, y, r)
  ctx.fill()
}

function rotate(ox, oy, degrees) {
  ctx.translate(ox, oy)
  ctx.rotate(degrees * Math.PI / 180)
  ctx.translate(-ox, -oy)
}

function draw() {
  states[state].drawBackground()
  states[state].update()
  states[state].draw()
}
