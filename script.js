"use strict";
const createPlayer = (name) => {
  return { name, score: 0, current: 0 };
};

const generateDice = () => Math.floor(Math.random() * 6) + 1;

const rollDice = () => {
  const dice = generateDice();
  imgDice.style.visibility = "visible";
  imgDice.setAttribute("src", `img/dice-${dice}.png`);
  if (dice !== 1) {
    activePlayer.current += dice;
    updateCurrent();
  } else {
    activePlayer.current = 0;
    updateCurrent();
    switchPlayer();
  }
};

const updateCurrent = () => {
  document.querySelector(`.${activePlayer.name}-current`).textContent =
    activePlayer.current;
};

const switchPlayer = () => {
  document.querySelector(`.${activePlayer.name}`).classList.remove("active");
  if (activePlayer.name === "player1") {
    activePlayer = player2;
  } else {
    activePlayer = player1;
  }
  document.querySelector(`.${activePlayer.name}`).classList.add("active");
};

const holdScore = () => {
  activePlayer.score += activePlayer.current;
  if (activePlayer.score >= 100) {
    showWinner();
  }
  activePlayer.current = 0;
  updateScore();
  updateCurrent();
  switchPlayer();
};

const updateScore = () => {
  document.querySelector(`.${activePlayer.name}-score`).textContent =
    activePlayer.score;
};

const restGame = () => {
  player1 = createPlayer("player1");
  player2 = createPlayer("player2");
  activePlayer = player2;
  updateCurrent();
  updateScore();
  switchPlayer();
  updateCurrent();
  updateScore();
  imgDice.style.visibility = "hidden";
};

const showWinner = () => {
  container.classList.add("hidden");
  labelWinner.textContent = `${activePlayer.name.slice(
    0,
    activePlayer.name.length - 1
  )}  ${activePlayer.name[activePlayer.name.length - 1]}`.toUpperCase();
  modal.classList.remove("hidden");
};

const playAgain = () => {
  modal.classList.add("hidden");
  restGame();
  container.classList.remove("hidden");
};
// HTML Elements
const container = document.querySelector(".container");
const btnRoll = document.querySelector(".roll");
const imgDice = document.querySelector(".dice");
const btnHold = document.querySelector(".hold");
const btnNewGame = document.querySelector(".new-game");
const labelWinner = document.querySelector(".winner");
const modal = document.querySelector(".modal");
const btnPlayAgain = document.querySelector(".play-again");
// Listen to events
btnRoll.addEventListener("click", rollDice);
btnHold.addEventListener("click", holdScore);
btnNewGame.addEventListener("click", restGame);
btnPlayAgain.addEventListener("click", playAgain);
// Game State
let player1 = createPlayer("player1");
let player2 = createPlayer("player2");
let activePlayer = player1;
