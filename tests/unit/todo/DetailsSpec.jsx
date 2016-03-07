'use strict';

var DetailsList = require('../../../src/components/todo/Details.jsx');

describe('DetailsList', () => {
  var component;

  beforeEach(() => {   
    component = new DetailsList();
  });

  it('should create a new instance of DetailsList', () => {
    expect(component).toBeDefined();
  });
});
