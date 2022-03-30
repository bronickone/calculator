let add = (a, b) => a + b
let subtract = (a, b) => a - b
let multiply = (a, b) => a * b
let divide = (a, b) => a / b

function operate(operator, a , b){
    a = Number(a);
    b = Number(b);
    if (operator === "+") return add(a, b)
    if (operator === "-") return subtract(a, b)
    if (operator === "*") return multiply(a, b)
    if (operator === "/") {
      if (b === 0)  {
        clearValues()
        return "Error: Division by zero"   
      }
      else return divide(a, b)
    }
}

let operationFlag = true
let intermediateValue = ""
let firstValue = ""
let secondValue = ""
let currentOperator = ""

const digits = document.querySelectorAll('.digit')
let display = document.querySelector('.display')
let dot = document.querySelector('.dot')
let plusMinus = document.querySelector('.plusMinus')

function populateDisplay(){
  if (intermediateValue.length > 10) {intermediateValue = intermediateValue.slice (0, -1)}
  display.value = intermediateValue
  if (currentOperator) {secondValue = display.value}
  else {firstValue = display.value}
  
}

function evalDisplay(){
  display.value = operate(currentOperator, firstValue, secondValue)
  if (Math.floor(display.value) > 9999999999) {display.value = 'Error'}
  if ( display.value.length > 10) {display.value = display.value.slice(0, 10)}
}

digits.forEach((digit) => {
  digit.addEventListener('click', () => {  
    if ((digit.textContent === "0") && (display.value.charAt(0) === "0")) {return}
    if ( intermediateValue === "") {display.value = ""} 
    
    intermediateValue += digit.textContent
    populateDisplay()
    
    operationFlag = false;
  });
});

dot.addEventListener('click', () => {
  if (!display.value.includes('.')){
    intermediateValue += '.'
    populateDisplay()
  }
})

plusMinus.addEventListener('click', () => {
  if (display.value.includes('-')){
    intermediateValue = intermediateValue.slice(1);
    populateDisplay()
    return
  }
  
  if (!display.value.includes('-')){
    intermediateValue = '-' + intermediateValue
    populateDisplay()
  }  
})

const operators = document.querySelectorAll('.operator');

operators.forEach((operator) => {
    operator.addEventListener('click', () => {
      if (!operationFlag){
        if (currentOperator){ 
          evalDisplay()
          firstValue = display.value
        }
        currentOperator = operator.textContent
        intermediateValue = ""; 
        operationFlag = true;
      }
      else {currentOperator = operator.textContent} 
    });
  });

const equal = document.querySelector('#equals')

function clearValues(){
    intermediateValue = "";
    firstValue = ""
    secondValue = ""
    currentOperator = ""
}
equal.addEventListener('click', () => {
  if (firstValue === "" || secondValue === "") {return}
  if (!operationFlag) {
    evalDisplay()
    clearValues()
    firstValue = display.value;
    operationFlag = true;
  }
});

const clear = document.querySelector('#clear')

clear.addEventListener('click', () => {
    display.value = 0;
    clearValues()
    operationFlag = false
})