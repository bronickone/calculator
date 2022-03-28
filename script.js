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

let displayValue = "";

const digits = document.querySelectorAll('.digit');

digits.forEach((digit) => {
  digit.addEventListener('click', () => {  
    if (/*document.getElementById('display').value*/ displayValue === "") 
    document.getElementById('display').value = "" 
    
    displayValue += digit.textContent
    document.getElementById('display').value = displayValue
    console.log(displayValue)
  });
});

let firstValue;
let secondValue;
let currentOperator;

const operators = document.querySelectorAll('.operator');

operators.forEach((operator) => {

    operator.addEventListener('click', () => {
    currentOperator = operator.textContent;
    firstValue = displayValue;
    displayValue = "";  
    });
  });

const equal = document.querySelector('#equals')

equal.addEventListener('click', () => {
    secondValue = displayValue;
    console.log(currentOperator)
    displayValue = operate(currentOperator, firstValue, secondValue)
    document.getElementById('display').value = displayValue
    displayValue = "";
});

const clear = document.querySelector('#clear')

clear.addEventListener('click', () => {
    document.getElementById('display').value = 0;
    displayValue = "";
})