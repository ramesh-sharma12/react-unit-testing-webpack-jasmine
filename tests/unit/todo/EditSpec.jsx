'use strict';

var EditList = require('../../../src/components/todo/Edit.jsx');

describe('EditList', () => {
  var component;

  beforeEach(() => {   
    component = new EditList();
  });

  it('should create a new instance of EditList', () => {
    expect(component).toBeDefined();
  });
});
