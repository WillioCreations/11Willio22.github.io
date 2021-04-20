var input = document.getElementById("input")
var output = document.getElementById("output")

input.addEventListener("keydown", function(e) {
	if (e.key == "Enter") {
    
    processUserInput(input.value)
		input.value = ""
    
  }
})

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

function processServerData(data) { 
	console.log(data)
}

function processUserInput(text) {
	if (text.startsWith("/")) {
  	
  } else {
  	send("msg",text)
  }
}
