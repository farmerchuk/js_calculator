var calculator = {
  register: '',
  result: '',
  operator: '',

  bind: function() {
    this.bindButtons();
  },

  bindButtons: function() {
    $('#buttons').on('click', 'div', function(e) {
      var input = $(e.target).attr('id');
      this.processInput(input);
    }.bind(this));
  },

  processInput: function(input) {
    if (this.isNumerical(input)) {
      this.addNumberToRegister(input);
      this.renderRegister();
    } else if (this.isOperator(input)) {
      this.processOperator(input);
      this.renderResult();
    } else if (this.isEquals(input)) {
      this.processEquals();
      this.renderResult();
    } else if (this.isC(input)) {
      this.processClear();
      this.renderResult();
    } else if (this.isCe(input)) {
      this.processCe();
    } else if (this.isNeg(input)) {
      this.processNeg();
      this.renderRegister();
    }
  },

  isNumerical: function(input) {
    return !!input.match(/[0-9\.]/);
  },

  addNumberToRegister: function(input) {
    this.register += input;
  },

  renderRegister: function() {
    var displayValue = this.register || '0';
    $('#register').html(displayValue);
  },

  renderResult: function() {
    var displayValue = this.result || '0';
    $('#register').html(displayValue);
  },

  isOperator: function(input) {
    return !!input.match(/[\+\-\*\/]/);
  },

  processOperator: function(input) {
    if (this.operator && this.result) {
      this.processOperation();
    } else if (this.result) {
      this.setOperator(input);
    } else {
      this.moveRegisterToResult();
    }
    this.setOperator(input);
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
  },

  isCe: function(input) {
    return input === 'ce';
  },

  processCe: function() {

  },

  isNeg: function(input) {
    return input === 'neg';
  },

  processNeg: function() {
    this.register = '-' + this.register;
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
