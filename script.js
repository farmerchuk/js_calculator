var calculator = {
  register: '',
  result: '',
  inputHistory: '',
  operator: '',

  bind: function() {
    this.bindButtons();
    this.bindButtonPress();
  },

  bindButtons: function() {
    $('#buttons').on('click', 'div', function(e) {
      var input = $(e.target).attr('id');
      this.processInput(input);
    }.bind(this));
  },

  bindButtonPress: function() {
    $('#buttons').on('mousedown', 'div', function(e) {
      $(this).addClass('pressed');
    });

    $('#buttons').on('mouseup', 'div', function(e) {
      $(this).removeClass('pressed');
    });
  },

  processInput: function(input) {
    if (this.isNumerical(input)) {
      this.addNumberToRegister(input);
    } else if (this.isOperator(input)) {
      this.processOperator(input);
    } else if (this.isEquals(input)) {
      this.processEquals();
      this.clearInputHistory();
    } else if (this.isC(input)) {
      this.processClear();
    } else if (this.isCe(input)) {
      this.processClearEntry();
    } else if (this.isNeg(input)) {
      this.processNeg();
    }

    this.renderScreen();
  },

  processOperator: function(input) {
    if (this.operator && this.result && this.register) {
      this.addRegisterToInputHistory();
      this.addOperatorToInputHistory(input);
      this.processOperation();
      this.setOperator(input);
    } else if (this.operator && this.result) {
      this.addResultToInputHistory();
      this.moveResultToRegister();
      this.processOperation();
    } else if (this.result) {
      this.setOperator(input);
      this.addResultToInputHistory();
      this.addOperatorToInputHistory(input);
    } else {
      this.setOperator(input);
      this.addRegisterToInputHistory();
      this.addOperatorToInputHistory(input);
      this.moveRegisterToResult();
    }

    this.clearRegister();
  },

  processOperation() {
    var operand1 = Number(this.result);
    var operand2 = Number(this.register);
    var result;

    if (this.operator === '+') result = operand1 + operand2;
    if (this.operator === '-') result = operand1 - operand2;
    if (this.operator === '*') result = operand1 * operand2;
    if (this.operator === '/') result = operand1 / operand2;

    this.result = String(result);
  },

  processEquals: function() {
    if (this.operator && this.result) {
      this.processOperation();
      this.clearOperator();
      this.clearRegister();
    }
  },

  processClear: function() {
    this.clearOperator();
    this.clearRegister();
    this.clearResult();
    this.clearInputHistory();
  },

  processClearEntry: function() {
    this.clearRegister();
  },

  processNeg: function() {
    if (this.register && this.result && this.operator) {
      this.register = '-' + this.register;
      this.renderRegister();
    } else if (this.result && this.operator) {
      this.register = '-' + this.result;
      this.renderRegister();
    } else if (this.register) {
      this.register = '-' + this.register;
      this.renderRegister();
    } else if (this.result) {
      this.result = '-' + this.result;
      this.moveResultToRegister();
      this.renderRegister();
      this.clearRegister();
    }
  },

  renderScreen: function() {
    this.register ? this.renderRegister() : this.renderResult();
    this.renderInputHistory();
  },

  renderRegister: function() {
    var displayValue = this.register.slice(0, 15) || '0';
    $('#register').html(displayValue);
  },

  renderResult: function() {
    var displayValue = this.result.slice(0, 15) || '0';
    $('#register').html(displayValue);
  },

  renderInputHistory: function() {
    var displayValue = this.inputHistory;
    $('#history').html(displayValue);
  },

  isNumerical: function(input) {
    return !!input.match(/[0-9\.]/);
  },

  isOperator: function(input) {
    return !!input.match(/[\+\-\*\/]/);
  },

  isEquals: function(input) {
    return input === '=';
  },

  isC: function(input) {
    return input === 'c';
  },

  isCe: function(input) {
    return input === 'ce';
  },

  isNeg: function(input) {
    return input === 'neg';
  },

  addNumberToRegister: function(input) {
    if (this.register.match(/[\.]/) && input === '.') {
      // Ignore extra decimals
    } else {
      this.register += input;
    }
  },

  addRegisterToInputHistory: function() {
    this.inputHistory += this.register + ' ';
  },

  addResultToInputHistory: function() {
    this.inputHistory += this.result + ' ';
  },

  addOperatorToInputHistory: function(input) {
    this.inputHistory += input + ' ';
  },

  moveRegisterToResult: function() {
    this.result = this.register;
  },

  moveResultToRegister: function() {
    this.register = this.result;
  },

  setOperator: function(input) {
    this.operator = input;
  },

  clearRegister: function() {
    this.register = '';
  },

  clearResult: function() {
    this.result = '';
  },

  clearOperator: function() {
    this.operator = '';
  },

  clearInputHistory: function() {
    this.inputHistory = '';
  },

  init: function() {
    this.bind();
  },
}

calculator.init();
