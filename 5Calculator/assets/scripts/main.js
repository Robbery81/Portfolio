const calculator = {

  calculatorField: null,
  hasComma: false,
  openHistoryModal: false,
  width: 320,
  buferNumberOne: null,
  buferOperation: null,
  buferNumberTwo: null,
  
  historyItemCounter: 0,
  maxInputLength: 11,
  historyInfo: [],

  btnContent: [
    ['%', '<span>|x|</span>', '<span>C</span>', '<img src="assets/sprites/backspace.png" alt="backspace">'],
    ['<span>x<sup>2</sup></span>', '<sup>1</sup>/<sub>x</sub>', '&radic;x', '&divide'],
    ['7', '8', '9', '&#10006'],
    ['4', '5', '6', '-'],
    ['1', '2', '3', '+'],
    ['+/-', '0', '.', '='],
  ],
  btnAttr: [
    ['%', '|x|', 'C', 'delete'],
    ['x**2', '1/x', 'x**1/2', '/'],
    ['7', '8', '9', '*'],
    ['4', '5', '6', '-'],
    ['1', '2', '3', '+'],
    ['!', '0', ',', '='],
  ],

  init() {
    this.render();
    this.setEvents();
  },

  render() {
    this.body = document.querySelector('body');
    this.calculator = document.createElement('section');
    this.calculator.classList.add('calculator');
    this.body.appendChild(this.calculator);

    this.calculatorHeaderWrapper = document.createElement('div');
    this.calculatorHeaderWrapper.classList.add('header_wrapper');
    this.calculator.appendChild(this.calculatorHeaderWrapper);

    this.calculatorName = document.createElement('div');
    this.calculatorName.innerText = 'Calculator';
    this.calculatorName.classList.add('name');
    this.calculatorHeaderWrapper.appendChild(this.calculatorName);

    this.calculatorHistory = document.createElement('div');
    this.calculatorHistory.classList.add('history_icon');
    this.calculatorHeaderWrapper.appendChild(this.calculatorHistory);
    this.calculatorHistoryImg = document.createElement('img');
    this.calculatorHistoryImg.src = 'assets/sprites/history.png';
    this.calculatorHistory.appendChild(this.calculatorHistoryImg);

    this.calculatorFieldWrapper = document.createElement('div');
    this.calculatorFieldWrapper.classList.add('field_wrapper');
    this.calculator.appendChild(this.calculatorFieldWrapper);
    

    this.calculatorFieldCurrent = document.createElement('div');
    this.calculatorFieldCurrent.innerText = '0';
    this.calculatorFieldCurrent.classList.add('field_current');
    this.calculatorFieldCurrent.style.display = 'none';
    this.calculatorFieldWrapper.appendChild(this.calculatorFieldCurrent);

    this.calculatorField = document.createElement('div');
    this.calculatorField.innerText = '0';
    this.calculatorField.classList.add('field');
    this.calculatorFieldWrapper.appendChild(this.calculatorField);

    this.calculatorButtonsWrapper = document.createElement('div');
    this.calculatorButtonsWrapper.classList.add('buttons_wrapper');
    this.calculator.appendChild(this.calculatorButtonsWrapper);

    this.calculatorHistoryModal = document.createElement('div');
    this.calculatorHistoryModal.classList.add('history_modal');
    this.calculator.appendChild(this.calculatorHistoryModal);
    
    this.calculatorHistoryWrapper = document.createElement('div');
    this.calculatorHistoryWrapper.classList.add('history_wrapper');
    this.calculatorHistoryWrapper.innerHTML = "<span>There's no history yet</span>";
    this.calculatorHistoryModal.appendChild(this.calculatorHistoryWrapper);
    
    this.calculatorHistoryClearWrapper = document.createElement('div');
    this.calculatorHistoryClearWrapper.classList.add('history_clear');
    this.calculatorHistoryModal.appendChild(this.calculatorHistoryClearWrapper);

    this.calculatorHistoryClear = document.createElement('img');
    this.calculatorHistoryClear.src = 'assets/sprites/clear.png';
    this.calculatorHistoryClear.style.display = 'none';
    this.calculatorHistoryClearWrapper.appendChild(this.calculatorHistoryClear);

    this.createButtons(this.btnContent);
  },

  createButtons(content) {
    for (let line = 0; line < content.length; line++) {
      this.lineButtons = document.createElement('div');
      this.lineButtons.classList.add('line_buttons');
      this.calculatorButtonsWrapper.appendChild(this.lineButtons);
      for (let elem = 0; elem < content[line].length; elem++) {

        let button = document.createElement('div');
        button.classList.add('button__gray');

        if (line >= 2 && elem != 3) {
          button.classList.add('button__white');
          button.classList.remove('button__gray');
        }

        if (line == content.length - 1 && elem == 3) {
          button.classList.add('button__equel');
          button.classList.remove('button__gray');
        }

        button.classList.add('button');
        button.setAttribute("value", this.btnAttr[line][elem]);
        button.innerHTML = content[line][elem];
        this.lineButtons.appendChild(button);
      }
    }
  },

  setEvents() {
    this.setClick();
    this.setClickOnHistory();
    this.clearHistory();
  },

  clearHistory() {
    this.calculatorHistoryClear.addEventListener('click', () => {
      this.historyItemCounter = 0;
      this.historyInfo.length = 0;
      this.calculatorHistoryWrapper.innerHTML = "<span>There's no history yet</span>";

      this.calculatorHistoryClear.style.display = 'none';
      this.calculatorHistoryClear.classList.remove('history_clear');
    });
  },

  setClickOnHistory() {
    this.calculatorHistoryImg.addEventListener('click', () => {
      if (!this.historyModal) {
        this.calculatorHistoryModal.style.display = 'block';
        this.historyModal = true;
      } else {
        this.calculatorHistoryModal.style.display = 'none';
        this.historyModal = false;
      }
    });
  },

  checkPushedButton(button) {
    const buttonAttribute = button.getAttribute('value');
    switch (buttonAttribute) {
      case '0':
      case '1':
      case '2':
      case '3':
      case '4':
      case '5':
      case '6':
      case '7':
      case '8':
      case '9': this.clickOnNumber(buttonAttribute); break;
      case ',': this.addComma(); break;
      case 'C': this.clearAllField(0); break;
      case 'delete': this.deleteLastInputChar(); break;
      case '+': this.clickOnPlus(); break;
      case '-': this.clickOnMinus(); break;
      case '!': this.clickChangeSign(); break;
      case '%': this.clickPercent(); break;
      case '|x|': this.clickAbs(); break;
      case 'x**2': this.clickSquere(); break;
      case 'x**1/2': this.clickSqrt(); break;
      case '1/x': this.clickMultiplicativeInverse(); break;
      case '*': this.clickOnMultiply(); break;
      case '/': this.clickOnDivision(); break;
      case '=': this.equel(); break;
    }
  },

  clickOnNumber(buttonAttribute) {
    if(this.getInputField() == '0' || this.waitInput) {
      this.waitInput = false;
      this.clearInputField();
      this.addInputNumber(buttonAttribute);
    } else {
      this.addInputNumber(buttonAttribute);
    }
    if (this.buferNumberOne && buttonAttribute !== "." && this.waitInput) {
      this.waitInput = false;
      this.clearInputField();
      this.addInputNumber(buttonAttribute);
    }
  },

  clickOnMultiply() {
    this.buferNumberOne = +this.getInputField();
    
    this.calculatorFieldCurrent.style.display = 'block';
    this.calculatorFieldCurrent.innerText = `${this.buferNumberOne} *`;

    this.buferOperation = this.multiply;
    this.waitInput = true;
    this.buferOperationType = '*';
  },

  multiply() {
    return +(this.buferNumberOne * this.buferNumberTwo).toFixed(8);
  },

  clickOnDivision() {
    this.buferNumberOne = +this.getInputField();
    
    this.calculatorFieldCurrent.style.display = 'block';
    this.calculatorFieldCurrent.innerText = `${this.buferNumberOne} /`;

    this.buferOperation = this.division;
    this.waitInput = true;
    this.buferOperationType = '/';
  },

  division () {
    return +(this.buferNumberOne / this.buferNumberTwo).toFixed(8);
  },

  clickOnPlus() {
    this.buferNumberOne = +this.getInputField();
    this.calculatorFieldCurrent.style.display = 'block';
    this.calculatorFieldCurrent.innerText = `${this.buferNumberOne} +`;

    this.buferOperation = this.аddition;
    this.waitInput = true;
    this.buferOperationType = '+';
  },

  аddition() {
    return +(this.buferNumberOne + this.buferNumberTwo).toFixed(8);
  },

  clickOnMinus() {
    this.buferNumberOne = +this.getInputField();
    this.calculatorFieldCurrent.style.display = 'block';
    this.calculatorFieldCurrent.innerText = `${this.buferNumberOne} -`;

    this.buferOperation = this.subtraction;
    this.waitInput = true;
    this.buferOperationType = '-';
  },

  subtraction() {
    return +(this.buferNumberOne - this.buferNumberTwo).toFixed(8);
  },

  clickPercent() {
    if (!this.buferNumberOne) {
      this.setInputNumber(0); 
    } else {
      this.findPercent();
    }
  },

  findPercent() {
    this.buferNumberTwo = +this.getInputField();
    this.buferNumberTwo = this.buferNumberOne / 100 * this.buferNumberTwo;
    this.setInputNumber(this.buferNumberTwo);
  },

  clickChangeSign() {
    this.buferNumberOne = +this.getInputField();
    this.calculatorFieldCurrent.innerText = `${this.buferNumberOne}`;

    this.buferOperation = this.changeSign;
    this.buferOperationType = '-x';
    this.equel();
  },

  changeSign() {
    return this.buferNumberOne *= -1;
  },

  clickAbs() {
    this.buferNumberOne = +this.getInputField();
    this.calculatorFieldCurrent.innerText = `|${this.buferNumberOne}|`;
    this.buferOperation = this.getAbs;
    this.buferOperationType = '|x|';
    this.equel();
  },

  getAbs() {
    if (this.buferNumberOne > this.buferNumberOne * -1) {
      return this.buferNumberOne;
    } else {
      return this.buferNumberOne * -1;
    }
  },

  clickSquere() {
    this.buferNumberOne = +this.getInputField();
    this.calculatorFieldCurrent.innerText = `sqr(${this.buferNumberOne})`;
    this.buferOperation = this.getSquere;
    this.buferOperationType = 'x**2';
    this.equel();
  },

  getSquere() {
    return this.buferNumberOne * this.buferNumberOne;
  },

  clickSqrt() {
    this.buferNumberOne = +this.getInputField();
    
    this.calculatorFieldCurrent.innerText = `√${this.buferNumberOne}`;
    this.buferOperation = this.getSqrt;
    this.buferOperationType = 'x**1/2';
    this.equel();
  },

  getSqrt() {
    return +((this.buferNumberOne ** (1 / 2)).toFixed(8));
  },

  clickMultiplicativeInverse() {
    this.buferNumberOne = +this.getInputField();
    this.calculatorFieldCurrent.innerText = `1 / ${this.buferNumberOne}`;
    this.buferOperation = this.getMultiplicativeInverse;
    this.buferOperationType = '1/x';
    this.equel();
  },

  getMultiplicativeInverse() {
    return +(1 / this.buferNumberOne).toFixed(8);
  },

  equel() {
    try {
      this.buferNumberTwo = +this.getInputField();

      this.calculatorFieldCurrent.innerText = this.showCurrentOperation();
      this.calculatorFieldCurrent.style.display = 'block';
      
      this.setInputNumber(this.buferOperation());
      this.saveHistory();
      this.clearBufer();
      this.waitInput = true;
    } catch(e) {}
  },

  showCurrentOperation() {
    if (!this.buferOperation) {
      return this.calculatorFieldCurrent.innerText;
    }

    switch(this.buferOperation) {
      case this.getSquere:
      case this.getMultiplicativeInverse:
      case this.getAbs:
      case this.getSqrt:
      case this.changeSign: return this.calculatorFieldCurrent.innerText;
      
      case this.аddition: 
      case this.subtraction:
      case this.division:
      case this.multiply: return `${this.buferNumberOne} ${this.buferOperationType} ${this.buferNumberTwo}`;
      
    }
  },

  saveHistory() {
    let history = this.checkSaveParametrsNeed();
    this.historyInfo.push(history);

    this.calculatorHistoryClear.style.display = 'block';
    this.calculatorHistoryClear.classList.add('history_clear');

    this.calculatorHistoryElem = document.createElement('div');
    this.calculatorHistoryElem.classList.add('history_element');
    this.calculatorHistoryElem.innerHTML = this.historyInfo[this.historyItemCounter];
    this.calculatorHistoryWrapper.appendChild(this.calculatorHistoryElem);
    
    this.historyItemCounter++;
  },

  checkSaveParametrsNeed() {
    this.calculatorHistoryWrapper.children[0].innerHTML = '';

    let count = this.historyItemCounter + 1;
    switch(this.buferOperation) {
      case this.getSquere:
      return `${count})  ${this.buferNumberOne} ** 2 = ${this.getInputField()}`;
     
      case this.getMultiplicativeInverse:
      return `${count})  1 / ${this.buferNumberOne} = ${this.getInputField()}`;
     
      case this.getAbs:
      return `${count})  |${this.buferNumberOne}| = ${this.getInputField()}`;
     
      case this.getSqrt:
      return `${count})  ${this.buferNumberOne}** 1/2 = ${this.getInputField()}`;
      
      case this.changeSign: 
      return `${count})  ${-this.buferNumberOne} = ${this.getInputField()}`;
      
      case this.аddition: 
      case this.subtraction:
      case this.division:
      case this.multiply: 
      return `${count})
      ${this.buferNumberOne} ${this.buferOperationType} ${this.buferNumberTwo} = ${this.getInputField()} = `;
    }
  },

  clearBufer() {
    this.buferNumberOne = 0;
    this.buferNumberTwo = 0;
    this.buferOperation = null;
    this.buferOperationType = 0;
  },

  addComma() {
    if (!this.hasComma && this.calculatorField.innerText.length < this.maxInputLength - 1) {
      this.hasComma = true;
      this.addInputNumber('.');
    }
  },

  setClick() {
    this.calculatorButtonsWrapper.addEventListener('mousedown', (e) => {
      e.preventDefault();
      
      this.pushedButton = e.target.closest('div.button');
      if(this.pushedButton) {
        this.colorizeButton(this.pushedButton);
        this.checkPushedButton(this.pushedButton);
  
        document.addEventListener('mouseup', () => {
        this.setNormalButtonBgColor(this.pushedButton);
        });
      }
    });
  },

  colorizeButton(target) {
    if (target) {
      for (let color of target.classList) {
        if (color == 'button__gray' || color == 'button__white') {
          target.style.backgroundColor = '#B2B2B2';
        }
        if (color == 'button__equel') {
          target.style.backgroundColor = '#868482';
        }
      }
    }
  },

  setNormalButtonBgColor(target, timeOut = 100) {
    if (target) {
      setTimeout(() => {
        target.style.backgroundColor = '';
      }, timeOut);
    }
  },

  clearAllField(inputField = "") {
    this.calculatorFieldCurrent.innerText = '';
    this.calculatorField.innerText = inputField;
    this.hasComma = false;
  },

  clearInputField(inputField = '') {
    this.calculatorField.innerText = inputField;
    this.hasComma = false;
  },

  deleteLastInputChar() {
    this.calculatorFieldCurrent.innerText = '';

    let line = this.getInputField().split("");
    if (line.length > 1) {
      if (line[line.length-1] === ',') {
        this.hasComma = false;
      }
      line.pop();
      this.setInputNumber(line.join(""));
    } else {
      this.setInputNumber(0);
    }
  },

  getInputField() {
    return this.calculatorField.textContent;
  },

  setInputNumber(number = 0) {
    if (number.toString().length <= this.maxInputLength && !isNaN(number)) {
      this.calculatorField.innerText = number;
    } else {
      this.calculatorField.innerText = 'So long';
      setTimeout(() => {
        this.calculatorField.innerText = 0;
      }, 1000);
    }
  },

  addInputNumber(number) {
    if (this.calculatorField.innerText.length < this.maxInputLength) {
      this.calculatorField.innerText += number;
    } 
  }
};

document.addEventListener('DOMContentLoaded', () => {
  calculator.init();
});