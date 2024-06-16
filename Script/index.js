import { words } from "./wordsList.js";

let win = false;
let lose = false;

//lose point + fail check

let losePoint = 0;

function loseCondition(losePoint) {
  if (losePoint == 6) {
    lose = true;
  }
}

//select random word from list
console.log(words.length);
let numberWordSelect = Math.floor(Math.random() * 2999);
console.log(numberWordSelect);
let worldSelect = words[numberWordSelect];
console.log(worldSelect);
let arrWord = worldSelect.split("");
console.log(arrWord);
//show not show
document.getElementById("game").hidden = false;

//add html space for the word
//create all boxes
let letterSubmit = "a";
let a = "";
for (let i = 0; i < arrWord.length; i++) {
  if (letterSubmit == arrWord[i]) {
    a += '<p class="lettershow">' + arrWord[i] + "</p>";
  }
  a += '<p class="lettershow"></p>';
}
document.getElementById("guessword").innerHTML = a;

//get chose letter
// check letter and print

function letterCheck() {
  let l = 0;
  for (let i = 0; i < arrWord.length; i++) {
    if (letterSubmit != arrWord[i]) {
      l = 1;
    }
    l = 0;
  }
  losePoint += l;
}
letterCheck();

console.log(losePoint);
