const leftPlayer = document.getElementById("leftPlayer");
const rightPlayer = document.getElementById("rightPlayer");
const leftText = document.getElementById("leftText");
const rightText = document.getElementById("rightText");
const winnerText = document.getElementById("winnerText");

let endGameBox = document.getElementsByClassName("endGameBox");
endGameBox = Object.values(endGameBox);

let cards = document.getElementsByClassName("card");
cards = Object.values(cards);

//#region $Audio
const backgroundAudio = new Audio();
backgroundAudio.src = 'audio/Beethoven - Für Elise (Piano Version).mp3';

const correctAudio = new Audio();
correctAudio.src = 'audio/Correct.mp3';

const endGameAudio = new Audio();
endGameAudio.src = 'audio/end game.mp3';
//#endregion

let flips, cardsColors, colors, cardsRemove, turn, score;

window.onload = setUpGame();
function setUpGame() {
    setUpVariables();
    setUpScore();
    removeEndGameBox();
    chooseCardsColors();
    setUpBackgroundPlayer();
    setUpStyle();
}

function setUpScore() {
    leftText.innerHTML = `score: ${score.left}`;
    rightText.innerHTML = `score: ${score.right}`;
}

function setUpStyle() {
    cards.forEach((oneCard) => {
        oneCard.style.background = "rgb(130, 130, 130)";
        oneCard.style.border = "2px solid black";
    });
}

function removeEndGameBox() {
    endGameBox.forEach((oneBox) => {
        oneBox.style.display = "none";
    });
}

function setUpVariables() {
    cardsColors = [];
    flips = [];
    cardsRemove = [];
    colors = [
        "green",
        "red",
        "orange",
        "blue",
        "purple",
        "pink",
        "tomato",
        "yellowgreen",
        "teal",
        "aqua",
        "green",
        "red",
        "orange",
        "blue",
        "purple",
        "pink",
        "tomato",
        "yellowgreen",
        "teal",
        "aqua",
    ];
    score = {
        left: 0,
        right: 0,
    };
    turn = "right";
}

function chooseCardsColors() {
    for (let i = 0; i < 20; i++) {
        let oneColor = Math.floor(Math.random() * colors.length);
        cardsColors.push(colors[oneColor]);
        removeColor(oneColor);
    }
}

function removeColor(index) {
    colors.splice(index, 1);
}

function flipCard(index) {
    backgroundAudio.volume = 0.3;
    backgroundAudio.play();
    let outOfGame = false;
    if (flips.length < 2 && index !== flips[0]) {
        for (let oneCardRemove of cardsRemove) {
            if (oneCardRemove === index) {
                outOfGame = true;
                break;
            }
        }
        if (outOfGame === false) {
            cards[index].style.background = cardsColors[index];
            flips.push(index);
        }
    }
    if (flips.length === 2) {
        setTimeout(checkAnswer, 1000);
    }
}

function checkAnswer() {
    if (cards[flips[0]].style.background === cards[flips[1]].style.background) {
        removeCard();
        setScore();
    } else {
        cards[flips[0]].style.background = "rgb(130, 130, 130)";
        cards[flips[1]].style.background = "rgb(130, 130, 130)";
        changeTurn();
        setUpBackgroundPlayer();
    }
    flips = [];
    if (cardsRemove.length === 20) {
        endGame();
    }
}

function removeCard() {
    correctAudio.play();
    cardsRemove.push(flips[0]);
    cardsRemove.push(flips[1]);
    cards[flips[0]].style.background = "skyblue";
    cards[flips[1]].style.background = "skyblue";
    cards[flips[0]].style.border = "0px solid black";
    cards[flips[1]].style.border = "0px solid black";
}

function setScore() {
    if (turn === "left") {
        score.left++;
        leftText.innerHTML = `score: ${score.left}`;
    } else {
        score.right++;
        rightText.innerHTML = `score: ${score.right}`;
    }
}

function changeTurn() {
    if (turn === "left") {
        turn = "right";
    } else {
        turn = "left";
    }
}

function setUpBackgroundPlayer() {
    if (turn === "left") {
        leftPlayer.style.background = "linear-gradient(gold, white)";
        rightPlayer.style.background = "rgb(46, 46, 46)";
    } else {
        rightPlayer.style.background = "linear-gradient(gold, white)";
        leftPlayer.style.background = "rgb(46, 46, 46)";
    }
}

function endGame() {
    endGameAudio.play();
    playAgain();
}

function playAgain() {
    endGameBox.forEach((oneBox) => {
        oneBox.style.display = "inline-block";
    });
}

/**
 * ךעבוד על הגרפיקה של הסוף
 * צלילים
 */
