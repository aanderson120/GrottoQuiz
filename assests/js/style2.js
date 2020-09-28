var questions = [
    {
        ask: "There is a barricade over the cave entrance that you have to breakthrough. How handy are you?",
        choices: ["I break all the things, then I fix all the things", "Are we talking about Ikea, because I level 10 handy at Ikea", "I mean I can change a lightbulb"],
        correct: "I break all the things, then I fix all the things",
        wrong1: "Are we talking about Ikea, because I level 10 handy at Ikea",
        home: "I mean I can change a lightbulb"
    },
    {
        ask: "Being the ever intrepid explorer you are, you set out to spelunk the cave. There are two pathways. The narrower of the two is a bit stalac-tight, but you stalag-might fit if you squeeze. Do you...",
        choices: ["Take the narrow path", "Take the wide path", "Spelunking-Gross!!"],
        correct: "Take the wide path",
        wrong2: "Take the narrow path",
        home: "Spelunking-Gross"
    },
    {
        ask: "No Need to try something dangerous! You creep down the main branch and spy thorugh the dim remaining light a switchback headed gradually up, and a rickey lader down. Do you...",
        choices: ["Take Switchback", "Climb Ladder", "Wait for someone else to come and see what they do"],
        correct: "Climb Ladder",
        wrong3: "Take Switchback",
        home: "Wait for someone else to come and see what they do"
    },
    {
        ask: "You carefully plunge into a black abyss, groping your way along splintery rungs. After a long descent, a faint azure light starts to fill the expanse below. You can step off onto a dim mossy precipce or continue into the blue. Do you...",
        choices: ["Step onto the ledge", "Keep climbing", "Sit down and rest because you deserve it"],
        correct: "Step onto the ledge",
        wrong4: "Keep climbing",
        home: "Sit down and rest because you deserve it"
    },
    {
        ask: "A soft mossy path leads you effortlessly onward, until you spy the entranceway to a beautiful grotto. Do you...",
        choices: ["Travel to the Forgotten Grotto", "Return to the cave enterance", "Run! For all you know the swap monster could be waiting for you"],
        correct: "Travel to the Forgotten Grotto",
        wrong5: "Return to the cave enterance",
        home: "Run! For all you know the swap monster could be waiting for you"
    },
];

var score = 0;
var questionIndex = 0;

var currentTime = document.querySelector("#currentTime");
var timer = document.querySelector("#startTime");
var questionsDiv = document.querySelector("#questionsDiv");
var wrapper = document.querySelector("#wrapper");

var secondsLeft = 60;
var timerInterval = 0;
var penalty = 10;

var ulCreate = document.createElement("ul");
var createDiv = document.createElement("div");

// Triggers timer on button, shows user a display on the screen
timer.addEventListener("click", function () {
    // We are checking zero because its originally set to zero
    if (timerInterval === 0) {
        timer = setInterval(function () {
            secondsLeft--;
            currentTime.textContent = "Time: " + secondsLeft;

            if (secondsLeft <= 0) {
                clearInterval(timerInterval);
                allDone();
                currentTime.textContent = "Time's up!";
            }
        }, 1000);
    }
    render();
});

var userQuestion = questions[questionIndex].title;
var userChoices = questions[questionIndex].choices;

function render(questionIndex) {
    // Clears existing data 
    questionsDiv.innerHTML = "";
    ulCreate.innerHTML = "";
    // For loops to loop through all info in array
    for (i = 0; i < questions.length; i++) {
        // Appends question title only
        questionsDiv.textContent = userQuestion;
    }
    // New for each for question choices
    userChoices.forEach(function (newItem) {
        var listItem = document.createElement("li");
        listItem.textContent = newItem;
        questionsDiv.appendChild(ulCreate);
        ulCreate.appendChild(listItem);
        listItem.addEventListener("click", (compare));
    })
}

//compare choice with the answer
function compare(event) {
    var element = event.target;

    if (element.matches("li")) {
        createDiv.setAttribute("id", "createDiv");

        if (element.textContent == questions[questionIndex].correct) {
            score ++;
            createDiv.textContent = "Onward!!"
        }
        if (element.textContent == questions[questionIndex].wrong1) {
            secondsLeft = secondsLeft - penalty;
            createDiv.textContent = "Try harder next time"
        }
        if (element.textContent == questions[questionIndex].wrong2) {
            secondsLeft = secondsLeft - penalty;
            createDiv.textContent = "The dark, winding fissure proves too difficult to navigate. You quickly become stymied and frustrated."
        }
        if (element.textContent == questions[questionIndex].wrong3) {
            secondsLeft = secondsLeft - penalty;
            createDiv.textContent = "The switchback leads you up and down a dark corridor, around a bend, and through a particularly confined tunnel. You are back at the entrance!"
        }
        if (element.textContent == questions[questionIndex].wrong4) {
            secondsLeft = secondsLeft - penalty;
            createDiv.textContent = "Seemingly infinite rungs take you down, and down, and down. After an exausting while, you realize you need to retreat, least you get stuck down there forever..."
        }
        if (element.textContent == questions[questionIndex].wrong5) {
            secondsLeft = secondsLeft - penalty;
            createDiv.textContent = "You came all this way to turn around?!"
        }
        else {
            secondsLeft = 0
            createDiv.textContent = "No...just no..."
        }
    }

    questionIndex++;

    if (questionIndex >= questions.length) {
        allDone();
        createDiv.textContent = "You made it!!" + "You got" + score + "/";
    }
    else {
        render ();
    }
    questionDiv.appendChild(createDiv);
}

function allDone() {
    questionDiv.innerHTML = "";
    currentTime.innerHTML = "";

    //create heading
    var createH1 = document.createElement("h1");
    createH1.setAttribute("id", "createH1");
    createH1.textContent = "All Done!"

    questionDiv.appendChild(createH1);

    //replaces time with score
    if (secondsLeft >=0) {
        var timeRemaining = secondsLeft;
        var createP2 = document.createElement("p");
        clearInterval(holdInterval);
        createP2.textContent = "Your final score is:" + timeRemaining;

        questionDiv.appendChild(createP2);
    }

    //user info
    var createInfo = document.createElement("info");
    createInfo.setAttribute("id", "createInfo");
    createInfo.textContent = "Enter your initials:";

    questionDiv.appendChild(createInfo);

    //submit

    var createSubmit = document.createElement("button");
    createSubmit.setAttribute("type", "submit");
    createSubmit.setAttribute("id", "submit");
    createSubmit.textContent = "submit";

    questionDiv.appendChild(createSubmit);

    if (initials === null) {
        console.log("new phone who dis");
    }
    else{
        var finalScore = {
            initials: initials,
            score: timeRemaining
        }
        console.log(finalScore);
        allScores = localStorage.getItem("allScores")
        if (allScores === null) {
            allScores = [];
        }
        else {
            allScores = JSON.parse(allScores);
        }
        allScores.push(finalScore);
        var newScore = JSON.stringify(allScores);
        localStorage.setItem ("allScores", newScore);

        window.location.replace("./highscores.html ");
    }
}

// Declared variables
var highScore = document.querySelector("#highScore");
var clear = document.querySelector("#clear");
var goBack = document.querySelector("#goBack");

// Event listener to clear scores 
// clear.addEventListener("click", function () {
//     localStorage.clear();
//     location.reload();
// });
// Retreives local stroage 
var allScores = localStorage.getItem("allScores");
allScores = JSON.parse(allScores);

if (allScores !== null) {

    for (var i = 0; i < allScores.length; i++) {

        var createLi = document.createElement("li");
        createLi.textContent = allScores[i].initials + " " + allScores[i].score;
        highScore.appendChild(createLi);

    }
}
// Event listener to move to index page
// goBack.addEventListener("click", function () {
//     window.location.replace("./index.html");
// });