let add = (a, b) => a + b;

let subtract = (a, b) => a - b;

let multiply = (a, b) => a * b;

let divide = (a, b) => a / b;

function operate(operator, a , b){
    if (operator === "+") return add(a, b)
    if (operator === "-") return subtract(a, b)
    if (operator === "*") return multiply(a, b)
    if (operator === "/") return divide(a, b)
}

let displayValue = "";

const digits = document.querySelectorAll('.digit');

digits.forEach((digit) => {

  digit.addEventListener('click', () => {
    
    if (document.getElementById('display').value === 0) document.getElementById('display').value = "";
      
    displayValue += digit.textContent;
    document.getElementById('display').value = displayValue;
    console.log(displayValue)
  });
});