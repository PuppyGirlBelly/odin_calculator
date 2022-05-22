let screenNum = "8008135";
let storedNum;
let storedOp;

function setScreen(value) {
  const output = document.querySelector("output");
  output.innerText = value;
}

function updateScreen(value) {
  if (screenNum === "0") {
    screenNum = value;
  } else if (screenNum.length >= 9) {
    screenNum = screenNum.substring(1);
    screenNum += value;
  } else {
    screenNum += value;
  }
  setScreen(screenNum);
}

function add(a, b) {
  return +a + +b;
}

function subtract(a, b) {
  return a - b;
}

function multiply(a, b) {
  return a * b;
}

function divide(a, b) {
  return a / b;
}

function operate(a, b, op) {
  switch (op) {
    case "+":
      return add(a, b);
    case "-":
      return subtract(a, b);
    case "*":
      return multiply(a, b);
    case "/":
      return divide(a, b);
    default:
      return null;
  }
}

function equals() {
  const result = operate(storedNum, screenNum, storedOp);
  if (result === null) {
    return;
  }
  screenNum = result;
  setScreen(screenNum);
}

function storeOp(op) {
  storedOp = op;
  screenNum = "0";
  setScreen(0);
}

function eventHandler(input) {
  if (input === "equal") {
    equals();
    // eslint-disable-next-line no-restricted-globals
  } else if (isNaN(input)) {
    storedNum = screenNum;
    switch (input) {
      case "plus":
        storeOp("+");
        break;
      case "minus":
        storeOp("-");
        break;
      case "multiply":
        storeOp("*");
        break;
      case "divide":
        storeOp("/");
        break;
      default:
        break;
    }
  } else if (input !== ".") {
    updateScreen(input);
  }
}

const buttons = document.querySelectorAll("button");
buttons.forEach((button) => {
  button.addEventListener("click", (e) => {
    eventHandler(e.target.id);
  });
});

setScreen(screenNum);
