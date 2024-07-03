let display = document.getElementById("display");
let currentOperand = "";
let previousOperand = "";
let operation = undefined;

function clearDisplay() {
  currentOperand = "";
  previousOperand = "";
  operation = undefined;
  updateDisplay();
}

function appendNumber(number) {
  if (number === "." && currentOperand.includes(".")) return;
  currentOperand = currentOperand.toString() + number.toString();
  updateDisplay();
}

function setOperation(op) {
  if (currentOperand === "" && previousOperand === "") return; // Prevent setting operation if there are no numbers
  if (currentOperand === "" && previousOperand !== "") {
    operation = op; // Change operation if operator is already set
  } else if (currentOperand !== "" && previousOperand !== "") {
    calculate();
    operation = op;
  } else {
    previousOperand = currentOperand;
    currentOperand = "";
    operation = op;
  }
  updateDisplay();
}

function calculate() {
  let result;
  const prev = parseFloat(previousOperand);
  const current = parseFloat(currentOperand);
  if (isNaN(prev) || isNaN(current)) return;
  switch (operation) {
    case "+":
      result = prev + current;
      break;
    case "-":
      result = prev - current;
      break;
    case "*":
      result = prev * current;
      break;
    case "/":
      result = prev / current;
      break;
    default:
      return;
  }
  currentOperand = result.toString();
  operation = undefined;
  previousOperand = "";
  updateDisplay();
}

function updateDisplay() {
  display.innerText = `${previousOperand} ${operation || ""} ${currentOperand}`;
}

function handleKeyboardInput(event) {
  const key = event.key;
  if (key >= "0" && key <= "9") {
    appendNumber(key);
  } else if (key === ".") {
    appendNumber(key);
  } else if (key === "+" || key === "-" || key === "*" || key === "/") {
    setOperation(key);
  } else if (key === "Enter") {
    event.preventDefault();
    calculate();
  } else if (key === "Backspace") {
    clearDisplay();
  } else if (key === "Escape") {
    clearDisplay();
  }
}

// Ensure the functions are correctly assigned to window object
window.clearDisplay = clearDisplay;
window.appendNumber = appendNumber;
window.setOperation = setOperation;
window.calculate = calculate;
window.updateDisplay = updateDisplay;
window.handleKeyboardInput = handleKeyboardInput;

// Add event listener for keydown
document.addEventListener("keydown", handleKeyboardInput);
function changeText(element, isHovered) {
  if (isHovered) {
    element.innerText = "Thala for a reason";
  } else {
    element.innerText = "Mihir's Calculator";
  }
}
