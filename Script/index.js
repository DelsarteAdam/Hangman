import { words } from "./wordsList.js";

let hangman = [
  "potence.png",
  "potencehead.png",
  "potencearm1.png",
  "potencearm2.png",
  "potencebody.png",
  "potenceleg1.png",
  "potenceleg2.png",
];

//----------------------------------

let win = 0;
let lose = 0;
let losePoint = 0;
document.getElementById("game").hidden = true;
document.getElementById("inputletter").hidden = true;
document.getElementById("newGSection").hidden = false;
document.getElementById("win").hidden = true;
document.getElementById("lose").hidden = true;

let arrWord = [];
let letterSubmit = "";
//letter memory :

let letterMemory = [];
let helpbtn = false;
let helpbtn2 = false;
let arrHelp = ["e", "a", "r", "i", "o"];
let letterChose = [];

function createArrLetterMemory() {
  for (let i = 0; i < arrWord.length; i++) {
    letterMemory.push("");
  }
  console.log(letterMemory);
}

//add letter help
function letterHelp() {
  for (let a = 0; a < arrHelp.length; a++) {
    for (let i = 0; i < arrWord.length; i++) {
      if (arrHelp[a] == arrWord[i]) {
        var b = "letterPose" + i;
        console.log(b);
        document.getElementById(b).innerHTML = arrHelp[a];
        letterMemory[i] = arrHelp[a];
        console.log(letterMemory);
      }
    }
  }
  winCondition();
}

//win point

function winCondition() {
  var checkEmpty = 0;
  for (let i = 0; i < arrWord.length; i++) {
    if (letterMemory[i] == "") {
      checkEmpty += 0;
    } else {
      checkEmpty++;
    }
  }
  if (checkEmpty == arrWord.length) {
    document.getElementById("game").hidden = true;
    document.getElementById("inputletter").hidden = true;
    document.getElementById("newGSection").hidden = false;
    document.getElementById("win").hidden = false;
    document.getElementById("lose").hidden = true;
    losePoint = 0;

    win++;
    document.getElementById("wincount").innerHTML = win;
    printLetter();
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

// print all letter

function printLetter() {
  for (let i = 0; i < arrWord.length; i++) {
    var b = "letterPose" + i;
    console.log(b);
    document.getElementById(b).innerHTML = arrWord[i];
  }
}

//lose condition

function loseGame() {
  if (losePoint == 6) {
    document.getElementById("game").hidden = true;
    document.getElementById("inputletter").hidden = true;
    document.getElementById("newGSection").hidden = false;
    document.getElementById("win").hidden = true;
    document.getElementById("lose").hidden = false;
    losePoint = 0;

    lose++;
    document.getElementById("losecount").innerHTML = lose;
    printLetter();
  }
  changeBaseHtml();
}

// change letter base html

function changeBaseHtml() {
  for (let i = 0; i < arrWord.length; i++) {
    if (letterSubmit == arrWord[i]) {
      var b = "letterPose" + i;
      console.log(b);
      document.getElementById(b).innerHTML = letterSubmit;
      letterMemory[i] = letterSubmit;
      console.log(letterMemory);
    }
  }
}

//hangman image change

function imageChange() {
  var imageLose = hangman[losePoint];
  document.getElementById("hangman").src = "images/" + imageLose;
}
//-------------------------------------------------------------------------------
// new game
document.getElementById("newGame").addEventListener("click", function () {
  //show not show
  document.getElementById("game").hidden = false;
  document.getElementById("inputletter").hidden = false;
  document.getElementById("newGSection").hidden = true;
  document.getElementById("win").hidden = true;
  document.getElementById("lose").hidden = true;

  //select random word from list

  letterMemory = [];
  document.getElementById("letterChose").innerHTML = "letter chosen:";

  let numberWordSelect = Math.floor(Math.random() * 2999);
  let worldSelect = words[numberWordSelect];
  arrWord = worldSelect.split("");
  console.log(worldSelect);
  console.log(arrWord);

  createArrLetterMemory();

  //create all boxes

  function wordBaseHtml() {
    let a = "";
    for (let i = 0; i < arrWord.length; i++) {
      a += '<p class="lettershow" id="letterPose' + i + '" ></p>';
    }
    document.getElementById("guessword").innerHTML = a;
  }

  wordBaseHtml();
  helpbtn2 = false;
  helpbtn = true;
});

//input game

document.getElementById("run").onclick = function action() {
  letterSubmit = document.getElementById("text1").value;
  if (letterSubmit == "") {
    alert("you must write a letter");
  } else {
    letterChose.push(letterSubmit);
    document.getElementById("letterChose").innerHTML += `${letterSubmit}-`;
    console.log(letterSubmit);
    letterCheck();
    console.log(losePoint);
    imageChange();
    loseGame();
    winCondition();

    console.log(lose);
    console.log(win);
    document.getElementById("text1").value = "";
  }
};

document.getElementById("run2").addEventListener("click", function () {
  if (helpbtn === false) {
    alert("play new game first!");
  } else if (helpbtn2 === true) {
    alert("Only one time per game!");
  } else {
    helpbtn2 = true;
    document.getElementById("letterChose").innerHTML += "e-a-r-i-o-";
    letterHelp();
  }
});
