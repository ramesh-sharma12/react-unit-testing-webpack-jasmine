'use strict';

var Navbar = require('../../src/components/Navbar.jsx');

describe('Navbar', () => {
  var component;

  beforeEach(() => {   
    component = new Navbar();
  });

  it('should create a new instance of Navbar', () => {
    expect(component).toBeDefined();
  });
});
