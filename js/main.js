let screenNum = "8008135";
let storedNum;
let storedOp;
let hasDecimal = false;

function setScreen(value) {
  const output = document.querySelector("output");
  output.innerText = value;
}

function updateScreen(value) {
  if (screenNum === "0" && value !== ".") {
    screenNum = value;
  } else if (screenNum.length >= 9) {
    screenNum = screenNum.substring(1);
    screenNum += value;
  } else {
    screenNum += value;
  }
  setScreen(screenNum);
}

function storeOp(op) {
  storedOp = op;
  screenNum = "0";
  hasDecimal = false;
  setScreen(0);
}

function backspace() {
  if (screenNum.length <= 1) {
    screenNum = "0";
  } else {
    screenNum = screenNum.slice(0, -1);
  }
  setScreen(screenNum);
}

function clear() {
  screenNum = "0";
  storedOp = "";
  storedNum = "";
  hasDecimal = false;
  setScreen(0);
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

// TODO: Pressing equals repeatedly should repeat last operation.
function equals() {
  const result = operate(storedNum, screenNum, storedOp);
  if (result === null) {
    return;
  }
  screenNum = result;
  setScreen(screenNum);
}

function eventHandler(input) {
  if (input === "equal") {
    equals();
  } else if (input === ".") {
    if (!hasDecimal) {
      updateScreen(input);
      hasDecimal = true;
    }
    // eslint-disable-next-line no-restricted-globals
  } else if (isNaN(input)) {
    storedNum = screenNum;
    switch (input) {
      case "plus":
        storeOp("+");
        break;
      // TODO: Make it so that if the number is zero, and minus is pressed, it
      // creates a negative number.
      case "minus":
        storeOp("-");
        break;
      case "multiply":
        storeOp("*");
        break;
      case "divide":
        storeOp("/");
        break;
      case "backspace":
        backspace();
        break;
      case "clear":
        clear();
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
