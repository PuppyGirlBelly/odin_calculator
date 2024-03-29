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
  if (storedOp === '/' && screenNum === '0') {
    clear();
    setScreen('nope. err.');
    return;
  }
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

function negative() {
  screenNum *= -1;
  setScreen(screenNum);
}

function eventHandler(input) {
  // eslint-disable-next-line no-restricted-globals
  if (isNaN(input)) {
    switch (input) {
      case '.':
        insertDecimal();
        break;
      case 'negative':
        negative();
        break;
      case 'Backspace':
        backspace();
        break;
      case 'clear':
      case 'Escape':
        clear();
        break;
      case '=':
      case 'Enter':
        equals();
        break;
      case '+':
      case '-':
      case '/':
      case '*':
        equals();
        storeOp(input);
      default:
        break;
    }
    return;
  }
  if (hitEnter) clear();
  updateScreen(input);
}

function animateKey(event) {
  let key = event.key ;
  if (key === "Enter") key = "=";
  if (key === "Escape") key = "clear";
  const div = document.querySelector(`#${CSS.escape(key)}`);
  div.classList.add('pressed');
}

function removeTransition(e) {
  if (e.propertyName !== 'box-shadow') return;
  e.target.classList.remove('pressed');
}

const buttons = document.querySelectorAll('button');
buttons.forEach((button) => {
  button.addEventListener('click', (e) => {
    eventHandler(e.target.id);
  });
  button.addEventListener('transitionend', removeTransition);
});

setScreen(screenNum);

window.addEventListener('keydown', (event) => eventHandler(event.key));
window.addEventListener('keydown', (event) => removeTransition(event));
window.addEventListener('keydown', (event) => animateKey(event));
