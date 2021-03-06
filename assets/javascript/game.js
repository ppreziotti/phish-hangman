// GLOBAL VARIABLES
// ============================================================================================
var songs = ["Tweezer", "Fluffhead", "Wilson", "Maze", "Lizards", "Fly Famous Mockingbird", 
			"Chalk Dust Torture", "Fuego", "You Enjoy Myself", "Harry Hood", "Lawn Boy", 
			"Bathtub Gin", "Run Like an Antelope", "Split Open and Melt", "Golgi Apparatus",
			"Tweezer Reprise", "Down With Disease", "Prince Caspian", "Character Zero",
			"Theme From the Bottom", "Taste", "Free", "Weekapaug Groove", "Ghost"];
var wins = 0;
var randomSong;
var songDisplay;
var guessesRemaining;
var lettersGuessed;
var incorrectCount;

// FUNCTIONS
// ==========================================================================================
function newGame() {
	randomSong = songs[Math.floor(Math.random() * songs.length)].toUpperCase();
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
	var userGuess = String.fromCharCode(event.keyCode).toUpperCase();
	if (/^[A-Z ]+$/.test(userGuess)) {
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
				document.getElementById("letters-guessed").innerHTML = "Letters Guessed: " + lettersGuessed.join(", ");
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