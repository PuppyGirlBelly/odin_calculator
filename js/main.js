let screenNum = '0';
let storedNum = '0';
let storedOp = '+';
let hasDecimal = false;
let hitEnter = false;
const maxLength = 9;

function limitStringLength(input) {
  if (input.length >= maxLength) return input.slice(0, maxLength);
  return input;
}

function setScreen(value) {
  const output = document.querySelector('output');
  output.innerText = value;
}

function updateScreen(value) {
  if (screenNum !== '0' || value === '.') screenNum += value;
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

function equals() {
  let result = operate(storedNum, screenNum, storedOp);
  storedNum = limitStringLength(result.toString());
  hitEnter = true;
  setScreen(storedNum);
}

function storeOp(op) {
  storedOp = op;
  screenNum = '0';
  hasDecimal = false;
  hitEnter = false;
}

function clear() {
  screenNum = '0';
  storedOp = '+';
  storedNum = '0';
  hasDecimal = false;
  hitEnter = false;
  setScreen(0);
}

function eventHandler(input) {
  // eslint-disable-next-line no-restricted-globals
  if (isNaN(input)) {
    switch (input) {
      case '.':
        insertDecimal();
      case 'backspace':
        backspace();
        break;
      case 'clear':
        clear();
        break;
      case 'equal':
        equals();
        break;
      default:
        equals();
        storeOp(input);
        break;
    }
    return;
  }
  if (hitEnter) clear();
  updateScreen(input);
}

const buttons = document.querySelectorAll('button');
buttons.forEach((button) => {
  button.addEventListener('click', (e) => {
    eventHandler(e.target.id);
  });
});

setScreen(screenNum);
