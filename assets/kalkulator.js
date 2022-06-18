const calculator = {
    displayNumber: '0',
    operator: null,
    firstNumber: null,
    waitingForSecondNumber: false,
};


const updateDisplay = () => {
    document.querySelector('#displayNumber').innerText = calculator.displayNumber;
}


const clearCalculator = () => {
    calculator.displayNumber = '0';
    calculator.operator = null;
    calculator.firstNumber = null;
    calculator.waitingForSecondNumber = false;
}


const inputDigit = (digit) => {
    if (calculator.displayNumber === '0') {
        calculator.displayNumber = digit;
    } else {
        calculator.displayNumber += digit;
    }
}

const buttons = document.querySelectorAll('.button');

for(const button of buttons){
    button.addEventListener('click', (event) => {
        //mendapatkan objek elemen yang diklik
        const { target } = event;

        if (target.classList.contains('clear')) {
            clearCalculator();
            updateDisplay();
            return;
        }

        if (target.classList.contains('erase')) {
            eraseCalculator();
            updateDisplay();
            return;
        }

        if (target.classList.contains('negative')){
            inverseNumber();
            updateDisplay();
            return;
        }

        if(target.classList.contains('equals')){
            performCalculation();
            updateDisplay();
            return;
        }

        if(target.classList.contains('operator')){
            handleOperator(target.innerText);
            updateDisplay();
            return;    
        }

        inputDigit(target.innerText);
        updateDisplay();
    });
}


const inverseNumber = () => {
    if (calculator.displayNumber === '0') {
        return;
    }

    calculator.displayNumber = calculator.displayNumber * -1;
}


const handleOperator = (operator) => {
    if(!calculator.waitingForSecondNumber){
        calculator.operator = operator;
        calculator.waitingForSecondNumber = true;
        calculator.firstNumber = calculator.displayNumber;

        // mengatur ulang nilai display number supaya tombol selanjutnya dimulai dari angka pertama lagi
        calculator.displayNumber = '0';
    } else {
        alert('Operator sudah ditetapkan');
    }
}


const performCalculation = () => {
    if (calculator.firstNumber == null || calculator.operator == null){
        alert('Operator belum ditetapkan');
        return;
    }

    let result = 0;
    switch (calculator.operator) {
        case '+':
            result = parseInt(calculator.firstNumber) + parseInt(calculator.displayNumber);
            break;
        case '-':
            result = parseInt(calculator.firstNumber) - parseInt(calculator.displayNumber);
            break;
        case 'x':
            result = parseInt(calculator.firstNumber) * parseInt(calculator.displayNumber);
            break;
        case '/':
            result = parseInt(calculator.firstNumber) / parseInt(calculator.displayNumber);
            break;
        case '%':
            result = parseInt(calculator.firstNumber) % parseInt(calculator.displayNumber);
            break;
        default:
            break;
    }

    const history = {
        firstNumber: calculator.firstNumber,
        secondNumber: calculator.displayNumber,
        operator: calculator.operator,
        result: result
    }
    putHistory(history);
    calculator.displayNumber = result;
    renderHistory();
}

