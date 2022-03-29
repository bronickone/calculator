let add = (a, b) => a + b;
let subtract = (a, b) => a - b;
let multiply = (a, b) => a * b;
let divide = (a, b) => a / b;

function operate(operator, a , b){
    a = Number(a);
    b = Number(b);
    if (operator === "+") return add(a, b)
    if (operator === "-") return subtract(a, b)
    if (operator === "*") return multiply(a, b)
    if (operator === "/") return divide(a, b)
}
let equalFlag = true;
let intermediateValue = "";
let firstValue = "";
let secondValue = ""
let currentOperator = "";

const digits = document.querySelectorAll('.digit');
let display = document.querySelector('.display')

digits.forEach((digit) => {
  digit.addEventListener('click', () => { 
    
    if ( intermediateValue === "") 
    display.value = "" 
    intermediateValue += digit.textContent
    display.value = intermediateValue
    
    if (currentOperator){
      
      secondValue = display.value
    }
    else {
    

      firstValue = display.value
    }
    
    
    
    

    equalFlag = false;
  });
});

const operators = document.querySelectorAll('.operator');

operators.forEach((operator) => {

    operator.addEventListener('click', () => {
    if (currentOperator){
      
      display.value = operate(currentOperator, firstValue, secondValue)
      firstValue = display.value
    }
    currentOperator = operator.textContent
    intermediateValue = ""; 
    });
  });

const equal = document.querySelector('#equals')



equal.addEventListener('click', () => {
  if (equalFlag === false) {
    display.value = operate(currentOperator, firstValue, secondValue)
    firstValue = display.value;
    secondValue = "";
    intermediateValue = "";
    currentOperator = "";
    equalFlag = true;
  }
});

const clear = document.querySelector('#clear')

clear.addEventListener('click', () => {
    display.value = 0;
    intermediateValue = "";
    firstValue = ""
    secondValue = ""
    currentOperator = ""
    equalFlag = false
})