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
        return "divByZero"   
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
const display = document.querySelector('.display')
const dot = document.querySelector('#dot')
const plusMinus = document.querySelector('#plusMinus')
let history =  document.querySelector('.history')

function clearValues(){
  intermediateValue = "";
  firstValue = ""
  secondValue = ""
  currentOperator = ""
  history.textContent = "0"
}

function displayHistory(){
  history.textContent = `${firstValue}  ${currentOperator}  ${secondValue}`
}

function populateDisplay(){
  if (intermediateValue.length > 10) {intermediateValue = intermediateValue.slice (0, -1)}
  display.textContent = intermediateValue
  if (currentOperator) {secondValue = display.textContent}
  else {firstValue = display.textContent}
  displayHistory()
}

function evalDisplay(){
  display.textContent = operate(currentOperator, firstValue, secondValue)
  if (Math.floor(display.textContent) > 9999999999) {display.textContent = 'Overflow'}
  if ( display.textContent.length > 10) {display.textContent = display.textContent.slice(0, 10)}
}

digits.forEach((digit) => {
  digit.addEventListener('click', () => {  
    if ((digit.textContent === "0") && (display.textContent === "0")) {return}
    if ( intermediateValue === "") {display.textContent = ""} 
    
    intermediateValue += digit.textContent
    populateDisplay()
    
    operationFlag = false;
  });
});

dot.addEventListener('click', () => {
  if (!display.textContent.includes('.')){
    intermediateValue += '.'
    populateDisplay()
  }
})

plusMinus.addEventListener('click', () => {
  if (display.textContent.includes('-')){
    intermediateValue = intermediateValue.slice(1);
    populateDisplay()
    return
  }
  
  if (!display.textContent.includes('-')){
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
          secondValue = "";
          firstValue = display.textContent
        }
        currentOperator = operator.textContent
        intermediateValue = ""; 
        operationFlag = true;
      }
      else {currentOperator = operator.textContent} 
      displayHistory()
    });
  });

const equal = document.querySelector('#equals')


equal.addEventListener('click', () => {
  if (firstValue === "" || secondValue === "") {return}
  if (!operationFlag) {
    evalDisplay()
    clearValues()
    firstValue = display.textContent;
    operationFlag = true;
  }
  displayHistory()
});

const clear = document.querySelector('#clear')

clear.addEventListener('click', () => {
    display.textContent = "0";
    clearValues()
    operationFlag = false
})