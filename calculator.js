/**
 *  Name: calculator.js
 */

// HTML Element connections
const deleteButton = document.querySelector('#deleteButton');
const clearButton = document.querySelector('#clearButton');
const numeralButton = document.querySelectorAll('.numeralButton');
const operationButton= document.querySelectorAll('.operationButton');
const calculatorScreen = document.querySelector('.display');
const calculatorHistoryScreen = document.querySelector('.historyDisplay');
const equalsButton = document.querySelector('#equals');

// Array that holds the users inputs
const userInputs = [];
// Calculation result 
let calculation = {
    firstNumber: '',
    operator: '',
    secondNumber: '',
    result: null 
};
// Temp variable to hold current screen result before it get's assigned to the calculation assignment
let temp = '';


// Basic Math Functions
function add(firstNum, secondNum){
    return parseInt(firstNum) + parseInt(secondNum);
}

function subtract(firstNum, secondNum){
    return parseInt(firstNum) - parseInt(secondNum);
    // The below code is if you want the calculator to force the bigger number to be the firstNum. 
    // return firstNum < secondNum ? secondNum - firstNum : firstNum - secondNum;
}

function multiply(firstNum, secondNum){
    return (parseInt(firstNum) * parseInt(secondNum));
}

function divide(firstNum, secondNum){
    firstNum = parseInt(firstNum);
    secondNum = parseInt(secondNum);

    if(firstNum == 0 || secondNum == 0){
        alert("You can't divide by 0");
    } else {
        return firstNum / secondNum;
    }
}

function operate(firstNumber,operator,secondNumber){
    switch(operator){
        case '+':
            return add(firstNumber,secondNumber);
        case '-':
            return subtract(firstNumber,secondNumber);
        case '*':
            return multiply(firstNumber,secondNumber);
        case '/':
            return divide(firstNumber,secondNumber);
        default:
            break;
    }

}

/**
 * @param {Element} parent - The parent element that contains the elements we want to remove 
 */
function clearCalcScreen(parent){
    while(parent.firstChild){
        parent.removeChild(parent.firstChild);
    }
}

/**
 * @param {Element} parent - The parent element that contains the elements we want to remove 
 */
function deleteChar(parent){
    if(parent.firstChild){
        parent.removeChild(parent.lastChild);
    }
}

/**
 * EVENT LISTENERS
 */

// Adding event listeners for each numeral button
numeralButton.forEach((button) => {
    button.addEventListener('click', () => {
        if(calculation['firstNumber'].length != 0 && calculation['operator'].length != 0 && calculation['secondNumber'].length != 0 && calculation['result'] != null){
            calculatorScreen.append(button.value);
            calculatorHistoryScreen.append(button.value)
            temp += button.value
            calculation['firstNumber'] = calculation['result'];
            calculation['secondNumber'] = temp;
        }else if(calculation['firstNumber'].length !=0 && calculation['secondNumber'] !=0 ){
            calculatorScreen.append(button.value);
            calculatorHistoryScreen.append(button.value)
            temp += button.value;
        }else if(calculation['secondNumber'].length != 0){
            calculatorScreen.append(button.value);
            calculatorHistoryScreen.append(button.value);
            temp += button.value;
            calculation['secondNumber'] = temp;
        }else{
            calculatorScreen.append(button.value);
            calculatorHistoryScreen.append(button.value);
            temp += button.value;
        }
    })
});

// Adding event listeners for each operation button
operationButton.forEach((button) => {
    button.addEventListener('click', () => {
        if(calculation['firstNumber'].length != 0 && calculation['operator'].length != 0 && calculation['secondNumber'].length != 0 && calculation['result'] != null){
            clearCalcScreen(calculatorScreen);
            calculation['firstNumber'] = calculation['result'];
            calculation['operator'] = button.value;
            calculation['secondNumber'] = temp;
            calculation['result'] = operate(calculation['firstNumber'],calculation['operator'],calculation['secondNumber']);
            calculatorScreen.append(calculation['result'],button.value);
            calculatorHistoryScreen.append(button.value);
            temp = '';
        }else if(calculation['firstNumber'].length == 0){
            calculation['firstNumber'] = temp;
            calculation['operator'] = button.value
            clearCalcScreen(calculatorScreen);
            calculatorScreen.append(button.value);
            calculatorHistoryScreen.append(button.value);
            temp = '';
        }else if(calculation['firstNumber'].length != 0 && calculation['operator'].length != 0 && calculation['secondNumber'].length != 0){
            calculation['result'] = operate(calculation['firstNumber'],calculation['operator'],calculation['secondNumber']);
            clearCalcScreen(calculatorScreen)
            calculatorScreen.append(button.value);
            calculatorHistoryScreen.append(button.value);
            temp = '';
        }else if(calculation['firstNumber'].length != 0 && calculation['operator'].length !=0 && calculation['secondNumber'].length == 0){
            clearCalcScreen(calculatorScreen)
            calculation['secondNumber'] = temp;
            calculation['result'] = operate(calculation['firstNumber'],calculation['operator'],calculation['secondNumber']);
            calculatorScreen.append(button.value);
            calculatorHistoryScreen.append(button.value);
            temp = '';
        }else{
            calculatorHistoryScreen.append(button.value);
        }
    })
});

clearButton.addEventListener('click', () => {
    clearCalcScreen(calculatorScreen);
    clearCalcScreen(calculatorHistoryScreen);
    calculation['firstNumber'] = '';
    calculation['secondNumber'] = '';
    calculation['operator'] = '';
    calculation['result'] = null 
    temp = '';
});

deleteButton.addEventListener('click', () => {
    deleteChar(calculatorScreen)
});

equalsButton.addEventListener('click', () => {
    if(calculation['firstNumber'].length == 0 && calculation['secondNumber'] == 0){
        alert("Equation is incomplete");
    } else if (calculation['firstNumber'].length != 0 && calculation['operator'].length != 0 && calculation['secondNumber'] != 0){
        calculation['result'] = operate(calculation['firstNumber'],calculation['operator'],calculation['secondNumber']);
        temp = '';
        calculatorScreen.innerHTML = calculation['result'];
    } else if(calculation['firstNumber'].length != 0 && calculation['operator'] != 0){
        calculation['secondNumber'] = temp
        clearCalcScreen(calculatorScreen);
        calculation['result'] = operate(calculation['firstNumber'],calculation['operator'],calculation['secondNumber']);
        calculatorScreen.append(calculation['result']);
    } else {
        alert("Equation is Incomplete");
    }
});
