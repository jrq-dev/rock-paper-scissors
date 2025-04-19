export const errorObj = (message, code) => {
  return {
    msg: message,
    code,
  };
};

export const getDataAttr = (dom, dataAttrName) => {
  if (!Object.keys(dom.target.dataset).length) {
    return errorObj("No data attribute found in dom", 202);
  }
  return dom.target.dataset[dataAttrName];
};

export const moveRandGen = (max) => {
  return Math.floor(Math.random() * (max - 1 + 1)) + 1;
};

export const createElem = (elem, content = "", listOFClass = "") => {
  const newElem = document.createElement(elem);
  newElem.textContent = content;
  newElem.classList.add(listOFClass);
  return newElem;
};
