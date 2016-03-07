'use strict';

var TodoList = require('../../../src/components/todo/List.jsx');

describe('TodoList', () => {
  var component;

  beforeEach(() => {   
    component = new TodoList();
  });

  it('should create a new instance of TodoList', () => {
    expect(component).toBeDefined();
  });
});
