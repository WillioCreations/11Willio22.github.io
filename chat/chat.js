var input = document.getElementById("input")
var output = document.getElementById("output")

input.addEventListener("keydown", function(e) {
	if (e.key == "Enter") {
    
    processUserInput(input.value)
		input.value = ""
    
  }
})

window.onbeforeunload = ()=>{
	 send("leave",username)
}

var activeOnServer = false

var baseURL = "https://ChatServer.williamratcliff.repl.co/"
function send(url, msg) {
	fetch (baseURL + url, {
    	body: msg,
      method: "POST",
      headers: {
      	"Content-Type":"text/plain"
      }
    })
  	.then(response => response.text())
    .then(data => processServerData(data))
    .catch(error => console.log("" + error))
  
}

let password = "williscool"
let username = "Willio"
var messageHistory = []

function write(data) {
	output.value += data + "\n"
}

setInterval(update,1000)

function update() {
	if (activeOnServer) send("retrieve",username)
}

function processServerData(data) { 
	let lines = data.split("\n")
  if (lines[0] == "Join") {
  	if (lines[1] == "Accepted") {
    	activeOnServer = true
      console.log("Successfully Joined.")
    } else if (lines[1] == "Denied") {
    	activeOnServer = false
      console.log("Denied Join by Server. Reason:\n" + lines[2])
    }
  } else if (lines[0] == "Leave") {
  	if (lines[1] == "Accepted") {
    	activeOnServer = false
      console.log("Successfully Left.")
    } else if (lines[1] == "Denied") {
      console.log("Denied Leave by Server. Reason:\n" + lines[2])
    }
  } else if (lines[0] == "Msg") {
  	if (lines[1] == "Accepted") {
    	activeOnServer = true
      console.log("Successfully Sent Message.")
    } else if (lines[1] == "Denied") {
      console.log("Denied Sending Message by Server. Reason:\n" + lines[2])
    }
  } else if (lines[0] == "Retrieve") {
  	if (lines[1] == "Accepted") {
    	//console.log("Successfully Retrieved Messages!")
      if (lines[2] != "None") {
        let messages = lines[2].split("/:/")
				messages = messages.slice(0,messages.length - 1)
        for (let msg of messages) {
          messageHistory.push(msg)
          write(msg)
        }
      }
    } else {
    	console.log("Denied Retrieving Message. Reason:\n" + lines[2])
    }
  }
}

function processUserInput(text) {
	if (text.startsWith("/")) {
  	if (text.startsWith("/leave")) {
    	send("leave",username)
    } else if (text.startsWith("/join")) {
			send("join", text.split(" ")[1] + "\n" + password)
      username = text.split(" ")[1]
  	}
  } else {
  	send("msg",username + "\n" + text)
  } 
}
