
//--------------------------------------------------------------------------------------------------------
//high score page
//--------------------------------------------------------------------------------------------------------

var highScore = document.querySelector("#highScore");
var clear = document.querySelector("#clear");
var home = document.querySelector("#home");

// Clear scores when button is clicked
clear.addEventListener("click", function () {
    localStorage.clear();
    location.reload();
});

//going home
home.addEventListener("click", function () {
    window.location.replace("./index.html ");
});

var allScores = localStorage.getItem("allScores");
var scores = JSON.parse(allScores);
console.log(scores);

//creates a the high score list
if (scores !== null) {
    //table object
    var createTable = document.createElement("table");

    //table header row
    var createTR_Header = document.createElement("tr");
    var createTH_1 = document.createElement("th"); createTH_1.textContent = "Initials";
    var createTH_2 = document.createElement("th"); createTH_2.textContent = "Score";
    var createTH_3 = document.createElement("th"); createTH_3.textContent = "Time";
    createTR_Header.appendChild(createTH_1);
    createTR_Header.appendChild(createTH_2);
    createTR_Header.appendChild(createTH_3);
    createTable.appendChild(createTR_Header);

    //score rows
    for (var i = 0; i < scores.length; i++) {
        var createTR_Row = document.createElement("tr");
        var createTD_1 = document.createElement("td"); createTD_1.textContent = scores[i].initials;
        var createTD_2 = document.createElement("td"); createTD_2.textContent = scores[i].score + '/' + scores[i].questions;
        var createTD_3 = document.createElement("td");
        if (scores[i].secondsLeft >= 0) {
            createTD_3.textContent = scores[i].secondsLeft + ' seconds';
        }
        else {
            createTD_3.textContent = 'DNF';
        }
        createTR_Row.appendChild(createTD_1);
        createTR_Row.appendChild(createTD_2);
        createTR_Row.appendChild(createTD_3);
        createTable.appendChild(createTR_Row);
    }
    highScore.appendChild(createTable);
} else {
    //display if no high scores yet...
    var createP = document.createElement("p");
    createP.textContent = "No High Scores Yet";
    highScore.appendChild(createP);
}