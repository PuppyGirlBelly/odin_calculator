let screenNum = '0';
let storedNum = '0';
let storedOp = '+';
let hasDecimal = false;

function setScreen(value) {
  const output = document.querySelector('output');
  output.innerText = value;
}

function updateScreen(value) {
  if (screenNum.length >= 9) return;
  if (screenNum !== '0') screenNum += value;
  if (screenNum === '0' && value !== '.') screenNum = value;
  setScreen(screenNum);
}

function insertDecimal() {
  if (hasDecimal) return;
  updateScreen(input);
  hasDecimal = true;
}

function backspace() {
  if (screenNum.length <= 1) screenNum = '0';
  if (screenNum.length > 1) screenNum = screenNum.slice(0, -1);
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
    case '+':
      return add(a, b);
    case '-':
      return subtract(a, b);
    case '*':
      return multiply(a, b);
    case '/':
      return divide(a, b);
    default:
      return null;
  }
}

// TODO: Pressing equals repeatedly should repeat last operation.
function equals() {
  storedNum = operate(storedNum, screenNum, storedOp);
  screenNum = '0';
  hasDecimal = false;
  setScreen(storedNum);
}

function storeOp(op) {
  equals();
  storedOp = op;
}

function clear() {
  screenNum = '0';
  storedOp = '+';
  storedNum = '0';
  hasDecimal = false;
  setScreen(0);
}

function eventHandler(input) {
  // eslint-disable-next-line no-restricted-globals
  if (isNaN(input)) {
    switch (input) {
      case '.':
        insertDecimal();
      case 'equal':
        equals();
        break;
      case 'backspace':
        backspace();
        break;
      case 'clear':
        clear();
        break;
      default:
        storeOp(input);
        break;
    }
    return;
  }
  updateScreen(input);
}

const buttons = document.querySelectorAll('button');
buttons.forEach((button) => {
  button.addEventListener('click', (e) => {
    eventHandler(e.target.id);
  });
});

setScreen(screenNum);
