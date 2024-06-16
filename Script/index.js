import { words } from "./wordsList.js";

let hangman = [
  "potence.png",
  "potencehead.png",
  "potencearm1.png",
  "ipotencearm2.png",
  "potencebody.png",
  "potenceleg1.png",
  "potenceleg2.png",
];
//let arrWord = [];
let gameOn = false;

let win = false;
let lose = false;
let losePoint = 0;
document.getElementById("game").hidden = true;
document.getElementById("inputletter").hidden = true;
document.getElementById("newGSection").hidden = false;
let arrWord = [];
let letterSubmit = "";
//lose point + fail check

function loseCondition(losePoint) {
  if (losePoint == 6) {
    lose = true;
  }
}

// check letter

function letterCheck() {
  let l = 0;
  for (let i = 0; i < arrWord.length; i++) {
    if (letterSubmit == arrWord[i]) {
      l = 0;
      break;
    }
    l = 1;
  }
  losePoint += l;
}

//add html space for the word

// change letter base html

function changeBaseHtml() {
  for (let i = 0; i < arrWord.length; i++) {
    if (letterSubmit == arrWord[i]) {
      let b = "letterPose" + i;
      console.log(b);
      document.getElementById(b).innerHTML = letterSubmit;
    }
  }
}

//hangman image change

function imageChange() {
  let imageLose = hangman[losePoint];
  document.getElementById("hangman").src = "images/" + imageLose;
}

// new game
document.getElementById("newGame").addEventListener("click", function () {
  //show not show
  document.getElementById("game").hidden = false;
  document.getElementById("inputletter").hidden = false;
  document.getElementById("newGSection").hidden = true;

  win = false;
  lose = false;
  losePoint = 0;

  //select random word from list

  let numberWordSelect = Math.floor(Math.random() * 2999);
  let worldSelect = words[numberWordSelect];
  arrWord = worldSelect.split("");
  console.log(worldSelect);
  console.log(arrWord);

  //create all boxes

  function wordBaseHtml() {
    let a = "";
    for (let i = 0; i < arrWord.length; i++) {
      a += '<p class="lettershow" id="letterPose' + i + '" ></p>';
    }
    document.getElementById("guessword").innerHTML = a;
  }

  wordBaseHtml();
});

//input game

document.getElementById("run").addEventListener("click", function () {
  letterSubmit = document.getElementById("text1");
  console.log(letterSubmit);
});
