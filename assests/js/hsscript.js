
//--------------------------------------------------------------------------------------------------------
//high score page
//--------------------------------------------------------------------------------------------------------

var highScore = document.querySelector("#highScore");
var clear = document.querySelector("#clear");
var home = document.querySelector("home");

// Clear scores when button is clicked
clear.addEventListener("click", function(){
   localStorage.clear();
   location.reload();
});

var allScores = localStorage.getItem("allScores");
allScores = Json.parse(allScores);

if (allScores !==null) {
   for (var i = 0; i <allScores.length; i++){
       var createLi = document.createElement("li");
       createLi.textContent = allScores[i].initials + " " + allScores[i].score;
       highScore.appendChild(createLi);
   }
}

//going home

home.addEventListener("click", function(){
   window.location.replace("./highscores.html ");
});