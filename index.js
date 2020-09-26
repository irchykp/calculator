class Calculator {
    constructor() {
        this.txtDisplay = document.querySelector('.display');
        this.btnResult = document.querySelector('.btn-result');
        this.bntDigits = document.querySelectorAll('.btn-digits');
        this.btnOperations = document.querySelectorAll('.btn-operators');

        this.result = null;
        this.currentText = '';
        this.currentOperation = '';
        this.showResult();
        this.bntDigits.forEach(btn => btn.addEventListener('click', this.buttonDigitClicked.bind(this)));
        this.btnOperations.forEach(btn => btn.addEventListener('click', this.buttonOperationClicked.bind(this)));
    }


    buttonDigitClicked(ev) {
        const digitValue = ev.target.innerText;
        switch (digitValue) {
            case "0":
                if (this.currentText === '0')
                    return;
                else
                    this.currentText += '0';
                break;
            default:
                if (this.currentText === '0')
                    this.currentText = digitValue;
                else
                    this.currentText += digitValue;
        }
        this.showResult();
    }

    buttonOperationClicked(ev) {
        const operation = ev.target.innerText;
        switch (operation) {
            case "ce":
                this.currentText = '';
                break;
            case "c":
                this.currentText = '';
                this.currentOperation = '';
                this.result = null;
                break;
            case "+":
                if (this.currentText)
                    this.result = (this.result ? this.result : 0) + this.tryParseEnteredValue();
                this.currentText = '';
                this.currentOperation = '+';
                break;
            case "-":
                if (this.currentText)
                    this.result = (this.result ? this.result : 0) - this.tryParseEnteredValue();
                this.currentText = '';
                this.currentOperation = '-';
                break;
            case "*":
                if (this.currentText)
                    this.result = (this.result ? this.result * this.tryParseEnteredValue() : this.tryParseEnteredValue());
                this.currentText = '';
                this.currentOperation = '*';
                break;
            case "/":
                if (this.currentText)
                    if (this.tryParseEnteredValue() === 0 && (this.result || this.result === 0)) {
                        this.currentText = 'ERROR';
                        this.result = null;
                        this.currentOperation = '';
                        break;
                    } else {
                        this.result = (this.result ? this.result / this.tryParseEnteredValue() : this.tryParseEnteredValue());
                    }
                this.currentText = '';
                this.currentOperation = '/';
                break;
            case "+/-":
                this.currentText = Number((this.tryParseEnteredValue() * -1).toFixed(4)).toString();
                break;
            case ".":
                if (this.currentText.indexOf('.') === -1) {
                    if (this.currentText === '')
                        this.currentText += '0.';
                    else
                        this.currentText += '.';
                }
                break;
            case "=":
                this.buttonOperationClicked({ target: { innerText: this.currentOperation } });
                break;
        }
        this.showResult();
    }

    showResult() {
        this.txtDisplay.value = (this.currentText === '' ? (this.result ? Number(this.result.toFixed(4)) : 0).toString() : this.currentText);
    }

    tryParseEnteredValue() {
        let retVal = 0;
        try {
            retVal = parseFloat(this.currentText);
            if (isNaN(retVal) || !retVal)
                retVal = 0;
        } catch (e) {
            console.error(e);
            retVal = 0;
        }
        return retVal;
    }
}

new Calculator();