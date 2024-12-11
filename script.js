let currentInput = '';
let currentOperator = null;
let previousInput = null;
let history = [];

const colors = ['#ffb3ba', '#baffc9', '#bae1ff', '#d5a6bd', '#ffdfba'];

function pressKey(key) {
  const display = document.getElementById("display");

  if (!isNaN(key) || key === '.') {
    currentInput += key;
    display.textContent = currentInput;
  } 
  else if (['+', '-', '*', '/'].includes(key)) {
    if (currentInput === '' && key === '-') {
      currentInput = '-';
      display.textContent = currentInput;
      return;
    }

    if (previousInput !== null && currentOperator !== null) {
      calculateResult();
    }

    currentOperator = key;
    previousInput = parseFloat(currentInput);
    currentInput = '';
  }
}
function calculateResult() {
  const display = document.getElementById("display");
  if (previousInput !== null && currentOperator !== null && currentInput !== '') {
    const result = eval(`${previousInput} ${currentOperator} ${parseFloat(currentInput)}`);
    const operation = `${previousInput} ${currentOperator} ${currentInput} = ${result}`;

    updateHistory(operation);

    display.textContent = operation;

    changeBackgroundColor();

    currentInput = '';
    currentOperator = null;
    previousInput = null;
  }
}
function updateHistory(operation) {
  const historyList = document.getElementById("historyList");

  history.push(operation);
  if (history.length > 5) {
    history.shift();
  }

  historyList.innerHTML = history.map(op => `<li>${op}</li>`).join('');
}
function clearDisplay() {
  const display = document.getElementById("display");
  currentInput = '';
  currentOperator = null;
  previousInput = null;
  display.textContent = '0';

  document.body.style.background = '#f9f9f9';
}
function changeBackgroundColor() {
  const randomColor = colors[Math.floor(Math.random() * colors.length)];
  document.body.style.background = randomColor;
}
