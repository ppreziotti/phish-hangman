// GLOBAL VARIABLES
// ============================================================================================
var songs = ["tweezer", "fluffhead", "wilson", "maze", "lizards", "fly famous mockingbird", 
			"chalk dust torture", "fuego", "you enjoy myself", "harry hood", "lawn boy", 
			"bathtub gin", "run like an antelope", "split open and melt", "golgi apparatus",
			"tweezer reprise", "down with disease", "prince caspian", "character zero",
			"theme from the bottom", "taste", "free", "weekapaug groove", "ghost"];
var wins = 0;
var randomSong;
var songDisplay;
var guessesRemaining;
var lettersGuessed;
var incorrectCount;

// FUNCTIONS
// ==========================================================================================
function newGame() {
	randomSong = songs[Math.floor(Math.random() * songs.length)];
	guessesRemaining = 6;
	lettersGuessed = [];
	songDisplay = [];
	incorrectCount = 0;
	for (var i = 0; i < randomSong.length; i++) {
		if (randomSong[i] === " ") {
			songDisplay[i] = " ";
		}
		else {
			songDisplay[i] = "_";
		}
	}
	document.getElementById("word-display").innerHTML = songDisplay.join("");
	document.getElementById("guesses-remaining").innerHTML = "Guesses Remaining: " + guessesRemaining;
	document.getElementById("letters-guessed").innerHTML = "Letters Guessed: " + lettersGuessed;
	// startCanvas();
}

// function startCanvas() {
// 	var canvas = document.getElementById("hangman");
// 	if (canvas.getContext) {
// 		var ctx = canvas.getContext("2d");
// 		ctx.beginPath();
// 		ctx.moveTo(450, 225);
//    		ctx.lineTo(450, 0);
//     	ctx.lineTo(225, 0);
//     	ctx.lineTo(225, 45);
//     	ctx.stroke();
//     	ctx.closePath();
//     }
// }

// Need to add cases to switch statement for each iteration of incorrectCount
// function draw() {
// 	var canvas = document.getElementById("hangman");
// 	if (canvas.getContext) {
// 		var ctx = canvas.getContext("2d");

// 		switch(incorrectCount) {
// 			case 1:

// 			break;

// 			case 2:

// 			break;

// 			case 3: 

// 			break;

// 			case 4:

// 			break;

// 			case 5:

// 			break;

// 			case 6:

// 		}
// 	}
// }

function winGame() {
	wins++;
	document.getElementById("win-count").innerHTML = "Wins: " + wins;
	alert("CONGRATULATIONS! You guessed the song correctly! Press OK to play again");
	newGame();
}

function loseGame() {
	alert("You ran out of guesses. The song was " + randomSong + ". Press OK to try again");
	newGame();
}

// MAIN PROCESS
// ===================================================================================

newGame();

document.onkeyup = function() {
	var userGuess = String.fromCharCode(event.keyCode).toLowerCase();
	if (/^[a-z ]+$/.test(userGuess)) {
		for (i = 0; i < randomSong.length; i++) {
			if (randomSong[i] === userGuess) {
				songDisplay[i] = userGuess;
				document.getElementById("word-display").innerHTML = songDisplay.join("");
			}
			if (randomSong.indexOf(userGuess) === -1 && lettersGuessed.indexOf(userGuess) === -1) {
				guessesRemaining--;
				incorrectCount++;
				lettersGuessed.push(userGuess);
				document.getElementById("guesses-remaining").innerHTML = "Guesses Remaining: " + guessesRemaining;
				document.getElementById("letters-guessed").innerHTML = "Letters Guessed: " + lettersGuessed.join(",");
			}
		}
	}
	if (songDisplay.indexOf("_") === -1) {
		setTimeout(winGame, 100);
	}
	else if (guessesRemaining === 0) {
		setTimeout(loseGame, 100);
	}
}