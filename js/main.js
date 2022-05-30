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

function storeOp(op) {
  storedNum = operate(storedNum, screenNum, storedOp);
  storedOp = op;
  screenNum = '0';
  hasDecimal = false;
  setScreen(storedNum);
}

function clear() {
  screenNum = '0';
  storedOp = '+';
  storedNum = '0';
  hasDecimal = false;
  setScreen(0);
}

// TODO: Pressing equals repeatedly should repeat last operation.
function equals() {
  const result = operate(storedNum, screenNum, storedOp);
  screenNum = result;
  setScreen(screenNum);
}

function eventHandler(input) {
  if (input === '.') {
    if (!hasDecimal) {
      updateScreen(input);
      hasDecimal = true;
    }
    // eslint-disable-next-line no-restricted-globals
  } else if (isNaN(input)) {
    storedNum = screenNum;
    switch (input) {
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
  } else if (input !== '.') {
    updateScreen(input);
  }
}

const buttons = document.querySelectorAll('button');
buttons.forEach((button) => {
  button.addEventListener('click', (e) => {
    eventHandler(e.target.id);
  });
});

setScreen(screenNum);
