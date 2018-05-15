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
      this.renderRegister();
    } else if (this.isOperator(input)) {
      this.processOperator(input);
      this.renderResult();
      this.renderInputHistory();
    } else if (this.isEquals(input)) {
      this.processEquals();
      this.clearInputHistory();
      this.renderResult();
      this.renderInputHistory();
    } else if (this.isC(input)) {
      this.processClear();
      this.renderResult();
      this.renderInputHistory();
    } else if (this.isCe(input)) {
      this.processCe();
      this.renderRegister();
    } else if (this.isNeg(input)) {
      this.processNeg();
    }
  },

  isNumerical: function(input) {
    return !!input.match(/[0-9\.]/);
  },

  addNumberToRegister: function(input) {
    if (this.register.match(/[\.]/) && input === '.') {
      // Ignore extra decimals
    } else {
      this.register += input;
    }
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

  isOperator: function(input) {
    return !!input.match(/[\+\-\*\/]/);
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

  clearInputHistory: function() {
    this.inputHistory = '';
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

  isEquals: function(input) {
    return input === '=';
  },

  processEquals: function() {
    if (this.operator && this.result) {
      this.processOperation();
      this.clearOperator();
      this.clearRegister();
    }
  },

  isC: function(input) {
    return input === 'c';
  },

  processClear: function() {
    this.clearOperator();
    this.clearRegister();
    this.clearResult();
    this.clearInputHistory();
  },

  isCe: function(input) {
    return input === 'ce';
  },

  processCe: function() {
    this.clearRegister();
  },

  isNeg: function(input) {
    return input === 'neg';
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

  setOperator: function(input) {
    this.operator = input;
  },

  clearOperator: function() {
    this.operator = '';
  },

  moveRegisterToResult: function() {
    this.result = this.register;
  },

  moveResultToRegister: function() {
    this.register = this.result;
  },

  clearRegister: function() {
    this.register = '';
  },

  clearResult: function() {
    this.result = '';
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

  init: function() {
    this.bind();
  },
}

calculator.init();
