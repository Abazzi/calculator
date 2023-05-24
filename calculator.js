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
let calculation;

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

// Adding event listeners for each numeral button
numeralButton.forEach((button) => {
    button.addEventListener('click', () => {
        calculatorScreen.append(button.value);
        calculatorHistoryScreen.append(button.value)
        userInputs.push(button.value);
    })
})

// Adding event listeners for each operation button
operationButton.forEach((button) => {
    button.addEventListener('click', () => {
        if(userInputs.length == 1){
            userInputs.push(button.value);
            calculatorHistoryScreen.append(button.value);
            clearCalcScreen(calculatorScreen);
        }else if(userInputs == 2){
            console.log("hi");
        }else if(userInputs.length >= 3){
            calculation = operate(userInputs[0],userInputs[1],userInputs[2]);
            userInputs.length = 0;
            userInputs.push(calculation,button.value);
            calculatorScreen.innerHTML = calculation;
            calculatorHistoryScreen.append(button.value)
            clearCalcScreen(calculatorScreen);
            console.log(userInputs);
        }
    })
})

clearButton.addEventListener('click', () => {
    clearCalcScreen(calculatorScreen);
    clearCalcScreen(calculatorHistoryScreen);
    userInputs.length = 0;
});

deleteButton.addEventListener('click', () => {
    deleteChar(calculatorScreen)
});

equalsButton.addEventListener('click', () => {
    if(userInputs.length == 2){
        alert("Your forgot to put in the last number");
    } else {
        userInputs.push(calculatorScreen.innerHTML);
        calculation = operate(userInputs[0],userInputs[1],userInputs[2]);
        clearCalcScreen(calculatorScreen);
        calculatorScreen.append(operate(userInputs[0],userInputs[1],userInputs[2]));
        userInputs.length = 0
        userInputs.push(calculation);
        console.table(`Calculation: ${calculation}`);
        console.table(userInputs);
    }
});
