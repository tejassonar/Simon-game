let options = ["green", "red", "yellow", "blue"];

let generatedSequence = [];
let userSequence = [];
let level = 1;

$(document).keypress((event) => (event.key === "a" ? nextLevel() : []));

function nextLevel() {
  $("h1").text("Level " + level);
  setTimeout(() => createRandomOption(), 1000);
}

$(".btn").click((event) => {
  $("#" + event.target.id).addClass("pressed");
  setTimeout(() => $("#" + event.target.id).removeClass("pressed"), 100);
  makeSound(event.target.id);
  userSequence.push(event.target.id);
  let isCorrect = checkSequence();
  if (isCorrect && generatedSequence.length === userSequence.length) {
    level++;
    userSequence = [];
    nextLevel();
  } else if (!isCorrect) {
    userSequence = [];
    generatedSequence = [];
    level = 1;
    $("h1").text("Press A to start the game again");
  }
});

function checkSequence() {
  for (let i = 0; i < userSequence.length; i++) {
    if (generatedSequence[i] === userSequence[i]) {
      continue;
    } else {
      return false;
    }
  }
  return true;
}
function createRandomOption() {
  var randomOption = options[Math.floor(Math.random() * options.length)];
  generatedSequence.push(randomOption);
  $("#" + randomOption).addClass("pressed");
  makeSound(randomOption);
  setTimeout(() => {
    $("#" + randomOption).removeClass("pressed");
  }, 100);
}

function makeSound(option) {
  var audio = new Audio("./sounds/" + option + ".mp3");
  audio.play();
}
