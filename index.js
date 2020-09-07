//Grabbing Elements
const holes = document.querySelectorAll(".hole");
const scoreCard = document.querySelector(".score");
const moles = document.querySelectorAll(".mole");
const smackSound = document.querySelector("audio");
let timeUp;
let previousHole;
let score = 0;
let letGameFinish;
let minimum, maximum;

//random time that the mole will be showing up

const randomMoleUp = (min, max) => {
  return Math.round(Math.random() * (max - min) + min);
};

//random hole
const randomHole = () => {
  const randomIndex = Math.floor(Math.random() * holes.length);
  const hole = holes[randomIndex];

  if (hole === previousHole) {
    return randomHole();
  }

  previousHole = hole;

  return hole;
};

//mole showing up
const moleUp = () => {
  //By setting up letGameFinish
  letGameFinish = true;

  const time = randomMoleUp(minimum, maximum);

  const hole = randomHole();
  hole.classList.add("up");

  setTimeout(() => {
    hole.classList.remove("up");
    if (!timeUp) moleUp();
  }, time);
};

//start game
const start = (low, up) => {
  //stop the function from running if the game is already running. In other words we are gonna let the game finish
  if (letGameFinish) return;
  minimum = low;
  maximum = up;

  score = 0;
  scoreCard.textContent = 0;
  timeUp = false;
  moleUp();
  //Keep running the function moleUp for 10 seconds then stop it
  setTimeout(() => {
    timeUp = true;
    letGameFinish = false;
  }, 10000);
};

//Event Listener

moles.forEach((mole) =>
  mole.addEventListener("click", (e) => {
    if (!e.isTrusted) return;
    score++;
    scoreCard.textContent = score;
    const hole = e.currentTarget.parentElement;
    smackSound.currentTime = 0;
    smackSound.play();
    hole.classList.remove("up");
  })
);
