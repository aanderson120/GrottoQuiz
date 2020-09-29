//variables

var container = document.querySelector("#container");
var countdown = document.querySelector("#countdown");
var mainBits = document.querySelector("#mainBits");
var timer = document.querySelector("#goButton");
var questionDiv = document.querySelector("#questionDiv");
var options = document.createElement("ul");

var score = 0;
var questionIndex = 1;
var timeLimit = 60;
var secondsLeft = timeLimit;
var timerInterval = 0;
var penalty = 10;

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

//when the goButton is clicked the questions and timer starts

timer.addEventListener("click", function () {
    if (timerInterval === 0) {
        timerInterval = setInterval(function () {
            secondsLeft--;
            countdown.textContent = "Time: " + secondsLeft;

            if (secondsLeft <= 0) {
                clearInterval(timerInterval);
                allDone();
                countdown.textContent = "Too slow...";
            }
        }, 1000);
    }
    render(questionIndex);
});

function render(qIndex) {
    mainBits.innerHTML = "";
    options.innerHTML = "";
    // For loops to loop through all info in array
    for (i = 0; i < questions.length; i++) {
        // changes question title only
        var userQuestion = questions[qIndex].ask;
        var userChoices = questions[qIndex].choices;
        mainBits.textContent = userQuestion;
    }
    // New for each for question choices
    userChoices.forEach(function (newItem) {
        //create a li for choice array
        var listItem = document.createElement("li");
        listItem.textContent = newItem;
        mainBits.appendChild(options);
        options.appendChild(listItem);
        listItem.addEventListener("click", (compare));
        //when a choice is clicked compare it to the answer
    })
}

var createDiv = document.createElement("div");

//compare choice with the answer
function compare(event) {
    var element = event.target;

    if (element.matches("li")) {
        createDiv.setAttribute("id", "createDiv");

        if (element.textContent == questions[questionIndex].correct) {
            score ++;
            createDiv.textContent = "Onward!!"
        }

        //for wrong1, wrong2, wrong3, wrong4, and wrong5 user should go back to previous question -- but how? also -10seconds
        else if (element.textContent == questions[questionIndex].wrong1) {
            secondsLeft -= penalty;
            createDiv.textContent = "Try harder next time"
        }
        else if (element.textContent == questions[questionIndex].wrong2) {
            secondsLeft -= penalty;
            createDiv.textContent = "The dark, winding fissure proves too difficult to navigate. You quickly become stymied and frustrated."
        }
        else if (element.textContent == questions[questionIndex].wrong3) {
            secondsLeft -=penalty;
            createDiv.textContent = "The switchback leads you up and down a dark corridor, around a bend, and through a particularly confined tunnel. You are back at the entrance!"
        }
        else if (element.textContent == questions[questionIndex].wrong4) {
            secondsLeft -=penalty;
            createDiv.textContent = "Seemingly infinite rungs take you down, and down, and down. After an exausting while, you realize you need to retreat, least you get stuck down there forever..."
        }
        else if (element.textContent == questions[questionIndex].wrong5) {
            secondsLeft -=penalty;
            createDiv.textContent = "You came all this way to turn around?!"
        }

        //when user clicks 'home' button, game ends with 0 points
        else {
            secondsLeft = 0
            createDiv.textContent = "No...just no..."
        }
    }

    // when the quiz is complete they get a message that tells them their score
    questionIndex++;

    if (questionIndex >= questions.length) {
        allDone();
        createDiv.textContent = "You made it!!" + " You got " + score + "/" + questions.length + " Correct!";
    }
    else {
        render(questionIndex);
    }
    questionDiv.appendChild(createDiv);
}

function allDone() {
    disableButtons();
    clearInterval(timerInterval);

    countdown.innerHTML = "";

    //create heading
    var theEnd = document.createElement("h1");
    theEnd.setAttribute("id", "theEnd");
    theEnd.textContent = "You made it!"

    questionDiv.appendChild(theEnd);

    // Paragraph
    var createP = document.createElement("p");
    createP.setAttribute("id", "createP");
   

    //replaces time with score
    if (secondsLeft >=0) {
        var timeRemaining = timeLimit - secondsLeft;
        var createP2 = document.createElement("p");
        createP2.textContent = "You reached the goal in with " + secondsLeft + " seconds remaining";

        questionDiv.appendChild(createP2);
    }

    //user info
    var createInfo = document.createElement("info");
    createInfo.setAttribute("id", "createInfo");
    createInfo.textContent = "Enter your initials:";
    questionDiv.appendChild(createInfo);

    //inputs initals
    var createInput = document.createElement("input");
    createInput.setAttribute("type", "text");
    createInput.setAttribute("id", "initials");
    createInput.textContent = "";
    mainBits.appendChild(createInput);


    //submit
    var createSubmit = document.createElement("button");
    createSubmit.setAttribute("type", "submit");
    createSubmit.setAttribute("id", "submit");
    createSubmit.textContent = "submit";

    mainBits.appendChild(createSubmit);

    // Event listener to capture initials and local storage for initials and score
    createSubmit.addEventListener("click", function () {
        var initials = createInput.value;

        if (initials === null) {
            alert ("Enter a value");
            console.log("New Phone Who Dis>");

        } else {
            var finalScore = {
                initials: initials,
                score: timeRemaining
            }
            console.log(finalScore);
            var allScores = localStorage.getItem("allScores");
            if (allScores === null) {
                allScores = [];
            } else {
                allScores = JSON.parse(allScores);
            }
            allScores.push(finalScore);
            var newScore = JSON.stringify(allScores);
            localStorage.setItem("allScores", newScore);
            // Travels to final page
            window.location.replace("./HighScores.html");
        }
    });

}



function disableButtons() {
    var questionList = mainBits.getElementsByTagName("ul")[0];
    var questions = questionList.getElementsByTagName("li");
    for (var i = 0; i < questions.length; ++i) {
        questions[i].removeEventListener("click", (compare));
        questions[i].style.backgroundColor = "gray";
        questions[i].style.cursor = "default";
    }
}