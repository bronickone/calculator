let add = (a, b) => a + b        //basic functions
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

let operationFlag = true  //flag for multiple equal button click preventing and mutiple operator click preventing 
let intermediateValue = ""
let firstValue = "0"
let secondValue = ""
let currentOperator = ""

const digits = document.querySelectorAll('.digit')
const display = document.querySelector('.display')
const dot = document.querySelector('#dot')
const plusMinus = document.querySelector('#plusMinus')
let history =  document.querySelector('.history')

function clearValues(){       //clear function
  intermediateValue = "";
  firstValue = "0"
  secondValue = ""
  currentOperator = ""
  history.textContent = "0"
}

function displayHistory(){    //function for little screen populating
  history.textContent = `${firstValue}  ${currentOperator}  ${secondValue}`
}

function populateDisplay(){     //function for main screen populating
  if (intermediateValue.length > 10) {intermediateValue = intermediateValue.slice (0, -1)}
  display.textContent = intermediateValue
  if (currentOperator) {secondValue = display.textContent}
  else {firstValue = display.textContent}
  displayHistory()
}

function evalDisplay(){          //evaluation function( run after equal button click or operator button click(if not first operator in a row))
  display.textContent = operate(currentOperator, firstValue, secondValue)
  if ((Math.floor(display.textContent) > 9999999999) || (Math.floor(display.textContent) < -999999999)) 
    {display.textContent = 'Overflow'}
  if ( display.textContent.length > 10) {display.textContent = display.textContent.slice(0, 10)}
}

digits.forEach((digit) => {     //digit buttons function
  digit.addEventListener('click', () => {  
    if ((digit.textContent === "0") && (display.textContent === "0")) {return}
    if ( intermediateValue === "") {display.textContent = ""} 
    
    intermediateValue += digit.textContent
    populateDisplay()
    
    operationFlag = false;
  });
});


dot.addEventListener('click', () => {       //dot button
  if (display.textContent === "0"){
    intermediateValue = 0;
  }

  if (!display.textContent.includes('.')){
    intermediateValue += '.'
    populateDisplay()
  }
})

plusMinus.addEventListener('click', () => {  //plus minus button
  if (display.textContent === "0" || (operationFlag)){return}  

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

operators.forEach((operator) => {            //operator buttons function
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


equal.addEventListener('click', () => {            //equal button function
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

clear.addEventListener('click', () => {  //clear button function
    display.textContent = "0";
    clearValues()
    operationFlag = false
})

document.addEventListener('keydown', (event) => { // keyboard input function
	
	let getOperators = {
		'/': 'divide',
		'*': 'multiply',
		'+': 'add',
		'-': 'subtract'
  }

	if(!isNaN(event.key) && event.key !== ' '){
		document.getElementById(`dig${event.key}`).click();
	}
	if (['/', 'x', '+', '-', '*', '%'].includes(event.key)) {
		document.getElementById(getOperators[event.key]).click();
	}
	if (event.key === 'Backspace' || event.key ==='c' || event.key === 'C') {
		document.getElementById('clear').click();	
	}
	if (event.key === '=' || event.key === 'Enter') {
		document.getElementById('equals').click();	
	}
	if (event.key === '.') {
		document.getElementById('dot').click();	
	}
});