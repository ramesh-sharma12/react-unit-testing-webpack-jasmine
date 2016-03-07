'use strict';

var CreateList = require('../../../src/components/todo/Create.jsx');

describe('CreateList', () => {
  var component;

  beforeEach(() => {   
    component = new CreateList();
  });

  it('should create a new instance of CreateList', () => {
    expect(component).toBeDefined();
  });
});
