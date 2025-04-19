// dependencies, helpers
import {
  errorObj,
  getDataAttr,
  moveRandGen,
  createElem,
} from "./utils/helper.js";

const moveMap = {
  rock: { name: "Rock", id: 1, beats: "sci" },
  sci: { name: "Scissors", id: 2, beats: "paper" },
  paper: { name: "Paper", id: 3, beats: "rock" },
};

const moveMapper = { 1: "rock", 2: "sci", 3: "paper" };

const dom = (selector) => {
  const el = document.querySelector(selector);
  return el || errorObj("Not a selector", 201);
};

/**
 *
 *
 * @param {String} playerPick
 * @returns {Object}
 */
const checkWinner = (playerPick) => {
  const compNumber = moveRandGen(Object.keys(moveMap).length);
  const compPickedName = moveMapper[compNumber];
  const compMove = moveMap[compPickedName];
  const userMove = moveMap[playerPick];

  if (!userMove) return errorObj("Invalid move", 202);

  const picks = { computer: compMove, user: userMove };
  let result = { msg: "", picks, value: 0 };

  if (userMove.id === compMove.id) {
    result.msg = `It's a Draw. Computer picked ${compMove.name}`;
    result.value = 3;
  } else if (userMove.beats !== compPickedName) {
    result.msg = `You lose. Computer picked ${compMove.name}`;
    result.value = 0;
  } else {
    result.msg = `Congrats! You win. Computer picked ${compMove.name}`;
    result.value = 1;
  }

  return result;
};

/**
 * Display result -- DOM Manipulation
 *
 * @param {Object} result
 */
const displayResult = (result) => {
  const { computer, user } = result.picks;
  const userElem = createElem("div", user.name, "user-pick");
  const compElem = createElem("div", computer.name, "comp-pick");

  if (!document.querySelector(".user-pick")) {
    dom(".user-view").append(userElem);
  }
  if (!document.querySelector(".comp-pick")) {
    dom(".computer-view").append(compElem);
  }

  dom(".user-pick").textContent = user.name;
  dom(".comp-pick").textContent = computer.name;
  dom(".msg-wrapper .msg").textContent = result.msg;
};

/**
 * Click event handler
 *
 * @param {Object} event
 * @returns {void}
 */
const handleMoveClick = (event) => {
  if (event.target.tagName !== "BUTTON") return;
  const playerPick = getDataAttr(event, "name");
  const result = checkWinner(playerPick);
  displayResult(result);
};

/**
 * Initialize click events
 * @returns {void}
 */
const init = () => {
  dom(".move-list").addEventListener("click", handleMoveClick);
};

/**
 * Initialize init function when DOM is loaded
 *
 */
document.addEventListener("DOMContentLoaded", init);
