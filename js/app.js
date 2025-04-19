// dependencies, helpers
import {
  errorObj,
  getDataAttr,
  moveRandGen,
  createElem,
} from "./utils/helper.js";

// add init function when DOM loaded
addEventListener("DOMContentLoaded", function () {
  rpsObj.init();
});

var rpsObj = {
  selector: {
    moveListParentSelector: ".move-list",
    userViewSelector: ".user-view",
    computerViewSelector: ".computer-view",
    msgContainerSelector: ".msg-wrapper .msg",
    moveMapObj: {},
    moveMapper: { 1: "rock", 2: "sci", 3: "paper" },
  },

  init: () => {
    const { moveEventHandler, selector } = rpsObj;
    const { moveMapObj } = selector;
    // create initial moves object
    moveMapObj.rock = {
      name: "Rock",
      id: 1,
    };
    moveMapObj.sci = {
      name: "Scissors",
      id: 2,
    };
    moveMapObj.paper = {
      name: "Paper",
      id: 3,
    };
    moveMapObj.rock.beats = moveMapObj.sci;
    moveMapObj.sci.beats = moveMapObj.paper;
    moveMapObj.paper.beats = moveMapObj.rock;

    moveEventHandler();
  },

  moveEventHandler: () => {
    const { domHandler, selector, checkWinner, displayData } = rpsObj;
    const { moveListParentSelector } = selector;
    domHandler(moveListParentSelector).addEventListener("click", (e) => {
      if (e.target.tagName !== "BUTTON") {
        return;
      }
      const winnerData = checkWinner(getDataAttr(e, "name"));
      displayData(winnerData);
    });
  },

  checkWinner: (playerPick) => {
    const { moveMapObj, moveMapper } = rpsObj.selector;

    const compNumber = moveRandGen(Object.keys(moveMapObj).length);
    const compPickedProp = moveMapper[compNumber];
    const compPickedName = moveMapObj[compPickedProp].name;
    const dataMoveObj = {
      msg: "",
      picks: {
        computer: moveMapObj[compPickedProp],
        user: moveMapObj[playerPick],
      },
      value: 0,
    };

    if (moveMapObj[playerPick].id === compNumber) {
      dataMoveObj.msg = `It's a Draw computer picked ${compPickedName}`;
      dataMoveObj.value = 3;
      return dataMoveObj;
    }

    if (moveMapObj[playerPick].beats.id !== compNumber) {
      dataMoveObj.msg = `You lose, computer picked ${compPickedName}`;
      dataMoveObj.value = 0;
      return dataMoveObj;
    } else {
      dataMoveObj.msg = `Congrats you win computer picked ${compPickedName}`;
      dataMoveObj.value = 1;
      return dataMoveObj;
    }
  },

  displayData: (winnerData) => {
    const { domHandler, selector } = rpsObj;
    const { userViewSelector, computerViewSelector, msgContainerSelector } =
      selector;
    const { computer, user } = winnerData.picks;
    const userElem = createElem("div", user.name, "user-pick");
    const computerElem = createElem("div", computer.name, "comp-pick");
    if (!document.querySelector(".user-pick")) {
      domHandler(userViewSelector).append(userElem);
    }
    if (!document.querySelector(".comp-pick")) {
      domHandler(computerViewSelector).append(computerElem);
    }
    domHandler(".user-pick").textContent = user.name;
    domHandler(".comp-pick").textContent = computer.name;
    domHandler(msgContainerSelector).textContent = winnerData.msg;
  },

  domHandler: (domSelector) => {
    try {
      if (
        typeof domSelector === "string" &&
        document.querySelector(domSelector)
      ) {
        return document.querySelector(domSelector);
      } else {
        return errorObj("Not a selector", 201);
      }
    } catch (error) {
      return errorObj(error, 202);
    }
  },
};
